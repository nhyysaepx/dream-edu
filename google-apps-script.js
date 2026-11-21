/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - HỆ THỐNG GHI NHẬN NỘP BÀI & ĐÁNH GIÁ SPEAKING DREAM EDUCATION
 * ==============================================================================
 * Tính năng:
 * 1. Nộp bài tập thường (Listening/Reading/Vocab): Ghi 9 cột chuẩn vào Sheet 1.
 * 2. Đánh giá IELTS Speaking (Practice & Mock Test):
 *    - Tự động tạo cây thư mục Google Drive: Lớp / Buổi học / File (có tên học sinh)
 *    - Tự động tạo tab riêng "Speaking" trong Google Sheets
 *    - Gửi email chi tiết (Band điểm, 4 tiêu chí, lỗi ngữ pháp/phát âm, link nghe lại)
 *
 * CÁCH DÙNG:
 * 1. Mở file Google Sheets quản lý của bạn.
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. XÓA TOÀN BỘ CODE CŨ và DÁN TOÀN BỘ CODE DƯỚI ĐÂY VÀO.
 * 4. Bấm biểu tượng đĩa mềm 💾 (Lưu).
 * 5. Bấm Triển khai (Deploy) -> Quản lý bản triển khai (Manage deployments) -> Chỉnh sửa (Edit) -> Chọn "Phiên bản mới" (New version) -> Triển khai (Deploy).
 * ==============================================================================
 */

// Hàm kiểm tra trạng thái hoạt động khi mở link trực tiếp trên trình duyệt
function doGet(e) {
  return ContentService.createTextOutput("✅ Dream Education Webhook & Speaking Evaluator is ACTIVE!")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Chạy hàm này một lần trong Apps Script editor để cấp quyền truy cập Google Drive nếu Google yêu cầu
function testDrivePermission() {
  const folders = DriveApp.getFoldersByName("DreamEdu_Speaking_Recordings");
  Logger.log("✅ Quyền Google Drive đã sẵn sàng hoạt động!");
}

/**
 * Xóa dấu tiếng Việt và ký tự đặc biệt để tạo tên thư mục/file an toàn trên Drive
 */
function sanitizeFolderName(str) {
  if (!str) return "Uncategorized";
  return String(str)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9_\-.\s]/g, "")
    .trim()
    .replace(/\s+/g, "_");
}

/**
 * Tìm hoặc tạo thư mục con trong một thư mục cha
 */
function getOrCreateFolder(parentFolder, folderName) {
  const safeName = folderName || "Chung";
  const folders = parentFolder.getFoldersByName(safeName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return parentFolder.createFolder(safeName);
}

/**
 * Lưu file ghi âm vào Google Drive theo cấu trúc: Lớp / Buổi học / File (có tên học sinh)
 */
function saveSpeakingRecordingToDrive(data, formattedTime) {
  if (!data.audioBase64) return null;

  try {
    // 1. Thư mục gốc trên Google Drive của giáo viên
    const rootFolderName = "DreamEdu_Speaking_Recordings";
    let rootFolder;
    const existingRoots = DriveApp.getFoldersByName(rootFolderName);
    if (existingRoots.hasNext()) {
      rootFolder = existingRoots.next();
    } else {
      rootFolder = DriveApp.createFolder(rootFolderName);
    }

    // 2. Thư mục Lớp (ví dụ: PRE-001, INT-01, hoặc "Thi_sinh_tu_do")
    const rawClass = (data.className || "").trim() || "Thi_sinh_tu_do";
    const classFolder = getOrCreateFolder(rootFolder, sanitizeFolderName(rawClass));

    // 3. Thư mục Buổi học / Đề thi (ví dụ: Buoi_05_Travel_and_Holidays, Mock_Test_01)
    const rawSession = (data.sessionName || data.testTitle || "Speaking_Session").trim();
    const sessionFolder = getOrCreateFolder(classFolder, sanitizeFolderName(rawSession));

    // 4. Tên file: [Tên học sinh]_[Tên bài]_[Band]_[Thời gian].webm
    const rawStudent = (data.studentName || "Hoc_sinh").trim();
    const bandTag = data.overallBand ? `Band${data.overallBand}` : "Practice";
    const safeDateTag = Utilities.formatDate(new Date(), "GMT+7", "yyyyMMdd_HHmm");
    const fileName = `${sanitizeFolderName(rawStudent)}_${bandTag}_${safeDateTag}.webm`;

    // Giải mã Base64 sang Blob
    const decodedBytes = Utilities.base64Decode(data.audioBase64);
    const mimeType = data.audioMimeType || "audio/webm";
    const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);

    const file = sessionFolder.createFile(blob);
    // Bật quyền xem bằng link để giáo viên bấm vào nghe ngay
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (e) {
      // Bỏ qua nếu tổ chức chặn share public, chủ tài khoản vẫn nghe được 100%
    }

    return {
      fileId: file.getId(),
      fileUrl: file.getUrl(),
      downloadUrl: file.getDownloadUrl(),
      fileName: fileName,
      folderPath: `${rootFolderName} / ${rawClass} / ${rawSession}`
    };
  } catch (err) {
    Logger.log("Lỗi khi lưu file ghi âm Drive: " + err.toString());
    return null;
  }
}

/**
 * Xử lý ghi nhận nộp bài Speaking vào sheet riêng "Speaking"
 */
function handleSpeakingSubmission(ss, data, formattedTime) {
  const teacherEmail = "ngtquynh2001@gmail.com";

  // 1. Lưu file ghi âm lên Drive
  const driveResult = saveSpeakingRecordingToDrive(data, formattedTime);
  const audioLink = driveResult ? driveResult.fileUrl : "";

  // 2. Tìm hoặc tạo sheet riêng "Speaking"
  let sheet = ss.getSheetByName("Speaking");
  if (!sheet) {
    sheet = ss.insertSheet("Speaking");
  }

  // Khởi tạo hàng tiêu đề nếu sheet mới
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Thời gian nộp",
      "Phân hệ",
      "Họ và tên",
      "Lớp",
      "Buổi học / Đề thi",
      "Overall Band",
      "FC (Trôi chảy)",
      "LR (Từ vựng)",
      "GRA (Ngữ pháp)",
      "PR (Phát âm)",
      "Azure Pron Score",
      "Link File Ghi Âm (Drive)",
      "Tóm tắt cho Giáo Viên",
      "Lỗi phát âm / Ngữ pháp nổi bật",
      "Transcript"
    ]);
    const headerRange = sheet.getRange(1, 1, 1, 15);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1e3a8a");
    headerRange.setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }

  const studentName = data.studentName || "Thí sinh tự do";
  const className = data.className || "";
  const sessionOrTest = data.sessionName || data.testTitle || "IELTS Speaking";
  const type = data.type || "Speaking Practice";
  const overallBand = data.overallBand ? `Band ${data.overallBand}` : "N/A";

  const crit = data.criteria || {};
  const fc = crit.fluencyCoherence?.band != null ? String(crit.fluencyCoherence.band) : "";
  const lr = crit.lexicalResource?.band != null ? String(crit.lexicalResource.band) : "";
  const gra = crit.grammaticalRange?.band != null ? String(crit.grammaticalRange.band) : "";
  const pr = crit.pronunciation?.band != null ? String(crit.pronunciation.band) : "";

  const azure = data.azureMetrics || {};
  const azureSummary = azure.hasData
    ? `Acc: ${azure.accuracyScore || 0} | Flu: ${azure.fluencyScore || 0} | Pron: ${azure.pronScore || 0}`
    : "Không có";

  const teacherSummary = data.teacherSummary || "";
  const errorsSummary = data.keyErrors || "";
  const transcript = data.transcript || "";

  // Ghi dòng vào sheet Speaking
  const driveFormula = audioLink ? `=HYPERLINK("${audioLink}", "🔊 Nghe bài nói")` : "Không có audio";
  sheet.appendRow([
    formattedTime,
    type,
    studentName,
    className,
    sessionOrTest,
    overallBand,
    fc,
    lr,
    gra,
    pr,
    azureSummary,
    driveFormula,
    teacherSummary,
    errorsSummary,
    transcript
  ]);

  // 3. Gửi Email thông báo chuyên sâu cho giáo viên
  const subject = `[Dream Edu - Speaking] ${studentName}${className ? ' (' + className + ')' : ''} - ${overallBand} (${sessionOrTest})`;

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; border: 1px solid #e2e8f0; border-radius: 14px; padding: 24px; background: #ffffff; color: #1e293b;">
      <div style="border-bottom: 2px solid #2c4482; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h2 style="color: #2c4482; margin: 0; font-size: 20px;">🎙️ Dream Education - Đánh Giá IELTS Speaking</h2>
          <span style="display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 6px;">
            ${type}
          </span>
        </div>
        <div style="text-align: right;">
          <div style="background: #1e3a8a; color: #ffffff; padding: 6px 14px; border-radius: 8px; font-size: 16px; font-weight: bold; display: inline-block;">
            ${overallBand}
          </div>
        </div>
      </div>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 18px;">
        <tr>
          <td style="padding: 8px 6px; font-weight: bold; color: #64748b; width: 140px; border-bottom: 1px solid #f1f5f9;">Thời gian nộp:</td>
          <td style="padding: 8px 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${formattedTime}</strong></td>
        </tr>
        <tr style="background: #f8fafc;">
          <td style="padding: 8px 6px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Học sinh:</td>
          <td style="padding: 8px 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${studentName}</strong> ${className ? `<span style="color: #1e40af;">(${className})</span>` : ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 6px; font-weight: bold; color: #64748b; border-bottom: 1px solid #f1f5f9;">Buổi học / Đề thi:</td>
          <td style="padding: 8px 6px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${sessionOrTest}</strong></td>
        </tr>
        ${audioLink ? `
        <tr style="background: #f0fdf4;">
          <td style="padding: 10px 6px; font-weight: bold; color: #166534; border-bottom: 1px solid #bbf7d0;">File ghi âm Drive:</td>
          <td style="padding: 10px 6px; border-bottom: 1px solid #bbf7d0;">
            <a href="${audioLink}" target="_blank" style="background: #16a34a; color: #ffffff; text-decoration: none; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: bold; display: inline-block;">
              ▶️ Bấm để nghe lại bài nói trên Google Drive
            </a>
            <div style="font-size: 11px; color: #64748b; margin-top: 4px;">
              Đã lưu gọn tại: <code>${driveResult.folderPath}</code>
            </div>
          </td>
        </tr>` : ''}
      </table>

      <!-- Bảng 4 tiêu chí IELTS -->
      <h3 style="color: #0f172a; font-size: 15px; margin: 16px 0 8px 0; border-left: 4px solid #1e3a8a; padding-left: 8px;">
        Chi Tiết 4 Tiêu Chí IELTS
      </h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
        <tr style="background: #f1f5f9; text-align: left;">
          <th style="padding: 8px; border: 1px solid #e2e8f0;">Tiêu chí</th>
          <th style="padding: 8px; border: 1px solid #e2e8f0; width: 60px; text-align: center;">Band</th>
          <th style="padding: 8px; border: 1px solid #e2e8f0;">Nhận xét chuyên môn</th>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e40af;">Fluency & Coherence</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${fc || '-'}</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${crit.fluencyCoherence?.summaryVi || 'Chưa có'}</td>
        </tr>
        <tr style="background: #fafafa;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e40af;">Lexical Resource</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${lr || '-'}</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${crit.lexicalResource?.summaryVi || 'Chưa có'}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e40af;">Grammatical Range</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${gra || '-'}</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${crit.grammaticalRange?.summaryVi || 'Chưa có'}</td>
        </tr>
        <tr style="background: #fafafa;">
          <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #1e40af;">Pronunciation</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: center; font-weight: bold;">${pr || '-'}</td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${crit.pronunciation?.summaryVi || 'Chưa có'}</td>
        </tr>
      </table>

      ${teacherSummary ? `
      <div style="margin-top: 14px; padding: 12px; background: #fefce8; border-radius: 8px; border: 1px solid #fef08a; font-size: 13px;">
        <strong style="color: #854d0e;">💡 Đánh giá dành riêng cho Giáo viên:</strong>
        <p style="margin: 6px 0 0 0; color: #713f12; line-height: 1.5;">${teacherSummary}</p>
      </div>` : ''}

      ${errorsSummary ? `
      <div style="margin-top: 12px; padding: 12px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca; font-size: 13px;">
        <strong style="color: #991b1b;">⚠️ Lỗi phát âm / ngữ pháp cần nhắc nhở trên lớp:</strong>
        <div style="margin-top: 6px; color: #7f1d1d; line-height: 1.5; white-space: pre-wrap;">${errorsSummary}</div>
      </div>` : ''}

      ${transcript ? `
      <div style="margin-top: 14px; padding: 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 12px;">
        <strong style="color: #475569;">📝 Transcript bài nói của học sinh:</strong>
        <p style="margin: 6px 0 0 0; color: #334155; line-height: 1.6; font-style: italic;">"${transcript}"</p>
      </div>` : ''}

      <div style="margin-top: 18px; padding: 10px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; font-size: 12px; color: #166534;">
        ✅ Đã tự động lưu vào Google Sheets (tab <strong>Speaking</strong>) và thư mục Google Drive theo đúng cấu trúc: <strong>${data.className || "Thi_sinh_tu_do"} / ${sessionOrTest}</strong>.
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: teacherEmail,
    subject: subject,
    htmlBody: htmlBody
  });

  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    type: "speaking",
    audioUrl: audioLink,
    folderPath: driveResult ? driveResult.folderPath : null
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Gọi Google Gemini API trực tiếp từ Google US Datacenter (Tránh hoàn toàn lỗi 'User location is not supported' do edge Hong Kong của Cloudflare)
 */
function handleGeminiEvaluation(data) {
  try {
    const apiKey = data.apiKey || PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    if (!apiKey) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "error",
        error: "Thiếu GEMINI_API_KEY để gọi AI."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    const primaryModel = data.model || "gemini-3.8-flash";
    const candidateModels = [
      primaryModel,
      "gemini-3.8-flash",
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-2.5-flash",
      "gemini-2.0-flash"
    ];
    // Remove duplicates
    const modelsToTry = candidateModels.filter((v, i, a) => a.indexOf(v) === i);

    const promptText = data.prompt || "";
    const payload = {
      contents: data.contents || [
        {
          role: "user",
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: data.generationConfig || {
        temperature: 0.25,
        responseMimeType: "application/json"
      }
    };

    let lastError = "";
    for (let i = 0; i < modelsToTry.length; i++) {
      const model = modelsToTry[i];
      const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent?key=" + apiKey;

      const res = UrlFetchApp.fetch(endpoint, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(payload),
        muteHttpExceptions: true
      });

      const resCode = res.getResponseCode();
      const resText = res.getContentText();

      if (resCode === 200) {
        const json = JSON.parse(resText);
        const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
        return ContentService.createTextOutput(JSON.stringify({
          status: "success",
          text: text,
          modelUsed: model
        })).setMimeType(ContentService.MimeType.JSON);
      } else {
        lastError = "Model " + model + " (" + resCode + "): " + resText.slice(0, 200);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: lastError || "Không thể gọi Gemini API."
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      error: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 0. Nếu là yêu cầu gọi AI Gemini (chạy từ máy chủ Google US, bypass hoàn toàn lỗi vị trí của Cloudflare Hong Kong)
    if (data.action === 'evaluateGemini' || data.action === 'callGemini') {
      return handleGeminiEvaluation(data);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      throw new Error("Không tìm thấy bảng tính Google Sheets");
    }

    const now = new Date();
    const formattedTime = Utilities.formatDate(now, "GMT+7", "HH:mm dd/MM/yyyy");

    // Phân luồng: Nếu là bài tập Speaking -> Xử lý riêng (Drive + Tab Speaking)
    const isSpeaking = data.isSpeaking || data.type === 'Speaking' || data.type === 'Speaking Practice' || data.type === 'IELTS Speaking Mock';
    if (isSpeaking) {
      return handleSpeakingSubmission(ss, data, formattedTime);
    }

    // =========================================================================
    // LUỒNG CŨ: BÀI TẬP LISTENING / READING / VOCAB / TEST PLATFORM (9 CỘT CHUẨN)
    // =========================================================================
    const sheet = ss.getActiveSheet() || ss.getSheets()[0];

    // Tự động tạo hàng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian nộp",
        "Phân hệ",
        "Họ và tên",
        "Lớp",
        "Tên bài làm / Bộ từ vựng",
        "Điểm số",
        "Tỷ lệ / IELTS Band",
        "Thời gian làm bài",
        "Chi tiết câu sai"
      ]);
      const headerRange = sheet.getRange(1, 1, 1, 9);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1e3a8a");
      headerRange.setFontColor("#ffffff");
    }

    const type = data.type || "Bài tập";
    const studentName = data.studentName || "Thí sinh tự do (Ẩn danh)";
    const className = data.className || "";
    const phone = data.phone || "";
    const email = data.email || "";
    const testTitle = data.testTitle || "Bài kiểm tra";
    const scoreText = `${data.score}/${data.total}`;
    const bandOrRate = data.ieltsBand ? `${data.ieltsBand} (${data.percentage}%)` : (data.percentage ? `${data.percentage}%` : "");
    const duration = data.duration || "N/A";
    const wrongAnswers = data.wrongAnswers || "Không có (Làm đúng 100%)";

    sheet.appendRow([
      formattedTime,
      type,
      studentName,
      className,
      testTitle,
      scoreText,
      bandOrRate,
      duration,
      wrongAnswers
    ]);

    const teacherEmail = "ngtquynh2001@gmail.com";
    const subject = `[Dream Edu - ${type}] ${studentName}${className ? ' (' + className + ')' : ''} - ${testTitle} (${scoreText})`;

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 620px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; background: #ffffff;">
        <div style="border-bottom: 2px solid #2c4482; padding-bottom: 12px; margin-bottom: 16px;">
          <h2 style="color: #2c4482; margin: 0; font-size: 20px;">🎓 Dream Education - Báo Cáo Nộp Bài</h2>
          <span style="display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 3px 8px; border-radius: 6px; font-size: 12px; font-weight: bold; margin-top: 6px;">
            ${type}
          </span>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; width: 150px; border-bottom: 1px solid #f1f5f9;">Thời gian nộp:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${formattedTime}</strong></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Họ và tên:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${studentName}</strong></td>
          </tr>
          ${className ? `
          <tr>
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Lớp học:</td>
            <td style="padding: 10px 8px; color: #1e40af; font-weight: bold; border-bottom: 1px solid #f1f5f9;">${className}</td>
          </tr>` : ''}
          ${phone ? `
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Số điện thoại:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${phone}</td>
          </tr>` : ''}
          ${email ? `
          <tr>
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Email:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${email}</td>
          </tr>` : ''}
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Tên bài làm:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;"><strong>${testTitle}</strong></td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Điểm số:</td>
            <td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">
              <span style="color: #16a34a; font-size: 16px; font-weight: bold;">${scoreText}</span>
              ${data.ieltsBand ? `<span style="margin-left: 8px; background: #faf5ff; color: #7e22ce; padding: 2px 8px; border-radius: 6px; font-weight: bold;">${data.ieltsBand}</span>` : ''}
              <span style="margin-left: 6px; color: #64748b; font-size: 13px;">(${data.percentage}%)</span>
            </td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; border-bottom: 1px solid #f1f5f9;">Thời gian làm bài:</td>
            <td style="padding: 10px 8px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${duration}</td>
          </tr>
          <tr>
            <td style="padding: 10px 8px; font-weight: bold; color: #475569; vertical-align: top;">Danh sách câu sai:</td>
            <td style="padding: 10px 8px; color: #dc2626; font-size: 13px; line-height: 1.5;">${wrongAnswers}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; padding: 12px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; font-size: 12px; color: #166534;">
          ✅ Dữ liệu đã được tự động lưu vào Google Sheets quản lý điểm của bạn theo 9 cột chuẩn.
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: teacherEmail,
      subject: subject,
      htmlBody: htmlBody
    });

    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
