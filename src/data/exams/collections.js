// Exam collections data
// Full collection of all mock exam entries
// Individual detailed exams are in collections/ subfolder

import { VOL1_LIS_1 } from './collections/vol1-lis-1.js';
import { VOL1_READ_1 } from './collections/vol1-read-1.js';
import { VOL1_LIS_2 } from './collections/vol1-lis-2.js';
import { VOL1_READ_2 } from './collections/vol1-read-2.js';

export const EXAM_COLLECTIONS = [
  VOL1_LIS_1,
  VOL1_READ_1,
  VOL1_LIS_2,
  VOL1_READ_2,
  {
    id: 'vol2-lis-1',
    vol: 2,
    testNum: 1,
    title: 'IELTS Collection 2 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 148200,
    commentsCount: 230,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol2-read-1',
    vol: 2,
    testNum: 1,
    title: 'IELTS Collection 2 Reading Test 1',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 112450,
    commentsCount: 184,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading']
  },
  {
    id: 'vol3-lis-1',
    vol: 3,
    testNum: 1,
    title: 'IELTS Collection 3 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 98400,
    commentsCount: 156,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol4-lis-1',
    vol: 4,
    testNum: 1,
    title: 'IELTS Collection 4 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 76500,
    commentsCount: 110,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol5-lis-1',
    vol: 5,
    testNum: 1,
    title: 'IELTS Collection 5 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 65100,
    commentsCount: 95,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol6-lis-1',
    vol: 6,
    testNum: 1,
    title: 'IELTS Collection 6 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 58900,
    commentsCount: 82,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol7-lis-1',
    vol: 7,
    testNum: 1,
    title: 'IELTS Collection 7 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 49200,
    commentsCount: 68,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol8-lis-1',
    vol: 8,
    testNum: 1,
    title: 'IELTS Collection 8 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 41800,
    commentsCount: 54,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol9-lis-1',
    vol: 9,
    testNum: 1,
    title: 'IELTS Collection 9 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 36700,
    commentsCount: 49,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },

  // TIẾNG ANH THCS (LỚP 6 - 9 GLOBAL SUCCESS)
  {
    id: 'thcs-grade9-hk1',
    title: 'Đề thi Học kỳ 1 Tiếng Anh 9 - Global Success',
    category: 'Tiếng Anh THCS',
    skill: 'Reading',
    duration: 60,
    participants: 45200,
    commentsCount: 112,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#Tiếng Anh THCS', '#Lớp 9', '#Global Success'],
    parts: [
      { id: 1, title: 'Phần 1', name: 'Phonetics & Language Focus', questionRange: '1–10', questionCount: 10, tags: ['#Trắc nghiệm ngữ âm'] },
      { id: 2, title: 'Phần 2', name: 'Reading Comprehension 1', questionRange: '11–20', questionCount: 10, tags: ['#Đọc hiểu'] },
      { id: 3, title: 'Phần 3', name: 'Reading Comprehension 2 (Cloze Test)', questionRange: '21–30', questionCount: 10, tags: ['#Điền từ'] },
      { id: 4, title: 'Phần 4', name: 'Sentence Transformation', questionRange: '31–40', questionCount: 10, tags: ['#Viết lại câu'] }
    ]
  },
  {
    id: 'thcs-tuyensinh10-1',
    title: 'Đề thi thử Tuyển sinh vào lớp 10 THPT môn Tiếng Anh (Đề số 1)',
    category: 'Tiếng Anh THCS',
    skill: 'Reading',
    duration: 60,
    participants: 78900,
    commentsCount: 245,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#Tiếng Anh THCS', '#Vào lớp 10', '#Đề thi thử'],
    parts: [
      { id: 1, title: 'Phần 1', name: 'Ngữ âm & Trọng âm', questionRange: '1–10', questionCount: 10, tags: ['#Phonetics'] },
      { id: 2, title: 'Phần 2', name: 'Ngữ pháp & Từ vựng', questionRange: '11–20', questionCount: 10, tags: ['#Grammar'] },
      { id: 3, title: 'Phần 3', name: 'Đọc hiểu & Điền khuyết', questionRange: '21–30', questionCount: 10, tags: ['#Reading'] },
      { id: 4, title: 'Phần 4', name: 'Giao tiếp & Tìm lỗi sai', questionRange: '31–40', questionCount: 10, tags: ['#Communication'] }
    ]
  },

  // TIẾNG ANH THPT (LỚP 10 - 12 & THPTQG)
  {
    id: 'thpt-qg-2026-1',
    title: 'Đề thi thử Tốt nghiệp THPT 2026 - Môn Tiếng Anh (Đề chuẩn minh họa)',
    category: 'Tiếng Anh THPT',
    skill: 'Reading',
    duration: 50,
    participants: 128400,
    commentsCount: 380,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#Tiếng Anh THPT', '#THPTQG 2026', '#Global Success'],
    parts: [
      { id: 1, title: 'Phần 1', name: 'Quảng cáo & Thông báo (Format mới)', questionRange: '1–12', questionCount: 12, tags: ['#Đọc hiểu đời sống'] },
      { id: 2, title: 'Phần 2', name: 'Sắp xếp trật tự đoạn văn / bức thư', questionRange: '13–17', questionCount: 5, tags: ['#Logic đoạn văn'] },
      { id: 3, title: 'Phần 3', name: 'Điền từ vào đoạn văn học thuật', questionRange: '18–22', questionCount: 5, tags: ['#Cloze text'] },
      { id: 4, title: 'Phần 4', name: 'Bài đọc hiểu chuyên sâu (Reading Comprehension)', questionRange: '23–40', questionCount: 18, tags: ['#Đọc hiểu nâng cao'] }
    ]
  },
  {
    id: 'thpt-grade12-hk1',
    title: 'Đề thi Học kỳ 1 Tiếng Anh 12 - Global Success',
    category: 'Tiếng Anh THPT',
    skill: 'Reading',
    duration: 45,
    participants: 62100,
    commentsCount: 154,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#Tiếng Anh THPT', '#Lớp 12', '#Global Success'],
    parts: [
      { id: 1, title: 'Phần 1', name: 'Phonetics & Stress', questionRange: '1–8', questionCount: 8, tags: ['#Ngữ âm'] },
      { id: 2, title: 'Phần 2', name: 'Vocabulary & Grammar in Context', questionRange: '9–20', questionCount: 12, tags: ['#Ngữ pháp'] },
      { id: 3, title: 'Phần 3', name: 'Reading Comprehension', questionRange: '21–32', questionCount: 12, tags: ['#Đọc hiểu'] },
      { id: 4, title: 'Phần 4', name: 'Sentence Rewriting & Combining', questionRange: '33–40', questionCount: 8, tags: ['#Viết câu'] }
    ]
  },

  // TIẾNG ANH A2 -> C1 (CAMBRIDGE & CEFR)
  {
    id: 'cefr-b1-pet-1',
    title: 'Cambridge English: B1 Preliminary (PET) Reading Test 1',
    category: 'Tiếng Anh A2 -> C1',
    skill: 'Reading',
    duration: 45,
    participants: 51200,
    commentsCount: 98,
    partsCount: 6,
    questionsCount: 32,
    tags: ['#Tiếng Anh A2 -> C1', '#B1 Preliminary', '#PET'],
    parts: [
      { id: 1, title: 'Part 1', name: 'Signs and Notices (Multiple Choice)', questionRange: '1–5', questionCount: 5, tags: ['#Notices'] },
      { id: 2, title: 'Part 2', name: 'Matching People to Descriptions', questionRange: '6–10', questionCount: 5, tags: ['#Matching'] },
      { id: 3, title: 'Part 3', name: 'Four-option Multiple Choice', questionRange: '11–15', questionCount: 5, tags: ['#Multiple Choice'] },
      { id: 4, title: 'Part 4', name: 'Gapped Text', questionRange: '16–20', questionCount: 5, tags: ['#Gapped Text'] },
      { id: 5, title: 'Part 5', name: 'Four-option Cloze', questionRange: '21–26', questionCount: 6, tags: ['#Cloze'] },
      { id: 6, title: 'Part 6', name: 'Open Cloze', questionRange: '27–32', questionCount: 6, tags: ['#Open Cloze'] }
    ]
  },
  {
    id: 'cefr-b2-fce-1',
    title: 'Cambridge English: B2 First (FCE) Reading & Use of English Test 1',
    category: 'Tiếng Anh A2 -> C1',
    skill: 'Reading',
    duration: 75,
    participants: 43500,
    commentsCount: 87,
    partsCount: 7,
    questionsCount: 52,
    tags: ['#Tiếng Anh A2 -> C1', '#B2 First', '#FCE'],
    parts: [
      { id: 1, title: 'Part 1', name: 'Multiple-choice cloze', questionRange: '1–8', questionCount: 8, tags: ['#Cloze'] },
      { id: 2, title: 'Part 2', name: 'Open cloze', questionRange: '9–16', questionCount: 8, tags: ['#Grammar'] },
      { id: 3, title: 'Part 3', name: 'Word formation', questionRange: '17–24', questionCount: 8, tags: ['#Word formation'] },
      { id: 4, title: 'Part 4', name: 'Key word transformation', questionRange: '25–30', questionCount: 6, tags: ['#Transformation'] },
      { id: 5, title: 'Part 5', name: 'Reading - Multiple Choice', questionRange: '31–36', questionCount: 6, tags: ['#Reading'] },
      { id: 6, title: 'Part 6', name: 'Gapped text', questionRange: '37–42', questionCount: 6, tags: ['#Gapped text'] },
      { id: 7, title: 'Part 7', name: 'Multiple matching', questionRange: '43–52', questionCount: 10, tags: ['#Matching'] }
    ]
  },
  {
    id: 'cefr-a2-ket-1',
    title: 'Cambridge English: A2 Key (KET) Reading & Writing Test 1',
    category: 'Tiếng Anh A2 -> C1',
    skill: 'Reading',
    duration: 60,
    participants: 38900,
    commentsCount: 72,
    partsCount: 5,
    questionsCount: 30,
    tags: ['#Tiếng Anh A2 -> C1', '#A2 Key', '#KET'],
    parts: [
      { id: 1, title: 'Part 1', name: 'Multiple Choice Notices', questionRange: '1–6', questionCount: 6, tags: ['#Notices'] },
      { id: 2, title: 'Part 2', name: 'Matching 3 Short Texts', questionRange: '7–13', questionCount: 7, tags: ['#Matching'] },
      { id: 3, title: 'Part 3', name: 'Multiple Choice Reading', questionRange: '14–18', questionCount: 5, tags: ['#Multiple Choice'] },
      { id: 4, title: 'Part 4', name: 'Multiple Choice Cloze', questionRange: '19–24', questionCount: 6, tags: ['#Cloze'] },
      { id: 5, title: 'Part 5', name: 'Open Cloze Text', questionRange: '25–30', questionCount: 6, tags: ['#Open Cloze'] }
    ]
  }
];
