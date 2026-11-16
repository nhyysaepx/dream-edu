// Pre-IELTS Reading 3: Multiple Choice Questions (Practice)
// Detail data for practice assignment pre-ielts-reading-3

export const PRE_IELTS_READING_3_PRACTICE_DETAIL = {
  id: 'pre-ielts-reading-3',
  title: 'PRACTICE - Reading 3 - Multiple Choice Questions',
  level: 'Pre IELTS',
  session: 'Buổi 3 - Luyện tập trên lớp (In-Class Practice)',
  skill: 'Reading',
  skillBadge: 'IELTS Reading (Multiple Choice)',
  description: 'Thực hành kỹ thuật Skimming, phân tích câu hỏi, xác định từ khóa và chiến lược làm dạng bài Multiple Choice (A-D) với bài đọc "Education and the Workplace in the UK".',
  totalQuestions: 4,
  duration: '15 - 20 phút',
  vocabId: 'pre-ielts-reading-3',
  vocabCount: 20,
  vocabLabel: 'Học 20 từ vựng Reading 3',
  strategyTips: [
    'Read (skim) the text very quickly so you understand what it is about.',
    'Read the main part of the questions and find the key words (the words that will help you find the answer in the passage).',
    'Find the key words or words that mean the same in the passage.',
    'Try to answer the question without looking at the options A-D.',
    'Find the option, A, B, C, or D, that matches your answer.',
    'Check that the other options are incorrect.'
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'Education and the Workplace in the UK',
      shortTitle: 'Passage: Education & Workplace',
      wordLimit: 'ONE LETTER ONLY (A, B, C, or D)',
      maxWords: 1,
      instruction: 'Read the text on work-based learning and answer the questions that follow. Choose the correct letter, A, B, C, or D.',
      content: `EDUCATION AND THE WORKPLACE IN THE UK

A
There has been a trend towards creating a closer connection between education/training and the workplace. This is because many employers felt that school leavers were not prepared well enough and didn’t have the skills they would need to do well at work. Having a close relationship between training and work is not new; apprenticeships were a common way of learning in the past. Young people learnt by working with an expert, but this was most common in trades such as builders or electricians. The trend now is for a closer connection between education and the workplace at all levels and in many different types of job.

B
In 1944, the UK government created a new system of education. Education was divided into three parts. Children who passed an exam at 11 went to grammar schools. Pupils who didn’t do well in the exam went to ‘secondary modern’ schools or technical schools. At technical schools they studied work-based subjects. In practice, however, only 0.5% of pupils went to technical schools, and this system divided students at a very young age into academic and non-academic. The system did not produce good results, and changed to a more equal system in the 1970s.

C
In the 1980s the British government introduced NVQs or National Vocational Qualifications so that young people could get certificates to show their practical skills. It helps employers understand what workers can do. In 1994, the government started a programme which aimed to provide ‘quality training on a work-based (educational) route’. These ‘modern apprenticeships’ are available at three different levels.

D
At the higher levels of education, too, there has been more emphasis on work-based learning, which links academic study closely to practical experience. At degree level, companies have linked with universities to create specialised qualifications, such as the BA in Distribution run between Middlesex University and Asda Supermarket. Such partnerships also exist at Masters and even doctoral level.

E
The development of technology has helped work-based learning to develop. Blended learning means part of the course can be delivered online, so people don’t have to miss work to go to classes. Older or recently retired employees have been given the opportunity to develop new skills as tutors, mentors and coaches for the work-based part of the courses. This kind of work-based training was common in fields such as nursing and teaching, but has now spread to careers which were traditionally not closely linked to education.

F
There are some challenges involved in work-based learning. Some lecturers might find it difficult to teach students with a lot of work experience. It may also be difficult to find teachers who can teach in different places and at different times. However, it is practical, and there are more ways to learn and people can study at different stages of their lives.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          question: 'Apprenticeships',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'are a new way of learning.' },
            { letter: 'B', text: 'were common in the past.' },
            { letter: 'C', text: 'only existed in the past.' },
            { letter: 'D', text: 'did not help people do well at work.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: [
            'B',
            'b',
            'were common in the past.',
            'were common in the past'
          ],
          evidence: 'Having a close relationship between training and work is not new; apprenticeships were a common way of learning in the past.',
          explanation: 'Đoạn A nêu: "Having a close relationship between training and work is not new; apprenticeships were a common way of learning in the past." (Việc gắn kết đào tạo với công việc không phải là mới; học việc từng là một cách học phổ biến trong quá khứ). Do đó phương án B là chính xác.'
        },
        {
          id: 'p1_q2',
          number: 2,
          question: 'The education system introduced in 1944',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'only affected 0.5% of students.' },
            { letter: 'B', text: 'taught only technical subjects.' },
            { letter: 'C', text: 'was not a great success.' },
            { letter: 'D', text: 'was for academically gifted students.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: [
            'C',
            'c',
            'was not a great success.',
            'was not a great success'
          ],
          evidence: 'The system did not produce good results, and changed to a more equal system in the 1970s.',
          explanation: 'Đoạn B nêu rõ: "The system did not produce good results, and changed to a more equal system in the 1970s." Hệ thống giáo dục năm 1944 không đem lại kết quả tốt ("did not produce good results"), đồng nghĩa với "was not a great success" (không thành công lớn). Do đó phương án C chính xác.'
        },
        {
          id: 'p1_q3',
          number: 3,
          question: 'Blended learning',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'mainly benefits older or retired people.' },
            { letter: 'B', text: 'involves mainly face to face classes.' },
            { letter: 'C', text: 'is mainly for teaching and nursing.' },
            { letter: 'D', text: 'is convenient for working people.' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: [
            'D',
            'd',
            'is convenient for working people.',
            'is convenient for working people'
          ],
          evidence: 'Blended learning means part of the course can be delivered online, so people don’t have to miss work to go to classes.',
          explanation: 'Đoạn E giải thích: "Blended learning means part of the course can be delivered online, so people don’t have to miss work to go to classes." Phương pháp học kết hợp cho phép một phần khóa học diễn ra trực tuyến để học viên không phải nghỉ làm việc, rất thuận tiện cho người đi làm ("convenient for working people"). Do đó phương án D chính xác.'
        },
        {
          id: 'p1_q4',
          number: 4,
          question: 'The challenges of work-based learning include',
          placeholder: 'Chọn hoặc điền A, B, C, hoặc D...',
          options: [
            { letter: 'A', text: 'practical issues like when classes are held.' },
            { letter: 'B', text: 'students who are not very experienced.' },
            { letter: 'C', text: 'more types of learning are acceptable.' },
            { letter: 'D', text: 'older people can’t use computers well.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: [
            'A',
            'a',
            'practical issues like when classes are held.',
            'practical issues like when classes are held'
          ],
          evidence: 'There are some challenges involved in work-based learning... It may also be difficult to find teachers who can teach in different places and at different times.',
          explanation: 'Đoạn F chỉ ra những khó khăn: "It may also be difficult to find teachers who can teach in different places and at different times." Việc giáo viên phải giảng dạy ở nhiều nơi và thời điểm khác nhau liên quan trực tiếp đến các vấn đề thực tế như thời gian tổ chức lớp học ("practical issues like when classes are held"). Do đó phương án A chính xác.'
        }
      ]
    }
  ]
};
