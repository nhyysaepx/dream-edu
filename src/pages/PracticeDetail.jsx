import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, AlertCircle } from 'lucide-react';
import ReadingHomeworkView from '../components/homework/ReadingHomeworkView';
import { getPracticeDetailById, PRE_IELTS_READING_2_PRACTICE_DETAIL } from '../data/practiceData';

export default function PracticeDetail() {
  const { id } = useParams();
  const practice = getPracticeDetailById(id) || PRE_IELTS_READING_2_PRACTICE_DETAIL;

  // Reading exercises: Render the full-fledged 3-column IELTS Reading layout
  // (Passage with interactive text highlighting & notes, Questions with real-time word limits, Dedicated Notes Column)
  if (practice?.skill === 'Reading') {
    return (
      <ReadingHomeworkView
        homework={practice}
        mode="practice"
        parentPath="/practice"
        parentLabel="Practice"
        storagePrefix="dream_practice_"
        historyKey="dream_practice_history"
      />
    );
  }

  // Fallback for upcoming Listening or other formats
  return (
    <div className="pt-24 pb-20 bg-[#f8fafc] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 text-center shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mx-auto mb-4">
            <BookOpen size={28} />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">{practice.title}</h2>
          <p className="text-gray-600 text-sm max-w-lg mx-auto mb-6">
            Bài luyện tập này đang được đồng bộ nội dung. Bạn có thể quay lại danh sách bài tập hoặc làm bài Reading 2 - IELTS PRE ngay.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/practice"
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 flex items-center gap-2"
            >
              <ArrowLeft size={14} />
              <span>Về phòng Practice</span>
            </Link>
            <Link
              to="/practice/pre-ielts-reading-2"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container shadow-xs"
            >
              Làm Reading 2 - IELTS PRE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
