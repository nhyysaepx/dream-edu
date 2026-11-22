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

function QuestionAudioPlayer({ resp }) {
  const [src, setSrc] = useState(() => {
    if (resp?.url) return resp.url;
    if (resp?.blob) {
      try { return URL.createObjectURL(resp.blob); } catch (e) {}
    }
    if (resp?.base64) {
      return `data:${resp.mimeType || 'audio/webm'};base64,${resp.base64}`;
    }
    return null;
  });

  const handleAudioError = () => {
    // Nếu blob URL bị revoked hoặc lỗi mạng, tự động fallback sang Data URL từ Base64 hoặc cấp lại blob URL mới
    if (resp?.base64 && !src?.startsWith('data:')) {
      setSrc(`data:${resp.mimeType || 'audio/webm'};base64,${resp.base64}`);
    } else if (resp?.blob) {
      try {
        setSrc(URL.createObjectURL(resp.blob));
      } catch (e) {}
    }
  };

  const hasAudio = Boolean(src || resp?.url || resp?.blob || resp?.base64);
  if (!hasAudio) return null;

  return (
    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <Volume2 size={16} className="text-primary shrink-0" />
        <span className="text-xs font-bold text-gray-700">
          Bản ghi âm giọng nói của bạn:
        </span>
      </div>
      <audio
        controls
        src={src || resp?.url}
        onError={handleAudioError}
        preload="metadata"
        className="w-full sm:w-72 h-8"
      >
        Trình duyệt không hỗ trợ audio element.
      </audio>
    </div>
  );
}

export default function SpeakingEvaluationResult({
  evaluation,
  azureMetrics = null,
  responses = [],
  studentInfo = {},
  sessionName = '',
  testTitle = '',
  onRetry = null
}) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'gra' | 'pr' | 'lr' | 'fc'
  const [expandedQuestionIdx, setExpandedQuestionIdx] = useState(null); // Accordion or expanded view for questions

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

        {/* =================================================================== */}
        {/* AZURE AI SPEECH & ACOUSTIC FLUENCY CARD                             */}
        {/* =================================================================== */}
        {((azureMetrics && azureMetrics.hasData) || evaluation.acousticAnalysis) && (
          (() => {
            const az = azureMetrics || {};
            const ac = evaluation.acousticAnalysis || {};
            const wpm = az.wpm || ac.wpm || 0;
            const pause12s = az.pauseCount12s != null ? az.pauseCount12s : (ac.pauseCountLong != null ? ac.pauseCountLong : 0);
            const pause20s = az.pauseCount20s != null ? az.pauseCount20s : (ac.pauseCountSevere != null ? ac.pauseCountSevere : 0);
            const phonation = az.phonationRatio || ac.phonationRatio || 0;
            const mlr = az.mlr || 0;

            const getWpmBadge = (val) => {
              if (val >= 120 && val <= 155) return { text: 'Tốc độ tự nhiên (Chuẩn IELTS 120-150)', color: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
              if (val >= 100 && val < 120) return { text: 'Tốc độ vừa phải (100-119 WPM)', color: 'bg-blue-50 text-blue-800 border-blue-200' };
              if (val > 155 && val <= 175) return { text: 'Tốc độ hơi nhanh', color: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
              if (val > 175) return { text: 'Nói quá nhanh (dễ nuốt âm)', color: 'bg-purple-50 text-purple-800 border-purple-200' };
              return { text: 'Nói chậm, nhiều khoảng khựng (<100 WPM)', color: 'bg-amber-50 text-amber-800 border-amber-200' };
            };

            const wpmBadge = getWpmBadge(wpm);

            return (
              <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 via-indigo-50/30 to-white border border-blue-200 shadow-2xs text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-blue-150">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                      🎙️
                    </span>
                    <div>
                      <h4 className="text-sm font-black text-gray-900 flex items-center gap-2">
                        <span>Chỉ số Âm học Đo sóng âm thực tế (Azure AI Speech)</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                          Acoustics & Fluency
                        </span>
                      </h4>
                      <p className="text-[11px] text-gray-600">
                        Phân tích vật lý dòng âm thanh: tần số âm vị IPA, nhịp điệu (Prosody), tốc độ nói và khoảng ngập ngừng
                      </p>
                    </div>
                  </div>

                  {wpm > 0 && (
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className={`text-[11px] font-bold px-3 py-1 rounded-lg border ${wpmBadge.color}`}>
                        ⏱ {wpm} WPM • {wpmBadge.text}
                      </span>
                    </div>
                  )}
                </div>

                {/* 4 Azure Physical Metric Bars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white/95 rounded-xl border border-gray-200/80 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Độ chính xác âm (IPA)</span>
                    <div className="text-xl font-black text-blue-700 my-0.5">
                      {az.accuracyScore || 0}<span className="text-xs text-gray-400 font-normal">/100</span>
                    </div>
                    <div className="w-full bg-gray-150 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-full rounded-full transition-all" style={{ width: `${Math.min(100, az.accuracyScore || 0)}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/95 rounded-xl border border-gray-200/80 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Độ trôi chảy (Fluency)</span>
                    <div className="text-xl font-black text-emerald-700 my-0.5">
                      {az.fluencyScore || 0}<span className="text-xs text-gray-400 font-normal">/100</span>
                    </div>
                    <div className="w-full bg-gray-150 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-600 h-full rounded-full transition-all" style={{ width: `${Math.min(100, az.fluencyScore || 0)}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/95 rounded-xl border border-gray-200/80 shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Ngữ điệu & Trọng âm</span>
                    <div className="text-xl font-black text-purple-700 my-0.5">
                      {az.prosodyScore || az.pronScore || 0}<span className="text-xs text-gray-400 font-normal">/100</span>
                    </div>
                    <div className="w-full bg-gray-150 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-purple-600 h-full rounded-full transition-all" style={{ width: `${Math.min(100, az.prosodyScore || az.pronScore || 0)}%` }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/95 rounded-xl border border-blue-200 shadow-2xs bg-blue-50/30">
                    <span className="text-[10px] uppercase font-bold text-blue-900 block">Phát âm tổng hợp Azure</span>
                    <div className="text-xl font-black text-blue-900 my-0.5">
                      {az.pronScore || 0}<span className="text-xs text-gray-400 font-normal">/100</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-800 h-full rounded-full transition-all" style={{ width: `${Math.min(100, az.pronScore || 0)}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Granular Temporal Analytics (Pauses, Phonation, MLR, Prosody flags) */}
                <div className="p-3.5 bg-white/90 rounded-xl border border-gray-200 text-xs text-gray-700 flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <span>
                      🛑 Ngập ngừng: <strong>{pause12s}</strong> lần (&gt;1.2s){pause20s > 0 && <span className="text-amber-700">, <strong>{pause20s}</strong> lần (&gt;2.0s)</span>}
                    </span>
                    {phonation > 0 && (
                      <span>
                        🌊 Phát âm liên tục: <strong>{phonation}%</strong> thời lượng
                      </span>
                    )}
                    {mlr > 0 && (
                      <span>
                        📏 Độ dài chuỗi nói: <strong>{mlr}</strong> từ/nhịp
                      </span>
                    )}
                  </div>

                  {/* Prosody flags summary */}
                  <div className="text-[11px] font-medium text-gray-600">
                    {az.unexpectedBreaks > 0 || az.missingBreaks > 0 || az.monotoneCount > 0 ? (
                      <span className="text-amber-800 flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-amber-600 shrink-0" />
                        <span>
                          Phát hiện: {az.unexpectedBreaks > 0 ? `${az.unexpectedBreaks} lần ngắt cụm chưa tự nhiên; ` : ''}
                          {az.missingBreaks > 0 ? `${az.missingBreaks} lần quên ngắt câu; ` : ''}
                          {az.monotoneCount > 0 ? `${az.monotoneCount} câu thiếu biến thiên cao độ` : ''}
                        </span>
                      </span>
                    ) : (
                      <span className="text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                        <span>Nhịp điệu và ngắt nghỉ tự nhiên, không phát hiện lỗi ngắt câu</span>
                      </span>
                    )}
                  </div>
                </div>

                {ac.speechPacingEvaluationVi && (
                  <p className="text-xs text-blue-900 bg-blue-100/50 p-2.5 rounded-lg leading-relaxed">
                    💡 <strong>Đánh giá nhịp độ:</strong> {ac.speechPacingEvaluationVi} {ac.prosodyHighlightsVi ? `• ${ac.prosodyHighlightsVi}` : ''}
                  </p>
                )}
              </div>
            );
          })()
        )}
      </div>

      {/* Main Details Body */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* =================================================================== */}
        {/* SECTION A: ĐÁNH GIÁ TỔNG QUAN THEO TỪNG PHẦN THI (PART BREAKDOWN)    */}
        {/* =================================================================== */}
        {evaluation.partBreakdown && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center text-xs font-black">
                📑
              </span>
              <h3 className="text-base font-black text-gray-900">
                Đánh giá theo từng phần thi (Part 1, 2, 3)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Part 1 */}
              {evaluation.partBreakdown.part1 && (
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-extrabold text-indigo-900">Part 1: Interview</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-indigo-600 text-white">
                        Band {evaluation.partBreakdown.part1.band || '-'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {evaluation.partBreakdown.part1.commentVi}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-indigo-100">
                    Phản xạ & Giới thiệu bản thân
                  </span>
                </div>
              )}

              {/* Part 2 */}
              {evaluation.partBreakdown.part2 && (
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-extrabold text-purple-900">Part 2: Cue Card</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-purple-600 text-white">
                        Band {evaluation.partBreakdown.part2.band || '-'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {evaluation.partBreakdown.part2.commentVi}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-purple-100">
                    Độc thoại 2 phút & Phát triển ý
                  </span>
                </div>
              )}

              {/* Part 3 */}
              {evaluation.partBreakdown.part3 && (
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-2">
                      <span className="text-xs font-extrabold text-blue-900">Part 3: Discussion</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-blue-600 text-white">
                        Band {evaluation.partBreakdown.part3.band || '-'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      {evaluation.partBreakdown.part3.commentVi}
                    </p>
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium mt-3 block pt-2 border-t border-blue-100">
                    Lập luận chiều sâu & Phản biện
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SECTION B: PHÂN TÍCH CHI TIẾT TỪNG CÂU HỎI (QUESTION-BY-QUESTION)    */}
        {/* =================================================================== */}
        {((evaluation.questionBreakdown && evaluation.questionBreakdown.length > 0) || (responses && responses.length > 0)) && (
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-black">
                  🎙️
                </span>
                <h3 className="text-base font-black text-gray-900">
                  Phân tích & Nghe lại chi tiết từng câu hỏi ({evaluation.questionBreakdown?.length || responses.length} câu)
                </h3>
              </div>
              <span className="text-xs text-gray-500 font-medium hidden sm:inline">
                Nghe lại file ghi âm và đối chiếu bài mẫu nâng cấp từng câu
              </span>
            </div>

            <div className="space-y-4">
              {(evaluation.questionBreakdown || responses).map((qItem, idx) => {
                const resp = responses[idx] || {};
                const qPrompt = qItem.question || resp.question || `Câu hỏi ${idx + 1}`;
                const qPart = qItem.part || resp.part || 'Speaking';
                const transcript = qItem.cleanedTranscript || resp.transcript || evaluation.transcripts?.[idx]?.cleanedTranscript || '';
                const upgradedAns = qItem.upgradedAnswer || evaluation.upgradedSampleAnswers?.[idx]?.sampleAnswer || '';
                const grammarErrs = qItem.grammarErrors || [];
                const pronIssues = qItem.mispronouncedWords || [];
                const feedback = qItem.feedbackVi || '';
                const estBand = qItem.estimatedBand;

                return (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white border border-gray-200/90 shadow-2xs hover:border-primary/40 transition-all space-y-4 text-left"
                  >
                    {/* Header: Question Number, Part, Estimated Band */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-primary text-white font-black text-xs">
                          Câu {idx + 1}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[11px] border border-blue-200">
                          {qPart}
                        </span>
                        {resp.durationSeconds && (
                          <span className="text-[11px] text-gray-400 font-medium">
                            ⏱ {resp.durationSeconds} giây
                          </span>
                        )}
                      </div>

                      {estBand && (
                        <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg self-start sm:self-auto ${getBandBadgeColor(estBand)}`}>
                          Ước lượng: Band {Number(estBand).toFixed(1)}
                        </span>
                      )}
                    </div>

                    {/* Question Prompt */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-0.5">
                        Câu hỏi:
                      </p>
                      <h4 className="text-sm sm:text-base font-black text-gray-900 leading-snug">
                        "{qPrompt}"
                      </h4>
                    </div>

                    {/* Audio Player for this specific question (resilient with blob and base64 fallbacks) */}
                    <QuestionAudioPlayer resp={resp} />

                    {/* Cleaned Transcript */}
                    {transcript && (
                      <div className="p-3.5 bg-blue-50/40 border border-blue-150 rounded-xl">
                        <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider block mb-1">
                          📝 Bản gỡ băng (Transcript):
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif">
                          "{transcript}"
                        </p>
                      </div>
                    )}

                    {/* Feedback */}
                    {feedback && (
                      <div className="text-xs text-gray-700 leading-relaxed">
                        <strong className="text-gray-900">Nhận xét:</strong> {feedback}
                      </div>
                    )}

                    {/* Grammar errors specific to this question */}
                    {grammarErrs.length > 0 && (
                      <div className="p-3 bg-red-50/50 border border-red-200/70 rounded-xl space-y-1.5 text-xs">
                        <span className="font-bold text-red-700 block">
                          ⚠️ Lỗi ngữ pháp trong câu này:
                        </span>
                        {grammarErrs.map((g, gIdx) => (
                          <div key={gIdx} className="space-y-0.5">
                            <span className="line-through text-red-600">"{g.original}"</span>
                            {' ➔ '}
                            <span className="font-bold text-emerald-800">"{g.corrected}"</span>
                            {g.explanationVi && <span className="text-gray-600 italic"> ({g.explanationVi})</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Pronunciation issues specific to this question */}
                    {pronIssues.length > 0 && (
                      <div className="p-3 bg-amber-50/50 border border-amber-200/70 rounded-xl space-y-1.5 text-xs">
                        <span className="font-bold text-amber-800 block">
                          🗣️ Lỗi phát âm âm vị (IPA) cần sửa:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {pronIssues.map((p, pIdx) => (
                            <span key={pIdx} className="px-2 py-1 bg-white border border-amber-200 rounded-md text-gray-800">
                              <strong>{p.word}</strong> {p.ipa && <code className="text-blue-700 font-mono">/{p.ipa}/</code>}: {p.issueVi}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Upgraded Band 7.5-8.0 answer for this question */}
                    {upgradedAns && (
                      <div className="p-4 bg-purple-50/50 border border-purple-200 rounded-xl space-y-1">
                        <span className="text-[11px] font-extrabold text-purple-800 bg-purple-100 px-2 py-0.5 rounded uppercase tracking-wider inline-block mb-1">
                          ✨ Bài mẫu nâng cấp Band 7.5 - 8.0 (Giữ đúng ý bạn)
                        </span>
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-serif italic">
                          "{upgradedAns}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* SECTION: ĐỐI CHIẾU CHUẨN IELTS SPEAKING BAND DESCRIPTORS (IDP / BC)  */}
        {/* =================================================================== */}
        {(crit.fluencyCoherence?.bandDescriptorJustificationVi || crit.pronunciation?.bandDescriptorJustificationVi || crit.lexicalResource?.bandDescriptorJustificationVi || crit.grammaticalRange?.bandDescriptorJustificationVi) && (
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/60 via-white to-blue-50/40 border border-amber-200/90 shadow-2xs space-y-4 text-left">
            <div className="flex items-center gap-2.5 pb-2 border-b border-amber-200/70">
              <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                📜
              </span>
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-2 flex-wrap">
                  <span>Đối Chiếu Trực Tiếp Chuẩn IELTS Speaking Band Descriptors (IDP & British Council)</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                    Official Rubric
                  </span>
                </h3>
                <p className="text-xs text-gray-600 mt-0.5">
                  Căn cứ giám khảo chính thức lý giải vì sao bài nói rơi vào Band điểm này và điều kiện để nâng lên nấc điểm tiếp theo
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FC Justification */}
              {crit.fluencyCoherence?.bandDescriptorJustificationVi && (
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Fluency & Coherence</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getBandBadgeColor(crit.fluencyCoherence?.band)}`}>
                        Band {crit.fluencyCoherence?.band}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Căn cứ Band Descriptor:</strong> {crit.fluencyCoherence.bandDescriptorJustificationVi}
                    </p>
                  </div>
                  {crit.fluencyCoherence.nextBandTargetVi && (
                    <div className="pt-2 border-t border-gray-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl">
                      🎯 <strong>Mục tiêu lên Band kế tiếp:</strong> {crit.fluencyCoherence.nextBandTargetVi}
                    </div>
                  )}
                </div>
              )}

              {/* LR Justification */}
              {crit.lexicalResource?.bandDescriptorJustificationVi && (
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Lexical Resource</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getBandBadgeColor(crit.lexicalResource?.band)}`}>
                        Band {crit.lexicalResource?.band}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Căn cứ Band Descriptor:</strong> {crit.lexicalResource.bandDescriptorJustificationVi}
                    </p>
                  </div>
                  {crit.lexicalResource.nextBandTargetVi && (
                    <div className="pt-2 border-t border-gray-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl">
                      🎯 <strong>Mục tiêu lên Band kế tiếp:</strong> {crit.lexicalResource.nextBandTargetVi}
                    </div>
                  )}
                </div>
              )}

              {/* GRA Justification */}
              {crit.grammaticalRange?.bandDescriptorJustificationVi && (
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Grammar Range & Accuracy</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getBandBadgeColor(crit.grammaticalRange?.band)}`}>
                        Band {crit.grammaticalRange?.band}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Căn cứ Band Descriptor:</strong> {crit.grammaticalRange.bandDescriptorJustificationVi}
                    </p>
                  </div>
                  {crit.grammaticalRange.nextBandTargetVi && (
                    <div className="pt-2 border-t border-gray-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl">
                      🎯 <strong>Mục tiêu lên Band kế tiếp:</strong> {crit.grammaticalRange.nextBandTargetVi}
                    </div>
                  )}
                </div>
              )}

              {/* Pronunciation Justification */}
              {crit.pronunciation?.bandDescriptorJustificationVi && (
                <div className="p-4 rounded-2xl bg-white border border-gray-200/90 shadow-2xs space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-gray-900">Pronunciation</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${getBandBadgeColor(crit.pronunciation?.band)}`}>
                        Band {crit.pronunciation?.band}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">
                      <strong className="text-gray-900">Căn cứ Band Descriptor:</strong> {crit.pronunciation.bandDescriptorJustificationVi}
                    </p>
                  </div>
                  {crit.pronunciation.nextBandTargetVi && (
                    <div className="pt-2 border-t border-gray-100 text-[11px] text-emerald-800 bg-emerald-50/70 p-2 rounded-xl">
                      🎯 <strong>Mục tiêu lên Band kế tiếp:</strong> {crit.pronunciation.nextBandTargetVi}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-extrabold text-gray-900">
                        {item.word}
                      </span>
                      {item.ipa && (
                        <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                          /{item.ipa}/
                        </span>
                      )}
                      {item.errorType && item.errorType !== 'None' && item.errorType !== 'Mispronunciation' && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-200/60 text-amber-900 rounded">
                          {item.errorType}
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
