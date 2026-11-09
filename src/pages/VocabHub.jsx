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
  HardDrive
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

  // Active Category: 'school' | 'ielts' | 'cefr' | 'custom'
  const [activeCategory, setActiveCategory] = useState('school');
  // Sub-filter inside active category
  const [subFilter, setSubFilter] = useState('all');
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
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  // Reset sub-filter when switching categories
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setSubFilter('all');
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

  // Filtered sets based on activeCategory, subFilter and search query
  const filteredSets = useMemo(() => {
    return sets.filter(s => {
      // 1. Category check
      if (activeCategory === 'school') {
        if (s.category !== 'school' && !s.grade?.startsWith('Lớp')) return false;
        if (subFilter !== 'all') {
          if (s.gradeLevel) {
            if (s.gradeLevel !== subFilter) return false;
          } else if (s.grade !== subFilter) {
            return false;
          }
        }
      } else if (activeCategory === 'ielts') {
        if (s.category !== 'ielts') return false;
        if (subFilter !== 'all' && s.ieltsLevel !== subFilter) return false;
      } else if (activeCategory === 'cefr') {
        if (s.category !== 'cefr') return false;
        if (subFilter !== 'all' && s.cefrLevel !== subFilter) return false;
      } else if (activeCategory === 'custom') {
        if (s.isOfficial) return false;
      }

      // 2. Search query check
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const matchTitle = s.title?.toLowerCase().includes(q);
      const matchDesc = s.description?.toLowerCase().includes(q);
      const matchTags = s.tags?.some(tag => tag.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchTags;
    });
  }, [sets, activeCategory, subFilter, searchQuery]);

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
      id: 'school',
      label: 'Tiếng Anh Phổ Thông (6 - 12)',
      shortLabel: 'Tiếng Anh 6 - 12',
      icon: School,
      count: counts.school,
      description: 'Trọn bộ từ vựng bám sát chương trình SGK Global Success từ Lớp 6 đến Lớp 12.',
      subFilters: [
        { id: 'all', label: 'Tất cả khối lớp' },
        { id: 'grade-6', label: 'Lớp 6' },
        { id: 'grade-7', label: 'Lớp 7' },
        { id: 'grade-8', label: 'Lớp 8' },
        { id: 'grade-9', label: 'Lớp 9' },
        { id: 'grade-10', label: 'Lớp 10 (Trọng tâm)' },
        { id: 'grade-11', label: 'Lớp 11' },
        { id: 'grade-12', label: 'Lớp 12' }
      ]
    },
    {
      id: 'ielts',
      label: 'Lộ trình IELTS - Dream Education',
      shortLabel: 'Lộ trình IELTS',
      icon: GraduationCap,
      count: counts.ielts,
      description: 'Lộ trình từ vựng chuẩn hóa của Dream Education từ IELTS Beginner (3.0) đến IELTS Advanced (6.5+).',
      subFilters: [
        { id: 'all', label: 'Tất cả các Level IELTS' },
        { id: 'ielts-beginner', label: 'IELTS Beginner (3.0 - 4.0)' },
        { id: 'pre-ielts', label: 'Pre-IELTS (4.0 - 5.0)' },
        { id: 'ielts-foundation', label: 'IELTS Foundation (5.0 - 6.0)' },
        { id: 'ielts-advanced', label: 'IELTS Advanced (6.5+)' }
      ]
    },
    {
      id: 'cefr',
      label: 'Khung chuẩn Châu Âu CEFR (A2 ➔ C1)',
      shortLabel: 'Khung CEFR (A2 - C1)',
      icon: Globe2,
      count: counts.cefr,
      description: 'Hệ thống từ vựng học thuật quốc tế phân chia theo chuẩn Khung tham chiếu Châu Âu từ A2 đến C1.',
      subFilters: [
        { id: 'all', label: 'Tất cả Level CEFR' },
        { id: 'a2', label: 'Level A2 (Pre-Intermediate)' },
        { id: 'b1', label: 'Level B1 (Intermediate)' },
        { id: 'b2', label: 'Level B2 (Upper-Intermediate)' },
        { id: 'c1', label: 'Level C1 (Advanced)' }
      ]
    },
    {
      id: 'custom',
      label: 'Bộ từ của bạn (Tự tạo & Được chia sẻ)',
      shortLabel: 'Bộ từ của bạn',
      icon: FolderHeart,
      count: counts.custom,
      description: 'Các bộ từ vựng do chính bạn hoặc giáo viên tự tạo và lưu trữ trên trình duyệt này.',
      subFilters: [
        { id: 'all', label: 'Tất cả bộ từ tự tạo' }
      ]
    }
  ];

  const currentCategoryConfig = categoriesConfig.find(c => c.id === activeCategory);

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
              Hệ thống thẻ ghi nhớ thông minh, chế độ học thích ứng 10 câu, kiểm tra và ghép từ theo chuẩn SGK, IELTS và khung CEFR.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={() => setIsCreatorOpen(true)}
            className="self-start md:self-auto px-5 py-3 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center gap-2 active:scale-95"
          >
            <Plus size={18} />
            <span>Tạo bộ từ mới / Import</span>
          </button>
        </div>

        {/* ========================================================
            CATEGORY SELECTION TABS (School 6-12 | IELTS | CEFR | Custom)
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
                  className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all text-left ${
                    isActive
                      ? 'bg-primary text-white shadow-md'
                      : 'hover:bg-gray-50 text-gray-700'
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
                      {cat.id === 'school' ? 'Lớp 6 đến Lớp 12' : cat.id === 'ielts' ? 'Band 3.0 - 7.5+' : cat.id === 'cefr' ? 'Chuẩn A2 - C1' : 'Tự tạo & Lưu trữ'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description & Search / Sub-Filters Bar */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 mb-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-5 border-b border-gray-100">
            <div>
              <h2 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                <span>{currentCategoryConfig?.label}</span>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {filteredSets.length} bộ từ
                </span>
              </h2>
              <p className="text-xs text-gray-500 mt-1 max-w-2xl">
                {currentCategoryConfig?.description}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-72">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm bộ từ theo tên, bài học..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/70 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {/* Sub-Filters Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {currentCategoryConfig?.subFilters.map((sub) => {
              const isActive = subFilter === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => setSubFilter(sub.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-xs'
                      : 'bg-gray-50/80 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {sub.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            VOCABULARY SETS GRID
           ======================================================== */}
        <div className="mb-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSets.map((set) => {
              const mastery = getMasteryData(set.id);
              const starred = getStarredTerms(set.id);
              const masteredCount = set.terms.filter(t => mastery[t.id] === 'mastered').length;
              const percent = Math.round((masteredCount / set.terms.length) * 100);

              // Category color badge
              let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
              if (set.category === 'ielts') {
                badgeColor = 'bg-amber-50 text-amber-800 border-amber-200';
              } else if (set.category === 'cefr') {
                badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200';
              } else if (!set.isOfficial) {
                badgeColor = 'bg-purple-50 text-purple-800 border-purple-200';
              }

              return (
                <div
                  key={set.id}
                  onClick={() => navigate(`/vocab/${set.id}`)}
                  className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    {/* Top Tag & Actions */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${badgeColor}`}>
                          {set.subtitle || set.grade}
                        </span>
                        {set.lesson && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-primary text-white tracking-wider">
                            {set.lesson}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400 font-semibold">
                          {set.terms.length} từ
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
                    <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-1.5">
                      {set.title}
                    </h3>
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
                          <span>Đã thuộc: {masteredCount} / {set.terms.length}</span>
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
                      <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-primary font-semibold transition-colors">
                        <span className="text-[11px]">Bắt đầu học</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>

                      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <Link
                          to={`/vocab/${set.id}?mode=flashcards`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Thẻ ghi nhớ"
                        >
                          <Layers size={15} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=learn`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Chế độ Học (Learn)"
                        >
                          <Brain size={15} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=test`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-blue-50 transition-colors"
                          title="Kiểm tra"
                        >
                          <FileText size={15} />
                        </Link>
                        <Link
                          to={`/vocab/${set.id}?mode=match`}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                          title="Ghép thẻ (Match)"
                        >
                          <Zap size={15} />
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
            <div className="bg-white rounded-3xl border border-gray-200/90 p-12 text-center max-w-md mx-auto my-6">
              <Search size={36} className="text-gray-300 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-900 mb-1">Không tìm thấy bộ từ vựng nào</h4>
              <p className="text-xs text-gray-500 mb-6">
                Chưa có bộ từ phù hợp với bộ lọc hoặc từ khóa tìm kiếm "{searchQuery}".
              </p>
              {activeCategory === 'custom' ? (
                <button
                  onClick={() => setIsCreatorOpen(true)}
                  className="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-container transition-all"
                >
                  Tạo bộ từ đầu tiên của bạn
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSubFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Xem tất cả bộ từ
                </button>
              )}
            </div>
          )}
        </div>

        {/* Informative Methodology Banner */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 mb-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Phương pháp học tập hiện đại</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Đầy đủ tính năng học tập chuyên sâu - Hoàn toàn miễn phí
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Không giới hạn số lượt học, không thu phí gói đăng ký, tối ưu cho học sinh trường phổ thông và luyện thi IELTS.
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
