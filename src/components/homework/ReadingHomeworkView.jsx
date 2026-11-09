import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Save, 
  Send, 
  BookOpen, 
  Sparkles, 
  Info, 
  Check, 
  Trophy, 
  Filter, 
  Eye, 
  ChevronRight,
  FileText
} from 'lucide-react';
import { playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';

// Helper to normalize and check short-answer accuracy in IELTS
export function checkShortAnswer(userAnswer, acceptedList) {
  if (!userAnswer || !userAnswer.trim()) return false;
  
  const clean = (str) => {
    return (str || '')
      .toString()
      .toLowerCase()
      .replace(/[‘'’"`]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .replace(/\b(a|an|the)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const userClean = clean(userAnswer);
  if (!userClean) return false;

  return acceptedList.some(accepted => {
    const acceptedClean = clean(accepted);
    if (userClean === acceptedClean) return true;
    // Word connector equivalence (e.g., "12 and 15" vs "12 15" vs "12 to 15")
    const normalizeConnectors = (s) => s.replace(/\s+(and|to|or)\s+/g, ' ').replace(/\s+/g, ' ');
    if (normalizeConnectors(userClean) === normalizeConnectors(acceptedClean)) return true;
    return false;
  });
}

// Count words in user's answer
function countWords(str) {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

export default function ReadingHomeworkView({ homework }) {
  const navigate = useNavigate();
  const homeworkId = homework.id;

  // Active Passage Tab (1 or 2)
  const [activePassageId, setActivePassageId] = useState('p1');
  
  // Answers state: { [qId]: string }
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_hw_${homeworkId}_draft`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'wrong_only' | 'p1' | 'p2'
  const [fontSize, setFontSize] = useState('base'); // 'sm' | 'base' | 'lg'

  // Load past submission from history if exists
  useEffect(() => {
    try {
      const history = localStorage.getItem('dream_homework_history');
      if (history) {
        const parsed = JSON.parse(history);
        if (parsed[homeworkId]) {
          setIsSubmitted(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [homeworkId]);

  // Flatten all questions
  const allQuestions = useMemo(() => {
    return homework.passages.flatMap(p => p.questions.map(q => ({ ...q, passageId: p.id, passageNumber: p.number })));
  }, [homework.passages]);

  // Count answered questions
  const answeredCount = useMemo(() => {
    return allQuestions.filter(q => (answers[q.id] || '').trim().length > 0).length;
  }, [allQuestions, answers]);

  // Evaluation results
  const evaluationResults = useMemo(() => {
    const results = {};
    let correctCount = 0;

    allQuestions.forEach(q => {
      const userAns = answers[q.id] || '';
      const isAnsCorrect = checkShortAnswer(userAns, q.acceptedAnswers);
      if (isAnsCorrect) correctCount++;
      results[q.id] = {
        userAnswer: userAns,
        isCorrect: isAnsCorrect,
        primaryAnswer: q.primaryAnswer,
        acceptedAnswers: q.acceptedAnswers,
        explanation: q.explanation,
        evidence: q.evidence
      };
    });

    return {
      results,
      correctCount,
      totalCount: allQuestions.length,
      percentage: Math.round((correctCount / (allQuestions.length || 1)) * 100)
    };
  }, [allQuestions, answers]);

  // Handle Input Change
  const handleInputChange = (qId, val) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  // Save Draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`dream_hw_${homeworkId}_draft`, JSON.stringify(answers));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Submit Homework
  const handleSubmit = () => {
    if (isSubmitted) return;

    if (answeredCount < allQuestions.length) {
      const confirmSubmit = window.confirm(
        `Bạn mới trả lời ${answeredCount}/${allQuestions.length} câu hỏi. Bạn có chắc chắn muốn nộp bài ngay bây giờ để chấm điểm không?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);

    // Save to homework history
    try {
      const currentHistory = JSON.parse(localStorage.getItem('dream_homework_history') || '{}');
      currentHistory[homeworkId] = {
        score: evaluationResults.correctCount,
        total: evaluationResults.totalCount,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem('dream_homework_history', JSON.stringify(currentHistory));
      localStorage.setItem(`dream_hw_${homeworkId}_draft`, JSON.stringify(answers));
    } catch (e) {
      console.error(e);
    }

    // Play celebration or sound
    if (evaluationResults.percentage >= 70) {
      playCorrectSound();
      triggerCelebration();
    } else {
      playWrongSound();
    }
  };

  // Reset / Retake
  const handleRetake = () => {
    const confirmReset = window.confirm('Bạn có chắc chắn muốn làm lại bài tập này từ đầu không? Dữ liệu câu trả lời sẽ được làm mới.');
    if (!confirmReset) return;

    setAnswers({});
    setIsSubmitted(false);
    setFilterMode('all');
    try {
      localStorage.removeItem(`dream_hw_${homeworkId}_draft`);
      const currentHistory = JSON.parse(localStorage.getItem('dream_homework_history') || '{}');
      delete currentHistory[homeworkId];
      localStorage.setItem('dream_homework_history', JSON.stringify(currentHistory));
    } catch (e) {
      console.error(e);
    }
  };

  // Filter questions for the right panel
  const displayedQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      if (filterMode === 'wrong_only') {
        return !evaluationResults.results[q.id]?.isCorrect;
      }
      if (filterMode === 'p1') {
        return q.passageId === 'p1';
      }
      if (filterMode === 'p2') {
        return q.passageId === 'p2';
      }
      return true;
    });
  }, [allQuestions, filterMode, evaluationResults.results]);

  const activePassage = homework.passages.find(p => p.id === activePassageId) || homework.passages[0];

  // Font size classes for passage reading
  const passageFontClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  return (
    <div className="pt-20 pb-16 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to="/homework" className="hover:text-primary transition-colors font-medium">Homework</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate max-w-xs">{homework.title}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/homework"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs"
            >
              <ArrowLeft size={14} />
              <span>Tất cả bài tập</span>
            </Link>

            <Link
              to="/vocab/pre-ielts-reading-1"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
            >
              <BookOpen size={14} className="text-amber-600" />
              <span>Học 30 từ vựng Reading 1</span>
            </Link>
          </div>
        </div>

        {/* ASSIGNMENT HEADER CARD */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-5 sm:p-6 mb-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary text-white uppercase tracking-wider">
                  {homework.level}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                  <BookOpen size={13} />
                  <span>IELTS Reading (Short-answer)</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {homework.session}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {homework.title}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-3xl">
                {homework.description}
              </p>
            </div>

            {/* Quick Actions (Save, Progress, Submit) */}
            <div className="flex items-center gap-3 self-start lg:self-center flex-wrap">
              {/* Progress pill */}
              <div className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700">
                Đã điền: <strong className="text-primary">{answeredCount}</strong> / {allQuestions.length} câu
              </div>

              {/* Save Draft Button */}
              {!isSubmitted && (
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold rounded-xl border border-gray-200 flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                >
                  {saveToast ? <Check size={14} className="text-emerald-600" /> : <Save size={14} />}
                  <span>{saveToast ? 'Đã lưu nháp!' : 'Lưu nháp'}</span>
                </button>
              )}

              {/* Submit or Retake */}
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw size={15} />
                  <span>Làm lại bài tập</span>
                </button>
              )}
            </div>
          </div>

          {/* POST-SUBMISSION SCORE REPORT BANNER */}
          {isSubmitted && (
            <div className="mt-5 pt-5 border-t border-gray-100 animate-pop-in">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-gray-900">
                        Kết quả bài làm: {evaluationResults.correctCount} / {evaluationResults.totalCount} câu đúng
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-black border ${
                        evaluationResults.percentage >= 70 
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                          : 'bg-amber-100 text-amber-800 border-amber-300'
                      }`}>
                        {evaluationResults.percentage}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">
                      {evaluationResults.percentage >= 80 
                        ? 'Xuất sắc! Bạn nắm rất vững chiến thuật tìm từ khóa và quét vị trí thông tin trong bài đọc.'
                        : evaluationResults.percentage >= 60
                        ? 'Khá tốt! Bạn đã tìm được đa số thông tin trọng tâm. Hãy đọc kỹ phần giải thích chi tiết các câu sai bên dưới.'
                        : 'Cần củng cố thêm: Hãy đối chiếu dẫn chứng từng câu sai với bài đọc để rút kinh nghiệm.'}
                    </p>
                  </div>
                </div>

                {/* Filter buttons */}
                <div className="flex items-center gap-2 self-stretch md:self-auto flex-wrap">
                  <button
                    onClick={() => setFilterMode('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                      filterMode === 'all'
                        ? 'bg-primary text-white border-primary shadow-2xs'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Tất cả (12)
                  </button>
                  <button
                    onClick={() => setFilterMode('wrong_only')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1 cursor-pointer ${
                      filterMode === 'wrong_only'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-2xs'
                        : 'bg-white text-rose-700 border-rose-200 hover:bg-rose-50'
                    }`}
                  >
                    <XCircle size={13} />
                    <span>Chỉ xem câu sai ({allQuestions.length - evaluationResults.correctCount})</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* MAIN IELTS 2-COLUMN SPLIT SCREEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-auto lg:h-[calc(100vh-210px)] min-h-[650px]">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: READING PASSAGE TEXT (50% on desktop)              */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden">
            
            {/* Passage Selector Tabs & Font Controls */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              {/* Passage 1 / Passage 2 Buttons */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-gray-200/80 shadow-2xs">
                {homework.passages.map(p => {
                  const isActive = activePassageId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePassageId(p.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <BookOpen size={13} />
                      <span>Bài đọc {p.number}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                        isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {p.number === 1 ? 'Câu 1-6' : 'Câu 7-12'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Font Size Adjuster */}
              <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold">
                <span>Cỡ chữ:</span>
                <button
                  type="button"
                  onClick={() => setFontSize('sm')}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                    fontSize === 'sm' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Cỡ chữ nhỏ"
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('base')}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                    fontSize === 'base' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Cỡ chữ chuẩn"
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => setFontSize('lg')}
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                    fontSize === 'lg' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Cỡ chữ lớn"
                >
                  A+
                </button>
              </div>
            </div>

            {/* Passage Body Text (Independently scrollable) */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-justify select-text">
              <div className="border-b border-gray-100 pb-3 mb-4">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  IELTS Reading Passage {activePassage.number}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  {activePassage.title}
                </h2>
              </div>

              <div className={`text-gray-800 ${passageFontClass} font-normal space-y-4`}>
                {activePassage.content.split('\n\n').map((paragraph, pIdx) => {
                  if (paragraph.trim() === activePassage.title.trim()) return null;
                  return (
                    <p key={pIdx} className="leading-relaxed text-gray-800">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: SHORT-ANSWER QUESTIONS (50% on desktop)           */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden">
            
            {/* Right Pane Navigation Header */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <FileText size={15} />
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900">
                    Bảng câu hỏi Short-answer ({displayedQuestions.length} câu)
                  </h3>
                </div>
              </div>

              {/* Jump to part tabs */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFilterMode('p1');
                    setActivePassageId('p1');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                    filterMode === 'p1' ? 'bg-primary text-white border-primary shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Phần 1 (1–6)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFilterMode('p2');
                    setActivePassageId('p2');
                  }}
                  className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                    filterMode === 'p2' ? 'bg-primary text-white border-primary shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  Phần 2 (7–12)
                </button>
                {filterMode !== 'all' && (
                  <button
                    type="button"
                    onClick={() => setFilterMode('all')}
                    className="px-2 py-1 text-gray-400 hover:text-gray-700 text-xs font-semibold cursor-pointer"
                  >
                    Hiện tất cả
                  </button>
                )}
              </div>
            </div>

            {/* Questions Body (Independently scrollable) */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              
              {/* Official IELTS Rule Instruction Callout */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950">
                <div className="flex items-start gap-2.5">
                  <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-primary mb-1">
                      HƯỚNG DẪN LÀM BÀI (IELTS INSTRUCTION):
                    </h4>
                    <p className="font-semibold text-gray-800 leading-snug">
                      Answer the questions below using <span className="underline font-black text-rose-700">NO MORE THAN THREE WORDS AND/OR A NUMBER</span> from the passage. Write your answers in boxes 1–12 on your answer sheet.
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      * Lưu ý: Không viết quá 3 từ. Lấy từ ngữ chính xác trực tiếp từ bài đọc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {displayedQuestions.map((q) => {
                  const userVal = answers[q.id] || '';
                  const wordCount = countWords(userVal);
                  const isWordOverLimit = wordCount > 3;
                  const evalItem = evaluationResults.results[q.id];

                  let cardBorderClass = 'border-gray-200 hover:border-gray-300';
                  if (isSubmitted) {
                    cardBorderClass = evalItem?.isCorrect 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : 'border-rose-300 bg-rose-50/30';
                  }

                  return (
                    <div 
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all bg-white shadow-2xs ${cardBorderClass}`}
                    >
                      {/* Question Header & Question Number */}
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-xl font-black text-xs flex items-center justify-center flex-shrink-0 shadow-2xs ${
                            isSubmitted && evalItem?.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : isSubmitted && !evalItem?.isCorrect
                              ? 'bg-rose-500 text-white'
                              : 'bg-primary text-white'
                          }`}>
                            {q.number}
                          </span>
                          <span className="text-[11px] font-bold text-gray-400">
                            Bài đọc {q.passageNumber} • Box {q.number}
                          </span>
                        </div>

                        {/* Submission status tag */}
                        {isSubmitted && (
                          <div>
                            {evalItem?.isCorrect ? (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-200">
                                <CheckCircle2 size={13} className="text-emerald-700" />
                                <span>Chính xác</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1 border border-rose-200">
                                <XCircle size={13} className="text-rose-700" />
                                <span>Chưa chính xác</span>
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Question Text */}
                      <p className="font-bold text-gray-900 text-sm sm:text-base leading-snug mb-3">
                        {q.question}
                      </p>

                      {/* Answer Input Box (Box format like IELTS) */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-2 rounded-xl bg-gray-100 border border-gray-200 text-xs font-black text-gray-600 flex-shrink-0">
                            Box {q.number}
                          </span>
                          
                          <input
                            type="text"
                            disabled={isSubmitted}
                            value={userVal}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            placeholder={q.placeholder || `Điền câu trả lời số ${q.number}...`}
                            className={`flex-1 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all focus:outline-none ${
                              !isSubmitted
                                ? isWordOverLimit
                                  ? 'border-amber-400 focus:ring-2 focus:ring-amber-200 bg-amber-50/50'
                                  : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white'
                                : evalItem?.isCorrect
                                ? 'border-emerald-400 bg-emerald-50 text-emerald-950 font-bold'
                                : 'border-rose-300 bg-rose-50 text-rose-950 font-bold'
                            }`}
                          />
                        </div>

                        {/* Word counter helper during input */}
                        {!isSubmitted && (
                          <div className="flex items-center justify-between text-[11px] px-1 text-gray-400 font-medium">
                            <span>Tối đa: 3 từ và/hoặc 1 chữ số</span>
                            <span className={isWordOverLimit ? 'text-rose-600 font-bold' : ''}>
                              {wordCount} / 3 từ {isWordOverLimit && '(Vượt quá giới hạn!)'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* POST-SUBMISSION EXPLANATION & RATIONALE */}
                      {isSubmitted && (
                        <div className="mt-4 pt-3.5 border-t border-gray-100 space-y-2.5 animate-pop-in">
                          
                          {/* If Wrong: Show Correct Answer Comparison */}
                          {!evalItem?.isCorrect && (
                            <div className="p-3 bg-white rounded-xl border border-rose-200 text-xs space-y-1 shadow-2xs">
                              <div className="flex items-center gap-1.5 text-gray-500">
                                <span>Bạn đã điền:</span>
                                <strong className="text-rose-600 font-bold line-through">
                                  {userVal.trim() ? userVal : '(Để trống)'}
                                </strong>
                              </div>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-gray-600 font-medium">Đáp án chuẩn xác:</span>
                                <strong className="text-emerald-950 font-black bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">
                                  {q.primaryAnswer}
                                </strong>
                                {q.acceptedAnswers.length > 1 && (
                                  <span className="text-[11px] text-gray-500">
                                    (Chấp nhận: {q.acceptedAnswers.slice(0, 3).join(', ')})
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Evidence & Detailed Explanation Box */}
                          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-950 space-y-2">
                            <div className="flex items-start gap-2">
                              <Sparkles size={14} className="text-primary flex-shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="font-bold text-primary">
                                  Dẫn chứng trong bài đọc (Evidence):
                                </p>
                                <blockquote className="italic text-gray-800 bg-white/80 p-2 rounded-lg border border-blue-100/80">
                                  "{q.evidence}"
                                </blockquote>
                              </div>
                            </div>

                            <div className="text-gray-700 leading-relaxed pt-1 border-t border-blue-100">
                              <strong className="text-gray-900 font-bold">Giải thích chi tiết: </strong>
                              <span>{q.explanation}</span>
                            </div>

                            {/* Shortcut button to jump left pane to this question's passage */}
                            {activePassageId !== q.passageId && (
                              <button
                                type="button"
                                onClick={() => setActivePassageId(q.passageId)}
                                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                              >
                                <span>Mở Bài đọc {q.passageNumber} ở khung bên trái</span>
                                <ChevronRight size={12} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {displayedQuestions.length === 0 && (
                  <div className="p-8 text-center bg-gray-50 rounded-2xl border border-gray-200 text-gray-400">
                    <CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-500" />
                    <p className="text-sm font-bold text-gray-700">Tuyệt vời! Không có câu sai nào trong mục này.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
