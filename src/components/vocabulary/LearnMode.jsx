import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  HelpCircle,
  ThumbsUp
} from 'lucide-react';
import { speakWord, triggerCelebration } from '../../utils/speechUtils';

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

  // Round status: 'answering' | 'feedback' | 'round_complete' | 'all_mastered'
  const [stepState, setStepState] = useState('answering');
  const [currentRoundTerms, setCurrentRoundTerms] = useState([]);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [userWrittenAnswer, setUserWrittenAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [streak, setStreak] = useState(0);
  const [overrideCorrect, setOverrideCorrect] = useState(false);

  // Initialize or refill round
  const startNewRound = useCallback(() => {
    if (activePool.length === 0) return;

    // Pick terms: prioritize unlearned or learning
    const notMastered = activePool.filter(t => masteryData[t.id] !== 'mastered');
    const pool = notMastered.length > 0 ? notMastered : activePool;
    
    // Shuffle and pick 6 terms for this round
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const roundSlice = shuffled.slice(0, Math.min(6, shuffled.length));

    setCurrentRoundTerms(roundSlice);
    setCurrentRoundIndex(0);
    setStepState('answering');
    setUserSelectedOption(null);
    setUserWrittenAnswer('');
    setIsCorrect(null);
    setOverrideCorrect(false);
  }, [activePool, masteryData]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  // Current question term
  const currentTerm = currentRoundTerms[currentRoundIndex];

  // Determine question type: multiple choice (80%) or written (20% for familiarity)
  const isMultipleChoice = useMemo(() => {
    // If user has seen it before or round index % 3 === 2, use written; otherwise MC
    if (!currentTerm) return true;
    return (currentRoundIndex % 3 !== 2);
  }, [currentRoundIndex, currentTerm]);

  // Generate 4 options for Multiple Choice
  const options = useMemo(() => {
    if (!currentTerm || !isMultipleChoice) return [];

    // Prompt: Vietnamese definition -> Choose English term
    const correctAnswer = currentTerm.term;
    const distractors = activePool
      .filter(t => t.id !== currentTerm.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(t => t.term);

    const all = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());
    return all;
  }, [currentTerm, isMultipleChoice, activePool]);

  // Auto speak English word on display if wanted
  useEffect(() => {
    if (currentTerm && !isMultipleChoice) {
      // In written mode, don't spoil pronunciation if term is answer, but we can speak after
    }
  }, [currentTerm, isMultipleChoice]);

  // Handle MC option click
  const handleSelectOption = (option) => {
    if (stepState !== 'answering') return;
    setUserSelectedOption(option);

    const correct = option.trim().toLowerCase() === currentTerm.term.trim().toLowerCase();
    setIsCorrect(correct);
    setStepState('feedback');

    // Update mastery & streak
    if (correct) {
      setStreak(s => s + 1);
      const prevStatus = masteryData[currentTerm.id];
      if (prevStatus === 'learning') {
        onUpdateMastery(currentTerm.id, 'mastered');
      } else {
        onUpdateMastery(currentTerm.id, 'learning');
      }
      speakWord(currentTerm.term);
    } else {
      setStreak(0);
      onUpdateMastery(currentTerm.id, 'learning');
      speakWord(currentTerm.term);
    }
  };

  // Clean string helper for lenient check
  const normalizeText = (str) => {
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Handle Written Submit
  const handleWrittenSubmit = (e) => {
    if (e) e.preventDefault();
    if (stepState !== 'answering' || !userWrittenAnswer.trim()) return;

    const normUser = normalizeText(userWrittenAnswer);
    const normCorrect = normalizeText(currentTerm.term);
    
    // Check if user's input matches any variant (split by /)
    const variants = currentTerm.term.split('/').map(v => normalizeText(v));
    const correct = normUser === normCorrect || variants.includes(normUser);

    setIsCorrect(correct);
    setStepState('feedback');

    if (correct) {
      setStreak(s => s + 1);
      const prevStatus = masteryData[currentTerm.id];
      if (prevStatus === 'learning') {
        onUpdateMastery(currentTerm.id, 'mastered');
      } else {
        onUpdateMastery(currentTerm.id, 'learning');
      }
      speakWord(currentTerm.term);
    } else {
      setStreak(0);
      onUpdateMastery(currentTerm.id, 'learning');
      speakWord(currentTerm.term);
    }
  };

  // Override answer ("Tôi đã trả lời đúng")
  const handleOverrideCorrect = () => {
    setIsCorrect(true);
    setOverrideCorrect(true);
    setStreak(s => s + 1);
    onUpdateMastery(currentTerm.id, 'mastered');
  };

  // Next question or finish round
  const handleNextQuestion = () => {
    setUserSelectedOption(null);
    setUserWrittenAnswer('');
    setIsCorrect(null);
    setOverrideCorrect(false);

    if (currentRoundIndex < currentRoundTerms.length - 1) {
      setCurrentRoundIndex(prev => prev + 1);
      setStepState('answering');
    } else {
      // Check if all terms are mastered
      const totalMastered = activePool.filter(t => masteryData[t.id] === 'mastered').length;
      if (totalMastered === activePool.length && activePool.length > 0) {
        setStepState('all_mastered');
        triggerCelebration();
      } else {
        setStepState('round_complete');
      }
    }
  };

  // Stats calculation
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

  // 100% Mastered Screen
  if (stepState === 'all_mastered') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 text-center border border-gray-200/80 shadow-md max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-amber-50">
          <Award size={48} />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Chúc mừng! Bạn đã thành thạo 100% bộ từ!
        </h2>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          Toàn bộ <span className="font-bold text-primary">{activePool.length} thuật ngữ</span> đã được bạn chinh phục với độ chính xác tuyệt đối.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              onResetMastery();
              startNewRound();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw size={16} />
            Học lại từ đầu (Reset tiến độ)
          </button>
        </div>
      </div>
    );
  }

  // Round complete screen
  if (stepState === 'round_complete') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-10 text-center border border-gray-200/80 shadow-md max-w-2xl mx-auto my-8 animate-pop-in">
        <div className="w-16 h-16 bg-blue-100 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={36} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Hoàn thành vòng học này!
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Bạn đang có tiến độ rất tốt. Hãy tiếp tục để đưa toàn bộ từ vựng vào mục "Đã thành thạo".
        </p>

        {/* Progress summary */}
        <div className="grid grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
          <div className="p-2">
            <span className="text-xs text-gray-500 font-medium">Chưa học</span>
            <p className="text-2xl font-black text-gray-600">{notStartedCount}</p>
          </div>
          <div className="p-2 border-x border-gray-200">
            <span className="text-xs text-blue-600 font-medium">Đang học</span>
            <p className="text-2xl font-black text-blue-600">{learningCount}</p>
          </div>
          <div className="p-2">
            <span className="text-xs text-emerald-600 font-medium">Đã thành thạo</span>
            <p className="text-2xl font-black text-emerald-600">{masteredCount}</p>
          </div>
        </div>

        <button
          onClick={startNewRound}
          className="w-full sm:w-auto px-8 py-3.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mx-auto"
        >
          <span>Tiếp tục vòng tiếp theo</span>
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  if (!currentTerm) return null;

  const isStarred = starredIds.includes(currentTerm.id);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Top Header & Mastery Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Brain size={18} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-gray-900">Chế độ Học (Learn Mode)</h3>
              <p className="text-xs text-gray-500">
                Câu {currentRoundIndex + 1} / {currentRoundTerms.length} trong vòng này
              </p>
            </div>
          </div>

          {/* Right badges */}
          <div className="flex items-center gap-3">
            {streak > 1 && (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 flex items-center gap-1 animate-bounce-slow">
                🔥 Chuỗi đúng: {streak}
              </span>
            )}
            <button
              onClick={() => setOnlyStarred(!onlyStarred)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-all ${
                onlyStarred ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-gray-50 text-gray-600 border-gray-200'
              }`}
            >
              <Star size={12} className={onlyStarred ? 'fill-amber-500 text-amber-500' : ''} />
              <span>Chỉ từ gắn sao</span>
            </button>
          </div>
        </div>

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
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-8 text-left transition-all">
        {/* Term Question Top Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            {isMultipleChoice ? 'Chọn định nghĩa tiếng Anh phù hợp' : 'Điền thuật ngữ tiếng Anh chính xác'}
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleStar(currentTerm.id)}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-amber-500 transition-colors"
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

        {/* Question Type 1: MULTIPLE CHOICE */}
        {isMultipleChoice && (
          <div className="space-y-3 mb-6">
            <p className="text-xs font-semibold text-gray-500">Chọn 1 trong các đáp án sau:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {options.map((option, index) => {
                const isSelected = userSelectedOption === option;
                const isTargetCorrect = option.trim().toLowerCase() === currentTerm.term.trim().toLowerCase();

                let buttonClass = 'bg-gray-50/80 hover:bg-gray-100/90 border-gray-200/90 text-gray-800';
                if (stepState === 'feedback') {
                  if (isTargetCorrect) {
                    buttonClass = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold ring-2 ring-emerald-200';
                  } else if (isSelected && !isTargetCorrect) {
                    buttonClass = 'bg-rose-50 border-rose-300 text-rose-700 ring-2 ring-rose-100 line-through';
                  } else {
                    buttonClass = 'bg-gray-50/50 border-gray-100 text-gray-400';
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={stepState !== 'answering'}
                    onClick={() => handleSelectOption(option)}
                    className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between group active:scale-[0.99] ${buttonClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-md bg-white border border-gray-200/80 text-xs font-bold text-gray-500 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {stepState === 'feedback' && isTargetCorrect && (
                      <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
                    )}
                    {stepState === 'feedback' && isSelected && !isTargetCorrect && (
                      <XCircle size={20} className="text-rose-500 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Question Type 2: WRITTEN */}
        {!isMultipleChoice && (
          <form onSubmit={handleWrittenSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Nhập câu trả lời bằng tiếng Anh:
              </label>
              <div className="relative">
                <input
                  type="text"
                  autoFocus
                  disabled={stepState !== 'answering'}
                  value={userWrittenAnswer}
                  onChange={(e) => setUserWrittenAnswer(e.target.value)}
                  placeholder="Gõ từ hoặc cụm từ..."
                  className={`w-full px-4 py-3.5 rounded-2xl border text-base font-semibold transition-all focus:outline-none ${
                    stepState === 'answering'
                      ? 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/10'
                      : isCorrect
                      ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900'
                      : 'border-rose-300 bg-rose-50/40 text-rose-900'
                  }`}
                />
              </div>
            </div>

            {stepState === 'answering' && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    setUserWrittenAnswer('?');
                    setIsCorrect(false);
                    setStepState('feedback');
                    onUpdateMastery(currentTerm.id, 'learning');
                    speakWord(currentTerm.term);
                  }}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium"
                >
                  Tôi không biết từ này
                </button>

                <button
                  type="submit"
                  disabled={!userWrittenAnswer.trim()}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all disabled:opacity-40"
                >
                  Kiểm tra
                </button>
              </div>
            )}
          </form>
        )}

        {/* FEEDBACK BANNER (When answered) */}
        {stepState === 'feedback' && (
          <div className="mt-4 pt-4 border-t border-gray-100 animate-pop-in">
            {isCorrect ? (
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check size={22} />
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Chính xác! Rất tốt</h4>
                    <p className="text-xs text-emerald-700 flex items-center gap-2 mt-0.5">
                      <span className="font-semibold">{currentTerm.term}</span>
                      <button 
                        onClick={() => speakWord(currentTerm.term)}
                        className="p-1 hover:bg-emerald-100 rounded-full text-emerald-800"
                        title="Nghe phát âm"
                      >
                        <Volume2 size={14} />
                      </button>
                    </p>
                  </div>
                </div>

                <button
                  autoFocus
                  onClick={handleNextQuestion}
                  className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div className="p-5 bg-rose-50/80 border border-rose-200 rounded-2xl">
                <div className="flex items-start gap-3 mb-4">
                  <span className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle size={22} />
                  </span>
                  <div className="flex-grow">
                    <h4 className="text-sm font-bold text-rose-900">Hãy ghi nhớ đáp án đúng:</h4>
                    
                    <div className="mt-2 bg-white p-3.5 rounded-xl border border-rose-200/70">
                      <p className="text-xs text-gray-500 font-medium">Đáp án chuẩn:</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-lg font-black text-primary">{currentTerm.term}</span>
                        <button
                          onClick={() => speakWord(currentTerm.term)}
                          className="px-2.5 py-1 bg-blue-50 text-primary hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Volume2 size={14} />
                          <span>Nghe đọc</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  {!overrideCorrect ? (
                    <button
                      type="button"
                      onClick={handleOverrideCorrect}
                      className="text-xs text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1"
                      title="Nếu bạn nhập đúng nhưng khác dấu hoặc viết tắt"
                    >
                      <ThumbsUp size={13} />
                      <span>Đáp án của tôi đúng (Bỏ qua lỗi gõ)</span>
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-700 font-semibold">✓ Đã đánh dấu là đúng</span>
                  )}

                  <button
                    autoFocus
                    onClick={handleNextQuestion}
                    className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm ml-auto"
                  >
                    <span>Đã hiểu, câu tiếp theo</span>
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
