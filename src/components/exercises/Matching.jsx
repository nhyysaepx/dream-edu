import React, { useEffect, useState, useMemo } from 'react';
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
import { GripVertical } from 'lucide-react';

const SortableItem = ({ id, content, isSubmitted, isCorrect }) => {
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
      className={clsx(
        "flex items-center p-4 mb-3 rounded-xl border bg-surface-container-lowest",
        isDragging && "shadow-lg border-primary opacity-90",
        !isDragging && "shadow-sm border-surface-variant",
        isSubmitted && isCorrect && "bg-green-50 border-green-500",
        isSubmitted && !isCorrect && "bg-error-container border-error"
      )}
    >
      <button
        {...attributes}
        {...listeners}
        disabled={isSubmitted}
        className={clsx(
          "mr-3 text-on-surface-variant cursor-grab active:cursor-grabbing",
          isSubmitted && "opacity-50 cursor-not-allowed"
        )}
      >
        <GripVertical className="w-5 h-5" />
      </button>
      <div className={clsx("flex-1 font-body-md font-medium text-on-surface")}>
        {content}
      </div>
      {isSubmitted && (
        <div className="ml-3">
          {isCorrect ? (
            <span className="text-green-600 material-symbols-outlined">check_circle</span>
          ) : (
            <span className="text-error material-symbols-outlined">cancel</span>
          )}
        </div>
      )}
    </div>
  );
}

const Matching = ({ data, onAnswer, isSubmitted, answers, onScoreUpdate }) => {
  // rightItems in data are initially in the correct order matching leftItems
  // We need to shuffle them once on mount, or use the provided answers
  
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      // Use existing state from parent if navigating back/forth
      setItems(answers.items || []);
    } else {
      // Initialize and shuffle
      const initialItems = data.rightItems.map((text, index) => ({
        id: `item-${index}`,
        text,
        originalIndex: index // to check correctness
      }));
      // Simple shuffle
      const shuffled = [...initialItems].sort(() => Math.random() - 0.5);
      setItems(shuffled);
      onAnswer({ items: shuffled });
    }
  }, [data.id]); // re-run if exercise changes

  useEffect(() => {
    if (isSubmitted) {
      let correct = 0;
      items.forEach((item, index) => {
        if (item.originalIndex === index) {
          correct++;
        }
      });
      onScoreUpdate(correct, data.leftItems.length);
    }
  }, [isSubmitted, items]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        onAnswer({ items: newItems });
        return newItems;
      });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-3">
        {data.leftItems.map((left, index) => (
          <div key={index} className="p-4 bg-primary-fixed text-on-primary-fixed rounded-xl shadow-sm min-h-[60px] flex items-center font-body-md font-semibold">
            {left}
          </div>
        ))}
      </div>
      <div>
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items.map(i => i.id)}
            strategy={verticalListSortingStrategy}
          >
            {items.map((item, index) => (
              <SortableItem 
                key={item.id} 
                id={item.id} 
                content={item.text}
                isSubmitted={isSubmitted}
                isCorrect={isSubmitted && item.originalIndex === index}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Matching;
