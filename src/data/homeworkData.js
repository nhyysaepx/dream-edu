// =============================================================================
// BACKWARD-COMPATIBLE BARREL FILE
// =============================================================================
// This file re-exports everything from the new modular homework/ directory
// so that existing imports like:
//   import { HOMEWORK_LEVELS, HOMEWORK_LIST } from '../data/homeworkData'
// continue to work without changes.
// =============================================================================

export {
  HOMEWORK_LEVELS,
  HOMEWORK_LIST,
  PRE_IELTS_LISTENING_1_DETAIL,
  PRE_IELTS_READING_1_DETAIL,
  PRE_IELTS_READING_2_DETAIL,
  INTERMEDIATE_READING_6_EX8_DETAIL,
  INTERMEDIATE_READING_6_EX9_DETAIL,
  INTERMEDIATE_READING_6_EX10_DETAIL,
  INTERMEDIATE_READING_6_DETAIL,
  getHomeworkDetailById,
} from './homework/index.js';
