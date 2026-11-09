import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Check, 
  Brain, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  FileCheck2,
  ClipboardCheck
} from 'lucide-react';
import { speakWord, playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';
import { getDiagnosticQuestionsForSet } from '../../data/diagnosticQuestions';

export default function DiagnosticTestMode({ vocabSet, terms, onUpdateMastery, onSwitchMode }) {
  // Load questions for the current vocab set
  const rawQuestions = useMemo(() => {
    return getDiagnosticQuestionsForSet(vocabSet);
  }, [vocabSet]);

  // Synchronously initialize questions with randomized options on mount
  const [questions, setQuestions] = useState(() => {
    const list = getDiagnosticQuestionsForSet(vocabSet);
    return list.map(q => ({
      ...q,
      shuffledOptions: [...q.options].sort(() => 0.5 - Math.random())
    }));
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: { selected, isCorrect } }
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReviewList, setShowReviewList] = useState(false);

  // Initialize or restart test
  const startTest = useCallback(() => {
    const randomized = rawQuestions.map(q => ({
      ...q,
      shuffledOptions: [...q.options].sort(() => 0.5 - Math.random())
    }));
    setQuestions(randomized);
    setCurrentIndex(0);
    setSelectedOption(null);
    setUserAnswers({});
    setIsAnswered(false);
    setIsCompleted(false);
    setShowReviewList(false);
  }, [rawQuestions]);

  const lastSetIdRef = useRef(vocabSet?.id);

  // If vocabSet changes, re-initialize
  useEffect(() => {
    if (lastSetIdRef.current !== vocabSet?.id) {
      lastSetIdRef.current = vocabSet?.id;
      startTest();
    }
  }, [vocabSet?.id, startTest]);

  const currentQ = questions[currentIndex] || questions[0];

  // Parse type prefix: "[Receptive]" or "[Productive]"
  const questionTypeInfo = useMemo(() => {
    if (!currentQ) return { type: 'Diagnostic', cleanText: '' };
    const qText = currentQ.question;
    if (qText.startsWith('[')) {
      const closeIdx = qText.indexOf(']');
      if (closeIdx !== -1) {
        return {
          type: qText.substring(1, closeIdx),
          cleanText: qText.substring(closeIdx + 1).trim()
        };
      }
    }
    return { type: currentQ.type || 'Diagnostic', cleanText: qText };
  }, [currentQ]);

  // Handle Option Click
  const handleSelectOption = useCallback((option) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
    
    // Record user answer
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        selected: option,
        isCorrect,
        correctAnswer: currentQ.correctAnswer,
        question: currentQ.question,
        cleanText: questionTypeInfo.cleanText,
        type: questionTypeInfo.type,
        rationale: currentQ.rationale,
        targetWord: currentQ.targetWord
      }
    }));

    if (isCorrect) {
      playCorrectSound();
      if (currentQ.targetWord) speakWord(currentQ.targetWord);
      // Elevate mastery in parent
      const termItem = terms?.find(t => t.term.toLowerCase() === (currentQ.targetWord || '').toLowerCase());
      if (termItem && onUpdateMastery) {
        onUpdateMastery(termItem.id, 'mastered');
      }
    } else {
      playWrongSound();
      if (currentQ.targetWord) speakWord(currentQ.targetWord);
      const termItem = terms?.find(t => t.term.toLowerCase() === (currentQ.targetWord || '').toLowerCase());
      if (termItem && onUpdateMastery) {
        onUpdateMastery(termItem.id, 'learning');
      }
    }
  }, [isAnswered, currentQ, questionTypeInfo, terms, onUpdateMastery]);

  // Move to next question or complete
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed!
      setIsCompleted(true);
      const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length;
      if (totalCorrect / (questions.length || 1) >= 0.7) {
        triggerCelebration();
      }
    }
  }, [currentIndex, questions.length, userAnswers]);

  // Keyboard shortcut listener (Enter for Next, 1-4 for options)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      if (!isAnswered && currentQ?.shuffledOptions) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (currentQ.shuffledOptions[idx]) {
            handleSelectOption(currentQ.shuffledOptions[idx]);
          }
        }
      } else if (isAnswered && e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQ, handleSelectOption, handleNext]);

  // Statistics calculation
  const totalQuestions = questions.length;
  const score = Object.values(userAnswers).filter(a => a.isCorrect).length;
  const percentScore = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const receptiveStats = useMemo(() => {
    const list = Object.values(userAnswers).filter(a => a.type === 'Receptive');
    const correct = list.filter(a => a.isCorrect).length;
    return { correct, total: list.length };
  }, [userAnswers]);

  const productiveStats = useMemo(() => {
    const list = Object.values(userAnswers).filter(a => a.type === 'Productive');
    const correct = list.filter(a => a.isCorrect).length;
    return { correct, total: list.length };
  }, [userAnswers]);

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm max-w-xl mx-auto my-8">
        <BookOpen size={40} className="text-gray-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-1">Chưa có dữ liệu bài test</h3>
        <p className="text-xs text-gray-500 mb-6">Đang tải bộ câu hỏi chuẩn đoán cho học phần này...</p>
      </div>
    );
  }

  // ==========================================
  // RESULTS SCREEN
  // ==========================================
  if (isCompleted) {
    let evaluationTier = {
      title: 'Xuất sắc! Nắm vững từ vựng chuyên sâu',
      badge: 'Band 6.5+ Ready',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: 'Bạn đã hoàn toàn làm chủ cả 2 khía cạnh: Nhận biết ngữ nghĩa (Receptive) và Khả năng vận dụng ngữ cảnh (Productive).',
      ringColor: 'border-emerald-500'
    };

    if (percentScore < 50) {
      evaluationTier = {
        title: 'Cần củng cố thêm từ vựng cơ bản',
        badge: 'Cần ôn luyện lại',
        badgeColor: 'bg-rose-50 text-rose-800 border-rose-300',
        description: 'Hãy ôn luyện lại bằng Thẻ ghi nhớ Flashcard và Chế độ Học (Learn Mode) trước khi làm lại bài test này.',
        ringColor: 'border-rose-500'
      };
    } else if (percentScore < 75) {
      evaluationTier = {
        title: 'Đạt yêu cầu khá tốt (Good Competence)',
        badge: 'Band 5.0 - 5.5',
        badgeColor: 'bg-amber-50 text-amber-800 border-amber-300',
        description: 'Bạn có nền tảng từ vựng khá, chỉ cần ôn lại những câu sai và cấu trúc điền từ ngữ cảnh.',
        ringColor: 'border-amber-500'
      };
    }

    return (
      <div className="w-full max-w-3xl mx-auto animate-pop-in text-left">
        {/* Score Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-8 sm:p-10 mb-8 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-primary/10 text-primary flex items-center justify-center">
            <Award size={44} />
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border inline-block mb-3 ${evaluationTier.badgeColor}`}>
            {evaluationTier.badge}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
            {evaluationTier.title}
          </h2>
          <p className="text-sm text-gray-600 max-w-lg mx-auto mb-8">
            {evaluationTier.description}
          </p>

          {/* Big Score Numbers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto mb-8 text-left">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-center">
              <span className="text-xs text-gray-500 font-bold block mb-1">Tổng điểm đạt được</span>
              <p className="text-3xl font-black text-primary">
                {score} <span className="text-lg font-bold text-gray-400">/ {totalQuestions}</span>
              </p>
              <span className="text-xs font-black text-emerald-600 mt-0.5 block">{percentScore}% chính xác</span>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-center">
              <span className="text-xs text-blue-700 font-bold block mb-1">Receptive (Tiếp nhận)</span>
              <p className="text-2xl font-black text-blue-900">
                {receptiveStats.correct} <span className="text-base font-bold text-blue-400">/ {receptiveStats.total}</span>
              </p>
              <span className="text-[11px] text-blue-600 font-medium mt-0.5 block">Định nghĩa & Ngữ nghĩa</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 text-center">
              <span className="text-xs text-purple-700 font-bold block mb-1">Productive (Vận dụng)</span>
              <p className="text-2xl font-black text-purple-900">
                {productiveStats.correct} <span className="text-base font-bold text-purple-400">/ {productiveStats.total}</span>
              </p>
              <span className="text-[11px] text-purple-600 font-medium mt-0.5 block">Ngữ cảnh & Collocation</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={startTest}
              className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-extrabold text-sm rounded-2xl transition-all shadow-sm flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <RotateCcw size={16} />
              <span>Làm lại bài Diagnostic Test</span>
            </button>

            {onSwitchMode && (
              <button
                onClick={() => onSwitchMode('learn')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <Brain size={16} />
                <span>Chuyển sang Chế độ Học (Learn)</span>
              </button>
            )}

            <button
              onClick={() => setShowReviewList(!showReviewList)}
              className="px-6 py-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-bold text-sm rounded-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{showReviewList ? 'Thu gọn đáp án chi tiết' : 'Xem lại 30 câu hỏi & Giải thích'}</span>
              {showReviewList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        {showReviewList && (
          <div className="space-y-4 mb-12">
            <h3 className="text-lg font-black text-gray-900 flex items-center gap-2 mb-4">
              <FileCheck2 size={20} className="text-primary" />
              <span>Bảng phân tích chi tiết từng câu hỏi ({questions.length} câu)</span>
            </h3>

            {questions.map((q, idx) => {
              const ans = userAnswers[q.id];
              const isUserCorrect = ans?.isCorrect;

              return (
                <div 
                  key={q.id} 
                  className={`p-5 rounded-2xl border transition-all bg-white ${
                    isUserCorrect 
                      ? 'border-emerald-200 shadow-2xs' 
                      : 'border-rose-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-gray-400">Câu {idx + 1}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        q.type === 'Receptive' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {q.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {isUserCorrect ? (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <Check size={13} />
                          <span>Đúng</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <XCircle size={13} />
                          <span>Chưa đúng</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className="text-sm sm:text-base font-extrabold text-gray-900 mb-3">
                    {q.question.replace(/^\[(Receptive|Productive)\]\s*/, '')}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                      <span className="text-gray-400 font-medium block text-[11px] mb-0.5">Bạn đã chọn:</span>
                      <span className={`font-bold ${isUserCorrect ? 'text-emerald-700' : 'text-rose-600 line-through'}`}>
                        {ans?.selected || 'Chưa chọn'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <span className="text-emerald-700 font-medium block text-[11px] mb-0.5">Đáp án chuẩn xác:</span>
                      <span className="font-extrabold text-emerald-950">
                        {q.correctAnswer}
                      </span>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-primary font-bold">Giải thích: </strong>
                    <span>{q.rationale}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // ACTIVE QUESTION SCREEN
  // ==========================================
  const progressPercent = Math.round(((currentIndex) / (totalQuestions || 1)) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      {/* Top Progress Bar - Compact */}
      <div className="bg-white rounded-2xl border border-gray-200/90 shadow-2xs p-3.5 sm:p-4 mb-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <ClipboardCheck size={18} />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  Diagnostic Test
                </span>
                <span className="px-1.5 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">
                  Pre-IELTS
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight">
                {vocabSet?.title || 'Vocabulary Set'}
              </h3>
            </div>
          </div>

          {/* Counters */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <div className="px-2.5 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-lg text-xs font-bold">
              Câu: <strong className="text-gray-900">{currentIndex + 1}</strong> / {totalQuestions}
            </div>

            <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-xs font-bold flex items-center gap-1">
              <Check size={13} className="text-emerald-600 stroke-[2.5]" />
              <span>Đúng: <strong>{score}</strong></span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card - Compact & Steady */}
      <div className={`bg-white rounded-2xl sm:rounded-3xl border shadow-sm p-4 sm:p-5 transition-all ${
        isAnswered && selectedOption === currentQ?.correctAnswer
          ? 'border-emerald-300 ring-2 ring-emerald-100'
          : isAnswered && selectedOption !== currentQ?.correctAnswer
          ? 'border-rose-300 ring-2 ring-rose-100'
          : 'border-gray-200/90'
      }`}>
        {/* Meta Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-2.5 mb-3">
          <div className="flex items-center gap-1.5">
            <span className={`px-2 py-0.5 rounded-lg text-[11px] font-black tracking-wide border uppercase flex items-center gap-1 ${
              questionTypeInfo.type === 'Receptive'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-purple-50 text-purple-800 border-purple-200'
            }`}>
              <BookOpen size={12} />
              <span>[{questionTypeInfo.type}]</span>
              <span className="hidden sm:inline font-medium normal-case text-[10px] text-gray-500">
                {questionTypeInfo.type === 'Receptive' ? '• Nhận biết ngữ nghĩa' : '• Vận dụng ngữ cảnh'}
              </span>
            </span>
          </div>

          <span className="text-[11px] font-bold text-gray-400">
            Câu {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Question Text */}
        <div className="mb-3">
          <h2 className="text-base sm:text-lg md:text-xl font-extrabold text-gray-900 leading-snug">
            {questionTypeInfo.cleanText}
          </h2>
        </div>

        {/* Options Grid: 2-Column Responsive Compact Grid */}
        <div className="space-y-2 mb-3">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            Chọn 1 trong các đáp án sau (hoặc phím 1-4):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(currentQ?.shuffledOptions || currentQ?.options || []).map((option, idx) => {
              const isSelected = selectedOption === option;
              const isTargetCorrect = option.trim().toLowerCase() === currentQ?.correctAnswer.trim().toLowerCase();

              let buttonStyle = 'bg-gray-50/80 hover:bg-white hover:border-primary/50 border-gray-200/90 text-gray-800';

              if (isAnswered) {
                if (isTargetCorrect) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300 shadow-2xs';
                } else if (isSelected && !isTargetCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-200 line-through';
                } else {
                  buttonStyle = 'bg-gray-50/40 border-gray-100 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full min-h-[50px] sm:min-h-[54px] p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all flex items-start justify-between gap-2.5 group active:scale-[0.99] cursor-pointer ${buttonStyle}`}
                >
                  <div className="flex items-start gap-2.5 flex-1 min-w-0">
                    <span className={`w-7 h-7 rounded-lg border text-xs font-black flex items-center justify-center transition-colors flex-shrink-0 mt-0.5 ${
                      isAnswered && isTargetCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                        : isAnswered && isSelected && !isTargetCorrect
                        ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                        : 'bg-white border-gray-200 text-gray-600 group-hover:border-primary group-hover:text-primary shadow-2xs'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-semibold leading-snug break-words flex-1 min-w-0 pt-0.5">
                      {option}
                    </span>
                  </div>

                  {/* Reserved fixed icon slot: 24px width ALWAYS preserved before & after clicking */}
                  <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center mt-0.5">
                    {isAnswered && isTargetCorrect && (
                      <CheckCircle2 size={19} className="text-emerald-600 animate-pop-in" />
                    )}
                    {isAnswered && isSelected && !isTargetCorrect && (
                      <XCircle size={19} className="text-rose-500 animate-pop-in" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Permanent Bottom Action Slot: Zero Height Jump */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          {!isAnswered ? (
            <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border border-gray-100 bg-gray-50/70 flex items-center justify-between gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center text-xs flex-shrink-0 font-bold shadow-2xs">
                  ⌨️
                </span>
                <span className="font-medium text-gray-600">
                  Bấm phím <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700">1</kbd> - <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded text-[11px] font-bold text-gray-700">4</kbd> hoặc click chọn đáp án
                </span>
              </div>
              <span className="text-[11px] text-gray-400 hidden sm:inline font-medium">
                Đang chờ chọn...
              </span>
            </div>
          ) : (
            <div className={`p-3 sm:p-3.5 rounded-xl sm:rounded-2xl border shadow-xs transition-all animate-pop-in ${
              selectedOption === currentQ?.correctAnswer
                ? 'bg-emerald-50/90 border-emerald-300'
                : 'bg-rose-50/90 border-rose-300'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Left: Feedback content */}
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    selectedOption === currentQ?.correctAnswer
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {selectedOption === currentQ?.correctAnswer ? (
                      <Check size={16} className="stroke-[2.5]" />
                    ) : (
                      <XCircle size={16} />
                    )}
                  </span>

                  <div className="flex-1 min-w-0 text-xs">
                    {selectedOption === currentQ?.correctAnswer ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-sm text-emerald-950">Chính xác!</span>
                        <span className="px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold text-[10px]">
                          +1 điểm
                        </span>
                      </div>
                    ) : (
                      <div className="text-xs text-rose-950 flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span className="font-bold text-rose-900">Chưa chính xác.</span>
                        <span className="text-gray-600 font-medium">Đáp án chuẩn:</span>
                        <strong className="text-emerald-900 font-black bg-white px-2 py-0.5 rounded border border-rose-200/80 shadow-2xs">
                          {currentQ?.correctAnswer}
                        </strong>
                      </div>
                    )}

                    {currentQ?.rationale && (
                      <p className="mt-1 text-xs text-gray-700 leading-relaxed break-words">
                        <strong className="text-gray-900 font-semibold">Giải thích: </strong>
                        {currentQ.rationale}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right / Inline Action Button (NO autoFocus!) */}
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full md:w-auto px-5 py-2.5 bg-primary hover:bg-primary-container text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 flex-shrink-0 active:scale-95 cursor-pointer self-stretch md:self-center"
                >
                  <span>{currentIndex < totalQuestions - 1 ? 'Câu tiếp theo (Enter)' : 'Xem kết quả bài Test'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
