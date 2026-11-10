import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Headphones, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  PlayCircle,
  Sparkles,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { HOMEWORK_LEVELS, HOMEWORK_LIST } from '../data/homeworkData';

export default function Homework() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeLevel, setActiveLevel] = useState(() => {
    const requested = searchParams.get('level');
    if (requested === 'intermediate' || requested === 'ielts-intermediate' || requested === 'ielts-foundation') {
      return 'ielts-foundation';
    }
    if (requested && HOMEWORK_LEVELS.some(l => l.id === requested)) {
      return requested;
    }
    return 'ielts-foundation'; // Default to IELTS Intermediate / Foundation so new exercises are immediately visible
  });
  const [activeSkill, setActiveSkill] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [submissionHistory, setSubmissionHistory] = useState({});

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('dream_homework_history');
      if (savedHistory) {
        setSubmissionHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error('Error reading homework history:', e);
    }
  }, []);

  // Filter homework assignments
  const filteredHomework = HOMEWORK_LIST.filter(item => {
    const matchesLevel = item.levelId === activeLevel;
    const matchesSkill = activeSkill === 'all' || item.skill.toLowerCase() === activeSkill.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSkill && matchesSearch;
  });

  const getSkillIcon = (skill) => {
    switch (skill.toLowerCase()) {
      case 'listening':
        return <Headphones size={16} className="text-blue-600" />;
      case 'reading':
        return <BookOpen size={16} className="text-emerald-600" />;
      default:
        return <FileText size={16} className="text-amber-600" />;
    }
  };

  const getSkillBadgeColor = (skill) => {
    switch (skill.toLowerCase()) {
      case 'listening':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reading':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium mb-2">
            <Link to="/" className="hover:text-primary transition-colors">Trang chủ</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Homework</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
                <span>Phòng Bài tập về nhà</span>
                <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary font-semibold rounded-full uppercase tracking-wider">
                  Homework Platform
                </span>
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Hệ thống bài tập tự luyện và củng cố kiến thức theo từng lộ trình học tại Dream Education.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-gray-200/80 shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <GraduationCap size={18} />
                </div>
                <div className="text-xs">
                  <p className="text-gray-500 font-medium">4 Phân hệ cấp độ</p>
                  <p className="font-bold text-gray-900">Chuẩn Cambridge IELTS</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Subsection Levels Tabs (Core requirement) */}
        <div className="bg-white rounded-2xl p-2 border border-gray-200/80 shadow-xs mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {HOMEWORK_LEVELS.map(level => {
              const count = HOMEWORK_LIST.filter(h => h.levelId === level.id).length;
              const isActive = activeLevel === level.id;
              return (
                <button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id)}
                  className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-[#2c4482] to-[#1e3061] text-white shadow-md shadow-blue-900/10 scale-[1.01]'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className={`text-base font-bold tracking-tight ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {level.label}
                  </span>
                  <span className={`text-xs mt-1 font-medium ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    {level.badge}
                  </span>
                  <span className={`text-[11px] mt-1.5 px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count} bài tập
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
          {/* Skill Filter Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Tất cả kỹ năng' },
              { id: 'listening', label: 'Listening' },
              { id: 'reading', label: 'Reading' },
              { id: 'writing', label: 'Writing' }
            ].map(skill => (
              <button
                key={skill.id}
                onClick={() => setActiveSkill(skill.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeSkill === skill.id
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                {skill.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm bài tập..."
              className="w-full bg-white border border-gray-300 rounded-lg px-3.5 py-2 pr-9 text-xs sm:text-sm text-gray-900 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 shadow-xs"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Homework Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHomework.map(item => {
            const history = submissionHistory[item.id];
            const isCompleted = !!history;
            const isUpcoming = item.status === 'upcoming';

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-400/60"
              >
                <div className="p-5 sm:p-6">
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-md">
                      {item.session}
                    </span>
                    <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1 ${getSkillBadgeColor(item.skill)}`}>
                      {getSkillIcon(item.skill)}
                      {item.skill}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Meta Specs */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-500 bg-gray-50 p-3 rounded-xl border border-gray-100 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Clock size={13} className="text-gray-400" />
                      <span>{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FileText size={13} className="text-gray-400" />
                      <span>{item.exercisesCount} bài tập ({item.totalQuestions} câu)</span>
                    </div>
                    {item.audioTracksCount > 0 && (
                      <div className="flex items-center gap-1.5 col-span-2 text-blue-700 font-medium">
                        <Headphones size={13} />
                        <span>Kèm {item.audioTracksCount} file Audio chuẩn bản quyền</span>
                      </div>
                    )}
                  </div>

                  {/* Completion Status if completed */}
                  {isCompleted && (
                    <div className="flex items-center gap-2 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-medium mb-3">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                      <span>Đã làm: {history.score}/{history.total} câu ({Math.round((history.score / history.total) * 100)}%)</span>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="p-4 sm:p-5 pt-0 space-y-2">
                  {item.id === 'pre-ielts-reading-1' && (
                    <Link
                      to="/vocab/pre-ielts-reading-1"
                      className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <BookOpen size={13} className="text-amber-600" />
                      <span>Học 30 từ vựng Reading 1</span>
                    </Link>
                  )}
                  {item.id === 'pre-ielts-reading-2' && (
                    <Link
                      to="/vocab/pre-ielts-reading-2"
                      className="w-full py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <BookOpen size={13} className="text-amber-600" />
                      <span>Học từ vựng Reading 2</span>
                    </Link>
                  )}

                  {isUpcoming ? (
                    <button 
                      disabled
                      className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-gray-400 font-semibold text-xs text-center cursor-not-allowed"
                    >
                      Sắp mở bài tập
                    </button>
                  ) : (
                    <Link
                      to={`/homework/${item.id}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2c4482] to-[#1e3061] hover:from-[#233769] hover:to-[#17254c] text-white font-semibold text-xs text-center shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
                    >
                      <span>{isCompleted ? 'Làm lại bài tập' : 'Làm bài tập ngay'}</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state if nothing found */}
        {filteredHomework.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center my-6">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FileText size={24} />
            </div>
            <h3 className="text-base font-bold text-gray-800 mb-1">Không tìm thấy bài tập phù hợp</h3>
            <p className="text-xs text-gray-500">Vui lòng chọn kỹ năng khác hoặc thay đổi từ khóa tìm kiếm.</p>
          </div>
        )}

      </div>
    </div>
  );
}
