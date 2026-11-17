// Practice detail lookup function
import { IELTS_ADVANCED_READING_SUPPLEMENTARY_PRACTICE_DETAIL } from './details/ielts-advanced-reading-supplementary.js';
import { REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL } from './details/revision-midterm-1-english-10.js';
import { PRE_IELTS_READING_3_PRACTICE_DETAIL } from './details/pre-ielts-reading-3.js';
import { PRE_IELTS_READING_2_PRACTICE_DETAIL } from './details/pre-ielts-reading-2.js';
import { UNIT_4_GLOBAL_SUCCESS_9_PRACTICE_DETAIL } from './details/unit-4-global-success-9.js';
import { 
  PRE_IELTS_READING_1_DETAIL, 
  PRE_IELTS_LISTENING_1_DETAIL,
  PRE_IELTS_LISTENING_2_DETAIL,
  INTERMEDIATE_LISTENING_6_DETAIL 
} from '../homework/index.js';

export function getPracticeDetailById(id) {
  if (id === 'ielts-advanced-reading-supplementary') {
    return IELTS_ADVANCED_READING_SUPPLEMENTARY_PRACTICE_DETAIL;
  }
  if (id === 'revision-midterm-1-english-10') {
    return REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL;
  }
  if (id === 'unit-4-global-success-9') {
    return UNIT_4_GLOBAL_SUCCESS_9_PRACTICE_DETAIL;
  }
  if (id === 'intermediate-listening-6') {
    return INTERMEDIATE_LISTENING_6_DETAIL;
  }
  if (id === 'pre-ielts-listening-2') {
    return {
      ...PRE_IELTS_LISTENING_2_DETAIL,
      id: 'pre-ielts-listening-2',
      session: 'Buổi 2 - Luyện tập trên lớp (In-Class Practice)',
      title: 'PRACTICE - Listening 2 - Sailing Course & City Bike Tour'
    };
  }
  if (id === 'pre-ielts-reading-3') {
    return PRE_IELTS_READING_3_PRACTICE_DETAIL;
  }
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
