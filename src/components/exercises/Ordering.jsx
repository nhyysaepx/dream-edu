import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { GripHorizontal } from 'lucide-react';

const SortableWord = ({ id, content, isSubmitted, isCorrect }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "inline-flex items-center px-4 py-2 m-1 rounded-full border bg-surface cursor-grab active:cursor-grabbing select-none",
        isDragging && "shadow-lg border-primary opacity-90",
        !isDragging && "shadow-sm border-surface-variant",
        isSubmitted && isCorrect && "bg-green-50 border-green-500 text-green-800",
        isSubmitted && !isCorrect && "bg-error-container border-error text-error"
      )}
    >
      <span className="font-body-md font-medium">
        {content}
      </span>
    </div>
  );
}

const Ordering = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  // data.sentences is an array of { words: [], correct: [] }
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    if (answers.sentences) {
      setSentences(answers.sentences);
    } else {
      const initial = data.sentences.map((s, idx) => ({
        id: `sentence-${idx}`,
        items: s.words.map((w, wIdx) => ({ id: `word-${idx}-${wIdx}`, text: w })),
        correct: s.correct
      }));
      setSentences(initial);
      onAnswer({ sentences: initial });
    }
  }, [data.id]);

  useEffect(() => {
    if (isSubmitted) {
      let correctCount = 0;
      sentences.forEach((s) => {
        const currentSentence = s.items.map(i => i.text.toLowerCase()).join(' ');
        const correctSentence = s.correct.map(w => w.toLowerCase()).join(' ');
        if (currentSentence === correctSentence) {
          correctCount++;
        }
      });
      onScoreUpdate(correctCount, sentences.length);
    }
  }, [isSubmitted, sentences]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event, sentenceIndex) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const newSentences = [...sentences];
      const sentence = newSentences[sentenceIndex];
      const oldIndex = sentence.items.findIndex(item => item.id === active.id);
      const newIndex = sentence.items.findIndex(item => item.id === over.id);
      
      sentence.items = arrayMove(sentence.items, oldIndex, newIndex);
      setSentences(newSentences);
      onAnswer({ sentences: newSentences });
    }
  };

  if (sentences.length === 0) return null;

  return (
    <div className="space-y-8">
      {sentences.map((sentence, sIdx) => {
        const currentSentence = sentence.items.map(i => i.text.toLowerCase()).join(' ');
        const correctSentence = sentence.correct.map(w => w.toLowerCase()).join(' ');
        const isCorrect = currentSentence === correctSentence;

        return (
          <div key={sentence.id} className="bg-surface-container-low p-6 rounded-2xl border border-surface-variant">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-label-lg text-primary">Câu {sIdx + 1}</span>
              {isSubmitted && (
                <span className={clsx("font-bold text-sm", isCorrect ? "text-green-600" : "text-error")}>
                  {isCorrect ? "Đúng" : "Sai"}
                </span>
              )}
            </div>
            
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={(e) => handleDragEnd(e, sIdx)}
            >
              <div className="flex flex-wrap gap-2 p-4 bg-surface-container-lowest rounded-xl min-h-[80px] items-center border border-dashed border-outline-variant">
                <SortableContext 
                  items={sentence.items.map(i => i.id)}
                >
                  {sentence.items.map((item) => (
                    <SortableWord 
                      key={item.id} 
                      id={item.id} 
                      content={item.text}
                      isSubmitted={isSubmitted}
                      isCorrect={isCorrect}
                    />
                  ))}
                </SortableContext>
              </div>
            </DndContext>
            
            {isSubmitted && !isCorrect && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 font-body-sm">
                <strong>Đáp án đúng:</strong> {sentence.correct.join(' ')}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Ordering;
