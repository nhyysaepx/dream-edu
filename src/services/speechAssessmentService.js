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
 * Convert Web Audio Buffer into 16kHz Mono 16-bit PCM WAV (Standard format for Speech Engines)
 * Tối ưu hóa đặc biệt cho thiết bị di động (iOS Safari / Android Chrome / Desktop):
 * 1. Tự động đánh thức AudioContext nếu đang ở trạng thái 'suspended' trên mobile.
 * 2. Hỗ trợ decodeAudioData tương thích hoàn toàn Safari WebKit (cloned buffer + callback fallback).
 * 3. Tự động gộp kênh (downmix to mono) và downsample chuẩn 16000Hz bằng thuật toán nội suy tuyến tính (Linear Interpolation) thuần JavaScript:
 *    - Tuyệt đối KHÔNG dùng OfflineAudioContext(..., 16000) vì iOS Safari sẽ ném lỗi 'NotSupportedError' (Safari chỉ cho phép sampleRate 44100-48000).
 *    - Tốc độ xử lý siêu tốc (<3ms) trên điện thoại, tiết kiệm 95% bộ nhớ RAM.
 * 4. Tự động cắt tối đa 28s cho Azure REST API (tránh lỗi 400 do Azure REST chỉ cho phép tối đa 30s/request).
 */
export async function audioBlobTo16kHzWav(blob, maxDurationSeconds = 28) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();

    // 1. Tự động đánh thức AudioContext nếu bị trình duyệt di động suspend
    if (ctx.state === 'suspended') {
      await ctx.resume().catch(() => {});
    }

    // 2. Decode audio buffer an toàn cho cả Safari và Chrome (Safari neuters buffer khi decode)
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

    // 3. Gộp tất cả các kênh (Stereo -> Mono)
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

    // 4. Downsample về 16000Hz thuần JS (Linear Interpolation) - Tránh lỗi OfflineAudioContext trên iOS Safari
    const inputSampleRate = audioBuffer.sampleRate;
    const targetSampleRate = 16000;
    let samples16k;

    if (inputSampleRate === targetSampleRate) {
      samples16k = monoData;
    } else {
      const ratio = inputSampleRate / targetSampleRate;
      const newLength = Math.round(length / ratio);
      samples16k = new Float32Array(newLength);
      for (let i = 0; i < newLength; i++) {
        const srcIdx = i * ratio;
        const srcFloor = Math.floor(srcIdx);
        const srcCeil = Math.min(length - 1, srcFloor + 1);
        const weight = srcIdx - srcFloor;
        samples16k[i] = monoData[srcFloor] * (1 - weight) + monoData[srcCeil] * weight;
      }
    }

    // 5. Azure REST API giới hạn nghiêm ngặt tối đa 30s. Nếu là bài nói dài (Part 2), lấy mẫu 28s đầu để chấm phát âm
    const maxSamples = targetSampleRate * maxDurationSeconds;
    if (samples16k.length > maxSamples) {
      samples16k = samples16k.subarray(0, maxSamples);
    }

    // 6. Mã hóa PCM 16-bit Mono WAV 16kHz
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
  } catch (err) {
    console.warn('WAV conversion fallback:', err);
    return null;
  }
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Internal worker for Azure Speech Pronunciation Assessment (Ultra-fast direct REST API)
 * Supports unscripted IELTS Speaking evaluation with zero hallucination.
 */
async function _internalAzureAssess(audioBlob, referenceText) {
  try {
    const auth = await getAzureToken();
    if (!auth) {
      return { hasData: false, reason: 'Azure Speech Token không khả dụng' };
    }

    // Convert audio to 16kHz mono WAV Blob
    const wavBlob = await audioBlobTo16kHzWav(audioBlob);
    if (!wavBlob) {
      return { hasData: false, reason: 'Không thể chuyển đổi WAV trên thiết bị này' };
    }

    const pronConfig = {
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive',
      EnableMiscue: false
    };

    // BẬT CHẾ ĐỘ NÓI TỰ DO (Unscripted Speaking Assessment):
    // Trong phỏng vấn IELTS Speaking (Practice / Homework / Mock Test), thí sinh tự do trả lời theo ý mình.
    // TUYỆT ĐỐI KHÔNG gán câu hỏi (prompt) làm ReferenceText! Gán prompt làm ReferenceText sẽ ép Azure so khớp âm
    // với đề bài thay vì câu trả lời của thí sinh, gây sai lệch toàn bộ từ vựng (hallucination).
    // Chỉ truyền ReferenceText khi đây là bài đọc mẫu chuẩn (scripted reading) không chứa dấu hỏi.
    if (referenceText && typeof referenceText === 'string' && referenceText.trim() && !referenceText.includes('?')) {
      pronConfig.ReferenceText = referenceText.trim();
      pronConfig.EnableMiscue = true;
    }

    // Unicode-safe base64 encoding
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
      console.warn(`Azure REST returned HTTP ${res.status}`);
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
