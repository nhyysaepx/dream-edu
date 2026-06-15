import React from 'react';
import { Link } from 'react-router-dom';
import studentImg from '../assets/student_gialuat.jpg';

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[800px] flex items-center overflow-hidden py-16">
        <div className="absolute inset-0 z-0">
          <img
            alt="Học viên đang học tập"
            className="w-full h-full object-cover opacity-15"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvpmePQJdLGTBsuCAen4bBK8It-Cn8Slza9C58dHuagIrerlX9z_knvcmLNBX9dqWLd6bRzzy7sIDFCi7WOF2J2T7tgXdnc8NDE_W8FF9hHwUqB8z7sw--hDDeoiv2nWwGK2C5y5fDgyH0brHIlX4mWSw1y6uWX-vXJps6F9_zeybRAdCDoCS9Dz_3gZsDhifnKm0QTLd9LwnZlJ5yA_hrlvkhGgPQrtcldLXQ814jJidM0e8WlHMugg3Ded8GSJM21fKxVZpqR5s"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center w-full">
          <div className="space-y-stack-md text-left">
            <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full border border-secondary/20">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-md text-label-md uppercase tracking-wider">Đối tác Đào tạo chuẩn Cambridge</span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-display-lg text-headline-lg-mobile md:text-display-lg text-primary leading-tight">
              Bứt phá <span className="text-secondary">Tiếng Anh.</span><br />Kiến tạo tương lai.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Chương trình luyện thi IELTS chuyên sâu, Tiếng Anh học thuật và kỹ năng giao tiếp thiết kế riêng cho học viên Việt Nam hướng tới cơ hội toàn cầu.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-sm text-headline-sm shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 text-center font-bold"
              >
                Đăng ký thi thử miễn phí
              </Link>
              <Link
                to="/courses"
                className="border-2 border-primary text-primary px-8 py-4 rounded-xl font-headline-sm text-headline-sm hover:bg-primary/5 transition-all text-center font-bold"
              >
                Khám phá khóa học
              </Link>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform rotate-2">
              <img
                alt="Thành công của học viên Gia Luật"
                className="w-full aspect-[4/5] object-cover"
                src={studentImg}
              />
            </div>
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            {/* Stats Badge Overlay */}
            <div className="absolute bottom-10 -left-10 z-20 bg-surface p-6 rounded-xl shadow-2xl border border-outline-variant/30 flex items-center gap-4 animate-bounce-slow">
              <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                <span className="material-symbols-outlined text-[32px]">trending_up</span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-headline-sm text-primary font-bold">IELTS 6.5</div>
                <div className="font-label-md text-label-md text-on-surface-variant">Gia Luật - Bác sĩ đa khoa</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-stack-lg bg-surface-container-low text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="space-y-stack-sm p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
              <h2 className="font-headline-md text-headline-md text-primary">Tầm nhìn</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Rút ngắn khoảng cách giữa tiềm năng Việt và cơ hội toàn cầu bằng sự xuất sắc ngôn ngữ và học thuật chuẩn mực.
              </p>
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
            </div>
            <div className="space-y-stack-sm p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
              <h2 className="font-headline-md text-headline-md text-primary">Sứ mệnh</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Trang bị cho học viên bộ công cụ làm chủ tiếng Anh, bồi dưỡng sự tự tin và đảm bảo sự thành công trên con đường học tập quốc tế.
              </p>
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
            </div>
            <div className="space-y-stack-sm p-6 bg-white rounded-xl shadow-sm border border-outline-variant/10">
              <h2 className="font-headline-md text-headline-md text-primary">Giá trị cốt lõi</h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Chính trực, Xuất sắc và Phát triển cá nhân hóa. Chúng tôi đồng hành cùng học viên để trở thành những công dân toàn cầu.
              </p>
              <div className="h-1 w-20 bg-secondary rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="py-stack-lg text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-stack-lg">
            <div className="space-y-2">
              <span className="font-label-lg text-label-lg text-secondary uppercase tracking-widest font-bold">Chương trình đào tạo</span>
              <h2 className="font-headline-lg text-headline-lg text-primary">Khóa học nổi bật</h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:flex items-center gap-2 text-primary font-label-lg hover:underline transition-all"
            >
              Xem tất cả khóa học <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Course Card 1 */}
            <div className="group bg-surface rounded-xl overflow-hidden border border-outline-variant/30 card-shadow interactive-shadow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="IELTS Foundation"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0ByVhdcqncQmf10oEU-k-gpCQYBwYUvosxGGFkyO2pUTQrtkFXSHTHv6qjPigtchvOyk_cF7EwpzAvjO6E4AG5-_pTPpiMipC2rjBFra3XtWXq1xW623ZnWr1ptA5Pevb6_GK9eo52s9uTtZ82z7fPJxVWvYdtJceRSYmwvCdi8dvbMZj9STLOUcCgGZcSDGxkH9Vh28I7DoDUHjfcfrJQZb7GigenW0JdNjn7KsK5G2uNMpDXpKBisZJuxlB-WahfT_9dBz5tdc"
                />
                <div className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                  Cơ bản - Trung cấp
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-primary">IELTS Foundation</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Xây dựng kỹ năng nền tảng cần thiết cho kỳ thi IELTS. Tập trung vào ngữ pháp, từ vựng và cấu trúc đề thi cơ bản.
                </p>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-md">36 buổi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 8 học sinh</span>
                  </div>
                </div>
                <Link
                  to="/courses"
                  className="block w-full py-3 rounded-lg border-2 border-primary text-primary font-label-lg hover:bg-primary hover:text-on-primary transition-all text-center font-bold"
                >
                  Chi tiết khóa học
                </Link>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="group bg-surface rounded-xl overflow-hidden border border-outline-variant/30 card-shadow interactive-shadow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="IELTS Advanced"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4c18GCeIyS4J7b_zKnNr87XvKnMXekX53xKeOsWOHxlv0suCwdZiPZdci0fAzWo5bgNIy_Hit5IyaEIt0Rs7CrHj56vHT_vydpUZcUSx2ZZxNh_4t3e2fUulJryYGzJ7VsRzueEOiDzeO8o2A25_P-qyyF6BUPv0-TOOpYcaAdiTPEjGzgm5AzHRJNaSORHhloIeWfhL98yGtenCaJLFX4R6ZDjzdEV9WuLeisUWSC7mufENzkBpGpY1xkIKBZJ_jDUQ2xu2WY8"
                />
                <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                  Trình độ Nâng cao
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-primary">IELTS Advanced</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Chương trình chuyên sâu dành cho học viên mục tiêu điểm số cao. Tập trung tối ưu hóa các kỹ năng khó và nâng band điểm vượt trội.
                </p>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-md">36 buổi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 8 học sinh</span>
                  </div>
                </div>
                <Link
                  to="/courses"
                  className="block w-full py-3 rounded-lg border-2 border-primary text-primary font-label-lg hover:bg-primary hover:text-on-primary transition-all text-center font-bold"
                >
                  Chi tiết khóa học
                </Link>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="group bg-surface rounded-xl overflow-hidden border border-outline-variant/30 card-shadow interactive-shadow transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <img
                  alt="IELTS Beginner"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAajGHMf3Ifg0H1P5yvrRF3WaSsrqzhotnxV8K4U42kGmT6qNkmS-T8d9yYE0ZihIZMLR4B_aSgGHJNsTK71vwx5s-fyqErmGA_eogRk-c6h9Ab7FzFeBVGdRvcb35oS6ImHmoI_vHZ8pSwoVXCAWY_EM6iUyHFgV4ZLom_Iyp28QSD5E7FO8osnztaiWhqCFQ5-1k3Zez7aYVVldrc7Ehkn1d05n6dpr41WRXAhURd0fUm2t98cOzC8TA8VtqqI3JuLa8xbptJrac"
                />
                <div className="absolute top-4 left-4 bg-secondary text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                  Mới bắt đầu
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-primary">IELTS Beginner</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dành cho người mới bắt đầu hoặc mất gốc tiếng Anh. Tập trung xây dựng nền tảng ngữ pháp, từ vựng và làm quen cấu trúc bài thi.
                </p>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-md">36 buổi</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 8 học sinh</span>
                  </div>
                </div>
                <Link
                  to="/courses"
                  className="block w-full py-3 rounded-lg border-2 border-primary text-primary font-label-lg hover:bg-primary hover:text-on-primary transition-all text-center font-bold"
                >
                  Chi tiết khóa học
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-stack-lg text-center">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="bg-surface-container-highest rounded-2xl p-8 md:p-12 space-y-6 border border-outline-variant/30 shadow-sm">
            <h2 className="font-headline-lg text-headline-lg text-primary">Sẵn sàng khởi đầu hành trình của bạn?</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Thực hiện bài kiểm tra đánh giá năng lực trực tuyến miễn phí 15 phút để xác định trình độ và nhận lộ trình học tập cá nhân hóa.
            </p>
            <div className="flex justify-center">
              <Link
                to="/contact"
                className="bg-secondary text-on-secondary px-8 md:px-10 py-4 md:py-5 rounded-xl font-headline-sm text-headline-sm hover:bg-secondary/90 transition-all shadow-lg hover:shadow-secondary/20 font-bold"
              >
                Đăng ký kiểm tra trình độ ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
