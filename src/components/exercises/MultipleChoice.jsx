import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CheckCircle2, XCircle } from 'lucide-react';

const MultipleChoice = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      data.questions.forEach((q, i) => {
        if (answers[`q-${i}`] === q.answer) {
          correct++;
        }
      });
      onScoreUpdate(correct, data.questions.length);
    }
  }, [isSubmitted]);

  const handleSelect = (qIndex, value) => {
    onAnswer({ ...answers, [`q-${qIndex}`]: value });
  };

  return (
    <div className="space-y-8">
      {data.questions.map((q, i) => {
        const userAnswer = answers[`q-${i}`];
        const isCorrect = isSubmitted && userAnswer === q.answer;
        const isWrong = isSubmitted && userAnswer !== q.answer && userAnswer !== undefined;
        
        return (
          <div key={i} className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-variant shadow-sm">
            <h3 className="font-headline-sm mb-4 text-on-surface">{q.question}</h3>
            <div className="space-y-3">
              {q.options.map((opt, j) => {
                const isSelected = userAnswer === opt;
                
                let btnClass = "w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ";
                
                if (isSubmitted) {
                  if (opt === q.answer) {
                    btnClass += "border-green-500 bg-green-50 text-green-900"; // Correct answer highlighted
                  } else if (isSelected && !isCorrect) {
                    btnClass += "border-error bg-error-container text-error"; // Wrong answer selected
                  } else {
                    btnClass += "border-surface-variant bg-surface opacity-50"; // Other options
                  }
                } else {
                  if (isSelected) {
                    btnClass += "border-primary bg-primary-fixed text-on-primary-fixed";
                  } else {
                    btnClass += "border-surface-variant bg-surface hover:border-primary hover:bg-surface-container-low";
                  }
                }

                return (
                  <button
                    key={j}
                    disabled={isSubmitted}
                    onClick={() => handleSelect(i, opt)}
                    className={btnClass}
                  >
                    <span className="font-body-lg font-medium">{opt}</span>
                    {isSubmitted && opt === q.answer && <CheckCircle2 className="text-green-600" />}
                    {isSubmitted && isSelected && !isCorrect && <XCircle className="text-error" />}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultipleChoice;
