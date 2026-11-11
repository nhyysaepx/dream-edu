// Exam collections data
// Full collection of all mock exam entries
// Individual detailed exams are in collections/ subfolder

import { VOL1_LIS_1 } from './collections/vol1-lis-1.js';
import { VOL1_READ_1 } from './collections/vol1-read-1.js';

export const EXAM_COLLECTIONS = [
  VOL1_LIS_1,
  VOL1_READ_1,
  {
    id: 'vol1-lis-2',
    vol: 1,
    testNum: 2,
    title: 'IELTS Collection 1 Listening Test 2',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 193596,
    commentsCount: 314,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Customer Service Inquiry', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Museum Guide', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Project Meeting', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Renewable Energy', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Sentence Completion'] }
    ]
  },
  {
    id: 'vol1-read-2',
    vol: 1,
    testNum: 2,
    title: 'IELTS Collection 1 Reading Test 2',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 123519,
    commentsCount: 291,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading'],
    parts: [
      { id: 1, title: 'Passage 1', name: 'Urban Agriculture Innovations', questionRange: '1–13', questionCount: 13, tags: ['#[Reading] True/False/Not Given'] },
      { id: 2, title: 'Passage 2', name: 'The Secret Life of Whales', questionRange: '14–26', questionCount: 13, tags: ['#[Reading] Headings Matching'] },
      { id: 3, title: 'Passage 3', name: 'Artificial Intelligence and Human Labor', questionRange: '27–40', questionCount: 14, tags: ['#[Reading] Multiple Choice'] }
    ]
  },
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
  }
];
