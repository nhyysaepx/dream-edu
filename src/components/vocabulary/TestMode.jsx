import React, { useState, useMemo, useEffect } from 'react';
import { 
  FileText, 
  Settings2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  ArrowRight,
  Volume2,
  Check,
  X,
  HelpCircle
} from 'lucide-react';
import { speakWord, triggerCelebration } from '../../utils/speechUtils';

export default function TestMode({ terms, starredIds }) {
  // Test stages: 'config' | 'taking' | 'submitted'
  const [testStage, setTestStage] = useState('config');

  // Config options
  const [questionCount, setQuestionCount] = useState(20);
  const [enableMultipleChoice, setEnableMultipleChoice] = useState(true);
  const [enableTrueFalse, setEnableTrueFalse] = useState(true);
  const [enableWritten, setEnableWritten] = useState(true);
  const [onlyStarred, setOnlyStarred] = useState(false);
  const [answerLanguage, setAnswerLanguage] = useState('en'); // 'en' | 'vi' | 'both'

  // Generated test questions & user answers
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [scoreReport, setScoreReport] = useState(null);

  const availableTerms = useMemo(() => {
    if (onlyStarred) {
      const starred = terms.filter(t => starredIds.includes(t.id));
      return starred.length > 0 ? starred : terms;
    }
    return terms;
  }, [terms, onlyStarred, starredIds]);

  // Adjust default questionCount if total terms is smaller
  useEffect(() => {
    if (questionCount > availableTerms.length) {
      setQuestionCount(Math.min(20, availableTerms.length));
    }
  }, [availableTerms.length, questionCount]);

  // Helper to normalize strings for comparison
  const normalize = (str) => {
    return (str || '')
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  // Generate test questions
  const handleGenerateTest = () => {
    const activeTypes = [];
    if (enableMultipleChoice) activeTypes.push('mc');
    if (enableTrueFalse) activeTypes.push('tf');
    if (enableWritten) activeTypes.push('written');

    // Fallback if none checked
    if (activeTypes.length === 0) activeTypes.push('mc');

    const shuffledTerms = [...availableTerms].sort(() => 0.5 - Math.random());
    const count = Math.min(questionCount, shuffledTerms.length);
    const chosenTerms = shuffledTerms.slice(0, count);

    const generated = chosenTerms.map((termItem, idx) => {
      // Pick question type
      const type = activeTypes[idx % activeTypes.length];
      
      // Determine direction: should user provide EN or VI
      let askInVI = answerLanguage === 'en'; // prompt VI, answer EN
      if (answerLanguage === 'vi') askInVI = false;
      if (answerLanguage === 'both') askInVI = idx % 2 === 0;

      if (type === 'tf') {
        // 50% true, 50% false
        const isActuallyTrue = Math.random() > 0.5;
        let displayedDef = termItem.definition;
        if (!isActuallyTrue) {
          const fakeTerm = availableTerms.find(t => t.id !== termItem.id) || termItem;
          displayedDef = fakeTerm.definition;
        }

        return {
          id: `q-${idx}`,
          type: 'tf',
          termId: termItem.id,
          term: termItem.term,
          definition: displayedDef,
          actualDefinition: termItem.definition,
          isActuallyTrue: isActuallyTrue,
          promptText: termItem.term,
          matchText: displayedDef
        };
      }

      if (type === 'written') {
        return {
          id: `q-${idx}`,
          type: 'written',
          termId: termItem.id,
          promptText: askInVI ? termItem.definition : termItem.term,
          correctAnswer: askInVI ? termItem.term : termItem.definition,
          targetLang: askInVI ? 'Tiếng Anh' : 'Tiếng Việt',
          termObj: termItem
        };
      }

      // Default: Multiple Choice
      const correctAnswer = askInVI ? termItem.term : termItem.definition;
      const distractors = availableTerms
        .filter(t => t.id !== termItem.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(t => (askInVI ? t.term : t.definition));

      const options = [correctAnswer, ...distractors].sort(() => 0.5 - Math.random());

      return {
        id: `q-${idx}`,
        type: 'mc',
        termId: termItem.id,
        promptText: askInVI ? termItem.definition : termItem.term,
        correctAnswer: correctAnswer,
        options: options,
        targetLang: askInVI ? 'Tiếng Anh' : 'Tiếng Việt',
        termObj: termItem
      };
    });

    setQuestions(generated);
    setUserAnswers({});
    setScoreReport(null);
    setTestStage('taking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit test and grade
  const handleSubmitTest = () => {
    let correctCount = 0;
    const details = questions.map((q) => {
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === 'tf') {
        isCorrect = userAns === q.isActuallyTrue;
      } else if (q.type === 'mc') {
        isCorrect = userAns === q.correctAnswer;
      } else if (q.type === 'written') {
        const normUser = normalize(userAns);
        const normCorrect = normalize(q.correctAnswer);
        const variants = q.correctAnswer.split('/').map(v => normalize(v));
        isCorrect = normUser === normCorrect || variants.includes(normUser);
      }

      if (isCorrect) correctCount++;

      return {
        ...q,
        userAns: userAns,
        isCorrect: isCorrect
      };
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setScoreReport({
      total: questions.length,
      correct: correctCount,
      percent: percent,
      details: details
    });

    setTestStage('submitted');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (percent >= 80) {
      triggerCelebration();
    }
  };

  // CONFIG SCREEN
  if (testStage === 'config') {
    return (
      <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-6 sm:p-10 max-w-2xl mx-auto my-6 text-left animate-pop-in">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <FileText size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">Thiết lập bài kiểm tra</h2>
            <p className="text-xs text-gray-500">Tùy biến bài test thông minh cho lớp học</p>
          </div>
        </div>

        <div className="space-y-6 pt-4 border-t border-gray-100">
          {/* Question Count */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Số lượng câu hỏi: <span className="text-primary font-black text-base">{questionCount}</span> / {availableTerms.length} từ
            </label>
            <div className="flex items-center gap-2">
              {[10, 20, 30, 50, availableTerms.length].map((num) => {
                if (num > availableTerms.length && num !== availableTerms.length) return null;
                const label = num === availableTerms.length ? `Tất cả (${num})` : `${num} câu`;
                return (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      questionCount === num
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Types */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Dạng câu hỏi kiểm tra
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableMultipleChoice}
                  onChange={(e) => setEnableMultipleChoice(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-xs font-semibold text-gray-800">Trắc nghiệm</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableTrueFalse}
                  onChange={(e) => setEnableTrueFalse(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-xs font-semibold text-gray-800">Đúng / Sai</span>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableWritten}
                  onChange={(e) => setEnableWritten(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-xs font-semibold text-gray-800">Tự luận (Điền từ)</span>
              </label>
            </div>
          </div>

          {/* Direction */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
              Ngôn ngữ trả lời
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setAnswerLanguage('en')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  answerLanguage === 'en'
                    ? 'bg-blue-50 border-primary text-primary ring-1 ring-primary'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Trả lời bằng Tiếng Anh
              </button>
              <button
                type="button"
                onClick={() => setAnswerLanguage('vi')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  answerLanguage === 'vi'
                    ? 'bg-blue-50 border-primary text-primary ring-1 ring-primary'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Trả lời bằng Tiếng Việt
              </button>
              <button
                type="button"
                onClick={() => setAnswerLanguage('both')}
                className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                  answerLanguage === 'both'
                    ? 'bg-blue-50 border-primary text-primary ring-1 ring-primary'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Hỗn hợp cả hai
              </button>
            </div>
          </div>

          {/* Starred filter */}
          {starredIds.length > 0 && (
            <label className="flex items-center gap-3 p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyStarred}
                onChange={(e) => setOnlyStarred(e.target.checked)}
                className="rounded text-amber-500 focus:ring-amber-500 w-4 h-4"
              />
              <span className="text-xs font-bold text-amber-900">
                Chỉ tạo bài kiểm tra từ những từ đã gắn sao ({starredIds.length} từ)
              </span>
            </label>
          )}

          {/* Start Test Button */}
          <button
            onClick={handleGenerateTest}
            className="w-full py-4 bg-primary hover:bg-primary-container text-white font-extrabold text-base rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <span>Tạo bài kiểm tra mới</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // SUBMITTED / SCORE REPORT SCREEN
  if (testStage === 'submitted' && scoreReport) {
    const isPass = scoreReport.percent >= 60;
    return (
      <div className="w-full max-w-3xl mx-auto my-6 text-left animate-pop-in">
        {/* Score Banner */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-md p-6 sm:p-10 mb-8 text-center">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 ${
            isPass ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
          }`}>
            <Award size={44} />
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-1">
            {scoreReport.percent >= 90 ? 'Xuất sắc tuyệt đối!' : scoreReport.percent >= 70 ? 'Kết quả rất tốt!' : 'Cần ôn tập thêm'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">Kết quả chi tiết bài kiểm tra của bạn</p>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <span className="text-xs text-gray-500 font-medium">Điểm số</span>
              <p className={`text-3xl font-black ${isPass ? 'text-emerald-600' : 'text-rose-600'}`}>
                {scoreReport.percent}%
              </p>
            </div>
            <div className="border-x border-gray-200">
              <span className="text-xs text-gray-500 font-medium">Đúng</span>
              <p className="text-3xl font-black text-emerald-600">{scoreReport.correct}</p>
            </div>
            <div>
              <span className="text-xs text-gray-500 font-medium">Sai</span>
              <p className="text-3xl font-black text-rose-500">{scoreReport.total - scoreReport.correct}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setTestStage('config')}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              <span>Làm bài kiểm tra mới</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review */}
        <h3 className="text-lg font-black text-gray-900 mb-4 px-2">Chi tiết từng câu hỏi:</h3>
        <div className="space-y-4">
          {scoreReport.details.map((item, idx) => (
            <div 
              key={item.id}
              className={`p-5 rounded-2xl border bg-white ${
                item.isCorrect ? 'border-emerald-200/90' : 'border-rose-200/90'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                    item.isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {idx + 1}
                  </span>
                  <span className="text-xs font-semibold text-gray-500 uppercase">
                    {item.type === 'tf' ? 'Đúng / Sai' : item.type === 'mc' ? 'Trắc nghiệm' : 'Điền từ'}
                  </span>
                </div>

                {item.isCorrect ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check size={12} /> Đúng
                  </span>
                ) : (
                  <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <X size={12} /> Chưa đúng
                  </span>
                )}
              </div>

              {/* Question content */}
              <div className="my-2">
                <p className="text-base font-bold text-gray-900">{item.promptText}</p>
                {item.type === 'tf' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Ghép với: <span className="font-semibold text-primary">{item.matchText}</span>
                  </p>
                )}
              </div>

              {/* Answers breakdown */}
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs space-y-1">
                <p className="text-gray-500">
                  Câu trả lời của bạn:{' '}
                  <span className={`font-semibold ${item.isCorrect ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {item.type === 'tf' 
                      ? (item.userAns === true ? 'ĐÚNG' : item.userAns === false ? 'SAI' : 'Chưa trả lời') 
                      : (item.userAns || 'Chưa trả lời')}
                  </span>
                </p>
                {!item.isCorrect && (
                  <p className="text-gray-700">
                    Đáp án đúng:{' '}
                    <span className="font-bold text-emerald-700">
                      {item.type === 'tf' 
                        ? (item.isActuallyTrue ? 'ĐÚNG' : `SAI (Định nghĩa đúng là: ${item.actualDefinition})`)
                        : item.correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ACTIVE TEST TAKING SCREEN
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="w-full max-w-3xl mx-auto my-6 text-left">
      {/* Sticky Top Status */}
      <div className="sticky top-20 z-20 bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-4 mb-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 font-medium">Tiến độ làm bài</span>
          <p className="text-sm font-bold text-gray-900">
            Đã làm: <span className="text-primary">{answeredCount}</span> / {questions.length} câu
          </p>
        </div>

        <button
          onClick={handleSubmitTest}
          disabled={answeredCount === 0}
          className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl transition-all shadow-sm disabled:opacity-40"
        >
          Nộp bài kiểm tra
        </button>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="bg-white rounded-3xl border border-gray-200/90 shadow-xs p-6">
            <div className="flex items-center justify-between mb-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <span>Câu {idx + 1} of {questions.length}</span>
              <span>{q.type === 'tf' ? 'Đúng hay Sai' : q.type === 'mc' ? 'Chọn đáp án đúng' : 'Nhập câu trả lời'}</span>
            </div>

            {/* Prompt */}
            <div className="mb-5">
              <h3 className="text-xl font-black text-gray-900 leading-snug">{q.promptText}</h3>
              {q.type === 'tf' && (
                <div className="mt-3 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-sm font-medium text-gray-800">
                  <span className="text-xs text-primary font-bold uppercase block mb-1">Định nghĩa hiển thị:</span>
                  {q.matchText}
                </div>
              )}
            </div>

            {/* Type 1: True / False */}
            {q.type === 'tf' && (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: true }))}
                  className={`py-3.5 px-4 rounded-xl border text-sm font-bold transition-all ${
                    userAnswers[q.id] === true
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  ĐÚNG
                </button>
                <button
                  type="button"
                  onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: false }))}
                  className={`py-3.5 px-4 rounded-xl border text-sm font-bold transition-all ${
                    userAnswers[q.id] === false
                      ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                      : 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  SAI
                </button>
              </div>
            )}

            {/* Type 2: Multiple Choice */}
            {q.type === 'mc' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[q.id] === opt;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => setUserAnswers(prev => ({ ...prev, [q.id]: opt }))}
                      className={`p-3.5 rounded-xl border text-left text-sm font-semibold transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-gray-50/80 text-gray-800 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-white border border-gray-200 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Type 3: Written */}
            {q.type === 'written' && (
              <div>
                <input
                  type="text"
                  placeholder={`Gõ câu trả lời bằng ${q.targetLang}...`}
                  value={userAnswers[q.id] || ''}
                  onChange={(e) => setUserAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Submit Bar */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSubmitTest}
          className="px-10 py-4 bg-primary hover:bg-primary-container text-white font-extrabold text-base rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          Nộp bài kiểm tra & Xem kết quả
        </button>
      </div>
    </div>
  );
}
