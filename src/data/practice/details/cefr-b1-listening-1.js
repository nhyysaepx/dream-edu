// CEFR B1 Listening 1: Survival English (7 Exercises / Audio Tracks 53 - 59)
// Practice detail data for cefr-b1-listening-1

export const CEFR_B1_LISTENING_1_PRACTICE_DETAIL = {
  id: 'cefr-b1-listening-1',
  title: 'CEFR B1 - Practice: Listening 1 (Survival English)',
  level: 'Level B1',
  levelId: 'b1',
  category: 'cefr',
  session: 'Practice 01 - Survival English',
  skill: 'Listening',
  vocabId: 'cefr-b1-listening-1',
  vocabCount: 40,
  vocabLabel: 'Học 40 từ vựng Listening 1 (Survival English)',
  description: 'Trọn bộ bài luyện tập kỹ năng Listening chuẩn Khung tham chiếu Châu Âu CEFR B1 (Intermediate) gồm 58 câu hỏi qua 7 bài nghe sinh hoạt thực tế: Bệnh cảm & Lời khuyên sức khỏe (Track 53), Mua máy ảnh tại tiệm (Track 54), Gọi món ăn tại nhà hàng (Track 55), Đặt phòng tại quầy lễ tân khách sạn (Track 56), Mùa lễ hội Giáng sinh tại Vương quốc Anh (Track 57), Chuyến tham quan di tích Stonehenge (Track 58) và Hôn nhân gia đình tại Mỹ & Hàn Quốc (Track 59).',
  totalQuestions: 58,
  duration: '45 - 60 phút',
  tag: 'Khung Châu Âu B1 (Intermediate)',
  passages: [
    // ==========================================
    // EXERCISE 1 (AUDIO 53) - ELLEN'S COLD
    // ==========================================
    {
      id: 'p1',
      number: 1,
      title: 'Exercise 1: Illness & Medical Advice (Ellen\'s Cold)',
      shortTitle: 'Ex 1: Ellen\'s Cold (Track 53)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/53.mp3',
      trackLabel: 'Track 53',
      instruction: 'Listen to the conversation and fill in the missing information in the notes below.',
      tip: 'TIP: Chú ý lắng nghe các từ vựng chỉ triệu chứng bệnh như "cold", "stuffed up", "sore throat" và các lời khuyên dinh dưỡng của Tom.',
      transcript: `Tom: Hi, Ellen. What's the matter with you?
Ellen: I think I've got a terrible cold. My nose is stuffed up and I've got a sore throat.
Tom: Oh, that's too bad. You should be at home in bed. It's really important to get a good rest.
Ellen: Yeah, you're right.
Tom: And have you taken anything for it?
Ellen: No, I haven't.
Tom: Well, you should take some vitamin C and it's also a good idea to drink lots of liquids.
Ellen: That's a good suggestion. I've a bottle of vitamin C at home.
Tom: Have you seen a doctor?
Ellen: Not yet.
Tom: Well, you'd better see a doctor first, and then go back home to rest.
Ellen: Yeah, I'll do it right now.
Tom: Ellen, it's also helpful to cook chicken soup with some garlic in it, and drink a cup every half an hour. It really works.
Ellen: Oh, chicken stock for a cold? OK, I'll try it. Thanks.
Tom: I hope you recover soon.`,
      questions: [
        {
          id: 'p1_q1',
          number: 1,
          question: 'Ellen has got a (1) _______.',
          placeholder: 'Điền từ còn thiếu...',
          primaryAnswer: 'cold',
          acceptedAnswers: ['cold', 'terrible cold', 'a cold', 'a terrible cold'],
          evidence: 'Ellen: "I think I\'ve got a terrible cold."',
          explanation: 'Ellen cho biết mình bị cảm lạnh ("terrible cold"). Từ cần điền sau mạo từ "a" là "cold" (hoặc "terrible cold").'
        },
        {
          id: 'p1_q2',
          number: 2,
          question: 'Her nose is (2) _______ and she has a sore throat.',
          placeholder: 'Điền tính từ/cụm từ...',
          primaryAnswer: 'stuffed up',
          acceptedAnswers: ['stuffed up', 'stuffed-up'],
          evidence: 'Ellen: "My nose is stuffed up and I\'ve got a sore throat."',
          explanation: 'Ellen miêu tả triệu chứng ngạt mũi: "My nose is stuffed up" (stuffed up = bị nghẹt, tắc mũi).'
        },
        {
          id: 'p1_q3',
          number: 3,
          question: 'Here is some advice. She should take some (3) _______.',
          placeholder: 'Điền chất/thuốc...',
          primaryAnswer: 'vitamin C',
          acceptedAnswers: ['vitamin C', 'vitamin c', 'vit c', 'Vitamin C'],
          evidence: 'Tom: "Well, you should take some vitamin C and it\'s also a good idea to drink lots of liquids."',
          explanation: 'Tom khuyên Ellen nên bổ sung vitamin C: "take some vitamin C".'
        },
        {
          id: 'p1_q4',
          number: 4,
          question: '...and it\'s a good idea for her to drink lots of (4) _______.',
          placeholder: 'Điền loại thức uống...',
          primaryAnswer: 'liquids',
          acceptedAnswers: ['liquids', 'liquid', 'lots of liquids', 'water'],
          evidence: 'Tom: "...and it\'s also a good idea to drink lots of liquids."',
          explanation: 'Tom khuyên nên uống nhiều chất lỏng/nước để bù nước: "drink lots of liquids".'
        },
        {
          id: 'p1_q5',
          number: 5,
          question: 'She\'d better see a doctor first, and then go (5) _______ for a rest.',
          placeholder: 'Điền nơi chốn...',
          primaryAnswer: 'back home',
          acceptedAnswers: ['back home', 'home', 'to bed'],
          evidence: 'Tom: "Well, you\'d better see a doctor first, and then go back home to rest."',
          explanation: 'Tom khuyên cô ấy đi gặp bác sĩ trước rồi trở về nhà nghỉ ngơi: "go back home to rest".'
        },
        {
          id: 'p1_q6',
          number: 6,
          question: 'It\'s helpful to cook (6) _______ with some garlic in it...',
          placeholder: 'Điền món ăn...',
          primaryAnswer: 'chicken soup',
          acceptedAnswers: ['chicken soup', 'some chicken soup', 'chicken stock'],
          evidence: 'Tom: "Ellen, it\'s also helpful to cook chicken soup with some garlic in it..."',
          explanation: 'Món ăn dân gian bồi bổ khi cảm cúm được Tom nhắc tới là súp gà: "cook chicken soup with some garlic in it".'
        },
        {
          id: 'p1_q7',
          number: 7,
          question: '...and drink a (7) _______ every half an hour. It really works.',
          placeholder: 'Điền đơn vị lượng...',
          primaryAnswer: 'cup',
          acceptedAnswers: ['cup', 'cup of it', 'cup of chicken soup', 'glass'],
          evidence: 'Tom: "...and drink a cup every half an hour. It really works."',
          explanation: 'Tom dặn cứ mỗi nửa tiếng thì uống một tách súp gà: "drink a cup every half an hour".'
        }
      ]
    },

    // ==========================================
    // EXERCISE 2 (AUDIO 54) - BUYING A CAMERA
    // ==========================================
    {
      id: 'p2',
      number: 2,
      title: 'Exercise 2: In a Camera Shop (Buying a Camera)',
      shortTitle: 'Ex 2: Camera Shop (Track 54)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/54.mp3',
      trackLabel: 'Track 54',
      instruction: 'Listen to the conversation in the camera shop and fill in the missing information in the notes below.',
      tip: 'TIP: Hãy chú ý nghe giá tiền (45 pounds), tính năng máy ảnh (automatic, lens) và màu sắc cuối cùng khách hàng chọn (yellow).',
      transcript: `Shop assistant: Good morning. Can I help you?
Customer: Yes, I want to buy a camera. What kind do you recommend?
Shop assistant: Well, it all depends. We have many kinds of cameras here. How much money do you want to spend?
Customer: I want something cheap and easy to handle.
Shop assistant: Are you an experienced photographer?
Customer: No, I've had no experience at all.
Shop assistant: Here's a camera that would suit you very well. It's got a very good lens and it's all automatic, so it's very easy to use. Just press one button, and it's done.
Customer: How much does it cost?
Shop assistant: It's only 45 pounds.
Customer: Can I try?
Shop assistant: Of course. Here you are.
Customer: Well, I think the price is reasonable and I like that it is automatic, but I don't like the colour. Do you have any other colour?
Shop assistant: Yes. How about this yellow one?
Customer: It looks better. Is it the same price?
Shop assistant: Yes.
Customer: All right. I will take this yellow one. Here is 50 pounds.
Shop assistant: Here is your change.`,
      questions: [
        {
          id: 'p2_q8',
          number: 8,
          question: 'The customer wants to buy a kind of camera which would be (8) _______...',
          placeholder: 'Điền tính từ...',
          primaryAnswer: 'cheap',
          acceptedAnswers: ['cheap'],
          evidence: 'Customer: "I want something cheap and easy to handle."',
          explanation: 'Khách hàng nêu rõ tiêu chí đầu tiên là giá rẻ: "cheap".'
        },
        {
          id: 'p2_q9',
          number: 9,
          question: '...and (9) _______ to handle.',
          placeholder: 'Điền tính từ...',
          primaryAnswer: 'easy',
          acceptedAnswers: ['easy'],
          evidence: 'Customer: "I want something cheap and easy to handle."',
          explanation: 'Khách hàng muốn máy dễ thao tác cầm nắm: "easy to handle".'
        },
        {
          id: 'p2_q10',
          number: 10,
          question: 'The shop assistant recommended one which is (10) _______...',
          placeholder: 'Điền tính từ...',
          primaryAnswer: 'automatic',
          acceptedAnswers: ['automatic', 'all automatic'],
          evidence: 'Shop assistant: "...and it\'s all automatic, so it\'s very easy to use."',
          explanation: 'Nhân viên giới thiệu chiếc máy ảnh tự động hoàn toàn: "all automatic".'
        },
        {
          id: 'p2_q11',
          number: 11,
          question: '...and has a good (11) _______.',
          placeholder: 'Điền danh từ...',
          primaryAnswer: 'lens',
          acceptedAnswers: ['lens'],
          evidence: 'Shop assistant: "It\'s got a very good lens..."',
          explanation: 'Máy có một ống kính rất tốt: "a very good lens".'
        },
        {
          id: 'p2_q12',
          number: 12,
          question: 'The price is only (12) _______.',
          placeholder: 'Điền giá tiền...',
          primaryAnswer: '45 pounds',
          acceptedAnswers: ['45 pounds', '£45', '45', 'forty-five pounds', 'forty five pounds', '45 gbp', '45pounds'],
          evidence: 'Shop assistant: "It\'s only 45 pounds."',
          explanation: 'Giá của chiếc máy ảnh là 45 bảng Anh: "45 pounds" (£45).'
        },
        {
          id: 'p2_q13',
          number: 13,
          question: 'The customer liked the one the shop assistant recommended but she disliked the (13) _______.',
          placeholder: 'Điền danh từ...',
          primaryAnswer: 'colour',
          acceptedAnswers: ['colour', 'color', 'the colour', 'the color'],
          evidence: 'Customer: "...but I don\'t like the colour. Do you have any other colour?"',
          explanation: 'Khách hàng hài lòng về giá và tính năng nhưng không thích màu sắc chiếc máy ban đầu ("disliked the colour").'
        },
        {
          id: 'p2_q14',
          number: 14,
          question: 'Finally, the customer bought a (14) _______ camera.',
          placeholder: 'Điền màu sắc...',
          primaryAnswer: 'yellow',
          acceptedAnswers: ['yellow', 'yellow camera', 'the yellow one'],
          evidence: 'Customer: "All right. I will take this yellow one. Here is 50 pounds."',
          explanation: 'Cuối cùng người khách quyết định lấy chiếc máy màu vàng: "yellow".'
        }
      ]
    },

    // ==========================================
    // EXERCISE 3 (AUDIO 55) - IN THE RESTAURANT
    // ==========================================
    {
      id: 'p3',
      number: 3,
      title: 'Exercise 3: In the Restaurant (Dinner Menu)',
      shortTitle: 'Ex 3: Restaurant Menu (Track 55)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/55.mp3',
      trackLabel: 'Track 55',
      instruction: 'Listen to the conversation and identify the items that the wife and husband ordered on the dinner menu.',
      tip: 'TIP: Bảng thực đơn gồm 5 danh mục: Starters (Khai vị), Main course (Món chính), Vegetables (Rau củ), Sweet / dessert (Tráng miệng), Drinks (Đồ uống). Hãy lắng nghe sự lựa chọn riêng biệt của từng người.',
      transcript: `Waiter: Good evening. Would you like to order now?
Husband: Just a moment. Can we see what you have got on your menu first? There is quite a good choice on the menu, isn't there, dear?
Wife: Yes.
Husband: Do you want to order first?
Wife: All right. I think I'll start with some apple juice, but I can't decide whether to have salmon or roast beef... oh, I remember I had fish last time we were here, so I'll try the roast beef... and, yes, and some carrots.
Husband: What about the sweet?
Wife: Well, we can order that later, but I think I'll have some fruit salad.
Husband: Shall I order some wine to go with the meal?
Wife: Yes, that would be nice. So what are you going to have?
Husband: I'll start with chicken soup. And I love fish so I think I'll have salmon and some peas.
Wife: What are you going to choose for dessert?
Husband: I think I'll have chocolate cake.`,
      questions: [
        {
          id: 'p3_q15',
          number: 15,
          question: 'What item did the WIFE order for Starters?',
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'Apple juice', 'apple juice'],
          options: [
            { letter: 'A', text: 'Apple juice' },
            { letter: 'B', text: 'Lemon juice' },
            { letter: 'C', text: 'Melon' },
            { letter: 'D', text: 'Chicken soup' },
            { letter: 'E', text: 'Onion soup' }
          ],
          evidence: 'Wife: "I think I\'ll start with some apple juice..."',
          explanation: 'Người vợ chọn nước ép táo (Apple juice) làm món khai vị.'
        },
        {
          id: 'p3_q16',
          number: 16,
          question: 'What item did the WIFE order for Main course?',
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'Roast beef', 'roast beef'],
          options: [
            { letter: 'A', text: 'Roast beef' },
            { letter: 'B', text: 'Grilled steak' },
            { letter: 'C', text: 'Salmon' },
            { letter: 'D', text: 'Chicken' }
          ],
          evidence: 'Wife: "...so I\'ll try the roast beef..."',
          explanation: 'Người vợ nhớ lại lần trước đã ăn cá nên quyết định chọn thịt bò quay/nướng (Roast beef).'
        },
        {
          id: 'p3_q17',
          number: 17,
          question: 'What vegetable did the WIFE choose to accompany her meal?',
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'Carrots', 'carrots'],
          options: [
            { letter: 'A', text: 'Carrots' },
            { letter: 'B', text: 'Peas' },
            { letter: 'C', text: 'Beans' },
            { letter: 'D', text: 'Chips' },
            { letter: 'E', text: 'Boiled potatoes' }
          ],
          evidence: 'Wife: "...and, yes, and some carrots."',
          explanation: 'Người vợ gọi thêm món cà rốt: "and some carrots".'
        },
        {
          id: 'p3_q18',
          number: 18,
          question: 'What did the WIFE choose for Sweet / dessert?',
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'Fruit salad', 'fruit salad'],
          options: [
            { letter: 'A', text: 'Chocolate cake' },
            { letter: 'B', text: 'Apple pie' },
            { letter: 'C', text: 'Fruit salad' },
            { letter: 'D', text: 'Ice cream' }
          ],
          evidence: 'Wife: "...but I think I\'ll have some fruit salad."',
          explanation: 'Món tráng miệng của người vợ là salad hoa quả (Fruit salad).'
        },
        {
          id: 'p3_q19',
          number: 19,
          question: 'What alcoholic beverage did the WIFE and HUSBAND agree to order to accompany the dinner?',
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'Wine', 'wine'],
          options: [
            { letter: 'A', text: 'Fruit juice' },
            { letter: 'B', text: 'Beer' },
            { letter: 'C', text: 'Wine' },
            { letter: 'D', text: 'Coffee' }
          ],
          evidence: 'Husband: "Shall I order some wine to go with the meal?" - Wife: "Yes, that would be nice."',
          explanation: 'Cả hai đồng ý gọi rượu vang (Wine) để uống kèm bữa ăn.'
        },
        {
          id: 'p3_q20',
          number: 20,
          question: 'What item did the HUSBAND order for Starters?',
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'Chicken soup', 'chicken soup'],
          options: [
            { letter: 'A', text: 'Apple juice' },
            { letter: 'B', text: 'Lemon juice' },
            { letter: 'C', text: 'Melon' },
            { letter: 'D', text: 'Chicken soup' },
            { letter: 'E', text: 'Onion soup' }
          ],
          evidence: 'Husband: "I\'ll start with chicken soup."',
          explanation: 'Người chồng bắt đầu với món súp gà (Chicken soup).'
        },
        {
          id: 'p3_q21',
          number: 21,
          question: 'What item did the HUSBAND order for Main course?',
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'Salmon', 'salmon'],
          options: [
            { letter: 'A', text: 'Roast beef' },
            { letter: 'B', text: 'Grilled steak' },
            { letter: 'C', text: 'Salmon' },
            { letter: 'D', text: 'Chicken' }
          ],
          evidence: 'Husband: "And I love fish so I think I\'ll have salmon..."',
          explanation: 'Người chồng rất thích ăn cá nên chọn món cá hồi (Salmon).'
        },
        {
          id: 'p3_q22',
          number: 22,
          question: 'What vegetable did the HUSBAND order?',
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'Peas', 'peas'],
          options: [
            { letter: 'A', text: 'Carrots' },
            { letter: 'B', text: 'Peas' },
            { letter: 'C', text: 'Beans' },
            { letter: 'D', text: 'Chips' },
            { letter: 'E', text: 'Boiled potatoes' }
          ],
          evidence: 'Husband: "...and some peas."',
          explanation: 'Người chồng chọn ăn kèm đậu Hà Lan: "and some peas".'
        },
        {
          id: 'p3_q23',
          number: 23,
          question: 'What did the HUSBAND choose for Sweet / dessert?',
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'Chocolate cake', 'chocolate cake'],
          options: [
            { letter: 'A', text: 'Chocolate cake' },
            { letter: 'B', text: 'Apple pie' },
            { letter: 'C', text: 'Fruit salad' },
            { letter: 'D', text: 'Ice cream' }
          ],
          evidence: 'Husband: "I think I\'ll have chocolate cake."',
          explanation: 'Người chồng chọn bánh sô-cô-la (Chocolate cake) làm món tráng miệng.'
        },
        {
          id: 'p3_q24',
          number: 24,
          question: 'Did the HUSBAND order the Wine together with his wife?',
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'Yes', 'yes', 'Wine', 'wine'],
          options: [
            { letter: 'A', text: 'Yes, he suggested ordering Wine to go with the meal' },
            { letter: 'B', text: 'No, he ordered Beer instead' },
            { letter: 'C', text: 'No, he only drank Coffee' },
            { letter: 'D', text: 'No, he did not order any drinks' }
          ],
          evidence: 'Husband: "Shall I order some wine to go with the meal?"',
          explanation: 'Người chồng chủ động đề nghị gọi rượu vang (Wine) để dùng chung cho bữa ăn.'
        }
      ]
    },

    // ==========================================
    // EXERCISE 4 (AUDIO 56) - HOTEL RECEPTION
    // ==========================================
    {
      id: 'p4',
      number: 4,
      title: 'Exercise 4: The Reception Desk in a Hotel',
      shortTitle: 'Ex 4: Hotel Reception (Track 56)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/56.mp3',
      trackLabel: 'Track 56',
      instruction: 'Listen to the conversation at the hotel reception desk and fill in the missing information.',
      tip: 'TIP: Hãy ghi lại chính xác tên khách hàng (Mr. Collins), thời gian đặt phòng, số phòng (405), tầng (fourth), ngày đến/đi và yêu cầu báo thức buổi sáng.',
      transcript: `Receptionist: Good evening, sir.
Mr. Collins: Good evening. My name is Arthur Collins. I believe you have a room reserved for me.
Receptionist: Just a moment, Mr. Collins. Let me see... Collins... yes, Mr. Collins. You booked a single room three days ago. Is that right?
Mr. Collins: Yes, that's right.
Receptionist: Mr. Collins, your room number is 405 on the fourth floor. Would you fill in this form, please?
Mr. Collins: Certainly.
Receptionist: How long do you intend to stay in the hotel, Mr. Collins?
Mr. Collins: Let me see... today is Monday and... probably I'm going to leave on Friday morning.
Receptionist: On Friday morning, I see.
Mr. Collins: Oh, excuse me. Where shall I put my passport number?
Receptionist: Just at the bottom. That's right. Thank you.
Mr. Collins: Oh, would you please wake me up at 7:10 in the morning, please?
Receptionist: Ten past seven, certainly. Porter, please take Mr. Collins's suitcase to his room. Mr. Collins, please follow him.
Mr. Collins: Thank you.
Receptionist: You are welcome.`,
      questions: [
        {
          id: 'p4_q25',
          number: 25,
          question: 'Customer\'s name: _______',
          placeholder: 'Điền tên khách hàng...',
          primaryAnswer: 'Mr. Collins',
          acceptedAnswers: ['Mr. Collins', 'Arthur Collins', 'Mr Collins', 'Collins', 'Arthur Collins / Mr. Collins'],
          evidence: 'Mr. Collins: "My name is Arthur Collins."',
          explanation: 'Khách hàng xưng tên là Arthur Collins (Mr. Collins).'
        },
        {
          id: 'p4_q26',
          number: 26,
          question: 'When to book: _______',
          placeholder: 'Điền thời điểm đặt phòng...',
          primaryAnswer: 'three days ago',
          acceptedAnswers: ['three days ago', '3 days ago', 'three days'],
          evidence: 'Receptionist: "You booked a single room three days ago. Is that right?"',
          explanation: 'Lễ tân xác nhận khách đã đặt phòng cách đây ba ngày ("three days ago").'
        },
        {
          id: 'p4_q27',
          number: 27,
          question: 'Type of room: _______',
          placeholder: 'Điền loại phòng...',
          primaryAnswer: 'single',
          acceptedAnswers: ['single', 'single room', 'a single room'],
          evidence: 'Receptionist: "You booked a single room three days ago."',
          explanation: 'Loại phòng khách đặt là phòng đơn: "single" / "single room".'
        },
        {
          id: 'p4_q28',
          number: 28,
          question: 'Room number: _______',
          placeholder: 'Điền số phòng...',
          primaryAnswer: '405',
          acceptedAnswers: ['405', 'four hundred and five', 'four zero five', 'room 405'],
          evidence: 'Receptionist: "Mr. Collins, your room number is 405..."',
          explanation: 'Số phòng của khách là 405.'
        },
        {
          id: 'p4_q29',
          number: 29,
          question: 'Floor: _______',
          placeholder: 'Điền số tầng...',
          primaryAnswer: 'fourth',
          acceptedAnswers: ['fourth', '4th', 'fourth floor', '4th floor', '4'],
          evidence: 'Receptionist: "...on the fourth floor."',
          explanation: 'Phòng 405 nằm ở tầng 4 ("on the fourth floor").'
        },
        {
          id: 'p4_q30',
          number: 30,
          question: 'Day to come: _______',
          placeholder: 'Điền thứ trong tuần...',
          primaryAnswer: 'Monday',
          acceptedAnswers: ['Monday', 'monday', 'Mon'],
          evidence: 'Mr. Collins: "Let me see... today is Monday..."',
          explanation: 'Khách đến nhận phòng vào ngày thứ Hai: "Monday".'
        },
        {
          id: 'p4_q31',
          number: 31,
          question: 'Day to leave: _______',
          placeholder: 'Điền ngày trả phòng...',
          primaryAnswer: 'Friday',
          acceptedAnswers: ['Friday', 'friday', 'Friday morning', 'Fri'],
          evidence: 'Mr. Collins: "...probably I\'m going to leave on Friday morning."',
          explanation: 'Khách dự định rời khách sạn vào sáng thứ Sáu: "Friday" / "Friday morning".'
        },
        {
          id: 'p4_q32',
          number: 32,
          question: 'Requirement: _______',
          placeholder: 'Điền yêu cầu báo thức...',
          primaryAnswer: 'to wake him up at 7:10 in the morning',
          acceptedAnswers: [
            'to wake him up at 7:10 in the morning',
            'wake him up at 7:10 in the morning',
            'wake him up at 7:10',
            'wake up at 7:10',
            'wake him up at 7.10',
            'wake him up at ten past seven',
            'wake-up call at 7:10',
            'wake-up call at 7:10 am',
            'to wake him up at 7:10'
          ],
          evidence: 'Mr. Collins: "Oh, would you please wake me up at 7:10 in the morning, please?"',
          explanation: 'Yêu cầu của khách là được báo thức lúc 7h10 sáng: "wake him up at 7:10 in the morning" (ten past seven).'
        }
      ]
    },

    // ==========================================
    // EXERCISE 5 (AUDIO 57) - CHRISTMAS IN BRITAIN
    // ==========================================
    {
      id: 'p5',
      number: 5,
      title: 'Exercise 5: Christmas Activities & Traditions in Britain',
      shortTitle: 'Ex 5: Christmas in Britain (Track 57)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/57.mp3',
      trackLabel: 'Track 57',
      wordLimit: 'NO MORE THAN THREE WORDS',
      instruction: 'Listen to the talk and complete the notes. Write NO MORE THAN THREE WORDS for each answer.',
      tip: 'TIP: Giới hạn từ nghiêm ngặt: KHÔNG QUÁ 3 TỪ cho mỗi chỗ trống. Chú ý các cụm từ chỉ thời gian và phong tục truyền thống.',
      transcript: `The Christmas season begins very early in Britain. By the end of October, you may see Christmas decorations in the streets and Christmas cards and gifts in the shops. Traditionally, people start to decorate their houses a week or two before 25th December, which is Christmas Day.
There are a lot of traditions connected with Christmas. The most important one is the giving of presents. Family members and friends wrap up their gifts and put them at the bottom of the Christmas tree. The British open their Christmas presents on Christmas morning.
Children leave a long sock or stocking at the end of their bed on Christmas Eve, hoping that Father Christmas will bring small presents from the chimney. They are not usually disappointed. Sometimes on Christmas Day, the family will sit down for a big turkey dinner and Christmas pudding. Later in the afternoon, they may watch the Queen on television as she delivers her traditional Christmas message to the United Kingdom and the Commonwealth. If they have room for even more food, they may enjoy a piece of Christmas cake or eat a hot mince pie. 26th December is also a public holiday, Boxing Day, and this is the time to visit friends and relatives or watch football.`,
      questions: [
        {
          id: 'p5_q33',
          number: 33,
          question: '1. In Britain, people start to decorate their houses a (33) [Gap 1] _______ before 25th December.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'week or two',
          acceptedAnswers: ['week or two', 'a week or two', 'week or two weeks'],
          evidence: '"Traditionally, people start to decorate their houses a week or two before 25th December..."',
          explanation: 'Người Anh bắt đầu trang hoàng nhà cửa từ 1 hoặc 2 tuần trước ngày 25/12: "a week or two".'
        },
        {
          id: 'p5_q34',
          number: 34,
          question: '2. In Christmas time, the most important activity is the (34) [Gap 2] _______.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'giving of presents',
          acceptedAnswers: ['giving of presents', 'giving presents'],
          evidence: '"The most important one is the giving of presents."',
          explanation: 'Hoạt động quan trọng nhất dịp Giáng sinh là phong tục trao tặng quà: "giving of presents".'
        },
        {
          id: 'p5_q35',
          number: 35,
          question: '3. The British people put their gifts (35) [Gap 3] _______ of the Christmas tree.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'at the bottom',
          acceptedAnswers: ['at the bottom', 'the bottom', 'bottom'],
          evidence: '"...wrap up their gifts and put them at the bottom of the Christmas tree."',
          explanation: 'Quà được đặt bên dưới gốc cây thông: "at the bottom of the Christmas tree".'
        },
        {
          id: 'p5_q36',
          number: 36,
          question: '4. The British open their Christmas presents on (36) [Gap 4] _______.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'Christmas morning',
          acceptedAnswers: ['Christmas morning', 'christmas morning', 'the christmas morning'],
          evidence: '"The British open their Christmas presents on Christmas morning."',
          explanation: 'Thời điểm mở quà là sáng ngày Giáng sinh: "Christmas morning".'
        },
        {
          id: 'p5_q37',
          number: 37,
          question: '5. Children leave a long sock or stocking at the (37) [Gap 5] _______ their bed on Christmas Eve...',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'end of',
          acceptedAnswers: ['end of', 'the end of'],
          evidence: '"Children leave a long sock or stocking at the end of their bed on Christmas Eve..."',
          explanation: 'Trẻ em đặt chiếc tất dài ở phía cuối giường ngủ: "at the end of their bed".'
        },
        {
          id: 'p5_q38',
          number: 38,
          question: '...hoping that Father Christmas will bring small presents from (38) [Gap 6] _______.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'the chimney',
          acceptedAnswers: ['the chimney', 'chimney'],
          evidence: '"...hoping that Father Christmas will bring small presents from the chimney."',
          explanation: 'Trẻ em hy vọng ông già Noel sẽ mang quà chui qua ống khói: "from the chimney".'
        },
        {
          id: 'p5_q39',
          number: 39,
          question: '6. The British family have a (39) [Gap 7] _______ and Christmas pudding for the dinner on Christmas Day.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'big turkey dinner',
          acceptedAnswers: ['big turkey dinner', 'turkey dinner'],
          evidence: '"...the family will sit down for a big turkey dinner and Christmas pudding."',
          explanation: 'Bữa tối Giáng sinh có món thịt gà tây lớn: "big turkey dinner".'
        },
        {
          id: 'p5_q40',
          number: 40,
          question: '7. The Queen (40) [Gap 8] _______ her traditional Christmas message...',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'delivers',
          acceptedAnswers: ['delivers', 'delivers her', 'broadcasts'],
          evidence: '"...they may watch the Queen on television as she delivers her traditional Christmas message..."',
          explanation: 'Động từ chỉ hành động Nữ hoàng phát biểu/truyền tải thông điệp là "delivers".'
        },
        {
          id: 'p5_q41',
          number: 41,
          question: '...to the United Kingdom and (41) [Gap 9] _______ later in the afternoon.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'the Commonwealth',
          acceptedAnswers: ['the Commonwealth', 'Commonwealth', 'the commonwealth'],
          evidence: '"...to the United Kingdom and the Commonwealth."',
          explanation: 'Thông điệp được gửi tới Vương quốc Anh và Khối Thịnh vượng chung: "the Commonwealth".'
        },
        {
          id: 'p5_q42',
          number: 42,
          question: '8. On Boxing Day, people usually visit friends and relatives or (42) [Gap 10] _______.',
          placeholder: 'Tối đa 3 từ...',
          primaryAnswer: 'watch football',
          acceptedAnswers: ['watch football', 'watch soccer', 'football'],
          evidence: '"...and this is the time to visit friends and relatives or watch football."',
          explanation: 'Vào ngày Boxing Day (26/12), người dân Anh thường đi thăm người thân hoặc xem đá bóng: "watch football".'
        }
      ]
    },

    // ==========================================
    // EXERCISE 6 (AUDIO 58) - TRIP TO STONEHENGE
    // ==========================================
    {
      id: 'p6',
      number: 6,
      title: 'Exercise 6: Trip to Stonehenge (Prehistoric Remains)',
      shortTitle: 'Ex 6: Stonehenge (Track 58)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/58.mp3',
      trackLabel: 'Track 58',
      instruction: 'Listen to the conversation between David and Sue and fill in the missing information in the notes below.',
      tip: 'TIP: Lắng nghe Sue và David thảo luận về di tích tiền sử Stonehenge, niên đại 4.000 năm và giả thuyết sử dụng như một cuốn lịch thiên văn.',
      transcript: `David: Hi, Sue. How was your weekend?
Sue: Oh, really good. I went to Stonehenge with my host family.
David: Stonehenge?
Sue: Yes, that's right. Have you ever been there?
David: Yes. I went there last month. I really enjoyed it.
Sue: Me too. Stonehenge is the best known and probably the most remarkable of prehistoric remains in the UK.
David: Yes. It has stood on Salisbury Plain for about 4,000 years. You know, there have been many different theories about its original use.
Sue: Yes, I know. My host father told me that one of the theories is that it was a place from where stars and planets could be observed.
David: Yes, but no one is really certain why it was built. One of the things people have discovered is the positions of some of the stones relate to the movements of the sun and moon, so that the stones could be used as a calendar.
Sue: That's interesting.
David: Did you go to Oxford too? It's not far from Stonehenge.
Sue: No, we didn't, because of the time. My host family had to be back before 3 in the afternoon.
David: What a pity. You should go sometime. It's very interesting too.
Sue: Yes. I hope I can sometime.`,
      questions: [
        {
          id: 'p6_q43',
          number: 43,
          question: 'Sue went to Stonehenge at the weekend with her (43) _______ family.',
          placeholder: 'Điền từ còn thiếu...',
          primaryAnswer: 'host',
          acceptedAnswers: ['host', 'host family'],
          evidence: 'Sue: "I went to Stonehenge with my host family."',
          explanation: 'Sue đi cùng gia đình bản xứ nơi cô ở trọ: "host family".'
        },
        {
          id: 'p6_q44',
          number: 44,
          question: 'Stonehenge is the best known and the most remarkable of prehistoric (44) _______ in the UK.',
          placeholder: 'Điền danh từ...',
          primaryAnswer: 'remains',
          acceptedAnswers: ['remains', 'monument', 'monuments'],
          evidence: 'Sue: "Stonehenge is the best known and probably the most remarkable of prehistoric remains in the UK."',
          explanation: 'Stonehenge là tàn tích thời tiền sử đáng chú ý nhất: "prehistoric remains".'
        },
        {
          id: 'p6_q45',
          number: 45,
          question: 'It has stood on Salisbury Plain for about (45) _______ years.',
          placeholder: 'Điền số năm...',
          primaryAnswer: '4,000',
          acceptedAnswers: ['4,000', '4000', 'four thousand', '4 thousand'],
          evidence: 'David: "It has stood on Salisbury Plain for about 4,000 years."',
          explanation: 'Công trình đá đã tồn tại khoảng 4.000 năm: "4,000 years".'
        },
        {
          id: 'p6_q46',
          number: 46,
          question: 'There have been many different theories about its (46) _______ use.',
          placeholder: 'Điền tính từ...',
          primaryAnswer: 'original',
          acceptedAnswers: ['original'],
          evidence: 'David: "...many different theories about its original use."',
          explanation: 'Có nhiều giả thuyết về mục đích sử dụng ban đầu của di tích: "original use".'
        },
        {
          id: 'p6_q47',
          number: 47,
          question: 'One theory is that it was a place from where (47) _______ could be observed. But no one is certain why it was built.',
          placeholder: 'Điền các thiên thể...',
          primaryAnswer: 'stars and planets',
          acceptedAnswers: ['stars and planets', 'planets and stars', 'the stars and planets'],
          evidence: 'Sue: "...one of the theories is that it was a place from where stars and planets could be observed."',
          explanation: 'Một giả thuyết cho rằng đây là đài quan sát các vì sao và hành tinh: "stars and planets".'
        },
        {
          id: 'p6_q48',
          number: 48,
          question: 'It has been discovered that the positions of (48) _______ of the stones...',
          placeholder: 'Điền lượng từ...',
          primaryAnswer: 'some',
          acceptedAnswers: ['some'],
          evidence: 'David: "One of the things people have discovered is the positions of some of the stones..."',
          explanation: 'Vị trí của một số viên đá: "positions of some of the stones".'
        },
        {
          id: 'p6_q49',
          number: 49,
          question: '...relate to the movements of the (49) _______...',
          placeholder: 'Điền hai thiên thể...',
          primaryAnswer: 'sun and moon',
          acceptedAnswers: ['sun and moon', 'sun and the moon', 'the sun and moon', 'the sun and the moon', 'moon and sun'],
          evidence: 'David: "...relate to the movements of the sun and moon..."',
          explanation: 'Vị trí các khối đá liên quan mật thiết tới sự chuyển động của mặt trời và mặt trăng: "sun and moon".'
        },
        {
          id: 'p6_q50',
          number: 50,
          question: '...so that the stones could be used as a (50) _______.',
          placeholder: 'Điền danh từ...',
          primaryAnswer: 'calendar',
          acceptedAnswers: ['calendar', 'calender', 'solar calendar'],
          evidence: 'David: "...so that the stones could be used as a calendar."',
          explanation: 'Nhờ vào sự sắp đặt này, các tảng đá có thể được sử dụng như một cuốn lịch: "used as a calendar".'
        }
      ]
    },

    // ==========================================
    // EXERCISE 7 (AUDIO 59) - MARRIAGES
    // ==========================================
    {
      id: 'p7',
      number: 7,
      title: 'Exercise 7: Marriages & Families (USA vs Korea)',
      shortTitle: 'Ex 7: Marriages (Track 59)',
      audioSrc: '/audio/practice/cefr_b1_listening_1/59.mp3',
      trackLabel: 'Track 59',
      instruction: 'Listen to the conversation between Soo Mi and Steve and fill in the missing information in the notes below.',
      tip: 'TIP: Hãy lắng nghe kỹ các số liệu thống kê: tỷ lệ ly hôn (50%), độ tuổi kết hôn (before 20), tỷ lệ phụ nữ đi làm (67%) và trẻ em có cha mẹ cùng đi làm (57%).',
      transcript: `Soo Mi: Hello, Steve. Have you read this article?
Steve: Not yet. What is in it?
Soo Mi: There are some facts about families in the United States. It says that 50% of marriages end in divorce in the United States.
Steve: Do people get divorced in Korea?
Soo Mi: No. Most Korean couples stay together.
Steve: Families are sure different in America.
Soo Mi: Well, there are more divorces but what else is different?
Steve: Well, I think people get married younger.
Soo Mi: How much younger?
Steve: Oh, I think some people get married before the age of 20.
Soo Mi: Really? What else?
Steve: A lot of women work after they get married. And I think most women who have babies go back to work fairly soon too.
Soo Mi: Yes, according to the survey, 50% of American working women return to work within a year of having a baby.
Steve: Do women in Korea usually work after they get married?
Soo Mi: No. A lot of women stay at home and take care of their families but a few work.
Steve: I see. Here are some more figures. It says 67% of women with children work. And 57% of children under six have two parents who work or a single parent who works.`,
      questions: [
        {
          id: 'p7_q51',
          number: 51,
          question: 'American families are different from (51) _______ ones in several ways.',
          placeholder: 'Điền quốc tịch/quốc gia...',
          primaryAnswer: 'Korean',
          acceptedAnswers: ['Korean', 'korean'],
          evidence: 'Soo Mi và Steve so sánh văn hóa gia đình giữa Mỹ và Hàn Quốc: "Do people get divorced in Korea? - No. Most Korean couples stay together. Families are sure different in America."',
          explanation: 'Gia đình Mỹ khác biệt với gia đình Hàn Quốc: "Korean ones".'
        },
        {
          id: 'p7_q52',
          number: 52,
          question: 'People in the USA get married (52) _______.',
          placeholder: 'Điền dạng so sánh hơn...',
          primaryAnswer: 'younger',
          acceptedAnswers: ['younger'],
          evidence: 'Steve: "Well, I think people get married younger."',
          explanation: 'Steve nhận xét người Mỹ kết hôn ở độ tuổi trẻ hơn: "get married younger".'
        },
        {
          id: 'p7_q53',
          number: 53,
          question: 'Many of them get married before the age of (53) _______.',
          placeholder: 'Điền số tuổi...',
          primaryAnswer: '20',
          acceptedAnswers: ['20', 'twenty'],
          evidence: 'Steve: "Oh, I think some people get married before the age of 20."',
          explanation: 'Nhiều người kết hôn trước 20 tuổi: "before the age of 20".'
        },
        {
          id: 'p7_q54',
          number: 54,
          question: 'A lot of women work after they (54) _______.',
          placeholder: 'Điền cụm động từ...',
          primaryAnswer: 'get married',
          acceptedAnswers: ['get married', 'marry'],
          evidence: 'Steve: "A lot of women work after they get married."',
          explanation: 'Nhiều phụ nữ tiếp tục đi làm sau khi họ kết hôn: "after they get married".'
        },
        {
          id: 'p7_q55',
          number: 55,
          question: 'Most women who have babies go back (55) _______ fairly soon.',
          placeholder: 'Điền cụm giới từ/động từ...',
          primaryAnswer: 'to work',
          acceptedAnswers: ['to work', 'work'],
          evidence: 'Steve: "...most women who have babies go back to work fairly soon too."',
          explanation: 'Phụ nữ sau khi sinh con sớm quay trở lại làm việc: "go back to work".'
        },
        {
          id: 'p7_q56',
          number: 56,
          question: '50% of them return to work within a year of having a baby. A lot of Korean women (56) _______ and take care of their families.',
          placeholder: 'Điền cụm từ chỉ hoạt động...',
          primaryAnswer: 'stay at home',
          acceptedAnswers: ['stay at home', 'stay home'],
          evidence: 'Soo Mi: "No. A lot of women stay at home and take care of their families but a few work."',
          explanation: 'Nhiều phụ nữ Hàn Quốc chọn ở nhà làm nội trợ và chăm sóc gia đình: "stay at home".'
        },
        {
          id: 'p7_q57',
          number: 57,
          question: 'The article says (57) _______ of women with children work.',
          placeholder: 'Điền phần trăm...',
          primaryAnswer: '67%',
          acceptedAnswers: ['67%', '67 percent', '67'],
          evidence: 'Steve: "It says 67% of women with children work."',
          explanation: 'Số liệu thống kê: 67% phụ nữ có con vẫn đi làm.'
        },
        {
          id: 'p7_q58',
          number: 58,
          question: 'And (58) _______ of children under six have two parents who work or a single parent who works.',
          placeholder: 'Điền phần trăm...',
          primaryAnswer: '57%',
          acceptedAnswers: ['57%', '57 percent', '57'],
          evidence: 'Steve: "And 57% of children under six have two parents who work or a single parent who works."',
          explanation: 'Tỷ lệ trẻ em dưới sáu tuổi có cha mẹ đi làm là 57%.'
        }
      ]
    }
  ]
};

// Flatten all questions across passages to synchronize grading and palette
CEFR_B1_LISTENING_1_PRACTICE_DETAIL.questions = CEFR_B1_LISTENING_1_PRACTICE_DETAIL.passages.flatMap(p => p.questions || []);
