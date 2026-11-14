import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Headphones, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  GraduationCap,
  School,
  Globe2,
  Laptop,
  Flame,
  Award,
  Layers,
  ChevronRight,
  Compass
} from 'lucide-react';
import { PRACTICE_CATEGORIES, PRACTICE_LIST } from '../data/practiceData';

export default function Practice() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Category matching Tab Từ vựng: 'ielts' | 'school' | 'cefr' | null
  // Default to null so user only sees category options initially
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('category') || null);
  
  // Sub-level matching Tab Từ vựng | null
  // Default to null so no level is pre-selected
  const [activeLevel, setActiveLevel] = useState(() => searchParams.get('level') || null);
  
  // Skill filter: 'all' | 'reading' | 'listening'
  const [activeSkill, setActiveSkill] = useState('all');
  
  // Search query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Submission history from localStorage
  const [practiceHistory, setPracticeHistory] = useState({});

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('dream_practice_history');
      if (savedHistory) {
        setPracticeHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Error reading practice history:', e);
    }
  }, []);

  // When changing primary category, do NOT pre-select any level (revealing sub-level options)
  const handleCategoryChange = (catId) => {
    if (activeCategory === catId) {
      // Toggle off if clicking the already active category
      setActiveCategory(null);
      setActiveLevel(null);
      setSearchQuery('');
      setActiveSkill('all');
      return;
    }
    setActiveCategory(catId);
    setActiveLevel(null); // Never pre-select any level
    setSearchQuery('');
    setActiveSkill('all');
  };

  // Active Category Object
  const currentCategoryObj = useMemo(() => {
    if (!activeCategory) return null;
    return PRACTICE_CATEGORIES.find(c => c.id === activeCategory) || null;
  }, [activeCategory]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    return {
      ielts: PRACTICE_LIST.filter(p => p.category === 'ielts').length,
      school: PRACTICE_LIST.filter(p => p.category === 'school').length,
      cefr: PRACTICE_LIST.filter(p => p.category === 'cefr').length
    };
  }, []);

  // Filtered practice items
  const filteredPractice = useMemo(() => {
    return PRACTICE_LIST.filter(item => {
      // 1. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSearch = 
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.session.toLowerCase().includes(q);
        if (!matchesSearch) return false;

        if (activeCategory && item.category !== activeCategory) return false;
        if (activeLevel && activeLevel !== 'all' && item.levelId !== activeLevel) return false;
        if (activeSkill !== 'all' && item.skill.toLowerCase() !== activeSkill.toLowerCase()) return false;
        return true;
      }

      // If no search query and no level selected: do not show items
      if (!activeCategory || !activeLevel) return false;

      const matchesCategory = item.category === activeCategory;
      const matchesLevel = activeLevel === 'all' || item.levelId === activeLevel;
      const matchesSkill = activeSkill === 'all' || item.skill.toLowerCase() === activeSkill.toLowerCase();
      return matchesCategory && matchesLevel && matchesSkill;
    });
  }, [activeCategory, activeLevel, activeSkill, searchQuery]);

  const getSkillIcon = (skill) => {
    switch (skill.toLowerCase()) {
      case 'listening':
        return <Headphones size={15} className="text-blue-600" />;
      case 'reading':
        return <BookOpen size={15} className="text-emerald-600" />;
      default:
        return <FileText size={15} className="text-amber-600" />;
    }
  };

  const getSkillBadgeColor = (skill) => {
    switch (skill.toLowerCase()) {
      case 'listening':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reading':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-2">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-500">Phòng học</span>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Practice (Luyện trên lớp)</span>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-xs px-2.5 py-0.5 bg-primary/10 text-primary font-bold rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Laptop size={13} />
                  <span>In-Class Practice Platform</span>
                </span>
                <span className="text-xs px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  <span>Chuẩn thao tác thi máy</span>
                </span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                Practice cho học sinh tại Dream Education
              </h1>
              <p className="mt-1 text-sm text-gray-600 max-w-3xl">
                Không gian làm bài tập trực tiếp trên lớp (Reading & Listening), rèn luyện thành thạo thao tác thi máy tính: Tô màu từ khóa (Highlight), Ghi chú (Note), Sao chép - Dán nhanh và giới hạn số từ chuẩn xác.
              </p>
            </div>

            {/* Quick Summary Pill */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-gray-200/90 shadow-2xs self-start lg:self-center">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0">
                <Award size={20} />
              </div>
              <div className="text-xs pr-2">
                <p className="text-gray-500 font-medium">Phân hệ đồng bộ</p>
                <p className="font-extrabold text-gray-900">Chuẩn Tab Từ vựng</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            1. PRIMARY CATEGORY TABS (Matching Tab Từ vựng)
            - IELTS (Lộ trình IELTS - Dream Education)
            - Tiếng Anh Phổ Thông (6 - 12 / THCS & THPT)
            - Khung chuẩn CEFR (A2 - C1)
           ======================================================== */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-2 shadow-xs mb-6 overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              {
                id: 'ielts',
                shortLabel: 'Lộ trình IELTS',
                badgeText: 'Beginner ➔ Advanced',
                icon: GraduationCap,
                count: categoryCounts.ielts
              },
              {
                id: 'school',
                shortLabel: 'Tiếng Anh Phổ Thông (6 - 12)',
                badgeText: 'THCS & THPT Global Success',
                icon: School,
                count: categoryCounts.school
              },
              {
                id: 'cefr',
                shortLabel: 'Khung chuẩn CEFR',
                badgeText: 'Quốc tế Level A2 ➔ C1',
                icon: Globe2,
                count: categoryCounts.cefr
              }
            ].map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left cursor-pointer border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md scale-[1.01]'
                      : 'hover:bg-gray-50 text-gray-700 border-transparent hover:border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs sm:text-sm font-extrabold truncate">
                        {cat.shortLabel}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {cat.count} bài
                      </span>
                    </div>
                    <span className={`text-[11px] block truncate ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                      {cat.badgeText}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Default Welcome state when no category is selected */}
        {!activeCategory && !searchQuery.trim() && (
          <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-8 sm:p-12 text-center shadow-xs mb-8 animate-pop-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              <Compass size={32} />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">
              Chọn chương trình luyện tập để bắt đầu
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Nhấn vào một trong các lộ trình ở trên (<strong>Lộ trình IELTS</strong>, <strong>Tiếng Anh Phổ Thông (6 - 12)</strong> hoặc <strong>Khung chuẩn CEFR</strong>) để mở danh sách cấp độ và bài luyện tập.
            </p>
          </div>
        )}

        {/* ========================================================
            2. SUB-LEVEL SELECTOR PILLS (Matching Tab Từ vựng Levels)
           ======================================================== */}
        {activeCategory && currentCategoryObj && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-5 mb-6 shadow-xs animate-pop-in">
            <div className="flex items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Cấp độ trong {currentCategoryObj.label}:
                </span>
                <p className="text-xs text-gray-500 mt-0.5">{currentCategoryObj.description}</p>
              </div>
              <span className="text-[11px] font-semibold text-gray-400 hidden sm:inline">
                Nhấn vào từng level để lọc bài tập
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {currentCategoryObj.levels.map(level => {
                const isActive = activeLevel === level.id;
                const countInLevel = PRACTICE_LIST.filter(
                  p => p.category === activeCategory && p.levelId === level.id
                ).length;

                return (
                  <button
                    key={level.id}
                    onClick={() => setActiveLevel(prev => prev === level.id ? null : level.id)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between gap-1 ${
                      isActive
                        ? 'bg-gradient-to-br from-[#2c4482] to-[#1e3061] text-white border-primary shadow-sm scale-[1.02]'
                        : 'bg-gray-50/70 hover:bg-gray-100 text-gray-700 border-gray-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-black truncate ${isActive ? 'text-white' : 'text-gray-900'}`}>
                        {level.name}
                      </span>
                      {level.isHot && (
                        <Flame size={12} className={isActive ? 'text-amber-300' : 'text-amber-500'} />
                      )}
                    </div>
                    <span className={`text-[10px] font-medium truncate ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {level.badge}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white border border-gray-200 text-gray-600'
                    }`}>
                      {countInLevel} bài
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Prompt when level is not selected yet */}
            {!activeLevel && !searchQuery.trim() && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3 text-xs text-blue-900 mt-4 animate-pop-in">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                  👆
                </div>
                <div>
                  <p className="font-bold text-gray-900">Vui lòng chọn một cấp độ ở trên</p>
                  <p className="text-gray-600 text-[11px]">
                    Nhấn vào từng level hoặc khối lớp để mở danh sách bài luyện tập và kỹ năng chi tiết.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            3. FILTERS & SEARCH BAR + 4. PRACTICE CARDS GRID
           ======================================================== */}
        {(activeLevel || searchQuery.trim()) && (
          <div className="animate-pop-in">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
              {/* Skill Filter Chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tất cả kỹ năng' },
                  { id: 'reading', label: 'Reading (Đọc hiểu)' },
                  { id: 'listening', label: 'Listening (Nghe hiểu)' }
                ].map(skill => (
                  <button
                    key={skill.id}
                    onClick={() => setActiveSkill(skill.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeSkill === skill.id
                        ? 'bg-primary text-white shadow-2xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {skill.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm bài luyện tập..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 pr-9 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* Practice Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPractice.map(item => {
                const history = practiceHistory[item.id];
                const isCompleted = !!history;

                return (
                  <div 
                    key={item.id}
                    className={`bg-white rounded-3xl border transition-all flex flex-col justify-between overflow-hidden group ${
                      item.isFeatured
                        ? 'border-primary/50 shadow-md ring-2 ring-primary/10'
                        : 'border-gray-200/90 shadow-xs hover:shadow-md hover:border-primary/40'
                    }`}
                  >
                    <div className="p-5 sm:p-6">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                            {item.session}
                          </span>
                          {item.isFeatured && (
                            <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-lg flex items-center gap-1">
                              <Flame size={12} className="text-amber-600" />
                              <span>Buổi học hôm nay</span>
                            </span>
                          )}
                        </div>

                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${getSkillBadgeColor(item.skill)}`}>
                          {getSkillIcon(item.skill)}
                          {item.skill}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors mb-2 leading-snug">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Meta Specs */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 bg-gray-50/80 p-3 rounded-2xl border border-gray-100 mb-4">
                        <div className="flex items-center gap-1.5">
                          <Clock size={13} className="text-gray-400" />
                          <span>{item.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FileText size={13} className="text-gray-400" />
                          <span>{item.totalQuestions} câu hỏi</span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 text-primary font-bold">
                          <Laptop size={13} />
                          <span>{item.dueDate || 'Luyện tập trực tiếp trên lớp'}</span>
                        </div>
                      </div>

                      {/* Completion Status */}
                      {isCompleted && (
                        <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 text-xs font-bold mb-3">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span>Đã làm: {history.score}/{history.total} câu ({Math.round((history.score / history.total) * 100)}%)</span>
                        </div>
                      )}
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-5 pt-0 space-y-2">
                      {(item.vocabId || item.id === 'pre-ielts-reading-1' || item.id === 'pre-ielts-reading-2') && (
                        <Link
                          to={`/vocab/${item.vocabId || item.id}`}
                          className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <BookOpen size={13} className="text-amber-600" />
                          <span>{item.vocabLabel || (item.id === 'pre-ielts-reading-1' ? 'Học 30 từ vựng Reading 1' : 'Học 30 từ vựng Reading 2')}</span>
                        </Link>
                      )}

                      <Link
                        to={`/practice/${item.id}`}
                        className={`w-full py-3 px-4 rounded-xl text-white font-extrabold text-xs text-center shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          item.isFeatured
                            ? 'bg-gradient-to-r from-primary to-[#1e3061] hover:opacity-95'
                            : 'bg-primary hover:bg-primary-container'
                        }`}
                      >
                        <span>{isCompleted ? 'Làm lại bài luyện tập' : 'Làm bài luyện tập ngay'}</span>
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state if nothing found */}
            {filteredPractice.length === 0 && (
              <div className="bg-white rounded-3xl border border-gray-200 p-12 text-center my-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-3">
                  <FileText size={24} />
                </div>
                <h3 className="text-base font-extrabold text-gray-900 mb-1">
                  {searchQuery ? 'Không tìm thấy bài luyện tập nào' : 'Chưa có bài luyện tập trong mục này'}
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  {searchQuery
                    ? `Không có bài học nào khớp với từ khóa "${searchQuery}".`
                    : 'Vui lòng chọn cấp độ hoặc kỹ năng khác để tiếp tục luyện tập.'}
                </p>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Xóa tìm kiếm
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
