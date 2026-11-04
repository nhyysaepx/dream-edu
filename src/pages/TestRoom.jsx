import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
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
  Clock,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  XCircle,
  FileText,
  Headphones,
  BookOpen
} from 'lucide-react';
import { EXAM_COLLECTIONS } from '../data/examData';

export default function TestRoom() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const exam = EXAM_COLLECTIONS.find(e => e.id === id) || EXAM_COLLECTIONS[0];
  const isListening = exam.skill === 'Listening';
  const isReading = exam.skill === 'Reading';

  // Mode and params
  const mode = searchParams.get('mode') || 'practice';
  const resumeParam = searchParams.get('resume') === 'true';
  const partsParam = searchParams.get('parts');
  const allowedPartIds = partsParam 
    ? partsParam.split(',').map(Number) 
    : (exam.parts ? exam.parts.map(p => p.id) : [1, 2, 3, 4]);
  const customTime = searchParams.get('time');

  // Active section & question
  const [activePartIndex, setActivePartIndex] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});

  // Timer state
  const initialDuration = customTime 
    ? parseInt(customTime, 10) * 60 
    : exam.duration * 60;
  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Modals
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [testScore, setTestScore] = useState(null);

  // Accessibility
  const [contrast, setContrast] = useState('standard');
  const [textSize, setTextSize] = useState('standard');
  const [showSettings, setShowSettings] = useState(false);

  // Audio Player for Listening
  const audioRef = useRef(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioVolume, setAudioVolume] = useState(0.85);

  // Annotations & Notes
  const [selectionPopup, setSelectionPopup] = useState(null);
  const [notes, setNotes] = useState({});
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [draftNoteContent, setDraftNoteContent] = useState('');

  const draftStorageKey = `ielts_draft_${exam.id}`;

  // Load saved draft if resume mode
  useEffect(() => {
    if (resumeParam) {
      const saved = localStorage.getItem(draftStorageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.userAnswers) setUserAnswers(parsed.userAnswers);
          if (parsed.timeLeft) setTimeLeft(parsed.timeLeft);
        } catch (e) {}
      }
    }
  }, [resumeParam, draftStorageKey]);

  // Auto-save draft to localStorage whenever answers change
  useEffect(() => {
    if (Object.keys(userAnswers).length > 0 && !isTestSubmitted) {
      const draftObj = {
        exists: true,
        title: exam.title,
        timestamp: new Date().toLocaleString('vi-VN'),
        answeredCount: Object.keys(userAnswers).length,
        timeSpent: formatTime(initialDuration - timeLeft),
        version: 'IELTS Test v1',
        mode: mode === 'fulltest' ? 'Full test' : 'Luyện tập',
        timeLeft,
        userAnswers
      };
      localStorage.setItem(draftStorageKey, JSON.stringify(draftObj));
    }
  }, [userAnswers, timeLeft, isTestSubmitted, exam.title, initialDuration, mode, draftStorageKey]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || timeLeft <= 0 || isTestSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isTestSubmitted]);

  // Audio track switching when part changes (for Listening)
  const currentPart = exam.parts?.[activePartIndex] || exam.parts?.[0];
  const currentAudioUrl = exam.audioTracks?.[currentPart?.id] || currentPart?.audioUrl;

  useEffect(() => {
    if (!isListening) return;
    setIsPlayingAudio(false);
    setAudioProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [activePartIndex, isListening]);

  // Audio event listeners
  const onAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
      setIsPlayingAudio(true);
    }
  };

  // Text selection handler for Notes / Highlights
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
      setDraftNoteContent('');
    }
    setSelectionPopup(null);
  };

  const handleAnswerChange = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleQuit = (saveDraft = true) => {
    setIsTimerRunning(false);
    if (!saveDraft) {
      localStorage.removeItem(draftStorageKey);
    }
    navigate(`/tests/${exam.id}`);
  };

  const handleSubmitTest = () => {
    setIsTimerRunning(false);
    let correctCount = 0;
    
    // Check all parts
    exam.parts?.forEach(part => {
      part.questions?.forEach(q => {
        const userVal = (userAnswers[q.id] || '').trim().toLowerCase();
        if (q.type === 'choice') {
          if (userVal === (q.answer || '').trim().toLowerCase()) {
            correctCount++;
          }
        } else {
          const matchAcceptable = q.acceptable && q.acceptable.some(a => a.toLowerCase() === userVal);
          const matchAnswer = q.answer && q.answer.toLowerCase() === userVal;
          if (matchAcceptable || matchAnswer) {
            correctCount++;
          }
        }
      });
    });

    // IELTS band calculation
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

    setTestScore({ correctCount, total: 40, band });
    setIsTestSubmitted(true);
    setShowSubmitModal(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

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

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans transition-colors select-text ${contrastClasses[contrast]} ${textSizeClasses[textSize]}`}
      onMouseUp={handleMouseUp}
    >
      {/* Hidden audio element for listening track */}
      {isListening && currentAudioUrl && (
        <audio 
          ref={audioRef} 
          src={currentAudioUrl}
          onTimeUpdate={onAudioTimeUpdate}
          onEnded={() => setIsPlayingAudio(false)} 
        />
      )}

      {/* TOP CBT HEADER */}
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 select-none z-30 shadow-xs">
        {/* Left: Test Title & Audio */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-[#2c4482] text-white text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wider">
              {isListening ? 'IELTS LISTENING' : 'IELTS READING'}
            </span>
            <span className="font-bold text-sm text-gray-800 hidden md:inline">
              {exam.title}
            </span>
          </div>

          {/* Audio Controls for Listening */}
          {isListening && currentAudioUrl && (
            <div className="flex items-center gap-2.5 bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200">
              <button
                onClick={togglePlayAudio}
                className="text-[#2c4482] hover:scale-110 transition-transform cursor-pointer"
                title={isPlayingAudio ? 'Tạm dừng audio' : 'Phát audio'}
              >
                {isPlayingAudio ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <span className="text-[11px] font-semibold text-gray-700">
                Track {activePartIndex + 1}
              </span>
              <Volume2 size={15} className="text-gray-500" />
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
                {formatTime(audioProgress)} / {formatTime(audioDuration || 600)}
              </span>
            </div>
          )}
        </div>

        {/* Center: Countdown Timer */}
        <div className="flex items-center gap-2">
          <Clock size={18} className={timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-[#2c4482]'} />
          <span className={`font-mono font-bold text-base md:text-lg ${timeLeft < 300 ? 'text-red-600' : 'text-gray-800'}`}>
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-gray-400 hidden sm:inline">còn lại</span>
        </div>

        {/* Right: Settings, Submit, Quit */}
        <div className="flex items-center gap-3">
          
          {/* Settings Menu */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-1 cursor-pointer"
              title="Cài đặt hiển thị"
            >
              <Menu size={18} />
              <ChevronDown size={14} />
            </button>

            {showSettings && (
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

        {/* ======================================================== */}
        {/* CASE 1: LISTENING MODE (4 PARTS WITH DEDICATED AUDIO) */}
        {/* ======================================================== */}
        {isListening && (
          <main className="flex-1 overflow-y-auto p-4 md:p-8 max-w-4xl mx-auto w-full text-left">
            <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 shadow-xs mb-8">
              
              {/* Part Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#2c4482] uppercase tracking-wider">
                    PART {activePartIndex + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">
                    {currentPart?.name || `Part ${activePartIndex + 1}`}
                  </h2>
                </div>
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Questions {currentPart?.questionRange || '1–10'}
                </span>
              </div>

              {/* Instruction */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-4 text-sm text-[#185bc3] font-medium mb-6">
                {currentPart?.instruction || 'Answer the questions below.'}
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {currentPart?.questions?.map((q) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isActive = activeQuestion === q.id;

                  return (
                    <div 
                      key={q.id}
                      id={`q-${q.id}`}
                      className={`p-4 rounded-lg transition-colors ${
                        isActive ? 'bg-blue-50/50 ring-1 ring-blue-300' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setActiveQuestion(q.id)}
                    >
                      {/* Multiple Choice question */}
                      {q.type === 'choice' ? (
                        <div>
                          <p className="font-semibold text-gray-900 mb-3 text-sm">
                            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 inline-flex items-center justify-center font-bold text-xs mr-2">
                              {q.id}
                            </span>
                            {q.question}
                          </p>
                          <div className="space-y-2 pl-6">
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
                        /* Fill in the blanks question */
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {q.id}
                          </span>
                          <span className="text-gray-800">{q.label}</span>
                          <input
                            type="text"
                            value={userAnswers[q.id] || ''}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder={`[${q.id}]`}
                            className="w-44 bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482] shadow-2xs"
                          />
                          {q.suffix && <span className="text-gray-800">{q.suffix}</span>}
                          {isAnswered && (
                            <CheckCircle2 size={16} className="text-green-500 shrink-0 ml-1" />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </main>
        )}

        {/* ======================================================== */}
        {/* CASE 2: READING MODE (3 PASSAGES WITH 2-COLUMN SPLIT) */}
        {/* ======================================================== */}
        {isReading && (
          <div className="flex-1 flex overflow-hidden text-left">
            
            {/* Left Column: Reading Passage Text */}
            <div className="w-1/2 border-r border-gray-200 bg-white overflow-y-auto p-6 md:p-8">
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="border-b pb-3 mb-4">
                  <span className="text-xs font-bold text-[#2c4482] uppercase tracking-wider">
                    {currentPart?.title}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1">
                    {currentPart?.name}
                  </h2>
                </div>
                <div className="prose prose-sm text-gray-800 leading-relaxed font-serif whitespace-pre-line text-justify">
                  {currentPart?.readingText}
                </div>
              </div>
            </div>

            {/* Right Column: Questions */}
            <div className="w-1/2 bg-[#fafbfc] overflow-y-auto p-6 md:p-8">
              <div className="max-w-xl mx-auto space-y-6">
                
                {/* Instruction */}
                <div className="bg-blue-50/70 border border-blue-100 rounded-lg p-4 text-xs md:text-sm text-[#185bc3] font-medium">
                  {currentPart?.instruction || 'Answer the questions based on the reading passage.'}
                </div>

                {/* Questions */}
                <div className="space-y-4">
                  {currentPart?.questions?.map((q) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isActive = activeQuestion === q.id;

                    return (
                      <div 
                        key={q.id}
                        id={`q-${q.id}`}
                        className={`p-4 rounded-xl border bg-white transition-all ${
                          isActive ? 'border-[#2c4482] ring-1 ring-[#2c4482] shadow-xs' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveQuestion(q.id)}
                      >
                        {q.type === 'choice' ? (
                          <div>
                            <p className="font-semibold text-gray-900 text-sm mb-3">
                              <span className="font-bold text-[#2c4482] mr-2">Câu {q.id}:</span>
                              {q.question}
                            </p>
                            <div className="space-y-2">
                              {q.options?.map((opt, oIdx) => (
                                <label key={oIdx} className="flex items-center gap-3 text-sm text-gray-700 cursor-pointer">
                                  <input
                                    type="radio"
                                    name={`q-${q.id}`}
                                    checked={userAnswers[q.id] === opt}
                                    onChange={() => handleAnswerChange(q.id, opt)}
                                    className="text-[#2c4482] focus:ring-[#2c4482]"
                                  />
                                  <span>{opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs">
                                {q.id}
                              </span>
                              <span className="text-sm text-gray-800">{q.label}</span>
                            </div>
                            <div className="flex items-center gap-2 pl-8">
                              <input
                                type="text"
                                value={userAnswers[q.id] || ''}
                                onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                                placeholder="Nhập câu trả lời..."
                                className="w-full max-w-sm bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium text-[#2c4482] focus:outline-none focus:border-[#2c4482]"
                              />
                              {q.suffix && <span className="text-sm text-gray-800">{q.suffix}</span>}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>
        )}

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
                value={draftNoteContent}
                onChange={(e) => setDraftNoteContent(e.target.value)}
                placeholder="Nhập ghi chú của bạn tại đây..."
                className="w-full flex-1 border border-gray-300 rounded p-2 text-xs focus:outline-none focus:border-[#2c4482] resize-none"
              ></textarea>
              <div className="flex justify-between items-center pt-2">
                <button 
                  onClick={() => {
                    const next = { ...notes };
                    delete next[activeNoteId];
                    setNotes(next);
                    setActiveNoteId(null);
                  }} 
                  className="text-xs text-red-600 hover:underline"
                >
                  Xóa ghi chú
                </button>
                <button 
                  onClick={() => {
                    setNotes(prev => ({
                      ...prev,
                      [activeNoteId]: { ...prev[activeNoteId], content: draftNoteContent }
                    }));
                  }} 
                  className="bg-[#2c4482] text-white px-3 py-1 rounded text-xs font-semibold"
                >
                  Lưu
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* FOOTER PALETTE & NAVIGATION */}
      <footer className="h-16 border-t border-gray-200 bg-white flex items-center px-4 select-none z-30 justify-between">
        <div className="flex items-center gap-6 overflow-x-auto py-2">
          {exam.parts?.map((part, pIdx) => {
            const isCurrentPart = activePartIndex === pIdx;
            const partQuestions = part.questions || [];

            return (
              <div 
                key={part.id}
                onClick={() => {
                  setActivePartIndex(pIdx);
                  if (partQuestions.length > 0) setActiveQuestion(partQuestions[0].id);
                }}
                className={`flex items-center gap-3 h-full px-3 py-1 rounded cursor-pointer border-b-2 transition-all ${
                  isCurrentPart ? 'border-[#2c4482] bg-blue-50/50' : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <span className="font-bold text-xs uppercase tracking-wider text-gray-800">
                  {isListening ? `PART ${pIdx + 1}` : `PASSAGE ${pIdx + 1}`}
                </span>

                {/* Question badges */}
                <div className="hidden sm:flex gap-1">
                  {partQuestions.map((q) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isActive = activeQuestion === q.id;
                    return (
                      <button
                        key={q.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePartIndex(pIdx);
                          setActiveQuestion(q.id);
                        }}
                        className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold rounded transition-colors ${
                          isActive 
                            ? 'ring-2 ring-[#2c4482] bg-[#2c4482] text-white' 
                            : isAnswered 
                              ? 'bg-blue-100 text-[#2c4482]' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {q.id}
                      </button>
                    );
                  })}
                </div>
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
              }
            }}
            disabled={activePartIndex === 0}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={() => {
              if (activePartIndex < (exam.parts?.length || 4) - 1) {
                setActivePartIndex(activePartIndex + 1);
              }
            }}
            disabled={activePartIndex >= (exam.parts?.length || 4) - 1}
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-30 cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>

      {/* QUIT MODAL */}
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
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold hover:bg-gray-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={() => handleQuit(false)}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Thoát không lưu
              </button>
              <button
                onClick={() => handleQuit(true)}
                className="px-4 py-2 bg-[#2c4482] text-white rounded-lg text-xs font-semibold hover:bg-[#20325c] cursor-pointer"
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
                    onClick={handleSubmitTest}
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
                  <p className="text-xs text-gray-500">{exam.title}</p>
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
                    onClick={() => navigate(`/tests/${exam.id}`)}
                    className="flex-1 py-2.5 border border-[#2c4482] text-[#2c4482] hover:bg-blue-50 rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    Xem chi tiết đề thi
                  </button>
                  <button
                    onClick={() => navigate('/test-platform')}
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
