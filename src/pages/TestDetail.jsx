import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Users, 
  MessageSquare, 
  Sparkles, 
  Info, 
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
  const [timeLimit, setTimeLimit] = useState('');

  // Draft state (synced with localStorage)
  const draftStorageKey = `ielts_draft_${exam.id}`;
  const [draft, setDraft] = useState(() => {
    const saved = localStorage.getItem(draftStorageKey);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default initial mock draft for vol1-lis-1 (as seen in screenshots)
    if (exam.id === 'vol1-lis-1') {
      return {
        exists: true,
        title: exam.title,
        timestamp: '16/09/2026 09:07:22',
        answeredCount: 0,
        timeSpent: '0:01:45',
        version: 'IELTS Test v1',
        mode: 'Full test'
      };
    }
    return { exists: false };
  });

  const handleClearDraft = () => {
    localStorage.removeItem(draftStorageKey);
    setDraft({ exists: false });
  };

  const handleResumeDraft = () => {
    navigate(`/tests/${exam.id}/exam?resume=true`);
  };

  const handleStartPractice = () => {
    const partsParam = selectedParts.join(',');
    const timeParam = timeLimit ? `&time=${timeLimit}` : '';
    navigate(`/tests/${exam.id}/exam?mode=practice&parts=${partsParam}${timeParam}`);
  };

  const handleStartFullTest = () => {
    navigate(`/tests/${exam.id}/exam?mode=fulltest`);
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
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-400" />
                <span>
                  <strong>{(exam.participants || 250000).toLocaleString()}</strong> người đã luyện tập đề thi này
                </span>
              </div>
            </div>

            {/* Red Note */}
            <p className="text-sm italic text-red-600 font-medium">
              Chú ý: để được quy đổi sang scaled score (ví dụ trên thang điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế độ làm FULL TEST.
            </p>

            {/* Amber / Yellow Banner: Bạn có bài làm chưa nộp dưới đây */}
            {draft?.exists && (
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
                          <div className="font-semibold text-gray-900">{draft.title || exam.title}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{draft.timestamp}</div>
                          <div className="flex gap-1.5 mt-1">
                            <span className="bg-gray-100 text-gray-600 text-[10px] px-1.5 py-0.5 rounded font-medium">
                              {draft.version || 'IELTS Test v1'}
                            </span>
                            <span className="bg-green-100 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-medium">
                              {draft.mode || 'Full test'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-700">
                          {draft.answeredCount || 0}/40
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {draft.timeSpent || '0:01:45'}
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
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Chọn phần thi bạn muốn làm</h3>
                  <div className="space-y-3">
                    {exam.parts?.map((part) => {
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
                              {part.title}: {part.name} ({part.questionCount} câu hỏi)
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
                      placeholder={`Ví dụ: ${exam.duration}`}
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482]"
                    />
                    <span className="text-sm text-gray-500">phút</span>
                  </div>
                </div>

                {/* Button Bắt đầu làm bài -> navigates to /tests/:id/exam */}
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
