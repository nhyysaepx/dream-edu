// Google Apps Script Web App URL provided by user
export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyoijNihq4swDe0JC7zvXzSpCXSjq4_P5vcw8XM92TMRXaAOCv-ItpEfxhXKVkZpSyE6g/exec";

// Cloudflare Worker URL for AI Speaking Evaluator & Azure Speech Token
export const SPEAKING_WORKER_URL = "https://dream-edu-speaking.ngtquynh2001.workers.dev";

// Backup email recipient (FormSubmit service)
export const BACKUP_EMAIL_ENDPOINT = "https://formsubmit.co/ajax/ngtquynh2001@gmail.com";

/**
 * Format current timestamp to Vietnamese time string (HH:mm dd/MM/yyyy)
 */
export function getFormattedCurrentTime() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  return `${hours}:${minutes} ${day}/${month}/${year}`;
}

/**
 * Format duration seconds into human readable string (e.g. "15 phút 20 giây")
 */
export function formatDuration(seconds) {
  if (!seconds || isNaN(seconds) || seconds <= 0) return 'Dưới 1 phút';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs} giây`;
  if (secs === 0) return `${mins} phút`;
  return `${mins} phút ${secs} giây`;
}

/**
 * Send submission to Google Apps Script Webhook (Primary)
 */
async function sendToAppsScript(payload) {
  try {
    const bodyStr = JSON.stringify(payload);
    // Mode no-cors with text/plain ensures smooth direct POST across all browsers
    await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain"
      },
      body: bodyStr
    });
    return { success: true };
  } catch (err) {
    console.warn("Apps Script submission warning:", err);
    return { success: false, error: err };
  }
}

/**
 * Send backup notification via FormSubmit
 */
async function sendToFormSubmit(subject, formFields) {
  try {
    await fetch(BACKUP_EMAIL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        _subject: subject,
        ...formFields
      })
    });
  } catch (err) {
    console.warn("FormSubmit backup notice warning:", err);
  }
}

/**
 * Save to local submission history log
 */
function logLocalSubmission(record) {
  try {
    const raw = localStorage.getItem('dream_submission_log') || '[]';
    const list = JSON.parse(raw);
    list.unshift({
      ...record,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      loggedAt: new Date().toISOString()
    });
    // Keep last 100 entries
    localStorage.setItem('dream_submission_log', JSON.stringify(list.slice(0, 100)));
  } catch (e) {
    console.error('Failed to log submission locally:', e);
  }
}

/**
 * Submit Homework or Practice result
 */
export async function submitHomeworkOrPracticeResult({
  studentName,
  className,
  testTitle,
  score,
  total,
  percentage,
  duration,
  wrongAnswers = '',
  type = 'Homework' // 'Homework' | 'Practice'
}) {
  const formattedTime = getFormattedCurrentTime();
  const safePercentage = percentage !== undefined ? percentage : (total > 0 ? Math.round((score / total) * 100) : 0);
  const formattedDuration = typeof duration === 'number' ? formatDuration(duration) : (duration || 'N/A');
  const safeWrongAnswers = Array.isArray(wrongAnswers) ? wrongAnswers.join('; ') : (wrongAnswers || 'Không có (Đúng 100%)');

  const payload = {
    type: type, // 'Homework' | 'Practice'
    studentName: (studentName || '').trim() || 'Học sinh chưa đặt tên',
    className: (className || '').trim(), // e.g. PRE-001, BE-002, INT-01
    phone: '',
    email: '',
    testTitle: testTitle || `${type} Bài tập`,
    score: score || 0,
    total: total || 0,
    percentage: safePercentage,
    duration: formattedDuration,
    wrongAnswers: safeWrongAnswers,
    submittedAt: formattedTime
  };

  // Log locally
  logLocalSubmission(payload);

  // Gửi trực tiếp đến Google Apps Script Webhook (Ghi Sheets + Gửi 1 email duy nhất từ tài khoản của bạn)
  const result = await sendToAppsScript(payload);
  return result;
}

/**
 * Submit Vocab Study / Test result
 */
export async function submitVocabTestResult({
  studentName,
  className,
  testTitle,
  score,
  total,
  percentage,
  duration,
  wrongAnswers = ''
}) {
  return submitHomeworkOrPracticeResult({
    studentName,
    className,
    testTitle: testTitle || 'Kiểm tra Từ vựng',
    score,
    total,
    percentage,
    duration,
    wrongAnswers,
    type: 'Học từ vựng'
  });
}

/**
 * Submit Test Platform result (IELTS Mock Test Room)
 */
export async function submitTestPlatformResult({
  studentName = '',
  phone = '',
  email = '',
  testTitle,
  score,
  total,
  percentage,
  ieltsBand,
  duration,
  wrongAnswers = ''
}) {
  const formattedTime = getFormattedCurrentTime();
  const safePercentage = percentage !== undefined ? percentage : (total > 0 ? Math.round((score / total) * 100) : 0);
  const formattedDuration = typeof duration === 'number' ? formatDuration(duration) : (duration || 'N/A');
  const safeWrongAnswers = Array.isArray(wrongAnswers) ? wrongAnswers.join('; ') : (wrongAnswers || 'Không có (Đúng 100%)');
  const safeBand = ieltsBand ? `Band ${ieltsBand}` : 'N/A';

  const cleanName = (studentName || '').trim();
  const cleanPhone = (phone || '').trim();
  const cleanEmail = (email || '').trim();

  const payload = {
    type: 'Test Platform',
    studentName: cleanName || 'Thí sinh tự do (Ẩn danh)',
    className: '', // Left blank so Google Sheet column 'Lớp' remains clean for actual classes
    phone: cleanPhone,
    email: cleanEmail,
    testTitle: testTitle || 'IELTS Mock Test',
    score: score || 0,
    total: total || 0,
    percentage: safePercentage,
    ieltsBand: safeBand,
    duration: formattedDuration,
    wrongAnswers: safeWrongAnswers,
    submittedAt: formattedTime
  };

  // Log locally
  logLocalSubmission(payload);

  // Gửi trực tiếp đến Google Apps Script Webhook (Ghi Sheets + Gửi 1 email duy nhất từ tài khoản của bạn)
  const result = await sendToAppsScript(payload);
  return result;
}

/**
 * Submit IELTS Speaking evaluation result (Practice or Mock Test)
 * Automatically saves recording to Google Drive (Lớp / Buổi học / File) & logs to Google Sheets (tab Speaking)
 */
export async function submitSpeakingResult({
  studentName = '',
  className = '',
  sessionName = '',
  testTitle = '',
  overallBand = 0,
  criteria = {},
  azureMetrics = null,
  teacherSummary = '',
  keyErrors = '',
  transcript = '',
  audioBase64 = null,
  audioMimeType = 'audio/webm',
  type = 'Speaking Practice'
}) {
  const formattedTime = getFormattedCurrentTime();

  const payload = {
    isSpeaking: true,
    type,
    studentName: (studentName || '').trim() || 'Học sinh chưa đặt tên',
    className: (className || '').trim(),
    sessionName: sessionName || testTitle || 'Speaking Practice',
    testTitle: testTitle || sessionName || 'Speaking Practice',
    overallBand: overallBand || 0,
    criteria: criteria || {},
    azureMetrics: azureMetrics || {},
    teacherSummary: teacherSummary || '',
    keyErrors: keyErrors || '',
    transcript: transcript || '',
    audioBase64: audioBase64 || null,
    audioMimeType: audioMimeType || 'audio/webm',
    submittedAt: formattedTime
  };

  // Log locally for student history
  logLocalSubmission({
    ...payload,
    // Do not store base64 locally to avoid localStorage quota overflow
    audioBase64: audioBase64 ? '(audio stored in Google Drive)' : null
  });

  // Gửi đến Google Apps Script Webhook
  const result = await sendToAppsScript(payload);
  return result;
}
