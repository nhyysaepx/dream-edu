import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Layers, 
  Brain, 
  FileText, 
  Zap, 
  PenTool, 
  ClipboardCheck,
  ArrowLeft, 
  Search, 
  Star, 
  Volume2, 
  Share2, 
  Download, 
  RotateCcw,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Filter,
  Check,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  getVocabSetById, 
  getStarredTerms, 
  toggleStarredTerm, 
  getMasteryData, 
  updateTermMastery, 
  resetMastery,
  generateShareableLink,
  downloadSetAsBackupFile
} from '../data/vocabularySets';
import { speakWord } from '../utils/speechUtils';

// Sub components
import FlashcardMode from '../components/vocabulary/FlashcardMode';
import LearnMode from '../components/vocabulary/LearnMode';
import MatchGameMode from '../components/vocabulary/MatchGameMode';
import TestMode from '../components/vocabulary/TestMode';
import WriteSpellMode from '../components/vocabulary/WriteSpellMode';
import DiagnosticTestMode from '../components/vocabulary/DiagnosticTestMode';
import ExportModal from '../components/vocabulary/ExportModal';

export default function VocabStudySet() {
  const { setId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const vocabSet = useMemo(() => getVocabSetById(setId || 'unit-1-global-success-10'), [setId]);

  // Active study mode from query params or default 'flashcards'
  const activeMode = searchParams.get('mode') || 'flashcards';

  const setMode = (mode) => {
    setSearchParams({ mode });
  };

  // Starred terms
  const [starredIds, setStarredIds] = useState([]);
  // Mastery status
  const [masteryData, setMasteryData] = useState({});
  // Search query for the term list below
  const [searchQuery, setSearchQuery] = useState('');
  const [termFilter, setTermFilter] = useState('all'); // 'all' | 'starred'
  const [showExportModal, setShowExportModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showTermList, setShowTermList] = useState(false);

  useEffect(() => {
    if (vocabSet) {
      setStarredIds(getStarredTerms(vocabSet.id));
      setMasteryData(getMasteryData(vocabSet.id));
    }
  }, [vocabSet]);

  const handleToggleStar = (termId) => {
    const updated = toggleStarredTerm(vocabSet.id, termId);
    setStarredIds(updated);
  };

  const handleUpdateMastery = (termId, status) => {
    const updated = updateTermMastery(vocabSet.id, termId, status);
    setMasteryData({ ...updated });
  };

  const handleResetMastery = () => {
    const updated = resetMastery(vocabSet.id);
    setMasteryData({ ...updated });
  };

  const handleShare = () => {
    const shareUrl = generateShareableLink(vocabSet);
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownloadBackup = () => {
    downloadSetAsBackupFile(vocabSet);
  };

  // Filtered term list for the bottom browser
  const filteredTerms = useMemo(() => {
    return vocabSet.terms.filter(item => {
      const matchesSearch = !searchQuery.trim() || 
        item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStar = termFilter !== 'starred' || starredIds.includes(item.id);
      return matchesSearch && matchesStar;
    });
  }, [vocabSet.terms, searchQuery, termFilter, starredIds]);

  // Mastery stats
  const totalTerms = vocabSet.terms.length;
  const masteredCount = vocabSet.terms.filter(t => masteryData[t.id] === 'mastered').length;
  const learningCount = vocabSet.terms.filter(t => masteryData[t.id] === 'learning').length;

  const studyModes = [
    { id: 'flashcards', label: 'Thẻ ghi nhớ', icon: Layers, desc: 'Lật thẻ 3D, tự động phát & phát âm' },
    { id: 'learn', label: 'Học (Learn)', icon: Brain, desc: 'Lộ trình ghi nhớ thích ứng thông minh' },
    { id: 'test', label: 'Kiểm tra (Test)', icon: FileText, desc: 'Trắc nghiệm, đúng/sai, tự luận' },
    { id: 'match', label: 'Ghép thẻ (Match)', icon: Zap, desc: 'Trò chơi đua tốc độ ghép từ' },
    { id: 'write', label: 'Chính tả (Write)', icon: PenTool, desc: 'Nghe phát âm và luyện gõ từ' },
    { id: 'diagnostic', label: 'Diagnostic Test', icon: ClipboardCheck, desc: 'Đánh giá chuẩn đoán từ vựng Receptive & Productive' }
  ];

  const renderTermListContent = () => (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-extrabold text-gray-900">
            Danh sách thuật ngữ ({filteredTerms.length} / {vocabSet.terms.length})
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Xem toàn bộ từ vựng, nghe phát âm chuẩn và gắn sao các từ khó để ôn tập
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTermFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              termFilter === 'all'
                ? 'bg-primary text-white border-primary shadow-2xs'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            Tất cả ({vocabSet.terms.length})
          </button>
          <button
            onClick={() => setTermFilter('starred')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
              termFilter === 'starred'
                ? 'bg-amber-500 text-white border-amber-600 shadow-2xs'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Star size={13} className={termFilter === 'starred' ? 'fill-white' : ''} />
            <span>Đã gắn sao ({starredIds.length})</span>
          </button>
        </div>
      </div>

      {/* Search bar inside list */}
      <div className="relative mb-5">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Tìm kiếm từ tiếng Anh hoặc nghĩa tiếng Việt..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>

      {/* Cards List */}
      <div className="space-y-2.5">
        {filteredTerms.map((item, index) => {
          const isStarred = starredIds.includes(item.id);
          const mastery = masteryData[item.id];

          return (
            <div
              key={item.id}
              className="p-4 rounded-2xl border border-gray-200/80 bg-white hover:border-primary/40 hover:shadow-xs transition-all flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <span className="text-xs font-bold text-gray-400 w-6 text-center flex-shrink-0">
                  {index + 1}
                </span>

                <button
                  onClick={() => speakWord(item.term)}
                  className="p-2 rounded-xl text-gray-400 hover:text-primary hover:bg-blue-50 transition-colors flex-shrink-0 cursor-pointer"
                  title="Phát âm từ này"
                >
                  <Volume2 size={18} />
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4 flex-1 min-w-0">
                  <span className="text-base font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                    {item.term}
                  </span>
                  <span className="text-sm font-medium text-gray-600 sm:border-l sm:border-gray-100 sm:pl-4">
                    {item.definition}
                  </span>
                </div>
              </div>

              {/* Right: Mastery badge & Star toggle */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {mastery === 'mastered' && (
                  <span className="hidden sm:inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Đã thuộc
                  </span>
                )}
                {mastery === 'learning' && (
                  <span className="hidden sm:inline-block text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Đang học
                  </span>
                )}

                <button
                  onClick={() => handleToggleStar(item.id)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  title="Gắn sao từ này"
                >
                  <Star
                    size={18}
                    className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-gray-300 hover:text-amber-400'}
                  />
                </button>
              </div>
            </div>
          );
        })}

        {filteredTerms.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            <Search size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold">Không tìm thấy từ vựng nào khớp với bộ lọc</p>
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className={`${activeMode === 'flashcards' ? 'pt-24 pb-20' : 'pt-20 sm:pt-24 pb-12'} bg-[#f8fafc] min-h-screen text-left`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to="/vocab" className="hover:text-primary transition-colors font-medium">Học từ vựng</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate max-w-[200px] sm:max-w-md">{vocabSet.title}</span>
            {activeMode !== 'flashcards' && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary">
                {vocabSet.grade} • {vocabSet.terms.length} từ
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {activeMode !== 'flashcards' && (
              <button
                onClick={() => setMode('flashcards')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs cursor-pointer"
                title="Về trang tổng quan & thẻ ghi nhớ"
              >
                <span>Xem thông tin bộ từ</span>
              </button>
            )}
            <Link
              to="/vocab"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-2xs"
            >
              <ArrowLeft size={14} />
              <span>Tất cả bộ từ</span>
            </Link>
          </div>
        </div>

        {/* Set Header - Only shown in overview / flashcards mode */}
        {activeMode === 'flashcards' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 mb-6 animate-pop-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                    {vocabSet.grade}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    {vocabSet.book}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {vocabSet.terms.length} thuật ngữ
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {vocabSet.title}
                </h1>
                <p className="text-sm text-gray-600 mt-1 max-w-2xl">
                  {vocabSet.description}
                </p>
              </div>

              {/* Quick Actions (Share, Export, Backup, Homework Link) */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
                {['intermediate-reading-7', 'intermediate-reading-6', 'intermediate-listening-6', 'pre-ielts-reading-1', 'pre-ielts-reading-2'].includes(vocabSet.id) && (
                  <Link
                    to={`/homework/${vocabSet.id}`}
                    className="px-3.5 py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-xl border border-primary/20 flex items-center gap-1.5 transition-colors"
                    title="Mở bài tập về nhà tương ứng"
                  >
                    <BookOpen size={14} className="text-primary" />
                    <span>Làm bài tập BTVN</span>
                  </Link>
                )}

                <button
                  onClick={handleShare}
                  className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Sao chép liên kết chia sẻ bộ từ (Mở được trên mọi thiết bị)"
                >
                  {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copiedLink ? 'Đã chép link chia sẻ!' : 'Chia sẻ link'}</span>
                </button>

                <button
                  onClick={handleDownloadBackup}
                  className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Tải file dữ liệu .json để lưu trữ hoặc chuyển sang máy khác"
                >
                  <Download size={14} />
                  <span>Tải file sao lưu</span>
                </button>

                <button
                  onClick={() => setShowExportModal(true)}
                  className="px-3.5 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="In hoặc xuất danh sách từ"
                >
                  <FileText size={14} />
                  <span>In / Xuất</span>
                </button>
              </div>
            </div>

            {/* Quick Mastery Progress overview */}
            <div className="mt-6 pt-5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-gray-600">Đã thành thạo: <strong>{masteredCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  <span className="text-gray-600">Đang học: <strong>{learningCount}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-amber-500 fill-amber-400" />
                  <span className="text-gray-600">Đã gắn sao: <strong>{starredIds.length}</strong></span>
                </div>
              </div>

              {(masteredCount > 0 || learningCount > 0) && (
                <button
                  onClick={handleResetMastery}
                  className="text-gray-400 hover:text-rose-500 text-xs font-medium flex items-center gap-1 transition-colors self-start cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Đặt lại tiến độ học</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Study Mode Tabs (Quizlet Style Pill Bar) */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-1.5 mb-5 shadow-xs overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 min-w-max">
            {studyModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = activeMode === mode.id;
              return (
                <button
                  key={mode.id}
                  onClick={() => setMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={17} className={isActive ? 'text-white' : 'text-gray-500'} />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ACTIVE STUDY MODE CONTENT */}
        <div className="mb-6">
          {activeMode === 'flashcards' && (
            <FlashcardMode
              terms={vocabSet.terms}
              starredIds={starredIds}
              onToggleStar={handleToggleStar}
              onSwitchMode={(m) => setMode(m)}
            />
          )}

          {activeMode === 'learn' && (
            <LearnMode
              terms={vocabSet.terms}
              starredIds={starredIds}
              onToggleStar={handleToggleStar}
              masteryData={masteryData}
              onUpdateMastery={handleUpdateMastery}
              onResetMastery={handleResetMastery}
            />
          )}

          {activeMode === 'test' && (
            <TestMode
              terms={vocabSet.terms}
              starredIds={starredIds}
            />
          )}

          {activeMode === 'match' && (
            <MatchGameMode
              setId={vocabSet.id}
              terms={vocabSet.terms}
            />
          )}

          {activeMode === 'write' && (
            <WriteSpellMode
              terms={vocabSet.terms}
              starredIds={starredIds}
              onToggleStar={handleToggleStar}
            />
          )}

          {activeMode === 'diagnostic' && (
            <DiagnosticTestMode
              vocabSet={vocabSet}
              terms={vocabSet.terms}
              onUpdateMastery={handleUpdateMastery}
              onSwitchMode={(m) => setMode(m)}
            />
          )}
        </div>

        {/* TERM LIST BROWSER (Below Study Modes) */}
        {activeMode === 'flashcards' ? (
          <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 animate-pop-in">
            {renderTermListContent()}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-4 sm:p-5 transition-all">
            <button
              type="button"
              onClick={() => setShowTermList(prev => !prev)}
              className="w-full flex items-center justify-between text-xs sm:text-sm font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer py-1"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                  <BookOpen size={16} />
                </span>
                <div className="text-left">
                  <h4 className="font-extrabold text-gray-900 leading-tight">
                    Danh sách từ vựng của bài ({vocabSet.terms.length} thuật ngữ)
                  </h4>
                  <span className="text-[11px] text-gray-500 font-normal">
                    {showTermList ? 'Nhấn để thu gọn danh sách' : 'Bấm để tra cứu nhanh nghĩa và phát âm'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 font-bold bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs transition-all">
                <span>{showTermList ? 'Thu gọn' : 'Xem danh sách'}</span>
                {showTermList ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </div>
            </button>

            {showTermList && (
              <div className="mt-5 pt-5 border-t border-gray-100 animate-pop-in">
                {renderTermListContent()}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Export / Print Modal */}
      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        vocabSet={vocabSet}
      />
    </div>
  );
}
