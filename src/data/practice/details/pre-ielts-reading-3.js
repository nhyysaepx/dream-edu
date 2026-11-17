// Pre-IELTS Reading 3: Is It Better to Go Abroad to Study? (Practice)
// Detail data for practice assignment pre-ielts-reading-3

export const PRE_IELTS_READING_3_PRACTICE_DETAIL = {
  id: 'pre-ielts-reading-3',
  title: 'PRACTICE - Reading 3 - Is It Better to Go Abroad to Study?',
  level: 'Pre IELTS',
  session: 'Buổi 3 - Luyện tập trên lớp (In-Class Practice)',
  skill: 'Reading',
  skillBadge: 'IELTS Reading (Multiple Choice)',
  description: 'Đọc kỹ văn bản học thuật "Is it better to go abroad to study? Student-friendly places" và hoàn thiện 10 câu hỏi trắc nghiệm gồm 2 phần: Choose ONE correct answer (câu 1–8) và Choose TWO correct answers (câu 9–10).',
  totalQuestions: 10,
  duration: '25 - 35 phút',
  vocabId: 'pre-ielts-reading-3',
  vocabCount: 30,
  vocabLabel: 'Học 30 từ vựng Reading 3',
  strategyTips: [
    'Read (skim) the text very quickly so you understand what it is about.',
    'Read the main part of the questions and find the key words (the words that will help you find the answer in the passage).',
    'Find the key words or words that mean the same in the passage.',
    'Try to answer the question without looking at the options A-D.',
    'Find the option, A, B, C, or D, that matches your answer.',
    'Check that the other options are incorrect.'
  ],
  sections: [
    {
      id: 'sec1',
      title: 'Phần 1: Choose ONE correct answer',
      shortTitle: 'Phần 1 (1–8)',
      minQ: 1,
      maxQ: 8,
      instruction: 'Choose ONE correct answer (Questions 1–8)',
      wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
      maxWords: 1
    },
    {
      id: 'sec2',
      title: 'Phần 2: Choose TWO correct answers',
      shortTitle: 'Phần 2 (9–10)',
      minQ: 9,
      maxQ: 10,
      instruction: 'Choose TWO correct answers (Questions 9–10)',
      wordLimit: 'TWO LETTERS (A, B, C, or D)',
      maxWords: 2
    }
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'Is it better to go abroad to study? Student-friendly places',
      shortTitle: 'Passage: Study Abroad',
      wordLimit: 'ONE / TWO LETTERS',
      maxWords: 2,
      instruction: 'Read the text carefully and answer questions 1–10. Questions 1–8: Choose ONE correct answer. Questions 9–10: Choose TWO correct answers.',
      content: `Student-friendly places

The British Council has named the universities that are most welcoming to overseas students. As you would expect, English-speaking countries such as Australia, the UK and the US have made the top 10, but the number one may be a surprise: Germany. Two Far Eastern countries, i.e. China and Malaysia, made it to the top 5, ranking higher than the US, Japan, Russia, Nigeria and Brazil. This growing trend shows how global education is no longer limited to traditionally dominant nations. In recent years, European countries in particular have made conscious efforts to attract more international students through government-supported scholarship schemes and English-taught programmes. Universities are competing on a global scale to attract diverse talent, which has pushed up standards and facilities in many institutions.

The benefits of studying abroad

Russell Howe, a Scot who is currently studying a Business degree at Stellinga International College in the Netherlands, previously also studied in India (which came 11th on the list). “People often ask me why I needed to travel, because British universities have a good reputation elsewhere in the world. But this is not something I needed to do, but something I really wanted to do. I have learnt different ways of looking at things, but I also found out how much we all have in common, wherever we are from. All of this will be useful in my future career.” Russell is not the only international student in his department. Business and administrative courses are the most popular with international students, followed by engineering and technology, social studies, creative arts and design, medicine-related topics and law. Manal, a student at the Faculty of Design at Stellinga, says she has similar reasons to Russell, but there is more: “I wanted to broaden my understanding of the world. I have enhanced my language skills: I am more fluent in English and have also taken a level 1 Dutch course. I have made new friends, learnt about new ideas, and I believe that I am benefiting more from studying this in Europe than anywhere else. I stayed in the UK for two short courses in my holidays, and really enjoyed them. So the whole experience is enhancing my global perspective. I also hope that I have made lasting friendships and contacts.” Another hidden advantage of studying abroad is personal development. Living away from home teaches independence, adaptability, and problem-solving in real-life situations. Students are exposed to different teaching methods, academic expectations, and social behaviours—all of which build resilience and confidence.

What has made these countries student-friendly?

Well, all of them make it easy for international students to apply, and provide ongoing support once they are there. They also offer good quality teaching, which helps students to complete the course. The fact that so many students choose these countries is probably due to the country’s efforts towards internationalization. One aspect of this is that the country welcomes overseas students and includes them in the academic and social life of the university and city. Many overseas students stay for free. Many classes are conducted in English, and so are most leaflets, making it easier for international students to keep informed and take part in student life. Apart from the main reasons already mentioned, this type of educational internationalization can help the quality of research in these universities, through e.g. networking, teamwork and the sharing of skills. For students, it is a valuable addition to their skills and experience at a time when jobs are not easy to find. Finally, studying abroad can offer a competitive advantage in the job market. Employers often favour applicants with international experience, who are more likely to be open-minded, independent, and capable of working in multicultural environments. In today’s global economy, these qualities are more important than ever.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          romanNumber: 'i',
          sectionId: 'sec1',
          sectionTitle: 'Phần 1: Choose ONE correct answer',
          sectionInstruction: 'Choose ONE correct answer (Questions 1–8)',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          isSectionStart: true,
          question: 'Which country is ranked the most welcoming to overseas students?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'The UK' },
            { letter: 'B', text: 'Australia' },
            { letter: 'C', text: 'Germany' },
            { letter: 'D', text: 'China' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Germany',
            'C. Germany'
          ],
          evidence: 'As you would expect, English-speaking countries such as Australia, the UK and the US have made the top 10, but the number one may be a surprise: Germany.',
          explanation: 'Đoạn 1 nêu rõ: Trong khi các nước nói tiếng Anh như Úc, Anh và Mỹ lọt top 10, thì vị trí số 1 (thân thiện/chào đón sinh viên quốc tế nhất) thuộc về nước Đức ("the number one may be a surprise: Germany"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q2',
          number: 2,
          romanNumber: 'ii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is Russell Howe currently studying?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Law' },
            { letter: 'B', text: 'Business' },
            { letter: 'C', text: 'Engineering' },
            { letter: 'D', text: 'Social studies' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'Business',
            'B. Business'
          ],
          evidence: 'Russell Howe, a Scot who is currently studying a Business degree at Stellinga International College in the Netherlands...',
          explanation: 'Đoạn 2 nêu rõ Russell Howe hiện đang theo học bằng Kinh doanh ("currently studying a Business degree") tại Trường Cao đẳng Quốc tế Stellinga ở Hà Lan. Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q3',
          number: 3,
          romanNumber: 'iii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Which subject is the most popular among international students?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Medicine' },
            { letter: 'B', text: 'Law' },
            { letter: 'C', text: 'Business' },
            { letter: 'D', text: 'Creative arts' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Business',
            'C. Business'
          ],
          evidence: 'Business and administrative courses are the most popular with international students, followed by engineering and technology, social studies, creative arts and design, medicine-related topics and law.',
          explanation: 'Đoạn 2 khẳng định các khóa học về Kinh doanh và hành chính là phổ biến nhất đối với sinh viên quốc tế ("Business and administrative courses are the most popular with international students"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q4',
          number: 4,
          romanNumber: 'iv',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Why did Russell decide to study abroad?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'He was required to by his university.' },
            { letter: 'B', text: 'His friends had studied abroad.' },
            { letter: 'C', text: 'He wanted to experience something different.' },
            { letter: 'D', text: 'British universities weren’t good enough.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'He wanted to experience something different.',
            'He wanted to experience something different',
            'C. He wanted to experience something different.'
          ],
          evidence: '“People often ask me why I needed to travel, because British universities have a good reputation elsewhere in the world. But this is not something I needed to do, but something I really wanted to do. I have learnt different ways of looking at things...”',
          explanation: 'Russell giải thích việc đi du học không phải vì bắt buộc mà vì bạn thực sự mong muốn khám phá những cách nhìn nhận mới về mọi thứ ("learnt different ways of looking at things"), đồng nghĩa với việc bạn muốn trải nghiệm những điều mới mẻ và khác biệt ("experience something different"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q5',
          number: 5,
          romanNumber: 'v',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What language besides English is Manal studying?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'German' },
            { letter: 'B', text: 'Spanish' },
            { letter: 'C', text: 'Dutch' },
            { letter: 'D', text: 'Italian' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Dutch',
            'C. Dutch'
          ],
          evidence: 'I have enhanced my language skills: I am more fluent in English and have also taken a level 1 Dutch course.',
          explanation: 'Manal chia sẻ ngoài việc nâng cao trình độ tiếng Anh, bạn còn học thêm một khóa học tiếng Hà Lan bậc 1 ("taken a level 1 Dutch course"). Do đó ngoại ngữ bạn đang học thêm là tiếng Hà Lan (Dutch - C).'
        },
        {
          id: 'p1_q6',
          number: 6,
          romanNumber: 'vi',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What does the article say about university application processes in student-friendly countries?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'They are difficult and confusing.' },
            { letter: 'B', text: 'They require high-level connections.' },
            { letter: 'C', text: 'They are simple and supportive.' },
            { letter: 'D', text: 'They are only open to EU students.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'They are simple and supportive.',
            'They are simple and supportive',
            'C. They are simple and supportive.'
          ],
          evidence: 'Well, all of them make it easy for international students to apply, and provide ongoing support once they are there.',
          explanation: 'Đoạn 3 chỉ ra rằng tất cả các nước thân thiện với sinh viên này đều giúp việc nộp hồ sơ trở nên dễ dàng ("make it easy for international students to apply" tương đương "simple") và luôn hỗ trợ liên tục ("provide ongoing support" tương đương "supportive"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q7',
          number: 7,
          romanNumber: 'vii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'One reason internationalization is beneficial for universities is because it:',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'decreases the demand for classes.' },
            { letter: 'B', text: 'increases local student satisfaction.' },
            { letter: 'C', text: 'improves research quality.' },
            { letter: 'D', text: 'lowers the number of applications.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'improves research quality.',
            'improves research quality',
            'C. improves research quality.'
          ],
          evidence: 'Apart from the main reasons already mentioned, this type of educational internationalization can help the quality of research in these universities, through e.g. networking, teamwork and the sharing of skills.',
          explanation: 'Đoạn 3 khẳng định quá trình quốc tế hóa giáo dục giúp nâng cao chất lượng nghiên cứu của các trường đại học thông qua kết nối mạng lưới, làm việc nhóm và chia sẻ kỹ năng ("can help the quality of research in these universities" = improves research quality). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q8',
          number: 8,
          romanNumber: 'viii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is NOT mentioned as a benefit of studying abroad?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Greater independence' },
            { letter: 'B', text: 'Easier access to scholarships' },
            { letter: 'C', text: 'Exposure to new teaching styles' },
            { letter: 'D', text: 'Better job opportunities' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'Easier access to scholarships',
            'Easier access to scholarships.',
            'B. Easier access to scholarships'
          ],
          evidence: 'Bài đọc đề cập: "teaches independence" (A), "exposed to different teaching methods" (C), và "competitive advantage in the job market... Employers often favour applicants with international experience" (D). Học bổng (scholarship schemes) chỉ được nêu như nỗ lực thu hút của chính phủ các nước ở đoạn 1, không được nhắc đến như một lợi ích đạt được từ việc du học.',
          explanation: 'Bài viết liệt kê rõ các lợi ích của việc du học: tự lập hơn ("teaches independence" - A), tiếp cận phương pháp giảng dạy mới ("different teaching methods" - C), và cơ hội nghề nghiệp cạnh tranh hơn ("competitive advantage in the job market" - D). Việc dễ tiếp cận học bổng hơn ("Easier access to scholarships" - B) KHÔNG được đề cập như một lợi ích mà người học nhận được. Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q9',
          number: 9,
          romanNumber: 'ix',
          sectionId: 'sec2',
          sectionTitle: 'Phần 2: Choose TWO correct answers',
          sectionInstruction: 'Choose TWO correct answers (Questions 9–10)',
          wordLimit: 'TWO LETTERS (A, B, C, or D)',
          maxWords: 2,
          maxChoices: 2,
          isSectionStart: true,
          question: 'According to the article, what are advantages of international experience for students? (Choose TWO answers: B and C)',
          placeholder: 'Chọn 2 đáp án (ví dụ B, C)...',
          options: [
            { letter: 'A', text: 'It guarantees a high salary after graduation.' },
            { letter: 'B', text: 'It improves problem-solving and independence.' },
            { letter: 'C', text: 'It builds cultural awareness.' },
            { letter: 'D', text: 'It makes job interviews easier.' }
          ],
          primaryAnswer: 'B, C',
          acceptedAnswers: [
            'B, C',
            'B and C',
            'C, B',
            'C and B',
            'B C',
            'C B',
            'B & C',
            'C & B',
            'It improves problem-solving and independence, It builds cultural awareness'
          ],
          evidence: 'Living away from home teaches independence, adaptability, and problem-solving in real-life situations. ... I wanted to broaden my understanding of the world. I have made new friends, learnt about new ideas... So the whole experience is enhancing my global perspective.',
          explanation: 'Theo bài viết, hai lợi ích rõ rệt của kinh nghiệm quốc tế đối với sinh viên là: 1) Nâng cao khả năng giải quyết vấn đề và tính độc lập tự chủ (B - "teaches independence, adaptability, and problem-solving in real-life situations"); 2) Xây dựng nhận thức văn hóa và góc nhìn toàn cầu (C - "broaden my understanding of the world", "enhancing my global perspective"). Bài không hề nhắc đến việc đảm bảo mức lương cao (A) hay giúp phỏng vấn xin việc dễ dàng hơn (D). Do đó hai đáp án đúng là B và C.'
        },
        {
          id: 'p1_q10',
          number: 10,
          romanNumber: 'x',
          sectionId: 'sec2',
          wordLimit: 'TWO LETTERS (A, B, C, or D)',
          maxWords: 2,
          maxChoices: 2,
          question: 'Why do employers value international graduates? (Choose TWO answers: B and D)',
          placeholder: 'Chọn 2 đáp án (ví dụ B, D)...',
          options: [
            { letter: 'A', text: 'They are fluent in multiple languages.' },
            { letter: 'B', text: 'They are more adaptable and open-minded.' },
            { letter: 'C', text: 'They are more likely to stay long-term in one job.' },
            { letter: 'D', text: 'They can work in diverse teams.' }
          ],
          primaryAnswer: 'B, D',
          acceptedAnswers: [
            'B, D',
            'B and D',
            'D, B',
            'D and B',
            'B D',
            'D B',
            'B & D',
            'D & B',
            'They are more adaptable and open-minded, They can work in diverse teams'
          ],
          evidence: 'Employers often favour applicants with international experience, who are more likely to be open-minded, independent, and capable of working in multicultural environments.',
          explanation: 'Đoạn cuối nhấn mạnh các nhà tuyển dụng thường ưu ái những ứng viên có kinh nghiệm quốc tế vì họ có tư duy cởi mở, tự lập và khả năng thích nghi tốt (B - "open-minded, independent") cũng như có năng lực làm việc trong môi trường đa văn hóa với các đội nhóm đa dạng (D - "capable of working in multicultural environments"). Bài không đề cập họ nói trôi chảy nhiều ngoại ngữ (A) hay gắn bó lâu dài hơn với một công việc (C). Do đó hai đáp án đúng là B và D.'
        }
      ]
    }
  ]
};

// Flatten all questions across passages to ensure direct access and consistent grading
PRE_IELTS_READING_3_PRACTICE_DETAIL.questions = PRE_IELTS_READING_3_PRACTICE_DETAIL.passages.flatMap(p => p.questions || []);
