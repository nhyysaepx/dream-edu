import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Laptop, 
  BookOpen, 
  GraduationCap, 
  FileText,
  Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { PRACTICE_LIST, getPracticeDetailById } from '../data/practiceData';
import { HOMEWORK_LIST, getHomeworkDetailById } from '../data/homeworkData';
import { EXAM_COLLECTIONS } from '../data/examData';

export default function PasswordScreen({ currentPath = '' }) {
  const { login } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Determine metadata about what is being accessed
  const getTargetMeta = () => {
    const cleanPath = currentPath.replace(/\/+$/, '') || '/';

    // 1. Practice routes
    if (cleanPath.startsWith('/practice')) {
      if (cleanPath === '/practice') {
        return {
          category: 'Phòng học • Luyện trên lớp',
          title: 'Khu vực Practice (Luyện trên lớp)',
          description: 'Hệ thống bài tập rèn luyện thao tác làm bài chuẩn format thi máy tính (Highlight, Note, Real-time Word Limit).',
          icon: Laptop,
          badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      }
      const pId = cleanPath.replace('/practice/', '');
      const practiceItem = PRACTICE_LIST.find(p => p.id === pId) || (typeof getPracticeDetailById === 'function' ? getPracticeDetailById(pId) : null);
      return {
        category: `Practice • ${practiceItem?.skill || 'Luyện tập'}`,
        title: practiceItem?.title || 'Bài luyện tập kỹ năng',
        description: practiceItem?.description || 'Nội dung bài tập thực hành dành cho học viên trên lớp.',
        icon: practiceItem?.skill === 'Reading' ? BookOpen : Laptop,
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }

    // 2. Homework routes
    if (cleanPath.startsWith('/homework')) {
      if (cleanPath === '/homework') {
        return {
          category: 'Phòng học • Bài tập về nhà',
          title: 'Hệ thống Homework (Bài tập về nhà)',
          description: 'Không gian làm và nộp bài tập về nhà theo lộ trình đào tạo chuẩn của Dream Education.',
          icon: FileText,
          badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      }
      const hwId = cleanPath.replace('/homework/', '');
      const hwItem = HOMEWORK_LIST.find(h => h.id === hwId) || (typeof getHomeworkDetailById === 'function' ? getHomeworkDetailById(hwId) : null);
      return {
        category: `Homework • ${hwItem?.skill || 'Bài tập'}`,
        title: hwItem?.title || 'Bài tập về nhà',
        description: hwItem?.description || 'Bài tập rèn luyện củng cố kiến thức sau buổi học.',
        icon: hwItem?.skill === 'Reading' ? BookOpen : FileText,
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    }

    // 3. Test Platform routes
    if (cleanPath.startsWith('/test') || cleanPath.startsWith('/tests')) {
      if (cleanPath === '/test-platform') {
        return {
          category: 'Phòng học • Thư viện đề thi',
          title: 'Nền tảng thi thử IELTS (Test Platform)',
          description: 'Thư viện đề thi chuẩn format Cambridge với hệ thống tính giờ và chấm điểm tự động.',
          icon: GraduationCap,
          badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
        };
      }
      const isExam = cleanPath.includes('/exam');
      const testId = cleanPath.replace('/tests/', '').replace(/\/exam$/, '');
      const examItem = EXAM_COLLECTIONS.find(e => e.id === testId);
      return {
        category: isExam ? 'Test Platform • Phòng thi thực chiến' : 'Test Platform • Chi tiết đề thi',
        title: examItem?.title ? (isExam ? `Phòng thi: ${examItem.title}` : examItem.title) : 'Đề thi IELTS',
        description: isExam 
          ? 'Phòng thi trực tuyến có bấm giờ, âm thanh chuẩn và hệ thống lưu bài tự động.'
          : 'Xem thông tin chi tiết, cấu trúc đề thi và chuẩn bị bắt đầu làm bài.',
        icon: GraduationCap,
        badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    }

    // Fallback default
    return {
      category: 'Phòng học Dream Education',
      title: 'Nội dung yêu cầu mật khẩu',
      description: 'Vui lòng nhập mật khẩu được Dream Education cấp để truy cập nội dung.',
      icon: Lock,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    };
  };

  const meta = getTargetMeta();
  const IconComponent = meta.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Vui lòng nhập mật khẩu truy cập.');
      triggerShake();
      return;
    }

    const result = login(password, rememberMe);
    if (!result.success) {
      setError(result.error);
      triggerShake();
    } else {
      setError(null);
      setIsSuccess(true);
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
      if (inputRef.current) inputRef.current.focus();
    }, 450);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#e2e8f0] flex flex-col justify-center items-center py-12 px-4 sm:px-6 relative overflow-hidden">
      
      {/* Decorative ambient background blur shapes */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Lock Card */}
      <div 
        className={`w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200/80 p-6 sm:p-10 relative z-10 transition-transform duration-300 ${
          isShaking ? 'animate-shake' : ''
        }`}
      >
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-[#163e82] to-[#fdcc15] rounded-t-3xl" />

        {/* Brand & Lock Badge */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
            <img 
              src={logo} 
              alt="Dream Education Logo" 
              className="h-10 w-auto rounded object-contain group-hover:scale-105 transition-transform" 
            />
            <span className="font-extrabold text-lg text-primary tracking-tight">Dream Education</span>
          </Link>

          {/* Shield / Lock Avatar */}
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-[#163e82] text-white flex items-center justify-center shadow-md ring-4 ring-primary/10">
              <Lock size={28} className="text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-xs border-2 border-white">
              <KeyRound size={13} />
            </div>
          </div>

          {/* Target Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${meta.badgeColor}`}>
            <IconComponent size={13} />
            <span>{meta.category}</span>
          </span>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
            Yêu cầu mật khẩu truy cập
          </h2>

          {/* Target Content Title Box */}
          <div className="w-full bg-gray-50 border border-gray-200/90 rounded-2xl p-3 mb-3 text-left">
            <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-0.5">
              Nội dung bạn đang truy cập:
            </div>
            <div className="text-sm font-extrabold text-primary line-clamp-2">
              {meta.title}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
            Khu vực học tập & làm bài dành riêng cho học viên. Vui lòng nhập mật khẩu để mở khóa và xem nội dung.
          </p>
        </div>

        {/* Error Alert Message */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-800 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle size={18} className="text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-left">
              <span className="font-bold">{error}</span>
              <p className="text-[12px] text-red-700 mt-0.5">
                Nhập sai mật khẩu sẽ không thể vào các nội dung bài học. Vui lòng kiểm tra lại.
              </p>
            </div>
          </div>
        )}

        {/* Success Alert Message */}
        {isSuccess && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl flex items-center gap-2.5 text-xs sm:text-sm">
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
            <span className="font-bold">Mật khẩu chính xác! Đang mở khóa nội dung...</span>
          </div>
        )}

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label 
              htmlFor="study-access-password" 
              className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5"
            >
              Mật khẩu truy cập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <KeyRound size={17} />
              </div>
              <input
                ref={inputRef}
                id="study-access-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="Nhập mật khẩu..."
                className={`w-full pl-10 pr-12 py-3 bg-gray-50 text-gray-900 border rounded-2xl text-sm font-medium focus:bg-white focus:outline-none transition-all ${
                  error 
                    ? 'border-red-400 ring-2 ring-red-100 bg-red-50/20' 
                    : 'border-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/15'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember on this device checkbox */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 hover:text-gray-900">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary focus:ring-2"
              />
              <span>Ghi nhớ quyền truy cập trên thiết bị này</span>
            </label>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-primary to-[#163e82] hover:opacity-95 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer mt-2"
          >
            <span>Mở khóa nội dung</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Return Home Link */}
        <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-4 text-xs font-semibold text-gray-500">
          <Link 
            to="/" 
            className="flex items-center gap-1.5 hover:text-primary transition-colors py-1"
          >
            <Home size={14} />
            <span>Quay lại Trang chủ</span>
          </Link>
          <span>•</span>
          <Link 
            to="/contact" 
            className="hover:text-primary transition-colors py-1"
          >
            Liên hệ nhận mật khẩu
          </Link>
        </div>

        {/* Bottom Security Assurance */}
        <div className="mt-4 pt-3 flex items-center justify-center gap-1 text-[11px] text-gray-400 font-medium">
          <ShieldCheck size={13} className="text-emerald-500" />
          <span>Hệ sinh thái học tập trực tuyến Dream Education</span>
        </div>
      </div>
    </div>
  );
}
