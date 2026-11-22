import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mic, 
  Sparkles, 
  Clock, 
  Award, 
  ArrowRight, 
  GraduationCap, 
  HelpCircle, 
  CheckCircle2, 
  Layers, 
  Flame, 
  Search,
  BookOpen,
  FolderCheck,
  History,
  Volume2
} from 'lucide-react';
import { SPEAKING_TOPICS, SPEAKING_MOCK_TESTS, SPEAKING_LEVELS } from '../data/speakingData';
import { getStoredStudent } from '../utils/studentStorage';

export default function SpeakingHub() {
  const [activeTab, setActiveTab] = useState('practice'); // 'practice' | 'mock' | 'history'
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingHistory, setSpeakingHistory] = useState([]);

  const student = getStoredStudent();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('dream_submission_log');
      if (raw) {
        const parsed = JSON.parse(raw);
        // Filter submissions where isSpeaking is true
        const speakingEntries = parsed.filter(
          (item) => item.isSpeaking || (item.type && item.type.includes('Speaking'))
        );
        setSpeakingHistory(speakingEntries);
      }
    } catch (e) {
      console.error('Error reading speaking history:', e);
    }
  }, []);

  // Filter practice topics
  const filteredTopics = SPEAKING_TOPICS.filter((t) => {
    const matchesLevel =
      selectedLevel === 'all' ||
      t.levelId === selectedLevel ||
      (selectedLevel === 'intermediate' && (t.levelId === 'intermediate' || t.levelId === 'ielts-foundation')) ||
      (selectedLevel === 'foundation' && (t.levelId === 'foundation' || t.levelId === 'pre-ielts' || t.levelId === 'ielts-beginner')) ||
      (selectedLevel === 'advanced' && (t.levelId === 'advanced' || t.levelId === 'ielts-advanced'));
    const matchesSearch =
      !searchQuery.trim() ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.session.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-3">
          <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-500">Phòng học</span>
          <span>/</span>
          <span className="text-gray-900 font-semibold">Luyện nói IELTS (AI Speaking)</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#1e3a8a] via-[#2c4482] to-[#1e3061] text-white rounded-3xl p-6 sm:p-10 shadow-md mb-8 relative overflow-hidden">
          <div className="max-w-3xl relative z-10">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs px-3 py-1 bg-white/15 rounded-full font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-300" />
                <span>AI IELTS Speaking Evaluator</span>
              </span>
              <span className="text-xs px-3 py-1 bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 rounded-full font-bold">
                Tích hợp Azure Speech + Gemini 2.5
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Phòng Luyện Nói IELTS AI Thông Minh
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-blue-100 leading-relaxed">
              Ghi âm trực tiếp trên trình duyệt, nhận bản phân tích tức thì 4 tiêu chí IELTS Speaking (Fluency, Vocabulary, Grammar, Pronunciation) và đo vật lý sóng âm qua Azure Speech. Toàn bộ file ghi âm được tự động gom vào Google Drive theo lớp và buổi học của bạn.
            </p>

            {/* Quick stats badges */}
            <div className="flex items-center gap-4 mt-6 flex-wrap text-xs font-semibold text-blue-200">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Chấm phát âm từng âm vị IPA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Sửa lỗi ngữ pháp & nâng band từ vựng</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FolderCheck size={15} className="text-amber-300" />
                <span>Lưu Drive: Lớp / Buổi học / File học sinh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Tabs: Practice / Mock Test / History */}
        <div className="bg-white rounded-2xl border border-gray-200/90 p-1.5 shadow-xs mb-8 flex flex-col sm:flex-row gap-1.5">
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'practice'
                ? 'bg-primary text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Mic size={16} />
            <span>Luyện theo chủ đề / Buổi học ({SPEAKING_TOPICS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mock')}
            className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'mock'
                ? 'bg-primary text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <GraduationCap size={16} />
            <span>Phòng Thi Thử IELTS 3 Parts ({SPEAKING_MOCK_TESTS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-3 px-5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'history'
                ? 'bg-primary text-white shadow-xs'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <History size={16} />
            <span>Lịch sử bài làm ({speakingHistory.length})</span>
          </button>
        </div>

        {/* ========================================================
            TAB 1: SPEAKING PRACTICE (BY TOPIC / SESSION)
           ======================================================== */}
        {activeTab === 'practice' && (
          <div className="space-y-6 animate-pop-in">
            {/* Level Filter Chips & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {SPEAKING_LEVELS.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedLevel === lvl.id
                        ? 'bg-primary text-white shadow-2xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {lvl.name} {lvl.badge && `(${lvl.badge})`}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm chủ đề luyện nói..."
                  className="w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2 pr-9 text-xs text-gray-900 focus:outline-none focus:border-primary shadow-2xs"
                />
                <Search size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Topic Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredTopics.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {item.session}
                      </span>
                      <span className="text-[11px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-1 rounded-lg">
                        {item.targetBand}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100 mb-5">
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-gray-400" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Mic size={13} className="text-gray-400" />
                        <span>{item.questions.length} câu hỏi ({item.part})</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/speaking/practice/${item.id}`}
                    className="w-full py-3 px-4 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs text-center shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Luyện nói chủ đề này</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: IELTS SPEAKING MOCK TESTS (FULL 3 PARTS)
           ======================================================== */}
        {activeTab === 'mock' && (
          <div className="space-y-6 animate-pop-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPEAKING_MOCK_TESTS.map((mock) => (
                <div
                  key={mock.id}
                  className="bg-white rounded-3xl border-2 border-primary/30 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                        {mock.badge}
                      </span>
                      <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                        <Clock size={13} />
                        <span>{mock.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors mb-2">
                      {mock.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      {mock.description}
                    </p>

                    {/* 3 Parts Specs */}
                    <div className="space-y-2 mb-6">
                      {mock.parts.map((p, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-2xl bg-gray-50 border border-gray-150 flex items-center justify-between gap-2 text-xs"
                        >
                          <span className="font-extrabold text-gray-800">
                            {p.title.split(':')[0]}
                          </span>
                          <span className="text-gray-500 text-[11px] truncate max-w-[200px]">
                            {p.topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/speaking/mock/${mock.id}`}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-primary to-[#1e3061] hover:opacity-95 text-white font-black text-xs text-center shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>Vào phòng thi thử ngay</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: SUBMISSION LOG HISTORY
           ======================================================== */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xs animate-pop-in space-y-4">
            <h2 className="text-lg font-black text-gray-900 mb-2">
              Lịch sử các bài nói đã nộp trên thiết bị này
            </h2>

            {speakingHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                Chưa có bài nói nào được nộp từ trình duyệt này. Hãy chọn một chủ đề hoặc phòng thi thử để bắt đầu!
              </div>
            ) : (
              <div className="space-y-3">
                {speakingHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-gray-50/70 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-black text-gray-900 text-sm">
                          {item.testTitle || item.sessionName || 'Speaking Assignment'}
                        </span>
                        {item.overallBand > 0 && (
                          <span className="px-2 py-0.5 rounded-md bg-primary text-white font-extrabold text-[11px]">
                            Band {item.overallBand}
                          </span>
                        )}
                        <span className="text-gray-400 text-[11px]">
                          {item.submittedAt || item.loggedAt}
                        </span>
                      </div>
                      <p className="text-gray-600 text-[11px]">
                        Học sinh: <strong>{item.studentName}</strong> {item.className ? `(${item.className})` : ''} • Loại bài: <strong>{item.type}</strong>
                      </p>
                    </div>

                    <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-medium">
                      ✅ Đã lưu Drive & gửi giáo viên
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
