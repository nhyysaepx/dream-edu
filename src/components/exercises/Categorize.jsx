import React, { useEffect, useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

const DraggableItem = ({ id, text, isSubmitted, isCorrect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isSubmitted
  });
  
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={clsx(
        "px-4 py-2 bg-surface-container-lowest border rounded-lg shadow-sm cursor-grab active:cursor-grabbing font-body-md select-none",
        isDragging && "opacity-80 border-primary shadow-lg z-50",
        !isDragging && "border-surface-variant",
        isSubmitted && isCorrect && "bg-green-50 border-green-500 text-green-900",
        isSubmitted && isCorrect === false && "bg-error-container border-error text-error"
      )}
    >
      {text}
    </div>
  );
};

const DroppableCategory = ({ id, title, items, isSubmitted, correctAnswers }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div 
      ref={setNodeRef} 
      className={clsx(
        "flex-1 min-h-[200px] p-4 rounded-2xl border-2 transition-colors flex flex-col",
        isOver && !isSubmitted ? "border-primary bg-primary-fixed/20" : "border-surface-variant bg-surface-container-low"
      )}
    >
      <h3 className="font-headline-sm text-center mb-4 pb-2 border-b-2 border-outline-variant">{title}</h3>
      <div className="flex flex-wrap gap-2 items-start content-start flex-1">
        {items.map((item) => (
          <DraggableItem 
            key={item.id} 
            id={item.id} 
            text={item.text} 
            isSubmitted={isSubmitted}
            isCorrect={isSubmitted ? correctAnswers[item.id] === id : undefined}
          />
        ))}
      </div>
    </div>
  );
};

const Categorize = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  const [items, setItems] = useState({}); // { itemId: categoryId (or 'unassigned') }
  
  const correctMapping = React.useMemo(() => {
    const map = {};
    data.items.forEach((item, i) => {
      map[`item-${i}`] = item.category;
    });
    return map;
  }, [data]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setItems(answers);
    } else {
      const initial = {};
      data.items.forEach((item, i) => {
        initial[`item-${i}`] = 'unassigned';
      });
      setItems(initial);
    }
  }, [data.id]);

  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      Object.entries(items).forEach(([itemId, categoryId]) => {
        if (correctMapping[itemId] === categoryId) {
          correct++;
        }
      });
      onScoreUpdate(correct, data.items.length);
    }
  }, [isSubmitted, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id) {
      const newItems = { ...items, [active.id]: over.id };
      setItems(newItems);
      onAnswer(newItems);
    }
  };

  const unassignedItems = Object.entries(items)
    .filter(([_, cat]) => cat === 'unassigned')
    .map(([id]) => {
      const idx = parseInt(id.replace('item-', ''));
      return { id, text: data.items[idx].text };
    });

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="space-y-8">
        <DroppableCategory 
          id="unassigned" 
          title="Từ vựng cần phân loại" 
          items={unassignedItems} 
          isSubmitted={isSubmitted} 
          correctAnswers={correctMapping}
        />
        
        <div className="flex flex-col md:flex-row gap-6">
          {data.categories.map(cat => {
            const catItems = Object.entries(items)
              .filter(([_, assignedCat]) => assignedCat === cat)
              .map(([id]) => {
                const idx = parseInt(id.replace('item-', ''));
                return { id, text: data.items[idx].text };
              });
              
            return (
              <DroppableCategory 
                key={cat}
                id={cat}
                title={cat}
                items={catItems}
                isSubmitted={isSubmitted}
                correctAnswers={correctMapping}
              />
            );
          })}
        </div>
        
        {isSubmitted && (
          <div className="mt-6 p-4 bg-primary-fixed rounded-xl border border-primary-fixed-dim text-on-primary-fixed">
            <h4 className="font-bold mb-2">Đáp án đúng:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {data.categories.map(cat => (
                <div key={`ans-${cat}`}>
                  <strong className="block mb-1">{cat}:</strong>
                  {data.items.filter(i => i.category === cat).map(i => i.text).join(', ')}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default Categorize;
