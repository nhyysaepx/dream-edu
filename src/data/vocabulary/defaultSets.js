// Default vocabulary sets catalog
// Imports each individual vocabulary set and provides DEFAULT_VOCAB_SETS

import { UNIT_1_GLOBAL_SUCCESS_10_SET } from './sets/unit-1-global-success-10.js';
import { PRE_IELTS_READING_1_SET } from './sets/pre-ielts-reading-1.js';
import { PRE_IELTS_READING_2_SET } from './sets/pre-ielts-reading-2.js';
import { PRE_IELTS_LISTENING_2_SET } from './sets/pre-ielts-listening-2.js';
import { INTERMEDIATE_READING_6_SET } from './sets/intermediate-reading-6.js';
import { INTERMEDIATE_LISTENING_6_SET } from './sets/intermediate-listening-6.js';
import { INTERMEDIATE_READING_7_SET } from './sets/intermediate-reading-7.js';
import { IELTS_VOL1_TEST2_LISTENING_SET } from './sets/ielts-vol1-test2-listening.js';
import { IELTS_VOL1_TEST2_READING_SET } from './sets/ielts-vol1-test2-reading.js';

export const DEFAULT_VOCAB_SETS = [
  // Tiếng Anh phổ thông (Lớp 6 - 12)
  UNIT_1_GLOBAL_SUCCESS_10_SET,

  // Lộ trình IELTS - Pre-IELTS
  PRE_IELTS_READING_1_SET,
  PRE_IELTS_READING_2_SET,
  PRE_IELTS_LISTENING_2_SET,

  // Lộ trình IELTS - Intermediate
  INTERMEDIATE_READING_6_SET,
  INTERMEDIATE_LISTENING_6_SET,
  INTERMEDIATE_READING_7_SET,

  // Lộ trình IELTS - IELTS Collection 1 (Test 2)
  IELTS_VOL1_TEST2_LISTENING_SET,
  IELTS_VOL1_TEST2_READING_SET,
];
