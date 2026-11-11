// Pre-IELTS Listening 1: Friends Abroad (Names & Numbers)
// Detail data for homework assignment pre-ielts-listening-1

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
