import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, BookmarkPlus, Check, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { logUserAction } from '../utils/logger';

export default function ExpandedContext({ data, onClose, onSave, isSaved }) {
  const [hasGuessedCorrectly, setHasGuessedCorrectly] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  // Shuffle options when component mounts so the correct answer isn't always in the same spot
  useEffect(() => {
    if (data.meaning_options) {
      setShuffledOptions([...data.meaning_options].sort(() => Math.random() - 0.5));
    }
  }, [data]);

  const handleTTS = () => {
    logUserAction('PLAY_TTS', { mwe: data.mwe });
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(data.sentence);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const handleGuess = (option) => {
    setSelectedOption(option);
    logUserAction('GUESS_MEANING', { mwe: data.mwe, guessedText: option.text, isCorrect: option.isCorrect });
    
    if (option.isCorrect) {
      setTimeout(() => {
        setHasGuessedCorrectly(true);
      }, 500);
    }
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 backdrop-blur-sm">
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="bg-surface w-full max-h-[85vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Drag Handle & Close */}
        <div className="p-4 flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest shrink-0">
          <div className="w-12 h-1.5 bg-outline-variant rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-3"></div>
          <h3 className="font-bold text-primary flex items-center">
            <Sparkles className="w-4 h-4 text-secondary-container mr-2" />
            AI Tutor Context
          </h3>
          <button onClick={onClose} className="p-2 bg-surface-container rounded-full text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Sentence */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm relative">
            <button 
              onClick={handleTTS}
              className="absolute top-4 right-4 p-2 bg-secondary-container/20 text-secondary-container rounded-full hover:bg-secondary-container hover:text-on-secondary-container transition-colors cursor-pointer"
              title="Nghe câu"
            >
              <Volume2 className="w-5 h-5" />
            </button>
            <h4 className="text-xs font-bold text-outline uppercase tracking-wider mb-2">Original Sentence</h4>
            <p className="text-lg text-on-surface leading-relaxed pr-10">
              {/* Highlight the MWE */}
              {data.sentence.split(new RegExp(`(${data.mwe})`, 'gi')).map((part, i) => 
                part.toLowerCase() === data.mwe.toLowerCase() ? (
                  <span key={i} className="font-bold text-secondary bg-secondary-container/20 px-1 rounded">{part}</span>
                ) : part
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!hasGuessedCorrectly ? (
              <motion.div 
                key="guessing-phase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2 text-primary">
                  <HelpCircle className="w-5 h-5" />
                  <h4 className="font-bold text-sm uppercase tracking-wider">What does it mean?</h4>
                </div>
                <p className="text-sm text-on-surface-variant mb-4">
                  Dựa vào ngữ cảnh của câu trên, bạn hãy đoán nghĩa của cụm từ <strong className="text-secondary">{data.mwe}</strong> nhé:
                </p>
                <div className="space-y-3">
                  {shuffledOptions.map((option, idx) => {
                    let btnClass = "w-full p-4 rounded-xl text-left border-2 font-semibold transition-all cursor-pointer ";
                    if (selectedOption === option) {
                      btnClass += option.isCorrect 
                        ? "border-green-500 bg-green-50 text-green-700" 
                        : "border-red-500 bg-red-50 text-red-700";
                    } else {
                      btnClass += "border-outline-variant hover:border-primary bg-surface-container-lowest text-on-surface";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleGuess(option)}
                        disabled={selectedOption && selectedOption.isCorrect}
                        className={btnClass}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
                {selectedOption && !selectedOption.isCorrect && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg mt-4"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">Chưa chính xác, hãy thử lại nhé!</span>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="revealed-phase"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Translation */}
                <div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-tertiary uppercase tracking-wider mb-2 flex items-center">
                    <Check className="w-4 h-4 mr-1 text-green-600" /> Chính xác! (Vietnamese Translation)
                  </h4>
                  <p className="text-lg font-medium text-tertiary-container">{data.translation}</p>
                </div>

                {/* Definition */}
                <div className="bg-primary-container/5 border border-primary-container/10 rounded-2xl p-5">
                  <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2">English Definition</h4>
                  <p className="text-on-surface-variant leading-relaxed">
                    <span className="font-semibold text-primary">{data.mwe}</span>: {data.definition}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <AnimatePresence>
          {hasGuessedCorrectly && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border-t border-outline-variant bg-surface-container-lowest shrink-0"
            >
              <button
                onClick={onSave}
                disabled={isSaved}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                  isSaved 
                    ? 'bg-surface-variant text-on-surface-variant cursor-not-allowed' 
                    : 'bg-primary text-on-primary shadow-diffused hover:bg-primary-container'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-5 h-5 mr-2" /> Saved to Notebook
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="w-5 h-5 mr-2" /> Save to Notebook
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
