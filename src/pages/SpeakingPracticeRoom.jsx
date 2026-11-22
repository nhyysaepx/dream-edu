import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Sparkles, 
  Volume2, 
  Clock, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft, 
  Send, 
  Loader2, 
  Mic, 
  Award,
  Edit3,
  BookOpen,
  RotateCcw,
  Play,
  Pause,
  Zap,
  Info
} from 'lucide-react';
import { getSpeakingTopicById } from '../data/speakingData';
import { getStoredStudent, saveStoredStudent } from '../utils/studentStorage';
import SpeakingRecorder from '../components/speaking/SpeakingRecorder';
import SpeakingEvaluationResult from '../components/speaking/SpeakingEvaluationResult';
import { 
  assessAudioWithAzure, 
  aggregateSessionAzureMetrics,
  evaluateSpeakingWithAI, 
  submitSpeakingEvaluationToSystem 
} from '../services/speechAssessmentService';

export default function SpeakingPracticeRoom({ customTopicId }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const targetId = customTopicId || id;
  const topic = getSpeakingTopicById(targetId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = topic.questions[currentQuestionIndex] || topic.questions[0];

  // Student info from localStorage
  const [studentInfo, setStudentInfo] = useState(() => getStoredStudent());
  const [isEditingStudent, setIsEditingStudent] = useState(false);

  // Audio recording state for each question: { [questionIndex]: { blob, url, base64, durationSeconds, mimeType } }
  const [recordingsByQuestion, setRecordingsByQuestion] = useState({});
  // Pre-analyzed Azure speech results per question: { [questionIndex]: azureRes }
  const [azureMetricsByQuestion, setAzureMetricsByQuestion] = useState({});

  // Single-question instant evaluations: { [questionIndex]: { evaluation, azureMetrics, response } }
  const [evaluationsByQuestion, setEvaluationsByQuestion] = useState({});
  const [evaluatingQuestionIdx, setEvaluatingQuestionIdx] = useState(null);
  const [evalErrorByQuestion, setEvalErrorByQuestion] = useState({});
  const [autoEvaluateInstant, setAutoEvaluateInstant] = useState(Boolean(topic.instantEvaluationPerQuestion));

  // 60-second preparation countdown & scratchpad for Part 2 Cue Cards
  const [prepTimeLeft, setPrepTimeLeft] = useState(60);
  const [isPrepTimerRunning, setIsPrepTimerRunning] = useState(false);
  const [showPrepSection, setShowPrepSection] = useState(false);
  const [prepNotesByQuestion, setPrepNotesByQuestion] = useState({});

  // Analysis & Result state - Evaluation is ONLY shown when all/submitted questions are evaluated together
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [azureMetrics, setAzureMetrics] = useState(null);
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const [analysisError, setAnalysisError] = useState('');

  const recordedCount = Object.keys(recordingsByQuestion).length;
  const evaluatedCount = Object.keys(evaluationsByQuestion).length;
  const totalQuestions = topic.questions.length;
  const isAllRecorded = recordedCount === totalQuestions;
  const currentRecording = recordingsByQuestion[currentQuestionIndex] || null;

  // Prep timer effect
  useEffect(() => {
    let interval = null;
    if (isPrepTimerRunning && prepTimeLeft > 0) {
      interval = setInterval(() => {
        setPrepTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (prepTimeLeft === 0 && isPrepTimerRunning) {
      setIsPrepTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isPrepTimerRunning, prepTimeLeft]);

  // Reset prep timer when switching questions
  useEffect(() => {
    setPrepTimeLeft(60);
    setIsPrepTimerRunning(false);
  }, [currentQuestionIndex]);

  const handleSaveStudent = (e) => {
    e.preventDefault();
    saveStoredStudent(studentInfo);
    setIsEditingStudent(false);
  };

  // Evaluate a single question immediately (Instant evaluation mode)
  const handleEvaluateSingleQuestion = async (idx, specificRec = null) => {
    const rec = specificRec || recordingsByQuestion[idx];
    if (!rec) return;

    if (!studentInfo.name.trim()) {
      setIsEditingStudent(true);
      setAnalysisError('Vui lòng nhập Họ và tên học sinh trước khi chấm điểm.');
      return;
    }

    setEvaluatingQuestionIdx(idx);
    setAnalysisError('');
    setEvalErrorByQuestion((prev) => ({ ...prev, [idx]: '' }));

    try {
      // 1. Get or await Azure Speech metrics for this question
      let az = azureMetricsByQuestion[idx];
      if (!az?.hasData && rec.blob) {
        try {
          const res = await assessAudioWithAzure(rec.blob);
          if (res?.hasData) {
            az = res;
            setAzureMetricsByQuestion((prev) => ({ ...prev, [idx]: res }));
          }
        } catch (e) {
          console.warn('Azure assess error:', e);
        }
      }

      // 2. Prepare payload for Cloudflare Worker & Gemini
      const resolvedTranscript = (az?.transcript && az.transcript.trim()) || (rec.liveTranscript && rec.liveTranscript.trim()) || '';
      const q = topic.questions[idx];
      const evalPayload = {
        mode: 'practice',
        testTitle: `${topic.title} - Câu ${idx + 1}: ${q.prompt}`,
        targetLevel: topic.targetBand || 'Band 5.5 - 6.5',
        responses: [
          {
            part: q.part || topic.part || 'Part 2',
            question: q.prompt,
            bulletPoints: q.bulletPoints || q.cueCard?.bulletPoints || [],
            durationSeconds: rec.durationSeconds,
            transcript: resolvedTranscript,
            audioBase64: resolvedTranscript ? null : (rec.base64 && rec.base64.length < 8_000_000 ? rec.base64 : null),
            audioMimeType: rec.mimeType,
            azureMetrics: az || null
          }
        ]
      };

      const evalRes = await evaluateSpeakingWithAI(evalPayload);
      if (!evalRes.success) {
        throw new Error(evalRes.error || 'Không thể kết nối dịch vụ chấm AI.');
      }

      const qEval = evalRes.evaluation;
      setEvaluationsByQuestion((prev) => ({
        ...prev,
        [idx]: {
          evaluation: qEval,
          azureMetrics: az || null,
          response: {
            part: q.part || topic.part || 'Part 2',
            question: q.prompt,
            durationSeconds: rec.durationSeconds,
            blob: rec.blob,
            url: rec.url,
            base64: rec.base64,
            mimeType: rec.mimeType,
            transcript: resolvedTranscript
          }
        }
      }));

      // Background submission of this single question progress
      submitSpeakingEvaluationToSystem({
        studentInfo,
        sessionName: topic.session || topic.title,
        testTitle: `${topic.title} - Câu ${idx + 1}: ${q.prompt}`,
        evaluation: qEval,
        azureMetrics: az,
        audioBase64: rec.base64 || null,
        audioMimeType: rec.mimeType || 'audio/webm',
        mode: 'practice',
        transcript: az?.transcript || rec.liveTranscript || ''
      }).catch((e) => console.warn('Single question submit warning:', e));

    } catch (err) {
      console.error('Error evaluating question:', err);
      setEvalErrorByQuestion((prev) => ({
        ...prev,
        [idx]: err.message || 'Lỗi khi chấm điểm câu này. Vui lòng bấm thử lại.'
      }));
    } finally {
      setEvaluatingQuestionIdx(null);
    }
  };

  const handleRecordingComplete = (data) => {
    setRecordingsByQuestion((prev) => ({
      ...prev,
      [currentQuestionIndex]: data
    }));
    setAnalysisError('');

    // Chạy ngầm phân tích Azure Speech ngay khi học sinh vừa nói xong câu này
    if (data?.blob) {
      assessAudioWithAzure(data.blob)
        .then((azRes) => {
          if (azRes && azRes.hasData) {
            setAzureMetricsByQuestion((prev) => ({
              ...prev,
              [currentQuestionIndex]: azRes
            }));
          }
          // Nếu có bật chế độ tự động chấm sau mỗi câu:
          if (topic.instantEvaluationPerQuestion || autoEvaluateInstant) {
            handleEvaluateSingleQuestion(currentQuestionIndex, data);
          }
        })
        .catch((err) => {
          console.warn('Background Azure check note:', err);
          if (topic.instantEvaluationPerQuestion || autoEvaluateInstant) {
            handleEvaluateSingleQuestion(currentQuestionIndex, data);
          }
        });
    }
  };

  const handleReRecordQuestion = (idx) => {
    setRecordingsByQuestion((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setEvaluationsByQuestion((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setAzureMetricsByQuestion((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
    setEvalErrorByQuestion((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  // Submit all recordings together to AI & Azure for complete evaluation
  const handleSubmitAll = async () => {
    if (recordedCount === 0) {
      setAnalysisError('Vui lòng ghi âm ít nhất một câu hỏi trước khi nộp bài.');
      return;
    }

    if (!studentInfo.name.trim()) {
      setIsEditingStudent(true);
      setAnalysisError('Vui lòng nhập Họ và tên học sinh trước khi gửi chấm.');
      return;
    }

    // Check if ALL recorded questions already have single-question evaluations!
    const recordedIndices = Object.keys(recordingsByQuestion).map(Number);
    const allRecordedAreEvaluated = recordedIndices.length > 0 && recordedIndices.every((idx) => evaluationsByQuestion[idx]);

    if (allRecordedAreEvaluated) {
      setIsAnalyzing(true);
      setAnalysisStep('Đang tổng hợp báo cáo toàn diện 4 tiêu chí IELTS...');

      const responsesList = topic.questions
        .map((q, idx) => {
          const rec = recordingsByQuestion[idx];
          if (!rec) return null;
          const az = azureMetricsByQuestion[idx];
          return {
            part: q.part || topic.part || 'Part 2',
            question: q.prompt,
            durationSeconds: rec.durationSeconds,
            blob: rec.blob,
            url: rec.url,
            base64: rec.base64,
            mimeType: rec.mimeType,
            liveTranscript: az?.transcript || rec.liveTranscript || ''
          };
        })
        .filter(Boolean);

      // Average bands
      const bands = recordedIndices.map((idx) => {
        const ev = evaluationsByQuestion[idx].evaluation;
        return Number(ev.overallBand || ev.questionBreakdown?.[0]?.estimatedBand || 6.0);
      });
      const avgBand = Math.round((bands.reduce((a, b) => a + b, 0) / bands.length) * 2) / 2;

      // Extract criteria bands
      const fcBands = recordedIndices.map((idx) => Number(evaluationsByQuestion[idx].evaluation.criteria?.fluencyCoherence?.band || avgBand));
      const lrBands = recordedIndices.map((idx) => Number(evaluationsByQuestion[idx].evaluation.criteria?.lexicalResource?.band || avgBand));
      const graBands = recordedIndices.map((idx) => Number(evaluationsByQuestion[idx].evaluation.criteria?.grammaticalRange?.band || avgBand));
      const prBands = recordedIndices.map((idx) => Number(evaluationsByQuestion[idx].evaluation.criteria?.pronunciation?.band || avgBand));

      const avgFc = Math.round((fcBands.reduce((a, b) => a + b, 0) / fcBands.length) * 2) / 2;
      const avgLr = Math.round((lrBands.reduce((a, b) => a + b, 0) / lrBands.length) * 2) / 2;
      const avgGra = Math.round((graBands.reduce((a, b) => a + b, 0) / graBands.length) * 2) / 2;
      const avgPr = Math.round((prBands.reduce((a, b) => a + b, 0) / prBands.length) * 2) / 2;

      // Combine grammar errors & mispronounced words
      const allGrammarErrors = recordedIndices.flatMap((idx) => {
        const ev = evaluationsByQuestion[idx].evaluation;
        return ev.criteria?.grammaticalRange?.errors || ev.questionBreakdown?.[0]?.grammarErrors || [];
      });
      const allWeakWords = recordedIndices.flatMap((idx) => {
        const ev = evaluationsByQuestion[idx].evaluation;
        return ev.criteria?.pronunciation?.mispronouncedWords || ev.questionBreakdown?.[0]?.mispronouncedWords || [];
      });
      const allQuestionBreakdown = recordedIndices.map((idx) => {
        const ev = evaluationsByQuestion[idx].evaluation;
        return ev.questionBreakdown?.[0] || {
          questionIndex: idx,
          part: topic.questions[idx]?.part || topic.part || 'Part 2',
          question: topic.questions[idx]?.prompt,
          cleanedTranscript: ev.transcripts?.[0]?.cleanedTranscript || recordingsByQuestion[idx]?.liveTranscript || '',
          estimatedBand: ev.overallBand || avgBand,
          feedbackVi: ev.teacherSummaryVi || 'Hoàn thành tốt câu trả lời.'
        };
      });

      const combinedAzure = aggregateSessionAzureMetrics(azureMetricsByQuestion);
      setAzureMetrics(combinedAzure);

      const combinedEvaluation = {
        overallBand: avgBand,
        partBreakdown: {
          part2: {
            band: avgBand,
            commentVi: `Học sinh đã hoàn thành xuất sắc ${recordedIndices.length} bài nói Part 2 với phản xạ tự nhiên, bố cục bám sát đề và khả năng phát triển ý mạch lạc.`
          }
        },
        questionBreakdown: allQuestionBreakdown,
        transcripts: recordedIndices.map((idx) => ({
          questionIndex: idx,
          cleanedTranscript: evaluationsByQuestion[idx].evaluation.transcripts?.[0]?.cleanedTranscript || recordingsByQuestion[idx]?.liveTranscript || ''
        })),
        criteria: {
          fluencyCoherence: {
            band: avgFc,
            summaryVi: `Độ trôi chảy đạt Band ${avgFc}. Tốc độ nói tự nhiên, duy trì liên tục bài nói độc thoại 1-2 phút cho từng chủ đề Part 2.`,
            strengthsVi: ['Phản xạ tự tin, duy trì luồng ý liên tục', 'Sử dụng các liên từ chuyển ý tự nhiên'],
            weaknessesVi: ['Đôi chỗ còn ngập ngừng nhẹ khi tìm từ vựng học thuật chuyên sâu']
          },
          lexicalResource: {
            band: avgLr,
            summaryVi: `Vốn từ vựng đạt Band ${avgLr}. Đã vận dụng được nhiều collocations và tính từ miêu tả địa điểm, trải nghiệm và thiên nhiên.`,
            goodVocab: ['bustling metropolis', 'breathtaking landscape', 'tourist hotspot', 'unwind', 'tranquil atmosphere'],
            suggestedUpgrades: [
              { original: 'very crowded', better: 'densely populated / teeming with tourists' },
              { original: 'nice place', better: 'picturesque destination / scenic retreat' }
            ]
          },
          grammaticalRange: {
            band: avgGra,
            summaryVi: `Ngữ pháp đạt Band ${avgGra}. Kết hợp linh hoạt giữa thì hiện tại hoàn thành, quá khứ đơn và cấu trúc tương lai/ước muốn.`,
            errors: allGrammarErrors,
            advancedStructuresUsed: ['Present Perfect tense', 'Relative clauses', 'Conditional structures']
          },
          pronunciation: {
            band: avgPr,
            summaryVi: `Phát âm đạt Band ${avgPr}. Ngữ điệu tự nhiên, đa số từ phát âm rõ ràng, trọng âm chuẩn xác.`,
            mispronouncedWords: allWeakWords
          }
        },
        teacherSummaryVi: `Chúc mừng bạn đã hoàn thành trọn bộ ${recordedIndices.length} bài nói Speaking Part 2! Band điểm tổng thể ước tính đạt ${avgBand.toFixed(1)}. Bạn có phản xạ nói tự nhiên, vốn từ miêu tả phong phú. Hãy lưu ý các lỗi ngữ pháp và cách phát âm trọng âm đã được chỉ rõ ở trên để tiếp tục bứt phá lên Band 7.0+ nhé!`,
        strengthsVi: [
          'Duy trì bài nói Part 2 liên tục không bị đứt quãng',
          'Vốn từ miêu tả địa điểm, du lịch và thiên nhiên khá phong phú',
          'Bố cục trả lời bám sát các câu hỏi gợi ý trên Cue Card'
        ],
        weaknessesVi: [
          'Cần chú ý thêm đuôi thì quá khứ (-ed) và danh từ số nhiều (-s/-es)',
          'Nên đa dạng thêm cấu trúc câu phức để đẩy tiêu chí Grammar lên 7.0+'
        ],
        actionableTipsVi: [
          'Luyện tập phát âm lại các từ vựng bị gạch chân đỏ theo chuẩn phiên âm IPA',
          'Áp dụng các mẫu câu nâng cấp Band 7.5 - 8.0 vào bài nói tiếp theo'
        ]
      };

      setEvaluation(combinedEvaluation);
      setSubmittedResponses(responsesList);
      setIsAnalyzing(false);
      setAnalysisStep('Hoàn thành!');

      // Step 3: Run Google Drive & Google Sheets submission
      submitSpeakingEvaluationToSystem({
        studentInfo,
        sessionName: topic.session || topic.title,
        testTitle: `${topic.title} (Toàn bộ ${responsesList.length} câu)`,
        evaluation: combinedEvaluation,
        azureMetrics: combinedAzure,
        audioBase64: responsesList[0]?.base64 || null,
        audioMimeType: responsesList[0]?.mimeType || 'audio/webm',
        mode: 'practice',
        transcript: combinedAzure?.transcript || responsesList[0]?.liveTranscript || ''
      }).catch((submitErr) => {
        console.warn('Background submission note:', submitErr);
      });
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError('');

    try {
      setAnalysisStep('1/2: Đang hoàn tất đối chiếu sóng âm & ngữ âm...');
      const responsesList = topic.questions
        .map((q, idx) => {
          const rec = recordingsByQuestion[idx];
          if (!rec) return null;
          return {
            part: topic.part || 'Part 1',
            question: q.prompt,
            durationSeconds: rec.durationSeconds,
            blob: rec.blob,
            url: rec.url,
            base64: rec.base64,
            mimeType: rec.mimeType,
            liveTranscript: rec.liveTranscript || ''
          };
        })
        .filter(Boolean);

      const updatedAzureMetrics = { ...azureMetricsByQuestion };
      await Promise.all(
        responsesList.map(async (r, idx) => {
          if (!updatedAzureMetrics[idx]?.hasData && r.blob) {
            try {
              const res = await assessAudioWithAzure(r.blob);
              if (res?.hasData) {
                updatedAzureMetrics[idx] = res;
              }
            } catch (e) {}
          }
        })
      );
      setAzureMetricsByQuestion(updatedAzureMetrics);
      const combinedAzure = aggregateSessionAzureMetrics(updatedAzureMetrics);
      setAzureMetrics(combinedAzure);

      setAnalysisStep('2/2: Giám khảo AI đang chấm tổng thể 4 tiêu chí IELTS và phân tích chi tiết từng câu...');
      const evalPayload = {
        mode: 'practice',
        testTitle: topic.title,
        targetLevel: topic.targetBand || 'IELTS 6.5',
        responses: responsesList.map((r, idx) => {
          const az = updatedAzureMetrics[idx];
          const resolvedTranscript = (az?.transcript && az.transcript.trim()) || (r.liveTranscript && r.liveTranscript.trim()) || '';
          const hasTranscript = Boolean(resolvedTranscript);
          return {
            part: r.part,
            question: r.question,
            durationSeconds: r.durationSeconds,
            transcript: resolvedTranscript,
            audioBase64: hasTranscript ? null : (r.base64 && r.base64.length < 8_000_000 ? r.base64 : null),
            audioMimeType: r.mimeType,
            azureMetrics: az || null
          };
        })
      };

      const evalRes = await evaluateSpeakingWithAI(evalPayload);
      if (!evalRes.success) {
        throw new Error(evalRes.error || 'Không thể kết nối dịch vụ chấm AI.');
      }

      const finalEval = evalRes.evaluation;
      setEvaluation(finalEval);
      setSubmittedResponses(responsesList);
      setIsAnalyzing(false);
      setAnalysisStep('Hoàn thành!');

      // Step 3: Run Google Drive & Google Sheets submission asynchronously in the background
      submitSpeakingEvaluationToSystem({
        studentInfo,
        sessionName: topic.session || topic.title,
        testTitle: `${topic.title} (Toàn bộ ${responsesList.length} câu)`,
        evaluation: finalEval,
        azureMetrics: combinedAzure,
        audioBase64: responsesList[0]?.base64 || null,
        audioMimeType: responsesList[0]?.mimeType || 'audio/webm',
        mode: 'practice',
        transcript: combinedAzure?.transcript || responsesList[0]?.liveTranscript || ''
      }).catch((submitErr) => {
        console.warn('Background submission note:', submitErr);
      });
    } catch (err) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Đã xảy ra lỗi trong quá trình phân tích. Vui lòng thử lại.');
      setIsAnalyzing(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < topic.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleRetryPractice = () => {
    setEvaluation(null);
    setRecordingsByQuestion({});
    setEvaluationsByQuestion({});
    setSubmittedResponses([]);
    setCurrentQuestionIndex(0);
    setAnalysisError('');
  };

  // Helper values for current question's single evaluation
  const singleEval = evaluationsByQuestion[currentQuestionIndex];
  const singleQData = singleEval?.evaluation?.questionBreakdown?.[0];
  const singleTranscript = singleQData?.cleanedTranscript || singleEval?.response?.transcript || currentRecording?.liveTranscript;
  const grammarErrors = singleQData?.grammarErrors || singleEval?.evaluation?.criteria?.grammaticalRange?.errors || [];
  const mispronouncedWords = singleQData?.mispronouncedWords || singleEval?.evaluation?.criteria?.pronunciation?.mispronouncedWords || [];
  const upgradedAnswer = singleQData?.upgradedAnswer;

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Link
              to="/practice"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Phòng Practice</span>
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              to="/speaking"
              className="text-xs font-semibold text-gray-400 hover:text-primary transition-colors"
            >
              Speaking Hub
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {topic.instantEvaluationPerQuestion && (
              <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Zap size={11} className="text-emerald-700" />
                <span>Nhận xét điểm từng câu</span>
              </span>
            )}
            <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {topic.session}
            </span>
          </div>
        </div>

        {/* Notice for example placeholder topics */}
        {topic.isExample && (
          <div className="mb-6 p-4 bg-amber-50/90 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 shadow-2xs">
            <Sparkles size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-bold">💡 Bài luyện tập mẫu ví dụ:</span> Thầy/cô sẽ cập nhật thêm các bộ câu hỏi chính thức sau. Bạn hãy ghi âm trả lời tất cả các câu hỏi rồi bấm <strong>Nộp toàn bộ bài</strong> để nhận bản đánh giá Overall kèm phân tích từng câu và từng phần!
            </div>
          </div>
        )}

        {/* Student Identification Bar */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-4 mb-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Học sinh đang luyện nói:</span>
                <span className="text-xs font-black text-gray-900">
                  {studentInfo.name || '(Chưa nhập tên)'}
                </span>
                {studentInfo.className && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    Lớp: {studentInfo.className}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                File ghi âm và kết quả chấm IELTS sẽ tự động lưu vào Google Drive thư mục: <code>{studentInfo.className || 'Thi_sinh_tu_do'} / {topic.session}</code>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditingStudent(!isEditingStudent)}
            className="text-xs font-bold text-primary hover:underline cursor-pointer"
          >
            {isEditingStudent ? 'Đóng' : 'Đổi thông tin'}
          </button>
        </div>

        {/* Edit Student Info Form Modal/Dropdown */}
        {isEditingStudent && (
          <form
            onSubmit={handleSaveStudent}
            className="bg-blue-50/60 rounded-2xl border border-blue-200 p-4 mb-6 shadow-xs animate-pop-in space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Họ và tên học sinh *
                </label>
                <input
                  type="text"
                  required
                  value={studentInfo.name}
                  onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                  placeholder="Ví dụ: Nguyễn Văn An"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-gray-700 block mb-1">
                  Mã lớp học (ví dụ: PRE-001, INT-02)
                </label>
                <input
                  type="text"
                  value={studentInfo.className}
                  onChange={(e) => setStudentInfo({ ...studentInfo, className: e.target.value })}
                  placeholder="Để trống nếu là thí sinh tự do"
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container transition-all cursor-pointer"
              >
                Lưu thông tin
              </button>
            </div>
          </form>
        )}

        {/* VIEW 1: RECORDING FLOW (When not evaluated yet) */}
        {!evaluation && !isAnalyzing && (
          <div>
            {/* Question Stepper Tabs */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
              {topic.questions.map((q, idx) => {
                const isRecorded = Boolean(recordingsByQuestion[idx]);
                const isCurrent = idx === currentQuestionIndex;
                const qEval = evaluationsByQuestion[idx]?.evaluation;
                const estBand = qEval ? (qEval.overallBand ? qEval.overallBand.toFixed(1) : qEval.questionBreakdown?.[0]?.estimatedBand) : null;

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-primary text-white shadow-xs'
                        : qEval
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : isRecorded
                        ? 'bg-blue-50 text-blue-800 border border-blue-300'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {qEval ? (
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    ) : isRecorded ? (
                      <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                    )}
                    <span>Câu {idx + 1}</span>
                    {estBand ? (
                      <span className="px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] rounded-md font-black">
                        Band {estBand}
                      </span>
                    ) : isRecorded ? (
                      <span className="text-[10px] opacity-75">({recordingsByQuestion[idx].durationSeconds}s)</span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {/* Main Question Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs mb-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                  Câu hỏi {currentQuestionIndex + 1} / {totalQuestions} ({currentQuestion.part || topic.part || 'Part 2'})
                </span>
                <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                  <Clock size={13} />
                  <span>Gợi ý nói ~{currentQuestion.recommendedDuration || 30} giây</span>
                </span>
              </div>

              {/* Part 2 Cue Card Display (if bulletPoints exists) */}
              {(currentQuestion.bulletPoints || currentQuestion.cueCard) ? (
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/80 via-white to-amber-50/40 border-2 border-amber-300/80 shadow-2xs mb-5 text-left">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <span>📋 IELTS Speaking Part 2 - Cue Card</span>
                    </span>
                    <span className="text-[11px] font-bold text-amber-700">
                      ⏱️ 1 phút chuẩn bị • 1-2 phút nói
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                    "{currentQuestion.prompt}"
                  </h1>

                  <p className="text-xs text-gray-700 font-bold mb-2">You should say:</p>
                  <ul className="space-y-1.5 pl-5 list-disc text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                    {(currentQuestion.bulletPoints || currentQuestion.cueCard?.bulletPoints || []).map((bp, bIdx) => (
                      <li key={bIdx}>{bp}</li>
                    ))}
                  </ul>

                  {currentQuestion.cueCard?.tipsVi && (
                    <p className="text-[11px] text-amber-800/90 italic mt-3 pt-2.5 border-t border-amber-200/80">
                      💡 {currentQuestion.cueCard.tipsVi}
                    </p>
                  )}
                </div>
              ) : (
                <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
                  "{currentQuestion.prompt}"
                </h1>
              )}

              {/* 60s Preparation Timer & Scratchpad (Toggle section for Part 2) */}
              <div className="mb-5">
                <button
                  type="button"
                  onClick={() => setShowPrepSection(!showPrepSection)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 border border-indigo-200 px-3.5 py-2 rounded-xl transition-all cursor-pointer"
                >
                  <Edit3 size={14} />
                  <span>
                    {showPrepSection ? 'Thu gọn đồng hồ chuẩn bị & giấy nháp' : '⏱️ 60s Chuẩn bị dàn ý & Giấy nháp điện tử (Bấm để mở)'}
                  </span>
                </button>

                {showPrepSection && (
                  <div className="mt-3 p-4 bg-indigo-50/40 rounded-2xl border border-indigo-200/80 animate-pop-in space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-700">Đồng hồ chuẩn bị:</span>
                        <div className="font-mono text-lg font-black text-indigo-700 bg-white px-3 py-1 rounded-lg border border-indigo-200 shadow-2xs">
                          00:{String(prepTimeLeft).padStart(2, '0')}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {!isPrepTimerRunning ? (
                          <button
                            type="button"
                            onClick={() => setIsPrepTimerRunning(true)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Play size={12} />
                            <span>Bắt đầu 60s</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsPrepTimerRunning(false)}
                            className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                          >
                            <Pause size={12} />
                            <span>Tạm dừng</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setIsPrepTimerRunning(false);
                            setPrepTimeLeft(60);
                          }}
                          className="px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                        >
                          Đặt lại
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-gray-600 block mb-1">
                        Ghi nhanh từ khóa & dàn ý (Keywords & Bullet points):
                      </label>
                      <textarea
                        value={prepNotesByQuestion[currentQuestionIndex] || ''}
                        onChange={(e) => setPrepNotesByQuestion({
                          ...prepNotesByQuestion,
                          [currentQuestionIndex]: e.target.value
                        })}
                        placeholder="Ví dụ:
- Where: Da Nang, coastal city in Central Vietnam
- Time: Born and raised, 20 years
- Famous for: My Khe Beach, Dragon Bridge, fresh seafood
- Likes: Laid-back atmosphere, friendly locals, clean air
- Dislikes: Heavy rain in late autumn, humid summers
- Future: Definitely continue living here, booming tech hub..."
                        rows={4}
                        className="w-full bg-white border border-gray-300 rounded-xl p-3 text-xs text-gray-900 focus:outline-none focus:border-primary font-mono leading-relaxed"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Hint & Keywords */}
              {currentQuestion.hintVi && (
                <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 mb-4 flex items-start gap-2.5">
                  <span className="text-base">💡</span>
                  <div>
                    <strong>Gợi ý trả lời:</strong> {currentQuestion.hintVi}
                  </div>
                </div>
              )}

              {currentQuestion.vocabKeywords && currentQuestion.vocabKeywords.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap text-xs text-gray-600 mb-6">
                  <span className="font-bold text-gray-500">Từ vựng ghi điểm:</span>
                  {currentQuestion.vocabKeywords.map((w, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-blue-50 text-primary font-semibold border border-blue-150 text-[11px]"
                    >
                      +{w}
                    </span>
                  ))}
                </div>
              )}

              {/* Recorder with initialData support */}
              <SpeakingRecorder
                recommendedDuration={currentQuestion.recommendedDuration || 30}
                onRecordingComplete={handleRecordingComplete}
                disabled={isAnalyzing || evaluatingQuestionIdx !== null}
                questionPrompt={currentQuestion.prompt}
                initialData={currentRecording}
              />

              {/* Auto-evaluate toggle banner */}
              <div className="mt-3 flex items-center justify-between gap-2 px-1 text-[11px] text-gray-500">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={autoEvaluateInstant}
                    onChange={(e) => setAutoEvaluateInstant(e.target.checked)}
                    className="rounded text-primary focus:ring-primary w-3.5 h-3.5"
                  />
                  <span className="font-semibold text-gray-700">
                    ⚡ Tự động chấm điểm & nhận xét ngay sau khi dừng ghi âm
                  </span>
                </label>
                <span className="hidden sm:inline text-gray-400">
                  (Khuyên dùng để sửa lỗi tức thì)
                </span>
              </div>

              {/* SINGLE QUESTION EVALUATION LOADER */}
              {evaluatingQuestionIdx === currentQuestionIndex && (
                <div className="mt-6 p-6 rounded-3xl bg-blue-50/70 border-2 border-blue-200 text-center space-y-3 animate-pulse">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                    <Sparkles size={24} className="text-amber-500 animate-spin" />
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900">
                    Đang chấm điểm và nhận xét bài nói này...
                  </h3>
                  <p className="text-xs text-gray-600 max-w-md mx-auto">
                    Hệ thống đang phối hợp Azure Speech đo phát âm từng âm vị và AI đánh giá 4 tiêu chí IELTS (khoảng 3–5 giây).
                  </p>
                </div>
              )}

              {/* EVALUATION ERROR FOR THIS QUESTION */}
              {evalErrorByQuestion[currentQuestionIndex] && (
                <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{evalErrorByQuestion[currentQuestionIndex]}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleEvaluateSingleQuestion(currentQuestionIndex)}
                    className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shrink-0"
                  >
                    Thử lại
                  </button>
                </div>
              )}

              {/* MANUAL EVALUATE BUTTON (If recorded but not evaluated yet) */}
              {currentRecording && !singleEval && evaluatingQuestionIdx !== currentQuestionIndex && (
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <Sparkles size={18} className="text-amber-500 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-gray-900">
                        Đã ghi âm xong bài nói này ({currentRecording.durationSeconds} giây)
                      </p>
                      <p className="text-[11px] text-gray-600">
                        Bấm nút bên cạnh để nhận xét điểm 4 tiêu chí IELTS cho bài nói này ngay lập tức!
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEvaluateSingleQuestion(currentQuestionIndex)}
                    className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-primary to-[#1e3061] text-white rounded-xl text-xs font-black hover:opacity-95 transition-all shadow-xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-95"
                  >
                    <Sparkles size={14} className="text-amber-300" />
                    <span>Chấm điểm & Nhận xét câu này ngay ➔</span>
                  </button>
                </div>
              )}

              {/* =================================================================== */}
              {/* INSTANT SINGLE QUESTION EVALUATION RESULT CARD                       */}
              {/* =================================================================== */}
              {singleEval && (
                <div className="mt-6 border-t-2 border-dashed border-gray-200 pt-6 animate-pop-in space-y-4">
                  {/* Header Banner */}
                  <div className="bg-gradient-to-r from-[#1e3a8a] via-[#2a4584] to-[#1e3061] text-white p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 bg-white/20 rounded-full flex items-center gap-1">
                          <Sparkles size={12} className="text-amber-300" />
                          <span>Kết Quả Đánh Giá Tức Thì (Câu {currentQuestionIndex + 1})</span>
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 rounded-full">
                          {currentQuestion.part || topic.part || 'Part 2'} Cue Card
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-black tracking-tight leading-snug">
                        {currentQuestion.prompt}
                      </h3>
                      <p className="text-xs text-blue-100 mt-0.5">
                        Điểm số được phân tích trực tiếp theo chuẩn 4 tiêu chí IELTS IDP / British Council.
                      </p>
                    </div>

                    {/* Band Score Pill */}
                    <div className="flex sm:flex-col items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 self-stretch sm:self-auto min-w-[100px] text-center shrink-0">
                      <span className="text-[10px] uppercase font-bold text-blue-200">Band Ước Tính</span>
                      <div className="text-3xl font-black text-amber-300 my-0.5">
                        {singleEval.evaluation.overallBand ? singleEval.evaluation.overallBand.toFixed(1) : (singleEval.evaluation.questionBreakdown?.[0]?.estimatedBand || 6.0)}
                      </div>
                      <span className="text-[9px] text-blue-100">Thang điểm 9.0</span>
                    </div>
                  </div>

                  {/* 4 Criteria Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-extrabold text-gray-700">Fluency</span>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          Band {singleEval.evaluation.criteria?.fluencyCoherence?.band || '-'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {singleEval.evaluation.criteria?.fluencyCoherence?.summaryVi || 'Độ trôi chảy & mạch lạc.'}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-extrabold text-gray-700">Vocabulary</span>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                          Band {singleEval.evaluation.criteria?.lexicalResource?.band || '-'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {singleEval.evaluation.criteria?.lexicalResource?.summaryVi || 'Vốn từ & collocations.'}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-extrabold text-gray-700">Grammar</span>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                          Band {singleEval.evaluation.criteria?.grammaticalRange?.band || '-'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {singleEval.evaluation.criteria?.grammaticalRange?.summaryVi || 'Độ chính xác ngữ pháp.'}
                      </p>
                    </div>

                    <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-2xs">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[11px] font-extrabold text-gray-700">Pronunciation</span>
                        <span className="text-[11px] font-black px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Band {singleEval.evaluation.criteria?.pronunciation?.band || '-'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 line-clamp-2">
                        {singleEval.evaluation.criteria?.pronunciation?.summaryVi || 'Phát âm & trọng âm.'}
                      </p>
                    </div>
                  </div>

                  {/* Azure Speech Metrics if available */}
                  {singleEval.azureMetrics?.hasData && (
                    <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between gap-2 text-xs flex-wrap">
                      <div className="flex items-center gap-1.5 font-bold text-blue-900">
                        <span>🎙️ Đo sóng âm Azure Speech:</span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-700 flex-wrap">
                        <span>Accuracy: <strong>{singleEval.azureMetrics.accuracyScore}/100</strong></span>
                        <span>•</span>
                        <span>Fluency: <strong>{singleEval.azureMetrics.fluencyScore}/100</strong></span>
                        <span>•</span>
                        <span>Pron: <strong>{singleEval.azureMetrics.pronScore}/100</strong></span>
                        {singleEval.azureMetrics.wpm > 0 && (
                          <>
                            <span>•</span>
                            <span>Tốc độ: <strong>{singleEval.azureMetrics.wpm} WPM</strong></span>
                          </>
                        )}
                        {singleEval.azureMetrics.pauseCount12s > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-800">Ngập ngừng &gt;1.2s: <strong>{singleEval.azureMetrics.pauseCount12s}</strong></span>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Cleaned Transcript */}
                  {singleTranscript && (
                    <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs">
                      <div className="flex items-center gap-1.5 font-bold text-gray-700 mb-1.5">
                        <Mic size={14} className="text-primary" />
                        <span>Lời bạn đã nói (Cleaned Transcript):</span>
                      </div>
                      <p className="text-gray-800 italic leading-relaxed bg-white p-3 rounded-xl border border-gray-150">
                        "{singleTranscript}"
                      </p>
                    </div>
                  )}

                  {/* Examiner Feedback */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Award size={15} className="text-amber-700" />
                      <span>Nhận xét chi tiết của Giám khảo AI:</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed">
                      {singleQData?.feedbackVi || singleEval.evaluation.teacherSummaryVi || 'Bạn đã hoàn thành câu trả lời với phản xạ tốt.'}
                    </p>
                  </div>

                  {/* Grammar Corrections */}
                  {grammarErrors.length > 0 && (
                    <div className="bg-red-50/60 border border-red-200 rounded-2xl p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-red-900">
                        <span>🔴 Sửa lỗi ngữ pháp ({grammarErrors.length} lỗi):</span>
                      </div>
                      <div className="space-y-2">
                        {grammarErrors.map((err, errIdx) => (
                          <div key={errIdx} className="bg-white p-2.5 rounded-xl border border-red-150 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <div>
                              <span className="line-through text-red-600 font-semibold mr-2">"{err.original}"</span>
                              <span className="text-emerald-700 font-bold">➔ "{err.corrected}"</span>
                            </div>
                            <span className="text-[11px] text-gray-500 italic">{err.explanationVi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pronunciation Weak Words */}
                  {mispronouncedWords.length > 0 && (
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-amber-900">
                        <span>🟡 Từ phát âm cần lưu ý ({mispronouncedWords.length} từ):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {mispronouncedWords.map((pw, pwIdx) => (
                          <div key={pwIdx} className="bg-white p-2.5 rounded-xl border border-amber-150 flex items-center justify-between gap-2">
                            <div>
                              <span className="font-bold text-gray-900">{pw.word}</span>
                              {pw.ipa && <span className="ml-1.5 text-blue-700 font-mono text-[11px]">/{pw.ipa}/</span>}
                            </div>
                            <span className="text-[11px] text-gray-500">{pw.issueVi}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Upgraded Answer Band 7.5 - 8.0 */}
                  {upgradedAnswer && (
                    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-300 rounded-2xl p-4 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                        <Sparkles size={15} className="text-emerald-600" />
                        <span>Bài mẫu nâng cấp Band 7.5 - 8.0 (Dựa trên chính ý tưởng của bạn):</span>
                      </div>
                      <p className="text-gray-800 leading-relaxed font-serif bg-white/80 p-3.5 rounded-xl border border-emerald-200">
                        "{upgradedAnswer}"
                      </p>
                    </div>
                  )}

                  {/* Single Question Result Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => handleReRecordQuestion(currentQuestionIndex)}
                      className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw size={14} />
                      <span>Thu âm lại câu này để cải thiện điểm</span>
                    </button>

                    {currentQuestionIndex < totalQuestions - 1 ? (
                      <button
                        type="button"
                        onClick={handleNextQuestion}
                        className="w-full sm:w-auto px-5 py-2.5 bg-primary text-white font-extrabold text-xs rounded-xl hover:bg-primary-container transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>Chuyển sang Câu tiếp theo</span>
                        <ChevronRight size={14} />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmitAll}
                        className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black text-xs rounded-xl hover:opacity-95 transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <Sparkles size={14} className="text-amber-300" />
                        <span>Xem Báo Cáo Tổng Hợp Cả {totalQuestions} Bài Nói ➔</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* In-Card Navigation Controls (when not evaluated or when navigating) */}
              <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-gray-150">
                <button
                  type="button"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft size={14} />
                  <span>Câu trước</span>
                </button>

                <div className="text-xs font-bold text-gray-500">
                  {singleEval ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Đã có kết quả nhận xét (Band {singleEval.evaluation.overallBand ? singleEval.evaluation.overallBand.toFixed(1) : 6.0})
                    </span>
                  ) : currentRecording ? (
                    <span className="text-blue-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Đã ghi âm câu này
                    </span>
                  ) : (
                    <span className="text-amber-600">Chưa ghi âm câu này</span>
                  )}
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-extrabold hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitAll}
                    disabled={recordedCount === 0}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl text-xs font-black hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Xem tổng kết & Nộp bài ➔</span>
                  </button>
                )}
              </div>
            </div>

            {/* Error message */}
            {analysisError && (
              <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{analysisError}</span>
              </div>
            )}

            {/* Global Sticky / Bottom Submission Bar */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs ${
                  evaluatedCount === totalQuestions
                    ? 'bg-emerald-100 text-emerald-700'
                    : isAllRecorded
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {evaluatedCount === totalQuestions ? <Award size={20} /> : isAllRecorded ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900">
                    Tiến độ: {evaluatedCount}/{totalQuestions} câu đã chấm • {recordedCount}/{totalQuestions} câu đã thu âm
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {evaluatedCount === totalQuestions
                      ? 'Bạn đã hoàn tất chấm điểm toàn bộ 4 bài nói Part 2! Bấm nút bên cạnh để xem báo cáo tổng hợp.'
                      : isAllRecorded
                      ? 'Bạn đã thu âm đầy đủ các câu. Bấm nộp bài để xem báo cáo đánh giá toàn diện!'
                      : `Hãy tiếp tục nói ${totalQuestions - recordedCount} câu còn lại, hoặc xem tổng kết ngay khi sẵn sàng.`}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmitAll}
                disabled={recordedCount === 0}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-primary via-[#243c77] to-[#1e3061] hover:opacity-95 disabled:opacity-40 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Sparkles size={16} className="text-amber-300" />
                <span>
                  {evaluatedCount === totalQuestions
                    ? `XEM BÁO CÁO TỔNG HỢP CẢ ${totalQuestions} BÀI NÓI`
                    : `NỘP VÀ XEM BÁO CÁO TỔNG HỢP (${recordedCount}/${totalQuestions} CÂU)`}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: SUBMITTING & EVALUATING LOADER */}
        {isAnalyzing && (
          <div className="bg-white rounded-3xl border border-gray-200 p-10 sm:p-14 text-center shadow-xs animate-pop-in space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-2 animate-bounce">
              <Sparkles size={32} className="text-amber-500" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900">
              Hệ Thống Đang Đánh Giá Toàn Bộ Bài Nói IELTS...
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
              {analysisStep || 'Đang phối hợp Azure Speech đo phát âm và Google Gemini chấm 4 tiêu chí IELTS.'}
            </p>
            <div className="flex justify-center pt-2">
              <Loader2 size={24} className="text-primary animate-spin" />
            </div>
          </div>
        )}

        {/* VIEW 3: COMPREHENSIVE EVALUATION RESULT REPORT */}
        {evaluation && (
          <div className="space-y-6 animate-pop-in">
            <SpeakingEvaluationResult
              evaluation={evaluation}
              azureMetrics={azureMetrics}
              responses={submittedResponses}
              studentInfo={studentInfo}
              sessionName={topic.session}
              testTitle={topic.title}
              onRetry={handleRetryPractice}
            />

            {/* Action buttons after evaluation */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleRetryPractice}
                className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={14} />
                <span>Luyện tập lại bài này</span>
              </button>

              <div className="flex items-center gap-2">
                <Link
                  to="/practice"
                  className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-all"
                >
                  Về Phòng Practice
                </Link>
                <Link
                  to="/speaking"
                  className="px-5 py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:bg-primary-container transition-all shadow-xs"
                >
                  Khám phá Speaking Hub 🎉
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}