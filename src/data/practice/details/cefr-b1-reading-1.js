// CEFR B1 Reading 1: Academic & Life Reading (4 Passages / 39 Questions)
// Practice detail data for cefr-b1-reading-1

export const CEFR_B1_READING_1_PRACTICE_DETAIL = {
  id: 'cefr-b1-reading-1',
  title: 'CEFR B1 - Practice: Reading 1',
  level: 'Level B1',
  levelId: 'b1',
  category: 'cefr',
  session: 'Practice 01 - Academic & Life Reading',
  skill: 'Reading',
  vocabId: 'cefr-b1-reading-1',
  vocabCount: 40,
  vocabLabel: 'Học 40 từ vựng Reading 1',
  description: 'Trọn bộ bài luyện tập kỹ năng Reading chuẩn Khung tham chiếu Châu Âu CEFR B1 (Intermediate) gồm 39 câu hỏi qua 4 bài đọc học thuật: What Is Stress?, Crowding Human Life, Global Warming và Demand for Water in the United States, kết hợp chấm điểm từng phần và giải thích chi tiết.',
  totalQuestions: 39,
  duration: '60 - 75 phút',
  tag: 'Khung Châu Âu B1 (Intermediate)',
  strategyTips: [
    'Skim each reading passage quickly to understand the main topic and how each paragraph is structured.',
    'Underline key words in the question stems and find their synonyms or parallel expressions in the passage.',
    'For Summary Completion and Short Answer questions, pay strict attention to word limits: NO MORE THAN THREE WORDS taken directly from the passage.',
    'In True / False / Not Given and Yes / No / Not Given, distinguish carefully between False/No (contradicted by the text) and Not Given (information not mentioned in the text).',
    'Use the modular grading feature after completing each passage to review instant feedback, evidence and detailed explanations.'
  ],
  passages: [
    // ==========================================
    // PASSAGE 1: WHAT IS STRESS? (QUESTIONS 1 - 12)
    // ==========================================
    {
      id: 'p1',
      number: 1,
      title: 'Activity 1: What Is Stress?',
      shortTitle: '1. What Is Stress?',
      wordLimit: 'NO MORE THAN THREE WORDS / ONE OPTION',
      instruction: 'Read the passage "What Is Stress?" and answer questions 1–12. Questions 1–5: Complete the summary below by choosing NO MORE THAN THREE WORDS from the passage for each answer. Questions 6–12: Decide whether the statements are True, False or Not Given.',
      tip: 'TIP: Chú ý định nghĩa về stress, các phản ứng thể chất (heart beats faster, perspire), các tác nhân gây stress (stressors) và khái niệm thẩm định hoàn cảnh (appraisal).',
      content: `What Is Stress?

Most people would say they know what stress is. But for scientists who study stress, it has been surprisingly hard to define. This is because there are so many ways of looking at stress.

Some researchers have studied how our bodies react to stress. You know how your heart beats faster, you perspire more heavily, and your words do not come out right when you are placed in a stressful situation. But knowing how we feel when we experience stress does not explain it; nor does it tell us what causes it.

Other scientists have looked at stressors: events or situations that produce stress. A deadline, a poor test performance, or bothersome noises all may be thought of as stressors. Even pleasant events can be stressors. Planning a party or starting a new job can be just as stressful as being called to the principal’s office. Stress, then, can be caused by both negative and positive events, or stressors.

Of course, whether an event is thought of as positive or negative is, in some ways, a matter of personal choice. In sum, it is the way people interpret an event that makes it stressful or not stressful. This process of interpretation is called appraisal. Depending on how people appraise, or judge, circumstances, they may or may not consider them stressful.

What, specifically, causes people to appraise a situation as stressful? The answer depends on how much of a threat or challenge it appears to be. Circumstances that bring a threat or challenge to a person’s sense of well-being produce stress. Those that do not threaten or challenge us are not stressful. Looking at stress this way gives us a general definition of the concept of stress: Stress is a response to circumstances that seem threatening or challenging.

The circumstances that cause stress vary from one person to another. It all depends on how we appraise circumstances. In addition, the things that cause us stress today may not cause us stress at another time. And the opposite is true; things that once caused no stress may now be stressful.`,
      questions: [
        {
          id: 'cefr_b1_r1_q1',
          number: 1,
          sectionId: 'sec1_1',
          sectionTitle: 'Exercise 1: Summary Completion (Questions 1–5)',
          sectionInstruction: 'Complete the summary below by choosing NO MORE THAN THREE WORDS from the passage "What Is Stress?" for each answer.',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          isSectionStart: true,
          question: 'It is hard for the scientists to define the word (1) ______ because there are many ways of looking at it.',
          placeholder: 'Điền từ còn thiếu (tối đa 3 từ)...',
          primaryAnswer: 'stress',
          acceptedAnswers: ['stress', 'Stress'],
          evidence: 'Most people would say they know what stress is. But for scientists who study stress, it has been surprisingly hard to define. This is because there are so many ways of looking at stress.',
          explanation: 'Câu thứ hai của bài đọc chỉ ra: đối với các nhà khoa học, rất khó để định nghĩa từ "stress" vì có quá nhiều cách nhìn nhận khác nhau ("for scientists who study stress, it has been surprisingly hard to define..."). Do đó, từ cần điền sau "define the word" là "stress".'
        },
        {
          id: 'cefr_b1_r1_q2',
          number: 2,
          sectionId: 'sec1_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Your body reacts to stress with a fast-beating heart, heavy perspiration and so on when you are in (2) ______.',
          placeholder: 'Điền cụm từ còn thiếu (tối đa 3 từ)...',
          primaryAnswer: 'a stressful situation',
          acceptedAnswers: [
            'a stressful situation',
            'stressful situation',
            'stressful situations'
          ],
          evidence: 'You know how your heart beats faster, you perspire more heavily, and your words do not come out right when you are placed in a stressful situation.',
          explanation: 'Bài đọc nêu rõ phản ứng sinh lý của cơ thể khi rơi vào một tình huống căng thẳng: "You know how your heart beats faster, you perspire more heavily... when you are placed in a stressful situation". Do đó cụm từ cần điền là "a stressful situation" (hoặc "stressful situation").'
        },
        {
          id: 'cefr_b1_r1_q3',
          number: 3,
          sectionId: 'sec1_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: '(3) ______ refer to events or situations that produce stress and they may even include pleasant events.',
          placeholder: 'Điền từ còn thiếu (tối đa 3 từ)...',
          primaryAnswer: 'Stressors',
          acceptedAnswers: ['Stressors', 'stressors', 'Stressor', 'stressor'],
          evidence: 'Other scientists have looked at stressors: events or situations that produce stress.',
          explanation: 'Bài đọc định nghĩa: "stressors: events or situations that produce stress" (các tác nhân gây căng thẳng là những sự kiện hay tình huống tạo ra stress). Từ đứng đầu câu làm chủ ngữ chỉ số nhiều là "Stressors" (hoặc "stressors").'
        },
        {
          id: 'cefr_b1_r1_q4',
          number: 4,
          sectionId: 'sec1_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Stressors refer to events or situations that produce stress and they may even include (4) ______ such as planning a party and starting a new job.',
          placeholder: 'Điền cụm từ còn thiếu (tối đa 3 từ)...',
          primaryAnswer: 'pleasant events',
          acceptedAnswers: [
            'pleasant events',
            'Pleasant events',
            'pleasant event',
            'Pleasant event'
          ],
          evidence: 'Even pleasant events can be stressors. Planning a party or starting a new job can be just as stressful as being called to the principal’s office.',
          explanation: 'Đoạn 3 chỉ ra rằng ngay cả các sự kiện vui vẻ, tích cực cũng có thể là tác nhân gây stress: "Even pleasant events can be stressors. Planning a party or starting a new job...". Do đó từ cần điền là "pleasant events".'
        },
        {
          id: 'cefr_b1_r1_q5',
          number: 5,
          sectionId: 'sec1_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'They may even include pleasant events such as (5) ______ and starting a new job.',
          placeholder: 'Điền cụm từ còn thiếu (tối đa 3 từ)...',
          primaryAnswer: 'planning a party',
          acceptedAnswers: [
            'planning a party',
            'Planning a party',
            'planning party'
          ],
          evidence: 'Planning a party or starting a new job can be just as stressful as being called to the principal’s office.',
          explanation: 'Bài đọc nêu ví dụ về các sự kiện vui vẻ nhưng vẫn gây căng thẳng gồm: "Planning a party or starting a new job...". Điền song hành với "starting a new job" là "planning a party".'
        },
        {
          id: 'cefr_b1_r1_q6',
          number: 6,
          sectionId: 'sec1_2',
          sectionTitle: 'Exercise 2: True / False / Not Given Questions (Questions 6–12)',
          sectionInstruction: 'Read the passage "What Is Stress?" and look at the following statements. Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          isSectionStart: true,
          question: 'Knowing our feelings about stress can explain what causes the stress.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: ['FALSE', 'False', 'B', 'b', 'B. FALSE', 'B. False', 'F'],
          evidence: 'But knowing how we feel when we experience stress does not explain it; nor does it tell us what causes it.',
          explanation: 'Đoạn 2 nêu rõ: "knowing how we feel when we experience stress does not explain it; nor does it tell us what causes it" (việc biết cảm giác khi bị căng thẳng không giải thích được bản chất của stress, cũng không cho ta biết điều gì gây ra nó). Do đó mệnh đề này mâu thuẫn hoàn toàn với bài đọc. Đáp án là FALSE.'
        },
        {
          id: 'cefr_b1_r1_q7',
          number: 7,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Bothersome noises are more likely to cause stress than a poor test performance.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: ['NOT GIVEN', 'Not Given', 'C', 'c', 'C. NOT GIVEN', 'C. Not Given', 'NG'],
          evidence: 'A deadline, a poor test performance, or bothersome noises all may be thought of as stressors.',
          explanation: 'Đoạn 3 chỉ liệt kê hạn chót, kết quả thi kém hay tiếng ồn phiền toái đều có thể xem là những tác nhân gây stress ("all may be thought of as stressors"), nhưng không hề so sánh xem tiếng ồn có dễ gây stress hơn thi trượt hay không. Do đó thông tin không được đề cập (NOT GIVEN).'
        },
        {
          id: 'cefr_b1_r1_q8',
          number: 8,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Negative events cause more stress than positive ones do.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: ['FALSE', 'False', 'B', 'b', 'B. FALSE', 'B. False', 'F'],
          evidence: 'Even pleasant events can be stressors. Planning a party or starting a new job can be just as stressful as being called to the principal’s office. Stress, then, can be caused by both negative and positive events, or stressors.',
          explanation: 'Đoạn 3 cho biết các sự kiện vui vẻ tích cực có thể gây căng thẳng ngang bằng với các sự kiện tiêu cực ("can be just as stressful as being called to the principal\'s office"). Mệnh đề cho rằng sự kiện tiêu cực gây nhiều stress hơn là trái ngược bài đọc (FALSE).'
        },
        {
          id: 'cefr_b1_r1_q9',
          number: 9,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Sometimes whether an event is negative or not is based on a personal decision.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: ['TRUE', 'True', 'A', 'a', 'A. TRUE', 'A. True', 'T'],
          evidence: 'Of course, whether an event is thought of as positive or negative is, in some ways, a matter of personal choice.',
          explanation: 'Đoạn 4 nêu rõ: "whether an event is thought of as positive or negative is, in some ways, a matter of personal choice" ("personal choice" tương đương với "personal decision"). Nhận định hoàn toàn khớp với bài đọc (TRUE).'
        },
        {
          id: 'cefr_b1_r1_q10',
          number: 10,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Whether an event is considered stressful may be determined by the way people interpret it.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: ['TRUE', 'True', 'A', 'a', 'A. TRUE', 'A. True', 'T'],
          evidence: 'In sum, it is the way people interpret an event that makes it stressful or not stressful. This process of interpretation is called appraisal.',
          explanation: 'Đoạn 4 kết luận: "In sum, it is the way people interpret an event that makes it stressful or not stressful" (Tóm lại, chính cách con người diễn giải một sự kiện sẽ quyết định sự kiện đó có gây stress hay không). Nhận định hoàn toàn chính xác (TRUE).'
        },
        {
          id: 'cefr_b1_r1_q11',
          number: 11,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Sometimes those circumstances that are not threatening to us are also stressful.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: ['FALSE', 'False', 'B', 'b', 'B. FALSE', 'B. False', 'F'],
          evidence: 'Circumstances that bring a threat or challenge to a person’s sense of well-being produce stress. Those that do not threaten or challenge us are not stressful.',
          explanation: 'Đoạn 5 khẳng định rất dứt khoát: "Those that do not threaten or challenge us are not stressful" (Những hoàn cảnh không đe dọa hoặc thử thách chúng ta thì không hề gây căng thẳng). Mệnh đề trong đề bài trái ngược hoàn toàn (FALSE).'
        },
        {
          id: 'cefr_b1_r1_q12',
          number: 12,
          sectionId: 'sec1_2',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'An event or situation may not always be a stressor.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: ['TRUE', 'True', 'A', 'a', 'A. TRUE', 'A. True', 'T'],
          evidence: 'In addition, the things that cause us stress today may not cause us stress at another time. And the opposite is true; things that once caused no stress may now be stressful.',
          explanation: 'Đoạn 6 chỉ ra: những điều gây stress hôm nay có thể không gây stress vào lúc khác ("the things that cause us stress today may not cause us stress at another time"). Do đó, một sự kiện không phải lúc nào cũng là tác nhân gây stress (TRUE).'
        }
      ]
    },

    // ==========================================
    // PASSAGE 2: CROWDING HUMAN LIFE (QUESTIONS 13 - 16)
    // ==========================================
    {
      id: 'p2',
      number: 2,
      title: 'Activity 2: Crowding Human Life',
      shortTitle: '2. Crowding Life',
      wordLimit: 'ONE OPTION (A–F)',
      instruction: 'Read the passage "Crowding Human Life" and choose, according to the passage, one phrase (A–F) from the list of phrases to complete each key point below (Questions 13–16). There are more phrases than key points.',
      tip: 'TIP: Theo dõi các mốc số liệu dân số (1950: 2.5 tỉ, hiện tại: 5.3 tỉ, 2025: 8.5 tỉ) và mối liên hệ giữa phát triển công nghiệp, mức sống (standard of living) và việc đầu tư giáo dục thế hệ trẻ.',
      content: `Crowding Human Life

In 1950, there were only 2.5 billion people in the world. Now there are 5.3 billion. Human population may reach 8.5 billion by the year 2025. Experts disagree about how serious a problem this very fast growth is. And they disagree about what should be done about it.

It could be said that growth is slowing down. Most industrial countries — Japan, Canada, the United States, and the nations of Europe — are hardly growing at all. In Asia, Africa, and Latin America, growth is somewhat slower than it was twenty years ago.

Industrial nations all went through a time of fast growth when their industry was developing. When they reached the point where most people could live in comfort, population growth slowed. Many experts believe that today’s developing nations will go through a similar change. The best way to control population, they say, is to raise the standard of living.

Industrial nations are beginning to look for ways to produce goods without the pollution that is one of the harmful effects of overcrowding. Developing countries will also use such methods if they are to take care of their people.

Educating children everywhere is expensive, but the cost is worthwhile because children will contribute to their country’s development when they are grown. Perhaps children now in school will invent ways to help people live at peace with the earth.`,
      questions: [
        {
          id: 'cefr_b1_r1_q13',
          number: 13,
          sectionId: 'sec2',
          sectionTitle: 'Matching Phrases (Questions 13–16)',
          sectionInstruction: 'Read the passage "Crowding Human Life" and choose, according to the passage, one phrase (A–F) from the list of phrases to complete each key point below. There are more phrases than key points.',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          isSectionStart: true,
          question: 'By the year of 2025, ________.',
          options: [
            { letter: 'A', text: 'ways to solve the problem of population' },
            { letter: 'B', text: 'educate the new generation' },
            { letter: 'C', text: 'effects of fast growth of population' },
            { letter: 'D', text: 'the population was once growing fast' },
            { letter: 'E', text: 'there may be a lot more people in the world' },
            { letter: 'F', text: 'produce better products without pollution' }
          ],
          primaryAnswer: 'E',
          acceptedAnswers: [
            'E',
            'e',
            'E. there may be a lot more people in the world',
            'there may be a lot more people in the world'
          ],
          evidence: 'In 1950, there were only 2.5 billion people in the world. Now there are 5.3 billion. Human population may reach 8.5 billion by the year 2025.',
          explanation: 'Đoạn 1 nêu rõ dân số thế giới có thể đạt tới 8.5 tỉ người vào năm 2025 ("reach 8.5 billion by the year 2025", so với 5.3 tỉ hiện tại), tức là sẽ có thêm rất nhiều người trên thế giới. Cụm từ phù hợp nhất là E ("there may be a lot more people in the world").'
        },
        {
          id: 'cefr_b1_r1_q14',
          number: 14,
          sectionId: 'sec2',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'Experts argue about ________.',
          options: [
            { letter: 'A', text: 'ways to solve the problem of population' },
            { letter: 'B', text: 'educate the new generation' },
            { letter: 'C', text: 'effects of fast growth of population' },
            { letter: 'D', text: 'the population was once growing fast' },
            { letter: 'E', text: 'there may be a lot more people in the world' },
            { letter: 'F', text: 'produce better products without pollution' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: [
            'A',
            'a',
            'A. ways to solve the problem of population',
            'ways to solve the problem of population'
          ],
          evidence: 'Experts disagree about how serious a problem this very fast growth is. And they disagree about what should be done about it.',
          explanation: 'Đoạn 1 chỉ ra các chuyên gia bất đồng và tranh luận về việc cần phải làm gì trước vấn đề gia tăng dân số ("they disagree about what should be done about it" -> "what should be done" chính là "ways to solve the problem of population"). Do đó chọn A.'
        },
        {
          id: 'cefr_b1_r1_q15',
          number: 15,
          sectionId: 'sec2',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'In industrial countries, ________.',
          options: [
            { letter: 'A', text: 'ways to solve the problem of population' },
            { letter: 'B', text: 'educate the new generation' },
            { letter: 'C', text: 'effects of fast growth of population' },
            { letter: 'D', text: 'the population was once growing fast' },
            { letter: 'E', text: 'there may be a lot more people in the world' },
            { letter: 'F', text: 'produce better products without pollution' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: [
            'D',
            'd',
            'D. the population was once growing fast',
            'the population was once growing fast'
          ],
          evidence: 'Industrial nations all went through a time of fast growth when their industry was developing. When they reached the point where most people could live in comfort, population growth slowed.',
          explanation: 'Đoạn 3 chỉ ra các quốc gia công nghiệp đều từng trải qua một thời kỳ dân số tăng trưởng nhanh chóng khi nền công nghiệp của họ đang phát triển ("went through a time of fast growth" -> "the population was once growing fast"). Do đó chọn D.'
        },
        {
          id: 'cefr_b1_r1_q16',
          number: 16,
          sectionId: 'sec2',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'It is worth the cost to ________.',
          options: [
            { letter: 'A', text: 'ways to solve the problem of population' },
            { letter: 'B', text: 'educate the new generation' },
            { letter: 'C', text: 'effects of fast growth of population' },
            { letter: 'D', text: 'the population was once growing fast' },
            { letter: 'E', text: 'there may be a lot more people in the world' },
            { letter: 'F', text: 'produce better products without pollution' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'B. educate the new generation',
            'educate the new generation'
          ],
          evidence: 'Educating children everywhere is expensive, but the cost is worthwhile because children will contribute to their country’s development when they are grown.',
          explanation: 'Đoạn 5 khẳng định việc giáo dục trẻ em ở khắp nơi tuy tốn kém nhưng chi phí bỏ ra là rất xứng đáng ("the cost is worthwhile because children will contribute to their country\'s development" -> "educate children" = "educate the new generation"). Do đó chọn B.'
        }
      ]
    },

    // ==========================================
    // PASSAGE 3: GLOBAL WARMING (QUESTIONS 17 - 27)
    // ==========================================
    {
      id: 'p3',
      number: 3,
      title: 'Activity 3: Global Warming',
      shortTitle: '3. Global Warming',
      wordLimit: 'ONE OPTION (A–F) / YES, NO or NOT GIVEN',
      instruction: 'Read the passage "Global Warming" and answer questions 17–27. Questions 17–20: Match the phrases to complete each sentence. Questions 21–27: Decide whether the statements agree with the views/claims of the writer (YES, NO, or NOT GIVEN).',
      tip: 'TIP: Lưu ý cơ chế của hiệu ứng nhà kính (carbon dioxide giữ nhiệt), các nguồn phát thải năng lượng, vai trò tự nhiên của CO2 đối với nhiệt độ Trái Đất và số liệu nồng độ CO2 qua các thời kỳ (280 ppm trước Cách mạng Công nghiệp, 360 ppm hiện tại, 560 ppm tương lai).',
      content: `Global Warming

It seems as if every time you turn on the television news, you hear one or the other of the following catchphrases of the 1990s: global warming, greenhouse effect, climate change. As it often is with catchphrases, hardly anyone knows what these terms really mean or how they relate to each other.

In the past 100 years, in our effort to make the Earth a more civilised place, industrial production has increased by fifty times. Four fifths of that growth has come since 1950. This production — most of it based on the burning of wood, and of fossil fuels like coal, oil, and natural gas — has greatly increased the amount of carbon dioxide in the atmosphere. When fossil fuels are burned, they release carbon into the air in the form of carbon dioxide. Carbon dioxide allows heat that would normally escape from the Earth’s atmosphere to remain trapped, as it would in a greenhouse — thus the greenhouse effect.

When do you burn fossil fuels? When you turn on a light, or run an air conditioner, or take a hot shower, or make toast, you contribute to the greenhouse effect. It is a by-product of the use of energy — electricity, gasoline, or oil.

But how can carbon dioxide be bad when human beings exhale it every time they breathe? Plants need carbon dioxide; they use it to grow. Oceans absorb it. And forests drink it in. Without carbon dioxide, the average surface temperature on Earth would be 0 degrees Fahrenheit, instead of 59 degrees Fahrenheit. In nature, carbon dioxide is necessary and harmless. Here is the problem: in our effort to make the world a more comfortable place, people have produced far too much of it.

By drilling holes into glaciers and testing the air bubbles trapped in ancient ice, by looking at the fossilised plant tissues, even by looking at the air sealed in old telescopes, scientists have calculated that the atmosphere before the Industrial Revolution contained about 280 parts per million of carbon dioxide — the highest level recorded in the past 160,000 years. The current reading is near 360 parts per million. In the next 140 years, the carbon dioxide level should reach at least 560 parts per million. We have increased the amount of carbon dioxide in the air by 25 percent in the past century.

Carbon dioxide is not exclusively responsible for the greenhouse problem, however. Other greenhouse gases include chlorofluorocarbons, nitrogen oxides, and methane.`,
      questions: [
        {
          id: 'cefr_b1_r1_q17',
          number: 17,
          sectionId: 'sec3_1',
          sectionTitle: 'Exercise 1: Matching the Phrases (Questions 17–20)',
          sectionInstruction: 'Choose, according to the passage, one phrase (A–F) from the list of phrases to complete each key point below.',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          isSectionStart: true,
          question: 'Industrial production ____________________.',
          options: [
            { letter: 'A', text: 'has increased by fifty times in the past 100 years' },
            { letter: 'B', text: 'is not growing as fast as it was before 1950' },
            { letter: 'C', text: 'produces carbon dioxide' },
            { letter: 'D', text: 'the surface temperature on Earth' },
            { letter: 'E', text: 'the carbon dioxide level in the atmosphere has been increasing' },
            { letter: 'F', text: 'carbon dioxide belongs to harmful gases' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: [
            'A',
            'a',
            'A. has increased by fifty times in the past 100 years',
            'has increased by fifty times in the past 100 years'
          ],
          evidence: 'In the past 100 years, in our effort to make the Earth a more civilised place, industrial production has increased by fifty times.',
          explanation: 'Đoạn 2 nêu rõ: trong 100 năm qua sản lượng công nghiệp đã tăng gấp 50 lần ("industrial production has increased by fifty times"). Ghép chính xác với A.'
        },
        {
          id: 'cefr_b1_r1_q18',
          number: 18,
          sectionId: 'sec3_1',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'The burning of fossil fuels ___________________.',
          options: [
            { letter: 'A', text: 'has increased by fifty times in the past 100 years' },
            { letter: 'B', text: 'is not growing as fast as it was before 1950' },
            { letter: 'C', text: 'produces carbon dioxide' },
            { letter: 'D', text: 'the surface temperature on Earth' },
            { letter: 'E', text: 'the carbon dioxide level in the atmosphere has been increasing' },
            { letter: 'F', text: 'carbon dioxide belongs to harmful gases' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'C. produces carbon dioxide',
            'produces carbon dioxide'
          ],
          evidence: 'When fossil fuels are burned, they release carbon into the air in the form of carbon dioxide.',
          explanation: 'Đoạn 2 khẳng định khi nhiên liệu hóa thạch bị đốt cháy, chúng giải phóng các-bon vào không khí dưới dạng CO2 ("release carbon into the air in the form of carbon dioxide" -> "produces carbon dioxide"). Ghép chính xác với C.'
        },
        {
          id: 'cefr_b1_r1_q19',
          number: 19,
          sectionId: 'sec3_1',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'Carbon dioxide influences ___________________.',
          options: [
            { letter: 'A', text: 'has increased by fifty times in the past 100 years' },
            { letter: 'B', text: 'is not growing as fast as it was before 1950' },
            { letter: 'C', text: 'produces carbon dioxide' },
            { letter: 'D', text: 'the surface temperature on Earth' },
            { letter: 'E', text: 'the carbon dioxide level in the atmosphere has been increasing' },
            { letter: 'F', text: 'carbon dioxide belongs to harmful gases' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: [
            'D',
            'd',
            'D. the surface temperature on Earth',
            'the surface temperature on Earth'
          ],
          evidence: 'Without carbon dioxide, the average surface temperature on Earth would be 0 degrees Fahrenheit, instead of 59 degrees Fahrenheit.',
          explanation: 'Đoạn 4 cho biết nếu không có CO2 thì nhiệt độ bề mặt trung bình của Trái Đất sẽ là 0 độ F thay vì 59 độ F. Như vậy CO2 ảnh hưởng trực tiếp tới nhiệt độ bề mặt Trái Đất ("influences the surface temperature on Earth"). Ghép chính xác với D.'
        },
        {
          id: 'cefr_b1_r1_q20',
          number: 20,
          sectionId: 'sec3_1',
          wordLimit: 'ONE OPTION (A–F)',
          maxWords: 1,
          question: 'According to the scientists, ___________________.',
          options: [
            { letter: 'A', text: 'has increased by fifty times in the past 100 years' },
            { letter: 'B', text: 'is not growing as fast as it was before 1950' },
            { letter: 'C', text: 'produces carbon dioxide' },
            { letter: 'D', text: 'the surface temperature on Earth' },
            { letter: 'E', text: 'the carbon dioxide level in the atmosphere has been increasing' },
            { letter: 'F', text: 'carbon dioxide belongs to harmful gases' }
          ],
          primaryAnswer: 'E',
          acceptedAnswers: [
            'E',
            'e',
            'E. the carbon dioxide level in the atmosphere has been increasing',
            'the carbon dioxide level in the atmosphere has been increasing'
          ],
          evidence: 'scientists have calculated that the atmosphere before the Industrial Revolution contained about 280 parts per million of carbon dioxide... The current reading is near 360 parts per million. In the next 140 years, the carbon dioxide level should reach at least 560 parts per million.',
          explanation: 'Đoạn 5 nêu rõ theo tính toán của các nhà khoa học, nồng độ CO2 trong khí quyển đã liên tục gia tăng từ mức 280 ppm lên 360 ppm hiện tại và dự kiến đạt ít nhất 560 ppm ("the carbon dioxide level in the atmosphere has been increasing"). Ghép chính xác với E.'
        },
        {
          id: 'cefr_b1_r1_q21',
          number: 21,
          sectionId: 'sec3_2',
          sectionTitle: 'Exercise 2: Yes / No / Not Given Questions (Questions 21–27)',
          sectionInstruction: 'Do the following statements agree with the views/claims of the writer in the passage? Choose YES if the statement agrees with the views, NO if it contradicts the views, or NOT GIVEN if it is impossible to say.',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          isSectionStart: true,
          question: 'People usually do not understand what catchphrases really mean.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'YES',
          acceptedAnswers: ['YES', 'Yes', 'A', 'a', 'A. YES', 'A. Yes', 'Y'],
          evidence: 'As it often is with catchphrases, hardly anyone knows what these terms really mean or how they relate to each other.',
          explanation: 'Đoạn 1 nêu rõ: "hardly anyone knows what these terms really mean" (hầu như không ai biết những thuật ngữ/khẩu hiệu này thực sự mang ý nghĩa gì). Do đó nhận định đồng ý với quan điểm tác giả (YES).'
        },
        {
          id: 'cefr_b1_r1_q22',
          number: 22,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'Most of the growth in industrial production in the past 100 years came before 1950.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NO',
          acceptedAnswers: ['NO', 'No', 'B', 'b', 'B. NO', 'B. No', 'N'],
          evidence: 'In the past 100 years, in our effort to make the Earth a more civilised place, industrial production has increased by fifty times. Four fifths of that growth has come since 1950.',
          explanation: 'Đoạn 2 chỉ ra 4/5 (tức 80%) mức tăng trưởng sản lượng công nghiệp diễn ra KỂ TỪ năm 1950 ("Four fifths of that growth has come since 1950"). Mệnh đề cho rằng phần lớn diễn ra trước 1950 mâu thuẫn trực tiếp với bài đọc. Đáp án là NO.'
        },
        {
          id: 'cefr_b1_r1_q23',
          number: 23,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'Carbon dioxide allows heat to be trapped in the Earth’s atmosphere.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'YES',
          acceptedAnswers: ['YES', 'Yes', 'A', 'a', 'A. YES', 'A. Yes', 'Y'],
          evidence: 'Carbon dioxide allows heat that would normally escape from the Earth’s atmosphere to remain trapped, as it would in a greenhouse — thus the greenhouse effect.',
          explanation: 'Đoạn 2 khẳng định CO2 cho phép lượng nhiệt lẽ ra thoát ra ngoài khí quyển bị giữ lại ("allows heat... to remain trapped"). Mệnh đề hoàn toàn chính xác (YES).'
        },
        {
          id: 'cefr_b1_r1_q24',
          number: 24,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'People burn more fossil fuels when they take a hot shower than when they make toast.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: ['NOT GIVEN', 'Not Given', 'C', 'c', 'C. NOT GIVEN', 'C. Not Given', 'NG'],
          evidence: 'When do you burn fossil fuels? When you turn on a light, or run an air conditioner, or take a hot shower, or make toast, you contribute to the greenhouse effect.',
          explanation: 'Đoạn 3 chỉ liệt kê việc tắm nước nóng và nướng bánh mì là những ví dụ về các hoạt động gián tiếp sử dụng năng lượng góp phần gây hiệu ứng nhà kính, nhưng không hề so sánh xem hoạt động nào đốt nhiều nhiên liệu hóa thạch hơn. Đáp án là NOT GIVEN.'
        },
        {
          id: 'cefr_b1_r1_q25',
          number: 25,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'People who use electricity help to produce the greenhouse effect.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'YES',
          acceptedAnswers: ['YES', 'Yes', 'A', 'a', 'A. YES', 'A. Yes', 'Y'],
          evidence: 'When you turn on a light, or run an air conditioner... you contribute to the greenhouse effect. It is a by-product of the use of energy — electricity, gasoline, or oil.',
          explanation: 'Đoạn 3 khẳng định hiệu ứng nhà kính là sản phẩm phụ từ việc sử dụng năng lượng, bao gồm điện năng ("use of energy — electricity..."). Do đó người sử dụng điện cũng góp phần tạo ra hiệu ứng nhà kính (YES).'
        },
        {
          id: 'cefr_b1_r1_q26',
          number: 26,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'The carbon dioxide level in the next 140 years will increase at least by two times what it was before the Industrial Revolution.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'YES',
          acceptedAnswers: ['YES', 'Yes', 'A', 'a', 'A. YES', 'A. Yes', 'Y'],
          evidence: 'scientists have calculated that the atmosphere before the Industrial Revolution contained about 280 parts per million of carbon dioxide... In the next 140 years, the carbon dioxide level should reach at least 560 parts per million.',
          explanation: 'Đoạn 5 nêu rõ nồng độ CO2 trước Cách mạng Công nghiệp là 280 ppm, và trong 140 năm tới sẽ đạt ít nhất 560 ppm (280 x 2 = 560, tức là tăng ít nhất gấp 2 lần). Do đó mệnh đề hoàn toàn khớp với bài đọc (YES).'
        },
        {
          id: 'cefr_b1_r1_q27',
          number: 27,
          sectionId: 'sec3_2',
          wordLimit: 'ONE OPTION (YES, NO or NOT GIVEN)',
          question: 'Carbon dioxide causes more problems than the other greenhouse gases do.',
          options: [
            { letter: 'A', text: 'YES' },
            { letter: 'B', text: 'NO' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: ['NOT GIVEN', 'Not Given', 'C', 'c', 'C. NOT GIVEN', 'C. Not Given', 'NG'],
          evidence: 'Carbon dioxide is not exclusively responsible for the greenhouse problem, however. Other greenhouse gases include chlorofluorocarbons, nitrogen oxides, and methane.',
          explanation: 'Đoạn cuối cho biết ngoài CO2 còn có các loại khí nhà kính khác như CFC, NO và methane cùng gây ra vấn đề, nhưng không khẳng định CO2 gây ra nhiều vấn đề hơn các khí khác. Đáp án là NOT GIVEN.'
        }
      ]
    },

    // ==========================================
    // PASSAGE 4: DEMAND FOR WATER (QUESTIONS 28 - 39)
    // ==========================================
    {
      id: 'p4',
      number: 4,
      title: 'Activity 4: Demand for Water in the United States',
      shortTitle: '4. Demand for Water',
      wordLimit: 'NO MORE THAN THREE WORDS / ONE OPTION',
      instruction: 'Read the passage "Demand for Water in the United States" and answer questions 28–39. Questions 28–30: Answer the questions with NO MORE THAN THREE WORDS taken from the passage. Questions 31–35: Choose one phrase (A–G) from the list of phrases to complete each key point. Questions 36–39: Decide whether the statements are True, False or Not Given.',
      tip: 'TIP: Đọc kỹ số liệu lượng mưa từng vùng ở Mỹ, mức tiêu thụ nước bình quân cá nhân (California 100-200 gallon vs nước nhiệt đới < 1 gallon), 2 bảng thống kê sử dụng nước sinh hoạt & rút nước công nghiệp/nông nghiệp, và tỷ lệ nước được tuần hoàn tái sử dụng (97% tại nhà máy nhiệt điện).',
      content: `Demand for Water in the United States

If all of the water in the atmosphere were to fall evenly as rain, the Earth would be entirely covered with one inch of water. But when it rains, it pours. Rain doesn’t fall equally on everyone. Unusual weather patterns sometimes create long periods of droughts or disastrous floods.

In the United States, the average annual rainfall is 30 inches, and most of the rain falls in the East. Less than 4 inches of rain falls each year on parts of the Southwest, while parts of the Pacific Northwest receive 200 inches a year.

The survival and success of a community frequently depend upon the water it can provide for agriculture and industry. Water has often become the limiting factor in the growth of communities.

Although the eastern part of the United States is wet, water supplies are sometimes not sufficient to meet the demand. The high population density along the eastern coast puts great demand upon the region’s water supply.

In poor tropical countries, where women must walk several miles for water, each person may use less than one gallon of water per day. It is estimated that Californians use about 100 to 200 gallons a day per person. During recent droughts in New Jersey and California, some residents were required to limit water use to 50 gallons per person per day.

Table 1: Average Daily Water Use for a Family of Four
• Toilet: 100 Gallons / 380 Litres per day (39% of Total Daily Use)
• Bathing & Hygiene: 88 Gallons / 334 Litres per day (34% of Total Daily Use)
• Laundry: 35 Gallons / 133 Litres per day (14% of Total Daily Use)
• Kitchen: 27 Gallons / 103 Litres per day (11% of Total Daily Use)
• Housekeeping: 5 Gallons / 9 Litres per day (2% of Total Daily Use)
• Totals: 255 Gallons / 959 Litres per day (100% of Total Daily Use)

Our demand for water is great and it continues to grow. World water demand has grown faster than the population. Water use is nearly 50 per cent more per person than in 1950. Each day during 1985, nearly 1.3 trillion litres of water flowed through complex systems of pipes to homes, factories, farms and power plants in the United States.

Most water – 141 billion gallons per day – is used for agriculture. A large supply of water is necessary to produce the food that we eat. One hundred and twenty gallons of water is required to produce an egg for your breakfast. A steak for dinner requires 3,500 gallons. Irrigated agriculture is the number one user of water in the western United States. In California, farmers use about 85 per cent of the available water supply. They grow about half the fruits and vegetables produced in the United States. In California, cotton, rice, and alfalfa rely most heavily on irrigated water. In Kern Country, a farmer can make seven cuttings of alfalfa in an irrigated field. Without water for irrigation, the fields may produce only one cutting.

The second major user of water in the United States is production of electricity at thermoelectric power plants. Power plants use 131 billion gallons of water per day, but 97 per cent of this water is returned to the lake or the river and is immediately available to be used again.

The chart below shows how water was used in the United States in 1985. The charts include only water that is withdrawn from a source. They do not include recreation, power generation, transportation or wildlife uses that do not remove water from the stream.

Table 2: Daily Water Withdrawal Uses in the Entire United States – 1985
• Agricultural: 534 Litres per Day (Consumed: 54% | Returned: 46%)
• Thermoelectric: 496 Litres per Day (Consumed: 3% | Returned: 97%)
• Domestic and Commercial: 118 Litres per Day (Consumed: 20% | Returned: 80%)
• Industrial and Mining: 117 Litres per Day (Consumed: 16% | Returned: 84%)`,
      questions: [
        {
          id: 'cefr_b1_r1_q28',
          number: 28,
          sectionId: 'sec4_1',
          sectionTitle: 'Exercise 1: Short Answer Questions (Questions 28–30)',
          sectionInstruction: 'Answer the following questions using NO MORE THAN THREE WORDS taken from the passage for each answer.',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          isSectionStart: true,
          question: 'What could be the reason for natural disasters like droughts and floods?',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          primaryAnswer: 'unusual weather patterns',
          acceptedAnswers: [
            'unusual weather patterns',
            'weather patterns',
            'Unusual weather patterns',
            'Weather patterns'
          ],
          evidence: 'Unusual weather patterns sometimes create long periods of droughts or disastrous floods.',
          explanation: 'Đoạn 1 nêu rõ: "Unusual weather patterns sometimes create long periods of droughts or disastrous floods" (Các hình thái thời tiết bất thường đôi khi tạo ra những đợt hạn hán kéo dài hoặc lũ lụt thảm khốc). Do đó cụm từ cần điền là "unusual weather patterns".'
        },
        {
          id: 'cefr_b1_r1_q29',
          number: 29,
          sectionId: 'sec4_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'Which factor can frequently affect the survival and success of a community?',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          primaryAnswer: 'water',
          acceptedAnswers: [
            'water',
            'Water',
            'the water',
            'water supply',
            'the water supply',
            'water supplies'
          ],
          evidence: 'The survival and success of a community frequently depend upon the water it can provide for agriculture and industry. Water has often become the limiting factor in the growth of communities.',
          explanation: 'Đoạn 3 chỉ ra: "The survival and success of a community frequently depend upon the water it can provide for agriculture and industry". Yếu tố thường xuyên tác động đến sự sinh tồn và thành công của một cộng đồng chính là "water" (hoặc "water supply").'
        },
        {
          id: 'cefr_b1_r1_q30',
          number: 30,
          sectionId: 'sec4_1',
          wordLimit: 'NO MORE THAN THREE WORDS',
          maxWords: 3,
          question: 'What is the reason for great water demand along the eastern coast of the United States?',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          primaryAnswer: 'high population density',
          acceptedAnswers: [
            'high population density',
            'High population density',
            'the high population density',
            'population density'
          ],
          evidence: 'The high population density along the eastern coast puts great demand upon the region’s water supply.',
          explanation: 'Đoạn 4 khẳng định: "The high population density along the eastern coast puts great demand upon the region’s water supply". Nguyên nhân gây ra nhu cầu sử dụng nước rất lớn dọc theo bờ biển phía Đông nước Mỹ là do "high population density" (mật độ dân số cao).'
        },
        {
          id: 'cefr_b1_r1_q31',
          number: 31,
          sectionId: 'sec4_2',
          sectionTitle: 'Exercise 2: Matching the Phrases (Questions 31–35)',
          sectionInstruction: 'Read the passage "Demand for Water in the United States" and choose, according to the passage, one phrase (A–G) from the list of phrases to complete each key point below. There are more phrases than key points.',
          wordLimit: 'ONE OPTION (A–G)',
          maxWords: 1,
          isSectionStart: true,
          question: 'The eastern part of the United States .............................................',
          options: [
            { letter: 'A', text: 'is used for irrigation' },
            { letter: 'B', text: 'includes water removed from rivers' },
            { letter: 'C', text: 'is the wettest place in the country' },
            { letter: 'D', text: 'the food we eat' },
            { letter: 'E', text: 'sometimes people have to limit water use' },
            { letter: 'F', text: 'can be recycled later' },
            { letter: 'G', text: 'people grow more fruits and vegetables' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'E',
            'e',
            'C. is the wettest place in the country',
            'is the wettest place in the country'
          ],
          evidence: 'In the United States, the average annual rainfall is 30 inches, and most of the rain falls in the East. ... Although the eastern part of the United States is wet...',
          explanation: 'Đoạn 2 nêu rõ hầu hết lượng mưa của nước Mỹ trút xuống miền Đông ("most of the rain falls in the East"), khiến cho khu vực này là nơi ẩm ướt nhất đất nước. Ghép phù hợp nhất với C ("is the wettest place in the country") (hoặc E do đợt hạn hán tại New Jersey yêu cầu giới hạn nước).'
        },
        {
          id: 'cefr_b1_r1_q32',
          number: 32,
          sectionId: 'sec4_2',
          wordLimit: 'ONE OPTION (A–G)',
          maxWords: 1,
          question: 'In the United States, .............................................',
          options: [
            { letter: 'A', text: 'is used for irrigation' },
            { letter: 'B', text: 'includes water removed from rivers' },
            { letter: 'C', text: 'is the wettest place in the country' },
            { letter: 'D', text: 'the food we eat' },
            { letter: 'E', text: 'sometimes people have to limit water use' },
            { letter: 'F', text: 'can be recycled later' },
            { letter: 'G', text: 'people grow more fruits and vegetables' }
          ],
          primaryAnswer: 'E',
          acceptedAnswers: [
            'E',
            'e',
            'C',
            'c',
            'E. sometimes people have to limit water use',
            'sometimes people have to limit water use'
          ],
          evidence: 'During recent droughts in New Jersey and California, some residents were required to limit water use to 50 gallons per person per day.',
          explanation: 'Đoạn 5 cho biết trong những đợt hạn hán gần đây tại các bang của Hoa Kỳ (New Jersey và California), người dân đã phải hạn chế mức dùng nước còn 50 gallon/người/ngày. Ghép chính xác với E ("sometimes people have to limit water use").'
        },
        {
          id: 'cefr_b1_r1_q33',
          number: 33,
          sectionId: 'sec4_2',
          wordLimit: 'ONE OPTION (A–G)',
          maxWords: 1,
          question: 'Most of the water supply .............................................',
          options: [
            { letter: 'A', text: 'is used for irrigation' },
            { letter: 'B', text: 'includes water removed from rivers' },
            { letter: 'C', text: 'is the wettest place in the country' },
            { letter: 'D', text: 'the food we eat' },
            { letter: 'E', text: 'sometimes people have to limit water use' },
            { letter: 'F', text: 'can be recycled later' },
            { letter: 'G', text: 'people grow more fruits and vegetables' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: [
            'A',
            'a',
            'A. is used for irrigation',
            'is used for irrigation'
          ],
          evidence: 'Most water – 141 billion gallons per day – is used for agriculture. ... Irrigated agriculture is the number one user of water in the western United States.',
          explanation: 'Đoạn 7 chỉ ra phần lớn lượng nước (141 tỉ gallon/ngày) được dùng cho nông nghiệp, đặc biệt nông nghiệp tưới tiêu là đối tượng tiêu thụ nước số 1 ("Irrigated agriculture is the number one user of water"). Ghép chính xác với A ("is used for irrigation").'
        },
        {
          id: 'cefr_b1_r1_q34',
          number: 34,
          sectionId: 'sec4_2',
          wordLimit: 'ONE OPTION (A–G)',
          maxWords: 1,
          question: 'Most of the water from power plants .............................................',
          options: [
            { letter: 'A', text: 'is used for irrigation' },
            { letter: 'B', text: 'includes water removed from rivers' },
            { letter: 'C', text: 'is the wettest place in the country' },
            { letter: 'D', text: 'the food we eat' },
            { letter: 'E', text: 'sometimes people have to limit water use' },
            { letter: 'F', text: 'can be recycled later' },
            { letter: 'G', text: 'people grow more fruits and vegetables' }
          ],
          primaryAnswer: 'F',
          acceptedAnswers: [
            'F',
            'f',
            'F. can be recycled later',
            'can be recycled later'
          ],
          evidence: 'Power plants use 131 billion gallons of water per day, but 97 per cent of this water is returned to the lake or the river and is immediately available to be used again.',
          explanation: 'Đoạn 8 cho biết 97% lượng nước sử dụng trong các nhà máy nhiệt điện được trả lại sông hồ và sẵn sàng để tái sử dụng ngay lập tức ("returned... immediately available to be used again" tương đương với "can be recycled later"). Ghép chính xác với F.'
        },
        {
          id: 'cefr_b1_r1_q35',
          number: 35,
          sectionId: 'sec4_2',
          wordLimit: 'ONE OPTION (A–G)',
          maxWords: 1,
          question: 'The chart of Daily Water Withdrawal Uses .............................................',
          options: [
            { letter: 'A', text: 'is used for irrigation' },
            { letter: 'B', text: 'includes water removed from rivers' },
            { letter: 'C', text: 'is the wettest place in the country' },
            { letter: 'D', text: 'the food we eat' },
            { letter: 'E', text: 'sometimes people have to limit water use' },
            { letter: 'F', text: 'can be recycled later' },
            { letter: 'G', text: 'people grow more fruits and vegetables' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'B. includes water removed from rivers',
            'includes water removed from rivers'
          ],
          evidence: 'The charts include only water that is withdrawn from a source. They do not include recreation, power generation, transportation or wildlife uses that do not remove water from the stream.',
          explanation: 'Đoạn 9 giải thích: biểu đồ rút nước chỉ bao gồm nguồn nước được rút ra khỏi nguồn (rút ra khỏi dòng chảy của sông suối: "remove water from the stream"). Ghép chính xác với B ("includes water removed from rivers").'
        },
        {
          id: 'cefr_b1_r1_q36',
          number: 36,
          sectionId: 'sec4_3',
          sectionTitle: 'Exercise 3: True / False / Not Given Questions (Questions 36–39)',
          sectionInstruction: 'Read the statements below and choose TRUE if the statement agrees with the information, FALSE if it contradicts the information, or NOT GIVEN if there is no information on this.',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          isSectionStart: true,
          question: 'Water supplies in the eastern part of the United States can always meet the demand.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: ['FALSE', 'False', 'B', 'b', 'B. FALSE', 'B. False', 'F'],
          evidence: 'Although the eastern part of the United States is wet, water supplies are sometimes not sufficient to meet the demand.',
          explanation: 'Đoạn 4 khẳng định: mặc dù miền Đông nước Mỹ ẩm ướt nhưng nguồn nước đôi khi không đủ để đáp ứng nhu cầu ("water supplies are sometimes not sufficient to meet the demand"). Mệnh đề cho rằng luôn luôn đáp ứng được ("can always meet") là hoàn toàn trái ngược (FALSE).'
        },
        {
          id: 'cefr_b1_r1_q37',
          number: 37,
          sectionId: 'sec4_3',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Water used in California per person could be 200 times as much as the water used per person in tropical countries.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: ['TRUE', 'True', 'A', 'a', 'A. TRUE', 'A. True', 'T'],
          evidence: 'In poor tropical countries, where women must walk several miles for water, each person may use less than one gallon of water per day. It is estimated that Californians use about 100 to 200 gallons a day per person.',
          explanation: 'Đoạn 5 chỉ ra: ở các nước nhiệt đới nghèo, mỗi người chỉ dùng dưới 1 gallon/ngày; trong khi ở California con số này là 100 đến 200 gallon/người/ngày (gấp tới 200 lần). Do đó mệnh đề hoàn toàn chính xác (TRUE).'
        },
        {
          id: 'cefr_b1_r1_q38',
          number: 38,
          sectionId: 'sec4_3',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Among the items of average daily water use for a family of four, the percentage of water use on housekeeping is the lowest.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: ['TRUE', 'True', 'A', 'a', 'A. TRUE', 'A. True', 'T'],
          evidence: 'Average Daily Water Use for a Family of Four: Toilet 39%, Bathing & Hygiene 34%, Laundry 14%, Kitchen 11%, Housekeeping 2%.',
          explanation: 'Theo bảng thống kê số liệu sinh hoạt của gia đình 4 người, mục Housekeeping (dọn dẹp nhà cửa) chỉ chiếm 2% tổng lượng nước sử dụng hàng ngày, là con số thấp nhất trong tất cả các hạng mục. Do đó mệnh đề là TRUE.'
        },
        {
          id: 'cefr_b1_r1_q39',
          number: 39,
          sectionId: 'sec4_3',
          wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
          question: 'Water demand in the world grows almost twice as fast as the population.',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: ['NOT GIVEN', 'Not Given', 'C', 'c', 'C. NOT GIVEN', 'C. Not Given', 'NG'],
          evidence: 'World water demand has grown faster than the population. Water use is nearly 50 per cent more per person than in 1950.',
          explanation: 'Đoạn 6 chỉ cho biết nhu cầu nước thế giới tăng nhanh hơn dân số ("faster than the population") và lượng nước dùng bình quân đầu người tăng gần 50% so với 1950, nhưng không đề cập tỷ lệ "nhanh gấp đôi" (almost twice as fast). Đáp án là NOT GIVEN.'
        }
      ]
    }
  ]
};

// Flatten all questions array for seamless grading and lookups
CEFR_B1_READING_1_PRACTICE_DETAIL.questions = CEFR_B1_READING_1_PRACTICE_DETAIL.passages.flatMap(p =>
  (p.questions || []).map(q => ({ ...q, passageId: p.id, passageNumber: p.number }))
);
