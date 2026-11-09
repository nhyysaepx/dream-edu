import React, { useState, useEffect, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Volume2, 
  Sparkles, 
  Award, 
  Check, 
  Brain, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  CheckSquare, 
  Layers, 
  GraduationCap,
  FileCheck2,
  Stethoscope,
  Flame
} from 'lucide-react';
import { speakWord, playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';
import { getDiagnosticQuestionsForSet } from '../../data/diagnosticQuestions';

export default function DiagnosticTestMode({ vocabSet, terms, onUpdateMastery, onSwitchMode }) {
  // Load questions for the current vocab set
  const rawQuestions = useMemo(() => {
    return getDiagnosticQuestionsForSet(vocabSet);
  }, [vocabSet]);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: { selected, isCorrect } }
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showReviewList, setShowReviewList] = useState(false);

  // Initialize or restart test
  const startTest = () => {
    // Randomize options for each question
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
  };

  useEffect(() => {
    startTest();
  }, [rawQuestions]);

  const currentQ = questions[currentIndex];

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
  const handleSelectOption = (option) => {
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
      const termItem = terms.find(t => t.term.toLowerCase() === (currentQ.targetWord || '').toLowerCase());
      if (termItem && onUpdateMastery) {
        onUpdateMastery(termItem.id, 'mastered');
      }
    } else {
      playWrongSound();
      if (currentQ.targetWord) speakWord(currentQ.targetWord);
      const termItem = terms.find(t => t.term.toLowerCase() === (currentQ.targetWord || '').toLowerCase());
      if (termItem && onUpdateMastery) {
        onUpdateMastery(termItem.id, 'learning');
      }
    }
  };

  // Move to next question or complete
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      // Completed!
      setIsCompleted(true);
      const totalCorrect = Object.values(userAnswers).filter(a => a.isCorrect).length + (selectedOption === currentQ.correctAnswer ? 1 : 0);
      if (totalCorrect / questions.length >= 0.7) {
        triggerCelebration();
      }
    }
  };

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
  }, [isAnswered, currentQ, handleNext]);

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
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto text-left">
      {/* Top Progress Bar */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-5 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <ClipboardCheck size={20} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-primary">
                  Diagnostic Test
                </span>
                <span className="px-2 py-0.2 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold">
                  Pre-IELTS Standard
                </span>
              </div>
              <h3 className="text-base font-black text-gray-900 leading-tight">
                {vocabSet.title}
              </h3>
            </div>
          </div>

          {/* Counters */}
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-xs font-bold">
              Câu: <strong className="text-gray-900">{currentIndex + 1}</strong> / {totalQuestions}
            </div>

            <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1">
              <Check size={14} className="text-emerald-600 stroke-[2.5]" />
              <span>Đúng: <strong>{score}</strong></span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
          <div 
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <div className={`bg-white rounded-3xl border shadow-sm p-6 sm:p-8 transition-all ${
        isAnswered && selectedOption === currentQ.correctAnswer
          ? 'border-emerald-300 ring-2 ring-emerald-100'
          : isAnswered && selectedOption !== currentQ.correctAnswer
          ? 'border-rose-300 ring-2 ring-rose-100'
          : 'border-gray-200/90'
      }`}>
        {/* Meta Bar */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-3.5 mb-6">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-xl text-xs font-black tracking-wide border uppercase flex items-center gap-1.5 ${
              questionTypeInfo.type === 'Receptive'
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-purple-50 text-purple-800 border-purple-200'
            }`}>
              <BookOpen size={13} />
              <span>[{questionTypeInfo.type}]</span>
              <span className="hidden sm:inline font-semibold normal-case text-[11px] text-gray-500">
                {questionTypeInfo.type === 'Receptive' ? '• Nhận biết ngữ nghĩa' : '• Vận dụng ngữ cảnh'}
              </span>
            </span>
          </div>

          <span className="text-xs font-bold text-gray-400">
            Câu {currentIndex + 1} trên {totalQuestions}
          </span>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
            {questionTypeInfo.cleanText}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="space-y-3 mb-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Chọn 1 trong các đáp án sau (hoặc phím 1-4):
          </p>

          <div className="grid grid-cols-1 gap-3">
            {currentQ.shuffledOptions.map((option, idx) => {
              const isSelected = selectedOption === option;
              const isTargetCorrect = option.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();

              let buttonStyle = 'bg-gray-50/80 hover:bg-white hover:border-primary/50 border-gray-200/90 text-gray-800';

              if (isAnswered) {
                if (isTargetCorrect) {
                  buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-4 ring-emerald-200 scale-[1.005] shadow-xs';
                } else if (isSelected && !isTargetCorrect) {
                  buttonStyle = 'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-4 ring-rose-200 line-through';
                } else {
                  buttonStyle = 'bg-gray-50/40 border-gray-100 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(option)}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm sm:text-base transition-all flex items-center justify-between group active:scale-[0.99] cursor-pointer ${buttonStyle}`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className={`w-8 h-8 rounded-xl border text-xs font-black flex items-center justify-center transition-colors flex-shrink-0 ${
                      isAnswered && isTargetCorrect
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : isAnswered && isSelected && !isTargetCorrect
                        ? 'bg-rose-500 text-white border-rose-500'
                        : 'bg-white border-gray-200 text-gray-600 group-hover:border-primary group-hover:text-primary shadow-2xs'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-semibold leading-relaxed">{option}</span>
                  </div>

                  {isAnswered && isTargetCorrect && (
                    <CheckCircle2 size={22} className="text-emerald-600 flex-shrink-0 ml-2 animate-pop-in" />
                  )}
                  {isAnswered && isSelected && !isTargetCorrect && (
                    <XCircle size={22} className="text-rose-500 flex-shrink-0 ml-2 animate-pop-in" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rationale / Explanation Box (Shows immediately when answered) */}
        {isAnswered && (
          <div className="mt-6 pt-5 border-t border-gray-100 animate-pop-in">
            <div className={`p-4 rounded-2xl border mb-5 ${
              selectedOption === currentQ.correctAnswer
                ? 'bg-emerald-50/70 border-emerald-200'
                : 'bg-blue-50/70 border-blue-200'
            }`}>
              <div className="flex items-center gap-2 mb-1.5">
                <Sparkles size={16} className="text-primary" />
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-primary">
                  Giải thích chuyên sâu (Explanation & Rationale):
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {currentQ.rationale}
              </p>
            </div>

            {/* Next Question Action Button */}
            <div className="flex items-center justify-end">
              <button
                autoFocus
                onClick={handleNext}
                className="px-7 py-3 bg-primary hover:bg-primary-container text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>{currentIndex < totalQuestions - 1 ? 'Câu tiếp theo (Enter)' : 'Xem kết quả bài Test'}</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
