import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  MessageSquare, 
  Sparkles, 
  FileText,
  Volume2,
  Headphones,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { EXAM_COLLECTIONS } from '../data/examData';

export default function TestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find selected exam
  const exam = EXAM_COLLECTIONS.find(e => e.id === id) || EXAM_COLLECTIONS[0];

  // Top Tabs: 'info' | 'transcript'
  const [topTab, setTopTab] = useState('info');

  // Mode Tabs: 'practice' | 'fulltest' | 'discussion'
  const [modeTab, setModeTab] = useState('practice');

  // Selected parts in practice mode
  const [selectedParts, setSelectedParts] = useState(
    exam.parts ? exam.parts.map(p => p.id) : [1, 2, 3, 4]
  );
  
  // Time limits array: from 5 -> 100 minutes, step 5 minutes
  const TIME_OPTIONS = Array.from({ length: 20 }, (_, i) => (i + 1) * 5); // [5, 10, 15, ..., 100]
  const [timeLimit, setTimeLimit] = useState(() => {
    // Default smart suggestion
    return exam.skill === 'Reading' ? '60' : '40';
  });

  // Calculate selected questions count
  const selectedQuestionsCount = exam.parts
    ? exam.parts
        .filter(p => selectedParts.includes(p.id))
        .reduce((sum, p) => sum + (p.questionCount || p.questions?.length || 0), 0)
    : 0;

  // Auto-adjust default recommended time based on selected parts
  const handleSelectSinglePart = (partId) => {
    setSelectedParts([partId]);
    if (exam.skill === 'Reading') {
      setTimeLimit('20'); // 20 mins for 1 passage
    } else {
      setTimeLimit('10'); // 10 mins for 1 listening part
    }
  };

  const handleSelectAllParts = () => {
    const allIds = exam.parts ? exam.parts.map(p => p.id) : [1, 2, 3, 4];
    setSelectedParts(allIds);
    setTimeLimit(exam.skill === 'Reading' ? '60' : '40');
  };

  const handleStartPractice = () => {
    const partsParam = selectedParts.join(',');
    const timeParam = timeLimit ? `&time=${timeLimit}` : '';
    navigate(`/tests/${exam.id}/exam?mode=practice&parts=${partsParam}${timeParam}`);
  };

  const handleStartFullTest = () => {
    const allParts = exam.parts ? exam.parts.map(p => p.id).join(',') : '1,2,3,4';
    navigate(`/tests/${exam.id}/exam?mode=fulltest&parts=${allParts}&time=${exam.duration}`);
  };

  return (
    <div className="pt-24 pb-16 bg-[#fafbfc] min-h-screen text-left">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Back */}
        <Link
          to="/test-platform"
          className="inline-flex items-center gap-2 text-sm text-[#2c4482] hover:underline mb-6 font-medium cursor-pointer"
        >
          <ArrowLeft size={16} /> Quay lại danh sách đề thi
        </Link>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 bg-blue-50 text-[#2c4482] text-xs font-semibold px-2.5 py-1 rounded">
            {exam.skill === 'Listening' ? <Headphones size={13} /> : <BookOpen size={13} />}
            {exam.skill}
          </span>
          {exam.tags?.map((tag, idx) => (
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
          {exam.title}
        </h1>

        {/* Top Tabs: Thông tin đề thi | Đáp án/transcript */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setTopTab('info')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              topTab === 'info'
                ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Thông tin đề thi
          </button>
          <button
            onClick={() => setTopTab('transcript')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              topTab === 'transcript'
                ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold'
                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            Đáp án/transcript
          </button>
        </div>

        {/* TAB 1: THÔNG TIN ĐỀ THI */}
        {topTab === 'info' && (
          <div className="space-y-6">
            
            {/* Meta Stats */}
            <div className="space-y-1.5 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-400" />
                <span>
                  Thời gian làm bài: <strong>{exam.duration} phút</strong> | {exam.partsCount} phần thi | {exam.questionsCount} câu hỏi | {exam.commentsCount || 150} bình luận
                </span>
              </div>
            </div>

            {/* Red Note */}
            <p className="text-sm italic text-red-600 font-medium">
              Chú ý: để được quy đổi sang scaled score (ví dụ trên thang điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ làm FULL TEST.
            </p>

            {/* Mode Tabs: Luyện tập | Làm full test | Thảo luận */}
            <div className="border-b border-gray-200 flex gap-8">
              <button
                onClick={() => setModeTab('practice')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                  modeTab === 'practice'
                    ? 'border-[#2c4482] text-[#2c4482]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Luyện tập
              </button>
              <button
                onClick={() => setModeTab('fulltest')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                  modeTab === 'fulltest'
                    ? 'border-[#2c4482] text-[#2c4482]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Làm full test
              </button>
              <button
                onClick={() => setModeTab('discussion')}
                className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
                  modeTab === 'discussion'
                    ? 'border-[#2c4482] text-[#2c4482]'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                Thảo luận
              </button>
            </div>

            {/* Mode Content: Luyện tập */}
            {modeTab === 'practice' && (
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <h3 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                      <span>Chọn phần thi bạn muốn làm:</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-[#185bc3]">
                        {selectedParts.length} / {exam.parts?.length || 0} phần ({selectedQuestionsCount} câu hỏi)
                      </span>
                    </h3>

                    {/* Quick Select Buttons */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={handleSelectAllParts}
                        className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                          selectedParts.length === (exam.parts?.length || 0)
                            ? 'bg-[#2c4482] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {exam.skill === 'Reading' ? 'Tất cả 3 bài đọc' : 'Tất cả 4 phần'}
                      </button>
                      {exam.parts?.map((part) => {
                        const isSolo = selectedParts.length === 1 && selectedParts[0] === part.id;
                        return (
                          <button
                            key={part.id}
                            type="button"
                            onClick={() => handleSelectSinglePart(part.id)}
                            className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                              isSolo
                                ? 'bg-[#185bc3] text-white shadow-xs ring-2 ring-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {exam.skill === 'Reading' ? `Passage ${part.id} riêng` : `Part ${part.id} riêng`}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {exam.parts?.map((part) => {
                      const isChecked = selectedParts.includes(part.id);
                      return (
                        <label 
                          key={part.id}
                          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
                            isChecked 
                              ? 'bg-blue-50/40 border-[#2c4482]/40 shadow-xs ring-1 ring-[#2c4482]/20' 
                              : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
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
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-sm">
                                {part.title}: {part.name}
                              </span>
                              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                                {part.questionCount || part.questions?.length || 10} câu ({part.questionRange || ''})
                              </span>
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

                {/* Giới hạn thời gian (từ 5 -> 100 phút, cách mỗi 5 phút) */}
                <div className="bg-white border border-gray-200/90 rounded-2xl p-4 sm:p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-0.5">
                        Giới hạn thời gian làm bài:
                      </label>
                      <p className="text-xs text-gray-500">
                        Chọn từ 5 đến 100 phút (cách mỗi 5 phút). Khi hết giờ, hệ thống sẽ tự động khóa bài thi.
                      </p>
                    </div>

                    {/* Current chosen display */}
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                      {timeLimit ? `⏱ ${timeLimit} phút` : '⏱ Không giới hạn'}
                    </span>
                  </div>

                  {/* Dropdown Select with 5 to 100 min, step 5 min */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <select
                        value={timeLimit}
                        onChange={(e) => setTimeLimit(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:border-[#2c4482] focus:ring-2 focus:ring-[#2c4482]/20 shadow-xs cursor-pointer"
                      >
                        <option value="">Không giới hạn thời gian (Luyện tập tự do)</option>
                        {TIME_OPTIONS.map((m) => (
                          <option key={m} value={m.toString()}>
                            {m} phút {m === (exam.skill === 'Reading' ? 60 : 40) ? '(Chuẩn IELTS Full)' : ''} {m === 20 ? '(Chuẩn 1 Passage)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Quick Preset Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs text-gray-400 font-medium mr-1">Gợi ý nhanh:</span>
                      {[
                        { val: '10', label: '10p' },
                        { val: '15', label: '15p' },
                        { val: '20', label: '20p' },
                        { val: '30', label: '30p' },
                        { val: '40', label: '40p' },
                        { val: '60', label: '60p' },
                        { val: '', label: 'Tự do' },
                      ].map((chip) => (
                        <button
                          key={chip.label}
                          type="button"
                          onClick={() => setTimeLimit(chip.val)}
                          className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                            timeLimit === chip.val
                              ? 'bg-[#2c4482] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {chip.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Red/Orange Notice for Auto-lock on Expiration */}
                  <div className="p-3 bg-rose-50/70 border border-rose-200/80 rounded-xl flex items-start gap-2.5 text-xs text-rose-800">
                    <span className="font-bold text-sm">⚠️</span>
                    <p className="leading-relaxed">
                      <strong>Lưu ý quan trọng:</strong> Khi thời gian đếm ngược kết thúc (00:00), <strong>toàn bộ bài thi sẽ tự động khóa và nộp điểm</strong>. Học sinh sẽ không thể tiếp tục điền hoặc thay đổi đáp án.
                    </p>
                  </div>
                </div>

                {/* Button Bắt đầu làm bài -> navigates to /tests/:id/exam */}
                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={handleStartPractice}
                    disabled={selectedParts.length === 0}
                    className="bg-[#2c4482] hover:bg-[#20325c] text-white px-8 py-3.5 rounded-xl font-bold text-base transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
                  >
                    <span>Bắt đầu làm bài</span>
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-md font-medium">
                      {selectedParts.length} phần • {timeLimit ? `${timeLimit} phút` : 'Tự do'}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode Content: Làm Full Test */}
            {modeTab === 'fulltest' && (
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
                  <li>Thời gian làm bài chính xác <strong>{exam.duration} phút</strong>, hệ thống tự động thu bài khi hết giờ.</li>
                  <li>Làm liên tục toàn bộ {exam.partsCount} phần thi với {exam.questionsCount} câu hỏi.</li>
                  <li>Tự động chấm điểm và quy đổi sang <strong>IELTS Scaled Band Score (1.0 - 9.0)</strong> ngay khi hoàn thành.</li>
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
            {modeTab === 'discussion' && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
                <h3 className="font-bold text-gray-900 text-base">Cộng đồng thảo luận đề thi ({exam.commentsCount || 120} bình luận)</h3>
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
                      Đề thi chuẩn sát với format thi thật tại Hội đồng Anh và IDP năm nay. Mọi người chú ý nghe kỹ các chi tiết số liệu và bẫy thời gian nhé!
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: ĐÁP ÁN / TRANSCRIPT */}
        {topTab === 'transcript' && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">Transcript & Đáp án chi tiết</h3>
              <p className="text-sm text-gray-600 mb-4">
                Dữ liệu được trích xuất trực tiếp từ tài liệu gốc <strong>Full Original Exam VOL 1–9</strong>.
              </p>
              {exam.audioTracks?.[1] && (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Audio Preview (Part 1):</span>
                  <audio controls className="w-full max-w-md h-9">
                    <source src={exam.audioTracks[1]} type="audio/mpeg" />
                    Trình duyệt không hỗ trợ audio element.
                  </audio>
                </div>
              )}
            </div>

            {/* Transcript or Passage overview */}
            {exam.transcript && (
              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-2 flex items-center gap-2">
                  <FileText size={16} className="text-[#2c4482]" /> Full Listening Transcript
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-xs text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto leading-relaxed">
                  {exam.transcript}
                </div>
              </div>
            )}

            {/* Answer Keys */}
            <div>
              <h4 className="font-semibold text-gray-800 text-sm mb-3">Đáp án tham khảo (Answer Key):</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {exam.parts?.flatMap(p => p.questions || []).slice(0, 40).map(q => (
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
