// Đề cương Ôn tập Giữa Học kì I - Tiếng Anh 10 (Năm học 2026 – 2027)
// Comprehensive practice detail for revision-midterm-1-english-10
// Vertical layout structure for Tiếng Anh 6-12 (Global Success)
// Sections:
//   1. Section 1: Phonetics & Stress (Phát âm & Trọng âm: 8 câu)
//   2. Section 2: Vocabulary & Grammar (Từ vựng, Ngữ pháp, Giới từ & 5 bài điền từ Word Bank: 55 câu)
//   3. Section 3: Communication & Everyday English (Tình huống giao tiếp: 8 câu)
//   4. Section 4: Reading Comprehension & Cloze Test (5 bài điền từ Cloze + 4 bài đọc hiểu chi tiết: 45 câu)
//   5. Section 5: Writing & Sentence Transformation (Sắp xếp câu, viết lại câu & Viết đoạn văn: 32 câu)
// Total questions: 148 questions

export const REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL = {
  id: 'revision-midterm-1-english-10',
  title: 'Đề cương Ôn tập Giữa Học kì I - Tiếng Anh 10',
  level: 'Lớp 10',
  session: 'Đề cương Ôn tập Giữa HK1 (Năm học 2026 – 2027)',
  skill: 'Reading',
  category: 'school',
  layout: 'vertical',
  skillBadge: 'Đề cương Giữa HK1 • Full 5 Chuyên đề',
  vocabId: 'revision-midterm-1-english-10',
  vocabCount: 30,
  vocabLabel: 'Học 30 từ vựng Đề cương Ôn tập Giữa HK1',
  description: 'Bộ đề cương ôn tập toàn diện Giữa Học kì 1 Tiếng Anh 10 (Global Success - Units 1, 2, 3) gồm 5 phần chuẩn mực: Phonetics & Stress, Vocabulary & Grammar, Everyday Communication, Reading Comprehension & Cloze Test, và Writing & Sentence Transformation.',
  totalQuestions: 148,
  duration: '90 - 120 phút',
  passages: [
    // =========================================================================
    // SECTION 1: PHONETICS & STRESS
    // =========================================================================
    {
      id: 'sec-1',
      number: 1,
      title: 'Section 1: Phonetics & Stress (Phát âm & Trọng âm)',
      shortTitle: 'Phần 1: Phát âm & Trọng âm',
      shortLabel: 'Section 1',
      wordLimit: 'CHOOSE A, B, C OR D',
      maxWords: 1,
      instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation (Questions 1-4) or the word that differs from the other three in the position of primary stress (Questions 5-8).',
      rulesContent: `I. PHONETICS - TÓM TẮT QUY TẮC PHÁT ÂM VÀ TRỌNG ÂM UNIT 1 - 3 (TIẾNG ANH 10)

1. Cụm phụ âm đầu (Consonant Clusters):
- /br/: breadwinner, break, branch, brown, brother
- /kr/: crash, credit, crab, create, cruel
- /tr/: train, travel, true, trash, tradition
- /pr/: practice, prepare, protect, prize, proud
- /kl/: clean, club, clever, climate, clothes

2. Nguyên âm đơn & nguyên âm đôi trong từ vựng trọng tâm:
- /æ/: damage, plastic, trash, family, planet
- /ɑː/: carbon, garden, father, market, hard
- /eɪ/: break, great, steak (ngoại lệ nhóm -ea-)
- /iː/: clean, lead, read, meat, beach

3. Quy tắc trọng âm cơ bản:
- Đa số danh từ & tính từ 2 âm tiết nhấn âm 1: 'organ, 'finance, 'music, 'household, 'rubbish.
- Đa số động từ 2 âm tiết nhấn âm 2: in'spire, a'dopt, pro'tect, per'form, re'cycle, re'duce.
- Từ 3 âm tiết có hậu tố -ful, -ive thường giữ nguyên trọng âm gốc của từ: suc'cess ➔ suc'cessful; sup'port ➔ sup'portive; at'tract ➔ at'tractive.
- Từ có hậu tố -ed, -ing không làm thay đổi trọng âm chính: 'talent ➔ 'talented.`,
      content: `I. PHONETICS - TÓM TẮT QUY TẮC PHÁT ÂM VÀ TRỌNG ÂM UNIT 1 - 3 (TIẾNG ANH 10)...`,
      questions: [
        {
          id: 'sec1_q1',
          number: 1,
          question: 'Choose the word whose underlined part differs from the other three in pronunciation: A. breadwinner | B. break | C. branch | D. clean',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'breadwinner' },
            { letter: 'B', text: 'break' },
            { letter: 'C', text: 'branch' },
            { letter: 'D', text: 'clean' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'clean'],
          evidence: 'breadwinner /br/, break /br/, branch /br/ vs. clean /kl/',
          explanation: 'Phần gạch chân của "clean" phát âm là /kl/, trong khi ba từ còn lại đều bắt đầu bằng cụm phụ âm /br/.'
        },
        {
          id: 'sec1_q2',
          number: 2,
          question: 'Choose the word whose underlined part differs from the other three in pronunciation: A. crash | B. credit | C. crab | D. train',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'crash' },
            { letter: 'B', text: 'credit' },
            { letter: 'C', text: 'crab' },
            { letter: 'D', text: 'train' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'train'],
          evidence: 'crash /kr/, credit /kr/, crab /kr/ vs. train /tr/',
          explanation: 'Phần gạch chân của "train" phát âm là /tr/, ba từ còn lại đều bắt đầu bằng cụm phụ âm /kr/.'
        },
        {
          id: 'sec1_q3',
          number: 3,
          question: 'Choose the word whose underlined part differs from the other three in pronunciation: A. clean | B. break | C. great | D. steak',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'clean' },
            { letter: 'B', text: 'break' },
            { letter: 'C', text: 'great' },
            { letter: 'D', text: 'steak' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'clean'],
          evidence: 'clean /kliːn/ vs. break /breɪk/, great /ɡreɪt/, steak /steɪk/',
          explanation: '"clean" có nhóm -ea- phát âm là /iː/, trong khi "break", "great", "steak" đều có nhóm -ea- phát âm là /eɪ/.'
        },
        {
          id: 'sec1_q4',
          number: 4,
          question: 'Choose the word whose underlined part differs from the other three in pronunciation: A. damage | B. plastic | C. carbon | D. trash',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'damage' },
            { letter: 'B', text: 'plastic' },
            { letter: 'C', text: 'carbon' },
            { letter: 'D', text: 'trash' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'carbon'],
          evidence: 'carbon /ˈkɑːbən/ vs. damage /ˈdæmɪdʒ/, plastic /ˈplæstɪk/, trash /træʃ/',
          explanation: '"carbon" có chữ cái "a" phát âm là /ɑː/, trong khi ba từ còn lại đều phát âm là /æ/.'
        },
        {
          id: 'sec1_q5',
          number: 5,
          question: 'Choose the word that differs from the other three in the position of primary stress: A. organ | B. finance | C. perform | D. music',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'organ' },
            { letter: 'B', text: 'finance' },
            { letter: 'C', text: 'perform' },
            { letter: 'D', text: 'music' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'perform'],
          evidence: "perform /pəˈfɔːm/ (trọng âm 2) vs. organ /ˈɔːɡən/, finance /ˈfaɪnæns/, music /ˈmjuːzɪk/ (trọng âm 1)",
          explanation: '"perform" là động từ có trọng âm rơi vào âm tiết thứ 2, ba từ còn lại là danh từ có trọng âm rơi vào âm tiết thứ 1.'
        },
        {
          id: 'sec1_q6',
          number: 6,
          question: 'Choose the word that differs from the other three in the position of primary stress: A. inspire | B. adopt | C. protect | D. organ',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'inspire' },
            { letter: 'B', text: 'adopt' },
            { letter: 'C', text: 'protect' },
            { letter: 'D', text: 'organ' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'organ'],
          evidence: "organ /ˈɔːɡən/ (trọng âm 1) vs. inspire /ɪnˈspaɪə/, adopt /əˈdɒpt/, protect /prəˈtekt/ (trọng âm 2)",
          explanation: '"organ" có trọng âm rơi vào âm tiết thứ 1, ba từ còn lại là động từ 2 âm tiết có trọng âm rơi vào âm tiết thứ 2.'
        },
        {
          id: 'sec1_q7',
          number: 7,
          question: 'Choose the word that differs from the other three in the position of primary stress: A. talented | B. successful | C. attractive | D. supportive',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'talented' },
            { letter: 'B', text: 'successful' },
            { letter: 'C', text: 'attractive' },
            { letter: 'D', text: 'supportive' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'talented'],
          evidence: "talented /ˈtæləntɪd/ (trọng âm 1) vs. successful /səkˈsesfl/, attractive /əˈtræktɪv/, supportive /səˈpɔːtɪv/ (trọng âm 2)",
          explanation: '"talented" có trọng âm rơi vào âm tiết thứ 1, ba tính từ còn lại đều có trọng âm rơi vào âm tiết thứ 2.'
        },
        {
          id: 'sec1_q8',
          number: 8,
          question: 'Choose the word that differs from the other three in the position of primary stress: A. develop | B. encourage | C. computer | D. interview',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'develop' },
            { letter: 'B', text: 'encourage' },
            { letter: 'C', text: 'computer' },
            { letter: 'D', text: 'interview' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'interview'],
          evidence: "interview /ˈɪntəvjuː/ (trọng âm 1) vs. develop /dɪˈveləp/, encourage /ɪnˈkʌrɪdʒ/, computer /kəmˈpjuːtə/ (trọng âm 2)",
          explanation: '"interview" có trọng âm rơi vào âm tiết thứ 1, ba từ còn lại đều có trọng âm rơi vào âm tiết thứ 2.'
        }
      ]
    },

    // =========================================================================
    // SECTION 2: VOCABULARY & GRAMMAR (WITH 5 GUIDED WORD-BANK GAP PASSAGES)
    // =========================================================================
    {
      id: 'sec-2',
      number: 2,
      title: 'Section 2: Vocabulary & Grammar (Từ vựng, Ngữ pháp, Giới từ & Điền từ)',
      shortTitle: 'Phần 2: Từ vựng & Ngữ pháp',
      shortLabel: 'Section 2',
      wordLimit: '1 WORD / LETTER',
      maxWords: 2,
      instruction: 'Complete Part 1 by choosing the best answer A, B, C, or D (Questions 9-38), and Part 2 by choosing the correct word from the word bank to fill in each blank (Questions 39-63).',
      content: `II. USE OF ENGLISH - TỪ VỰNG & NGỮ PHÁP TRỌNG TÂM ĐỀ CƯƠNG...`,
      parts: [
        {
          id: 'sec2_part1a',
          title: 'Part 1A. Choose the word CLOSEST in meaning (Từ đồng nghĩa)',
          badge: 'Đồng nghĩa (Closest)',
          instruction: 'Choose the word that is CLOSEST in meaning to the underlined word in each of the following sentences.'
        },
        {
          id: 'sec2_part1b',
          title: 'Part 1B. Choose the word OPPOSITE in meaning (Từ trái nghĩa)',
          badge: 'Trái nghĩa (Opposite)',
          instruction: 'Choose the word that is OPPOSITE in meaning to the underlined word in each of the following sentences.'
        },
        {
          id: 'sec2_part1c',
          title: 'Part 1C. Vocabulary, Grammar & Collocations (Từ vựng & Cụm từ cố định)',
          badge: 'Ngữ pháp & Cụm từ',
          instruction: 'Choose the best answer A, B, C or D to complete each of the following sentences.'
        },
        {
          id: 'sec2_part2_1',
          title: 'Part 2.1: Bài đọc điền từ - Recycling Begins at Home',
          badge: 'Word Bank Cloze 1',
          type: 'wordBankGapFilling',
          wordBank: ['number', 'reduce', 'which', 'amount', 'instead', 'and'],
          extraWordNote: 'Có 1 từ thừa: number',
          instruction: 'Read the passage and complete the gap with suitable words from the box. There is one extra word.',
          passageText: `Recycling is important in today's world if we want to leave this planet for future generations. Recycling begins at home. If you are not throwing away your old products and (39) [Gap 6] ____________ using them for something new, then you are actually recycling.

When you think of recycling, you should really think about the whole idea: (40) [Gap 7] ____________, reuse and recycle. Recycling is good for the environment; in a sense, we are using old and waste products (41) [Gap 8] ____________ are of no use and then converting them back to the same new products.

With each passing day, the population is increasing. With that, the quantity of waste produced is also increasing. The more the waste production, the more is the (42) [Gap 9] ____________ of space required to dump these wastes. Now, it must be remembered that the space available on earth is very limited, (43) [Gap 10] ____________ it is obviously up to us to use it judiciously.`
        },
        {
          id: 'sec2_part2_2',
          title: 'Part 2.2: Bài đọc điền từ - Sharing Household Chores and Family Teamwork',
          badge: 'Word Bank Cloze 2',
          type: 'wordBankGapFilling',
          wordBank: ['making', 'taking', 'washing', 'clearing', 'doing', 'responsibility'],
          extraWordNote: 'Có 1 từ thừa: doing',
          instruction: 'Read the passage and complete the gap with suitable words from the box. There is one extra word.',
          passageText: `In every family, each member plays an important role in maintaining a happy and organized home. Parents often have many responsibilities, including working and taking care of their children. However, it's important that everyone contributes to housework to lighten the load.

Children, for example, can help by doing simple chores such as (44) [Gap 6] ____________ their beds in the morning or (45) [Gap 7] ____________ the table after meals. Older children can take on more tasks, like doing the laundry or (46) [Gap 8] ____________ the dishes. Working together not only keeps the house clean but also teaches (47) [Gap 9] ____________ and teamwork. Even small things, like (48) [Gap 10] ____________ out the trash, can make a big difference in creating a pleasant environment for the entire family.`
        },
        {
          id: 'sec2_part2_3',
          title: 'Part 2.3: Bài đọc điền từ - Traditional Family Values and Society',
          badge: 'Word Bank Cloze 3',
          type: 'wordBankGapFilling',
          wordBank: ['changed', 'what', 'on', 'when', 'traditional', 'modern'],
          extraWordNote: 'Có 1 từ thừa: modern',
          instruction: 'Read the passage and complete the gap with suitable words from the box. There is one extra word.',
          passageText: `Today children are growing up in a society that is technologically driven and are learning at a much faster pace than in the 70s. The fast pace of learning has kept parents lagging in getting a hold of their kid's moral values and helping them understand (49) [Gap 6] ____________ family values used to be.

Family values have (50) [Gap 7] ____________ over time from my perspective, seeing all that is happening in our world today. To better appraise this conclusion, let us understand the definition of family values. Family values are (51) [Gap 8] ____________ values that are passed (52) [Gap 9] ____________ from generation to generation within the family that address the family roles, family structure, function, attitude, and ideas. These traditional values are like unwritten codes that guide the actions of individuals. They help people decide what is right or wrong.

The family is a powerful institution with tremendous influence on society, and (53) [Gap 10] ____________ these family values become promoted by parents within the family, society will feel the effect.`
        },
        {
          id: 'sec2_part2_4',
          title: 'Part 2.4: Bài đọc điền từ - Advice on Getting Fit and Running Shoes',
          badge: 'Word Bank Cloze 4',
          type: 'wordBankGapFilling',
          wordBank: ['effective', 'or', 'it', 'protect', 'instead', 'shoes'],
          extraWordNote: 'Có 1 từ thừa: instead',
          instruction: 'Read the passage and complete the gap with suitable words from the box. There is one extra word.',
          passageText: `My first piece of advice to people who want to start getting fit is: don't buy an exercise bike. Typically, people who buy them use them for a week or so and then forget about them. They are (54) [Gap 6] ____________ if they are used regularly but you need to be determined. Most people will find (55) [Gap 7] ____________ much easier to go for a gentle jog around the park.

As well as being easy to do, jogging is also relatively cheap compared to most other sports. You don't need to buy expensive clothes if you're just going running around the park (56) [Gap 8] ____________ on the beach. The main thing is that they're comfortable, and that they keep you warm in the winter and cool in the summer.

There is one piece of equipment, however, that you will have to spend time and money on, and that's your running (57) [Gap 9] ____________. Remember that you are not looking for a fashion item, but for something that will support your feet and (58) [Gap 10] ____________ you from injury. They can be expensive, but if they are good quality they will last you a long time. It's always best to get expert advice, and the best place for that is a sports shop.`
        },
        {
          id: 'sec2_part2_5',
          title: 'Part 2.5: Bài đọc điền từ - The Japanese Intelligent Household Robot',
          badge: 'Word Bank Cloze 5',
          type: 'wordBankGapFilling',
          wordBank: ['tidy', 'cleaner', 'routine', 'household', 'housework', 'instructions'],
          extraWordNote: 'Có 1 từ thừa: housework',
          instruction: 'Read the passage and complete the gap with suitable words from the box. There is one extra word.',
          passageText: `Nobody wants to spend money on a different robot for every job. This is why Japanese engineers are building a robot (59) [Gap 6] ____________: a single robot that does all your (60) [Gap 7] ____________ chores.

This intelligent robot has a human face and can (61) [Gap 8] ____________ rooms, mop the floors, or vacuum the living room rug. It is so helpful that it can even bring you a drink or snack from the refrigerator while you sit down and watch it do all the work.

What makes this robot different is that it is always learning. It can study your (62) [Gap 9] ____________ and then clean when you are out of the house. The robot also understands lots of languages so everyone can give it (63) [Gap 10] ____________.`
        }
      ],
      questions: [
        // Closest in meaning (Questions 9 - 18)
        {
          id: 'sec2_q9',
          number: 9,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: I want to express my GRATITUDE to Mr. Davis for his valuable help.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'thanks' },
            { letter: 'B', text: 'regret' },
            { letter: 'C', text: 'sadness' },
            { letter: 'D', text: 'happiness' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'thanks'],
          evidence: 'express my gratitude = bày tỏ lòng biết ơn, cảm ơn.',
          explanation: 'gratitude = lòng biết ơn; "express my gratitude" đồng nghĩa với lời cảm ơn (thanks).'
        },
        {
          id: 'sec2_q10',
          number: 10,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Encouraging students to plant more trees helps CUT DOWN ON CO2 and make the air clean.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'increase' },
            { letter: 'B', text: 'reduce' },
            { letter: 'C', text: 'remove' },
            { letter: 'D', text: 'repair' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'reduce'],
          evidence: 'cut down on = reduce = cắt giảm.',
          explanation: 'Cụm động từ "cut down on" có nghĩa là cắt giảm, đồng nghĩa với "reduce".'
        },
        {
          id: 'sec2_q11',
          number: 11,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Sometimes adults think children may break or DAMAGE things when they do housework.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'destroy' },
            { letter: 'B', text: 'lose' },
            { letter: 'C', text: 'suffer' },
            { letter: 'D', text: 'gain' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'destroy'],
          evidence: 'damage = làm hư hại, đổ vỡ, phá hỏng.',
          explanation: '"damage" mang nghĩa làm hư hỏng, phá hủy, gần nghĩa nhất với "destroy".'
        },
        {
          id: 'sec2_q12',
          number: 12,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Parents are recommended to COLLABORATE with teachers in educating children.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'part' },
            { letter: 'B', text: 'cooperate' },
            { letter: 'C', text: 'separate' },
            { letter: 'D', text: 'disagree' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'cooperate'],
          evidence: 'collaborate with = cooperate with = hợp tác với.',
          explanation: '"collaborate with" nghĩa là hợp tác, phối hợp làm việc cùng ai, đồng nghĩa với "cooperate".'
        },
        {
          id: 'sec2_q13',
          number: 13,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: In my family, everyone shares the household DUTIES.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'responsibilities' },
            { letter: 'B', text: 'balance' },
            { letter: 'C', text: 'culture' },
            { letter: 'D', text: 'finances' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'responsibilities'],
          evidence: 'duties = responsibilities = nhiệm vụ, bổn phận, trách nhiệm.',
          explanation: 'household duties = việc nhà/nhiệm vụ trong gia đình, đồng nghĩa với responsibilities.'
        },
        {
          id: 'sec2_q14',
          number: 14,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Doing chores together helps strengthen family BONDS.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'common interests' },
            { letter: 'B', text: 'close connections' },
            { letter: 'C', text: 'common qualities' },
            { letter: 'D', text: 'the same feeling' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'close connections'],
          evidence: 'family bonds = mối liên kết/gắn kết chặt chẽ trong gia đình.',
          explanation: '"family bonds" chỉ sự gắn kết tình cảm gia đình, đồng nghĩa với "close connections".'
        },
        {
          id: 'sec2_q15',
          number: 15,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: We should RECYCLE as much as possible because this prevents pollution.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'reprocess' },
            { letter: 'B', text: 'throw away' },
            { letter: 'C', text: 'pick up' },
            { letter: 'D', text: 'cut down' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'reprocess'],
          evidence: 'recycle = reprocess (xử lý lại đồ phế thải để tái sử dụng).',
          explanation: '"recycle" mang nghĩa tái chế hoặc xử lý lại chất thải, đồng nghĩa với "reprocess".'
        },
        {
          id: 'sec2_q16',
          number: 16,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Buying products that are grown using more natural ORGANIC methods is one way to reduce carbon footprint.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'without the use of animal organs' },
            { letter: 'B', text: 'without the use of chemicals' },
            { letter: 'C', text: 'with the use of animal organs' },
            { letter: 'D', text: 'with the use of chemicals' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'without the use of chemicals'],
          evidence: 'organic methods = phương pháp hữu cơ (thuần tự nhiên, không sử dụng hóa chất nhân tạo).',
          explanation: '"organic" trong nông nghiệp chỉ các phương pháp nuôi trồng tự nhiên không sử dụng hóa chất độc hại.'
        },
        {
          id: 'sec2_q17',
          number: 17,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: That teen idol was TALENTED to win second place in the Idol Contest in 2010.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'clever' },
            { letter: 'B', text: 'gifted' },
            { letter: 'C', text: 'intelligent' },
            { letter: 'D', text: 'lucky' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'gifted'],
          evidence: 'talented = gifted = có tài năng, có năng khiếu.',
          explanation: '"talented" đồng nghĩa với "gifted" (có năng khiếu thiên bẩm).'
        },
        {
          id: 'sec2_q18',
          number: 18,
          partId: 'sec2_part1a',
          question: 'Choose the word CLOSEST in meaning to the underlined word: Her courage not only INSPIRED her followers but moved her rivals as well.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'depressed' },
            { letter: 'B', text: 'motivated' },
            { letter: 'C', text: 'overlooked' },
            { letter: 'D', text: 'rejected' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'motivated'],
          evidence: 'inspire = motivate = truyền cảm hứng, thúc đẩy tinh thần.',
          explanation: '"inspire" có nghĩa là truyền cảm hứng, khích lệ động lực, đồng nghĩa với "motivated".'
        },

        // Opposite in meaning (Questions 19 - 27)
        {
          id: 'sec2_q19',
          number: 19,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: More and more people ADOPT a green lifestyle, which is good for themselves and the environment.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'choose' },
            { letter: 'B', text: 'follow' },
            { letter: 'C', text: 'maintain' },
            { letter: 'D', text: 'reject' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'reject'],
          evidence: 'adopt = tiếp nhận/áp dụng >< reject = từ chối/bác bỏ.',
          explanation: '"adopt" nghĩa là chấp nhận áp dụng lối sống mới; trái nghĩa là "reject" (từ chối, bác bỏ).'
        },
        {
          id: 'sec2_q20',
          number: 20,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: CUTTING DOWN ON plastic use really helps the environment because it takes many years to break down.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'increasing' },
            { letter: 'B', text: 'reducing' },
            { letter: 'C', text: 'producing' },
            { letter: 'D', text: 'using' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'increasing'],
          evidence: 'cutting down on = reducing >< increasing.',
          explanation: '"cutting down on" là cắt giảm; trái nghĩa trực tiếp là "increasing" (tăng lên).'
        },
        {
          id: 'sec2_q21',
          number: 21,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: He has got a lot of important ACHIEVEMENTS in music recently.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'failures' },
            { letter: 'B', text: 'success' },
            { letter: 'C', text: 'sufferings' },
            { letter: 'D', text: 'performances' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'failures'],
          evidence: 'achievements = thành tựu >< failures = sự thất bại.',
          explanation: '"achievements" nghĩa là những thành tựu đạt được; trái nghĩa là "failures" (thất bại).'
        },
        {
          id: 'sec2_q22',
          number: 22,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: When he was 17, his mother started to UPLOAD his cover song videos on social media.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'share' },
            { letter: 'B', text: 'download' },
            { letter: 'C', text: 'reach' },
            { letter: 'D', text: 'cover' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'download'],
          evidence: 'upload = tải lên mạng >< download = tải về máy.',
          explanation: '"upload" (tải tệp lên) trái nghĩa với "download" (tải tệp về).'
        },
        {
          id: 'sec2_q23',
          number: 23,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: You are so lucky to have such a SUPPORTIVE brother.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'unhelpful' },
            { letter: 'B', text: 'helpful' },
            { letter: 'C', text: 'indifferent' },
            { letter: 'D', text: 'encouraging' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'unhelpful'],
          evidence: 'supportive = luôn giúp đỡ, hỗ trợ >< unhelpful = không giúp ích gì.',
          explanation: '"supportive" mang tính khích lệ, giúp đỡ; trái nghĩa trực tiếp là "unhelpful".'
        },
        {
          id: 'sec2_q24',
          number: 24,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: Small changes in your daily habits can help REDUCE the carbon footprint you produce.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'lower' },
            { letter: 'B', text: 'increase' },
            { letter: 'C', text: 'rise' },
            { letter: 'D', text: 'improve' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'increase'],
          evidence: 'reduce = giảm bớt >< increase = gia tăng.',
          explanation: '"reduce" là ngoại động từ mang nghĩa làm giảm; trái nghĩa tương ứng là "increase" (làm tăng).'
        },
        {
          id: 'sec2_q25',
          number: 25,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: I admire him because he has a PROFESSIONAL voice.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'skillful' },
            { letter: 'B', text: 'technical' },
            { letter: 'C', text: 'powerful' },
            { letter: 'D', text: 'amateur' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'amateur'],
          evidence: 'professional = chuyên nghiệp >< amateur = nghiệp dư, không chuyên.',
          explanation: '"professional" (chuyên nghiệp) đối lập với "amateur" (nghiệp dư).'
        },
        {
          id: 'sec2_q26',
          number: 26,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: Remember to TURN OFF your devices when they are not used.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'turn into' },
            { letter: 'B', text: 'turn on' },
            { letter: 'C', text: 'turn up' },
            { letter: 'D', text: 'turn out' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'turn on'],
          evidence: 'turn off = tắt thiết bị >< turn on = bật thiết bị.',
          explanation: '"turn off" (tắt) trái nghĩa với "turn on" (bật).'
        },
        {
          id: 'sec2_q27',
          number: 27,
          partId: 'sec2_part1b',
          question: 'Choose the word OPPOSITE in meaning to the underlined word: The contestants who receive the fewest viewers\' votes are ELIMINATED from the competition.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'got rid of' },
            { letter: 'B', text: 'reduced' },
            { letter: 'C', text: 'added' },
            { letter: 'D', text: 'divided' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'added'],
          evidence: 'eliminated = bị loại ra >< added = được thêm vào giữ lại.',
          explanation: '"eliminated" là bị loại bỏ khỏi danh sách; trái nghĩa trong các phương án là "added" (được thêm vào).'
        },

        // Lexico-Grammar & Collocations (Questions 28 - 38)
        {
          id: 'sec2_q28',
          number: 28,
          partId: 'sec2_part1c',
          question: 'The talented singer left a positive impression on both the judges and the ______ because of her friendliness and natural beauty.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'contestants' },
            { letter: 'B', text: 'organizers' },
            { letter: 'C', text: 'audience' },
            { letter: 'D', text: 'musicians' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'audience'],
          evidence: 'both the judges and the audience = cả ban giám khảo lẫn khán giả.',
          explanation: '"audience" là khán thính giả xem buổi diễn, kết hợp tự nhiên với "the judges" (ban giám khảo).'
        },
        {
          id: 'sec2_q29',
          number: 29,
          partId: 'sec2_part1c',
          question: 'The amount of the greenhouse gases produced by human activities is known as ______.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'action' },
            { letter: 'B', text: 'carbon footprint' },
            { letter: 'C', text: 'carbon dioxide' },
            { letter: 'D', text: 'emission' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'carbon footprint'],
          evidence: 'carbon footprint: tổng lượng khí nhà kính phát thải do các hoạt động của con người gây ra.',
          explanation: 'Theo định nghĩa trong SGK Tiếng Anh 10 Unit 2, lượng khí nhà kính thải ra được gọi là "carbon footprint".'
        },
        {
          id: 'sec2_q30',
          number: 30,
          partId: 'sec2_part1c',
          question: 'It takes me hours to ______ household chores.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'make' },
            { letter: 'B', text: 'keep' },
            { letter: 'C', text: 'run' },
            { letter: 'D', text: 'do' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'do'],
          evidence: 'Collocation cố định: do household chores.',
          explanation: 'Cụm cố định chỉ việc làm việc nhà là "do household chores".'
        },
        {
          id: 'sec2_q31',
          number: 31,
          partId: 'sec2_part1c',
          question: 'Doing housework brings great ______ to children as it helps them develop necessary life skills.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'benefits' },
            { letter: 'B', text: 'hard work' },
            { letter: 'C', text: 'results' },
            { letter: 'D', text: 'practices' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'benefits'],
          evidence: 'bring benefits to somebody = mang lại lợi ích cho ai.',
          explanation: 'Cụm từ "bring benefits to sb" nghĩa là mang lại những lợi ích thiết thực cho ai.'
        },
        {
          id: 'sec2_q32',
          number: 32,
          partId: 'sec2_part1c',
          question: "Linh can't go out with us to see a movie now because she's ______ dinner.",
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'preparing' },
            { letter: 'B', text: 'making' },
            { letter: 'C', text: 'arranging' },
            { letter: 'D', text: 'keeping' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'preparing'],
          evidence: 'prepare dinner = chuẩn bị nấu bữa tối.',
          explanation: '"prepare dinner" (chuẩn bị bữa tối) là cách diễn đạt tự nhiên và chuẩn mực nhất trong văn cảnh này.'
        },
        {
          id: 'sec2_q33',
          number: 33,
          partId: 'sec2_part1c',
          question: 'Everyone should ______ all electrical appliances before going out of the room to save energy.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'turn off' },
            { letter: 'B', text: 'turn on' },
            { letter: 'C', text: 'turn up' },
            { letter: 'D', text: 'turn down' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'turn off'],
          evidence: 'turn off electrical appliances to save energy = tắt thiết bị điện để tiết kiệm năng lượng.',
          explanation: 'Để tiết kiệm điện ("to save energy"), ta phải tắt thiết bị trước khi ra ngoài ("turn off").'
        },
        {
          id: 'sec2_q34',
          number: 34,
          partId: 'sec2_part1c',
          question: 'Audiences play an important ______ in the success of a show on TV.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'role' },
            { letter: 'B', text: 'actress' },
            { letter: 'C', text: 'position' },
            { letter: 'D', text: 'member' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'role'],
          evidence: 'play an important role in = đóng một vai trò quan trọng trong việc gì.',
          explanation: 'Cấu trúc thành ngữ: "play an important role in something".'
        },
        {
          id: 'sec2_q35',
          number: 35,
          partId: 'sec2_part1c',
          question: 'A ______ is a person who works at home and takes care of the house and family.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Breadwinner' },
            { letter: 'B', text: 'Homemaker' },
            { letter: 'C', text: 'Servant' },
            { letter: 'D', text: 'Houseman' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'Homemaker', 'homemaker'],
          evidence: 'homemaker = người nội trợ (chăm sóc nhà cửa và gia đình).',
          explanation: '"Homemaker" là người nội trợ; phân biệt với "Breadwinner" là người kiếm tiền chính cho gia đình.'
        },
        {
          id: 'sec2_q36',
          number: 36,
          partId: 'sec2_part1c',
          question: '______ the rubbish in the early morning is a part of my daily routine.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Taking out' },
            { letter: 'B', text: 'Coming out' },
            { letter: 'C', text: 'Pulling out' },
            { letter: 'D', text: 'Bringing out' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Taking out', 'taking out'],
          evidence: 'take out the rubbish = đổ rác, mang rác ra ngoài.',
          explanation: 'Cụm từ cố định: "take out the rubbish" (đổ rác). Làm chủ ngữ đầu câu dùng V-ing: "Taking out".'
        },
        {
          id: 'sec2_q37',
          number: 37,
          partId: 'sec2_part1c',
          question: "I'd love to take ______ a musical instrument but I don't have time.",
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'in' },
            { letter: 'B', text: 'off' },
            { letter: 'C', text: 'after' },
            { letter: 'D', text: 'up' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'up'],
          evidence: 'take up a musical instrument / hobby = bắt đầu theo đuổi/học một nhạc cụ hoặc sở thích mới.',
          explanation: '"take up" nghĩa là bắt đầu học hoặc chơi một nhạc cụ, môn thể thao hay thú vui.'
        },
        {
          id: 'sec2_q38',
          number: 38,
          partId: 'sec2_part1c',
          question: 'My father is responsible ______ the household finances.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'for' },
            { letter: 'B', text: 'in' },
            { letter: 'C', text: 'on' },
            { letter: 'D', text: 'at' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'for'],
          evidence: 'be responsible for something = chịu trách nhiệm về điều gì.',
          explanation: 'Cấu trúc tính từ đi với giới từ: "be responsible for + N/V-ing".'
        },

        // Word Bank Gap Filling: Part 2.1 - 2.5 (Questions 39 - 63)
        // Part 2.1: Recycling
        {
          id: 'sec2_q39',
          number: 39,
          partId: 'sec2_part2_1',
          question: 'Chỗ trống (6) - Part 2.1 (Recycling): If you are not throwing away your old products and (6) ____________ using them for something new, then you are actually recycling.',
          placeholder: 'Điền từ thích hợp (từ word bank: number, reduce, which, amount, instead, and)...',
          primaryAnswer: 'instead',
          acceptedAnswers: ['instead', 'Instead'],
          evidence: 'not throwing away ... and instead using them (thay vào đó sử dụng chúng)',
          explanation: 'Phó từ "instead" thể hiện việc không vứt bỏ mà thay vào đó sử dụng lại cho mục đích mới.'
        },
        {
          id: 'sec2_q40',
          number: 40,
          partId: 'sec2_part2_1',
          question: 'Chỗ trống (7) - Part 2.1 (Recycling): When you think of recycling, you should really think about the whole idea: (7) ____________, reuse and recycle.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'reduce',
          acceptedAnswers: ['reduce', 'Reduce'],
          evidence: 'Bộ ba 3R nổi tiếng: reduce, reuse and recycle (giảm thiểu, tái sử dụng và tái chế).',
          explanation: 'Khẩu hiệu môi trường kinh điển: "reduce, reuse and recycle".'
        },
        {
          id: 'sec2_q41',
          number: 41,
          partId: 'sec2_part2_1',
          question: 'Chỗ trống (8) - Part 2.1 (Recycling): In a sense, we are using old and waste products (8) ____________ are of no use and then converting them back.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'which',
          acceptedAnswers: ['which', 'Which'],
          evidence: 'products which are of no use (đại từ quan hệ chỉ vật thay thế cho products)',
          explanation: 'Cần đại từ quan hệ "which" làm chủ ngữ thay thế cho danh từ chỉ vật "old and waste products".'
        },
        {
          id: 'sec2_q42',
          number: 42,
          partId: 'sec2_part2_1',
          question: 'Chỗ trống (9) - Part 2.1 (Recycling): The more the waste production, the more is the (9) ____________ of space required to dump these wastes.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'amount',
          acceptedAnswers: ['amount', 'Amount'],
          evidence: 'amount of space: lượng diện tích (space là danh từ không đếm được).',
          explanation: '"space" (không gian, diện tích) là danh từ không đếm được nên đi với "amount" (amount of space).'
        },
        {
          id: 'sec2_q43',
          number: 43,
          partId: 'sec2_part2_1',
          question: 'Chỗ trống (10) - Part 2.1 (Recycling): Now, it must be remembered that the space available on earth is very limited, (10) ____________ it is obviously up to us to use it judiciously.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'and',
          acceptedAnswers: ['and', 'And'],
          evidence: 'Nối hai mệnh đề độc lập mang tính bổ trợ kết luận: space is limited, and it is up to us...',
          explanation: 'Liên từ đẳng lập "and" dùng để nối hai mệnh đề cùng mạch ý.'
        },

        // Part 2.2: Household chores
        {
          id: 'sec2_q44',
          number: 44,
          partId: 'sec2_part2_2',
          question: 'Chỗ trống (6) - Part 2.2 (Household chores): Children, for example, can help by doing simple chores such as (6) ____________ their beds in the morning...',
          placeholder: 'Điền từ thích hợp (từ word bank: making, taking, washing, clearing, doing, responsibility)...',
          primaryAnswer: 'making',
          acceptedAnswers: ['making', 'Making'],
          evidence: 'make the bed = dọn dẹp/xếp giường sau khi ngủ dậy.',
          explanation: 'Collocation: "make one\'s bed" (dọn giường); sau "such as" dùng V-ing ➔ "making".'
        },
        {
          id: 'sec2_q45',
          number: 45,
          partId: 'sec2_part2_2',
          question: 'Chỗ trống (7) - Part 2.2 (Household chores): ...or (7) ____________ the table after meals.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'clearing',
          acceptedAnswers: ['clearing', 'Clearing'],
          evidence: 'clear the table = dọn bàn ăn sau bữa cơm.',
          explanation: 'Collocation: "clear the table" (dọn bát đĩa trên bàn sau khi ăn xong).'
        },
        {
          id: 'sec2_q46',
          number: 46,
          partId: 'sec2_part2_2',
          question: 'Chỗ trống (8) - Part 2.2 (Household chores): Older children can take on more tasks, like doing the laundry or (8) ____________ the dishes.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'washing',
          acceptedAnswers: ['washing', 'Washing'],
          evidence: 'wash the dishes = rửa bát đĩa.',
          explanation: 'Collocation: "wash the dishes" (rửa bát).'
        },
        {
          id: 'sec2_q47',
          number: 47,
          partId: 'sec2_part2_2',
          question: 'Chỗ trống (9) - Part 2.2 (Household chores): Working together not only keeps the house clean but also teaches (9) ____________ and teamwork.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'responsibility',
          acceptedAnswers: ['responsibility', 'Responsibility'],
          evidence: 'teach responsibility and teamwork = dạy tinh thần trách nhiệm và kỹ năng làm việc nhóm.',
          explanation: 'Sau động từ "teaches" và song song với danh từ "teamwork" cần danh từ "responsibility".'
        },
        {
          id: 'sec2_q48',
          number: 48,
          partId: 'sec2_part2_2',
          question: 'Chỗ trống (10) - Part 2.2 (Household chores): Even small things, like (10) ____________ out the trash, can make a big difference...',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'taking',
          acceptedAnswers: ['taking', 'Taking'],
          evidence: 'take out the trash = đổ rác.',
          explanation: 'Collocation: "take out the trash/rubbish" (đổ rác); sau "like" dùng V-ing ➔ "taking".'
        },

        // Part 2.3: Family values
        {
          id: 'sec2_q49',
          number: 49,
          partId: 'sec2_part2_3',
          question: "Chỗ trống (6) - Part 2.3 (Family values): ...helping them understand (6) ____________ family values used to be.",
          placeholder: 'Điền từ thích hợp (từ word bank: changed, what, on, when, traditional, modern)...',
          primaryAnswer: 'what',
          acceptedAnswers: ['what', 'What'],
          evidence: 'what family values used to be = những giá trị gia đình xưa kia từng là gì.',
          explanation: 'Cần từ nghi vấn "what" để hoàn chỉnh mệnh đề danh từ tân ngữ của understand.'
        },
        {
          id: 'sec2_q50',
          number: 50,
          partId: 'sec2_part2_3',
          question: 'Chỗ trống (7) - Part 2.3 (Family values): Family values have (7) ____________ over time from my perspective...',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'changed',
          acceptedAnswers: ['changed', 'Changed'],
          evidence: 'have changed over time = đã thay đổi theo thời gian (thì hiện tại hoàn thành).',
          explanation: 'Sau trợ động từ "have" ở thì hiện tại hoàn thành cần quá khứ phân từ "changed".'
        },
        {
          id: 'sec2_q51',
          number: 51,
          partId: 'sec2_part2_3',
          question: 'Chỗ trống (8) - Part 2.3 (Family values): Family values are (8) ____________ values that are passed down...',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'traditional',
          acceptedAnswers: ['traditional', 'Traditional'],
          evidence: 'traditional values: các giá trị truyền thống.',
          explanation: 'Tính từ "traditional" bổ nghĩa cho "values", đối chiếu với "These traditional values" ở câu tiếp theo.'
        },
        {
          id: 'sec2_q52',
          number: 52,
          partId: 'sec2_part2_3',
          question: 'Chỗ trống (9) - Part 2.3 (Family values): ...values that are passed (9) ____________ from generation to generation within the family...',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'on',
          acceptedAnswers: ['on', 'On'],
          evidence: 'pass on from generation to generation = truyền lại từ thế hệ này sang thế hệ khác.',
          explanation: 'Cụm động từ: "pass on" (lưu truyền, truyền lại cho thế hệ sau).'
        },
        {
          id: 'sec2_q53',
          number: 53,
          partId: 'sec2_part2_3',
          question: 'Chỗ trống (10) - Part 2.3 (Family values): ...and (10) ____________ these family values become promoted by parents within the family, society will feel the effect.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'when',
          acceptedAnswers: ['when', 'When'],
          evidence: 'when these values become promoted...: khi những giá trị này được cha mẹ đề cao.',
          explanation: 'Liên từ chỉ thời gian / điều kiện "when" (khi mà).'
        },

        // Part 2.4: Getting fit
        {
          id: 'sec2_q54',
          number: 54,
          partId: 'sec2_part2_4',
          question: 'Chỗ trống (6) - Part 2.4 (Getting fit): They are (6) ____________ if they are used regularly but you need to be determined.',
          placeholder: 'Điền từ thích hợp (từ word bank: effective, or, it, protect, instead, shoes)...',
          primaryAnswer: 'effective',
          acceptedAnswers: ['effective', 'Effective'],
          evidence: 'be effective = có hiệu quả, phát huy tác dụng.',
          explanation: 'Sau "are" cần tính từ "effective" để miêu tả tính hiệu quả của xe đạp tập thể dục.'
        },
        {
          id: 'sec2_q55',
          number: 55,
          partId: 'sec2_part2_4',
          question: 'Chỗ trống (7) - Part 2.4 (Getting fit): Most people will find (7) ____________ much easier to go for a gentle jog around the park.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'it',
          acceptedAnswers: ['it', 'It'],
          evidence: 'Cấu trúc: find it + adj + to V = nhận thấy việc gì như thế nào.',
          explanation: 'Chủ ngữ giả "it" trong cấu trúc "find it + adjective + to-infinitive".'
        },
        {
          id: 'sec2_q56',
          number: 56,
          partId: 'sec2_part2_4',
          question: "Chỗ trống (8) - Part 2.4 (Getting fit): You don't need to buy expensive clothes if you're just going running around the park (8) ____________ on the beach.",
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'or',
          acceptedAnswers: ['or', 'Or'],
          evidence: 'around the park or on the beach = chạy quanh công viên hoặc trên bãi biển.',
          explanation: 'Liên từ lựa chọn "or" kết nối hai cụm giới từ chỉ địa điểm.'
        },
        {
          id: 'sec2_q57',
          number: 57,
          partId: 'sec2_part2_4',
          question: 'Chỗ trống (9) - Part 2.4 (Getting fit): There is one piece of equipment, however, that you will have to spend time and money on, and that\'s your running (9) ____________.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'shoes',
          acceptedAnswers: ['shoes', 'Shoes'],
          evidence: 'running shoes = giày chạy bộ chuyên dụng.',
          explanation: 'Cụm danh từ: "running shoes" (giày chạy), liên kết với "support your feet" ở câu tiếp theo.'
        },
        {
          id: 'sec2_q58',
          number: 58,
          partId: 'sec2_part2_4',
          question: 'Chỗ trống (10) - Part 2.4 (Getting fit): ...something that will support your feet and (10) ____________ you from injury.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'protect',
          acceptedAnswers: ['protect', 'Protect'],
          evidence: 'protect somebody from injury = bảo vệ ai khỏi bị chấn thương.',
          explanation: 'Cấu trúc động từ: "protect someone from something" (bảo vệ ai khỏi chấn thương).'
        },

        // Part 2.5: Household robot
        {
          id: 'sec2_q59',
          number: 59,
          partId: 'sec2_part2_5',
          question: 'Chỗ trống (6) - Part 2.5 (Household robot): This is why Japanese engineers are building a robot (6) ____________: a single robot that does all your chores.',
          placeholder: 'Điền từ thích hợp (từ word bank: tidy, cleaner, routine, household, housework, instructions)...',
          primaryAnswer: 'cleaner',
          acceptedAnswers: ['cleaner', 'Cleaner'],
          evidence: 'robot cleaner = rô-bốt dọn dẹp vệ sinh.',
          explanation: 'Cụm danh từ: "robot cleaner" (máy/rô-bốt lau dọn).'
        },
        {
          id: 'sec2_q60',
          number: 60,
          partId: 'sec2_part2_5',
          question: 'Chỗ trống (7) - Part 2.5 (Household robot): ...a single robot that does all your (7) ____________ chores.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'household',
          acceptedAnswers: ['household', 'Household'],
          evidence: 'household chores = việc vặt trong nhà.',
          explanation: 'Cụm từ quen thuộc: "household chores" (việc nhà).'
        },
        {
          id: 'sec2_q61',
          number: 61,
          partId: 'sec2_part2_5',
          question: 'Chỗ trống (8) - Part 2.5 (Household robot): This intelligent robot has a human face and can (8) ____________ rooms, mop the floors, or vacuum the rug.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'tidy',
          acceptedAnswers: ['tidy', 'Tidy'],
          evidence: 'tidy rooms = thu dọn phòng ốc gọn gàng.',
          explanation: 'Động từ nguyên mẫu "tidy" đi song song với "mop" và "vacuum".'
        },
        {
          id: 'sec2_q62',
          number: 62,
          partId: 'sec2_part2_5',
          question: 'Chỗ trống (9) - Part 2.5 (Household robot): It can study your (9) ____________ and then clean when you are out of the house.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'routine',
          acceptedAnswers: ['routine', 'Routine'],
          evidence: 'study your routine = tìm hiểu và ghi nhớ lịch trình sinh hoạt hàng ngày của bạn.',
          explanation: '"routine" là thói quen / lịch trình sinh hoạt hàng ngày.'
        },
        {
          id: 'sec2_q63',
          number: 63,
          partId: 'sec2_part2_5',
          question: 'Chỗ trống (10) - Part 2.5 (Household robot): The robot also understands lots of languages so everyone can give it (10) ____________.',
          placeholder: 'Điền từ thích hợp (từ word bank)...',
          primaryAnswer: 'instructions',
          acceptedAnswers: ['instructions', 'Instructions'],
          evidence: 'give instructions = đưa ra hiệu lệnh, chỉ dẫn thao tác.',
          explanation: 'Cụm danh từ: "give somebody/something instructions" (đưa ra chỉ dẫn/ra lệnh).'
        }
      ]
    },

    // =========================================================================
    // SECTION 3: COMMUNICATION & EVERYDAY ENGLISH
    // =========================================================================
    {
      id: 'sec-3',
      number: 3,
      title: 'Section 3: Communication & Everyday English (Tình huống giao tiếp)',
      shortTitle: 'Phần 3: Tình huống giao tiếp',
      shortLabel: 'Section 3',
      wordLimit: 'CHOOSE A, B, C OR D',
      maxWords: 1,
      instruction: 'Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best completes each of the following conversational exchanges.',
      content: `III. COMMUNICATION & EVERYDAY ENGLISH - TỔNG HỢP MẪU CÂU GIAO TIẾP LỚP 10...`,
      questions: [
        {
          id: 'sec3_q64',
          number: 64,
          question: 'Lan: "Nam, do you think family routines are necessary?" - Nam: "Yes. ______ each family should have some routines to help build strong family bonds."',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "I'm not sure that" },
            { letter: 'B', text: 'I strongly believe that' },
            { letter: 'C', text: 'I disagree that' },
            { letter: 'D', text: 'I hope that' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'I strongly believe that'],
          evidence: 'Nam bắt đầu bằng "Yes" để khẳng định sự tán thành mạnh mẽ.',
          explanation: 'Nam đồng tình rằng thói quen gia đình rất cần thiết, nên dùng "I strongly believe that" (Tôi tin tưởng chắc chắn rằng).'
        },
        {
          id: 'sec3_q65',
          number: 65,
          question: 'Lisa: "We should limit the use of plastic bags." - Jennie: "______. We can use paper bags instead."',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'I completely agree' },
            { letter: 'B', text: "It's not true" },
            { letter: 'C', text: "I don't quite agree" },
            { letter: 'D', text: "You're wrong" }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'I completely agree'],
          evidence: 'Jennie đề xuất giải pháp thay thế cụ thể: dùng túi giấy thay túi nilon.',
          explanation: 'Jennie đồng tình hoàn toàn với Lisa bằng cách bổ sung giải pháp thay thế tích cực: "I completely agree".'
        },
        {
          id: 'sec3_q66',
          number: 66,
          question: 'Ann: "Shall we do something together this weekend?" - Minh: "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Yes. I must go there.' },
            { letter: 'B', text: "No, thanks. I'm full." },
            { letter: 'C', text: 'Yes, we shall.' },
            { letter: 'D', text: "Sorry, I can't. I have to prepare for my exam." }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', "Sorry, I can't. I have to prepare for my exam."],
          evidence: 'Từ chối lời rủ rê một cách lịch sự bằng cách xin lỗi và đưa ra lý do cụ thể.',
          explanation: 'Khi từ chối lời mời của bạn bè, câu trả lời lịch sự nhất là xin lỗi và nêu rõ lý do bận rộn: "Sorry, I can\'t. I have to prepare for my exam."'
        },
        {
          id: 'sec3_q67',
          number: 67,
          question: '"Would you like to have a picnic with us on the weekend?" - "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "Yes, I'd love to." },
            { letter: 'B', text: "You're welcome." },
            { letter: 'C', text: 'Of course not.' },
            { letter: 'D', text: "It's my pleasure." }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', "Yes, I'd love to."],
          evidence: 'Đáp lại lời mời "Would you like...?" một cách nhiệt tình: "Yes, I\'d love to."',
          explanation: '"Yes, I\'d love to" (Vâng, mình rất muốn tham gia) là lời hồi đáp tiêu chuẩn cho cấu trúc lời mời Would you like...?'
        },
        {
          id: 'sec3_q68',
          number: 68,
          question: 'Mai: "Could you help me take out the rubbish, Peter?" - Peter: "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Sure, no problem at all.' },
            { letter: 'B', text: 'Never mind, thanks.' },
            { letter: 'C', text: "I'm sorry, you can't." },
            { letter: 'D', text: 'Yes, you can do it.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Sure, no problem at all.'],
          evidence: 'Đáp lại lời nhờ vả làm việc nhà một cách sẵn lòng: "Sure, no problem at all."',
          explanation: 'Peter đồng ý giúp đỡ Mai đổ rác bằng câu đáp lịch sự và sẵn sàng: "Sure, no problem at all."'
        },
        {
          id: 'sec3_q69',
          number: 69,
          question: 'Tom: "You gave a fantastic piano performance tonight!" - Mary: "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Thank you so much! I appreciate your kind words.' },
            { letter: 'B', text: 'Not at all, I did not practice.' },
            { letter: 'C', text: 'You must be joking, I was terrible.' },
            { letter: 'D', text: 'I do not care about your opinion.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Thank you so much! I appreciate your kind words.'],
          evidence: 'Đáp lại lời khen ngợi một cách nhã nhặn và cảm ơn chân thành.',
          explanation: 'Khi nhận được lời khen ngợi chân thành về màn trình diễn, đáp án phù hợp và chuẩn mực nhất là cảm ơn (A).'
        },
        {
          id: 'sec3_q70',
          number: 70,
          question: 'Nick: "How can we make our school environment cleaner?" - Sarah: "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "Why don't we set up more recycling bins in the school yard?" },
            { letter: 'B', text: "It's not our duty to clean the school." },
            { letter: 'C', text: "I don't know who is responsible." },
            { letter: 'D', text: "Let's leave all the appliances running." }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', "Why don't we set up more recycling bins in the school yard?"],
          evidence: 'Đưa ra giải pháp hữu ích cho môi trường học đường.',
          explanation: 'Sarah đưa ra giải pháp bảo vệ môi trường thiết thực bằng mẫu câu đề xuất "Why don\'t we...?"'
        },
        {
          id: 'sec3_q71',
          number: 71,
          question: 'Hoa: "Thank you for showing me how to sort household waste correctly." - Nam: "______"',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "You're welcome. It was my pleasure." },
            { letter: 'B', text: 'You should do it yourself next time.' },
            { letter: 'C', text: 'No problem, but it cost me money.' },
            { letter: 'D', text: "I don't think you can do it." }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', "You're welcome. It was my pleasure."],
          evidence: 'Đáp lại lời cảm ơn: You are welcome. It was my pleasure.',
          explanation: 'Đáp lại lời cảm ơn một cách thân thiện và khiêm tốn: "You\'re welcome. It was my pleasure."'
        }
      ]
    },

    // =========================================================================
    // SECTION 4: READING COMPREHENSION & CLOZE TEST (ALL 9 PASSAGES DETAILED)
    // =========================================================================
    {
      id: 'sec-4',
      number: 4,
      title: 'Section 4: Reading Comprehension & Cloze Test (Đọc hiểu & Điền từ đoạn văn)',
      shortTitle: 'Phần 4: Đọc hiểu & Điền từ',
      shortLabel: 'Section 4',
      wordLimit: 'CHOOSE A, B, OR C',
      maxWords: 1,
      instruction: 'Read each passage carefully and mark the letter A, B, or C on your answer sheet to indicate the correct word or answer for each question (Questions 72-116).',
      content: `IV. READING TEXTS - TỔNG HỢP CÁC BÀI ĐỌC HIỂU & ĐIỀN TỪ...`,
      parts: [
        // PART 1: 5 CLOZE TESTS
        {
          id: 'sec4_cloze_1',
          title: 'Passage 1.1: Basic Computer Skills for 21st-Century Students',
          badge: 'Bài điền từ 1.1',
          type: 'readingPassage',
          instruction: 'Mark the letter A, B, or C to indicate the word that best fits each of the numbered blanks (Questions 72-76 / Q21-25).',
          passageText: `What are the basic skills that (72) [21] ____________ child starting school should learn? For many centuries the obvious answer was reading, writing and arithmetic. Quite recently computer classes (ICT) have been made an obligatory part of national curriculums to teach students how to use basic programmes.

These days, (73) [22] ____________, more and more countries are starting to realise that to succeed in the twenty-first century pupils should be able to create their own software.

Some schools in the UK are planning to get rid of ICT lessons and replace them (74) [23] ____________ programming classes that would involve building websites, designing games and mobile phone apps. They hope that today's generation of children, who are already familiar with smartphones and practically living in the world of social media, will soon become the designers of the future.

(75) [24] ____________ authorities have no problem convincing students' parents that such skills are important. A recent survey shows that 94 percent of them believe that computer skills are (76) [25] ____________ for the job market. Examples of British teenagers who have managed to sell their apps to big corporations also help make the decision easy.`
        },
        {
          id: 'sec4_cloze_2',
          title: 'Passage 1.2: Plastic Pollution & Threats to Marine Ecosystems',
          badge: 'Bài điền từ 1.2',
          type: 'readingPassage',
          instruction: 'Mark the letter A, B, or C to indicate the word that best fits each of the numbered blanks (Questions 77-81 / Q21-25).',
          passageText: `Plastics which were produced from fossil fuels are just over a century old, (77) [21] ____________ they have revolutionized our life completely. The great advantages plastic offered led to a throwaway trend that made us discover plastic's dark side: the threat it (78) [22] ____________ to our environment and life. Plastic pollution is one of the main causes of marine species extinction, health problems for human beings and animals alike, and the destruction of our ecosystems. According to Greenpeace, more than 100,000 sea creatures and a million sea birds die every year after eating plastic or getting trapped (79) [23] ____________ plastic rubbish.

Every year, the world produces more than 380 million tons of plastic. In the next second while you're reading this paragraph, people around the globe will use more than 160,000 plastic bags and they'll throw away more than 20,000 plastic bottles. About 10% of plastic will be recycled, and some will go to landfills, but a lot of it will end up in the waterways and in the ocean. Experts estimate that there are 5.25 trillion pieces of plastic waste in the world's oceans.

Because plastic isn't biodegradable, it won't decompose (80) [24] ____________, so all the plastic we have now in the world will exist forever. Experts are warning that if we don't take urgent action, plastics in the ocean will outweigh fish by 2050. There are (81) [25] ____________ ways we can do to keep plastic out of the ocean. We can swap plastic bags for reusable ones, reduce the use of disposable food containers, and avoid plastic wrappings if possible. We can also join in clean-up campaigns.`
        },
        {
          id: 'sec4_cloze_3',
          title: 'Passage 1.3: Green Living & Sustainable Alternatives',
          badge: 'Bài điền từ 1.3',
          type: 'readingPassage',
          instruction: 'Mark the letter A, B, or C to indicate the word that best fits each of the numbered blanks (Questions 82-86 / Q21-25).',
          passageText: `The world is experiencing the negative impacts of climate change, largely due to our reliance (82) [21] ____________ fossil fuels and unsustainable habits. Green living offers a path to reduce these effects by adopting a more sustainable lifestyle (83) [22] ____________ is a necessary practice to ensure the health of our planet and future generations.

As you walk through the rooms of your home or visit your local market, you may notice (84) [23] ____________ increasing number of eco-friendly (85) [24] ____________ to traditional products and practices. From planting your own food in your yard to discovering the benefits of electric cars, there are a variety of ways for you to have a greener, more sustainable way of living.

Starting green living begins with becoming aware of your consumption habits, from the food you eat to the clothes you wear, and (86) [25] ____________ a conscious effort to reduce waste and choose eco-friendly options. Joining a community of individuals who share the same interests can provide inspiration, support, and practical tips for making sustainable choices.`
        },
        {
          id: 'sec4_cloze_4',
          title: 'Passage 1.4: Children\'s Perspectives on Chores at Home',
          badge: 'Bài điền từ 1.4',
          type: 'readingPassage',
          instruction: 'Mark the letter A, B, or C to indicate the word that best fits each of the numbered blanks (Questions 87-91 / Q21-25).',
          passageText: `How do you feel about chores? We all have them, and most children don't like doing them. They would rather do a free-time activity like playing a video game or going on a (87) [1] ____________. My opinion is different, and my friends don't understand me.

None of my friends likes (88) [2] ____________ chores. They try to find reasons not to do them. They say to their parents things like 'I have homework' or 'I need to help my friend with his homework'. Then they often text me and say, 'Let's go to the mall' or 'What about (89) [3] ____________ to the park to play football?'

I nearly always text back and say, 'No, thanks. I'm cleaning my bedroom' or 'Sorry, I can't. I'm helping my mother to do the washing.' They understand that I have chores, so they text me and say, 'I'm sorry. Maybe tomorrow.' Then I say, 'Don't (90) [4] ____________ sorry for me. I like doing chores!'

I love making my bed, and I love vacuuming and tidying my bedroom. I hate a messy or untidy room. My parents work hard, so I'm happy to help (91) [5] ____________ with the cooking, loading the dishwasher and doing the ironing.`
        },
        {
          id: 'sec4_cloze_5',
          title: "Passage 1.5: Sophia's Floating Home on a 20-Metre Boat",
          badge: 'Bài điền từ 1.5',
          type: 'readingPassage',
          instruction: 'Mark the letter A, B, or C to indicate the word that best fits each of the numbered blanks (Questions 92-96 / Q21-25).',
          passageText: `Unlike most teenagers who live in flats or houses, Sophia's home is a 20-metre boat. She has spent half of her life (92) [21] ____________ with her parents, who are both marine scientists. Sophia's unusual way of life means she regularly sees whales and gets to swim with dolphins. She also has friends in different countries. She does her schoolwork online and her studies are going well.

She can speak four languages and has been to many countries, so her (93) [22] ____________ of the world is greater than most children her age. Every day after studying, she helps do the (94) [23] ____________. She feels she has a duty to help her parents. She believes family life is more pleasant when everyone shares the household chores. She often cleans the floors, (95) [24] ____________ the table for meals and does the washing-up. She also cooks dinner, especially when her parents are too busy.

Life on board is sometimes (96) [25] ____________. Space is limited, so there are no wide-screen TVs or soft sofas. Bad weather can last for days, especially in winter. Storms at sea can be frightening. However, Sophia loves her boat and she feels safe on it.`
        },

        // PART 2: 4 READING COMPREHENSION PASSAGES
        {
          id: 'sec4_rc_1',
          title: 'Passage 2.1: Diversity of Family Units in Modern Society',
          badge: 'Bài đọc hiểu 2.1',
          type: 'readingPassage',
          instruction: 'Read the following passage and mark the letter A, B, or C on your answer sheet to indicate the correct answer to each question (Questions 97-101 / Q26-30).',
          passageText: `Family types vary in different countries and among different cultures. In Western, industrialized societies, the nuclear family ranks as the most common family type. It consists of a father, a mother and their children. But nuclear families exist together with many other types of family units. In the single-parent family, for example, a mother or a father heads the family alone. A blended family is formed when a divorced or widowed parent remarries. As divorce rates have risen, the number of single-parent and blended families has increased.

In many parts of the world, parents and children live together with other family members under the same roof. These complex families usually contain several generations of family members, including grandparents, parents and children. They may also include brothers or sisters and their families, uncles, aunts and cousins. Even when relatives do not live together, they still consider themselves members of the same extended family which includes grandparents, uncles, aunts and cousins.`
        },
        {
          id: 'sec4_rc_2',
          title: "Passage 2.3: Clara's Musical Family & The Pursuit of Passion",
          badge: 'Bài đọc hiểu 2.3',
          type: 'readingPassage',
          instruction: 'Read the following passage and mark the letter A, B, or C on your answer sheet to indicate the correct answer to each question (Questions 102-106 / Q26-30).',
          passageText: `My family is very musical, and my four brothers and sisters and I all play at least one instrument, including the piano, violin, cello and flute. My name's Clara, and I'm 15. My oldest brother is 22, and the baby of the family, my sister Jenny, is 12. I wanted to learn the double bass, too, which is a stringed instrument as big as me, but my parents said they couldn't get it in our minibus.

When we were younger, my parents spent all their time taking us to various music lessons and concerts. But it was worth it, because my older brother and sister got accepted into a famous national music academy. Music is my life, so I hope to go there, too. I've learned two pieces for their summer school entry competition. People who get into the summer school have a better chance of a place at the main academy later.

My parents are amazing, because it has been very expensive for them to support our dreams, and it has taken a lot of their time and effort. Sometimes we had to travel a very long way. They could only buy a very old minibus to transport all of us plus our instruments. We were driving to a concert once when it broke down. We had to travel the rest of the way in three separate taxis!

Our family is now quite famous. We won a TV talent competition as a group, and my sister played at a wedding for a very famous couple. We have just finished making our first album. That was great, because we all practiced together for once. Usually, we all go off to different concerts and festivals. My mum says she likes it best when we just play together at home, and it is the best thing for me, too, really.`
        },
        {
          id: 'sec4_rc_3',
          title: 'Passage 2.4: The Environmental Benefits of Green Living',
          badge: 'Bài đọc hiểu 2.4',
          type: 'readingPassage',
          instruction: 'Read the following passage and mark the letter A, B, or C on your answer sheet to indicate the correct answer to each question (Questions 107-111 / Q26-30).',
          passageText: `Many people go through life only thinking about their own well-being and that of those around them. In reality, the well-being of the environment is just as important in certain ways. Without a healthy and sustainable environment, their own health and ability to leave behind a sustainable planet to those who live after them is negatively affected. Therefore, two main environmental benefits can be realised with greener living.

Firstly, people can conserve natural resources. The natural resources that man has been enjoying are beginning to disappear. Due to population growth, it is estimated that the use of natural resources has more than tripled since 1970. At that rate, it is not difficult to see how these same resources will eventually become depleted. It is important to conserve those precious resources so that others after this generation can enjoy the same quality of living on this planet.

Secondly, people can reduce the harmful effects of climate change. Primarily due to human's reliance on fossil fuels over the years, climate change is a real concern. People continue to release carbon dioxide into the atmosphere, further polluting the air. This is leading to dramatic changes in temperatures that need to be stopped. Greener living aims to do exactly that. For every person who makes an effort to reduce his or her carbon footprint in the world, climate change can begin to become less of a concern over time.`
        },
        {
          id: 'sec4_rc_4',
          title: 'Passage 2.5: The Plastic Crisis in Our Oceans & Community Action',
          badge: 'Bài đọc hiểu 2.5',
          type: 'readingPassage',
          instruction: 'Read the following passage and mark the letter A, B, or C on your answer sheet to indicate the correct answer to each question (Questions 112-116 / Q26-30).',
          passageText: `Plastics which were produced from fossil fuels are just over a century old, but they have revolutionized our life completely. The great advantages plastic offered led to a throwaway trend that made us discover plastic's dark side: the threat it poses to our environment and life. Plastic pollution is one of the main causes of marine species extinction, health problems for human beings and animals alike, and the destruction of our ecosystems. According to Greenpeace, more than 100,000 sea creatures and a million sea birds die every year after eating plastic or getting trapped in plastic rubbish.

Every year, the world produces more than 380 million tonnes of plastic. In the next second while you're reading this paragraph, people around the globe will use more than 160,000 plastic bags and they'll throw away more than 20,000 plastic bottles. About 10% of plastic will be recycled, and some will go to landfills, but a lot of it will end up in the waterways and eventually in the ocean. Experts estimate that there are already 5.25 trillion pieces of plastic waste in the world's oceans. Because plastic isn't biodegradable, it won't decompose naturally, so all the plastic that we have now in the world will exist forever.

Experts are warning that if we don't take urgent action, plastics in the ocean will outweigh fish by 2050. There are many ways we can do to keep plastic out of the ocean. We can swap plastic bags for reusable ones which are made of cloth or fiber, reduce the use of disposable cutlery as well as food containers, and avoid plastic wrappings if possible. We can also join in clean-up campaigns in your local community. Every little helps!`
        }
      ],
      questions: [
        // Cloze 1.1 (Questions 72 - 76)
        {
          id: 'sec4_q72',
          number: 72,
          partId: 'sec4_cloze_1',
          question: 'Passage 1.1 (Question 21): What are the basic skills that ______ child starting school should learn?',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'some' },
            { letter: 'B', text: 'all' },
            { letter: 'C', text: 'any' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'any'],
          evidence: '"any child starting school": bất kì đứa trẻ nào khi bắt đầu đi học.',
          explanation: '"child" là danh từ đếm được số ít, đứng sau "any" mang ý nghĩa "bất kì đứa trẻ nào".'
        },
        {
          id: 'sec4_q73',
          number: 73,
          partId: 'sec4_cloze_1',
          question: 'Passage 1.1 (Question 22): These days, ______, more and more countries are starting to realise...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'although' },
            { letter: 'B', text: 'however' },
            { letter: 'C', text: 'despite' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'however'],
          evidence: 'Đứng giữa hai dấu phẩy thể hiện sự đối lập giữa quá khứ và hiện nay.',
          explanation: '"however" là trạng từ liên kết đứng giữa hai dấu phẩy để nối ý tương phản.'
        },
        {
          id: 'sec4_q74',
          number: 74,
          partId: 'sec4_cloze_1',
          question: 'Passage 1.1 (Question 23): ...replace them ______ programming classes that would involve building websites...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'with' },
            { letter: 'B', text: 'for' },
            { letter: 'C', text: 'from' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'with'],
          evidence: 'replace A with B = thay thế cái gì bằng cái gì.',
          explanation: 'Cấu trúc động từ: "replace something with something".'
        },
        {
          id: 'sec4_q75',
          number: 75,
          partId: 'sec4_cloze_1',
          question: "Passage 1.1 (Question 24): ______ authorities have no problem convincing students' parents...",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'education' },
            { letter: 'B', text: 'educational' },
            { letter: 'C', text: 'educate' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'educational'],
          evidence: 'educational authorities = các cơ quan/nhà chức trách ngành giáo dục.',
          explanation: 'Trước danh từ "authorities" cần một tính từ "educational" để bổ nghĩa.'
        },
        {
          id: 'sec4_q76',
          number: 76,
          partId: 'sec4_cloze_1',
          question: 'Passage 1.1 (Question 25): ...believe that computer skills are ______ for the job market.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'unnecessary' },
            { letter: 'B', text: 'essential' },
            { letter: 'C', text: 'modern' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'essential'],
          evidence: 'essential for the job market = thiết yếu/sống còn đối với thị trường việc làm.',
          explanation: '"essential" (cần thiết, thiết yếu) phù hợp nhất về mặt ngữ nghĩa và đi với giới từ "for".'
        },

        // Cloze 1.2 (Questions 77 - 81)
        {
          id: 'sec4_q77',
          number: 77,
          partId: 'sec4_cloze_2',
          question: 'Passage 1.2 (Question 21): Plastics were produced just over a century old, ______ they have revolutionized our life completely.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'but' },
            { letter: 'B', text: 'and' },
            { letter: 'C', text: 'so' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'but'],
          evidence: 'Chỉ mới hơn một thế kỷ tuổi NHƯNG đã làm thay đổi hoàn toàn cuộc sống.',
          explanation: 'Liên từ "but" diễn tả sự đối lập giữa tuổi đời ngắn ngủi của nhựa và tác động to lớn của nó.'
        },
        {
          id: 'sec4_q78',
          number: 78,
          partId: 'sec4_cloze_2',
          question: 'Passage 1.2 (Question 22): ...the threat it ______ to our environment and life.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'poses' },
            { letter: 'B', text: 'puts' },
            { letter: 'C', text: 'pushes' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'poses'],
          evidence: 'pose a threat to = đặt ra/gây ra mối đe dọa đối với.',
          explanation: 'Collocation: "pose a threat to something" (gây ra mối đe dọa cho).'
        },
        {
          id: 'sec4_q79',
          number: 79,
          partId: 'sec4_cloze_2',
          question: 'Passage 1.2 (Question 23): ...after eating plastic or getting trapped ______ plastic rubbish.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'in' },
            { letter: 'B', text: 'for' },
            { letter: 'C', text: 'from' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'in'],
          evidence: 'get trapped in = bị mắc kẹt vào trong rác thải nhựa.',
          explanation: 'Cụm từ: "get trapped in something" (bị mắc kẹt trong cái gì).'
        },
        {
          id: 'sec4_q80',
          number: 80,
          partId: 'sec4_cloze_2',
          question: "Passage 1.2 (Question 24): Because plastic isn't biodegradable, it won't decompose ______...",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'naturally' },
            { letter: 'B', text: 'natural' },
            { letter: 'C', text: 'nature' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'naturally'],
          evidence: 'decompose naturally: phân hủy một cách tự nhiên.',
          explanation: 'Bổ nghĩa cho động từ "decompose" cần dùng trạng từ thể cách "naturally".'
        },
        {
          id: 'sec4_q81',
          number: 81,
          partId: 'sec4_cloze_2',
          question: 'Passage 1.2 (Question 25): There are ______ ways we can do to keep plastic out of the ocean.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'many' },
            { letter: 'B', text: 'much' },
            { letter: 'C', text: 'any' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'many'],
          evidence: 'ways là danh từ đếm được số nhiều ➔ many ways.',
          explanation: '"ways" là danh từ đếm được số nhiều nên dùng "many".'
        },

        // Cloze 1.3 (Questions 82 - 86)
        {
          id: 'sec4_q82',
          number: 82,
          partId: 'sec4_cloze_3',
          question: 'Passage 1.3 (Question 21): ...largely due to our reliance ______ fossil fuels and unsustainable habits.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'in' },
            { letter: 'B', text: 'on' },
            { letter: 'C', text: 'from' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'on'],
          evidence: 'reliance on = sự phụ thuộc vào cái gì.',
          explanation: 'Giới từ đi với danh từ "reliance" là "on" (reliance on sth).'
        },
        {
          id: 'sec4_q83',
          number: 83,
          partId: 'sec4_cloze_3',
          question: 'Passage 1.3 (Question 22): ...by adopting a more sustainable lifestyle ______ is a necessary practice...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'when' },
            { letter: 'B', text: 'who' },
            { letter: 'C', text: 'which' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'which'],
          evidence: 'lifestyle which is a necessary practice (đại từ quan hệ thay thế cho danh từ chỉ vật)',
          explanation: 'Cần đại từ quan hệ "which" thay thế cho "a more sustainable lifestyle".'
        },
        {
          id: 'sec4_q84',
          number: 84,
          partId: 'sec4_cloze_3',
          question: 'Passage 1.3 (Question 23): ...you may notice ______ increasing number of eco-friendly...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'an' },
            { letter: 'B', text: 'the' },
            { letter: 'C', text: 'a' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'an'],
          evidence: 'an increasing number of = số lượng ngày càng gia tăng của cái gì.',
          explanation: 'Cụm từ "an increasing number of"; từ "increasing" bắt đầu bằng nguyên âm /ɪ/ nên dùng "an".'
        },
        {
          id: 'sec4_q85',
          number: 85,
          partId: 'sec4_cloze_3',
          question: 'Passage 1.3 (Question 24): ...increasing number of eco-friendly ______ to traditional products...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'living' },
            { letter: 'B', text: 'energy' },
            { letter: 'C', text: 'alternatives' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'alternatives'],
          evidence: 'alternatives to traditional products = các giải pháp/sản phẩm thay thế cho sản phẩm truyền thống.',
          explanation: '"alternatives to something" mang nghĩa các phương án, sản phẩm thay thế.'
        },
        {
          id: 'sec4_q86',
          number: 86,
          partId: 'sec4_cloze_3',
          question: 'Passage 1.3 (Question 25): ...from the food you eat to the clothes you wear, and ______ a conscious effort...',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'getting' },
            { letter: 'B', text: 'taking' },
            { letter: 'C', text: 'making' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'making'],
          evidence: 'make an effort = nỗ lực cố gắng; song song với "becoming aware ... and making".',
          explanation: 'Collocation: "make an effort" (nỗ lực làm gì).'
        },

        // Cloze 1.4 (Questions 87 - 91)
        {
          id: 'sec4_q87',
          number: 87,
          partId: 'sec4_cloze_4',
          question: 'Passage 1.4 (Question 21): They would rather do a free-time activity like playing a video game or going on a ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'meal' },
            { letter: 'B', text: 'picnic' },
            { letter: 'C', text: 'food' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'picnic'],
          evidence: 'go on a picnic = đi dã ngoại.',
          explanation: 'Cụm từ cố định chỉ hoạt động giải trí: "go on a picnic".'
        },
        {
          id: 'sec4_q88',
          number: 88,
          partId: 'sec4_cloze_4',
          question: 'Passage 1.4 (Question 22): None of my friends likes ______ chores.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'working' },
            { letter: 'B', text: 'making' },
            { letter: 'C', text: 'doing' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'doing'],
          evidence: 'do chores = làm việc nhà; sau likes dùng V-ing.',
          explanation: 'Cụm từ: "do chores" ➔ "likes doing chores".'
        },
        {
          id: 'sec4_q89',
          number: 89,
          partId: 'sec4_cloze_4',
          question: "Passage 1.4 (Question 23): What about ______ to the park to play football?",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'go' },
            { letter: 'B', text: 'gone' },
            { letter: 'C', text: 'going' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'going'],
          evidence: 'What about + V-ing? = Thế còn việc ... thì sao?',
          explanation: 'Cấu trúc đề xuất gợi ý: "What about / How about + V-ing?".'
        },
        {
          id: 'sec4_q90',
          number: 90,
          partId: 'sec4_cloze_4',
          question: "Passage 1.4 (Question 24): Then I say, 'Don't ______ sorry for me. I like doing chores!'",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'be' },
            { letter: 'B', text: 'to be' },
            { letter: 'C', text: 'being' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'be'],
          evidence: "Don't + V_bare (Don't be sorry).",
          explanation: 'Câu mệnh lệnh phủ định: "Don\'t + V nguyên mẫu" ➔ "Don\'t be sorry".'
        },
        {
          id: 'sec4_q91',
          number: 91,
          partId: 'sec4_cloze_4',
          question: "Passage 1.4 (Question 25): My parents work hard, so I'm happy to help ______ with the cooking...",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'him' },
            { letter: 'B', text: 'her' },
            { letter: 'C', text: 'them' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'them'],
          evidence: 'help parents (số nhiều) ➔ tân ngữ them.',
          explanation: 'Đại từ tân ngữ "them" thay thế cho danh từ số nhiều "my parents".'
        },

        // Cloze 1.5 (Questions 92 - 96)
        {
          id: 'sec4_q92',
          number: 92,
          partId: 'sec4_cloze_5',
          question: 'Passage 1.5 (Question 21): She has spent half of her life ______ with her parents, who are both marine scientists.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'sail' },
            { letter: 'B', text: 'sailing' },
            { letter: 'C', text: 'to sail' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'sailing'],
          evidence: 'spend time + V-ing = dành thời gian làm việc gì.',
          explanation: 'Cấu trúc: "spend + time + V-ing" ➔ "spent half of her life sailing".'
        },
        {
          id: 'sec4_q93',
          number: 93,
          partId: 'sec4_cloze_5',
          question: 'Passage 1.5 (Question 22): ...so her ______ of the world is greater than most children her age.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'education' },
            { letter: 'B', text: 'advice' },
            { letter: 'C', text: 'knowledge' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'knowledge'],
          evidence: 'knowledge of the world = vốn hiểu biết/kiến thức về thế giới xung quanh.',
          explanation: '"knowledge of the world" chỉ vốn sống và tri thức về thế giới rộng lớn.'
        },
        {
          id: 'sec4_q94',
          number: 94,
          partId: 'sec4_cloze_5',
          question: 'Passage 1.5 (Question 23): Every day after studying, she helps do the ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'housework' },
            { letter: 'B', text: 'household' },
            { letter: 'C', text: 'homework' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'housework'],
          evidence: 'do the housework = làm việc nhà.',
          explanation: 'Cụm từ: "do the housework" (làm việc nhà, dọn dẹp).'
        },
        {
          id: 'sec4_q95',
          number: 95,
          partId: 'sec4_cloze_5',
          question: 'Passage 1.5 (Question 24): She often cleans the floors, ______ the table for meals and does the washing-up.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'makes' },
            { letter: 'B', text: 'does' },
            { letter: 'C', text: 'sets' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'sets'],
          evidence: 'set the table for meals = chuẩn bị/bày biện bàn ăn.',
          explanation: 'Collocation: "set the table" (dọn/bày bàn ăn trước bữa cơm).'
        },
        {
          id: 'sec4_q96',
          number: 96,
          partId: 'sec4_cloze_5',
          question: 'Passage 1.5 (Question 25): Life on board is sometimes ______. Space is limited, so there are no wide-screen TVs or soft sofas.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'convenient' },
            { letter: 'B', text: 'uncomfortable' },
            { letter: 'C', text: 'relaxing' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'uncomfortable'],
          evidence: 'Không gian chật hẹp, thiếu tiện nghi, bão biển dữ dội ➔ cuộc sống đôi khi bất tiện/không thoải mái.',
          explanation: '"uncomfortable" (không thoải mái, bất tiện) phù hợp với bối cảnh không gian chật hẹp trên thuyền.'
        },

        // Reading Comprehension 2.1 (Questions 97 - 101)
        {
          id: 'sec4_q97',
          number: 97,
          partId: 'sec4_rc_1',
          question: 'Passage 2.1 (Question 26): The nuclear family ranks as the most common family type ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'in many industrialized countries' },
            { letter: 'B', text: 'in countries with nuclear weapons' },
            { letter: 'C', text: 'that consists of more than two generations' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'in many industrialized countries'],
          evidence: 'In Western, industrialized societies, the nuclear family ranks as the most common family type.',
          explanation: 'Đoạn 1 nêu rõ gia đình hạt nhân là mô hình phổ biến nhất tại các xã hội phương Tây công nghiệp hóa.'
        },
        {
          id: 'sec4_q98',
          number: 98,
          partId: 'sec4_rc_1',
          question: 'Passage 2.1 (Question 27): In the single-parent family, ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'there are often no children' },
            { letter: 'B', text: 'only one parent lives with his or her child or children' },
            { letter: 'C', text: 'the number of blended children has increased' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'only one parent lives with his or her child or children'],
          evidence: 'In the single-parent family, for example, a mother or a father heads the family alone.',
          explanation: 'Gia đình đơn thân là mô hình chỉ có một cha hoặc một mẹ một mình nuôi con.'
        },
        {
          id: 'sec4_q99',
          number: 99,
          partId: 'sec4_rc_1',
          question: 'Passage 2.1 (Question 28): Grandparents, parents and children are mentioned as ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'the three typical generations of an extended family' },
            { letter: 'B', text: 'three branches of a family tree' },
            { letter: 'C', text: 'the closest and happiest relatives in family units' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'the three typical generations of an extended family'],
          evidence: 'These complex families usually contain several generations of family members, including grandparents, parents and children.',
          explanation: 'Ông bà, cha mẹ và con cái đại diện cho 3 thế hệ điển hình cùng chung sống trong một đại gia đình (extended family).'
        },
        {
          id: 'sec4_q100',
          number: 100,
          partId: 'sec4_rc_1',
          question: 'Passage 2.1 (Question 29): The second paragraph is about ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'American culture' },
            { letter: 'B', text: 'relatives and family members' },
            { letter: 'C', text: 'the extended family' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'the extended family'],
          evidence: 'Toàn bộ đoạn 2 tập trung giải thích cấu trúc và thành viên của đại gia đình (extended family).',
          explanation: 'Đoạn văn thứ hai tập trung phân tích mô hình gia đình mở rộng/đại gia đình (the extended family).'
        },
        {
          id: 'sec4_q101',
          number: 101,
          partId: 'sec4_rc_1',
          question: 'Passage 2.1 (Question 30): The word "blended" in paragraph 1 is closest in meaning to ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'complex' },
            { letter: 'B', text: 'married' },
            { letter: 'C', text: 'mixed' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'mixed'],
          evidence: 'A blended family is formed when a divorced or widowed parent remarries (gia đình pha trộn/tái hôn).',
          explanation: '"blended family" là gia đình hòa trộn/tái hôn (có con chung, con riêng) ➔ gần nghĩa nhất với "mixed".'
        },

        // Reading Comprehension 2.3 (Questions 102 - 106)
        {
          id: 'sec4_q102',
          number: 102,
          partId: 'sec4_rc_2',
          question: "Passage 2.3 (Question 26): In Clara's family, ______.",
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'There are five children.' },
            { letter: 'B', text: 'There is only one girl.' },
            { letter: 'C', text: 'The children all play four instruments' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'There are five children.'],
          evidence: 'my four brothers and sisters and I = 4 anh chị em cộng với Clara = 5 người con.',
          explanation: 'Clara có 4 anh chị em cộng thêm bản thân cô ➔ tổng cộng gia đình có 5 người con.'
        },
        {
          id: 'sec4_q103',
          number: 103,
          partId: 'sec4_rc_2',
          question: 'Passage 2.3 (Question 27): Why does Clara want to go to the summer school?',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: "Because she is more likely to get into the main academy when she's older." },
            { letter: 'B', text: 'Because her brother and sister go there already.' },
            { letter: 'C', text: "Because her parents don't want to drive her to music lessons in the summer." }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', "Because she is more likely to get into the main academy when she's older."],
          evidence: 'People who get into the summer school have a better chance of a place at the main academy later.',
          explanation: 'Đoạn 2 nêu rõ tham gia khóa học hè giúp học viên có cơ hội lớn hơn để được nhận vào học viện âm nhạc chính thức sau này.'
        },
        {
          id: 'sec4_q104',
          number: 104,
          partId: 'sec4_rc_2',
          question: 'Passage 2.3 (Question 28): Why does Clara think her parents are amazing?',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'They paid for taxis to music concerts.' },
            { letter: 'B', text: "It took a lot of effort, time, and money for the family's musical education." },
            { letter: 'C', text: 'They bought an old minibus so they had more money to pay for lessons.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', "It took a lot of effort, time, and money for the family's musical education."],
          evidence: 'My parents are amazing, because it has been very expensive for them to support our dreams, and it has taken a lot of their time and effort.',
          explanation: 'Clara khâm phục bố mẹ vì họ đã hy sinh rất nhiều công sức, thời gian và tiền bạc để ủng hộ ước mơ âm nhạc của các con.'
        },
        {
          id: 'sec4_q105',
          number: 105,
          partId: 'sec4_rc_2',
          question: 'Passage 2.3 (Question 29): Clara is happiest when she is ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'playing for famous people.' },
            { letter: 'B', text: 'traveling around and playing in concert halls.' },
            { letter: 'C', text: 'playing with her brothers and sisters with no audience.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'playing with her brothers and sisters with no audience.'],
          evidence: 'My mum says she likes it best when we just play together at home, and it is the best thing for me, too, really.',
          explanation: 'Clara cảm thấy hạnh phúc nhất khi mấy anh chị em chỉ chơi nhạc cùng nhau tại nhà mà không cần khán giả.'
        },
        {
          id: 'sec4_q106',
          number: 106,
          partId: 'sec4_rc_2',
          question: 'Passage 2.3 (Question 30): The word "famous" in paragraph 4 is closest in meaning to ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'well-known' },
            { letter: 'B', text: 'ordinary' },
            { letter: 'C', text: 'unknown' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'well-known'],
          evidence: 'famous = well-known = nổi tiếng.',
          explanation: '"famous" (nổi tiếng) đồng nghĩa với "well-known".'
        },

        // Reading Comprehension 2.4 (Questions 107 - 111)
        {
          id: 'sec4_q107',
          number: 107,
          partId: 'sec4_rc_3',
          question: 'Passage 2.4 (Question 26): Which of the following can be the best title for the passage?',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'Natural Resources' },
            { letter: 'B', text: 'The Benefits of Green Living' },
            { letter: 'C', text: 'The Effects of Climate Change' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'The Benefits of Green Living'],
          evidence: '...two main environmental benefits can be realised with greener living (bảo tồn tài nguyên và giảm biến đổi khí hậu).',
          explanation: 'Tiêu đề bao quát toàn diện nhất của bài đọc là "The Benefits of Green Living" (Những lợi ích của lối sống xanh).'
        },
        {
          id: 'sec4_q108',
          number: 108,
          partId: 'sec4_rc_3',
          question: 'Passage 2.4 (Question 27): The word "depleted" in paragraph 2 is CLOSEST in meaning to ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'run out' },
            { letter: 'B', text: 'picked up' },
            { letter: 'C', text: 'filled in' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'run out'],
          evidence: 'depleted = cạn kiệt, cạn sạch tài nguyên ➔ run out.',
          explanation: '"depleted" nghĩa là bị cạn kiệt, đồng nghĩa với phrasal verb "run out".'
        },
        {
          id: 'sec4_q109',
          number: 109,
          partId: 'sec4_rc_3',
          question: 'Passage 2.4 (Question 28): The word "This" in paragraph 3 refers to ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'the activity of releasing carbon dioxide and causing air pollution' },
            { letter: 'B', text: 'the harmful effect of climate change' },
            { letter: 'C', text: 'the reliance on fossil fuels' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'the activity of releasing carbon dioxide and causing air pollution'],
          evidence: 'People continue to release carbon dioxide into the atmosphere, further polluting the air. This is leading to dramatic changes...',
          explanation: '"This" thay thế cho hành vi tiếp tục xả CO2 vào bầu khí quyển làm ô nhiễm không khí ở câu liền trước.'
        },
        {
          id: 'sec4_q110',
          number: 110,
          partId: 'sec4_rc_3',
          question: 'Passage 2.4 (Question 29): According to paragraph 2, natural resources ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'are not precious to human on Earth' },
            { letter: 'B', text: 'are hard to be conserved' },
            { letter: 'C', text: 'have been used more and more since 1970s' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'have been used more and more since 1970s'],
          evidence: '...it is estimated that the use of natural resources has more than tripled since 1970.',
          explanation: 'Đoạn 2 nêu rõ mức tiêu thụ tài nguyên thiên nhiên đã tăng hơn gấp ba lần kể từ năm 1970.'
        },
        {
          id: 'sec4_q111',
          number: 111,
          partId: 'sec4_rc_3',
          question: 'Passage 2.4 (Question 30): Which of the following is NOT TRUE according to the passage?',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'The well-being of the environment is as important as that of each person' },
            { letter: 'B', text: 'Climate change is a problem because of the reliance on fossil fuels' },
            { letter: 'C', text: 'Climate change can only be stopped by actions of governments' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'Climate change can only be stopped by actions of governments'],
          evidence: 'For every person who makes an effort to reduce his or her carbon footprint, climate change can begin to become less of a concern.',
          explanation: 'Bài viết khẳng định nỗ lực giảm dấu chân carbon của từng cá nhân đều tạo ra thay đổi, do đó tuyên bố "chỉ có chính phủ mới ngăn được" là SAI.'
        },

        // Reading Comprehension 2.5 (Questions 112 - 116)
        {
          id: 'sec4_q112',
          number: 112,
          partId: 'sec4_rc_4',
          question: 'Passage 2.5 (Question 26): The word "poses" in the first paragraph is closest in meaning to ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'creates' },
            { letter: 'B', text: 'impresses' },
            { letter: 'C', text: 'damages' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'creates'],
          evidence: 'pose a threat = create a threat = tạo ra / gây ra mối đe dọa.',
          explanation: '"poses a threat" đồng nghĩa với "creates a threat" (gây ra nguy cơ, đe dọa).'
        },
        {
          id: 'sec4_q113',
          number: 113,
          partId: 'sec4_rc_4',
          question: 'Passage 2.5 (Question 27): According to paragraph 1, plastic pollution ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'affects the fishing industry' },
            { letter: 'B', text: 'causes health problems for human beings and animals' },
            { letter: 'C', text: 'traps the entire solar system' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'causes health problems for human beings and animals'],
          evidence: 'Plastic pollution is one of the main causes of marine species extinction, health problems for human beings and animals alike...',
          explanation: 'Đoạn 1 khẳng định ô nhiễm nhựa là nguyên nhân trực tiếp gây ra các vấn đề sức khỏe cho cả con người và động vật.'
        },
        {
          id: 'sec4_q114',
          number: 114,
          partId: 'sec4_rc_4',
          question: 'Passage 2.5 (Question 28): Around the world, people get rid of ______ per second.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: '5.25 trillion pieces of plastic' },
            { letter: 'B', text: '380 million tonnes of plastic' },
            { letter: 'C', text: '20,000 plastic bottles' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', '20,000 plastic bottles'],
          evidence: "In the next second while you're reading this paragraph, people around the globe will throw away more than 20,000 plastic bottles.",
          explanation: 'Đoạn 2 nêu rõ mỗi giây trôi qua, con người trên toàn cầu vứt bỏ hơn 20.000 chai nhựa.'
        },
        {
          id: 'sec4_q115',
          number: 115,
          partId: 'sec4_rc_4',
          question: 'Passage 2.5 (Question 29): Plastic rubbish in the ocean ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'will decompose in a million years' },
            { letter: 'B', text: 'will disappear naturally over time' },
            { letter: 'C', text: 'might be more common than fish by 2050' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'might be more common than fish by 2050'],
          evidence: 'Experts are warning that if we don\'t take urgent action, plastics in the ocean will outweigh fish by 2050.',
          explanation: 'Các chuyên gia cảnh báo nếu không hành động khẩn cấp, lượng rác nhựa trong đại dương sẽ nặng hơn cả cá vào năm 2050.'
        },
        {
          id: 'sec4_q116',
          number: 116,
          partId: 'sec4_rc_4',
          question: 'Passage 2.5 (Question 30): All of the following statements are possible solutions to ocean plastic pollution EXCEPT ______.',
          placeholder: 'Chọn A, B, hoặc C...',
          options: [
            { letter: 'A', text: 'Reduce your own use of single-use plastics.' },
            { letter: 'B', text: 'Participate in a beach or river clean-up.' },
            { letter: 'C', text: 'Make your own cutlery and food containers.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'Make your own cutlery and food containers.'],
          evidence: 'Bài đọc khuyên giảm đồ dùng một lần và tham gia dọn rác; không khuyên tự sản xuất dao nĩa hay hộp thực phẩm.',
          explanation: 'Bài viết không đề cập đến việc người dân tự chế tạo dao nĩa hay hộp thức ăn tại nhà (C).'
        }
      ]
    },

    // =========================================================================
    // SECTION 5: WRITING & SENTENCE TRANSFORMATION
    // =========================================================================
    {
      id: 'sec-5',
      number: 5,
      title: 'Section 5: Writing & Sentence Transformation (Sắp xếp, viết lại câu & Đoạn văn)',
      shortTitle: 'Phần 5: Viết & Chuyển đổi câu',
      shortLabel: 'Section 5',
      wordLimit: 'SENTENCE TRANSFORMATION',
      maxWords: 20,
      instruction: 'Complete Part 1 by choosing the correct sentence order (Questions 117-130), Part 2 by rewriting the sentences as instructed (Questions 131-145), and review the guided paragraph writing models in Part 3 (Questions 146-148).',
      content: `V. WRITING GUIDE - HƯỚNG DẪN VIẾT CÂU & ĐOẠN VĂN GIỮA KÌ I...`,
      parts: [
        {
          id: 'sec5_part1',
          title: 'Part 1. Sentence Arrangement (Sắp xếp cụm từ thành câu hoàn chỉnh)',
          badge: 'Sắp xếp trật tự từ',
          instruction: 'Choose the best answer A, B, C or D to rearrange the words into a correct meaningful sentence.'
        },
        {
          id: 'sec5_part2',
          title: 'Part 2. Sentence Transformation (Viết lại câu theo gợi ý)',
          badge: 'Viết lại câu',
          instruction: 'Rewrite the sentences using passive voice or compound conjunctions as guided in the prompt.'
        },
        {
          id: 'sec5_part3',
          title: 'Part 3. Paragraph Writing (Viết đoạn văn ngắn 60 - 80 từ)',
          badge: 'Viết đoạn văn',
          instruction: 'Write a paragraph of about 60-80 words based on the following cues. Review the model essays and scoring breakdown.'
        }
      ],
      questions: [
        // Sentence arrangement (Questions 117 - 130)
        {
          id: 'sec5_q117',
          number: 117,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: It is important / to learn / some life skills / at home/ for children /',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'It important for children to learn some life skills at home.' },
            { letter: 'B', text: "It's important for children some life skills to learn at home." },
            { letter: 'C', text: 'It important children for to learn some life skills at home.' },
            { letter: 'D', text: 'It is important for children to learn some life skills at home.' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'It is important for children to learn some life skills at home.'],
          evidence: 'Cấu trúc: It is + adj + for sb + to V.',
          explanation: 'Mẫu câu chuẩn: It is important for children to learn some life skills at home.'
        },
        {
          id: 'sec5_q118',
          number: 118,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: You should buy/ harmful chemicals/ does not contain/ organic food/ because',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'You should buy organic food because it does not contain harmful chemicals.' },
            { letter: 'B', text: 'You should buy harmful chemicals because organic food does not contain them.' },
            { letter: 'C', text: 'Because harmful chemicals does not contain organic food, you should buy it.' },
            { letter: 'D', text: 'You should buy organic food because harmful chemicals does not contain it.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'You should buy organic food because it does not contain harmful chemicals.'],
          evidence: 'You should buy organic food because it does not contain harmful chemicals.',
          explanation: 'Trật tự nghĩa hợp lý: Bạn nên mua thực phẩm hữu cơ vì nó không chứa hóa chất độc hại.'
        },
        {
          id: 'sec5_q119',
          number: 119,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: he was 30./ He / started / to become / a famous composer / when /',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'He started to become a famous composer when he was 30.' },
            { letter: 'B', text: 'He started when he was 30 to become a famous composer.' },
            { letter: 'C', text: 'He started to become a famous composer, he was 30 when.' },
            { letter: 'D', text: 'He to become a famous composer when he was started 30.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'He started to become a famous composer when he was 30.'],
          evidence: 'He started to become a famous composer when he was 30.',
          explanation: 'Trật tự đúng: He started to become a famous composer when he was 30.'
        },
        {
          id: 'sec5_q120',
          number: 120,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: yesterday./ She asked him / the school performance/ take part in/ to /',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'She asked him take part in the school performance yesterday.' },
            { letter: 'B', text: 'She asked him to take part in performance the school yesterday.' },
            { letter: 'C', text: 'She asked him to take part in the school performance yesterday.' },
            { letter: 'D', text: 'She asked him taking part in performance the school yesterday.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'She asked him to take part in the school performance yesterday.'],
          evidence: 'Cấu trúc: ask sb to V = yêu cầu/nhờ ai làm gì.',
          explanation: 'She asked him to take part in the school performance yesterday.'
        },
        {
          id: 'sec5_q121',
          number: 121,
          partId: 'sec5_part1',
          question: "Arrange the words to make a complete sentence: in use. You shouldn't leave/ when they are not/ on/ the household appliances/",
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "You shouldn't leave the household appliances on when they are not in use." },
            { letter: 'B', text: "You shouldn't leave on the household appliances when they are not in use." },
            { letter: 'C', text: "You shouldn't leave the household appliances when they are not in use on." },
            { letter: 'D', text: "You shouldn't to leave the household appliances when they are not in use on." }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', "You shouldn't leave the household appliances on when they are not in use."],
          evidence: 'leave + object + on = để thiết bị tiếp tục bật/hoạt động.',
          explanation: "You shouldn't leave the household appliances on when they are not in use."
        },
        {
          id: 'sec5_q122',
          number: 122,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: is cleaned/ The house/ /every weekend./ by my mom /',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'The house by my mom is cleaned every weekend.' },
            { letter: 'B', text: 'The house is cleaned by my mom every weekend.' },
            { letter: 'C', text: 'The house is cleaned every by my mom weekend.' },
            { letter: 'D', text: 'The house is cleaned by every weekend my mom.' }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', 'The house is cleaned by my mom every weekend.'],
          evidence: 'Bị động hiện tại đơn: S + is/are + V3 + by O + time phrase.',
          explanation: 'The house is cleaned by my mom every weekend.'
        },
        {
          id: 'sec5_q123',
          number: 123,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: Family time / when / do / is / things / family members / together',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Family time is when family members do things together.' },
            { letter: 'B', text: 'Family time when is members family do together things.' },
            { letter: 'C', text: 'Family members do together things is when family time.' },
            { letter: 'D', text: 'When family time is family members do things together.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Family time is when family members do things together.'],
          evidence: 'Family time is when family members do things together.',
          explanation: 'Family time is when family members do things together (Giờ sinh hoạt gia đình là khi mọi người làm việc cùng nhau).'
        },
        {
          id: 'sec5_q124',
          number: 124,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: provides shade / Planting trees / the environment / look beautiful / and/makes',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Planting trees provides shade and makes the environment look beautiful.' },
            { letter: 'B', text: 'Planting trees shade provides and the environment makes look beautiful.' },
            { letter: 'C', text: 'Provides shade and makes planting trees look beautiful the environment.' },
            { letter: 'D', text: 'Shade provides planting trees and makes the environment beautiful look.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Planting trees provides shade and makes the environment look beautiful.'],
          evidence: 'Planting trees provides shade and makes the environment look beautiful.',
          explanation: 'Chủ ngữ danh động từ "Planting trees" nối hai vị ngữ: "provides shade and makes the environment look beautiful".'
        },
        {
          id: 'sec5_q125',
          number: 125,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: to support the family./so he/ is a breadwinner, /My dad/ is responsible for/ earning money /',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'My dad is a breadwinner, so he is responsible for earning money to support the family.' },
            { letter: 'B', text: 'My dad is earning money responsible for to support the family, so he is a breadwinner.' },
            { letter: 'C', text: 'so he is a breadwinner, my dad is earning money responsible for to support the family.' },
            { letter: 'D', text: 'He is a breadwinner, my dad is earning money responsible for to support the family so.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'My dad is a breadwinner, so he is responsible for earning money to support the family.'],
          evidence: 'My dad is a breadwinner, so he is responsible for earning money to support the family.',
          explanation: 'Mệnh đề nguyên nhân - kết quả chuẩn: "My dad is a breadwinner, so he is responsible for earning money to support the family."'
        },
        {
          id: 'sec5_q126',
          number: 126,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: We/ should not/ leave the appliances on when not in use/ this / wastes electricity/ create/ dangerous situations.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'We should not leave the appliances on when not in use because this wastes electricity and creates dangerous situations.' },
            { letter: 'B', text: 'We should not leave the appliances on when not in use and this wastes electricity and creates dangerous situations.' },
            { letter: 'C', text: 'We should not leave the appliances on when not in use but this wastes electricity and creates dangerous situations.' },
            { letter: 'D', text: 'We should not leave the appliances on when not in use so this wastes electricity and creates dangerous situations.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'We should not leave the appliances on when not in use because this wastes electricity and creates dangerous situations.'],
          evidence: 'Liên từ because giải thích lý do không nên bật thiết bị khi không dùng.',
          explanation: 'Đáp án A dùng "because" để chỉ rõ nguyên nhân vì sao không nên để thiết bị điện bật khi không sử dụng.'
        },
        {
          id: 'sec5_q127',
          number: 127,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: /helps/ children/ to take care of/ Doing housework/ learn/ themselves.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'Doing housework helps children learn to take care of themselves.' },
            { letter: 'B', text: 'Children learn to take care of themselves doing housework helps' },
            { letter: 'C', text: 'Housework helps children doing learn to take care of themselves.' },
            { letter: 'D', text: 'Doing housework helps to take care of children learn themselves.' }
          ],
          primaryAnswer: 'A',
          acceptedAnswers: ['A', 'a', 'Doing housework helps children learn to take care of themselves.'],
          evidence: 'Doing housework helps children learn to take care of themselves.',
          explanation: 'Cấu trúc: Doing housework (S) + helps (V) + children (O) + learn to take care of themselves.'
        },
        {
          id: 'sec5_q128',
          number: 128,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: catch / to school / Ms Green / doesn\'t / always/ the train.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: "Ms Green always doesn't catch the train to school." },
            { letter: 'B', text: "Ms Green doesn't always catch the train to school." },
            { letter: 'C', text: "The train always doesn't catch Ms Green to school." },
            { letter: 'D', text: "The train doesn't always catch Ms Green to school." }
          ],
          primaryAnswer: 'B',
          acceptedAnswers: ['B', 'b', "Ms Green doesn't always catch the train to school."],
          evidence: "Trạng từ tần suất đứng sau trợ động từ phủ định: doesn't always + V.",
          explanation: 'Vị trí trạng từ chỉ tần suất: "doesn\'t always catch the train to school".'
        },
        {
          id: 'sec5_q129',
          number: 129,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: on Friday./ are looking/ The students/ to the science museum/ forward to their school trip',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'The students are looking to their school trip forward to the science museum on Friday.' },
            { letter: 'B', text: 'The students are looking forward to on Friday their school trip to the science museum.' },
            { letter: 'C', text: 'The students to the science museum are looking forward to their school trip on Friday.' },
            { letter: 'D', text: 'The students are looking forward to their school trip to the science museum on Friday.' }
          ],
          primaryAnswer: 'D',
          acceptedAnswers: ['D', 'd', 'The students are looking forward to their school trip to the science museum on Friday.'],
          evidence: 'look forward to + Noun phrase.',
          explanation: 'The students are looking forward to their school trip to the science museum on Friday.'
        },
        {
          id: 'sec5_q130',
          number: 130,
          partId: 'sec5_part1',
          question: 'Arrange the words to make a complete sentence: I/ sporting events/ attend/ sometimes fantastic/ with my cousins.',
          placeholder: 'Chọn A, B, C hoặc D...',
          options: [
            { letter: 'A', text: 'I attend sometimes with my cousins fantastic sporting events.' },
            { letter: 'B', text: 'I sometimes attend with my cousins fantastic sporting events.' },
            { letter: 'C', text: 'I sometimes attend fantastic sporting events with my cousins.' },
            { letter: 'D', text: 'I sometimes sporting events attend fantastic with my cousins.' }
          ],
          primaryAnswer: 'C',
          acceptedAnswers: ['C', 'c', 'I sometimes attend fantastic sporting events with my cousins.'],
          evidence: 'I sometimes attend fantastic sporting events with my cousins.',
          explanation: 'Trật tự S + Adverb + V + O + Prepositional Phrase: "I sometimes attend fantastic sporting events with my cousins."'
        },

        // Sentence Rewrite / Transformation (Questions 131 - 145)
        {
          id: 'sec5_q131',
          number: 131,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "They are planting more trees around the school." ➔ More trees...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'are being planted around the school.',
          acceptedAnswers: [
            'are being planted around the school.',
            'are being planted around the school',
            'More trees are being planted around the school.',
            'More trees are being planted around the school'
          ],
          evidence: 'Hiện tại tiếp diễn bị động: am/is/are + being + V3/ed.',
          explanation: 'Câu gốc dùng hiện tại tiếp diễn với tân ngữ "more trees" (số nhiều) ➔ "More trees are being planted around the school."'
        },
        {
          id: 'sec5_q132',
          number: 132,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "The police are going to search for the stolen jewels." ➔ The stolen jewels...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'are going to be searched for by the police.',
          acceptedAnswers: [
            'are going to be searched for by the police.',
            'are going to be searched for by the police',
            'are going to be searched for.',
            'are going to be searched for',
            'The stolen jewels are going to be searched for by the police.',
            'The stolen jewels are going to be searched for by the police'
          ],
          evidence: 'Be going to bị động: are going to be + V3/ed.',
          explanation: '"The stolen jewels are going to be searched for by the police." Cần giữ nguyên giới từ "for" của cụm động từ search for.'
        },
        {
          id: 'sec5_q133',
          number: 133,
          partId: 'sec5_part2',
          question: 'Make a compound sentence using the correct conjunction in brackets: "The concert didn\'t happen. We decided to go shopping instead." (AND/SO) ➔',
          placeholder: 'Viết lại câu hoàn chỉnh với liên từ phù hợp...',
          primaryAnswer: "The concert didn't happen, so we decided to go shopping instead.",
          acceptedAnswers: [
            "The concert didn't happen, so we decided to go shopping instead.",
            "The concert didn't happen, so we decided to go shopping instead",
            "The concert did not happen, so we decided to go shopping instead.",
            "The concert did not happen, so we decided to go shopping instead",
            "so we decided to go shopping instead.",
            "so we decided to go shopping instead"
          ],
          evidence: 'SO nối nguyên nhân và kết quả.',
          explanation: 'Buổi hòa nhạc bị hủy là nguyên nhân dẫn đến kết quả đi mua sắm, vì vậy dùng liên từ "so": "The concert didn\'t happen, so we decided to go shopping instead."'
        },
        {
          id: 'sec5_q134',
          number: 134,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "People clean the park every weekend." ➔ The park...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'is cleaned every weekend.',
          acceptedAnswers: [
            'is cleaned every weekend.',
            'is cleaned every weekend',
            'is cleaned by people every weekend.',
            'is cleaned by people every weekend',
            'The park is cleaned every weekend.',
            'The park is cleaned every weekend'
          ],
          evidence: 'Hiện tại đơn bị động: is + V3.',
          explanation: '"The park is cleaned every weekend." (Chủ ngữ "people" chung chung nên lược bỏ by people).'
        },
        {
          id: 'sec5_q135',
          number: 135,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "They will build a new bridge across the river next year." ➔ A new bridge...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'will be built across the river next year.',
          acceptedAnswers: [
            'will be built across the river next year.',
            'will be built across the river next year',
            'A new bridge will be built across the river next year.',
            'A new bridge will be built across the river next year'
          ],
          evidence: 'Tương lai đơn bị động: will be + V3.',
          explanation: '"A new bridge will be built across the river next year."'
        },
        {
          id: 'sec5_q136',
          number: 136,
          partId: 'sec5_part2',
          question: 'Make a compound sentence using the correct conjunction in brackets: "I like volunteering. I don\'t have much time." (BUT/SO) ➔',
          placeholder: 'Viết lại câu hoàn chỉnh với liên từ phù hợp...',
          primaryAnswer: "I like volunteering, but I don't have much time.",
          acceptedAnswers: [
            "I like volunteering, but I don't have much time.",
            "I like volunteering, but I don't have much time",
            "I like volunteering, but I do not have much time.",
            "I like volunteering, but I do not have much time",
            "but I don't have much time.",
            "but I don't have much time"
          ],
          evidence: 'BUT nối hai vế mang nghĩa tương phản.',
          explanation: '"I like volunteering, but I don\'t have much time." (Tôi thích làm tình nguyện nhưng lại không có nhiều thời gian).'
        },
        {
          id: 'sec5_q137',
          number: 137,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "More and more people adopt a green lifestyle." ➔ A green lifestyle...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'is adopted by more and more people.',
          acceptedAnswers: [
            'is adopted by more and more people.',
            'is adopted by more and more people',
            'A green lifestyle is adopted by more and more people.',
            'A green lifestyle is adopted by more and more people'
          ],
          evidence: 'Hiện tại đơn bị động: is adopted by...',
          explanation: '"A green lifestyle is adopted by more and more people."'
        },
        {
          id: 'sec5_q138',
          number: 138,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "They are going to organize a fundraising event for poor children." ➔ A fundraising event...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'is going to be organized for poor children.',
          acceptedAnswers: [
            'is going to be organized for poor children.',
            'is going to be organized for poor children',
            'is going to be organised for poor children.',
            'is going to be organised for poor children',
            'A fundraising event is going to be organized for poor children.',
            'A fundraising event is going to be organized for poor children'
          ],
          evidence: 'Be going to bị động: is going to be organized.',
          explanation: '"A fundraising event is going to be organized for poor children."'
        },
        {
          id: 'sec5_q139',
          number: 139,
          partId: 'sec5_part2',
          question: 'Make a compound sentence using the correct conjunction in brackets: "I got stuck in dense traffic. I came to the interview 15 minutes late." (OR/SO) ➔',
          placeholder: 'Viết lại câu hoàn chỉnh với liên từ phù hợp...',
          primaryAnswer: 'I got stuck in dense traffic, so I came to the interview 15 minutes late.',
          acceptedAnswers: [
            'I got stuck in dense traffic, so I came to the interview 15 minutes late.',
            'I got stuck in dense traffic, so I came to the interview 15 minutes late',
            'so I came to the interview 15 minutes late.',
            'so I came to the interview 15 minutes late'
          ],
          evidence: 'SO chỉ kết quả của việc tắc đường.',
          explanation: '"I got stuck in dense traffic, so I came to the interview 15 minutes late."'
        },
        {
          id: 'sec5_q140',
          number: 140,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "Pollution affects the environment in many ways." ➔ The environment...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'is affected by pollution in many ways.',
          acceptedAnswers: [
            'is affected by pollution in many ways.',
            'is affected by pollution in many ways',
            'The environment is affected by pollution in many ways.',
            'The environment is affected by pollution in many ways'
          ],
          evidence: 'Hiện tại đơn bị động: is affected by...',
          explanation: '"The environment is affected by pollution in many ways."'
        },
        {
          id: 'sec5_q141',
          number: 141,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "The club\'s activities will raise people\'s awareness of environmental issues." ➔ People\'s awareness of environmental issues...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: "will be raised by the club's activities.",
          acceptedAnswers: [
            "will be raised by the club's activities.",
            "will be raised by the club's activities",
            "People's awareness of environmental issues will be raised by the club's activities.",
            "People's awareness of environmental issues will be raised by the club's activities"
          ],
          evidence: 'Tương lai đơn bị động: will be raised by...',
          explanation: '"People\'s awareness of environmental issues will be raised by the club\'s activities."'
        },
        {
          id: 'sec5_q142',
          number: 142,
          partId: 'sec5_part2',
          question: 'Make a compound sentence using the correct conjunction in brackets: "She has bought some sugar and flour. She is going to make a cake this evening." (OR/ BECAUSE) ➔',
          placeholder: 'Viết lại câu hoàn chỉnh với liên từ phù hợp...',
          primaryAnswer: 'She has bought some sugar and flour because she is going to make a cake this evening.',
          acceptedAnswers: [
            'She has bought some sugar and flour because she is going to make a cake this evening.',
            'She has bought some sugar and flour because she is going to make a cake this evening',
            'because she is going to make a cake this evening.',
            'because she is going to make a cake this evening'
          ],
          evidence: 'BECAUSE giải thích mục đích mua đường và bột làm bánh.',
          explanation: '"She has bought some sugar and flour because she is going to make a cake this evening."'
        },
        {
          id: 'sec5_q143',
          number: 143,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "People built many large castles in Britain hundreds of years ago." ➔ Many large castles...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'were built in Britain hundreds of years ago.',
          acceptedAnswers: [
            'were built in Britain hundreds of years ago.',
            'were built in Britain hundreds of years ago',
            'Many large castles were built in Britain hundreds of years ago.',
            'Many large castles were built in Britain hundreds of years ago'
          ],
          evidence: 'Quá khứ đơn bị động số nhiều: were built...',
          explanation: '"Many large castles were built in Britain hundreds of years ago."'
        },
        {
          id: 'sec5_q144',
          number: 144,
          partId: 'sec5_part2',
          question: 'Rewrite using passive voice: "A sudden flash flood can wipe out a village within seconds." ➔ A village...',
          placeholder: 'Điền phần còn lại của câu bị động...',
          primaryAnswer: 'can be wiped out within seconds by a sudden flash flood.',
          acceptedAnswers: [
            'can be wiped out within seconds by a sudden flash flood.',
            'can be wiped out within seconds by a sudden flash flood',
            'can be wiped out by a sudden flash flood within seconds.',
            'can be wiped out by a sudden flash flood within seconds',
            'A village can be wiped out within seconds by a sudden flash flood.',
            'A village can be wiped out within seconds by a sudden flash flood'
          ],
          evidence: 'Modal passive: can be + V3.',
          explanation: '"A village can be wiped out within seconds by a sudden flash flood."'
        },
        {
          id: 'sec5_q145',
          number: 145,
          partId: 'sec5_part2',
          question: 'Make a compound sentence using the correct conjunction in brackets: "She likes listening to pop music. She also enjoys watching music shows." (AND) ➔',
          placeholder: 'Viết lại câu hoàn chỉnh với liên từ phù hợp...',
          primaryAnswer: 'She likes listening to pop music and she also enjoys watching music shows.',
          acceptedAnswers: [
            'She likes listening to pop music and she also enjoys watching music shows.',
            'She likes listening to pop music and she also enjoys watching music shows',
            'She likes listening to pop music, and she also enjoys watching music shows.',
            'She likes listening to pop music, and she also enjoys watching music shows',
            'and she also enjoys watching music shows.',
            'and she also enjoys watching music shows'
          ],
          evidence: 'AND nối hai sở thích âm nhạc bổ trợ cho nhau.',
          explanation: '"She likes listening to pop music and she also enjoys watching music shows."'
        },

        // Guided Paragraph Writing Prompts (Questions 146 - 148)
        {
          id: 'sec5_q146',
          number: 146,
          partId: 'sec5_part3',
          question: 'Writing Prompt 1: In about 60-80 words, write a paragraph about one of your family routines (having dinner together). Follow the cues: What is the routine? How often / When do you do it? What are the activities and what does each member do? How do you feel about it?',
          placeholder: 'Viết bài văn ngắn (60-80 từ) hoặc nhập câu trả lời của bạn...',
          primaryAnswer: 'One of my favourite family routines is having dinner together. We usually have dinner at 7 p.m. every evening. My mother prepares the food, my father sets the table, and I help wash the dishes after the meal. During dinner, we talk about our day and share funny stories. I really enjoy this routine because it helps us relax, understand one another, and strengthen our family bonds.',
          acceptedAnswers: [
            'One of my favourite family routines is having dinner together. We usually have dinner at 7 p.m. every evening. My mother prepares the food, my father sets the table, and I help wash the dishes after the meal. During dinner, we talk about our day and share funny stories. I really enjoy this routine because it helps us relax, understand one another, and strengthen our family bonds.',
            'One of my favourite family routines is having dinner together',
            'having dinner together',
            'family routine'
          ],
          evidence: 'Bài mẫu đạt chuẩn 73 từ, sử dụng thì hiện tại đơn, phân công rõ công việc từng người và nêu bật cảm xúc gắn kết gia đình.',
          explanation: `BÀI MẪU THAM KHẢO (73 TỪ):
"One of my favourite family routines is having dinner together. We usually have dinner at 7 p.m. every evening. My mother prepares the food, my father sets the table, and I help wash the dishes after the meal. During dinner, we talk about our day and share funny stories. I really enjoy this routine because it helps us relax, understand one another, and strengthen our family bonds."

PHÂN TÍCH TIÊU CHÍ CHẤM ĐIỂM:
- Độ dài: 73 từ (nằm trọn trong giới hạn 60-80 từ).
- Ngữ pháp: Sử dụng thì Hiện tại đơn miêu tả thói quen sinh hoạt định kỳ.
- Nội dung: Đủ 4 ý (Tên thói quen: having dinner together; Thời gian: 7 p.m. every evening; Phân công công việc: mẹ nấu, bố dọn bàn, con rửa bát; Cảm xúc: strengthen family bonds).`
        },
        {
          id: 'sec5_q147',
          number: 147,
          partId: 'sec5_part3',
          question: 'Writing Prompt 2: In about 60-80 words, write a paragraph about things you can do to protect the environment. Follow the cues: Topic sentence; First action & its impact; Second action & its impact; Concluding sentence.',
          placeholder: 'Viết bài văn ngắn (60-80 từ) hoặc nhập câu trả lời của bạn...',
          primaryAnswer: 'There are several simple things we can do to protect the environment. First, we should save electricity by turning off lights and electrical appliances when they are not in use. This helps reduce energy consumption. Second, we should use reusable bags and bottles instead of single-use plastic products. This can reduce plastic waste. If everyone takes these small actions every day, our environment will become cleaner and greener.',
          acceptedAnswers: [
            'There are several simple things we can do to protect the environment. First, we should save electricity by turning off lights and electrical appliances when they are not in use. This helps reduce energy consumption. Second, we should use reusable bags and bottles instead of single-use plastic products. This can reduce plastic waste. If everyone takes these small actions every day, our environment will become cleaner and greener.',
            'There are several simple things we can do to protect the environment',
            'protect the environment'
          ],
          evidence: 'Bài mẫu 75 từ, bố cục 3 phần rõ ràng, áp dụng từ vựng Unit 2 Green Living.',
          explanation: `BÀI MẪU THAM KHẢO (75 TỪ):
"There are several simple things we can do to protect the environment. First, we should save electricity by turning off lights and electrical appliances when they are not in use. This helps reduce energy consumption. Second, we should use reusable bags and bottles instead of single-use plastic products. This can reduce plastic waste. If everyone takes these small actions every day, our environment will become cleaner and greener."

PHÂN TÍCH TIÊU CHÍ CHẤM ĐIỂM:
- Bố cục: Câu mở đoạn (Topic sentence) ➔ Hành động 1 (tắt thiết bị điện) ➔ Hành động 2 (dùng túi/bình tái sử dụng) ➔ Câu kết luận (Cleaner & greener).
- Từ vựng đắt giá: electrical appliances, energy consumption, reusable bags, single-use plastic products.`
        },
        {
          id: 'sec5_q148',
          number: 148,
          partId: 'sec5_part3',
          question: 'Writing Prompt 3: In about 60-80 words, write a paragraph about ways to reduce your carbon footprint. Follow the cues: Topic sentence; First action & explain; Second action & explain; Concluding sentence.',
          placeholder: 'Viết bài văn ngắn (60-80 từ) hoặc nhập câu trả lời của bạn...',
          primaryAnswer: 'We can reduce our carbon footprint in many simple ways. First, we should walk, cycle, or use public transport instead of travelling by motorbike or car whenever possible. This reduces fuel use and greenhouse gas emissions. Second, we should save electricity at home by switching off unused devices and using energy-efficient appliances. We can also plant more trees. Small daily changes can make a big difference to our planet.',
          acceptedAnswers: [
            'We can reduce our carbon footprint in many simple ways. First, we should walk, cycle, or use public transport instead of travelling by motorbike or car whenever possible. This reduces fuel use and greenhouse gas emissions. Second, we should save electricity at home by switching off unused devices and using energy-efficient appliances. We can also plant more trees. Small daily changes can make a big difference to our planet.',
            'We can reduce our carbon footprint in many simple ways',
            'carbon footprint'
          ],
          evidence: 'Bài mẫu 73 từ, nêu rõ biện pháp và cơ chế tác động giải thích tại sao giảm được dấu chân carbon.',
          explanation: `BÀI MẪU THAM KHẢO (73 TỪ):
"We can reduce our carbon footprint in many simple ways. First, we should walk, cycle, or use public transport instead of travelling by motorbike or car whenever possible. This reduces fuel use and greenhouse gas emissions. Second, we should save electricity at home by switching off unused devices and using energy-efficient appliances. We can also plant more trees. Small daily changes can make a big difference to our planet."

PHÂN TÍCH TIÊU CHÍ CHẤM ĐIỂM:
- Cấu trúc: Nêu trực tiếp 2 giải pháp lớn (Phương tiện công cộng/đi bộ ➔ Giảm khí thải nhiên liệu; Tiết kiệm điện & trồng cây ➔ Hấp thụ CO2).
- Từ vựng trọng tâm: greenhouse gas emissions, public transport, energy-efficient appliances, carbon footprint.`
        }
      ]
    }
  ]
};

// Flatten all questions for quick lookup and scoring
REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL.questions = REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL.passages.flatMap(p => p.questions || []);

// Backward-compatible alias
export const REVISION_MIDTERM_1_ENGLISH_10_DETAIL = REVISION_MIDTERM_1_ENGLISH_10_PRACTICE_DETAIL;
