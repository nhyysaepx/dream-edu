import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Layers, 
  Brain, 
  FileText, 
  Zap, 
  PenTool, 
  Plus, 
  Search, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Award, 
  Star, 
  Trash2, 
  ArrowRight, 
  GraduationCap, 
  CheckCircle2, 
  School, 
  Globe2, 
  FolderHeart,
  HardDrive,
  Headphones,
  Compass,
  Check,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { 
  getAllVocabSets, 
  deleteCustomVocabSet, 
  getMasteryData, 
  getStarredTerms, 
  importSharedSetFromUrl 
} from '../data/vocabularySets';
import SetCreatorModal from '../components/vocabulary/SetCreatorModal';

export default function VocabHub() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sets, setSets] = useState([]);

  // Active Category: 'ielts' | 'school' | 'cefr' | 'custom' | null
  // Default to null so user only sees category options initially
  const [activeCategory, setActiveCategory] = useState(() => searchParams.get('category') || null);
  // Active Sub-Level (e.g. 'pre-ielts', 'grade-10', 'a2') | null
  // Default to null so no level is pre-selected
  const [subFilter, setSubFilter] = useState(() => searchParams.get('level') || null);
  // Optional skill filter for IELTS: 'all' | 'reading' | 'listening' | 'writing'
  const [skillFilter, setSkillFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  const [importedNotice, setImportedNotice] = useState(null);

  // Reload sets from local storage
  const reloadSets = () => {
    setSets(getAllVocabSets());
  };

  useEffect(() => {
    reloadSets();
  }, []);

  // Check if opening via a shared link
  useEffect(() => {
    const sharedData = searchParams.get('sharedData');
    if (sharedData) {
      const imported = importSharedSetFromUrl(sharedData);
      if (imported) {
        reloadSets();
        setImportedNotice(imported);
        setActiveCategory('custom');
        setSubFilter('all');
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  // Switch Category and do NOT pre-select any level (revealing sub-level options)
  const handleCategoryChange = (cat) => {
    if (activeCategory === cat) {
      // Toggle off if clicking the already active category
      setActiveCategory(null);
      setSubFilter(null);
      setSkillFilter('all');
      setSearchQuery('');
      return;
    }
    setActiveCategory(cat);
    setSubFilter(null); // Never pre-select any level
    setSkillFilter('all');
    setSearchQuery('');
  };

  const handleDeleteSet = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Bạn có chắc chắn muốn xóa bộ từ vựng này?')) {
      deleteCustomVocabSet(id);
      reloadSets();
    }
  };

  // Helper to count sets for each sub-level
  const getLevelLessonCount = (catId, levelId) => {
    return sets.filter(s => {
      if (catId === 'ielts') return s.category === 'ielts' && s.ieltsLevel === levelId;
      if (catId === 'school') return (s.category === 'school' || s.grade?.startsWith('Lớp')) && s.gradeLevel === levelId;
      if (catId === 'cefr') return s.category === 'cefr' && s.cefrLevel === levelId;
      return !s.isOfficial;
    }).length;
  };

  // Filtered sets based on activeCategory, subFilter, skillFilter and search query
  const filteredSets = useMemo(() => {
    return sets.filter(s => {
      // 1. Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = s.title?.toLowerCase().includes(q);
        const matchDesc = s.description?.toLowerCase().includes(q);
        const matchTags = s.tags?.some(tag => tag.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchTags) return false;

        if (activeCategory === 'school') {
          if (s.category !== 'school' && !s.grade?.startsWith('Lớp')) return false;
          if (subFilter && subFilter !== 'all' && s.gradeLevel !== subFilter) return false;
        } else if (activeCategory === 'ielts') {
          if (s.category !== 'ielts') return false;
          if (subFilter && subFilter !== 'all' && s.ieltsLevel !== subFilter) return false;
          if (skillFilter !== 'all' && s.skill !== skillFilter) return false;
        } else if (activeCategory === 'cefr') {
          if (s.category !== 'cefr') return false;
          if (subFilter && subFilter !== 'all' && s.cefrLevel !== subFilter) return false;
        } else if (activeCategory === 'custom') {
          if (s.isOfficial) return false;
        }
        return true;
      }

      // If no search query and no level selected: do not show lessons
      if (!activeCategory || !subFilter) return false;

      // 2. Category & Level check
      if (activeCategory === 'school') {
        if (s.category !== 'school' && !s.grade?.startsWith('Lớp')) return false;
        if (subFilter !== 'all' && s.gradeLevel !== subFilter) return false;
      } else if (activeCategory === 'ielts') {
        if (s.category !== 'ielts') return false;
        if (subFilter !== 'all' && s.ieltsLevel !== subFilter) return false;
        if (skillFilter !== 'all' && s.skill !== skillFilter) return false;
      } else if (activeCategory === 'cefr') {
        if (s.category !== 'cefr') return false;
        if (subFilter !== 'all' && s.cefrLevel !== subFilter) return false;
      } else if (activeCategory === 'custom') {
        if (s.isOfficial) return false;
      }

      return true;
    });
  }, [sets, activeCategory, subFilter, skillFilter, searchQuery]);

  // Counts for each category tab
  const counts = useMemo(() => {
    return {
      school: sets.filter(s => s.category === 'school' || s.grade?.startsWith('Lớp')).length,
      ielts: sets.filter(s => s.category === 'ielts').length,
      cefr: sets.filter(s => s.category === 'cefr').length,
      custom: sets.filter(s => !s.isOfficial).length
    };
  }, [sets]);

  const categoriesConfig = [
    {
      id: 'ielts',
      label: 'Lộ trình IELTS - Dream Education',
      shortLabel: 'Lộ trình IELTS',
      icon: GraduationCap,
      count: counts.ielts,
      description: 'Lộ trình từ vựng chuẩn hóa của Dream Education từ IELTS Beginner (3.0) đến IELTS Advanced (6.5+).',
      levels: [
        { id: 'ielts-beginner', name: 'IELTS Beginner', band: 'Band 3.0 - 4.0' },
        { id: 'pre-ielts', name: 'Pre-IELTS', band: 'Band 4.0 - 5.0 (Trọng tâm)', isHot: true },
        { id: 'ielts-foundation', name: 'IELTS Foundation', band: 'Band 5.0 - 6.0' },
        { id: 'ielts-advanced', name: 'IELTS Advanced', band: 'Band 6.5+' }
      ]
    },
    {
      id: 'school',
      label: 'Tiếng Anh Phổ Thông (6 - 12)',
      shortLabel: 'Tiếng Anh 6 - 12',
      icon: School,
      count: counts.school,
      description: 'Trọn bộ từ vựng bám sát chương trình SGK Global Success từ Lớp 6 đến Lớp 12.',
      levels: [
        { id: 'grade-6', name: 'Lớp 6', band: 'Global Success' },
        { id: 'grade-7', name: 'Lớp 7', band: 'Global Success' },
        { id: 'grade-8', name: 'Lớp 8', band: 'Global Success' },
        { id: 'grade-9', name: 'Lớp 9', band: 'Global Success' },
        { id: 'grade-10', name: 'Lớp 10', band: 'Unit 1 (74 từ)', isHot: true },
        { id: 'grade-11', name: 'Lớp 11', band: 'Global Success' },
        { id: 'grade-12', name: 'Lớp 12', band: 'Global Success' }
      ]
    },
    {
      id: 'cefr',
      label: 'Khung chuẩn Châu Âu CEFR (A2 ➔ C1)',
      shortLabel: 'Khung CEFR (A2 - C1)',
      icon: Globe2,
      count: counts.cefr,
      description: 'Hệ thống từ vựng học thuật quốc tế phân chia theo chuẩn Khung tham chiếu Châu Âu từ A2 đến C1.',
      levels: [
        { id: 'a2', name: 'Level A2', band: 'Pre-Intermediate' },
        { id: 'b1', name: 'Level B1', band: 'Intermediate' },
        { id: 'b2', name: 'Level B2', band: 'Upper-Intermediate' },
        { id: 'c1', name: 'Level C1', band: 'Advanced' }
      ]
    },
    {
      id: 'custom',
      label: 'Bộ từ của bạn (Tự tạo & Được chia sẻ)',
      shortLabel: 'Bộ từ của bạn',
      icon: FolderHeart,
      count: counts.custom,
      description: 'Các bộ từ vựng do chính bạn hoặc giáo viên tự tạo và lưu trữ vĩnh viễn trên trình duyệt này.',
      levels: [
        { id: 'all', name: 'Tất cả bộ từ tự tạo', band: `${counts.custom} bộ từ` }
      ]
    }
  ];

  const currentCategoryConfig = categoriesConfig.find(c => c.id === activeCategory);
  const currentSubLevel = currentCategoryConfig?.levels?.find(l => l.id === subFilter);

  // Skill counts in current level for IELTS
  const skillCounts = useMemo(() => {
    if (activeCategory !== 'ielts' || !subFilter) return {};
    const levelSets = sets.filter(s => s.category === 'ielts' && s.ieltsLevel === subFilter);
    return {
      all: levelSets.length,
      reading: levelSets.filter(s => s.skill === 'reading').length,
      listening: levelSets.filter(s => s.skill === 'listening').length,
      writing: levelSets.filter(s => s.skill === 'writing').length
    };
  }, [sets, activeCategory, subFilter]);

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Phòng học</span>
          <span>/</span>
          <span className="text-primary font-bold">Học từ vựng</span>
        </div>

        {/* Imported Notification Banner */}
        {importedNotice && (
          <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pop-in shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-emerald-950">
                  Đã nhận bộ từ mới: "{importedNotice.title}"
                </h4>
                <p className="text-xs text-emerald-800 mt-0.5">
                  Bộ từ gồm <strong>{importedNotice.terms.length} thuật ngữ</strong> đã được tự động lưu vĩnh viễn vào thiết bị của bạn.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                onClick={() => setImportedNotice(null)}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 font-semibold"
              >
                Đóng
              </button>
              <button
                onClick={() => navigate(`/vocab/${importedNotice.id}`)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
              >
                Vào học ngay
              </button>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Học từ vựng thông minh</span>
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                100% Miễn phí
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-500 bg-white px-2.5 py-0.5 rounded-full border border-gray-200">
                <HardDrive size={12} className="text-primary" />
                <span>Tự động lưu vĩnh viễn</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Phòng Học Từ Vựng
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 max-w-2xl">
              Chọn một lộ trình học tập để mở các cấp độ và bài học (Reading, Listening, Writing) ôn luyện toàn diện.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={() => setIsCreatorOpen(true)}
            className="self-start md:self-auto px-5 py-3 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <Plus size={18} />
            <span>Tạo bộ từ mới / Import</span>
          </button>
        </div>

        {/* ========================================================
            1. PRIMARY PROGRAM TABS (IELTS | School 6-12 | CEFR | Custom)
           ======================================================== */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-2 shadow-xs mb-6 overflow-x-auto no-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 min-w-[640px] md:min-w-0">
            {categoriesConfig.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left cursor-pointer border ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-md'
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
                        {cat.count}
                      </span>
                    </div>
                    <span className={`text-[11px] block truncate ${isActive ? 'text-blue-100' : 'text-gray-400'}`}>
                      {cat.id === 'ielts' ? 'Beginner đến Advanced' : cat.id === 'school' ? 'Lớp 6 đến Lớp 12' : cat.id === 'cefr' ? 'Chuẩn A2 - C1' : 'Tự tạo & Lưu trữ'}
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
              Chọn chương trình học để bắt đầu
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-lg mx-auto leading-relaxed">
              Nhấn vào một trong các lộ trình ở trên (<strong>Lộ trình IELTS</strong>, <strong>Tiếng Anh 6 - 12</strong>, <strong>Khung CEFR</strong> hoặc <strong>Bộ từ của bạn</strong>) để mở danh sách cấp độ và ôn luyện từ vựng.
            </p>
          </div>
        )}

        {/* ========================================================
            2. SUB-LEVEL SELECTOR TABS (Click a level to reveal its lessons)
            Appears only after user selects a category ("sau đó khi chọn mới nhảy ra các hộp thoại con")
           ======================================================== */}
        {activeCategory && currentCategoryConfig && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 mb-8 shadow-xs animate-pop-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Chọn cấp độ / Khối lớp để xem bài học:
                </span>
                <h3 className="text-lg font-black text-gray-900 mt-0.5">
                  {activeCategory === 'ielts' && 'Các Level IELTS (Nhấn vào từng level để xem các bài Reading, Listening...):'}
                  {activeCategory === 'school' && 'Chọn Khối Lớp để xem danh sách bài Unit:'}
                  {activeCategory === 'cefr' && 'Chọn Cấp Độ CEFR Quốc Tế:'}
                  {activeCategory === 'custom' && 'Bộ từ vựng do bạn tự tạo hoặc chia sẻ:'}
                </h3>
              </div>

              {/* Quick search input */}
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm bài học, chủ đề..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Level Tabs Row ("các hộp thoại con") */}
            <div className="flex flex-wrap gap-2.5 mb-4">
              {currentCategoryConfig?.levels?.map((lvl) => {
                const isSelected = subFilter === lvl.id;
                const lessonCount = getLevelLessonCount(activeCategory, lvl.id);

                return (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      setSubFilter(prev => prev === lvl.id ? null : lvl.id);
                      setSkillFilter('all');
                    }}
                    className={`px-4 py-3 rounded-2xl border text-left transition-all relative flex items-center gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-primary bg-primary text-white shadow-md ring-2 ring-primary/20 scale-[1.02]'
                        : 'border-gray-200 bg-gray-50/70 hover:bg-white hover:border-primary/40 text-gray-800'
                    }`}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs sm:text-sm font-black ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                          {lvl.name}
                        </span>
                        {lvl.isHot && (
                          <span className={`px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider ${
                            isSelected ? 'bg-amber-300 text-slate-900' : 'bg-amber-400 text-slate-900'
                          }`}>
                            Hot
                          </span>
                        )}
                      </div>
                      <span className={`text-[11px] font-medium ${isSelected ? 'text-blue-100' : 'text-gray-500'}`}>
                        {lvl.band} • <strong className={isSelected ? 'text-white' : 'text-primary'}>{lessonCount} bài học</strong>
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white ml-1">
                        <Check size={14} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Guide hint when level is not yet selected */}
            {!subFilter && !searchQuery.trim() && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center gap-3 text-xs text-blue-900 animate-pop-in">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                  👆
                </div>
                <div>
                  <p className="font-bold text-gray-900">Vui lòng chọn một cấp độ ở trên</p>
                  <p className="text-gray-600 text-[11px]">
                    Nhấn vào từng level hoặc khối lớp để mở danh sách bài học và kỹ năng chi tiết.
                  </p>
                </div>
              </div>
            )}

            {/* Optional Skill Filter (For IELTS: All | Reading | Listening | Writing) */}
            {activeCategory === 'ielts' && subFilter && (
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 animate-pop-in">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-gray-500">Lọc kỹ năng trong level này:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSkillFilter('all')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        skillFilter === 'all'
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Tất cả bài ({skillCounts.all || 0})
                    </button>
                    <button
                      onClick={() => setSkillFilter('reading')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        skillFilter === 'reading'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <BookOpen size={13} />
                      <span>Reading ({skillCounts.reading || 0})</span>
                    </button>
                    <button
                      onClick={() => setSkillFilter('listening')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        skillFilter === 'listening'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <Headphones size={13} />
                      <span>Listening ({skillCounts.listening || 0})</span>
                    </button>
                    <button
                      onClick={() => setSkillFilter('writing')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                        skillFilter === 'writing'
                          ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <PenTool size={13} />
                      <span>Writing ({skillCounts.writing || 0})</span>
                    </button>
                  </div>
                </div>

                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Đang hiển thị {filteredSets.length} bài học
                </span>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            3. LESSONS GRID (Reading 1, Reading 2, Listening 1...)
            Only visible when subFilter is chosen OR user searched
           ======================================================== */}
        {(subFilter || searchQuery.trim()) && (
          <div className="mb-14 animate-pop-in">
            <div className="flex items-center justify-between mb-5 px-1">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-primary block">
                  {searchQuery ? 'Kết quả tìm kiếm:' : 'Cấp độ đang chọn:'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 flex items-center gap-2">
                  {searchQuery ? (
                    <span>"{searchQuery}"</span>
                  ) : (
                    <>
                      <span>{currentSubLevel?.name}</span>
                      {currentSubLevel?.band && (
                        <span className="text-sm font-semibold text-gray-500">({currentSubLevel.band})</span>
                      )}
                    </>
                  )}
                  <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2.5 py-0.5 rounded-full">
                    {filteredSets.length} bài học
                  </span>
                </h3>
              </div>

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-gray-500 hover:text-primary underline cursor-pointer"
                >
                  Xóa tìm kiếm
                </button>
              )}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => {
              const mastery = getMasteryData(set.id);
              const masteredCount = set.terms.filter(t => mastery[t.id] === 'mastered').length;
              const percent = Math.round((masteredCount / set.terms.length) * 100);

              // Skill Icon and Color theme
              let SkillIcon = BookOpen;
              let skillBadgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
              let skillAccentBg = 'bg-blue-500';

              if (set.skill === 'reading') {
                SkillIcon = BookOpen;
                skillBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
                skillAccentBg = 'bg-emerald-500';
              } else if (set.skill === 'listening') {
                SkillIcon = Headphones;
                skillBadgeColor = 'bg-blue-50 text-blue-800 border-blue-200';
                skillAccentBg = 'bg-blue-500';
              } else if (set.skill === 'writing') {
                SkillIcon = PenTool;
                skillBadgeColor = 'bg-purple-50 text-purple-800 border-purple-200';
                skillAccentBg = 'bg-purple-500';
              } else {
                SkillIcon = Sparkles;
                skillBadgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
                skillAccentBg = 'bg-amber-500';
              }

              return (
                <div
                  key={set.id}
                  onClick={() => navigate(`/vocab/${set.id}`)}
                  className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group cursor-pointer relative"
                >
                  <div>
                    {/* Top Badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {set.lesson ? (
                          <span className={`px-2.5 py-1 rounded-xl text-xs font-black border flex items-center gap-1 ${skillBadgeColor}`}>
                            <SkillIcon size={13} />
                            <span>{set.lesson}</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-xl text-xs font-bold border bg-gray-50 text-gray-700 border-gray-200">
                            {set.grade || 'Học phần'}
                          </span>
                        )}

                        <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-100">
                          {set.subtitle ? set.subtitle.split('•')[0].trim() : (set.grade || 'Dream')}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-primary font-black bg-primary/10 px-2.5 py-1 rounded-xl">
                          {set.terms.length} từ vựng
                        </span>

                        {!set.isOfficial && (
                          <button
                            onClick={(e) => handleDeleteSet(e, set.id)}
                            className="p-1 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                            title="Xóa bộ thẻ tự tạo này"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Set Title */}
                    <h4 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
                      {set.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-5 leading-relaxed">
                      {set.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-4 bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold mb-1.5">
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={12} className={percent > 0 ? 'text-emerald-500' : 'text-gray-400'} />
                          <span>Đã thuộc: {masteredCount} / {set.terms.length} từ</span>
                        </span>
                        <span className={percent === 100 ? 'text-emerald-600 font-black' : 'text-primary'}>
                          {percent}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Fast Mode Launchers */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-primary font-bold group-hover:translate-x-1 transition-transform">
                        <span>Bắt đầu học</span>
                        <ArrowRight size={14} />
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Link
                          to={`/vocab/${set.id}?mode=flashcards`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Thẻ ghi nhớ Flashcard 3D"
                        >
                          <Layers size={16} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=learn`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Chế độ Học thích ứng (10 câu lặp lại)"
                        >
                          <Brain size={16} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=test`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Kiểm tra trắc nghiệm / tự luận"
                        >
                          <FileText size={16} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=match`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Trò chơi Ghép thẻ (Match Game)"
                        >
                          <Zap size={16} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=diagnostic`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Diagnostic Test (Chuẩn đoán Receptive & Productive)"
                        >
                          <ClipboardCheck size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty Search / Filter state */}
          {filteredSets.length === 0 && (
            <div className="bg-white rounded-3xl border border-gray-200/90 p-12 text-center max-w-md mx-auto my-6 shadow-xs">
              <Search size={36} className="text-gray-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-900 mb-1">
                {searchQuery ? 'Không tìm thấy bài học nào' : 'Chưa có bài học trong cấp độ này'}
              </h4>
              <p className="text-xs text-gray-500 mb-6">
                {searchQuery
                  ? `Chưa có bài học phù hợp với từ khóa "${searchQuery}".`
                  : 'Vui lòng chọn cấp độ khác để tiếp tục học từ vựng.'}
              </p>
              <button
                onClick={() => {
                  setSkillFilter('all');
                  setSearchQuery('');
                }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-all cursor-pointer"
              >
                Xem tất cả bài học của cấp độ này
              </button>
            </div>
          )}
        </div>
        )}

        {/* Informative Methodology Banner */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 mb-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Phương pháp học tập hiện đại</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Đầy đủ tính năng học tập chuyên sâu - Hoàn toàn miễn phí
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Tối ưu cho học sinh trường phổ thông và lộ trình luyện thi IELTS từ Beginner đến Advanced.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-primary flex items-center justify-center mb-3">
                <Layers size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Thẻ Flashcards 3D</h4>
              <p className="text-xs text-gray-600">
                Lật thẻ mượt mà, tự động phát âm chuẩn bản xứ, hỗ trợ phím tắt và chế độ học từ gắn sao.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Brain size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Chế độ Học 10 câu</h4>
              <p className="text-xs text-gray-600">
                Lặp lại ngắt quãng thông minh, tự động lặp lại những câu bạn làm sai sau 10 câu trước khi chuyển tiếp.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Zap size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Ghép thẻ (Match Game)</h4>
              <p className="text-xs text-gray-600">
                Trò chơi thi đua tốc độ ghép từ vựng với bảng thành tích cá nhân và hiệu ứng ăn mừng kịch tính.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50/70 border border-gray-100">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                <FileText size={20} />
              </div>
              <h4 className="text-sm font-bold text-gray-900 mb-1">Kiểm tra & Xuất in</h4>
              <p className="text-xs text-gray-600">
                Tùy biến đề thi trắc nghiệm, đúng/sai, tự luận chấm điểm tức thì và xuất file in tiện lợi.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Set Creator Modal */}
      <SetCreatorModal
        isOpen={isCreatorOpen}
        onClose={() => setIsCreatorOpen(false)}
        onCreated={(newSet) => {
          reloadSets();
          setActiveCategory('custom');
          navigate(`/vocab/${newSet.id}`);
        }}
      />
    </div>
  );
}
