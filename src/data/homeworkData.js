export const HOMEWORK_LEVELS = [
  { id: 'ielts-beginner', label: 'IELTS Beginner', badge: 'Beginner (3.0 - 4.0)' },
  { id: 'pre-ielts', label: 'Pre IELTS', badge: 'Pre-Intermediate (4.0 - 5.0)' },
  { id: 'ielts-foundation', label: 'IELTS Foundation', badge: 'Intermediate (5.0 - 6.0)' },
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
    levelLabel: 'IELTS Foundation',
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
  title: 'E - HOMEWORK - Reading 1 - Short-answer Questions',
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

export function getHomeworkDetailById(id) {
  if (id === 'pre-ielts-reading-1') {
    return PRE_IELTS_READING_1_DETAIL;
  }
  if (id === 'pre-ielts-listening-1') {
    return PRE_IELTS_LISTENING_1_DETAIL;
  }
  return null;
}
