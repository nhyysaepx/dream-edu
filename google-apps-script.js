/**
 * ==============================================================================
 * GOOGLE APPS SCRIPT - HỆ THỐNG GHI NHẬN NỘP BÀI DREAM EDUCATION
 * (Phiên bản tách riêng 3 cột: Lớp | Số điện thoại | Email)
 * ==============================================================================
 * CÁCH DÙNG:
 * 1. Mở file Google Sheets quản lý điểm của bạn.
 * 2. Vào Tiện ích mở rộng (Extensions) -> Apps Script.
 * 3. XÓA TOÀN BỘ CODE CŨ và DÁN TOÀN BỘ CODE DƯỚI ĐÂY VÀO.
 * 4. Bấm biểu tượng đĩa mềm 💾 (Lưu).
 * 5. Bấm Triển khai (Deploy) -> Tùy chọn triển khai mới (New deployment).
 *    - Bấm bánh răng ⚙️ -> chọn "Ứng dụng web" (Web app).
 *    - Thực thi dưới dạng (Execute as): Tôi (Me / ngtquynh2001@gmail.com).
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone).
 *    - Bấm "Triển khai" (Deploy).
 * ==============================================================================
 */

// Hàm kiểm tra trạng thái hoạt động khi mở link trực tiếp trên trình duyệt
function doGet(e) {
  return ContentService.createTextOutput("✅ Dream Education Webhook is ACTIVE and running successfully!")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = (ss && ss.getActiveSheet()) ? ss.getActiveSheet() : (ss ? ss.getSheets()[0] : null);
    if (!sheet) {
      throw new Error("Không tìm thấy trang tính Google Sheets");
    }
    const data = JSON.parse(e.postData.contents);

    const now = new Date();
    const formattedTime = Utilities.formatDate(now, "GMT+7", "HH:mm dd/MM/yyyy");

    // Tự động tạo hàng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Thời gian nộp",
        "Phân hệ",
        "Họ và tên",
        "Lớp",
        "Số điện thoại",
        "Email",
        "Tên bài kiểm tra / Bộ từ vựng",
        "Điểm số",
        "IELTS Band / Tỷ lệ",
        "Thời gian làm",
        "Danh sách câu sai"
      ]);
      const headerRange = sheet.getRange(1, 1, 1, 11);
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

    // 1. Ghi một dòng vào Google Sheets với 3 cột riêng: Lớp | Số điện thoại | Email
    sheet.appendRow([
      formattedTime,
      type,
      studentName,
      className,
      phone,
      email,
      testTitle,
      scoreText,
      bandOrRate,
      duration,
      wrongAnswers
    ]);

    // 2. Gửi email thông báo về hộp thư giáo viên
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
          ✅ Dữ liệu đã được tự động lưu vào Google Sheets quản lý điểm của bạn (các cột Lớp, SĐT, Email riêng biệt).
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
