// Homework module - barrel export
// Re-exports all homework data and the lookup function

export { HOMEWORK_LEVELS } from './levels.js';
export { HOMEWORK_LIST } from './list.js';

export { PRE_IELTS_LISTENING_1_DETAIL } from './details/pre-ielts-listening-1.js';
export { PRE_IELTS_READING_1_DETAIL } from './details/pre-ielts-reading-1.js';
export { PRE_IELTS_READING_2_DETAIL } from './details/pre-ielts-reading-2.js';
export {
  INTERMEDIATE_READING_6_EX8_DETAIL,
  INTERMEDIATE_READING_6_EX9_DETAIL,
  INTERMEDIATE_READING_6_EX10_DETAIL,
  INTERMEDIATE_READING_6_DETAIL,
} from './details/intermediate-reading-6.js';
export {
  INTERMEDIATE_READING_7_P1_DETAIL,
  INTERMEDIATE_READING_7_P2_DETAIL,
  INTERMEDIATE_READING_7_P3_DETAIL,
  INTERMEDIATE_READING_7_DETAIL,
} from './details/intermediate-reading-7.js';
export { INTERMEDIATE_LISTENING_6_DETAIL } from './details/intermediate-listening-6.js';

export { getHomeworkDetailById } from './getHomeworkDetailById.js';
