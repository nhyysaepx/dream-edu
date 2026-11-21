import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Sparkles, 
  GraduationCap, 
  Mic, 
  Square, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Send, 
  Loader2, 
  ChevronRight,
  Edit3,
  Award,
  Volume2
} from 'lucide-react';
import { getSpeakingMockTestById } from '../data/speakingData';
import { generateRandomSpeakingMockTest } from '../data/speakingForecastBank';
import { getStoredStudent, saveStoredStudent } from '../utils/studentStorage';
import SpeakingRecorder from '../components/speaking/SpeakingRecorder';
import SpeakingEvaluationResult from '../components/speaking/SpeakingEvaluationResult';
import { 
  assessAudioWithAzure, 
  evaluateSpeakingWithAI, 
  submitSpeakingEvaluationToSystem 
} from '../services/speechAssessmentService';

export default function SpeakingMockRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Generate random test from Speaking Forecast bank by default, or find specific mock test
  const [test, setTest] = useState(() => {
    if (!id || id === 'random' || id === 'vol1-speak-1') {
      return generateRandomSpeakingMockTest();
    }
    const found = getSpeakingMockTestById(id);
    return found || generateRandomSpeakingMockTest();
  });

  const handleRegenerateRandomTest = () => {
    const newTest = generateRandomSpeakingMockTest();
    setTest(newTest);
    setRecordedResponses([]);
    setCurrentRecording(null);
    setP1Index(0);
    setP3Index(0);
    setPrepNotes('');
    setErrorMessage('');
  };

  // Student info from localStorage
  const [studentInfo, setStudentInfo] = useState(() => getStoredStudent());
  const [isEditingStudent, setIsEditingStudent] = useState(false);

  // Test Flow States: 'intro' | 'part1' | 'part2_prep' | 'part2_speak' | 'part3' | 'submitting' | 'result'
  const [testStage, setTestStage] = useState('intro');

  // Part 1 index
  const [p1Index, setP1Index] = useState(0);

  // Part 2 Cue card prep timer & notepad
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [prepNotes, setPrepNotes] = useState('');
  const prepTimerRef = useRef(null);

  // Part 3 index
  const [p3Index, setP3Index] = useState(0);

  // Recorded answers for each part
  // responses: Array of { part: 'Part 1' | 'Part 2' | 'Part 3', question: string, durationSeconds, blob, base64, mimeType, azureMetrics }
  const [recordedResponses, setRecordedResponses] = useState([]);
  const [currentRecording, setCurrentRecording] = useState(null);
  const [azureMetricsMap, setAzureMetricsMap] = useState({});

  // Evaluation & submission state
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [combinedAzure, setCombinedAzure] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      clearInterval(prepTimerRef.current);
    };
  }, []);

  const handleSaveStudent = (e) => {
    e.preventDefault();
    saveStoredStudent(studentInfo);
    setIsEditingStudent(false);
  };

  const handleStartTest = () => {
    if (!studentInfo.name.trim()) {
      setIsEditingStudent(true);
      setErrorMessage('Vui lòng nhập Họ và tên trước khi bước vào phòng thi.');
      return;
    }
    setTestStage('part1');
    setP1Index(0);
    setErrorMessage('');
  };

  // When recording for current step is completed
  const handleCurrentRecordingComplete = (data) => {
    setCurrentRecording(data);
  };

  // Next Question in Part 1
  const handlePart1Next = async () => {
    if (!currentRecording) {
      setErrorMessage('Vui lòng ghi âm câu trả lời trước khi chuyển câu.');
      return;
    }

    const currentP1Q = test.parts[0].questions[p1Index];
    const answerIdx = recordedResponses.length;
    const recData = {
      part: 'Part 1',
      question: currentP1Q.prompt,
      durationSeconds: currentRecording.durationSeconds,
      blob: currentRecording.blob,
      url: currentRecording.url,
      base64: currentRecording.base64,
      mimeType: currentRecording.mimeType
    };

    setRecordedResponses((prev) => [...prev, recData]);

    // Kích hoạt ngay đo sóng âm Azure ngầm cho câu này
    if (currentRecording.blob) {
      assessAudioWithAzure(currentRecording.blob)
        .then((res) => {
          if (res?.hasData) {
            setAzureMetricsMap((prev) => ({ ...prev, [answerIdx]: res }));
          }
        })
        .catch(() => {});
    }

    setCurrentRecording(null);
    setErrorMessage('');

    if (p1Index < test.parts[0].questions.length - 1) {
      setP1Index((prev) => prev + 1);
    } else {
      // Transition to Part 2 Preparation
      setTestStage('part2_prep');
      setPrepTimeLeft(test.parts[1].prepTimeSeconds || 60);
      startPrepCountdown();
    }
  };

  // Start 60s countdown for Part 2 Cue card
  const startPrepCountdown = () => {
    clearInterval(prepTimerRef.current);
    prepTimerRef.current = setInterval(() => {
      setPrepTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(prepTimerRef.current);
          setTestStage('part2_speak');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSkipPrepTimer = () => {
    clearInterval(prepTimerRef.current);
    setTestStage('part2_speak');
  };

  // Finish Part 2 Speech
  const handlePart2Next = () => {
    if (!currentRecording) {
      setErrorMessage('Vui lòng ghi âm bài nói Part 2 trước khi chuyển tiếp.');
      return;
    }

    const cueCard = test.parts[1].cueCard;
    const answerIdx = recordedResponses.length;
    const recData = {
      part: 'Part 2 (Cue Card)',
      question: cueCard.prompt,
      durationSeconds: currentRecording.durationSeconds,
      blob: currentRecording.blob,
      url: currentRecording.url,
      base64: currentRecording.base64,
      mimeType: currentRecording.mimeType
    };

    setRecordedResponses((prev) => [...prev, recData]);

    // Kích hoạt ngay đo sóng âm Azure ngầm cho Part 2 trong lúc thí sinh chuẩn bị và làm Part 3
    if (currentRecording.blob) {
      assessAudioWithAzure(currentRecording.blob)
        .then((res) => {
          if (res?.hasData) {
            setAzureMetricsMap((prev) => ({ ...prev, [answerIdx]: res }));
          }
        })
        .catch(() => {});
    }

    setCurrentRecording(null);
    setErrorMessage('');
    setTestStage('part3');
    setP3Index(0);
  };

  // Next Question in Part 3
  const handlePart3Next = async () => {
    if (!currentRecording) {
      setErrorMessage('Vui lòng ghi âm câu trả lời trước khi chuyển câu.');
      return;
    }

    const currentP3Q = test.parts[2].questions[p3Index];
    const answerIdx = recordedResponses.length;
    const recData = {
      part: 'Part 3',
      question: currentP3Q.prompt,
      durationSeconds: currentRecording.durationSeconds,
      blob: currentRecording.blob,
      url: currentRecording.url,
      base64: currentRecording.base64,
      mimeType: currentRecording.mimeType
    };

    const newResponses = [...recordedResponses, recData];
    setRecordedResponses(newResponses);

    // Kích hoạt ngay đo sóng âm Azure ngầm cho câu Part 3 này
    if (currentRecording.blob) {
      assessAudioWithAzure(currentRecording.blob)
        .then((res) => {
          if (res?.hasData) {
            setAzureMetricsMap((prev) => ({ ...prev, [answerIdx]: res }));
          }
        })
        .catch(() => {});
    }

    setCurrentRecording(null);
    setErrorMessage('');

    if (p3Index < test.parts[2].questions.length - 1) {
      setP3Index((prev) => prev + 1);
    } else {
      // Completed all 3 parts -> Trigger Full Assessment Pipeline
      await runFullTestEvaluation(newResponses);
    }
  };

  // Run full evaluation over all 3 parts
  const runFullTestEvaluation = async (allResponses) => {
    setTestStage('submitting');
    setIsEvaluating(true);
    setErrorMessage('');

    try {
      // Step 1: Đo sóng âm và gỡ băng song song qua Azure Speech cho tất cả câu trả lời (kết hợp các câu đã chạy ngầm)
      setStatusMessage('1/2: Đang hoàn tất đo sóng âm và phát âm qua Azure Speech...');
      const azureMap = { ...azureMetricsMap };
      await Promise.all(
        allResponses.map(async (r, idx) => {
          if (!azureMap[idx]?.hasData && r.blob) {
            try {
              const res = await assessAudioWithAzure(r.blob);
              if (res?.hasData) {
                azureMap[idx] = res;
              }
            } catch (e) {
              console.warn('Azure check note for response', idx, e);
            }
          }
        })
      );
      setAzureMetricsMap(azureMap);

      const part2Idx = allResponses.findIndex((r) => r.part && r.part.includes('Part 2'));
      const combinedAzure = (part2Idx !== -1 && azureMap[part2Idx]) || azureMap[0] || { hasData: false };
      setCombinedAzure(combinedAzure);
      const part2Response = (part2Idx !== -1 ? allResponses[part2Idx] : null) || allResponses[0];

      // Step 2: Gemini Full IELTS Speaking Evaluation across all 3 parts
      setStatusMessage('2/2: Giám khảo AI đang chấm tổng thể 4 tiêu chí IELTS và phân tích từng phần, từng câu...');
      const evalPayload = {
        mode: 'mock_test',
        testTitle: test.title,
        targetLevel: 'IELTS Standard Band 6.5 - 7.5',
        responses: allResponses.map((r, idx) => {
          const az = azureMap[idx];
          const hasTranscript = Boolean(az?.transcript && az.transcript.trim());
          return {
            part: r.part,
            question: r.question,
            durationSeconds: r.durationSeconds,
            transcript: hasTranscript ? az.transcript : '',
            audioBase64: hasTranscript ? null : r.base64,
            audioMimeType: r.mimeType,
            azureMetrics: az || null
          };
        })
      };

      const evalRes = await evaluateSpeakingWithAI(evalPayload);
      if (!evalRes.success) {
        throw new Error(evalRes.error || 'Lỗi khi gọi AI chấm bài thi thử.');
      }
      const finalEval = evalRes.evaluation;
      setEvaluation(finalEval);
      setTestStage('result');
      setIsEvaluating(false);

      // Save Part 2 recording to Google Drive & Google Sheets (tab Speaking) in background
      submitSpeakingEvaluationToSystem({
        studentInfo,
        sessionName: test.session || 'IELTS Speaking Mock Room',
        testTitle: test.title,
        evaluation: finalEval,
        azureMetrics: combinedAzure,
        audioBase64: part2Response ? part2Response.base64 : null,
        audioMimeType: part2Response ? part2Response.mimeType : 'audio/webm',
        mode: 'mock_test',
        transcript: combinedAzure?.transcript || ''
      }).catch((submitErr) => {
        console.warn('Background mock test submission note:', submitErr);
      });
    } catch (err) {
      console.error('Mock test evaluation error:', err);
      setErrorMessage(err.message || 'Đã có lỗi khi phân tích kết quả bài thi. Vui lòng thử lại.');
      setTestStage('part3'); // Let student retry submit
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#fafbfc] min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/speaking"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Quay lại Thư viện Speaking</span>
          </Link>

          <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            {test.badge}
          </span>
        </div>

        {/* ========================================================
            STAGE 0: INTRODUCTION / WELCOME SCREEN
           ======================================================== */}
        {testStage === 'intro' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-sm animate-pop-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                🎙️
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {test.session}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                  {test.title}
                </h1>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {test.description}
            </p>

            {/* Speaking Forecast Random Generator Banner */}
            <div className="my-6 p-4 bg-purple-50/80 border border-purple-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold text-base shadow-xs">
                  🎲
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-purple-950">Bộ đề ngẫu nhiên từ Speaking Forecast 2026</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/70 text-purple-900 border border-purple-300/60">
                      45 P1 Topics + 70 P2/3 Sets
                    </span>
                  </div>
                  <p className="text-[11px] text-purple-800/90 mt-0.5">
                    Hệ thống tự động bốc ngẫu nhiên kết hợp 1 chủ đề Part 1 + 1 Cue Card Part 2 và 3 câu hỏi thảo luận Part 3.
                  </p>
                </div>
              </div>

              <button
                onClick={handleRegenerateRandomTest}
                className="w-full sm:w-auto px-4 py-2 bg-white hover:bg-purple-100 text-purple-800 border border-purple-300 font-extrabold text-xs rounded-xl transition-all shrink-0 cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
              >
                <Sparkles size={13} className="text-purple-600" />
                <span>Đổi đề thi khác</span>
              </button>
            </div>

            {/* Test Structure Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                <span className="text-[11px] font-black text-blue-800 uppercase block mb-1">
                  Part 1: Phản xạ (4-5 phút)
                </span>
                <p className="text-xs text-gray-700">
                  {test.parts[0].questions.length} câu hỏi ngắn về đời sống, thói quen và nơi ở.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                <span className="text-[11px] font-black text-amber-800 uppercase block mb-1">
                  Part 2: Cue Card (3-4 phút)
                </span>
                <p className="text-xs text-gray-700">
                  60 giây ghi nháp dàn ý + 120 giây nói độc thoại liên tục.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80">
                <span className="text-[11px] font-black text-purple-800 uppercase block mb-1">
                  Part 3: Thảo luận (4-5 phút)
                </span>
                <p className="text-xs text-gray-700">
                  {test.parts[2].questions.length} câu hỏi chiều sâu mở rộng từ chủ đề Part 2.
                </p>
              </div>
            </div>

            {/* Student Info Box */}
            <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  Thông tin Thí sinh dự thi:
                </span>
                <button
                  onClick={() => setIsEditingStudent(!isEditingStudent)}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer"
                >
                  {isEditingStudent ? 'Đóng' : 'Chỉnh sửa'}
                </button>
              </div>

              {!isEditingStudent ? (
                <div className="flex items-center gap-3 text-sm text-gray-900">
                  <strong>{studentInfo.name || '(Chưa nhập tên)'}</strong>
                  {studentInfo.className && (
                    <span className="text-xs bg-white px-2.5 py-0.5 rounded-md border font-semibold text-blue-800">
                      Lớp: {studentInfo.className}
                    </span>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSaveStudent} className="space-y-3 mt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={studentInfo.name}
                      onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                      placeholder="Họ và tên thí sinh *"
                      className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
                    />
                    <input
                      type="text"
                      value={studentInfo.className}
                      onChange={(e) => setStudentInfo({ ...studentInfo, className: e.target.value })}
                      placeholder="Mã lớp (ví dụ: PRE-001)"
                      className="bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    Lưu
                  </button>
                </form>
              )}
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              onClick={handleStartTest}
              className="w-full py-4 bg-gradient-to-r from-primary to-[#1e3061] hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>BẮT ĐẦU VÀO PHÒNG THI</span>
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ========================================================
            STAGE 1: PART 1 (INTERVIEW)
           ======================================================== */}
        {testStage === 'part1' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs animate-pop-in space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-gray-150 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                  {test.parts[0].title}
                </span>
                <p className="text-xs text-gray-500 mt-1">Chủ đề: {test.parts[0].topic || test.parts[0].name || test.parts[0].title}</p>
              </div>
              <span className="text-xs font-extrabold text-gray-600 bg-gray-100 px-3 py-1 rounded-xl">
                Câu {p1Index + 1} / {test.parts[0].questions.length}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                Examiner's Question:
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                "{test.parts[0].questions[p1Index].prompt}"
              </h2>
            </div>

            {test.parts[0].questions[p1Index].hintVi && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <span>💡</span>
                <span><strong>Gợi ý:</strong> {test.parts[0].questions[p1Index].hintVi}</span>
              </div>
            )}

            <SpeakingRecorder
              recommendedDuration={test.parts[0].questions[p1Index].recommendedDuration || 30}
              onRecordingComplete={handleCurrentRecordingComplete}
              questionPrompt={test.parts[0].questions[p1Index].prompt}
            />

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-150">
              <button
                onClick={handlePart1Next}
                className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <span>{p1Index < test.parts[0].questions.length - 1 ? 'Chuyển câu tiếp theo' : 'Hoàn thành Part 1 ➔ Sang Part 2'}</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 2A: PART 2 CUE CARD PREPARATION (60s countdown)
           ======================================================== */}
        {testStage === 'part2_prep' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs animate-pop-in space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-gray-150 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                  Part 2: 1 Phút Chuẩn Bị Dàn Ý (Preparation Time)
                </span>
                <p className="text-xs text-gray-500 mt-1">Đọc kỹ thẻ Cue Card và gõ nhanh từ khóa vào ô nháp bên dưới</p>
              </div>

              {/* Countdown badge */}
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-2xl text-red-700 font-black text-lg">
                <Clock size={18} className="animate-spin" />
                <span>00:{String(prepTimeLeft).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Cue Card Prompt Box */}
            <div className="p-6 rounded-2xl bg-amber-50/40 border-2 border-dashed border-amber-300">
              <h2 className="text-lg font-black text-gray-900 mb-3">
                {test.parts[1].cueCard.prompt}
              </h2>
              <p className="text-xs text-gray-600 font-semibold mb-2">You should say:</p>
              <ul className="space-y-1.5 pl-5 list-disc text-xs text-gray-800 leading-relaxed">
                {test.parts[1].cueCard.bulletPoints.map((bp, idx) => (
                  <li key={idx}>{bp}</li>
                ))}
              </ul>
            </div>

            {/* Live Scratchpad for Note taking */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-700 mb-1.5">
                <Edit3 size={14} className="text-primary" />
                <span>Giấy nháp điện tử (Gõ nhanh dàn ý & từ khóa của bạn):</span>
              </div>
              <textarea
                value={prepNotes}
                onChange={(e) => setPrepNotes(e.target.value)}
                placeholder="Ví dụ: - Who: My high school English teacher, Mr. Nam
- Personality: passionate, encouraging, humorous
- Advice: never be afraid of making pronunciation mistakes
- Impact: inspired me to pursue language studies..."
                rows={5}
                className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3.5 text-xs text-gray-900 focus:outline-none focus:border-primary focus:bg-white font-mono leading-relaxed"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={handleSkipPrepTimer}
                className="px-5 py-2.5 bg-primary text-white font-extrabold text-xs rounded-xl hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
              >
                <span>Đã chuẩn bị xong ➔ Bắt đầu nói (120s)</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 2B: PART 2 LONG TURN SPEAKING (120s)
           ======================================================== */}
        {testStage === 'part2_speak' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs animate-pop-in space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-gray-150 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
                  Part 2: Đang Nói Độc Thoại (Long Turn: 1 - 2 phút)
                </span>
                <p className="text-xs text-gray-500 mt-1">Nói liên tục dựa trên dàn ý bạn đã chuẩn bị</p>
              </div>
            </div>

            {/* Cue Card Reminder */}
            <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 text-xs">
              <p className="font-extrabold text-gray-900 mb-1">{test.parts[1].cueCard.prompt}</p>
              <div className="text-gray-600 space-x-2">
                {test.parts[1].cueCard.bulletPoints.map((bp, i) => (
                  <span key={i} className="inline-block bg-white px-2 py-0.5 rounded border border-amber-200 mt-1">
                    • {bp}
                  </span>
                ))}
              </div>
            </div>

            {/* Show Scratchpad notes during speech */}
            {prepNotes.trim() && (
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-700 whitespace-pre-wrap max-h-28 overflow-y-auto">
                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Dàn ý nháp của bạn:</span>
                {prepNotes}
              </div>
            )}

            <SpeakingRecorder
              recommendedDuration={120}
              onRecordingComplete={handleCurrentRecordingComplete}
              questionPrompt={test.parts[1].cueCard.prompt}
            />

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-150">
              <button
                onClick={handlePart2Next}
                className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-xs cursor-pointer active:scale-95"
              >
                <span>Hoàn thành Part 2 ➔ Sang Part 3 Thảo luận</span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 3: PART 3 (TWO-WAY DISCUSSION)
           ======================================================== */}
        {testStage === 'part3' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs animate-pop-in space-y-6">
            <div className="flex items-center justify-between gap-2 border-b border-gray-150 pb-4">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-2.5 py-1 rounded-lg">
                  {test.parts[2].title}
                </span>
                <p className="text-xs text-gray-500 mt-1">Chủ đề: {test.parts[2].topic || test.parts[2].name || test.parts[2].title}</p>
              </div>
              <span className="text-xs font-extrabold text-gray-600 bg-gray-100 px-3 py-1 rounded-xl">
                Câu {p3Index + 1} / {test.parts[2].questions.length}
              </span>
            </div>

            <div>
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                Discussion Question:
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                "{test.parts[2].questions[p3Index].prompt}"
              </h2>
            </div>

            {test.parts[2].questions[p3Index].hintVi && (
              <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-xl text-xs text-purple-900 flex items-start gap-2">
                <span>💡</span>
                <span><strong>Gợi ý:</strong> {test.parts[2].questions[p3Index].hintVi}</span>
              </div>
            )}

            <SpeakingRecorder
              recommendedDuration={test.parts[2].questions[p3Index].recommendedDuration || 45}
              onRecordingComplete={handleCurrentRecordingComplete}
              questionPrompt={test.parts[2].questions[p3Index].prompt}
            />

            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-150">
              <button
                onClick={handlePart3Next}
                className="px-6 py-3 bg-gradient-to-r from-primary to-[#1e3061] hover:opacity-95 text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
              >
                <span>
                  {p3Index < test.parts[2].questions.length - 1
                    ? 'Chuyển câu thảo luận tiếp theo'
                    : 'NỘP BÀI THI & CHẤM ĐIỂM TOÀN BỘ 3 PHẦN'}
                </span>
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 4: SUBMITTING & EVALUATING LOADER
           ======================================================== */}
        {testStage === 'submitting' && (
          <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-14 text-center shadow-xs animate-pop-in space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 animate-bounce">
              <Sparkles size={32} className="text-amber-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Hệ Thống Đang Đánh Giá Bài Thi IELTS Speaking...
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              {statusMessage || 'Đang phối hợp Azure Speech đo vật lý sóng âm và Google Gemini chấm 4 tiêu chí IELTS.'}
            </p>
            <div className="flex justify-center pt-2">
              <Loader2 size={24} className="text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* ========================================================
            STAGE 5: FINAL RESULT REPORT
           ======================================================== */}
        {testStage === 'result' && evaluation && (
          <div className="space-y-6 animate-pop-in">
            <SpeakingEvaluationResult
              evaluation={evaluation}
              azureMetrics={combinedAzure}
              responses={recordedResponses}
              studentInfo={studentInfo}
              sessionName={test.session}
              testTitle={test.title}
              onRetry={() => {
                handleRegenerateRandomTest();
                setTestStage('intro');
                setEvaluation(null);
              }}
            />

            <div className="flex justify-center pt-2">
              <Link
                to="/speaking"
                className="px-6 py-3 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container transition-all shadow-xs"
              >
                Trở về Thư viện Speaking
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
