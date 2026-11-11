// IELTS Collection 1 Listening Test 1
// Full detail data for exam vol1-lis-1
// Standard IELTS Academic/General Listening test with 4 parts and 40 questions

export const VOL1_LIS_1 = {
  id: 'vol1-lis-1',
  vol: 1,
  testNum: 1,
  title: 'IELTS Collection 1 Listening Test 1',
  category: 'IELTS Academic',
  skill: 'Listening',
  duration: 40,
  participants: 378624,
  commentsCount: 628,
  partsCount: 4,
  questionsCount: 40,
  tags: ['#IELTS Academic', '#Listening'],
  audioTracks: {
    1: '/audio/vol1_test1_part1.mp3',
    2: '/audio/vol1_test1_part2.mp3',
    3: '/audio/vol1_test1_part3.mp3',
    4: '/audio/vol1_test1_part4.mp3',
  },
  parts: [
    {
      id: 1,
      title: 'Recording 1',
      name: 'Part 1: Beechen Festival Offers',
      questionRange: '1–10',
      questionCount: 10,
      tags: ['#[Listening] Note/Form Completion', '#[Listening] Table Completion'],
      instruction: 'Complete the table and notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
      wordLimit: 'ONE WORD AND/OR A NUMBER',
      maxWords: 1,
      audioUrl: '/audio/vol1_test1_part1.mp3',
      context: 'Customer inquiries about activities, times, and rules for the Beechen Festival.',
      questions: [
        { 
          id: 1, 
          number: 1,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 19th | 7 p.m. | Concert | Place: the', 
          suffix: '', 
          placeholder: 'Điền từ...',
          answer: 'theater', 
          primaryAnswer: 'theater',
          acceptable: ['theater', 'theatre'],
          evidence: 'First activity is on June 19th at 7pm, a concert in the theater with local musicians.',
          explanation: 'Người nói xác nhận buổi hòa nhạc diễn ra tại nhà hát ("in the theater" hoặc "theatre").'
        },
        { 
          id: 2, 
          number: 2,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 20th | Time:', 
          suffix: 'p.m. | Activity: tour (ticket error said 3:40)', 
          placeholder: 'Điền giờ...',
          answer: '4:30', 
          primaryAnswer: '4:30',
          acceptable: ['4:30', '4.30', '4', '4:00', '4.00', '4 pm', '4pm', '16:00', 'four thirty'],
          evidence: 'The guided tour starts at 4:30 (ticket error said 3:40).',
          explanation: 'Người nói đính chính vé in nhầm là 3:40, thực tế chuyến tham quan bắt đầu lúc 4:30 chiều.'
        },
        { 
          id: 3, 
          number: 3,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 20th Tour | Place: meet at the', 
          suffix: '(includes visit to old flour mill)', 
          placeholder: 'Điền địa điểm...',
          answer: 'station', 
          primaryAnswer: 'station',
          acceptable: ['station', 'train station'],
          evidence: 'Meet the guide at the station; it includes an old flour mill.',
          explanation: 'Điểm tập trung gặp hướng dẫn viên là tại nhà ga (station).'
        },
        { 
          id: 4, 
          number: 4,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 21st | all day | Activity: children\'s', 
          suffix: 'competition | Place: Beechen Community Centre', 
          placeholder: 'Điền từ...',
          answer: 'cooking', 
          primaryAnswer: 'cooking',
          acceptable: ['cooking', 'cookery'],
          evidence: 'June 21st: children\'s cooking competition at Beechen Community Centre.',
          explanation: 'Hoạt động cho trẻ em là cuộc thi nấu ăn (cooking / cookery competition).'
        },
        { 
          id: 5, 
          number: 5,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 21st Children Competition | Comments: bring a', 
          suffix: '', 
          placeholder: 'Điền đồ vật...',
          answer: 'plate', 
          primaryAnswer: 'plate',
          acceptable: ['plate', 'a plate'],
          evidence: 'Bring a plate for the dishes.',
          explanation: 'Thí sinh tham gia cần mang theo đĩa (plate).'
        },
        { 
          id: 6, 
          number: 6,
          type: 'fill', 
          sectionTitle: 'Festival Events Schedule',
          label: 'June 21st | evening | Activity: fireworks | Place: by the', 
          suffix: '', 
          placeholder: 'Điền địa điểm...',
          answer: 'river', 
          primaryAnswer: 'river',
          acceptable: ['river', 'the river'],
          evidence: 'Evening fireworks by the river.',
          explanation: 'Pháo hoa buổi tối được bắn bên bờ sông (by the river).'
        },
        { 
          id: 7, 
          number: 7,
          type: 'fill', 
          sectionTitle: 'Festival Rules & Info',
          label: 'This year, activities end by', 
          suffix: 'p.m.', 
          placeholder: 'Điền giờ...',
          answer: '11:15', 
          primaryAnswer: '11:15',
          acceptable: ['11:15', '11.15', '11:15 pm', '11:15pm'],
          evidence: 'Noise rules: events end by 11:15 pm.',
          explanation: 'Theo quy định tiếng ồn, các hoạt động kết thúc trước 11:15 tối.'
        },
        { 
          id: 8, 
          number: 8,
          type: 'fill', 
          sectionTitle: 'Festival Rules & Info',
          label: 'There won\'t be any', 
          suffix: 'in the town centre this year.', 
          placeholder: 'Điền từ...',
          answer: 'parking', 
          primaryAnswer: 'parking',
          acceptable: ['parking', 'car parking', 'cars'],
          evidence: 'Parking in town centre is restricted this year.',
          explanation: 'Khu vực trung tâm thị trấn năm nay không cho đỗ xe (no parking).'
        },
        { 
          id: 9, 
          number: 9,
          type: 'fill', 
          sectionTitle: 'Festival Rules & Info',
          label: 'The festival\'s web address is www.', 
          suffix: '.com', 
          placeholder: 'Điền tên miền...',
          answer: 'beaconfestival', 
          primaryAnswer: 'beaconfestival',
          acceptable: ['beaconfestival', 'beechenfestival', 'events'],
          evidence: 'Web: www.beaconfestival.com.',
          explanation: 'Địa chỉ trang web chính thức của lễ hội là beaconfestival (hoặc beechenfestival).'
        },
        { 
          id: 10, 
          number: 10,
          type: 'fill', 
          sectionTitle: 'Festival Rules & Info',
          label: 'Festival organisers would like to receive', 
          suffix: 'online.', 
          placeholder: 'Điền từ...',
          answer: 'feedback', 
          primaryAnswer: 'feedback',
          acceptable: ['feedback', 'comments', 'reviews'],
          evidence: 'Feedback welcomed online.',
          explanation: 'Ban tổ chức hoan nghênh nhận ý kiến phản hồi (feedback) trực tuyến.'
        },
      ]
    },
    {
      id: 2,
      title: 'Recording 2',
      name: 'Part 2: Walking Holiday in Spain',
      questionRange: '11–20',
      questionCount: 10,
      tags: ['#[Listening] Matching', '#[Listening] Multiple Choice'],
      instruction: 'Choose the correct letter, A, B, or C for Questions 11–14. Complete the notes for Questions 15–20.',
      wordLimit: 'ONE WORD AND/OR A NUMBER',
      maxWords: 1,
      audioUrl: '/audio/vol1_test1_part2.mp3',
      context: 'Gary Payne introduces walking tour itinerary and equipment.',
      questions: [
        { 
          id: 11, 
          number: 11,
          type: 'choice',
          instruction: 'Choose the correct letter, A, B, or C.',
          question: 'Approximately how many passengers does the ferry hold?', 
          options: ['A. 160', 'B. 600', 'C. 2000'], 
          answer: 'B', 
          primaryAnswer: 'B',
          evidence: 'The ferry holds 600 passengers.',
          explanation: 'Người hướng dẫn Gary Payne nêu rõ phà có sức chứa khoảng 600 hành khách.'
        },
        { 
          id: 12, 
          number: 12,
          type: 'choice',
          question: 'Which items should the tourists pack in a separate bag?', 
          options: ['A. food', 'B. reading material', 'C. medicines'], 
          answer: 'C', 
          primaryAnswer: 'C',
          evidence: 'Pack medicines in a separate bag so you have immediate access.',
          explanation: 'Thuốc men (medicines) cần được để trong túi riêng để tiện lấy khi cần.'
        },
        { 
          id: 13, 
          number: 13,
          type: 'choice',
          question: 'The hostel in La Vega de Liebana has:', 
          options: ['A. good washing facilities', 'B. a games room', 'C. a number of single bedrooms'], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'The hostel has good washing facilities, perfect for washing your gear after hiking.',
          explanation: 'Nhà trọ có cơ sở vật chất giặt là rất tốt (good washing facilities).'
        },
        { 
          id: 14, 
          number: 14,
          type: 'choice',
          question: 'Residents at the hostel are not allowed to:', 
          options: ['A. take furniture out of the hostel building', 'B. enter the hostel after a certain time', 'C. smoke in the hostel gardens'], 
          answer: 'B', 
          primaryAnswer: 'B',
          evidence: 'hostel has a strict curfew at 11pm after which the doors are locked.',
          explanation: 'Quy định giờ giới nghiêm lúc 11 giờ đêm, sau giờ này cư dân không được vào (enter after a certain time).'
        },
        { 
          id: 15, 
          number: 15,
          type: 'fill', 
          sectionTitle: 'Equipment & Clothing',
          instruction: 'Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
          label: 'Clothes and equipment: Bring boots with thick soles, spare', 
          suffix: '', 
          placeholder: 'Điền từ...',
          answer: 'shoes', 
          primaryAnswer: 'shoes',
          acceptable: ['shoes', 'socks'],
          evidence: 'Bring boots with thick soles, and spare shoes.',
          explanation: 'Khách du lịch cần mang giày ủng đế dày và giày dự phòng (spare shoes).'
        },
        { 
          id: 16, 
          number: 16,
          type: 'fill', 
          sectionTitle: 'Equipment & Clothing',
          label: 'Light waterproofs, suncream: strength - factor', 
          suffix: '', 
          placeholder: 'Điền số...',
          answer: '30', 
          primaryAnswer: '30',
          acceptable: ['30', '40', '50', 'factor 30'],
          evidence: 'factor 30 suncream is essential under the high mountain sun.',
          explanation: 'Chỉ số kem chống nắng được khuyến nghị là factor 30.'
        },
        { 
          id: 17, 
          number: 17,
          type: 'fill', 
          sectionTitle: 'Equipment & Clothing',
          label: 'Bring a', 
          suffix: 'folder for protecting maps and documents.', 
          placeholder: 'Điền từ...',
          answer: 'waterproof', 
          primaryAnswer: 'waterproof',
          acceptable: ['waterproof', 'plastic'],
          evidence: 'Bring a waterproof folder for map and trail notes.',
          explanation: 'Mang cặp đựng chống thấm nước (waterproof folder) để bảo quản bản đồ.'
        },
        { 
          id: 18, 
          number: 18,
          type: 'choice',
          sectionTitle: 'Features of Spain Area',
          instruction: 'Questions 18–20: Choose the correct feature mentioned by the speaker.',
          question: 'Features of Spain area: Which factor is emphasized first regarding climate and walking?', 
          options: ['A. altitude', 'B. coastline', 'C. economy'], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'The high altitude creates unique mountain climate conditions.',
          explanation: 'Độ cao (altitude) là yếu tố địa hình được nhấn mạnh đầu tiên.'
        },
        { 
          id: 19, 
          number: 19,
          type: 'choice',
          question: 'Features of Spain area: The speaker specifically mentions changing:', 
          options: ['D. temperatures', 'E. vegetation', 'F. wildlife'], 
          answer: 'D', 
          primaryAnswer: 'D',
          evidence: 'Be prepared for sudden drops in temperatures as you ascend.',
          explanation: 'Nhiệt độ (temperatures) thay đổi nhanh chóng khi leo lên cao.'
        },
        { 
          id: 20, 
          number: 20,
          type: 'choice',
          question: 'Features of Spain area: The local ecosystem is described through varied:', 
          options: ['E. vegetation', 'F. wildlife', 'G. coastline'], 
          answer: 'E', 
          primaryAnswer: 'E',
          evidence: 'You will observe a dramatic variety of lush vegetation and mountain meadows.',
          explanation: 'Thảm thực vật (vegetation) phong phú là điểm nổi bật của khu vực.'
        },
      ]
    },
    {
      id: 3,
      title: 'Recording 3',
      name: 'Part 3: Peer Assessment Research Discussion',
      questionRange: '21–30',
      questionCount: 10,
      tags: ['#[Listening] Matching', '#[Listening] Multiple Choice'],
      instruction: 'Choose the correct letter, A, B, or C.',
      audioUrl: '/audio/vol1_test1_part3.mp3',
      context: 'Steve and Sally discuss university research on student peer assessment.',
      questions: [
        { 
          id: 21, 
          number: 21,
          type: 'choice',
          instruction: 'Choose the correct letter, A, B, or C.',
          question: 'Sally says many students see peer assessment as:', 
          options: [
            'A. a way for tutors to save time', 
            'B. a useful learning tool', 
            'C. a valuable form of assessment'
          ], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'Steve, students see peer assessment as saving tutors time, but it raises self-awareness.',
          explanation: 'Nhiều sinh viên nghĩ việc chấm điểm chéo chỉ nhằm giúp giảng viên tiết kiệm thời gian (saving tutors time).'
        },
        { 
          id: 22, 
          number: 22,
          type: 'choice',
          question: 'What do Steve and Sally agree is an advantage of peer assessment?', 
          options: [
            'A. It\'s more reliable than self-assessment', 
            'B. It increases students\' self-awareness', 
            'C. It builds rapport between students'
          ], 
          answer: 'B', 
          primaryAnswer: 'B',
          evidence: 'but it actually raises students\' self-awareness when analyzing others\' work.',
          explanation: 'Cả hai đồng ý lợi ích lớn nhất là nâng cao nhận thức tự đánh giá (self-awareness) của bản thân.'
        },
        { 
          id: 23, 
          number: 23,
          type: 'choice',
          question: 'If the peer assessment marks seem incorrect:', 
          options: [
            'A. students should mark the assignments again', 
            'B. the tutor should check those assignments', 
            'C. the marking criteria should be rewritten'
          ], 
          answer: 'B', 
          primaryAnswer: 'B',
          evidence: 'Tutors review disputed marks to ensure fairness.',
          explanation: 'Nếu điểm có dấu hiệu bất thường, giảng viên cần kiểm tra lại các bài đó.'
        },
        { 
          id: 24, 
          number: 24,
          type: 'choice',
          question: 'How were the presentations in the research project marked?', 
          options: [
            'A. Students and lecturers marked all the presentations', 
            'B. Students chose which presentations they wanted to mark', 
            'C. Lecturers marked a selection of presentations'
          ], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'Presentations were marked by both lecturers and students across the board.',
          explanation: 'Cả sinh viên và giảng viên đều chấm toàn bộ các bài thuyết trình.'
        },
        { 
          id: 25, 
          number: 25,
          type: 'choice',
          sectionTitle: 'Research Marking Trends',
          instruction: 'Questions 25–30: What marks did these student groups award compared to average? (A: Higher marks, B: Lower marks, C: Not significantly different)',
          question: 'Male students marking female presenters:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'B', 
          primaryAnswer: 'B',
          evidence: 'Male markers gave lower marks to women;',
          explanation: 'Sinh viên nam khi chấm sinh viên nữ có xu hướng cho điểm thấp hơn (lower marks).'
        },
        { 
          id: 26, 
          number: 26,
          type: 'choice',
          question: 'Female students marking male presenters:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'C', 
          primaryAnswer: 'C',
          evidence: 'women showed no significant bias when marking men.',
          explanation: 'Sinh viên nữ chấm sinh viên nam không có chênh lệch đáng kể (no significant difference).'
        },
        { 
          id: 27, 
          number: 27,
          type: 'choice',
          question: 'Female students marking female presenters:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'C', 
          primaryAnswer: 'C',
          evidence: 'Female markers reviewing female peers were consistent with lecturer averages.',
          explanation: 'Điểm số do nữ chấm nữ không có khác biệt thống kê đáng kể.'
        },
        { 
          id: 28, 
          number: 28,
          type: 'choice',
          question: 'Younger students marking older presenters:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'Younger students tended to be more generous, giving higher marks to older presenters.',
          explanation: 'Sinh viên nhỏ tuổi hơn thường chấm hào phóng và cho điểm cao hơn (higher marks) đối với bạn lớn tuổi.'
        },
        { 
          id: 29, 
          number: 29,
          type: 'choice',
          question: 'Students marking presenters from a different university:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'C', 
          primaryAnswer: 'C',
          evidence: 'Marks for external university presenters showed no significant variance.',
          explanation: 'Chấm người từ trường khác không tạo ra khác biệt đáng kể (not significantly different).'
        },
        { 
          id: 30, 
          number: 30,
          type: 'choice',
          question: 'Students who had helped set criteria:', 
          options: [
            'A. They gave higher marks', 
            'B. They gave lower marks', 
            'C. Marks were not significantly different'
          ], 
          answer: 'A', 
          primaryAnswer: 'A',
          evidence: 'Students who participated in formulating criteria gave consistently higher marks.',
          explanation: 'Sinh viên tham gia xây dựng tiêu chí chấm điểm có xu hướng cho điểm cao hơn (higher marks).'
        },
      ]
    },
    {
      id: 4,
      title: 'Recording 4',
      name: 'Part 4: Bislama - The Pidgin English of Vanuatu',
      questionRange: '31–40',
      questionCount: 10,
      tags: ['#[Listening] Note/Form Completion'],
      instruction: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
      wordLimit: 'ONE WORD ONLY',
      maxWords: 1,
      audioUrl: '/audio/vol1_test1_part4.mp3',
      context: 'Linguistics lecture on Bislama, the pidgin language of Vanuatu.',
      questions: [
        { 
          id: 31, 
          number: 31,
          type: 'fill', 
          sectionTitle: 'Languages in Vanuatu',
          instruction: 'Complete the notes below. Write ONE WORD ONLY for each answer.',
          label: 'Languages in Vanuatu: Actively spoken: 81, Declining: 17,', 
          suffix: 'languages: 8.', 
          placeholder: 'Điền 1 từ...',
          answer: 'endangered', 
          primaryAnswer: 'endangered',
          acceptable: ['endangered', 'extinct', 'dying'],
          evidence: 'Vanuatu has 81 active languages, 17 declining, and 8 endangered/extinct.',
          explanation: 'Có 8 ngôn ngữ đang ở tình trạng nguy cấp (endangered / extinct).'
        },
        { 
          id: 32, 
          number: 32,
          type: 'fill', 
          sectionTitle: 'Languages in Vanuatu',
          label: 'Foreign languages: English is used in the', 
          suffix: 'system.', 
          placeholder: 'Điền 1 từ...',
          answer: 'education', 
          primaryAnswer: 'education',
          acceptable: ['education', 'educational', 'school'],
          evidence: 'English serves as the primary medium in the education system.',
          explanation: 'Tiếng Anh được sử dụng trong hệ thống giáo dục (education system).'
        },
        { 
          id: 33, 
          number: 33,
          type: 'fill', 
          sectionTitle: 'History of Bislama',
          label: 'Bislama: In the past this language was described as', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'broken', 
          primaryAnswer: 'broken',
          acceptable: ['broken'],
          evidence: 'Bislama was once dismissed as \'broken English\'.',
          explanation: 'Trước đây ngôn ngữ Bislama từng bị coi là tiếng Anh bồi/hỏng (broken).'
        },
        { 
          id: 34, 
          number: 34,
          type: 'fill', 
          sectionTitle: 'History of Bislama',
          label: 'History: After 1860 Vanuatu people worked in Australian', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'plantations', 
          primaryAnswer: 'plantations',
          acceptable: ['plantations', 'mines'],
          evidence: 'Vanuatu laborers worked in Australian plantations where pidgin evolved.',
          explanation: 'Sau năm 1860 người Vanuatu làm việc tại các đồn điền ở Úc (plantations).'
        },
        { 
          id: 35, 
          number: 35,
          type: 'fill', 
          sectionTitle: 'History of Bislama',
          label: 'After 1950 people moved to the', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'city', 
          primaryAnswer: 'city',
          acceptable: ['city', 'towns', 'town'],
          evidence: 'After 1950 large numbers moved to the city/towns.',
          explanation: 'Sau năm 1950 nhiều người di cư đến các thành phố / thị trấn (city / towns).'
        },
        { 
          id: 36, 
          number: 36,
          type: 'fill', 
          sectionTitle: 'Description & Vocabulary',
          label: 'Description: Bislama should be called a', 
          suffix: 'pidgin.', 
          placeholder: 'Điền 1 từ...',
          answer: 'developed', 
          primaryAnswer: 'developed',
          acceptable: ['developed', 'creole', 'national'],
          evidence: 'Bislama should properly be called a developed pidgin or creole.',
          explanation: 'Bislama được miêu tả chuẩn xác là một ngôn ngữ pidgin đã phát triển hoàn thiện (developed).'
        },
        { 
          id: 37, 
          number: 37,
          type: 'fill', 
          sectionTitle: 'Description & Vocabulary',
          label: 'Vocabulary: Words such as \'from\' may have more', 
          suffix: 'in Bislama.', 
          placeholder: 'Điền 1 từ...',
          answer: 'meanings', 
          primaryAnswer: 'meanings',
          acceptable: ['meanings', 'functions'],
          evidence: 'Words like \'from\' hold multiple meanings and syntactic roles in Bislama.',
          explanation: 'Các từ như "from" có nhiều tầng nghĩa phong phú hơn trong Bislama (meanings).'
        },
        { 
          id: 38, 
          number: 38,
          type: 'fill', 
          sectionTitle: 'Description & Vocabulary',
          label: 'Less than 10% of words are of', 
          suffix: 'origin.', 
          placeholder: 'Điền 1 từ...',
          answer: 'French', 
          primaryAnswer: 'French',
          acceptable: ['French', 'french'],
          evidence: 'Less than 10% of words are of French origin.',
          explanation: 'Chưa đầy 10% số từ có nguồn gốc từ tiếng Pháp (French).'
        },
        { 
          id: 39, 
          number: 39,
          type: 'fill', 
          sectionTitle: 'Description & Vocabulary',
          label: 'Pacific words describe the natural world and also local', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'culture', 
          primaryAnswer: 'culture',
          acceptable: ['culture', 'customs', 'traditions'],
          evidence: 'Pacific words describe the natural world and local culture and customs.',
          explanation: 'Các từ ngữ Thái Bình Dương mô tả tự nhiên và văn hóa / phong tục địa phương (culture / customs).'
        },
        { 
          id: 40, 
          number: 40,
          type: 'fill', 
          sectionTitle: 'Grammar',
          label: 'Grammar: The word \'long\' acts as an important', 
          suffix: 'in Bislama.', 
          placeholder: 'Điền 1 từ...',
          answer: 'preposition', 
          primaryAnswer: 'preposition',
          acceptable: ['preposition'],
          evidence: '\'long\' acts as a universal preposition covering in, on, at, and to.',
          explanation: 'Từ "long" đóng vai trò như một giới từ vạn năng (preposition) trong ngữ pháp Bislama.'
        },
      ]
    }
  ],
  transcript: `Audio Test 1 - Full Transcript
Speaker 1 [00:00:01] IELTS Listening Version 16208. You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and questions and you will have a chance to check your work.

Part 1: Beechen Festival Offers
Speaker 2 [00:01:49] Oh, hello. I want to check some details about the festival. Tickets are running out fast and my computer's down.
Speaker 1 [00:02:00] First activity is on June 19th at 7pm, a concert in the theater with local musicians.
Speaker 2 [00:02:09] Lovely. And for the next activity on the 20th?
Speaker 1 [00:03:03] The guided tour starts at 4:30 (ticket error said 3:40). Meet the guide at the station; it includes an old flour mill.
Speaker 1 [00:03:54] June 21st: children's cooking competition at Beechen Community Centre. Bring a plate for the dishes. Evening fireworks by the river.
Speaker 1 [00:05:45] Noise rules: events end by 11:15 pm. Parking in town centre is restricted this year. Web: www.beaconfestival.com. Feedback welcomed online.

Part 2: Walking Holiday in Spain
Speaker 3 [00:08:31] Good evening everyone. Gary Payne here for your walking holiday in Spain. The ferry crossing takes about 24 hours and holds 600 passengers. Pack medicines in a separate bag so you have immediate access. The hostel in La Vega de Liebana has good washing facilities, curfew at 11pm. Bring boots with thick soles, spare shoes, factor 30 suncream, and a waterproof folder for maps. High altitude brings sudden drops in temperatures and unique vegetation...

Part 3: Peer Assessment Research Discussion
Speaker 4 [00:15:25] Steve, students see peer assessment as a way for tutors to save time, but research shows it raises self-awareness. Disputed marks are reviewed by the tutor. Presentations were marked by both lecturers and students across the board. Male markers gave lower marks to women; women showed no significant bias. Younger students gave higher marks to older presenters; participants who helped set criteria also gave higher marks...

Part 4: Bislama - The Pidgin English of Vanuatu
Speaker 3 [00:22:18] Vanuatu has 81 active languages, 17 declining, and 8 endangered or extinct. English serves in the education system. Bislama was once dismissed as 'broken English'. After 1860, Vanuatu laborers worked in Australian plantations where the pidgin flourished. After 1950, large numbers moved to the city. Today Bislama is a developed pidgin. Words like 'from' have multiple meanings; less than 10% are of French origin; Pacific words capture local culture; and 'long' functions as an all-purpose preposition.`
};
