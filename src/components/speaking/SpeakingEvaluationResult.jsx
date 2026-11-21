import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Volume2, 
  BookOpen, 
  MessageSquare, 
  ChevronDown, 
  ArrowRight, 
  FileCheck, 
  FolderCheck,
  Zap,
  TrendingUp,
  HelpCircle
} from 'lucide-react';

export default function SpeakingEvaluationResult({
  evaluation,
  azureMetrics = null,
  studentInfo = {},
  sessionName = '',
  testTitle = '',
  onRetry = null
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'gra' | 'pr' | 'lr' | 'fc'

  if (!evaluation) return null;

  const crit = evaluation.criteria || {};
  const overallBand = evaluation.overallBand || 0;

  const getBandBadgeColor = (band) => {
    const num = Number(band);
    if (num >= 7.5) return 'bg-emerald-600 text-white';
    if (num >= 6.5) return 'bg-blue-600 text-white';
    if (num >= 5.5) return 'bg-amber-600 text-white';
    return 'bg-purple-600 text-white';
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden animate-pop-in text-left">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1e3a8a] via-[#2c4482] to-[#1e3061] text-white p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white/15 rounded-full backdrop-blur-xs flex items-center gap-1.5">
                <Sparkles size={13} className="text-amber-300" />
                <span>Báo Cáo Đánh Giá IELTS Speaking AI</span>
              </span>
              {studentInfo.name && (
                <span className="text-[11px] font-bold px-3 py-1 bg-blue-500/30 rounded-full border border-blue-300/30">
                  Học sinh: {studentInfo.name} {studentInfo.className ? `(${studentInfo.className})` : ''}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {testTitle || sessionName || 'IELTS Speaking Evaluation'}
            </h2>
            <p className="text-blue-100 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Điểm số được phân tích sát theo chuẩn 4 tiêu chí chấm thi IELTS (IDP & British Council) kết hợp dữ liệu đo sóng âm từ Azure Speech.
            </p>
          </div>

          {/* Overall Band Pill */}
          <div className="flex sm:flex-col items-center justify-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 self-stretch sm:self-auto min-w-[130px] text-center">
            <span className="text-[11px] uppercase tracking-wider text-blue-200 font-bold block">
              Overall Band
            </span>
            <div className="text-4xl sm:text-5xl font-black text-amber-300 my-1 drop-shadow-sm">
              {overallBand ? overallBand.toFixed(1) : 'N/A'}
            </div>
            <span className="text-[10px] text-blue-100 font-medium">
              Thang điểm 9.0
            </span>
          </div>
        </div>
      </div>

      {/* 4 IELTS Criteria Cards Grid */}
      <div className="p-6 sm:p-8 border-b border-gray-150 bg-gray-50/60">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
          <Award size={16} className="text-primary" />
          <span>Điểm số theo 4 tiêu chí chấm IELTS chính thức</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* FC */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-extrabold text-gray-800">Fluency & Coherence</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${getBandBadgeColor(crit.fluencyCoherence?.band)}`}>
                  Band {crit.fluencyCoherence?.band || '-'}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {crit.fluencyCoherence?.summaryVi || 'Đang cập nhật...'}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-gray-100">
              Độ trôi chảy & mạch lạc ý
            </span>
          </div>

          {/* LR */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-extrabold text-gray-800">Lexical Resource</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${getBandBadgeColor(crit.lexicalResource?.band)}`}>
                  Band {crit.lexicalResource?.band || '-'}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {crit.lexicalResource?.summaryVi || 'Đang cập nhật...'}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-gray-100">
              Vốn từ & Collocations
            </span>
          </div>

          {/* GRA */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-extrabold text-gray-800">Grammar Range</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${getBandBadgeColor(crit.grammaticalRange?.band)}`}>
                  Band {crit.grammaticalRange?.band || '-'}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {crit.grammaticalRange?.summaryVi || 'Đang cập nhật...'}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-gray-100">
              Độ chính xác ngữ pháp
            </span>
          </div>

          {/* PR */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200/90 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="text-xs font-extrabold text-gray-800">Pronunciation</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${getBandBadgeColor(crit.pronunciation?.band)}`}>
                  Band {crit.pronunciation?.band || '-'}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                {crit.pronunciation?.summaryVi || 'Đang cập nhật...'}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-gray-100">
              Phát âm & Ngữ điệu sóng âm
            </span>
          </div>
        </div>

        {/* Azure Speech Physical Metrics Pill (if present) */}
        {azureMetrics && azureMetrics.hasData && (
          <div className="mt-4 p-4 rounded-2xl bg-white border border-blue-200/80 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                🎙️
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">
                  Chỉ số đo âm học vật lý từ Azure AI Speech
                </p>
                <p className="text-[11px] text-gray-500">
                  Đo trực tiếp độ chuẩn xác từng âm vị IPA, độ ngập ngừng và nhịp điệu giọng nói
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-bold text-gray-700 flex-wrap">
              <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                Accuracy: <strong className="text-blue-700">{azureMetrics.accuracyScore}/100</strong>
              </span>
              <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                Fluency: <strong className="text-emerald-700">{azureMetrics.fluencyScore}/100</strong>
              </span>
              {azureMetrics.prosodyScore != null && (
                <span className="px-2.5 py-1 bg-gray-50 border border-gray-200 rounded-lg">
                  Prosody: <strong className="text-purple-700">{azureMetrics.prosodyScore}/100</strong>
                </span>
              )}
              <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-900 rounded-lg">
                Tổng hợp: <strong>{azureMetrics.pronScore}/100</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Main Details Body */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Section 1: Grammatical Corrections */}
        {crit.grammaticalRange?.errors && crit.grammaticalRange.errors.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-xs font-black">
                ⚠️
              </span>
              <h3 className="text-base font-black text-gray-900">
                Lỗi Ngữ pháp & Cách sửa chuẩn xác ({crit.grammaticalRange.errors.length} lỗi phát hiện)
              </h3>
            </div>

            <div className="space-y-3">
              {crit.grammaticalRange.errors.map((err, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-red-50/50 border border-red-200/80 flex flex-col sm:flex-row items-start justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs line-through text-red-600 bg-red-100/70 px-2.5 py-1 rounded-md font-semibold">
                        "{err.original}"
                      </span>
                      <ArrowRight size={14} className="text-gray-400" />
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                        "{err.corrected}"
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      💡 <strong>Giải thích:</strong> {err.explanationVi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 2: Pronunciation & Mispronounced Words */}
        {crit.pronunciation?.mispronouncedWords && crit.pronunciation.mispronouncedWords.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-black">
                🗣️
              </span>
              <h3 className="text-base font-black text-gray-900">
                Từ phát âm cần chú ý & Phiên âm IPA ({crit.pronunciation.mispronouncedWords.length} từ)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {crit.pronunciation.mispronouncedWords.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-gray-900">
                        {item.word}
                      </span>
                      {item.ipa && (
                        <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          /{item.ipa}/
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {item.issueVi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Lexical Upgrades (Từ vựng nâng Band) */}
        {crit.lexicalResource?.suggestedUpgrades && crit.lexicalResource.suggestedUpgrades.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                ✨
              </span>
              <h3 className="text-base font-black text-gray-900">
                Gợi ý nâng cấp Từ vựng & Collocations Band 7.5+
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {crit.lexicalResource.suggestedUpgrades.map((up, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-gray-500 font-medium">Bạn đã dùng:</span>
                      <span className="text-gray-700 font-semibold bg-gray-100 px-2 py-0.5 rounded">
                        "{up.original}"
                      </span>
                    </div>
                    <div className="text-xs font-extrabold text-emerald-900 bg-emerald-100/70 p-2 rounded-xl mb-1.5">
                      ➔ "{up.better}"
                    </div>
                  </div>
                  {up.meaningVi && (
                    <span className="text-[11px] text-gray-600 italic">
                      ({up.meaningVi})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: Upgraded Sample Answer based on student's ideas */}
        {evaluation.upgradedSampleAnswers && evaluation.upgradedSampleAnswers.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">
                🌟
              </span>
              <h3 className="text-base font-black text-gray-900">
                Bài mẫu nâng cấp Band 7.5 - 8.0 (Dựa trên chính ý tưởng của bạn)
              </h3>
            </div>

            <div className="space-y-4">
              {evaluation.upgradedSampleAnswers.map((sample, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-purple-50/40 border border-purple-200/80 relative"
                >
                  <span className="inline-block text-[11px] font-extrabold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-lg mb-2">
                    {sample.targetBand || 'Band 7.5+ Ideal Response'}
                  </span>
                  <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif italic">
                    "{sample.sampleAnswer}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: Actionable Tips for Student */}
        {evaluation.nextStepTipsVi && evaluation.nextStepTipsVi.length > 0 && (
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
              <TrendingUp size={15} />
              <span>3 Lời khuyên hành động cụ thể để tăng band bài sau</span>
            </h4>
            <ul className="space-y-2 mt-2">
              {evaluation.nextStepTipsVi.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-800 leading-relaxed">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Section 6: Teacher Summary Badge */}
        {evaluation.teacherSummaryVi && (
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1.5">
              <span>👨‍🏫 Tóm tắt đánh giá dành cho Giáo viên:</span>
            </h4>
            <p className="text-xs text-amber-950 leading-relaxed">
              {evaluation.teacherSummaryVi}
            </p>
          </div>
        )}

        {/* Section 7: Google Drive & Google Sheets Notification */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <FolderCheck size={20} className="text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Dữ liệu đã được đồng bộ an toàn:</p>
              <p className="text-[11px] text-emerald-800">
                File ghi âm đã lưu trên Google Drive của trung tâm (Lớp: <strong>{studentInfo.className || 'Tự do'}</strong> / Buổi: <strong>{sessionName || testTitle}</strong>).
                Bảng điểm chi tiết đã tự động chuyển về Google Sheets (tab <code>Speaking</code>) và gửi email giáo viên.
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-2xs whitespace-nowrap"
            >
              Làm lại bài luyện tập
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
