import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  RotateCcw, 
  Save, 
  Send, 
  FileText, 
  HelpCircle,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import ReadingHomeworkView from '../components/homework/ReadingHomeworkView';
import ListeningHomeworkView from '../components/homework/ListeningHomeworkView';
import { PRE_IELTS_LISTENING_1_DETAIL, getHomeworkDetailById } from '../data/homeworkData';

export default function HomeworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const homework = getHomeworkDetailById(id) || PRE_IELTS_LISTENING_1_DETAIL;

  // If this is a Reading homework, render the specialized split-screen IELTS Reading component
  if (homework?.skill === 'Reading') {
    return <ReadingHomeworkView homework={homework} />;
  }

  // If this is a modern Listening homework with passages, render the specialized Listening component
  if (homework?.skill === 'Listening' && homework?.passages) {
    return <ListeningHomeworkView homework={homework} />;
  }

  // Answers state
  const [answers, setAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_hw_${id}_draft`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Track circled numbers in Exercise 2
  const [circledNumbers, setCircledNumbers] = useState(() => {
    try {
      const saved = localStorage.getItem(`dream_hw_${id}_circled`);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Submitted state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [expandedTranscripts, setExpandedTranscripts] = useState({});
  const [saveToast, setSaveToast] = useState(false);

  // Check if previously submitted in history
  useEffect(() => {
    try {
      const history = localStorage.getItem('dream_homework_history');
      if (history) {
        const parsed = JSON.parse(history);
        if (parsed[id]) {
          // Previously completed
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [id]);

  // Handle input changes
  const handleInputChange = (fieldId, val) => {
    if (isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [fieldId]: val
    }));
  };

  // Toggle circle for Ex 2
  const toggleCircleNumber = (numVal) => {
    if (isSubmitted) return;
    setCircledNumbers(prev => 
      prev.includes(numVal) ? prev.filter(n => n !== numVal) : [...prev, numVal]
    );
  };

  // Toggle transcript
  const toggleTranscript = (exId) => {
    setExpandedTranscripts(prev => ({
      ...prev,
      [exId]: !prev[exId]
    }));
  };

  // Save draft
  const handleSaveDraft = () => {
    try {
      localStorage.setItem(`dream_hw_${id}_draft`, JSON.stringify(answers));
      localStorage.setItem(`dream_hw_${id}_circled`, JSON.stringify(circledNumbers));
      setSaveToast(true);
      setTimeout(() => setSaveToast(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Normalization for checking answers
  const normalize = (text) => {
    if (!text) return '';
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ');
  };

  // Check correctness of an answer
  const isCorrect = (fieldId, acceptedList) => {
    const studentAns = normalize(answers[fieldId]);
    if (!studentAns) return false;
    return acceptedList.some(accepted => normalize(accepted) === studentAns);
  };

  // Calculate total answered & score
  const totalQuestions = 29; // 3 (ex1) + 8 (ex2 match) + 5 (ex3) + 2 (ex4) + 5 (ex5) + 3 (ex6) + 7 (ex7 p1) + 3 (ex7 p2)
  
  const calculateScore = () => {
    let score = 0;

    // Ex 1 (3 items)
    const ex1 = homework.exercises.find(e => e.id === 'ex1');
    ex1.fields.forEach(f => {
      if (isCorrect(f.id, f.acceptedAnswers)) score++;
    });

    // Ex 2 (8 matching pairs)
    const ex2 = homework.exercises.find(e => e.id === 'ex2');
    ex2.matchingPairs.forEach(m => {
      if (answers[m.id] === m.correctWord) score++;
    });

    // Ex 3 (5 items)
    const ex3 = homework.exercises.find(e => e.id === 'ex3');
    ex3.items.forEach(i => {
      if (isCorrect(i.id, i.acceptedAnswers)) score++;
    });

    // Ex 4 (2 items)
    const ex4 = homework.exercises.find(e => e.id === 'ex4');
    ex4.questions.forEach(q => {
      if (answers[q.id] === q.correctKey) score++;
    });

    // Ex 5 (5 items)
    const ex5 = homework.exercises.find(e => e.id === 'ex5');
    ex5.fields.forEach(f => {
      if (isCorrect(f.id, f.acceptedAnswers)) score++;
    });

    // Ex 6 (3 items)
    const ex6 = homework.exercises.find(e => e.id === 'ex6');
    ex6.tableRows.filter(r => r.isInput).forEach(r => {
      if (isCorrect(r.id, r.acceptedAnswers)) score++;
    });

    // Ex 7 Part 1 (7 items)
    const ex7 = homework.exercises.find(e => e.id === 'ex7');
    ex7.part1.fields.forEach(f => {
      if (isCorrect(f.id, f.acceptedAnswers)) score++;
    });

    // Ex 7 Part 2 (3 items)
    ex7.part2.questions.forEach(q => {
      if (answers[q.id] === q.correctKey) score++;
    });

    return score;
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).filter(k => answers[k] && answers[k].toString().trim() !== '').length;
  };

  // Submit
  const handleSubmit = () => {
    const finalScore = calculateScore();
    setIsSubmitted(true);
    setShowResultsModal(true);

    // Save to history
    try {
      const history = JSON.parse(localStorage.getItem('dream_homework_history') || '{}');
      history[id] = {
        score: finalScore,
        total: totalQuestions,
        completedAt: new Date().toISOString()
      };
      localStorage.setItem('dream_homework_history', JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRetake = () => {
    setIsSubmitted(false);
    setShowResultsModal(false);
    setAnswers({});
    setCircledNumbers([]);
    try {
      localStorage.removeItem(`dream_hw_${id}_draft`);
      localStorage.removeItem(`dream_hw_${id}_circled`);
    } catch (e) {
      console.error(e);
    }
  };

  const currentScore = isSubmitted ? calculateScore() : 0;
  const answeredCount = getAnsweredCount();

  const ex1 = homework.exercises[0];
  const ex2 = homework.exercises[1];
  const ex3 = homework.exercises[2];
  const ex4 = homework.exercises[3];
  const ex5 = homework.exercises[4];
  const ex6 = homework.exercises[5];
  const ex7 = homework.exercises[6];

  return (
    <div className="pt-20 pb-32 bg-[#f4f7fa] min-h-screen text-left text-gray-900">
      
      {/* Toast notification */}
      {saveToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 size={18} />
          <span>Đã lưu bài làm nháp thành công!</span>
        </div>
      )}

      {/* Top Breadcrumb & Title Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Link 
              to="/homework" 
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
              title="Quay lại danh sách bài tập"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {homework.level}
                </span>
                <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                  {homework.session}
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate max-w-md sm:max-w-xl">
                {homework.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <span className="text-xs text-gray-500 block">Tiến độ điền:</span>
              <span className="text-sm font-bold text-blue-700">
                {answeredCount} / {totalQuestions} câu
              </span>
            </div>
            {!isSubmitted ? (
              <button
                type="button"
                onClick={handleSaveDraft}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
              >
                <Save size={14} />
                <span className="hidden sm:inline">Lưu nháp</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetake}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 border border-amber-200 text-amber-800 hover:bg-amber-100 transition cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>Làm lại</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Form */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12 space-y-8">
        
        {/* Banner introduction */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">
                <Sparkles size={14} />
                <span>Bản quyền nội dung: Collins Get Ready for IELTS Listening</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black">
                Bài tập Listening Buổi 1: Friends Abroad
              </h2>
              <p className="text-xs sm:text-sm text-blue-100/90 mt-1 max-w-2xl leading-relaxed">
                {homework.description}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/20 text-center shrink-0">
              <div className="text-xs text-blue-200">Thời gian làm bài</div>
              <div className="text-lg font-black text-white">45 - 50 Phút</div>
              <div className="text-[11px] text-emerald-300 font-medium">Kèm 9 Audio gốc</div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 1 (Track 02) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 1: Complete the Notes
              </span>
              <span className="text-xs text-gray-500 font-medium">3 câu hỏi</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex1.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex1.prompt}
            </p>

            {/* Audio Player */}
            <div className="mt-4">
              <AudioPlayer src={ex1.audioSrc} title="Track 02: Friends planning visit" />
            </div>

            {/* Watch out callout */}
            <div className="mt-4 p-3.5 bg-amber-50/90 border border-amber-200/90 rounded-xl flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
              <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold text-amber-950">Watch Out! </strong>
                It's easy to confuse certain numbers that sound similar, for example: <em className="font-semibold">fifteen</em> and <em className="font-semibold">fifty</em>. Listen very carefully to hear which part of the word is spoken with more emphasis.
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="bg-[#fbfcff] border border-blue-100 rounded-xl p-5 space-y-4 max-w-2xl">
              <h4 className="font-bold text-gray-800 text-sm border-b border-gray-200/70 pb-2">
                Travel Arrival Notes:
              </h4>

              {ex1.fields.map(field => {
                const correct = isCorrect(field.id, field.acceptedAnswers);
                return (
                  <div key={field.id} className="space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[170px]">
                        {field.label} <span className="text-blue-600 font-bold">{field.prefix}</span>
                      </label>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={answers[field.id] || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          disabled={isSubmitted}
                          className={`w-full text-xs sm:text-sm px-3.5 py-2 rounded-lg border focus:outline-none transition-all ${
                            isSubmitted
                              ? correct
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium'
                                : 'bg-rose-50 border-rose-500 text-rose-950 font-medium'
                              : 'bg-white border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600'
                          }`}
                        />
                      </div>
                    </div>

                    {isSubmitted && (
                      <div className="pl-0 sm:pl-[178px] text-[11px] pt-1">
                        {correct ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Chính xác!
                          </span>
                        ) : (
                          <div className="text-rose-700 font-medium">
                            <span className="flex items-center gap-1">
                              <XCircle size={13} /> Đáp án đúng: <strong>{field.acceptedAnswers[0]}</strong>
                            </span>
                            <p className="text-gray-500 mt-0.5">{field.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Transcript Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleTranscript('ex1')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex1'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex1'] ? 'Ẩn tapescript Track 02' : 'Xem tapescript Track 02'}</span>
              </button>
              {expandedTranscripts['ex1'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex1.transcript}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 2 (Track 03) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 2: Numbers Discrimination & Matching
              </span>
              <span className="text-xs text-gray-500 font-medium">8 mục ghép</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex2.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex2.prompt}
            </p>

            {/* Audio Player */}
            <div className="mt-4">
              <AudioPlayer src={ex2.audioSrc} title="Track 03: Listen and circle numbers heard" />
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Step A: Circle numbers heard */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                <span>1. Nhấn vào các con số bạn nghe thấy trong băng:</span>
                <span className="text-[11px] font-normal text-gray-500">(Click để khoanh tròn / bỏ khoanh)</span>
              </h4>
              <div className="flex flex-wrap gap-3">
                {ex2.circleNumbers.map(item => {
                  const isSelected = circledNumbers.includes(item.val);
                  return (
                    <button
                      key={item.val}
                      type="button"
                      onClick={() => toggleCircleNumber(item.val)}
                      disabled={isSubmitted}
                      className={`w-14 h-14 rounded-full font-bold text-base transition-all flex items-center justify-center cursor-pointer border-2 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-4 ring-blue-100 scale-105'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      {item.val}
                    </button>
                  );
                })}
              </div>

              {isSubmitted && (
                <div className="mt-2 text-xs text-gray-600">
                  <span className="font-semibold text-blue-800">Các số có trong băng: </span>
                  18, 13, 80, 40, 15.
                </div>
              )}
            </div>

            {/* Step B: Matching Table */}
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-gray-800 mb-3">
                2. Ghép từng số với cách viết chữ tương ứng (Written forms):
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700 border-b border-gray-200">
                      <th className="p-3 font-bold w-12 text-center">STT</th>
                      <th className="p-3 font-bold w-24">Number</th>
                      <th className="p-3 font-bold">Chọn dạng chữ (Written forms)</th>
                      {isSubmitted && <th className="p-3 font-bold w-48">Kết quả & Đáp án</th>}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ex2.matchingPairs.map((pair, idx) => {
                      const selectedVal = answers[pair.id] || '';
                      const isCorrectMatch = selectedVal === pair.correctWord;
                      return (
                        <tr key={pair.id} className="hover:bg-gray-50/80">
                          <td className="p-3 text-center text-gray-500 font-semibold">{idx + 1}</td>
                          <td className="p-3 font-black text-gray-900 text-base">{pair.number}</td>
                          <td className="p-3">
                            <select
                              value={selectedVal}
                              onChange={(e) => handleInputChange(pair.id, e.target.value)}
                              disabled={isSubmitted}
                              className={`w-full max-w-xs text-xs sm:text-sm px-3 py-2 rounded-lg border focus:outline-none ${
                                isSubmitted
                                  ? isCorrectMatch
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold'
                                    : 'bg-rose-50 border-rose-500 text-rose-900 font-semibold'
                                  : 'bg-white border-gray-300 focus:border-blue-600'
                              }`}
                            >
                              <option value="">-- Chọn từ viết --</option>
                              {pair.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </td>
                          {isSubmitted && (
                            <td className="p-3">
                              {isCorrectMatch ? (
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <CheckCircle2 size={14} /> Chính xác ({pair.correctWord})
                                </span>
                              ) : (
                                <span className="text-rose-700 font-semibold flex items-center gap-1">
                                  <XCircle size={14} /> Đáp án đúng: <strong>{pair.correctWord}</strong>
                                </span>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Transcript Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleTranscript('ex2')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex2'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex2'] ? 'Ẩn tapescript Track 03' : 'Xem tapescript Track 03'}</span>
              </button>
              {expandedTranscripts['ex2'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex2.transcript}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 3 (Track 04) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 3: Sentence Numbers
              </span>
              <span className="text-xs text-gray-500 font-medium">5 câu hỏi</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex3.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex3.prompt}
            </p>

            {/* Audio Player */}
            <div className="mt-4">
              <AudioPlayer src={ex3.audioSrc} title="Track 04: Listen and write down numbers heard" />
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            <div className="bg-[#fbfcff] border border-blue-100 rounded-xl p-5 space-y-4">
              {ex3.items.map(item => {
                const correct = isCorrect(item.id, item.acceptedAnswers);
                return (
                  <div key={item.id} className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-800">
                      <span>{item.sentencePrefix}</span>
                      <input
                        type="text"
                        value={answers[item.id] || ''}
                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                        placeholder={item.placeholder}
                        disabled={isSubmitted}
                        className={`w-36 text-xs sm:text-sm px-2.5 py-1.5 rounded-lg border font-semibold text-center focus:outline-none transition-all ${
                          isSubmitted
                            ? correct
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-white border-gray-300 focus:border-blue-600'
                        }`}
                      />
                      <span>{item.sentenceSuffix}</span>
                    </div>

                    {isSubmitted && (
                      <div className="text-[11px] pt-1 pl-4">
                        {correct ? (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 size={13} /> Đúng!
                          </span>
                        ) : (
                          <div className="text-rose-700 font-medium">
                            <span className="flex items-center gap-1">
                              <XCircle size={13} /> Đáp án đúng: <strong>{item.acceptedAnswers[0]}</strong>
                            </span>
                            <p className="text-gray-500 mt-0.5">{item.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Transcript Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleTranscript('ex3')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex3'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex3'] ? 'Ẩn tapescript Track 04' : 'Xem tapescript Track 04'}</span>
              </button>
              {expandedTranscripts['ex3'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex3.transcript}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 4 (Audio 05 - 06) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 4: Spelling Multiple Choice
              </span>
              <span className="text-xs text-gray-500 font-medium">2 đoạn hội thoại</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex4.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex4.prompt}
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            
            {/* Conversation 1 */}
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white">
              <div className="mb-3">
                <span className="text-xs font-bold text-blue-700 block mb-2">Đoạn hội thoại i:</span>
                <AudioPlayer src={ex4.audioSrc1} title="Audio 05 (Conversation 1)" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3">
                {ex4.questions[0].questionText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ex4.questions[0].options.map(opt => {
                  const isChecked = answers[ex4.questions[0].id] === opt.key;
                  const isCorrectOpt = opt.key === ex4.questions[0].correctKey;
                  return (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isSubmitted
                          ? isCorrectOpt
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : isChecked
                              ? 'bg-rose-50 border-rose-500 text-rose-900 line-through'
                              : 'bg-gray-50 border-gray-200 opacity-60'
                          : isChecked
                            ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-200'
                            : 'bg-white border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={ex4.questions[0].id}
                        value={opt.key}
                        checked={isChecked}
                        onChange={(e) => handleInputChange(ex4.questions[0].id, e.target.value)}
                        disabled={isSubmitted}
                        className="text-blue-600"
                      />
                      <span className="font-bold text-xs uppercase text-gray-400">{opt.key}.</span>
                      <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
              {isSubmitted && (
                <div className="mt-3 text-xs">
                  {answers[ex4.questions[0].id] === ex4.questions[0].correctKey ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Chính xác: {ex4.questions[0].options.find(o => o.key === ex4.questions[0].correctKey)?.label}
                    </span>
                  ) : (
                    <span className="text-rose-700 font-medium">
                      Đáp án đúng là <strong>b. McEwan</strong> ({ex4.questions[0].explanation})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Conversation 2 */}
            <div className="border border-gray-200 rounded-xl p-4 sm:p-5 bg-white">
              <div className="mb-3">
                <span className="text-xs font-bold text-blue-700 block mb-2">Đoạn hội thoại ii:</span>
                <AudioPlayer src={ex4.audioSrc2} title="Audio 06 (Conversation 2)" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3">
                {ex4.questions[1].questionText}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {ex4.questions[1].options.map(opt => {
                  const isChecked = answers[ex4.questions[1].id] === opt.key;
                  const isCorrectOpt = opt.key === ex4.questions[1].correctKey;
                  return (
                    <label
                      key={opt.key}
                      className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        isSubmitted
                          ? isCorrectOpt
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                            : isChecked
                              ? 'bg-rose-50 border-rose-500 text-rose-900 line-through'
                              : 'bg-gray-50 border-gray-200 opacity-60'
                          : isChecked
                            ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-200'
                            : 'bg-white border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name={ex4.questions[1].id}
                        value={opt.key}
                        checked={isChecked}
                        onChange={(e) => handleInputChange(ex4.questions[1].id, e.target.value)}
                        disabled={isSubmitted}
                        className="text-blue-600"
                      />
                      <span className="font-bold text-xs uppercase text-gray-400">{opt.key}.</span>
                      <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
              {isSubmitted && (
                <div className="mt-3 text-xs">
                  {answers[ex4.questions[1].id] === ex4.questions[1].correctKey ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Chính xác: {ex4.questions[1].options.find(o => o.key === ex4.questions[1].correctKey)?.label}
                    </span>
                  ) : (
                    <span className="text-rose-700 font-medium">
                      Đáp án đúng là <strong>c. Westbourne</strong> ({ex4.questions[1].explanation})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Transcript Toggle */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => toggleTranscript('ex4')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex4'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex4'] ? 'Ẩn tapescript Audio 05 & 06' : 'Xem tapescript Audio 05 & 06'}</span>
              </button>
              {expandedTranscripts['ex4'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex4.transcript}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 5 (Audio 07 - Taxi Booking) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 5: Taxi Booking Form
              </span>
              <span className="text-xs text-gray-500 font-medium">5 thông tin cần điền</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex5.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex5.prompt}
            </p>

            {/* Audio Player */}
            <div className="mt-4">
              <AudioPlayer src={ex5.audioSrc} title="Audio 07: Taxi Booking conversation" />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-5 sm:p-7 bg-[#fafbfc] max-w-2xl mx-auto space-y-4">
              <div className="text-center pb-3 border-b border-gray-200">
                <span className="text-xs font-bold text-blue-800 tracking-wider uppercase">SWIFT CABS BOOKING CONFIRMATION</span>
                <h4 className="text-base sm:text-lg font-black text-gray-900 mt-0.5">
                  PASSENGER & TRIP DETAILS
                </h4>
              </div>

              {/* Fixed: Name of Passenger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm border-b border-gray-100 pb-2">
                <span className="font-bold text-gray-600 uppercase">NAME OF PASSENGER:</span>
                <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  {ex5.fixedInfo.passenger}
                </span>
              </div>

              {/* Field 1: Pick-up date and time */}
              <div className="space-y-1 border-b border-gray-100 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-gray-700">
                    PICK-UP DATE AND TIME: Wed 6th July, (1)
                  </span>
                  <input
                    type="text"
                    value={answers['ex5_q1'] || ''}
                    onChange={(e) => handleInputChange('ex5_q1', e.target.value)}
                    placeholder="e.g. 3.30 a.m."
                    disabled={isSubmitted}
                    className={`w-full sm:w-48 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                      isSubmitted
                        ? isCorrect('ex5_q1', ex5.fields[0].acceptedAnswers)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-500 text-rose-950'
                        : 'bg-white border-gray-300 focus:border-blue-600'
                    }`}
                  />
                </div>
                {isSubmitted && (
                  <div className="text-[11px] text-right">
                    {isCorrect('ex5_q1', ex5.fields[0].acceptedAnswers) ? (
                      <span className="text-emerald-700 font-semibold">Chính xác!</span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Đáp án: {ex5.fields[0].acceptedAnswers[0]}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Field 2: Pick-up point no. & street */}
              <div className="space-y-1 border-b border-gray-100 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-gray-700">
                    PICK-UP POINT: NO. & STREET: (2)
                  </span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={answers['ex5_q2'] || ''}
                      onChange={(e) => handleInputChange('ex5_q2', e.target.value)}
                      placeholder="Số nhà..."
                      disabled={isSubmitted}
                      className={`w-24 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold text-center ${
                        isSubmitted
                          ? isCorrect('ex5_q2', ex5.fields[1].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                    <span className="font-semibold text-gray-600">WILLOWSIDE BANK</span>
                  </div>
                </div>
                {isSubmitted && (
                  <div className="text-[11px] text-right">
                    {isCorrect('ex5_q2', ex5.fields[1].acceptedAnswers) ? (
                      <span className="text-emerald-700 font-semibold">Chính xác!</span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Đáp án: 60</span>
                    )}
                  </div>
                )}
              </div>

              {/* Field 3: Town */}
              <div className="space-y-1 border-b border-gray-100 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-gray-700">
                    TOWN: (3)
                  </span>
                  <input
                    type="text"
                    value={answers['ex5_q3'] || ''}
                    onChange={(e) => handleInputChange('ex5_q3', e.target.value)}
                    placeholder="Tên thị trấn..."
                    disabled={isSubmitted}
                    className={`w-full sm:w-48 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                      isSubmitted
                        ? isCorrect('ex5_q3', ex5.fields[2].acceptedAnswers)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-500 text-rose-950'
                        : 'bg-white border-gray-300 focus:border-blue-600'
                    }`}
                  />
                </div>
                {isSubmitted && (
                  <div className="text-[11px] text-right">
                    {isCorrect('ex5_q3', ex5.fields[2].acceptedAnswers) ? (
                      <span className="text-emerald-700 font-semibold">Chính xác!</span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Đáp án: ABINGDON</span>
                    )}
                  </div>
                )}
              </div>

              {/* Field 4: Postcode */}
              <div className="space-y-1 border-b border-gray-100 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-gray-700">
                    POSTCODE: (4)
                  </span>
                  <input
                    type="text"
                    value={answers['ex5_q4'] || ''}
                    onChange={(e) => handleInputChange('ex5_q4', e.target.value)}
                    placeholder="Mã bưu chính..."
                    disabled={isSubmitted}
                    className={`w-full sm:w-48 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold uppercase ${
                      isSubmitted
                        ? isCorrect('ex5_q4', ex5.fields[3].acceptedAnswers)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-500 text-rose-950'
                        : 'bg-white border-gray-300 focus:border-blue-600'
                    }`}
                  />
                </div>
                {isSubmitted && (
                  <div className="text-[11px] text-right">
                    {isCorrect('ex5_q4', ex5.fields[3].acceptedAnswers) ? (
                      <span className="text-emerald-700 font-semibold">Chính xác!</span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Đáp án: OX14 3HB</span>
                    )}
                  </div>
                )}
              </div>

              {/* Field 5: Mobile Number */}
              <div className="space-y-1 border-b border-gray-100 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                  <span className="font-bold text-gray-700">
                    MOBILE NUMBER: 07789 (5)
                  </span>
                  <input
                    type="text"
                    value={answers['ex5_q5'] || ''}
                    onChange={(e) => handleInputChange('ex5_q5', e.target.value)}
                    placeholder="6 chữ số tiếp theo..."
                    disabled={isSubmitted}
                    className={`w-full sm:w-48 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                      isSubmitted
                        ? isCorrect('ex5_q5', ex5.fields[4].acceptedAnswers)
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                          : 'bg-rose-50 border-rose-500 text-rose-950'
                        : 'bg-white border-gray-300 focus:border-blue-600'
                    }`}
                  />
                </div>
                {isSubmitted && (
                  <div className="text-[11px] text-right">
                    {isCorrect('ex5_q5', ex5.fields[4].acceptedAnswers) ? (
                      <span className="text-emerald-700 font-semibold">Chính xác!</span>
                    ) : (
                      <span className="text-rose-700 font-semibold">Đáp án: 612744 (07789 612744)</span>
                    )}
                  </div>
                )}
              </div>

              {/* Fixed: Destination */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm pt-1">
                <span className="font-bold text-gray-600 uppercase">DESTINATION:</span>
                <span className="font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  {ex5.fixedInfo.destination}
                </span>
              </div>
            </div>

            {/* Transcript Toggle */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => toggleTranscript('ex5')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex5'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex5'] ? 'Ẩn tapescript Audio 07' : 'Xem tapescript Audio 07'}</span>
              </button>
              {expandedTranscripts['ex5'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex5.transcript}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 6 (Track 08 - Landing Card Form) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 6: Landing Card Completion
              </span>
              <span className="text-xs text-gray-500 font-medium">3 mục thông tin</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex6.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              {ex6.prompt}
            </p>

            {/* Audio Player */}
            <div className="mt-4">
              <AudioPlayer src={ex6.audioSrc} title="Track 08: Complete the landing card form" />
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="border border-gray-300 rounded-xl overflow-hidden max-w-2xl mx-auto shadow-xs">
              <div className="bg-gray-800 text-white p-3 text-center">
                <span className="text-xs font-bold uppercase tracking-wider">UK BORDER AGENCY - LANDING CARD</span>
              </div>
              <div className="divide-y divide-gray-200 bg-white">
                {ex6.tableRows.map((row, idx) => (
                  <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-gray-50/50">
                    <span className="text-xs sm:text-sm font-semibold text-gray-700 min-w-[200px]">
                      {row.label}
                    </span>
                    <div className="flex-1 max-w-sm">
                      {row.isInput ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold text-xs">{row.prefix}</span>
                            <input
                              type="text"
                              value={answers[row.id] || ''}
                              onChange={(e) => handleInputChange(row.id, e.target.value)}
                              placeholder={row.placeholder}
                              disabled={isSubmitted}
                              className={`w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-medium ${
                                isSubmitted
                                  ? isCorrect(row.id, row.acceptedAnswers)
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                    : 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                                  : 'bg-white border-gray-300 focus:border-blue-600'
                              }`}
                            />
                          </div>
                          {isSubmitted && (
                            <div className="text-[11px]">
                              {isCorrect(row.id, row.acceptedAnswers) ? (
                                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                  <CheckCircle2 size={12} /> Đúng
                                </span>
                              ) : (
                                <div className="text-rose-700">
                                  <span>Đáp án: <strong>{row.acceptedAnswers[0]}</strong></span>
                                  <p className="text-gray-500">{row.explanation}</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs sm:text-sm font-mono font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded inline-block">
                          {row.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transcript Toggle */}
            <div className="pt-4">
              <button
                type="button"
                onClick={() => toggleTranscript('ex6')}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {expandedTranscripts['ex6'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                <span>{expandedTranscripts['ex6'] ? 'Ẩn tapescript Track 08' : 'Xem tapescript Track 08'}</span>
              </button>
              {expandedTranscripts['ex6'] && (
                <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                  {ex6.transcript}
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* EXERCISE 7 (Track 09 & 10 - Hotel Reservation & MCQ) */}
        {/* ------------------------------------------------------------- */}
        <section className="bg-white rounded-2xl border border-gray-200/90 shadow-xs overflow-hidden">
          <div className="border-b border-gray-100 p-5 sm:p-6 bg-slate-50/70">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-1 rounded-md">
                Phần 7: Exam Practice (Silver Tulip Hotel)
              </span>
              <span className="text-xs text-gray-500 font-medium">10 câu hỏi tổng hợp</span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {ex7.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
              Bài thi mẫu chuẩn format IELTS Listening Section 1 gồm 2 đoạn băng liên tiếp (Questions 1–7 và Questions 8–10).
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-8">
            
            {/* PART 1: QUESTIONS 1 - 7 */}
            <div>
              <div className="border-l-4 border-blue-600 pl-3 mb-4">
                <h4 className="text-sm font-bold text-gray-900">
                  Questions 1–7: Complete the form below
                </h4>
                <p className="text-xs text-amber-800 font-semibold">
                  Write NO MORE THAN THREE WORDS AND/OR A NUMBER
                </p>
              </div>

              {/* Audio Track 09 */}
              <div className="mb-4">
                <AudioPlayer src={ex7.audioSrc} title="Track 09: Hotel Reservation (Questions 1–7)" />
              </div>

              {/* Hotel Form Container */}
              <div className="border border-blue-200 rounded-2xl p-5 sm:p-6 bg-[#fbfcff] max-w-2xl mx-auto shadow-xs space-y-4">
                <div className="text-center pb-3 border-b border-blue-100">
                  <h5 className="font-black text-gray-900 text-base">
                    Silver Tulip Hotel
                  </h5>
                  <span className="text-xs font-semibold text-blue-700">Reservation Details</span>
                </div>

                {/* Fixed row: Number of nights */}
                <div className="flex justify-between items-center text-xs sm:text-sm border-b border-gray-100 pb-2">
                  <span className="font-semibold text-gray-600">Number of nights:</span>
                  <span className="font-mono font-bold bg-white border px-3 py-1 rounded">1</span>
                </div>

                {/* Question 1: Type of room (radio choice) */}
                <div className="space-y-1.5 border-b border-gray-100 pb-3">
                  <label className="text-xs sm:text-sm font-semibold text-gray-700 block">
                    Type of room: (circle one) <span className="text-blue-600 font-bold">(1)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {ex7.part1.fields[0].options.map(opt => {
                      const isChecked = answers['ex7_q1'] === opt;
                      const isCorrectChoice = opt === 'Double - king-sized bed';
                      return (
                        <label
                          key={opt}
                          className={`p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all flex items-center gap-2 ${
                            isSubmitted
                              ? isCorrectChoice
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                : isChecked
                                  ? 'bg-rose-50 border-rose-500 text-rose-950 line-through'
                                  : 'bg-white opacity-60'
                              : isChecked
                                ? 'bg-blue-100 border-blue-600 text-blue-900 font-semibold'
                                : 'bg-white border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <input
                            type="radio"
                            name="ex7_q1"
                            value={opt}
                            checked={isChecked}
                            onChange={(e) => handleInputChange('ex7_q1', e.target.value)}
                            disabled={isSubmitted}
                            className="text-blue-600"
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q1', ex7.part1.fields[0].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: Double - king-sized bed</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 2: Name */}
                <div className="space-y-1 border-b border-gray-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Name: <span className="text-blue-600 font-bold">(2)</span>
                    </span>
                    <input
                      type="text"
                      value={answers['ex7_q2'] || ''}
                      onChange={(e) => handleInputChange('ex7_q2', e.target.value)}
                      placeholder="e.g. Edward Francis"
                      disabled={isSubmitted}
                      className={`w-full sm:w-56 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                        isSubmitted
                          ? isCorrect('ex7_q2', ex7.part1.fields[1].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q2', ex7.part1.fields[1].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: Edward Francis</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 3: Home address */}
                <div className="space-y-1 border-b border-gray-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Home address: <span className="text-blue-600 font-bold">(3)</span>
                    </span>
                    <div className="flex items-center gap-1.5 w-full sm:w-64">
                      <input
                        type="text"
                        value={answers['ex7_q3'] || ''}
                        onChange={(e) => handleInputChange('ex7_q3', e.target.value)}
                        placeholder="e.g. 23 Cypress"
                        disabled={isSubmitted}
                        className={`w-full text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                          isSubmitted
                            ? isCorrect('ex7_q3', ex7.part1.fields[2].acceptedAnswers)
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                              : 'bg-rose-50 border-rose-500 text-rose-950'
                            : 'bg-white border-gray-300 focus:border-blue-600'
                        }`}
                      />
                      <span className="text-xs text-gray-500 shrink-0 font-medium">Avenue, Cambridge</span>
                    </div>
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q3', ex7.part1.fields[2].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: 23 Cypress</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 4: Postcode */}
                <div className="space-y-1 border-b border-gray-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Postcode: <span className="text-blue-600 font-bold">(4)</span>
                    </span>
                    <input
                      type="text"
                      value={answers['ex7_q4'] || ''}
                      onChange={(e) => handleInputChange('ex7_q4', e.target.value)}
                      placeholder="Mã bưu cục..."
                      disabled={isSubmitted}
                      className={`w-full sm:w-56 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold uppercase ${
                        isSubmitted
                          ? isCorrect('ex7_q4', ex7.part1.fields[3].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q4', ex7.part1.fields[3].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: CB3 9NF</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 5: Transport */}
                <div className="space-y-1 border-b border-gray-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Transport: <span className="text-blue-600 font-bold">(5)</span>
                    </span>
                    <input
                      type="text"
                      value={answers['ex7_q5'] || ''}
                      onChange={(e) => handleInputChange('ex7_q5', e.target.value)}
                      placeholder="e.g. Taxi"
                      disabled={isSubmitted}
                      className={`w-full sm:w-56 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                        isSubmitted
                          ? isCorrect('ex7_q5', ex7.part1.fields[4].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q5', ex7.part1.fields[4].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: Taxi</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 6: Meals */}
                <div className="space-y-1 border-b border-gray-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Meals: <span className="text-blue-600 font-bold">(6)</span>
                    </span>
                    <input
                      type="text"
                      value={answers['ex7_q6'] || ''}
                      onChange={(e) => handleInputChange('ex7_q6', e.target.value)}
                      placeholder="e.g. Breakfast"
                      disabled={isSubmitted}
                      className={`w-full sm:w-56 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                        isSubmitted
                          ? isCorrect('ex7_q6', ex7.part1.fields[5].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q6', ex7.part1.fields[5].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: Breakfast</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Question 7: Date of arrival */}
                <div className="space-y-1 pb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <span className="font-semibold text-gray-700">
                      Date of arrival: <span className="text-blue-600 font-bold">(7)</span>
                    </span>
                    <input
                      type="text"
                      value={answers['ex7_q7'] || ''}
                      onChange={(e) => handleInputChange('ex7_q7', e.target.value)}
                      placeholder="e.g. Friday 16th April"
                      disabled={isSubmitted}
                      className={`w-full sm:w-56 text-xs sm:text-sm px-3 py-1.5 rounded-lg border font-semibold ${
                        isSubmitted
                          ? isCorrect('ex7_q7', ex7.part1.fields[6].acceptedAnswers)
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                            : 'bg-rose-50 border-rose-500 text-rose-950'
                          : 'bg-white border-gray-300 focus:border-blue-600'
                      }`}
                    />
                  </div>
                  {isSubmitted && (
                    <div className="text-[11px] text-right">
                      {isCorrect('ex7_q7', ex7.part1.fields[6].acceptedAnswers) ? (
                        <span className="text-emerald-700 font-semibold">Chính xác!</span>
                      ) : (
                        <span className="text-rose-700 font-semibold">Đáp án: Friday 16th April</span>
                      )}
                    </div>
                  )}
                </div>

              </div>

              {/* Transcript Part 1 */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => toggleTranscript('ex7_p1')}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {expandedTranscripts['ex7_p1'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>{expandedTranscripts['ex7_p1'] ? 'Ẩn tapescript Track 09' : 'Xem tapescript Track 09'}</span>
                </button>
                {expandedTranscripts['ex7_p1'] && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                    {ex7.transcriptPart1}
                  </div>
                )}
              </div>
            </div>

            {/* PART 2: QUESTIONS 8 - 10 */}
            <div className="border-t border-gray-200 pt-6">
              <div className="border-l-4 border-indigo-600 pl-3 mb-4">
                <h4 className="text-sm font-bold text-gray-900">
                  Questions 8–10: Choose the correct letter, a, b or c
                </h4>
                <p className="text-xs text-gray-600">
                  {ex7.promptPart2}
                </p>
              </div>

              {/* Audio Track 10 */}
              <div className="mb-4">
                <AudioPlayer src={ex7.audioSrcPart2} title="Track 10: Conversation continuation (Questions 8–10)" />
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                {ex7.part2.questions.map(q => {
                  const selectedVal = answers[q.id];
                  const isCorrectAnswer = selectedVal === q.correctKey;
                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-gray-200 bg-white space-y-2">
                      <p className="font-bold text-xs sm:text-sm text-gray-800">
                        {q.number}. {q.text}
                      </p>
                      <div className="space-y-1.5 pl-2">
                        {q.options.map(opt => {
                          const isOptionChecked = selectedVal === opt.key;
                          const isTheRightOne = opt.key === q.correctKey;
                          return (
                            <label
                              key={opt.key}
                              className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs sm:text-sm cursor-pointer transition-all ${
                                isSubmitted
                                  ? isTheRightOne
                                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                                    : isOptionChecked
                                      ? 'bg-rose-50 border-rose-500 text-rose-950 line-through'
                                      : 'opacity-60 bg-white border-gray-200'
                                  : isOptionChecked
                                    ? 'bg-blue-50 border-blue-600 text-blue-900 font-semibold'
                                    : 'bg-white border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name={q.id}
                                value={opt.key}
                                checked={isOptionChecked}
                                onChange={(e) => handleInputChange(q.id, e.target.value)}
                                disabled={isSubmitted}
                                className="text-blue-600"
                              />
                              <span className="font-bold uppercase text-gray-400">{opt.key}.</span>
                              <span>{opt.label}</span>
                            </label>
                          );
                        })}
                      </div>

                      {isSubmitted && (
                        <div className="text-[11px] pt-1 pl-2">
                          {isCorrectAnswer ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <CheckCircle2 size={13} /> Chính xác!
                            </span>
                          ) : (
                            <span className="text-rose-700 font-medium">
                              Đáp án đúng: <strong>{q.correctKey.toUpperCase()}</strong> ({q.explanation})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Transcript Part 2 */}
              <div className="pt-4 max-w-2xl mx-auto">
                <button
                  type="button"
                  onClick={() => toggleTranscript('ex7_p2')}
                  className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  {expandedTranscripts['ex7_p2'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  <span>{expandedTranscripts['ex7_p2'] ? 'Ẩn tapescript Track 10' : 'Xem tapescript Track 10'}</span>
                </button>
                {expandedTranscripts['ex7_p2'] && (
                  <div className="mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono whitespace-pre-line text-gray-700">
                    {ex7.transcriptPart2}
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

      </div>

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 py-3 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">
              {answeredCount}/{totalQuestions}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900">
                {isSubmitted ? 'Bài đã được chấm điểm' : 'Tiến độ làm bài tập'}
              </div>
              <div className="text-[11px] text-gray-500">
                {isSubmitted
                  ? `Điểm đạt được: ${currentScore}/${totalQuestions} câu (${Math.round((currentScore / totalQuestions) * 100)}%)`
                  : `Đã điền ${answeredCount} trên tổng số ${totalQuestions} câu hỏi`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isSubmitted ? (
              <>
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-gray-200 text-gray-700 transition cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={14} />
                  <span className="hidden sm:inline">Lưu nháp</span>
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white shadow-md transition active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Send size={15} />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowResultsModal(true)}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-blue-700 text-white hover:bg-blue-800 transition cursor-pointer"
                >
                  Xem tổng kết điểm
                </button>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-100 text-amber-900 hover:bg-amber-200 transition cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw size={14} />
                  <span>Làm lại</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Summary Modal */}
      {showResultsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-center relative border border-gray-100 animate-in fade-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-xl font-black text-gray-900 mb-1">
              Hoàn thành bài tập Listening 1!
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Bạn đã nộp bài tập và hệ thống đã chấm điểm chi tiết.
            </p>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-5 mb-6">
              <div className="text-xs uppercase font-bold text-blue-800 tracking-wider mb-1">
                KẾT QUẢ ĐẠT ĐƯỢC
              </div>
              <div className="text-4xl font-black text-blue-900 tracking-tight">
                {currentScore} <span className="text-lg font-semibold text-gray-500">/ {totalQuestions}</span>
              </div>
              <div className="text-sm font-bold text-blue-700 mt-1">
                Tỉ lệ chính xác: {Math.round((currentScore / totalQuestions) * 100)}%
              </div>
              <div className="text-xs text-gray-600 mt-2 font-medium">
                {currentScore >= 24 
                  ? '🌟 Xuất sắc! Bạn nắm rất vững kỹ năng nghe số và thông tin cá nhân.'
                  : currentScore >= 18
                    ? '👍 Khá tốt! Hãy xem kỹ lại các câu sai để tránh bẫy phát âm đuôi -teen và -ty.'
                    : '💪 Cần cố gắng hơn! Hãy nghe lại các audio và đối chiếu tapescript.'}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowResultsModal(false)}
                className="flex-1 py-3 px-4 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm transition cursor-pointer shadow-sm"
              >
                Xem chi tiết lời giải & Tapescript
              </button>
              <button
                type="button"
                onClick={() => navigate('/homework')}
                className="py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm transition cursor-pointer"
              >
                Về danh sách
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
