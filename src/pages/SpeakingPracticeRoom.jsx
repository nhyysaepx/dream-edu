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
  Send,
  Loader2,
  Mic
} from 'lucide-react';
import { getSpeakingTopicById } from '../data/speakingData';
import { getStoredStudent, saveStoredStudent } from '../utils/studentStorage';
import SpeakingRecorder from '../components/speaking/SpeakingRecorder';
import SpeakingEvaluationResult from '../components/speaking/SpeakingEvaluationResult';
import { 
  assessAudioWithAzure, 
  evaluateSpeakingWithAI, 
  submitSpeakingEvaluationToSystem 
} from '../services/speechAssessmentService';

export default function SpeakingPracticeRoom() {
  const { id } = useParams();
  const navigate = useNavigate();

  const topic = getSpeakingTopicById(id);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = topic.questions[currentQuestionIndex] || topic.questions[0];

  // Student info from localStorage
  const [studentInfo, setStudentInfo] = useState(() => getStoredStudent());
  const [isEditingStudent, setIsEditingStudent] = useState(false);

  // Audio recording state
  const [recordedData, setRecordedData] = useState(null); // { blob, url, base64, durationSeconds, mimeType }

  // Analysis & Result state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(''); // text description of current pipeline step
  const [evaluation, setEvaluation] = useState(null);
  const [azureMetrics, setAzureMetrics] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  // History of evaluated answers for this session
  const [sessionResults, setSessionResults] = useState({});

  useEffect(() => {
    // Reset state when switching questions
    setRecordedData(null);
    setEvaluation(sessionResults[currentQuestion.id]?.evaluation || null);
    setAzureMetrics(sessionResults[currentQuestion.id]?.azureMetrics || null);
    setAnalysisError('');
  }, [currentQuestionIndex, currentQuestion.id]);

  const handleSaveStudent = (e) => {
    e.preventDefault();
    saveStoredStudent(studentInfo);
    setIsEditingStudent(false);
  };

  const handleRecordingComplete = (data) => {
    setRecordedData(data);
    setAnalysisError('');
  };

  const handleStartAnalysis = async () => {
    if (!recordedData || !recordedData.blob) {
      setAnalysisError('Vui lòng ghi âm câu trả lời trước khi chấm điểm.');
      return;
    }

    if (!studentInfo.name.trim()) {
      setIsEditingStudent(true);
      setAnalysisError('Vui lòng nhập Họ và tên học sinh trước khi gửi chấm.');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError('');

    try {
      // Step 1: Azure Speech Physical Assessment (IPA, Prosody, Fluency, Accuracy)
      setAnalysisStep('1/3: Đang đo sóng âm & phân tích phát âm qua Azure Speech...');
      let azureRes = null;
      try {
        azureRes = await assessAudioWithAzure(recordedData.blob, currentQuestion.prompt);
      } catch (azErr) {
        console.warn('Azure check bypassed:', azErr);
        azureRes = { hasData: false };
      }
      setAzureMetrics(azureRes);

      // Step 2: Call Gemini via Cloudflare Worker for 4 IELTS Criteria
      setAnalysisStep('2/3: Đang chấm điểm 4 tiêu chí IELTS & tạo bài mẫu nâng cấp...');
      const hasTranscript = Boolean(azureRes?.transcript && azureRes.transcript.trim());
      const evalRes = await evaluateSpeakingWithAI({
        mode: 'practice',
        testTitle: `${topic.title} - ${currentQuestion.prompt.slice(0, 40)}...`,
        targetLevel: topic.targetBand || 'IELTS 6.5',
        responses: [
          {
            part: topic.part || 'Part 1',
            question: currentQuestion.prompt,
            durationSeconds: recordedData.durationSeconds || Math.max(1, Math.round((recordedData.blob?.size || 4000) / 4000)),
            transcript: azureRes?.transcript || '',
            // Tối ưu tốc độ: Nếu Azure đã gỡ băng thành công, chỉ gửi transcript (2KB) thay vì file audio (3MB), giúp AI phản hồi nhanh gấp 3 lần!
            audioBase64: hasTranscript ? null : recordedData.base64,
            audioMimeType: recordedData.mimeType,
            azureMetrics: azureRes
          }
        ]
      });

      if (!evalRes.success) {
        throw new Error(evalRes.error || 'Không thể kết nối dịch vụ chấm AI.');
      }

      const finalEval = evalRes.evaluation;
      setEvaluation(finalEval);

      // Save into session results immediately so student sees feedback with ZERO extra delay
      setSessionResults((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          evaluation: finalEval,
          azureMetrics: azureRes
        }
      }));

      setIsAnalyzing(false);
      setAnalysisStep('Hoàn thành!');

      // Step 3: Run Google Drive & Google Sheets submission asynchronously in the background
      // This saves 5-8 seconds of wait time for the student!
      submitSpeakingEvaluationToSystem({
        studentInfo,
        sessionName: topic.session || topic.title,
        testTitle: `${topic.title} (Câu ${currentQuestionIndex + 1})`,
        evaluation: finalEval,
        azureMetrics: azureRes,
        audioBase64: recordedData.base64,
        audioMimeType: recordedData.mimeType,
        mode: 'practice',
        transcript: azureRes?.transcript || ''
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

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link
            to="/speaking"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-primary transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Quay lại Thư viện Speaking</span>
          </Link>

          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {topic.session}
          </span>
        </div>

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
                File ghi âm sẽ tự động lưu vào Google Drive thư mục: <code>{studentInfo.className || 'Thi_sinh_tu_do'} / {topic.session}</code>
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

        {/* Question Stepper Tabs */}
        <div className="flex items-center gap-2 mb-4 overflow-x-auto no-scrollbar">
          {topic.questions.map((q, idx) => {
            const isAnswered = !!sessionResults[q.id];
            const isCurrent = idx === currentQuestionIndex;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isCurrent
                    ? 'bg-primary text-white shadow-xs'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {isAnswered && <CheckCircle2 size={13} className="text-emerald-600" />}
                <span>Câu {idx + 1}</span>
              </button>
            );
          })}
        </div>

        {/* Main Question Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs mb-6">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
              Câu hỏi {currentQuestionIndex + 1} / {topic.questions.length} ({topic.part})
            </span>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Clock size={13} />
              <span>Gợi ý nói ~{currentQuestion.recommendedDuration || 30} giây</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mb-3">
            "{currentQuestion.prompt}"
          </h1>

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

          {/* Recorder */}
          <SpeakingRecorder
            recommendedDuration={currentQuestion.recommendedDuration || 30}
            onRecordingComplete={handleRecordingComplete}
            disabled={isAnalyzing}
            questionPrompt={currentQuestion.prompt}
          />

          {/* Analysis Action Button */}
          {recordedData && !evaluation && (
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t border-gray-150">
              <span className="text-xs text-gray-500">
                Đã ghi âm: <strong>{recordedData.durationSeconds} giây</strong>. Bấm để gửi AI và Azure phân tích.
              </span>

              <button
                onClick={handleStartAnalysis}
                disabled={isAnalyzing}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-[#1e3061] hover:opacity-95 disabled:opacity-50 text-white rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} className="text-amber-300" />
                    <span>Chấm điểm phát âm & IELTS ngay</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Progress / Error message */}
          {isAnalyzing && (
            <div className="mt-4 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center gap-3 text-xs text-primary animate-pulse">
              <Loader2 size={18} className="animate-spin shrink-0" />
              <div>
                <p className="font-bold">{analysisStep}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  Đang phân tích phát âm IPA, ngữ pháp và 4 tiêu chí IELTS. Quá trình mất khoảng 3-5 giây.
                </p>
              </div>
            </div>
          )}

          {analysisError && (
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{analysisError}</span>
            </div>
          )}
        </div>

        {/* Evaluation Result Display */}
        {evaluation && (
          <div className="space-y-6">
            <SpeakingEvaluationResult
              evaluation={evaluation}
              azureMetrics={azureMetrics}
              studentInfo={studentInfo}
              sessionName={topic.session}
              testTitle={`${topic.title} - Câu ${currentQuestionIndex + 1}`}
              onRetry={() => {
                setEvaluation(null);
                setRecordedData(null);
              }}
            />

            {/* Pagination Controls */}
            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Câu trước
              </button>

              {currentQuestionIndex < topic.questions.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-extrabold hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Chuyển sang Câu {currentQuestionIndex + 2}</span>
                  <ChevronRight size={14} />
                </button>
              ) : (
                <Link
                  to="/speaking"
                  className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-extrabold hover:bg-emerald-700 transition-all cursor-pointer shadow-2xs"
                >
                  Hoàn thành buổi học 🎉
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
