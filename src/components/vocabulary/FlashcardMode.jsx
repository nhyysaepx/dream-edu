import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Volume2, 
  Star, 
  Shuffle, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Settings2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { speakWord } from '../../utils/speechUtils';

export default function FlashcardMode({ 
  terms, 
  starredIds, 
  onToggleStar, 
  onCompleteDeck,
  onSwitchMode 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [autoplaySpeed, setAutoplaySpeed] = useState(2800); // ms
  const [startWithVietnamese, setStartWithVietnamese] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const containerRef = useRef(null);
  const autoplayTimerRef = useRef(null);

  // Compute active deck
  const activeDeck = React.useMemo(() => {
    let list = terms;
    if (onlyStarred) {
      list = terms.filter(t => starredIds.includes(t.id));
    }
    if (isShuffled) {
      // Deterministic copy shuffled
      const copy = [...list];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }
    return list;
  }, [terms, onlyStarred, isShuffled, starredIds]);

  // Reset index when deck changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
  }, [activeDeck.length, onlyStarred, isShuffled]);

  const currentCard = activeDeck[currentIndex];

  const handleNext = useCallback(() => {
    if (currentIndex < activeDeck.length - 1) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setIsAutoplaying(false);
      if (onCompleteDeck) onCompleteDeck();
    }
  }, [currentIndex, activeDeck.length, onCompleteDeck]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setCurrentIndex(prev => prev - 1);
      setIsFinished(false);
    }
  }, [currentIndex]);

  const handleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  const handlePlayAudio = useCallback((e) => {
    if (e) e.stopPropagation();
    if (currentCard) {
      speakWord(currentCard.term);
    }
  }, [currentCard]);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoplaying || activeDeck.length === 0 || isFinished) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      // Flip first, then next card
      setIsFlipped(prev => {
        if (!prev) {
          return true;
        } else {
          handleNext();
          return false;
        }
      });
    }, autoplaySpeed / 2);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isAutoplaying, activeDeck.length, isFinished, autoplaySpeed, handleNext]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is in an input
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (e.code === 'Space' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (currentCard) onToggleStar(currentCard.id);
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        handlePlayAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev, currentCard, onToggleStar, handlePlayAudio]);

  if (activeDeck.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Star size={32} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có thẻ nào được gắn sao</h3>
        <p className="text-gray-600 mb-6 text-sm">
          Bạn đang bật chế độ "Chỉ học từ được gắn sao". Hãy quay lại danh sách tất cả thẻ và gắn sao (★) các từ khó để ôn tập riêng.
        </p>
        <button
          onClick={() => setOnlyStarred(false)}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-container transition-all"
        >
          Học tất cả {terms.length} từ
        </button>
      </div>
    );
  }

  // Deck finished view
  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-200/80 shadow-md max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50/50">
          <CheckCircle size={44} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Xuất sắc! Bạn đã lướt hết bộ thẻ
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Bạn vừa hoàn thành việc ôn tập <span className="font-bold text-primary">{activeDeck.length} thẻ ghi nhớ</span>. Hãy kiểm tra kiến thức với các chế độ nâng cao!
        </p>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
          <div className="p-3">
            <p className="text-xs text-gray-500 font-medium">Tổng số thẻ</p>
            <p className="text-2xl font-black text-gray-900">{activeDeck.length}</p>
          </div>
          <div className="p-3">
            <p className="text-xs text-gray-500 font-medium">Từ được gắn sao</p>
            <p className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              <Star size={20} className="fill-amber-400 text-amber-400" />
              {starredIds.length}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFinished(false);
              setIsFlipped(false);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Học lại bộ thẻ này
          </button>

          {onSwitchMode && (
            <button
              onClick={() => onSwitchMode('learn')}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              Chuyển sang Chế độ Học (Learn)
            </button>
          )}
        </div>
      </div>
    );
  }

  const isStarred = starredIds.includes(currentCard?.id);
  const frontContent = startWithVietnamese ? currentCard.definition : currentCard.term;
  const backContent = startWithVietnamese ? currentCard.term : currentCard.definition;
  const isFrontEnglish = !startWithVietnamese;

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col items-center select-none w-full max-w-4xl mx-auto ${
        isFullscreen ? 'p-8 bg-slate-900 justify-center h-screen' : ''
      }`}
    >
      {/* Top Bar Controls */}
      <div className="w-full flex items-center justify-between gap-3 mb-4 px-2">
        {/* Star filter badge */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOnlyStarred(!onlyStarred)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              onlyStarred 
                ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Chỉ học từ được đánh dấu sao"
          >
            <Star size={14} className={onlyStarred ? 'fill-amber-500 text-amber-500' : ''} />
            <span>Chỉ học từ gắn sao ({starredIds.length})</span>
          </button>

          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              isShuffled 
                ? 'bg-blue-100 text-blue-800 ring-1 ring-blue-300' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Trộn ngẫu nhiên thứ tự thẻ"
          >
            <Shuffle size={14} />
            <span>{isShuffled ? 'Đã trộn' : 'Thứ tự gốc'}</span>
          </button>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Phím tắt điều khiển"
          >
            <HelpCircle size={18} />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Cài đặt thẻ"
          >
            <Settings2 size={18} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
          >
            {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
      </div>

      {/* Settings Dropdown/Panel */}
      {showSettings && (
        <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 mb-4 shadow-sm animate-pop-in text-left text-sm">
          <div className="font-semibold text-gray-900 mb-3 flex items-center justify-between">
            <span>Tùy chỉnh thẻ ghi nhớ</span>
            <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-600 text-xs">Đóng</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Mặt trước của thẻ hiển thị</label>
              <select
                value={startWithVietnamese ? 'vi' : 'en'}
                onChange={(e) => setStartWithVietnamese(e.target.value === 'vi')}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="en">Tiếng Anh (Thuật ngữ) trước</option>
                <option value="vi">Tiếng Việt (Định nghĩa) trước</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Tốc độ tự động lật (Autoplay)</label>
              <select
                value={autoplaySpeed}
                onChange={(e) => setAutoplaySpeed(Number(e.target.value))}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-2 text-xs font-medium focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value={4000}>Chậm (4.0s)</option>
                <option value={2800}>Vừa phải (2.8s)</option>
                <option value={1800}>Nhanh (1.8s)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Shortcuts modal */}
      {showShortcuts && (
        <div className="w-full bg-blue-50 border border-blue-200/80 rounded-2xl p-4 mb-4 text-xs text-blue-900 animate-pop-in">
          <div className="font-bold mb-2 flex items-center justify-between">
            <span>Bàn phím tắt:</span>
            <button onClick={() => setShowShortcuts(false)} className="text-blue-500 hover:text-blue-700">Đóng</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div><kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">Space</kbd> hoặc <kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">↑/↓</kbd>: Lật thẻ</div>
            <div><kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">→</kbd>: Thẻ tiếp theo</div>
            <div><kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">←</kbd>: Thẻ trước đó</div>
            <div><kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">S</kbd>: Gắn sao / <kbd className="bg-white px-2 py-0.5 rounded shadow-xs font-mono font-bold">A</kbd>: Phát âm</div>
          </div>
        </div>
      )}

      {/* Main Flashcard Card */}
      <div 
        className="w-full h-80 sm:h-96 md:h-[420px] perspective-1000 cursor-pointer"
        onClick={handleFlip}
      >
        <div 
          className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-3xl shadow-xl ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-gray-200/80 rounded-3xl p-6 sm:p-10 flex flex-col justify-between hover:border-primary/40 transition-colors shadow-sm">
            {/* Top row */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span className="uppercase tracking-wider font-semibold text-primary/80">
                {isFrontEnglish ? 'Tiếng Anh (Thuật ngữ)' : 'Tiếng Việt (Định nghĩa)'}
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                {isFrontEnglish && (
                  <button
                    onClick={handlePlayAudio}
                    className="p-2 rounded-full hover:bg-gray-100 text-gray-600 hover:text-primary transition-colors"
                    title="Nghe phát âm chuẩn (A)"
                  >
                    <Volume2 size={20} />
                  </button>
                )}
                <button
                  onClick={() => onToggleStar(currentCard.id)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Gắn sao từ này (S)"
                >
                  <Star 
                    size={20} 
                    className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-gray-400 hover:text-amber-400'} 
                  />
                </button>
              </div>
            </div>

            {/* Center Content */}
            <div className="my-auto text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
                {frontContent}
              </h2>
            </div>

            {/* Bottom prompt */}
            <div className="text-center text-xs text-gray-400 font-medium">
              Nhấp hoặc nhấn phím <kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Space</kbd> để lật mặt sau
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-50/70 via-white to-amber-50/40 border-2 border-primary/30 rounded-3xl p-6 sm:p-10 flex flex-col justify-between shadow-sm">
            {/* Top row */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
              <span className="uppercase tracking-wider font-semibold text-emerald-700">
                {!isFrontEnglish ? 'Tiếng Anh (Thuật ngữ)' : 'Tiếng Việt (Định nghĩa)'}
              </span>

              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handlePlayAudio}
                  className="p-2 rounded-full hover:bg-white text-gray-600 hover:text-primary transition-colors"
                  title="Nghe phát âm chuẩn (A)"
                >
                  <Volume2 size={20} />
                </button>
                <button
                  onClick={() => onToggleStar(currentCard.id)}
                  className="p-2 rounded-full hover:bg-white transition-colors"
                  title="Gắn sao từ này (S)"
                >
                  <Star 
                    size={20} 
                    className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-gray-400 hover:text-amber-400'} 
                  />
                </button>
              </div>
            </div>

            {/* Center Content */}
            <div className="my-auto text-center px-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight leading-snug">
                {backContent}
              </h2>
              {/* If back is English, show phonetic prompt or audio trigger */}
              {!isFrontEnglish && (
                <div className="mt-3">
                  <button
                    onClick={handlePlayAudio}
                    className="inline-flex items-center gap-1.5 text-xs text-primary/80 font-medium bg-white px-3 py-1 rounded-full border border-primary/20 shadow-xs hover:bg-blue-50"
                  >
                    <Volume2 size={14} /> Nghe phát âm
                  </button>
                </div>
              )}
            </div>

            {/* Bottom prompt */}
            <div className="text-center text-xs text-gray-400 font-medium">
              Nhấp hoặc nhấn phím <kbd className="bg-gray-100 px-1.5 py-0.5 rounded font-mono">Space</kbd> để lật lại
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Bottom Bar Navigation */}
      <div className="w-full mt-6 flex flex-col items-center gap-4">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / activeDeck.length) * 100}%` }}
          />
        </div>

        {/* Navigation Bar */}
        <div className="w-full flex items-center justify-between px-2">
          {/* Autoplay button */}
          <button
            onClick={() => setIsAutoplaying(!isAutoplaying)}
            className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-semibold transition-all ${
              isAutoplaying 
                ? 'bg-amber-500 text-white border-amber-600 shadow-sm' 
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
            title="Tự động lật và chuyển thẻ"
          >
            {isAutoplaying ? <Pause size={18} /> : <Play size={18} />}
            <span className="hidden sm:inline">{isAutoplaying ? 'Tạm dừng' : 'Tự động phát'}</span>
          </button>

          {/* Prev / Counter / Next */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-3 rounded-xl border transition-all ${
                currentIndex === 0 
                  ? 'text-gray-300 border-gray-100 cursor-not-allowed bg-gray-50' 
                  : 'text-gray-700 border-gray-200 hover:bg-gray-100 bg-white active:scale-95'
              }`}
              title="Thẻ trước (←)"
            >
              <ChevronLeft size={22} />
            </button>

            <span className="text-sm font-bold text-gray-700 min-w-16 text-center">
              {currentIndex + 1} / {activeDeck.length}
            </span>

            <button
              onClick={handleNext}
              className="p-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 bg-white active:scale-95 transition-all"
              title="Thẻ tiếp theo (→)"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Reset button */}
          <button
            onClick={() => {
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="p-3 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-xs font-semibold transition-all"
            title="Quay lại thẻ đầu tiên"
          >
            <RotateCcw size={18} />
            <span className="hidden sm:inline">Học lại</span>
          </button>
        </div>
      </div>
    </div>
  );
}
