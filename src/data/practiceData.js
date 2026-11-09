import { PRE_IELTS_READING_1_DETAIL, PRE_IELTS_LISTENING_1_DETAIL } from './homeworkData.js';

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
      { id: 'ielts-foundation', name: 'IELTS Foundation', badge: 'Band 5.0 - 6.0' },
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

// Detail for Reading 2 - IELTS PRE (User request)
export const PRE_IELTS_READING_2_PRACTICE_DETAIL = {
  id: 'pre-ielts-reading-2',
  title: 'PRACTICE - Reading 2 - Sentence Completion',
  level: 'Pre IELTS',
  session: 'Buổi 2 - Luyện tập trên lớp (In-Class Practice)',
  skill: 'Reading',
  skillBadge: 'IELTS Reading (Sentence Completion)',
  description: 'Thực hành thao tác làm bài thi Computer-based IELTS: Tô màu từ khóa (Highlight), Tạo ghi chú (Note), Sao chép - Dán nhanh và kiểm soát giới hạn từ NO MORE THAN THREE WORDS.',
  totalQuestions: 6,
  duration: '20 - 30 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'A Warm Welcome in Germany',
      shortTitle: 'Passage: A Warm Welcome',
      wordLimit: 'NO MORE THAN THREE WORDS',
      maxWords: 3,
      instruction: 'Read the passage and complete the sentences below. Choose NO MORE THAN THREE WORDS from the passage for each answer.',
      content: `I remember feeling the first time I left home that I would never be able to feel at home anywhere but in my home. No other place would have my mum and dad, my annoying little brother and my cat, Tilly. Nowhere would smell like my home – my mum’s roast chicken in the oven and the salty, seaweed smell that drifted in from the nearby beach. The sounds of seagulls squawking was the sound of home. Nowhere else would I feel comfortable enough to put my feet up under me and gaze into the log fire dreaming of the future.

I was 15 when I first went away from home on a school trip to Germany. My friends were going too, but we would stay with different families. I was nervous about this. I knew the home I was going to would not be as comfortable as mine, the family would not be as kind, and who knew what the German food would be like? I knew I would spend three weeks, homesick and sad, missing my family back home.

We arrived in Germany late at night after a long journey by coach and boat. I was tired and hungry. We went into the school hall, where the host families were waiting to meet us. I wondered which one would be mine. Would they give me dinner at this time and would I be able to eat the unfamiliar food? Suddenly I heard my name called and the name of my exchange partner, Brigitte Schmitt.

A pretty, blonde girl stepped forward, smiling widely. Behind her stood her parents, a pleasant-looking couple who were also smiling. They held out their hands and said, ‘Willkommen in Deutschland. Welcome to Germany.’

I spent three happy weeks with the Schmitt family. Brigitte had an elder brother, Hendrik, and a younger sister, Lisa. They had two cats, Ping and Pong who sat on my lap as I looked into the fire in the evenings. The whole family were kind and welcoming. My room was cosy and warm and looked out onto a forest. The fresh clean smell of the trees and of apples baking in the oven became familiar and comforting, like the smells of home. I learnt in those three weeks that you can feel at home anywhere that people are kind to you.

Later that year, Brigitte came to stay with me in the UK. I gave her my room and moved in with my brother. I cleared space for her clothes and put fresh flowers in a vase by the bed. I asked my mum to make her famous roast chicken and an apple pie to make our guests feel at home. We made a welcome banner and put it on the front door. I did everything I could to help Brigitte feel at home with us.

I now understood the importance of a warm welcome.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          question: 'The writer’s mother often cooks __________.',
          placeholder: 'Điền đáp án câu 1...',
          primaryAnswer: 'roast chicken',
          acceptedAnswers: [
            'roast chicken',
            'her famous roast chicken',
            'famous roast chicken',
            'a roast chicken',
            'chicken',
            'roast chicken and an apple pie'
          ],
          evidence: 'Nowhere would smell like my home – my mum’s roast chicken in the oven... / I asked my mum to make her famous roast chicken and an apple pie...',
          explanation: 'Ở đoạn 1 và đoạn 6, bài đọc nhắc đến món ăn mẹ tác giả thường nấu là gà quay nướng trong lò: "my mum’s roast chicken in the oven" và "her famous roast chicken".'
        },
        {
          id: 'p1_q2',
          number: 2,
          question: 'She thought the visit to Germany would make her feel __________.',
          placeholder: 'Điền đáp án câu 2...',
          primaryAnswer: 'homesick and sad',
          acceptedAnswers: [
            'homesick and sad',
            'sad and homesick',
            'homesick',
            'sad',
            'homesick, sad'
          ],
          evidence: 'I knew I would spend three weeks, homesick and sad, missing my family back home.',
          explanation: 'Ở đoạn 2, cô bé từng lo lắng và nghĩ rằng chuyến đi Đức kéo dài 3 tuần sẽ khiến mình cảm thấy nhớ nhà và buồn bã: "I knew I would spend three weeks, homesick and sad, missing my family back home."'
        },
        {
          id: 'p1_q3',
          number: 3,
          question: 'Brigitte came to pick up the girl with __________.',
          placeholder: 'Điền đáp án câu 3...',
          primaryAnswer: 'her parents',
          acceptedAnswers: [
            'her parents',
            'parents',
            'the parents',
            'Brigitte’s parents',
            "Brigitte's parents"
          ],
          evidence: 'A pretty, blonde girl stepped forward, smiling widely. Behind her stood her parents, a pleasant-looking couple who were also smiling.',
          explanation: 'Đoạn 4 nêu rõ: khi nghe gọi tên, Brigitte Schmitt bước tới mỉm cười và đứng ngay phía sau cô ấy là bố mẹ mình: "Behind her stood her parents, a pleasant-looking couple who were also smiling."'
        },
        {
          id: 'p1_q4',
          number: 4,
          question: 'The Schmitt family’s pets’ names are __________.',
          placeholder: 'Điền đáp án câu 4...',
          primaryAnswer: 'Ping and Pong',
          acceptedAnswers: [
            'Ping and Pong',
            'Ping & Pong',
            'Ping, Pong',
            'two cats, Ping and Pong'
          ],
          evidence: 'They had two cats, Ping and Pong who sat on my lap as I looked into the fire in the evenings.',
          explanation: 'Đoạn 5 cho biết gia đình Schmitt có nuôi hai chú mèo thú cưng tên là Ping và Pong: "They had two cats, Ping and Pong who sat on my lap..."'
        },
        {
          id: 'p1_q5',
          number: 5,
          question: 'From her bedroom the girl could see a __________.',
          placeholder: 'Điền đáp án câu 5...',
          primaryAnswer: 'forest',
          acceptedAnswers: [
            'forest',
            'green forest',
            'nearby forest',
            'view of a forest'
          ],
          evidence: 'My room was cosy and warm and looked out onto a forest.',
          explanation: 'Đoạn 5: "My room was cosy and warm and looked out onto a forest." Căn phòng của cô bé nhìn thẳng ra một khu rừng. Vì trước chỗ trống đã có sẵn mạo từ "a", từ cần điền là "forest".'
        },
        {
          id: 'p1_q6',
          number: 6,
          question: 'The girl and her family tried hard to make Brigitte __________.',
          placeholder: 'Điền đáp án câu 6...',
          primaryAnswer: 'feel at home',
          acceptedAnswers: [
            'feel at home',
            'feel welcome',
            'feel comfortable',
            'at home'
          ],
          evidence: 'I asked my mum to make her famous roast chicken and an apple pie to make our guests feel at home. ... I did everything I could to help Brigitte feel at home with us.',
          explanation: 'Đoạn 6 nêu rõ: "...to make our guests feel at home. ... I did everything I could to help Brigitte feel at home with us." Cô bé và gia đình làm mọi cách để Brigitte cảm thấy tự nhiên, ấm cúng như ở nhà.'
        }
      ]
    }
  ]
};

// Full list of in-class practice assignments
export const PRACTICE_LIST = [
  // ==================== IELTS PRE ====================
  {
    id: 'pre-ielts-reading-2',
    category: 'ielts',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 2',
    skill: 'Reading',
    title: 'Reading 2: Sentence Completion (A Warm Welcome)',
    description: 'Luyện tập kỹ thuật Sentence Completion (NO MORE THAN THREE WORDS) qua bài đọc về chuyến trao đổi văn hóa tại Đức và bài học sâu sắc về sự hiếu khách.',
    totalQuestions: 6,
    duration: '20 - 30 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 1,
    audioTracksCount: 0,
    tag: 'Pre-Intermediate 4.0 - 5.0',
    isFeatured: true
  },
  {
    id: 'pre-ielts-reading-1',
    category: 'ielts',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 1',
    skill: 'Reading',
    title: 'Reading 1: Short-answer Questions (The Value of Friendship)',
    description: 'Chiến thuật tìm từ khóa và quét nhanh thông tin với dạng bài Short-answer Questions (NO MORE THAN THREE WORDS AND/OR A NUMBER).',
    totalQuestions: 12,
    duration: '35 - 45 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Pre-Intermediate 4.0 - 5.0'
  },
  {
    id: 'pre-ielts-listening-1',
    category: 'ielts',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Friends Abroad (Names, Numbers & Notes)',
    description: 'Luyện kỹ năng nghe bắt thông tin cá nhân, phân biệt số -teen & -ty, ghi chép ngày tháng, địa chỉ và điền đơn đặt phòng khách sạn Silver Tulip.',
    totalQuestions: 29,
    duration: '40 - 50 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 7,
    audioTracksCount: 9,
    tag: 'Pre-Intermediate A2+'
  },
  {
    id: 'pre-ielts-listening-2',
    category: 'ielts',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 2',
    skill: 'Listening',
    title: 'Listening 2: Places & Directions (Campus Map)',
    description: 'Nhận diện phương hướng trên bản đồ, xác định vị trí các tòa nhà và từ chỉ dẫn không gian trong trường học.',
    totalQuestions: 25,
    duration: '40 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 5,
    audioTracksCount: 6,
    tag: 'Pre-Intermediate A2+'
  },

  // ==================== IELTS BEGINNER ====================
  {
    id: 'beginner-reading-1',
    category: 'ielts',
    levelId: 'ielts-beginner',
    levelLabel: 'IELTS Beginner',
    session: 'Buổi 1',
    skill: 'Reading',
    title: 'Reading 1: Notices, Schedules & Basic Vocabulary',
    description: 'Làm quen với việc đọc biển báo công cộng, bảng giờ tàu xe và áp phích thông báo thường ngày.',
    totalQuestions: 15,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Beginner 3.0+'
  },
  {
    id: 'beginner-listening-1',
    category: 'ielts',
    levelId: 'ielts-beginner',
    levelLabel: 'IELTS Beginner',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Alphabet, Spelling & Phone Numbers',
    description: 'Luyện nghe phát âm bảng chữ cái chuẩn Anh - Anh, đánh vần tên riêng, địa chỉ email và ghi chép số điện thoại.',
    totalQuestions: 20,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 4,
    audioTracksCount: 4,
    tag: 'Beginner 3.0+'
  },

  // ==================== IELTS FOUNDATION ====================
  {
    id: 'foundation-reading-1',
    category: 'ielts',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Foundation',
    session: 'Buổi 1',
    skill: 'Reading',
    title: 'Reading 1: True / False / Not Given Mastery',
    description: 'Phân biệt rạch ròi giữa False (thông tin trái ngược) và Not Given (không đề cập) trong các đoạn văn học thuật ngắn.',
    totalQuestions: 18,
    duration: '40 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Foundation 5.0+'
  },
  {
    id: 'foundation-listening-1',
    category: 'ielts',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Foundation',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Form & Table Completion Mastery',
    description: 'Kỹ thuật nghe Section 1: bẫy tự sửa thông tin (self-correction), quy tắc viết hoa danh từ riêng và mã bưu chính Anh.',
    totalQuestions: 20,
    duration: '35 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 4,
    audioTracksCount: 4,
    tag: 'Foundation 5.0+'
  },

  // ==================== IELTS ADVANCED ====================
  {
    id: 'advanced-reading-1',
    category: 'ielts',
    levelId: 'ielts-advanced',
    levelLabel: 'IELTS Advanced',
    session: 'Buổi 1',
    skill: 'Reading',
    title: 'Reading 1: Matching Headings & Summary Completion',
    description: 'Chiến thuật xác định ý chính đoạn văn (Main Idea vs Supporting Details) trong bài đọc học thuật Cambridge.',
    totalQuestions: 20,
    duration: '45 phút',
    status: 'open',
    dueDate: 'Luyện tập trực tiếp trên lớp',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Advanced 6.5+'
  },

  // ==================== TIẾNG ANH PHỔ THÔNG (6 - 12) ====================
  {
    id: 'grade-10-reading-1',
    category: 'school',
    levelId: 'grade-10',
    levelLabel: 'Lớp 10',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: Family Life & Daily Routines',
    description: 'Luyện đọc hiểu văn bản về đời sống gia đình và phân chia công việc nhà (Global Success Tiếng Anh 10).',
    totalQuestions: 12,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 10'
  },
  {
    id: 'grade-10-reading-2',
    category: 'school',
    levelId: 'grade-10',
    levelLabel: 'Lớp 10',
    session: 'Unit 2',
    skill: 'Reading',
    title: 'Reading: Humans and the Environment',
    description: 'Bài đọc về lối sống xanh, giảm thiểu rác thải nhựa và bảo vệ hệ sinh thái.',
    totalQuestions: 10,
    duration: '25 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 10'
  },
  {
    id: 'grade-6-reading-1',
    category: 'school',
    levelId: 'grade-6',
    levelLabel: 'Lớp 6',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: My New School & Friends',
    description: 'Đọc hiểu đoạn văn miêu tả trường học mới, bạn bè và thời khóa biểu học tập.',
    totalQuestions: 10,
    duration: '25 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 6'
  },
  {
    id: 'grade-7-reading-1',
    category: 'school',
    levelId: 'grade-7',
    levelLabel: 'Lớp 7',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: Hobbies & Free Time Activities',
    description: 'Đọc hiểu về các sở thích lành mạnh, làm đồ thủ công và sưu tập tem.',
    totalQuestions: 10,
    duration: '25 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 7'
  },
  {
    id: 'grade-8-reading-1',
    category: 'school',
    levelId: 'grade-8',
    levelLabel: 'Lớp 8',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: Leisure Time & Teen Life',
    description: 'Luyện đọc các bài phỏng vấn học sinh về các hoạt động giải trí sau giờ học.',
    totalQuestions: 10,
    duration: '25 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 8'
  },
  {
    id: 'grade-9-reading-1',
    category: 'school',
    levelId: 'grade-9',
    levelLabel: 'Lớp 9',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: Local Community & Traditional Crafts',
    description: 'Đọc hiểu về làng nghề truyền thống gốm Bát Tràng và sự phát triển du lịch địa phương.',
    totalQuestions: 12,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 9'
  },
  {
    id: 'grade-11-reading-1',
    category: 'school',
    levelId: 'grade-11',
    levelLabel: 'Lớp 11',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: A Long and Healthy Life',
    description: 'Văn bản đọc hiểu về bí quyết sống thọ, dinh dưỡng cân bằng và tập luyện thể thao.',
    totalQuestions: 12,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 11'
  },
  {
    id: 'grade-12-reading-1',
    category: 'school',
    levelId: 'grade-12',
    levelLabel: 'Lớp 12',
    session: 'Unit 1',
    skill: 'Reading',
    title: 'Reading: Life Stories & Inspirations',
    description: 'Đọc hiểu tiểu sử các nhân vật truyền cảm hứng trong lịch sử thế giới.',
    totalQuestions: 12,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Global Success 12'
  },

  // ==================== KHUNG CHUẨN CEFR ====================
  {
    id: 'cefr-a2-reading-1',
    category: 'cefr',
    levelId: 'a2',
    levelLabel: 'Level A2',
    session: 'Lesson 1',
    skill: 'Reading',
    title: 'Reading: Travel Experiences & City Guide',
    description: 'Đọc hướng dẫn du lịch thành phố London và trả lời các câu hỏi trắc nghiệm A2.',
    totalQuestions: 10,
    duration: '25 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'CEFR A2'
  },
  {
    id: 'cefr-b1-reading-1',
    category: 'cefr',
    levelId: 'b1',
    levelLabel: 'Level B1',
    session: 'Lesson 1',
    skill: 'Reading',
    title: 'Reading: Modern Technology & Work Life',
    description: 'Đọc phân tích xu hướng làm việc từ xa (remote work) và tác động của công nghệ.',
    totalQuestions: 12,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'CEFR B1'
  },
  {
    id: 'cefr-b2-reading-1',
    category: 'cefr',
    levelId: 'b2',
    levelLabel: 'Level B2',
    session: 'Lesson 1',
    skill: 'Reading',
    title: 'Reading: Environmental Policy & Innovation',
    description: 'Văn bản học thuật về chuyển dịch năng lượng tái tạo và thỏa thuận khí hậu.',
    totalQuestions: 15,
    duration: '35 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'CEFR B2'
  },
  {
    id: 'cefr-c1-reading-1',
    category: 'cefr',
    levelId: 'c1',
    levelLabel: 'Level C1',
    session: 'Lesson 1',
    skill: 'Reading',
    title: 'Reading: Cognitive Psychology & Decision Making',
    description: 'Bài đọc chuyên sâu về tâm lý học hành vi và quá trình ra quyết định của con người.',
    totalQuestions: 18,
    duration: '45 phút',
    status: 'open',
    dueDate: 'Luyện tập trên lớp',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'CEFR C1'
  }
];

// Helper to get practice assignment detail by ID
export function getPracticeDetailById(id) {
  if (id === 'pre-ielts-reading-2') {
    return PRE_IELTS_READING_2_PRACTICE_DETAIL;
  }
  if (id === 'pre-ielts-reading-1') {
    return {
      ...PRE_IELTS_READING_1_DETAIL,
      id: 'pre-ielts-reading-1',
      session: 'Buổi 1 - Luyện tập trên lớp (In-Class Practice)',
      title: 'PRACTICE - Reading 1 - Short-answer Questions'
    };
  }
  if (id === 'pre-ielts-listening-1') {
    return {
      ...PRE_IELTS_LISTENING_1_DETAIL,
      id: 'pre-ielts-listening-1',
      session: 'Buổi 1 - Luyện tập trên lớp (In-Class Practice)',
      title: 'PRACTICE - Listening 1 - Friends Abroad'
    };
  }

  // Fallback to reading 2 practice detail
  return PRE_IELTS_READING_2_PRACTICE_DETAIL;
}
