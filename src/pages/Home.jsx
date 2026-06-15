import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import studentImg from '../assets/student.jpg';

function AnimatedCounter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target, 10);
    if (start === end) return;

    const totalDuration = 1500;
    const incrementTime = Math.max(Math.floor(totalDuration / end), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

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
                alt="Thành công của học viên"
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
                <div className="font-headline-sm text-headline-sm text-primary font-bold">6.5</div>
                <div className="font-label-md text-label-md text-on-surface-variant">chỉ trong 4 tháng</div>
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
                    <span className="text-label-md">8 Tuần</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 12</span>
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
                  alt="IELTS Intensive"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp4c18GCeIyS4J7b_zKnNr87XvKnMXekX53xKeOsWOHxlv0suCwdZiPZdci0fAzWo5bgNIy_Hit5IyaEIt0Rs7CrHj56vHT_vydpUZcUSx2ZZxNh_4t3e2fUulJryYGzJ7VsRzueEOiDzeO8o2A25_P-qyyF6BUPv0-TOOpYcaAdiTPEjGzgm5AzHRJNaSORHhloIeWfhL98yGtenCaJLFX4R6ZDjzdEV9WuLeisUWSC7mufENzkBpGpY1xkIKBZJ_jDUQ2xu2WY8"
                />
                <div className="absolute top-4 left-4 bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                  Cấp tốc 4 tuần
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-primary">IELTS Intensive</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Khóa học cường độ cao dành cho học viên cần thi gấp. Tập trung sâu vào phương pháp làm bài và thực hành.
                </p>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-md">4 Tuần</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 8</span>
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
                  alt="IELTS 7.0+"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAajGHMf3Ifg0H1P5yvrRF3WaSsrqzhotnxV8K4U42kGmT6qNkmS-T8d9yYE0ZihIZMLR4B_aSgGHJNsTK71vwx5s-fyqErmGA_eogRk-c6h9Ab7FzFeBVGdRvcb35oS6ImHmoI_vHZ8pSwoVXCAWY_EM6iUyHFgV4ZLom_Iyp28QSD5E7FO8osnztaiWhqCFQ5-1k3Zez7aYVVldrc7Ehkn1d05n6dpr41WRXAhURd0fUm2t98cOzC8TA8VtqqI3JuLa8xbptJrac"
                />
                <div className="absolute top-4 left-4 bg-secondary text-on-primary px-3 py-1 rounded-full font-label-md text-label-md font-semibold">
                  Trình độ Nâng cao
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-headline-sm text-headline-sm text-primary">IELTS 7.0+ Elite</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Dành cho học viên đã đạt band 6.5. Tập trung tối ưu hóa điểm số thông qua các chi tiết và kỹ năng chuyên sâu.
                </p>
                <div className="flex items-center gap-4 text-on-surface-variant">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    <span className="text-label-md">6 Tuần</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[18px]">group</span>
                    <span className="text-label-md">Tối đa 6</span>
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

      {/* Success Statistics Section */}
      <section className="py-stack-lg bg-primary text-on-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/10 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            <div className="space-y-2">
              <div className="font-display-lg text-display-lg text-secondary-fixed font-bold">
                <AnimatedCounter target="5000" />
              </div>
              <div className="font-label-lg text-label-lg uppercase opacity-80">Học viên tốt nghiệp</div>
            </div>
            <div className="space-y-2">
              <div className="font-display-lg text-display-lg text-secondary-fixed font-bold">
                <AnimatedCounter target="98" suffix="%" />
              </div>
              <div className="font-label-lg text-label-lg uppercase opacity-80">Tỷ lệ đạt mục tiêu</div>
            </div>
            <div className="space-y-2">
              <div className="font-display-lg text-display-lg text-secondary-fixed font-bold">
                <AnimatedCounter target="150" />
              </div>
              <div className="font-label-lg text-label-lg uppercase opacity-80">Giảng viên chuyên gia</div>
            </div>
            <div className="space-y-2">
              <div className="font-display-lg text-display-lg text-secondary-fixed font-bold">
                <AnimatedCounter target="12" />
              </div>
              <div className="font-label-lg text-label-lg uppercase opacity-80">Đối tác toàn cầu</div>
            </div>
          </div>

          {/* Testimonial Teaser */}
          <div className="mt-stack-lg bg-surface/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 max-w-3xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <span className="material-symbols-outlined text-secondary text-[48px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                format_quote
              </span>
            </div>
            <p className="font-body-lg text-body-lg italic mb-6 leading-relaxed">
              "Dream Education không chỉ giảng dạy tiếng Anh mà còn tiếp thêm sự tự tin để em nộp hồ sơ học Tiến sĩ tại London. Điểm số của em đã bứt phá từ 6.0 lên 8.0 chỉ sau 8 tuần."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-secondary mb-3">
                <img
                  alt="Ahmed S."
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDc1n-ebBqSL_y8kgIt5_Grt3H5BrG0Q4s_ooDM6Ehy_fEsxHH6h9wC_xjP8uRNSpKGXD1dJclfWT0U55wGKKULWw9gIOPD2Yp3bIq3M98MoyN3uJ8ZEpzgvQrfJcZsIssgAxsVLqwOwzNwkvlIOfJ5nwQH_qo98V5itnxLNrEmOCBEP_0zhZGSEmEAtBqTiW1mSBxBLh5MN9L90bFAycbsCpC7tejyVLqkleUDWhpcWGdHtfhk5RRSjO1LjQUrWgV4syszV8QUroU"
                />
              </div>
              <div className="font-headline-sm text-headline-sm font-bold">Ahmed S.</div>
              <div className="font-label-md text-label-md opacity-60">IELTS Band 8.0 | King's College London</div>
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
