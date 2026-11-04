import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Menu, 
  Edit3, 
  ChevronDown, 
  Send, 
  Type, 
  LogOut, 
  ArrowLeft, 
  ArrowRight,
  Check,
  Moon,
  Highlighter,
  Search,
  Clock,
  Users,
  MessageSquare,
  Play,
  Pause,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  FileText
} from 'lucide-react';
import { EXAM_COLLECTIONS, FILTER_CATEGORIES } from '../data/examData';

export default function TestPlatform() {
  // Navigation states: 'library' | 'detail' | 'exam'
  const [currentView, setCurrentView] = useState('library');
  const [selectedExamId, setSelectedExamId] = useState('vol1-lis-1');
  
  // Library filters
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [librarySubTab, setLibrarySubTab] = useState('all'); // 'all' | 'shortened'
  
  // Detail page states
  const [detailTopTab, setDetailTopTab] = useState('info'); // 'info' | 'transcript'
  const [detailModeTab, setDetailModeTab] = useState('practice'); // 'practice' | 'fulltest' | 'discussion'
  const [selectedParts, setSelectedParts] = useState([1, 2, 3, 4]);
  const [practiceTimeLimit, setPracticeTimeLimit] = useState('');
  
  // Draft / Resume state
  const [draft, setDraft] = useState({
    exists: true,
    examId: 'vol1-lis-1',
    title: 'IELTS Collection 1 Listening Test 1',
    timestamp: '16/09/2026 09:07:22',
    answeredCount: 0,
    timeSpent: '0:01:45',
    mode: 'Full test',
    version: 'IELTS Test v1',
    userAnswers: {}
  });

  // Exam room states
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [activePartIndex, setActivePartIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [testScore, setTestScore] = useState(null);
  
  // Accessibility & Display Settings in Exam
  const [contrast, setContrast] = useState('standard'); // 'standard' | 'black-white' | 'white-black' | 'yellow-black'
  const [textSize, setTextSize] = useState('standard'); // 'standard' | 'large' | 'extra-large'
  const [showAccessibilityMenu, setShowAccessibilityMenu] = useState(false);
  
  // Audio Player State in Exam
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(1800);
  const [audioVolume, setAudioVolume] = useState(0.8);
  const audioRef = useRef(null);

  // Exam Timer
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Annotations & Notes
  const [selectionPopup, setSelectionPopup] = useState(null);
  const [notes, setNotes] = useState({}); // { [id]: { text: string, content: string } }
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [draftContent, setDraftContent] = useState('');

  // Get current selected exam object
  const currentExam = EXAM_COLLECTIONS.find(e => e.id === selectedExamId) || EXAM_COLLECTIONS[0];

  // Filter exams for library
  const filteredExams = EXAM_COLLECTIONS.filter(exam => {
    const matchesCategory = activeCategory === 'Tất cả' || exam.category === activeCategory || exam.tags.includes(activeCategory);
    const matchesSearch = !searchQuery.trim() || 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.skill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Timer Effect
  useEffect(() => {
    let timer;
    if (currentView === 'exam' && isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, isTimerRunning, timeLeft]);

  // Audio Progress listener
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => {
      setAudioProgress(audio.currentTime);
      setAudioDuration(audio.duration || 1800);
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [currentView]);

  // Handle Text Selection for Notes / Highlights
  const handleMouseUp = (e) => {
    if (e.target.closest('#selection-popup') || e.target.closest('#note-sidebar') || e.target.closest('input')) {
      return;
    }
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed && selection.toString().trim() !== '') {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionPopup({
        text: selection.toString(),
        x: rect.left + (rect.width / 2),
        y: rect.top - 10
      });
    } else {
      setSelectionPopup(null);
    }
  };

  const applyAnnotation = (type) => {
    if (!selectionPopup) return;
    if (type === 'note') {
      const noteId = `note-${Date.now()}`;
      setNotes(prev => ({
        ...prev,
        [noteId]: { text: selectionPopup.text, content: '' }
      }));
      setActiveNoteId(noteId);
      setDraftContent('');
    }
    setSelectionPopup(null);
  };

  const saveNoteContent = () => {
    if (activeNoteId) {
      setNotes(prev => ({
        ...prev,
        [activeNoteId]: { ...prev[activeNoteId], content: draftContent }
      }));
    }
  };

  const deleteNote = () => {
    if (activeNoteId) {
      setNotes(prev => {
        const next = { ...prev };
        delete next[activeNoteId];
        return next;
      });
      setActiveNoteId(null);
    }
  };

  // Start Test Handlers
  const handleStartPractice = () => {
    const minutes = practiceTimeLimit ? parseInt(practiceTimeLimit, 10) : currentExam.duration;
    setTimeLeft(minutes * 60);
    setIsTimerRunning(true);
    setIsTestSubmitted(false);
    setUserAnswers({});
    setActiveQuestion(1);
    setActivePartIndex(0);
    setCurrentView('exam');
  };

  const handleStartFullTest = () => {
    setTimeLeft(currentExam.duration * 60);
    setIsTimerRunning(true);
    setIsTestSubmitted(false);
    setUserAnswers({});
    setActiveQuestion(1);
    setActivePartIndex(0);
    setCurrentView('exam');
  };

  const handleResumeDraft = () => {
    setUserAnswers(draft.userAnswers || {});
    setTimeLeft(38 * 60 + 15); // Remaining from 0:01:45
    setIsTimerRunning(true);
    setIsTestSubmitted(false);
    setActiveQuestion(1);
    setActivePartIndex(0);
    setCurrentView('exam');
  };

  const handleClearDraft = () => {
    setDraft(prev => ({ ...prev, exists: false }));
  };

  const handleAnswerChange = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
    // Update draft count
    setDraft(prev => ({
      ...prev,
      exists: true,
      answeredCount: Object.keys({ ...prev.userAnswers, [qId]: val }).length,
      userAnswers: { ...prev.userAnswers, [qId]: val }
    }));
  };

  const handleQuitTest = (saveAsDraft = true) => {
    setIsTimerRunning(false);
    if (saveAsDraft) {
      setDraft({
        exists: true,
        examId: currentExam.id,
        title: currentExam.title,
        timestamp: new Date().toLocaleString('vi-VN'),
        answeredCount: Object.keys(userAnswers).length,
        timeSpent: formatTime(currentExam.duration * 60 - timeLeft),
        mode: 'Practice',
        version: 'IELTS Test v1',
        userAnswers
      });
    }
    setShowQuitModal(false);
    setCurrentView('detail');
  };

  const handleAutoSubmit = () => {
    setIsTimerRunning(false);
    calculateScore();
  };

  const calculateScore = () => {
    let correctCount = 0;
    const totalQuestions = 40;
    
    // Check Part 1 questions if available
    const part1 = currentExam.parts?.[0];
    if (part1?.questions) {
      part1.questions.forEach(q => {
        const userVal = (userAnswers[q.id] || '').trim().toLowerCase();
        if (q.acceptable && q.acceptable.some(ans => ans.toLowerCase() === userVal)) {
          correctCount++;
        } else if (q.answer && q.answer.toLowerCase() === userVal) {
          correctCount++;
        }
      });
    }

    // Rough conversion to IELTS Band (out of 40)
    let band = '4.0';
    if (correctCount >= 39) band = '9.0';
    else if (correctCount >= 37) band = '8.5';
    else if (correctCount >= 35) band = '8.0';
    else if (correctCount >= 32) band = '7.5';
    else if (correctCount >= 30) band = '7.0';
    else if (correctCount >= 26) band = '6.5';
    else if (correctCount >= 23) band = '6.0';
    else if (correctCount >= 18) band = '5.5';
    else if (correctCount >= 16) band = '5.0';
    else if (correctCount >= 13) band = '4.5';

    setTestScore({ correctCount, totalQuestions, band });
    setIsTestSubmitted(true);
    setShowSubmitModal(true);
  };

  // Helper formatting time seconds into mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Contrast Styling Map for Exam
  const contrastClasses = {
    standard: 'bg-[#f4f6fa] text-gray-900',
    'black-white': 'bg-white text-black',
    'white-black': 'bg-[#121212] text-white',
    'yellow-black': 'bg-[#000000] text-[#ffe600]'
  };

  const textSizeClasses = {
    standard: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl'
  };

  // ==========================================
  // VIEW 1: THƯ VIỆN ĐỀ THI (Matching Image 1)
  // ==========================================
  if (currentView === 'library') {
    return (
      <div className="pt-24 pb-16 bg-[#fafbfc] min-h-screen text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Thư viện đề thi</h1>

          {/* Filter Categories Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTER_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482] shadow-xs"
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button 
              onClick={() => {}}
              className="bg-[#2c4482] hover:bg-[#20325c] text-white px-8 py-3 rounded-lg font-medium text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              Tìm kiếm
            </button>
          </div>

          {/* Sub-tabs: Tất cả / Đề rút gọn */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            <button
              onClick={() => setLibrarySubTab('all')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                librarySubTab === 'all'
                  ? 'border-[#2c4482] text-[#2c4482]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setLibrarySubTab('shortened')}
              className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                librarySubTab === 'shortened'
                  ? 'border-[#2c4482] text-[#2c4482]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              Đề rút gọn
            </button>
          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredExams.map((exam) => (
              <div 
                key={exam.id}
                className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug line-clamp-2">
                    {exam.title}
                  </h3>

                  {/* Metrics line */}
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-gray-400" />
                      {exam.duration} phút
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <Users size={13} className="text-gray-400" />
                      {exam.participants.toLocaleString()}
                    </span>
                    <span>|</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare size={13} className="text-gray-400" />
                      {exam.commentsCount}
                    </span>
                  </div>

                  {/* Parts count */}
                  <div className="text-xs text-gray-600 mb-4">
                    {exam.partsCount} phần thi | {exam.questionsCount} câu hỏi
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {exam.tags.map((t, idx) => (
                      <span 
                        key={idx}
                        className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Detail Action */}
                <button
                  onClick={() => {
                    setSelectedExamId(exam.id);
                    setCurrentView('detail');
                  }}
                  className="w-full py-2.5 border border-[#2c4482] text-[#2c4482] hover:bg-[#2c4482] hover:text-white rounded-lg font-medium text-sm transition-all text-center active:scale-98 cursor-pointer"
                >
                  Chi tiết
                </button>
              </div>
            ))}
          </div>

          {filteredExams.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <AlertCircle size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 font-medium">Không tìm thấy đề thi phù hợp với từ khóa.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveCategory('Tất cả'); }}
                className="mt-4 text-[#2c4482] hover:underline text-sm font-semibold"
              >
                Xóa bộ lọc & xem tất cả
              </button>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: CHI TIẾT ĐỀ THI (Matching Image 2)
  // ==========================================
  if (currentView === 'detail') {
    return (
      <div className="pt-24 pb-16 bg-[#fafbfc] min-h-screen text-left">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Back */}
          <button
            onClick={() => setCurrentView('library')}
            className="inline-flex items-center gap-2 text-sm text-[#2c4482] hover:underline mb-6 font-medium cursor-pointer"
          >
            <ArrowLeft size={16} /> Quay lại danh sách đề thi
          </button>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {currentExam.tags.map((tag, idx) => (
              <span 
                key={idx}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Test Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {currentExam.title}
          </h1>

          {/* Top Tabs: Thông tin đề thi | Đáp án/transcript */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setDetailTopTab('info')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                detailTopTab === 'info'
                  ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Thông tin đề thi
            </button>
            <button
              onClick={() => setDetailTopTab('transcript')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                detailTopTab === 'transcript'
                  ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              Đáp án/transcript
            </button>
          </div>

          {/* Content for TAB 1: Thông tin đề thi */}
          {detailTopTab === 'info' && (
            <div className="space-y-6">
              
              {/* Meta stats line */}
              <div className="space-y-1.5 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-400" />
                  <span>
                    Thời gian làm bài: <strong>{currentExam.duration} phút</strong> | {currentExam.partsCount} phần thi | {currentExam.questionsCount} câu hỏi | {currentExam.commentsCount} bình luận
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-400" />
                  <span>
                    <strong>{currentExam.participants.toLocaleString()}</strong> người đã luyện tập đề thi này
                  </span>
                </div>
              </div>

              {/* Red warning note */}
              <p className="text-sm italic text-red-600 font-medium">
                Chú ý: để được quy đổi sang scaled score (ví dụ trên thang điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ làm FULL TEST.
              </p>

              {/* Amber / Yellow Banner: Bạn có bài làm chưa nộp dưới đây */}
              {draft.exists && (
                <div className="bg-[#fff9eb] border border-[#f5dfa8] rounded-xl p-5 text-gray-900 shadow-xs">
                  <div className="flex items-center gap-2 font-medium text-amber-900 mb-3 text-sm">
                    <Info size={18} className="text-amber-600 shrink-0" />
                    <span>Bạn có bài làm chưa nộp dưới đây</span>
                  </div>

                  <div className="overflow-x-auto bg-white rounded-lg border border-[#f5dfa8]/70">
                    <table className="w-full text-left text-xs md:text-sm">
                      <thead className="bg-[#fffdf8] border-b border-gray-200 text-gray-600 font-semibold">
                        <tr>
                          <th className="py-2.5 px-4">Lưu lần cuối</th>
                          <th className="py-2.5 px-4">Số câu đã trả lời</th>
                          <th className="py-2.5 px-4">Thời gian đã làm</th>
                          <th className="py-2.5 px-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-gray-900">{draft.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{draft.timestamp}</div>
                            <div className="flex gap-1.5 mt-1">
                              <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                                {draft.version}
                              </span>
                              <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                                {draft.mode}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-700">
                            {draft.answeredCount}/40
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {draft.timeSpent}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={handleResumeDraft}
                                className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-4 py-1.5 rounded text-xs font-semibold transition-all shadow-xs active:scale-95 cursor-pointer"
                              >
                                Tiếp tục
                              </button>
                              <button
                                onClick={handleClearDraft}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer"
                              >
                                Xóa
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Mode Tabs: Luyện tập | Làm full test | Thảo luận */}
              <div className="border-b border-gray-200 flex gap-8">
                <button
                  onClick={() => setDetailModeTab('practice')}
                  className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                    detailModeTab === 'practice'
                      ? 'border-[#2c4482] text-[#2c4482]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Luyện tập
                </button>
                <button
                  onClick={() => setDetailModeTab('fulltest')}
                  className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                    detailModeTab === 'fulltest'
                      ? 'border-[#2c4482] text-[#2c4482]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Làm full test
                </button>
                <button
                  onClick={() => setDetailModeTab('discussion')}
                  className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                    detailModeTab === 'discussion'
                      ? 'border-[#2c4482] text-[#2c4482]'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Thảo luận
                </button>
              </div>

              {/* Mode Content: Luyện tập */}
              {detailModeTab === 'practice' && (
                <div className="space-y-6">
                  {/* Pro Tips Green Box */}
                  <div className="bg-[#eaf8f0] border border-[#c1ebd0] rounded-xl p-4 text-[#1a6e3d] flex items-start gap-3">
                    <Sparkles size={20} className="shrink-0 mt-0.5 text-[#1a6e3d]" />
                    <p className="text-sm leading-relaxed">
                      <strong>Pro tips:</strong> Hình thức luyện tập từng phần và chọn mức thời gian phù hợp sẽ giúp bạn tập trung vào giải đúng các câu hỏi thay vì phải chịu áp lực hoàn thành bài thi.
                    </p>
                  </div>

                  {/* Chọn phần thi bạn muốn làm */}
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-3">Chọn phần thi bạn muốn làm</h3>
                    <div className="space-y-3">
                      {currentExam.parts?.map((part) => {
                        const isChecked = selectedParts.includes(part.id);
                        return (
                          <label 
                            key={part.id}
                            className={`flex items-start gap-3 p-3.5 rounded-lg border transition-all cursor-pointer ${
                              isChecked ? 'bg-white border-[#2c4482]/40 shadow-xs' : 'bg-gray-50/50 border-gray-200'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => {
                                if (isChecked) {
                                  setSelectedParts(selectedParts.filter(id => id !== part.id));
                                } else {
                                  setSelectedParts([...selectedParts, part.id]);
                                }
                              }}
                              className="mt-1 w-4 h-4 text-[#2c4482] rounded border-gray-300 focus:ring-[#2c4482] cursor-pointer"
                            />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 text-sm">
                                {part.title} ({part.questionCount} câu hỏi)
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-1.5">
                                {part.tags?.map((tag, tIdx) => (
                                  <span 
                                    key={tIdx}
                                    className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded font-normal"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Giới hạn thời gian */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Giới hạn thời gian (Để trống để làm bài không giới hạn)
                    </label>
                    <div className="flex items-center gap-2 max-w-xs">
                      <input
                        type="number"
                        placeholder="Số phút, ví dụ: 40"
                        value={practiceTimeLimit}
                        onChange={(e) => setPracticeTimeLimit(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                      />
                      <span className="text-sm text-gray-500">phút</span>
                    </div>
                  </div>

                  {/* Button Bắt đầu làm bài */}
                  <div className="pt-2">
                    <button
                      onClick={handleStartPractice}
                      disabled={selectedParts.length === 0}
                      className="bg-[#2c4482] hover:bg-[#20325c] text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      Bắt đầu làm bài
                    </button>
                  </div>
                </div>
              )}

              {/* Mode Content: Làm Full Test */}
              {detailModeTab === 'fulltest' && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-[#2c4482] flex items-center justify-center font-bold">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-base">Chế độ thi thử chuẩn IELTS Full Test</h3>
                      <p className="text-xs text-gray-500">Mô phỏng 100% định dạng thi IELTS trên máy tính (Computer-delivered)</p>
                    </div>
                  </div>
                  
                  <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                    <li>Thời gian làm bài chính xác <strong>{currentExam.duration} phút</strong>, hệ thống tự động thu bài khi hết giờ.</li>
                    <li>Làm liên tục toàn bộ 4 phần thi với 40 câu hỏi.</li>
                    <li>Hệ thống tự động chấm điểm và quy đổi sang <strong>IELTS Scaled Band Score (1.0 - 9.0)</strong> ngay khi nộp bài.</li>
                  </ul>

                  <div className="pt-3">
                    <button
                      onClick={handleStartFullTest}
                      className="bg-[#2c4482] hover:bg-[#20325c] text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      Bắt đầu làm FULL TEST
                    </button>
                  </div>
                </div>
              )}

              {/* Mode Content: Thảo luận */}
              {detailModeTab === 'discussion' && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                  <h3 className="font-bold text-gray-900 text-base">Cộng đồng thảo luận đề thi ({currentExam.commentsCount} bình luận)</h3>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#2c4482] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      DE
                    </div>
                    <div className="flex-1 space-y-2">
                      <textarea
                        rows="3"
                        placeholder="Đặt câu hỏi hoặc chia sẻ cách giải các câu bẫy trong đề này..."
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                      ></textarea>
                      <button className="bg-[#2c4482] text-white px-5 py-2 rounded text-xs font-semibold hover:bg-[#20325c]">
                        Gửi bình luận
                      </button>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 pt-4">
                    <div className="py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">Hoàng Nam (IELTS 7.5)</span>
                        <span className="text-xs text-gray-400">2 ngày trước</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Phần Part 1 bẫy câu giờ tour bắt đầu lúc 4:00 chứ không phải 3:40 ghi trên vé. Mọi người chú ý nghe kỹ từ &quot;error on the ticket&quot; nhé!
                      </p>
                    </div>
                    <div className="py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-gray-900">Minh Châu</span>
                        <span className="text-xs text-gray-400">5 ngày trước</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Đề chuẩn Vol 1 sát với format thi thật tại Hội đồng Anh và IDP năm nay, giao diện máy tính làm rất mượt.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Content for TAB 2: Đáp án / Transcript */}
          {detailTopTab === 'transcript' && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Transcript & Đáp án chi tiết</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Dữ liệu được trích xuất trực tiếp từ tài liệu gốc <strong>Full Original Exam VOL 1–9</strong>.
                </p>
                {currentExam.audioUrl && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-center gap-4">
                    <span className="text-sm font-semibold text-gray-700">Audio Preview:</span>
                    <audio controls className="w-full max-w-md h-9">
                      <source src={currentExam.audioUrl} type="audio/mpeg" />
                      Trình duyệt không hỗ trợ audio element.
                    </audio>
                  </div>
                )}
              </div>

              {/* Transcript Text Box */}
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-[#2c4482]" /> Full Listening Transcript
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-xs text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                  {currentExam.transcript || 'Transcript đang được cập nhật cho đề thi này.'}
                </div>
              </div>

              {/* Answer Keys */}
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-3">Đáp án tham khảo (Answer Key):</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {currentExam.parts?.[0]?.questions?.map(q => (
                    <div key={q.id} className="bg-gray-50 border border-gray-200 rounded p-2 text-xs">
                      <span className="font-bold text-gray-500">Câu {q.id}:</span>{' '}
                      <span className="font-semibold text-[#185bc3]">{q.answer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: PHÒNG THI MÁY TÍNH (Computer-Delivered Test Room)
  // ==========================================
  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors duration-150 ${contrastClasses[contrast]} ${textSizeClasses[textSize]}`}
      onMouseUp={handleMouseUp}
    >
      {/* Hidden audio element */}
      {currentExam.audioUrl && (
        <audio 
          ref={audioRef} 
          src={currentExam.audioUrl} 
          onEnded={() => setIsPlayingAudio(false)} 
        />
      )}

      {/* HEADER / NAVIGATION BAR */}
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 select-none z-30 shadow-xs">
        {/* Left Side: Test Title & Audio Control */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#2c4482] text-white text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">
              IELTS CBT
            </span>
            <span className="font-bold text-sm text-gray-800 hidden sm:inline">
              {currentExam.title}
            </span>
          </div>

          {/* Audio Player in Listening */}
          {currentExam.audioUrl && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    if (isPlayingAudio) {
                      audioRef.current.pause();
                      setIsPlayingAudio(false);
                    } else {
                      audioRef.current.play();
                      setIsPlayingAudio(true);
                    }
                  }
                }}
                className="text-[#2c4482] hover:scale-110 transition-transform cursor-pointer"
                title={isPlayingAudio ? 'Tạm dừng audio' : 'Phát audio'}
              >
                {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <Volume2 size={16} className="text-gray-500 ml-1" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={audioVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setAudioVolume(val);
                  if (audioRef.current) audioRef.current.volume = val;
                }}
                className="w-16 h-1 bg-gray-300 rounded-lg cursor-pointer accent-[#2c4482]"
              />
              <span className="text-[11px] text-gray-600 font-mono">
                {formatTime(audioProgress)} / {formatTime(audioDuration)}
              </span>
            </div>
          )}
        </div>

        {/* Center: Live Timer Countdown */}
        <div className="flex items-center gap-2">
          <Clock size={18} className={timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-[#2c4482]'} />
          <span className={`font-mono font-bold text-base md:text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-gray-400 hidden md:inline">còn lại</span>
        </div>

        {/* Right Side: Accessibility, Quit & Submit */}
        <div className="flex items-center gap-3">
          
          {/* Accessibility Settings Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowAccessibilityMenu(!showAccessibilityMenu)}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer"
              title="Cài đặt hiển thị"
            >
              <Menu size={18} />
              <ChevronDown size={14} />
            </button>

            {showAccessibilityMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 p-3 z-50 text-xs text-gray-800 space-y-3">
                <div>
                  <div className="font-bold text-gray-700 mb-1.5">Tương phản (Contrast):</div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button 
                      onClick={() => setContrast('standard')}
                      className={`p-1.5 rounded border text-center ${contrast === 'standard' ? 'border-[#2c4482] bg-blue-50 font-bold' : 'border-gray-200'}`}
                    >
                      Tiêu chuẩn
                    </button>
                    <button 
                      onClick={() => setContrast('white-black')}
                      className={`p-1.5 rounded border text-center bg-black text-white ${contrast === 'white-black' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      Nền đen
                    </button>
                    <button 
                      onClick={() => setContrast('yellow-black')}
                      className={`p-1.5 rounded border text-center bg-black text-yellow-300 ${contrast === 'yellow-black' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      Vàng/Đen
                    </button>
                    <button 
                      onClick={() => setContrast('black-white')}
                      className={`p-1.5 rounded border text-center bg-white text-black ${contrast === 'black-white' ? 'ring-2 ring-blue-500' : ''}`}
                    >
                      Đen/Trắng
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-2">
                  <div className="font-bold text-gray-700 mb-1.5">Cỡ chữ (Text size):</div>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => setTextSize('standard')}
                      className={`flex-1 py-1 rounded border text-center ${textSize === 'standard' ? 'bg-blue-50 border-[#2c4482] font-bold' : 'border-gray-200'}`}
                    >
                      Vừa
                    </button>
                    <button 
                      onClick={() => setTextSize('large')}
                      className={`flex-1 py-1 rounded border text-center ${textSize === 'large' ? 'bg-blue-50 border-[#2c4482] font-bold' : 'border-gray-200'}`}
                    >
                      Lớn
                    </button>
                    <button 
                      onClick={() => setTextSize('extra-large')}
                      className={`flex-1 py-1 rounded border text-center ${textSize === 'extra-large' ? 'bg-blue-50 border-[#2c4482] font-bold' : 'border-gray-200'}`}
                    >
                      Rất lớn
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Test Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="bg-[#2c4482] hover:bg-[#20325c] text-white px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Send size={15} />
            <span>Nộp bài</span>
          </button>

          {/* Quit Button */}
          <button
            onClick={() => setShowQuitModal(true)}
            className="border border-red-200 text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
            title="Thoát phòng thi"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* MAIN TEST AREA */}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full text-left">
          
          {/* Section Banner */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-xs mb-8">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-[#2c4482] uppercase tracking-wider">
                  PART {activePartIndex + 1}
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                  {currentExam.parts?.[activePartIndex]?.name || `Part ${activePartIndex + 1}`}
                </h2>
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Questions {currentExam.parts?.[activePartIndex]?.questionRange || '1–10'}
              </span>
            </div>

            {/* Instruction */}
            <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-4 text-sm text-[#185bc3] font-medium mb-6">
              {currentExam.parts?.[activePartIndex]?.instruction || 'Answer the questions below.'}
            </div>

            {/* Questions for Part 1 (Beacon Festival Offers) */}
            {activePartIndex === 0 && (
              <div className="space-y-6">
                <div className="font-semibold text-gray-800 text-base border-b pb-2">
                  BEACON FESTIVAL OFFERS
                </div>

                <div className="space-y-4 text-sm leading-loose">
                  {currentExam.parts?.[0]?.questions?.map((q) => {
                    const isAnswered = !!userAnswers[q.id];
                    return (
                      <div 
                        key={q.id}
                        id={`q-${q.id}`}
                        className={`p-3 rounded-lg transition-colors flex flex-wrap items-center gap-2 ${
                          activeQuestion === q.id ? 'bg-blue-50/50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setActiveQuestion(q.id)}
                      >
                        <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {q.id}
                        </span>
                        <span className="text-gray-800">{q.prefix}</span>
                        <input
                          type="text"
                          value={userAnswers[q.id] || ''}
                          onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                          placeholder={`[${q.id}]`}
                          className="w-44 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482] shadow-2xs"
                        />
                        {q.suffix && <span className="text-gray-800">{q.suffix}</span>}
                        {isAnswered && (
                          <CheckCircle2 size={16} className="text-green-500 shrink-0 ml-1" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Questions for Part 2 */}
            {activePartIndex === 1 && (
              <div className="space-y-6">
                <div className="font-semibold text-gray-800 text-base border-b pb-2">
                  WALKING HOLIDAY ITINERARY & ADVICE
                </div>
                <div className="space-y-6">
                  {currentExam.parts?.[1]?.questions?.map((q) => (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-lg transition-colors ${
                        activeQuestion === q.id ? 'bg-blue-50/50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveQuestion(q.id)}
                    >
                      {q.question ? (
                        <div>
                          <p className="font-semibold text-gray-900 mb-3 text-sm">
                            <span className="font-bold text-[#2c4482] mr-2">Question {q.id}:</span>
                            {q.question}
                          </p>
                          <div className="space-y-2 pl-4">
                            {q.options?.map((opt, oIdx) => {
                              const letter = opt.charAt(0);
                              return (
                                <label key={oIdx} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    checked={userAnswers[q.id] === letter}
                                    onChange={() => handleAnswerChange(q.id, letter)}
                                    className="text-[#2c4482] focus:ring-[#2c4482]"
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {q.id}
                          </span>
                          <span className="text-gray-800">{q.prefix}</span>
                          <input
                            type="text"
                            value={userAnswers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={`[${q.id}]`}
                            className="w-36 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                          />
                          {q.suffix && <span className="text-gray-800">{q.suffix}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions for Part 3 */}
            {activePartIndex === 2 && (
              <div className="space-y-6">
                <div className="font-semibold text-gray-800 text-base border-b pb-2">
                  PEER ASSESSMENT RESEARCH STUDY
                </div>
                <div className="space-y-6">
                  {currentExam.parts?.[2]?.questions?.map((q) => (
                    <div 
                      key={q.id}
                      className={`p-4 rounded-lg transition-colors ${
                        activeQuestion === q.id ? 'bg-blue-50/50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveQuestion(q.id)}
                    >
                      {q.question ? (
                        <div>
                          <p className="font-semibold text-gray-900 mb-3 text-sm">
                            <span className="font-bold text-[#2c4482] mr-2">Question {q.id}:</span>
                            {q.question}
                          </p>
                          <div className="space-y-2 pl-4">
                            {q.options?.map((opt, oIdx) => {
                              const letter = opt.charAt(0);
                              return (
                                <label key={oIdx} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    checked={userAnswers[q.id] === letter}
                                    onChange={() => handleAnswerChange(q.id, letter)}
                                    className="text-[#2c4482] focus:ring-[#2c4482]"
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {q.id}
                          </span>
                          <span className="text-gray-800">{q.prefix}</span>
                          <input
                            type="text"
                            value={userAnswers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={`[${q.id}]`}
                            className="w-36 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                          />
                          {q.suffix && <span className="text-gray-800">{q.suffix}</span>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questions for Part 4 */}
            {activePartIndex === 3 && (
              <div className="space-y-6">
                <div className="font-semibold text-gray-800 text-base border-b pb-2">
                  LINGUISTICS LECTURE: ENDANGERED LANGUAGES
                </div>
                <div className="space-y-4 text-sm leading-loose">
                  {currentExam.parts?.[3]?.questions?.map((q) => (
                    <div 
                      key={q.id}
                      className={`p-3 rounded-lg transition-colors flex flex-wrap items-center gap-2 ${
                        activeQuestion === q.id ? 'bg-blue-50/50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveQuestion(q.id)}
                    >
                      <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {q.id}
                      </span>
                      <span className="text-gray-800">{q.prefix}</span>
                      <input
                        type="text"
                        value={userAnswers[q.id] || ''}
                        onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                        placeholder={`[${q.id}]`}
                        className="w-36 bg-white border border-gray-300 rounded px-3 py-1 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                      />
                      {q.suffix && <span className="text-gray-800">{q.suffix}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </main>

        {/* ANNOTATION FLOATING POPUP */}
        {selectionPopup && (
          <div 
            id="selection-popup"
            className="fixed z-50 bg-white rounded-md shadow-xl border border-gray-200 flex p-1"
            style={{ 
              left: selectionPopup.x, 
              top: selectionPopup.y, 
              transform: 'translate(-50%, -120%)' 
            }}
          >
            <button 
              onClick={() => applyAnnotation('note')} 
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800 w-16 transition-colors cursor-pointer"
            >
              <Edit3 size={16} className="mb-1" />
              <span className="text-xs font-medium">Ghi chú</span>
            </button>
            <button 
              onClick={() => applyAnnotation('highlight')} 
              className="flex flex-col items-center p-2 hover:bg-gray-100 rounded text-gray-800 w-16 transition-colors cursor-pointer"
            >
              <Highlighter size={16} className="mb-1" />
              <span className="text-xs font-medium">Tô màu</span>
            </button>
          </div>
        )}

        {/* NOTES SIDEBAR */}
        {activeNoteId && notes[activeNoteId] && (
          <aside id="note-sidebar" className="w-72 bg-gray-50 border-l border-gray-300 flex flex-col shadow-xl z-40 shrink-0 text-left">
            <div className="bg-[#2c4482] text-white p-3 flex justify-between items-center">
              <span className="font-bold text-sm">Ghi chú</span>
              <button onClick={() => setActiveNoteId(null)} className="text-white/80 hover:text-white">
                <XCircle size={16} />
              </button>
            </div>
            <div className="p-3 text-xs italic text-gray-600 bg-gray-100 border-b">
              &quot;{notes[activeNoteId].text}&quot;
            </div>
            <div className="p-3 flex-1 flex flex-col gap-2">
              <textarea
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                placeholder="Nhập ghi chú của bạn tại đây..."
                className="w-full flex-1 border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-[#2c4482] resize-none"
              ></textarea>
              <div className="flex justify-between items-center pt-2">
                <button onClick={deleteNote} className="text-xs text-red-600 hover:underline">
                  Xóa ghi chú
                </button>
                <button onClick={saveNoteContent} className="bg-[#2c4482] text-white px-3 py-1 rounded text-xs font-semibold">
                  Lưu
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* FOOTER PAGINATION & PALETTE */}
      <footer className="h-16 border-t border-gray-200 bg-white flex items-center px-4 select-none z-30 justify-between">
        <div className="flex items-center gap-6 overflow-x-auto py-2">
          {[0, 1, 2, 3].map((pIdx) => {
            const startQ = pIdx * 10 + 1;
            const endQ = pIdx * 10 + 10;
            const isCurrentPart = activePartIndex === pIdx;
            
            // Count answered in this part
            let answeredInPart = 0;
            for (let q = startQ; q <= endQ; q++) {
              if (userAnswers[q]) answeredInPart++;
            }

            return (
              <div 
                key={pIdx}
                onClick={() => {
                  setActivePartIndex(pIdx);
                  setActiveQuestion(startQ);
                }}
                className={`flex items-center gap-3 h-full px-3 py-1 rounded cursor-pointer border-b-2 transition-all ${
                  isCurrentPart ? 'border-[#2c4482] bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <span className="font-bold text-xs uppercase tracking-wider text-gray-800">
                  PART {pIdx + 1}
                </span>

                {/* Question badges */}
                <div className="hidden sm:flex gap-1">
                  {Array.from({ length: 10 }, (_, i) => startQ + i).map((qNum) => {
                    const isAnswered = !!userAnswers[qNum];
                    const isActive = activeQuestion === qNum;
                    return (
                      <button
                        key={qNum}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePartIndex(pIdx);
                          setActiveQuestion(qNum);
                        }}
                        className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded transition-colors ${
                          isActive 
                            ? 'ring-2 ring-[#2c4482] bg-[#2c4482] text-white' 
                            : isAnswered 
                              ? 'bg-blue-100 text-[#2c4482]' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {qNum}
                      </button>
                    );
                  })}
                </div>
                
                <span className="text-[11px] text-gray-400 sm:hidden">
                  {answeredInPart}/10
                </span>
              </div>
            );
          })}
        </div>

        {/* Prev / Next navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activePartIndex > 0) {
                setActivePartIndex(activePartIndex - 1);
                setActiveQuestion(activePartIndex * 10 - 9);
              }
            }}
            disabled={activePartIndex === 0}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => {
              if (activePartIndex < 3) {
                setActivePartIndex(activePartIndex + 1);
                setActiveQuestion((activePartIndex + 1) * 10 + 1);
              }
            }}
            disabled={activePartIndex === 3}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>

      {/* CONFIRM QUIT MODAL */}
      {showQuitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 text-left shadow-2xl space-y-4">
            <h3 className="font-bold text-lg text-gray-900">Rời khỏi phòng thi?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Bạn có muốn lưu lại tiến trình làm bài hiện tại để có thể tiếp tục sau này không?
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowQuitModal(false)}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={() => handleQuitTest(false)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold"
              >
                Thoát không lưu
              </button>
              <button
                onClick={() => handleQuitTest(true)}
                className="px-4 py-2 bg-[#2c4482] text-white rounded-lg text-xs font-semibold hover:bg-[#20325c]"
              >
                Lưu nháp & Thoát
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT CONFIRMATION & RESULT MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 text-left shadow-2xl space-y-5">
            {!isTestSubmitted ? (
              <>
                <h3 className="font-bold text-lg text-gray-900">Xác nhận nộp bài</h3>
                <p className="text-sm text-gray-600">
                  Bạn đã trả lời <strong>{Object.keys(userAnswers).length}/40</strong> câu hỏi. Bạn có chắc chắn muốn kết thúc bài thi và xem kết quả?
                </p>
                <div className="flex justify-end gap-3 pt-3">
                  <button
                    onClick={() => setShowSubmitModal(false)}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
                  >
                    Tiếp tục làm bài
                  </button>
                  <button
                    onClick={calculateScore}
                    className="px-5 py-2 bg-[#2c4482] text-white rounded-lg text-xs font-semibold hover:bg-[#20325c] cursor-pointer"
                  >
                    Nộp bài ngay
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center py-2">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">Kết quả bài thi</h3>
                  <p className="text-xs text-gray-500">{currentExam.title}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-2 gap-4 text-center border border-gray-200">
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Số câu đúng</span>
                    <div className="text-2xl font-bold text-[#2c4482] mt-1">
                      {testScore?.correctCount || 0} / 40
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">IELTS Band quy đổi</span>
                    <div className="text-2xl font-bold text-green-600 mt-1">
                      Band {testScore?.band || '5.0'}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      setShowSubmitModal(false);
                      setDetailTopTab('transcript');
                      setCurrentView('detail');
                    }}
                    className="flex-1 py-2.5 border border-[#2c4482] text-[#2c4482] hover:bg-blue-50 rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    Xem Transcript & Đáp án
                  </button>
                  <button
                    onClick={() => {
                      setShowSubmitModal(false);
                      setCurrentView('library');
                    }}
                    className="flex-1 py-2.5 bg-[#2c4482] text-white hover:bg-[#20325c] rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    Về Thư viện đề thi
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
