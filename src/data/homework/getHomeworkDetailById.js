// Homework detail lookup function
import { PRE_IELTS_LISTENING_1_DETAIL } from './details/pre-ielts-listening-1.js';
import { PRE_IELTS_READING_1_DETAIL } from './details/pre-ielts-reading-1.js';
import { PRE_IELTS_READING_2_DETAIL } from './details/pre-ielts-reading-2.js';
import {
  INTERMEDIATE_READING_6_DETAIL,
  INTERMEDIATE_READING_6_EX8_DETAIL,
  INTERMEDIATE_READING_6_EX9_DETAIL,
  INTERMEDIATE_READING_6_EX10_DETAIL,
} from './details/intermediate-reading-6.js';

export function getHomeworkDetailById(id) {
  if (id === 'intermediate-reading-6') {
    return INTERMEDIATE_READING_6_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex8') {
    return INTERMEDIATE_READING_6_EX8_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex9') {
    return INTERMEDIATE_READING_6_EX9_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex10') {
    return INTERMEDIATE_READING_6_EX10_DETAIL;
  }
  if (id === 'pre-ielts-reading-2') {
    return PRE_IELTS_READING_2_DETAIL;
  }
  if (id === 'pre-ielts-reading-1') {
    return PRE_IELTS_READING_1_DETAIL;
  }
  if (id === 'pre-ielts-listening-1') {
    return PRE_IELTS_LISTENING_1_DETAIL;
  }
  return null;
}
