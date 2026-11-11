// Practice detail lookup function
import { PRE_IELTS_READING_2_PRACTICE_DETAIL } from './details/pre-ielts-reading-2.js';
import { PRE_IELTS_READING_1_DETAIL, PRE_IELTS_LISTENING_1_DETAIL } from '../homework/index.js';

export function getPracticeDetailById(id) {
  if (id === 'pre-ielts-reading-2') {
    return PRE_IELTS_READING_2_PRACTICE_DETAIL;
  }
  if (id === 'pre-ielts-reading-1') {
    return {
      ...PRE_IELTS_READING_1_DETAIL,
      id: 'pre-ielts-reading-1',
      session: 'Buổi 1 - Luyện tập trên lớp (In-Class Practice)',
      title: 'PRACTICE - Reading 1 - Short-answer Questions'
    };
  }
  if (id === 'pre-ielts-listening-1') {
    return {
      ...PRE_IELTS_LISTENING_1_DETAIL,
      id: 'pre-ielts-listening-1',
      session: 'Buổi 1 - Luyện tập trên lớp (In-Class Practice)',
      title: 'PRACTICE - Listening 1 - Friends Abroad'
    };
  }

  // Fallback to reading 2 practice detail
  return PRE_IELTS_READING_2_PRACTICE_DETAIL;
}
