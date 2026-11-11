// =============================================================================
// BACKWARD-COMPATIBLE BARREL FILE
// =============================================================================
// This file re-exports everything from the new modular exams/ directory
// so that existing imports like:
//   import { EXAM_COLLECTIONS, FILTER_CATEGORIES } from '../data/examData'
// continue to work without changes.
// =============================================================================

export {
  EXAM_COLLECTIONS,
  FILTER_CATEGORIES,
} from './exams/index.js';
