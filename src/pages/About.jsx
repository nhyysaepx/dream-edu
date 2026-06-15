import React from 'react';
import { Link } from 'react-router-dom';
import startupImg from '../assets/timeline_startup.png';
import partnershipImg from '../assets/timeline_partnership.png';
import nowImg from '../assets/timeline_now.png';

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

      {/* Timeline Section */}
      <section className="py-stack-lg bg-surface-container-lowest text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Hành trình phát triển</h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
              Từ một trung tâm bồi dưỡng nhỏ đến một tổ chức giáo dục và tư vấn du học quốc tế hàng đầu.
            </p>
          </div>
          
          <div className="relative timeline-line space-y-16">
            {/* 2025 */}
            <div className="flex flex-col md:flex-row items-center gap-gutter relative">
              <div className="md:w-1/2 md:text-right">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Khởi đầu</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Dream Education được thành lập với sứ mệnh mang đến chương trình luyện thi chất lượng cao.
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container shrink-0">
                2025
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src={startupImg}
                  alt="Khởi đầu của Dream Education năm 2025"
                />
              </div>
            </div>

            {/* 2026 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-gutter relative">
              <div className="md:w-1/2 text-left">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Đối tác Hội đồng Anh</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Đối tác thi với Hội đồng Anh (British Council)
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-primary border-4 border-white shadow-md flex items-center justify-center font-bold text-on-primary shrink-0">
                2026
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src={partnershipImg}
                  alt="Đối tác chính thức với British Council"
                />
              </div>
            </div>

            {/* Nay */}
            <div className="flex flex-col md:flex-row items-center gap-gutter relative">
              <div className="md:w-1/2 md:text-right">
                <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Hỗ trợ học sinh Việt Nam</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                  Hỗ trợ hơn 100 học sinh khắp Việt Nam
                </p>
              </div>
              <div className="z-10 w-12 h-12 rounded-full bg-secondary-container border-4 border-white shadow-md flex items-center justify-center font-bold text-on-secondary-container shrink-0">
                Nay
              </div>
              <div className="md:w-1/2 w-full">
                <img
                  className="rounded-lg shadow-sm w-full h-48 object-cover"
                  src={nowImg}
                  alt="Hỗ trợ học sinh khắp Việt Nam học tập hiệu quả"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-left">
        <div className="flex flex-col md:flex-row gap-stack-lg items-center">
          <div className="md:w-1/2 space-y-6">
            <h2 className="font-headline-lg text-headline-lg text-primary mb-8 leading-tight">
              Tại sao những học viên xuất sắc nhất lựa chọn chúng tôi?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-fixed group-hover:text-on-secondary-fixed transition-all">
                  <span className="material-symbols-outlined">record_voice_over</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Giảng viên bản xứ</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Học tập cùng giáo viên đến từ Anh, Mỹ và Úc để làm chủ phát âm chuẩn và cách diễn đạt tự nhiên.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                  <span className="material-symbols-outlined">emoji_events</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Học thuật xuất sắc</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Giáo trình đào tạo được thiết kế bởi cựu sinh viên Oxford, đảm bảo tính chuẩn mực và tối ưu kết quả học tập.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-xl hover:bg-surface-container-low transition-colors group">
                <div className="w-12 h-12 shrink-0 rounded-full bg-secondary-fixed/20 flex items-center justify-center text-secondary group-hover:bg-secondary-fixed group-hover:text-on-secondary-fixed transition-all">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1 font-bold">Cam kết điểm số</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    94% học viên của chúng tôi đạt điểm số mục tiêu ngay trong lần thi đầu tiên.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full relative">
            <div className="relative rounded-2xl overflow-hidden aspect-square border-8 border-white shadow-xl">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbpAObe_kru6dEmoJYNXxXZrFSF2sWGYvubA4OTlgK9orCxxxmayCMksLTrLSbxa7SMxN1Y70hDroWkvjd7QOC67qQhMST9m5XUAGErnr3YWfkO35y8MkEldbyGRKGwiVNebdttQeq1E9zkyOWgJWPwWa62tVUj1-RG8LA_65kjL43kZYgF_UZX6I2KKZ5k_XgPUVvI9yBN53qqeyjxNX3HKclazrXni6wPA3ks5A3FNlC2ucGXgkP0iX_amwPrLFrmYYP8VDwIY"
                alt="Học viên đang cùng học tập"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-xl shadow-lg max-w-[200px] text-center">
              <p className="font-display-lg text-headline-lg text-on-secondary-container font-bold">15k+</p>
              <p className="font-label-md text-label-md text-on-secondary-container uppercase font-semibold">Cựu học viên toàn cầu</p>
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
