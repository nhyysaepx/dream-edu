// Vocabulary module - barrel export
// Re-exports all vocabulary sets, categories, and storage helpers

export { CATEGORIES } from './categories.js';
export { DEFAULT_VOCAB_SETS } from './defaultSets.js';

export { UNIT_1_GLOBAL_SUCCESS_10_SET } from './sets/unit-1-global-success-10.js';
export { PRE_IELTS_READING_1_SET } from './sets/pre-ielts-reading-1.js';
export { PRE_IELTS_READING_2_SET } from './sets/pre-ielts-reading-2.js';
export { PRE_IELTS_LISTENING_2_SET } from './sets/pre-ielts-listening-2.js';
export { INTERMEDIATE_READING_6_SET } from './sets/intermediate-reading-6.js';
export { INTERMEDIATE_LISTENING_6_SET } from './sets/intermediate-listening-6.js';
export { INTERMEDIATE_READING_7_SET } from './sets/intermediate-reading-7.js';
export { IELTS_VOL1_TEST2_LISTENING_SET } from './sets/ielts-vol1-test2-listening.js';
export { IELTS_VOL1_TEST2_READING_SET } from './sets/ielts-vol1-test2-reading.js';

export { getVocabSetById } from './getVocabSetById.js';

export {
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
} from './storage.js';
