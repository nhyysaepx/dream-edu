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
  Filter, 
  Eye, 
  ChevronRight,
  FileText,
  Highlighter,
  Edit3,
  Trash2,
  StickyNote,
  X,
  Quote,
  Copy,
  ClipboardPaste
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

// Format raw text content into semantic HTML paragraphs
function formatPassageToHtml(content, title) {
  const paragraphs = content.split('\n\n').filter(p => p.trim() && p.trim() !== title.trim());
  return paragraphs.map(p => `<p class="leading-relaxed mb-4">${p.trim()}</p>`).join('');
}

export default function ReadingHomeworkView({ homework }) {
  const navigate = useNavigate();
  const homeworkId = homework.id;

  // Active Passage Tab (p1 or p2)
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

  // Ref to the passage container for text selection
  const passageContainerRef = useRef(null);
  // Ref to store cloned range across events
  const currentRangeRef = useRef(null);

  // Text selection popup state: { text, x, y }
  const [selectionPopup, setSelectionPopup] = useState(null);
  const [copyToast, setCopyToast] = useState(false);

  // Notes state: { [noteId]: { id, passageId, text, content, createdAt } }
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_hw_${homeworkId}_notes`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active note opened in the sidebar
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [draftNoteContent, setDraftNoteContent] = useState('');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [noteSuccessToast, setNoteSuccessToast] = useState(false);

  // Stored HTML for each passage (including rendered highlights/notes)
  const [passageHtmls, setPassageHtmls] = useState(() => {
    const initial = {};
    homework.passages.forEach(p => {
      try {
        const saved = localStorage.getItem(`dream_hw_${homeworkId}_${p.id}_html`);
        // Clean out any corrupted empty marks from earlier tests
        const cleaned = saved ? saved.replace(/<mark[^>]*>\s*<\/mark>/gi, '') : null;
        initial[p.id] = cleaned || formatPassageToHtml(p.content, p.title);
      } catch {
        initial[p.id] = formatPassageToHtml(p.content, p.title);
      }
    });
    return initial;
  });

  // Auto-clean any corrupt/empty mark tags and repair damaged HTML from local storage on mount
  useEffect(() => {
    homework.passages.forEach(p => {
      const key = `dream_hw_${homeworkId}_${p.id}_html`;
      try {
        const val = localStorage.getItem(key);
        if (val) {
          const cleanP = formatPassageToHtml(p.content, p.title);
          // Check if marks are corrupted (e.g. mark directly preceding or outside <p>)
          const isMarkAtRoot = /^\s*<mark/i.test(val) || />\s*<mark[^>]*>.*?<\/mark>\s*<p/is.test(val);
          const hasEmptyMarks = /<mark[^>]*>\s*<\/mark>/gi.test(val);

          // Check if text content lost words compared to original passage
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = val;
          const origTextLen = p.content.replace(/\s+/g, ' ').trim().length;
          const savedTextLen = (tempDiv.textContent || '').replace(/\s+/g, ' ').trim().length;
          const isTextLost = Math.abs(origTextLen - savedTextLen) > 30;

          if (isMarkAtRoot || isTextLost) {
            console.warn(`Restoring damaged passage HTML for ${p.id}`);
            localStorage.setItem(key, cleanP);
            setPassageHtmls(prev => ({ ...prev, [p.id]: cleanP }));
          } else if (hasEmptyMarks) {
            const cleaned = val.replace(/<mark[^>]*>\s*<\/mark>/gi, '');
            if (cleaned !== val) {
              localStorage.setItem(key, cleaned);
              setPassageHtmls(prev => ({ ...prev, [p.id]: cleaned }));
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [homeworkId, homework.passages]);

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

  // Synchronize draftNoteContent when activeNoteId changes
  useEffect(() => {
    if (activeNoteId && notes[activeNoteId]) {
      setDraftNoteContent(notes[activeNoteId].content || '');
    } else {
      setDraftNoteContent('');
    }
  }, [activeNoteId, notes]);

  // Flatten all questions
  const allQuestions = useMemo(() => {
    return homework.passages.flatMap(p => p.questions.map(q => ({ ...q, passageId: p.id, passageNumber: p.number })));
  }, [homework.passages]);

  // Count answered questions
  const answeredCount = useMemo(() => {
    return allQuestions.filter(q => (answers[q.id] || '').trim().length > 0).length;
  }, [allQuestions, answers]);

  // Count highlights and notes for current active passage
  const currentPassageNotes = useMemo(() => {
    return Object.values(notes).filter(n => n.passageId === activePassageId);
  }, [notes, activePassageId]);

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

  // Handle Input Change for answers
  const handleInputChange = (qId, val) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [qId]: val
    }));
  };

  // Save current passage HTML to state and localStorage
  const saveCurrentPassageHtml = useCallback(() => {
    if (passageContainerRef.current) {
      const currentHtml = passageContainerRef.current.innerHTML;
      setPassageHtmls(prev => ({
        ...prev,
        [activePassageId]: currentHtml
      }));
      try {
        localStorage.setItem(`dream_hw_${homeworkId}_${activePassageId}_html`, currentHtml);
      } catch (e) {
        console.error(e);
      }
    }
  }, [activePassageId, homeworkId]);

  // Text selection listener on the passage
  const handlePassageMouseUp = (e) => {
    // If clicking popup or note sidebar or button, do nothing
    if (
      e.target.closest('#selection-popup') || 
      e.target.closest('#note-sidebar') || 
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('textarea')
    ) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setSelectionPopup(null);
      currentRangeRef.current = null;
      return;
    }

    // Ensure selection is strictly inside passage container
    if (passageContainerRef.current && passageContainerRef.current.contains(selection.anchorNode)) {
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      currentRangeRef.current = range.cloneRange();
      const rect = range.getBoundingClientRect();

      setSelectionPopup({
        text,
        x: rect.left + rect.width / 2,
        y: rect.top - 8
      });
    } else {
      setSelectionPopup(null);
      currentRangeRef.current = null;
    }
  };

  // Close popup if clicking elsewhere
  useEffect(() => {
    const handleDocumentMouseDown = (e) => {
      if (!e.target.closest('#selection-popup') && !e.target.closest('#passage-container')) {
        setSelectionPopup(null);
      }
    };
    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => document.removeEventListener('mousedown', handleDocumentMouseDown);
  }, []);

  // Global listener for Ctrl+C / Cmd+C when text is selected in the passage
  useEffect(() => {
    const handleKeyDown = async (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && selection.toString().trim()) {
          const text = selection.toString().trim();
          try {
            await navigator.clipboard.writeText(text);
            setCopyToast(true);
            setTimeout(() => setCopyToast(false), 2000);
          } catch (err) {
            // let browser native copy proceed
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 1. Apply Color Highlight
  const applyHighlight = (color = 'yellow') => {
    let range = null;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      range = selection.getRangeAt(0);
    } else if (currentRangeRef.current) {
      range = currentRangeRef.current;
    }

    if (!range) {
      setSelectionPopup(null);
      return;
    }

    try {
      if (passageContainerRef.current && !passageContainerRef.current.contains(range.commonAncestorContainer)) {
        if (!passageContainerRef.current.contains(range.startContainer)) {
          setSelectionPopup(null);
          return;
        }
      }

      const highlightId = `hl-${Date.now()}`;
      const mark = document.createElement('mark');
      mark.id = highlightId;
      mark.dataset.highlightId = highlightId;
      mark.dataset.annotationType = 'highlight';
      mark.className = 'annotation-mark bg-yellow-200 text-gray-900 rounded px-1 py-0.5 cursor-pointer font-medium hover:bg-yellow-300 transition-colors shadow-2xs inline';
      mark.title = 'Bấm để xóa tô màu';

      try {
        range.surroundContents(mark);
      } catch (wrapErr) {
        const fragment = range.cloneContents();
        mark.appendChild(fragment);
        range.deleteContents();
        range.insertNode(mark);
      }

      window.getSelection()?.removeAllRanges();
      currentRangeRef.current = null;
      setSelectionPopup(null);
      saveCurrentPassageHtml();
    } catch (err) {
      console.error('Highlight failed:', err);
      setSelectionPopup(null);
    }
  };

  // 2. Apply Note
  const applyNote = () => {
    let range = null;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      range = selection.getRangeAt(0);
    } else if (currentRangeRef.current) {
      range = currentRangeRef.current;
    }

    if (!range) {
      setSelectionPopup(null);
      return;
    }

    const selectedText = selectionPopup?.text || range.toString().trim();
    if (!selectedText) {
      setSelectionPopup(null);
      return;
    }

    try {
      if (passageContainerRef.current && !passageContainerRef.current.contains(range.commonAncestorContainer)) {
        if (!passageContainerRef.current.contains(range.startContainer)) {
          setSelectionPopup(null);
          return;
        }
      }

      const noteId = `note-${Date.now()}`;
      const mark = document.createElement('mark');
      mark.id = noteId;
      mark.dataset.noteId = noteId;
      mark.dataset.annotationId = noteId;
      mark.dataset.annotationType = 'note';
      mark.className = 'annotation-note bg-amber-200 text-amber-950 border-b-2 border-amber-600 rounded px-1 py-0.5 cursor-pointer font-semibold hover:bg-amber-300 transition-colors inline';
      mark.title = 'Bấm để xem/sửa ghi chú';

      try {
        range.surroundContents(mark);
      } catch (wrapErr) {
        const fragment = range.cloneContents();
        mark.appendChild(fragment);
        range.deleteContents();
        range.insertNode(mark);
      }

      window.getSelection()?.removeAllRanges();
      currentRangeRef.current = null;
      setSelectionPopup(null);

      // Create note record
      const newNote = {
        id: noteId,
        passageId: activePassageId,
        text: selectedText,
        content: '',
        createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setNotes(prev => {
        const updated = { ...prev, [noteId]: newNote };
        localStorage.setItem(`dream_hw_${homeworkId}_notes`, JSON.stringify(updated));
        return updated;
      });

      setActiveNoteId(noteId);
      setDraftNoteContent('');
      setShowNotesDrawer(true);

      saveCurrentPassageHtml();
    } catch (err) {
      console.error('Note creation failed:', err);
      setSelectionPopup(null);
    }
  };

  // 3. Copy selected text to clipboard
  const handleCopySelectedText = async () => {
    const textToCopy = selectionPopup?.text || window.getSelection()?.toString().trim();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
      setSelectionPopup(null);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Click on existing highlight or note inside the passage container
  const handlePassageClick = (e) => {
    const mark = e.target.closest('mark');
    if (!mark) return;

    const noteId = mark.dataset.noteId || mark.dataset.annotationId;
    const highlightId = mark.dataset.highlightId;
    const type = mark.dataset.annotationType;

    if (type === 'note' || (noteId && noteId.startsWith('note-'))) {
      e.stopPropagation();
      setActiveNoteId(noteId);
      if (notes[noteId]) {
        setDraftNoteContent(notes[noteId].content || '');
      }
      setShowNotesDrawer(true);
    } else if (highlightId || type === 'highlight') {
      e.stopPropagation();
      const confirmRemove = window.confirm('Bạn có muốn xóa đoạn tô màu (highlight) này không?');
      if (confirmRemove) {
        const parent = mark.parentNode;
        while (mark.firstChild) {
          parent.insertBefore(mark.firstChild, mark);
        }
        parent.removeChild(mark);
        saveCurrentPassageHtml();
      }
    }
  };

  // Save Note Content and immediately show the list of notes on the right
  const handleSaveNoteContent = () => {
    if (!activeNoteId) return;

    setNotes(prev => {
      const updated = {
        ...prev,
        [activeNoteId]: {
          ...prev[activeNoteId],
          content: draftNoteContent
        }
      };
      localStorage.setItem(`dream_hw_${homeworkId}_notes`, JSON.stringify(updated));
      return updated;
    });

    // Close the edit form and switch to the list of notes in the drawer!
    setActiveNoteId(null);
    setShowNotesDrawer(true);
    setNoteSuccessToast(true);
    setTimeout(() => setNoteSuccessToast(false), 2500);
  };

  // Delete Note and remove underline mark
  const handleDeleteNote = (noteId) => {
    const confirmDelete = window.confirm('Bạn có muốn xóa ghi chú này và hủy đánh dấu trong bài đọc?');
    if (!confirmDelete) return;

    // Un-wrap the mark in DOM if present
    const mark = passageContainerRef.current?.querySelector(`mark[data-note-id="${noteId}"]`);
    if (mark) {
      const parent = mark.parentNode;
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      saveCurrentPassageHtml();
    }

    setNotes(prev => {
      const next = { ...prev };
      delete next[noteId];
      localStorage.setItem(`dream_hw_${homeworkId}_notes`, JSON.stringify(next));
      return next;
    });

    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
  };

  // Reset / Clear all highlights & notes for active passage
  const handleClearAllAnnotations = () => {
    const confirmClear = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ các đoạn tô màu và ghi chú của bài đọc này?');
    if (!confirmClear) return;

    const activePassage = homework.passages.find(p => p.id === activePassageId) || homework.passages[0];
    const original = formatPassageToHtml(activePassage.content, activePassage.title);

    setPassageHtmls(prev => ({
      ...prev,
      [activePassageId]: original
    }));

    try {
      localStorage.removeItem(`dream_hw_${homeworkId}_${activePassageId}_html`);
      setNotes(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          if (next[k].passageId === activePassageId) delete next[k];
        });
        localStorage.setItem(`dream_hw_${homeworkId}_notes`, JSON.stringify(next));
        return next;
      });
    } catch (e) {
      console.error(e);
    }

    setActiveNoteId(null);
    setShowNotesDrawer(false);
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

    if (evaluationResults.percentage >= 70) {
      playCorrectSound();
      triggerCelebration();
    } else {
      playWrongSound();
    }
  };

  // Retake
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

  const passageFontClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  return (
    <div className="pt-20 pb-16 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
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
              <div className="px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700">
                Đã điền: <strong className="text-primary">{answeredCount}</strong> / {allQuestions.length} câu
              </div>

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
          {/* LEFT COLUMN: READING PASSAGE TEXT WITH HIGHLIGHT & NOTE        */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden relative">
            
            {/* Passage Selector Tabs, Annotation Tools & Font Controls */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              {/* Passage 1 / Passage 2 Buttons */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-gray-200/80 shadow-2xs">
                {homework.passages.map(p => {
                  const isActive = activePassageId === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePassageId(p.id);
                        setActiveNoteId(null);
                        setSelectionPopup(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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

              {/* Annotation Indicators & Font Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Notes Drawer Toggle */}
                {currentPassageNotes.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowNotesDrawer(!showNotesDrawer)}
                    className="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
                    title="Mở danh sách ghi chú của bài đọc này"
                  >
                    <StickyNote size={13} className="text-amber-600" />
                    <span>{currentPassageNotes.length} Ghi chú</span>
                  </button>
                )}

                {/* Clear All Annotations for this passage */}
                <button
                  type="button"
                  onClick={handleClearAllAnnotations}
                  className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Xóa tất cả tô màu và ghi chú của bài đọc này"
                >
                  <Trash2 size={14} />
                </button>

                {/* Font Size Adjuster */}
                <div className="flex items-center gap-1 text-xs text-gray-500 font-semibold pl-1 border-l border-gray-200">
                  <button
                    type="button"
                    onClick={() => setFontSize('sm')}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                      fontSize === 'sm' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Cỡ chữ nhỏ"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('base')}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                      fontSize === 'base' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Cỡ chữ chuẩn"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('lg')}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center font-bold text-xs cursor-pointer ${
                      fontSize === 'lg' ? 'bg-primary text-white border-primary' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Cỡ chữ lớn"
                  >
                    A+
                  </button>
                </div>
              </div>
            </div>

            {/* Passage Body Text with Live Mouse Selection */}
            <div 
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 text-justify select-text relative"
              onMouseUp={handlePassageMouseUp}
            >
              {/* Highlight helper tip */}
              <div className="flex items-center gap-1.5 text-[11px] text-gray-400 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 mb-2 select-none">
                <Highlighter size={12} className="text-amber-500" />
                <span>Mẹo: Bôi đen chữ bất kỳ trong bài đọc để <strong>Tô màu</strong> hoặc <strong>Ghi chú</strong></span>
              </div>

              <div className="border-b border-gray-100 pb-3 mb-4 select-none">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary">
                  IELTS Reading Passage {activePassage.number}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-gray-900 mt-1">
                  {activePassage.title}
                </h2>
              </div>

              {/* Passage HTML Container (supports dynamic marks and notes) */}
              <div 
                id="passage-container"
                ref={passageContainerRef}
                onClick={handlePassageClick}
                className={`text-gray-800 ${passageFontClass} font-normal space-y-4 leading-relaxed`}
                dangerouslySetInnerHTML={{ __html: passageHtmls[activePassageId] || '' }}
              />
            </div>

            {/* ========================================================== */}
            {/* FLOATING POPUP WHEN SELECTING TEXT (Like Test Platform)   */}
            {/* ========================================================== */}
            {selectionPopup && (
              <div 
                id="selection-popup"
                onMouseDown={(e) => e.preventDefault()}
                className="fixed z-50 bg-white rounded-2xl shadow-2xl border border-gray-200/95 p-1 flex items-center gap-1 text-gray-800 animate-pop-in select-none"
                style={{ 
                  left: selectionPopup.x, 
                  top: selectionPopup.y, 
                  transform: 'translate(-50%, -120%)' 
                }}
              >
                {/* 1. Highlight Button */}
                <button 
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => applyHighlight('yellow')} 
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-yellow-50 hover:text-amber-900 rounded-xl text-gray-700 text-xs font-bold transition-all cursor-pointer"
                  title="Tô màu vàng (Highlight)"
                >
                  <span className="w-3 h-3 rounded-full bg-yellow-300 border border-yellow-400 inline-block shadow-2xs" />
                  <Highlighter size={14} className="text-amber-600" />
                  <span>Tô màu</span>
                </button>

                <div className="w-px h-4 bg-gray-200 my-auto" />

                {/* 2. Note Button */}
                <button 
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={applyNote} 
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-amber-50 hover:text-amber-900 rounded-xl text-gray-700 text-xs font-bold transition-all cursor-pointer"
                  title="Tạo ghi chú cho đoạn này"
                >
                  <StickyNote size={14} className="text-amber-600" />
                  <span>Ghi chú</span>
                </button>

                <div className="w-px h-4 bg-gray-200 my-auto" />

                {/* 3. Copy Button */}
                <button 
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={handleCopySelectedText} 
                  className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl text-gray-700 text-xs font-bold transition-all cursor-pointer"
                  title="Sao chép đoạn trích này (Ctrl+C / Cmd+C)"
                >
                  <Copy size={14} className="text-emerald-600" />
                  <span>Sao chép</span>
                </button>
              </div>
            )}

            {/* ========================================================== */}
            {/* NOTE SIDEBAR / DRAWER (Right drawer for notes)            */}
            {/* ========================================================== */}
            {showNotesDrawer && (
              <aside 
                id="note-sidebar" 
                className="absolute right-0 top-0 bottom-0 w-80 sm:w-96 max-w-full bg-white border-l border-gray-200 shadow-2xl z-30 flex flex-col text-left animate-pop-in"
              >
                {/* Sidebar Header */}
                <div className="p-3.5 bg-gradient-to-r from-primary to-[#18316c] text-white flex items-center justify-between flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {activeNoteId ? (
                      <button
                        type="button"
                        onClick={() => setActiveNoteId(null)}
                        className="px-2 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                        title="Quay lại danh sách ghi chú"
                      >
                        <ArrowLeft size={13} />
                        <span>Danh sách</span>
                      </button>
                    ) : (
                      <StickyNote size={16} />
                    )}
                    <span className="font-extrabold text-xs sm:text-sm">
                      {activeNoteId ? 'Chỉnh sửa ghi chú' : `Ghi chú bài đọc ${activePassage.number}`}
                    </span>
                    {!activeNoteId && (
                      <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {currentPassageNotes.length}
                      </span>
                    )}
                  </div>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowNotesDrawer(false);
                      setActiveNoteId(null);
                    }} 
                    className="p-1 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Đóng ghi chú"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Sidebar Body */}
                <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-4">
                  {noteSuccessToast && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-pop-in">
                      <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0" />
                      <span>Đã lưu ghi chú thành công!</span>
                    </div>
                  )}

                  {activeNoteId && notes[activeNoteId] ? (
                    <div className="flex-1 flex flex-col space-y-3">
                      <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                          Đoạn trích dẫn:
                        </span>
                        <blockquote className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-xs italic text-gray-800 leading-snug">
                          "{notes[activeNoteId].text}"
                        </blockquote>
                      </div>

                      <div className="flex-1 flex flex-col">
                        <label className="text-[11px] font-bold text-gray-600 mb-1">
                          Nội dung ghi chú của bạn:
                        </label>
                        <textarea
                          autoFocus
                          rows={6}
                          value={draftNoteContent}
                          onChange={(e) => setDraftNoteContent(e.target.value)}
                          placeholder="Nhập ghi chú hoặc suy luận của bạn tại đây..."
                          className="w-full flex-1 p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(activeNoteId)}
                          className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 size={13} />
                          <span>Xóa</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleSaveNoteContent}
                          className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Save size={13} />
                          <span>Lưu ghi chú</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-gray-700">
                          Danh sách ghi chú ({currentPassageNotes.length}):
                        </p>
                      </div>

                      {currentPassageNotes.length === 0 ? (
                        <div className="p-6 text-center bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                          <StickyNote size={28} className="mx-auto text-gray-300" />
                          <p className="text-xs text-gray-500 font-medium">Chưa có ghi chú nào cho bài đọc này.</p>
                          <p className="text-[11px] text-gray-400">Bôi đen chữ bất kỳ trong bài đọc rồi chọn <strong>Ghi chú</strong> để thêm.</p>
                        </div>
                      ) : (
                        currentPassageNotes.map(n => (
                          <div 
                            key={n.id}
                            className="p-3.5 rounded-2xl border border-amber-200/90 bg-amber-50/50 hover:bg-amber-50 transition-all shadow-2xs space-y-2"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-1.5 text-xs font-bold text-amber-950 flex-1">
                                <Quote size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                                <span className="italic leading-snug line-clamp-2">"{n.text}"</span>
                              </div>
                              <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">
                                {n.createdAt || ''}
                              </span>
                            </div>

                            {n.content ? (
                              <p className="text-xs text-gray-800 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-amber-100/80 whitespace-pre-wrap">
                                {n.content}
                              </p>
                            ) : (
                              <p className="text-xs text-amber-700/60 italic bg-white/50 p-2 rounded-xl">
                                (Chưa nhập nội dung - Bấm Chỉnh sửa để thêm)
                              </p>
                            )}

                            <div className="flex items-center justify-between pt-1 border-t border-amber-200/50 text-xs">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveNoteId(n.id);
                                  setDraftNoteContent(n.content || '');
                                }}
                                className="text-primary hover:text-primary-container font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit3 size={12} />
                                <span>Chỉnh sửa</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteNote(n.id)}
                                className="text-gray-400 hover:text-rose-600 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                              >
                                <Trash2 size={12} />
                                <span>Xóa</span>
                              </button>
                            </div>
                          </div>
                        ))
                      )}

                      <div className="pt-2 text-center">
                        <p className="text-[11px] text-gray-400">
                          Mẹo: Bôi đen thêm từ hoặc câu trong bài đọc để tạo ghi chú mới.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </aside>
            )}
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
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-2 rounded-xl bg-gray-100 border border-gray-200 text-xs font-black text-gray-600 flex-shrink-0">
                            Box {q.number}
                          </span>
                          
                          <input
                            type="text"
                            disabled={isSubmitted}
                            value={userVal}
                            onChange={(e) => handleInputChange(q.id, e.target.value)}
                            onKeyDown={async (e) => {
                              // Ensure Ctrl+V on Mac or Windows triggers paste if needed
                              if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'v') {
                                if (navigator.clipboard?.readText) {
                                  try {
                                    const text = await navigator.clipboard.readText();
                                    if (text) {
                                      e.preventDefault();
                                      handleInputChange(q.id, text.trim());
                                    }
                                  } catch (err) {
                                    // fallback
                                  }
                                }
                              }
                            }}
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

                          {!isSubmitted && (
                            <button
                              type="button"
                              onClick={async () => {
                                try {
                                  const text = await navigator.clipboard.readText();
                                  if (text) {
                                    handleInputChange(q.id, text.trim());
                                  }
                                } catch (err) {
                                  console.error('Paste failed:', err);
                                }
                              }}
                              className="px-2.5 py-2.5 bg-gray-50 hover:bg-primary/5 hover:text-primary text-gray-500 rounded-xl border border-gray-200 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs flex-shrink-0"
                              title="Dán từ đã sao chép từ bài đọc vào ô này (Ctrl+V / Cmd+V)"
                            >
                              <ClipboardPaste size={14} />
                              <span className="hidden sm:inline">Dán</span>
                            </button>
                          )}
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

        {/* Floating Copy Feedback Toast */}
        {copyToast && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-pop-in border border-white/10">
            <Check size={15} className="text-emerald-400 flex-shrink-0" />
            <span>Đã sao chép vào bộ nhớ tạm! Bạn có thể nhấn Ctrl+V hoặc bấm nút "Dán" vào ô câu hỏi.</span>
          </div>
        )}
      </div>
    </div>
  );
}
