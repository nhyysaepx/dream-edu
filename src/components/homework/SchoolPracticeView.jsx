import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
  Eye, 
  FileText,
  Edit3,
  HelpCircle,
  Clock,
  Award,
  List,
  X,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  CheckCheck,
  GraduationCap
} from 'lucide-react';
import { playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';
import StudentRequiredModal from '../StudentRequiredModal';
import StudentBadge from '../StudentBadge';
import { getStoredStudent } from '../../utils/studentStorage';
import { submitHomeworkOrPracticeResult } from '../../services/submissionService';
import { checkShortAnswer } from './ReadingHomeworkView';

// Evaluate a user's answer against accepted answers
export function evaluateSchoolAnswer(question, rawUserAnswer) {
  if (rawUserAnswer === undefined || rawUserAnswer === null || rawUserAnswer === '') {
    return { isCorrect: false, isEmpty: true };
  }
  const userAnswer = rawUserAnswer.toString().trim();
  if (!userAnswer) return { isCorrect: false, isEmpty: true };

  const acceptedList = Array.isArray(question.acceptedAnswers) && question.acceptedAnswers.length > 0
    ? question.acceptedAnswers
    : [question.primaryAnswer].filter(Boolean);

  // If question has options (multiple-choice A, B, C, D)
  if (Array.isArray(question.options) && question.options.length > 0) {
    const userClean = userAnswer.toUpperCase().trim();
    const primaryClean = (question.primaryAnswer || '').toUpperCase().trim();

    if (userClean === primaryClean) {
      return { isCorrect: true, isEmpty: false };
    }

    const acceptedMatch = acceptedList.some(acc => {
      const accStr = (acc || '').toString().trim().toUpperCase();
      return userClean === accStr;
    });
    if (acceptedMatch) return { isCorrect: true, isEmpty: false };

    // Also match full option text
    const cleanText = userAnswer.toLowerCase().trim();
    const primaryOption = question.options.find(opt => (opt.letter || '').toUpperCase() === primaryClean);
    if (primaryOption && primaryOption.text.toLowerCase().trim() === cleanText) {
      return { isCorrect: true, isEmpty: false };
    }
    return { isCorrect: false, isEmpty: false };
  }

  // Text fill / cloze gap / word bank fill
  const match = checkShortAnswer(userAnswer, acceptedList);
  if (match) return { isCorrect: true, isEmpty: false };

  // Normalization for sentence transformation
  const normalizeSentence = (str) => {
    return (str || '')
      .toString()
      .toLowerCase()
      .replace(/[‘'’"`]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const normUser = normalizeSentence(userAnswer);
  const normMatch = acceptedList.some(acc => normalizeSentence(acc) === normUser);
  if (normMatch) return { isCorrect: true, isEmpty: false };

  return { isCorrect: false, isEmpty: false };
}

// Word counter helper
function countWords(str) {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function SchoolPracticeView({
  practice,
  mode = 'practice',
  parentPath = '/practice',
  parentLabel = 'Luyện tập',
  storagePrefix = 'dream_practice_',
  historyKey = 'dream_practice_history'
}) {
  const navigate = useNavigate();
  const id = practice?.id || 'school-practice';

  // Student info state
  const [student, setStudent] = useState(() => getStoredStudent());
  const [showStudentModal, setShowStudentModal] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Answers state
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}${id}_draft`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Submission state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [saveToast, setSaveToast] = useState(false);
  const [showPalette, setShowPalette] = useState(false);
  const [paletteFilter, setPaletteFilter] = useState('all'); // 'all' | 'unanswered' | 'answered' | 'correct' | 'wrong'

  // Expanded sections & theory toggle states
  const [expandedTheories, setExpandedTheories] = useState({});
  const [expandedExplanations, setExpandedExplanations] = useState({});
  const [activeSectionId, setActiveSectionId] = useState(null);

  // Flattened questions list
  const allQuestions = useMemo(() => {
    if (Array.isArray(practice?.questions) && practice.questions.length > 0) {
      return practice.questions;
    }
    if (Array.isArray(practice?.passages)) {
      return practice.passages.flatMap(p => p.questions || []);
    }
    return [];
  }, [practice]);

  // Total questions count
  const totalQuestionsCount = allQuestions.length || practice?.totalQuestions || 0;

  // Answered questions count
  const answeredCount = useMemo(() => {
    return allQuestions.filter(q => {
      const val = answers[q.id];
      return val !== undefined && val !== null && val.toString().trim() !== '';
    }).length;
  }, [allQuestions, answers]);

  // Load previous submission from history if available
  useEffect(() => {
    try {
      const historyStr = localStorage.getItem(historyKey);
      if (historyStr) {
        const historyObj = JSON.parse(historyStr);
        if (historyObj[id] && historyObj[id].answers) {
          setAnswers(historyObj[id].answers);
          setIsSubmitted(true);
        }
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, [id, historyKey]);

  // Auto-save draft every 5 seconds if answers changed
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`${storagePrefix}${id}_draft`, JSON.stringify(answers));
      } catch (e) {
        console.error('Failed to auto-save draft:', e);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [answers, isSubmitted, storagePrefix, id]);

  // Handle manual save draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`${storagePrefix}${id}_draft`, JSON.stringify(answers));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error('Failed to save draft:', e);
    }
  };

  // Handle answer change
  const handleAnswerChange = (questionId, value) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Evaluation results
  const evaluationResults = useMemo(() => {
    if (!isSubmitted) return null;

    let correctCount = 0;
    const details = {};
    const sectionStats = {};

    allQuestions.forEach(q => {
      const userAns = answers[q.id];
      const res = evaluateSchoolAnswer(q, userAns);
      details[q.id] = res;
      if (res.isCorrect) correctCount++;

      // Section stats
      const secKey = q.passageId || 'general';
      if (!sectionStats[secKey]) {
        sectionStats[secKey] = { correct: 0, total: 0 };
      }
      sectionStats[secKey].total++;
      if (res.isCorrect) sectionStats[secKey].correct++;
    });

    const total = allQuestions.length || 1;
    const percentage = Math.round((correctCount / total) * 100);
    const scoreOutOf10 = (Math.round((correctCount / total) * 100) / 10).toFixed(1);

    return {
      correctCount,
      totalCount: total,
      percentage,
      scoreOutOf10,
      details,
      sectionStats
    };
  }, [isSubmitted, allQuestions, answers]);

  // Handle submission
  const handleSubmit = () => {
    if (isSubmitted) {
      setShowResultsModal(true);
      return;
    }

    // Require student name if in homework mode
    if (mode === 'homework' && (!student || !student.name || !student.className)) {
      setShowStudentModal(true);
      return;
    }

    // Confirm if questions are unanswered
    const unAnswered = totalQuestionsCount - answeredCount;
    if (unAnswered > 0) {
      const confirmSubmit = window.confirm(
        `Bạn vẫn còn ${unAnswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài chấm điểm ngay không?`
      );
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setShowResultsModal(true);

    // Calculate score
    let correctCount = 0;
    const wrongItems = [];
    allQuestions.forEach(q => {
      const userAns = answers[q.id];
      const res = evaluateSchoolAnswer(q, userAns);
      if (res.isCorrect) {
        correctCount++;
      } else {
        wrongItems.push({
          questionId: q.id,
          number: q.number,
          userAnswer: userAns || '(Bỏ trống)',
          primaryAnswer: q.primaryAnswer,
          explanation: q.explanation
        });
      }
    });

    const total = allQuestions.length || 1;
    const percentage = Math.round((correctCount / total) * 100);
    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);

    // Save to localStorage history
    try {
      const historyStr = localStorage.getItem(historyKey) || '{}';
      const historyObj = JSON.parse(historyStr);
      historyObj[id] = {
        answers,
        score: correctCount,
        total,
        percentage,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem(historyKey, JSON.stringify(historyObj));
    } catch (e) {
      console.error('Failed to save to history:', e);
    }

    // Track submission to backend/Google Sheets
    if (student && student.name) {
      submitHomeworkOrPracticeResult({
        studentName: student.name,
        className: student.className,
        testTitle: practice.title || 'Bài luyện tập Phổ thông',
        score: correctCount,
        total,
        percentage,
        duration: durationSeconds,
        wrongAnswers: wrongItems,
        type: mode === 'practice' ? 'Practice' : 'Homework'
      }).then(() => {
        setSubmissionStatus('success');
      }).catch((err) => {
        console.error('Submission tracking error:', err);
        setSubmissionStatus('error');
      });
    }

    // Celebratory sound
    if (percentage >= 70) {
      playCorrectSound();
      triggerCelebration();
    } else {
      playWrongSound();
    }
  };

  // Reset exercise
  const handleReset = () => {
    const confirmReset = window.confirm('Bạn có chắc chắn muốn làm lại từ đầu không? Toàn bộ câu trả lời hiện tại sẽ được xoá.');
    if (!confirmReset) return;

    setAnswers({});
    setIsSubmitted(false);
    setShowResultsModal(false);
    try {
      localStorage.removeItem(`${storagePrefix}${id}_draft`);
      const historyStr = localStorage.getItem(historyKey);
      if (historyStr) {
        const historyObj = JSON.parse(historyStr);
        delete historyObj[id];
        localStorage.setItem(historyKey, JSON.stringify(historyObj));
      }
    } catch (e) {
      console.error(e);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to question
  const scrollToQuestion = (questionId) => {
    setShowPalette(false);
    const el = document.getElementById(`question-card-${questionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-primary/40');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-primary/40');
      }, 1800);
    }
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    setActiveSectionId(sectionId);
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Toggle theory card
  const toggleTheory = (sectionId) => {
    setExpandedTheories(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Toggle explanation card
  const toggleExplanation = (questionId) => {
    setExpandedExplanations(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const passages = practice?.passages || [];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 pb-28 pt-20">
      {/* Toast notification */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-sm font-semibold animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>Đã lưu bản nháp thành công!</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* TOP HEADER & ASSIGNMENT INFO */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <Link
              to={parentPath}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-gray-600 hover:text-primary transition-colors py-1.5 px-3 rounded-xl bg-gray-100/80 hover:bg-gray-100"
            >
              <ArrowLeft size={16} />
              <span>Quay lại {parentLabel}</span>
            </Link>

            <div className="flex items-center gap-3">
              {student && (
                <StudentBadge student={student} onOpen={() => setShowStudentModal(true)} />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {practice.level || 'Lớp 10'}
              </span>
              {practice.skillBadge && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  {practice.skillBadge}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                <Clock size={13} />
                <span>{practice.duration || '90 - 120 phút'}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                <FileText size={13} />
                <span>{totalQuestionsCount} câu hỏi</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-snug">
              {practice.title}
            </h1>

            {practice.description && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-4xl">
                {practice.description}
              </p>
            )}

            {/* Direct Vocab Learning Button */}
            {practice.vocabId && (
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to={`/vocab/${practice.vocabId}`}
                  className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-lg transition-all"
                >
                  <BookOpen size={18} className="text-white" />
                  <span>{practice.vocabLabel || `Học ${practice.vocabCount || 30} từ vựng bài này`}</span>
                </Link>
                <span className="text-xs text-gray-500 italic">
                  💡 Học trước từ vựng giúp bạn làm nhanh và đạt điểm cao hơn ở các bài đọc hiểu!
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* STICKY ACTION & SECTION NAVIGATION BAR */}
        {/* ========================================================================= */}
        <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-gray-200/90 shadow-sm mb-8 transition-all">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Quick Section Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none text-xs font-bold">
              {passages.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => scrollToSection(p.id)}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
                    activeSectionId === p.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  {p.shortLabel || `Section ${idx + 1}`}
                </button>
              ))}
            </div>

            {/* Status & Actions */}
            <div className="flex items-center justify-between md:justify-end gap-2.5 border-t md:border-t-0 pt-2 md:pt-0 border-gray-100">
              <div className="flex items-center gap-2">
                <div className="text-xs font-bold text-gray-700">
                  <span className="text-primary font-black">{answeredCount}</span>
                  <span className="text-gray-400">/{totalQuestionsCount}</span>
                </div>
                <div className="w-20 sm:w-28 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${totalQuestionsCount ? (answeredCount / totalQuestionsCount) * 100 : 0}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Question palette trigger */}
                <button
                  onClick={() => setShowPalette(true)}
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  title="Xem toàn bộ bảng câu hỏi"
                >
                  <List size={15} />
                  <span className="hidden sm:inline">Bảng câu hỏi</span>
                </button>

                {/* Save draft */}
                {!isSubmitted && (
                  <button
                    onClick={handleSaveDraft}
                    className="px-3 py-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
                    title="Lưu bản nháp"
                  >
                    <Save size={15} />
                    <span className="hidden sm:inline">Lưu nháp</span>
                  </button>
                )}

                {/* Submit button */}
                <button
                  onClick={handleSubmit}
                  className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                    isSubmitted
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-primary hover:bg-primary-container text-white shadow-md shadow-primary/20 hover:shadow-lg'
                  }`}
                >
                  {isSubmitted ? (
                    <>
                      <Trophy size={16} />
                      <span>Xem điểm số</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Nộp bài chấm điểm</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXERCISE CONTENT SECTIONS (TOP-TO-BOTTOM VERTICAL WORKSHEET) */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          {passages.map((passage, pIndex) => (
            <section
              key={passage.id}
              id={`section-${passage.id}`}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-xs transition-all scroll-mt-36"
            >
              {/* Section Header */}
              <div className="border-b border-gray-100 pb-5 mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-primary/10 text-primary uppercase tracking-wide">
                    {passage.shortLabel || `Section ${pIndex + 1}`}
                  </span>
                  {passage.wordLimit && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {passage.wordLimit}
                    </span>
                  )}
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-2">
                  {passage.title}
                </h2>

                {passage.instruction && (
                  <div className="flex items-start gap-2.5 p-3.5 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
                    <Info size={18} className="shrink-0 mt-0.5 text-primary" />
                    <span>{passage.instruction}</span>
                  </div>
                )}
              </div>

              {/* Theory Summary Box (if present, e.g. Section 1 Phonetics rules) */}
              {passage.rulesContent && (
                <div className="mb-8 rounded-2xl border border-indigo-100 bg-indigo-50/40 overflow-hidden">
                  <button
                    onClick={() => toggleTheory(passage.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-indigo-900 text-sm sm:text-base hover:bg-indigo-50/70 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bookmark size={18} className="text-indigo-600" />
                      <span>Tóm tắt quy tắc phát âm & trọng âm Unit 1 - 3 (Bấm để xem/ẩn)</span>
                    </div>
                    {expandedTheories[passage.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>

                  {expandedTheories[passage.id] && (
                    <div className="p-5 pt-0 text-xs sm:text-sm text-indigo-950 font-mono whitespace-pre-wrap leading-relaxed border-t border-indigo-100/60 bg-white/70">
                      {passage.rulesContent}
                    </div>
                  )}
                </div>
              )}

              {/* SECTION SUB-PARTS (e.g. Word Bank Cloze texts in Section 2, or Reading Passages in Section 4, or Writing in Section 5) */}
              {passage.parts && passage.parts.length > 0 ? (
                <div className="space-y-10">
                  {passage.parts.map((part) => {
                    // Filter questions belonging to this part
                    const partQuestions = (passage.questions || []).filter(q => q.partId === part.id);

                    return (
                      <div key={part.id} className="pt-2 border-t border-gray-100 first:border-t-0 first:pt-0">
                        {/* Part Header */}
                        <div className="mb-6">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            {part.badge && (
                              <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-800 border border-gray-200">
                                {part.badge}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mb-1">
                            {part.title}
                          </h3>
                          {part.instruction && (
                            <p className="text-xs sm:text-sm text-gray-600 font-medium italic">
                              {part.instruction}
                            </p>
                          )}
                        </div>

                        {/* =============================================================== */}
                        {/* WORD BANK DISPLAY (FOR CLOZE TESTS WITH WORD BANK BOX) */}
                        {/* =============================================================== */}
                        {part.wordBank && (
                          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 shadow-xs">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2 text-xs font-black text-cyan-900 uppercase tracking-wide">
                                <Sparkles size={15} className="text-cyan-600" />
                                <span>Hộp từ vựng lựa chọn (Word Bank)</span>
                              </div>
                              {part.extraWordNote && (
                                <span className="text-[11px] font-bold text-cyan-800 bg-white/80 px-2.5 py-1 rounded-full border border-cyan-200">
                                  {part.extraWordNote}
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {part.wordBank.map((word, wIdx) => (
                                <span
                                  key={wIdx}
                                  className="px-3.5 py-1.5 rounded-xl bg-white text-cyan-950 font-bold text-xs sm:text-sm border border-cyan-200/90 shadow-2xs select-all hover:bg-cyan-100/50 transition-colors"
                                >
                                  {word}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* =============================================================== */}
                        {/* COMPLETE READING PASSAGE CARD (PROMINENT & READABLE) */}
                        {/* =============================================================== */}
                        {part.passageText && (
                          <div className="mb-8 rounded-3xl bg-slate-50/90 border border-slate-200 p-6 sm:p-8 shadow-xs">
                            <div className="flex items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-200/80">
                              <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
                                <BookOpen size={16} className="text-primary" />
                                <span>Văn bản bài đọc</span>
                              </div>
                              <span className="text-xs font-bold text-slate-500">
                                Đọc kỹ văn bản để trả lời các câu hỏi phía dưới
                              </span>
                            </div>

                            <div className="space-y-4 text-gray-800 leading-relaxed text-[15px] sm:text-base font-normal">
                              {part.passageText.split('\n\n').map((para, pIdx) => (
                                <p key={pIdx} className="leading-relaxed">
                                  {para}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* QUESTIONS FOR THIS PART */}
                        <div className="space-y-6">
                          {partQuestions.map((question) => (
                            <QuestionCard
                              key={question.id}
                              question={question}
                              userAnswer={answers[question.id]}
                              onChangeAnswer={handleAnswerChange}
                              isSubmitted={isSubmitted}
                              evaluation={evaluationResults?.details?.[question.id]}
                              isExpandedExplanation={expandedExplanations[question.id]}
                              onToggleExplanation={() => toggleExplanation(question.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Fallback if passage does not have parts (e.g. Section 1 or standard single passage) */
                <div className="space-y-6">
                  {/* Single passage text if present */}
                  {passage.passageText && (
                    <div className="mb-8 rounded-3xl bg-slate-50/90 border border-slate-200 p-6 sm:p-8 shadow-xs">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider pb-3 mb-4 border-b border-slate-200">
                        <BookOpen size={16} className="text-primary" />
                        <span>Văn bản bài đọc</span>
                      </div>
                      <div className="space-y-4 text-gray-800 leading-relaxed text-[15px] sm:text-base">
                        {passage.passageText.split('\n\n').map((para, pIdx) => (
                          <p key={pIdx}>{para}</p>
                        ))}
                      </div>
                    </div>
                  )}

                  {(passage.questions || []).map((question) => (
                    <QuestionCard
                      key={question.id}
                      question={question}
                      userAnswer={answers[question.id]}
                      onChangeAnswer={handleAnswerChange}
                      isSubmitted={isSubmitted}
                      evaluation={evaluationResults?.details?.[question.id]}
                      isExpandedExplanation={expandedExplanations[question.id]}
                      onToggleExplanation={() => toggleExplanation(question.id)}
                    />
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* BOTTOM SUBMISSION CARD */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 text-center shadow-xs">
          <h3 className="text-lg sm:text-xl font-black text-gray-900 mb-2">
            {isSubmitted ? 'Bạn đã hoàn thành bài luyện tập' : 'Sẵn sàng nộp bài chấm điểm?'}
          </h3>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
            {isSubmitted
              ? `Điểm của bạn: ${evaluationResults?.correctCount} / ${evaluationResults?.totalCount} câu đúng (${evaluationResults?.scoreOutOf10}/10 điểm).`
              : `Bạn đã làm được ${answeredCount} / ${totalQuestionsCount} câu. Kiểm tra kỹ trước khi bấm nộp bài.`}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {isSubmitted ? (
              <>
                <button
                  onClick={() => setShowResultsModal(true)}
                  className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary-container shadow-md shadow-primary/20 flex items-center gap-2"
                >
                  <Trophy size={18} />
                  <span>Xem chi tiết bảng điểm</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  <span>Làm lại từ đầu</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="px-5 py-3 rounded-2xl border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Save size={16} />
                  <span>Lưu bản nháp</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-7 py-3 rounded-2xl bg-primary text-white font-bold text-sm hover:bg-primary-container shadow-lg shadow-primary/25 flex items-center gap-2"
                >
                  <Send size={16} />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              </>
            )}

            {practice.vocabId && (
              <Link
                to={`/vocab/${practice.vocabId}`}
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 flex items-center gap-2"
              >
                <BookOpen size={16} />
                <span>Học từ vựng bài tập</span>
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FLOATING QUESTION PALETTE BUTTON & DRAWER */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setShowPalette(true)}
          className="px-4 py-3 rounded-full bg-gray-900/90 hover:bg-black text-white text-xs sm:text-sm font-bold shadow-2xl backdrop-blur-md flex items-center gap-2.5 transition-all hover:scale-105"
        >
          <List size={18} className="text-amber-400" />
          <span>Bảng {totalQuestionsCount} câu ({answeredCount}/{totalQuestionsCount})</span>
        </button>
      </div>

      {/* Question Palette Modal */}
      {showPalette && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-gray-900">Bảng câu hỏi ({totalQuestionsCount} câu)</h3>
                <p className="text-xs text-gray-500">
                  Bấm vào số câu để cuộn nhanh tới câu hỏi tương ứng
                </p>
              </div>
              <button
                onClick={() => setShowPalette(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2 text-xs font-bold">
              <button
                onClick={() => setPaletteFilter('all')}
                className={`px-3 py-1.5 rounded-xl ${paletteFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}
              >
                Tất cả ({totalQuestionsCount})
              </button>
              <button
                onClick={() => setPaletteFilter('unanswered')}
                className={`px-3 py-1.5 rounded-xl ${paletteFilter === 'unanswered' ? 'bg-amber-600 text-white' : 'bg-amber-50 text-amber-800'}`}
              >
                Chưa làm ({totalQuestionsCount - answeredCount})
              </button>
              <button
                onClick={() => setPaletteFilter('answered')}
                className={`px-3 py-1.5 rounded-xl ${paletteFilter === 'answered' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800'}`}
              >
                Đã làm ({answeredCount})
              </button>
              {isSubmitted && (
                <>
                  <button
                    onClick={() => setPaletteFilter('correct')}
                    className={`px-3 py-1.5 rounded-xl ${paletteFilter === 'correct' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}
                  >
                    Đúng ({evaluationResults?.correctCount})
                  </button>
                  <button
                    onClick={() => setPaletteFilter('wrong')}
                    className={`px-3 py-1.5 rounded-xl ${paletteFilter === 'wrong' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-800'}`}
                  >
                    Sai ({totalQuestionsCount - (evaluationResults?.correctCount || 0)})
                  </button>
                </>
              )}
            </div>

            {/* Questions Grid */}
            <div className="p-6 overflow-y-auto space-y-6">
              {passages.map((p, idx) => {
                const sectionQs = (p.questions || []).filter(q => {
                  const hasAns = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id].toString().trim() !== '';
                  const evalRes = evaluationResults?.details?.[q.id];
                  if (paletteFilter === 'unanswered') return !hasAns;
                  if (paletteFilter === 'answered') return hasAns;
                  if (paletteFilter === 'correct') return isSubmitted && evalRes?.isCorrect;
                  if (paletteFilter === 'wrong') return isSubmitted && !evalRes?.isCorrect;
                  return true;
                });

                if (sectionQs.length === 0) return null;

                return (
                  <div key={p.id}>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                      {p.shortTitle || `Section ${idx + 1}: ${p.title}`}
                    </h4>
                    <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-2">
                      {sectionQs.map(q => {
                        const hasAns = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id].toString().trim() !== '';
                        const evalRes = evaluationResults?.details?.[q.id];

                        let btnClass = 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200';
                        if (isSubmitted) {
                          if (evalRes?.isCorrect) {
                            btnClass = 'bg-emerald-500 text-white font-bold border-emerald-600';
                          } else {
                            btnClass = 'bg-rose-500 text-white font-bold border-rose-600';
                          }
                        } else if (hasAns) {
                          btnClass = 'bg-primary text-white font-bold border-primary';
                        }

                        return (
                          <button
                            key={q.id}
                            onClick={() => scrollToQuestion(q.id)}
                            className={`h-9 rounded-xl border text-xs flex items-center justify-center transition-all ${btnClass}`}
                            title={`Câu ${q.number}`}
                          >
                            {q.number}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RESULTS MODAL (CELEBRATION & SCORE BREAKDOWN) */}
      {/* ========================================================================= */}
      {showResultsModal && evaluationResults && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden">
            <button
              onClick={() => setShowResultsModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-xs">
              <Trophy size={40} />
            </div>

            <h3 className="text-2xl font-black text-gray-900 mb-1">
              Kết quả bài luyện tập
            </h3>
            <p className="text-xs text-gray-500 mb-6">{practice.title}</p>

            {/* Score Ring / Box */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-6 mb-6">
              <div className="text-5xl font-black text-primary mb-1">
                {evaluationResults.scoreOutOf10}
                <span className="text-xl font-bold text-gray-500"> / 10</span>
              </div>
              <div className="text-sm font-bold text-gray-700">
                Đúng {evaluationResults.correctCount} / {evaluationResults.totalCount} câu ({evaluationResults.percentage}%)
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-100/70 py-1 px-3 rounded-full inline-block">
                {evaluationResults.percentage >= 80 ? 'Xuất sắc! Nắm rất chắc kiến thức.' : evaluationResults.percentage >= 65 ? 'Khá tốt! Hãy ôn lại các câu chưa đúng.' : 'Cần cố gắng ôn tập thêm các bài đọc.'}
              </div>
            </div>

            {/* Section Breakdown Mini */}
            <div className="text-left mb-6 space-y-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Chi tiết từng chuyên đề:
              </h4>
              {passages.map((p) => {
                const pQuestions = p.questions || [];
                if (pQuestions.length === 0) return null;
                const correctInP = pQuestions.filter(q => evaluationResults.details[q.id]?.isCorrect).length;
                const pct = Math.round((correctInP / pQuestions.length) * 100);

                return (
                  <div key={p.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-100">
                    <span className="font-semibold text-gray-700 truncate max-w-[220px]">
                      {p.shortTitle || p.title}
                    </span>
                    <span className="font-bold text-gray-900">
                      {correctInP}/{pQuestions.length} ({pct}%)
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="space-y-2.5">
              <button
                onClick={() => setShowResultsModal(false)}
                className="w-full py-3 rounded-2xl bg-primary hover:bg-primary-container text-white font-bold text-sm shadow-md shadow-primary/20 transition-all"
              >
                Xem lại đáp án & giải thích chi tiết
              </button>

              {practice.vocabId && (
                <Link
                  to={`/vocab/${practice.vocabId}`}
                  className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
                >
                  <BookOpen size={16} />
                  <span>Học 30 từ vựng Đề cương này</span>
                </Link>
              )}

              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-2xl text-xs font-bold text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Làm lại từ đầu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Student Required Modal */}
      <StudentRequiredModal
        isOpen={showStudentModal}
        allowClose={mode === 'practice'}
        defaultLevel={practice?.level || practice?.title || ''}
        onClose={() => {
          if (student.name && student.className) {
            setShowStudentModal(false);
          }
        }}
        onConfirm={(updated) => {
          setStudent(updated);
          setShowStudentModal(false);
        }}
      />
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: QUESTION CARD RENDERER
// =============================================================================
function QuestionCard({
  question,
  userAnswer,
  onChangeAnswer,
  isSubmitted,
  evaluation,
  isExpandedExplanation,
  onToggleExplanation
}) {
  const isCorrect = isSubmitted && evaluation?.isCorrect;
  const isWrong = isSubmitted && !evaluation?.isCorrect;

  // Options check
  const hasOptions = Array.isArray(question.options) && question.options.length > 0;
  const isParagraphWriting = question.id && question.id.startsWith('sec5_q14');

  return (
    <div
      id={`question-card-${question.id}`}
      className={`rounded-2xl p-5 sm:p-6 border transition-all ${
        isSubmitted
          ? isCorrect
            ? 'bg-emerald-50/20 border-emerald-300'
            : 'bg-rose-50/20 border-rose-300'
          : 'bg-white border-gray-200/90 hover:border-gray-300 shadow-2xs'
      }`}
    >
      {/* Question Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
            isSubmitted
              ? isCorrect
                ? 'bg-emerald-500 text-white'
                : 'bg-rose-500 text-white'
              : 'bg-primary/10 text-primary'
          }`}>
            {question.number}
          </span>
          <span className="text-xs font-bold text-gray-500">
            Câu {question.number}
          </span>
        </div>

        {/* Status icon when submitted */}
        {isSubmitted && (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full">
                <CheckCircle2 size={14} />
                <span>Chính xác</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-full">
                <XCircle size={14} />
                <span>Chưa đúng</span>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className="text-gray-900 font-semibold text-sm sm:text-base mb-4 leading-relaxed">
        {question.question}
      </div>

      {/* ========================================================================= */}
      {/* INPUT CONTROLS: OPTIONS OR TEXT INPUT */}
      {/* ========================================================================= */}
      {hasOptions ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
          {question.options.map((opt) => {
            const letter = (opt.letter || '').toUpperCase();
            const isSelected = (userAnswer || '').toString().toUpperCase() === letter;
            const isThisOptionCorrect = (question.primaryAnswer || '').toUpperCase() === letter;

            let btnStyle = 'bg-gray-50/70 border-gray-200 text-gray-800 hover:bg-gray-100';
            if (isSubmitted) {
              if (isThisOptionCorrect) {
                btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/30';
              } else if (isSelected && !isThisOptionCorrect) {
                btnStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold line-through';
              } else {
                btnStyle = 'bg-gray-50/50 border-gray-200 text-gray-400 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-primary/10 border-primary text-primary font-bold shadow-xs';
            }

            return (
              <button
                key={opt.letter}
                type="button"
                disabled={isSubmitted}
                onClick={() => onChangeAnswer(question.id, letter)}
                className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all ${btnStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${
                  isSelected ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-gray-700'
                }`}>
                  {letter}
                </span>
                <span className="leading-snug pt-0.5">{opt.text}</span>
              </button>
            );
          })}
        </div>
      ) : isParagraphWriting ? (
        /* Paragraph Writing (Q146-148) with live word counter */
        <div className="space-y-2 mb-3">
          <textarea
            disabled={isSubmitted}
            value={userAnswer || ''}
            onChange={(e) => onChangeAnswer(question.id, e.target.value)}
            placeholder={question.placeholder || 'Viết đoạn văn ngắn 60 - 80 từ vào đây...'}
            rows={5}
            className={`w-full p-4 rounded-2xl border text-sm focus:outline-none transition-all leading-relaxed ${
              isSubmitted
                ? isCorrect
                  ? 'border-emerald-400 bg-white'
                  : 'border-rose-400 bg-white'
                : 'border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white'
            }`}
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Yêu cầu: khoảng 60 - 80 từ</span>
            <span className={`font-bold ${countWords(userAnswer) >= 60 && countWords(userAnswer) <= 90 ? 'text-emerald-600' : 'text-gray-600'}`}>
              Số từ: {countWords(userAnswer)} từ
            </span>
          </div>
        </div>
      ) : (
        /* Standard Short-answer / Gap-filling / Sentence rewrite */
        <div className="mb-3 space-y-2">
          <input
            type="text"
            disabled={isSubmitted}
            value={userAnswer || ''}
            onChange={(e) => onChangeAnswer(question.id, e.target.value)}
            placeholder={question.placeholder || 'Nhập câu trả lời của bạn...'}
            className={`w-full px-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none transition-all ${
              isSubmitted
                ? isCorrect
                  ? 'border-emerald-400 bg-emerald-50/50 text-emerald-900 font-bold'
                  : 'border-rose-400 bg-rose-50/50 text-rose-900 font-bold'
                : 'border-gray-200 focus:border-primary focus:ring-3 focus:ring-primary/10 bg-white text-gray-900'
            }`}
          />

          {isSubmitted && isWrong && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
              <Check className="text-emerald-600 shrink-0 mt-0.5" size={15} />
              <div>
                <span className="font-bold">Đáp án chuẩn: </span>
                <span className="font-mono font-semibold">{question.primaryAnswer}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* EVIDENCE & EXPLANATION (EXPANDABLE / REVEALED ON SUBMIT) */}
      {/* ========================================================================= */}
      {isSubmitted && (question.evidence || question.explanation) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={onToggleExplanation}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors mb-2"
          >
            <HelpCircle size={14} />
            <span>{isExpandedExplanation ? 'Thu gọn giải thích' : 'Xem dẫn chứng & giải thích chi tiết'}</span>
            {isExpandedExplanation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isExpandedExplanation && (
            <div className="space-y-2 p-3.5 rounded-xl bg-gray-50 border border-gray-200/80 text-xs leading-relaxed">
              {question.evidence && (
                <div className="text-gray-800">
                  <span className="font-bold text-primary">💡 Dẫn chứng: </span>
                  <span className="italic">{question.evidence}</span>
                </div>
              )}
              {question.explanation && (
                <div className="text-gray-700 whitespace-pre-wrap">
                  <span className="font-bold text-gray-900">📝 Giải thích: </span>
                  <span>{question.explanation}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
