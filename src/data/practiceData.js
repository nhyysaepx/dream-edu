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
  PRE_IELTS_READING_2_PRACTICE_DETAIL,
  getPracticeDetailById,
} from './practice/index.js';
