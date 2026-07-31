import React, { useEffect } from 'react';
import clsx from 'clsx';

const FillBlank = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  // Parse the text to find blanks: "Some text {answer|prompt} more text"
  const parts = [];
  let currentString = data.text;
  let match;
  const regex = /\{([^|]+)(?:\|([^}]+))?\}/;
  let blankIndex = 0;
  
  const parsedBlanks = [];

  while ((match = regex.exec(currentString)) !== null) {
    const before = currentString.substring(0, match.index);
    parts.push({ type: 'text', content: before });
    
    const answer = match[1];
    const prompt = match[2] || '';
    const id = `blank-${blankIndex}`;
    
    parts.push({ type: 'blank', id, answer, prompt });
    parsedBlanks.push({ id, answer });
    
    currentString = currentString.substring(match.index + match[0].length);
    blankIndex++;
  }
  if (currentString) {
    parts.push({ type: 'text', content: currentString });
  }

  // Calculate score when submitted
  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      parsedBlanks.forEach(b => {
        const userAnswer = (answers[b.id] || '').trim().toLowerCase();
        if (userAnswer === b.answer.trim().toLowerCase()) {
          correct++;
        }
      });
      onScoreUpdate(correct, parsedBlanks.length);
    }
  }, [isSubmitted]);

  const handleChange = (id, value) => {
    onAnswer({ ...answers, [id]: value });
  };

  return (
    <div className="font-body-lg leading-loose space-y-4 whitespace-pre-wrap">
      {parts.map((part, i) => {
        if (part.type === 'text') {
          return <span key={i}>{part.content}</span>;
        }

        const userAnswer = answers[part.id] || '';
        const isCorrect = isSubmitted && userAnswer.trim().toLowerCase() === part.answer.trim().toLowerCase();
        const isWrong = isSubmitted && userAnswer.trim().toLowerCase() !== part.answer.trim().toLowerCase();

        return (
          <span key={i} className="inline-block mx-1 relative">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => handleChange(part.id, e.target.value)}
              disabled={isSubmitted}
              className={clsx(
                "border-b-2 outline-none px-2 py-1 text-center font-semibold bg-surface-container-low transition-colors w-32",
                !isSubmitted && "border-primary focus:border-brand-gold focus:bg-primary-fixed",
                isCorrect && "border-green-500 text-green-700 bg-green-50",
                isWrong && "border-error text-error bg-error-container"
              )}
            />
            {part.prompt && (
              <span className="text-sm text-on-surface-variant italic ml-1">
                ({part.prompt})
              </span>
            )}
            {isWrong && (
              <div className="absolute left-0 -bottom-6 text-sm text-green-600 font-bold w-full text-center">
                {part.answer}
              </div>
            )}
          </span>
        );
      })}
    </div>
  );
};

export default FillBlank;
