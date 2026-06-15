import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { key: 'All', label: 'Tất cả lộ trình' },
    { key: 'IELTS Prep', label: 'Luyện thi IELTS' },
    { key: 'Academic English', label: 'Tiếng Anh học thuật' },
    { key: 'Specialized', label: 'Kỹ năng chuyên sâu' },
  ];

  const courses = [
    {
      id: 'ielts-foundation',
      title: 'IELTS Foundation',
      category: 'IELTS Prep',
      tag: 'Cơ bản',
      icon: 'auto_stories',
      description: 'Xây dựng nền tảng ngôn ngữ vững chắc ở cả 4 kỹ năng cho học viên mới bắt đầu lộ trình IELTS.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học sinh', icon: 'group' }
      ],
      isElite: false
    },
    {
      id: 'ielts-advanced',
      title: 'IELTS Advanced',
      category: 'IELTS Prep',
      tag: 'Nâng cao',
      icon: 'speed',
      description: 'Chương trình chuyên sâu dành cho học viên mục tiêu điểm số cao. Tập trung tối ưu hóa các kỹ năng khó và nâng band điểm vượt trội.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học sinh', icon: 'group' }
      ],
      isElite: false
    },
    {
      id: 'ielts-6-5',
      title: 'IELTS 6.5+',
      category: 'IELTS Prep',
      tag: 'Trung cấp',
      icon: 'star',
      description: 'Thiết kế đáp ứng yêu cầu tuyển sinh đại học, tập trung vào Viết học thuật và Nghe chuyên sâu.',
      stats: [
        { label: '8 Tuần / Có Lớp Cuối Tuần', icon: 'schedule' },
        { label: 'Làm chủ Kỹ năng Viết học thuật', icon: 'edit_note' }
      ],
      isElite: false
    },
    {
      id: 'ielts-beginner',
      title: 'IELTS Beginner',
      category: 'IELTS Prep',
      tag: 'Mới bắt đầu',
      icon: 'military_tech',
      description: 'Dành cho người mới bắt đầu hoặc mất gốc tiếng Anh. Tập trung xây dựng nền tảng ngữ pháp, từ vựng và làm quen cấu trúc bài thi.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học sinh', icon: 'group' }
      ],
      isElite: false
    },
    {
      id: 'academic-english',
      title: 'Tiếng Anh Học Thuật',
      category: 'Academic English',
      tag: 'Chuẩn bị Đại học',
      icon: 'school',
      description: 'Làm chủ kỹ năng nghiên cứu, trích dẫn tài liệu và tư duy học thuật phục vụ cho việc học tập quốc tế.',
      stats: [
        { label: 'Kỹ năng Nghiên cứu & Trích dẫn', icon: 'history_edu' },
        { label: 'Chuyên đề Tư duy Phản biện', icon: 'psychology' }
      ],
      isElite: false
    },
    {
      id: 'public-speaking',
      title: 'Public Speaking',
      category: 'Specialized',
      tag: 'Giao tiếp',
      icon: 'record_voice_over',
      description: 'Rèn luyện sự tự tin để trình bày ý tưởng một cách cuốn hút và rõ ràng trong mọi môi trường chuyên nghiệp.',
      stats: [
        { label: 'Ngôn ngữ Cơ thể & Biểu cảm', icon: 'mic' },
        { label: 'Hướng dẫn Thực hành Trực tiếp', icon: 'groups' }
      ],
      isElite: false
    }
  ];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-16 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter items-center">
          <div className="space-y-stack-sm">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md uppercase tracking-wider font-semibold">
              Học thuật Xuất sắc
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight font-bold">
              Nâng tầm tiềm năng của bạn cùng <span className="text-secondary">Giảng viên Chuyên gia</span>.
            </h1>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-lg">
              Giáo trình được thiết kế bài bản cho những học viên đầy hoài bão. Từ IELTS nền tảng đến Tiếng Anh Học thuật nâng cao, chúng tôi đồng hành cùng bạn trên con đường chinh phục thành công toàn cầu.
            </p>
          </div>
          <div className="relative hidden lg:block h-[400px] rounded-xl overflow-hidden shadow-xl">
            <img
              alt="Thành công Giáo dục"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNAnodpyFDI7O8GlSbCL-OfEvYPPJlXD8mCqSHNULThjnZGh5SB1h26nqzMHvuGMEVsB0IGW6g_stnWYKgNWTv43mrtr4ET19jC9VBK7WTvTXputnNU9JkD6hq34FdCGl81oKED8fhBtN3RaIdryRRpnjprm3-AHeleOSQUayHJu87D4lDQb1qMAre7CuQmheSwp-EnBgcR0N8huvMoDSly89GKp7Cvk4Lwt-c8EO6mLm8Tp1xQCUAm-O_E031EIK4ReCwPK3bIDw"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply"></div>
          </div>
        </div>
      </section>

      {/* Course Filters & Bento Grid */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-stack-lg text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter mb-stack-md">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-2">Khóa học được Thiết kế Riêng</h2>
            <p className="text-on-surface-variant">Lựa chọn lộ trình phù hợp nhất với năng lực và mục tiêu của bạn.</p>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-all cursor-pointer font-semibold ${
                  activeFilter === cat.key
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`p-6 rounded-xl border card-shadow flex flex-col justify-between transition-all duration-300 ${
                course.isElite
                  ? 'bg-primary-container text-on-primary border-primary/20 hover:scale-[1.02]'
                  : 'bg-surface-container-lowest border-outline-variant/30 hover:scale-[1.02] hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-3 py-1 rounded-full font-label-md text-label-md font-bold ${
                      course.isElite
                        ? 'bg-secondary text-on-secondary'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {course.tag}
                  </span>
                  <span
                    className={`material-symbols-outlined ${
                      course.isElite ? 'text-secondary-fixed text-3xl' : 'text-secondary text-3xl'
                    }`}
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {course.icon}
                  </span>
                </div>
                <h3 className={`font-headline-sm text-headline-sm font-bold mb-4 ${
                  course.isElite ? 'text-on-primary' : 'text-primary'
                }`}>
                  {course.title}
                </h3>
                <p className={`text-body-sm font-body-sm mb-6 leading-relaxed ${
                  course.isElite ? 'text-primary-fixed-dim' : 'text-on-surface-variant'
                }`}>
                  {course.description}
                </p>
                <div className="space-y-4 mb-8">
                  {course.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className={`material-symbols-outlined text-[20px] ${
                        course.isElite ? 'text-secondary-fixed' : 'text-primary'
                      }`}>
                        {stat.icon}
                      </span>
                      <span className="text-label-lg font-label-lg font-semibold">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link
                to="/contact"
                className={`w-full py-3 rounded-lg font-label-lg text-label-lg text-center font-bold transition-all ${
                  course.isElite
                    ? 'bg-secondary-container text-on-secondary-container hover:bg-white hover:text-primary'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                Đăng ký học ngay
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-stack-lg text-left">
        <div className="bg-primary p-8 md:p-12 rounded-2xl relative overflow-hidden text-center lg:text-left lg:flex lg:items-center lg:justify-between gap-gutter text-on-primary">
          <div className="relative z-10">
            <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold mb-4">Bạn chưa xác định được lộ trình của mình?</h2>
            <p className="text-primary-fixed-dim font-body-lg text-body-lg max-w-xl">
              Các chuyên gia của chúng tôi sẽ tư vấn và thực hiện đánh giá trình độ toàn diện để xác định cấp độ chính xác của bạn.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 relative z-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              to="/contact"
              className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-label-lg text-label-lg font-bold hover:scale-105 transition-all text-center"
            >
              Đăng ký kiểm tra trình độ
            </Link>
            <Link
              to="/contact"
              className="border-2 border-primary-fixed-dim text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-white/10 transition-all font-bold text-center"
            >
              Nhận tư vấn từ chuyên gia
            </Link>
          </div>
          <div className="absolute right-0 top-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>
      </section>

      {/* Floating Action Button for Contact (Zalo/Messenger mockup) */}
      <div className="fixed bottom-8 right-8 z-40 hidden md:block">
        <Link
          to="/contact"
          className="bg-secondary-container text-on-secondary-container p-4 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all flex items-center gap-2 group border border-secondary/10"
        >
          <span className="material-symbols-outlined text-2xl">support_agent</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-label-lg text-label-lg pr-2 font-bold">
            Trò chuyện với chuyên gia
          </span>
        </Link>
      </div>
    </div>
  );
}
