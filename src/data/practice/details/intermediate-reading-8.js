// IELTS Intermediate Reading 8: True / False / Not Given (The Magic of Venice Carnival)
// Detail data for practice assignment intermediate-reading-8

export const INTERMEDIATE_READING_8_PRACTICE_DETAIL = {
  id: 'intermediate-reading-8',
  title: 'PRACTICE - Reading 8 - True / False / Not Given (The Magic of Venice Carnival)',
  level: 'IELTS Intermediate',
  levelId: 'ielts-foundation',
  category: 'ielts',
  session: 'Buổi 8 - Luyện tập trên lớp (In-Class Practice)',
  skill: 'Reading',
  skillBadge: 'IELTS Reading (True / False / Not Given)',
  description: 'Luyện tập kỹ thuật True / False / Not Given qua bài đọc về Lễ hội hóa trang Venice (The Magic of Venice Carnival) tại Ý, rèn luyện kỹ năng định vị thông tin, phân biệt thông tin đối lập và thông tin không được đề cập.',
  totalQuestions: 7,
  duration: '15 - 25 phút',
  strategyTips: [
    'Skim the text quickly to get a general understanding of the topic and main ideas.',
    'Read each statement carefully and underline key words (names, dates, places, qualifying words like "only", "all", "none").',
    'Scan the passage to locate the section containing the key words or their synonyms / parallel expressions.',
    'Compare the statement with the information in the passage carefully:',
    '• Choose TRUE if the statement agrees with the information in the passage.',
    '• Choose FALSE if the statement contradicts the information (expresses the opposite meaning).',
    '• Choose NOT GIVEN if there is no information about this, or it is impossible to verify from the text.'
  ],
  sections: [
    {
      id: 'sec1',
      title: 'Phần 1: True / False / Not Given',
      shortTitle: 'Questions 1–7',
      minQ: 1,
      maxQ: 7,
      instruction: 'Look at the statements and write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
      wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
      maxWords: 2
    }
  ],
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'The Magic of Venice Carnival',
      shortTitle: 'Passage: Venice Carnival',
      wordLimit: 'ONE OPTION (TRUE, FALSE or NOT GIVEN)',
      maxWords: 2,
      instruction: 'Look at the statements and write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, NOT GIVEN if there is no information on this.',
      content: `The Magic of Venice Carnival

In January or February, Venice plays host to the most magical of carnivals. During the carnival, the city is filled with a mass of masked party-goers, posing and dancing, in an attempt to reinvent one of the great traditions of the city. Naturally, it is very crowded and hotels and restaurants are expensive, but it is a unique occasion and a great time to experience this beautiful city.

The carnival was first held in Venice in the 11th century and lasted for over two months. Activities involved a series of formal parties in St Mark’s Square and playing games for money. Regardless of social status, participants wore costumes and masks. Images of the time and occasion are still displayed throughout the city today.

During the 18th century, however, this period of festivities came to an end, and the carnival did not return until 1979. Today, the carnival is extremely popular with people eager to dress up and parade around the city in their masks and costumes.

The weekends are the busiest times at the carnival – the final weekend in particular. During the festivities, you can enjoy live music and take part in a large open-air festival. Costumes are also a major feature of the occasion and there is even a competition to judge the best one. The best ones are usually displayed at the centre of carnival festivities, in the breathtaking St Mark’s Square. Numerous shops in Venice sell these costumes and masks in preparation for this great event.

Perhaps the most attractive aspect of the Venice carnival, though, is the variety of masked balls and parties there are to attend. You do have to pay for these, however, and they can be quite costly. One of the most expensive parties is the Valentine’s Grand Masquerade Ball, held on February 14th at the Palazzo Flangini.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          sectionId: 'sec1',
          question: 'Before the 20th century, only the rich participated in the carnival.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: [
            'FALSE',
            'False',
            'B',
            'b',
            'B. FALSE',
            'B. False',
            'F'
          ],
          evidence: 'Regardless of social status, participants wore costumes and masks.',
          explanation: 'Đoạn 2 nêu rõ: "Regardless of social status, participants wore costumes and masks" (Bất kể địa vị xã hội, những người tham gia đều mặc trang phục và đeo mặt nạ). Cụm từ "regardless of social status" (bất kể tầng lớp/địa vị xã hội) đối lập trực tiếp với khẳng định "only the rich participated" (chỉ người giàu mới tham gia). Do đó đáp án là FALSE.'
        },
        {
          id: 'p1_q2',
          number: 2,
          sectionId: 'sec1',
          question: 'The Venice carnival was banned in the 18th century.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: [
            'NOT GIVEN',
            'Not Given',
            'C',
            'c',
            'C. NOT GIVEN',
            'C. Not Given',
            'NG'
          ],
          evidence: 'During the 18th century, however, this period of festivities came to an end, and the carnival did not return until 1979.',
          explanation: 'Đoạn 3 cho biết: "During the 18th century, however, this period of festivities came to an end..." (Vào thế kỷ 18, thời kỳ lễ hội này đã kết thúc...). Bài đọc chỉ nêu lễ hội kết thúc chứ không hề đề cập đến việc lễ hội có bị chính quyền ban lệnh cấm (banned) hay không. Do không có thông tin xác thực việc có lệnh cấm hay không, đáp án là NOT GIVEN.'
        },
        {
          id: 'p1_q3',
          number: 3,
          sectionId: 'sec1',
          question: 'The most popular days at the carnival are during the week.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: [
            'FALSE',
            'False',
            'B',
            'b',
            'B. FALSE',
            'B. False',
            'F'
          ],
          evidence: 'The weekends are the busiest times at the carnival – the final weekend in particular.',
          explanation: 'Đoạn 4 nêu rõ: "The weekends are the busiest times at the carnival – the final weekend in particular" (Những ngày cuối tuần là thời điểm nhộn nhịp nhất của lễ hội – đặc biệt là cuối tuần cuối cùng). "Busiest times" tương ứng với "most popular days", và đó là vào cuối tuần (the weekends) chứ không phải vào các ngày trong tuần (during the week / weekdays). Nhận định này mâu thuẫn với bài đọc, do đó đáp án là FALSE.'
        },
        {
          id: 'p1_q4',
          number: 4,
          sectionId: 'sec1',
          question: 'None of the festivities take place outside.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: [
            'FALSE',
            'False',
            'B',
            'b',
            'B. FALSE',
            'B. False',
            'F'
          ],
          evidence: 'During the festivities, you can enjoy live music and take part in a large open-air festival.',
          explanation: 'Đoạn 4 chỉ rõ: "During the festivities, you can enjoy live music and take part in a large open-air festival" (Trong suốt lễ hội, bạn có thể thưởng thức nhạc sống và tham gia vào một lễ hội ngoài trời quy mô lớn) cùng các hoạt động tại quảng trường St Mark’s Square và diễu hành quanh thành phố ("parade around the city"). "Open-air" có nghĩa là ngoài trời (outside). Nhận định "None of the festivities take place outside" (Không có hoạt động nào diễn ra ngoài trời) mâu thuẫn trực tiếp với bài đọc. Do đó đáp án là FALSE.'
        },
        {
          id: 'p1_q5',
          number: 5,
          sectionId: 'sec1',
          question: 'There are few places in Venice where you can purchase your costume and mask.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'FALSE',
          acceptedAnswers: [
            'FALSE',
            'False',
            'B',
            'b',
            'B. FALSE',
            'B. False',
            'F'
          ],
          evidence: 'Numerous shops in Venice sell these costumes and masks in preparation for this great event.',
          explanation: 'Đoạn 4 cho biết: "Numerous shops in Venice sell these costumes and masks in preparation for this great event" (Vô số cửa hàng ở Venice bán các trang phục và mặt nạ này để chuẩn bị cho sự kiện). Từ "numerous" mang nghĩa là rất nhiều (a large number of), đối lập hoàn toàn với "few places" (rất ít nơi). Do đó đáp án là FALSE.'
        },
        {
          id: 'p1_q6',
          number: 6,
          sectionId: 'sec1',
          question: 'In order to take part in the costume competition you need to be Italian.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'NOT GIVEN',
          acceptedAnswers: [
            'NOT GIVEN',
            'Not Given',
            'C',
            'c',
            'C. NOT GIVEN',
            'C. Not Given',
            'NG'
          ],
          evidence: 'Costumes are also a major feature of the occasion and there is even a competition to judge the best one. The best ones are usually displayed at the centre of carnival festivities, in the breathtaking St Mark’s Square.',
          explanation: 'Đoạn 4 nhắc đến cuộc thi bình chọn trang phục đẹp nhất: "there is even a competition to judge the best one", nhưng bài đọc hoàn toàn không đưa ra bất kỳ thông tin nào về điều kiện quốc tịch của người dự thi (không có thông tin phải là người Ý - "need to be Italian"). Vì không thể xác minh nhận định này từ nội dung bài đọc, đáp án là NOT GIVEN.'
        },
        {
          id: 'p1_q7',
          number: 7,
          sectionId: 'sec1',
          question: 'The tickets for the Valentine’s Grand Masquerade Ball are worth a lot of money.',
          placeholder: 'Chọn TRUE / FALSE / NOT GIVEN...',
          options: [
            { letter: 'A', text: 'TRUE' },
            { letter: 'B', text: 'FALSE' },
            { letter: 'C', text: 'NOT GIVEN' }
          ],
          primaryAnswer: 'TRUE',
          acceptedAnswers: [
            'TRUE',
            'True',
            'A',
            'a',
            'A. TRUE',
            'A. True',
            'T'
          ],
          evidence: 'You do have to pay for these, however, and they can be quite costly. One of the most expensive parties is the Valentine’s Grand Masquerade Ball, held on February 14th at the Palazzo Flangini.',
          explanation: 'Đoạn 5 khẳng định: "You do have to pay for these, however, and they can be quite costly. One of the most expensive parties is the Valentine’s Grand Masquerade Ball..." (Bạn phải trả tiền cho những bữa tiệc này và chúng có thể khá đắt đỏ. Một trong những bữa tiệc đắt đỏ nhất là Vũ hội hóa trang lớn ngày lễ Tình nhân...). Các từ "quite costly" và "most expensive" đồng nghĩa với "worth a lot of money" (đáng giá rất nhiều tiền / đắt đỏ). Nhận định hoàn toàn khớp với bài đọc, do đó đáp án là TRUE.'
        }
      ]
    }
  ]
};

// Flatten all questions across passages to ensure direct access and consistent grading
INTERMEDIATE_READING_8_PRACTICE_DETAIL.questions = INTERMEDIATE_READING_8_PRACTICE_DETAIL.passages.flatMap(p => p.questions || []);
