import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
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

// Helper to scroll an element smoothly inside a scrollable container without moving window.scrollY
function scrollChildIntoContainer(container, child, block = 'center') {
  if (!container || !child) return;
  const containerRect = container.getBoundingClientRect();
  const childRect = child.getBoundingClientRect();

  let targetScrollTop;
  if (block === 'start') {
    targetScrollTop = childRect.top - containerRect.top + container.scrollTop - 16;
  } else if (block === 'end') {
    targetScrollTop = childRect.bottom - containerRect.bottom + container.scrollTop + 16;
  } else {
    // center
    const offset = (containerRect.height - childRect.height) / 2;
    targetScrollTop = childRect.top - containerRect.top + container.scrollTop - offset;
  }

  container.scrollTo({
    top: Math.max(0, targetScrollTop),
    behavior: 'smooth'
  });
}

// Format raw text content into semantic HTML paragraphs
function formatPassageToHtml(content, title) {
  const paragraphs = content.split('\n\n').filter(p => p.trim() && p.trim() !== (title || '').trim());
  return paragraphs.map(p => {
    const trimmed = p.trim();
    if (trimmed.length < 80 && !trimmed.endsWith('.') && (trimmed.startsWith('Passage ') || trimmed.startsWith('New value') || trimmed.startsWith('Young people are') || trimmed.startsWith('Why youth travel') || trimmed.startsWith('Summary '))) {
      return `<h3 class="font-bold text-gray-900 text-base sm:text-lg mt-5 mb-2 pb-1 border-b border-gray-100">${trimmed}</h3>`;
    }
    return `<p class="leading-relaxed mb-4">${trimmed.replace(/\n/g, '<br/>')}</p>`;
  }).join('');
}

// Safely unwrap a DOM element, preserving its text and child nodes
function unwrapElement(el) {
  if (!el || !el.parentNode) return;
  const parent = el.parentNode;
  while (el.firstChild) {
    parent.insertBefore(el.firstChild, el);
  }
  parent.removeChild(el);
}

// Clean passage HTML by removing corrupt, empty, or orphan mark tags
function cleanPassageHtml(rawHtml, origContent, origTitle) {
  const fallback = formatPassageToHtml(origContent, origTitle);
  if (!rawHtml) return fallback;

  try {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHtml;

    // Remove any mark tags that have no text or only whitespace
    tempDiv.querySelectorAll('mark').forEach(m => {
      if (!m.textContent || !m.textContent.trim()) {
        unwrapElement(m);
      }
    });

    // Remove any legacy temporary selection marks
    tempDiv.querySelectorAll('#active-selection-mark').forEach(unwrapElement);

    // Remove any orphan mark that is directly a child of container and outside paragraphs
    Array.from(tempDiv.children).forEach(child => {
      if (child.tagName === 'MARK') {
        unwrapElement(child);
      }
    });

    // Verify text content integrity
    const origTextLen = origContent.replace(/\s+/g, ' ').trim().length;
    const savedTextLen = (tempDiv.textContent || '').replace(/\s+/g, ' ').trim().length;
    if (Math.abs(origTextLen - savedTextLen) > 30) {
      console.warn('Restoring passage HTML due to text loss');
      return fallback;
    }

    return tempDiv.innerHTML || fallback;
  } catch (err) {
    console.error('Error cleaning passage HTML:', err);
    return fallback;
  }
}

// Memoized Passage Renderer so parent state updates (like selectionPopup) do NOT re-render passage DOM
const PassageRenderer = React.memo(function PassageRenderer({
  html,
  fontClass,
  onClick,
  onMouseUp,
  containerRef
}) {
  return (
    <div
      id="passage-container"
      ref={containerRef}
      onClick={onClick}
      onMouseUp={onMouseUp}
      className={`text-gray-800 ${fontClass} font-normal space-y-4 leading-relaxed select-text`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
});

export default function ReadingHomeworkView({ 
  homework,
  mode = 'homework', // 'homework' | 'practice'
  parentPath = mode === 'practice' ? '/practice' : '/homework',
  parentLabel = mode === 'practice' ? 'Practice' : 'Homework',
  storagePrefix = mode === 'practice' ? 'dream_practice_' : 'dream_hw_',
  historyKey = mode === 'practice' ? 'dream_practice_history' : 'dream_homework_history'
}) {
  const navigate = useNavigate();
  const homeworkId = homework.id;

  // Active Passage Tab (p1 or p2)
  const [activePassageId, setActivePassageId] = useState(homework.passages?.[0]?.id || 'p1');

  // Answers state: { [qId]: string }
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}${homeworkId}_draft`);
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
  // Ref to the passage scroll container
  const passageScrollContainerRef = useRef(null);
  // Ref to the questions scroll container
  const questionsScrollContainerRef = useRef(null);
  // Ref to store cloned range across events
  const savedRangeRef = useRef(null);

  // Text selection popup state: { text, x, y }
  const [selectionPopup, setSelectionPopup] = useState(null);
  const [copyToast, setCopyToast] = useState(false);

  // Notes state: { [noteId]: { id, passageId, text, content, createdAt } }
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}${homeworkId}_notes`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Dedicated Notes Column Visibility (default is closed, only opens when student has notes or creates one)
  const [isNotesColumnOpen, setIsNotesColumnOpen] = useState(() => {
    try {
      const saved = localStorage.getItem(`${storagePrefix}${homeworkId}_notes`);
      if (!saved) return false;
      const parsedNotes = JSON.parse(saved);
      const initialPassageId = homework.passages?.[0]?.id || 'p1';
      return Object.values(parsedNotes).some(n => n.passageId === initialPassageId);
    } catch {
      return false;
    }
  });

  // If active passage changes and has no notes, default to closed
  useEffect(() => {
    const hasNotesForPassage = Object.values(notes).some(n => n.passageId === activePassageId);
    if (!hasNotesForPassage) {
      setIsNotesColumnOpen(false);
    }
  }, [activePassageId, notes]);

  // Active note opened in the right-hand Notes column
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [draftNoteContent, setDraftNoteContent] = useState('');
  const [noteSuccessToast, setNoteSuccessToast] = useState(false);

  // Stored HTML for each passage (including rendered highlights/notes)
  const [passageHtmls, setPassageHtmls] = useState(() => {
    const initial = {};
    homework.passages?.forEach(p => {
      const saved = localStorage.getItem(`${storagePrefix}${homeworkId}_${p.id}_html`);
      initial[p.id] = cleanPassageHtml(saved, p.content, p.title);
    });
    return initial;
  });

  // Auto-clean any corrupt/empty mark tags and repair damaged HTML from local storage on mount
  useEffect(() => {
    homework.passages?.forEach(p => {
      const key = `${storagePrefix}${homeworkId}_${p.id}_html`;
      try {
        const val = localStorage.getItem(key);
        if (val) {
          const cleaned = cleanPassageHtml(val, p.content, p.title);
          if (cleaned !== val) {
            localStorage.setItem(key, cleaned);
            setPassageHtmls(prev => ({ ...prev, [p.id]: cleaned }));
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  }, [homeworkId, homework.passages, storagePrefix]);

  // Load past submission from history if exists
  useEffect(() => {
    try {
      const history = localStorage.getItem(historyKey);
      if (history) {
        const parsed = JSON.parse(history);
        if (parsed[homeworkId]) {
          setIsSubmitted(true);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [homeworkId, historyKey]);

  // Keep page anchored at top on mount so header/tabs are fully visible
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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

  // Active focused question id for footer and list sync
  const [activeQuestionId, setActiveQuestionId] = useState(() => {
    return homework.passages?.[0]?.questions?.[0]?.id || null;
  });

  useEffect(() => {
    if (!activeQuestionId && allQuestions.length > 0) {
      setActiveQuestionId(allQuestions[0].id);
    }
  }, [allQuestions, activeQuestionId]);

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

  // Container ref for measuring widths when dragging
  const splitContainerRef = useRef(null);

  // Active drag divider: null | 'divider1' | 'divider2'
  const [activeDragDivider, setActiveDragDivider] = useState(null);

  // Responsive check for desktop split screen (>= 1024px)
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth >= 1024;
  });

  useEffect(() => {
    const handleWindowResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  // Split ratio for 2 columns (Passage vs Questions) - stores passage percentage (25 to 75)
  const [splitRatio2Col, setSplitRatio2Col] = useState(() => {
    try {
      const saved = localStorage.getItem('dream_reading_split_2col');
      if (saved) {
        const val = Number(JSON.parse(saved));
        if (val >= 25 && val <= 75) return val;
      }
    } catch (e) {}
    return 50; // default 50/50
  });

  // Split ratio for 3 columns (Passage, Questions, Notes) - sum = 100
  const [splitRatio3Col, setSplitRatio3Col] = useState(() => {
    try {
      const saved = localStorage.getItem('dream_reading_split_3col');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.passage && parsed.questions && parsed.notes) {
          return parsed;
        }
      }
    } catch (e) {}
    return { passage: 44, questions: 34, notes: 22 };
  });

  // Current widths based on whether notes column is open
  const currentPassageWidth = isNotesColumnOpen ? splitRatio3Col.passage : splitRatio2Col;
  const currentQuestionsWidth = isNotesColumnOpen ? splitRatio3Col.questions : (100 - splitRatio2Col);
  const currentNotesWidth = isNotesColumnOpen ? splitRatio3Col.notes : 0;

  // Start dragging a divider
  const startDragging = (dividerName, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDragDivider(dividerName);
  };

  // Reset split ratios to default on double-click
  const resetSplit = useCallback(() => {
    setSplitRatio2Col(50);
    setSplitRatio3Col({ passage: 44, questions: 34, notes: 22 });
    try {
      localStorage.removeItem('dream_reading_split_2col');
      localStorage.removeItem('dream_reading_split_3col');
    } catch (e) {}
  }, []);

  // Dragging mousemove handler
  const handleMouseMove = useCallback((e) => {
    if (!activeDragDivider || !splitContainerRef.current) return;
    const rect = splitContainerRef.current.getBoundingClientRect();
    if (!rect.width) return;

    if (activeDragDivider === 'divider1') {
      const mouseX = e.clientX - rect.left;
      const pct = (mouseX / rect.width) * 100;

      if (!isNotesColumnOpen) {
        // 2 columns: clamp between 25% and 75%
        const clamped = Math.min(75, Math.max(25, pct));
        setSplitRatio2Col(Math.round(clamped * 10) / 10);
      } else {
        // 3 columns: clamp passage width
        const notesPct = splitRatio3Col.notes;
        const maxPassage = 100 - notesPct - 25; // keep at least 25% for questions
        const clampedPassage = Math.min(maxPassage, Math.max(25, pct));
        const newQuestions = 100 - notesPct - clampedPassage;
        setSplitRatio3Col(prev => ({
          ...prev,
          passage: Math.round(clampedPassage * 10) / 10,
          questions: Math.round(newQuestions * 10) / 10
        }));
      }
    } else if (activeDragDivider === 'divider2' && isNotesColumnOpen) {
      const mouseFromRight = rect.right - e.clientX;
      const notesPct = (mouseFromRight / rect.width) * 100;
      const clampedNotes = Math.min(35, Math.max(15, notesPct));

      const remainingForPAndQ = 100 - clampedNotes;
      let newPassage = splitRatio3Col.passage;
      let newQuestions = remainingForPAndQ - newPassage;

      if (newQuestions < 25) {
        newQuestions = 25;
        newPassage = remainingForPAndQ - 25;
      } else if (newPassage < 25) {
        newPassage = 25;
        newQuestions = remainingForPAndQ - 25;
      }

      setSplitRatio3Col({
        passage: Math.round(newPassage * 10) / 10,
        questions: Math.round(newQuestions * 10) / 10,
        notes: Math.round(clampedNotes * 10) / 10
      });
    }
  }, [activeDragDivider, isNotesColumnOpen, splitRatio3Col]);

  // Mouse up handler
  const handleMouseUp = useCallback(() => {
    if (activeDragDivider) {
      setActiveDragDivider(null);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      try {
        localStorage.setItem('dream_reading_split_2col', JSON.stringify(splitRatio2Col));
        localStorage.setItem('dream_reading_split_3col', JSON.stringify(splitRatio3Col));
      } catch (err) {}
    }
  }, [activeDragDivider, splitRatio2Col, splitRatio3Col]);

  useEffect(() => {
    if (activeDragDivider) {
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };
    }
  }, [activeDragDivider, handleMouseMove, handleMouseUp]);

  // Handle Input Change for answers
  const handleInputChange = (qId, val) => {
    if (isSubmitted) return;
    setActiveQuestionId(qId);
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
        localStorage.setItem(`${storagePrefix}${homeworkId}_${activePassageId}_html`, currentHtml);
      } catch (e) {
        console.error(e);
      }
    }
  }, [activePassageId, homeworkId, storagePrefix]);

  // Text selection listener on the passage
  const handlePassageMouseUp = useCallback((e) => {
    // Only proceed on primary mouse button
    if (e.button !== undefined && e.button !== 0) return;

    // If clicking popup or buttons or input, do nothing
    if (
      e.target.closest('#selection-popup') || 
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('textarea')
    ) {
      return;
    }

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      setSelectionPopup(null);
      savedRangeRef.current = null;
      return;
    }

    // Ensure selection is strictly inside passage container
    if (passageContainerRef.current && passageContainerRef.current.contains(selection.anchorNode)) {
      const text = selection.toString().trim();
      if (!text) {
        setSelectionPopup(null);
        savedRangeRef.current = null;
        return;
      }

      const range = selection.getRangeAt(0);
      savedRangeRef.current = range.cloneRange();
      const rect = range.getBoundingClientRect();

      setSelectionPopup({
        text,
        x: Math.max(120, Math.min(window.innerWidth - 120, rect.left + rect.width / 2)),
        y: Math.max(70, rect.top - 8)
      });
    } else {
      setSelectionPopup(null);
      savedRangeRef.current = null;
    }
  }, []);

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
        const text = !selection?.isCollapsed ? selection?.toString().trim() : '';
        if (text) {
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

  // 1. Apply Color Highlight (paints the text yellow)
  const applyHighlight = (color = 'yellow') => {
    let range = null;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      range = selection.getRangeAt(0);
    } else if (savedRangeRef.current) {
      range = savedRangeRef.current;
    }

    if (!range || range.collapsed || !range.toString().trim()) {
      setSelectionPopup(null);
      savedRangeRef.current = null;
      return;
    }

    const highlightId = `hl-${Date.now()}`;
    const mark = document.createElement('mark');
    mark.id = highlightId;
    mark.dataset.highlightId = highlightId;
    mark.dataset.annotationType = 'highlight';
    mark.className = 'annotation-mark';
    mark.setAttribute(
      'style',
      'background-color: #fef08a !important; color: #111827 !important; padding: 2px 4px !important; border-radius: 4px !important; cursor: pointer !important; display: inline !important; -webkit-box-decoration-break: clone; box-decoration-break: clone;'
    );
    mark.title = 'Bấm để xóa tô màu';

    let success = false;
    try {
      range.surroundContents(mark);
      success = true;
    } catch (wrapErr) {
      try {
        const fragment = range.extractContents();
        if (fragment.textContent && fragment.textContent.trim()) {
          mark.appendChild(fragment);
          range.insertNode(mark);
          success = true;
        }
      } catch (e2) {
        console.error('Highlight failed:', e2);
      }
    }

    if (success && mark.textContent && mark.textContent.trim() && passageContainerRef.current) {
      const newHtml = passageContainerRef.current.innerHTML;
      setPassageHtmls(prev => ({
        ...prev,
        [activePassageId]: newHtml
      }));
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_${activePassageId}_html`, newHtml);
      } catch (e) {
        console.error(e);
      }
    } else if (!success || !mark.textContent || !mark.textContent.trim()) {
      unwrapElement(mark);
    }

    window.getSelection()?.removeAllRanges();
    savedRangeRef.current = null;
    setSelectionPopup(null);
  };

  // 2. Apply Note (marks text in amber and focuses the dedicated Notes Column on the right)
  const applyNote = () => {
    let range = null;
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0 && !selection.isCollapsed) {
      range = selection.getRangeAt(0);
    } else if (savedRangeRef.current) {
      range = savedRangeRef.current;
    }

    if (!range || range.collapsed || !range.toString().trim()) {
      setSelectionPopup(null);
      savedRangeRef.current = null;
      return;
    }

    const selectedText = selectionPopup?.text || range.toString().trim();
    if (!selectedText) {
      setSelectionPopup(null);
      savedRangeRef.current = null;
      return;
    }

    const noteId = `note-${Date.now()}`;
    const mark = document.createElement('mark');
    mark.id = noteId;
    mark.dataset.noteId = noteId;
    mark.dataset.annotationId = noteId;
    mark.dataset.annotationType = 'note';
    mark.className = 'annotation-note';
    mark.setAttribute(
      'style',
      'background-color: #fde68a !important; color: #451a03 !important; border-bottom: 2px solid #d97706 !important; padding: 2px 4px !important; border-radius: 4px !important; font-weight: 600 !important; cursor: pointer !important; display: inline !important; -webkit-box-decoration-break: clone; box-decoration-break: clone;'
    );
    mark.title = 'Bấm để xem/sửa ghi chú';

    let success = false;
    try {
      range.surroundContents(mark);
      success = true;
    } catch (wrapErr) {
      try {
        const fragment = range.extractContents();
        if (fragment.textContent && fragment.textContent.trim()) {
          mark.appendChild(fragment);
          range.insertNode(mark);
          success = true;
        }
      } catch (e2) {
        console.error('Note wrap failed:', e2);
      }
    }

    if (success && mark.textContent && mark.textContent.trim() && passageContainerRef.current) {
      const newHtml = passageContainerRef.current.innerHTML;
      setPassageHtmls(prev => ({
        ...prev,
        [activePassageId]: newHtml
      }));
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_${activePassageId}_html`, newHtml);
      } catch (e) {
        console.error(e);
      }
    } else if (!success || !mark.textContent || !mark.textContent.trim()) {
      unwrapElement(mark);
      setSelectionPopup(null);
      savedRangeRef.current = null;
      return;
    }

    window.getSelection()?.removeAllRanges();
    savedRangeRef.current = null;
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
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_notes`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Automatically expand the right-hand Notes Column and focus editor
    setIsNotesColumnOpen(true);
    setActiveNoteId(noteId);
    setDraftNoteContent('');
  };

  // 3. Copy selected text to clipboard
  const handleCopySelectedText = async () => {
    const textToCopy = selectionPopup?.text || window.getSelection()?.toString().trim();
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }

    setSelectionPopup(null);
  };

  // Click on existing highlight or note inside the passage container
  const handlePassageClick = useCallback((e) => {
    const mark = e.target.closest('mark');
    if (!mark) return;

    const noteId = mark.dataset.noteId || mark.dataset.annotationId;
    const highlightId = mark.dataset.highlightId;
    const type = mark.dataset.annotationType;

    if (type === 'note' || (noteId && noteId.startsWith('note-'))) {
      e.stopPropagation();
      setIsNotesColumnOpen(true);
      setActiveNoteId(noteId);
      if (notes[noteId]) {
        setDraftNoteContent(notes[noteId].content || '');
      }
    } else if (highlightId || type === 'highlight') {
      e.stopPropagation();
      const confirmRemove = window.confirm('Bạn có muốn xóa đoạn tô màu (highlight) này không?');
      if (confirmRemove) {
        unwrapElement(mark);
        saveCurrentPassageHtml();
      }
    }
  }, [notes, saveCurrentPassageHtml]);

  // Save Note Content in the right-hand Notes Column
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
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_notes`, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    setActiveNoteId(null);
    setNoteSuccessToast(true);
    setTimeout(() => setNoteSuccessToast(false), 2500);
  };

  // Delete Note and remove underline mark
  const handleDeleteNote = (noteId) => {
    const confirmDelete = window.confirm('Bạn có muốn xóa ghi chú này và hủy đánh dấu trong bài đọc?');
    if (!confirmDelete) return;

    const mark = passageContainerRef.current?.querySelector(`mark[data-note-id="${noteId}"]`);
    if (mark) {
      unwrapElement(mark);
      saveCurrentPassageHtml();
    }

    setNotes(prev => {
      const next = { ...prev };
      delete next[noteId];
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_notes`, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      const remaining = Object.values(next).filter(n => n.passageId === activePassageId);
      if (remaining.length === 0) {
        setIsNotesColumnOpen(false);
      }
      return next;
    });

    if (activeNoteId === noteId) {
      setActiveNoteId(null);
    }
  };

  // Clear all notes for active passage
  const handleClearAllNotes = () => {
    const confirmClear = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ ghi chú của bài đọc này?');
    if (!confirmClear) return;

    if (passageContainerRef.current) {
      passageContainerRef.current.querySelectorAll('mark[data-annotation-type="note"], mark[data-note-id]').forEach(unwrapElement);
      saveCurrentPassageHtml();
    }

    setNotes(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(k => {
        if (next[k].passageId === activePassageId) delete next[k];
      });
      try {
        localStorage.setItem(`${storagePrefix}${homeworkId}_notes`, JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });

    setActiveNoteId(null);
    setIsNotesColumnOpen(false);
  };

  // Scroll to note mark in passage from Notes Column
  const handleScrollToNoteMark = (noteId) => {
    if (passageContainerRef.current) {
      const mark = passageContainerRef.current.querySelector(`mark[data-note-id="${noteId}"]`);
      if (mark) {
        if (passageScrollContainerRef.current) {
          scrollChildIntoContainer(passageScrollContainerRef.current, mark, 'center');
        }
        mark.classList.add('animate-correct-glow');
        setTimeout(() => mark.classList.remove('animate-correct-glow'), 1200);
      }
    }
  };

  // Reset / Clear all highlights & notes for active passage
  const handleClearAllAnnotations = () => {
    const confirmClear = window.confirm('Bạn có chắc chắn muốn xóa toàn bộ các đoạn tô màu và ghi chú của bài đọc này?');
    if (!confirmClear) return;

    const activePassage = homework.passages?.find(p => p.id === activePassageId) || homework.passages?.[0];
    const original = formatPassageToHtml(activePassage.content, activePassage.title);

    setPassageHtmls(prev => ({
      ...prev,
      [activePassageId]: original
    }));

    try {
      localStorage.removeItem(`${storagePrefix}${homeworkId}_${activePassageId}_html`);
      setNotes(prev => {
        const next = { ...prev };
        Object.keys(next).forEach(k => {
          if (next[k].passageId === activePassageId) delete next[k];
        });
        localStorage.setItem(`${storagePrefix}${homeworkId}_notes`, JSON.stringify(next));
        return next;
      });
    } catch (e) {
      console.error(e);
    }

    setActiveNoteId(null);
    setIsNotesColumnOpen(false);
  };

  // Save Draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`${storagePrefix}${homeworkId}_draft`, JSON.stringify(answers));
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
      const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '{}');
      currentHistory[homeworkId] = {
        score: evaluationResults.correctCount,
        total: evaluationResults.totalCount,
        submittedAt: new Date().toISOString()
      };
      localStorage.setItem(historyKey, JSON.stringify(currentHistory));
      localStorage.setItem(`${storagePrefix}${homeworkId}_draft`, JSON.stringify(answers));
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
      localStorage.removeItem(`${storagePrefix}${homeworkId}_draft`);
      const currentHistory = JSON.parse(localStorage.getItem(historyKey) || '{}');
      delete currentHistory[homeworkId];
      localStorage.setItem(historyKey, JSON.stringify(currentHistory));
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
      if (filterMode !== 'all') {
        return q.sectionId === filterMode || q.passageId === filterMode;
      }
      return true;
    });
  }, [allQuestions, filterMode, evaluationResults.results]);

  // Navigation helpers for footer and bi-directional passage sync
  const currentQIndex = allQuestions.findIndex(q => q.id === activeQuestionId);
  const isFirstQuestion = currentQIndex <= 0;
  const isLastQuestion = currentQIndex >= allQuestions.length - 1;

  const scrollToQuestion = useCallback((questionId) => {
    const qObj = allQuestions.find(item => item.id === questionId);
    if (!qObj) return;

    setActiveQuestionId(questionId);

    // If question belongs to another passage, switch activePassageId
    if (qObj.passageId && qObj.passageId !== activePassageId) {
      setActivePassageId(qObj.passageId);
      if (passageScrollContainerRef.current) {
        passageScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // If filterMode is set to a specific passage/section that hides this question, update filterMode
    if (filterMode !== 'all' && filterMode !== 'wrong_only' && filterMode !== qObj.passageId) {
      setFilterMode(qObj.passageId);
    }

    setTimeout(() => {
      const el = document.getElementById(`homework-question-${questionId}`);
      if (el && questionsScrollContainerRef.current) {
        scrollChildIntoContainer(questionsScrollContainerRef.current, el, 'center');
      }
    }, 60);
  }, [allQuestions, activePassageId, filterMode]);

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      scrollToQuestion(allQuestions[currentQIndex - 1].id);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < allQuestions.length - 1) {
      scrollToQuestion(allQuestions[currentQIndex + 1].id);
    }
  };

  const activePassage = homework.passages.find(p => p.id === activePassageId) || homework.passages[0];

  const passageFontClass = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose'
  }[fontSize];

  const cleanTitle = (homework?.title || '').replace(/^E\s*[-–—]\s*/i, '');

  return (
    <div className="pt-20 pb-24 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link to={parentPath} className="hover:text-primary transition-colors font-medium">{parentLabel}</Link>
            <span>/</span>
            <span className="text-gray-900 font-bold truncate max-w-xs">{cleanTitle}</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={parentPath}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-xl border border-gray-200 shadow-2xs"
            >
              <ArrowLeft size={14} />
              <span>Tất cả bài {mode === 'practice' ? 'luyện tập' : 'tập'}</span>
            </Link>

            {(homework.vocabId || homework.id === 'pre-ielts-reading-1') && (
              <Link
                to={homework.vocabId ? `/vocab/${homework.vocabId}` : "/vocab/pre-ielts-reading-1"}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs transition-colors"
              >
                <BookOpen size={14} className="text-amber-600" />
                <span>Học từ vựng bài đọc</span>
              </Link>
            )}
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
                  <span>{homework.skillBadge || 'IELTS Reading'}</span>
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {homework.session}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {cleanTitle}
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
                    Tất cả ({allQuestions.length})
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

        {/* MAIN IELTS 3-COLUMN SPLIT SCREEN (Passage | Questions | Dedicated Notes Column) WITH RESIZABLE DIVIDERS */}
        <div 
          ref={splitContainerRef}
          className="flex flex-col lg:flex-row gap-4 lg:gap-0 h-auto lg:h-[calc(100vh-270px)] min-h-[600px] relative select-text"
        >
          
          {/* ============================================================== */}
          {/* COLUMN 1: READING PASSAGE TEXT WITH LIVE HIGHLIGHT & NOTE       */}
          {/* ============================================================== */}
          <div 
            style={{ 
              width: isDesktop ? `calc(${currentPassageWidth}% - ${isNotesColumnOpen ? '8px' : '6px'})` : '100%',
              minWidth: isDesktop ? '260px' : 'auto'
            }}
            className={`bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden relative flex-shrink-0 ${
              activeDragDivider ? '' : 'transition-[width] duration-150'
            }`}
          >
            
            {/* Passage Selector Tabs, Annotation Tools & Font Controls */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              {/* Passage Tabs or Single Passage Badge */}
              {homework.passages?.length > 1 ? (
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-gray-200/80 shadow-2xs">
                  {homework.passages.map(p => {
                    const isActive = activePassageId === p.id;
                    const minQ = p.questions?.[0]?.number || 1;
                    const maxQ = p.questions?.[p.questions.length - 1]?.number || minQ;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setActivePassageId(p.id);
                          setActiveNoteId(null);
                          setSelectionPopup(null);
                          setFilterMode(p.id);
                          if (passageScrollContainerRef.current) {
                            passageScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                          const firstQ = p.questions?.[0];
                          if (firstQ) {
                            setActiveQuestionId(firstQ.id);
                            setTimeout(() => {
                              if (questionsScrollContainerRef.current) {
                                questionsScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }, 60);
                          }
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
                          Câu {minQ}-{maxQ}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-2xl border border-gray-200/80 shadow-2xs">
                  <BookOpen size={14} className="text-primary" />
                  <span className="text-xs font-bold text-gray-800">
                    {activePassage.shortTitle || activePassage.title || 'Bài đọc chính'}
                  </span>
                </div>
              )}

              {/* Annotation Indicators & Font Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Dedicated Notes Column Toggle */}
                <button
                  type="button"
                  onClick={() => setIsNotesColumnOpen(!isNotesColumnOpen)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border ${
                    isNotesColumnOpen
                      ? 'bg-amber-100/80 text-amber-900 border-amber-300'
                      : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 shadow-2xs'
                  }`}
                  title={isNotesColumnOpen ? "Ẩn cột ghi chú bên phải" : "Hiện cột ghi chú bên phải"}
                >
                  <StickyNote size={13} className="text-amber-600" />
                  <span>{currentPassageNotes.length} Ghi chú</span>
                </button>

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
              ref={passageScrollContainerRef}
              className="flex-1 overflow-y-auto p-6 sm:p-7 space-y-4 text-justify select-text relative"
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

              {/* Memoized Passage Content Container */}
              <PassageRenderer 
                html={passageHtmls[activePassageId] || ''}
                fontClass={passageFontClass}
                onClick={handlePassageClick}
                onMouseUp={handlePassageMouseUp}
                containerRef={passageContainerRef}
              />
            </div>

            {/* FLOATING POPUP WHEN SELECTING TEXT */}
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
          </div>

          {/* DRAGGABLE RESIZER 1 (Between Passage & Questions) */}
          <div
            role="separator"
            aria-orientation="vertical"
            title="Kéo sang trái/phải để chỉnh kích cỡ giữa Bài đọc và Bảng câu hỏi (Nhấp đúp để đặt lại mặc định)"
            onMouseDown={(e) => startDragging('divider1', e)}
            onDoubleClick={resetSplit}
            className={`hidden lg:flex w-3 items-center justify-center cursor-col-resize select-none group z-10 flex-shrink-0 relative rounded-full transition-colors mx-0.5 ${
              activeDragDivider === 'divider1' ? 'bg-primary/10' : 'hover:bg-primary/5'
            }`}
          >
            <div className={`w-1 h-12 rounded-full transition-all flex flex-col items-center justify-center gap-1 ${
              activeDragDivider === 'divider1'
                ? 'bg-primary w-1.5 shadow-xs'
                : 'bg-gray-300 group-hover:bg-primary/70 group-hover:w-1.5'
            }`}>
              <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
              <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
              <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMN 2: QUESTIONS                                            */}
          {/* ============================================================== */}
          <div 
            style={{ 
              width: isDesktop ? `calc(${currentQuestionsWidth}% - ${isNotesColumnOpen ? '8px' : '6px'})` : '100%',
              minWidth: isDesktop ? '280px' : 'auto'
            }}
            className={`bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden flex-shrink-0 ${
              activeDragDivider ? '' : 'transition-[width] duration-150'
            }`}
          >
            
            {/* Right Pane Navigation Header */}
            <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50/70 flex flex-wrap items-center justify-between gap-2 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                  <FileText size={15} />
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold text-gray-900">
                    Bảng câu hỏi ({displayedQuestions.length} câu)
                  </h3>
                </div>
              </div>

              {/* Jump to part tabs (if multiple passages) */}
              {homework.passages?.length > 1 && (
                <div className="flex items-center gap-1 text-xs">
                  {homework.passages.map(p => {
                    const minQ = p.questions?.[0]?.number || 1;
                    const maxQ = p.questions?.[p.questions.length - 1]?.number || minQ;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setFilterMode(p.id);
                          setActivePassageId(p.id);
                          if (passageScrollContainerRef.current) {
                            passageScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                          const firstQ = p.questions?.[0];
                          if (firstQ) {
                            setActiveQuestionId(firstQ.id);
                            setTimeout(() => {
                              if (questionsScrollContainerRef.current) {
                                questionsScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                              }
                            }, 60);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                          filterMode === p.id ? 'bg-primary text-white border-primary shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        Phần {p.number} ({minQ}–{maxQ})
                      </button>
                    );
                  })}
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
              )}

              {/* Jump to section tabs (if single passage with multiple sections) */}
              {homework.passages?.length === 1 && homework.sections?.length > 1 && (
                <div className="flex items-center gap-1 text-xs">
                  {homework.sections.map(sec => (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setFilterMode(sec.id)}
                      className={`px-2.5 py-1 rounded-lg font-bold border transition-all cursor-pointer ${
                        filterMode === sec.id ? 'bg-primary text-white border-primary shadow-2xs' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {sec.shortTitle || sec.title}
                    </button>
                  ))}
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
              )}
            </div>

            {/* Questions Body (Independently scrollable) */}
            <div 
              ref={questionsScrollContainerRef}
              className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6"
            >
              
              {/* Official IELTS Rule Instruction Callout */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 text-xs sm:text-sm text-blue-950">
                <div className="flex items-start gap-2.5">
                  <Info size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-extrabold text-primary mb-1">
                      HƯỚNG DẪN LÀM BÀI (IELTS INSTRUCTION):
                    </h4>
                    <p className="font-semibold text-gray-800 leading-snug">
                      {activePassage.instruction || `Answer the questions below using ${activePassage.wordLimit || 'NO MORE THAN THREE WORDS'} from the passage.`}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1">
                      * Lưu ý: Quy tắc giới hạn từ: <span className="underline font-black text-rose-700">{activePassage.wordLimit || 'NO MORE THAN THREE WORDS'}</span>. Lấy từ ngữ chính xác trực tiếp từ bài đọc.
                    </p>
                  </div>
                </div>
              </div>

              {/* Passage Diagram / Flowchart Image (if provided) */}
              {activePassage.diagramImage && (filterMode === 'all' || filterMode === activePassage.id) && (
                <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-xs flex flex-col items-center">
                  {activePassage.diagramTitle && (
                    <h5 className="font-bold text-gray-800 text-xs sm:text-sm mb-2.5 text-center uppercase tracking-wide">
                      {activePassage.diagramTitle}
                    </h5>
                  )}
                  <img
                    src={activePassage.diagramImage}
                    alt={activePassage.diagramTitle || 'IELTS Diagram'}
                    className="max-h-[380px] w-auto max-w-full object-contain rounded-xl border border-gray-100 shadow-xs"
                  />
                  {activePassage.diagramCaption && (
                    <p className="text-[11px] text-gray-500 mt-2 text-center italic">
                      {activePassage.diagramCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-4">
                {displayedQuestions.map((q) => {
                  const userVal = answers[q.id] || '';
                  const wordCount = countWords(userVal);
                  const maxWords = q.maxWords || activePassage.maxWords || 3;
                  const wordLimitText = q.wordLimit || activePassage.wordLimit || 'NO MORE THAN THREE WORDS';
                  const isWordOverLimit = wordCount > maxWords;
                  const evalItem = evaluationResults.results[q.id];

                  let cardBorderClass = 'border-gray-200 hover:border-gray-300';
                  if (isSubmitted) {
                    cardBorderClass = evalItem?.isCorrect 
                      ? 'border-emerald-300 bg-emerald-50/30' 
                      : 'border-rose-300 bg-rose-50/30';
                  }

                  return (
                    <React.Fragment key={q.id}>
                      {/* Section Header Divider if question starts a new section */}
                      {q.isSectionStart && (filterMode === 'all' || filterMode === q.passageId) && (q.number > 1 || q.sectionTitle || q.sectionWordBank) && (
                        <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-950 mt-6 mb-2">
                          <div className="flex items-start gap-2.5">
                            <Info size={18} className="text-amber-700 flex-shrink-0 mt-0.5" />
                            <div className="w-full">
                              <h4 className="font-extrabold text-amber-900 mb-1">
                                {q.sectionTitle || 'PHẦN TIẾP THEO:'}
                              </h4>
                              {q.sectionInstruction && (
                                <p className="font-semibold text-gray-800 leading-snug">
                                  {q.sectionInstruction}
                                </p>
                              )}
                              {q.wordLimit && (
                                <p className="text-[11px] text-gray-600 mt-1">
                                  * Quy tắc giới hạn từ: <span className="underline font-black text-rose-700">{q.wordLimit}</span>. Lấy từ ngữ chính xác trực tiếp từ bài đọc.
                                </p>
                              )}

                              {/* Section Diagram / Image (if provided) */}
                              {q.sectionImage && (
                                <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 flex flex-col items-center">
                                  {q.sectionImageTitle && (
                                    <p className="font-bold text-gray-800 text-xs mb-2 text-center uppercase tracking-wide">
                                      {q.sectionImageTitle}
                                    </p>
                                  )}
                                  <img
                                    src={q.sectionImage}
                                    alt={q.sectionImageTitle || q.sectionTitle || 'Section Diagram'}
                                    className="max-h-[340px] w-auto max-w-full object-contain rounded-lg border border-gray-100 shadow-xs"
                                  />
                                  {q.sectionImageCaption && (
                                    <p className="text-[11px] text-gray-500 mt-1.5 text-center italic">
                                      {q.sectionImageCaption}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Word Bank if provided for this section */}
                              {q.sectionWordBank && q.sectionWordBank.length > 0 && (
                                <div className="mt-3 p-3 bg-white rounded-xl border border-amber-200 text-xs">
                                  <p className="font-black text-amber-900 mb-2 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                                    <Sparkles size={13} className="text-amber-600" />
                                    <span>Khung từ vựng lựa chọn (Word Box):</span>
                                  </p>
                                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                                    {q.sectionWordBank.map((wb) => (
                                      <div key={wb.letter} className="flex items-center gap-1.5 p-1.5 bg-gray-50 rounded-lg border border-gray-200">
                                        <span className="w-5 h-5 rounded-md bg-blue-100 text-primary font-black flex items-center justify-center text-[11px] flex-shrink-0">
                                          {wb.letter}
                                        </span>
                                        <span className="font-medium text-gray-800 truncate" title={wb.word}>
                                          {wb.word}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div 
                        id={`homework-question-${q.id}`}
                        onClick={() => setActiveQuestionId(q.id)}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all bg-white shadow-2xs ${cardBorderClass} ${
                          activeQuestionId === q.id ? 'ring-2 ring-primary/40 shadow-sm' : ''
                        }`}
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
                              {homework.passages?.length > 1 ? `Bài đọc ${q.passageNumber} • ` : ''}Box {q.number}{q.romanNumber ? ` (${q.romanNumber})` : ''}
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

                        {/* Multiple Choice / Pick from List Options if provided */}
                        {q.options && q.options.length > 0 && (
                          <div className="grid grid-cols-1 gap-2 my-3">
                            {q.options.map((opt) => {
                              const optLetter = opt.letter || opt.key || (typeof opt === 'string' ? opt.charAt(0) : '');
                              const optText = opt.text || (typeof opt === 'string' ? opt : '');
                              const cleanUser = (userVal || '').trim().toUpperCase();
                              const isSelected = cleanUser === optLetter.toUpperCase() || cleanUser === optText.toUpperCase();
                              
                              let optStyle = 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700';
                              if (isSelected && !isSubmitted) {
                                optStyle = 'border-primary bg-primary/10 text-primary font-bold shadow-xs ring-1 ring-primary/30';
                              } else if (isSubmitted) {
                                const isThisOptCorrect = (q.acceptedAnswers || []).some(a => 
                                  a.toUpperCase() === optLetter.toUpperCase() || a.toLowerCase() === optText.toLowerCase()
                                );
                                if (isThisOptCorrect) {
                                  optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                                } else if (isSelected && !evalItem?.isCorrect) {
                                  optStyle = 'border-rose-400 bg-rose-50 text-rose-950 line-through';
                                }
                              }

                              return (
                                <button
                                  key={optLetter}
                                  type="button"
                                  disabled={isSubmitted}
                                  onClick={() => handleInputChange(q.id, optLetter)}
                                  className={`text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 cursor-pointer ${optStyle}`}
                                >
                                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                                    isSelected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                                  }`}>
                                    {optLetter}
                                  </span>
                                  <span className="flex-1 leading-snug">{optText}</span>
                                </button>
                              );
                            })}
                          </div>
                        )}

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
                              onFocus={() => setActiveQuestionId(q.id)}
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
                              <span>Tối đa: {maxWords} từ {wordLimitText.includes('NUMBER') ? 'và/hoặc 1 chữ số' : ''}</span>
                              <span className={isWordOverLimit ? 'text-rose-600 font-bold' : ''}>
                                {wordCount} / {maxWords} từ {isWordOverLimit && '(Vượt quá giới hạn!)'}
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
                    </React.Fragment>
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

          {/* ============================================================== */}
          {/* COLUMN 3: DEDICATED NOTES COLUMN ON THE FAR RIGHT OF WEBPAGE    */}
          {/* ============================================================== */}
          {isNotesColumnOpen && (
            <>
              {/* DRAGGABLE RESIZER 2 (Between Questions & Notes) */}
              <div
                role="separator"
                aria-orientation="vertical"
                title="Kéo sang trái/phải để chỉnh kích cỡ giữa Bảng câu hỏi và Ghi chú (Nhấp đúp để đặt lại mặc định)"
                onMouseDown={(e) => startDragging('divider2', e)}
                onDoubleClick={resetSplit}
                className={`hidden lg:flex w-3 items-center justify-center cursor-col-resize select-none group z-10 flex-shrink-0 relative rounded-full transition-colors mx-0.5 ${
                  activeDragDivider === 'divider2' ? 'bg-primary/10' : 'hover:bg-primary/5'
                }`}
              >
                <div className={`w-1 h-12 rounded-full transition-all flex flex-col items-center justify-center gap-1 ${
                  activeDragDivider === 'divider2'
                    ? 'bg-primary w-1.5 shadow-xs'
                    : 'bg-gray-300 group-hover:bg-primary/70 group-hover:w-1.5'
                }`}>
                  <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
                  <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
                  <span className="w-0.5 h-0.5 rounded-full bg-white opacity-80" />
                </div>
              </div>

              <div 
                style={{ 
                  width: isDesktop ? `calc(${currentNotesWidth}% - 8px)` : '100%',
                  minWidth: isDesktop ? '220px' : 'auto'
                }}
                className={`bg-white rounded-3xl border border-gray-200/90 shadow-xs flex flex-col overflow-hidden text-left flex-shrink-0 ${
                  activeDragDivider ? '' : 'transition-[width] duration-150'
                }`}
              >
              {/* Header */}
              <div className="p-3 sm:p-4 border-b border-gray-100 bg-amber-50/70 flex items-center justify-between gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  {activeNoteId ? (
                    <button
                      type="button"
                      onClick={() => setActiveNoteId(null)}
                      className="px-2 py-1 bg-white hover:bg-amber-100 rounded-lg text-amber-900 border border-amber-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                      title="Quay lại danh sách ghi chú"
                    >
                      <ArrowLeft size={13} />
                      <span>Danh sách</span>
                    </button>
                  ) : (
                    <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      <StickyNote size={15} />
                    </span>
                  )}
                  <div>
                    <h3 className="text-xs sm:text-sm font-extrabold text-gray-900 flex items-center gap-1.5">
                      <span>{activeNoteId ? 'Sửa ghi chú' : `Ghi chú bài đọc ${activePassage.number}`}</span>
                      {!activeNoteId && (
                        <span className="bg-amber-200/80 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
                          {currentPassageNotes.length}
                        </span>
                      )}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {currentPassageNotes.length > 0 && !activeNoteId && (
                    <button
                      type="button"
                      onClick={handleClearAllNotes}
                      className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Xóa tất cả ghi chú của bài đọc này"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsNotesColumnOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    title="Thu gọn cột ghi chú"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col overflow-y-auto space-y-3">
                {noteSuccessToast && (
                  <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-pop-in">
                    <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0" />
                    <span>Đã lưu ghi chú thành công!</span>
                  </div>
                )}

                {activeNoteId && notes[activeNoteId] ? (
                  /* Editor mode */
                  <div className="flex-1 flex flex-col space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                        ĐOẠN TRÍCH DẪN:
                      </span>
                      <blockquote className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-xs italic text-gray-800 leading-snug">
                        "{notes[activeNoteId].text}"
                      </blockquote>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <label className="text-[11px] font-bold text-gray-600 mb-1">
                        Nội dung ghi chú của bạn:
                      </label>
                      <textarea
                        autoFocus
                        rows={7}
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

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveNoteId(null)}
                          className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="button"
                          onClick={handleSaveNoteContent}
                          className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Save size={13} />
                          <span>Lưu ghi chú</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* List mode */
                  <div className="space-y-3">
                    {currentPassageNotes.length === 0 ? (
                      <div className="p-6 text-center bg-gray-50 rounded-2xl border border-gray-100 space-y-2 mt-4">
                        <StickyNote size={30} className="mx-auto text-gray-300" />
                        <p className="text-xs text-gray-600 font-bold">Chưa có ghi chú nào cho bài đọc này.</p>
                        <p className="text-[11px] text-gray-400 leading-relaxed">
                          Bôi đen đoạn văn bản trong bài đọc rồi nhấn <strong>Ghi chú</strong> để lưu lại suy luận của bạn.
                        </p>
                      </div>
                    ) : (
                      currentPassageNotes.map(n => (
                        <div
                          key={n.id}
                          className="p-3 rounded-2xl border border-amber-200/90 bg-amber-50/50 hover:bg-amber-50/90 transition-all shadow-2xs space-y-2"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleScrollToNoteMark(n.id)}
                              className="flex items-start gap-1 text-xs font-bold text-amber-950 text-left hover:text-primary transition-colors cursor-pointer flex-1"
                              title="Bấm để cuộn đến đoạn này trong bài đọc"
                            >
                              <Quote size={12} className="text-amber-600 flex-shrink-0 mt-0.5" />
                              <span className="italic leading-snug line-clamp-2">"{n.text}"</span>
                            </button>
                            <span className="text-[10px] text-gray-400 font-medium flex-shrink-0">
                              {n.createdAt || ''}
                            </span>
                          </div>

                          {n.content ? (
                            <p className="text-xs text-gray-800 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-amber-100 whitespace-pre-wrap">
                              {n.content}
                            </p>
                          ) : (
                            <p className="text-xs text-amber-700/70 italic bg-white/50 p-2 rounded-xl">
                              (Chưa nhập nội dung - Bấm Sửa để thêm)
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
                              <span>Sửa</span>
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
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        </div>

        {/* Floating Copy Feedback Toast */}
        {copyToast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-gray-900/95 backdrop-blur-md text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 animate-pop-in border border-white/10">
            <Check size={15} className="text-emerald-400 flex-shrink-0" />
            <span>Đã sao chép vào bộ nhớ tạm! Bạn có thể nhấn Ctrl+V hoặc bấm nút "Dán" vào ô câu hỏi.</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* FIXED FOOTER QUESTION PALETTE: IELTS Exam Style Navigation */}
        {/* ========================================================================= */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 text-gray-900 shadow-2xl select-none">
          <div className="max-w-[1600px] mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Left: Scrollable Questions Palette by Part */}
            <div className="flex-1 overflow-x-auto flex items-center gap-4 sm:gap-6 py-1 no-scrollbar">
              {homework.passages?.map((part, pIdx) => {
                const isCurrent = activePassageId === part.id;
                const partQuestions = part.questions || [];
                const answeredInPart = partQuestions.filter(q => !!(answers[q.id] || '').trim()).length;
                const partLabel = `BÀI ĐỌC ${part.number || pIdx + 1}`;

                return (
                  <div key={part.id} className="flex items-center gap-2 shrink-0">
                    {/* Current Active Part: Part Header + Question Numbers with Top Dashes */}
                    {isCurrent ? (
                      <div className="flex items-center gap-2.5 sm:gap-3 bg-gray-50/80 px-2 py-1 rounded-xl border border-gray-200/60">
                        {/* Part Label with top segment line */}
                        <div className="flex flex-col items-center shrink-0">
                          <div className="w-full h-[2.5px] rounded-full mb-1 bg-primary" />
                          <span className="text-[11px] sm:text-xs font-black tracking-wide uppercase px-1 text-primary">
                            {partLabel}
                          </span>
                        </div>

                        {/* Question numbers horizontally with individual dash above each */}
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          {partQuestions.map((q) => {
                            const isAns = !!(answers[q.id] || '').trim();
                            const isActive = activeQuestionId === q.id;
                            const evalResult = evaluationResults.results[q.id];
                            const isCorrect = isSubmitted && evalResult?.isCorrect;

                            return (
                              <button
                                key={q.id}
                                type="button"
                                onClick={() => scrollToQuestion(q.id)}
                                className="group flex flex-col items-center cursor-pointer p-0.5 focus:outline-none transition-all"
                                title={`Câu ${q.number}${isAns ? ' (Đã trả lời)' : ' (Chưa làm)'}`}
                              >
                                {/* Top dash indicator */}
                                <span
                                  className={`w-3.5 h-[2px] rounded-full mb-1 transition-all ${
                                    isSubmitted
                                      ? isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                                      : isAns
                                        ? 'bg-primary'
                                        : 'bg-slate-300 group-hover:bg-slate-400'
                                  }`}
                                />

                                {/* Question number pill / outline */}
                                <div
                                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs font-bold transition-all ${
                                    isSubmitted
                                      ? isCorrect
                                        ? 'bg-emerald-500 text-white font-black shadow-xs'
                                        : 'bg-rose-500 text-white font-black shadow-xs'
                                      : isActive
                                        ? 'border-2 border-primary text-primary bg-primary/10 font-black scale-105 shadow-2xs'
                                        : 'text-slate-700 hover:text-primary hover:bg-white'
                                  }`}
                                >
                                  {q.number}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      /* Inactive Part Button (e.g. BÀI ĐỌC 2   0 of 9) with full-width top line */
                      <button
                        type="button"
                        onClick={() => {
                          setActivePassageId(part.id);
                          setFilterMode(part.id);
                          if (passageScrollContainerRef.current) {
                            passageScrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                          const firstQ = partQuestions[0];
                          if (firstQ) {
                            scrollToQuestion(firstQ.id);
                          }
                        }}
                        className="group flex flex-col items-start cursor-pointer transition-all hover:opacity-100 opacity-75 px-1 py-0.5"
                        title={`Chuyển sang ${partLabel}`}
                      >
                        {/* Top horizontal line spanning the part */}
                        <div className="w-full h-[2.5px] rounded-full mb-1 transition-opacity bg-slate-300 group-hover:bg-primary/50" />
                        
                        <div className="flex items-center gap-1.5 py-0.5">
                          <span className="text-[11px] sm:text-xs font-black uppercase tracking-wide text-slate-800">
                            {partLabel}
                          </span>
                          <span className="text-[10px] sm:text-xs font-medium text-slate-500">
                            {answeredInPart} of {partQuestions.length}
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Navigation Controls: Arrows & Grade/Retake */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Arrow Left (Previous question) */}
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={isFirstQuestion}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Câu trước đó"
              >
                <ArrowLeft size={16} />
              </button>

              {/* Arrow Right (Next question) */}
              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={isLastQuestion}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                title="Câu tiếp theo"
              >
                <ArrowRight size={16} />
              </button>

              {/* Action Button (Submit or Retake) */}
              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="h-8 sm:h-9 px-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                  title="Chấm bài & Xem giải thích"
                >
                  <Check size={16} strokeWidth={2.8} />
                  <span className="hidden sm:inline">Chấm điểm</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleRetake}
                  className="h-8 sm:h-9 px-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  title="Làm lại bài này"
                >
                  <RotateCcw size={15} />
                  <span className="hidden sm:inline">Làm lại</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
