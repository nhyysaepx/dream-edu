import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Volume2
} from 'lucide-react';
import { 
  getAllVocabSets, 
  deleteCustomVocabSet, 
  getMasteryData, 
  getStarredTerms 
} from '../data/vocabularySets';
import SetCreatorModal from '../components/vocabulary/SetCreatorModal';

export default function VocabHub() {
  const navigate = useNavigate();
  const [sets, setSets] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Reload sets from local storage
  const reloadSets = () => {
    setSets(getAllVocabSets());
  };

  useEffect(() => {
    reloadSets();
  }, []);

  const handleDeleteSet = (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Bạn có chắc chắn muốn xóa bộ từ vựng này?')) {
      deleteCustomVocabSet(id);
      reloadSets();
    }
  };

  // Filtered sets
  const filteredSets = sets.filter(s => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'grade10' && s.grade === 'Lớp 10') ||
      (activeFilter === 'custom' && !s.isOfficial);

    const matchesSearch = !searchQuery.trim() ||
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Featured default set
  const featuredSet = sets.find(s => s.id === 'unit-1-global-success-10') || sets[0];
  const featuredStarred = featuredSet ? getStarredTerms(featuredSet.id) : [];
  const featuredMastery = featuredSet ? getMasteryData(featuredSet.id) : {};
  const featuredMasteredCount = featuredSet 
    ? featuredSet.terms.filter(t => featuredMastery[t.id] === 'mastered').length 
    : 0;

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

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Quizlet Free Edition</span>
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold">
                100% Miễn phí
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Phòng Học Từ Vựng
            </h1>
            <p className="mt-1 text-sm sm:text-base text-gray-600 max-w-2xl">
              Hệ thống thẻ ghi nhớ thông minh, chế độ học thích ứng, kiểm tra và trò chơi ghép thẻ dành riêng cho học sinh Dream Education.
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

        {/* FEATURED SET HERO BANNER (Unit 1 - Global Success 10) */}
        {featuredSet && (
          <div className="bg-gradient-to-br from-[#002862] via-[#163e82] to-[#1e4488] rounded-3xl p-6 sm:p-8 md:p-10 text-white shadow-xl mb-12 relative overflow-hidden">
            {/* Background decorative circles */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl" />
            <div className="absolute right-1/4 -bottom-20 w-64 h-64 rounded-full bg-amber-400/10 pointer-events-none blur-3xl" />

            <div className="relative z-10 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-900 uppercase tracking-wider">
                  Bộ từ trọng tâm
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white backdrop-blur-xs">
                  {featuredSet.grade} • {featuredSet.book}
                </span>
                <span className="text-xs text-blue-200">
                  {featuredSet.terms.length} từ vựng chuẩn SGK
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2">
                {featuredSet.title}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base mb-6 leading-relaxed">
                {featuredSet.description}
              </p>

              {/* Progress mini indicator */}
              <div className="flex items-center gap-4 text-xs text-blue-200 mb-6 bg-white/10 p-3 rounded-2xl backdrop-blur-sm max-w-lg">
                <div>
                  <span className="block text-gray-300">Đã thành thạo:</span>
                  <strong className="text-white text-sm font-black">{featuredMasteredCount} / {featuredSet.terms.length}</strong>
                </div>
                <div className="border-l border-white/20 pl-4">
                  <span className="block text-gray-300">Từ gắn sao:</span>
                  <strong className="text-amber-300 text-sm font-black flex items-center gap-1">
                    <Star size={13} className="fill-amber-300" /> {featuredStarred.length}
                  </strong>
                </div>
              </div>

              {/* Fast mode buttons */}
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  to={`/vocab/${featuredSet.id}?mode=flashcards`}
                  className="px-4 py-2.5 bg-white text-primary hover:bg-blue-50 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 active:scale-95"
                >
                  <Layers size={16} />
                  <span>Thẻ ghi nhớ</span>
                </Link>

                <Link
                  to={`/vocab/${featuredSet.id}?mode=learn`}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-xs active:scale-95"
                >
                  <Brain size={16} />
                  <span>Chế độ Học (Learn)</span>
                </Link>

                <Link
                  to={`/vocab/${featuredSet.id}?mode=test`}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-xs active:scale-95"
                >
                  <FileText size={16} />
                  <span>Kiểm tra (Test)</span>
                </Link>

                <Link
                  to={`/vocab/${featuredSet.id}?mode=match`}
                  className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 active:scale-95"
                >
                  <Zap size={16} />
                  <span>Ghép thẻ (Match)</span>
                </Link>

                <Link
                  to={`/vocab/${featuredSet.id}?mode=write`}
                  className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 backdrop-blur-xs active:scale-95"
                >
                  <PenTool size={16} />
                  <span>Luyện viết</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* STUDY SETS LIST SECTION */}
        <div className="mb-12">
          {/* Section title & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Kho bộ thẻ từ vựng
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Chọn bộ thẻ để bắt đầu ôn luyện</p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeFilter === 'all'
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Tất cả ({sets.length})
              </button>
              <button
                onClick={() => setActiveFilter('grade10')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeFilter === 'grade10'
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Lớp 10
              </button>
              <button
                onClick={() => setActiveFilter('custom')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  activeFilter === 'custom'
                    ? 'bg-primary text-white border-primary shadow-2xs'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                Bộ từ tự tạo ({sets.filter(s => !s.isOfficial).length})
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bộ từ vựng theo tên bài học, chủ đề..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-2xs"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredSets.map((set) => {
              const mastery = getMasteryData(set.id);
              const masteredCount = set.terms.filter(t => mastery[t.id] === 'mastered').length;
              const percent = Math.round((masteredCount / set.terms.length) * 100);

              return (
                <div
                  key={set.id}
                  onClick={() => navigate(`/vocab/${set.id}`)}
                  className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-xs hover:shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group cursor-pointer relative"
                >
                  <div>
                    {/* Top tag & author */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-700">
                        {set.terms.length} thuật ngữ
                      </span>

                      {!set.isOfficial && (
                        <button
                          onClick={(e) => handleDeleteSet(e, set.id)}
                          className="p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                          title="Xóa bộ thẻ tự tạo này"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>

                    <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors line-clamp-1 mb-1">
                      {set.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4">
                      {set.description}
                    </p>
                  </div>

                  <div>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-1">
                        <span>Tiến độ ghi nhớ</span>
                        <span className={percent === 100 ? 'text-emerald-600 font-bold' : 'text-primary'}>
                          {masteredCount} / {set.terms.length} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full transition-all duration-300"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom CTA */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                      <span>Bắt đầu ôn tập</span>
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* WHY STUDY WITH DREAM VOCABULARY SECTION */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-8 sm:p-10 mb-8 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Phương pháp học tập hiện đại</span>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              Clone toàn bộ tính năng Quizlet Pro - Hoàn toàn miễn phí
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Không giới hạn số lượt học, không thu phí gói đăng ký, không có quảng cáo quấy rầy.
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
              <h4 className="text-sm font-bold text-gray-900 mb-1">Chế độ Học (Learn)</h4>
              <p className="text-xs text-gray-600">
                Lặp lại ngắt quãng thông minh giúp khắc sâu từ vựng vào trí nhớ dài hạn qua nhiều dạng bài tập.
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
          navigate(`/vocab/${newSet.id}`);
        }}
      />
    </div>
  );
}
