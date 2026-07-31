import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import exercisesData from '../data/language-builder.json';

import FillBlank from '../components/exercises/FillBlank';
import MultipleChoiceInline from '../components/exercises/MultipleChoiceInline';
import Matching from '../components/exercises/Matching';
import Ordering from '../components/exercises/Ordering';
import Categorize from '../components/exercises/Categorize';
import MultipleChoice from '../components/exercises/MultipleChoice';
import DragDropBlanks from '../components/exercises/DragDropBlanks';

const ExerciseWrapper = ({ exercise }) => {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  const handleAnswerChange = (data) => {
    setAnswers(data);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const renderExercise = () => {
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
      case 'matching':
        return <Matching {...props} />;
      case 'ordering':
        return <Ordering {...props} />;
      case 'categorize':
        return <Categorize {...props} />;
      case 'multiple-choice':
        return <MultipleChoice {...props} />;
      case 'drag-drop-blanks':
        return <DragDropBlanks {...props} />;
      default:
        return <div>Unsupported exercise type: {exercise.type}</div>;
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant relative overflow-hidden mb-8">
      <h1 className="font-headline-md text-on-surface mb-2">{exercise.unit}</h1>
      <h2 className="font-headline-sm text-primary mb-8">{exercise.title}</h2>
      
      <div className="mb-12">
        {renderExercise()}
      </div>

      <div className="border-t border-surface-variant pt-8 flex justify-between items-center">
        {!isSubmitted ? (
          <button 
            onClick={handleSubmit}
            className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg hover:bg-brand-blue transition-colors interactive-shadow"
          >
            Nộp bài
          </button>
        ) : (
          <div className="w-full">
            <div className="bg-primary-fixed rounded-2xl p-6 mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-on-primary-fixed mb-2">Kết quả của bạn</h3>
                <p className="font-body-lg text-on-primary-fixed-variant">
                  Bạn đã trả lời đúng <strong className="text-xl">{score?.correct}</strong> trên tổng số <strong>{score?.total}</strong> câu.
                </p>
              </div>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setAnswers({});
                  setScore(null);
                }}
                className="bg-surface-container-high text-on-surface px-6 py-2 rounded-full font-label-lg hover:bg-surface-variant transition-colors"
              >
                Làm lại câu này
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DEBeginnerLBReview = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/de-beginner" className="inline-flex items-center text-primary mb-6 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại trang chủ
      </Link>
      
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-primary mb-4 text-gradient">Review Language Builder - Unit 1-2-3-4</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Hoàn thành tất cả các bài tập Language Builder dưới đây để trau dồi từ vựng và ngữ pháp nhé!
        </p>
      </div>

      <div>
        {exercisesData.map(exercise => (
          <ExerciseWrapper key={exercise.id} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default DEBeginnerLBReview;
