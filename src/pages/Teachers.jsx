import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import teacherPresentationImg from '../assets/teacher_presentation.jpg';
import teacherGraduationImg from '../assets/teacher_graduation.jpg';
import teacherQuynhImg from '../assets/teacher_quynh.jpg';

export default function Teachers() {
  const [activeTab, setActiveTab] = useState('all');
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

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

  const tabs = [
    { key: 'all', label: 'Tất cả hồ sơ' },
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
              ĐỘI NGŨ GIẢNG VIÊN ĐẲNG CẤP
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary font-bold mb-6 leading-tight">
              Học hỏi từ những kiến trúc sư của thành công học thuật
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Các nhà giáo của chúng tôi không chỉ giảng dạy; họ là những chuyên gia ngôn ngữ và nhà sư phạm tâm huyết, giàu kinh nghiệm giúp hàng ngàn học viên đỗ vào các trường đại học hàng đầu thế giới.
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

      {/* Main Profile Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pb-stack-lg text-left">
        {/* Section Heading & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Giảng viên & Nhà sáng lập
            </div>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Hồ sơ Chuyên gia Học thuật
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-primary text-on-primary shadow-sm scale-105'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Profile Card & Dossier Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & Key Info */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-secondary-container to-primary" />
            
            {/* Portrait Image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg border-4 border-surface-container-low group">
              <img
                src={teacherQuynhImg}
                alt="Thầy Nguyễn Tương Quỳnh - Founder & Lead Instructor"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2.5 right-2.5 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Đang giảng dạy & nhận học viên">
                <span className="material-symbols-outlined text-[16px] block">check</span>
              </div>
            </div>

            {/* Name & Titles */}
            <h3 className="font-headline-md text-headline-md text-primary font-bold mb-1">
              Nguyễn Tương Quỳnh
            </h3>
            <p className="text-secondary font-bold text-sm uppercase tracking-wider mb-2">
              Founder & Giám đốc Học thuật
            </p>
            <p className="text-on-surface-variant text-xs mb-6">
              Dream Education • Đà Nẵng, Việt Nam
            </p>

            {/* Key Metric Badges */}
            <div className="grid grid-cols-2 gap-2.5 mb-6 text-left">
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Chứng chỉ</span>
                <span className="text-base font-black text-primary">IELTS 7.5</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">Thạc sĩ UK</span>
                <span className="text-base font-black text-secondary">Distinction</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">ĐH Ngoại Ngữ</span>
                <span className="text-xs font-bold text-primary">Thủ khoa đầu ra</span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant/20">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase block">ĐH USTH</span>
                <span className="text-xs font-bold text-primary">Cử nhân CNTT</span>
              </div>
            </div>

            {/* Contact & Links */}
            <div className="space-y-2.5 text-xs text-left mb-6 pt-4 border-t border-outline-variant/20 text-on-surface-variant">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">mail</span>
                <a href="mailto:ngtquynh2001@gmail.com" className="hover:text-primary transition-colors font-medium">
                  ngtquynh2001@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">phone_iphone</span>
                <a href="tel:+84772486838" className="hover:text-primary transition-colors font-medium">
                  +84 772486838
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[18px] text-primary shrink-0">location_on</span>
                <span>58 Sơn Thủy 3, Ngũ Hành Sơn, Đà Nẵng</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5">
              <Link
                to="/contact"
                className="w-full py-3.5 rounded-xl font-label-lg text-sm text-center font-bold transition-all bg-primary text-on-primary hover:bg-primary-container shadow-xs hover:shadow-md block active:scale-95"
              >
                Đăng ký học cùng Thầy Quỳnh
              </Link>
              <Link
                to="/contact"
                className="w-full py-3 rounded-xl font-label-lg text-sm text-center font-bold transition-all border-2 border-primary text-primary hover:bg-primary/5 block"
              >
                Nhận tư vấn lộ trình học
              </Link>
            </div>
          </div>

          {/* Right Column: Detailed CV Dossier */}
          <div className="lg:col-span-8 space-y-6">
            {/* Bio Summary Card */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <div className="bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">format_quote</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Giới thiệu & Triết lý Giảng dạy</h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-4">
                  Thầy <strong>Nguyễn Tương Quỳnh</strong> là Giảng viên Tiếng Anh và Nhà sáng lập tại Dream Education với định hướng nghiên cứu sâu về <strong>thụ đắc từ vựng (Vocabulary Acquisition)</strong> và <strong>ứng dụng công nghệ trong giáo dục ngôn ngữ (Technology-Enhanced Learning)</strong>.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Bằng việc kết hợp nền tảng học thuật quốc tế vững vàng từ Vương quốc Anh với tư duy công nghệ liên ngành, thầy chú trọng triển khai các phương pháp sư phạm dựa trên dữ liệu ngữ liệu (Corpus-driven learning), mang đến trải nghiệm học tiếng Anh khoa học, thực tế, giúp học sinh Việt Nam bứt phá điểm số và phát triển năng lực ngôn ngữ toàn diện.
                </p>
              </div>
            )}

            {/* Education & Academic Honors */}
            {(activeTab === 'all' || activeTab === 'education') && (
              <div className="bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">school</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Học vấn & Bằng cấp Danh giá</h3>
                </div>

                <div className="space-y-6">
                  {/* Master Degree */}
                  <div className="relative pl-6 border-l-2 border-primary space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-xs" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-secondary-container/30 px-2.5 py-0.5 rounded-full border border-secondary/20">
                        Tháng 9/2024 – Tháng 10/2025
                      </span>
                      <span className="text-xs font-black text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        Tốt nghiệp Xuất sắc (Distinction)
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-primary">
                      Thạc sĩ Giảng dạy tiếng Anh (Master of Arts in TESOL)
                    </h4>
                    <p className="text-sm font-semibold text-on-surface">
                      Nottingham Trent University — Nottingham, Vương Quốc Anh 🇬🇧
                    </p>
                    <div className="bg-surface-container-low/60 rounded-xl p-3.5 text-xs text-on-surface-variant space-y-1.5 mt-2">
                      <p>
                        <strong>Luận văn Thạc sĩ:</strong> <em>"A Corpus-Driven Study and Learner Knowledge Investigation of Phrasal Verbs in Vietnamese High School EFL Textbooks"</em> (Khảo sát dựa trên ngữ liệu về cụm động từ trong sách giáo khoa tiếng Anh THPT Việt Nam — Người hướng dẫn: PGS. TS. David Wright).
                      </p>
                      <p>
                        <strong>Học phần chuyên sâu:</strong> Phân tích thụ đắc ngôn ngữ thứ hai (Second Language Learning), Phương pháp nghiên cứu khoa học, Giảng dạy và Kiểm tra đánh giá từ vựng (Teaching and Assessing Vocabulary).
                      </p>
                    </div>
                  </div>

                  {/* Bachelor of Arts in English */}
                  <div className="relative pl-6 border-l-2 border-primary space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-secondary-container border-4 border-white shadow-xs" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                        2022 – 2026
                      </span>
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
                        Thủ khoa niên khóa • GPA 3.38/4.0
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-primary">
                      Cử nhân Ngôn ngữ Anh (Bachelor of Arts, English Language)
                    </h4>
                    <p className="text-sm font-semibold text-on-surface">
                      Đại học Đà Nẵng (University of Da Nang) 🇻🇳
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Nhận Giấy khen tốt nghiệp với danh hiệu <strong>Thủ khoa (Valedictorian)</strong> ngành Ngôn ngữ Anh khóa 2022 - 2026.
                    </p>
                  </div>

                  {/* Bachelor of Science in ICT */}
                  <div className="relative pl-6 border-l-2 border-outline-variant/40 space-y-2">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-surface-container-high border-4 border-white shadow-xs" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                        2019 – 2022
                      </span>
                      <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                        GPA: 15.03/20 (tương đương 3.2/4.0)
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-primary">
                      Cử nhân Khoa học & Công nghệ Thông tin (BSc. ICT)
                    </h4>
                    <p className="text-sm font-semibold text-on-surface">
                      Trường Đại học Khoa học và Công nghệ Hà Nội (USTH) 🇻🇳
                    </p>
                    <p className="text-xs text-on-surface-variant">
                      Luận văn tốt nghiệp: <em>Evaluation Fairness In Mix IEEE 802.11ax and Legacy IEEE 802.11</em>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Teaching & Leadership Experience */}
            {(activeTab === 'all' || activeTab === 'experience') && (
              <div className="bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">work_history</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Kinh nghiệm Giảng dạy & Lãnh đạo</h3>
                </div>

                <div className="space-y-6">
                  {/* Dream Education */}
                  <div className="bg-surface-container-low/40 rounded-2xl p-5 border border-outline-variant/20 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-primary">
                        Sáng lập & Giám đốc Học thuật (Founder & Academic Director)
                      </h4>
                      <span className="text-xs font-bold bg-primary text-on-primary px-3 py-1 rounded-full">
                        Tháng 5/2025 – Hiện tại
                      </span>
                    </div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                      Dream Education
                    </p>
                    <ul className="text-xs sm:text-sm text-on-surface-variant space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>Trực tiếp thiết kế và chỉ đạo hệ thống chương trình đào tạo IELTS và Tiếng Anh học thuật chuẩn hóa.</li>
                      <li>Điều phối các chu kỳ kiểm định, đánh giá định kỳ và phân tích dữ liệu học tập của học viên.</li>
                      <li>Trực tiếp huấn luyện, cố vấn phương pháp cho các giáo viên và giám sát chất lượng từng lớp học.</li>
                    </ul>
                  </div>

                  {/* IELTS Fighter */}
                  <div className="bg-surface-container-low/40 rounded-2xl p-5 border border-outline-variant/20 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-primary">
                        Giảng viên IELTS (IELTS Instructor)
                      </h4>
                      <span className="text-xs font-bold bg-surface-container text-on-surface-variant px-3 py-1 rounded-full">
                        Tháng 3/2023 – Tháng 10/2024
                      </span>
                    </div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                      IELTS Fighter
                    </p>
                    <ul className="text-xs sm:text-sm text-on-surface-variant space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>Trực tiếp giảng dạy các lớp IELTS và General English cho học sinh THPT và sinh viên đại học (cấp độ A2 đến C1).</li>
                      <li>Hỗ trợ tối ưu hóa phương pháp học từ vựng và kỹ năng làm bài thi thực chiến cho học viên.</li>
                    </ul>
                  </div>

                  {/* TEDx */}
                  <div className="bg-surface-container-low/40 rounded-2xl p-5 border border-outline-variant/20 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-base sm:text-lg font-bold text-primary">
                        Đồng sáng lập (Co-Founder)
                      </h4>
                      <span className="text-xs font-bold bg-surface-container text-on-surface-variant px-3 py-1 rounded-full">
                        Tháng 12/2018 – Tháng 7/2019
                      </span>
                    </div>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                      TEDxYouth@TruongThiSt
                    </p>
                    <ul className="text-xs sm:text-sm text-on-surface-variant space-y-1.5 list-disc list-inside leading-relaxed">
                      <li>Xây dựng cơ cấu tổ chức và trực tiếp đàm phán thành công bản quyền chính thức từ tổ chức TED quốc tế.</li>
                      <li>Điều phối các ban chức năng về nội dung, hậu cần sự kiện, truyền thông và đào tạo diễn giả (speaker curation).</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Research & Technical Specialization */}
            {(activeTab === 'all' || activeTab === 'research') && (
              <div className="bg-white rounded-3xl border border-outline-variant/30 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2.5 mb-6 text-primary">
                  <span className="material-symbols-outlined text-2xl">psychology</span>
                  <h3 className="font-headline-sm text-headline-sm font-bold">Nghiên cứu Chuyên sâu & Năng lực Công nghệ</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-2xl">dataset</span>
                    </div>
                    <h5 className="font-bold text-primary text-sm mb-1">Ngôn ngữ học Ngữ liệu (Corpus Linguistics)</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Khai thác kho dữ liệu ngôn ngữ thực tế (Corpora) để phân tích tần suất cụm động từ và collocations, giúp học viên học đúng từ vựng tự nhiên nhất.
                    </p>
                  </div>

                  <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/30 text-secondary flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-2xl">laptop_chromebook</span>
                    </div>
                    <h5 className="font-bold text-primary text-sm mb-1">Công nghệ trong Giáo dục (EdTech)</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Tích hợp công cụ phần mềm và AI vào trải nghiệm học tập, xây dựng các ứng dụng hỗ trợ luyện đọc, phát âm và kiểm tra trực tuyến.
                    </p>
                  </div>

                  <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-2xl">quiz</span>
                    </div>
                    <h5 className="font-bold text-primary text-sm mb-1">Khảo thí & Đánh giá Năng lực (Testing)</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Thiết kế các đề kiểm tra chuẩn hóa theo khung tham chiếu châu Âu (CEFR) và IELTS, đánh giá chuẩn xác tiến trình thụ đắc ngôn ngữ.
                    </p>
                  </div>

                  <div className="bg-surface-container-low/50 p-4 rounded-2xl border border-outline-variant/20">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-2xl">terminal</span>
                    </div>
                    <h5 className="font-bold text-primary text-sm mb-1">Kỹ thuật & Công cụ Nghiên cứu</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      Thành thạo các phần mềm phân tích chuyên dụng: <strong>AntConc, LancsBox, SPSS</strong> và lập trình phân tích dữ liệu <strong>Python Machine Learning, JS, HTML/CSS</strong>.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/15 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">translate</span>
                    <span className="text-xs font-bold text-primary">Ngôn ngữ thành thạo:</span>
                    <span className="text-xs text-on-surface">Tiếng Việt (Bản ngữ) • Tiếng Anh (IELTS 7.5)</span>
                  </div>
                  <span className="text-[11px] font-semibold text-primary bg-white px-3 py-1 rounded-full border border-primary/20">
                    Nghiên cứu liên ngành: Ngôn ngữ học & Công nghệ
                  </span>
                </div>
              </div>
            )}
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
    </div>
  );
}
