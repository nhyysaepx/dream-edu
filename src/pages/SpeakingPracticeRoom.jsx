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
  Award
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

  // Analysis & Result state - Evaluation is ONLY shown when all/submitted questions are evaluated together
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [azureMetrics, setAzureMetrics] = useState(null);
  const [submittedResponses, setSubmittedResponses] = useState([]);
  const [analysisError, setAnalysisError] = useState('');

  const recordedCount = Object.keys(recordingsByQuestion).length;
  const totalQuestions = topic.questions.length;
  const isAllRecorded = recordedCount === totalQuestions;
  const currentRecording = recordingsByQuestion[currentQuestionIndex] || null;

  const handleSaveStudent = (e) => {
    e.preventDefault();
    saveStoredStudent(studentInfo);
    setIsEditingStudent(false);
  };

  const handleRecordingComplete = (data) => {
    setRecordingsByQuestion((prev) => ({
      ...prev,
      [currentQuestionIndex]: data
    }));
    setAnalysisError('');

    // Chạy ngầm phân tích Azure Speech ngay khi học sinh vừa nói xong câu này (chế độ unscripted speaking)
    // Giúp trích xuất transcript trung thực siêu tốc, tiết kiệm 100% thời gian chờ đợi khi nộp bài
    if (data?.blob) {
      assessAudioWithAzure(data.blob)
        .then((azRes) => {
          if (azRes && azRes.hasData) {
            setAzureMetricsByQuestion((prev) => ({
              ...prev,
              [currentQuestionIndex]: azRes
            }));
          }
        })
        .catch((err) => {
          console.warn('Background Azure check note:', err);
        });
    }
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
            mimeType: rec.mimeType
          };
        })
        .filter(Boolean);

      // Nếu có câu nào vừa thu âm xong bấm nộp ngay mà Azure chạy ngầm chưa kịp xong, chạy song song kiểm tra nốt
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
      const combinedAzure = updatedAzureMetrics[0] || { hasData: false };
      setAzureMetrics(combinedAzure);

      // Step 2: Call Gemini via Cloudflare Worker
      // TỐI ƯU CỰC ĐẠI: Chỉ gửi Text (transcript + số đo Azure) khi đã có transcript; nếu câu nào chưa có transcript thì mới gửi audioBase64
      setAnalysisStep('2/2: Giám khảo AI đang chấm tổng thể 4 tiêu chí IELTS và phân tích chi tiết từng câu...');
      const evalPayload = {
        mode: 'practice',
        testTitle: topic.title,
        targetLevel: topic.targetBand || 'IELTS 6.5',
        responses: responsesList.map((r, idx) => {
          const az = updatedAzureMetrics[idx];
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
        transcript: combinedAzure?.transcript || ''
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
    setSubmittedResponses([]);
    setCurrentQuestionIndex(0);
    setAnalysisError('');
  };

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

          <span className="text-xs font-extrabold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {topic.session}
          </span>
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

                return (
                  <button
                    key={q.id || idx}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                      isCurrent
                        ? 'bg-primary text-white shadow-xs'
                        : isRecorded
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {isRecorded ? (
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-gray-300" />
                    )}
                    <span>Câu {idx + 1}</span>
                    {isRecorded && (
                      <span className="text-[10px] opacity-75">({recordingsByQuestion[idx].durationSeconds}s)</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Main Question Card */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs mb-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-lg">
                  Câu hỏi {currentQuestionIndex + 1} / {totalQuestions} ({topic.part})
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

              {/* Recorder with initialData support */}
              <SpeakingRecorder
                recommendedDuration={currentQuestion.recommendedDuration || 30}
                onRecordingComplete={handleRecordingComplete}
                disabled={isAnalyzing}
                questionPrompt={currentQuestion.prompt}
                initialData={currentRecording}
              />

              {/* In-Card Navigation Controls */}
              <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-gray-150">
                <button
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 disabled:opacity-40 hover:bg-gray-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ChevronLeft size={14} />
                  <span>Câu trước</span>
                </button>

                <div className="text-xs font-bold text-gray-500">
                  {currentRecording ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={13} />
                      Đã ghi âm câu này
                    </span>
                  ) : (
                    <span className="text-amber-600">Chưa ghi âm câu này</span>
                  )}
                </div>

                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    onClick={handleNextQuestion}
                    className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-extrabold hover:bg-primary-container transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitAll}
                    disabled={recordedCount === 0}
                    className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-xl text-xs font-black hover:opacity-95 disabled:opacity-40 transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Nộp toàn bộ bài ➔</span>
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
                  isAllRecorded ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/10 text-primary'
                }`}>
                  {isAllRecorded ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900">
                    Tiến độ hoàn thành: {recordedCount} / {totalQuestions} câu hỏi
                  </div>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    {isAllRecorded
                      ? 'Bạn đã ghi âm đầy đủ toàn bộ câu hỏi. Hãy bấm Nộp bài để nhận bảng điểm Overall & chi tiết!'
                      : `Hãy ghi âm nốt ${totalQuestions - recordedCount} câu còn lại, hoặc bấm Nộp bài ngay khi sẵn sàng.`}
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmitAll}
                disabled={recordedCount === 0}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-primary via-[#243c77] to-[#1e3061] hover:opacity-95 disabled:opacity-40 text-white rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Sparkles size={16} className="text-amber-300" />
                <span>NỘP TOÀN BỘ BÀI VÀ NHẬN KẾT QUẢ IELTS AI ({recordedCount}/{totalQuestions} CÂU)</span>
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
