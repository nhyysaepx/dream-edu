import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle } from 'lucide-react';
import exercisesData from '../data/exercises.json';

const DEBeginnerHome = () => {
  const [completedExercises, setCompletedExercises] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('de_beginner_progress');
    if (saved) {
      try {
        setCompletedExercises(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  const groupedExercises = exercisesData.reduce((acc, exercise) => {
    if (!acc[exercise.unit]) {
      acc[exercise.unit] = [];
    }
    acc[exercise.unit].push(exercise);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8 max-w-[var(--spacing-container-max)]">
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-primary mb-4 text-gradient">Ôn tập DE Beginner</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Chào mừng bạn đến với hệ thống ôn tập tương tác. Chọn một bài tập bên dưới để bắt đầu kiểm tra kiến thức của bạn.
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedExercises).map(([unit, exercises]) => (
          <section key={unit}>
            <h2 className="font-headline-md text-primary mb-6 flex items-center gap-2 border-b border-surface-variant pb-2">
              <BookOpen className="w-6 h-6" />
              {unit}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((exercise) => {
                const isCompleted = completedExercises[exercise.id];
                return (
                  <Link
                    key={exercise.id}
                    to={`/de-beginner/exercise/${exercise.id}`}
                    className="block group"
                  >
                    <div className="bg-surface-container-lowest rounded-2xl p-6 h-full border border-surface-variant tonal-card relative overflow-hidden flex flex-col justify-between">
                      {isCompleted && (
                        <div className="absolute top-4 right-4 text-brand-gold">
                          <CheckCircle className="w-6 h-6 fill-current text-white" />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                          {exercise.type.replace(/-/g, ' ')}
                        </div>
                        <h3 className="font-headline-sm text-on-surface group-hover:text-primary transition-colors pr-8">
                          {exercise.title}
                        </h3>
                      </div>
                      <div className="mt-6 flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Bắt đầu làm bài <span className="material-symbols-outlined ml-1 text-[18px]">arrow_forward</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default DEBeginnerHome;
