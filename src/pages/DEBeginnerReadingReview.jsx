import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import readingData from '../data/reading-exercises.json';

import FillBlank from '../components/exercises/FillBlank';
import MultipleChoiceInline from '../components/exercises/MultipleChoiceInline';
import MultipleChoice from '../components/exercises/MultipleChoice';
import TrueFalseNotGiven from '../components/exercises/TrueFalseNotGiven';

const ReadingExercise = ({ exercise }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleAnswerChange = (data) => {
    setAnswers(data);
  };

  const handleSubmit = () => {
    // Basic scoring logic for the exercise
    let correctCount = 0;
    let totalCount = 0;
    
    if (exercise.type === 'multiple-choice' || exercise.type === 'true-false-not-given') {
      totalCount = exercise.questions.length;
      exercise.questions.forEach((q, index) => {
        if (answers[index] === q.answer) correctCount++;
      });
    } else if (exercise.type === 'fill-blank' || exercise.type === 'multiple-choice-inline') {
      // Very basic approximation for these types if not handled perfectly inside
      const blanks = exercise.text.match(/\{[^}]+\}/g) || [];
      totalCount = blanks.length;
      blanks.forEach((blank, index) => {
        const expectedAnswers = blank.slice(1, -1).split('|')[0].toLowerCase().split('/');
        const userAnswer = answers[index]?.toLowerCase().trim() || "";
        if (expectedAnswers.includes(userAnswer)) correctCount++;
      });
    }

    setScore({ correct: correctCount, total: totalCount });
    setIsSubmitted(true);
  };

  const renderExerciseComponent = () => {
    const props = { 
      data: exercise, 
      onAnswer: handleAnswerChange, 
      isSubmitted, 
      answers,
      onScoreUpdate: (correct, total) => setScore({ correct, total })
    };

    switch (exercise.type) {
      case 'fill-blank':
        return <FillBlank {...props} />;
      case 'multiple-choice-inline':
        return <MultipleChoiceInline {...props} />;
      case 'multiple-choice':
        return <MultipleChoice {...props} />;
      case 'true-false-not-given':
        return <TrueFalseNotGiven {...props} />;
      default:
        return <div>Unsupported exercise type: {exercise.type}</div>;
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-surface-variant mb-6">
      <h3 className="font-headline-sm text-primary mb-6">{exercise.title}</h3>
      
      <div className="mb-6">
        {renderExerciseComponent()}
      </div>

      <div className="border-t border-surface-variant pt-6 flex justify-between items-center">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-lg hover:bg-brand-blue transition-colors interactive-shadow"
          >
            Kiểm tra
          </button>
        ) : (
          <div className="w-full flex items-center justify-between bg-primary-fixed rounded-2xl p-4">
            <div>
              <p className="font-body-md text-on-primary-fixed-variant">
                Đúng <strong>{score?.correct}</strong>/{score?.total} câu.
              </p>
            </div>
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setScore(null);
              }}
              className="bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-label-md hover:bg-surface-variant transition-colors"
            >
              Làm lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const DEBeginnerReadingReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = readingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < readingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Link to="/de-beginner" className="inline-flex items-center text-primary mb-6 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại trang chủ
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-surface-variant pb-4">
        <div>
          <h1 className="font-display-md text-primary mb-2 text-gradient">Reading Review: {currentItem.unit}</h1>
          <p className="font-body-lg text-on-surface-variant">
            Bài {currentIndex + 1} / {readingData.length}
          </p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <button 
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center px-4 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-variant disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> Trước
          </button>
          <button 
            onClick={handleNext}
            disabled={currentIndex === readingData.length - 1}
            className="flex items-center px-4 py-2 rounded-full border border-outline text-on-surface hover:bg-surface-variant disabled:opacity-30 transition-colors"
          >
            Sau <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>

      {/* Split screen layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Passage */}
        <div className="lg:sticky lg:top-24 h-max max-h-[calc(100vh-150px)] overflow-y-auto">
          <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant shadow-sm">
            <h2 className="font-headline-md text-on-surface mb-6 text-center">{currentItem.title}</h2>
            <div className="prose prose-lg max-w-none text-on-surface leading-relaxed text-justify whitespace-pre-wrap">
              {currentItem.passage}
            </div>
          </div>
        </div>

        {/* Right Column: Questions */}
        <div className="flex flex-col gap-6">
          {currentItem.exercises.map(exercise => (
            <ReadingExercise key={exercise.id} exercise={exercise} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DEBeginnerReadingReview;
