// Pre-IELTS Reading 3: Internships & Online Degrees (Multiple Choice Questions)
// Detail data for homework assignment pre-ielts-reading-3

export const PRE_IELTS_READING_3_DETAIL = {
  id: 'pre-ielts-reading-3',
  title: 'HOMEWORK - Reading 3 - The Rise of Internships & Online Degrees',
  level: 'Pre IELTS',
  session: 'Buổi 3 - Pre-IELTS Reading (Unit 3: Internships & Online Degrees)',
  skill: 'Reading',
  description: 'Trọn bộ 2 bài đọc BTVN Reading 3 gồm 20 câu hỏi trắc nghiệm: Bài 1 (The Rise of Internships and Soft Skills in Modern Education - 10 câu) và Bài 2 (Are Online Degrees Changing Higher Education? - 10 câu gồm 8 câu Single Choice & 2 câu Multi-Choice).',
  totalQuestions: 20,
  duration: '35 - 45 phút',
  vocabId: 'pre-ielts-reading-3',
  vocabCount: 30,
  vocabLabel: 'Học 30 từ vựng Reading 3',
  sections: [
    {
      id: 'sec1',
      title: 'Bài đọc 1: The Rise of Internships (Questions 1–10)',
      shortTitle: 'Bài 1 (1–10)',
      minQ: 1,
      maxQ: 10,
      instruction: 'Choose the correct letter, A, B, C, or D (Questions 1–10)',
      wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
      maxWords: 1
    },
    {
      id: 'sec2',
      title: 'Bài đọc 2 - Phần 1: Choose ONE correct answer',
      shortTitle: 'Bài 2 - P1 (11–18)',
      minQ: 11,
      maxQ: 18,
      instruction: 'Choose ONE correct answer (Questions 11–18)',
      wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
      maxWords: 1
    },
    {
      id: 'sec3',
      title: 'Bài đọc 2 - Phần 2: Choose TWO correct answers',
      shortTitle: 'Bài 2 - P2 (19–20)',
      minQ: 19,
      maxQ: 20,
      instruction: 'Choose TWO correct answers (Questions 19–20)',
      wordLimit: 'TWO LETTERS (A, B, C, or D)',
      maxWords: 2
    }
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'The Rise of Internships and Soft Skills in Modern Education',
      shortTitle: 'Bài 1: Internships & Skills',
      wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
      maxWords: 1,
      instruction: 'Read the text carefully and answer questions 1–10. Choose the correct letter, A, B, C, or D.',
      content: `THE RISE OF INTERNSHIPS AND SOFT SKILLS IN MODERN EDUCATION

A
In recent years, universities and colleges have changed the way they prepare students for their future careers. In the past, having a good university degree with high grades was enough to get a well-paid job. However, modern employers frequently complain that graduate applicants lack practical experience and essential ‘soft skills’—such as communication, teamwork, and time management. Although doing summer jobs has always been common among teenagers, there is now a strong focus on structured internships across almost all university departments.

B
In the 1960s, higher education in many Western countries focused almost entirely on academic theory. Students spent three or four years reading books, writing essays, and taking final exams. Only a small number of courses, such as medicine, teaching, and engineering, required students to spend time working in real hospitals, schools, or factories. For most arts and humanities students, the workplace was completely separate from their studies. Because this system left many graduates unprepared for office life, universities began to reform their programmes in the 1990s.

C
By the early 2000s, many educational institutions had introduced ‘sandwich courses’. These are four-year degree programmes where students study at university for two years, spend their third year working in a company, and return to university for their final year. This system allows young people to gain real-world experience and understand how businesses operate before they graduate. In 2010, several governments also started offering financial support to small companies so they could afford to pay student interns.

D
At the postgraduate level, the connection between university research and industry has also grown stronger. Instead of writing theoretical reports that nobody outside the university reads, Master’s students now frequently work on live projects for partner companies. For example, a marketing student at Manchester Metropolitan University might design a real advertising campaign for a local retail brand. This approach gives students valuable material for their CVs while providing companies with fresh, creative ideas.

E
Changes in workplace technology have also created new types of internships. Today, ‘virtual internships’ allow students to work for companies from their own homes or university dormitories. Through video calls and cloud-based software, a student in Vietnam or Brazil can complete tasks for a technology firm in London or New York. Furthermore, experienced managers in these companies often act as online mentors, giving students regular feedback on their professional performance.

F
Despite the clear benefits, integrating internships into university degrees presents several difficulties. Firstly, in competitive industries like media and fashion, many internships are still unpaid, meaning poorer students cannot afford to take them. Secondly, university staff often find it hard to monitor whether companies are giving students meaningful work rather than just making coffee and photocopying. Nevertheless, work placements remain one of the most effective ways for young people to bridge the gap between the classroom and the employment market.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          romanNumber: 'i',
          sectionId: 'sec1',
          sectionTitle: 'Questions 1–10: Choose the correct letter, A, B, C, or D',
          sectionInstruction: 'Choose the correct letter, A, B, C, or D.',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          isSectionStart: true,
          question: 'Why have universities changed how they prepare students for careers?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Students no longer want to get university degrees.' },
            { letter: 'B', text: 'Employers feel graduates do not have enough practical and soft skills.' },
            { letter: 'C', text: 'Summer jobs are no longer available for teenagers.' },
            { letter: 'D', text: 'High grades are much harder to achieve than in the past.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'Employers feel graduates do not have enough practical and soft skills.',
            'Employers feel graduates do not have enough practical and soft skills',
            'B. Employers feel graduates do not have enough practical and soft skills.'
          ],
          evidence: 'However, modern employers frequently complain that graduate applicants lack practical experience and essential ‘soft skills’—such as communication, teamwork, and time management.',
          explanation: 'Đoạn A nêu rõ: các nhà tuyển dụng ngày nay thường xuyên phàn nàn rằng sinh viên tốt nghiệp thiếu kinh nghiệm thực tế và các kỹ năng mềm thiết yếu ("modern employers frequently complain that graduate applicants lack practical experience and essential ‘soft skills’"). Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q2',
          number: 2,
          romanNumber: 'ii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'In the 1960s, university education',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'required all students to work in factories or schools.' },
            { letter: 'B', text: 'focused mainly on practical workplace skills.' },
            { letter: 'C', text: 'separated academic study from work for most students.' },
            { letter: 'D', text: 'was reformed to help arts and humanities graduates.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'separated academic study from work for most students.',
            'separated academic study from work for most students',
            'C. separated academic study from work for most students.'
          ],
          evidence: 'In the 1960s, higher education in many Western countries focused almost entirely on academic theory... For most arts and humanities students, the workplace was completely separate from their studies.',
          explanation: 'Đoạn B nêu rõ vào những năm 1960, giáo dục đại học tập trung hầu như hoàn toàn vào lý thuyết học thuật, và đối với hầu hết sinh viên ngành nghệ thuật và nhân văn, nơi làm việc hoàn toàn tách biệt khỏi việc học tập ("For most arts and humanities students, the workplace was completely separate from their studies"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q3',
          number: 3,
          romanNumber: 'iii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is a ‘sandwich course’?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'A short course for students who work in the food industry.' },
            { letter: 'B', text: 'A degree that includes one full year of work experience in the middle.' },
            { letter: 'C', text: 'A two-year programme funded by small companies in 2010.' },
            { letter: 'D', text: 'A certificate given to students who pass practical exams.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'A degree that includes one full year of work experience in the middle.',
            'A degree that includes one full year of work experience in the middle',
            'B. A degree that includes one full year of work experience in the middle.'
          ],
          evidence: 'These are four-year degree programmes where students study at university for two years, spend their third year working in a company, and return to university for their final year.',
          explanation: 'Đoạn C định nghĩa ‘sandwich course’ là chương trình cấp bằng 4 năm: sinh viên học tại trường 2 năm đầu, dành trọn vẹn năm thứ ba làm việc tại một công ty ("spend their third year working in a company"), và trở lại trường vào năm cuối. Tức là chương trình có 1 năm kinh nghiệm làm việc xen ở giữa. Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q4',
          number: 4,
          romanNumber: 'iv',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'According to Paragraph D, how do Master’s students benefit from working with partner companies?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'They are guaranteed a full-time job after graduation.' },
            { letter: 'B', text: 'They do not have to write any reports during their course.' },
            { letter: 'C', text: 'They gain useful experience to put on their CVs.' },
            { letter: 'D', text: 'They receive a high salary from local retail brands.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'They gain useful experience to put on their CVs.',
            'They gain useful experience to put on their CVs',
            'C. They gain useful experience to put on their CVs.'
          ],
          evidence: 'This approach gives students valuable material for their CVs while providing companies with fresh, creative ideas.',
          explanation: 'Đoạn D chỉ ra việc thực hiện các dự án thực tế cho doanh nghiệp đối tác mang lại cho học viên cao học nguồn tư liệu/kinh nghiệm quý giá cho CV của mình ("gives students valuable material for their CVs"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q5',
          number: 5,
          romanNumber: 'v',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What do companies gain from partnering with postgraduate students?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Free advertising on university campuses.' },
            { letter: 'B', text: 'Government funding to pay their full-time staff.' },
            { letter: 'C', text: 'New and creative ideas from the students.' },
            { letter: 'D', text: 'Reduced taxes on their business operations.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'New and creative ideas from the students.',
            'New and creative ideas from the students',
            'C. New and creative ideas from the students.'
          ],
          evidence: '...while providing companies with fresh, creative ideas.',
          explanation: 'Đoạn D nêu rõ các công ty nhận được những ý tưởng mới mẻ và sáng tạo từ các sinh viên ("providing companies with fresh, creative ideas"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q6',
          number: 6,
          romanNumber: 'vi',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Virtual internships allow students to',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'travel to London or New York for free.' },
            { letter: 'B', text: 'work for foreign companies without leaving their home country.' },
            { letter: 'C', text: 'avoid talking to managers or mentors.' },
            { letter: 'D', text: 'study without using computers or software.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'work for foreign companies without leaving their home country.',
            'work for foreign companies without leaving their home country',
            'B. work for foreign companies without leaving their home country.'
          ],
          evidence: 'Today, ‘virtual internships’ allow students to work for companies from their own homes or university dormitories. Through video calls and cloud-based software, a student in Vietnam or Brazil can complete tasks for a technology firm in London or New York.',
          explanation: 'Đoạn E giải thích các kỳ thực tập ảo cho phép sinh viên làm việc từ xa ngay tại nhà hoặc ký túc xá: sinh viên ở Việt Nam hay Brazil có thể hoàn thành công việc cho một công ty công nghệ tại London hoặc New York mà không cần rời khỏi đất nước của mình ("without leaving their home country"). Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q7',
          number: 7,
          romanNumber: 'vii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Who often helps students improve their performance during virtual internships?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'University lecturers' },
            { letter: 'B', text: 'Retired school teachers' },
            { letter: 'C', text: 'Experienced company managers' },
            { letter: 'D', text: 'Other international students' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Experienced company managers',
            'Experienced company managers.',
            'C. Experienced company managers'
          ],
          evidence: 'Furthermore, experienced managers in these companies often act as online mentors, giving students regular feedback on their professional performance.',
          explanation: 'Đoạn E cho biết những người quản lý giàu kinh nghiệm tại các công ty này thường đóng vai trò là người cố vấn trực tuyến, đưa ra phản hồi định kỳ giúp sinh viên cải thiện hiệu quả làm việc ("experienced managers in these companies often act as online mentors"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p1_q8',
          number: 8,
          romanNumber: 'viii',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Why are unpaid internships a problem in industries like media and fashion?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Companies do not want to hire graduates from these fields.' },
            { letter: 'B', text: 'Students from lower-income families cannot afford to do them.' },
            { letter: 'C', text: 'They take too much time away from online classes.' },
            { letter: 'D', text: 'Mentors refuse to train interns who do not receive a salary.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'Students from lower-income families cannot afford to do them.',
            'Students from lower-income families cannot afford to do them',
            'B. Students from lower-income families cannot afford to do them.'
          ],
          evidence: 'Firstly, in competitive industries like media and fashion, many internships are still unpaid, meaning poorer students cannot afford to take them.',
          explanation: 'Đoạn F chỉ ra thực tập không lương là rào cản vì sinh viên nghèo / gia đình có hoàn cảnh khó khăn hơn sẽ không thể trang trải để tham gia ("meaning poorer students cannot afford to take them"). Do đó đáp án đúng là B.'
        },
        {
          id: 'p1_q9',
          number: 9,
          romanNumber: 'ix',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is a challenge for university staff regarding internships?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Checking that companies give students useful tasks to do.' },
            { letter: 'B', text: 'Teaching students how to make coffee and use photocopiers.' },
            { letter: 'C', text: 'Finding enough computers for students to work online.' },
            { letter: 'D', text: 'Convincing students that work experience is important.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: [
            'A',
            'a',
            'Checking that companies give students useful tasks to do.',
            'Checking that companies give students useful tasks to do',
            'A. Checking that companies give students useful tasks to do.'
          ],
          evidence: 'Secondly, university staff often find it hard to monitor whether companies are giving students meaningful work rather than just making coffee and photocopying.',
          explanation: 'Đoạn F nêu thách thức đối với cán bộ nhà trường là khó kiểm soát xem liệu doanh nghiệp có giao công việc thực chất, hữu ích cho sinh viên hay không ("hard to monitor whether companies are giving students meaningful work rather than just making coffee and photocopying"). "Meaningful work" tương đương với "useful tasks". Do đó đáp án đúng là A.'
        },
        {
          id: 'p1_q10',
          number: 10,
          romanNumber: 'x',
          sectionId: 'sec1',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is the writer’s overall conclusion about work placements?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'They should be replaced by traditional academic exams.' },
            { letter: 'B', text: 'They are only useful for medicine and engineering students.' },
            { letter: 'C', text: 'They are too difficult for universities to organize successfully.' },
            { letter: 'D', text: 'They are still a very useful way to connect education with work.' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: [
            'D',
            'd',
            'They are still a very useful way to connect education with work.',
            'They are still a very useful way to connect education with work',
            'D. They are still a very useful way to connect education with work.'
          ],
          evidence: 'Nevertheless, work placements remain one of the most effective ways for young people to bridge the gap between the classroom and the employment market.',
          explanation: 'Đoạn cuối khẳng định: dù có nhiều khó khăn, các kỳ thực tập (work placements) vẫn là một trong những cách hiệu quả nhất giúp giới trẻ thu hẹp khoảng cách giữa giảng đường và thị trường việc làm ("bridge the gap between the classroom and the employment market" = connect education with work). Do đó đáp án đúng là D.'
        }
      ]
    },
    {
      id: 'p2',
      number: 2,
      title: 'Are Online Degrees Changing Higher Education?',
      shortTitle: 'Bài 2: Online Degrees',
      wordLimit: 'ONE / TWO LETTERS',
      maxWords: 2,
      instruction: 'Read the text carefully and answer questions 11–20. Questions 11–18: Choose ONE correct answer. Questions 19–20: Choose TWO correct answers.',
      content: `Are Online Degrees Changing Higher Education?

The rise of digital campuses

A recent global report on higher education has revealed the countries where online university learning is growing the fastest. Unsurprisingly, technologically advanced nations with large geographical areas, such as the US, Canada, and Australia, are in the top 10, but the country leading the list may come as a shock: India. Two European nations—Spain and Sweden—also made it into the top 5, ahead of the UK, South Korea, Mexico, and South Africa. This rapid shift demonstrates that digital education is becoming a mainstream choice across both developing and developed regions.

Over the past decade, governments and top universities have invested heavily in digital platforms to reach a wider range of learners. By offering accredited online degrees at a lower cost than traditional campus programmes, institutions are competing to attract working adults and international learners who cannot relocate.

The student experience

Elena Rostova, a Russian graphic designer who is currently completing an online Master’s degree in Digital Media at a Spanish university, previously took a short online course from a college in Canada (which ranked 4th in the report). “Friends often ask me why I chose an online degree when there are good universities in my hometown. For me, it wasn't about avoiding the classroom, but about flexibility. I can keep my full-time job while studying with classmates from twelve different countries. Hearing their perspectives on design has completely changed my creative style, which is already helping me at work.”

Elena’s course choice reflects a wider global pattern. Information technology (IT) and business management are the most popular online degree subjects, followed by digital marketing, healthcare administration, education, psychology, and finance. David, a student enrolled in the Faculty of IT at the same Spanish university, shares Elena’s view on flexibility, and adds: “I wanted to upgrade my technical skills without taking a career break. Studying online has improved my digital communication skills, and I have even learned basic Spanish through our student chat groups. I attended a one-week summer workshop on campus in Madrid last year, which was fantastic. I hope the professional network I am building will open doors to international tech jobs.”

Another less obvious benefit of online study is the development of strong self-discipline. Managing work, family life, and university deadlines without a teacher standing in front of you requires excellent time management, motivation, and independent research skills—qualities that build long-term professional maturity.

What makes an online university successful?

First of all, top-ranked online universities make the registration process straightforward and provide 24/7 technical and academic support. They also design interactive lessons—using short videos, quizzes, and live discussion boards—which keep students engaged so they do not drop out. The popularity of these programmes is largely due to how well universities build a sense of community online. Students are included in virtual clubs, career fairs, and group projects. Most course materials can be downloaded for free, and lectures are recorded with English subtitles, making it simple for non-native speakers to review difficult topics at their own pace.

Beyond helping individual students, expanding online education improves the university’s own teaching standards. Creating digital courses forces professors to update their materials, use modern technology, and collaborate with international experts. For learners, it provides an affordable way to gain a respected qualification at a time when tuition fees and living costs are rising everywhere.

Finally, holding an online degree can be a strong point on a job application. Modern employers increasingly respect candidates who have studied online while working, as it proves they are self-motivated, comfortable with digital tools, and capable of collaborating in remote teams.`,
      questions: [
        {
          id: 'p2_q11',
          number: 11,
          romanNumber: '1',
          sectionId: 'sec2',
          sectionTitle: 'Phần 1: Choose ONE correct answer (Questions 11–18)',
          sectionInstruction: 'Choose ONE correct answer (Questions 11–18)',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          isSectionStart: true,
          question: 'Which country is ranked number one for the fastest growth in online university learning?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'The US' },
            { letter: 'B', text: 'Australia' },
            { letter: 'C', text: 'India' },
            { letter: 'D', text: 'Spain' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'India',
            'C. India'
          ],
          evidence: 'Unsurprisingly, technologically advanced nations with large geographical areas, such as the US, Canada, and Australia, are in the top 10, but the country leading the list may come as a shock: India.',
          explanation: 'Đoạn 1 nêu rõ: Trong khi các cường quốc công nghệ như Mỹ, Canada, Úc lọt top 10, quốc gia dẫn đầu bảng xếp hạng tăng trưởng nhanh nhất lại là Ấn Độ ("the country leading the list may come as a shock: India"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p2_q12',
          number: 12,
          romanNumber: '2',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What subject is Elena Rostova currently studying?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Healthcare administration' },
            { letter: 'B', text: 'Digital Media' },
            { letter: 'C', text: 'Psychology' },
            { letter: 'D', text: 'Finance' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'Digital Media',
            'B. Digital Media'
          ],
          evidence: 'Elena Rostova, a Russian graphic designer who is currently completing an online Master’s degree in Digital Media at a Spanish university...',
          explanation: 'Đoạn 3 cho biết Elena Rostova hiện đang hoàn thành chương trình Thạc sĩ trực tuyến ngành Truyền thông số ("Digital Media") tại một trường đại học Tây Ban Nha. Do đó đáp án đúng là B.'
        },
        {
          id: 'p2_q13',
          number: 13,
          romanNumber: '3',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Which two subjects are the most popular among online degree students?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Education and Psychology' },
            { letter: 'B', text: 'Finance and Digital Marketing' },
            { letter: 'C', text: 'IT and Business Management' },
            { letter: 'D', text: 'Graphic Design and Languages' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'IT and Business Management',
            'C. IT and Business Management'
          ],
          evidence: 'Information technology (IT) and business management are the most popular online degree subjects, followed by digital marketing, healthcare administration, education, psychology, and finance.',
          explanation: 'Đoạn 4 chỉ ra hai ngành học phổ biến nhất của các chương trình cử nhân trực tuyến là Công nghệ thông tin và Quản trị kinh doanh ("Information technology (IT) and business management are the most popular online degree subjects"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p2_q14',
          number: 14,
          romanNumber: '4',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'Why did Elena choose to study for her degree online?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'There were no good universities in her hometown.' },
            { letter: 'B', text: 'Her employer forced her to take the course.' },
            { letter: 'C', text: 'She wanted the flexibility to work and study at the same time.' },
            { letter: 'D', text: 'She could not get a visa to travel to Canada or Spain.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'She wanted the flexibility to work and study at the same time.',
            'She wanted the flexibility to work and study at the same time',
            'C. She wanted the flexibility to work and study at the same time.'
          ],
          evidence: 'For me, it wasn\'t about avoiding the classroom, but about flexibility. I can keep my full-time job while studying with classmates from twelve different countries.',
          explanation: 'Elena giải thích rằng bạn chọn học bằng trực tuyến vì tính linh hoạt, giúp vừa duy trì công việc toàn thời gian vừa học tập ("flexibility. I can keep my full-time job while studying"). Do đó đáp án đúng là C.'
        },
        {
          id: 'p2_q15',
          number: 15,
          romanNumber: '5',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What language has David learned at a basic level through student chat groups?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Russian' },
            { letter: 'B', text: 'French' },
            { letter: 'C', text: 'Spanish' },
            { letter: 'D', text: 'Swedish' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Spanish',
            'C. Spanish'
          ],
          evidence: 'Studying online has improved my digital communication skills, and I have even learned basic Spanish through our student chat groups.',
          explanation: 'Đoạn 4 nêu rõ David đã học được tiếng Tây Ban Nha cơ bản ("learned basic Spanish") nhờ các nhóm trò chuyện của sinh viên. Do đó đáp án đúng là C.'
        },
        {
          id: 'p2_q16',
          number: 16,
          romanNumber: '6',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What does the article say about technical and academic support at successful online universities?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'It is only available during normal office hours.' },
            { letter: 'B', text: 'It is easy to access at any time of the day.' },
            { letter: 'C', text: 'Students have to pay an extra fee to use it.' },
            { letter: 'D', text: 'It is mainly designed for students living in Europe.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'It is easy to access at any time of the day.',
            'It is easy to access at any time of the day',
            'B. It is easy to access at any time of the day.'
          ],
          evidence: 'First of all, top-ranked online universities make the registration process straightforward and provide 24/7 technical and academic support.',
          explanation: 'Đoạn 6 khẳng định các trường đại học trực tuyến hàng đầu cung cấp hỗ trợ kỹ thuật và học thuật 24/7 ("provide 24/7 technical and academic support"), đồng nghĩa với việc sinh viên dễ dàng tiếp cận hỗ trợ vào bất kỳ lúc nào trong ngày ("at any time of the day"). Do đó đáp án đúng là B.'
        },
        {
          id: 'p2_q17',
          number: 17,
          romanNumber: '7',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'One reason developing online courses is beneficial for universities is because it:',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'reduces the number of professors they need to hire.' },
            { letter: 'B', text: 'encourages professors to update their teaching materials and methods.' },
            { letter: 'C', text: 'allows them to charge higher tuition fees than campus courses.' },
            { letter: 'D', text: 'stops students from asking difficult questions in class.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'encourages professors to update their teaching materials and methods.',
            'encourages professors to update their teaching materials and methods',
            'B. encourages professors to update their teaching materials and methods.'
          ],
          evidence: 'Beyond helping individual students, expanding online education improves the university’s own teaching standards. Creating digital courses forces professors to update their materials, use modern technology, and collaborate with international experts.',
          explanation: 'Đoạn 7 cho biết việc mở rộng giáo dục trực tuyến nâng cao tiêu chuẩn giảng dạy của trường đại học vì buộc các giáo sư phải cập nhật giáo trình và ứng dụng công nghệ hiện đại ("forces professors to update their materials, use modern technology"). Do đó đáp án đúng là B.'
        },
        {
          id: 'p2_q18',
          number: 18,
          romanNumber: '8',
          sectionId: 'sec2',
          wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
          maxWords: 1,
          question: 'What is NOT mentioned as an advantage of studying for an online degree?',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'Saving money on living and relocation costs' },
            { letter: 'B', text: 'Improving time management and self-discipline' },
            { letter: 'C', text: 'Receiving free computer equipment from the university' },
            { letter: 'D', text: 'Learning to work effectively in remote teams' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'Receiving free computer equipment from the university',
            'Receiving free computer equipment from the university.',
            'C. Receiving free computer equipment from the university'
          ],
          evidence: 'Bài đọc đề cập: "lower cost... cannot relocate" (A), "strong self-discipline... time management" (B), và "collaborating in remote teams" (D). Việc nhận thiết bị máy tính miễn phí từ trường không hề được nhắc đến (chỉ có tài liệu được tải miễn phí: "course materials can be downloaded for free").',
          explanation: 'Các lợi ích như tiết kiệm chi phí sinh hoạt/đi lại (A), rèn luyện tính kỷ luật và quản lý thời gian (B), kỹ năng làm việc nhóm từ xa (D) đều được nêu trong bài. Việc nhận thiết bị máy tính miễn phí từ trường đại học (C) KHÔNG được đề cập. Do đó đáp án đúng là C.'
        },
        {
          id: 'p2_q19',
          number: 19,
          romanNumber: '9',
          sectionId: 'sec3',
          sectionTitle: 'Phần 2: Choose TWO correct answers (Questions 19–20)',
          sectionInstruction: 'Choose TWO correct answers (Questions 19–20)',
          wordLimit: 'TWO LETTERS (A, B, C, or D)',
          maxWords: 2,
          maxChoices: 2,
          isSectionStart: true,
          question: 'According to the article, how do online universities help international students succeed? (Choose TWO answers: A and C)',
          placeholder: 'Chọn 2 đáp án (ví dụ A, C)...',
          options: [
            { letter: 'A', text: 'They record lectures with English subtitles so students can study at their own speed.' },
            { letter: 'B', text: 'They provide free flights to attend graduation ceremonies.' },
            { letter: 'C', text: 'They offer most downloadable course materials at no extra cost.' },
            { letter: 'D', text: 'They remove all exams and deadlines from the courses.' }
          ],
          primaryAnswer: 'A, C',
          acceptedAnswers: [
            'A, C',
            'A and C',
            'C, A',
            'C and A',
            'A C',
            'C A',
            'A & C',
            'C & A',
            'They record lectures with English subtitles so students can study at their own speed, They offer most downloadable course materials at no extra cost'
          ],
          evidence: 'Most course materials can be downloaded for free, and lectures are recorded with English subtitles, making it simple for non-native speakers to review difficult topics at their own pace.',
          explanation: 'Đoạn 6 nêu rõ hai cách các trường đại học trực tuyến hỗ trợ sinh viên quốc tế: 1) Ghi hình bài giảng có phụ đề tiếng Anh giúp sinh viên xem lại theo tốc độ riêng của bản thân (A - "lectures are recorded with English subtitles, making it simple for non-native speakers to review difficult topics at their own pace"); 2) Cung cấp hầu hết tài liệu khóa học tải về miễn phí (C - "Most course materials can be downloaded for free" = at no extra cost). Bài không hề nhắc đến vé máy bay miễn phí (B) hay bãi bỏ thi cử/hạn nộp (D). Do đó hai đáp án đúng là A và C.'
        },
        {
          id: 'p2_q20',
          number: 20,
          romanNumber: '10',
          sectionId: 'sec3',
          wordLimit: 'TWO LETTERS (A, B, C, or D)',
          maxWords: 2,
          maxChoices: 2,
          question: 'Why do modern employers value job applicants who have completed an online degree while working? (Choose TWO answers: B and D)',
          placeholder: 'Chọn 2 đáp án (ví dụ B, D)...',
          options: [
            { letter: 'A', text: 'They are willing to work for a lower starting salary.' },
            { letter: 'B', text: 'They have proven that they are self-motivated and organized.' },
            { letter: 'C', text: 'They never need any training when starting a new job.' },
            { letter: 'D', text: 'They are skilled at using digital technology and working remotely.' }
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
            'They have proven that they are self-motivated and organized, They are skilled at using digital technology and working remotely'
          ],
          evidence: 'Modern employers increasingly respect candidates who have studied online while working, as it proves they are self-motivated, comfortable with digital tools, and capable of collaborating in remote teams.',
          explanation: 'Đoạn kết nêu rõ hai lý do nhà tuyển dụng đánh giá cao ứng viên vừa đi làm vừa hoàn thành bằng trực tuyến: 1) Chứng minh được bản thân có tính tự giác và khả năng tổ chức/quản lý cao (B - "proves they are self-motivated"); 2) Thành thạo việc ứng dụng công nghệ số và có năng lực làm việc từ xa hiệu quả (D - "comfortable with digital tools, and capable of collaborating in remote teams"). Do đó hai đáp án đúng là B và D.'
        }
      ]
    }
  ]
};

// Flatten all questions across passages to ensure direct access and consistent grading
PRE_IELTS_READING_3_DETAIL.questions = PRE_IELTS_READING_3_DETAIL.passages.flatMap(p => p.questions || []);
