import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import teacherPresentationImg from '../assets/teacher_presentation.jpg';
import teacherGraduationImg from '../assets/teacher_graduation.jpg';
import teacherQuynhImg from '../assets/teacher_quynh.jpg';

export default function Teachers() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeCvTab, setActiveCvTab] = useState('all');

  // Handle escape key to close modal & lock body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsCvModalOpen(false);
      }
    };
    if (isCvModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCvModalOpen]);

  const heroImages = [
    {
      src: teacherPresentationImg,
      alt: 'Thầy Nguyễn Tương Quỳnh thuyết trình và giảng dạy thực tế',
      caption: 'Hội thảo & Giảng dạy chuyên môn thực tế',
      tag: 'Hoạt động học thuật'
    },
    {
      src: teacherGraduationImg,
      alt: 'Lễ tốt nghiệp Thạc sĩ MA TESOL - Nottingham Trent University',
      caption: 'Lễ tốt nghiệp Thạc sĩ MA TESOL – Nottingham Trent University',
      tag: 'Tốt nghiệp Xuất sắc (Distinction)'
    }
  ];

  const handlePrevHeroImage = () => {
    setCurrentHeroImage((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };

  const cvTabs = [
    { key: 'all', label: 'Tất cả thông tin' },
    { key: 'education', label: 'Học vấn & Bằng cấp' },
    { key: 'experience', label: 'Kinh nghiệm giảng dạy' },
    { key: 'research', label: 'Nghiên cứu & Kỹ năng' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 text-left">
        <div className="flex flex-col md:flex-row items-center gap-gutter bg-surface-container-low rounded-3xl p-8 md:p-12 border border-outline-variant/30 shadow-xs">
          <div className="flex-1">
            <span className="inline-block bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full font-label-md text-label-md mb-4 font-semibold border border-secondary/20">
              ĐỘI NGŨ GIẢNG VIÊN NHIỀU KINH NGHIỆM
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6 leading-tight">
              Học hỏi từ những kiến trúc sư của thành công học thuật
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Các nhà giáo của chúng tôi không chỉ giảng dạy; họ là những chuyên gia ngôn ngữ và nhà sư phạm tâm huyết, giàu kinh nghiệm giúp hàng ngàn học viên đỗ vào các trường đại học trên toàn quốc, cũng như thắp sáng mục tiêu du học tại các nước trên thế giới.
            </p>
          </div>

          {/* Interactive Image Gallery / Slider */}
          <div className="flex-shrink-0 w-full md:w-5/12 space-y-3">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white group bg-surface-container-high">
              <img
                alt={heroImages[currentHeroImage].alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                src={heroImages[currentHeroImage].src}
              />
              
              {/* Badge Overlay */}
              <div className="absolute top-3 left-3 bg-primary/90 text-on-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                {heroImages[currentHeroImage].tag}
              </div>

              {/* Caption Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3.5 pt-8 text-white text-xs font-medium flex items-center justify-between">
                <span className="truncate pr-2 font-semibold">
                  {heroImages[currentHeroImage].caption}
                </span>
                <span className="text-[10px] text-white/90 shrink-0 bg-white/20 px-2 py-0.5 rounded-full font-bold">
                  {currentHeroImage + 1} / {heroImages.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <button
                type="button"
                onClick={handlePrevHeroImage}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-primary flex items-center justify-center shadow-md transition-all opacity-85 hover:opacity-100 hover:scale-110 cursor-pointer"
                aria-label="Ảnh trước"
              >
                <span className="material-symbols-outlined text-lg">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={handleNextHeroImage}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-primary flex items-center justify-center shadow-md transition-all opacity-85 hover:opacity-100 hover:scale-110 cursor-pointer"
                aria-label="Ảnh tiếp theo"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
              </button>
            </div>

            {/* Thumbnail Preview Strip */}
            <div className="grid grid-cols-2 gap-2.5">
              {heroImages.map((img, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCurrentHeroImage(idx)}
                  className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all cursor-pointer text-left ${
                    currentHeroImage === idx
                      ? 'border-primary bg-primary/5 shadow-xs ring-2 ring-primary/20'
                      : 'border-outline-variant/30 bg-white hover:bg-surface-container-low opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-12 h-10 object-cover rounded-lg shrink-0 border border-outline-variant/20"
                  />
                  <div className="min-w-0 flex-1 pr-1">
                    <p className={`text-[11px] font-bold truncate ${currentHeroImage === idx ? 'text-primary' : 'text-on-surface'}`}>
                      {img.tag}
                    </p>
                    <p className="text-[10px] text-on-surface-variant truncate">
                      {idx === 0 ? 'Giảng dạy lớp học' : 'Lễ tốt nghiệp UK'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Profile Section (Simple Card) */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg text-left">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-2">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Giảng viên & Nhà sáng lập
          </div>
          <h2 className="font-headline-md text-headline-md text-primary font-bold">
            Hồ sơ Giảng viên
          </h2>
          <p className="text-on-surface-variant text-sm mt-1">
            Đội ngũ học thuật giàu kinh nghiệm, trực tiếp giảng dạy và dẫn dắt học viên tại Dream Education.
          </p>
        </div>

        {/* Simple Profile Card */}
        <div className="bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary-container to-primary" />
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Portrait Column */}
            <div className="flex-shrink-0 w-full md:w-1/3 max-w-[280px] text-center">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md border-4 border-surface-container-low mx-auto group">
                <img
                  src={teacherQuynhImg}
                  alt="Thầy Nguyễn Tương Quỳnh - Founder & Lead Instructor"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Đang giảng dạy">
                  <span className="material-symbols-outlined text-[16px] block">check</span>
                </div>
              </div>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold border border-secondary/20">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                IELTS 7.5 • MA TESOL (Distinction)
              </div>
            </div>

            {/* Basic Info & Highlights Column */}
            <div className="flex-1 space-y-5 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-secondary block mb-1">
                  Founder & Giám đốc Học thuật
                </span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Nguyễn Tương Quỳnh
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">location_on</span>
                  Dream Education • Đà Nẵng, Việt Nam
                </p>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Thạc sĩ Giảng dạy tiếng Anh (MA TESOL - Tốt nghiệp Xuất sắc) tại Nottingham Trent University, Vương Quốc Anh. Thầy Quỳnh là Thủ khoa tốt nghiệp Cử nhân Ngôn ngữ Anh (ĐH Đà Nẵng) và Cử nhân CNTT (ĐH USTH Hà Nội). Với nhiều năm kinh nghiệm, thầy trực tiếp thiết kế lộ trình và giảng dạy, ứng dụng phương pháp nghiên cứu ngữ liệu (Corpus-driven learning) giúp học viên tiếp thu từ vựng tự nhiên và làm chủ các kỳ thi chuẩn hóa.
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">school</span>
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Học vị Thạc sĩ</span>
                    <span className="text-xs font-bold text-primary">MA TESOL (Distinction) – Nottingham Trent Univ (UK)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">emoji_events</span>
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Thành tích Thủ khoa</span>
                    <span className="text-xs font-bold text-primary">Thủ khoa Cử nhân Ngôn ngữ Anh – ĐH Đà Nẵng</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">laptop_mac</span>
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Nền tảng Công nghệ</span>
                    <span className="text-xs font-bold text-primary">Cử nhân CNTT – ĐH USTH Hà Nội</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-emerald-700 text-[20px] shrink-0 mt-0.5">psychology</span>
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase block">Hướng chuyên sâu</span>
                    <span className="text-xs font-bold text-primary">Ngôn ngữ học ngữ liệu & Thụ đắc từ vựng</span>
                  </div>
                </div>
              </div>

              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-label-lg text-sm font-bold transition-all bg-primary text-on-primary hover:bg-primary-container shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">description</span>
                  Xem CV chi tiết
                </button>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-label-lg text-sm font-bold transition-all border-2 border-primary text-primary hover:bg-primary/5 text-center flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  Đăng ký học cùng Thầy Quỳnh
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Educational Philosophy */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg text-left">
        <div className="bg-primary-container rounded-3xl p-8 md:p-12 text-center text-on-primary">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Triết lý đào tạo tại Dream Education
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-primary mb-6 font-bold">
            Chất lượng bảo chứng từ Chuyên gia Học thuật
          </h2>
          <p className="text-primary-fixed-dim text-sm sm:text-base max-w-2xl mx-auto mb-8">
            Chúng tôi tin rằng việc làm chủ ngôn ngữ không chỉ dựa trên luyện đề rập khuôn, mà cần một nền tảng khoa học thực chứng vững chắc cùng sự dẫn dắt tận tâm từ những người thầy giàu chuyên môn.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-left">
            <div className="bg-surface/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-surface/15 transition-all">
              <span className="material-symbols-outlined text-secondary-container text-[40px] mb-3">menu_book</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">Giáo trình Thực chứng (Corpus-driven)</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed text-xs sm:text-sm">
                Nội dung bài giảng được tinh chỉnh dựa trên dữ liệu ngôn ngữ thực tế, sát sườn với kỳ thi và phù hợp nhất với tư duy học sinh Việt Nam.
              </p>
            </div>
            <div className="bg-surface/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-surface/15 transition-all">
              <span className="material-symbols-outlined text-secondary-container text-[40px] mb-3">school</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">Chuẩn mực Quốc tế (MA TESOL UK)</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed text-xs sm:text-sm">
                Được đào tạo và tốt nghiệp xuất sắc (Distinction) tại Vương quốc Anh, bảo chứng tính chuẩn mực và sư phạm tiên tiến trong từng tiết học.
              </p>
            </div>
            <div className="bg-surface/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-surface/15 transition-all">
              <span className="material-symbols-outlined text-secondary-container text-[40px] mb-3">monitoring</span>
              <h4 className="font-headline-sm text-on-primary mb-2 font-bold">Cá nhân hóa & Đồng hành</h4>
              <p className="font-body-sm text-on-primary/80 leading-relaxed text-xs sm:text-sm">
                Theo dõi sát sao từng tiến bộ của học viên thông qua hệ thống đánh giá khoa học, cam kết hỗ trợ tận tâm đến khi đạt band điểm mục tiêu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed CV Modal Dialog */}
      {isCvModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsCvModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-outline-variant/20 bg-surface-container-lowest shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-2xl">badge</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-primary">
                    Hồ sơ Học thuật & CV Chi tiết
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Thầy Nguyễn Tương Quỳnh • Founder & Giám đốc Học thuật Dream Education
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsCvModalOpen(false)}
                className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary flex items-center justify-center transition-all cursor-pointer"
                aria-label="Đóng"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="px-6 sm:px-8 py-3 bg-surface-container-low/60 border-b border-outline-variant/20 flex gap-2 overflow-x-auto shrink-0">
              {cvTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCvTab(tab.key)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCvTab === tab.key
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-white text-on-surface-variant hover:bg-surface-container border border-outline-variant/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
              {/* Summary */}
              {(activeCvTab === 'all' || activeCvTab === 'education') && (
                <div className="bg-surface-container-low/40 rounded-2xl p-5 border border-outline-variant/20">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">format_quote</span>
                    Tóm tắt mục tiêu & Triết lý nghề nghiệp
                  </h4>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Giảng viên Tiếng Anh tâm huyết với định hướng nghiên cứu sâu sắc về <strong>thụ đắc từ vựng (Vocabulary Acquisition)</strong> và <strong>ứng dụng công nghệ trong giáo dục ngôn ngữ (Technology-Enhanced Learning)</strong>. Kết hợp nền tảng học thuật quốc tế vững chắc với kinh nghiệm thực tiễn nhằm triển khai phương pháp giảng dạy tân tiến, khoa học và tối ưu kết quả đầu ra cho học viên.
                  </p>
                </div>
              )}

              {/* Education Section */}
              {(activeCvTab === 'all' || activeCvTab === 'education') && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">school</span>
                    Quá trình đào tạo & Bằng cấp (Education)
                  </h4>

                  <div className="space-y-4">
                    {/* Master TESOL */}
                    <div className="p-5 rounded-2xl bg-white border border-outline-variant/25 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-secondary bg-secondary-container/30 px-2.5 py-0.5 rounded-full border border-secondary/20">
                          Tháng 9/2024 – Tháng 10/2025
                        </span>
                        <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                          Tốt nghiệp Xuất sắc (Distinction)
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-primary">
                        Thạc sĩ Giảng dạy tiếng Anh cho người nói ngôn ngữ khác (Master of Arts in TESOL)
                      </h5>
                      <p className="text-xs font-semibold text-on-surface">
                        Nottingham Trent University, Nottingham, Vương Quốc Anh 🇬🇧
                      </p>
                      <div className="text-xs text-on-surface-variant space-y-1.5 pt-2 border-t border-outline-variant/15">
                        <p>
                          <strong>Luận văn tốt nghiệp:</strong> <em>"A Corpus-Driven Study and Learner Knowledge Investigation of Phrasal Verbs in Vietnamese High School EFL Textbooks"</em> (Nghiên cứu dựa trên ngữ liệu và khảo sát hiểu biết của người học về cụm động từ trong SGK tiếng Anh THPT Việt Nam — Người hướng dẫn: PGS. TS. David Wright).
                        </p>
                        <p>
                          <strong>Học phần cốt lõi:</strong> Phân tích học ngôn ngữ thứ hai (Analyzing Second Language Learning), Phương pháp nghiên cứu khoa học (Research Methods), Giảng dạy và Đánh giá từ vựng (Teaching and Assessing Vocabulary).
                        </p>
                      </div>
                    </div>

                    {/* Bachelor of English */}
                    <div className="p-5 rounded-2xl bg-white border border-outline-variant/25 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                          2022 – 2026
                        </span>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                          Thủ khoa niên khóa • GPA: 3.38/4.0
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-primary">
                        Cử nhân Ngôn ngữ Anh (Bachelor of Arts, English Language)
                      </h5>
                      <p className="text-xs font-semibold text-on-surface">
                        Đại học Đà Nẵng (University of Da Nang) 🇻🇳
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Nhận Giấy khen tốt nghiệp danh hiệu <strong>Thủ khoa (Valedictorian)</strong> ngành Ngôn ngữ Anh khóa 2022 - 2026.
                      </p>
                    </div>

                    {/* Bachelor of ICT */}
                    <div className="p-5 rounded-2xl bg-white border border-outline-variant/25 shadow-xs space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                          2019 – 2022
                        </span>
                        <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                          GPA: 15.03/20 (tương đương 3.2/4.0)
                        </span>
                      </div>
                      <h5 className="text-base font-bold text-primary">
                        Cử nhân Khoa học & Công nghệ Thông tin (BSc. ICT)
                      </h5>
                      <p className="text-xs font-semibold text-on-surface">
                        Trường Đại học Khoa học và Công nghệ Hà Nội (USTH) 🇻🇳
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        Luận văn tốt nghiệp: <em>Evaluation Fairness In Mix IEEE 802.11ax and Legacy IEEE 802.11</em>.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Section */}
              {(activeCvTab === 'all' || activeCvTab === 'experience') && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">work</span>
                    Kinh nghiệm làm việc & Lãnh đạo (Work Experience)
                  </h4>

                  <div className="space-y-4">
                    {/* Dream Education */}
                    <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-sm sm:text-base font-bold text-primary">
                          Sáng lập & Giám đốc Học thuật (Founder)
                        </h5>
                        <span className="text-xs font-bold bg-primary text-on-primary px-2.5 py-0.5 rounded-full">
                          Tháng 5/2025 – Hiện tại
                        </span>
                      </div>
                      <p className="text-xs font-bold text-secondary">Dream Education</p>
                      <ul className="text-xs text-on-surface-variant space-y-1 list-disc list-inside leading-relaxed">
                        <li>Lãnh đạo các chương trình luyện thi IELTS; quản lý thiết kế giáo trình và đào tạo phát triển đội ngũ giáo viên.</li>
                        <li>Điều phối chu trình khảo thí, kiểm tra đánh giá định kỳ; cố vấn giáo viên và theo dõi tiến độ qua hệ thống dữ liệu.</li>
                      </ul>
                    </div>

                    {/* IELTS Fighter */}
                    <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-sm sm:text-base font-bold text-primary">
                          Giảng viên IELTS (IELTS Instructor)
                        </h5>
                        <span className="text-xs font-bold bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full">
                          Tháng 3/2023 – Tháng 10/2024
                        </span>
                      </div>
                      <p className="text-xs font-bold text-secondary">IELTS Fighter</p>
                      <ul className="text-xs text-on-surface-variant space-y-1 list-disc list-inside leading-relaxed">
                        <li>Trực tiếp giảng dạy IELTS và Tiếng Anh Giao tiếp cho học sinh THPT và sinh viên đại học (cấp độ A2 đến C1).</li>
                      </ul>
                    </div>

                    {/* TEDx */}
                    <div className="p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/20 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h5 className="text-sm sm:text-base font-bold text-primary">
                          Đồng sáng lập (Co-Founder)
                        </h5>
                        <span className="text-xs font-bold bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full">
                          Tháng 12/2018 – Tháng 7/2019
                        </span>
                      </div>
                      <p className="text-xs font-bold text-secondary">TEDxYouth@TruongThiSt</p>
                      <ul className="text-xs text-on-surface-variant space-y-1 list-disc list-inside leading-relaxed">
                        <li>Xây dựng cơ cấu tổ chức và xin thành công giấy phép bản quyền chính thức từ TED quốc tế; chỉ đạo các ban sự kiện, truyền thông và đào tạo diễn giả.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Research & Technical Skills */}
              {(activeCvTab === 'all' || activeCvTab === 'research') && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">terminal</span>
                    Nghiên cứu & Kỹ năng kỹ thuật (Research & Technical Skills)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="text-xs font-bold text-primary block mb-1">Kỹ năng kỹ thuật & Thống kê</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        SPSS, AntConc, LancsBox, Lập trình JavaScript, HTML, CSS, Machine Learning (Python).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="text-xs font-bold text-primary block mb-1">Hướng nghiên cứu chuyên sâu</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Corpus linguistics for EFL learning, Technology-enhanced Learning, Vocabulary Acquisition and Language Testing.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="text-xs font-bold text-primary block mb-1">Năng lực ngôn ngữ</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Tiếng Việt (Bản ngữ) • Tiếng Anh (IELTS 7.5).
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-surface-container-low/60 border border-outline-variant/20">
                      <span className="text-xs font-bold text-primary block mb-1">Thông tin liên hệ trực tiếp</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Email: ngtquynh2001@gmail.com • Điện thoại: +84 772486838
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-outline-variant/20 bg-surface-container-low/40 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-on-surface-variant">
                Bản quyền hồ sơ giảng viên thuộc Dream Education
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setIsCvModalOpen(false)}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl border border-outline-variant/40 text-on-surface-variant text-xs font-bold hover:bg-surface-container transition-colors cursor-pointer"
                >
                  Đóng
                </button>
                <Link
                  to="/contact"
                  className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all text-center shadow-xs"
                >
                  Đăng ký tư vấn học
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
