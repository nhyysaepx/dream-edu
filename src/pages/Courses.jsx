import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Courses() {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = [
    { key: 'All', label: 'Tất cả lộ trình' },
    { key: 'Luyện thi IELTS', label: 'Luyện thi IELTS' },
    { key: 'Tiếng Anh Thiếu Niên', label: 'Tiếng Anh Thiếu Niên' },
    { key: 'Tiếng Anh Mất Gốc', label: 'Tiếng Anh Mất Gốc' },
  ];

  const courses = [
    // Nhóm 1: Luyện thi IELTS
    {
      id: 'ielts-beginner',
      title: 'IELTS Beginner',
      category: 'Luyện thi IELTS',
      badge: '0 - 3.0',
      icon: 'flag',
      description: 'Xây dựng nền tảng từ vựng - ngữ pháp, làm quen với cấu trúc bài thi IELTS.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    {
      id: 'pre-ielts',
      title: 'Pre IELTS',
      category: 'Luyện thi IELTS',
      badge: '3.0 - 4.5',
      icon: 'auto_stories',
      description: 'Làm quen với các dạng bài tập IELTS đơn giản, kích thích sự tìm tòi và hứng thú khi học tiếng Anh.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    {
      id: 'ielts-foundation',
      title: 'IELTS Foundation',
      category: 'Luyện thi IELTS',
      badge: '4.5 - 5.5',
      icon: 'trending_up',
      description: 'Thực chiến với các dạng bài trung bình - khá, tiếp cận dần với đề thi và format thực tế.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    {
      id: 'ielts-advanced',
      title: 'IELTS Advanced',
      category: 'Luyện thi IELTS',
      badge: '5.5 - 6.5',
      icon: 'speed',
      description: 'Hoàn thiện toàn bộ 4 kỹ năng, làm chủ các dạng đề khó và chuẩn bị sẵn sàng cho kỳ thi IELTS.',
      stats: [
        { label: '36 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    {
      id: 'luyen-de-ielts',
      title: 'Luyện đề IELTS',
      category: 'Luyện thi IELTS',
      badge: '6.0 - 7.0+',
      icon: 'fact_check',
      description: 'Bồi dưỡng, nâng cao các kỹ năng chuyên sâu và chiến thuật phòng thi, sẵn sàng tối ưu điểm bài thi thật.',
      stats: [
        { label: '24 buổi', icon: 'schedule' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    // Nhóm 2: Tiếng Anh Thiếu Niên
    {
      id: 'tieng-anh-thieu-nien',
      title: 'Tiếng Anh Thiếu Niên',
      category: 'Tiếng Anh Thiếu Niên',
      badge: 'Level A2 - C1',
      icon: 'diversity_3',
      description: 'Lộ trình bài bản từ chuẩn A2 đến C1, phát triển toàn diện 4 kỹ năng, phù hợp cho học sinh cấp 2.',
      stats: [
        { label: 'Lớp tiêu chuẩn', icon: 'tune' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    },
    // Nhóm 3: Tiếng Anh Mất Gốc
    {
      id: 'tieng-anh-mat-goc',
      title: 'Tiếng Anh Mất Gốc',
      category: 'Tiếng Anh Mất Gốc',
      badge: 'Nền tảng căn bản',
      icon: 'foundation',
      description: 'Bồi dưỡng vững chắc nền tảng từ vựng và ngữ pháp cốt lõi, lấy lại tự tin cho người mới bắt đầu hoặc người mất gốc tiếng Anh.',
      stats: [
        { label: 'Lớp tiêu chuẩn', icon: 'tune' },
        { label: 'Tối đa 8 học viên', icon: 'groups' }
      ]
    }
  ];

  const filteredCourses = activeFilter === 'All' 
    ? courses 
    : courses.filter(c => c.category === activeFilter);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-md text-label-md uppercase tracking-wider font-semibold border border-secondary/20">
            Học thuật Xuất sắc
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight font-bold">
            Nâng tầm tiềm năng của bạn cùng <span className="text-secondary">Giảng viên Chuyên gia</span>.
          </h1>
          <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto leading-relaxed">
            Giáo trình được thiết kế bài bản cho những học viên đầy hoài bão. Từ nền tảng vững chắc đến luyện thi chuyên sâu, chúng tôi đồng hành cùng bạn trên con đường chinh phục thành công toàn cầu.
          </p>
        </div>
      </section>

      {/* Course Filters & Grid */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop pb-stack-lg text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-gutter mb-stack-md pb-6 border-b border-outline-variant/20">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold mb-1">Khóa học được Thiết kế Riêng</h2>
            <p className="text-on-surface-variant text-sm">Lựa chọn lộ trình phù hợp nhất với năng lực và mục tiêu của bạn.</p>
          </div>
          
          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveFilter(cat.key)}
                className={`px-4 py-2 rounded-xl font-label-md text-sm transition-all cursor-pointer font-bold ${
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

        {/* Course Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:border-primary/40 shadow-xs hover:shadow-xl group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary-container to-secondary-container opacity-80" />
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container border border-secondary/20 tracking-wide">
                    {course.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {course.icon}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-secondary uppercase tracking-wider mb-1">
                  {course.category}
                </div>

                <h3 className="font-headline-sm text-headline-sm font-bold mb-3 text-primary">
                  {course.title}
                </h3>
                
                <p className="text-body-sm font-body-sm mb-6 leading-relaxed text-on-surface-variant min-h-[44px]">
                  {course.description}
                </p>

                <div className="space-y-3 mb-8 pt-4 border-t border-outline-variant/20">
                  {course.stats.map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-on-surface">
                      <span className="material-symbols-outlined text-[18px] text-primary shrink-0">
                        {stat.icon}
                      </span>
                      <span className="text-label-md font-semibold text-xs">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link
                to="/contact"
                className="w-full py-3.5 rounded-xl font-label-lg text-sm text-center font-bold transition-all bg-primary text-on-primary hover:bg-primary-container shadow-xs hover:shadow-md active:scale-95"
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

      {/* Floating Action Button for Contact */}
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
