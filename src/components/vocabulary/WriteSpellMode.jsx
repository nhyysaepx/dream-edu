import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Sparkles, 
  ArrowRight,
  Lightbulb,
  Check
} from 'lucide-react';
import { speakWord, triggerCelebration } from '../../utils/speechUtils';

export default function WriteSpellMode({ terms, starredIds, onToggleStar }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [hintCount, setHintCount] = useState(0);
  const [status, setStatus] = useState('answering'); // 'answering' | 'correct' | 'wrong'
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [isFinished, setIsFinished] = useState(false);

  const inputRef = useRef(null);

  const currentTerm = terms[currentIndex];

  useEffect(() => {
    if (currentTerm && !isFinished) {
      speakWord(currentTerm.term);
      setUserInput('');
      setHintCount(0);
      setStatus('answering');
      if (inputRef.current) inputRef.current.focus();
    }
  }, [currentIndex, isFinished, currentTerm]);

  const normalize = (str) => {
    return (str || '')
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleCheck = (e) => {
    if (e) e.preventDefault();
    if (!userInput.trim() || status !== 'answering') return;

    const normUser = normalize(userInput);
    const normTarget = normalize(currentTerm.term);
    const variants = currentTerm.term.split('/').map(v => normalize(v));

    const isMatch = normUser === normTarget || variants.includes(normUser);

    if (isMatch) {
      setStatus('correct');
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      speakWord(currentTerm.term);
    } else {
      setStatus('wrong');
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
      speakWord(currentTerm.term);
    }
  };

  const handleNext = () => {
    if (currentIndex < terms.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      triggerCelebration();
    }
  };

  const handleGiveHint = () => {
    setHintCount(prev => Math.min(prev + 1, currentTerm.term.length));
  };

  const handleDontKnow = () => {
    setStatus('wrong');
    setUserInput(currentTerm.term);
    setScore(s => ({ ...s, wrong: s.wrong + 1 }));
    speakWord(currentTerm.term);
  };

  if (isFinished) {
    return (
      <div className="bg-white rounded-3xl border border-gray-200 shadow-md p-8 sm:p-12 text-center max-w-xl mx-auto my-6 animate-pop-in">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Sparkles size={44} />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
          Hoàn thành bài luyện viết!
        </h2>
        <p className="text-sm text-gray-500 mb-6">Bạn đã luyện chính tả qua toàn bộ danh sách từ.</p>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl mb-8 border border-gray-100">
          <div>
            <span className="text-xs text-gray-500">Đúng ngay</span>
            <p className="text-3xl font-black text-emerald-600">{score.correct}</p>
          </div>
          <div>
            <span className="text-xs text-gray-500">Cần gõ lại</span>
            <p className="text-3xl font-black text-rose-500">{score.wrong}</p>
          </div>
        </div>

        <button
          onClick={() => {
            setCurrentIndex(0);
            setScore({ correct: 0, wrong: 0 });
            setIsFinished(false);
          }}
          className="px-6 py-3 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <RotateCcw size={16} />
          <span>Luyện lại từ đầu</span>
        </button>
      </div>
    );
  }

  if (!currentTerm) return null;

  return (
    <div className="w-full max-w-2xl mx-auto my-6 text-left">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200/90 rounded-2xl px-5 py-3.5 mb-6 shadow-xs">
        <div>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Chính tả & Luyện viết</span>
          <p className="text-sm font-bold text-gray-800">
            Từ {currentIndex + 1} / {terms.length}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Đúng: {score.correct}
          </span>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
            Sai: {score.wrong}
          </span>
        </div>
      </div>

      {/* Main Study Card */}
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => speakWord(currentTerm.term)}
            className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-primary rounded-xl font-semibold text-xs flex items-center gap-2 transition-colors"
          >
            <Volume2 size={16} />
            <span>Phát âm lại từ</span>
          </button>

          <span className="text-xs text-gray-400">Nghe & Gõ tiếng Anh tương ứng</span>
        </div>

        <div className="my-6">
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Nghĩa tiếng Việt:</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{currentTerm.definition}</h2>
        </div>

        {/* Input Form */}
        <form onSubmit={handleCheck} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-2">Gõ từ tiếng Anh bạn nghe được:</label>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              disabled={status !== 'answering'}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Nhập câu trả lời..."
              className={`w-full px-5 py-4 rounded-2xl border text-lg font-bold transition-all focus:outline-none ${
                status === 'answering'
                  ? 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  : status === 'correct'
                  ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900'
                  : 'border-rose-400 bg-rose-50/50 text-rose-900'
              }`}
            />
          </div>

          {/* Hint letters */}
          {hintCount > 0 && status === 'answering' && (
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              <Lightbulb size={14} className="text-amber-500 flex-shrink-0" />
              <span>Gợi ý: {currentTerm.term.slice(0, hintCount)}...</span>
            </div>
          )}

          {/* Answering Action Buttons */}
          {status === 'answering' && (
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleGiveHint}
                  className="text-xs text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  <Lightbulb size={14} />
                  <span>Gợi ý 1 chữ</span>
                </button>
                <button
                  type="button"
                  onClick={handleDontKnow}
                  className="text-xs text-gray-400 hover:text-gray-600 font-medium"
                >
                  Tôi không biết
                </button>
              </div>

              <button
                type="submit"
                disabled={!userInput.trim()}
                className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all disabled:opacity-40"
              >
                Kiểm tra
              </button>
            </div>
          )}
        </form>

        {/* Feedback Area */}
        {status !== 'answering' && (
          <div className="mt-6 pt-6 border-t border-gray-100 animate-pop-in">
            {status === 'correct' ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Check size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-emerald-900">Chính xác!</p>
                    <p className="text-xs text-emerald-700 font-medium">{currentTerm.term}</p>
                  </div>
                </div>

                <button
                  autoFocus
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <span>Từ tiếp theo</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-rose-900">Chưa chính xác!</p>
                    <p className="text-xs text-gray-500 mt-1">Đáp án đúng phải là:</p>
                    <p className="text-base font-extrabold text-primary mt-0.5">{currentTerm.term}</p>
                  </div>
                </div>

                <button
                  autoFocus
                  onClick={handleNext}
                  className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm ml-auto"
                >
                  <span>Đã ghi nhớ, tiếp tục</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
