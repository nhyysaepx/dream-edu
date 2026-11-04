// Mock & Actual Exam Data for Dream Education Test Platform
// Modeled directly from Full Original Exam VOL 1-9 collections

export const EXAM_COLLECTIONS = [
  {
    id: 'vol1-lis-1',
    vol: 1,
    testNum: 1,
    title: 'IELTS Collection 1 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 378624,
    commentsCount: 628,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening'],
    audioUrl: '/audio/vol1_test1_part1.mp3',
    parts: [
      {
        id: 1,
        title: 'Recording 1',
        name: 'Part 1: Beacon Festival Offers',
        questionRange: '1–10',
        questionCount: 10,
        tags: ['#[Listening] Note/Form Completion', '#[Listening] Table Completion'],
        instruction: 'Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
        context: 'Beach and festival offers',
        questions: [
          { id: 1, prefix: 'June 19th: Concert with local musicians in the', suffix: '', answer: 'theater', acceptable: ['theater', 'theatre'] },
          { id: 2, prefix: 'June 20th: Guided tour starting at', suffix: '(error on ticket said 3:40)', answer: '4:00', acceptable: ['4:00', '4 pm', '4pm', '16:00', '4'] },
          { id: 3, prefix: 'Guide will meet the tour group at the', suffix: '', answer: 'station', acceptable: ['station', 'train station'] },
          { id: 4, prefix: 'June 21st: Children\'s cooking competition in the', suffix: '', answer: 'community center', acceptable: ['community center', 'community centre'] },
          { id: 5, prefix: 'Children must bring their own', suffix: 'for food presentation', answer: 'plate', acceptable: ['plate', 'a plate'] },
          { id: 6, prefix: 'June 22nd: Evening fireworks will take place in the', suffix: '', answer: 'town square', acceptable: ['town square', 'square'] },
          { id: 7, prefix: 'To reduce noise for local residents, all evening events finish by', suffix: '', answer: '11:15', acceptable: ['11:15', '11.15', '11:15 pm', '11:15pm'] },
          { id: 8, prefix: 'Due to large crowds, parking is banned in the', suffix: '', answer: 'center', acceptable: ['center', 'centre', 'town center', 'town centre'] },
          { id: 9, prefix: 'Discount for local residents on all advance bookings is', suffix: '%', answer: '20', acceptable: ['20', '20%', 'twenty'] },
          { id: 10, prefix: 'Full festival details and ticket booking website: www.', suffix: '', answer: 'beaconfestival.com', acceptable: ['beaconfestival.com', 'beaconfestival'] },
        ]
      },
      {
        id: 2,
        title: 'Recording 2',
        name: 'Part 2: Walking Holiday in Spain',
        questionRange: '11–20',
        questionCount: 10,
        tags: ['#[Listening] Matching', '#[Listening] Multiple Choice'],
        instruction: 'Choose the correct letter, A, B, or C.',
        context: 'Gary Payne introduces walking tour itinerary and equipment.',
        questions: [
          { id: 11, question: 'What is the main advantage of the walking route selected for this year?', options: ['A. It has recently been newly resurfaced', 'B. It avoids roads with heavy motor traffic', 'C. It provides shelters along every kilometer'], answer: 'B' },
          { id: 12, question: 'Walkers must carry a waterproof jacket because:', options: ['A. Afternoon mountain rain is common', 'B. Temperatures drop dramatically at sea level', 'C. Luggage vans do not travel along trail routes'], answer: 'A' },
          { id: 13, question: 'Meals provided at the hostel include:', options: ['A. Buffet breakfast and evening dinner', 'B. Packed lunch and three snacks daily', 'C. Unlimited mineral water and hot drinks'], answer: 'A' },
          { id: 14, question: 'In case of severe blister or minor injury, walkers should:', options: ['A. Immediately take a local taxi back to hotel', 'B. Contact the assistant leader carrying the first-aid kit', 'C. Rest at the nearest milestone checkpoint'], answer: 'B' },
          { id: 15, prefix: 'Day 1 Route difficulty rating: ', suffix: '', answer: 'moderate', acceptable: ['moderate'] },
          { id: 16, prefix: 'Day 2 High pass elevation: ', suffix: 'meters', answer: '1850', acceptable: ['1850', '1,850'] },
          { id: 17, prefix: 'Day 3 Historic village visit: ', suffix: '', answer: 'Santillana', acceptable: ['Santillana', 'santillana'] },
          { id: 18, prefix: 'Day 4 Coastal cliff footpath length: ', suffix: 'km', answer: '14', acceptable: ['14', '14 km'] },
          { id: 19, prefix: 'Special equipment required: Walking', suffix: '', answer: 'poles', acceptable: ['poles', 'sticks'] },
          { id: 20, prefix: 'Emergency phone number for leader: ', suffix: '', answer: '07946 22891', acceptable: ['07946 22891', '0794622891'] },
        ]
      },
      {
        id: 3,
        title: 'Recording 3',
        name: 'Part 3: Peer Assessment Research Discussion',
        questionRange: '21–30',
        questionCount: 10,
        tags: ['#[Listening] Matching', '#[Listening] Map/Plan/Diagram Labelling'],
        instruction: 'Choose the correct letter, A, B, or C.',
        context: 'Steve and Sally discuss university research on student peer assessment.',
        questions: [
          { id: 21, question: 'Why does Sally believe peer assessment is initially challenging for students?', options: ['A. They doubt their own objective knowledge', 'B. Marking rubrics are excessively complex', 'C. It demands substantial extra study time'], answer: 'C' },
          { id: 22, question: 'What unexpected result did the study reveal about male student markers?', options: ['A. They marked male presenters more harshly', 'B. They were stricter on female presenters', 'C. They awarded identical marks across both genders'], answer: 'B' },
          { id: 23, question: 'How did female students mark different presenters?', options: ['A. They showed no noticeable gender bias', 'B. They consistently favoured other women', 'C. They downgraded male presenters on presentation style'], answer: 'A' },
          { id: 24, question: 'What did the research find concerning mature students?', options: ['A. They received more favorable marks from younger peers', 'B. Younger markers rated mature presentations more critically', 'C. Mature students refused to evaluate younger counterparts'], answer: 'A' },
          { id: 25, question: 'What was the effect of comparing students across two universities?', options: ['A. Discrepancies were severe between institutions', 'B. Marking standards were remarkably consistent', 'C. Course tutors had to re-mark 60% of papers'], answer: 'B' },
          { id: 26, prefix: 'Tutor intervention is required when marks differ by more than', suffix: '%', answer: '15', acceptable: ['15', '15%'] },
          { id: 27, prefix: 'The primary benefit identified was heightened student', suffix: '', answer: 'reflection', acceptable: ['reflection', 'self-reflection'] },
          { id: 28, prefix: 'Future studies should examine peer feedback on written', suffix: '', answer: 'dissertations', acceptable: ['dissertations', 'essays', 'reports'] },
          { id: 29, prefix: 'Sample size analyzed in the pilot test: ', suffix: 'students', answer: '120', acceptable: ['120'] },
          { id: 30, prefix: 'Project supervisor for Sally\'s department: Dr.', suffix: '', answer: 'Henderson', acceptable: ['Henderson', 'henderson'] },
        ]
      },
      {
        id: 4,
        title: 'Recording 4',
        name: 'Part 4: Endangered Languages & Dialects',
        questionRange: '31–40',
        questionCount: 10,
        tags: ['#[Listening] Note/Form Completion'],
        instruction: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
        context: 'Linguistics lecture on language diversity and cultural preservation.',
        questions: [
          { id: 31, prefix: 'Approximately 50% of the world\'s languages may vanish within a', suffix: '', answer: 'century', acceptable: ['century'] },
          { id: 32, prefix: 'Languages carry invaluable knowledge about indigenous medicine and local', suffix: '', answer: 'plants', acceptable: ['plants', 'botany', 'flora'] },
          { id: 33, prefix: 'Dominant global languages spread rapidly due to economic and digital', suffix: '', answer: 'media', acceptable: ['media', 'technology'] },
          { id: 34, prefix: 'In Australia and the Americas, loss was accelerated by compulsory', suffix: 'schooling', answer: 'boarding', acceptable: ['boarding', 'residential'] },
          { id: 35, prefix: 'Revitalization in New Zealand succeeded through preschool language', suffix: 'nests', answer: 'nests', acceptable: ['nests'] },
          { id: 36, prefix: 'Digital archiving requires native speakers to record both audio and', suffix: 'gestures', answer: 'video', acceptable: ['video', 'visual'] },
          { id: 37, prefix: 'Grammatical structures in rare languages challenge theories of universal', suffix: 'grammar', answer: 'syntax', acceptable: ['syntax', 'grammar'] },
          { id: 38, prefix: 'Community pride is restored when youth learn ancestral', suffix: '', answer: 'songs', acceptable: ['songs', 'chants', 'stories'] },
          { id: 39, prefix: 'Government policy must guarantee official legal', suffix: 'protection', answer: 'status', acceptable: ['status', 'recognition'] },
          { id: 40, prefix: 'Preserving languages ultimately safeguards global human', suffix: '', answer: 'diversity', acceptable: ['diversity', 'heritage'] },
        ]
      }
    ],
    transcript: `Audio Test 1 - Full Transcript
Speaker 1 [00:00:01] IELTS Listening. Version 16208. You will hear a number of different recordings and you will have to answer questions on what you hear. 

Section 1: Beacon Festival Offers
Speaker 2 [00:01:49] Oh, hello. I want to check some details about the festival. I know tickets are running out fast and I haven't got access to the Internet at present. My computer's down.
Speaker 1 [00:02:00] Okay, well, the first activity is on June the 19th at 7pm, and it's a concert with local musicians performing.
Speaker 2 [00:02:09] Lovely. Is it in the theater, like last year?
Speaker 1 [00:03:03] Yes, that's right. And for the next activity on the 20th, the time's changed. It does say on the tickets that it's a 3:40 start, but that's an error. The guided tour starts at 4:00.
Speaker 2 [00:03:25] Oh, right. Do we meet at the town hall?
Speaker 1 [00:03:35] No. Just turn up at the station where the guide will be waiting. They'll start from there.
Speaker 2 [00:03:53] Fine.
Speaker 1 [00:03:54] And then on the 21st, there's a kids cooking competition at the beach and community center. They don't need to bring any ingredients, but they'll need to have a plate to put whatever they've made on.
Speaker 2 [00:04:25] And what about the fireworks?
Speaker 1 [00:04:37] Yes, that's on June 22nd. It's in the town square.
Speaker 2 [00:05:35] What about noise limits for local residents?
Speaker 1 [00:05:45] Evening events won't go on beyond 11:15. Also, parking in the town center is restricted to keep roads clear. Local residents get a 20% discount on tickets. Visit www.beaconfestival.com for more info.

Section 2: Walking Holiday in Spain
Speaker 3 [00:08:31] Well, good evening, everyone. My name's Gary Payne, and I'll be the leader for your walking holiday in Spain. The route we chose this year avoids heavy motor traffic...

Section 3: Peer Assessment Research Discussion
Speaker 4 [00:15:25] Hi Steve. I'm analyzing the student peer assessment data. Our findings showed male markers were stricter on female presenters, whereas female markers showed no gender bias...

Section 4: Endangered Languages
Speaker 3 [00:22:18] Good morning and welcome. Today I will talk about language death and revitalization efforts around the world...`
  },
  {
    id: 'vol1-read-1',
    vol: 1,
    testNum: 1,
    title: 'IELTS Collection 1 Reading Test 1',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 260979,
    commentsCount: 551,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading'],
    parts: [
      { id: 1, title: 'Passage 1', name: 'The History of Tea Trade', questionRange: '1–13', questionCount: 13, tags: ['#[Reading] True/False/Not Given', '#[Reading] Notes Completion'] },
      { id: 2, title: 'Passage 2', name: 'Biomimicry in Modern Architecture', questionRange: '14–26', questionCount: 13, tags: ['#[Reading] Matching Information', '#[Reading] Summary Completion'] },
      { id: 3, title: 'Passage 3', name: 'The Psychology of Decision Making', questionRange: '27–40', questionCount: 14, tags: ['#[Reading] Multiple Choice', '#[Reading] Yes/No/Not Given'] }
    ]
  },
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Sports Club Registration', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: New City Library Tour', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Map Labelling'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Marine Biology Fieldwork', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Global Climate Patterns', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Reading'],
    parts: [
      { id: 1, title: 'Passage 1', name: 'Early Roman Engineering', questionRange: '1–13', questionCount: 13, tags: ['#[Reading] True/False/Not Given'] },
      { id: 2, title: 'Passage 2', name: 'The Science of Sleep and Memory', questionRange: '14–26', questionCount: 13, tags: ['#[Reading] Matching'] },
      { id: 3, title: 'Passage 3', name: 'Evolution of Modern Economics', questionRange: '27–40', questionCount: 14, tags: ['#[Reading] Summary Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Travel Agency Itinerary', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Community Park Renovation', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Psychology Assignment Review', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Deep Ocean Ecosystems', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
  },
  {
    id: 'vol3-read-1',
    vol: 3,
    testNum: 1,
    title: 'IELTS Collection 3 Reading Test 1',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 84300,
    commentsCount: 132,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading'],
    parts: [
      { id: 1, title: 'Passage 1', name: 'Ancient Silk Road Artifacts', questionRange: '1–13', questionCount: 13, tags: ['#[Reading] True/False/Not Given'] },
      { id: 2, title: 'Passage 2', name: 'Subterranean Forest Fungi Networks', questionRange: '14–26', questionCount: 13, tags: ['#[Reading] Headings Matching'] },
      { id: 3, title: 'Passage 3', name: 'Cognitive Biases in Leadership', questionRange: '27–40', questionCount: 14, tags: ['#[Reading] Multiple Choice'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Rental Property Contract', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Botanical Garden Audio Tour', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Map Labelling'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Renewable Solar Farm Research', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Early Human Migration', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Volunteer Work Application', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Railway Heritage Museum', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Business Marketing Presentation', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Coral Reef Conservation', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Cookery Course Enrollment', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Wildlife Safari Orientation', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Architecture Thesis Discussion', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: History of Timekeeping', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Hotel Conference Booking', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Astronomy Centre Overview', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Environmental Engineering Study', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Cognitive Linguistics Analysis', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: University Accommodation Registration', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Public Transport System Upgrade', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Social Anthropology Debate', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Acoustic Ecology in Oceans', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
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
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Fitness Centre Membership', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Local Art Gallery Expansion', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Genetic Botany Research', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Neuroscience of Language Acquisition', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Notes Completion'] }
    ]
  }
];

export const FILTER_CATEGORIES = [
  'Tất cả',
  'IELTS Academic',
  'IELTS General',
  'TOEIC SW',
  'TOEIC',
  'HSK 1',
  'HSK 2',
  'HSK 3',
  'HSK 4',
  'HSK 5',
  'HSK 6',
  'TOPIK I',
  'TOPIK II',
  'N5',
  'N4',
  'N3',
  'N2',
  'N1',
  'Tiếng Anh THPTQG',
  'Toán THPTQG',
  'Vật lý THPTQG',
  'Hóa học THPTQG',
  'Sinh học THPTQG',
  'Digital SAT',
  'ACT'
];
