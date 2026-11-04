import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[450px] flex items-center overflow-hidden bg-primary-container text-left">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUuQt2q5nn4flcHGBCxE_8_gOh73XJgDxvqkhjWJ4oaq5_RE1cT82S0ii7N1Gs7aIacUYJAlukpRdGwDIwH6pbFkNN8oxok-tL_NfJ67lImcOx0KwYmWxHEWE1e-K9On_af04-AdYwK3HhttFjdkFP4AJ4_sIdjtN4jcjr4owq-fV_DQp7QyZh7-XcFsgspHGuB7uaiY3WyzaPDyCwi4oW3RNgEsy-EjqE8lLHN_jTt5kXo1szHAQ0O_o6h2nnLrBj8qHtZNoXTZs"
            alt="Nền thư viện trường đại học"
          />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full text-on-primary">
          <div className="max-w-2xl">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-md text-label-md mb-4 uppercase tracking-widest font-semibold">
              Từ năm 2025
            </span>
            <h1 className="font-display-lg text-display-lg text-on-primary mb-6">
              Bản lề vững chắc đưa ước mơ Việt ra thế giới.
            </h1>
            <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
              Chúng tôi cung cấp chương trình đào tạo ngôn ngữ chuẩn quốc tế cho thế hệ lãnh đạo, học giả và chuyên gia toàn cầu tiếp theo.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Bento Grid */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 bg-surface-container-lowest p-8 md:p-10 rounded-xl tonal-card border border-outline-variant/30 relative overflow-hidden">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '40px' }}>
                visibility
              </span>
              <h2 className="font-headline-md text-headline-md text-primary mb-4">Tầm nhìn</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Trở thành cầu nối đáng tin cậy nhất cho giáo dục quốc tế, tiếp sức cho học viên vượt qua các rào cản ngôn ngữ và khai phóng tối đa tiềm năng của bản thân trong mọi môi trường học thuật hoặc chuyên nghiệp toàn cầu.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-[0.03] pointer-events-none">
              <span className="material-symbols-outlined" style={{ fontSize: '240px' }}>
                language
              </span>
            </div>
          </div>
          
          <div className="bg-primary p-8 md:p-10 rounded-xl tonal-card text-on-primary flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-secondary-container mb-4" style={{ fontSize: '40px' }}>
                flag
              </span>
              <h2 className="font-headline-sm text-headline-sm mb-4">Sứ mệnh</h2>
              <p className="font-body-md text-body-md opacity-90 leading-relaxed">
                Mang lại sự xuất sắc thông qua chương trình luyện thi IELTS nghiêm ngặt, môi trường học tiếng Anh chuyên sâu cùng dịch vụ hỗ trợ du học toàn diện.
              </p>
            </div>
            <Link
              to="/courses"
              className="mt-8 flex items-center gap-2 font-label-lg text-label-lg text-secondary-container hover:underline w-fit"
            >
              Xem các khóa học <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter mt-gutter">
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">school</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Chính trực</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cam kết tuyệt đối đối với sự trung thực học thuật và tư vấn đạo đức nghề nghiệp.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">star</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Xuất sắc</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Luôn nỗ lực đạt tiêu chuẩn cao nhất trong giảng dạy và hỗ trợ học viên.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">groups</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Đa dạng</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Tôn trọng và thúc đẩy trao đổi văn hóa như một giá trị cốt lõi của giáo dục hiện đại.
            </p>
          </div>
          <div className="bg-surface-container-low p-6 md:p-8 rounded-xl border border-outline-variant/50">
            <span className="material-symbols-outlined text-primary mb-2 text-3xl">psychology</span>
            <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Sáng tạo</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ứng dụng các phương pháp sư phạm tiên tiến nhất để tối ưu hóa thời gian tiếp thu ngôn ngữ.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline / Roadmap Diagram Section */}
      <section className="py-stack-lg bg-surface-container-low/50 text-left relative overflow-hidden">
        {/* Subtle decorative background light */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-secondary-container/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              Sơ đồ lộ trình phát triển
            </div>
            <h2 className="font-headline-lg text-headline-lg text-primary mb-3 font-bold">Hành trình phát triển</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Từ một trung tâm bồi dưỡng nhỏ đến một tổ chức giáo dục và tư vấn du học quốc tế hàng đầu.
            </p>
          </div>
          
          {/* Main Diagram Canvas */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm relative">
            {/* Desktop Visual Progression Axis */}
            <div className="hidden md:block mb-10 relative">
              <div className="relative flex items-center justify-between max-w-3xl mx-auto px-8">
                {/* Connecting track line */}
                <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-secondary-container via-primary to-secondary-container rounded-full z-0" />

                {/* Arrow connectors on the line */}
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-outline-variant/40 rounded-full p-1 text-primary shadow-xs">
                  <span className="material-symbols-outlined text-[18px] block">arrow_forward</span>
                </div>
                <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white border border-outline-variant/40 rounded-full p-1 text-primary shadow-xs">
                  <span className="material-symbols-outlined text-[18px] block">arrow_forward</span>
                </div>

                {/* Node 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container text-base">
                    2025
                  </div>
                  <span className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">Khởi đầu</span>
                </div>

                {/* Node 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center font-bold text-on-primary text-base">
                    2026
                  </div>
                  <span className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">Hội đồng Anh</span>
                </div>

                {/* Node 3 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container text-base relative">
                    Nay
                    <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                    </span>
                  </div>
                  <span className="text-xs font-bold text-primary mt-2 uppercase tracking-wide">Việt Nam</span>
                </div>
              </div>
            </div>

            {/* 3 Diagram Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {/* Card 1: 2025 */}
              <div className="bg-surface-container-low/30 rounded-2xl border border-outline-variant/30 hover:border-secondary-container hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-container to-amber-500" />
                
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Cột mốc 01
                    </span>
                    <span className="md:hidden inline-flex items-center justify-center font-bold text-xs bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full border border-secondary/20">
                      2025
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    Khởi đầu
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Dream Education được thành lập với sứ mệnh mang đến chương trình luyện thi chất lượng cao.
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex flex-wrap gap-2">
                  <span className="text-[11px] font-medium bg-white text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30">
                    Sứ mệnh giáo dục
                  </span>
                  <span className="text-[11px] font-medium bg-white text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30">
                    Chất lượng cao
                  </span>
                </div>
              </div>

              {/* Mobile Connector between 1 and 2 */}
              <div className="flex md:hidden justify-center -my-2 text-primary">
                <span className="material-symbols-outlined text-2xl animate-bounce">arrow_downward</span>
              </div>

              {/* Card 2: 2026 */}
              <div className="bg-surface-container-low/30 rounded-2xl border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden shadow-xs">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary-container" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Cột mốc 02 • Đối tác
                    </span>
                    <span className="md:hidden inline-flex items-center justify-center font-bold text-xs bg-primary text-on-primary px-3 py-1 rounded-full">
                      2026
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">handshake</span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    Đối tác Hội đồng Anh
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Đối tác thi với Hội đồng Anh (British Council)
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex flex-wrap gap-2">
                  <span className="text-[11px] font-medium bg-primary/5 text-primary px-2.5 py-1 rounded-full border border-primary/15">
                    British Council
                  </span>
                  <span className="text-[11px] font-medium bg-primary/5 text-primary px-2.5 py-1 rounded-full border border-primary/15">
                    Khảo thí quốc tế
                  </span>
                </div>
              </div>

              {/* Mobile Connector between 2 and 3 */}
              <div className="flex md:hidden justify-center -my-2 text-primary">
                <span className="material-symbols-outlined text-2xl animate-bounce">arrow_downward</span>
              </div>

              {/* Card 3: Nay */}
              <div className="bg-surface-container-low/30 rounded-2xl border border-outline-variant/30 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-container via-amber-500 to-emerald-500" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-md uppercase tracking-wider">
                      Cột mốc 03 • Hiện tại
                    </span>
                    <span className="md:hidden inline-flex items-center justify-center font-bold text-xs bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full border border-secondary/20">
                      Nay
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">groups</span>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                    Hỗ trợ học sinh Việt Nam
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Hỗ trợ hơn 100 học sinh khắp Việt Nam
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-outline-variant/20 flex flex-wrap gap-2">
                  <span className="text-[11px] font-medium bg-white text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30">
                    100+ Học sinh
                  </span>
                  <span className="text-[11px] font-medium bg-white text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30">
                    Toàn quốc
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Diagram Flow Summary */}
            <div className="mt-8 pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">hub</span>
                <span className="font-semibold text-primary">Tiến trình liên tục:</span>
                <span>Khởi tạo nền tảng vững chắc ➔ Hợp tác chuẩn khảo thí quốc tế ➔ Lan tỏa giá trị giáo dục toàn quốc</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span> 2025
                </span>
                <span className="text-outline-variant">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> 2026
                </span>
                <span className="text-outline-variant">•</span>
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Hiện tại
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-left">
        <div className="flex flex-col md:flex-row gap-stack-lg items-center">
          <div className="md:w-1/2 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary-container/30 text-secondary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 border border-secondary/20">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                Giá trị vượt trội
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary leading-tight">
                Tại sao những học viên xuất sắc nhất lựa chọn chúng tôi?
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-outline-variant/30 hover:border-secondary-container hover:shadow-md transition-all group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-all">
                  <span className="material-symbols-outlined text-2xl">record_voice_over</span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Giảng viên bản xứ</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container-low text-on-surface-variant px-2 py-0.5 rounded">100% Native</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Học tập cùng giáo viên đến từ Anh, Mỹ và Úc để làm chủ phát âm chuẩn và cách diễn đạt tự nhiên.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-outline-variant/30 hover:border-primary/50 hover:shadow-md transition-all group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined text-2xl">emoji_events</span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Học thuật xuất sắc</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded">Oxford Standard</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Giáo trình đào tạo được thiết kế bởi cựu sinh viên Oxford, đảm bảo tính chuẩn mực và tối ưu kết quả học tập.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-white border border-outline-variant/30 hover:border-secondary-container hover:shadow-md transition-all group">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-all">
                  <span className="material-symbols-outlined text-2xl">verified_user</span>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Cam kết điểm số</h4>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">Đầu ra 94%+</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    94% học viên của chúng tôi đạt điểm số mục tiêu ngay trong lần thi đầu tiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Data & Infographic Metrics Panel (Replacing image) */}
          <div className="md:w-1/2 w-full">
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Decorative subtle background accents */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              {/* Panel Header */}
              <div className="flex items-center justify-between gap-3 mb-6 relative z-10 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">insights</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">Chỉ số năng lực</span>
                    <h3 className="text-sm font-bold text-on-surface">Minh chứng qua dữ liệu đào tạo</h3>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Dữ liệu thực tế
                </span>
              </div>

              {/* Big Stat Feature: 15k+ Global Alumni */}
              <div className="bg-gradient-to-br from-secondary-container via-amber-400 to-amber-500 text-on-secondary-container rounded-2xl p-6 mb-5 shadow-md relative overflow-hidden">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display-lg text-4xl sm:text-5xl font-black tracking-tight text-on-secondary-container">
                        15k+
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider bg-black/10 px-2.5 py-0.5 rounded-full">
                        Toàn cầu
                      </span>
                    </div>
                    <p className="font-bold text-base mt-1 text-on-secondary-container">
                      Cựu học viên toàn cầu
                    </p>
                    <p className="text-xs text-on-secondary-container/85 mt-1 max-w-xs leading-relaxed">
                      Cộng đồng học viên hiện đang du học, làm việc và định cư thành công trên 15 quốc gia.
                    </p>
                  </div>

                  {/* Destination Country Tags */}
                  <div className="flex sm:flex-col gap-1.5 flex-wrap shrink-0">
                    <span className="text-[11px] font-bold bg-white/90 backdrop-blur-xs text-on-surface px-2.5 py-1 rounded-lg text-center shadow-xs">
                      🇬🇧 Anh Quốc
                    </span>
                    <span className="text-[11px] font-bold bg-white/90 backdrop-blur-xs text-on-surface px-2.5 py-1 rounded-lg text-center shadow-xs">
                      🇺🇸 Hoa Kỳ
                    </span>
                    <span className="text-[11px] font-bold bg-white/90 backdrop-blur-xs text-on-surface px-2.5 py-1 rounded-lg text-center shadow-xs">
                      🇦🇺 Úc & Canada
                    </span>
                  </div>
                </div>
              </div>

              {/* Metric 2: 94% Pass Rate with Circular Ring & Comparative Bar */}
              <div className="bg-surface-container-low/60 border border-outline-variant/30 rounded-2xl p-5 mb-5 relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[18px]">military_tech</span>
                      <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Hiệu quả đầu ra</span>
                    </div>
                    <h4 className="text-base font-bold text-primary">
                      94% Đạt điểm số mục tiêu ngay lần thi đầu
                    </h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Lộ trình cá nhân hóa dựa trên học thuật chuẩn mực, giúp tiết kiệm thời gian và chi phí luyện thi.
                    </p>

                    {/* Comparative benchmark bars */}
                    <div className="pt-2 space-y-1.5">
                      <div>
                        <div className="flex justify-between text-[11px] font-semibold text-on-surface mb-1">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary"></span> Dream Education
                          </span>
                          <span className="text-primary font-bold">94%</span>
                        </div>
                        <div className="h-2 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '94%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] text-on-surface-variant mb-1">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-outline-variant"></span> Trung bình ngành
                          </span>
                          <span>62%</span>
                        </div>
                        <div className="h-1.5 w-full bg-outline-variant/20 rounded-full overflow-hidden">
                          <div className="h-full bg-outline-variant rounded-full" style={{ width: '62%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Circular Radial Gauge */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-outline-variant/25"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-primary"
                        strokeDasharray="94, 100"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-xl font-black text-primary font-headline-sm block leading-none">94%</span>
                      <span className="text-[9px] font-bold text-on-surface-variant uppercase">Đạt chuẩn</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom 2-Column Specs: Oxford & Native Instructors */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-surface-container-low/40 border border-outline-variant/20 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary block">Giáo trình Oxford</span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">
                      Thiết kế chuẩn mực bởi cựu sinh viên Đại học Oxford.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low/40 border border-outline-variant/20 rounded-xl p-3.5 flex flex-col justify-between">
                  <div className="w-8 h-8 rounded-lg bg-secondary-fixed/30 text-secondary flex items-center justify-center mb-2">
                    <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-on-surface block">Giảng viên bản xứ</span>
                    <p className="text-[11px] text-on-surface-variant mt-0.5 leading-tight">
                      Đến từ Anh, Mỹ & Úc với chứng chỉ giảng dạy quốc tế.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality Guarantee Strip */}
              <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200/80 rounded-xl px-4 py-2.5 text-xs text-emerald-900 font-medium">
                <span className="material-symbols-outlined text-emerald-700 text-[18px] shrink-0">verified</span>
                <span>Cam kết điểm số minh bạch: đồng hành và đào tạo lại miễn phí đến khi đạt target.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="bg-primary-container rounded-3xl p-12 text-center relative overflow-hidden text-on-primary">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-6 h-full">
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
              <div className="border-r border-on-primary"></div>
            </div>
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6 font-bold">Sẵn sàng bắt đầu hành trình của bạn?</h2>
          <p className="font-body-lg text-body-lg text-on-primary-container mb-8 max-w-2xl mx-auto">
            Gia nhập cộng đồng hàng ngàn học viên đã hiện thực hóa ước mơ vươn ra thế giới cùng sự dẫn dắt của chúng tôi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-lg text-label-lg hover:shadow-lg transition-all transform hover:-translate-y-1 font-bold text-center"
            >
              Đăng ký học ngay
            </Link>
            <Link
              to="/contact"
              className="border-2 border-on-primary text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-white/10 transition-all font-bold text-center"
            >
              Nhận tư vấn từ chuyên gia
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
