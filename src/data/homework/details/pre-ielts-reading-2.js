// Pre-IELTS Reading 2: The Body (Short-answer & Sentence Completion)
// Detail data for homework assignment pre-ielts-reading-2

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
          primaryAnswer: 'a large stomach',
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
