// Pre-IELTS Listening 2: Sailing Course & City Bike Tour
// Detail data for homework assignment pre-ielts-listening-2
// Audio tracks: Track 20 (Sailing Course) & Track 21 (City Bike Tour)

export const PRE_IELTS_LISTENING_2_DETAIL = {
  id: 'pre-ielts-listening-2',
  title: 'HOMEWORK - Listening 2: Sailing Course & City Bike Tour',
  level: 'Pre IELTS',
  levelId: 'pre-ielts',
  session: 'Buổi 2 - Giáo trình Collins Get Ready for IELTS Listening',
  skill: 'Listening',
  vocabId: 'pre-ielts-listening-2',
  description: 'Trọn bộ bài tập về nhà Listening Buổi 2 gồm 12 câu hỏi: Bài 01 (Track 20 - Nghe đoạn hội thoại về khóa học chèo thuyền) và Bài 02 (Track 21 - Nghe thông tin về chuyến tham quan thành phố bằng xe đạp trong tuần lễ định hướng).',
  totalQuestions: 12,
  duration: '30 - 40 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: '01 Sailing Course with Alicia (Track 20)',
      shortTitle: 'Part 1: Sailing Course (Track 20)',
      audioSrc: '/audio/homework/pre_ielts/listening_2/track_20.mp3',
      trackLabel: 'Audio Track 20',
      wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
      maxWords: 2,
      instruction: 'Listen to Alicia telling a friend about a sailing course and answer the questions. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
      transcript: `Track 20 Audio Transcript:
Friend: Hi there, Alicia. How was your weekend? You were on a sailing course down at the harbour, weren't you?
Alicia: That's right. I really enjoyed breathing in all that fresh sea air. It was only two days, but the time flew by.
Alicia: The instructor began by teaching us safety rules, which was necessary, but not very exciting. But then on the first morning we learnt how to open the sails, and I even learnt how to turn the boat. The water wasn't as calm as it looked, I can tell you. I lost my balance a few times.
Friend: Sounds like you had a lot of fun. I'd love to learn to sail.
Alicia: Well, there are plenty of courses, and I think they run them once a month. So just let me check the website here. Okay, so this was my course here, see? The 4th and 5th of August. Now, you could sign up for the next one, ah, at the beginning of September. And it looks like there are still some spaces available.
Friend: So the next one starts on the 1st of September? I think I could do that.
Alicia: Well, let me give you the name of the course leader, so that you can give him a call. He's a really experienced sailor. Okay, it's Jon Galloway.
Friend: Is that the usual spelling of John?
Alicia: No, there's no H. He's just J-O-N.
Friend: Okay, got you. And did you say his surname's Galloway? Can you spell that for me?
Alicia: Yes, Galloway. That's G-A-L-L-O-W-A-Y. And I've got his number, too. Why don't you give him a ring?`,
      questions: [
        {
          id: 'pil2_p1_q1',
          number: 1,
          type: 'short_answer',
          question: '1. How long did the sailing course last?',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['two days', '2 days'],
          primaryAnswer: 'two days',
          evidence: 'It was only two days, but the time flew by.',
          explanation: 'Alicia cho biết khóa học chỉ diễn ra trong hai ngày: "It was only two days, but the time flew by".'
        },
        {
          id: 'pil2_p1_q2',
          number: 2,
          type: 'short_answer',
          question: '2. What was the first thing that Alicia learnt?',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['safety rules', 'the safety rules', 'safety rule'],
          primaryAnswer: 'safety rules',
          evidence: 'The instructor began by teaching us safety rules, which was necessary, but not very exciting.',
          explanation: 'Điều đầu tiên người hướng dẫn dạy Alicia là các quy tắc an toàn: "The instructor began by teaching us safety rules".'
        },
        {
          id: 'pil2_p1_q3',
          number: 3,
          type: 'short_answer',
          question: '3. What is the date of the next course?',
          placeholder: 'Điền câu trả lời (tối đa 2 từ và/hoặc 1 số)...',
          acceptedAnswers: [
            '1st september',
            '1st of september',
            '1 september',
            'september 1st',
            'september 1',
            'the 1st of september',
            '1/9',
            '01/09'
          ],
          primaryAnswer: '1st of September',
          evidence: 'So the next one starts on the 1st of September? I think I could do that.',
          explanation: 'Khóa học kế tiếp bắt đầu vào ngày 1 tháng 9: "starts on the 1st of September".'
        },
        {
          id: 'pil2_p1_q4',
          number: 4,
          type: 'short_answer',
          question: '4. Who will lead the next course?',
          placeholder: 'Điền câu trả lời (tên người)...',
          acceptedAnswers: [
            'Jon Galloway',
            'jon galloway',
            'Jon'
          ],
          primaryAnswer: 'Jon Galloway',
          evidence: "Okay, it's Jon Galloway. ... No, there's no H. He's just J-O-N ... G-A-L-L-O-W-A-Y.",
          explanation: 'Người phụ trách khóa học là Jon Galloway (đặc biệt lưu ý tên Jon không có ký tự "h" như giải thích trong đoạn nghe).'
        }
      ]
    },
    {
      id: 'p2',
      number: 2,
      title: '02 City Bike Tour in Orientation Week (Track 21)',
      shortTitle: 'Part 2: City Bike Tour (Track 21)',
      audioSrc: '/audio/homework/pre_ielts/listening_2/track_21.mp3',
      trackLabel: 'Audio Track 21',
      wordLimit: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
      maxWords: 2,
      instruction: 'Listen and answer questions 1–8. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
      transcript: `Track 21 Audio Transcript:
John: So how's your very first week at university going, Rita? It's orientation week for all you new students, isn't it?
Rita: Yes, that's right. Orientation week. Yes, it's great fun. There are so many different events going on to help us make friends and find our way around the university. And to get around the city, come to that. But you'll remember all that, John. You were a new student once.
John: That's true. I remember I went on a walking tour of the city on my first day. And I think some students did a bus tour.
Rita: Well, I did a bike tour. I was sent an email about it and I decided to sign up. There were only eight places and there were seven other names on the list already, so I got the very last place.
John: I didn't know you had a bike?
Rita: I don't have a bike, but that didn't matter. We all hired them from a little cycle hire shop on Barkway Street. You probably know the place.
John: Barkway Street? Do you mean the Barclay Street on campus?
Rita: No, it's Barkway Street. B-A-R-K-W-A-Y. Number 22 Barkway Street, to be exact. It was great. We could choose a traditional bike or an electric one.
John: So I take it you went electric?
Rita: Yes, of course I did. Well, think about it. Why ride a traditional bike when you can get around the city much faster on an electric one? And because there was a group of us, it wasn't too expensive. In fact, the cycle hire was only $120 for the whole group. So the cost was only $15 per person, and that was for three whole hours.
John: Did you say $50?
Rita: No, $15. So I thought it was really quite cheap. And I didn't have to bring along a helmet to wear either. That was included. And we also got a lock, so it was easy to park our bike safely when we wanted to stop and take a break.
John: Sounds good. Have you got the website address of the place you got your bike from? I quite like the idea of doing a bike tour.
Rita: Yes, it's a really easy one to remember. It's tradeelectric.com.
John: Can you say that again?
Rita: Tradeelectric. T-R-A-D-E-E-L-E-C-T-R-I-C. All one word. .com.
John: Thanks, Rita.
Rita: No problem. Hey, maybe we can do a bike tour together. I'd love to cycle as far as the harbour next time.
John: Great, that's a date then.`,
      questions: [
        {
          id: 'pil2_p2_q5',
          number: 5,
          subNumber: 1,
          type: 'short_answer',
          question: '1. What kind of tour did the woman do?',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: [
            'bike tour',
            'a bike tour',
            'bicycle tour',
            'a bicycle tour'
          ],
          primaryAnswer: 'bike tour',
          evidence: 'Well, I did a bike tour. I was sent an email about it and I decided to sign up.',
          explanation: 'Rita cho biết cô đã tham gia chuyến tham quan bằng xe đạp: "I did a bike tour".'
        },
        {
          id: 'pil2_p2_q6',
          number: 6,
          subNumber: 2,
          type: 'short_answer',
          question: '2. How did she find out about the tour?',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: [
            'email',
            'an email',
            'by email',
            'via email'
          ],
          primaryAnswer: '(an) email',
          evidence: 'I was sent an email about it and I decided to sign up.',
          explanation: 'Rita biết thông tin về chuyến đi qua một email được gửi tới: "I was sent an email about it".'
        },
        {
          id: 'pil2_p2_q7',
          number: 7,
          subNumber: 3,
          type: 'short_answer',
          question: '3. How many people were on the tour?',
          placeholder: 'Điền số lượng người...',
          acceptedAnswers: [
            '8',
            'eight',
            '8 people',
            'eight people'
          ],
          primaryAnswer: '8',
          evidence: 'There were only eight places and there were seven other names on the list already, so I got the very last place.',
          explanation: 'Chuyến đi chỉ có 8 chỗ và đã có 7 người đăng ký trước, Rita là người cuối cùng nên đoàn có 8 người: "There were only eight places...".'
        },
        {
          id: 'pil2_p2_q8',
          number: 8,
          subNumber: 4,
          type: 'short_answer',
          question: '4. What is the address of the hire shop?',
          placeholder: 'Điền địa chỉ (số nhà và tên đường)...',
          acceptedAnswers: [
            '22 Barkway Street',
            '22 Barkway St',
            '22 Barkway St.',
            'Barkway Street',
            '22 Barkway'
          ],
          primaryAnswer: '22 Barkway Street',
          evidence: "No, it's Barkway Street. B-A-R-K-W-A-Y. Number 22 Barkway Street, to be exact.",
          explanation: 'Địa chỉ chính xác của tiệm thuê xe là số 22 phố Barkway: "Number 22 Barkway Street, to be exact".'
        },
        {
          id: 'pil2_p2_q9',
          number: 9,
          subNumber: 5,
          type: 'short_answer',
          question: '5. How much did each student in the group pay?',
          placeholder: 'Điền số tiền...',
          acceptedAnswers: [
            '15',
            'fifteen',
            '15 dollars',
            '$15',
            '£15',
            '15 pounds'
          ],
          primaryAnswer: '15',
          evidence: 'So the cost was only $15 per person, and that was for three whole hours. ... Did you say $50? No, $15.',
          explanation: 'Chi phí cho mỗi người trong nhóm là 15: "the cost was only $15 per person".'
        },
        {
          id: 'pil2_p2_q10',
          number: 10,
          subNumber: 6,
          type: 'short_answer',
          question: '6. Which TWO items were included in the cost of the hire? (Item 1)',
          placeholder: 'Điền đồ vật thứ nhất...',
          acceptedAnswers: [
            'helmet',
            'a helmet',
            'lock',
            'a lock'
          ],
          primaryAnswer: 'helmet',
          evidence: "And I didn't have to bring along a helmet to wear either. That was included. And we also got a lock",
          explanation: 'Hai đồ vật được bao gồm miễn phí là mũ bảo hiểm (helmet) và ổ khóa (lock).'
        },
        {
          id: 'pil2_p2_q11',
          number: 11,
          subNumber: 7,
          type: 'short_answer',
          question: '7. Which TWO items were included in the cost of the hire? (Item 2)',
          placeholder: 'Điền đồ vật thứ hai...',
          acceptedAnswers: [
            'lock',
            'a lock',
            'helmet',
            'a helmet'
          ],
          primaryAnswer: 'lock',
          evidence: 'And we also got a lock, so it was easy to park our bike safely when we wanted to stop and take a break.',
          explanation: 'Hai đồ vật được bao gồm miễn phí là mũ bảo hiểm (helmet) và ổ khóa (lock).'
        },
        {
          id: 'pil2_p2_q12',
          number: 12,
          subNumber: 8,
          type: 'short_answer',
          question: '8. What is the website address of the hire shop?',
          placeholder: 'Điền địa chỉ website...',
          acceptedAnswers: [
            'tradeelectric.com',
            'www.tradeelectric.com',
            'http://tradeelectric.com',
            'https://tradeelectric.com'
          ],
          primaryAnswer: 'tradeelectric.com',
          evidence: "It's tradeelectric.com. ... T-R-A-D-E-E-L-E-C-T-R-I-C. All one word. .com.",
          explanation: 'Địa chỉ trang web là tradeelectric.com: "T-R-A-D-E-E-L-E-C-T-R-I-C. All one word. .com".'
        }
      ]
    }
  ]
};
