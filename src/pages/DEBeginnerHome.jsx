import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const DEBeginnerHome = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-[var(--spacing-container-max)]">
      <div className="text-center mb-12">
        <h1 className="font-display-lg text-primary mb-4 text-gradient">Ôn tập DE Beginner</h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Chào mừng bạn đến với hệ thống ôn tập tương tác. Nhấn vào nút bên dưới để bắt đầu làm bài tổng hợp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/de-beginner/review"
          className="block group w-full"
        >
          <div className="bg-surface-container-lowest rounded-2xl p-8 h-full border border-primary tonal-card relative overflow-hidden flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all">
            <BookOpen className="w-16 h-16 text-brand-gold mb-6" />
            <h3 className="font-display-sm text-primary mb-2">
              Review Unit 1-2-3-4
            </h3>
            <p className="font-body-md text-on-surface-variant mb-8">
              Bài tập tổng hợp toàn bộ kiến thức từ Unit 1 đến Unit 4.
            </p>
            <div className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg group-hover:bg-brand-blue transition-colors interactive-shadow flex items-center">
              Bắt đầu làm bài <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
            </div>
          </div>
        </Link>

        <Link
          to="/de-beginner/language-builder"
          className="block group w-full"
        >
          <div className="bg-surface-container-lowest rounded-2xl p-8 h-full border border-primary tonal-card relative overflow-hidden flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-all">
            <BookOpen className="w-16 h-16 text-brand-gold mb-6" />
            <h3 className="font-display-sm text-primary mb-2">
              Review - Language Builder - Unit 1-2-3-4
            </h3>
            <p className="font-body-md text-on-surface-variant mb-8">
              Bài tập tổng hợp phần Language Builder từ Unit 1 đến Unit 4.
            </p>
            <div className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-lg group-hover:bg-brand-blue transition-colors interactive-shadow flex items-center">
              Bắt đầu làm bài <span className="material-symbols-outlined ml-2 text-[20px]">arrow_forward</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DEBeginnerHome;
