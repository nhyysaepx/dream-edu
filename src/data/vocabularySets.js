// =============================================================================
// BACKWARD-COMPATIBLE BARREL FILE
// =============================================================================
// This file re-exports everything from the new modular vocabulary/ directory
// so that existing imports like:
//   import { getAllVocabSets, getVocabSetById } from '../data/vocabularySets'
// continue to work without changes.
// =============================================================================

export {
  CATEGORIES,
  DEFAULT_VOCAB_SETS,
  UNIT_1_GLOBAL_SUCCESS_10_SET,
  PRE_IELTS_READING_1_SET,
  PRE_IELTS_READING_2_SET,
  INTERMEDIATE_READING_6_SET,
  INTERMEDIATE_LISTENING_6_SET,
  INTERMEDIATE_READING_7_SET,
  IELTS_VOL1_TEST2_LISTENING_SET,
  IELTS_VOL1_TEST2_READING_SET,
  getVocabSetById,
  STORAGE_KEYS,
  getAllVocabSets,
  saveCustomVocabSet,
  deleteCustomVocabSet,
  getStarredTerms,
  toggleStarredTerm,
  getMasteryData,
  updateTermMastery,
  resetMastery,
  getMatchLeaderboard,
  recordMatchScore,
  generateShareableLink,
  importSharedSetFromUrl,
  downloadSetAsBackupFile,
} from './vocabulary/index.js';
