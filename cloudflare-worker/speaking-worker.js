/**
 * ==============================================================================
 * DREAM EDUCATION - CLOUDFLARE WORKER (AI IELTS SPEAKING BACKEND)
 * ==============================================================================
 * Chức năng:
 * 1. GET  /health         -> Kiểm tra trạng thái cấu hình Key (không lộ key)
 * 2. GET  /api/azure-token -> Cấp Token tạm 10 phút cho Azure Speech SDK (trình duyệt chấm IPA/Prosody)
 * 3. POST /api/evaluate    -> Gọi Gemini API chấm chuẩn 4 tiêu chí IELTS Speaking (kết hợp số liệu Azure)
 *
 * Biến môi trường (Secrets) cần cài trên Cloudflare Dashboard -> Settings -> Variables and Secrets:
 * - GEMINI_API_KEY       (Bắt buộc) : Lấy tại https://aistudio.google.com/apikey
 * - AZURE_SPEECH_KEY     (Khuyên dùng): Lấy tại Azure Portal -> Speech resource -> Keys and Endpoint
 * - AZURE_SPEECH_REGION  (Khuyên dùng): Ví dụ: southeastasia hoặc eastus
 * - GEMINI_MODEL         (Tuỳ chọn) : Mặc định "gemini-2.5-flash"
 * ==============================================================================
 */

const DEFAULT_ALLOWED_ORIGINS = [
  'https://dream-edu.org',
  'https://www.dream-edu.org',
  'http://localhost:5173',
  'http://localhost:4173',
  'http://127.0.0.1:5173'
];

function getCorsHeaders(request, env) {
  const origin = request.headers.get('Origin') || '';
  const extraOrigins = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  const allowedList = [...DEFAULT_ALLOWED_ORIGINS, ...extraOrigins];

  const isAllowed = !origin || allowedList.includes(origin) || origin.startsWith('http://localhost:');

  return {
    'Access-Control-Allow-Origin': isAllowed ? (origin || '*') : 'https://dream-edu.org',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Dream-Client',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin'
  };
}

function jsonResponse(data, status, corsHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      ...corsHeaders
    }
  });
}

/**
 * Làm tròn điểm IELTS chuẩn: bước 0.5 (ví dụ 6.25 -> 6.5, 6.75 -> 7.0, 6.12 -> 6.0)
 */
function roundIeltsBand(score) {
  const n = Number(score);
  if (Number.isNaN(n)) return 0;
  const clamped = Math.max(0, Math.min(9, n));
  return Math.round(clamped * 2) / 2;
}

/**
 * Cấp Ephemeral Auth Token (hết hạn sau 10 phút) từ Azure Speech STS
 * Giúp giấu hoàn toàn AZURE_SPEECH_KEY khỏi trình duyệt học sinh
 */
async function handleAzureToken(env, corsHeaders) {
  const key = env.AZURE_SPEECH_KEY;
  const region = (env.AZURE_SPEECH_REGION || 'southeastasia').trim().toLowerCase();

  if (!key) {
    return jsonResponse(
      {
        available: false,
        reason: 'AZURE_SPEECH_KEY chưa được cấu hình trên Cloudflare Worker.'
      },
      200,
      corsHeaders
    );
  }

  try {
    const tokenEndpoint = `https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`;
    const res = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': '0'
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      return jsonResponse(
        {
          available: false,
          reason: `Azure STS lỗi (${res.status}): ${errText.slice(0, 200)}`
        },
        200,
        corsHeaders
      );
    }

    const token = await res.text();
    return jsonResponse(
      {
        available: true,
        token,
        region,
        expiresInSeconds: 540
      },
      200,
      corsHeaders
    );
  } catch (err) {
    return jsonResponse(
      {
        available: false,
        reason: `Không thể kết nối Azure Speech: ${err.message}`
      },
      200,
      corsHeaders
    );
  }
}

/**
 * Xây dựng Prompt giám khảo IELTS Speaking chuyên sâu, tích hợp dữ liệu âm học Azure và chuẩn Band Descriptors
 */
function buildIeltsPrompt(payload) {
  const {
    mode = 'practice',
    testTitle = 'IELTS Speaking Practice',
    targetLevel = 'IELTS',
    responses = []
  } = payload;

  const formattedQA = responses
    .map((item, idx) => {
      const azure = item.azureMetrics || null;
      let azureSummary = 'Không có dữ liệu đo Azure (hãy phân tích kỹ qua audio/transcript).';
      if (azure && azure.hasData) {
        const weakWords = (azure.weakWords || [])
          .slice(0, 15)
          .map((w) => `"${w.word}" (score: ${w.accuracyScore}/100${w.ipa ? `, IPA: /${w.ipa}/` : ''}${w.errorType && w.errorType !== 'None' ? `, Lỗi: ${w.errorType}` : ''})`)
          .join('; ');

        const prosodyIssues = [];
        if (azure.unexpectedBreaks > 0) prosodyIssues.push(`UnexpectedBreak (ngắt cụm sai chỗ): ${azure.unexpectedBreaks} lần`);
        if (azure.missingBreaks > 0) prosodyIssues.push(`MissingBreak (quên ngắt câu): ${azure.missingBreaks} lần`);
        if (azure.monotoneCount > 0) prosodyIssues.push(`Monotone (thiếu biến thiên cao độ): ${azure.monotoneCount} lần`);

        azureSummary = [
          `- Accuracy (Độ chính xác âm vị IPA): ${azure.accuracyScore}/100`,
          `- Fluency (Độ trôi chảy luồng âm): ${azure.fluencyScore}/100`,
          azure.prosodyScore != null ? `- Prosody (Ngữ điệu, trọng âm, nhịp điệu): ${azure.prosodyScore}/100` : null,
          `- Pronunciation tổng hợp Azure: ${azure.pronScore}/100`,
          azure.wpm ? `- Tốc độ nói thực tế (Speech Rate): ${azure.wpm} từ/phút (WPM) [Chuẩn tự nhiên IELTS: 120 - 150 WPM]` : null,
          azure.pauseCount12s != null ? `- Khoảng lặng ngập ngừng: ${azure.pauseCount12s} lần pauses >= 1.2s, ${azure.pauseCount20s || 0} lần pauses >= 2.0s` : null,
          azure.phonationRatio ? `- Tỷ lệ phát âm liên tục (Phonation Time Ratio): ${azure.phonationRatio}%` : null,
          azure.mlr ? `- Mean Length of Runs (MLR): ${azure.mlr} từ/chuỗi nói liên tục` : null,
          prosodyIssues.length > 0 ? `- Nhận diện lỗi nhịp điệu (Prosody): ${prosodyIssues.join(', ')}` : null,
          weakWords ? `- Các từ phát âm yếu (<75 điểm) kèm IPA: ${weakWords}` : '- Không có từ phát âm dưới 75 điểm.'
        ]
          .filter(Boolean)
          .join('\n');
      }

      const hasTranscript = Boolean(item.transcript && item.transcript.trim());
      const hasAudio = Boolean(item.audioBase64);
      let transcriptText = '';
      if (hasTranscript) {
        transcriptText = `"${item.transcript.trim()}"`;
      } else if (hasAudio) {
        transcriptText = '(Chưa có transcript - hãy nghe trực tiếp file audio đính kèm để gỡ băng chính xác và chấm điểm)';
      } else {
        transcriptText = '(Thí sinh không nói hoặc audio không ghi nhận được âm thanh - ghi nhận không trả lời câu này, TUYỆT ĐỐI KHÔNG tự bịa đặt câu trả lời)';
      }

      return `
### Câu ${idx + 1} (${item.part || 'Speaking'})
- Câu hỏi / Đề bài: ${item.question || '(Không có đề)'}
- Thời lượng nói: ${item.durationSeconds || 0} giây
- Transcript học sinh nói: ${transcriptText}
- Chỉ số âm học vật lý từ Azure AI Speech Pronunciation Assessment:
${azureSummary}
`.trim();
    })
    .join('\n\n');

  return `
Bạn là Giám khảo IELTS Speaking chính thức (Senior Examiner chuẩn IDP / British Council) đang chấm bài cho học viên tại trung tâm Dream Education.
Hãy chấm điểm NGHIÊM TÚC, KHÁCH QUAN, KHOA HỌC, TUÂN THỦ 100% TÀI LIỆU CHÍNH THỨC "IELTS SPEAKING BAND DESCRIPTORS".

THÔNG TIN BÀI LÀM:
- Chế độ: ${mode === 'mock_test' ? 'IELTS Speaking Mock Test (Thi thử chuẩn IDP/BC)' : 'Speaking Practice / Homework'}
- Tên bài: ${testTitle}
- Cấp độ mục tiêu: ${targetLevel}

DỮ LIỆU BÀI NÓI CỦA HỌC SINH:
${formattedQA}

==============================================================================
TIÊU CHUẨN CHẤM THI CHÍNH THỨC (IELTS SPEAKING BAND DESCRIPTORS RUBRIC):
==============================================================================

1. FLUENCY AND COHERENCE (FC):
- Band 9: Nói trôi chảy với rất hiếm lần lặp từ hoặc tự sửa lỗi. Mọi ngập ngừng (hesitation) chỉ dùng để chuẩn bị ý tưởng/nội dung câu tiếp theo, KHÔNG PHẢI để tìm từ vựng hay ngữ pháp. Phát triển chủ đề mạch lạc toàn diện và mở rộng phù hợp.
- Band 8: Trôi chảy với rất ít lần lặp từ hay tự sửa lỗi. Ngập ngừng có thể đôi khi xuất hiện để tìm từ hay ngữ pháp, nhưng đa số vẫn là để suy nghĩ nội dung. Chủ đề phát triển mạch lạc, thích hợp và liên quan.
- Band 7: Duy trì được câu trả lời dài mà không thấy nỗ lực rõ rệt. Có thể có ngập ngừng, lặp từ, hoặc tự sửa lỗi ở giữa câu khi tìm kiếm ngôn ngữ phù hợp, nhưng KHÔNG ảnh hưởng đến tính mạch lạc tổng thể. Sử dụng linh hoạt discourse markers và liên từ.
- Band 6: Sẵn sàng duy trì câu trả lời dài. Đôi lúc mất tính mạch lạc do ngập ngừng, lặp từ hoặc tự sửa lỗi. Dùng được nhiều discourse markers và liên từ nhưng chưa phải lúc nào cũng chuẩn xác.
- Band 5: Thường duy trì được bài nói nhưng phụ thuộc vào lặp từ, tự sửa lỗi hoặc NÓI CHẬM. Ngập ngừng thường xuyên ở giữa câu để tìm từ vựng và ngữ pháp cơ bản. Lạm dụng một số discourse markers quen thuộc. Cấu trúc phức tạp dễ gây đứt quãng nhịp nói.
- Band 4: Không thể duy trì bài nói nếu không có những khoảng dừng thấy rõ (noticeable pauses). Tốc độ nói chậm, lặp từ nhiều. Thường xuyên tự sửa lỗi. Chỉ nối được câu đơn bằng liên từ lặp đi lặp lại. Có sự đứt gãy về mạch lạc.

2. LEXICAL RESOURCE (LR):
- Band 9: Hoàn toàn linh hoạt và chuẩn xác trong mọi ngữ cảnh. Sử dụng bền bỉ từ vựng thành ngữ (idiomatic) và chuẩn xác.
- Band 8: Vốn từ rộng, sử dụng linh hoạt để thảo luận mọi chủ đề và diễn đạt ý tinh tế. Sử dụng khéo léo từ ít gặp (less common) và thành ngữ dù đôi chỗ chưa hoàn hảo về collocation. Paraphrase hiệu quả.
- Band 7: Vốn từ linh hoạt để thảo luận nhiều chủ đề. Có khả năng dùng từ ít gặp và thành ngữ, có nhận thức về phong cách và collocation dù còn lỗi nhỏ. Paraphrase tốt khi cần.
- Band 6: Vốn từ đủ để thảo luận kéo dài chủ đề. Cách dùng từ đôi chỗ chưa thích hợp nhưng ý nghĩa vẫn rõ ràng. Nhìn chung paraphrase thành công.
- Band 5: Vốn từ đủ cho chủ đề quen thuộc và lạ nhưng tính linh hoạt hạn chế. Có nỗ lực paraphrase nhưng không phải lúc nào cũng thành công.
- Band 4: Vốn từ đủ cho chủ đề quen thuộc, nhưng chỉ truyền đạt ý cơ bản ở chủ đề lạ. Thường xuyên dùng sai từ. Hiếm khi paraphrase.

3. GRAMMATICAL RANGE AND ACCURACY (GRA):
- Band 9: Cấu trúc ngữ pháp chính xác tuyệt đối ở mọi thời điểm (ngoại trừ những sơ suất đặc trưng của người bản ngữ).
- Band 8: Đa dạng cấu trúc câu linh hoạt. ĐA SỐ CÂU HOÀN TOÀN KHÔNG CÓ LỖI NGỮ PHÁP (>60% error-free sentences). Chỉ gặp lỗi nhỏ không mang tính hệ thống.
- Band 7: Cấu trúc đa dạng linh hoạt. CÂU KHÔNG CÓ LỖI XUẤT HIỆN THƯỜNG XUYÊN (>45% error-free). Sử dụng hiệu quả cả câu đơn và câu phức dù còn vài lỗi nhỏ.
- Band 6: Kết hợp câu đơn và câu phức. Dù lỗi ngữ pháp thường xuyên xuất hiện ở các cấu trúc phức tạp, các lỗi này HIẾM KHI CẢN TRỞ GIAO TIẾP.
- Band 5: Cấu trúc câu đơn kiểm soát tương đối tốt. Cố gắng dùng câu phức nhưng phạm vi hạn chế, gần như LUÔN CHỨA LỖI và có thể dẫn đến việc phải nói lại/cấu trúc lại câu.
- Band 4: Tạo được câu đơn cơ bản, một số câu ngắn không có lỗi. Mệnh đề phụ (subordinate clauses) rất hiếm. Cấu trúc lặp lại và lỗi ngữ pháp dày đặc.

4. PRONUNCIATION (P):
- Band 9: Dùng toàn diện các đặc trưng âm vị học để truyền tải ý nghĩa tinh tế. Sử dụng kết nối âm (connected speech) linh hoạt bền bỉ. Người nghe hiểu một cách dễ dàng, không tốn chút nỗ lực nào. Accent không ảnh hưởng đến độ rõ.
- Band 8: Dùng đa dạng các đặc trưng âm vị học. Duy trì được nhịp điệu phù hợp. Sử dụng linh hoạt trọng âm và ngữ điệu (stress and intonation) qua các câu dài. Người nghe hiểu dễ dàng. Accent chỉ ảnh hưởng tối thiểu.
- Band 7: Thể hiện toàn bộ điểm tích cực của Band 6 và một số điểm tích cực của Band 8.
- Band 6: Sử dụng được nhiều đặc trưng âm vị nhưng khả năng kiểm soát không đều. Ngắt nhịp (chunking) nhìn chung hợp lý nhưng nhịp điệu có thể bị ảnh hưởng do thiếu stress-timing hoặc nói quá nhanh. Có sử dụng ngữ điệu và trọng âm nhưng không duy trì liên tục. Lỗi phát âm ở vài từ/âm vị gây mất rõ ràng đôi lúc. Nhìn chung hiểu được mà không cần quá nhiều nỗ lực.
- Band 5: Thể hiện toàn bộ điểm tích cực của Band 4 và một số điểm tích cực của Band 6.
- Band 4: Sử dụng một số đặc trưng âm vị nhưng phạm vi hạn chế. Có ngắt cụm nhưng nhịp điệu thường xuyên bị gãy. Khả năng dùng trọng âm và ngữ điệu bị hạn chế. Nhiều từ và âm vị bị phát âm sai gây thiếu rõ ràng. Người nghe cần nỗ lực để hiểu.

==============================================================================
QUY TẮC TÍCH HỢP CHỈ SỐ ÂM HỌC TỪ AZURE AI SPEECH:
==============================================================================
1. Điểm PRONUNCIATION: Phải căn cứ trực tiếp vào Azure PronScore, AccuracyScore và ProsodyScore:
   - Azure PronScore >= 90 (Accuracy >= 90, Prosody >= 88, từ lỗi < 5%): Pronunciation Band 8.0 - 9.0
   - Azure PronScore 80 - 89 (Accuracy 80-89, Prosody 80-88, từ lỗi < 10%): Pronunciation Band 7.0 - 8.0
   - Azure PronScore 65 - 79 (Accuracy 65-79, Prosody 65-79, từ lỗi 10-25%): Pronunciation Band 6.0 - 6.5
   - Azure PronScore 50 - 64 (Accuracy 50-64, từ lỗi 25-40%): Pronunciation Band 5.0 - 5.5
   - Azure PronScore < 50: Pronunciation Band 4.0 - 4.5
2. Điểm FLUENCY & COHERENCE:
   - Tốc độ nói WPM: 120-150 WPM là chuẩn tự nhiên. Nếu WPM < 100 WPM kết hợp nhiều khoảng dừng >= 1.2s (> 5 lần/phút) -> FC chỉ đạt Band 4.5 - 5.5 (đặc trưng nói chậm và ngập ngừng tìm từ cơ bản).
   - Phân tích nguyên nhân ngập ngừng: Nếu ngập ngừng chỉ xảy ra khi chuẩn bị ý tưởng phân tích sâu (nhất là Part 3) mà không phải để nhớ từ cơ bản, KHÔNG trừ điểm nặng.
   - Nếu có lỗi UnexpectedBreak (ngắt cụm sai chỗ) dày đặc, đối chiếu trực tiếp với Band 6 của tiêu chí P và FC.
3. Nếu không có transcript sẵn nhưng có file audio đính kèm, hãy gỡ băng trung thực kể cả từ ngập ngừng (um, uh, like...) rồi mới chấm. Tuyệt đối KHÔNG tự bịa đặt câu trả lời nếu thí sinh im lặng.
4. Tất cả nhận xét, giải thích cho học sinh và giáo viên viết bằng **tiếng Việt** tự nhiên, giàu tính sư phạm, thẳng thắn nhưng khích lệ.
5. Điểm từng tiêu chí và overallBand phải là bội số của 0.5 (từ 1.0 đến 9.0). overallBand = trung bình cộng 4 tiêu chí làm tròn đến 0.5 gần nhất.

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ THEO ĐÚNG CẤU TRÚC SAU (không thêm markdown \`\`\`json):
{
  "overallBand": 6.5,
  "acousticAnalysis": {
    "wpm": 126,
    "speechPacingEvaluationVi": "Tốc độ nói 126 từ/phút đạt mức độ tự nhiên chuẩn của kỳ thi IELTS (120-150 WPM).",
    "pauseCountLong": 3,
    "pauseCountSevere": 1,
    "phonationRatio": 74,
    "prosodyHighlightsVi": "Ngắt nhịp câu nhìn chung phù hợp; ngữ điệu có biến thiên tự nhiên ở các câu khẳng định."
  },
  "partBreakdown": {
    "part1": { "band": 6.5, "commentVi": "Nhận xét phản xạ, độ trôi chảy và từ vựng Part 1." },
    "part2": { "band": 6.0, "commentVi": "Nhận xét khả năng duy trì câu chuyện, phát triển ý và liên kết Part 2." },
    "part3": { "band": 6.5, "commentVi": "Nhận xét tư duy phản biện, lập luận và từ vựng học thuật Part 3." }
  },
  "questionBreakdown": [
    {
      "questionIndex": 0,
      "part": "Part 1",
      "question": "Câu hỏi học sinh đã trả lời",
      "cleanedTranscript": "Bản gỡ băng chính xác của riêng câu hỏi này",
      "estimatedBand": 6.5,
      "feedbackVi": "Nhận xét ngắn gọn 1-2 câu về câu trả lời này.",
      "grammarErrors": [
        {
          "original": "câu/cụm học sinh nói sai",
          "corrected": "câu/cụm sửa lại chuẩn xác",
          "explanationVi": "giải thích lỗi ngắn gọn bằng tiếng Việt"
        }
      ],
      "mispronouncedWords": [
        {
          "word": "từ phát âm chưa chuẩn",
          "ipa": "/phiên âm IPA chuẩn/",
          "issueVi": "mô tả ngắn lỗi (âm cuối, trọng âm, nguyên âm) và cách sửa khẩu hình"
        }
      ],
      "upgradedAnswer": "Phiên bản nâng cấp Band 7.5-8.0 cho riêng câu hỏi này, giữ đúng ý của học sinh"
    }
  ],
  "transcripts": [
    {
      "questionIndex": 0,
      "cleanedTranscript": "Bản gỡ băng chính xác câu trả lời của học sinh"
    }
  ],
  "criteria": {
    "fluencyCoherence": {
      "band": 6.5,
      "summaryVi": "Nhận xét tổng quan về độ trôi chảy, tốc độ nói (WPM), các khoảng nghỉ và tính mạch lạc.",
      "bandDescriptorJustificationVi": "Giải thích chi tiết vì sao đạt Band này căn cứ theo tiêu chí IELTS Band Descriptors (ví dụ: 'Thí sinh duy trì được độ dài bài nói tốt, có nỗ lực triển khai ý nhưng đôi lúc ngập ngừng mid-sentence để tìm từ vựng, đặc trưng của ngưỡng Band 6.5').",
      "nextBandTargetVi": "Yêu cầu của Band tiếp theo để bứt phá (ví dụ: 'Để lên Band 7.5+, cần giảm thiểu ngập ngừng tìm từ giữa câu và sử dụng linh hoạt hơn các liên từ phức hợp').",
      "strengthsVi": ["Điểm mạnh 1"],
      "weaknessesVi": ["Điểm cần cải thiện 1"]
    },
    "lexicalResource": {
      "band": 6.5,
      "summaryVi": "Nhận xét về vốn từ, collocations, khả năng paraphrase và lặp từ.",
      "bandDescriptorJustificationVi": "Giải thích đối chiếu với Band Descriptors về vốn từ (đủ để mở rộng ý, có cố gắng dùng từ ít gặp dù còn lỗi collocation nhỏ).",
      "nextBandTargetVi": "Yêu cầu của Band tiếp theo về từ vựng.",
      "goodVocab": ["từ/cụm từ tốt học sinh đã dùng"],
      "suggestedUpgrades": [
        {
          "original": "từ/cụm từ đơn giản bạn đã dùng",
          "better": "từ/collocation Band 7.5+ thay thế",
          "meaningVi": "nghĩa tiếng Việt ngắn gọn"
        }
      ]
    },
    "grammaticalRange": {
      "band": 6.0,
      "summaryVi": "Nhận xét về tỷ lệ câu đơn/câu phức và độ chính xác ngữ pháp.",
      "bandDescriptorJustificationVi": "Giải thích đối chiếu với Band Descriptors (ví dụ: 'Thí sinh phối hợp được câu đơn và câu ghép, có cố gắng dùng câu phức nhưng các cấu trúc này vẫn thường xuất hiện lỗi chia thì/mạo từ, đúng đặc trưng Band 6.0').",
      "nextBandTargetVi": "Yêu cầu của Band tiếp theo về ngữ pháp (tăng tỷ lệ câu error-free lên trên 50%).",
      "errors": [
        {
          "original": "câu/cụm học sinh nói sai",
          "corrected": "câu/cụm sửa lại chuẩn xác",
          "explanationVi": "giải thích lỗi ngắn gọn bằng tiếng Việt"
        }
      ]
    },
    "pronunciation": {
      "band": 6.5,
      "summaryVi": "Nhận xét cụ thể về âm cuối, trọng âm, ngữ điệu và nhịp điệu dựa trên số liệu âm học Azure.",
      "bandDescriptorJustificationVi": "Giải thích đối chiếu với Band Descriptors về phát âm (ví dụ: 'Điểm Azure 72/100, ngắt cụm tương đối phù hợp, ngữ điệu có biến thiên dù chưa duy trì xuyên suốt bài nói dài, đáp ứng đầy đủ tiêu chí Band 6 và một phần Band 8').",
      "nextBandTargetVi": "Yêu cầu của Band tiếp theo về phát âm (duy trì trọng âm câu liên tục và triệt tiêu lỗi nuốt âm cuối).",
      "mispronouncedWords": [
        {
          "word": "từ phát âm chưa chuẩn",
          "ipa": "/phiên âm IPA chuẩn/",
          "issueVi": "mô tả lỗi cụ thể và cách đặt lưỡi/khẩu hình"
        }
      ]
    }
  },
  "answerQuality": {
    "isOnTopic": true,
    "relevanceVi": "Đánh giá mức độ bám sát câu hỏi và phát triển ý (đã có dẫn chứng/giải thích cụ thể chưa).",
    "lengthCommentVi": "Nhận xét độ dài và dung lượng bài nói so với yêu cầu thời gian IELTS."
  },
  "upgradedSampleAnswers": [
    {
      "questionIndex": 0,
      "targetBand": "Band 7.5 - 8.0",
      "sampleAnswer": "Phiên bản nâng cấp tự nhiên, giữ đúng ý tưởng của học sinh nhưng dùng từ vựng & cấu trúc Band 7.5-8.0."
    }
  ],
  "nextStepTipsVi": [
    "Lời khuyên hành động cụ thể 1",
    "Lời khuyên hành động cụ thể 2",
    "Lời khuyên hành động cụ thể 3"
  ],
  "teacherSummaryVi": "Tóm tắt chuyên môn 3-4 câu dành cho giáo viên (điểm nổi bật, lỗ hổng lớn nhất cần kèm cặp trên lớp cho học sinh này)."
}
`.trim();
}

/**
 * Gọi Gemini thông qua Google Apps Script Web App (chạy tại Google US Datacenter)
 * Giúp giải quyết triệt để lỗi 'User location is not supported' do edge Hong Kong của Cloudflare
 */
async function callGeminiViaAppsScript(env, contents, generationConfig, model) {
  const appsScriptUrl = (env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyklW07HibT6f4nXRIcZV7aYLacXEFH7Je-hdWAtolvVPx5hEnkXYdy57wRhUnusv1vrA/exec').trim();
  const apiKey = env.GEMINI_API_KEY;

  const res = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      action: 'callGemini',
      apiKey,
      model: model || 'gemini-2.0-flash',
      contents,
      generationConfig
    })
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Apps Script trả về HTTP ${res.status}: ${errText.slice(0, 200)}`);
  }

  const json = await res.json();
  if (json.status === 'success' && json.text) {
    return {
      text: json.text,
      modelUsed: `${json.modelUsed || 'gemini-2.0-flash'} (via Google US proxy)`
    };
  }

  throw new Error(json.error || 'Google Apps Script không trả về nội dung AI hợp lệ.');
}

/**
 * Gọi Gemini API với cơ chế tự động fallback model siêu tốc, chống lỗi location Cloudflare Hong Kong
 */
async function callGemini(env, parts, requestedModel) {
  const apiKey = env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY chưa được cấu hình trên Cloudflare Worker.');
  }

  const userModel = (requestedModel || env.GEMINI_MODEL || 'gemini-3.8-flash').trim();
  const candidateModels = [
    userModel,
    'gemini-3.8-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash'
  ].filter(Boolean);

  const modelsToTry = [...new Set(candidateModels)];

  const requestBody = {
    contents: [
      {
        role: 'user',
        parts
      }
    ],
    generationConfig: {
      temperature: 0.25,
      responseMimeType: 'application/json'
    }
  };

  const allAttempts = [];

  // 1. Thử gọi trực tiếp Google Gemini API với timeout nghiêm ngặt (tối đa 4.5 giây)
  // Nếu Cloudflare edge bị chặn địa lý (User location / FAILED_PRECONDITION / 403 / timeout),
  // sẽ lập tức chuyển ngay sang Google US Proxy, KHÔNG lặp đi lặp lại làm treo hệ thống.
  for (const model of modelsToTry.slice(0, 1)) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
    const directAbort = new AbortController();
    const directTimer = setTimeout(() => directAbort.abort(), 4500);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        signal: directAbort.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(requestBody)
      });
      clearTimeout(directTimer);

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return { text, modelUsed: model };
        }
      }

      const errText = await res.text();
      allAttempts.push(`Direct ${model} (${res.status}): ${errText.slice(0, 150)}`);
    } catch (fErr) {
      clearTimeout(directTimer);
      allAttempts.push(`Direct ${model} error: ${fErr.message}`);
    }
    // Nếu gọi trực tiếp từ Cloudflare Edge thất bại, bỏ qua ngay để chuyển sang Google US Proxy
    break;
  }

  // 2. Chuyển ngay qua Google Apps Script proxy (chạy 100% trong Google US Datacenter, siêu tốc ~1-3s)
  try {
    const proxyResult = await callGeminiViaAppsScript(
      env,
      requestBody.contents,
      requestBody.generationConfig,
      userModel
    );
    return proxyResult;
  } catch (proxyErr) {
    allAttempts.push(`Fallback Google US Proxy thất bại: ${proxyErr.message}`);
  }

  throw new Error(`Tất cả kênh gọi Gemini đều không phản hồi:\n${allAttempts.join('\n')}`);
}

async function handleEvaluate(request, env, corsHeaders) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: 'Dữ liệu JSON không hợp lệ.' }, 400, corsHeaders);
  }

  if (!payload || !Array.isArray(payload.responses) || payload.responses.length === 0) {
    return jsonResponse({ error: 'Thiếu danh sách câu trả lời (responses).' }, 400, corsHeaders);
  }

  const promptText = buildIeltsPrompt(payload);
  const parts = [{ text: promptText }];

  // Đính kèm audio (nếu câu nào thiếu transcript) - Gắn kèm nhãn câu cụ thể để Gemini phân biệt chính xác
  payload.responses.forEach((item, idx) => {
    if (item.audioBase64 && item.audioBase64.length < 11_000_000 && !item.transcript) {
      parts.push({
        text: `\n[TỆP ÂM THANH TRẢ LỜI CỦA THÍ SINH CHO CÂU ${idx + 1} (${item.part || 'Speaking'}): "${item.question || ''}"]:`
      });
      parts.push({
        inlineData: {
          mimeType: item.audioMimeType || 'audio/webm',
          data: item.audioBase64
        }
      });
    }
  });

  try {
    const { text, modelUsed } = await callGemini(env, parts, payload.model);

    // Làm sạch nếu model lỡ bọc ```json
    const cleaned = text
      .trim()
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '');

    const evaluation = JSON.parse(cleaned);

    // Chuẩn hóa làm tròn điểm IELTS chuẩn xác
    if (evaluation.criteria) {
      const fc = roundIeltsBand(evaluation.criteria.fluencyCoherence?.band);
      const lr = roundIeltsBand(evaluation.criteria.lexicalResource?.band);
      const gra = roundIeltsBand(evaluation.criteria.grammaticalRange?.band);
      const pr = roundIeltsBand(evaluation.criteria.pronunciation?.band);

      if (evaluation.criteria.fluencyCoherence) evaluation.criteria.fluencyCoherence.band = fc;
      if (evaluation.criteria.lexicalResource) evaluation.criteria.lexicalResource.band = lr;
      if (evaluation.criteria.grammaticalRange) evaluation.criteria.grammaticalRange.band = gra;
      if (evaluation.criteria.pronunciation) evaluation.criteria.pronunciation.band = pr;

      if (fc && lr && gra && pr) {
        evaluation.overallBand = roundIeltsBand((fc + lr + gra + pr) / 4);
      } else {
        evaluation.overallBand = roundIeltsBand(evaluation.overallBand);
      }
    }

    return jsonResponse(
      {
        status: 'success',
        modelUsed,
        evaluation
      },
      200,
      corsHeaders
    );
  } catch (err) {
    return jsonResponse(
      {
        status: 'error',
        error: err.message || 'Lỗi khi chấm điểm bằng AI.'
      },
      502,
      corsHeaders
    );
  }
}

export default {
  async fetch(request, env) {
    const corsHeaders = getCorsHeaders(request, env);

    // Xử lý CORS Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/';

    // 1. Health check
    if (request.method === 'GET' && (path === '/' || path === '/health')) {
      return jsonResponse(
        {
          ok: true,
          service: 'Dream Education AI Speaking Worker',
          config: {
            geminiConfigured: Boolean(env.GEMINI_API_KEY),
            geminiModel: env.GEMINI_MODEL || 'gemini-2.0-flash',
            azureConfigured: Boolean(env.AZURE_SPEECH_KEY),
            azureRegion: env.AZURE_SPEECH_REGION || 'southeastasia'
          }
        },
        200,
        corsHeaders
      );
    }

    // 2. Cấp token Azure Speech (10 phút)
    if (request.method === 'GET' && path === '/api/azure-token') {
      return handleAzureToken(env, corsHeaders);
    }

    // 3. Chấm điểm IELTS Speaking bằng Gemini
    if (request.method === 'POST' && path === '/api/evaluate') {
      return handleEvaluate(request, env, corsHeaders);
    }

    return jsonResponse({ error: 'Not Found' }, 404, corsHeaders);
  }
};
