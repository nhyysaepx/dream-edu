// Practice categories matching Tab Từ vựng (ielts, school, cefr)
export const PRACTICE_CATEGORIES = [
  {
    id: 'ielts',
    label: 'Lộ trình IELTS - Dream Education',
    shortLabel: 'Lộ trình IELTS',
    description: 'Luyện tập thao tác thi trên máy (Highlight, Note, Copy-Paste, Word limit check) cho từng dạng bài Reading & Listening theo band điểm chuẩn IELTS.',
    levels: [
      { id: 'ielts-beginner', name: 'IELTS Beginner', badge: 'Band 3.0 - 4.0' },
      { id: 'pre-ielts', name: 'Pre-IELTS', badge: 'Band 4.0 - 5.0 (Trọng tâm)', isHot: true },
      { id: 'ielts-foundation', name: 'IELTS Intermediate', badge: 'Band 5.0 - 6.0' },
      { id: 'ielts-advanced', name: 'IELTS Advanced', badge: 'Band 6.5+' }
    ]
  },
  {
    id: 'school',
    label: 'Tiếng Anh Phổ Thông (6 - 12)',
    shortLabel: 'Tiếng Anh Phổ Thông (THCS & THPT)',
    description: 'Hệ thống bài luyện tập kỹ năng Reading & Listening bám sát theo các Unit trong chương trình SGK Global Success từ Lớp 6 đến Lớp 12.',
    levels: [
      { id: 'grade-6', name: 'Lớp 6', badge: 'THCS - Global Success' },
      { id: 'grade-7', name: 'Lớp 7', badge: 'THCS - Global Success' },
      { id: 'grade-8', name: 'Lớp 8', badge: 'THCS - Global Success' },
      { id: 'grade-9', name: 'Lớp 9', badge: 'THCS - Global Success' },
      { id: 'grade-10', name: 'Lớp 10', badge: 'THPT - Global Success (Trọng tâm)', isHot: true },
      { id: 'grade-11', name: 'Lớp 11', badge: 'THPT - Global Success' },
      { id: 'grade-12', name: 'Lớp 12', badge: 'THPT - Global Success' }
    ]
  },
  {
    id: 'cefr',
    label: 'Khung chuẩn Châu Âu CEFR (A2 ➔ C1)',
    shortLabel: 'Khung CEFR (A2 - C1)',
    description: 'Bộ bài tập luyện đọc và nghe theo chuẩn khung năng lực ngoại ngữ Châu Âu từ sơ trung cấp A2 đến cao cấp C1.',
    levels: [
      { id: 'a2', name: 'Level A2', badge: 'Pre-Intermediate' },
      { id: 'b1', name: 'Level B1', badge: 'Intermediate' },
      { id: 'b2', name: 'Level B2', badge: 'Upper-Intermediate' },
      { id: 'c1', name: 'Level C1', badge: 'Advanced' }
    ]
  }
];
