import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Save, 
  Send, 
  BookOpen, 
  Headphones, 
  Sparkles, 
  Edit3, 
  Trash2, 
  X, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Trophy, 
  Menu,
  Check
} from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import { EXAM_COLLECTIONS } from '../data/examData';
import { playCorrectSound, triggerCelebration } from '../utils/speechUtils';

// =============================================================================
// ACCESSIBILITY: THEMES & CONTRAST SCHEMES (CBT STANDARD)
// =============================================================================
const THEMES = {
  standard: {
    id: 'standard',
    name: 'Tiêu chuẩn',
    root: 'bg-[#f8fafc] text-gray-900',
    header: 'bg-white border-gray-200 text-gray-900',
    headerSub: 'text-gray-500',
    card: 'bg-white border-gray-200/90 text-gray-900 shadow-xs',
    cardHeader: 'bg-slate-50 border-gray-200 text-gray-900',
    cardSubtle: 'bg-gray-50 border-gray-200 text-gray-700',
    banner: 'bg-blue-50/80 border-blue-200/80 text-[#185bc3]',
    passageText: 'text-gray-800 font-serif',
    input: 'bg-white border-gray-300 text-gray-900 focus:border-[#2c4482] placeholder:text-gray-400',
    inputDisabled: 'bg-gray-100 border-gray-300 text-gray-600',
    radioChecked: 'bg-blue-50/80 border-[#2c4482] text-[#2c4482] font-bold shadow-2xs',
    radioUnchecked: 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50',
    partTabActive: 'bg-[#2c4482] text-white shadow-xs',
    partTabInactive: 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/80',
    qPillActive: 'bg-[#185bc3] text-white font-bold shadow-xs',
    qPillInactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    badge: 'bg-[#e8f1ff] text-[#185bc3]',
    btnPrimary: 'bg-[#2c4482] hover:bg-[#20325c] text-white shadow-sm',
    btnSecondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200',
    menuPopup: 'bg-white border-gray-200 text-gray-800 shadow-xl',
    divider: 'border-gray-200',
    subText: 'text-gray-500',
    footer: 'bg-white border-gray-200 text-gray-900 shadow-2xl',
    footerLine: 'bg-slate-300',
    footerActiveBox: 'border-2 border-[#2c4482] text-[#2c4482] bg-blue-50/40',
    footerInactiveText: 'text-slate-700 hover:text-[#2c4482]',
    footerSubText: 'text-slate-500',
    footerDashAns: 'bg-[#2c4482]',
    footerDashUnans: 'bg-slate-300',
    footerNavBtn: 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300',
    footerSubmitBtn: 'bg-[#2c4482] hover:bg-[#20325c] text-white'
  },
  'white-black': {
    id: 'white-black',
    name: 'Nền đen',
    root: 'bg-[#121212] text-gray-100',
    header: 'bg-[#1a1a1a] border-gray-800 text-white',
    headerSub: 'text-gray-400',
    card: 'bg-[#1e1e1e] border-gray-800 text-gray-100 shadow-md',
    cardHeader: 'bg-[#262626] border-gray-800 text-gray-100',
    cardSubtle: 'bg-[#252525] border-gray-700 text-gray-300',
    banner: 'bg-[#1e293b] border-blue-900 text-blue-300',
    passageText: 'text-gray-200 font-serif',
    input: 'bg-[#2a2a2a] border-gray-700 text-white focus:border-blue-500 placeholder:text-gray-500',
    inputDisabled: 'bg-[#181818] border-gray-800 text-gray-500',
    radioChecked: 'bg-[#1e3a5f] border-blue-500 text-blue-200 font-bold shadow-2xs',
    radioUnchecked: 'bg-[#252525] border-gray-700 text-gray-200 hover:bg-[#2e2e2e]',
    partTabActive: 'bg-blue-600 text-white shadow-xs',
    partTabInactive: 'bg-[#252525] text-gray-300 hover:bg-[#2e2e2e] border border-gray-700',
    qPillActive: 'bg-blue-500 text-white font-bold shadow-xs',
    qPillInactive: 'bg-[#2a2a2a] text-gray-300 hover:bg-[#333333]',
    badge: 'bg-blue-950 text-blue-300 border border-blue-800',
    btnPrimary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    btnSecondary: 'bg-[#2a2a2a] hover:bg-[#333333] text-gray-200 border border-gray-700',
    menuPopup: 'bg-[#1e1e1e] border-gray-700 text-gray-100 shadow-2xl',
    divider: 'border-gray-800',
    subText: 'text-gray-400',
    footer: 'bg-[#1a1a1a] border-gray-800 text-white shadow-2xl',
    footerLine: 'bg-gray-700',
    footerActiveBox: 'border-2 border-blue-400 text-blue-400 bg-blue-950/40',
    footerInactiveText: 'text-gray-300 hover:text-white',
    footerSubText: 'text-gray-400',
    footerDashAns: 'bg-blue-400',
    footerDashUnans: 'bg-gray-700',
    footerNavBtn: 'bg-[#2a2a2a] hover:bg-[#333333] text-gray-200 border-gray-700',
    footerSubmitBtn: 'bg-blue-600 hover:bg-blue-700 text-white'
  },
  'yellow-black': {
    id: 'yellow-black',
    name: 'Vàng/Đen',
    root: 'bg-[#000000] text-[#ffe600]',
    header: 'bg-[#0a0a0a] border-[#ffe600]/40 text-[#ffe600]',
    headerSub: 'text-[#ffe600]/70',
    card: 'bg-[#0d0d0d] border-[#ffe600]/50 text-[#ffe600] shadow-md',
    cardHeader: 'bg-[#161616] border-[#ffe600]/40 text-[#ffe600]',
    cardSubtle: 'bg-[#141414] border-[#ffe600]/40 text-[#ffe600]',
    banner: 'bg-[#1a1800] border-[#ffe600] text-[#ffe600]',
    passageText: 'text-[#ffe600] font-serif',
    input: 'bg-[#141414] border-[#ffe600] text-[#ffe600] focus:border-[#fff066] focus:ring-1 focus:ring-[#ffe600] placeholder:text-[#ffe600]/40',
    inputDisabled: 'bg-[#080808] border-[#ffe600]/30 text-[#ffe600]/50',
    radioChecked: 'bg-[#ffe600] border-[#ffe600] text-black font-extrabold shadow-2xs',
    radioUnchecked: 'bg-[#0d0d0d] border-[#ffe600]/60 text-[#ffe600] hover:bg-[#1a1a00]',
    partTabActive: 'bg-[#ffe600] text-black font-extrabold shadow-xs',
    partTabInactive: 'bg-[#141414] text-[#ffe600] hover:bg-[#202000] border border-[#ffe600]/40',
    qPillActive: 'bg-[#ffe600] text-black font-extrabold shadow-xs',
    qPillInactive: 'bg-[#141414] text-[#ffe600] hover:bg-[#202000] border border-[#ffe600]/40',
    badge: 'bg-[#ffe600]/20 text-[#ffe600] border border-[#ffe600]/40',
    btnPrimary: 'bg-[#ffe600] hover:bg-[#fff066] text-black font-extrabold shadow-sm',
    btnSecondary: 'bg-[#161616] hover:bg-[#222200] text-[#ffe600] border border-[#ffe600]/50',
    menuPopup: 'bg-[#0d0d0d] border-[#ffe600] text-[#ffe600] shadow-2xl',
    divider: 'border-[#ffe600]/30',
    subText: 'text-[#ffe600]/70',
    footer: 'bg-[#0a0a0a] border-[#ffe600]/40 text-[#ffe600] shadow-2xl',
    footerLine: 'bg-[#ffe600]/40',
    footerActiveBox: 'border-2 border-[#ffe600] text-[#ffe600] bg-[#1a1800]',
    footerInactiveText: 'text-[#ffe600]/70 hover:text-[#ffe600]',
    footerSubText: 'text-[#ffe600]/60',
    footerDashAns: 'bg-[#ffe600]',
    footerDashUnans: 'bg-[#ffe600]/30',
    footerNavBtn: 'bg-[#161616] hover:bg-[#222200] text-[#ffe600] border-[#ffe600]/50',
    footerSubmitBtn: 'bg-[#ffe600] hover:bg-[#fff066] text-black font-extrabold'
  },
  'black-white': {
    id: 'black-white',
    name: 'Đen/Trắng',
    root: 'bg-white text-black',
    header: 'bg-white border-2 border-black text-black',
    headerSub: 'text-black',
    card: 'bg-white border-2 border-black text-black shadow-none',
    cardHeader: 'bg-gray-100 border-b-2 border-black text-black',
    cardSubtle: 'bg-gray-100 border-2 border-black text-black',
    banner: 'bg-gray-100 border-2 border-black text-black font-bold',
    passageText: 'text-black font-serif',
    input: 'bg-white border-2 border-black text-black focus:ring-2 focus:ring-black placeholder:text-gray-500',
    inputDisabled: 'bg-gray-100 border-2 border-black text-gray-600',
    radioChecked: 'bg-black border-2 border-black text-white font-bold',
    radioUnchecked: 'bg-white border-2 border-black text-black hover:bg-gray-100',
    partTabActive: 'bg-black text-white font-bold border-2 border-black',
    partTabInactive: 'bg-white text-black border-2 border-black hover:bg-gray-100',
    qPillActive: 'bg-black text-white font-bold border-2 border-black',
    qPillInactive: 'bg-white text-black border-2 border-black hover:bg-gray-100',
    badge: 'bg-black text-white border border-black',
    btnPrimary: 'bg-black hover:bg-gray-900 text-white font-extrabold border-2 border-black',
    btnSecondary: 'bg-white hover:bg-gray-100 text-black border-2 border-black',
    menuPopup: 'bg-white border-2 border-black text-black shadow-2xl',
    divider: 'border-2 border-black',
    subText: 'text-black',
    footer: 'bg-white border-t-2 border-black text-black shadow-2xl',
    footerLine: 'bg-black',
    footerActiveBox: 'border-2 border-black text-black bg-gray-100 font-extrabold',
    footerInactiveText: 'text-black hover:underline',
    footerSubText: 'text-black',
    footerDashAns: 'bg-black',
    footerDashUnans: 'bg-gray-300',
    footerNavBtn: 'bg-white hover:bg-gray-100 text-black border-2 border-black',
    footerSubmitBtn: 'bg-black hover:bg-gray-900 text-white border-2 border-black font-bold'
  }
};

// =============================================================================
// TEXT SIZES CONFIGURATION
// =============================================================================
const FONT_CLASSES = {
  standard: {
    container: 'text-sm sm:text-base',
    passage: 'text-sm sm:text-base leading-relaxed',
    title: 'text-xl sm:text-2xl font-black',
    question: 'text-sm font-bold',
    body: 'text-xs sm:text-sm',
    badge: 'text-xs',
    instruction: 'text-xs sm:text-sm',
    input: 'text-xs sm:text-sm py-1.5 px-3'
  },
  large: {
    container: 'text-base sm:text-lg',
    passage: 'text-base sm:text-lg leading-loose',
    title: 'text-2xl sm:text-3xl font-black',
    question: 'text-base font-bold',
    body: 'text-sm sm:text-base',
    badge: 'text-sm',
    instruction: 'text-sm sm:text-base',
    input: 'text-sm sm:text-base py-2 px-4'
  },
  'extra-large': {
    container: 'text-lg sm:text-xl',
    passage: 'text-lg sm:text-xl leading-loose',
    title: 'text-3xl sm:text-4xl font-black',
    question: 'text-lg font-black',
    body: 'text-base sm:text-lg',
    badge: 'text-base',
    instruction: 'text-base sm:text-lg',
    input: 'text-base sm:text-lg py-2.5 px-4'
  }
};

// =============================================================================
// OFFICIAL IELTS BAND SCORE CONVERTER (ACCURATE MAPPING)
// =============================================================================
export function calculateIELTSBand(correctCount, totalQuestions, skill = 'Listening') {
  if (!totalQuestions || totalQuestions <= 0 || !correctCount || correctCount <= 0) {
    return '0.0';
  }

  // Scale proportionally to standard 40 questions when student practices a subset of parts
  const scaledScore = totalQuestions === 40 
    ? correctCount 
    : Math.round((correctCount / totalQuestions) * 40);

  if (scaledScore <= 0) return '0.0';
  if (scaledScore === 1) return '1.0';
  if (scaledScore <= 3) return '2.0';
  if (scaledScore <= 5) return '2.5';
  if (scaledScore <= 7) return '3.0';
  if (scaledScore <= 9) return '3.5';

  if (skill === 'Reading') {
    if (scaledScore >= 39) return '9.0';
    if (scaledScore >= 37) return '8.5';
    if (scaledScore >= 35) return '8.0';
    if (scaledScore >= 33) return '7.5';
    if (scaledScore >= 30) return '7.0';
    if (scaledScore >= 27) return '6.5';
    if (scaledScore >= 23) return '6.0';
    if (scaledScore >= 19) return '5.5';
    if (scaledScore >= 15) return '5.0';
    if (scaledScore >= 13) return '4.5';
    if (scaledScore >= 10) return '4.0';
    return '3.5';
  } else {
    // Listening
    if (scaledScore >= 39) return '9.0';
    if (scaledScore >= 37) return '8.5';
    if (scaledScore >= 35) return '8.0';
    if (scaledScore >= 32) return '7.5';
    if (scaledScore >= 30) return '7.0';
    if (scaledScore >= 26) return '6.5';
    if (scaledScore >= 23) return '6.0';
    if (scaledScore >= 18) return '5.5';
    if (scaledScore >= 16) return '5.0';
    if (scaledScore >= 13) return '4.5';
    if (scaledScore >= 10) return '4.0';
    return '3.5';
  }
}

// Clean and normalize text for IELTS answer comparison
function normalizeAnswer(text) {
  if (!text) return '';
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[‘'’"`]/g, '')
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
    .replace(/\b(a|an|the)\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Check short answer accuracy
function checkAccuracy(userAnswer, primaryAnswer, acceptableList = []) {
  const userClean = normalizeAnswer(userAnswer);
  if (!userClean) return false;

  const targetList = [primaryAnswer, ...acceptableList].filter(Boolean);
  return targetList.some(target => {
    const targetClean = normalizeAnswer(target);
    if (userClean === targetClean) return true;
    const norm = (s) => s.replace(/\s+(and|to|or)\s+/g, ' ').replace(/\s+/g, ' ');
    return norm(userClean) === norm(targetClean);
  });
}

// Word counter
function countWords(str) {
  if (!str || !str.trim()) return 0;
  return str.trim().split(/\s+/).length;
}

export default function TestRoom() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load exam
  const exam = useMemo(() => {
    return EXAM_COLLECTIONS.find(e => e.id === id) || EXAM_COLLECTIONS[0];
  }, [id]);

  const isListening = exam.skill === 'Listening';
  const isReading = exam.skill === 'Reading';

  // URL Params: mode, parts, time
  const mode = searchParams.get('mode') || 'practice';
  const partsParam = searchParams.get('parts');
  const customTimeParam = searchParams.get('time');

  // Accessibility State: Contrast & Text Size (persisted in localStorage)
  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem('ielts_test_contrast') || 'standard';
  });
  const [textSize, setTextSize] = useState(() => {
    return localStorage.getItem('ielts_test_textsize') || 'standard';
  });
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);

  // Active theme & font size styles
  const currentTheme = THEMES[contrast] || THEMES.standard;
  const currentFont = FONT_CLASSES[textSize] || FONT_CLASSES.standard;

  const handleContrastChange = (cId) => {
    setContrast(cId);
    try { localStorage.setItem('ielts_test_contrast', cId); } catch (e) {}
  };

  const handleTextSizeChange = (sId) => {
    setTextSize(sId);
    try { localStorage.setItem('ielts_test_textsize', sId); } catch (e) {}
  };

  // Filter allowed parts
  const selectedPartIds = useMemo(() => {
    if (partsParam) {
      return partsParam.split(',').map(Number).filter(n => !isNaN(n));
    }
    return exam.parts ? exam.parts.map(p => p.id) : [1];
  }, [partsParam, exam.parts]);

  const activeParts = useMemo(() => {
    if (!exam.parts || exam.parts.length === 0) return [];
    const filtered = exam.parts.filter(p => selectedPartIds.includes(p.id));
    return filtered.length > 0 ? filtered : exam.parts;
  }, [exam.parts, selectedPartIds]);

  // Active Part Index (0-based inside activeParts)
  const [activePartIdx, setActivePartIdx] = useState(0);
  const currentPart = activeParts[activePartIdx] || activeParts[0];

  // Active question ID
  const [activeQuestionId, setActiveQuestionId] = useState(1);

  // All questions flattened from active parts
  const allQuestions = useMemo(() => {
    return activeParts.flatMap(p => (p.questions || []).map(q => ({
      ...q,
      partId: p.id,
      partTitle: p.title,
      partName: p.name,
      instruction: q.instruction || p.instruction,
      wordLimit: q.wordLimit || p.wordLimit || 'ONE WORD ONLY',
      maxWords: q.maxWords || p.maxWords || 1
    })));
  }, [activeParts]);

  const totalQuestions = allQuestions.length;

  // Set initial active question
  useEffect(() => {
    if (allQuestions.length > 0 && !activeQuestionId) {
      setActiveQuestionId(allQuestions[0].id);
    }
  }, [allQuestions, activeQuestionId]);

  // Answers State: { [qId]: string }
  const draftStorageKey = `dream_test_${exam.id}_${selectedPartIds.join('-')}_draft`;
  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(draftStorageKey);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Time & Timer state
  const hasTimeLimit = Boolean(customTimeParam && !isNaN(parseInt(customTimeParam, 10)) && parseInt(customTimeParam, 10) > 0);
  const initialDuration = hasTimeLimit ? parseInt(customTimeParam, 10) * 60 : null;
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // Submission & Results
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'wrong_only'

  // Transcripts toggles for Listening parts
  const [expandedTranscripts, setExpandedTranscripts] = useState({});
  const [transcriptViewMode, setTranscriptViewMode] = useState({}); // { [partId]: 'part' | 'full' }

  // Reading Passage Display & Annotation State
  const [selectionPopup, setSelectionPopup] = useState(null);
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_test_${exam.id}_notes`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [draftNoteContent, setDraftNoteContent] = useState('');
  const [activeNoteTarget, setActiveNoteTarget] = useState(null);

  const passageContainerRef = useRef(null);

  // Close settings popup when clicking outside
  const settingsRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettingsMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Answer change handler - STRICTLY LOCKED IF TIME UP OR SUBMITTED
  const handleAnswerChange = (qId, val) => {
    if (isTimeUp || isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  // Save draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(draftStorageKey, JSON.stringify(userAnswers));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Evaluation results calculation with ACCURATE IELTS BAND SCORE
  const evaluation = useMemo(() => {
    let correctCount = 0;
    const results = {};

    allQuestions.forEach(q => {
      const userVal = userAnswers[q.id] || '';
      let isCorrect = false;

      if (q.type === 'choice') {
        const cleanUser = (userVal || '').trim().toUpperCase();
        const cleanAnswer = (q.answer || q.primaryAnswer || '').trim().toUpperCase();
        isCorrect = cleanUser === cleanAnswer || cleanUser.startsWith(cleanAnswer);
      } else {
        isCorrect = checkAccuracy(userVal, q.answer || q.primaryAnswer, q.acceptable || []);
      }

      if (isCorrect) correctCount++;
      results[q.id] = {
        isCorrect,
        userAnswer: userVal,
        correctAnswer: q.primaryAnswer || q.answer,
        explanation: q.explanation || '',
        evidence: q.evidence || ''
      };
    });

    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
    const band = calculateIELTSBand(correctCount, totalQuestions, exam.skill);

    return {
      correctCount,
      total: totalQuestions,
      percentage,
      band,
      results
    };
  }, [allQuestions, userAnswers, totalQuestions, exam.skill]);

  // Handle final submit
  const handleSubmitTest = useCallback((isAutoTimeout = false) => {
    setIsTimerRunning(false);
    setIsSubmitted(true);
    setShowSubmitModal(false);
    setShowResultsModal(true);

    if (isAutoTimeout) {
      setIsTimeUp(true);
    }

    try {
      if (evaluation.percentage >= 60) {
        playCorrectSound();
        triggerCelebration();
      }
    } catch (e) {}

    // Save to test history
    try {
      const history = JSON.parse(localStorage.getItem('dream_exam_history') || '{}');
      history[`${exam.id}_${Date.now()}`] = {
        examId: exam.id,
        examTitle: exam.title,
        parts: selectedPartIds,
        score: evaluation.correctCount,
        total: totalQuestions,
        band: evaluation.band,
        completedAt: new Date().toISOString(),
        timedOut: isAutoTimeout
      };
      localStorage.setItem('dream_exam_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  }, [exam.id, exam.title, selectedPartIds, evaluation, totalQuestions]);

  // Timer countdown hook
  useEffect(() => {
    if (!hasTimeLimit || !isTimerRunning || isSubmitted || isTimeUp) return;

    if (timeLeft <= 0) {
      setIsTimeUp(true);
      handleSubmitTest(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimeUp(true);
          handleSubmitTest(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasTimeLimit, isTimerRunning, isSubmitted, isTimeUp, timeLeft, handleSubmitTest]);

  // Format time MM:SS
  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined || isNaN(seconds)) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Retake test
  const handleRetake = () => {
    setIsSubmitted(false);
    setIsTimeUp(false);
    setShowResultsModal(false);
    setUserAnswers({});
    if (hasTimeLimit) {
      setTimeLeft(initialDuration);
      setIsTimerRunning(true);
    }
    try {
      localStorage.removeItem(draftStorageKey);
    } catch (e) {}
  };

  // Answered count
  const answeredCount = Object.keys(userAnswers).filter(k => (userAnswers[k] || '').toString().trim() !== '').length;

  // Scroll to a specific question (switches part if in another part)
  const scrollToQuestion = (qId) => {
    setActiveQuestionId(qId);
    
    // Check if target question belongs to another part
    const targetPartIdx = activeParts.findIndex(p => 
      (p.questions || []).some(q => q.id === qId)
    );
    const needSwitch = targetPartIdx !== -1 && targetPartIdx !== activePartIdx;
    if (needSwitch) {
      setActivePartIdx(targetPartIdx);
    }

    // Smooth scroll to question card
    setTimeout(() => {
      const el = document.getElementById(`q-${qId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Pulse ring highlight effect
        el.classList.add('ring-4', 'ring-blue-400');
        setTimeout(() => el.classList.remove('ring-4', 'ring-blue-400'), 1200);
        
        // Focus input if available
        const input = el.querySelector('input:not([type="radio"])') || el.querySelector('input');
        if (input && !input.disabled) {
          input.focus();
        }
      }
    }, needSwitch ? 120 : 50);
  };

  // Question navigation previous / next
  const currentQuestionIndex = allQuestions.findIndex(q => q.id === (activeQuestionId || allQuestions[0]?.id));
  const isFirstQuestion = currentQuestionIndex <= 0;
  const isLastQuestion = currentQuestionIndex >= allQuestions.length - 1;

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      const prevQ = allQuestions[currentQuestionIndex - 1];
      scrollToQuestion(prevQ.id);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      const nextQ = allQuestions[currentQuestionIndex + 1];
      scrollToQuestion(nextQ.id);
    }
  };

  // Text Selection for Reading Highlighter & Notes
  const handlePassageMouseUp = () => {
    if (!isReading) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      setSelectionPopup(null);
      return;
    }

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelectionPopup({
      text: sel.toString().trim(),
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      range: range.cloneRange()
    });
  };

  const applyHighlight = (colorClass) => {
    if (!selectionPopup || !selectionPopup.range) return;
    try {
      const span = document.createElement('mark');
      span.className = `${colorClass} px-0.5 rounded transition-colors cursor-pointer select-none`;
      span.textContent = selectionPopup.text;
      selectionPopup.range.deleteContents();
      selectionPopup.range.insertNode(span);
      window.getSelection()?.removeAllRanges();
      setSelectionPopup(null);
    } catch (e) {
      console.error('Highlight failed:', e);
    }
  };

  const openNoteForSelection = () => {
    if (!selectionPopup) return;
    setActiveNoteTarget({
      id: `note-${Date.now()}`,
      passageId: currentPart.id,
      text: selectionPopup.text
    });
    setDraftNoteContent('');
    setShowNotesDrawer(true);
    setSelectionPopup(null);
  };

  const saveCurrentNote = () => {
    if (!activeNoteTarget || !draftNoteContent.trim()) return;
    const noteId = activeNoteTarget.id;
    const newNotes = {
      ...notes,
      [noteId]: {
        id: noteId,
        passageId: activeNoteTarget.passageId,
        text: activeNoteTarget.text,
        content: draftNoteContent.trim(),
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    };
    setNotes(newNotes);
    try {
      localStorage.setItem(`dream_test_${exam.id}_notes`, JSON.stringify(newNotes));
    } catch (e) {}
    setActiveNoteTarget(null);
    setDraftNoteContent('');
  };

  const deleteNote = (noteId) => {
    const next = { ...notes };
    delete next[noteId];
    setNotes(next);
    try {
      localStorage.setItem(`dream_test_${exam.id}_notes`, JSON.stringify(next));
    } catch (e) {}
  };

  // Displayed questions filter
  const displayedQuestions = useMemo(() => {
    const currentPartQuestions = currentPart?.questions || [];
    if (filterMode === 'wrong_only' && isSubmitted) {
      return currentPartQuestions.filter(q => !evaluation.results[q.id]?.isCorrect);
    }
    return currentPartQuestions;
  }, [currentPart, filterMode, isSubmitted, evaluation.results]);

  return (
    <div className={`min-h-screen pb-28 select-text font-sans transition-colors ${currentTheme.root} ${currentFont.container}`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP STICKY HEADER BAR (WITH ACCESSIBILITY MENU) */}
      {/* ========================================================================= */}
      <header className={`border-b sticky top-0 z-40 transition-colors shadow-xs ${currentTheme.header}`}>
        <div className="max-w-[1540px] mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Back & Test Identity */}
          <div className="flex items-center gap-3">
            <Link
              to={`/tests/${exam.id}`}
              className={`p-2 rounded-xl border transition-colors ${currentTheme.btnSecondary}`}
              title="Quay lại thông tin đề thi"
            >
              <ArrowLeft size={16} />
            </Link>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 ${currentTheme.badge}`}>
                  {isListening ? <Headphones size={11} /> : <BookOpen size={11} />}
                  <span>{isListening ? 'IELTS Listening' : 'IELTS Reading'}</span>
                </span>
                <span className={`text-xs font-semibold hidden sm:inline ${currentTheme.headerSub}`}>
                  {selectedPartIds.length === (exam.parts?.length || 4) 
                    ? 'Full Test' 
                    : `${selectedPartIds.length} phần đã chọn`}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold truncate max-w-xs sm:max-w-md lg:max-w-lg">
                {exam.title}
              </h1>
            </div>
          </div>

          {/* Center: Countdown Timer Display & Answered Counter */}
          <div className="flex items-center gap-3">
            <div className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 transition-all ${
              isTimeUp 
                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                : hasTimeLimit && timeLeft < 300 
                  ? 'bg-amber-50 border-amber-300 text-amber-700 font-bold'
                  : currentTheme.cardSubtle
            }`}>
              <Clock size={16} className={hasTimeLimit && timeLeft < 300 ? 'text-amber-600 animate-pulse' : 'opacity-70'} />
              <div className="text-xs sm:text-sm font-mono font-bold">
                {hasTimeLimit ? (
                  isTimeUp ? 'HẾT GIỜ (00:00)' : formatTime(timeLeft)
                ) : (
                  'Tự do'
                )}
              </div>
              {hasTimeLimit && !isTimeUp && (
                <span className="text-[10px] opacity-60 font-sans hidden sm:inline">còn lại</span>
              )}
            </div>

            {/* Answered Progress Counter */}
            <div className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border ${currentTheme.cardSubtle}`}>
              <span>Đã làm:</span>
              <strong className="font-bold">{answeredCount}</strong> / {totalQuestions} câu
            </div>
          </div>

          {/* Right: Accessibility Menu, Save Draft, Submit, Retake */}
          <div className="flex items-center gap-2">
            
            {/* ACCESSIBILITY SETTINGS DROPDOWN BUTTON (☰ ⌄) */}
            <div className="relative" ref={settingsRef}>
              <button
                type="button"
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className={`p-2 border rounded-xl flex items-center gap-1 transition-colors cursor-pointer ${currentTheme.btnSecondary}`}
                title="Cài đặt tương phản & Cỡ chữ (Accessibility)"
              >
                <Menu size={16} />
                <ChevronDown size={13} />
              </button>

              {/* POPUP: CONTRAST & TEXT SIZE */}
              {showSettingsMenu && (
                <div className={`absolute right-0 mt-2 w-64 rounded-2xl border p-4 z-50 text-xs space-y-3.5 text-left animate-in fade-in zoom-in-95 ${currentTheme.menuPopup}`}>
                  {/* Contrast options */}
                  <div>
                    <div className="font-bold mb-2 opacity-90">Tương phản (Contrast):</div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button 
                        type="button"
                        onClick={() => handleContrastChange('standard')}
                        className={`p-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                          contrast === 'standard' 
                            ? 'bg-[#2c4482] text-white ring-2 ring-blue-300' 
                            : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        Tiêu chuẩn
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleContrastChange('white-black')}
                        className={`p-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                          contrast === 'white-black' 
                            ? 'bg-black text-white ring-2 ring-blue-500 border-blue-400' 
                            : 'bg-[#181818] text-white border-gray-700 hover:bg-[#252525]'
                        }`}
                      >
                        Nền đen
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleContrastChange('yellow-black')}
                        className={`p-2 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                          contrast === 'yellow-black' 
                            ? 'bg-black text-[#ffe600] ring-2 ring-[#ffe600] border-[#ffe600]' 
                            : 'bg-black text-[#ffe600] border-[#ffe600]/60 hover:bg-[#1a1a00]'
                        }`}
                      >
                        Vàng/Đen
                      </button>
                      <button 
                        type="button"
                        onClick={() => handleContrastChange('black-white')}
                        className={`p-2 rounded-lg border-2 text-center font-bold text-xs transition-all cursor-pointer ${
                          contrast === 'black-white' 
                            ? 'bg-white text-black ring-2 ring-black border-black' 
                            : 'bg-white text-black border-black hover:bg-gray-100'
                        }`}
                      >
                        Đen/Trắng
                      </button>
                    </div>
                  </div>

                  {/* Text Size options */}
                  <div className={`pt-3 border-t ${currentTheme.divider}`}>
                    <div className="font-bold mb-2 opacity-90">Cỡ chữ (Text size):</div>
                    <div className="flex gap-1.5">
                      {[
                        { id: 'standard', label: 'Vừa' },
                        { id: 'large', label: 'Lớn' },
                        { id: 'extra-large', label: 'Rất lớn' }
                      ].map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => handleTextSizeChange(s.id)}
                          className={`flex-1 py-1.5 rounded-lg border text-center font-bold text-xs transition-all cursor-pointer ${
                            textSize === s.id
                              ? contrast === 'yellow-black' 
                                ? 'bg-[#ffe600] text-black font-extrabold border-[#ffe600]' 
                                : contrast === 'white-black' 
                                  ? 'bg-blue-600 text-white border-blue-500' 
                                  : 'bg-[#2c4482] text-white border-[#2c4482]'
                              : `${currentTheme.btnSecondary}`
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {!isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  disabled={isTimeUp}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${currentTheme.btnSecondary}`}
                >
                  <Save size={14} />
                  <span className="hidden sm:inline">Lưu nháp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  disabled={isTimeUp}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 ${currentTheme.btnPrimary}`}
                >
                  <Send size={14} />
                  <span>Nộp bài</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResultsModal(true)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${currentTheme.btnPrimary}`}
                >
                  <Trophy size={14} />
                  <span>Xem điểm</span>
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${currentTheme.btnSecondary}`}
                >
                  <RotateCcw size={14} />
                  <span>Làm lại</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Save Draft Toast */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={16} />
          <span>Đã lưu bài làm nháp thành công!</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TIME-UP LOCKOUT BANNER (STRICT DISABILITY WHEN EXPIRED) */}
      {/* ========================================================================= */}
      {isTimeUp && (
        <div className="bg-rose-600 text-white px-4 py-3 text-center text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2">
          <AlertTriangle size={18} className="shrink-0 animate-bounce" />
          <span>⏰ ĐÃ HẾT THỜI GIAN LÀM BÀI! Toàn bộ câu trả lời đã được khóa. Hệ thống đã tự động chấm điểm và nộp bài.</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. MAIN TEST BODY: READING (SPLIT-VIEW) VS LISTENING (AUDIO & CARDS) */}
      {/* ========================================================================= */}
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 pt-5">
        
        {/* ======================================================================= */}
        {/* CASE A: READING LAYOUT (2-COLUMN SPLIT WITH HIGHLIGHTER & NOTES) */}
        {/* ======================================================================= */}
        {isReading && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            
            {/* LEFT COLUMN: READING PASSAGE TEXT (7 COLS) */}
            <div className={`lg:col-span-7 rounded-3xl border overflow-hidden flex flex-col transition-colors ${currentTheme.card}`}>
              
              {/* Passage Toolbar */}
              <div className={`px-5 py-3 border-b flex items-center justify-between gap-3 flex-wrap transition-colors ${currentTheme.cardHeader}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md ${currentTheme.badge}`}>
                    {currentPart?.title}
                  </span>
                  <span className={`text-xs font-medium ${currentTheme.subText}`}>
                    Câu {currentPart?.questionRange}
                  </span>
                </div>

                {/* Notes Drawer Toggle */}
                <button
                  type="button"
                  onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                  className={`flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border font-semibold cursor-pointer transition-colors ${currentTheme.btnSecondary}`}
                >
                  <Edit3 size={13} className="text-current" />
                  <span>Ghi chú ({Object.keys(notes).length})</span>
                </button>
              </div>

              {/* Passage Content Container */}
              <div 
                ref={passageContainerRef}
                onMouseUp={handlePassageMouseUp}
                className="p-6 sm:p-8 max-h-[calc(100vh-230px)] overflow-y-auto leading-relaxed relative"
              >
                <div className={`border-b pb-4 mb-5 ${currentTheme.divider}`}>
                  <h2 className={`${currentFont.title} mb-1`}>
                    {currentPart?.name}
                  </h2>
                  <p className={`text-xs ${currentTheme.subText}`}>
                    Bôi đen văn bản để tô màu (Highlight) hoặc thêm ghi chú giải thích.
                  </p>
                </div>

                <div className={`whitespace-pre-line text-justify ${currentTheme.passageText} ${currentFont.passage}`}>
                  {currentPart?.readingText}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: QUESTIONS & INSTANT/POST SUBMIT FEEDBACK (5 COLS) */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Filter mode header if submitted */}
              {isSubmitted && (
                <div className={`rounded-2xl border p-3 flex items-center justify-between gap-2 text-xs font-bold ${currentTheme.card}`}>
                  <span>Bộ lọc câu hỏi:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setFilterMode('all')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${filterMode === 'all' ? currentTheme.btnPrimary : currentTheme.btnSecondary}`}
                    >
                      Tất cả ({currentPart?.questions?.length || 0})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilterMode('wrong_only')}
                      className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${filterMode === 'wrong_only' ? 'bg-rose-600 text-white' : currentTheme.btnSecondary}`}
                    >
                      Chỉ câu sai
                    </button>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                {displayedQuestions.map((q) => {
                  const evalResult = evaluation.results[q.id];
                  const wordCount = countWords(userAnswers[q.id] || '');
                  const isOverLimit = q.maxWords && wordCount > q.maxWords;
                  const isActive = activeQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      id={`q-${q.id}`}
                      className={`rounded-2xl border p-5 transition-all ${currentTheme.card} ${
                        isSubmitted
                          ? evalResult?.isCorrect
                            ? 'ring-2 ring-emerald-500/50'
                            : 'ring-2 ring-rose-500/50'
                          : isActive
                            ? 'ring-2 ring-blue-500 shadow-md'
                            : ''
                      }`}
                      onClick={() => setActiveQuestionId(q.id)}
                    >
                      {/* Section Title or Instruction */}
                      {q.sectionTitle && (
                        <div className={`text-[11px] font-extrabold uppercase tracking-wider mb-1 ${currentTheme.headerSub}`}>
                          {q.sectionTitle}
                        </div>
                      )}

                      {/* Header badge & word limit */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${currentTheme.cardSubtle}`}>
                          Câu {q.id}
                        </span>
                        {q.wordLimit && q.type !== 'choice' && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isOverLimit ? 'bg-rose-100 text-rose-700' : currentTheme.badge
                          }`}>
                            {q.wordLimit} ({wordCount}/{q.maxWords || 1} từ)
                          </span>
                        )}
                      </div>

                      {/* QUESTION TYPE: MULTIPLE CHOICE OR TRUE/FALSE */}
                      {q.type === 'choice' ? (
                        <div className="space-y-3">
                          <p className={`${currentFont.question} leading-snug`}>
                            {q.question}
                          </p>
                          <div className="space-y-1.5">
                            {q.options?.map((opt, oIdx) => {
                              const isChecked = userAnswers[q.id] === opt;
                              return (
                                <label
                                  key={oIdx}
                                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${currentFont.body} ${
                                    isTimeUp || isSubmitted 
                                      ? 'cursor-not-allowed opacity-80' 
                                      : 'cursor-pointer'
                                  } ${
                                    isChecked
                                      ? currentTheme.radioChecked
                                      : currentTheme.radioUnchecked
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    value={opt}
                                    checked={isChecked}
                                    disabled={isTimeUp || isSubmitted}
                                    onChange={() => handleAnswerChange(q.id, opt)}
                                    className="w-4 h-4 disabled:opacity-50"
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        /* QUESTION TYPE: FILL IN THE BLANKS / NOTES COMPLETION */
                        <div className="space-y-2">
                          <div className={`${currentFont.body} font-medium leading-relaxed`}>
                            {q.label && <span>{q.label} </span>}
                            <input
                              type="text"
                              value={userAnswers[q.id] || ''}
                              disabled={isTimeUp || isSubmitted}
                              placeholder={q.placeholder || `[Điền câu ${q.id}]`}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className={`inline-block rounded-lg border font-bold transition-all ${currentFont.input} ${
                                isTimeUp || isSubmitted
                                  ? `${currentTheme.inputDisabled} cursor-not-allowed`
                                  : currentTheme.input
                              } ${isOverLimit ? 'border-rose-400 bg-rose-50/50' : ''}`}
                            />
                            {q.suffix && <span> {q.suffix}</span>}
                          </div>
                        </div>
                      )}

                      {/* POST SUBMIT REVIEW: GREEN / RED + EXPLANATION + EVIDENCE */}
                      {isSubmitted && evalResult && (
                        <div className={`mt-3.5 pt-3 border-t ${currentTheme.divider} space-y-2 text-xs`}>
                          {evalResult.isCorrect ? (
                            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                              <CheckCircle2 size={16} />
                              <span>Chính xác! Đáp án: {evalResult.correctAnswer}</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                                <XCircle size={16} />
                                <span>Chưa chính xác!</span>
                              </div>
                              <div className={`border rounded-lg p-2 ${currentTheme.cardSubtle}`}>
                                <span>Đáp án đúng: </span>
                                <strong className="font-bold underline">{evalResult.correctAnswer}</strong>
                                {evalResult.userAnswer && (
                                  <span className="opacity-70 ml-2">(Bạn đã điền: {evalResult.userAnswer})</span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Vietnamese Explanation */}
                          {evalResult.explanation && (
                            <div className={`border rounded-lg p-2.5 leading-relaxed ${currentTheme.cardSubtle}`}>
                              <div className="font-bold flex items-center gap-1 mb-1 text-current">
                                <Sparkles size={12} />
                                <span>Giải thích chi tiết:</span>
                              </div>
                              <p>{evalResult.explanation}</p>
                            </div>
                          )}

                          {/* Quoted Evidence */}
                          {evalResult.evidence && (
                            <div className={`border-l-2 border-current p-2 italic ${currentTheme.cardSubtle}`}>
                              <span className="font-semibold not-italic block text-[10px] opacity-70">Trích dẫn bằng chứng từ bài đọc:</span>
                              &ldquo;{evalResult.evidence}&rdquo;
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>

          </div>
        )}

        {/* ======================================================================= */}
        {/* CASE B: LISTENING LAYOUT (MATCHES HOMEWORKDETAIL WITH AUDIOPLAYER) */}
        {/* ======================================================================= */}
        {isListening && (
          <div className="space-y-6 max-w-4xl mx-auto">
            
            {/* Listening Part Banner & Dedicated Audio Player */}
            <div className={`rounded-3xl border p-6 space-y-5 transition-colors ${currentTheme.card}`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 ${currentTheme.divider}`}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-md ${currentTheme.badge}`}>
                      {currentPart?.title}
                    </span>
                    <span className={`text-xs font-medium ${currentTheme.subText}`}>
                      Câu {currentPart?.questionRange} ({currentPart?.questions?.length || 10} câu hỏi)
                    </span>
                  </div>
                  <h2 className={`${currentFont.title}`}>
                    {currentPart?.name}
                  </h2>
                  {currentPart?.context && (
                    <p className={`text-xs mt-1 ${currentTheme.subText}`}>
                      {currentPart.context}
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold block ${currentTheme.subText}`}>Định dạng</span>
                  <span className="text-xs font-bold">Audio chuẩn IELTS 128kbps</span>
                </div>
              </div>

              {/* Native AudioPlayer with playback speed & scrub bar */}
              <div>
                <AudioPlayer
                  src={exam.audioTracks?.[currentPart?.id] || currentPart?.audioUrl}
                  title={`${currentPart?.title}: ${currentPart?.name}`}
                />
              </div>

              {/* Instruction banner */}
              <div className={`p-3.5 border rounded-xl leading-relaxed ${currentFont.instruction} ${currentTheme.banner}`}>
                <strong>Hướng dẫn: </strong>
                {currentPart?.instruction || 'Nghe đoạn ghi âm và trả lời các câu hỏi bên dưới.'}
              </div>
            </div>

            {/* Questions View: Custom Structured Layout (Tables, Notes, Matching) OR Fallback Card List */}
            {currentPart?.layout ? (
              <div className="space-y-6">
                {currentPart.layout.map((sec, secIdx) => {
                  // =========================================================
                  // 1. TABLE COMPLETION SECTION
                  // =========================================================
                  if (sec.type === 'table') {
                    return (
                      <div key={secIdx} className={`rounded-3xl border overflow-hidden transition-colors ${currentTheme.card}`}>
                        <div className={`p-4 sm:p-5 border-b ${currentTheme.cardHeader} flex items-center justify-between gap-3 flex-wrap`}>
                          <div>
                            <h3 className={`font-bold text-base sm:text-lg ${currentTheme.title}`}>
                              {sec.title}
                            </h3>
                            {sec.instruction && (
                              <p className={`text-xs mt-1 ${currentTheme.subText}`}>
                                {sec.instruction}
                              </p>
                            )}
                          </div>
                          {sec.wordLimit && (
                            <span className={`text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full ${currentTheme.badge}`}>
                              {sec.wordLimit}
                            </span>
                          )}
                        </div>

                        <div className="p-3 sm:p-5 overflow-x-auto">
                          <table className="w-full text-left border-collapse text-xs sm:text-sm">
                            <thead>
                              <tr className={`border-b ${currentTheme.divider} ${currentTheme.cardSubtle}`}>
                                {sec.headers?.map((h, hIdx) => (
                                  <th key={hIdx} className="p-3 font-bold text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className={`divide-y ${currentTheme.divider}`}>
                              {sec.rows?.map((row, rIdx) => (
                                <tr key={row.id || rIdx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                                  {row.cells?.map((cell, cIdx) => (
                                    <td key={cIdx} className="p-3 align-middle text-gray-700 dark:text-gray-300">
                                      {cell.questionId ? (
                                        (() => {
                                          const q = currentPart.questions?.find(item => item.id === cell.questionId);
                                          if (!q) return null;
                                          const evalResult = evaluation.results[q.id];
                                          const isActive = activeQuestionId === q.id;

                                          return (
                                            <div
                                              id={`q-${q.id}`}
                                              onClick={() => setActiveQuestionId(q.id)}
                                              className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl transition-all cursor-pointer ${
                                                isActive ? 'bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : ''
                                              }`}
                                            >
                                              {cell.prefix && <span className="font-medium">{cell.prefix}</span>}
                                              <span className={`inline-flex items-center justify-center font-extrabold text-[11px] px-1.5 py-0.5 rounded-md min-w-[24px] transition-colors ${
                                                isActive
                                                  ? 'bg-blue-600 text-white'
                                                  : isSubmitted
                                                    ? evalResult?.isCorrect
                                                      ? 'bg-emerald-600 text-white'
                                                      : 'bg-rose-600 text-white'
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                              }`}>
                                                {q.id}
                                              </span>
                                              <input
                                                type="text"
                                                value={userAnswers[q.id] || ''}
                                                disabled={isTimeUp || isSubmitted}
                                                placeholder={q.placeholder || 'Điền câu trả lời...'}
                                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                className={`w-28 sm:w-36 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                                                  isSubmitted
                                                    ? evalResult?.isCorrect
                                                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                                      : 'bg-rose-50 border-rose-500 text-rose-950 font-bold dark:bg-rose-950/40 dark:text-rose-200'
                                                    : isActive
                                                      ? 'border-blue-500 ring-2 ring-blue-500/30 bg-white dark:bg-gray-800'
                                                      : `${currentTheme.input}`
                                                }`}
                                              />
                                              {cell.suffix && <span className="font-medium">{cell.suffix}</span>}
                                              {isSubmitted && evalResult && (
                                                <span className="text-xs ml-1">
                                                  {evalResult.isCorrect ? (
                                                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                                      <CheckCircle2 size={13} />
                                                    </span>
                                                  ) : (
                                                    <span className="text-rose-600 dark:text-rose-400 font-bold block text-[11px] bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                                                      ✓ {evalResult.correctAnswer}
                                                    </span>
                                                  )}
                                                </span>
                                              )}
                                            </div>
                                          );
                                        })()
                                      ) : (
                                        <span className="font-medium">{cell.text}</span>
                                      )}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  }

                  // =========================================================
                  // 2. NOTE COMPLETION SECTION (BULLETS OR HIERARCHY)
                  // =========================================================
                  if (sec.type === 'notes') {
                    return (
                      <div key={secIdx} className={`rounded-3xl border p-5 sm:p-7 space-y-4 transition-colors ${currentTheme.card}`}>
                        <div className={`flex items-center justify-between gap-3 flex-wrap border-b pb-3.5 ${currentTheme.divider}`}>
                          <div>
                            <h3 className={`font-bold text-base sm:text-lg flex items-center gap-2 ${currentTheme.title}`}>
                              <FileText size={18} className="text-blue-600 dark:text-blue-400" />
                              <span>{sec.title}</span>
                            </h3>
                            {sec.instruction && (
                              <p className={`text-xs mt-1 ${currentTheme.subText}`}>
                                {sec.instruction}
                              </p>
                            )}
                          </div>
                          {sec.wordLimit && (
                            <span className={`text-[10px] sm:text-xs font-extrabold uppercase px-3 py-1 rounded-full ${currentTheme.badge}`}>
                              {sec.wordLimit}
                            </span>
                          )}
                        </div>

                        {sec.subheading && (
                          <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">
                            {sec.subheading}
                          </h4>
                        )}

                        {/* Flat items list */}
                        {sec.items && (
                          <ul className="space-y-3">
                            {sec.items.map((item, iIdx) => {
                              if (item.questionId) {
                                const q = currentPart.questions?.find(it => it.id === item.questionId);
                                if (!q) return null;
                                const evalResult = evaluation.results[q.id];
                                const isActive = activeQuestionId === q.id;

                                return (
                                  <li
                                    key={iIdx}
                                    id={`q-${q.id}`}
                                    onClick={() => setActiveQuestionId(q.id)}
                                    className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl transition-all cursor-pointer ${
                                      isActive ? 'bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : ''
                                    }`}
                                  >
                                    <span className="text-blue-500 font-bold">•</span>
                                    {item.prefix && <span className="font-medium text-xs sm:text-sm">{item.prefix}</span>}
                                    <span className={`inline-flex items-center justify-center font-extrabold text-[11px] px-1.5 py-0.5 rounded-md min-w-[24px] ${
                                      isActive
                                        ? 'bg-blue-600 text-white'
                                        : isSubmitted
                                          ? evalResult?.isCorrect
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-rose-600 text-white'
                                          : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                    }`}>
                                      {q.id}
                                    </span>
                                    <input
                                      type="text"
                                      value={userAnswers[q.id] || ''}
                                      disabled={isTimeUp || isSubmitted}
                                      placeholder={q.placeholder || 'Điền câu trả lời...'}
                                      onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                      className={`w-36 sm:w-48 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                                        isSubmitted
                                          ? evalResult?.isCorrect
                                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                            : 'bg-rose-50 border-rose-500 text-rose-950 font-bold dark:bg-rose-950/40 dark:text-rose-200'
                                          : isActive
                                            ? 'border-blue-500 ring-2 ring-blue-500/30 bg-white dark:bg-gray-800'
                                            : `${currentTheme.input}`
                                      }`}
                                    />
                                    {item.suffix && <span className="font-medium text-xs sm:text-sm">{item.suffix}</span>}
                                    {isSubmitted && evalResult && (
                                      <span className="inline-flex items-center gap-1 ml-1 text-xs">
                                        {evalResult.isCorrect ? (
                                          <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                            <CheckCircle2 size={14} /> Đúng
                                          </span>
                                        ) : (
                                          <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                                            <XCircle size={14} /> Đáp án: <strong>{evalResult.correctAnswer}</strong>
                                          </span>
                                        )}
                                      </span>
                                    )}
                                  </li>
                                );
                              }
                              return (
                                <li key={iIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                  <span className="text-gray-400">•</span>
                                  <span className="font-medium">{item.text}</span>
                                </li>
                              );
                            })}
                          </ul>
                        )}

                        {/* Hierarchical sections (like Part 4) */}
                        {sec.sections && (
                          <div className="space-y-6 pt-1">
                            {sec.sections.map((subSec, sIdx) => (
                              <div key={sIdx} className={`p-4 sm:p-5 rounded-2xl border ${currentTheme.cardSubtle} space-y-3`}>
                                <h4 className="font-extrabold text-sm sm:text-base text-gray-900 dark:text-white border-b pb-2 border-gray-200 dark:border-gray-700 flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                                  <span>{subSec.heading}</span>
                                </h4>

                                {subSec.subheading && (
                                  <h5 className="font-bold text-xs uppercase tracking-wider text-gray-600 dark:text-gray-300 pt-1">
                                    {subSec.subheading}
                                  </h5>
                                )}

                                {subSec.items && (
                                  <ul className="space-y-2.5 pl-2">
                                    {subSec.items.map((item, iIdx) => {
                                      if (item.questionId) {
                                        const q = currentPart.questions?.find(it => it.id === item.questionId);
                                        if (!q) return null;
                                        const evalResult = evaluation.results[q.id];
                                        const isActive = activeQuestionId === q.id;

                                        return (
                                          <li
                                            key={iIdx}
                                            id={`q-${q.id}`}
                                            onClick={() => setActiveQuestionId(q.id)}
                                            className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl transition-all cursor-pointer ${
                                              isActive ? 'bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : ''
                                            }`}
                                          >
                                            <span className="text-gray-400">•</span>
                                            {item.prefix && <span className="font-medium text-xs sm:text-sm">{item.prefix}</span>}
                                            <span className={`inline-flex items-center justify-center font-extrabold text-[11px] px-1.5 py-0.5 rounded-md min-w-[24px] ${
                                              isActive
                                                ? 'bg-blue-600 text-white'
                                                : isSubmitted
                                                  ? evalResult?.isCorrect
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-rose-600 text-white'
                                                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                            }`}>
                                              {q.id}
                                            </span>
                                            <input
                                              type="text"
                                              value={userAnswers[q.id] || ''}
                                              disabled={isTimeUp || isSubmitted}
                                              placeholder={q.placeholder || 'Điền câu trả lời...'}
                                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                              className={`w-36 sm:w-48 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                                                isSubmitted
                                                  ? evalResult?.isCorrect
                                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                                    : 'bg-rose-50 border-rose-500 text-rose-950 font-bold dark:bg-rose-950/40 dark:text-rose-200'
                                                  : isActive
                                                    ? 'border-blue-500 ring-2 ring-blue-500/30 bg-white dark:bg-gray-800'
                                                    : `${currentTheme.input}`
                                              }`}
                                            />
                                            {item.suffix && <span className="font-medium text-xs sm:text-sm">{item.suffix}</span>}
                                            {isSubmitted && evalResult && (
                                              <span className="inline-flex items-center gap-1 ml-1 text-xs">
                                                {evalResult.isCorrect ? (
                                                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                                    <CheckCircle2 size={14} /> Đúng
                                                  </span>
                                                ) : (
                                                  <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                                                    <XCircle size={14} /> Đáp án: <strong>{evalResult.correctAnswer}</strong>
                                                  </span>
                                                )}
                                              </span>
                                            )}
                                          </li>
                                        );
                                      }
                                      return (
                                        <li key={iIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                          <span className="text-gray-400">•</span>
                                          <span className="font-medium">{item.text}</span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                )}

                                {subSec.afterItems && (
                                  <div className="pt-2 pl-2 space-y-2 border-t border-gray-200/60 dark:border-gray-700/60">
                                    {subSec.afterItems.map((item, aIdx) => {
                                      const q = currentPart.questions?.find(it => it.id === item.questionId);
                                      if (!q) return null;
                                      const evalResult = evaluation.results[q.id];
                                      const isActive = activeQuestionId === q.id;

                                      return (
                                        <div
                                          key={aIdx}
                                          id={`q-${q.id}`}
                                          onClick={() => setActiveQuestionId(q.id)}
                                          className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl transition-all cursor-pointer ${
                                            isActive ? 'bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : ''
                                          }`}
                                        >
                                          {item.prefix && <span className="font-medium text-xs sm:text-sm">{item.prefix}</span>}
                                          <span className={`inline-flex items-center justify-center font-extrabold text-[11px] px-1.5 py-0.5 rounded-md min-w-[24px] ${
                                            isActive
                                              ? 'bg-blue-600 text-white'
                                              : isSubmitted
                                                ? evalResult?.isCorrect
                                                  ? 'bg-emerald-600 text-white'
                                                  : 'bg-rose-600 text-white'
                                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                          }`}>
                                            {q.id}
                                          </span>
                                          <input
                                            type="text"
                                            value={userAnswers[q.id] || ''}
                                            disabled={isTimeUp || isSubmitted}
                                            placeholder={q.placeholder || 'Điền câu trả lời...'}
                                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                            className={`w-36 sm:w-48 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                                              isSubmitted
                                                ? evalResult?.isCorrect
                                                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                                  : 'bg-rose-50 border-rose-500 text-rose-950 font-bold dark:bg-rose-950/40 dark:text-rose-200'
                                                : isActive
                                                  ? 'border-blue-500 ring-2 ring-blue-500/30 bg-white dark:bg-gray-800'
                                                  : `${currentTheme.input}`
                                            }`}
                                          />
                                          {item.suffix && <span className="font-medium text-xs sm:text-sm">{item.suffix}</span>}
                                          {isSubmitted && evalResult && (
                                            <span className="inline-flex items-center gap-1 ml-1 text-xs">
                                              {evalResult.isCorrect ? (
                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                                  <CheckCircle2 size={14} /> Đúng
                                                </span>
                                              ) : (
                                                <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                                                  <XCircle size={14} /> Đáp án: <strong>{evalResult.correctAnswer}</strong>
                                                </span>
                                              )}
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}

                                {subSec.subsections && (
                                  <div className="space-y-4 pt-2">
                                    {subSec.subsections.map((sub, subIdx) => (
                                      <div key={subIdx} className="pl-3 border-l-2 border-blue-500/40 space-y-2">
                                        <h6 className="font-bold text-xs text-blue-700 dark:text-blue-300">
                                          {sub.subheading}
                                        </h6>
                                        <ul className="space-y-2">
                                          {sub.items.map((item, iIdx) => {
                                            if (item.questionId) {
                                              const q = currentPart.questions?.find(it => it.id === item.questionId);
                                              if (!q) return null;
                                              const evalResult = evaluation.results[q.id];
                                              const isActive = activeQuestionId === q.id;

                                              return (
                                                <li
                                                  key={iIdx}
                                                  id={`q-${q.id}`}
                                                  onClick={() => setActiveQuestionId(q.id)}
                                                  className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl transition-all cursor-pointer ${
                                                    isActive ? 'bg-blue-50/80 dark:bg-blue-950/40 ring-2 ring-blue-500' : ''
                                                  }`}
                                                >
                                                  <span className="text-gray-400">•</span>
                                                  {item.prefix && <span className="font-medium text-xs sm:text-sm">{item.prefix}</span>}
                                                  <span className={`inline-flex items-center justify-center font-extrabold text-[11px] px-1.5 py-0.5 rounded-md min-w-[24px] ${
                                                    isActive
                                                      ? 'bg-blue-600 text-white'
                                                      : isSubmitted
                                                        ? evalResult?.isCorrect
                                                          ? 'bg-emerald-600 text-white'
                                                          : 'bg-rose-600 text-white'
                                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                                  }`}>
                                                    {q.id}
                                                  </span>
                                                  <input
                                                    type="text"
                                                    value={userAnswers[q.id] || ''}
                                                    disabled={isTimeUp || isSubmitted}
                                                    placeholder={q.placeholder || 'Điền câu trả lời...'}
                                                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                                    className={`w-36 sm:w-48 px-2.5 py-1 text-xs sm:text-sm font-semibold rounded-lg border transition-all ${
                                                      isSubmitted
                                                        ? evalResult?.isCorrect
                                                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold dark:bg-emerald-950/40 dark:text-emerald-200'
                                                          : 'bg-rose-50 border-rose-500 text-rose-950 font-bold dark:bg-rose-950/40 dark:text-rose-200'
                                                        : isActive
                                                          ? 'border-blue-500 ring-2 ring-blue-500/30 bg-white dark:bg-gray-800'
                                                          : `${currentTheme.input}`
                                                    }`}
                                                  />
                                                  {item.suffix && <span className="font-medium text-xs sm:text-sm">{item.suffix}</span>}
                                                  {isSubmitted && evalResult && (
                                                    <span className="inline-flex items-center gap-1 ml-1 text-xs">
                                                      {evalResult.isCorrect ? (
                                                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                                                          <CheckCircle2 size={14} /> Đúng
                                                        </span>
                                                      ) : (
                                                        <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-900">
                                                          <XCircle size={14} /> Đáp án: <strong>{evalResult.correctAnswer}</strong>
                                                        </span>
                                                      )}
                                                    </span>
                                                  )}
                                                </li>
                                              );
                                            }
                                            return (
                                              <li key={iIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                                <span className="text-gray-400">•</span>
                                                <span className="font-medium">{item.text}</span>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                )}

                              </div>
                            ))}
                          </div>
                        )}

                      </div>
                    );
                  }

                  // =========================================================
                  // 3. MATCHING SECTION
                  // =========================================================
                  if (sec.type === 'matching') {
                    return (
                      <div key={secIdx} className={`rounded-3xl border p-5 sm:p-7 space-y-5 transition-colors ${currentTheme.card}`}>
                        <div className={`border-b pb-3.5 ${currentTheme.divider}`}>
                          <h3 className={`font-bold text-base sm:text-lg ${currentTheme.title}`}>
                            {sec.title}
                          </h3>
                          {sec.instruction && (
                            <p className={`text-xs mt-1 ${currentTheme.subText}`}>
                              {sec.instruction}
                            </p>
                          )}
                        </div>

                        {sec.legend && (
                          <div className={`p-4 rounded-2xl border ${currentTheme.banner} space-y-2 text-xs sm:text-sm`}>
                            <div className="font-bold text-xs uppercase tracking-wider mb-1 text-gray-600 dark:text-gray-300">
                              Các lựa chọn (Choose A, B, or C):
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {sec.legend.map((leg) => (
                                <div key={leg.letter} className="flex items-center gap-2 p-2 rounded-xl bg-white/70 dark:bg-gray-800/70 border border-gray-200/70 dark:border-gray-700/70">
                                  <span className="w-6 h-6 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shrink-0">
                                    {leg.letter}
                                  </span>
                                  <span className="font-medium text-xs text-gray-800 dark:text-gray-200">{leg.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="space-y-3">
                          {sec.items?.map((item) => {
                            const q = currentPart.questions?.find(it => it.id === item.questionId);
                            if (!q) return null;
                            const evalResult = evaluation.results[q.id];
                            const isActive = activeQuestionId === q.id;

                            return (
                              <div
                                key={q.id}
                                id={`q-${q.id}`}
                                onClick={() => setActiveQuestionId(q.id)}
                                className={`p-3.5 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer ${
                                  isSubmitted
                                    ? evalResult?.isCorrect
                                      ? 'ring-2 ring-emerald-500/50 bg-emerald-50/20'
                                      : 'ring-2 ring-rose-500/50 bg-rose-50/20'
                                    : isActive
                                      ? 'ring-2 ring-blue-500 shadow-md bg-blue-50/30'
                                      : currentTheme.cardSubtle
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <span className={`w-7 h-7 rounded-xl font-extrabold text-xs flex items-center justify-center shrink-0 ${
                                    isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                                  }`}>
                                    {q.id}
                                  </span>
                                  <span className="font-medium text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                                    {item.label}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                                  {['A', 'B', 'C'].map((optLetter) => {
                                    const isSelected = userAnswers[q.id] === optLetter;
                                    const isCorrectChoice = isSubmitted && (q.answer === optLetter || q.primaryAnswer === optLetter);
                                    const isWrongSelected = isSubmitted && isSelected && !evalResult?.isCorrect;

                                    return (
                                      <button
                                        key={optLetter}
                                        type="button"
                                        disabled={isTimeUp || isSubmitted}
                                        onClick={() => handleAnswerChange(q.id, optLetter)}
                                        className={`w-9 h-9 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center justify-center border ${
                                          isSubmitted
                                            ? isCorrectChoice
                                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                              : isWrongSelected
                                                ? 'bg-rose-600 text-white border-rose-600'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 opacity-60'
                                            : isSelected
                                              ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                                        }`}
                                      >
                                        {optLetter}
                                      </button>
                                    );
                                  })}

                                  {isSubmitted && evalResult && (
                                    <span className="ml-2 text-xs font-bold">
                                      {evalResult.isCorrect ? (
                                        <span className="text-emerald-600 flex items-center gap-0.5"><CheckCircle2 size={15} /> Đúng</span>
                                      ) : (
                                        <span className="text-rose-600 flex items-center gap-0.5"><XCircle size={15} /> Đáp án: {evalResult.correctAnswer}</span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }

                  // =========================================================
                  // 4. QUESTIONS SECTION (MULTIPLE CHOICE)
                  // =========================================================
                  if (sec.type === 'questions') {
                    return (
                      <div key={secIdx} className="space-y-4">
                        {sec.title && (
                          <div className={`p-4 rounded-2xl border ${currentTheme.card} ${currentTheme.divider}`}>
                            <h3 className={`font-bold text-base sm:text-lg ${currentTheme.title}`}>
                              {sec.title}
                            </h3>
                            {sec.instruction && (
                              <p className={`text-xs mt-1 ${currentTheme.subText}`}>
                                {sec.instruction}
                              </p>
                            )}
                          </div>
                        )}

                        {sec.questionIds?.map((qid) => {
                          const q = currentPart.questions?.find(item => item.id === qid);
                          if (!q) return null;
                          const evalResult = evaluation.results[q.id];
                          const isActive = activeQuestionId === q.id;

                          return (
                            <div
                              key={q.id}
                              id={`q-${q.id}`}
                              className={`rounded-2xl border p-5 transition-all ${currentTheme.card} ${
                                isSubmitted
                                  ? evalResult?.isCorrect
                                    ? 'ring-2 ring-emerald-500/50'
                                    : 'ring-2 ring-rose-500/50'
                                  : isActive
                                    ? 'ring-2 ring-blue-500 shadow-md'
                                    : ''
                              }`}
                              onClick={() => setActiveQuestionId(q.id)}
                            >
                              <div className="flex items-center justify-between gap-2 mb-2">
                                <span className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${currentTheme.cardSubtle}`}>
                                  Câu {q.id}
                                </span>
                              </div>

                              <p className={`${currentFont.question} leading-snug mb-3`}>
                                {q.question}
                              </p>

                              <div className="space-y-2">
                                {q.options?.map((opt, oIdx) => {
                                  const optLetter = opt.trim().charAt(0);
                                  const isChecked = userAnswers[q.id] === opt || userAnswers[q.id] === optLetter;
                                  return (
                                    <label
                                      key={oIdx}
                                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${currentFont.body} ${
                                        isTimeUp || isSubmitted ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'
                                      } ${
                                        isChecked ? currentTheme.radioChecked : currentTheme.radioUnchecked
                                      }`}
                                    >
                                      <input
                                        type="radio"
                                        name={`q-${q.id}`}
                                        value={opt}
                                        checked={isChecked}
                                        disabled={isTimeUp || isSubmitted}
                                        onChange={() => handleAnswerChange(q.id, optLetter)}
                                        className="w-4 h-4"
                                      />
                                      <span>{opt}</span>
                                    </label>
                                  );
                                })}
                              </div>

                              {isSubmitted && evalResult && (
                                <div className={`mt-3.5 pt-3 border-t ${currentTheme.divider} space-y-2 text-xs`}>
                                  {evalResult.isCorrect ? (
                                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                                      <CheckCircle2 size={16} />
                                      <span>Chính xác! Đáp án: {evalResult.correctAnswer}</span>
                                    </div>
                                  ) : (
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                                        <XCircle size={16} />
                                        <span>Chưa chính xác!</span>
                                      </div>
                                      <div className={`border rounded-lg p-2 ${currentTheme.cardSubtle}`}>
                                        <span>Đáp án đúng: </span>
                                        <strong className="font-bold underline">{evalResult.correctAnswer}</strong>
                                        {evalResult.userAnswer && (
                                          <span className="opacity-70 ml-2">(Bạn đã chọn: {evalResult.userAnswer})</span>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {evalResult.explanation && (
                                    <div className={`border rounded-lg p-2.5 leading-relaxed ${currentTheme.cardSubtle}`}>
                                      <p>{evalResult.explanation}</p>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            ) : (
              /* Fallback to Standard Questions List */
              <div className="space-y-4">
                {displayedQuestions.map((q) => {
                  const evalResult = evaluation.results[q.id];
                  const isActive = activeQuestionId === q.id;

                  return (
                    <div
                      key={q.id}
                      id={`q-${q.id}`}
                      className={`rounded-2xl border p-5 transition-all ${currentTheme.card} ${
                        isSubmitted
                          ? evalResult?.isCorrect
                            ? 'ring-2 ring-emerald-500/50'
                            : 'ring-2 ring-rose-500/50'
                          : isActive
                            ? 'ring-2 ring-blue-500 shadow-md'
                            : ''
                      }`}
                      onClick={() => setActiveQuestionId(q.id)}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`font-extrabold text-xs px-2.5 py-0.5 rounded-md ${currentTheme.cardSubtle}`}>
                          Câu {q.id}
                        </span>
                        {q.wordLimit && q.type !== 'choice' && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentTheme.badge}`}>
                            {q.wordLimit}
                          </span>
                        )}
                      </div>

                      {/* CHOICE OR FILL */}
                      {q.type === 'choice' ? (
                        <div className="space-y-3">
                          <p className={`${currentFont.question} leading-snug`}>
                            {q.question}
                          </p>
                          <div className="space-y-2">
                            {q.options?.map((opt, oIdx) => {
                              const isChecked = userAnswers[q.id] === opt || userAnswers[q.id] === opt.charAt(0);
                              return (
                                <label
                                  key={oIdx}
                                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${currentFont.body} ${
                                    isTimeUp || isSubmitted 
                                      ? 'cursor-not-allowed opacity-80' 
                                      : 'cursor-pointer'
                                  } ${
                                    isChecked
                                      ? currentTheme.radioChecked
                                      : currentTheme.radioUnchecked
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    value={opt}
                                    checked={isChecked}
                                    disabled={isTimeUp || isSubmitted}
                                    onChange={() => handleAnswerChange(q.id, opt.charAt(0))}
                                    className="w-4 h-4 disabled:opacity-50"
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className={`${currentFont.body} font-medium leading-relaxed flex flex-wrap items-center gap-2`}>
                            {q.label && <span>{q.label}</span>}
                            <input
                              type="text"
                              value={userAnswers[q.id] || ''}
                              disabled={isTimeUp || isSubmitted}
                              placeholder={q.placeholder || `[Điền câu ${q.id}]`}
                              onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                              className={`rounded-lg border font-bold transition-all ${currentFont.input} ${
                                isTimeUp || isSubmitted
                                  ? `${currentTheme.inputDisabled} cursor-not-allowed`
                                  : currentTheme.input
                              }`}
                            />
                            {q.suffix && <span>{q.suffix}</span>}
                          </div>
                        </div>
                      )}

                      {/* POST SUBMIT REVIEW DETAILS */}
                      {isSubmitted && evalResult && (
                        <div className={`mt-3.5 pt-3 border-t ${currentTheme.divider} space-y-2 text-xs`}>
                          {evalResult.isCorrect ? (
                            <div className="flex items-center gap-1.5 text-emerald-500 font-bold">
                              <CheckCircle2 size={16} />
                              <span>Chính xác! Đáp án: {evalResult.correctAnswer}</span>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                                <XCircle size={16} />
                                <span>Chưa chính xác!</span>
                              </div>
                              <div className={`border rounded-lg p-2 ${currentTheme.cardSubtle}`}>
                                <span>Đáp án đúng: </span>
                                <strong className="font-bold underline">{evalResult.correctAnswer}</strong>
                                {evalResult.userAnswer && (
                                  <span className="opacity-70 ml-2">(Bạn đã điền: {evalResult.userAnswer})</span>
                                )}
                              </div>
                            </div>
                          )}

                          {evalResult.explanation && (
                            <div className={`border rounded-lg p-2.5 leading-relaxed ${currentTheme.cardSubtle}`}>
                              <div className="font-bold flex items-center gap-1 mb-1 text-current">
                                <Sparkles size={12} />
                                <span>Giải thích chi tiết:</span>
                              </div>
                              <p>{evalResult.explanation}</p>
                            </div>
                          )}

                          {evalResult.evidence && (
                            <div className={`border-l-2 border-current p-2 italic ${currentTheme.cardSubtle}`}>
                              <span className="font-semibold not-italic block text-[10px] opacity-70">Trích đoạn băng nghe:</span>
                              &ldquo;{evalResult.evidence}&rdquo;
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}

            {/* Expandable Audio Transcript Accordion */}
            {(exam.transcript || currentPart?.transcript) && (
              <div className={`rounded-2xl border shadow-xs overflow-hidden transition-colors ${currentTheme.card}`}>
                <div
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm transition cursor-pointer hover:opacity-90"
                  onClick={() => setExpandedTranscripts(prev => ({ ...prev, [currentPart.id]: !prev[currentPart.id] }))}
                >
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-current" />
                    <span>Lời thoại bài nghe (Audio Transcript)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {currentPart?.transcript && exam.transcript && (
                      <div
                        className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 text-xs font-semibold"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setTranscriptViewMode(prev => ({ ...prev, [currentPart.id]: 'part' }))}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            transcriptViewMode[currentPart.id] !== 'full'
                              ? 'bg-white dark:bg-gray-700 shadow-xs text-blue-600 dark:text-blue-400 font-bold'
                              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                          }`}
                        >
                          Phần {currentPart.id}
                        </button>
                        <button
                          type="button"
                          onClick={() => setTranscriptViewMode(prev => ({ ...prev, [currentPart.id]: 'full' }))}
                          className={`px-2.5 py-1 rounded-md transition cursor-pointer ${
                            transcriptViewMode[currentPart.id] === 'full'
                              ? 'bg-white dark:bg-gray-700 shadow-xs text-blue-600 dark:text-blue-400 font-bold'
                              : 'text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
                          }`}
                        >
                          Toàn bộ bài nghe
                        </button>
                      </div>
                    )}
                    {expandedTranscripts[currentPart.id] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {expandedTranscripts[currentPart.id] && (
                  <div className={`p-5 border-t font-mono text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto ${currentTheme.cardSubtle}`}>
                    {transcriptViewMode[currentPart.id] === 'full' 
                      ? exam.transcript 
                      : (currentPart?.transcript || exam.transcript)}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 4. PERSISTENT CBT BOTTOM QUESTION PALETTE BAR (LUÔN HIỆN KHI LÀM BÀI) */}
      {/* ========================================================================= */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 border-t transition-colors shadow-2xl select-none ${currentTheme.footer}`}>
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-4">
          
          {/* Left: Scrollable Questions Palette by Part */}
          <div className="flex-1 overflow-x-auto flex items-center gap-5 sm:gap-7 py-1 no-scrollbar">
            {activeParts.map((part, pIdx) => {
              const isCurrent = activePartIdx === pIdx;
              const partQuestions = part.questions || [];
              const answeredInPart = partQuestions.filter(q => !!userAnswers[q.id]).length;
              const partLabel = isReading ? `PASSAGE ${part.id}` : `PART ${part.id}`;

              return (
                <div key={part.id} className="flex items-center gap-2 shrink-0">
                  {/* Current Active Part: Part Header + Question Numbers with Top Dashes */}
                  {isCurrent ? (
                    <div className="flex items-center gap-3">
                      {/* Part Label with top segment line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-full h-[2.5px] rounded-full mb-1 ${currentTheme.footerLine}`} />
                        <span className="text-xs font-black tracking-wide uppercase px-1">
                          {partLabel}
                        </span>
                      </div>

                      {/* Question numbers horizontally with individual dash above each */}
                      <div className="flex items-center gap-1 sm:gap-1.5 ml-1">
                        {partQuestions.map((q) => {
                          const isAns = !!userAnswers[q.id];
                          const isActive = activeQuestionId === q.id;
                          const evalResult = evaluation.results[q.id];
                          const isCorrect = isSubmitted && evalResult?.isCorrect;

                          return (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => scrollToQuestion(q.id)}
                              className="group flex flex-col items-center cursor-pointer p-0.5 focus:outline-none transition-all"
                              title={`Câu ${q.id}${isAns ? ' (Đã trả lời)' : ' (Chưa làm)'}`}
                            >
                              {/* Top dash indicator */}
                              <span
                                className={`w-3.5 h-[2px] rounded-full mb-1 transition-all ${
                                  isSubmitted
                                    ? isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                                    : isAns
                                      ? currentTheme.footerDashAns
                                      : `${currentTheme.footerDashUnans} group-hover:opacity-100`
                                }`}
                              />

                              {/* Question number pill / outline */}
                              <div
                                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                                  isSubmitted
                                    ? isCorrect
                                      ? 'bg-emerald-500 text-white font-black shadow-xs'
                                      : 'bg-rose-500 text-white font-black shadow-xs'
                                    : isActive
                                      ? `${currentTheme.footerActiveBox} font-black scale-105 shadow-2xs`
                                      : `${currentTheme.footerInactiveText}`
                                }`}
                              >
                                {q.id}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    /* Inactive Part Button (e.g. PART 2   0 of 10) with full-width top line */
                    <button
                      type="button"
                      onClick={() => {
                        setActivePartIdx(pIdx);
                        if (partQuestions.length > 0) {
                          scrollToQuestion(partQuestions[0].id);
                        }
                      }}
                      className="group flex flex-col items-start cursor-pointer transition-all hover:opacity-100 opacity-80"
                      title={`Chuyển sang ${partLabel}`}
                    >
                      {/* Top horizontal line spanning the part */}
                      <div className={`w-full h-[2.5px] rounded-full mb-1 transition-opacity ${currentTheme.footerLine} group-hover:opacity-100`} />
                      
                      <div className="flex items-center gap-1.5 py-0.5 px-1">
                        <span className="text-xs font-black uppercase tracking-wide">
                          {partLabel}
                        </span>
                        <span className={`text-xs font-medium ${currentTheme.footerSubText}`}>
                          {answeredInPart} of {partQuestions.length}
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Navigation Controls: Arrows & Checkmark */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Arrow Left (Previous question) */}
            <button
              type="button"
              onClick={handlePrevQuestion}
              disabled={isFirstQuestion}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${currentTheme.footerNavBtn}`}
              title="Câu trước đó"
            >
              <ArrowLeft size={16} />
            </button>

            {/* Arrow Right (Next question) */}
            <button
              type="button"
              onClick={handleNextQuestion}
              disabled={isLastQuestion}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl border flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${currentTheme.footerNavBtn}`}
              title="Câu tiếp theo"
            >
              <ArrowRight size={16} />
            </button>

            {/* Checkmark Button (Review / Submit) */}
            {!isSubmitted && (
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                disabled={isTimeUp}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all shadow-sm active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${currentTheme.footerSubmitBtn}`}
                title="Kiểm tra & Nộp bài thi"
              >
                <Check size={18} strokeWidth={2.8} />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FLOATING SELECTION POPUP FOR HIGHLIGHTING & NOTES */}
      {/* ========================================================================= */}
      {selectionPopup && (
        <div
          className="fixed z-50 bg-white rounded-xl shadow-xl border border-gray-200 p-1 flex items-center gap-1 animate-in fade-in"
          style={{
            left: selectionPopup.x,
            top: selectionPopup.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <button
            type="button"
            onClick={() => applyHighlight('bg-yellow-200 text-black')}
            className="w-6 h-6 rounded-md bg-yellow-200 hover:scale-110 transition-transform shadow-2xs"
            title="Tô vàng"
          />
          <button
            type="button"
            onClick={() => applyHighlight('bg-emerald-200 text-black')}
            className="w-6 h-6 rounded-md bg-emerald-200 hover:scale-110 transition-transform shadow-2xs"
            title="Tô xanh lá"
          />
          <button
            type="button"
            onClick={() => applyHighlight('bg-pink-200 text-black')}
            className="w-6 h-6 rounded-md bg-pink-200 hover:scale-110 transition-transform shadow-2xs"
            title="Tô hồng"
          />
          <div className="w-[1px] h-4 bg-gray-200 mx-1" />
          <button
            type="button"
            onClick={openNoteForSelection}
            className="px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-100 rounded-md flex items-center gap-1 cursor-pointer"
          >
            <Edit3 size={12} className="text-[#185bc3]" />
            <span>Ghi chú</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. NOTES DRAWER SIDEBAR */}
      {/* ========================================================================= */}
      {showNotesDrawer && (
        <div className={`fixed inset-y-0 right-0 w-80 shadow-2xl border-l z-50 flex flex-col animate-in slide-in-from-right text-left ${currentTheme.card}`}>
          <div className={`p-4 flex items-center justify-between border-b ${currentTheme.cardHeader}`}>
            <div className="flex items-center gap-2 font-bold text-sm">
              <Edit3 size={16} />
              <span>Ghi chú bài đọc</span>
            </div>
            <button
              type="button"
              onClick={() => setShowNotesDrawer(false)}
              className="opacity-70 hover:opacity-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* New note creator */}
          {activeNoteTarget && (
            <div className={`p-4 border-b space-y-2 ${currentTheme.cardSubtle}`}>
              <div className="text-xs font-semibold italic opacity-80">
                &ldquo;{activeNoteTarget.text}&rdquo;
              </div>
              <textarea
                rows={3}
                value={draftNoteContent}
                onChange={(e) => setDraftNoteContent(e.target.value)}
                placeholder="Viết ghi chú của bạn vào đây..."
                className={`w-full text-xs p-2.5 rounded-lg border focus:outline-none ${currentTheme.input}`}
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveNoteTarget(null)}
                  className={`px-2.5 py-1 text-xs rounded ${currentTheme.btnSecondary}`}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={saveCurrentNote}
                  className={`px-3 py-1 text-xs font-bold rounded shadow-xs ${currentTheme.btnPrimary}`}
                >
                  Lưu ghi chú
                </button>
              </div>
            </div>
          )}

          {/* Existing notes list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {Object.keys(notes).length === 0 ? (
              <div className="text-center py-12 opacity-50 text-xs">
                Chưa có ghi chú nào. Hãy bôi đen một đoạn văn bản và chọn &ldquo;Ghi chú&rdquo;.
              </div>
            ) : (
              Object.values(notes).map((note) => (
                <div key={note.id} className={`p-3 border rounded-xl space-y-1.5 text-xs ${currentTheme.cardSubtle}`}>
                  <div className="italic opacity-80 line-clamp-2">
                    &ldquo;{note.text}&rdquo;
                  </div>
                  <div className="font-semibold whitespace-pre-wrap">
                    {note.content}
                  </div>
                  <div className={`flex items-center justify-between text-[10px] opacity-60 pt-1 border-t ${currentTheme.divider}`}>
                    <span>{note.createdAt}</span>
                    <button
                      type="button"
                      onClick={() => deleteNote(note.id)}
                      className="text-rose-500 hover:underline flex items-center gap-0.5"
                    >
                      <Trash2 size={11} /> Xóa
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. SUBMIT CONFIRMATION MODAL */}
      {/* ========================================================================= */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-md w-full p-6 text-left shadow-2xl border animate-in zoom-in-95 ${currentTheme.card}`}>
            <h3 className="text-lg font-black mb-2">
              Xác nhận nộp bài thi?
            </h3>
            <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${currentTheme.subText}`}>
              Bạn đã hoàn thành <strong>{answeredCount}</strong> / <strong>{totalQuestions}</strong> câu hỏi. Sau khi nộp, hệ thống sẽ tự động chấm điểm và hiển thị đáp án cùng giải thích chi tiết.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${currentTheme.btnSecondary}`}
              >
                Tiếp tục làm bài
              </button>
              <button
                type="button"
                onClick={() => handleSubmitTest(false)}
                className={`px-5 py-2 rounded-xl text-xs font-bold cursor-pointer ${currentTheme.btnPrimary}`}
              >
                Đồng ý nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. RESULTS SUMMARY MODAL (BAND SCORE & FULL EVALUATION) */}
      {/* ========================================================================= */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`rounded-3xl max-w-lg w-full p-6 sm:p-8 text-center shadow-2xl border animate-in zoom-in-95 ${currentTheme.card}`}>
            
            {/* Header Icon */}
            <div className={`w-16 h-16 rounded-3xl mx-auto flex items-center justify-center mb-4 ${
              isTimeUp 
                ? 'bg-amber-100 text-amber-700' 
                : evaluation.correctCount > 0 
                  ? 'bg-blue-50 text-[#2c4482]' 
                  : 'bg-gray-100 text-gray-500'
            }`}>
              {isTimeUp ? <Clock size={32} /> : <Trophy size={32} />}
            </div>

            <h3 className="text-xl sm:text-2xl font-black mb-1">
              {isTimeUp 
                ? 'Hết giờ làm bài!' 
                : evaluation.percentage >= 50 
                  ? 'Chúc mừng bạn đã hoàn thành bài thi!' 
                  : 'Kết quả bài làm của bạn'}
            </h3>
            <p className={`text-xs sm:text-sm mb-6 ${currentTheme.subText}`}>
              {isTimeUp 
                ? 'Hệ thống đã tự động khóa và chấm điểm bài làm của bạn.' 
                : 'Kết quả chấm điểm tự động dựa trên thang điểm IELTS chuẩn quốc tế.'}
            </p>

            {/* Score Grid */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className={`border rounded-2xl p-3.5 ${currentTheme.cardSubtle}`}>
                <span className="text-[10px] font-bold uppercase block mb-1 opacity-70">Điểm số</span>
                <span className="text-xl sm:text-2xl font-black">
                  {evaluation.correctCount}/{totalQuestions}
                </span>
              </div>
              <div className={`border rounded-2xl p-3.5 ${currentTheme.cardSubtle}`}>
                <span className="text-[10px] font-bold uppercase block mb-1 opacity-70">Tỷ lệ đúng</span>
                <span className={`text-xl sm:text-2xl font-black ${
                  evaluation.percentage >= 50 ? 'text-emerald-500' : 'text-gray-700'
                }`}>
                  {evaluation.percentage}%
                </span>
              </div>
              <div className={`border rounded-2xl p-3.5 ${currentTheme.cardSubtle}`}>
                <span className="text-[10px] font-bold uppercase block mb-1 opacity-70">IELTS Band</span>
                <span className={`text-xl sm:text-2xl font-black ${
                  evaluation.correctCount > 0 ? 'text-purple-500' : 'text-gray-600'
                }`}>
                  {evaluation.band}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowResultsModal(false)}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${currentTheme.btnPrimary}`}
              >
                <span>Xem lại bài làm & giải thích</span>
              </button>
              <button
                type="button"
                onClick={handleRetake}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer ${currentTheme.btnSecondary}`}
              >
                Làm lại bài thi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
