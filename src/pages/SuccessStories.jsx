import React from 'react';
import { Link } from 'react-router-dom';

export default function SuccessStories() {
  const testimonials = [
    {
      id: 1,
      name: 'Elena Rodriguez',
      placement: "Đại học Oxford '24",
      rating: 5,
      comment: '"Khóa học IELTS Học thuật thực sự là một bước ngoặt đối với em. Em bắt đầu với điểm số 6.0 và cần đạt 7.5 để nộp hồ sơ vào Oxford. Các giảng viên không chỉ dạy cách làm bài thi, họ còn dạy em cách giao tiếp ở trình độ học thuật cao nhất."',
      score: 'IELTS 8.0',
      increase: 'Tăng 2.0 điểm',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo66-MqiEJZZDm_5UyxyQy3iXmK2tw2ROc6uRwrvVvM5pxhKOIw7eMn6tniEkjVgfdxlD2-25Dygz_DWkafrQQrt8JAEdi3kPDZK0z4oez67_N7_2osoNsMPVS7VbY0tEXIqz6E_Kwe7o_DsXLEbn8hJJWJevPE-IC0GEIviYlH_0I8LX0QzbMv84JFn0Cf-nmaTfskPVh9EBnNd-lak-PKA9lzfcghCxVAH85J6_ZNEKfMpxfm78aa8QEOn0rcwSBkEepWS61ZHQ'
    },
    {
      id: 2,
      name: 'Jin-Woo Park',
      placement: "Đại học Toronto '23",
      rating: 5,
      comment: '"Những nhận xét chi tiết, cá nhân hóa cho bài viết của em là yếu tố tạo nên sự khác biệt. Hệ thống quản lý học tập của Dream Education vượt trội hơn hẳn các nền tảng khác em từng dùng. Em đạt mục tiêu chỉ sau 8 tuần."',
      score: 'IELTS 7.5',
      increase: 'Tăng 1.5 điểm',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIcm0-UtT7Ka-10Njfs0g8mHeNSLagtjSOBigGV8oOR2Ute-uXPoFNwBhqVTOC35AsCh9ofau-tif-b17_NoyQrKmhM0P0OW72J60qRUB7hre6nKuRJ5t6xhVBdjQNpdWuL4SVniT5dyJE1YhM3_xSxLyHo0fmLumIW3Jltipzv42UJoY_WWsNC9e8_gK41mwXYXix911E9tat6ixs-y0W2syTswvYbnPYRaWKv7urS2xMp05sOpuDHh89CxpG9iOjl88YVoucte4'
    },
    {
      id: 3,
      name: 'Amina Al-Farsi',
      placement: 'Học viện LSE (London School of Economics)',
      rating: 5,
      comment: '"Không có nền tảng tiếng Anh tốt từ đầu, em từng rất sợ phần thi Nói. Giảng viên hướng dẫn của em đã tạo một môi trường an toàn để em thoải mái nói, sai và sửa. Giờ đây em đã hoàn toàn tự tin hòa nhập tại London."',
      score: 'IELTS 8.5',
      increase: 'Tăng 2.5 điểm',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3lfCjvVgBLjttFa9kbYXuNEUdplnEmJKYg6NRCL-xjIeAjF4wDjlZCaQOsDz2CMrA16YccY__bmEEFl_Z_vM9mmnaMykGIj0l2dS3gKLxLYzQKEiYnieuRdPVpoh9mYuRqXPP9nmIlGje6I5G-JI9eREMCDc3JoZDMbhQTkihZR-1d2qv4Ro5oq1pKYIbp2PtQLhg00--L-crXPHsKHKWq4HgJYIXRbjTktpQbMKJR0eIHP4S603jWbiC-Korp19jJPrRqGYUtIM'
    }
  ];

  const improvements = [
    { pre: '5.0', post: '7.0' },
    { pre: '5.5', post: '8.0' },
    { pre: '6.0', post: '7.5' },
    { pre: '6.5', post: '8.5' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 px-margin-mobile overflow-hidden text-left">
        <div className="max-w-container-max mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md mb-6 font-semibold border border-secondary/20 border-secondary/20">
              KẾT QUẢ ĐÃ ĐƯỢC CHỨNG MINH
            </span>
            <h1 className="font-display-lg text-display-lg md:text-display-lg text-primary mb-6 leading-tight font-bold">
              Đảm bảo vững chắc cho <span className="text-secondary">Tương lai Quốc tế</span> của bạn.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-lg">
              Đồng hành cùng hàng ngàn học viên đã đạt điểm số IELTS mục tiêu và giành học bổng tại các trường đại học hàng đầu thế giới thông qua chương trình đào tạo ưu tú của chúng tôi.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="font-label-lg text-label-lg font-bold">95% Học viên Đạt mục tiêu</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-lg text-label-lg font-bold">Đánh giá 4.9/5 từ Học viên</span>
              </div>
            </div>
          </div>
          <div className="relative w-full">
            <div className="aspect-square rounded-3xl overflow-hidden card-shadow border-4 border-white">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYA9bvPKBRXGuNTkKGsneYUM2jc44ZMkJKu5AYcGia4PEoi1gUddyQE5p9SeDy0tgGJmwojtztBYp_qHp1_aBEZcDovdzeUqKvJPwkHcaHCBRmNRhL_L3HptJBY0GgOAFIHuZ3AMi9hCldqhtUSaG1VpUTw_cAxre1FNQwEOcwlDEpGYRp7KpxzXpdLobNCmNiEv2qygR09kYhIIzmt9_cLVVLMLi0TR2XoSk8u65YcJl5LDPu04jNm9ETLnKF9EBNAEj9TZhv2Xg"
                alt="Học viên tự tin thành công"
              />
            </div>
            {/* Animated floating stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl card-shadow animate-float border border-outline-variant/20">
              <div className="flex items-center gap-4">
                <div className="bg-secondary-container p-3 rounded-xl">
                  <span className="material-symbols-outlined text-on-secondary-container">trending_up</span>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary font-bold">5.5 → 8.0</div>
                  <div className="font-label-md text-label-md text-on-surface-variant">Điểm tăng trung bình</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background icon layout */}
        <div className="absolute top-0 right-0 -z-10 opacity-[0.03] pointer-events-none">
          <span className="material-symbols-outlined text-[400px] text-primary">school</span>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <section className="py-16 md:py-20 px-margin-mobile bg-surface-container-low text-left">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-primary p-10 rounded-[2rem] text-on-primary flex flex-col justify-between shadow-md">
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-4 text-on-primary font-bold">95% cải thiện điểm số</h2>
                <p className="font-body-md text-body-md opacity-80 leading-relaxed">
                  Phương pháp sư phạm chuyên biệt của chúng tôi đảm bảo hầu hết học viên đều vượt qua kết quả bài đánh giá năng lực ban đầu trong vòng 12 tuần học tập.
                </p>
              </div>
              <div className="mt-8 flex -space-x-3 items-center">
                <img
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSDxb9N3kzm_8zyiv59uBDQBVU6yT9v5MnT80JUkbTEwhAGc3tc00nChkcKI2bTE8IqTkjwcOZQzvGsCV1aPs2RID2SNdxyK81fBAcgdSRTJGg-xyFD5rWQpvzHv4ft0hTyCTiOStUm8o2jg7Ll4Oe2joPC9mH-LtbMHxJJ8khIBJsIpF4YcXv-_U6p2tOey6iOx96-WEVge-51IUzru8v65G1RZStMnAJcm5iwd8JRzRPWccl7zAnI7yP5Dkd8T6Y-bLIhCwCkJQ"
                  alt="Ảnh chân dung học viên"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBj4vtH7JDIdDLH_k61M-fosoH9nZ1TFXSbMwS4pzFi6AH858vB-M0Q3s5m6qdwln4TdGdklC0bG_r1YumRiTzJn5QSjsLP4mvrX24exooyRcWhSp-UsyAis-U1feKksjOrbJyW1YVcei0rV1IfPvQ4HkZJKgNR0EEZX4xl_QdHQy-XMTV7onpKu4_HmsKOBeVWC6jwQCF16gbAgaa5sgFQIYAh6DU8brYsm4e10iR8CQPFfWEjylcKtLFpsZ4BKGfktIKaYezBlG4"
                  alt="Ảnh chân dung học viên"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-primary object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY7Er15PwH2-EHi79K9y-O_5NUT6xNVHCOb4Q6Y0rud6VkIBZnLzGNu5ipgvDvmFmj6iFq2b7AjlDSgQBiYXXjzqYeG8of2MbF3eQnU2aillbADM1B2wR0BbJ81DDolRoyyIPrXQ_gmhpq6zbLxUGJTtfF_NZi6pn9d0O5ddmrqL0mCI56vguyPiEo47hDrvd4Za1xBqSC28ucKtE8bAFKyGs3N1H2KeEYLBzm9RD36H_eHHmSTLFkse65IpcsXRkBnLO37moQebw"
                  alt="Ảnh chân dung học viên"
                />
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-lg text-label-lg border-2 border-primary font-bold">
                  +2k
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-[2rem] card-shadow flex flex-col items-center justify-center text-center border border-outline-variant/20">
              <div className="text-secondary font-headline-lg text-[64px] mb-2 font-bold leading-none">12k+</div>
              <div className="font-headline-sm text-headline-sm text-primary font-bold">Trúng tuyển Toàn cầu</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                Học viên trúng tuyển tại các trường thuộc nhóm Ivy League và Russell Group.
              </p>
            </div>
            
            <div className="bg-secondary-container p-8 rounded-[2rem] flex flex-col justify-between text-on-secondary-container shadow-sm border border-secondary/15">
              <span className="material-symbols-outlined text-on-secondary-container text-5xl">public</span>
              <div>
                <div className="font-headline-sm text-headline-sm text-on-secondary-container font-bold mb-1">58 Quốc gia</div>
                <p className="font-body-sm text-body-sm text-on-secondary-container/80 leading-relaxed">
                  Cộng đồng học viên xuất sắc toàn cầu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Gallery */}
      <section className="py-24 px-margin-mobile text-left">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">Tiếng nói của Sự Xuất sắc</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Những câu chuyện người thật việc thật từ các học viên đã thay đổi tương lai học thuật của mình cùng Dream Education.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test) => (
              <div
                key={test.id}
                className="bg-white p-8 rounded-2xl card-shadow card-shadow-hover transition-all duration-300 flex flex-col border border-outline-variant/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    className="w-16 h-16 rounded-full object-cover border border-outline-variant/20"
                    src={test.image}
                    alt={test.name}
                  />
                  <div>
                    <div className="font-headline-sm text-headline-sm text-primary font-bold">{test.name}</div>
                    <div className="font-label-md text-label-md text-on-surface-variant">{test.placement}</div>
                  </div>
                </div>
                <div className="mb-6 flex gap-1 text-secondary">
                  {[...Array(test.rating)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant italic mb-6 leading-relaxed flex-grow">
                  {test.comment}
                </p>
                <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-center">
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded text-label-md font-bold">
                    {test.score}
                  </span>
                  <span className="text-on-surface-variant text-label-md font-semibold">
                    {test.increase}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Score Improvement Gallery */}
      <section className="py-24 px-margin-mobile bg-primary text-on-primary text-left">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="font-headline-lg text-headline-lg mb-4 text-on-primary font-bold">Minh chứng từ sự tiến bộ</h2>
              <p className="font-body-lg text-body-lg opacity-80 leading-relaxed">
                Học viên của chúng tôi liên tục đạt những bước nhảy vọt về điểm số thông qua việc thực hành nghiêm túc và sự hướng dẫn của chuyên gia.
              </p>
            </div>
            <Link
              to="/contact"
              className="bg-secondary text-on-secondary px-8 py-3 rounded-lg font-label-lg text-label-lg hover:brightness-110 transition-all flex items-center gap-2 font-bold w-fit shadow-md"
            >
              Xem các câu chuyện thành công chi tiết
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {improvements.map((imp, idx) => (
              <div
                key={idx}
                className="bg-primary-container p-6 rounded-2xl flex flex-col items-center border border-on-primary/10"
              >
                <div className="text-primary-fixed-dim text-label-md mb-2 uppercase tracking-widest font-semibold">
                  Trước khóa học
                </div>
                <div className="font-headline-lg text-headline-lg opacity-50 mb-4 font-bold">
                  {imp.pre}
                </div>
                <span className="material-symbols-outlined text-secondary text-2xl mb-4">
                  arrow_downward
                </span>
                <div className="text-secondary-fixed text-label-md mb-2 uppercase tracking-widest font-semibold">
                  Điểm số đạt được
                </div>
                <div className="font-headline-lg text-headline-lg text-secondary-fixed font-bold">
                  {imp.post}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-margin-mobile text-center">
        <div className="max-w-4xl mx-auto bg-surface-container-highest p-8 md:p-12 rounded-[3rem] text-center relative overflow-hidden border border-outline-variant/30 shadow-sm">
          <div className="relative z-10 space-y-6">
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold">Sẵn sàng trở thành câu chuyện thành công tiếp theo?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Hành trình chinh phục ngôn ngữ xuất sắc của bạn bắt đầu từ một bước đi nhỏ nhất. Hãy thực hiện bài kiểm tra đánh giá năng lực miễn phí ngay hôm nay.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="bg-primary text-on-primary px-10 py-4 rounded-xl font-label-lg text-label-lg hover:bg-primary-container transition-all text-center font-bold"
              >
                Đăng ký học ngay
              </Link>
              <Link
                to="/courses"
                className="border-2 border-primary text-primary px-10 py-4 rounded-xl font-label-lg text-label-lg hover:bg-surface-container-low transition-all text-center font-bold"
              >
                Tải tài liệu giới thiệu
              </Link>
            </div>
          </div>
          {/* Artistic shapes */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-container/10 rounded-full blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}
