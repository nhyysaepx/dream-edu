import { SPEAKING_WORKER_URL, submitSpeakingResult } from './submissionService.js';

/**
 * Cache for Azure Token (valid for 9 minutes, Azure token expires in 10 mins)
 */
let cachedAzureToken = null;
let tokenExpiresAt = 0;

/**
 * Fetch ephemeral Azure Speech auth token from Cloudflare Worker
 */
export async function getAzureToken() {
  const now = Date.now();
  if (cachedAzureToken && tokenExpiresAt > now) {
    return cachedAzureToken;
  }

  try {
    const res = await fetch(`${SPEAKING_WORKER_URL}/api/azure-token`);
    if (!res.ok) {
      console.warn(`Azure token endpoint HTTP ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (data.available && data.token) {
      cachedAzureToken = {
        token: data.token,
        region: data.region || 'southeastasia'
      };
      // Expire 1 minute earlier than actual token
      tokenExpiresAt = now + ((data.expiresInSeconds || 540) - 60) * 1000;
      return cachedAzureToken;
    }
    return null;
  } catch (err) {
    console.warn('Cannot fetch Azure token from worker:', err);
    return null;
  }
}

/**
 * Convert Blob to Base64 (pure base64 string, no data: prefix)
 */
export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      if (typeof dataUrl === 'string') {
        const base64 = dataUrl.split(',')[1] || '';
        resolve(base64);
      } else {
        resolve('');
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Chuyển đổi mảng mẫu âm thanh 16kHz Float32Array thành tệp WAV chuẩn PCM 16-bit Mono (44-byte RIFF header)
 */
function encodePcmToWav(samples16k, targetSampleRate = 16000) {
  const bufferLength = 44 + samples16k.length * 2;
  const wavBuffer = new ArrayBuffer(bufferLength);
  const view = new DataView(wavBuffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples16k.length * 2, true);
  writeString(view, 8, 'WAVE');
  // FMT sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, 1, true); // NumChannels (1 = Mono)
  view.setUint32(24, targetSampleRate, true); // SampleRate
  view.setUint32(28, targetSampleRate * 2, true); // ByteRate (16000 * 1 * 2)
  view.setUint16(32, 2, true); // BlockAlign
  view.setUint16(34, 16, true); // BitsPerSample
  // Data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, samples16k.length * 2, true);

  // Ghi các mẫu âm thanh PCM 16-bit kèm giới hạn chống vỡ âm (clipping)
  let offset = 44;
  for (let i = 0; i < samples16k.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples16k[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

/**
 * Trích xuất toàn bộ mảng mẫu âm thanh 16kHz Mono từ Blob âm thanh đầu vào
 * Tương thích 100% iOS Safari & Android Chrome (tự động resume AudioContext, downsample thuần JS)
 */
async function decodeAndDownsampleTo16kHz(blob) {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();

  if (ctx.state === 'suspended') {
    await ctx.resume().catch(() => {});
  }

  const copyBuffer = arrayBuffer.slice(0);
  const audioBuffer = await new Promise((resolve, reject) => {
    let isSettled = false;
    const safeResolve = (b) => {
      if (!isSettled) {
        isSettled = true;
        resolve(b);
      }
    };
    const safeReject = (e) => {
      if (!isSettled) {
        isSettled = true;
        reject(e);
      }
    };

    try {
      const res = ctx.decodeAudioData(copyBuffer, safeResolve, safeReject);
      if (res && typeof res.then === 'function') {
        res.then(safeResolve).catch(safeReject);
      }
    } catch (e) {
      safeReject(e);
    }
  });

  await ctx.close().catch(() => {});
  if (!audioBuffer) return null;

  // Gộp tất cả các kênh (Stereo -> Mono)
  const numChannels = audioBuffer.numberOfChannels;
  const length = audioBuffer.length;
  let monoData;

  if (numChannels === 1) {
    monoData = audioBuffer.getChannelData(0);
  } else {
    monoData = new Float32Array(length);
    const ch0 = audioBuffer.getChannelData(0);
    const ch1 = audioBuffer.getChannelData(1);
    for (let i = 0; i < length; i++) {
      monoData[i] = (ch0[i] + ch1[i]) * 0.5;
    }
  }

  // Downsample về 16000Hz thuần JS (Linear Interpolation) - Tránh lỗi OfflineAudioContext trên iOS Safari
  const inputSampleRate = audioBuffer.sampleRate;
  const targetSampleRate = 16000;

  if (inputSampleRate === targetSampleRate) {
    return monoData;
  }

  const ratio = inputSampleRate / targetSampleRate;
  const newLength = Math.round(length / ratio);
  const samples16k = new Float32Array(newLength);
  for (let i = 0; i < newLength; i++) {
    const srcIdx = i * ratio;
    const srcFloor = Math.floor(srcIdx);
    const srcCeil = Math.min(length - 1, srcFloor + 1);
    const weight = srcIdx - srcFloor;
    samples16k[i] = monoData[srcFloor] * (1 - weight) + monoData[srcCeil] * weight;
  }

  return samples16k;
}

/**
 * Convert Web Audio Buffer into 16kHz Mono 16-bit PCM WAV (Single Blob)
 */
export async function audioBlobTo16kHzWav(blob, maxDurationSeconds = 28) {
  try {
    const samples16k = await decodeAndDownsampleTo16kHz(blob);
    if (!samples16k) return null;

    const maxSamples = 16000 * maxDurationSeconds;
    const finalSamples = samples16k.length > maxSamples ? samples16k.subarray(0, maxSamples) : samples16k;
    return encodePcmToWav(finalSamples, 16000);
  } catch (err) {
    console.warn('WAV conversion fallback:', err);
    return null;
  }
}

/**
 * Chia nhỏ tệp âm thanh thành các đoạn WAV <= 25s để Azure REST API phân tích toàn bộ 100% bài nói (kể cả 120s)
 */
export async function audioBlobTo16kHzWavChunks(blob, chunkDurationSeconds = 25) {
  try {
    const samples16k = await decodeAndDownsampleTo16kHz(blob);
    if (!samples16k || samples16k.length === 0) return [];

    const targetSampleRate = 16000;
    // Nếu âm thanh ngắn (dưới 28 giây): Giữ nguyên 1 chunk duy nhất
    if (samples16k.length <= targetSampleRate * 28) {
      return [encodePcmToWav(samples16k, targetSampleRate)];
    }

    // Nếu âm thanh dài (như Part 2 từ 30s đến 120s): Tự động cắt thành các chunk 25s
    const chunkSamples = targetSampleRate * chunkDurationSeconds;
    const chunks = [];
    for (let offset = 0; offset < samples16k.length; offset += chunkSamples) {
      const chunkData = samples16k.subarray(offset, Math.min(samples16k.length, offset + chunkSamples));
      // Bỏ qua đoạn đuôi quá ngắn dưới 1 giây
      if (chunkData.length >= targetSampleRate * 1.0) {
        chunks.push(encodePcmToWav(chunkData, targetSampleRate));
      }
    }

    return chunks.length > 0 ? chunks : [encodePcmToWav(samples16k.subarray(0, targetSampleRate * 28), targetSampleRate)];
  } catch (err) {
    console.warn('WAV chunks conversion fallback:', err);
    return [];
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Đánh giá 1 chunk WAV đơn lẻ qua Azure Speech REST API
 */
async function _assessSingleWavChunk(wavBlob, referenceText, auth) {
  try {
    const pronConfig = {
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive',
      EnableMiscue: false
    };

    if (referenceText && typeof referenceText === 'string' && referenceText.trim() && !referenceText.includes('?')) {
      pronConfig.ReferenceText = referenceText.trim();
      pronConfig.EnableMiscue = true;
    }

    const pronHeader = btoa(unescape(encodeURIComponent(JSON.stringify(pronConfig))));
    const endpoint = `https://${auth.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`;

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${auth.token}`,
        'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
        'Pronunciation-Assessment': pronHeader,
        'Accept': 'application/json'
      },
      body: wavBlob
    });

    if (!res.ok) {
      return { hasData: false, status: res.status };
    }

    const data = await res.json();
    const nbest = data.NBest?.[0];

    if (nbest) {
      const allWords = (nbest.Words || []).map((w) => ({
        word: w.Word || '',
        accuracyScore: w.AccuracyScore != null ? w.AccuracyScore : 100,
        phonemes: (w.Phonemes || []).map((p) => ({
          phoneme: p.Phoneme || '',
          accuracyScore: p.AccuracyScore || 0
        }))
      }));

      const weakWords = allWords
        .filter((w) => w.accuracyScore < 75 && w.word && !/^[,.\?!]+$/.test(w.word))
        .map((w) => ({
          word: w.word,
          accuracyScore: w.accuracyScore,
          ipa: (w.phonemes || []).map((p) => p.phoneme).join('')
        }));

      const recognizedTranscript = (data.DisplayText || nbest.Display || '').trim();

      return {
        hasData: true,
        accuracyScore: Math.round(nbest.AccuracyScore || 0),
        fluencyScore: Math.round(nbest.FluencyScore || 0),
        prosodyScore: nbest.ProsodyScore != null && nbest.ProsodyScore > 0 ? Math.round(nbest.ProsodyScore) : null,
        pronScore: Math.round(nbest.PronScore || 0),
        transcript: recognizedTranscript,
        words: allWords,
        weakWords
      };
    }

    return { hasData: false, reason: data.RecognitionStatus || 'Không có dữ liệu NBest' };
  } catch (err) {
    return { hasData: false, error: err.message };
  }
}

/**
 * Internal worker for Azure Speech Pronunciation Assessment (Ultra-fast direct REST API)
 * Tự động chạy song song nhiều chunk nếu bài nói Part 2 kéo dài tới 120 giây:
 * - Đảm bảo phân tích ngữ âm toàn diện 100% bài nói từ giây 0 đến giây 120.
 * - Tuân thủ giới hạn 30s của Azure REST API.
 * - Tốc độ siêu tốc (~1-2s) nhờ cơ chế fetch song song Promise.all.
 */
async function _internalAzureAssess(audioBlob, referenceText) {
  try {
    const auth = await getAzureToken();
    if (!auth) {
      return { hasData: false, reason: 'Azure Speech Token không khả dụng' };
    }

    // Tự động phân tách thành các đoạn WAV <= 25s
    const wavChunks = await audioBlobTo16kHzWavChunks(audioBlob, 25);
    if (!wavChunks || wavChunks.length === 0) {
      return { hasData: false, reason: 'Không thể chuyển đổi WAV trên thiết bị này' };
    }

    // Nếu chỉ có 1 chunk (câu nói ngắn dưới 28s như Part 1/Part 3)
    if (wavChunks.length === 1) {
      return await _assessSingleWavChunk(wavChunks[0], referenceText, auth);
    }

    // Nếu bài nói dài (>28s, như Part 2 lên tới 120s): Chấm song song tất cả các đoạn qua Azure REST
    const chunkResults = await Promise.all(
      wavChunks.map((chunk) => _assessSingleWavChunk(chunk, '', auth))
    );

    const validResults = chunkResults.filter((r) => r && r.hasData);
    if (validResults.length === 0) {
      return chunkResults[0] || { hasData: false, reason: 'Không nhận được kết quả NBest từ Azure' };
    }

    // 1. Gộp toàn bộ Transcript từ tất cả các chunk thành bài nói 120s hoàn chỉnh
    const fullTranscript = validResults
      .map((r) => r.transcript)
      .filter(Boolean)
      .join(' ')
      .trim();

    // 2. Gộp danh sách từ và các từ phát âm lỗi trong suốt 120s
    const allWords = validResults.flatMap((r) => r.words || []);
    const weakWords = validResults.flatMap((r) => r.weakWords || []);

    // 3. Tính điểm trung bình có trọng số theo số lượng từ của từng chunk
    let totalWordCount = 0;
    let sumAccuracy = 0;
    let sumFluency = 0;
    let sumPron = 0;
    let sumProsody = 0;
    let prosodyCount = 0;

    validResults.forEach((r) => {
      const count = Math.max(1, r.words?.length || 1);
      totalWordCount += count;
      sumAccuracy += (r.accuracyScore || 0) * count;
      sumFluency += (r.fluencyScore || 0) * count;
      sumPron += (r.pronScore || 0) * count;
      if (r.prosodyScore != null) {
        sumProsody += r.prosodyScore * count;
        prosodyCount += count;
      }
    });

    return {
      hasData: true,
      accuracyScore: Math.round(sumAccuracy / totalWordCount),
      fluencyScore: Math.round(sumFluency / totalWordCount),
      prosodyScore: prosodyCount > 0 ? Math.round(sumProsody / prosodyCount) : null,
      pronScore: Math.round(sumPron / totalWordCount),
      transcript: fullTranscript,
      words: allWords,
      weakWords
    };
  } catch (err) {
    console.warn('Azure assessment exception:', err);
    return { hasData: false, error: err.message };
  }
}

/**
 * Perform Azure Pronunciation Assessment with realistic duration-adaptive timeout protection
 */
export async function assessAudioWithAzure(audioBlob, referenceText = '') {
  // Tính toán thời gian timeout linh hoạt dựa trên dung lượng/thời lượng audio
  // Audio 16kHz 16-bit mono WAV ~ 32.000 bytes/giây.
  const estSeconds = audioBlob?.size ? Math.max(5, Math.round(audioBlob.size / 32000)) : 15;
  // Cấp tối thiểu 18s, và thêm 1.2s cho mỗi giây audio (tối đa 65s cho bài nói Part 2)
  const timeoutMs = Math.min(65000, Math.max(18000, estSeconds * 1200 + 8000));

  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ hasData: false, reason: `Azure assessment timeout (>${Math.round(timeoutMs / 1000)}s)` });
    }, timeoutMs);
  });

  return Promise.race([
    _internalAzureAssess(audioBlob, referenceText),
    timeoutPromise
  ]);
}

/**
 * Call Cloudflare Worker AI IELTS Speaking Evaluation
 */
export async function evaluateSpeakingWithAI({
  mode = 'practice', // 'practice' | 'mock_test'
  testTitle = 'IELTS Speaking',
  targetLevel = 'IELTS',
  responses = [] // [{ question, part, durationSeconds, transcript, audioBase64, audioMimeType, azureMetrics }]
}) {
  const controller = new AbortController();
  // 90 seconds timeout for full multi-criteria IELTS AI evaluation across all parts
  const timer = setTimeout(() => controller.abort(), 90000);

  try {
    const res = await fetch(`${SPEAKING_WORKER_URL}/api/evaluate`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemini-2.0-flash',
        mode,
        testTitle,
        targetLevel,
        responses
      })
    });
    clearTimeout(timer);

    if (!res.ok) {
      const errText = await res.text();
      let parsedErr = errText;
      try {
        const json = JSON.parse(errText);
        parsedErr = json.error || errText;
      } catch (e) {}
      throw new Error(`Worker lỗi (${res.status}): ${parsedErr}`);
    }

    const data = await res.json();

    if (data.status === 'success' && data.evaluation) {
      return {
        success: true,
        modelUsed: data.modelUsed,
        evaluation: data.evaluation
      };
    }

    throw new Error(data.error || 'Không nhận được kết quả đánh giá từ AI.');
  } catch (err) {
    clearTimeout(timer);
    console.error('evaluateSpeakingWithAI error:', err);
    const isAbort = err.name === 'AbortError' || err.message?.includes('aborted');
    return {
      success: false,
      error: isAbort
        ? 'Quá trình phân tích mất nhiều thời gian hơn dự kiến do kết nối mạng. Vui lòng kiểm tra mạng và bấm Chấm điểm lại.'
        : err.message
    };
  }
}

/**
 * Format errors for teacher email & Google Sheets
 */
export function formatSpeakingErrorsForTeacher(evaluation) {
  if (!evaluation || !evaluation.criteria) return 'Không có';
  const errors = [];

  // Grammar errors
  const graErrors = evaluation.criteria.grammaticalRange?.errors || [];
  if (graErrors.length > 0) {
    errors.push('🔴 Lỗi Ngữ pháp:');
    graErrors.slice(0, 5).forEach((e, idx) => {
      errors.push(`  ${idx + 1}. "${e.original}" ➔ Sửa: "${e.corrected}" (${e.explanationVi})`);
    });
  }

  // Pronunciation errors
  const prWords = evaluation.criteria.pronunciation?.mispronouncedWords || [];
  if (prWords.length > 0) {
    errors.push('🟡 Lỗi Phát âm:');
    prWords.slice(0, 5).forEach((p, idx) => {
      errors.push(`  ${idx + 1}. "${p.word}" [${p.ipa || 'IPA'}] - ${p.issueVi}`);
    });
  }

  return errors.length > 0 ? errors.join('\n') : 'Không có lỗi lớn nổi bật.';
}

/**
 * Complete Flow: Submit evaluated speaking result to Google Apps Script (Drive + Sheets + Email)
 */
export async function submitSpeakingEvaluationToSystem({
  studentInfo = {},
  sessionName = '',
  testTitle = '',
  evaluation,
  azureMetrics = null,
  audioBase64 = null,
  audioMimeType = 'audio/webm',
  mode = 'practice',
  transcript = ''
}) {
  const crit = evaluation.criteria || {};
  const overallBand = evaluation.overallBand || 0;
  const teacherSummary = evaluation.teacherSummaryVi || '';
  const keyErrors = formatSpeakingErrorsForTeacher(evaluation);
  const type = mode === 'mock_test' ? 'IELTS Speaking Mock' : 'Speaking Practice';

  return submitSpeakingResult({
    studentName: studentInfo.name || 'Học sinh chưa đặt tên',
    className: studentInfo.className || '',
    sessionName: sessionName || testTitle || 'Speaking Practice',
    testTitle: testTitle || sessionName || 'Speaking Practice',
    overallBand,
    criteria: crit,
    azureMetrics: azureMetrics || {},
    teacherSummary,
    keyErrors,
    transcript: transcript || evaluation.transcripts?.[0]?.cleanedTranscript || '',
    audioBase64,
    audioMimeType,
    type
  });
}
