// =============================================================================
// BACKWARD-COMPATIBLE BARREL FILE
// =============================================================================
// This file re-exports everything from the new modular practice/ directory
// so that existing imports like:
//   import { PRACTICE_CATEGORIES, PRACTICE_LIST } from '../data/practiceData'
// continue to work without changes.
// =============================================================================

export {
  PRACTICE_CATEGORIES,
  PRACTICE_LIST,
  INTERMEDIATE_READING_8_PRACTICE_DETAIL,
  REVISION_MIDTERM_1_ENGLISH_12_PRACTICE_DETAIL,
  IELTS_ADVANCED_READING_SUPPLEMENTARY_PRACTICE_DETAIL,
  REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL,
  PRE_IELTS_READING_3_PRACTICE_DETAIL,
  PRE_IELTS_READING_2_PRACTICE_DETAIL,
  PRE_IELTS_READING_1_PRACTICE_DETAIL,
  UNIT_4_GLOBAL_SUCCESS_9_PRACTICE_DETAIL,
  CEFR_B1_LISTENING_1_PRACTICE_DETAIL,
  CEFR_B1_READING_1_PRACTICE_DETAIL,
  getPracticeDetailById,
} from './practice/index.js';
