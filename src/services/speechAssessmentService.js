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
 */
export async function audioBlobTo16kHzWav(blob) {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);

    // Resample to 16000Hz mono
    const targetSampleRate = 16000;
    const numChannels = 1;
    const offlineCtx = new OfflineAudioContext(numChannels, Math.ceil(audioBuffer.duration * targetSampleRate), targetSampleRate);
    const source = offlineCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(offlineCtx.destination);
    source.start(0);
    const renderedBuffer = await offlineCtx.startRendering();
    await ctx.close();

    // Encode PCM 16-bit mono WAV
    const channelData = renderedBuffer.getChannelData(0);
    const bufferLength = 44 + channelData.length * 2;
    const wavBuffer = new ArrayBuffer(bufferLength);
    const view = new DataView(wavBuffer);

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + channelData.length * 2, true);
    writeString(view, 8, 'WAVE');
    // FMT sub-chunk
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
    view.setUint16(22, 1, true); // NumChannels (1 = Mono)
    view.setUint32(24, targetSampleRate, true); // SampleRate
    view.setUint32(28, targetSampleRate * 2, true); // ByteRate
    view.setUint16(32, 2, true); // BlockAlign
    view.setUint16(34, 16, true); // BitsPerSample
    // Data sub-chunk
    writeString(view, 36, 'data');
    view.setUint32(40, channelData.length * 2, true);

    // Write PCM samples
    let offset = 44;
    for (let i = 0; i < channelData.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
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
      EnableMiscue: true
    };
    if (referenceText && referenceText.trim()) {
      pronConfig.ReferenceText = referenceText.trim();
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

      return {
        hasData: true,
        accuracyScore: Math.round(nbest.AccuracyScore || 0),
        fluencyScore: Math.round(nbest.FluencyScore || 0),
        prosodyScore: nbest.ProsodyScore != null && nbest.ProsodyScore > 0 ? Math.round(nbest.ProsodyScore) : null,
        pronScore: Math.round(nbest.PronScore || 0),
        transcript: data.DisplayText || nbest.Display || '',
        words: allWords,
        weakWords
      };
    }

    return { hasData: false, reason: 'Không có dữ liệu NBest' };
  } catch (err) {
    console.warn('Azure assessment exception:', err);
    return { hasData: false, error: err.message };
  }
}

/**
 * Perform Azure Pronunciation Assessment with guaranteed 3.2-second timeout protection
 */
export async function assessAudioWithAzure(audioBlob, referenceText = '') {
  const timeoutPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ hasData: false, reason: 'Azure assessment timeout (>3.2s)' });
    }, 3200);
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
  // 60 seconds timeout to prevent premature abort on mobile networks
  const timer = setTimeout(() => controller.abort(), 60000);

  try {
    const res = await fetch(`${SPEAKING_WORKER_URL}/api/evaluate`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gemini-3.8-flash',
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

    // Luồng 1: Worker đã chấm thành công
    if (data.status === 'success' && data.evaluation) {
      return {
        success: true,
        modelUsed: data.modelUsed,
        evaluation: data.evaluation
      };
    }

    // Luồng 2: Fallback kích hoạt gọi thẳng Gemini từ trình duyệt tại Việt Nam (Bypass lỗi vị trí IP và proxy)
    if (data.status === 'fallback_client' && data.geminiKey) {
      console.log('⚡ Đang kích hoạt Fallback Gemini Client trực tiếp...');
      const targetModel = data.model || 'gemini-3.8-flash';
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${data.geminiKey}`;

      const clientRes = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: data.promptText }]
            }
          ],
          generationConfig: {
            temperature: 0.25,
            responseMimeType: 'application/json'
          }
        })
      });

      if (!clientRes.ok) {
        const cErrText = await clientRes.text();
        throw new Error(`Gemini Direct Client lỗi (${clientRes.status}): ${cErrText.slice(0, 200)}`);
      }

      const clientJson = await clientRes.json();
      const rawText = clientJson?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        throw new Error('Gemini Direct Client không trả về nội dung đánh giá.');
      }

      const cleaned = rawText
        .trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '');
      const parsedEval = JSON.parse(cleaned);

      return {
        success: true,
        modelUsed: `${targetModel} (Direct Vietnam Client)`,
        evaluation: parsedEval
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
