import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk';
import { SPEAKING_WORKER_URL, submitSpeakingResult } from './submissionService';

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
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) throw new Error('AudioContext not supported in this browser.');
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
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

/**
 * Perform Azure Pronunciation Assessment on a recorded audio Blob
 * Returns: { hasData, accuracyScore, fluencyScore, prosodyScore, pronScore, transcript, words, weakWords }
 */
export async function assessAudioWithAzure(audioBlob, referenceText = '') {
  try {
    const auth = await getAzureToken();
    if (!auth) {
      return { hasData: false, reason: 'Azure Speech Token không khả dụng' };
    }

    // Convert audio to 16kHz mono WAV for Azure Speech SDK PushStream
    const wavBlob = await audioBlobTo16kHzWav(audioBlob);
    const wavArrayBuffer = await wavBlob.arrayBuffer();

    const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(auth.token, auth.region);
    speechConfig.speechRecognitionLanguage = 'en-US';

    const format = SpeechSDK.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1);
    const pushStream = SpeechSDK.AudioInputStream.createPushStream(format);
    pushStream.write(wavArrayBuffer);
    pushStream.close();

    const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

    const pronConfig = new SpeechSDK.PronunciationAssessmentConfig(
      referenceText || '',
      SpeechSDK.PronunciationAssessmentGradingSystem.HundredMark,
      SpeechSDK.PronunciationAssessmentGranularity.Phoneme,
      true
    );

    pronConfig.phonemeAlphabet = 'IPA';
    if (typeof pronConfig.enableProsodyAssessment === 'function') {
      try {
        pronConfig.enableProsodyAssessment();
      } catch (e) {
        // Prosody is en-US specific, fallback gracefully if not supported
      }
    }

    pronConfig.applyTo(recognizer);

    // Continuous assessment
    return new Promise((resolve) => {
      const allWords = [];
      const transcriptParts = [];
      let totalAccuracy = 0;
      let totalFluency = 0;
      let totalProsody = 0;
      let totalPron = 0;
      let chunkCount = 0;

      recognizer.recognized = (s, e) => {
        if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech && e.result.text) {
          transcriptParts.push(e.result.text);
          const pronResult = SpeechSDK.PronunciationAssessmentResult.FromResult(e.result);
          if (pronResult) {
            totalAccuracy += pronResult.accuracyScore || 0;
            totalFluency += pronResult.fluencyScore || 0;
            if (pronResult.prosodyScore != null && pronResult.prosodyScore > 0) {
              totalProsody += pronResult.prosodyScore;
            }
            totalPron += pronResult.pronunciationScore || 0;
            chunkCount++;
          }

          // Parse detailed JSON for word & phoneme breakdown
          try {
            const rawJson = e.result.properties.getProperty(SpeechSDK.PropertyId.SpeechServiceResponse_JsonResult);
            if (rawJson) {
              const parsed = JSON.parse(rawJson);
              const nbest = parsed.NBest?.[0];
              if (nbest && Array.isArray(nbest.Words)) {
                for (const w of nbest.Words) {
                  const pronAssessment = w.PronunciationAssessment || {};
                  const phonemes = (w.Phonemes || []).map((p) => ({
                    phoneme: p.Phoneme || '',
                    accuracyScore: p.PronunciationAssessment?.AccuracyScore || 0
                  }));
                  allWords.push({
                    word: w.Word || '',
                    accuracyScore: pronAssessment.AccuracyScore != null ? pronAssessment.AccuracyScore : 100,
                    errorType: pronAssessment.ErrorType || 'None',
                    phonemes
                  });
                }
              }
            }
          } catch (jsonErr) {
            console.warn('Error parsing Azure detailed json:', jsonErr);
          }
        }
      };

      recognizer.canceled = (s, e) => {
        recognizer.stopContinuousRecognitionAsync(() => {
          recognizer.close();
        });
      };

      recognizer.sessionStopped = () => {
        recognizer.stopContinuousRecognitionAsync(() => {
          recognizer.close();
          const count = Math.max(1, chunkCount);
          const accuracyScore = Math.round(totalAccuracy / count);
          const fluencyScore = Math.round(totalFluency / count);
          const prosodyScore = totalProsody > 0 ? Math.round(totalProsody / count) : null;
          const pronScore = Math.round(totalPron / count);

          // Find weak words (< 75 accuracy)
          const weakWords = allWords
            .filter((w) => w.accuracyScore < 75 && w.word && !/^[,.\?!]+$/.test(w.word))
            .map((w) => ({
              word: w.word,
              accuracyScore: w.accuracyScore,
              ipa: w.phonemes.map((p) => p.phoneme).join('')
            }));

          resolve({
            hasData: chunkCount > 0,
            accuracyScore,
            fluencyScore,
            prosodyScore,
            pronScore,
            transcript: transcriptParts.join(' ').trim(),
            words: allWords,
            weakWords
          });
        });
      };

      recognizer.startContinuousRecognitionAsync(
        () => {
          // Feed finished
        },
        (err) => {
          console.warn('Azure recognizer error:', err);
          recognizer.close();
          resolve({ hasData: false, error: err.toString() });
        }
      );
    });
  } catch (err) {
    console.warn('Azure assessment exception:', err);
    return { hasData: false, error: err.message };
  }
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
  try {
    const res = await fetch(`${SPEAKING_WORKER_URL}/api/evaluate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode,
        testTitle,
        targetLevel,
        responses
      })
    });

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
    console.error('evaluateSpeakingWithAI error:', err);
    return {
      success: false,
      error: err.message
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
