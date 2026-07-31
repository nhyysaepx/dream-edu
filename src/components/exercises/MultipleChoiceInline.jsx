import React, { useEffect } from 'react';
import clsx from 'clsx';

const MultipleChoiceInline = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  // Parse text: "My brother {works|work/works} for a company"
  const parts = [];
  let currentString = data.text;
  let match;
  const regex = /\{([^|]+)\|([^}]+)\}/;
  let blankIndex = 0;
  
  const parsedBlanks = [];

  while ((match = regex.exec(currentString)) !== null) {
    const before = currentString.substring(0, match.index);
    parts.push({ type: 'text', content: before });
    
    const answer = match[1];
    const optionsString = match[2];
    const options = optionsString.split('/');
    const id = `inline-mc-${blankIndex}`;
    
    parts.push({ type: 'mc', id, answer, options });
    parsedBlanks.push({ id, answer });
    
    currentString = currentString.substring(match.index + match[0].length);
    blankIndex++;
  }
  if (currentString) {
    parts.push({ type: 'text', content: currentString });
  }

  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      parsedBlanks.forEach(b => {
        const userAnswer = answers[b.id] || '';
        if (userAnswer === b.answer) {
          correct++;
        }
      });
      onScoreUpdate(correct, parsedBlanks.length);
    }
  }, [isSubmitted]);

  const handleSelect = (id, value) => {
    onAnswer({ ...answers, [id]: value });
  };

  return (
    <div className="font-body-lg leading-loose space-y-4 whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <span key={i}>{part.content}</span>;
        }

        const userAnswer = answers[part.id] || '';
        const isCorrect = isSubmitted && userAnswer === part.answer;
        const isWrong = isSubmitted && userAnswer !== part.answer && userAnswer !== '';

        return (
          <span key={i} className="inline-flex items-center gap-1 mx-2 align-middle bg-surface-container rounded-lg p-1">
            {part.options.map((opt, j) => (
              <button
                key={j}
                disabled={isSubmitted}
                onClick={() => handleSelect(part.id, opt)}
                className={clsx(
                  "px-3 py-1 rounded-md text-sm font-semibold transition-colors",
                  userAnswer === opt && !isSubmitted && "bg-primary text-on-primary",
                  userAnswer !== opt && !isSubmitted && "hover:bg-surface-variant text-on-surface",
                  isSubmitted && userAnswer === opt && isCorrect && "bg-green-500 text-white",
                  isSubmitted && userAnswer === opt && isWrong && "bg-error text-white",
                  isSubmitted && userAnswer !== opt && opt === part.answer && "bg-green-100 text-green-800 border border-green-500",
                  isSubmitted && userAnswer !== opt && opt !== part.answer && "opacity-50"
                )}
              >
                {opt}
              </button>
            ))}
          </span>
        );
      })}
    </div>
  );
};

export default MultipleChoiceInline;
