import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import exercisesData from '../data/exercises.json';

// Import components that will be created next
import FillBlank from '../components/exercises/FillBlank';
import MultipleChoiceInline from '../components/exercises/MultipleChoiceInline';
import Matching from '../components/exercises/Matching';
import Ordering from '../components/exercises/Ordering';
import Categorize from '../components/exercises/Categorize';
import MultipleChoice from '../components/exercises/MultipleChoice';
import DragDropBlanks from '../components/exercises/DragDropBlanks';

const DEBeginnerExercise = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const exercise = exercisesData.find(e => e.id === id);
  
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  if (!exercise) {
    return <div className="text-center py-20">Exercise not found.</div>;
  }

  const handleSubmit = () => {
    // Scoring logic depends on exercise type
    // We'll calculate score inside the component and let it pass the result or calculate here
    let totalQuestions = 0;
    let correctAnswers = 0;
    
    // Simplistic scoring delegating to child component check if possible
    // Alternatively, we can let child components return score
    setIsSubmitted(true);
    
    // Temporary mock score logic - will be refined
    setScore({ correct: 5, total: 10 });
    
    // Save progress
    const saved = localStorage.getItem('de_beginner_progress');
    const progress = saved ? JSON.parse(saved) : {};
    progress[exercise.id] = true;
    localStorage.setItem('de_beginner_progress', JSON.stringify(progress));
  };

  const handleAnswerChange = (data) => {
    setAnswers(data);
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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link to="/de-beginner" className="inline-flex items-center text-primary mb-6 hover:underline font-semibold">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Quay lại danh sách
      </Link>

      <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-sm border border-surface-variant relative overflow-hidden">
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
              <div className="bg-primary-fixed rounded-2xl p-6 mb-6">
                <h3 className="font-headline-sm text-on-primary-fixed mb-2">Kết quả của bạn</h3>
                <p className="font-body-lg text-on-primary-fixed-variant">
                  Bạn đã trả lời đúng <strong className="text-xl">{score?.correct}</strong> trên tổng số <strong>{score?.total}</strong> câu.
                </p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-label-lg hover:bg-surface-variant transition-colors"
                >
                  Làm lại
                </button>
                <Link 
                  to="/de-beginner"
                  className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-lg hover:bg-brand-blue transition-colors text-center"
                >
                  Bài tiếp theo
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DEBeginnerExercise;
