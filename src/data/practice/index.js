// Practice module - barrel export
// Re-exports all practice data and the lookup function

export { PRACTICE_CATEGORIES } from './categories.js';
export { PRACTICE_LIST } from './list.js';
export { REVISION_MIDTERM_1_ENGLISH_12_PRACTICE_DETAIL } from './details/revision-midterm-1-english-12.js';
export { IELTS_ADVANCED_READING_SUPPLEMENTARY_PRACTICE_DETAIL } from './details/ielts-advanced-reading-supplementary.js';
export { REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL } from './details/revision-midterm-1-english-10.js';
export { PRE_IELTS_READING_3_PRACTICE_DETAIL } from './details/pre-ielts-reading-3.js';
export { PRE_IELTS_READING_2_PRACTICE_DETAIL } from './details/pre-ielts-reading-2.js';
export { UNIT_4_GLOBAL_SUCCESS_9_PRACTICE_DETAIL } from './details/unit-4-global-success-9.js';
export { CEFR_B1_LISTENING_1_PRACTICE_DETAIL } from './details/cefr-b1-listening-1.js';
export { CEFR_B1_READING_1_PRACTICE_DETAIL } from './details/cefr-b1-reading-1.js';

export { getPracticeDetailById } from './getPracticeDetailById.js';
