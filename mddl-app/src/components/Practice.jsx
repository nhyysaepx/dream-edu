import React, { useState } from 'react';
import { ArrowLeft, BookMarked, Layers, CheckCircle2, XCircle } from 'lucide-react';
import { logUserAction } from '../utils/logger';
import { motion, AnimatePresence } from 'framer-motion';

export default function Practice({ onNavigate, savedMWEs }) {
  const [activeTab, setActiveTab] = useState('notebook'); // 'notebook', 'flashcards', 'quiz'
  
  // Flashcard State
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(null); // { isCorrect: boolean, selectedId: number }
  const [quizFinished, setQuizFinished] = useState(false);

  // Simple Quiz Generator based on savedMWEs
  const generateQuizOptions = (correctMwe) => {
    // Basic mock logic: pick 2 other random MWEs (or fallback strings if not enough saved)
    const options = [correctMwe.mwe];
    const fallbacks = ["carry out research", "take into consideration", "significant impact", "draw conclusions"];
    
    while(options.length < 3) {
      const candidate = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      if (!options.includes(candidate)) {
        options.push(candidate);
      }
    }
    return options.sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selectedOption) => {
    const isCorrect = selectedOption === savedMWEs[currentQuestion].mwe;
    setShowFeedback({ isCorrect, selectedOption });
    
    logUserAction('QUIZ_ANSWER', { 
      mwe: savedMWEs[currentQuestion].mwe, 
      selected: selectedOption, 
      isCorrect 
    });

    if (isCorrect) setQuizScore(prev => prev + 1);

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQuestion < savedMWEs.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setQuizFinished(true);
        logUserAction('QUIZ_FINISHED', { score: quizScore + (isCorrect ? 1 : 0), total: savedMWEs.length });
      }
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <header className="bg-primary text-on-primary p-4 shadow-sm flex items-center shrink-0">
        <button onClick={() => onNavigate('home')} className="p-2 mr-2 hover:bg-primary-container rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">Practice Center</h1>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-outline-variant shrink-0 bg-surface-container-lowest">
        <button 
          onClick={() => setActiveTab('notebook')}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'notebook' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'}`}
        >
          Notebook
        </button>
        <button 
          onClick={() => {
            setActiveTab('flashcards');
            logUserAction('START_FLASHCARDS');
          }}
          disabled={savedMWEs.length === 0}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'flashcards' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'} disabled:opacity-50`}
        >
          Flashcards
        </button>
        <button 
          onClick={() => {
            setActiveTab('quiz');
            setQuizFinished(false);
            setCurrentQuestion(0);
            setQuizScore(0);
            logUserAction('START_QUIZ');
          }}
          disabled={savedMWEs.length === 0}
          className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'quiz' ? 'text-primary border-b-2 border-primary' : 'text-on-surface-variant'} disabled:opacity-50`}
        >
          Quiz
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {savedMWEs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-on-surface-variant p-6">
            <BookMarked className="w-12 h-12 mb-4 opacity-20" />
            <p>Your notebook is empty.</p>
            <p className="text-sm mt-2">Go to the search explorer and save some MWEs to start practicing!</p>
            <button 
              onClick={() => onNavigate('search')}
              className="mt-6 px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold"
            >
              Go to Search
            </button>
          </div>
        ) : (
          <>
            {/* NOTEBOOK VIEW */}
            {activeTab === 'notebook' && (
              <div className="space-y-4">
                {savedMWEs.map((item) => (
                  <div key={item.id} className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm">
                    <h3 className="font-bold text-primary text-lg mb-1">{item.mwe}</h3>
                    <p className="text-sm text-tertiary-container font-medium mb-2">{item.translation}</p>
                    <p className="text-on-surface-variant text-sm italic">"{item.sentence}"</p>
                  </div>
                ))}
              </div>
            )}

            {/* FLASHCARDS VIEW */}
            {activeTab === 'flashcards' && savedMWEs.length > 0 && (
              <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-4 text-sm font-semibold text-on-surface-variant">
                  Card {currentCard + 1} of {savedMWEs.length}
                </div>
                
                <div 
                  className="w-full max-w-sm aspect-[4/3] perspective-1000 cursor-pointer"
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: "spring" }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden bg-surface-container-lowest border-2 border-primary/20 rounded-2xl shadow-diffused flex flex-col items-center justify-center p-6 text-center">
                      <h2 className="text-2xl font-bold text-primary mb-4">{savedMWEs[currentCard].mwe}</h2>
                      <p className="text-sm text-on-surface-variant">Tap to flip</p>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden bg-primary text-on-primary rounded-2xl shadow-diffused flex flex-col items-center justify-center p-6 text-center rotate-y-180">
                      <p className="text-xl font-bold text-secondary-container mb-4">{savedMWEs[currentCard].translation}</p>
                      <p className="text-sm italic opacity-90">"{savedMWEs[currentCard].sentence}"</p>
                    </div>
                  </motion.div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button 
                    onClick={() => { setIsFlipped(false); setCurrentCard(prev => Math.max(0, prev - 1)); }}
                    disabled={currentCard === 0}
                    className="px-6 py-2 bg-surface-container rounded-lg font-semibold disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button 
                    onClick={() => { setIsFlipped(false); setCurrentCard(prev => Math.min(savedMWEs.length - 1, prev + 1)); }}
                    disabled={currentCard === savedMWEs.length - 1}
                    className="px-6 py-2 bg-primary text-on-primary rounded-lg font-semibold disabled:opacity-50 shadow-sm"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* QUIZ VIEW */}
            {activeTab === 'quiz' && savedMWEs.length > 0 && (
              <div className="flex flex-col h-full">
                {quizFinished ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-secondary-container/20 rounded-full flex items-center justify-center mb-6">
                      <Layers className="w-12 h-12 text-secondary-container" />
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">Quiz Completed!</h2>
                    <p className="text-lg text-on-surface-variant mb-8">You scored {quizScore} out of {savedMWEs.length}</p>
                    <button 
                      onClick={() => {
                        setQuizFinished(false);
                        setCurrentQuestion(0);
                        setQuizScore(0);
                      }}
                      className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold shadow-diffused"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="mb-6 flex justify-between items-center">
                      <span className="text-sm font-semibold text-on-surface-variant">Question {currentQuestion + 1}/{savedMWEs.length}</span>
                      <span className="text-sm font-bold text-secondary-container">Score: {quizScore}</span>
                    </div>

                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant shadow-sm mb-8">
                      <h3 className="text-sm font-bold text-outline uppercase tracking-wider mb-4">Fill in the blank</h3>
                      {/* Replace MWE with blank in sentence */}
                      <p className="text-xl leading-relaxed text-on-surface font-medium">
                        {savedMWEs[currentQuestion].sentence.replace(
                          new RegExp(savedMWEs[currentQuestion].mwe, 'i'), 
                          '__________'
                        )}
                      </p>
                    </div>

                    <div className="space-y-3">
                      {generateQuizOptions(savedMWEs[currentQuestion]).map((option, idx) => {
                        let btnClass = "w-full p-4 rounded-xl text-left border-2 font-semibold transition-all ";
                        
                        if (showFeedback) {
                          if (option === savedMWEs[currentQuestion].mwe) {
                            btnClass += "border-green-500 bg-green-50 text-green-700"; // Correct answer styling
                          } else if (option === showFeedback.selectedOption && !showFeedback.isCorrect) {
                            btnClass += "border-red-500 bg-red-50 text-red-700"; // Incorrect selected styling
                          } else {
                            btnClass += "border-outline-variant opacity-50"; // Other disabled options
                          }
                        } else {
                          btnClass += "border-outline-variant hover:border-primary bg-surface-container-lowest text-on-surface";
                        }

                        return (
                          <button
                            key={idx}
                            disabled={showFeedback !== null}
                            onClick={() => handleAnswer(option)}
                            className={btnClass}
                          >
                            <div className="flex justify-between items-center">
                              {option}
                              {showFeedback && option === savedMWEs[currentQuestion].mwe && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                              {showFeedback && option === showFeedback.selectedOption && !showFeedback.isCorrect && <XCircle className="w-5 h-5 text-red-600" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
