export const HOMEWORK_LEVELS = [
  { id: 'ielts-beginner', label: 'IELTS Beginner', badge: 'Beginner (3.0 - 4.0)' },
  { id: 'pre-ielts', label: 'Pre IELTS', badge: 'Pre-Intermediate (4.0 - 5.0)' },
  { id: 'ielts-foundation', label: 'IELTS Intermediate', badge: 'Intermediate (5.0 - 6.5)' },
  { id: 'ielts-advanced', label: 'IELTS Advanced', badge: 'Upper-Intermediate+ (6.5+)' },
];

export const HOMEWORK_LIST = [
  {
    id: 'pre-ielts-listening-1',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Friends Abroad (Names & Numbers)',
    description: 'Luyện tập bắt thông tin cá nhân, phân biệt số đuôi -teen & -ty, ghi chép ngày tháng, địa chỉ và điền mẫu đặt phòng khách sạn Silver Tulip.',
    totalQuestions: 29,
    duration: '40 - 50 phút',
    status: 'open', // 'open' | 'submitted' | 'graded'
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 7,
    audioTracksCount: 9,
    tag: 'Pre-Intermediate A2+',
    isFeatured: true
  },
  {
    id: 'pre-ielts-listening-2',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 2',
    skill: 'Listening',
    title: 'Listening 2: Places & Directions',
    description: 'Nhận diện phương hướng trên bản đồ, ghi chú vị trí các tòa nhà và từ chỉ dẫn không gian trong khuôn viên trường học.',
    totalQuestions: 25,
    duration: '45 phút',
    status: 'upcoming',
    dueDate: 'Mở vào tuần tới',
    exercisesCount: 5,
    audioTracksCount: 6,
    tag: 'Pre-Intermediate A2+'
  },
  {
    id: 'pre-ielts-reading-1',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 1',
    skill: 'Reading',
    title: 'Reading 1: Short-answer Questions (The Value of Friendship)',
    description: 'Chiến thuật Short-answer Questions (NO MORE THAN THREE WORDS AND/OR A NUMBER) với 2 bài đọc về tình bạn tuổi thiếu niên và tình bạn thời đại số.',
    totalQuestions: 12,
    duration: '35 - 45 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Pre-Intermediate 4.0 - 5.0',
    isFeatured: true
  },
  {
    id: 'pre-ielts-reading-2',
    levelId: 'pre-ielts',
    levelLabel: 'Pre IELTS',
    session: 'Buổi 2',
    skill: 'Reading',
    title: 'Reading 2: The Body (Short-answer & Sentence Completion)',
    description: 'Kỹ thuật trả lời câu hỏi ngắn (NO MORE THAN FOUR WORDS) và hoàn thành câu (NO MORE THAN THREE WORDS) với bài đọc "The Body" về quan niệm cơ thể, sức khỏe và các yếu tố xã hội.',
    totalQuestions: 20,
    duration: '40 - 50 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Pre-Intermediate 4.0 - 5.0',
    isFeatured: true
  },
  {
    id: 'beginner-listening-1',
    levelId: 'ielts-beginner',
    levelLabel: 'IELTS Beginner',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Alphabet & Spelling Fundamentals',
    description: 'Nắm vững phát âm bảng chữ cái tiếng Anh, đánh vần tên riêng, email và số điện thoại chuẩn xác.',
    totalQuestions: 20,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 4,
    audioTracksCount: 4,
    tag: 'Beginner 3.0+'
  },
  {
    id: 'beginner-reading-1',
    levelId: 'ielts-beginner',
    levelLabel: 'IELTS Beginner',
    session: 'Buổi 2',
    skill: 'Reading',
    title: 'Reading 1: Basic Vocabulary & Short Notices',
    description: 'Làm quen với thông báo công cộng, áp phích và các từ vựng thiết yếu trong đời sống thường ngày.',
    totalQuestions: 18,
    duration: '35 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Beginner 3.0+'
  },
  {
    id: 'foundation-listening-1',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Foundation',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Section 1 Form Completion Mastery',
    description: 'Kỹ thuật chinh phục Section 1: tránh bẫy tự sửa lỗi, quy tắc viết hoa, đơn vị đo lường và mã bưu chính Anh.',
    totalQuestions: 20,
    duration: '40 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 4,
    audioTracksCount: 4,
    tag: 'Foundation 5.0+'
  },
  {
    id: 'foundation-reading-1',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Intermediate',
    session: 'Buổi 2',
    skill: 'Reading',
    title: 'Reading 1: True / False / Not Given Strategy',
    description: 'Phân biệt rạch ròi giữa False và Not Given với 15 bài tập ngắn từ các trích đoạn học thuật.',
    totalQuestions: 20,
    duration: '45 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 4,
    audioTracksCount: 0,
    tag: 'Foundation 5.0+'
  },
  {
    id: 'intermediate-reading-6',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Intermediate',
    session: 'Buổi 6',
    skill: 'Reading',
    title: 'Reading 6: Summary Completion & Youth: The Future of Travel',
    description: 'Trọn bộ 3 bài tập về nhà Reading 6: Bài 08 (Summary - Max 2 words), Bài 09 (Summary A & B - Max 1 word) và Bài 10 (Youth: The Future of Travel - Summary box & Multiple Choice).',
    totalQuestions: 27,
    duration: '50 - 60 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Intermediate 5.5 - 6.5',
    isFeatured: true
  },
  {
    id: 'intermediate-reading-6-ex8',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Intermediate',
    session: 'Buổi 6 - Bài 1',
    skill: 'Reading',
    title: 'Reading 6 - Bài 08: Communication in Business (Summary Completion)',
    description: 'Dạng bài Summary Completion - NO MORE THAN TWO WORDS về quy tắc giao tiếp văn bản và phi ngôn ngữ trong môi trường doanh nghiệp.',
    totalQuestions: 5,
    duration: '15 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 1,
    audioTracksCount: 0,
    tag: 'Intermediate 5.5 - 6.5'
  },
  {
    id: 'intermediate-reading-6-ex9',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Intermediate',
    session: 'Buổi 6 - Bài 2',
    skill: 'Reading',
    title: 'Reading 6 - Bài 09: Management & Interpersonal Skills (Summary A & B)',
    description: 'Dạng bài Summary Completion - NO MORE THAN ONE WORD chia làm 2 đoạn: Kỹ năng quản lý trong cuộc họp (Passage A) và Kỹ năng tương tác (Passage B).',
    totalQuestions: 9,
    duration: '20 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 2,
    audioTracksCount: 0,
    tag: 'Intermediate 5.5 - 6.5'
  },
  {
    id: 'intermediate-reading-6-ex10',
    levelId: 'ielts-foundation',
    levelLabel: 'IELTS Intermediate',
    session: 'Buổi 6 - Bài 3',
    skill: 'Reading',
    title: 'Reading 6 - Bài 10: Youth - The Future of Travel (Full Passage)',
    description: 'Bài đọc hoàn chỉnh về xu hướng du lịch giới trẻ gồm 3 dạng câu hỏi: Summary với khung từ (A–O), Chọn 3 đáp án (A–G) và Trắc nghiệm (A–D).',
    totalQuestions: 13,
    duration: '30 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 3,
    audioTracksCount: 0,
    tag: 'Intermediate 5.5 - 6.5'
  },
  {
    id: 'advanced-listening-1',
    levelId: 'ielts-advanced',
    levelLabel: 'IELTS Advanced',
    session: 'Buổi 1',
    skill: 'Listening',
    title: 'Listening 1: Academic Lectures (Section 4 Note Completion)',
    description: 'Luyện nghe các bài giảng học thuật dài, kỹ thuật tốc ký từ viết tắt và bắt tín hiệu chuyển đoạn (Signposting language).',
    totalQuestions: 20,
    duration: '45 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 3,
    audioTracksCount: 3,
    tag: 'Advanced 6.5+'
  },
  {
    id: 'advanced-reading-1',
    levelId: 'ielts-advanced',
    levelLabel: 'IELTS Advanced',
    session: 'Buổi 2',
    skill: 'Reading',
    title: 'Reading 1: Heading Matching & Tone Analysis',
    description: 'Phương pháp phân tích câu chủ đề (topic sentence) và nhận diện thái độ/quan điểm tác giả trong văn bản khoa học.',
    totalQuestions: 22,
    duration: '50 phút',
    status: 'open',
    dueDate: 'Không giới hạn thời gian',
    exercisesCount: 4,
    audioTracksCount: 0,
    tag: 'Advanced 6.5+'
  }
];

export const PRE_IELTS_LISTENING_1_DETAIL = {
  id: 'pre-ielts-listening-1',
  title: 'Listening 1: Friends Abroad (Names & Numbers)',
  level: 'Pre IELTS',
  session: 'Buổi 1 - Giáo trình Collins Get Ready for IELTS Listening (Unit 1)',
  description: 'Hoàn thành các bài tập nghe về chủ đề tên người, địa chỉ, số điện thoại, giờ bay và đặt phòng khách sạn. Hãy đeo tai nghe và nghe kỹ phát âm trọng âm từ.',
  exercises: [
    {
      id: 'ex1',
      title: 'Exercise 1 (Track 02)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_02.mp3',
      trackLabel: 'Track 02',
      prompt: 'You will hear a conversation between two friends planning a visit. Predict the kind of information you will have to listen for (numbers, letters, time, name, etc.). Then listen and complete the notes.',
      watchOut: "Watch Out! It's easy to confuse certain numbers that sound similar, for example: fifteen and fifty. Listen very carefully to hear which part of the word is spoken with more emphasis.",
      type: 'notes_completion',
      fields: [
        {
          id: 'ex1_q1',
          label: 'Sam arrives at:',
          prefix: '(1)',
          placeholder: 'e.g. 6.50 p.m.',
          acceptedAnswers: ['6.50 p.m.', '6.50 pm', '6:50 pm', '6:50 p.m.', '6.50', '6:50', '18:50', '6.50 in the evening', '6:50 in the evening'],
          explanation: 'Ali hỏi giờ hạ cánh, Sam nói "It arrives at 18.50" (tức 6.50 p.m.).'
        },
        {
          id: 'ex1_q2',
          label: 'on:',
          prefix: '(2)',
          placeholder: 'e.g. Wednesday 6th July',
          acceptedAnswers: ['wednesday 6th july', 'wed 6th july', 'wednesday 6 july', '6th july', '6 july', 'wednesday, 6th july'],
          explanation: 'Sam xác nhận chuyến bay đến vào "Wednesday the 6th of July".'
        },
        {
          id: 'ex1_q3',
          label: 'Airline/Flight number:',
          prefix: '(3)',
          placeholder: 'e.g. British Airways BA3025',
          acceptedAnswers: ['british airways ba3025', 'ba3025', 'ba 3025', 'british airways / ba3025', 'british airways, ba3025'],
          explanation: 'Hãng bay là "British Airways" và số hiệu chuyến bay là "BA3025".'
        }
      ],
      transcript: `Ali: Hello?
Sam: Hello. Is that Ali?
Ali: Yes.
Sam: Hi Ali, it's Sam here. I'm just ringing to check the details for your arrival next week. You're flying into Heathrow, aren't you?
Ali: That's right, yes. On Wednesday the 6th of July.
Sam: Excellent. And do you have the flight number?
Ali: Yes, it's British Airways BA3025.
Sam: Great. And what time does it land?
Ali: It arrives at 18.50.
Sam: OK, 18.50. I'll meet you in the arrivals lounge.
Ali: Brilliant. See you then.`
    },
    {
      id: 'ex2',
      title: 'Exercise 2 (Track 03)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_03.mp3',
      trackLabel: 'Track 03',
      prompt: 'Listen and circle the numbers you hear. Then match them with their written forms.',
      type: 'circle_and_match',
      circleNumbers: [
        { val: '18', heard: true },
        { val: '13', heard: true },
        { val: '15', heard: true },
        { val: '30', heard: false },
        { val: '80', heard: true },
        { val: '40', heard: true },
        { val: '14', heard: false },
        { val: '50', heard: false },
      ],
      matchingPairs: [
        { id: 'm_18', number: '18', correctWord: 'eighteen', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_13', number: '13', correctWord: 'thirteen', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_15', number: '15', correctWord: 'fifteen', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_30', number: '30', correctWord: 'thirty', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_80', number: '80', correctWord: 'eighty', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_40', number: '40', correctWord: 'forty', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_14', number: '14', correctWord: 'fourteen', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
        { id: 'm_50', number: '50', correctWord: 'fifty', options: ['fifteen', 'thirteen', 'eighteen', 'fourteen', 'fifty', 'forty', 'eighty', 'thirty'] },
      ],
      transcript: `Track 03 Audio:
"eighteen ... thirteen ... eighty ... forty ... fifteen"`
    },
    {
      id: 'ex3',
      title: 'Exercise 3 (Track 04)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_04.mp3',
      trackLabel: 'Track 04',
      prompt: 'Now listen to these sentences and write down the numbers you hear.',
      type: 'sentence_numbers',
      items: [
        {
          id: 'ex3_q1',
          sentencePrefix: '1. The youngest passenger is sitting in seat',
          sentenceSuffix: '.',
          placeholder: 'e.g. 14 / fourteen',
          acceptedAnswers: ['14', 'fourteen'],
          explanation: 'Băng đọc: "The youngest passenger is sitting in seat fourteen."'
        },
        {
          id: 'ex3_q2',
          sentencePrefix: '2. There are',
          sentenceSuffix: 'passengers in first class.',
          placeholder: 'e.g. 40 / forty',
          acceptedAnswers: ['40', 'forty'],
          explanation: 'Băng đọc: "There are forty passengers in first class."'
        },
        {
          id: 'ex3_q3',
          sentencePrefix: '3. There should be',
          sentenceSuffix: 'people on the bus.',
          placeholder: 'e.g. 50 / fifty',
          acceptedAnswers: ['50', 'fifty'],
          explanation: 'Băng đọc: "There should be fifty people on the bus."'
        },
        {
          id: 'ex3_q4',
          sentencePrefix: '4. Her plane arrives at',
          sentenceSuffix: '.',
          placeholder: 'e.g. 16:15 / sixteen fifteen',
          acceptedAnswers: ['16:15', '16.15', 'sixteen fifteen', '4:15', '4.15', '4:15 pm', '4.15 pm'],
          explanation: 'Băng đọc: "Her plane arrives at sixteen fifteen (16:15)."'
        },
        {
          id: 'ex3_q5',
          sentencePrefix: '5. Our train leaves at',
          sentenceSuffix: '.',
          placeholder: 'e.g. 17:30 / seventeen thirty',
          acceptedAnswers: ['17:30', '17.30', 'seventeen thirty', '5:30', '5.30', '5:30 pm', '5.30 pm'],
          explanation: 'Băng đọc: "Our train leaves at seventeen thirty (17:30)."'
        }
      ],
      transcript: `1. The youngest passenger is sitting in seat fourteen.
2. There are forty passengers in first class.
3. There should be fifty people on the bus.
4. Her plane arrives at sixteen fifteen.
5. Our train leaves at seventeen thirty.`
    },
    {
      id: 'ex4',
      title: 'Exercise 4 (Audio 05 - 06)',
      audioSrc1: '/audio/homework/pre_ielts/listening_1/track_05.mp3',
      audioSrc2: '/audio/homework/pre_ielts/listening_1/track_06.mp3',
      trackLabel1: 'Audio 05 (Conversation 1)',
      trackLabel2: 'Audio 06 (Conversation 2)',
      prompt: 'Listen to the following conversations and choose the correct letter a, b or c.',
      type: 'multiple_choice_spelling',
      questions: [
        {
          id: 'ex4_qi',
          audioRef: 1,
          questionNumber: 'i',
          questionText: 'Listen to Conversation 1 and choose the correct surname spelling:',
          options: [
            { key: 'a', label: 'McKeon' },
            { key: 'b', label: 'McEwan' },
            { key: 'c', MacKeon: true, label: 'MacKeon' }
          ],
          correctKey: 'b',
          explanation: 'Người nói đánh vần tên: M - C - E - W - A - N (McEwan).'
        },
        {
          id: 'ex4_qii',
          audioRef: 2,
          questionNumber: 'ii',
          questionText: 'Listen to Conversation 2 and choose the correct location spelling:',
          options: [
            { key: 'a', label: 'Westborne' },
            { key: 'b', label: 'Westerborne' },
            { key: 'c', label: 'Westbourne' }
          ],
          correctKey: 'c',
          explanation: 'Người nói phát âm và đánh vần rõ: W - E - S - T - B - O - U - R - N - E (Westbourne).'
        }
      ],
      transcript: `Audio 05:
Speaker A: Could you give me your surname, please?
Speaker B: It's McEwan. That's M - C - E - W - A - N.

Audio 06:
Speaker A: What address should we send the confirmation to?
Speaker B: 15 Westbourne Road. That's W - E - S - T - B - O - U - R - N - E.`
    },
    {
      id: 'ex5',
      title: 'Exercise 5 (Audio 07)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_07.mp3',
      trackLabel: 'Audio 07',
      prompt: 'You will hear a telephone conversation in which Sam is booking a taxi. First look at the form below and think about the kind of information you will need. Then listen and complete the form.',
      type: 'taxi_form',
      formTitle: 'TAXI BOOKING FORM',
      fields: [
        {
          id: 'ex5_q1',
          label: 'PICK-UP DATE AND TIME: Wed 6th July,',
          prefix: '(1)',
          placeholder: 'e.g. 3.30 a.m.',
          acceptedAnswers: ['3.30 a.m.', '3:30 am', '3.30 am', '3:30 a.m.', '3.30', '3:30', '03:30', '3.30 in the morning'],
          explanation: 'Sam đặt đón taxi lúc sáng sớm: 3.30 a.m.'
        },
        {
          id: 'ex5_q2',
          label: 'PICK-UP POINT: NO. & STREET:',
          suffix: 'WILLOWSIDE BANK',
          prefix: '(2)',
          placeholder: 'Số nhà...',
          acceptedAnswers: ['60', 'sixty'],
          explanation: 'Số nhà đón là 60 Willowside Bank.'
        },
        {
          id: 'ex5_q3',
          label: 'TOWN:',
          prefix: '(3)',
          placeholder: 'Tên thị trấn...',
          acceptedAnswers: ['abingdon', 'abingdon town'],
          explanation: 'Địa chỉ tại thị trấn Abingdon.'
        },
        {
          id: 'ex5_q4',
          label: 'POSTCODE:',
          prefix: '(4)',
          placeholder: 'e.g. OX14 3HB',
          acceptedAnswers: ['ox14 3hb', 'ox143hb', 'ox 14 3hb'],
          explanation: 'Mã bưu chính đọc rõ: O - X - 1 - 4 - 3 - H - B.'
        },
        {
          id: 'ex5_q5',
          label: 'MOBILE NUMBER: 07789',
          prefix: '(5)',
          placeholder: '6 chữ số tiếp theo...',
          acceptedAnswers: ['612744', '612 744'],
          explanation: 'Số điện thoại di động là 07789 612744.'
        }
      ],
      fixedInfo: {
        passenger: 'SAM WILLIAMS',
        destination: 'HEATHROW - TERMINAL 5'
      },
      transcript: `Taxi Operator: Swift Cabs, can I help you?
Sam: Hello, yes, I'd like to book a taxi to Heathrow Airport for next Wednesday, the 6th of July.
Taxi Operator: Certainly. What time is your flight?
Sam: The flight leaves at 6.50 in the evening, but I need to be picked up at 3.30 in the morning.
Taxi Operator: 3.30 a.m. Got it. And the name, please?
Sam: Sam Williams.
Taxi Operator: And the pick-up address?
Sam: 60 Willowside Bank.
Taxi Operator: Is that in Abingdon?
Sam: Yes, Abingdon. Postcode is OX14 3HB.
Taxi Operator: OX14 3HB. And a contact mobile number?
Sam: It's 07789 612744.
Taxi Operator: 07789 612744. And dropping off at which terminal?
Sam: Terminal 5, please.`
    },
    {
      id: 'ex6',
      title: 'Exercise 6 (Track 08)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_08.mp3',
      trackLabel: 'Track 08',
      prompt: 'Complete the form.',
      type: 'landing_card',
      tableRows: [
        { label: 'Family name:', value: 'LIU', isInput: false },
        { 
          label: 'First name(s):', 
          id: 'ex6_q1', 
          prefix: '(1)', 
          isInput: true, 
          placeholder: 'First name...', 
          acceptedAnswers: ['hua fang', 'huafang', 'hui fang', 'huifang'],
          explanation: 'Tên hành khách là Hua Fang (đánh vần H - U - A   F - A - N - G).'
        },
        { label: 'Sex:', value: '[ ] M / [X] F', isInput: false },
        { 
          label: 'Date of birth (DDMMYYYY):', 
          id: 'ex6_q2', 
          prefix: '(2)', 
          isInput: true, 
          placeholder: 'DDMMYYYY (e.g. 17121994)', 
          acceptedAnswers: ['17121994', '17/12/1994', '17 12 1994', '17-12-1994', '17th december 1994', '17 december 1994'],
          explanation: 'Ngày sinh: ngày 17 tháng 12 năm 1994 (17121994).'
        },
        { label: 'Town and country of birth:', value: 'SHENZHEN, CHINA', isInput: false },
        { label: 'Nationality:', value: 'CHINESE', isInput: false },
        { label: 'Occupation:', value: 'STUDENT', isInput: false },
        { 
          label: 'Contact address in the UK (in full):', 
          id: 'ex6_q3', 
          prefix: '(3)', 
          isInput: true, 
          placeholder: 'Full address...', 
          acceptedAnswers: ['13 park road, brighton, bn40 4gr', '13 park road, brighton', '13 park road brighton bn40 4gr', '13 park road'],
          explanation: 'Địa chỉ liên lạc: 13 Park Road, Brighton, BN40 4GR.'
        }
      ],
      transcript: `Officer: Can I see your landing card, please?
Passenger: Here you are.
Officer: Thank you. So your family name is Liu. And your first name?
Passenger: Hua Fang. That's H-U-A, and then F-A-N-G.
Officer: Right. And your date of birth?
Passenger: The seventeenth of December, nineteen ninety-four.
Officer: 17/12/1994. And where are you staying during your studies in the UK?
Passenger: At 13 Park Road, Brighton. Postcode is BN40 4GR.`
    },
    {
      id: 'ex7',
      title: 'Exercise 7. Questions 1–7 (Track 09) & Questions 8–10 (Track 10)',
      audioSrc: '/audio/homework/pre_ielts/listening_1/track_09.mp3',
      audioSrcPart2: '/audio/homework/pre_ielts/listening_1/track_10.mp3',
      trackLabel: 'Track 09 (Questions 1–7)',
      trackLabelPart2: 'Track 10 (Questions 8–10)',
      promptPart1: 'Questions 1–7. Complete the form below. Write NO MORE THAN THREE WORDS AND/OR A NUMBER',
      promptPart2: 'Questions 8–10. Listen to the next part of the conversation and choose the correct letter, a, b or c.',
      type: 'hotel_reservation_and_mcq',
      part1: {
        formTitle: 'Silver Tulip Hotel - Reservation Details',
        fixedRows: [
          { label: 'Number of nights', value: '1' }
        ],
        fields: [
          {
            id: 'ex7_q1',
            label: 'Type of room: (circle one)',
            prefix: '(1)',
            type: 'choice',
            options: ['Single', 'Double - twin beds', 'Double - king-sized bed'],
            acceptedAnswers: ['double - king-sized bed', 'double', 'king-sized bed'],
            explanation: 'Khách yêu cầu phòng đôi với giường cỡ lớn (Double - king-sized bed).'
          },
          {
            id: 'ex7_q2',
            label: 'Name',
            prefix: '(2)',
            placeholder: 'Customer name...',
            acceptedAnswers: ['edward francis', 'francis edward'],
            explanation: 'Tên khách hàng là Edward Francis.'
          },
          {
            id: 'ex7_q3',
            label: 'Home address',
            suffix: 'Avenue, Cambridge',
            prefix: '(3)',
            placeholder: 'e.g. 23 Cypress',
            acceptedAnswers: ['23 cypress', '23 cypress avenue', 'cypress'],
            explanation: 'Địa chỉ nhà: 23 Cypress Avenue, Cambridge.'
          },
          {
            id: 'ex7_q4',
            label: 'Postcode',
            prefix: '(4)',
            placeholder: 'Postcode...',
            acceptedAnswers: ['cb3 9nf', 'cb39nf', 'cb3 9 nf'],
            explanation: 'Mã bưu cục: CB3 9NF.'
          },
          {
            id: 'ex7_q5',
            label: 'Transport',
            prefix: '(5)',
            placeholder: 'Transport method...',
            acceptedAnswers: ['taxi', 'by taxi'],
            explanation: 'Khách đến khách sạn bằng taxi.'
          },
          {
            id: 'ex7_q6',
            label: 'Meals',
            prefix: '(6)',
            placeholder: 'e.g. Breakfast',
            acceptedAnswers: ['breakfast', 'with breakfast', 'continental breakfast'],
            explanation: 'Khách đặt kèm bữa sáng (Breakfast).'
          },
          {
            id: 'ex7_q7',
            label: 'Date of arrival',
            prefix: '(7)',
            placeholder: 'e.g. Friday 16th April',
            acceptedAnswers: ['friday 16th april', '16th april', 'friday 16 april', '16 april', 'friday, 16th april'],
            explanation: 'Ngày nhận phòng là Thứ Sáu ngày 16 tháng 4 (Friday 16th April).'
          }
        ]
      },
      part2: {
        questions: [
          {
            id: 'ex7_q8',
            number: 8,
            text: "The customer's mobile phone number is:",
            options: [
              { key: 'a', label: '07976 122577' },
              { key: 'b', label: '07961 122577.' },
              { key: 'c', label: '07961 121597.' }
            ],
            correctKey: 'c',
            explanation: 'Số điện thoại di động chính xác là 07961 121597 (câu c).'
          },
          {
            id: 'ex7_q9',
            number: 9,
            text: 'The customer would also like to:',
            options: [
              { key: 'a', label: 'receive tourist information.' },
              { key: 'b', label: 'make a restaurant booking.' },
              { key: 'c', label: 'book tickets for the theatre.' }
            ],
            correctKey: 'b',
            explanation: 'Khách nhờ đặt trước bàn tại nhà hàng vào buổi tối: make a restaurant booking (câu b).'
          },
          {
            id: 'ex7_q10',
            number: 10,
            text: 'He leaves a message for:',
            options: [
              { key: 'a', label: 'Mr Alami.' },
              { key: 'b', label: 'Mr El Fassi.' },
              { key: 'c', label: 'Mr Alaoui.' }
            ],
            correctKey: 'c',
            explanation: 'Người nhận tin nhắn là Mr Alaoui (đánh vần A - L - A - O - U - I) (câu c).'
          }
        ]
      },
      transcriptPart1: `Receptionist: Good afternoon, Silver Tulip Hotel. How can I help you?
Caller: Hello, I'd like to book a room, please.
Receptionist: Certainly, sir. For how many nights?
Caller: Just one night, please.
Receptionist: And what type of room would you prefer? Single or double?
Caller: A double, please, with a king-sized bed if possible.
Receptionist: Yes, we have one available. Could I take your name, please?
Caller: Edward Francis.
Receptionist: Thank you, Mr Francis. And what is your home address?
Caller: It's 23 Cypress Avenue, Cambridge. That's C-Y-P-R-E-S-S.
Receptionist: 23 Cypress Avenue. And the postcode?
Caller: CB3 9NF.
Receptionist: Thank you. How will you be travelling to the hotel?
Caller: I'll be taking a taxi from the station.
Receptionist: Very good. Would you like meals included?
Caller: Yes, just breakfast, please.
Receptionist: And what date will you be arriving?
Caller: Friday the 16th of April.`,
      transcriptPart2: `Receptionist: Now, could I have your contact mobile number, please?
Caller: Yes, it's 07961 121597.
Receptionist: 07961 121597. Thank you. Is there anything else we can assist you with during your stay?
Caller: Well, yes. Could you please make a restaurant booking for me for that evening? Somewhere nearby with good local seafood.
Receptionist: Of course, I'd be happy to arrange that.
Caller: And could you also leave a message for a colleague who will arrive before me? His name is Mr Alaoui. That's A-L-A-O-U-I.
Receptionist: Mr Alaoui. I'll make sure he gets the message as soon as he arrives.`
    }
  ]
};

export const PRE_IELTS_READING_1_DETAIL = {
  id: 'pre-ielts-reading-1',
  title: 'HOMEWORK - Reading 1 - Short-answer Questions',
  level: 'Pre IELTS',
  session: 'Buổi 1 - Giáo trình Collins Get Ready for IELTS Reading (Unit 1: Friendship)',
  skill: 'Reading',
  description: 'Đọc kỹ 2 bài đọc về chủ đề tình bạn và trả lời 12 câu hỏi ngắn. Lưu ý quy tắc giới hạn từ: NO MORE THAN THREE WORDS AND/OR A NUMBER.',
  totalQuestions: 12,
  duration: '35 - 45 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'The value of friendship',
      shortTitle: 'Passage 1: The value of friendship',
      wordLimit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER',
      maxWords: 3,
      instruction: 'Questions 1–6. Answer the questions below using NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage. Write your answers in boxes 1–6 on your answer sheet.',
      content: `The value of friendship

Recent research into the world of teenagers has suggested that they value friendship above everything else. Children aged between 12 and 15 were asked what was important to them. Their answers included possessions such as money and computer gadgets but also relationships with people. The teenagers questioned said that friends were the most important to them, more even than family, or boyfriends and girlfriends.

We wanted to find out more about the results of this research so we asked our readers what they thought about the value of friendship. Here are some examples of what they said about their friends:

Ben, 15: Every time I have a fight with my parents, I need some time on my own. But after that, the first thing I do is meet up with my friends. After playing football for a while, or skateboarding, I usually feel much happier again.

Rory, 13: When I moved to a village in the countryside, I thought that it would be the end of my friendships. But my old friends have kept in touch and they come and visit in the holidays. There’s a lake nearby, so we often go sailing, water-skiing or windsurfing. And I have made some new friends here too, at school, and since I joined the rugby club.

Carlos, 11: Last year, I broke my arm on a skiing holiday. Unfortunately, it was my left arm and I am left-handed. My school friends all helped and copied their notes for me.

It seems that our readers value their friendships very highly. From what they told us, they spend a lot of time with their friends, just hanging out, or sharing hobbies and interests. They seem to need their friends for advice, help, chats, and for having fun. Clearly, friends make each other feel better. Looking at what our readers told us, the results of the recent research are not really surprising.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          question: 'What age group was involved in the recent research about teenagers?',
          placeholder: 'Điền đáp án câu 1...',
          acceptedAnswers: ['between 12 and 15', '12 and 15', '12-15', '12 to 15', 'aged between 12 and 15', '12 - 15', '12 and 15 years old'],
          primaryAnswer: 'between 12 and 15',
          evidence: 'Children aged between 12 and 15 were asked what was important to them.',
          explanation: 'Đoạn 1 nêu rõ nhóm tuổi tham gia khảo sát: "Children aged between 12 and 15 were asked what was important to them."'
        },
        {
          id: 'p1_q2',
          number: 2,
          question: 'What did teenagers consider more important than family or romantic relationships?',
          placeholder: 'Điền đáp án câu 2...',
          acceptedAnswers: ['friends', 'friendship', 'friendships', 'their friends'],
          primaryAnswer: 'friends',
          evidence: 'The teenagers questioned said that friends were the most important to them, more even than family, or boyfriends and girlfriends.',
          explanation: 'Đoạn 1 nêu rõ: "The teenagers questioned said that friends were the most important to them, more even than family, or boyfriends and girlfriends." Vì vậy đáp án là "friends" hoặc "friendship".'
        },
        {
          id: 'p1_q3',
          number: 3,
          question: 'What activity helps Ben feel better after arguments with his parents?',
          placeholder: 'Điền đáp án câu 3...',
          acceptedAnswers: ['playing football', 'football', 'skateboarding', 'playing football, skateboarding', 'football or skateboarding', 'football, skateboarding'],
          primaryAnswer: 'playing football',
          evidence: 'After playing football for a while, or skateboarding, I usually feel much happier again.',
          explanation: 'Ben (15 tuổi) chia sẻ: "After playing football for a while, or skateboarding, I usually feel much happier again." Hoạt động giúp Ben thấy vui hơn là đá bóng hoặc trượt ván.'
        },
        {
          id: 'p1_q4',
          number: 4,
          question: 'Where does Rory often go with his old friends during the holidays?',
          placeholder: 'Điền đáp án câu 4...',
          acceptedAnswers: ['a lake', 'lake', 'a lake nearby', 'the lake', 'to a lake', 'nearby lake', 'lake nearby'],
          primaryAnswer: '(a) lake',
          evidence: 'There’s a lake nearby, so we often go sailing, water-skiing or windsurfing.',
          explanation: 'Rory (13 tuổi) cho biết: "There’s a lake nearby, so we often go sailing, water-skiing or windsurfing." Nơi chốn bạn đến vào kỳ nghỉ cùng bạn cũ là hồ nước gần nhà.'
        },
        {
          id: 'p1_q5',
          number: 5,
          question: 'What did Carlos injure on a skiing trip?',
          placeholder: 'Điền đáp án câu 5...',
          acceptedAnswers: ['his left arm', 'left arm', 'his arm', 'arm'],
          primaryAnswer: '(his) left arm',
          evidence: 'Last year, I broke my arm on a skiing holiday. Unfortunately, it was my left arm and I am left-handed.',
          explanation: 'Carlos (11 tuổi) kể: "Last year, I broke my arm on a skiing holiday. Unfortunately, it was my left arm..." Bộ phận Carlos bị chấn thương là cánh tay trái: (his) left arm.'
        },
        {
          id: 'p1_q6',
          number: 6,
          question: 'What do teenagers often ask their friends for, besides fun and hobbies?',
          placeholder: 'Điền đáp án câu 6...',
          acceptedAnswers: ['advice, help, chats', 'advice', 'help', 'chats', 'advice and help', 'help and advice', 'advice, help', 'advice and chats', 'help and chats', 'advice, chats'],
          primaryAnswer: 'advice, help, chats',
          evidence: 'They seem to need their friends for advice, help, chats, and for having fun.',
          explanation: 'Đoạn cuối: "They seem to need their friends for advice, help, chats, and for having fun." Ngoài vui chơi và chia sẻ sở thích, các bạn cần bạn bè để xin lời khuyên (advice), sự giúp đỡ (help) và tâm sự (chats).'
        }
      ]
    },
    {
      id: 'p2',
      number: 2,
      title: 'Online and Real-world Friendships',
      shortTitle: 'Passage 2: Online & Real-life friendships',
      wordLimit: 'NO MORE THAN THREE WORDS AND/OR A NUMBER',
      maxWords: 3,
      instruction: 'Questions 7–12. Answer the questions below using NO MORE THAN THREE WORDS AND/OR A NUMBER from the passage. Write your answers in boxes 7–12 on your answer sheet.',
      content: `Online and Real-world Friendships

It is said that most people have no more than 30 friends at any given time, and 400 over the whole of their lives. However, on social networking sites, most users have about 150 friends. If these numbers are correct, then friendship means different things in different situations.

One of the reasons for having more online friends than real friends is that at a certain point in time, online friendships do not require much time and energy: it is easy to accept friendships and keep them forever. Another possibility is that it is difficult to say ‘no’ when somebody asks us to be their friend online, even if we feel we don’t really know them. The fact that they ask us suggests that they do consider us a friend, which is a nice feeling. Alternatively, they may be ‘collectors’ of online friends and just want to use us to get a higher number of friends and appear to be popular.

Online friendships are quite easy, but in the real world decisions about friendships are harder to make. There are no rules about friendship. There are no guidelines about how to make friends, how to keep friendships going, and how to finish friendships if we want to move on. People have very different opinions about this: some people would die for their friends and they value them more than family. Others say that friends are temporary, only there to help each other until they are no longer needed. If people with such different views become friends, this can lead to problems.

Because of these different definitions of friendship, it is easy to be unhappy about our friendships. We may want them to be deeper or closer, or we may want to have more friends in our lives. Sometimes we simply do not have the time to develop our friendships, or we fear we have left it too late in life to start. If we move to another country or city, we have to find ways to make new friends again.

This dissatisfaction shows us how important friendships are for most of us. We should not think that it could be too late to build friendships. We also need to understand that the need to be around other people is one that is shared by many. Therefore, we should not be too frightened about starting to talk to people who in the future may become our friends: it is likely that they too would like to get closer to us. Remember what people say: strangers are friends we have not met yet.`,
      questions: [
        {
          id: 'p2_q7',
          number: 7,
          question: 'How many friends do people usually have in their entire lives?',
          placeholder: 'Điền đáp án câu 7...',
          acceptedAnswers: ['400', '400 friends', 'about 400', 'about 400 friends'],
          primaryAnswer: '400',
          evidence: '...and 400 over the whole of their lives.',
          explanation: 'Đoạn 1 nêu: "...and 400 over the whole of their lives." Con số bạn bè trung bình trong cả cuộc đời là 400.'
        },
        {
          id: 'p2_q8',
          number: 8,
          question: 'What is one reason people find it easy to have many online friends?',
          placeholder: 'Điền đáp án câu 8...',
          acceptedAnswers: ['time and energy', 'not much time', 'not much energy', 'little time', 'little energy', 'require little time', 'less time and energy', 'little time and energy', 'no time and energy', 'less time', 'less energy'],
          primaryAnswer: '(little) time and energy',
          evidence: '...online friendships do not require much time and energy: it is easy to accept friendships and keep them forever.',
          explanation: 'Đoạn 2 nêu: "...online friendships do not require much time and energy: it is easy to accept friendships and keep them forever." Lý do là tình bạn online không đòi hỏi nhiều thời gian và công sức: (little) time and energy.'
        },
        {
          id: 'p2_q9',
          number: 9,
          question: 'What kind of online users may add others just to increase their friend count?',
          placeholder: 'Điền đáp án câu 9...',
          acceptedAnswers: ['collectors', "'collectors'", '‘collectors’', '"collectors"', 'collectors of friends', 'online friend collectors', 'friend collectors'],
          primaryAnswer: 'collectors',
          evidence: 'Alternatively, they may be ‘collectors’ of online friends and just want to use us to get a higher number of friends and appear to be popular.',
          explanation: 'Đoạn 2: "Alternatively, they may be ‘collectors’ of online friends and just want to use us to get a higher number of friends and appear to be popular." Nhóm người này được gọi là "collectors" (những người sưu tầm bạn bè ảo).'
        },
        {
          id: 'p2_q10',
          number: 10,
          question: 'What is missing when it comes to making or ending friendships?',
          placeholder: 'Điền đáp án câu 10...',
          acceptedAnswers: ['rules and guidelines', 'rules', 'guidelines', 'rules or guidelines', 'guidelines and rules', 'rules, guidelines', 'no rules', 'no guidelines'],
          primaryAnswer: 'rules and guidelines',
          evidence: 'There are no rules about friendship. There are no guidelines about how to make friends, how to keep friendships going, and how to finish friendships if we want to move on.',
          explanation: 'Đoạn 3 chỉ ra: "There are no rules about friendship. There are no guidelines about how to make friends... and how to finish friendships..." Trong đời thực, chúng ta không có các quy tắc hay bản chỉ dẫn nào: rules and guidelines.'
        },
        {
          id: 'p2_q11',
          number: 11,
          question: 'What might prevent people from building closer friendships in adulthood?',
          placeholder: 'Điền đáp án câu 11...',
          acceptedAnswers: ['time', 'not enough time', 'lack of time', 'fear', 'moving', 'moving to another country', 'no time', 'little time'],
          primaryAnswer: '(lack of) time',
          evidence: 'Sometimes we simply do not have the time to develop our friendships, or we fear we have left it too late in life to start.',
          explanation: 'Đoạn 4 nêu: "Sometimes we simply do not have the time to develop our friendships, or we fear we have left it too late in life to start." Trở ngại khi trưởng thành thường là do không có thời gian (lack of time) hoặc nỗi sợ (fear).'
        },
        {
          id: 'p2_q12',
          number: 12,
          question: 'What does the phrase "strangers are friends we have not met yet" suggest we should not fear?',
          placeholder: 'Điền đáp án câu 12...',
          acceptedAnswers: ['starting to talk', 'talking to people', 'talking to strangers', 'making friends', 'start talking', 'talking', 'start to talk', 'starting to talk to people'],
          primaryAnswer: 'starting to talk (to people)',
          evidence: 'Therefore, we should not be too frightened about starting to talk to people who in the future may become our friends: it is likely that they too would like to get closer to us. Remember what people say: strangers are friends we have not met yet.',
          explanation: 'Đoạn 5 đúc kết: "Therefore, we should not be too frightened about starting to talk to people who in the future may become our friends... Remember what people say: strangers are friends we have not met yet." Tác giả khuyên ta đừng e sợ việc bắt đầu bắt chuyện với người khác: starting to talk (to people).'
        }
      ]
    }
  ]
};

export const PRE_IELTS_READING_2_DETAIL = {
  id: 'pre-ielts-reading-2',
  title: 'HOMEWORK - Reading 2 - The Body',
  level: 'Pre IELTS',
  session: 'Buổi 2 - Giáo trình Collins Get Ready for IELTS Reading (Unit 2: The Body)',
  skill: 'Reading',
  vocabId: 'pre-ielts-reading-2',
  description: 'Đọc kỹ văn bản học thuật "The body" và hoàn thiện 20 câu hỏi luyện thi IELTS gồm 2 phần: Short-answer questions (tối đa 4 từ) và Sentence completion (tối đa 3 từ). Chú ý giới hạn từ quy định trong từng phần.',
  totalQuestions: 20,
  duration: '40 - 50 phút',
  sections: [
    {
      id: 'sec1',
      title: 'Phần 1: Short-answer Questions',
      shortTitle: 'Phần 1 (1–10)',
      minQ: 1,
      maxQ: 10,
      instruction: '1 - Use NO MORE THAN FOUR WORDS for each, answer the following questions.',
      wordLimit: 'NO MORE THAN FOUR WORDS',
      maxWords: 4
    },
    {
      id: 'sec2',
      title: 'Phần 2: Sentence Completion',
      shortTitle: 'Phần 2 (11–20)',
      minQ: 11,
      maxQ: 20,
      instruction: '2 - Complete the sentences using NO MORE THAN THREE WORDS from the passage.',
      wordLimit: 'NO MORE THAN THREE WORDS',
      maxWords: 3
    }
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'The body',
      shortTitle: 'Passage: The body',
      wordLimit: 'NO MORE THAN FOUR / THREE WORDS',
      maxWords: 4,
      instruction: 'Part 1: Answer questions using NO MORE THAN FOUR WORDS. Part 2: Complete sentences using NO MORE THAN THREE WORDS from the passage.',
      content: `The body

The concept of ‘the body’ is closely related to the ideas of ‘illness’ and ‘health’. 
All of us exist in ‘bodies’ of different shapes, heights, colours and physical abilities. The main reasons for the differences are genetic, and the fact that people’s bodies change as they age. However, a huge range of research indicates that there are social factors too.

Poorer people are more likely to eat ‘unhealthy’ foods, to smoke cigarettes and to be employed in repetitive, physically difficult work or the opposite: boring, inactive employment. Moreover, their housing conditions and neighbourhoods tend to be worse. All of these factors impact upon the condition of a person’s health: the physical shapes of bodies are strongly influenced by social factors.

These social factors are also closely linked to emotional wellbeing. People with low or no incomes are more likely to have mental health problems. It is not clear, however, whether poverty causes mental illness, or whether it is the other way round. For example, certain people with mental health issues may be at risk of becoming homeless, just as a person who is homeless may have an increased risk of illnesses such as depression.

There are other types of social factors too. Bodies are young or old, short or tall, big or small, weak or strong. Whether these judgments matter and whether they are positive or negative depends on the cultural and historical context. The culture — and media — of different societies promote very different valuations of body shapes. What is considered as attractive or ugly, normal or abnormal varies enormously. Currently, for example, in rich societies the idea of slimness is highly valued, but historically this was different. In most societies the ideal body shape for a woman was a ‘full figure’ with a noticeable belly, while in middle-aged men, a large stomach indicated that they were financially successful in life. In many traditional African and Pacific Island cultures, for example, a large body shape was a sign of success and a shape to be aimed at.

It is easy for people to feel undervalued because of factors they have no power to change, for example, their age and height. Equally, they can feel pressured into making changes to their appearance when there is a choice, which in extreme cases can lead to obsessions with weight loss and fitness regimes.

Sociologists, then, are suggesting that we should not just view bodies and minds in biological terms, but also in social terms. The physical body and what we seek to do with it change over time and society. This has important implications for medicine and ideas of health. Thus, the idea of people being ‘obese’ is physically related to large amounts of processed food, together with lack of exercise, and is therefore a medical issue. However, it has also become a mental health issue and social problem as a result of people coming to define this particular body shape as ‘wrong’ and unhealthy.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          romanNumber: 'i',
          sectionId: 'sec1',
          sectionTitle: '1 - Short-answer Questions',
          sectionInstruction: 'Use NO MORE THAN FOUR WORDS for each, answer the following questions.',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          isSectionStart: true,
          question: 'In what ways do our bodies physically differ?',
          placeholder: 'Điền đáp án câu 1 (tối đa 4 từ)...',
          acceptedAnswers: [
            'shapes, heights, colours, abilities',
            'shapes, heights, colours, physical abilities',
            'shapes, heights, colours and physical abilities',
            'shapes, heights, colours',
            'shapes, heights, colours and abilities',
            'different shapes, heights, colours',
            'shapes heights colours abilities',
            'shapes heights colours',
            'different shapes, heights, colours, abilities',
            'shapes, heights and colours',
            'shapes, heights, colours, physical',
            'different shapes, heights',
            'shapes, heights, colors, abilities',
            'shapes, heights, colors'
          ],
          primaryAnswer: 'shapes, heights, colours, abilities',
          evidence: 'All of us exist in ‘bodies’ of different shapes, heights, colours and physical abilities.',
          explanation: 'Đoạn 2 nêu rõ các khía cạnh cơ thể khác biệt nhau về mặt thể chất: hình dáng, chiều cao, màu sắc và khả năng thể chất ("different shapes, heights, colours and physical abilities").'
        },
        {
          id: 'p1_q2',
          number: 2,
          romanNumber: 'ii',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'Why do our bodies differ physically?',
          placeholder: 'Điền đáp án câu 2 (tối đa 4 từ)...',
          acceptedAnswers: [
            'genetics and age',
            'genetic and age',
            'genetics and aging',
            'genetic and aging',
            'genetic reasons and age',
            'genetics, age',
            'genetics, aging',
            'genetics',
            'age and genetics',
            'genetics and social factors',
            'genetic, age, social factors',
            'genetic and social factors',
            'genetics, age, social',
            'change as they age'
          ],
          primaryAnswer: 'genetics and age',
          evidence: 'The main reasons for the differences are genetic, and the fact that people’s bodies change as they age. However, a huge range of research indicates that there are social factors too.',
          explanation: 'Đoạn 2 chỉ ra các nguyên nhân chính khiến cơ thể khác biệt là do di truyền (genetic) và do sự thay đổi khi con người già đi (change as they age), cùng với các yếu tố xã hội (social factors).'
        },
        {
          id: 'p1_q3',
          number: 3,
          romanNumber: 'iii',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'What types of jobs are poor people likely to have?',
          placeholder: 'Điền đáp án câu 3 (tối đa 4 từ)...',
          acceptedAnswers: [
            'repetitive, physically difficult work',
            'physically difficult work',
            'boring, inactive employment',
            'repetitive physically difficult work',
            'boring inactive employment',
            'physically difficult',
            'boring, inactive',
            'repetitive, difficult work',
            'repetitive, physically difficult',
            'repetitive work',
            'inactive employment',
            'physically difficult or inactive',
            'physically demanding work',
            'repetitive, physically difficult jobs'
          ],
          primaryAnswer: 'repetitive, physically difficult work',
          evidence: 'Poorer people are more likely to eat ‘unhealthy’ foods, to smoke cigarettes and to be employed in repetitive, physically difficult work or the opposite: boring, inactive employment.',
          explanation: 'Đoạn 3 cho biết người nghèo thường có xu hướng làm công việc lặp đi lặp lại, nặng nhọc thể chất ("repetitive, physically difficult work") hoặc công việc nhàm chán, thụ động ("boring, inactive employment").'
        },
        {
          id: 'p1_q4',
          number: 4,
          romanNumber: 'iv',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'What aspects of poor people’s living environments are not good?',
          placeholder: 'Điền đáp án câu 4 (tối đa 4 từ)...',
          acceptedAnswers: [
            'housing conditions and neighbourhoods',
            'housing conditions, neighbourhoods',
            'housing conditions and neighborhoods',
            'housing conditions, neighborhoods',
            'their housing conditions, neighbourhoods',
            'housing conditions',
            'neighbourhoods',
            'neighborhoods',
            'housing and neighbourhoods',
            'housing and neighborhoods',
            'housing, neighbourhoods',
            'housing, neighborhoods',
            'housing conditions, neighbourhood',
            'poor housing conditions'
          ],
          primaryAnswer: 'housing conditions and neighbourhoods',
          evidence: 'Moreover, their housing conditions and neighbourhoods tend to be worse.',
          explanation: 'Đoạn 3 đề cập trực tiếp đến môi trường sống của người có thu nhập thấp: điều kiện nhà ở và khu phố xung quanh ("housing conditions and neighbourhoods") thường tồi tệ hơn.'
        },
        {
          id: 'p1_q5',
          number: 5,
          romanNumber: 'v',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'What influences how groups of people value bodies?',
          placeholder: 'Điền đáp án câu 5 (tối đa 4 từ)...',
          acceptedAnswers: [
            'cultural and historical context',
            'cultural, historical context',
            'culture and media',
            'the culture and media',
            'culture and the media',
            'culture, media',
            'media and culture',
            'culture',
            'media',
            'cultural context',
            'historical context',
            'the cultural, historical context',
            'culture and historical context'
          ],
          primaryAnswer: 'cultural and historical context',
          evidence: 'Whether these judgments matter and whether they are positive or negative depends on the cultural and historical context. The culture — and media — of different societies promote very different valuations of body shapes.',
          explanation: 'Đoạn 5 khẳng định cách thức đánh giá cơ thể phụ thuộc chủ yếu vào bối cảnh văn hóa và lịch sử ("cultural and historical context"), đồng thời được quảng bá và định hình bởi văn hóa cũng như truyền thông ("culture and media").'
        },
        {
          id: 'p1_q6',
          number: 6,
          romanNumber: 'vi',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'What have wealthy cultures changed their opinion about?',
          placeholder: 'Điền đáp án câu 6 (tối đa 4 từ)...',
          acceptedAnswers: [
            'the idea of slimness',
            'idea of slimness',
            'slimness',
            'ideal body shapes',
            'body shapes',
            'ideal body shape',
            'valuations of body shapes',
            'body shape',
            'valuing slimness',
            'slimness and body shapes',
            'idea of body shapes',
            'slimness in body shapes'
          ],
          primaryAnswer: 'the idea of slimness',
          evidence: 'Currently, for example, in rich societies the idea of slimness is highly valued, but historically this was different.',
          explanation: 'Đoạn 5 chỉ ra: hiện nay tại các xã hội giàu có, quan niệm về sự thon thả rất được coi trọng, trong khi trước đây trong lịch sử thì ngược lại ("the idea of slimness is highly valued, but historically this was different"). Họ đã thay đổi quan niệm về vóc dáng thon thả / chuẩn mực vóc dáng ("the idea of slimness" / "ideal body shapes").'
        },
        {
          id: 'p1_q7',
          number: 7,
          romanNumber: 'vii',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'In the past, what part of the body could indicate that people were rich?',
          placeholder: 'Điền đáp án câu 7 (tối đa 4 từ)...',
          acceptedAnswers: [
            'a large stomach',
            'large stomach',
            'stomach',
            'noticeable belly',
            'a noticeable belly',
            'belly',
            'large belly',
            'the stomach',
            'a large belly'
          ],
          primaryAnswer: '(a) large stomach',
          evidence: '...while in middle-aged men, a large stomach indicated that they were financially successful in life.',
          explanation: 'Đoạn 5 nêu rõ: trong quá khứ, ở nam giới trung niên, một chiếc bụng lớn ("a large stomach" hoặc "noticeable belly") biểu thị rằng họ thành đạt về tài chính trong cuộc sống ("financially successful in life").'
        },
        {
          id: 'p1_q8',
          number: 8,
          romanNumber: 'viii',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'According to sociology, in what ways should we think about the body?',
          placeholder: 'Điền đáp án câu 8 (tối đa 4 từ)...',
          acceptedAnswers: [
            'in biological and social',
            'biological and social terms',
            'in biological and social terms',
            'biological and social',
            'in social terms',
            'social terms',
            'biological, social terms',
            'social and biological terms',
            'in biological, social terms',
            'biological terms and social terms'
          ],
          primaryAnswer: 'in biological and social terms',
          evidence: 'Sociologists, then, are suggesting that we should not just view bodies and minds in biological terms, but also in social terms.',
          explanation: 'Đoạn 7 kết luận: các nhà xã hội học khuyên rằng ta không chỉ nên nhìn nhận thể xác và tâm trí dưới góc độ sinh học mà còn phải nhìn nhận cả dưới góc độ xã hội ("in biological terms, but also in social terms").'
        },
        {
          id: 'p1_q9',
          number: 9,
          romanNumber: 'ix',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'Which two physical factors contribute to whether people are obese or not?',
          placeholder: 'Điền đáp án câu 9 (tối đa 4 từ)...',
          acceptedAnswers: [
            'processed food and exercise',
            'processed food, exercise',
            'food and exercise',
            'food and lack of exercise',
            'processed food, lack exercise',
            'diet and exercise',
            'food, lack of exercise',
            'processed food, no exercise',
            'processed food, inactive employment',
            'processed food',
            'lack of exercise',
            'food and exercise lack',
            'processed food, exercise lack'
          ],
          primaryAnswer: 'processed food and exercise',
          evidence: 'Thus, the idea of people being ‘obese’ is physically related to large amounts of processed food, together with lack of exercise, and is therefore a medical issue.',
          explanation: 'Đoạn 7 chỉ ra hai yếu tố thể chất chính dẫn tới chứng béo phì là lượng lớn thức ăn chế biến sẵn ("processed food") và sự thiếu vận động thể dục ("lack of exercise").'
        },
        {
          id: 'p1_q10',
          number: 10,
          romanNumber: 'x',
          sectionId: 'sec1',
          wordLimit: 'NO MORE THAN FOUR WORDS',
          maxWords: 4,
          question: 'What does society say that being obese is?',
          placeholder: 'Điền đáp án câu 10 (tối đa 4 từ)...',
          acceptedAnswers: [
            'wrong and unhealthy',
            '‘wrong’ and unhealthy',
            "'wrong' and unhealthy",
            '"wrong" and unhealthy',
            'wrong, unhealthy',
            'wrong',
            'unhealthy',
            'a social problem',
            'social problem',
            'mental health issue',
            'wrong and unhealthy problem'
          ],
          primaryAnswer: 'wrong and unhealthy',
          evidence: 'However, it has also become a mental health issue and social problem as a result of people coming to define this particular body shape as ‘wrong’ and unhealthy.',
          explanation: 'Đoạn 7 khẳng định xã hội đã định nghĩa hình thể béo phì là sai trái và không lành mạnh ("people coming to define this particular body shape as ‘wrong’ and unhealthy").'
        },
        {
          id: 'p1_q11',
          number: 11,
          sectionId: 'sec2',
          sectionTitle: '2 - Sentence Completion',
          sectionInstruction: 'Complete the sentences using NO MORE THAN THREE WORDS from the passage.',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          isSectionStart: true,
          question: 'People’s bodies differ because of genetics and the fact that they ________.',
          placeholder: 'Điền đáp án câu 11 (tối đa 3 từ)...',
          acceptedAnswers: [
            'age',
            'change as they age',
            'change with age',
            'grow older',
            'change as they',
            'change',
            'grow old'
          ],
          primaryAnswer: 'age',
          evidence: 'The main reasons for the differences are genetic, and the fact that people’s bodies change as they age.',
          explanation: 'Đoạn 2 nêu: "...and the fact that people’s bodies change as they age." Với cấu trúc câu "and the fact that they ________", từ thích hợp trực tiếp từ bài đọc là "age" (theo cụm "as they age"). Hệ thống cũng chấp nhận "change as they age".'
        },
        {
          id: 'p1_q12',
          number: 12,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Poor people often work in jobs that are either physically demanding or ________.',
          placeholder: 'Điền đáp án câu 12 (tối đa 3 từ)...',
          acceptedAnswers: [
            'boring, inactive',
            'boring and inactive',
            'boring inactive',
            'inactive',
            'boring',
            'boring, inactive employment'
          ],
          primaryAnswer: 'boring, inactive',
          evidence: '...to be employed in repetitive, physically difficult work or the opposite: boring, inactive employment.',
          explanation: 'Đoạn 3 đối chiếu hai dạng công việc của người có thu nhập thấp: nặng nhọc thể chất ("physically demanding" / "physically difficult") hoặc nhàm chán, thụ động ("boring, inactive").'
        },
        {
          id: 'p1_q13',
          number: 13,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'The physical condition of a person’s body can be affected by their ________.',
          placeholder: 'Điền đáp án câu 13 (tối đa 3 từ)...',
          acceptedAnswers: [
            'housing conditions',
            'social factors',
            'neighbourhoods',
            'neighborhoods',
            'housing conditions and neighbourhoods',
            'housing conditions, neighbourhoods',
            'living conditions',
            'environment',
            'housing conditions, neighborhoods'
          ],
          primaryAnswer: 'housing conditions',
          evidence: 'Moreover, their housing conditions and neighbourhoods tend to be worse. All of these factors impact upon the condition of a person’s health: the physical shapes of bodies are strongly influenced by social factors.',
          explanation: 'Đoạn 3 nêu: điều kiện nhà ở ("housing conditions") và các yếu tố xã hội ("social factors") tác động trực tiếp tới thể trạng sức khỏe của một người.'
        },
        {
          id: 'p1_q14',
          number: 14,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Poverty is linked to emotional wellbeing, particularly increasing the risk of ________.',
          placeholder: 'Điền đáp án câu 14 (tối đa 3 từ)...',
          acceptedAnswers: [
            'depression',
            'mental illness',
            'mental health problems',
            'mental health issues',
            'illnesses like depression',
            'illnesses such as depression'
          ],
          primaryAnswer: 'depression',
          evidence: 'For example, certain people with mental health issues may be at risk of becoming homeless, just as a person who is homeless may have an increased risk of illnesses such as depression.',
          explanation: 'Đoạn 4 giải thích nghèo khó gắn liền với sức khỏe cảm xúc: người vô gia cư có nguy cơ gia tăng mắc các bệnh như trầm cảm ("illnesses such as depression") hoặc bệnh tâm thần ("mental illness").'
        },
        {
          id: 'p1_q15',
          number: 15,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Social judgments about body shapes depend on ________ and historical context.',
          placeholder: 'Điền đáp án câu 15 (tối đa 3 từ)...',
          acceptedAnswers: [
            'cultural',
            'cultural context',
            'the cultural',
            'the cultural context',
            'culture',
            'culture and media'
          ],
          primaryAnswer: 'cultural',
          evidence: 'Whether these judgments matter and whether they are positive or negative depends on the cultural and historical context.',
          explanation: 'Đoạn 5 nêu: "...depends on the cultural and historical context." Từ cần điền đứng trước "and historical context" là tính từ "cultural" (hoặc cụm "cultural context").'
        },
        {
          id: 'p1_q16',
          number: 16,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'In the past, a large stomach in middle-aged men was a sign of ________.',
          placeholder: 'Điền đáp án câu 16 (tối đa 3 từ)...',
          acceptedAnswers: [
            'financial success',
            'success',
            'being financially successful',
            'wealth',
            'prosperity',
            'financial success in life'
          ],
          primaryAnswer: 'financial success',
          evidence: '...while in middle-aged men, a large stomach indicated that they were financially successful in life. In many traditional African and Pacific Island cultures, for example, a large body shape was a sign of success...',
          explanation: 'Đoạn 5 nêu rõ: trong quá khứ, chiếc bụng lớn ở đàn ông trung niên biểu thị họ thành đạt về tài chính trong cuộc sống ("financial success" / "success").'
        },
        {
          id: 'p1_q17',
          number: 17,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'In African and Pacific Island cultures, a ________ body shape was admired.',
          placeholder: 'Điền đáp án câu 17 (tối đa 3 từ)...',
          acceptedAnswers: [
            'large',
            'larger'
          ],
          primaryAnswer: 'large',
          evidence: 'In many traditional African and Pacific Island cultures, for example, a large body shape was a sign of success and a shape to be aimed at.',
          explanation: 'Đoạn 5 viết: "a large body shape was a sign of success and a shape to be aimed at." Vóc dáng to lớn ("large") là biểu tượng của thành công và là hình mẫu được ngưỡng mộ.'
        },
        {
          id: 'p1_q18',
          number: 18,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'People might feel undervalued for characteristics like their ________.',
          placeholder: 'Điền đáp án câu 18 (tối đa 3 từ)...',
          acceptedAnswers: [
            'age and height',
            'age, height',
            'age and their height',
            'height and age',
            'age',
            'height'
          ],
          primaryAnswer: 'age and height',
          evidence: 'It is easy for people to feel undervalued because of factors they have no power to change, for example, their age and height.',
          explanation: 'Đoạn 6 nêu rõ con người dễ cảm thấy bị xem nhẹ vì những yếu tố không thể thay đổi như tuổi tác và chiều cao ("age and height").'
        },
        {
          id: 'p1_q19',
          number: 19,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Sociologists believe we should view the body in both biological and ________ terms.',
          placeholder: 'Điền đáp án câu 19 (tối đa 3 từ)...',
          acceptedAnswers: [
            'social',
            'socially'
          ],
          primaryAnswer: 'social',
          evidence: 'Sociologists, then, are suggesting that we should not just view bodies and minds in biological terms, but also in social terms.',
          explanation: 'Đoạn 7 chỉ ra các nhà xã hội học khuyên ta nên nhìn nhận cơ thể trong cả khía cạnh sinh học và khía cạnh xã hội: "in both biological and [social] terms".'
        },
        {
          id: 'p1_q20',
          number: 20,
          sectionId: 'sec2',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Obesity is connected to consuming processed food and a lack of ________.',
          placeholder: 'Điền đáp án câu 20 (tối đa 3 từ)...',
          acceptedAnswers: [
            'exercise',
            'physical exercise',
            'activity',
            'physical activity'
          ],
          primaryAnswer: 'exercise',
          evidence: 'Thus, the idea of people being ‘obese’ is physically related to large amounts of processed food, together with lack of exercise, and is therefore a medical issue.',
          explanation: 'Đoạn 7 khẳng định béo phì gắn liền với việc tiêu thụ thực phẩm chế biến sẵn và thiếu vận động thể dục ("lack of exercise").'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_6_EX8_DETAIL = {
  id: 'intermediate-reading-6-ex8',
  title: 'HOMEWORK - Reading 6 - Bài 08: Communication in Business',
  level: 'IELTS Intermediate',
  session: 'Buổi 6 - Reading 6 (Summary Completion - No More Than Two Words)',
  skill: 'Reading',
  description: 'Đọc đoạn văn về quy trình và quy tắc giao tiếp trong môi trường doanh nghiệp. Điền tối đa 2 từ trực tiếp từ bài đọc vào các chỗ trống 1–5.',
  totalQuestions: 5,
  duration: '15 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: '08 Summary - Completion: Communication in Business',
      shortTitle: 'Passage: Communication in Business',
      wordLimit: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      instruction: 'Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.',
      content: `In all communication, whether this is verbal or non-verbal, a sender transfers a message to a receiver, choosing a certain medium. The receiver uses the message clues and the context, and decodes it to understand it. This is often followed by a new message in return, and so the communication process continues.

Although this procedure is always the same, it can take many different forms depending on the type of communication. For example, in non-verbal communication (as opposed to written and spoken communication, which are both verbal), the code used could be gestures, body language, eye contact and facial expressions, such as a smile.

Communication is extremely important in the business world. It is likely that in this context both informal and formal styles will be used. If we take the example of meetings, we might say that they are often conducted in quite a relaxed way, with participants using first names and informal language. However, as soon as the meeting is official, careful records, called minutes, will be kept, following a predetermined format which is standard across many business situations. Layout is one aspect of a formal style. Content will also be dictated to some extent by the level of formality. Annual business reports must include certain types of information to be legal, e.g. financial information, but even a simple letter would not function as it should without the use of somebody’s title (e.g. Mr or Ms). Language is another aspect which needs to be taken into account. Formal, written communication needs to be clear and to the point, without spelling or grammar mistakes, and in a formal register (e.g. Dear ..., instead of Hi). Not following these important rules would have a negative effect in any business context.`,
      questions: [
        {
          id: 'ex8_q1',
          number: 1,
          question: 'It is important to follow the rules when communicating in writing, especially if you are in a (1) ........................... environment.',
          placeholder: 'Điền đáp án câu 1 (tối đa 2 từ)...',
          acceptedAnswers: ['business', 'business context', 'a business'],
          primaryAnswer: 'business',
          evidence: 'Communication is extremely important in the business world. It is likely that in this context both informal and formal styles will be used... Not following these important rules would have a negative effect in any business context.',
          explanation: 'Đoạn 3 nhấn mạnh tầm quan trọng của quy tắc giao tiếp trong môi trường kinh doanh: "Not following these important rules would have a negative effect in any business context."'
        },
        {
          id: 'ex8_q2',
          number: 2,
          question: 'There are three areas which are important: (2) ..........................., content and language.',
          placeholder: 'Điền đáp án câu 2 (tối đa 2 từ)...',
          acceptedAnswers: ['layout', 'Layout'],
          primaryAnswer: 'layout',
          evidence: 'Layout is one aspect of a formal style. Content will also be dictated to some extent by the level of formality... Language is another aspect which needs to be taken into account.',
          explanation: 'Đoạn 3 liệt kê lần lượt 3 yếu tố quan trọng trong văn phong trang trọng: Layout (bố cục), Content (nội dung), và Language (ngôn ngữ).'
        },
        {
          id: 'ex8_q3',
          number: 3,
          question: 'The language needs to be formal and there should be no (3) ............................',
          placeholder: 'Điền đáp án câu 3 (tối đa 2 từ)...',
          acceptedAnswers: ['spelling or grammar mistakes', 'spelling mistakes', 'grammar mistakes', 'spelling or grammar', 'mistakes'],
          primaryAnswer: 'spelling or grammar mistakes',
          evidence: 'Formal, written communication needs to be clear and to the point, without spelling or grammar mistakes, and in a formal register...',
          explanation: 'Đoạn 3 chỉ ra ngôn ngữ cần rõ ràng, đi thẳng vào vấn đề và không có lỗi chính tả hay ngữ pháp: "without spelling or grammar mistakes".'
        },
        {
          id: 'ex8_q4',
          number: 4,
          question: 'You cannot choose to include exactly what you like, for example financial information must be included in your business’s (4) ............................',
          placeholder: 'Điền đáp án câu 4 (tối đa 2 từ)...',
          acceptedAnswers: ['annual business reports', 'annual reports', 'business reports'],
          primaryAnswer: 'annual business reports',
          evidence: 'Annual business reports must include certain types of information to be legal, e.g. financial information...',
          explanation: 'Đoạn 3 nêu rõ báo cáo kinh doanh thường niên bắt buộc phải chứa thông tin tài chính theo quy định pháp luật: "Annual business reports must include certain types of information to be legal, e.g. financial information".'
        },
        {
          id: 'ex8_q5',
          number: 5,
          question: 'It also needs to look good on the page, with everything written in a (5) ........................... format.',
          placeholder: 'Điền đáp án câu 5 (tối đa 2 từ)...',
          acceptedAnswers: ['predetermined', 'standard'],
          primaryAnswer: 'predetermined',
          evidence: '...careful records, called minutes, will be kept, following a predetermined format which is standard across many business situations.',
          explanation: 'Đoạn 3 nêu văn bản ghi chép chính thức phải tuân theo định dạng có sẵn chuẩn mực: "following a predetermined format which is standard across many business situations".'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_6_EX9_DETAIL = {
  id: 'intermediate-reading-6-ex9',
  title: 'HOMEWORK - Reading 6 - Bài 09: Management & Interpersonal Skills',
  level: 'IELTS Intermediate',
  session: 'Buổi 6 - Reading 6 (Summary Completion - No More Than One Word)',
  skill: 'Reading',
  description: 'Đọc 2 đoạn trích Passage A (Kỹ năng họp và lắng nghe) và Passage B (Kỹ năng tương tác và xử lý xung đột). Điền duy nhất 1 từ trực tiếp từ bài đọc vào mỗi chỗ trống.',
  totalQuestions: 9,
  duration: '20 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: '09 Summary - Completion: Management Communication & Interpersonal Skills',
      shortTitle: 'Passages A & B',
      wordLimit: 'NO MORE THAN ONE WORD',
      maxWords: 1,
      instruction: 'Complete the summaries below. Choose NO MORE THAN ONE WORD from the passage for each answer.',
      content: `Passage A: Managers and Meeting Communication
Managers need a range of communication skills to carry out their jobs effectively. They need to be able to articulate their ideas and vision and to convey enthusiasm. Good managers may, at times, need to be able to argue points cogently and to persuade people to their point of view. However, good managers appreciate that communication is a two-way process, and that listening is an important element of communication. Listening to the views of others can help to test ideas as well as to develop new products and methods of production.

The most common forum in which managers are required to communicate are meetings. It is important for managers to plan for meetings, whether with a single person or with a group. Managers should not invite too many participants to keep numbers to a minimum. They should have a clear agenda for discussion and should exercise tight time controls to prevent meetings dragging on. Managers should enter each meeting with a clear idea of what they want it to achieve. At the end of a meeting it is good practice to summarize what has been agreed and what needs to happen in the future.

Passage B: Interpersonal Skills in Leadership
Communication skills should not be taken for granted. Many managers require training in written and oral communication skills and many businesses would benefit from employing managers who speak at least one other language.

Interpersonal skills are also necessary if a manager is to work successfully with other people. If managers lack interpersonal skills, then they are likely to be of limited effectiveness in their role. Managers with effective interpersonal skills can motivate others and can co-ordinate the work of their employees. To do this, managers may need to coach and encourage employees as well as solving disputes and, perhaps more importantly, preventing conflict.`,
      questions: [
        {
          id: 'ex9_q1',
          number: 1,
          sectionTitle: 'Summary A (Based on Passage A)',
          sectionInstruction: 'Complete Summary A using NO MORE THAN ONE WORD from Passage A.',
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          isSectionStart: true,
          question: 'There should be a small number of (1) ........................... at meetings',
          placeholder: 'Điền đáp án câu 1 (1 từ)...',
          acceptedAnswers: ['participants', 'participant'],
          primaryAnswer: 'participants',
          evidence: 'Managers should not invite too many participants to keep numbers to a minimum.',
          explanation: 'Passage A đoạn 2: "Managers should not invite too many participants to keep numbers to a minimum" (không mời quá nhiều người tham dự để giữ quân số tối thiểu).'
        },
        {
          id: 'ex9_q2',
          number: 2,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'and there needs to be a (2) ........................... for any meeting, which will include a clear agenda.',
          placeholder: 'Điền đáp án câu 2 (1 từ)...',
          acceptedAnswers: ['plan'],
          primaryAnswer: 'plan',
          evidence: 'It is important for managers to plan for meetings, whether with a single person or with a group. They should have a clear agenda for discussion...',
          explanation: 'Passage A đoạn 2 nêu tầm quan trọng của việc chuẩn bị kế hoạch cuộc họp: "It is important for managers to plan for meetings... They should have a clear agenda".'
        },
        {
          id: 'ex9_q3',
          number: 3,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'During the meeting there needs to be good (3) ........................... management',
          placeholder: 'Điền đáp án câu 3 (1 từ)...',
          acceptedAnswers: ['time'],
          primaryAnswer: 'time',
          evidence: '...and should exercise tight time controls to prevent meetings dragging on.',
          explanation: 'Passage A đoạn 2: "exercise tight time controls to prevent meetings dragging on" đồng nghĩa với good time management (quản lý thời gian tốt).'
        },
        {
          id: 'ex9_q4',
          number: 4,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'and clarity about what the meeting should hopefully (4) ........................... .',
          placeholder: 'Điền đáp án câu 4 (1 từ)...',
          acceptedAnswers: ['achieve'],
          primaryAnswer: 'achieve',
          evidence: 'Managers should enter each meeting with a clear idea of what they want it to achieve.',
          explanation: 'Passage A đoạn 2: "Managers should enter each meeting with a clear idea of what they want it to achieve".'
        },
        {
          id: 'ex9_q5',
          number: 5,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'At the end, there should be a summary and agreement about (5) ........................... action.',
          placeholder: 'Điền đáp án câu 5 (1 từ)...',
          acceptedAnswers: ['future'],
          primaryAnswer: 'future',
          evidence: 'At the end of a meeting it is good practice to summarize what has been agreed and what needs to happen in the future.',
          explanation: 'Passage A đoạn 2: tóm tắt những gì đã được thống nhất và các hành động cần triển khai trong tương lai ("what needs to happen in the future").'
        },
        {
          id: 'ex9_q6',
          number: 6,
          sectionTitle: 'Summary B (Based on Passage B)',
          sectionInstruction: 'Complete Summary B using NO MORE THAN ONE WORD from Passage B.',
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          isSectionStart: true,
          question: 'Working with other people is not always easy, but it is (6) ........................... for the role of managers that they have interpersonal skills',
          placeholder: 'Điền đáp án câu 6 (1 từ)...',
          acceptedAnswers: ['necessary'],
          primaryAnswer: 'necessary',
          evidence: 'Interpersonal skills are also necessary if a manager is to work successfully with other people.',
          explanation: 'Passage B đoạn 2 khẳng định kỹ năng tương tác là cần thiết: "Interpersonal skills are also necessary if a manager is to work successfully with other people".'
        },
        {
          id: 'ex9_q7',
          number: 7,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'that are (7) ............................',
          placeholder: 'Điền đáp án câu 7 (1 từ)...',
          acceptedAnswers: ['effective'],
          primaryAnswer: 'effective',
          evidence: 'If managers lack interpersonal skills, then they are likely to be of limited effectiveness in their role. Managers with effective interpersonal skills can motivate others...',
          explanation: 'Passage B đoạn 2: nếu thiếu kỹ năng thì hiệu quả hạn chế, còn người có kỹ năng hiệu quả ("effective interpersonal skills") mới tạo được động lực.'
        },
        {
          id: 'ex9_q8',
          number: 8,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'Their (8) .......................... may need encouragement',
          placeholder: 'Điền đáp án câu 8 (1 từ)...',
          acceptedAnswers: ['employees', 'employee'],
          primaryAnswer: 'employees',
          evidence: 'To do this, managers may need to coach and encourage employees as well as solving disputes...',
          explanation: 'Passage B đoạn 2: đối tượng cần sự khích lệ và huấn luyện là nhân viên: "coach and encourage employees".'
        },
        {
          id: 'ex9_q9',
          number: 9,
          wordLimit: 'NO MORE THAN ONE WORD',
          maxWords: 1,
          question: 'and help with (9) ........................... and solving problems between colleagues.',
          placeholder: 'Điền đáp án câu 9 (1 từ)...',
          acceptedAnswers: ['disputes', 'conflict', 'conflicts'],
          primaryAnswer: 'disputes',
          evidence: '...as well as solving disputes and, perhaps more importantly, preventing conflict.',
          explanation: 'Passage B đoạn 2: giải quyết các tranh chấp ("solving disputes") và ngăn ngừa xung đột ("preventing conflict") giữa các đồng nghiệp.'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_6_EX10_DETAIL = {
  id: 'intermediate-reading-6-ex10',
  title: 'HOMEWORK - Reading 6 - Bài 10: Youth: The Future of Travel',
  level: 'IELTS Intermediate',
  session: 'Buổi 6 - Reading 6 (Summary Completion with Box & Multiple Choice)',
  skill: 'Reading',
  description: 'Bài đọc hoàn chỉnh về xu hướng du lịch giới trẻ gồm 13 câu hỏi: Summary với khung từ A–O (câu 1–7), Chọn 3 đáp án A–G (câu 8–10), và Trắc nghiệm A–D (câu 11–13).',
  totalQuestions: 13,
  duration: '30 phút',
  sections: [
    {
      id: 'sec1',
      title: 'Phần 1: Summary Completion with Word Box',
      shortTitle: 'Phần 1 (1–7)',
      minQ: 1,
      maxQ: 7,
      instruction: 'Questions 1–7. Complete the summary below using the list of words, (A–O) from the box below.',
      wordLimit: 'ONE WORD/PHRASE FROM BOX (A–O)',
      maxWords: 3
    },
    {
      id: 'sec2',
      title: 'Phần 2: Pick from a List (Choose THREE letters, A–G)',
      shortTitle: 'Phần 2 (8–10)',
      minQ: 8,
      maxQ: 10,
      instruction: 'Questions 8–10. Choose THREE letters, A–G. Which THREE of the reasons for the importance of youth travel are given by the writer?',
      wordLimit: 'THREE LETTERS (A–G)',
      maxWords: 1
    },
    {
      id: 'sec3',
      title: 'Phần 3: Multiple Choice (A, B, C or D)',
      shortTitle: 'Phần 3 (11–13)',
      minQ: 11,
      maxQ: 13,
      instruction: 'Questions 11–13. Choose the correct letter, A, B, C or D.',
      wordLimit: 'ONE LETTER ONLY (A, B, C or D)',
      maxWords: 1
    }
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'Youth: The Future of Travel',
      shortTitle: 'Passage: Youth Travel',
      wordLimit: 'IELTS Mixed Task Types',
      maxWords: 3,
      instruction: 'Questions 1–7: Complete the summary using the word box. Questions 8–10: Choose THREE letters, A–G. Questions 11–13: Choose the correct letter, A, B, C or D.',
      content: `Young people are invariably at the leading edge of change and innovation – and the travel industry is no exception. Young people think outside the box, push boundaries and experiment with the new. In an era of unprecedented challenge for the travel industry, youth travel represents not just an important market segment, but also a vital resource for innovation and change.

The travel industry is itself undergoing rapid change. Traditional vertical distribution chains are giving way to a more complex value network involving a wide range of different suppliers from within and beyond the travel sector. Travel is no longer solely dependent on the infrastructure of the old economy – airline seats, hotel beds and travel agents’ shelves. We are entering a new, flexible, networked economy in which information and communications technology (ICT), local culture and society, education, work and play have become part of the tourism value chain. In fact, the inter-relationships between travel, other economic sectors and society as a whole have become so integrated that we might conceive of a ‘value web’ rather than the old value chain.

New value web
In the new tourism value web, value is created by linking actors inside and outside the tourism sector in different combinations to create and exploit new opportunities. Young people are often at the forefront of such innovation, because they are willing to cross boundaries and make new links. As early-adopting, heavy users of new technology, young people are pioneering the use of social networking sites and mobile media in searching for travel information and purchasing products.

Young people are the future of travel
Youth travel has grown rapidly in recent decades as living standards have risen and the populations of developing countries are starting to travel for the first time. Indeed, these first-time travellers are often characterized by being young and comparatively affluent. The global youth travel industry is now estimated to represent almost 190 million international trips a year, and the youth travel industry has grown faster than global travel overall. By 2020 there will be almost 300 million international youth trips per year, according to UNWTO forecasts.

The youth market therefore represents a major opportunity for future growth in the travel industry. With effective development and marketing, the potential of the youth market can be increased still further.

Why youth travel is important
Youth travel is important because it is a market for the future – not just for the future development of the young people themselves, but also the places they visit. WYSE Travel Confederation research shows that young travellers often spend more than other tourists and they are likely to return and give more value to the destination over their lifetime. Moreover, young travellers are a growth market globally, while the spending power of older generations in Western economies may decline in the long term. Another reason why young people are important is that they are less likely to be discouraged from travelling by factors such as disease or natural disasters. They are also the pioneers who discover new destinations and are at the cutting edge of using new technology. Last but not least, young travellers gain cultural benefits from their travel, and contribute to the places they visit.

UNWTO and WYSE Travel Confederation are convinced that youth travel has moved far beyond its original status as a specialized travel niche to become an important element of the travel mix in any tourism destination. One of the reasons for this is that travel underpins many different aspects of youth lifestyles. For young people:
• Travel is a form of learning
• Travel is a way of meeting other people
• Travel is a way of getting in touch with other cultures
• Travel is a source of career development
• Travel is a means of self-development
• Travel is part of their identity – you are where you’ve been.

Young people see travel as an essential part of their everyday lives, rather than just a brief escape from reality. This has far-reaching consequences for the places they visit. Because of the way they travel, the social and cultural consequences of hosting young people are becoming even more important than the economic effects. So the added value to be extracted from youth travel lies in innovation, positioning, cultural links, international trade and exchange, social support, education, learning support for local communities, and so on.`,
      questions: [
        {
          id: 'ex10_q1',
          number: 1,
          sectionId: 'sec1',
          sectionTitle: 'Questions 1–7. Summary Completion with Word Box',
          sectionInstruction: 'Youth travel: a force for change. Complete the summary using the list of words (A–O) from the box below.',
          wordLimit: 'ONE WORD/PHRASE FROM BOX (A–O)',
          maxWords: 3,
          isSectionStart: true,
          sectionWordBank: [
            { letter: 'A', word: 'transformation' },
            { letter: 'B', word: 'impact' },
            { letter: 'C', word: 'developments' },
            { letter: 'D', word: 'transforming' },
            { letter: 'E', word: 'crucial force' },
            { letter: 'F', word: 'conflict' },
            { letter: 'G', word: 'interest' },
            { letter: 'H', word: 'block' },
            { letter: 'I', word: 'role' },
            { letter: 'J', word: 'network' },
            { letter: 'K', word: 'link' },
            { letter: 'L', word: 'older travellers' },
            { letter: 'M', word: 'integration' },
            { letter: 'N', word: 'circumstances' },
            { letter: 'O', word: 'youth travel' }
          ],
          question: 'In all fields, including the travel industry, young people are usually at the forefront of any new 1 ……………… .',
          placeholder: 'Chọn C hoặc điền developments...',
          acceptedAnswers: ['C', 'c', 'developments', 'development', 'C. developments'],
          primaryAnswer: 'C (developments)',
          evidence: 'Young people are invariably at the leading edge of change and innovation – and the travel industry is no exception. Young people think outside the box, push boundaries and experiment with the new.',
          explanation: 'Đoạn 1 nêu: người trẻ luôn đi đầu trong đổi mới và thử nghiệm cái mới ("experiment with the new" = new developments). Đáp án là C.'
        },
        {
          id: 'ex10_q2',
          number: 2,
          sectionId: 'sec1',
          question: 'They set trends and so are a 2 ……………… for innovation and change.',
          placeholder: 'Chọn E hoặc điền crucial force...',
          acceptedAnswers: ['E', 'e', 'crucial force', 'E. crucial force'],
          primaryAnswer: 'E (crucial force)',
          evidence: '...youth travel represents not just an important market segment, but also a vital resource for innovation and change.',
          explanation: 'Đoạn 1 nêu du lịch giới trẻ là nguồn lực sống còn cho đổi mới: "vital resource for innovation and change" = crucial force. Đáp án là E.'
        },
        {
          id: 'ex10_q3',
          number: 3,
          sectionId: 'sec1',
          question: 'This is important as the travel industry is also experiencing its own 3 ……………… .',
          placeholder: 'Chọn A hoặc điền transformation...',
          acceptedAnswers: ['A', 'a', 'transformation', 'A. transformation'],
          primaryAnswer: 'A (transformation)',
          evidence: 'The travel industry is itself undergoing rapid change.',
          explanation: 'Đoạn 2 nêu ngành du lịch đang trải qua sự thay đổi nhanh chóng: "undergoing rapid change" = transformation. Đáp án là A.'
        },
        {
          id: 'ex10_q4',
          number: 4,
          sectionId: 'sec1',
          question: 'The modern travel industry is not about airline seats and hotel beds any more, but a new more open economy where factors such as local culture and society have a 4 ……………… in tourism.',
          placeholder: 'Chọn I hoặc điền role...',
          acceptedAnswers: ['I', 'i', 'role', 'I. role'],
          primaryAnswer: 'I (role)',
          evidence: '...in which information and communications technology (ICT), local culture and society, education, work and play have become part of the tourism value chain.',
          explanation: 'Đoạn 2: các yếu tố văn hóa và xã hội địa phương đã trở thành một phần trong chuỗi giá trị du lịch ("have become part of...") = have a role in tourism. Đáp án là I.'
        },
        {
          id: 'ex10_q5',
          number: 5,
          sectionId: 'sec1',
          question: 'Indeed, the 5 ……………… of travel and other parts of the economy and society means that traditional vertical distribution chains have been replaced by a 6 ……………… , or value web.',
          placeholder: 'Chọn M hoặc điền integration...',
          acceptedAnswers: ['M', 'm', 'integration', 'M. integration'],
          primaryAnswer: 'M (integration)',
          evidence: 'In fact, the inter-relationships between travel, other economic sectors and society as a whole have become so integrated that we might conceive of a ‘value web’...',
          explanation: 'Đoạn 2: mối quan hệ qua lại giữa du lịch và các ngành kinh tế xã hội trở nên tích hợp ("so integrated") = integration. Đáp án là M.'
        },
        {
          id: 'ex10_q6',
          number: 6,
          sectionId: 'sec1',
          question: 'means that traditional vertical distribution chains have been replaced by a 6 ……………… , or value web.',
          placeholder: 'Chọn J hoặc điền network...',
          acceptedAnswers: ['J', 'j', 'network', 'J. network'],
          primaryAnswer: 'J (network)',
          evidence: 'Traditional vertical distribution chains are giving way to a more complex value network involving a wide range of different suppliers...',
          explanation: 'Đoạn 2 nêu chuỗi phân phối dọc truyền thống đang nhường chỗ cho một mạng lưới giá trị phức tạp hơn ("complex value network") = network. Đáp án là J.'
        },
        {
          id: 'ex10_q7',
          number: 7,
          sectionId: 'sec1',
          question: 'Due to increased numbers of fairly rich young travellers from developing countries, 7 ……………… now accounts for nearly 190 million trips annually.',
          placeholder: 'Chọn O hoặc điền youth travel...',
          acceptedAnswers: ['O', 'o', 'youth travel', 'O. youth travel'],
          primaryAnswer: 'O (youth travel)',
          evidence: 'The global youth travel industry is now estimated to represent almost 190 million international trips a year...',
          explanation: 'Đoạn 4 nêu ngành du lịch giới trẻ toàn cầu hiện chiếm gần 190 triệu chuyến đi quốc tế mỗi năm: "global youth travel industry... represent almost 190 million international trips". Đáp án là O.'
        },
        {
          id: 'ex10_q8',
          number: 8,
          sectionId: 'sec2',
          sectionTitle: 'Questions 8–10. Pick from a list (Choose THREE letters, A–G)',
          sectionInstruction: 'Which THREE of the following reasons for the importance of youth travel are given by the writer of the text? (Choose A, D, or G for Boxes 8, 9, and 10)',
          wordLimit: 'CHOOSE THREE LETTERS (A–G)',
          maxWords: 1,
          isSectionStart: true,
          options: [
            { letter: 'A', text: 'They make use of the latest technology that is available.' },
            { letter: 'B', text: 'They spend a large proportion of their money on travelling worldwide.' },
            { letter: 'C', text: 'They avoid conflicts with local people more than older people.' },
            { letter: 'D', text: 'They will probably return to the places they have visited later in their lives.' },
            { letter: 'E', text: 'They are more likely to learn the local language than older people are.' },
            { letter: 'F', text: 'They are experiencing a rapid increase in their disposable income.' },
            { letter: 'G', text: 'They give something back to the destinations they have been to.' }
          ],
          question: 'Lý do 1 giải thích tầm quan trọng của du lịch giới trẻ (Chọn A, D hoặc G):',
          placeholder: 'Chọn A, D hoặc G...',
          acceptedAnswers: ['A', 'D', 'G', 'a', 'd', 'g', 'They make use of the latest technology that is available', 'They will probably return to the places they have visited later in their lives', 'They give something back to the destinations they have been to'],
          primaryAnswer: 'A',
          evidence: 'They are also the pioneers who discover new destinations and are at the cutting edge of using new technology.',
          explanation: 'Đoạn 5 nêu: "at the cutting edge of using new technology" = They make use of the latest technology that is available (Đáp án A).'
        },
        {
          id: 'ex10_q9',
          number: 9,
          sectionId: 'sec2',
          options: [
            { letter: 'A', text: 'They make use of the latest technology that is available.' },
            { letter: 'B', text: 'They spend a large proportion of their money on travelling worldwide.' },
            { letter: 'C', text: 'They avoid conflicts with local people more than older people.' },
            { letter: 'D', text: 'They will probably return to the places they have visited later in their lives.' },
            { letter: 'E', text: 'They are more likely to learn the local language than older people are.' },
            { letter: 'F', text: 'They are experiencing a rapid increase in their disposable income.' },
            { letter: 'G', text: 'They give something back to the destinations they have been to.' }
          ],
          question: 'Lý do 2 giải thích tầm quan trọng của du lịch giới trẻ (Chọn A, D hoặc G):',
          placeholder: 'Chọn A, D hoặc G...',
          acceptedAnswers: ['A', 'D', 'G', 'a', 'd', 'g', 'They make use of the latest technology that is available', 'They will probably return to the places they have visited later in their lives', 'They give something back to the destinations they have been to'],
          primaryAnswer: 'D',
          evidence: 'WYSE Travel Confederation research shows that young travellers often spend more than other tourists and they are likely to return and give more value to the destination over their lifetime.',
          explanation: 'Đoạn 5 nêu: "they are likely to return and give more value to the destination over their lifetime" = They will probably return to the places they have visited later in their lives (Đáp án D).'
        },
        {
          id: 'ex10_q10',
          number: 10,
          sectionId: 'sec2',
          options: [
            { letter: 'A', text: 'They make use of the latest technology that is available.' },
            { letter: 'B', text: 'They spend a large proportion of their money on travelling worldwide.' },
            { letter: 'C', text: 'They avoid conflicts with local people more than older people.' },
            { letter: 'D', text: 'They will probably return to the places they have visited later in their lives.' },
            { letter: 'E', text: 'They are more likely to learn the local language than older people are.' },
            { letter: 'F', text: 'They are experiencing a rapid increase in their disposable income.' },
            { letter: 'G', text: 'They give something back to the destinations they have been to.' }
          ],
          question: 'Lý do 3 giải thích tầm quan trọng của du lịch giới trẻ (Chọn A, D hoặc G):',
          placeholder: 'Chọn A, D hoặc G...',
          acceptedAnswers: ['A', 'D', 'G', 'a', 'd', 'g', 'They make use of the latest technology that is available', 'They will probably return to the places they have visited later in their lives', 'They give something back to the destinations they have been to'],
          primaryAnswer: 'G',
          evidence: 'Last but not least, young travellers gain cultural benefits from their travel, and contribute to the places they visit.',
          explanation: 'Đoạn 5 nêu: "and contribute to the places they visit" = They give something back to the destinations they have been to (Đáp án G).'
        },
        {
          id: 'ex10_q11',
          number: 11,
          sectionId: 'sec3',
          sectionTitle: 'Questions 11–13. Multiple Choice (Choose A, B, C or D)',
          sectionInstruction: 'Choose the correct letter, A, B, C or D.',
          wordLimit: 'ONE LETTER ONLY (A, B, C or D)',
          maxWords: 1,
          isSectionStart: true,
          options: [
            { letter: 'A', text: 'it helps them to relax.' },
            { letter: 'B', text: 'it is an educational experience.' },
            { letter: 'C', text: 'it improves their confidence.' },
            { letter: 'D', text: 'it makes them more mature.' }
          ],
          question: '11. Travel is central to young people’s lifestyle, partly because',
          placeholder: 'Chọn A, B, C hoặc D...',
          acceptedAnswers: ['B', 'b', 'it is an educational experience', 'B. it is an educational experience'],
          primaryAnswer: 'B',
          evidence: '• Travel is a form of learning',
          explanation: 'Trong danh sách các yếu tố gắn liền với lối sống giới trẻ, tác giả nêu: "Travel is a form of learning" (du lịch là một hình thức học tập = educational experience). Do đó đáp án là B.'
        },
        {
          id: 'ex10_q12',
          number: 12,
          sectionId: 'sec3',
          options: [
            { letter: 'A', text: 'of no consequence compared to the social and cultural effects.' },
            { letter: 'B', text: 'of greater consequence than the social and cultural effects.' },
            { letter: 'C', text: 'of lesser consequence than the social and cultural effects.' },
            { letter: 'D', text: 'just as valuable as the social and cultural effects.' }
          ],
          question: '12. According to the writer, the economic impact of hosting young people is',
          placeholder: 'Chọn A, B, C hoặc D...',
          acceptedAnswers: ['C', 'c', 'of lesser consequence than the social and cultural effects', 'C. of lesser consequence than the social and cultural effects'],
          primaryAnswer: 'C',
          evidence: 'Because of the way they travel, the social and cultural consequences of hosting young people are becoming even more important than the economic effects.',
          explanation: 'Đoạn 7 chỉ ra hệ quả xã hội và văn hóa đang trở nên quan trọng hơn cả tác động kinh tế ("even more important than the economic effects"), đồng nghĩa với việc tác động kinh tế ít quan trọng hơn (of lesser consequence than the social and cultural effects). Do đó đáp án là C.'
        },
        {
          id: 'ex10_q13',
          number: 13,
          sectionId: 'sec3',
          options: [
            { letter: 'A', text: 'youth travel is not an important area for the travel industry.' },
            { letter: 'B', text: 'the main contribution of young people to the travel industry is in innovation.' },
            { letter: 'C', text: 'young people value the cultural links gained from travelling more than anything else.' },
            { letter: 'D', text: 'there is a wide range of additional benefits to be derived from youth travel.' }
          ],
          question: '13. The writer concludes that',
          placeholder: 'Chọn A, B, C hoặc D...',
          acceptedAnswers: ['D', 'd', 'there is a wide range of additional benefits to be derived from youth travel', 'D. there is a wide range of additional benefits to be derived from youth travel'],
          primaryAnswer: 'D',
          evidence: 'So the added value to be extracted from youth travel lies in innovation, positioning, cultural links, international trade and exchange, social support, education, learning support for local communities, and so on.',
          explanation: 'Đoạn kết luận chỉ ra giá trị gia tăng được khai thác từ du lịch giới trẻ nằm ở rất nhiều khía cạnh bổ sung phong phú (đổi mới, liên kết văn hóa, thương mại quốc tế, hỗ trợ cộng đồng...) = "wide range of additional benefits to be derived from youth travel". Do đó đáp án là D.'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_6_DETAIL = {
  id: 'intermediate-reading-6',
  title: 'HOMEWORK - Reading 6 - Summary Completion & Multiple Choice (Full Lesson 6)',
  level: 'IELTS Intermediate',
  session: 'Buổi 6 - Reading 6 (Trọn bộ 3 Bài tập: Ex 08, Ex 09, Ex 10)',
  skill: 'Reading',
  description: 'Trọn bộ 3 bài tập về nhà Reading 6 gồm 27 câu hỏi: Bài 08 (Summary - Max 2 words), Bài 09 (Summary A & B - Max 1 word) và Bài 10 (Youth: The Future of Travel - Summary box & Multiple Choice).',
  totalQuestions: 27,
  duration: '50 - 60 phút',
  passages: [
    {
      ...INTERMEDIATE_READING_6_EX8_DETAIL.passages[0],
      id: 'p1',
      number: 1,
      shortTitle: 'Bài 1: Ex 08 - Communication in Business',
      questions: INTERMEDIATE_READING_6_EX8_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number
      }))
    },
    {
      ...INTERMEDIATE_READING_6_EX9_DETAIL.passages[0],
      id: 'p2',
      number: 2,
      shortTitle: 'Bài 2: Ex 09 - Management Skills',
      questions: INTERMEDIATE_READING_6_EX9_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number + 5,
        romanNumber: `Ex 9.${q.number}`
      }))
    },
    {
      ...INTERMEDIATE_READING_6_EX10_DETAIL.passages[0],
      id: 'p3',
      number: 3,
      shortTitle: 'Bài 3: Ex 10 - Youth Travel',
      questions: INTERMEDIATE_READING_6_EX10_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number + 14,
        romanNumber: `Ex 10.${q.number}`
      }))
    }
  ]
};

export function getHomeworkDetailById(id) {
  if (id === 'intermediate-reading-6') {
    return INTERMEDIATE_READING_6_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex8') {
    return INTERMEDIATE_READING_6_EX8_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex9') {
    return INTERMEDIATE_READING_6_EX9_DETAIL;
  }
  if (id === 'intermediate-reading-6-ex10') {
    return INTERMEDIATE_READING_6_EX10_DETAIL;
  }
  if (id === 'pre-ielts-reading-2') {
    return PRE_IELTS_READING_2_DETAIL;
  }
  if (id === 'pre-ielts-reading-1') {
    return PRE_IELTS_READING_1_DETAIL;
  }
  if (id === 'pre-ielts-listening-1') {
    return PRE_IELTS_LISTENING_1_DETAIL;
  }
  return null;
}
