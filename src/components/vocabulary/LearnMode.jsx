import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Star,
  Award,
  Check,
  Brain,
  ThumbsUp,
  AlertCircle,
  RefreshCw,
  Flame
} from 'lucide-react';
import { speakWord, playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';

const BATCH_SIZE = 10; // 10 câu mỗi vòng học

export default function LearnMode({ 
  terms, 
  starredIds, 
  onToggleStar, 
  masteryData, 
  onUpdateMastery, 
  onResetMastery 
}) {
  // Filter options: All or only starred
  const [onlyStarred, setOnlyStarred] = useState(false);
  const activePool = useMemo(() => {
    if (onlyStarred) {
      return terms.filter(t => starredIds.includes(t.id));
    }
    return terms;
  }, [terms, onlyStarred, starredIds]);

  // Keep latest refs to avoid re-triggering startNextBatch during user interaction
  const activePoolRef = useRef(activePool);
  const masteryDataRef = useRef(masteryData);

  useEffect(() => {
    activePoolRef.current = activePool;
  }, [activePool]);

  useEffect(() => {
    masteryDataRef.current = masteryData;
  }, [masteryData]);

  // Round & Batch State
  // phase: 'batch_answering' | 'batch_feedback' | 'prompt_review_wrong' | 'review_answering' | 'review_feedback' | 'round_complete' | 'all_mastered'
  const [phase, setPhase] = useState('batch_answering');
  const [currentRoundNumber, setCurrentRoundNumber] = useState(1);
  const [currentBatchTerms, setCurrentBatchTerms] = useState([]);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  // Results in this 10-term batch: { [termId]: 'correct' | 'wrong' }
  const [batchResults, setBatchResults] = useState({});

  // Review phase state
  const [pendingReviewTerms, setPendingReviewTerms] = useState([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [reviewFixedCount, setReviewFixedCount] = useState(0);

  // Current question interaction
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [userWrittenAnswer, setUserWrittenAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [overrideCorrect, setOverrideCorrect] = useState(false);

  // Derived statistics for the current 10-question batch
  const batchCorrectCount = useMemo(() => {
    return Object.values(batchResults).filter(v => v === 'correct').length;
  }, [batchResults]);

  const batchWrongCount = useMemo(() => {
    return Object.values(batchResults).filter(v => v === 'wrong').length;
  }, [batchResults]);

  const wrongTermsInBatch = useMemo(() => {
    return currentBatchTerms.filter(t => batchResults[t.id] === 'wrong');
  }, [currentBatchTerms, batchResults]);

  // Pick next 10 terms for a new batch (stable useCallback with empty dependencies)
  const startNextBatch = useCallback((roundNum = 1) => {
    const pool = activePoolRef.current;
    if (!pool || pool.length === 0) return;

    const currentMastery = masteryDataRef.current || {};
    // Prioritize terms not yet mastered
    const unmastered = pool.filter(t => currentMastery[t.id] !== 'mastered');
    const sourcePool = unmastered.length > 0 ? unmastered : pool;

    // Pick up to 10 terms
    const shuffled = [...sourcePool].sort(() => 0.5 - Math.random());
    const batch = shuffled.slice(0, Math.min(BATCH_SIZE, shuffled.length));

    setCurrentRoundNumber(roundNum);
    setCurrentBatchTerms(batch);
    setCurrentBatchIndex(0);
    setBatchResults({});
    setPendingReviewTerms([]);
    setCurrentReviewIndex(0);
    setReviewFixedCount(0);
    setUserSelectedOption(null);
    setUserWrittenAnswer('');
    setIsCorrect(null);
    setOverrideCorrect(false);
    setPhase('batch_answering');
  }, []);

  // Initial load or when switching vocab set / pool filter
  useEffect(() => {
    startNextBatch(1);
  }, [terms, onlyStarred, startNextBatch]);

  // Determine current active term based on whether we are in main batch or review
  const isReviewMode = phase === 'review_answering' || phase === 'review_feedback';
  const currentTerm = isReviewMode 
    ? pendingReviewTerms[currentReviewIndex] 
    : currentBatchTerms[currentBatchIndex];

  // Question type: Multiple Choice (80%) or Written (20%)
  const isMultipleChoice = useMemo(() => {
    if (!currentTerm) return true;
    const idx = isReviewMode ? currentReviewIndex : currentBatchIndex;
    return (idx % 4 !== 3); // 3 of 4 are MC, 1 is written
  }, [isReviewMode, currentReviewIndex, currentBatchIndex, currentTerm]);

  // Generate 4 options for Multiple Choice (only re-generate when currentTerm changes)
  const options = useMemo(() => {
    if (!currentTerm || !isMultipleChoice) return [];

    const correctAnswer = currentTerm.term;
    const pool = (activePool && activePool.length > 0 ? activePool : terms) || [];
    const allDistractors = pool
      .filter(t => t.id !== currentTerm.id)
      .map(t => t.term);

    // Deterministic pseudo-random generator seeded by currentTerm.id to ensure hook purity
    let seed = 0;
    const idStr = String(currentTerm.id || '');
    for (let i = 0; i < idStr.length; i++) {
      seed = (seed * 31 + idStr.charCodeAt(i)) % 1000003;
    }
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const shuffledDistractors = [...allDistractors].sort(() => 0.5 - pseudoRandom()).slice(0, 3);
    return [correctAnswer, ...shuffledDistractors].sort(() => 0.5 - pseudoRandom());
  }, [currentTerm, isMultipleChoice, activePool, terms]);

  // Clean string helper for lenient checking
  const normalizeText = (str) => {
    return (str || '')
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Handle Option Selection (Multiple Choice)
  const handleSelectOption = (option) => {
    if (phase !== 'batch_answering' && phase !== 'review_answering') return;
    setUserSelectedOption(option);

    const correct = option.trim().toLowerCase() === currentTerm.term.trim().toLowerCase();
    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setStreak(s => s + 1);
      speakWord(currentTerm.term);

      if (!isReviewMode) {
        setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'correct' }));
        const prevStatus = masteryDataRef.current?.[currentTerm.id];
        if (prevStatus === 'learning') {
          onUpdateMastery(currentTerm.id, 'mastered');
        } else {
          onUpdateMastery(currentTerm.id, 'learning');
        }
      } else {
        // Correct during review: elevate status to learning
        onUpdateMastery(currentTerm.id, 'learning');
      }
    } else {
      playWrongSound();
      setStreak(0);
      speakWord(currentTerm.term);

      if (!isReviewMode) {
        setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'wrong' }));
        onUpdateMastery(currentTerm.id, 'learning');
      } else {
        onUpdateMastery(currentTerm.id, 'learning');
      }
    }

    setPhase(isReviewMode ? 'review_feedback' : 'batch_feedback');
  };

  // Handle Written Answer Submit
  const handleWrittenSubmit = (e) => {
    if (e) e.preventDefault();
    if ((phase !== 'batch_answering' && phase !== 'review_answering') || !userWrittenAnswer.trim()) return;

    const normUser = normalizeText(userWrittenAnswer);
    const normCorrect = normalizeText(currentTerm.term);
    const variants = currentTerm.term.split('/').map(v => normalizeText(v));
    const correct = normUser === normCorrect || variants.includes(normUser);

    setIsCorrect(correct);

    if (correct) {
      playCorrectSound();
      setStreak(s => s + 1);
      speakWord(currentTerm.term);

      if (!isReviewMode) {
        setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'correct' }));
        const prevStatus = masteryDataRef.current?.[currentTerm.id];
        if (prevStatus === 'learning') {
          onUpdateMastery(currentTerm.id, 'mastered');
        } else {
          onUpdateMastery(currentTerm.id, 'learning');
        }
      } else {
        onUpdateMastery(currentTerm.id, 'learning');
      }
    } else {
      playWrongSound();
      setStreak(0);
      speakWord(currentTerm.term);

      if (!isReviewMode) {
        setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'wrong' }));
        onUpdateMastery(currentTerm.id, 'learning');
      } else {
        onUpdateMastery(currentTerm.id, 'learning');
      }
    }

    setPhase(isReviewMode ? 'review_feedback' : 'batch_feedback');
  };

  // Override answer: "Tôi đã trả lời đúng (Bỏ qua lỗi gõ)"
  const handleOverrideCorrect = () => {
    setIsCorrect(true);
    setOverrideCorrect(true);
    playCorrectSound();
    setStreak(s => s + 1);

    if (!isReviewMode) {
      setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'correct' }));
      onUpdateMastery(currentTerm.id, 'mastered');
    } else {
      onUpdateMastery(currentTerm.id, 'mastered');
    }
  };

  // Move to next question or complete batch/round
  const handleNextQuestion = () => {
    setUserSelectedOption(null);
    setUserWrittenAnswer('');
    setIsCorrect(null);
    setOverrideCorrect(false);

    // Case 1: In the initial 10-question batch
    if (phase === 'batch_feedback') {
      if (currentBatchIndex < currentBatchTerms.length - 1) {
        // Move to next question in this 10-term batch
        setCurrentBatchIndex(prev => prev + 1);
        setPhase('batch_answering');
      } else {
        // Finished all 10 questions!
        // CHECK: Were there any wrong questions?
        const wrongList = currentBatchTerms.filter(t => batchResults[t.id] === 'wrong');
        if (wrongList.length > 0) {
          // Trigger the prompt to review wrong questions before moving to next 10!
          setPhase('prompt_review_wrong');
        } else {
          // 100% correct in this batch of 10!
          checkIfAllMasteredOrRoundComplete();
        }
      }
      return;
    }

    // Case 2: In the review phase for wrong questions
    if (phase === 'review_feedback') {
      let remaining = [...pendingReviewTerms];
      let fixed = reviewFixedCount;
      if (isCorrect) {
        // Resolved this term
        remaining = remaining.filter(t => t.id !== currentTerm.id);
        setPendingReviewTerms(remaining);
        fixed += 1;
        setReviewFixedCount(fixed);
      }

      if (remaining.length === 0) {
        // All wrong terms in this batch have been mastered!
        checkIfAllMasteredOrRoundComplete();
      } else {
        // Move to next wrong term (or wrap around if last)
        const nextIdx = isCorrect 
          ? (currentReviewIndex >= remaining.length ? 0 : currentReviewIndex)
          : (currentReviewIndex + 1) % remaining.length;
        setCurrentReviewIndex(nextIdx);
        setPhase('review_answering');
      }
    }
  };

  // Check overall progress
  const checkIfAllMasteredOrRoundComplete = () => {
    const currentMastery = masteryDataRef.current || {};
    const totalMastered = activePoolRef.current.filter(t => currentMastery[t.id] === 'mastered').length;
    if (totalMastered >= activePoolRef.current.length && activePoolRef.current.length > 0) {
      setPhase('all_mastered');
      triggerCelebration();
    } else {
      setPhase('round_complete');
      triggerCelebration();
    }
  };

  // Start the review phase for wrong questions
  const startReviewWrongPhase = () => {
    setPendingReviewTerms([...wrongTermsInBatch]);
    setCurrentReviewIndex(0);
    setReviewFixedCount(0);
    setUserSelectedOption(null);
    setUserWrittenAnswer('');
    setIsCorrect(null);
    setOverrideCorrect(false);
    setPhase('review_answering');
  };

  // Keyboard shortcut listener (1-4 / A-D for options, Enter for next)
  const handleSelectOptionRef = useRef(handleSelectOption);
  const handleNextQuestionRef = useRef(handleNextQuestion);
  useEffect(() => {
    handleSelectOptionRef.current = handleSelectOption;
    handleNextQuestionRef.current = handleNextQuestion;
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        if (e.key === 'Enter' && (phase === 'batch_feedback' || phase === 'review_feedback')) {
          e.preventDefault();
          handleNextQuestionRef.current();
        }
        return;
      }

      if (phase === 'batch_answering' || phase === 'review_answering') {
        if (isMultipleChoice && options.length > 0) {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const idx = parseInt(e.key, 10) - 1;
            if (options[idx]) handleSelectOptionRef.current(options[idx]);
          } else if (['a', 'A'].includes(e.key) && options[0]) {
            handleSelectOptionRef.current(options[0]);
          } else if (['b', 'B'].includes(e.key) && options[1]) {
            handleSelectOptionRef.current(options[1]);
          } else if (['c', 'C'].includes(e.key) && options[2]) {
            handleSelectOptionRef.current(options[2]);
          } else if (['d', 'D'].includes(e.key) && options[3]) {
            handleSelectOptionRef.current(options[3]);
          }
        }
      } else if (phase === 'batch_feedback' || phase === 'review_feedback') {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleNextQuestionRef.current();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, isMultipleChoice, options]);

  // Overall statistics
  const totalTerms = activePool.length;
  const masteredCount = activePool.filter(t => masteryData[t.id] === 'mastered').length;
  const learningCount = activePool.filter(t => masteryData[t.id] === 'learning').length;
  const notStartedCount = Math.max(0, totalTerms - masteredCount - learningCount);

  if (activePool.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
        <Star size={36} className="text-amber-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Chưa có từ nào được gắn sao</h3>
        <p className="text-sm text-gray-600 mb-6">Hãy chuyển sang danh sách tất cả từ để bắt đầu học.</p>
        <button
          onClick={() => setOnlyStarred(false)}
          className="px-6 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-container"
        >
          Học tất cả ({terms.length} từ)
        </button>
      </div>
    );
  }

  // SCREEN: 100% Mastered All Terms
  if (phase === 'all_mastered') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-200/80 shadow-md max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-amber-50">
          <Award size={48} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Chúc mừng! Bạn đã thành thạo toàn bộ bộ từ!
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Toàn bộ <span className="font-bold text-primary">{activePool.length} thuật ngữ</span> đã được bạn chinh phục với độ chính xác cao.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onResetMastery();
              startNextBatch(1);
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw size={16} />
            Học lại từ đầu (Đặt lại tiến độ)
          </button>
        </div>
      </div>
    );
  }

  // SCREEN: PROMPT TO REVIEW WRONG QUESTIONS AFTER 10 QUESTIONS
  if (phase === 'prompt_review_wrong') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 text-center border border-rose-200 shadow-lg max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-18 h-18 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-8 ring-rose-50">
          <RefreshCw size={36} className="animate-spin-slow" />
        </div>

        <span className="px-3 py-1 bg-rose-50 text-rose-700 border border-rose-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
          Hoàn thành {currentBatchTerms.length} câu của vòng {currentRoundNumber}
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          Lặp lại {wrongTermsInBatch.length} câu chưa đúng
        </h2>

        <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
          Trong {currentBatchTerms.length} câu vừa rồi, bạn đã trả lời đúng <strong className="text-emerald-600">{batchCorrectCount} câu</strong> và cần ôn lại <strong className="text-rose-600">{wrongTermsInBatch.length} câu</strong> để ghi nhớ sâu trước khi chuyển sang {BATCH_SIZE} câu tiếp theo.
        </p>

        {/* List of missed terms preview */}
        <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100 max-w-md mx-auto mb-8 text-left">
          <p className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertCircle size={14} />
            <span>Danh sách các từ cần ôn lại ({wrongTermsInBatch.length} từ):</span>
          </p>
          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
            {wrongTermsInBatch.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-rose-200/60 text-xs">
                <span className="font-extrabold text-gray-900">{idx + 1}. {item.term}</span>
                <span className="text-gray-500 truncate max-w-[180px]">{item.definition}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startReviewWrongPhase}
          className="w-full sm:w-auto px-8 py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 mx-auto active:scale-95 cursor-pointer"
        >
          <RotateCcw size={18} />
          <span>Bắt đầu ôn lại {wrongTermsInBatch.length} câu sai này</span>
        </button>
      </div>
    );
  }

  // SCREEN: ROUND COMPLETE (All 10 questions + their mistakes cleared)
  if (phase === 'round_complete') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 text-center border border-emerald-200 shadow-md max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-18 h-18 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <Sparkles size={38} />
        </div>

        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-2">
          Xuất sắc • Vòng {currentRoundNumber} hoàn tất
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
          Đã chinh phục thành công {currentBatchTerms.length} câu!
        </h2>

        <p className="text-gray-600 text-sm max-w-md mx-auto mb-6">
          Toàn bộ các từ vựng (bao gồm cả các câu bạn từng làm sai) đều đã được bạn trả lời đúng và khắc sâu vào trí nhớ.
        </p>

        {/* Progress summary */}
        <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100 max-w-md mx-auto">
          <div className="p-2">
            <span className="text-xs text-gray-500 font-medium">Chưa học</span>
            <p className="text-2xl font-black text-gray-600">{notStartedCount}</p>
          </div>
          <div className="p-2 border-x border-gray-200">
            <span className="text-xs text-blue-600 font-medium">Đang học</span>
            <p className="text-2xl font-black text-blue-600">{learningCount}</p>
          </div>
          <div className="p-2">
            <span className="text-xs text-emerald-600 font-medium">Thành thạo</span>
            <p className="text-2xl font-black text-emerald-600">{masteredCount}</p>
          </div>
        </div>

        <button
          onClick={() => startNextBatch(currentRoundNumber + 1)}
          className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-container text-white font-extrabold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto active:scale-95 cursor-pointer"
        >
          <span>Chuyển sang 10 câu tiếp theo</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (!currentTerm) return null;

  const isStarred = starredIds.includes(currentTerm.id);
  const isFeedback = phase === 'batch_feedback' || phase === 'review_feedback';

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top Header & Mastery Breakdown */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-5 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
              isReviewMode ? 'bg-rose-500' : 'bg-primary'
            }`}>
              {isReviewMode ? <RotateCcw size={20} /> : <Brain size={20} />}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-gray-900">
                  {isReviewMode ? 'Vòng ôn lại câu sai' : `Vòng ${currentRoundNumber} (${currentBatchTerms.length} câu)`}
                </h3>
                {isReviewMode && (
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[10px] font-black uppercase tracking-wider">
                    Lặp lại câu sai
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 font-medium">
                {isReviewMode 
                  ? `Câu ${currentReviewIndex + 1} / ${pendingReviewTerms.length} câu cần ôn lại`
                  : `Câu ${currentBatchIndex + 1} / ${currentBatchTerms.length} trong đợt này`
                }
              </p>
            </div>
          </div>

          {/* Right badges: Correct / Wrong Trackers */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isReviewMode ? (
              <>
                {/* Đúng count badge */}
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold shadow-2xs">
                  <Check size={15} className="text-emerald-600 stroke-[2.5]" />
                  <span>Đúng: <strong className="text-emerald-900 text-sm">{batchCorrectCount}</strong></span>
                </div>

                {/* Câu sai đã note badge */}
                <div className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  batchWrongCount > 0 
                    ? 'bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-100 shadow-2xs' 
                    : 'bg-gray-50 text-gray-500 border-gray-200'
                }`}>
                  <AlertCircle size={15} className={batchWrongCount > 0 ? 'text-rose-600' : 'text-gray-400'} />
                  <span>Câu sai đã note: <strong className={batchWrongCount > 0 ? 'text-rose-900 text-sm' : 'text-gray-600'}>{batchWrongCount}</strong></span>
                </div>
              </>
            ) : (
              <>
                {/* Review Mode Badges */}
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 text-amber-800 border border-amber-300 rounded-xl text-xs font-bold shadow-2xs">
                  <RotateCcw size={15} className="text-amber-600" />
                  <span>Cần sửa: <strong className="text-amber-950 text-sm">{pendingReviewTerms.length}</strong></span>
                </div>

                <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl text-xs font-bold shadow-2xs">
                  <Check size={15} className="text-emerald-600 stroke-[2.5]" />
                  <span>Đã sửa đúng: <strong className="text-emerald-900 text-sm">{reviewFixedCount}</strong></span>
                </div>
              </>
            )}

            {streak > 1 && (
              <span className="text-xs font-black text-amber-700 bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-300 flex items-center gap-1 shadow-2xs">
                <Flame size={14} className="text-amber-500 fill-amber-400" />
                <span>Chuỗi: {streak}</span>
              </span>
            )}
          </div>
        </div>

        {/* Review Phase Alert Notice */}
        {isReviewMode && (
          <div className="mt-2 mb-3 px-3.5 py-2 bg-rose-50 border border-rose-200/80 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-2 animate-pop-in">
            <RotateCcw size={14} className="text-rose-600 flex-shrink-0" />
            <span>
              Đang lặp lại những câu bạn trả lời sai trong {currentBatchTerms.length} câu vừa rồi. Hãy hoàn thành đúng để chuyển sang đợt tiếp theo!
            </span>
          </div>
        )}

        {/* 3-Color Mastery Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden flex">
          <div 
            className="bg-emerald-500 h-full transition-all duration-300" 
            style={{ width: `${(masteredCount / totalTerms) * 100}%` }}
            title={`Đã thành thạo: ${masteredCount}`}
          />
          <div 
            className="bg-blue-500 h-full transition-all duration-300" 
            style={{ width: `${(learningCount / totalTerms) * 100}%` }}
            title={`Đang học: ${learningCount}`}
          />
          <div 
            className="bg-gray-200 h-full transition-all duration-300" 
            style={{ width: `${(notStartedCount / totalTerms) * 100}%` }}
            title={`Chưa học: ${notStartedCount}`}
          />
        </div>

        {/* Stats indicators */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-2 font-medium px-1">
          <span className="text-gray-600">Chưa học: {notStartedCount}</span>
          <span className="text-blue-600 font-semibold">Đang học: {learningCount}</span>
          <span className="text-emerald-600 font-bold">Thành thạo: {masteredCount} / {totalTerms}</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className={`bg-white rounded-3xl border shadow-sm p-6 sm:p-8 text-left transition-all ${
        isFeedback && isCorrect
          ? 'border-emerald-300 ring-2 ring-emerald-100'
          : isFeedback && !isCorrect
          ? 'border-rose-300 ring-2 ring-rose-100'
          : 'border-gray-200/90'
      }`}>
        {/* Term Question Top Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            {isMultipleChoice ? 'Chọn định nghĩa tiếng Anh phù hợp' : 'Điền thuật ngữ tiếng Anh chính xác'}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleStar(currentTerm.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-amber-500 transition-colors cursor-pointer"
              title="Gắn sao từ này"
            >
              <Star size={18} className={isStarred ? 'fill-amber-400 text-amber-400' : ''} />
            </button>
          </div>
        </div>

        {/* Prompt Vietnamese definition */}
        <div className="mb-6">
          <p className="text-xs text-gray-400 font-medium mb-1">Nghĩa tiếng Việt:</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug">
            {currentTerm.definition}
          </h2>
        </div>

        {/* QUESTION TYPE 1: MULTIPLE CHOICE */}
        {isMultipleChoice && (
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold text-gray-500">
              Chọn 1 trong các đáp án sau (hoặc phím 1-4 / A-D):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option, index) => {
                const isSelected = userSelectedOption === option;
                const isTargetCorrect = option.trim().toLowerCase() === currentTerm.term.trim().toLowerCase();

                let buttonClass = 'bg-gray-50/80 hover:bg-gray-100/90 border-gray-200/90 text-gray-800';
                if (isFeedback) {
                  if (isTargetCorrect) {
                    // Correct answer style: bright emerald glow + checkmark
                    buttonClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-4 ring-emerald-300 shadow-md animate-correct-glow';
                  } else if (isSelected && !isTargetCorrect) {
                    // Wrong selected answer style: shake animation + rose strike-through
                    buttonClass = 'bg-rose-50 border-rose-500 text-rose-800 ring-4 ring-rose-200 line-through animate-shake';
                  } else {
                    buttonClass = 'bg-gray-50/40 border-gray-100 text-gray-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isFeedback}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-start justify-between gap-3 group active:scale-[0.99] cursor-pointer ${buttonClass}`}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <span className={`w-7 h-7 rounded-lg border text-xs font-black flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                        isFeedback && isTargetCorrect
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                          : isFeedback && isSelected && !isTargetCorrect
                          ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                          : 'bg-white border-gray-200 text-gray-600 group-hover:border-primary group-hover:text-primary'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-semibold leading-snug break-words flex-1 min-w-0 pt-0.5">{option}</span>
                    </div>

                    {/* Dedicated icon slot with fixed width to eliminate layout shift / text wrapping */}
                    <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center mt-0.5">
                      {isFeedback && isTargetCorrect && (
                        <CheckCircle2 size={20} className="text-emerald-600 animate-pop-in" />
                      )}
                      {isFeedback && isSelected && !isTargetCorrect && (
                        <XCircle size={20} className="text-rose-500 animate-pop-in" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* QUESTION TYPE 2: WRITTEN */}
        {!isMultipleChoice && (
          <form onSubmit={handleWrittenSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                Nhập câu trả lời bằng tiếng Anh:
              </label>
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  disabled={isFeedback}
                  value={userWrittenAnswer}
                  onChange={(e) => setUserWrittenAnswer(e.target.value)}
                  placeholder="Gõ từ hoặc cụm từ..."
                  className={`w-full px-5 py-4 rounded-2xl border text-base font-bold transition-all focus:outline-none ${
                    !isFeedback
                      ? 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
                      : isCorrect
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-4 ring-emerald-200 animate-correct-glow'
                      : 'border-rose-400 bg-rose-50 text-rose-900 ring-4 ring-rose-200 animate-shake'
                  }`}
                />
              </div>
            </div>

            {!isFeedback && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setUserWrittenAnswer('?');
                    setIsCorrect(false);
                    playWrongSound();
                    speakWord(currentTerm.term);
                    setStreak(0);
                    if (!isReviewMode) {
                      setBatchResults(prev => ({ ...prev, [currentTerm.id]: 'wrong' }));
                      onUpdateMastery(currentTerm.id, 'learning');
                    }
                    setPhase(isReviewMode ? 'review_feedback' : 'batch_feedback');
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium cursor-pointer"
                >
                  Tôi không biết từ này
                </button>

                <button
                  type="submit"
                  disabled={!userWrittenAnswer.trim()}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all disabled:opacity-40 cursor-pointer"
                >
                  Kiểm tra
                </button>
              </div>
            )}
          </form>
        )}

        {/* FEEDBACK BANNER (When answered) */}
        {isFeedback && (
          <div className="mt-5 pt-5 border-t border-gray-100 animate-pop-in">
            {isCorrect ? (
              <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 animate-pop-in">
                    <Check size={22} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-extrabold text-emerald-950">
                        Chính xác! Rất tốt
                      </h4>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-100/60 px-2 py-0.5 rounded-full flex-shrink-0">
                        +1 điểm
                      </span>
                    </div>
                    <div className="text-xs text-emerald-800 flex items-center gap-2 mt-1 flex-wrap">
                      <span className="font-black text-sm sm:text-base break-words text-emerald-950">{currentTerm.term}</span>
                      <button 
                        onClick={() => speakWord(currentTerm.term)}
                        className="p-1 hover:bg-emerald-200/60 rounded-full text-emerald-800 transition-colors flex-shrink-0 cursor-pointer"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  autoFocus
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm flex-shrink-0 cursor-pointer active:scale-95"
                >
                  <span>Tiếp tục (Enter)</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="p-5 bg-rose-50 border border-rose-300 rounded-2xl shadow-xs">
                <div className="flex items-start gap-3.5 mb-3">
                  <span className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle size={22} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h4 className="text-sm font-bold text-rose-900">Chưa chính xác!</h4>
                      <span className="text-[11px] font-bold text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full flex items-center gap-1 flex-shrink-0">
                        <AlertCircle size={12} />
                        <span>Đã note lại để lặp lại sau 10 câu</span>
                      </span>
                    </div>
                    
                    <div className="mt-3 bg-white p-3.5 sm:p-4 rounded-xl border border-rose-200/80">
                      <p className="text-xs text-gray-500 font-medium">Đáp án chuẩn:</p>
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 mt-1">
                        <span className="text-base sm:text-lg font-black text-primary break-words flex-1 min-w-0">{currentTerm.term}</span>
                        <button
                          onClick={() => speakWord(currentTerm.term)}
                          className="px-2.5 py-1 bg-blue-50 text-primary hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors flex-shrink-0 cursor-pointer"
                        >
                          <Volume2 size={14} />
                          <span>Nghe phát âm</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  {!overrideCorrect ? (
                    <button
                      type="button"
                      onClick={handleOverrideCorrect}
                      className="text-xs text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                      title="Nếu bạn nhập đúng nhưng khác dấu hoặc viết tắt"
                    >
                      <ThumbsUp size={13} />
                      <span>Đáp án của tôi đúng (Bỏ qua lỗi gõ)</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-bold self-start sm:self-auto">✓ Đã xác nhận là đúng</span>
                  )}

                  <button
                    autoFocus
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm ml-auto cursor-pointer flex-shrink-0 active:scale-95"
                  >
                    <span>Đã ghi nhớ, câu tiếp theo (Enter)</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
