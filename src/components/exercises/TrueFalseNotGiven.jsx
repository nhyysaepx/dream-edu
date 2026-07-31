import React from 'react';

const TrueFalseNotGiven = ({ data, onAnswer, isSubmitted, answers }) => {
  const options = ["True", "False", "Not Given"];

  const handleOptionSelect = (qIndex, option) => {
    if (isSubmitted) return;
    onAnswer({
      ...answers,
      [qIndex]: option
    });
  };

  return (
    <div className="space-y-6">
      {data.questions.map((q, qIndex) => (
        <div key={qIndex} className="bg-surface-container rounded-2xl p-6 shadow-sm border border-surface-variant">
          <p className="font-body-lg text-on-surface mb-4 font-medium">{qIndex + 1}. {q.question}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            {options.map((option, oIndex) => {
              const isSelected = answers[qIndex] === option;
              const isCorrect = q.answer === option;
              
              let buttonClass = "flex-1 py-3 px-4 rounded-xl border text-center transition-all duration-200 font-label-lg ";
              
              if (isSubmitted) {
                if (isCorrect) {
                  buttonClass += "bg-green-100 border-green-500 text-green-800";
                } else if (isSelected && !isCorrect) {
                  buttonClass += "bg-red-100 border-red-500 text-red-800";
                } else {
                  buttonClass += "bg-surface border-outline-variant text-on-surface-variant opacity-50";
                }
              } else {
                if (isSelected) {
                  buttonClass += "bg-primary-fixed border-primary text-on-primary-fixed ring-2 ring-primary ring-opacity-50 shadow-sm";
                } else {
                  buttonClass += "bg-surface border-outline text-on-surface hover:bg-surface-variant hover:border-outline-variant";
                }
              }

              return (
                <button
                  key={oIndex}
                  onClick={() => handleOptionSelect(qIndex, option)}
                  disabled={isSubmitted}
                  className={buttonClass}
                >
                  <span className="font-bold">{option}</span>
                </button>
              );
            })}
          </div>
          
          {isSubmitted && answers[qIndex] !== q.answer && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm flex items-start">
              <span className="material-symbols-outlined mr-2 text-[20px]">error</span>
              <p>Đáp án đúng là: <strong>{q.answer}</strong></p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TrueFalseNotGiven;
