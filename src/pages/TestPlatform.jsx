import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Users, 
  MessageSquare, 
  AlertCircle,
  Headphones,
  BookOpen
} from 'lucide-react';
import { EXAM_COLLECTIONS, FILTER_CATEGORIES } from '../data/examData';

export default function TestPlatform() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [librarySubTab, setLibrarySubTab] = useState('all'); // 'all' | 'shortened'

  // Filter exams for library
  const filteredExams = EXAM_COLLECTIONS.filter(exam => {
    const matchesCategory = activeCategory === 'Tất cả' || exam.category === activeCategory || exam.tags?.includes(activeCategory);
    const matchesSearch = !searchQuery.trim() || 
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.skill.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-16 bg-[#fafbfc] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Thư viện đề thi</h1>

        {/* Filter Categories Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#e8f1ff] text-[#185bc3] font-semibold shadow-xs'
                  : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-900 focus:outline-none focus:border-[#2c4482] focus:ring-1 focus:ring-[#2c4482] shadow-xs"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button 
            onClick={() => {}}
            className="bg-[#2c4482] hover:bg-[#20325c] text-white px-8 py-3 rounded-lg font-medium text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Tìm kiếm
          </button>
        </div>

        {/* Sub-tabs: Tất cả / Đề rút gọn */}
        <div className="flex gap-8 border-b border-gray-200 mb-8">
          <button
            onClick={() => setLibrarySubTab('all')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              librarySubTab === 'all'
                ? 'border-[#2c4482] text-[#2c4482]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setLibrarySubTab('shortened')}
            className={`pb-3 text-sm font-semibold transition-colors cursor-pointer border-b-2 ${
              librarySubTab === 'shortened'
                ? 'border-[#2c4482] text-[#2c4482]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            Đề rút gọn
          </button>
        </div>

        {/* Exam Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <div 
              key={exam.id}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-2 text-xs font-semibold text-[#2c4482]">
                  {exam.skill === 'Listening' ? <Headphones size={14} /> : <BookOpen size={14} />}
                  <span>{exam.skill.toUpperCase()} TEST</span>
                </div>

                <h3 className="font-bold text-gray-900 text-base mb-3 leading-snug line-clamp-2">
                  {exam.title}
                </h3>

                {/* Metrics line */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <Clock size={13} className="text-gray-400" />
                    {exam.duration} phút
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <Users size={13} className="text-gray-400" />
                    {exam.participants?.toLocaleString() || '150,000'}
                  </span>
                  <span>|</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare size={13} className="text-gray-400" />
                    {exam.commentsCount || 120}
                  </span>
                </div>

                {/* Parts count */}
                <div className="text-xs text-gray-600 mb-4 font-medium">
                  {exam.partsCount} phần thi | {exam.questionsCount} câu hỏi
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {exam.tags?.map((t, idx) => (
                    <span 
                      key={idx}
                      className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Chi tiết Button navigates to distinct route /tests/:id */}
              <Link
                to={`/tests/${exam.id}`}
                className="w-full py-2.5 border border-[#2c4482] text-[#2c4482] hover:bg-[#2c4482] hover:text-white rounded-lg font-medium text-sm transition-all text-center active:scale-98 block"
              >
                Chi tiết
              </Link>
            </div>
          ))}
        </div>

        {filteredExams.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <AlertCircle size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 font-medium">Không tìm thấy đề thi phù hợp với từ khóa.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('Tất cả'); }}
              className="mt-4 text-[#2c4482] hover:underline text-sm font-semibold cursor-pointer"
            >
              Xóa bộ lọc & xem tất cả
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
