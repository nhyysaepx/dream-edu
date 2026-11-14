import React from 'react';
import { User, Edit3 } from 'lucide-react';

export default function StudentBadge({ student, onEdit, className = "" }) {
  const hasInfo = student && student.name && student.className;

  return (
    <button
      type="button"
      onClick={onEdit}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
        hasInfo
          ? 'bg-blue-50/80 hover:bg-blue-100 text-[#2c4482] border-blue-200 shadow-2xs'
          : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 animate-pulse'
      } ${className}`}
      title={hasInfo ? "Bấm để đổi thông tin học sinh" : "Chưa có thông tin học sinh, bấm để nhập"}
    >
      <User size={14} className={hasInfo ? "text-[#2c4482]" : "text-amber-600"} />
      <span className="truncate max-w-[140px] sm:max-w-[200px]">
        {hasInfo ? `${student.name} (${student.className})` : "Nhập Tên / Lớp"}
      </span>
      <Edit3 size={12} className="opacity-60 ml-0.5" />
    </button>
  );
}
