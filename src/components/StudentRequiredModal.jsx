import React, { useState, useEffect } from 'react';
import { User, GraduationCap, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { getStoredStudent, saveStoredStudent } from '../utils/studentStorage';

// Class code prefixes mapping
export const CLASS_PREFIXES = [
  { code: 'BE-', label: 'Beginner (BE-)', desc: 'Beginner' },
  { code: 'PRE-', label: 'IELTS PRE (PRE-)', desc: 'IELTS PRE' },
  { code: 'INT-', label: 'Intermediate (INT-)', desc: 'IELTS Intermediate' },
  { code: 'ADV-', label: 'Advanced (ADV-)', desc: 'IELTS Advanced' },
  { code: 'OTHER', label: 'Khác (Tự nhập)', desc: 'Lớp khác' }
];

/**
 * Detect matching prefix from a level string
 */
export function detectPrefixFromLevel(levelStr) {
  if (!levelStr) return 'PRE-';
  const l = levelStr.toLowerCase();
  if (l.includes('beginner')) return 'BE-';
  if (l.includes('pre')) return 'PRE-';
  if (l.includes('intermediate') || l.includes('int')) return 'INT-';
  if (l.includes('advanced') || l.includes('adv')) return 'ADV-';
  return 'PRE-';
}

export default function StudentRequiredModal({
  isOpen,
  onConfirm,
  onClose,
  allowClose = false,
  defaultLevel = '',
  title = "Thông tin học sinh",
  subtitle = "Vui lòng xác nhận Họ tên và Mã lớp trước khi làm bài để kết quả được lưu và gửi đến giáo viên."
}) {
  const [name, setName] = useState('');
  const [selectedPrefix, setSelectedPrefix] = useState('PRE-');
  const [classSuffix, setClassSuffix] = useState('');
  const [customClass, setCustomClass] = useState('');
  const [error, setError] = useState('');

  // Lock body scroll while modal is open
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Load existing data or auto-detect from level
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredStudent();
      setName(stored.name || '');

      const currentClass = stored.className || '';
      // Try to parse existing prefix
      const matched = CLASS_PREFIXES.find(p => p.code !== 'OTHER' && currentClass.startsWith(p.code));
      if (matched) {
        setSelectedPrefix(matched.code);
        setClassSuffix(currentClass.slice(matched.code.length));
        setCustomClass('');
      } else if (currentClass) {
        setSelectedPrefix('OTHER');
        setCustomClass(currentClass);
        setClassSuffix('');
      } else {
        // Auto pick prefix from defaultLevel if available
        const autoPrefix = detectPrefixFromLevel(defaultLevel);
        setSelectedPrefix(autoPrefix);
        setClassSuffix('');
        setCustomClass('');
      }
      setError('');
    }
  }, [isOpen, defaultLevel]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();

    let fullClassName = '';
    if (selectedPrefix === 'OTHER') {
      fullClassName = customClass.trim();
    } else {
      const cleanSuffix = classSuffix.trim();
      if (!cleanSuffix) {
        setError(`Vui lòng điền số/mã lớp sau ${selectedPrefix} (ví dụ: ${selectedPrefix}001)`);
        return;
      }
      fullClassName = `${selectedPrefix}${cleanSuffix}`;
    }

    if (!cleanName) {
      setError('Vui lòng nhập Họ và tên của bạn.');
      return;
    }
    if (!fullClassName) {
      setError('Vui lòng hoàn thành mã lớp học.');
      return;
    }

    // Save to storage
    const updated = saveStoredStudent({ name: cleanName, className: fullClassName });
    if (onConfirm) {
      onConfirm(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-gray-100 text-left relative animate-in zoom-in-95 duration-200">
        
        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#2c4482] flex items-center justify-center mb-4 shadow-xs">
          <GraduationCap size={26} />
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
          <span>{title}</span>
          <Sparkles size={16} className="text-amber-500" />
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-5 leading-relaxed">
          {subtitle}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Student Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Họ và tên học sinh <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User size={16} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Ví dụ: Nguyễn Văn An"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2c4482] focus:ring-2 focus:ring-[#2c4482]/20 transition-all bg-gray-50/50 hover:bg-white"
              />
            </div>
          </div>

          {/* Class Code Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
              Mã lớp học <span className="text-rose-500">*</span>
            </label>

            {/* Quick prefix buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-2">
              {CLASS_PREFIXES.filter(p => p.code !== 'OTHER').map((p) => {
                const isActive = selectedPrefix === p.code;
                return (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => {
                      setSelectedPrefix(p.code);
                      if (error) setError('');
                    }}
                    className={`py-1.5 px-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-[#2c4482] text-white border-[#2c4482] shadow-2xs'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                    }`}
                  >
                    {p.code}
                  </button>
                );
              })}
            </div>

            {selectedPrefix !== 'OTHER' ? (
              <div>
                <div className="flex items-center rounded-xl border border-gray-200 overflow-hidden focus-within:border-[#2c4482] focus-within:ring-2 focus-within:ring-[#2c4482]/20 bg-gray-50/50">
                  <span className="px-3 py-2.5 bg-blue-100/70 text-[#2c4482] font-black text-sm border-r border-gray-200 select-none">
                    {selectedPrefix}
                  </span>
                  <input
                    type="text"
                    value={classSuffix}
                    onChange={(e) => {
                      setClassSuffix(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Nhập số lớp (ví dụ: 001, K15...)"
                    className="w-full px-3 py-2.5 text-sm font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 px-1">
                  <span className="text-[11px] text-gray-500">
                    Mã lớp hoàn chỉnh: <strong className="text-[#2c4482]">{selectedPrefix}{classSuffix || '...'}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPrefix('OTHER')}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    Lớp khác?
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  value={customClass}
                  onChange={(e) => {
                    setCustomClass(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Nhập tên/mã lớp khác..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#2c4482] focus:ring-2 focus:ring-[#2c4482]/20 transition-all bg-gray-50/50 hover:bg-white"
                />
                <div className="flex items-center justify-end mt-1 px-1">
                  <button
                    type="button"
                    onClick={() => setSelectedPrefix('PRE-')}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer"
                  >
                    Dùng mã chuẩn (BE-, PRE-, INT-, ADV-)
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            {allowClose && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 cursor-pointer"
              >
                Để sau
              </button>
            )}
            <button
              type="submit"
              className={`${allowClose ? 'w-full sm:w-auto px-6 py-2.5' : 'w-full py-3'} rounded-xl bg-[#2c4482] hover:bg-[#20325c] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95`}
            >
              <CheckCircle2 size={16} />
              <span>Xác nhận & Bắt đầu làm bài</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
          <span>🔒 Mã lớp: BE (Beginner) | PRE | INT | ADV</span>
        </div>
      </div>
    </div>
  );
}
