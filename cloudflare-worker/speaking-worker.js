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
 * Xây dựng Prompt giám khảo IELTS Speaking nghiêm túc, sát thực tế
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
      let azureSummary = 'Không có dữ liệu đo Azure (hãy đánh giá qua audio/transcript).';
      if (azure && azure.hasData) {
        const weakWords = (azure.weakWords || [])
          .slice(0, 15)
          .map((w) => `"${w.word}" (score: ${w.accuracyScore}/100${w.ipa ? `, IPA lỗi: /${w.ipa}/` : ''})`)
          .join('; ');
        azureSummary = [
          `- Accuracy (Độ chính xác âm): ${azure.accuracyScore}/100`,
          `- Fluency (Độ trôi chảy): ${azure.fluencyScore}/100`,
          azure.prosodyScore != null ? `- Prosody (Ngữ điệu/trọng âm): ${azure.prosodyScore}/100` : null,
          `- Pronunciation tổng hợp Azure: ${azure.pronScore}/100`,
          weakWords ? `- Các từ phát âm yếu (<75 điểm): ${weakWords}` : '- Không có từ phát âm dưới 75 điểm.'
        ]
          .filter(Boolean)
          .join('\n');
      }

      return `
### Câu ${idx + 1} (${item.part || 'Speaking'})
- Câu hỏi / Đề bài: ${item.question || '(Không có đề)'}
- Thời lượng nói: ${item.durationSeconds || 0} giây
- Transcript học sinh nói: ${item.transcript ? `"${item.transcript}"` : '(Chưa có transcript - hãy nghe trực tiếp file audio đính kèm để gỡ băng chính xác)'}
- Chỉ số đo vật lý từ Azure Speech Pronunciation Assessment:
${azureSummary}
`.trim();
    })
    .join('\n\n');

  return `
Bạn là Giám khảo IELTS Speaking chính thức (Examiner chuẩn IDP / British Council) đang chấm bài cho học viên tại trung tâm Dream Education.
Hãy chấm điểm NGHIÊM TÚC, KHÁCH QUAN, KHÔNG NỚI TAY (không tự động cho 6.5–7.0 nếu bài nói ngắn, thiếu phát triển ý, lặp từ hoặc sai ngữ pháp cơ bản).

THÔNG TIN BÀI LÀM:
- Chế độ: ${mode === 'mock_test' ? 'IELTS Speaking Mock Test (Thi thử chuẩn)' : 'Speaking Practice / Homework'}
- Tên bài: ${testTitle}
- Cấp độ mục tiêu: ${targetLevel}

DỮ LIỆU BÀI NÓI CỦA HỌC SINH:
${formattedQA}

QUY TẮC CHẤM ĐIỂM BẮT BUỘC:
1. Nếu có dữ liệu đo từ Azure Speech, BẮT BUỘC neo điểm tiêu chí Pronunciation và một phần Fluency theo thang quy đổi khách quan sau (tránh chấm quá cao so với phát âm thật):
   - Azure PronScore >= 90 -> Pronunciation ~ 7.5 - 8.5
   - Azure PronScore 80 - 89 -> Pronunciation ~ 6.5 - 7.5
   - Azure PronScore 70 - 79 -> Pronunciation ~ 5.5 - 6.5
   - Azure PronScore 55 - 69 -> Pronunciation ~ 4.5 - 5.5
   - Azure PronScore < 55 -> Pronunciation <= 4.5
2. Nếu học sinh nói quá ngắn (ví dụ Part 1 dưới 10 từ, hoặc Part 2 dưới 45 giây / dưới 60 từ), hoặc lạc đề, phải trừ điểm rõ rệt ở Fluency & Coherence và nhắc trong answerQuality.
3. Nếu không có transcript sẵn nhưng có file audio đính kèm, hãy gỡ băng (transcript) trung thực kể cả lỗi ngữ pháp, từ ngập ngừng (um, uh, like...) rồi mới chấm.
4. Tất cả giải thích, nhận xét cho học sinh và giáo viên viết bằng **tiếng Việt** tự nhiên, rõ ràng, khích lệ nhưng thẳng thắn. Các ví dụ tiếng Anh, lỗi sai và bài mẫu nâng cấp viết bằng **tiếng Anh**.
5. Điểm từng tiêu chí và điểm tổng (overallBand) phải là bội số của 0.5 (từ 1.0 đến 9.0). overallBand = trung bình cộng 4 tiêu chí làm tròn đến 0.5 gần nhất.

TRẢ VỀ DUY NHẤT MỘT JSON HỢP LỆ THEO ĐÚNG CẤU TRÚC SAU (không thêm markdown \`\`\`json):
{
  "overallBand": 6.0,
  "transcripts": [
    {
      "questionIndex": 0,
      "cleanedTranscript": "Bản gỡ băng chính xác câu trả lời của học sinh"
    }
  ],
  "criteria": {
    "fluencyCoherence": {
      "band": 6.0,
      "summaryVi": "Nhận xét ngắn gọn 2-3 câu về độ trôi chảy, tốc độ, ngập ngừng và mạch lạc ý.",
      "strengthsVi": ["Điểm mạnh 1"],
      "weaknessesVi": ["Điểm cần cải thiện 1"]
    },
    "lexicalResource": {
      "band": 6.0,
      "summaryVi": "Nhận xét về vốn từ, collocations, paraphrasing và lặp từ.",
      "goodVocab": ["từ/cụm từ tốt học sinh đã dùng"],
      "suggestedUpgrades": [
        {
          "original": "cụm từ đơn giản học sinh dùng",
          "better": "cụm từ/collocation Band 7.5+ thay thế",
          "meaningVi": "nghĩa tiếng Việt ngắn gọn"
        }
      ]
    },
    "grammaticalRange": {
      "band": 5.5,
      "summaryVi": "Nhận xét về độ đa dạng cấu trúc câu (câu đơn/câu phức/thì) và độ chính xác.",
      "errors": [
        {
          "original": "câu/cụm học sinh nói sai",
          "corrected": "câu/cụm sửa lại chuẩn xác",
          "explanationVi": "giải thích lỗi ngắn gọn bằng tiếng Việt"
        }
      ]
    },
    "pronunciation": {
      "band": 6.0,
      "summaryVi": "Nhận xét cụ thể về âm cuối (ending sounds), trọng âm, ngữ điệu và độ dễ nghe dựa trên Azure/audio.",
      "mispronouncedWords": [
        {
          "word": "từ phát âm chưa chuẩn",
          "ipa": "/phiên âm IPA chuẩn/",
          "issueVi": "mô tả ngắn lỗi thường gặp & cách sửa khẩu hình"
        }
      ]
    }
  },
  "answerQuality": {
    "isOnTopic": true,
    "relevanceVi": "Đánh giá mức độ bám sát câu hỏi và phát triển ý (có giải thích/ví dụ chưa).",
    "lengthCommentVi": "Nhận xét độ dài câu trả lời so với yêu cầu IELTS."
  },
  "upgradedSampleAnswers": [
    {
      "questionIndex": 0,
      "targetBand": "Band 7.5 - 8.0",
      "sampleAnswer": "Phiên bản nâng cấp tự nhiên, giữ đúng ý của học sinh nhưng dùng từ vựng & cấu trúc Band 7.5-8.0."
    }
  ],
  "nextStepTipsVi": [
    "Lời khuyên hành động cụ thể 1",
    "Lời khuyên hành động cụ thể 2",
    "Lời khuyên hành động cụ thể 3"
  ],
  "teacherSummaryVi": "Tóm tắt chuyên môn 3-4 câu dành cho giáo viên (điểm nổi bật, lỗ hổng lớn nhất cần sửa trên lớp cho học sinh này)."
}
`.trim();
}

/**
 * Gọi Gemini thông qua Google Apps Script Web App (chạy tại Google US Datacenter)
 * Giúp giải quyết triệt để lỗi 'User location is not supported' do edge Hong Kong của Cloudflare
 */
async function callGeminiViaAppsScript(env, contents, generationConfig, model) {
  const appsScriptUrl = (env.APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbyoijNihq4swDe0JC7zvXzSpCXSjq4_P5vcw8XM92TMRXaAOCv-ItpEfxhXKVkZpSyE6g/exec').trim();
  const apiKey = env.GEMINI_API_KEY;

  const res = await fetch(appsScriptUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8'
    },
    body: JSON.stringify({
      action: 'callGemini',
      apiKey,
      model: model || 'gemini-3.8-flash',
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
      modelUsed: `${json.modelUsed || 'gemini-3.8-flash'} (via Google US proxy)`
    };
  }

  throw new Error(json.error || 'Google Apps Script không trả về nội dung AI hợp lệ.');
}

/**
 * Gọi Gemini API với cơ chế tự động fallback model, chống lỗi location Cloudflare Hong Kong
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
    'gemini-3.5-flash-lite',
    'gemini-3.5-flash'
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
  let isLocationBlocked = false;

  // 1. Thử gọi trực tiếp Google Gemini API
  for (const model of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify(requestBody)
        });

        if (res.ok) {
          const data = await res.json();
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return { text, modelUsed: model };
          }
        }

        const errText = await res.text();
        const summary = `Model ${model} (${res.status}): ${errText.slice(0, 250)}`;
        allAttempts.push(summary);

        // Nếu Google trả về lỗi 'User location is not supported', dừng ngay để không mất thời gian thử các model khác!
        if (errText.includes('User location is not supported') || (res.status === 400 && errText.includes('FAILED_PRECONDITION'))) {
          isLocationBlocked = true;
          break;
        }

        // Nếu rate-limit (429) hoặc server bận (503), đợi 1.2s
        if ((res.status === 429 || res.status === 503) && attempt === 0) {
          await new Promise((r) => setTimeout(r, 1200));
          continue;
        }
        break;
      } catch (fErr) {
        allAttempts.push(`Fetch error ${model}: ${fErr.message}`);
        break;
      }
    }

    if (isLocationBlocked) {
      break;
    }
  }

  // 2. Tự động chuyển qua Google Apps Script proxy (chạy trong US Datacenter của Google)
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

  // Đính kèm audio (nếu gửi lên để Gemini nghe trực tiếp — tối đa ~8MB để đảm bảo tốc độ)
  for (const item of payload.responses) {
    if (item.audioBase64 && item.audioBase64.length < 11_000_000) {
      parts.push({
        inlineData: {
          mimeType: item.audioMimeType || 'audio/webm',
          data: item.audioBase64
        }
      });
    }
  }

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
            geminiModel: env.GEMINI_MODEL || 'gemini-2.5-flash',
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

    // 2.1 Danh sách model Gemini được phép dùng của API Key
    if (request.method === 'GET' && path === '/api/models') {
      try {
        const apiKey = env.GEMINI_API_KEY;
        if (!apiKey) {
          return jsonResponse({ error: 'GEMINI_API_KEY chưa cấu hình' }, 400, corsHeaders);
        }
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await res.json();
        return jsonResponse(data, 200, corsHeaders);
      } catch (err) {
        return jsonResponse({ error: err.message }, 500, corsHeaders);
      }
    }

    // 3. Chấm điểm IELTS Speaking bằng Gemini
    if (request.method === 'POST' && path === '/api/evaluate') {
      return handleEvaluate(request, env, corsHeaders);
    }

    return jsonResponse({ error: 'Not Found' }, 404, corsHeaders);
  }
};
