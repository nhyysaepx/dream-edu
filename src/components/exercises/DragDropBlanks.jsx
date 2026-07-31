import React, { useEffect, useState, useMemo } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import clsx from 'clsx';

const DraggableWord = ({ id, text, isSubmitted, isCorrect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isSubmitted
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={clsx(
        "inline-flex items-center px-3 py-1 bg-surface-container border rounded-md shadow-sm font-semibold text-on-surface select-none touch-none",
        isDragging && "opacity-80 border-primary shadow-lg z-50",
        !isDragging && "border-outline-variant",
        isSubmitted && isCorrect && "bg-green-500 border-green-600 text-white shadow-none",
        isSubmitted && isCorrect === false && "bg-error border-error text-white shadow-none"
      )}
    >
      {text}
    </div>
  );
};

const DroppableBlank = ({ id, activeWord, isSubmitted, correctAnswer }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  
  const isCorrect = isSubmitted && activeWord?.text.toLowerCase() === correctAnswer.toLowerCase();
  
  return (
    <span 
      ref={setNodeRef}
      className={clsx(
        "inline-flex items-center justify-center min-w-[100px] h-8 mx-1 align-bottom border-b-2 transition-colors",
        isOver && !isSubmitted ? "border-primary bg-primary-fixed/30" : "border-outline",
        !activeWord && "bg-surface-container-low",
        isSubmitted && isCorrect && "border-green-500",
        isSubmitted && !isCorrect && "border-error relative"
      )}
    >
      {activeWord ? (
        <DraggableWord 
          id={activeWord.id} 
          text={activeWord.text} 
          isSubmitted={isSubmitted}
          isCorrect={isSubmitted ? isCorrect : undefined}
        />
      ) : (
        <span className="text-transparent">blank</span>
      )}
      
      {isSubmitted && !isCorrect && (
        <span className="absolute left-0 -bottom-6 text-sm text-green-600 font-bold whitespace-nowrap">
          {correctAnswer}
        </span>
      )}
    </span>
  );
};

const WordBank = ({ words, isSubmitted }) => {
  const { setNodeRef, isOver } = useDroppable({ id: 'word-bank' });

  return (
    <div 
      ref={setNodeRef}
      className={clsx(
        "flex flex-wrap gap-3 p-6 bg-surface-container-lowest rounded-2xl border-2 min-h-[100px]",
        isOver && !isSubmitted ? "border-primary bg-primary-fixed/10" : "border-dashed border-outline-variant"
      )}
    >
      {words.map(word => (
        <DraggableWord 
          key={word.id} 
          id={word.id} 
          text={word.text} 
          isSubmitted={isSubmitted} 
        />
      ))}
      {words.length === 0 && (
        <span className="text-on-surface-variant italic w-full text-center py-2">
          Đã điền hết từ
        </span>
      )}
    </div>
  );
};

const DragDropBlanks = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  const [wordAssignments, setWordAssignments] = useState({}); // wordId -> blankId (or 'word-bank')

  const parsedData = useMemo(() => {
    const parts = [];
    const blanks = [];
    let currentString = data.text;
    const regex = /\{([^}]+)\}/;
    let match;
    let blankIdx = 0;

    while ((match = regex.exec(currentString)) !== null) {
      const before = currentString.substring(0, match.index);
      parts.push({ type: 'text', content: before });
      
      const answer = match[1];
      const id = `blank-${blankIdx}`;
      blanks.push({ id, answer });
      parts.push({ type: 'blank', id, answer });
      
      currentString = currentString.substring(match.index + match[0].length);
      blankIdx++;
    }
    if (currentString) parts.push({ type: 'text', content: currentString });

    const initialWords = data.words.map((w, i) => ({
      id: `word-${i}`,
      text: w
    }));

    return { parts, blanks, initialWords };
  }, [data]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setWordAssignments(answers);
    } else {
      const initial = {};
      parsedData.initialWords.forEach(w => {
        initial[w.id] = 'word-bank';
      });
      setWordAssignments(initial);
    }
  }, [data.id, parsedData]);

  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      parsedData.blanks.forEach(b => {
        // Find word assigned to this blank
        const wordId = Object.keys(wordAssignments).find(wId => wordAssignments[wId] === b.id);
        if (wordId) {
          const wordText = parsedData.initialWords.find(w => w.id === wordId).text;
          if (wordText.toLowerCase() === b.answer.toLowerCase()) {
            correct++;
          }
        }
      });
      onScoreUpdate(correct, parsedData.blanks.length);
    }
  }, [isSubmitted, wordAssignments]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id) {
      const draggedWordId = active.id;
      const targetBlankId = over.id; // can be 'word-bank' or a blank id
      
      setWordAssignments(prev => {
        const next = { ...prev };
        
        // If dropping into a blank that already has a word, move that word back to bank
        if (targetBlankId !== 'word-bank') {
          const existingWordId = Object.keys(next).find(wId => next[wId] === targetBlankId);
          if (existingWordId && existingWordId !== draggedWordId) {
            next[existingWordId] = 'word-bank';
          }
        }
        
        next[draggedWordId] = targetBlankId;
        onAnswer(next);
        return next;
      });
    }
  };

  const getWordForBlank = (blankId) => {
    const wordId = Object.keys(wordAssignments).find(wId => wordAssignments[wId] === blankId);
    if (!wordId) return null;
    return parsedData.initialWords.find(w => w.id === wordId);
  };

  const bankWords = parsedData.initialWords.filter(w => wordAssignments[w.id] === 'word-bank');

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-10">
        <div>
          <h3 className="font-label-lg text-primary mb-3">Kéo các từ dưới đây vào chỗ trống:</h3>
          <WordBank words={bankWords} isSubmitted={isSubmitted} />
        </div>

        <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-2xl border border-surface-variant font-body-lg leading-loose whitespace-pre-wrap">
          {parsedData.parts.map((part, i) => {
            if (part.type === 'text') {
              return <span key={i}>{part.content}</span>;
            } else {
              return (
                <DroppableBlank 
                  key={part.id} 
                  id={part.id} 
                  activeWord={getWordForBlank(part.id)} 
                  isSubmitted={isSubmitted}
                  correctAnswer={part.answer}
                />
              );
            }
          })}
        </div>
      </div>
    </DndContext>
  );
};

export default DragDropBlanks;
