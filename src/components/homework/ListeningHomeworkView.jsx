import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Headphones, 
  Sparkles, 
  Info, 
  Check, 
  Trophy, 
  Filter, 
  Eye, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Volume2,
  BookOpen,
  HelpCircle,
  Lightbulb,
  Clock,
  Layers
} from 'lucide-react';
import AudioPlayer from '../AudioPlayer';
import { playCorrectSound, playWrongSound, triggerCelebration } from '../../utils/speechUtils';

// Helper to normalize and check short-answer accuracy
export function checkAnswer(userAnswer, acceptedList) {
  if (!userAnswer || !userAnswer.toString().trim()) return false;
  
  const clean = (str) => {
    return (str || '')
      .toString()
      .toLowerCase()
      .replace(/[‘'’"`]/g, '')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
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

export default function ListeningHomeworkView({ homework }) {
  const navigate = useNavigate();
  const homeworkId = homework?.id || 'intermediate-listening-6';
  const passages = homework?.passages || [];

  const [activeTabId, setActiveTabId] = useState(passages[0]?.id || 'p1');
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_hw_${homeworkId}_draft`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [isSubmitted, setIsSubmitted] = useState(() => {
    try {
      const history = localStorage.getItem('dream_homework_history');
      if (history) {
        const parsed = JSON.parse(history);
        return !!parsed[homeworkId];
      }
    } catch {}
    return false;
  });

  const [showResultsModal, setShowResultsModal] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [expandedTranscripts, setExpandedTranscripts] = useState({});
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'correct' | 'incorrect'

  // Flatten all questions
  const allQuestions = useMemo(() => {
    const list = [];
    passages.forEach(p => {
      (p.questions || []).forEach(q => {
        list.push({ ...q, passageId: p.id, passageTitle: p.shortTitle || p.title });
      });
    });
    return list;
  }, [passages]);

  const totalQuestions = allQuestions.length || homework.totalQuestions || 25;

  // Handle text input change
  const handleInputChange = (fieldId, val) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [fieldId]: val
    }));
  };

  // Handle multiple-choice selection
  const handleSelectChoice = (fieldId, letter) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [fieldId]: letter
    }));
  };

  // Check correctness of a question
  const isQuestionCorrect = (q) => {
    const userAns = answers[q.id];
    return checkAnswer(userAns, q.acceptedAnswers || []);
  };

  // Score calculation
  const score = useMemo(() => {
    let s = 0;
    allQuestions.forEach(q => {
      if (isQuestionCorrect(q)) s++;
    });
    return s;
  }, [allQuestions, answers]);

  const answeredCount = useMemo(() => {
    return allQuestions.filter(q => answers[q.id] && answers[q.id].toString().trim() !== '').length;
  }, [allQuestions, answers]);

  // Save draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`dream_hw_${homeworkId}_draft`, JSON.stringify(answers));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Submit test
  const handleSubmit = () => {
    const unanswered = totalQuestions - answeredCount;
    if (unanswered > 0) {
      const confirmSubmit = window.confirm(`Bạn còn ${unanswered} câu chưa làm. Bạn có chắc chắn muốn nộp bài không?`);
      if (!confirmSubmit) return;
    }

    setIsSubmitted(true);
    setShowResultsModal(true);

    try {
      const history = JSON.parse(localStorage.getItem('dream_homework_history') || '{}');
      history[homeworkId] = {
        score,
        total: totalQuestions,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('dream_homework_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }

    if (score >= Math.round(totalQuestions * 0.7)) {
      playCorrectSound();
      triggerCelebration();
    } else {
      playWrongSound();
    }
  };

  // Retake
  const handleRetake = () => {
    if (!window.confirm('Bạn có chắc muốn làm lại từ đầu? Bài làm hiện tại sẽ được đặt lại.')) return;
    setIsSubmitted(false);
    setShowResultsModal(false);
    setAnswers({});
    try {
      localStorage.removeItem(`dream_hw_${homeworkId}_draft`);
      const history = JSON.parse(localStorage.getItem('dream_homework_history') || '{}');
      delete history[homeworkId];
      localStorage.setItem('dream_homework_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  };

  const activePassage = passages.find(p => p.id === activeTabId) || passages[0];

  return (
    <div className="pt-20 pb-36 bg-[#f8fafc] min-h-screen text-left text-gray-900 font-sans">
      
      {/* Toast notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={18} />
          <span>Đã lưu bài làm nháp thành công!</span>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link 
              to="/homework" 
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              title="Quay lại danh sách bài tập"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                <Link to="/homework" className="hover:text-primary transition-colors">Homework</Link>
                <span>/</span>
                <span className="text-gray-700 font-semibold">{homework.level || 'IELTS Intermediate'}</span>
                <span>/</span>
                <span className="text-blue-600 font-semibold">{homework.session || 'Buổi 6'}</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight truncate max-w-md sm:max-w-xl">
                {homework.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {homework.vocabId && (
              <Link
                to={`/vocab/${homework.vocabId}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold border border-indigo-200 transition-colors shadow-2xs"
                title="Mở bộ từ vựng trọng tâm bài học"
              >
                <BookOpen size={14} className="text-indigo-600" />
                <span className="hidden sm:inline">Tra cứu từ vựng</span>
                <span className="sm:hidden">Từ vựng</span>
              </Link>
            )}

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
              <Clock size={14} className="text-gray-500" />
              <span>{homework.duration || '35 - 45 phút'}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg border border-blue-200 text-xs font-bold">
              <Headphones size={14} className="text-blue-600" />
              <span>Đã làm: {answeredCount}/{totalQuestions}</span>
            </div>

            {!isSubmitted ? (
              <>
                <button
                  onClick={handleSaveDraft}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  <Save size={14} />
                  <span className="hidden sm:inline">Lưu nháp</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                >
                  <Send size={14} />
                  <span>Nộp bài</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowResultsModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <Trophy size={14} />
                  <span>Kết quả ({score}/{totalQuestions})</span>
                </button>
                <button
                  onClick={handleRetake}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
                >
                  <RotateCcw size={14} />
                  <span className="hidden sm:inline">Làm lại</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* Homework Description Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-blue-500/30 text-blue-200 text-xs font-bold tracking-wide uppercase border border-blue-400/20">
                  {homework.session || 'Buổi 6'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/30 text-emerald-200 text-xs font-semibold border border-emerald-400/20">
                  {homework.level || 'IELTS Intermediate'}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-purple-500/30 text-purple-200 text-xs font-semibold border border-purple-400/20">
                  2 Audio Tracks • 25 Questions
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white mb-1.5">
                {homework.title}
              </h2>
              <p className="text-blue-100/90 text-sm leading-relaxed max-w-3xl">
                {homework.description}
              </p>
            </div>

            {isSubmitted && (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center shrink-0">
                <div className="text-xs uppercase tracking-wider text-blue-200 font-bold mb-0.5">Điểm tổng kết</div>
                <div className="text-3xl font-black text-white">
                  {score} <span className="text-lg font-medium text-blue-200">/ {totalQuestions}</span>
                </div>
                <div className="text-xs text-emerald-300 font-semibold mt-1">
                  Đạt {Math.round((score / totalQuestions) * 100)}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Active Part Content */}
        {activePassage && (
          <div className="space-y-6">
            
            {/* Audio Player Card for Active Part */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Volume2 size={20} className="text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg">
                    {activePassage.trackLabel || 'Audio Track'} • {activePassage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setExpandedTranscripts(prev => ({ ...prev, [activePassage.id]: !prev[activePassage.id] }))}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>{expandedTranscripts[activePassage.id] ? 'Ẩn Tapescript' : 'Xem Tapescript'}</span>
                  {expandedTranscripts[activePassage.id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              <AudioPlayer 
                src={activePassage.audioSrc} 
                title={`${activePassage.trackLabel || 'Track'}: ${activePassage.title}`} 
              />

              {/* Collapsible Tapescript */}
              {expandedTranscripts[activePassage.id] && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 text-sm leading-relaxed font-mono whitespace-pre-wrap border border-slate-700 max-h-96 overflow-y-auto animate-in fade-in duration-200">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-2 pb-1 border-b border-slate-800 flex items-center justify-between">
                    <span>AUDIO TAPESCRIPT • {activePassage.trackLabel}</span>
                    <span className="text-slate-500">Giáo trình Mindset for IELTS</span>
                  </div>
                  {activePassage.transcript}
                </div>
              )}
            </div>

            {/* PART 1 RENDERER: Signposting Table */}
            {activePassage.id === 'p1' && (
              <div className="space-y-6">
                
                {/* TIP 16 Banner */}
                {activePassage.tip && (
                  <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 text-amber-900 text-sm shadow-2xs">
                    <div className="flex items-start gap-3">
                      <Lightbulb size={20} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-amber-950 mb-0.5">IELTS Exam Tip 16</div>
                        <p className="leading-relaxed">{activePassage.tip.replace('TIP 16: ', '')}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Word Box & Functions Guide */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  
                  {/* Word Box */}
                  <div className="lg:col-span-7 bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                      <HelpCircle size={14} className="text-blue-600" />
                      <span>Word Box (Chọn từ điền vào cột Signposting word/expression)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activePassage.wordBox?.map((word, wIdx) => {
                        const isExample = word === 'to begin with';
                        return (
                          <span 
                            key={wIdx}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                              isExample 
                                ? 'bg-gray-100 text-gray-400 border-gray-200 line-through' 
                                : 'bg-blue-50/80 text-blue-800 border-blue-200 hover:bg-blue-100 transition-colors'
                            }`}
                          >
                            {word}
                            {isExample && <span className="ml-1 text-[10px] text-gray-500">(Ví dụ)</span>}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Function Guide */}
                  <div className="lg:col-span-5 bg-white rounded-xl p-4 border border-gray-200 shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                      <Layers size={14} className="text-purple-600" />
                      <span>Ký hiệu chức năng (Function)</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {activePassage.functions?.map((f, fIdx) => (
                        <div key={fIdx} className="p-2 rounded-lg bg-gray-50 border border-gray-200 text-xs">
                          <span className="font-extrabold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded text-[11px] mr-1.5">
                            {f.code}
                          </span>
                          <span className="font-bold text-gray-800">{f.name}</span>
                          <div className="text-[11px] text-gray-500 truncate mt-0.5" title={f.desc}>
                            {f.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Signposting Interactive Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b border-gray-200">
                    <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                      Bảng câu hỏi: Signposting Words & Functions (Câu 1 – 20)
                    </h4>
                    <p className="text-xs text-gray-600 mt-0.5">
                      Nghe Audio Track 56 và điền từ nối tương ứng từ Word Box, sau đó ghi ký hiệu chức năng (SE, C, AD, SU, T hoặc AT).
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-gray-100/70 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-600 font-bold">
                          <th className="py-3 px-3 w-12 text-center">#</th>
                          <th className="py-3 px-4">Signposting word / expression (Câu số lẻ)</th>
                          <th className="py-3 px-4 w-48 sm:w-56">Function (Câu số chẵn)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        
                        {/* Example Row */}
                        {activePassage.tableExample && (
                          <tr className="bg-blue-50/40">
                            <td className="py-3 px-3 text-center font-bold text-gray-400 text-xs">Ex</td>
                            <td className="py-3 px-4 text-gray-800">
                              <span className="font-bold text-blue-900 underline decoration-blue-400 decoration-2">
                                {activePassage.tableExample.expression}
                              </span>
                              , let's look at the environmental concerns.
                            </td>
                            <td className="py-3 px-4">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200">
                                {activePassage.tableExample.functionLabel}
                              </span>
                            </td>
                          </tr>
                        )}

                        {/* Interactive Rows 1 to 10 */}
                        {activePassage.tableRows?.map((row) => {
                          const wordQ = activePassage.questions.find(q => q.id === row.wordQuestionId);
                          const funcQ = activePassage.questions.find(q => q.id === row.funcQuestionId);

                          const wordVal = answers[row.wordQuestionId] || '';
                          const funcVal = answers[row.funcQuestionId] || '';

                          const wordCorrect = wordQ && isSubmitted && isQuestionCorrect(wordQ);
                          const wordWrong = wordQ && isSubmitted && !isQuestionCorrect(wordQ);

                          const funcCorrect = funcQ && isSubmitted && isQuestionCorrect(funcQ);
                          const funcWrong = funcQ && isSubmitted && !isQuestionCorrect(funcQ);

                          return (
                            <tr key={row.rowNumber} className="hover:bg-gray-50/60 transition-colors">
                              <td className="py-3 px-3 text-center font-bold text-gray-600 text-xs align-top pt-4">
                                {row.rowNumber}
                              </td>

                              {/* Word Column */}
                              <td className="py-3 px-4 align-top">
                                <div className="flex flex-wrap items-center gap-1.5 text-gray-800 text-sm leading-relaxed">
                                  <span className="text-xs font-bold text-blue-600 shrink-0">
                                    ({wordQ?.number || (row.rowNumber * 2 - 1)})
                                  </span>
                                  {row.sentenceBefore && <span>{row.sentenceBefore}</span>}
                                  
                                  <div className="inline-block relative">
                                    <input
                                      type="text"
                                      disabled={isSubmitted}
                                      value={wordVal}
                                      onChange={(e) => handleInputChange(row.wordQuestionId, e.target.value)}
                                      placeholder={wordQ?.placeholder || 'Điền từ nối...'}
                                      className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all w-36 sm:w-44 focus:outline-none focus:ring-2 ${
                                        isSubmitted 
                                          ? (wordCorrect 
                                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-emerald-300' 
                                              : 'bg-rose-50 border-rose-400 text-rose-900 ring-rose-300')
                                          : 'bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-100 text-gray-900'
                                      }`}
                                    />
                                    {isSubmitted && (
                                      <span className="absolute right-2 top-2">
                                        {wordCorrect ? (
                                          <CheckCircle2 size={16} className="text-emerald-600" />
                                        ) : (
                                          <XCircle size={16} className="text-rose-600" />
                                        )}
                                      </span>
                                    )}
                                  </div>

                                  {row.sentenceAfter && <span>{row.sentenceAfter}</span>}
                                </div>

                                {/* Answer feedback & explanation if submitted */}
                                {isSubmitted && wordQ && (
                                  <div className="mt-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs space-y-1.5">
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-gray-700">Đáp án chuẩn:</span>
                                      <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                        {wordQ.primaryAnswer}
                                      </span>
                                    </div>
                                    <div className="text-gray-600">
                                      <strong className="text-gray-800">Manh mối bài nghe:</strong> "{wordQ.evidence}"
                                    </div>
                                    <div className="text-gray-700">
                                      <strong className="text-gray-800">Giải thích:</strong> {wordQ.explanation}
                                    </div>
                                  </div>
                                )}
                              </td>

                              {/* Function Column */}
                              <td className="py-3 px-4 align-top">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-purple-600 shrink-0">
                                    ({funcQ?.number || (row.rowNumber * 2)})
                                  </span>
                                  <div className="relative w-full">
                                    <input
                                      type="text"
                                      disabled={isSubmitted}
                                      value={funcVal}
                                      onChange={(e) => handleInputChange(row.funcQuestionId, e.target.value)}
                                      placeholder={funcQ?.placeholder || 'SE, C, AD...'}
                                      className={`w-full px-3 py-1.5 rounded-lg border text-sm font-bold uppercase transition-all focus:outline-none focus:ring-2 ${
                                        isSubmitted 
                                          ? (funcCorrect 
                                              ? 'bg-emerald-50 border-emerald-400 text-emerald-900 ring-emerald-300' 
                                              : 'bg-rose-50 border-rose-400 text-rose-900 ring-rose-300')
                                          : 'bg-white border-gray-300 focus:border-purple-500 focus:ring-purple-100 text-gray-900'
                                      }`}
                                    />
                                    {isSubmitted && (
                                      <span className="absolute right-2 top-2">
                                        {funcCorrect ? (
                                          <CheckCircle2 size={16} className="text-emerald-600" />
                                        ) : (
                                          <XCircle size={16} className="text-rose-600" />
                                        )}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {isSubmitted && funcQ && (
                                  <div className="mt-2.5 p-2.5 rounded-xl bg-purple-50/60 border border-purple-200 text-xs">
                                    <div className="flex items-center gap-1.5 mb-1">
                                      <span className="font-bold text-purple-900">Đáp án:</span>
                                      <span className="font-extrabold text-purple-800 bg-purple-200 px-1.5 py-0.5 rounded">
                                        {funcQ.primaryAnswer}
                                      </span>
                                    </div>
                                    <div className="text-purple-950 text-[11px] leading-relaxed">
                                      {funcQ.explanation}
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Next Part Button at bottom of Part 1 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <div className="text-xs text-gray-500 font-medium">
                    Đã hoàn thành Bài 1? Nhấn nút bên cạnh để chuyển sang phần trắc nghiệm Track 57.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTabId('p2');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer group shrink-0"
                  >
                    <span>Sang Bài 2: Multiple Choice (Track 57)</span>
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

              </div>
            )}

            {/* PART 2 RENDERER: Multiple Choice Questions */}
            {activePassage.id === 'p2' && (
              <div className="space-y-5">
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-xl p-4 text-blue-950 text-sm">
                  <div className="font-bold text-blue-900 mb-0.5">Hướng dẫn làm bài:</div>
                  <p className="leading-relaxed">{activePassage.instruction}</p>
                </div>

                <div className="space-y-4">
                  {activePassage.questions?.map((q) => {
                    const selectedLetter = answers[q.id] || '';
                    const correct = isSubmitted && isQuestionCorrect(q);
                    const wrong = isSubmitted && !isQuestionCorrect(q);

                    return (
                      <div 
                        key={q.id}
                        className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all ${
                          isSubmitted 
                            ? (correct 
                                ? 'border-emerald-300 bg-emerald-50/20 shadow-xs' 
                                : 'border-rose-300 bg-rose-50/20 shadow-xs')
                            : 'border-gray-200 shadow-xs hover:border-gray-300'
                        }`}
                      >
                        {/* Question Title */}
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                              {q.number}
                            </span>
                            <h4 className="font-bold text-gray-900 text-base leading-snug">
                              {q.question}
                            </h4>
                          </div>

                          {isSubmitted && (
                            <div>
                              {correct ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                                  <CheckCircle2 size={14} /> Chính xác
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-300">
                                  <XCircle size={14} /> Chưa đúng
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 gap-2.5">
                          {q.options?.map((opt) => {
                            const isSelected = selectedLetter.toUpperCase() === opt.letter.toUpperCase();
                            const isPrimary = q.primaryAnswer.toUpperCase() === opt.letter.toUpperCase();

                            let cardStyle = 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/40 text-gray-800';
                            if (isSelected) {
                              cardStyle = 'border-blue-600 bg-blue-50 text-blue-900 shadow-xs ring-2 ring-blue-500/20';
                            }
                            if (isSubmitted) {
                              if (isPrimary) {
                                cardStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-semibold ring-2 ring-emerald-500/30';
                              } else if (isSelected && !correct) {
                                cardStyle = 'border-rose-500 bg-rose-100/70 text-rose-950 line-through ring-2 ring-rose-500/30';
                              } else {
                                cardStyle = 'border-gray-200 opacity-60 text-gray-500';
                              }
                            }

                            return (
                              <button
                                key={opt.letter}
                                type="button"
                                disabled={isSubmitted}
                                onClick={() => handleSelectChoice(q.id, opt.letter)}
                                className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${cardStyle}`}
                              >
                                <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                  isSelected 
                                    ? 'bg-blue-600 text-white' 
                                    : (isSubmitted && isPrimary ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700')
                                }`}>
                                  {opt.letter}
                                </span>
                                <span className="text-sm leading-relaxed">{opt.text}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Evidence & Explanation box when submitted */}
                        {isSubmitted && (
                          <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200 text-xs sm:text-sm space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-700">Đáp án chuẩn:</span>
                              <span className="font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                {q.primaryAnswer}. {q.options?.find(o => o.letter === q.primaryAnswer)?.text}
                              </span>
                            </div>
                            <div className="text-gray-700">
                              <strong className="text-gray-900">Trích dẫn Audio:</strong> "{q.evidence}"
                            </div>
                            <div className="text-gray-700 leading-relaxed">
                              <strong className="text-gray-900">Giải thích chi tiết:</strong> {q.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Navigation at bottom of Part 2 */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTabId('p1');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs sm:text-sm transition-colors cursor-pointer group"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                    <span>Quay lại Bài 1: Signposting Words (Track 56)</span>
                  </button>

                  {!isSubmitted ? (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                      <CheckCircle2 size={16} />
                      <span>Hoàn thành & Nộp bài chấm điểm</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowResultsModal(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <Trophy size={16} />
                      <span>Xem bảng điểm tổng kết</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        )}
      </div>

      {/* Persistent CBT Bottom Action & Navigation Bar (Giống bên đề thi TestRoom) */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2.5 px-3 sm:px-6 z-40 shadow-2xl select-none">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: CBT Part 1 / Part 2 Navigation Tabs */}
          <div className="flex items-center gap-2.5 overflow-x-auto w-full md:w-auto py-0.5 no-scrollbar">
            {passages.map((p, idx) => {
              const isActive = activeTabId === p.id;
              const pQuestions = p.questions || [];
              const pAnswered = pQuestions.filter(q => answers[q.id] && answers[q.id].toString().trim() !== '').length;
              const pCorrect = isSubmitted ? pQuestions.filter(q => isQuestionCorrect(q)).length : 0;
              const partLabel = `PART ${idx + 1}`;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setActiveTabId(p.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`group flex flex-col items-start cursor-pointer transition-all px-3 py-1.5 rounded-xl border shrink-0 ${
                    isActive
                      ? 'bg-blue-50/90 border-blue-500 shadow-2xs'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                  title={`Chuyển sang ${p.shortTitle || p.title}`}
                >
                  {/* Top indicator bar */}
                  <div className={`w-full h-[2.5px] rounded-full mb-1 transition-all ${
                    isActive ? 'bg-blue-600' : 'bg-transparent group-hover:bg-gray-300'
                  }`} />
                  
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-black uppercase tracking-wider ${
                      isActive ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {partLabel}
                    </span>
                    <span className="text-xs text-gray-500 hidden sm:inline font-medium">
                      {p.shortTitle ? p.shortTitle.split(':')[1] || p.shortTitle : p.title}
                    </span>
                    <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-md ${
                      isSubmitted
                        ? (pCorrect === pQuestions.length ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700')
                        : (isActive ? 'bg-blue-200/70 text-blue-900' : 'bg-gray-200 text-gray-600')
                    }`}>
                      {isSubmitted ? `${pCorrect}/${pQuestions.length}` : `${pAnswered}/${pQuestions.length}`}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Overall progress indicator */}
            <div className="hidden lg:flex items-center gap-2 ml-1 pl-3 border-l border-gray-200 shrink-0">
              <div className="w-20 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.round((answeredCount / totalQuestions) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-gray-500 whitespace-nowrap">
                {answeredCount}/{totalQuestions} câu ({Math.round((answeredCount / totalQuestions) * 100)}%)
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
            {!isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save size={15} />
                  <span>Lưu nháp</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                >
                  <Send size={15} />
                  <span>Nộp bài chấm điểm</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowResultsModal(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Trophy size={15} />
                  <span>Xem kết quả ({score}/{totalQuestions})</span>
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw size={15} />
                  <span>Làm lại bài</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>

      {/* Results Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 mx-auto flex items-center justify-center shadow-lg mb-4">
              <Trophy size={32} />
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mb-1">
              Kết Quả Bài Làm Listening 6
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              {homework.title}
            </p>

            {/* Score Big Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Tổng số điểm đạt được
              </div>
              <div className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
                {score} <span className="text-2xl font-bold text-gray-400">/ {totalQuestions}</span>
              </div>
              <div className="text-sm font-bold text-emerald-600 mt-2">
                Tỷ lệ chính xác: {Math.round((score / totalQuestions) * 100)}%
              </div>
            </div>

            {/* Part Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-left">
              {passages.map((p, idx) => {
                const pQs = p.questions || [];
                const pCorrect = pQs.filter(q => isQuestionCorrect(q)).length;
                return (
                  <div key={p.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
                    <div className="font-bold text-gray-800 truncate mb-1">
                      Part {idx + 1}: {p.shortTitle}
                    </div>
                    <div className="font-extrabold text-blue-700 text-sm">
                      {pCorrect} / {pQs.length} câu đúng
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <button
                onClick={() => setShowResultsModal(false)}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-colors"
              >
                Xem chi tiết lời giải & bằng chứng
              </button>
              <button
                onClick={handleRetake}
                className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm transition-colors"
              >
                Làm lại từ đầu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
