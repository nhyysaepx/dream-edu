// =============================================================================
// DREAM EDUCATION - IELTS SPEAKING PRACTICE & MOCK TEST DATA
// =============================================================================

export const SPEAKING_LEVELS = [
  { id: 'all', name: 'Tất cả' },
  { id: 'foundation', name: 'Foundation / Pre-IELTS', badge: 'Band 4.0 - 5.5' },
  { id: 'intermediate', name: 'Intermediate', badge: 'Band 5.5 - 6.5' },
  { id: 'advanced', name: 'Advanced / Intensive', badge: 'Band 6.5+' }
];

export const SPEAKING_TOPICS = [
  {
    id: 'sp-topic-hometown',
    title: 'Topic 01: Hometown & Neighborhood',
    session: 'Buổi 01 - Warm-up & Foundations',
    levelId: 'foundation',
    duration: '5 - 10 phút',
    part: 'Part 1',
    description: 'Rèn luyện phản xạ giới thiệu quê hương, nơi sinh sống, các tiện ích và sự thay đổi của khu vực bạn ở.',
    targetBand: 'Band 5.0 - 6.5',
    questions: [
      {
        id: 'ht-q1',
        prompt: 'Where is your hometown, and what is it like?',
        hintVi: 'Nêu vị trí địa lý (ví dụ: coastal city, mountainous area), quy mô, cảm nhận chung (peaceful, bustling).',
        recommendedDuration: 25,
        vocabKeywords: ['coastal city', 'bustling', 'hospitable residents', 'scenic views']
      },
      {
        id: 'ht-q2',
        prompt: 'What do you like most about living in your hometown?',
        hintVi: 'Chọn 1-2 điểm bạn thích nhất (ẩm thực, không khí trong lành, sự thân thiện của người dân) và đưa ví dụ ngắn.',
        recommendedDuration: 30,
        vocabKeywords: ['local delicacies', 'tranquil atmosphere', 'close-knit community', 'convenient amenities']
      },
      {
        id: 'ht-q3',
        prompt: 'Has your hometown changed much over the past few years?',
        hintVi: 'So sánh quá khứ và hiện tại (dùng thì hiện tại hoàn thành: has transformed, new infrastructure).',
        recommendedDuration: 35,
        vocabKeywords: ['dramatic transformation', 'skyscrapers', 'infrastructure upgrades', 'commercial complexes']
      }
    ]
  },
  {
    id: 'sp-topic-work-study',
    title: 'Topic 02: Work, Study & Ambitions',
    session: 'Buổi 02 - Career & Education',
    levelId: 'intermediate',
    duration: '8 - 12 phút',
    part: 'Part 1',
    description: 'Luyện tập trả lời tự nhiên về công việc hiện tại, ngành học, lý do lựa chọn và dự định trong tương lai.',
    targetBand: 'Band 6.0 - 7.0',
    questions: [
      {
        id: 'ws-q1',
        prompt: 'Do you work or are you a student? What do you do?',
        hintVi: 'Nêu rõ ngành nghề hoặc chuyên ngành học, giải thích ngắn gọn công việc/nội dung học hàng ngày.',
        recommendedDuration: 25,
        vocabKeywords: ['major in', 'undergraduate', 'fast-paced environment', 'specialize in']
      },
      {
        id: 'ws-q2',
        prompt: 'Why did you choose that field of study or career path?',
        hintVi: 'Nêu động lực cá nhân (đam mê, cơ hội nghề nghiệp, ảnh hưởng từ người thân).',
        recommendedDuration: 30,
        vocabKeywords: ['lucrative career prospects', 'follow my passion', 'hands-on experience', 'steep learning curve']
      },
      {
        id: 'ws-q3',
        prompt: 'What are your professional goals for the next five years?',
        hintVi: 'Dùng cấu trúc tương lai và mục tiêu (aspire to, climb the career ladder, expand my horizons).',
        recommendedDuration: 35,
        vocabKeywords: ['aspire to', 'climb the corporate ladder', 'broaden my horizons', 'master specialized skills']
      }
    ]
  },
  {
    id: 'sp-topic-technology',
    title: 'Topic 03: Technology & Artificial Intelligence',
    session: 'Buổi 03 - Science & Modern Life',
    levelId: 'advanced',
    duration: '10 - 15 phút',
    part: 'Part 1 & 3',
    description: 'Nâng cao vốn từ vựng học thuật và lập luận đa chiều về tác động của công nghệ và trí tuệ nhân tạo đối với cuộc sống.',
    targetBand: 'Band 6.5 - 7.5+',
    questions: [
      {
        id: 'tech-q1',
        prompt: 'What piece of technology could you not live without, and why?',
        hintVi: 'Nêu thiết bị cụ thể (smartphone, laptop) và các tác vụ thiết yếu nó hỗ trợ bạn hàng ngày.',
        recommendedDuration: 30,
        vocabKeywords: ['indispensable tool', 'streamline daily tasks', 'seamless connectivity', 'multitasking']
      },
      {
        id: 'tech-q2',
        prompt: 'How has Artificial Intelligence changed the way people study and work?',
        hintVi: 'Đưa ra cả mặt tích cực (tăng năng suất, giải đáp tức thì) và thách thức (phụ thuộc, mất kỹ năng tư duy).',
        recommendedDuration: 45,
        vocabKeywords: ['game changer', 'boost productivity', 'automated workflows', 'over-reliance']
      },
      {
        id: 'tech-q3',
        prompt: 'Do you think technology makes people feel more connected or more isolated?',
        hintVi: 'Lập luận cân bằng (nối khoảng cách địa lý nhưng giảm tương tác mặt-đối-mặt sâu sắc).',
        recommendedDuration: 45,
        vocabKeywords: ['double-edged sword', 'virtual interaction', 'diminish face-to-face rapport', 'social isolation']
      }
    ]
  },
  {
    id: 'sp-topic-travel',
    title: 'Topic 04: Travel, Tourism & Cultural Exchange',
    session: 'Buổi 04 - Global Citizenship',
    levelId: 'intermediate',
    duration: '8 - 12 phút',
    part: 'Part 1',
    description: 'Chia sẻ trải nghiệm du lịch, thói quen khám phá những vùng đất mới và ý nghĩa của việc giao lưu văn hóa.',
    targetBand: 'Band 6.0 - 7.0',
    questions: [
      {
        id: 'tr-q1',
        prompt: 'Do you prefer travelling alone or with a group of friends? Why?',
        hintVi: 'So sánh tự do khám phá theo lịch trình riêng vs niềm vui gắn kết, chia sẻ chi phí.',
        recommendedDuration: 30,
        vocabKeywords: ['itinerary', 'spontaneity', 'shared memories', 'split expenses']
      },
      {
        id: 'tr-q2',
        prompt: 'What kind of places do you usually like to visit when taking a vacation?',
        hintVi: 'Chọn giữa thiên nhiên yên tĩnh (retreat) hoặc thành phố năng động (cultural hubs) kèm lý do.',
        recommendedDuration: 35,
        vocabKeywords: ['off-the-beaten-track', 'breathtaking landscapes', 'unwind after hectic weeks', 'rich heritage']
      }
    ]
  },

  // ===========================================================================
  // CÁC BÀI LUYỆN TẬP MẪU THEO TỪNG LEVEL TRONG PHÒNG PRACTICE (IN-CLASS)
  // (Mỗi level có 1 bài mẫu ví dụ - Thầy/cô sẽ cập nhật câu hỏi chính thức sau)
  // ===========================================================================

  // --- 1. LỘ TRÌNH IELTS (4 LEVELS) ---
  {
    id: 'speaking-practice-ielts-beginner',
    title: 'Speaking Practice: Self-Introduction & Daily Hobbies',
    session: 'IELTS Beginner - Buổi 01 (Bài mẫu ví dụ)',
    levelId: 'ielts-beginner',
    category: 'ielts',
    duration: '10 - 15 phút',
    part: 'Part 1',
    description: 'Rèn luyện phản xạ phát âm cơ bản: Giới thiệu bản thân, chia sẻ sở thích và thói quen hàng ngày. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'Band 3.5 - 4.5',
    isExample: true,
    questions: [
      {
        id: 'beg-q1',
        prompt: 'Can you tell me a little bit about yourself, your family and what you do?',
        hintVi: 'Giới thiệu họ tên, độ tuổi, đang đi học hay đi làm, thành phố đang sống và gia đình có mấy người.',
        recommendedDuration: 25,
        vocabKeywords: ['student', 'nuclear family', 'coastal city', 'friendly atmosphere']
      },
      {
        id: 'beg-q2',
        prompt: 'What hobbies or sports do you enjoy doing in your free time?',
        hintVi: 'Kể tên 1-2 sở thích (nghe nhạc, chơi cầu lông, đọc sách) và lý do bạn thích làm việc đó.',
        recommendedDuration: 30,
        vocabKeywords: ['leisure activity', 'listen to acoustic music', 'unwind', 'stay energetic']
      },
      {
        id: 'beg-q3',
        prompt: 'Do you prefer spending your weekends at home or going out with friends?',
        hintVi: 'Nêu lựa chọn của bạn (ở nhà thư giãn hay ra ngoài quán cà phê/dạo phố) và cảm xúc mang lại.',
        recommendedDuration: 30,
        vocabKeywords: ['hang out', 'cozy atmosphere', 'recharge batteries', 'meaningful moments']
      }
    ]
  },
  {
    id: 'speaking-practice-pre-ielts',
    title: 'Speaking Practice: Hometown, Living Space & Friends',
    session: 'Pre-IELTS - Buổi 01 (Bài mẫu ví dụ)',
    levelId: 'pre-ielts',
    category: 'ielts',
    duration: '10 - 15 phút',
    part: 'Part 1',
    description: 'Rèn luyện phản xạ Part 1 chuẩn format: Miêu tả quê hương, không gian sống và những người bạn thân. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'Band 4.5 - 5.5',
    isExample: true,
    questions: [
      {
        id: 'pre-q1',
        prompt: 'Where is your hometown, and what do you like most about living there?',
        hintVi: 'Nêu vị trí địa lý (coastal city, peaceful suburb) và điểm bạn ấn tượng nhất (ẩm thực, sự thân thiện của người dân).',
        recommendedDuration: 30,
        vocabKeywords: ['coastal city', 'tranquil atmosphere', 'hospitable residents', 'local delicacies']
      },
      {
        id: 'pre-q2',
        prompt: 'What is your favourite room in your home, and why do you like spending time there?',
        hintVi: 'Mô tả phòng riêng (bedroom, balcony, living room) với ánh sáng, sự riêng tư và cảm giác thoải mái.',
        recommendedDuration: 30,
        vocabKeywords: ['private sanctuary', 'natural sunlight', 'cozy interior', 'peace of mind']
      },
      {
        id: 'pre-q3',
        prompt: 'How often do you see your close friends, and what do you usually do together?',
        hintVi: 'Nêu tần suất gặp mặt (cuối tuần, sau giờ học) và các hoạt động chung (uống cà phê, xem phim, ôn bài).',
        recommendedDuration: 35,
        vocabKeywords: ['catch up with', 'confide in', 'grab a coffee', 'cherished memories']
      }
    ]
  },
  {
    id: 'speaking-practice-ielts-foundation',
    title: 'Speaking Practice: Education, Career Path & Ambitions',
    session: 'IELTS Intermediate - Buổi 01 (Bài mẫu ví dụ)',
    levelId: 'ielts-foundation',
    category: 'ielts',
    duration: '12 - 15 phút',
    part: 'Part 1',
    description: 'Mở rộng vốn từ vựng và cấu trúc câu phức về chuyên ngành học, định hướng nghề nghiệp và kế hoạch tương lai. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'Band 5.5 - 6.5',
    isExample: true,
    questions: [
      {
        id: 'fnd-q1',
        prompt: 'Do you work or are you a student? What do you find most fulfilling about it?',
        hintVi: 'Nêu rõ ngành nghề hoặc chuyên ngành, điểm thú vị hoặc giá trị học hỏi bạn nhận được mỗi ngày.',
        recommendedDuration: 30,
        vocabKeywords: ['major in', 'fulfilling experience', 'gain hands-on knowledge', 'fast-paced environment']
      },
      {
        id: 'fnd-q2',
        prompt: 'Why did you choose that particular field of study or career direction?',
        hintVi: 'Giải thích động lực cá nhân (đam mê từ nhỏ, cơ hội thăng tiến, lời khuyên từ người có kinh nghiệm).',
        recommendedDuration: 35,
        vocabKeywords: ['lucrative prospects', 'follow my true calling', 'steep learning curve', 'professional development']
      },
      {
        id: 'fnd-q3',
        prompt: 'Where do you see yourself professionally in the next three to five years?',
        hintVi: 'Dùng các thì tương lai và collocations mục tiêu (aspire to, climb the career ladder, broaden expertise).',
        recommendedDuration: 40,
        vocabKeywords: ['aspire to', 'climb the corporate ladder', 'expand horizons', 'specialized expertise']
      }
    ]
  },
  {
    id: 'speaking-practice-intermediate-7',
    title: 'Speaking Part 2 - Bài Speaking 7: Places, Cities & Natural Attractions',
    session: 'IELTS Intermediate - Buổi 07',
    levelId: 'ielts-foundation',
    category: 'ielts',
    duration: '12 - 16 phút',
    part: 'Part 2',
    instantEvaluationPerQuestion: true,
    description: 'Luyện tập 4 đề Cue Card Part 2 trọng tâm: Miêu tả thành phố đang sống, Danh lam thắng cảnh yêu thích, Thắng cảnh thiên nhiên và Thành phố ước mơ trong tương lai. Nhận xét chi tiết 4 tiêu chí IELTS và chấm điểm phát âm IPA ngay sau mỗi bài nói.',
    targetBand: 'Band 5.5 - 6.5+',
    questions: [
      {
        id: 'sp7-q1',
        prompt: 'Describe the city you are living in',
        part: 'Part 2',
        recommendedDuration: 120,
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        bulletPoints: [
          'where the city is',
          'how long you have lived there',
          'what the city is famous for',
          'what you like and dislike about the city',
          'and explain whether you would like to continue living there in the future.'
        ],
        cueCard: {
          prompt: 'Describe the city you are living in',
          bulletPoints: [
            'where the city is',
            'how long you have lived there',
            'what the city is famous for',
            'what you like and dislike about the city',
            'and explain whether you would like to continue living there in the future.'
          ],
          tipsVi: 'Bạn có 60 giây để ghi chú dàn ý từ khóa vào giấy nháp. Sau đó nói liên tục trong 1 đến 2 phút.'
        },
        hintVi: 'Nêu vị trí địa lý (coastal city, bustling metropolis), thời gian gắn bó (born and bred, lived here for X years), nét đặc trưng nổi tiếng (ẩm thực đường phố, di tích lịch sử, nhịp sống), điểm thích (tiện nghi, con người thân thiện) và chưa thích (kẹt xe giờ cao điểm, chi phí sinh hoạt đắt đỏ), cùng dự định tương lai (định cư lâu dài vs chuyển về vùng ngoại ô).',
        vocabKeywords: ['bustling metropolis', 'born and bred', 'renowned for', 'vibrant nightlife', 'traffic congestion', 'steep cost of living', 'hospitable residents', 'settle down permanently']
      },
      {
        id: 'sp7-q2',
        prompt: 'Describe a tourist attraction you enjoyed visiting.',
        part: 'Part 2',
        recommendedDuration: 120,
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        bulletPoints: [
          'Where it is',
          'What you did there',
          'Who you went with',
          'And explain why you enjoyed it'
        ],
        cueCard: {
          prompt: 'Describe a tourist attraction you enjoyed visiting.',
          bulletPoints: [
            'Where it is',
            'What you did there',
            'Who you went with',
            'And explain why you enjoyed it'
          ],
          tipsVi: 'Bạn có 60 giây để ghi chú dàn ý từ khóa vào giấy nháp. Sau đó nói liên tục trong 1 đến 2 phút.'
        },
        hintVi: 'Nêu tên và vị trí điểm tham quan (Hội An, Hạ Long Bay, Bà Nà Hills, Tràng An), các hoạt động nổi bật (ngắm kiến trúc cổ, đi thuyền ngắm cảnh, thưởng thức đặc sản, chụp ảnh), người bạn đồng hành (gia đình, bạn thân), và lý do yêu thích (giải tỏa căng thẳng sau kỳ thi, hiểu thêm về văn hóa truyền thống, kỷ niệm khó quên).',
        vocabKeywords: ['tourist hotspot', 'breathtaking landscape', 'sample local delicacies', 'travel companion', 'unwind after hectic weeks', 'architectural masterpiece', 'leave a lasting impression']
      },
      {
        id: 'sp7-q3',
        prompt: 'Describe a natural place you like (a beach, mountain, etc.).',
        part: 'Part 2',
        recommendedDuration: 120,
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        bulletPoints: [
          'Where it is',
          'How you know it',
          'What you can see/do there',
          'And explain why you like it'
        ],
        cueCard: {
          prompt: 'Describe a natural place you like (a beach, mountain, etc.).',
          bulletPoints: [
            'Where it is',
            'How you know it',
            'What you can see/do there',
            'And explain why you like it'
          ],
          tipsVi: 'Bạn có 60 giây để ghi chú dàn ý từ khóa vào giấy nháp. Sau đó nói liên tục trong 1 đến 2 phút.'
        },
        hintVi: 'Chọn một địa điểm thiên nhiên cụ thể (bãi biển hoang sơ, đỉnh núi hùng vĩ, rừng nguyên sinh, hồ nước thanh bình), nguồn thông tin biết đến (bạn bè giới thiệu, travel vlog), cảnh quan và hoạt động trải nghiệm (ngắm hoàng hôn, leo núi trekking, hít thở không khí trong lành), giải thích cảm giác thư thái, hòa mình vào thiên nhiên để tái tạo năng lượng.',
        vocabKeywords: ['pristine beach', 'majestic mountain', 'word of mouth', 'escape the hustle and bustle', 'panoramic view', 'recharge one’s batteries', 'commune with nature', 'tranquil atmosphere']
      },
      {
        id: 'sp7-q4',
        prompt: 'Describe a city you would like to visit in the future.',
        part: 'Part 2',
        recommendedDuration: 120,
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        bulletPoints: [
          'Where it is',
          'How you know about it',
          'What you can do there',
          'And explain why you want to visit'
        ],
        cueCard: {
          prompt: 'Describe a city you would like to visit in the future.',
          bulletPoints: [
            'Where it is',
            'How you know about it',
            'What you can do there',
            'And explain why you want to visit'
          ],
          tipsVi: 'Bạn có 60 giây để ghi chú dàn ý từ khóa vào giấy nháp. Sau đó nói liên tục trong 1 đến 2 phút.'
        },
        hintVi: 'Nêu tên thành phố mơ ước (Tokyo, Paris, London, Melbourne, Singapore...), nguồn biết đến (phim ảnh, mạng xã hội, sách ảnh du lịch), các trải nghiệm mong muốn thực hiện (khám phá ẩm thực đường phố, thăm viện bảo tàng, chiêm ngưỡng công trình kiến trúc hiện đại xen lẫn cổ kính), lý do khao khát đặt chân tới (mở rộng tầm nhìn, trải nghiệm đa văn hóa).',
        vocabKeywords: ['bucket-list destination', 'cosmopolitan city', 'architectural marvels', 'culinary paradise', 'cross-cultural immersion', 'broaden one’s horizons', 'world-class public transit']
      }
    ]
  },
  {
    id: 'speaking-practice-ielts-advanced',
    title: 'Speaking Practice: Technology, AI & Modern Challenges',
    session: 'IELTS Advanced - Buổi 01 (Bài mẫu ví dụ)',
    levelId: 'ielts-advanced',
    category: 'ielts',
    duration: '15 - 20 phút',
    part: 'Part 1 & 3',
    description: 'Luyện tập tư duy phản biện, lập luận học thuật và sử dụng collocations cao cấp về công nghệ và xã hội. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'Band 6.5 - 8.0',
    isExample: true,
    questions: [
      {
        id: 'adv-q1',
        prompt: 'What piece of digital technology has become indispensable in your daily routine, and why?',
        hintVi: 'Nêu thiết bị/phần mềm thiết yếu và cách nó tối ưu hóa hiệu suất làm việc hoặc học tập của bạn.',
        recommendedDuration: 35,
        vocabKeywords: ['indispensable asset', 'streamline workflows', 'seamless connectivity', 'multitask efficiently']
      },
      {
        id: 'adv-q2',
        prompt: 'How is Artificial Intelligence reshaping the modern workforce and higher education?',
        hintVi: 'Lập luận cân bằng: tăng cường năng suất và cá nhân hóa việc học vs nguy cơ mất việc và giảm tư duy phản biện.',
        recommendedDuration: 45,
        vocabKeywords: ['paradigm shift', 'augment human capabilities', 'automated workflows', 'intellectual complacency']
      },
      {
        id: 'adv-q3',
        prompt: 'Do you believe rapid digital advancement brings people closer together or causes social isolation?',
        hintVi: 'Phân tích đa chiều: kết nối xuyên biên giới nhưng làm xói mòn các mối quan hệ giao tiếp mặt-đối-mặt sâu sắc.',
        recommendedDuration: 50,
        vocabKeywords: ['double-edged sword', 'virtual interaction', 'diminish interpersonal rapport', 'social estrangement']
      }
    ]
  },

  // --- 2. TIẾNG ANH PHỔ THÔNG (7 KHỐI LỚP 6 ĐẾN 12) ---
  {
    id: 'speaking-practice-grade-6',
    title: 'Tiếng Anh 6 Speaking: My New School & Friends',
    session: 'Lớp 6 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-6',
    category: 'school',
    duration: '8 - 12 phút',
    part: 'Unit 1-3 Review',
    description: 'Luyện nói tự tin về ngôi trường mới, thầy cô, bạn bè và các hoạt động yêu thích ở trường THCS. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'A1 - A2 / THCS',
    isExample: true,
    questions: [
      {
        id: 'g6-q1',
        prompt: 'Can you introduce yourself and tell me about your new school?',
        hintVi: 'Nêu tên, tuổi, tên trường THCS, các phòng chức năng ở trường (computer room, library, playground).',
        recommendedDuration: 25,
        vocabKeywords: ['secondary school', 'spacious playground', 'friendly classmates', 'well-equipped library']
      },
      {
        id: 'g6-q2',
        prompt: 'What is your favourite subject at school, and why do you like it?',
        hintVi: 'Nêu môn học yêu thích (English, Science, Maths) và lý do (thú vị, thầy cô vui tính, học được điều mới).',
        recommendedDuration: 25,
        vocabKeywords: ['favourite subject', 'fascinating', 'patient teacher', 'explore new things']
      },
      {
        id: 'g6-q3',
        prompt: 'Who is your best friend at school? What do you usually do together during break time?',
        hintVi: 'Giới thiệu bạn thân (ngoại hình, tính cách) và trò chơi cùng chơi trong giờ ra chơi.',
        recommendedDuration: 30,
        vocabKeywords: ['best friend', 'kind-hearted', 'play badminton', 'share snacks']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-7',
    title: 'Tiếng Anh 7 Speaking: Healthy Living & Community Activities',
    session: 'Lớp 7 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-7',
    category: 'school',
    duration: '8 - 12 phút',
    part: 'Unit 1-3 Review',
    description: 'Luyện nói về thói quen ăn uống lành mạnh, giữ gìn sức khỏe và tham gia hoạt động vì cộng đồng. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'A2 / THCS',
    isExample: true,
    questions: [
      {
        id: 'g7-q1',
        prompt: 'What healthy habits do you practice every day to stay fit and energized?',
        hintVi: 'Nêu các thói quen tốt (uống nhiều nước, ăn rau củ, đi ngủ sớm, tập thể dục buổi sáng).',
        recommendedDuration: 25,
        vocabKeywords: ['healthy diet', 'stay hydrated', 'morning exercise', 'avoid junk food']
      },
      {
        id: 'g7-q2',
        prompt: 'Have you ever taken part in community service or volunteer work? What did you do?',
        hintVi: 'Kể về hoạt động tình nguyện (dọn rác công viên, quyên góp sách cũ, trồng cây xanh quanh trường).',
        recommendedDuration: 30,
        vocabKeywords: ['community service', 'donate old books', 'plant green trees', 'help the needy']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-8',
    title: 'Tiếng Anh 8 Speaking: Life in the Countryside & Teen Leisure',
    session: 'Lớp 8 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-8',
    category: 'school',
    duration: '10 - 12 phút',
    part: 'Unit 1-3 Review',
    description: 'So sánh cuộc sống nông thôn với thành thị và thói quen giải trí lành mạnh của học sinh thời nay. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'A2 - B1 / THCS',
    isExample: true,
    questions: [
      {
        id: 'g8-q1',
        prompt: 'Do you prefer living in a quiet countryside or a bustling modern city? Why?',
        hintVi: 'So sánh không khí trong lành, sự yên bình của làng quê vs tiện ích hiện đại của thành phố.',
        recommendedDuration: 30,
        vocabKeywords: ['peaceful countryside', 'fresh air', 'bustling city life', 'modern conveniences']
      },
      {
        id: 'g8-q2',
        prompt: 'What leisure activities do teenagers in your area usually enjoy after school?',
        hintVi: 'Kể các hoạt động (chơi thể thao, lướt mạng xã hội, tham gia câu lạc bộ nghệ thuật).',
        recommendedDuration: 30,
        vocabKeywords: ['outdoor sports', 'social media', 'creative club', 'hang out together']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-9',
    title: 'Tiếng Anh 9 Speaking: Remembering the Past & Local Heritage',
    session: 'Lớp 9 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-9',
    category: 'school',
    duration: '10 - 15 phút',
    part: 'Unit 4 Review',
    description: 'Bàn luận về bảo tồn văn hóa truyền thống, làng nghề di sản và những thay đổi của quê hương qua thời gian. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'B1 / THCS',
    isExample: true,
    questions: [
      {
        id: 'g9-q1',
        prompt: 'Why is it essential for young generations to preserve traditional crafts and historical monuments?',
        hintVi: 'Nêu ý nghĩa của việc gìn giữ cội nguồn dân tộc, giá trị văn hóa và thu hút du lịch.',
        recommendedDuration: 35,
        vocabKeywords: ['cultural heritage', 'traditional crafts', 'national identity', 'historical values']
      },
      {
        id: 'g9-q2',
        prompt: 'How has lifestyle in your town or city transformed compared to your grandparents’ generation?',
        hintVi: 'So sánh phương tiện di chuyển, nhà cửa, công nghệ và cách liên lạc ngày xưa và ngày nay.',
        recommendedDuration: 35,
        vocabKeywords: ['dramatic transformation', 'technological boom', 'high-rise buildings', 'convenient lifestyle']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-10',
    title: 'Tiếng Anh 10 Speaking: Family Life & Eco-Friendly Living',
    session: 'Lớp 10 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-10',
    category: 'school',
    duration: '10 - 15 phút',
    part: 'Unit 1-3 Review',
    description: 'Chia sẻ về văn hóa gia đình, phân chia việc nhà và các hành động thiết thực của học sinh để bảo vệ môi trường. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'B1 / THPT',
    isExample: true,
    questions: [
      {
        id: 'g10-q1',
        prompt: 'How do family members in your household share domestic chores fairly?',
        hintVi: 'Kể về cách phân công việc nhà (nấu cơm, rửa bát, lau dọn) và ý nghĩa gắn kết gia đình.',
        recommendedDuration: 30,
        vocabKeywords: ['household chores', 'share the burden', 'family bond', 'mutual respect']
      },
      {
        id: 'g10-q2',
        prompt: 'What practical green habits can high school students adopt to protect the environment?',
        hintVi: 'Đề xuất giải pháp (mang bình nước cá nhân, tắt thiết bị điện khi ra khỏi lớp, phân loại rác).',
        recommendedDuration: 35,
        vocabKeywords: ['eco-friendly lifestyle', 'reduce single-use plastic', 'energy conservation', 'raise awareness']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-11',
    title: 'Tiếng Anh 11 Speaking: Generation Gap & Smart Cities',
    session: 'Lớp 11 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-11',
    category: 'school',
    duration: '12 - 15 phút',
    part: 'Unit 1-3 Review',
    description: 'Thảo luận về khoảng cách thế hệ trong gia đình và tầm nhìn về những thành phố thông minh, bền vững trong tương lai. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'B1+ / THPT',
    isExample: true,
    questions: [
      {
        id: 'g11-q1',
        prompt: 'What are the most common differences in viewpoints between teenagers and their parents today?',
        hintVi: 'Nêu sự khác biệt về định hướng nghề nghiệp, cách dùng mạng xã hội, phong cách sống và cách đối thoại hòa giải.',
        recommendedDuration: 35,
        vocabKeywords: ['generation gap', 'conflicting perspectives', 'career choices', 'open dialogue']
      },
      {
        id: 'g11-q2',
        prompt: 'What distinctive features will make future cities more livable, green and sustainable?',
        hintVi: 'Nêu hạ tầng thông minh (xe điện, năng lượng mặt trời, công viên xanh, quản lý rác thải AI).',
        recommendedDuration: 40,
        vocabKeywords: ['smart cities', 'renewable energy', 'eco-friendly transit', 'sustainable infrastructure']
      }
    ]
  },
  {
    id: 'speaking-practice-grade-12',
    title: 'Tiếng Anh 12 Speaking: Life Stories & Future Career Readiness',
    session: 'Lớp 12 - Global Success (Bài mẫu ví dụ)',
    levelId: 'grade-12',
    category: 'school',
    duration: '12 - 15 phút',
    part: 'Unit 1-3 Review',
    description: 'Luyện nói về câu chuyện cuộc đời của những tấm gương truyền cảm hứng và hành trang kỹ năng cho kỳ thi tốt nghiệp THPT & đại học. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'B2 / THPT',
    isExample: true,
    questions: [
      {
        id: 'g12-q1',
        prompt: 'Which famous historical or modern personality has inspired you the most in your life journey?',
        hintVi: 'Kể về một nhân vật kiệt xuất (nhà khoa học, lãnh tụ, doanh nhân), phẩm chất kiên cường và bài học bạn rút ra.',
        recommendedDuration: 40,
        vocabKeywords: ['inspirational figure', 'unwavering determination', 'overcome adversity', 'leave a lasting legacy']
      },
      {
        id: 'g12-q2',
        prompt: 'What essential soft skills do you think high school graduates need most to thrive at university and in the workforce?',
        hintVi: 'Phân tích các kỹ năng quan trọng (giao tiếp, làm việc nhóm, quản lý thời gian, tư duy thích ứng).',
        recommendedDuration: 40,
        vocabKeywords: ['adaptability', 'critical thinking', 'time management', 'teamwork collaboration']
      }
    ]
  },

  // --- 3. KHUNG CHUẨN CHÂU ÂU CEFR (4 LEVELS: A2, B1, B2, C1) ---
  {
    id: 'speaking-practice-cefr-a2',
    title: 'CEFR A2 Speaking: Daily Routines & Shopping Habits',
    session: 'Level A2 - Pre-Intermediate (Bài mẫu ví dụ)',
    levelId: 'a2',
    category: 'cefr',
    duration: '8 - 12 phút',
    part: 'Part 1',
    description: 'Thực hành hội thoại thường nhật: Thói quen sinh hoạt và sở thích mua sắm. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'CEFR A2',
    isExample: true,
    questions: [
      {
        id: 'a2-q1',
        prompt: 'Can you describe what you usually do on a typical weekday from morning to night?',
        hintVi: 'Nêu thời gian biểu trong ngày (thức dậy, ăn sáng, đi làm/đi học, nghỉ ngơi buổi tối).',
        recommendedDuration: 25,
        vocabKeywords: ['daily routine', 'commute', 'prepare breakfast', 'relax in the evening']
      },
      {
        id: 'a2-q2',
        prompt: 'Do you prefer shopping for clothes online or visiting physical stores? Why?',
        hintVi: 'So sánh sự tiện lợi khi mua online vs việc được thử đồ trực tiếp tại cửa hàng.',
        recommendedDuration: 30,
        vocabKeywords: ['online shopping', 'try on clothes', 'convenient delivery', 'bargain price']
      }
    ]
  },
  {
    id: 'speaking-practice-cefr-b1',
    title: 'CEFR B1 Speaking: Memorable Journeys & Cultural Exchange',
    session: 'Level B1 - Intermediate (Bài mẫu ví dụ)',
    levelId: 'b1',
    category: 'cefr',
    duration: '10 - 15 phút',
    part: 'Part 1',
    description: 'Chia sẻ trải nghiệm du lịch đáng nhớ và sự hòa nhập vào nền văn hóa mới. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'CEFR B1',
    isExample: true,
    questions: [
      {
        id: 'b1-q1',
        prompt: 'Describe a memorable journey you took with your family or friends.',
        hintVi: 'Kể về địa điểm, phương tiện, hoạt động nổi bật và lý do chuyến đi đọng lại nhiều kỷ niệm đẹp.',
        recommendedDuration: 35,
        vocabKeywords: ['breathtaking destination', 'unforgettable memories', 'local cuisine', 'hospitality']
      },
      {
        id: 'b1-q2',
        prompt: 'What are the main benefits of traveling and learning about other foreign cultures?',
        hintVi: 'Mở rộng thế giới quan, rèn luyện sự cởi mở và nâng cao khả năng giao tiếp.',
        recommendedDuration: 35,
        vocabKeywords: ['broaden perspectives', 'cultural exchange', 'step out of comfort zone', 'lifelong friendships']
      }
    ]
  },
  {
    id: 'speaking-practice-cefr-b2',
    title: 'CEFR B2 Speaking: Mass Media & Environmental Sustainability',
    session: 'Level B2 - Upper-Intermediate (Bài mẫu ví dụ)',
    levelId: 'b2',
    category: 'cefr',
    duration: '12 - 15 phút',
    part: 'Part 1 & 3',
    description: 'Thảo luận về tầm ảnh hưởng của truyền thông đại chúng và phát triển kinh tế bền vững gắn liền với bảo vệ môi trường. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'CEFR B2',
    isExample: true,
    questions: [
      {
        id: 'b2-q1',
        prompt: 'To what extent does social media shape modern youth behavior and public opinions?',
        hintVi: 'Phân tích cả tác động tích cực (lan tỏa thông điệp xã hội) và tiêu cực (tin giả, áp lực hình tượng ảo).',
        recommendedDuration: 40,
        vocabKeywords: ['mass media influence', 'shape public opinion', 'misinformation', 'peer pressure']
      },
      {
        id: 'b2-q2',
        prompt: 'How can governments and corporations collaborate to promote environmental sustainability?',
        hintVi: 'Nêu các chính sách khuyến khích năng lượng tái tạo, giảm khí thải carbon và áp thuế môi trường.',
        recommendedDuration: 45,
        vocabKeywords: ['environmental sustainability', 'carbon footprint', 'renewable energy', 'stringent regulations']
      }
    ]
  },
  {
    id: 'speaking-practice-cefr-c1',
    title: 'CEFR C1 Speaking: Globalization, Technology & Human Values',
    session: 'Level C1 - Advanced (Bài mẫu ví dụ)',
    levelId: 'c1',
    category: 'cefr',
    duration: '15 - 20 phút',
    part: 'Part 1 & 3',
    description: 'Lập luận chuyên sâu về tác động của toàn cầu hóa đối với bản sắc văn hóa và vai trò không thể thay thế của con người trong kỷ nguyên máy móc. (Nội dung câu hỏi mẫu - Giáo viên sẽ cập nhật thêm câu hỏi sau).',
    targetBand: 'CEFR C1',
    isExample: true,
    questions: [
      {
        id: 'c1-q1',
        prompt: 'Does economic globalization inevitably lead to the homogenization of local cultural identities?',
        hintVi: 'Phân tích sự giao thoa văn hóa toàn cầu: làm giàu ngôn ngữ và phong cách sống vs nguy cơ mai một bản sắc dân tộc độc bản.',
        recommendedDuration: 45,
        vocabKeywords: ['cultural homogenization', 'global interconnectedness', 'preserve heritage', 'cultural assimilation']
      },
      {
        id: 'c1-q2',
        prompt: 'In an era dominated by automation and generative intelligence, which human virtues remain fundamentally irreplaceable?',
        hintVi: 'Nêu các phẩm chất đặc trưng của con người (sự thấu cảm, đạo đức, sáng tạo nghệ thuật đích thực và khả năng cảm thụ cảm xúc).',
        recommendedDuration: 50,
        vocabKeywords: ['irreplaceable virtues', 'genuine empathy', 'ethical judgment', 'creative consciousness']
      }
    ]
  }
];

export const SPEAKING_MOCK_TESTS = [
  {
    id: 'ielts-mock-speaking-01',
    title: 'IELTS Speaking Mock Test 01 (Standard Academic & General)',
    session: 'Phòng Thi Thử Số 01',
    level: 'Full Test (Part 1 - 2 - 3)',
    duration: '11 - 14 phút',
    badge: 'Chuẩn format IDP / BC',
    description: 'Mô phỏng chân thực phòng thi IELTS Speaking: Part 1 khởi động phản xạ, Part 2 độc thoại 2 phút kèm 1 phút chuẩn bị dàn ý, Part 3 thảo luận chiều sâu.',
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Introduction & Interview (4 - 5 phút)',
        topic: 'Living accommodation & Leisure activities',
        questions: [
          {
            id: 'm1-p1-q1',
            prompt: 'Let’s talk about your accommodation. Do you live in a house or an apartment?',
            recommendedDuration: 30,
            hintVi: 'Mô tả ngắn gọn loại nhà, tầng, phòng yêu thích và không gian xung quanh.'
          },
          {
            id: 'm1-p1-q2',
            prompt: 'What is your favourite room in your home, and why do you like it?',
            recommendedDuration: 35,
            hintVi: 'Nêu phòng nào (ví dụ bedroom, balcony) và lý do (riêng tư, nhiều ánh sáng, thư giãn).'
          },
          {
            id: 'm1-p1-q3',
            prompt: 'In your free time, what do you usually do to relax after a busy day?',
            recommendedDuration: 35,
            hintVi: 'Nêu sở thích thư giãn (đọc sách, tập thể dục, nghe podcast) và cảm xúc mang lại.'
          }
        ]
      },
      {
        partNumber: 2,
        title: 'Part 2: Long Turn / Cue Card (3 - 4 phút)',
        topic: 'Describe an influential person you know',
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        cueCard: {
          prompt: 'Describe a person who has had a strong positive influence on your life.',
          bulletPoints: [
            'Who this person is and how you know them',
            'What qualities or characteristics they have',
            'What specific advice or action they gave you',
            'And explain why they have had such a strong impact on you.'
          ],
          tipsVi: 'Bạn có đúng 60 giây để ghi chú dàn ý (sử dụng giấy nháp). Sau đó nói liên tục trong 1 đến 2 phút không dừng lại.'
        }
      },
      {
        partNumber: 3,
        title: 'Part 3: Two-way Discussion (4 - 5 phút)',
        topic: 'Role models, Leadership & Mentorship in Society',
        questions: [
          {
            id: 'm1-p3-q1',
            prompt: 'What types of people become role models for young people in your country today?',
            recommendedDuration: 45,
            hintVi: 'So sánh giữa người nổi tiếng (celebrities, influencers) và những người truyền cảm hứng thầm lặng (thầy cô, nhà khoa học).'
          },
          {
            id: 'm1-p3-q2',
            prompt: 'Do you believe famous people have a social responsibility to set good examples?',
            recommendedDuration: 50,
            hintVi: 'Lập luận vì sao sự nổi tiếng đi kèm sức ảnh hưởng hành vi, nhất là với thế hệ trẻ dễ bị tác động.'
          },
          {
            id: 'm1-p3-q3',
            prompt: 'How can parents and schools better guide teenagers in choosing healthy role models?',
            recommendedDuration: 50,
            hintVi: 'Đề xuất giải pháp cụ thể: rèn luyện tư duy phản biện (critical thinking), định hướng giá trị nhân văn.'
          }
        ]
      }
    ]
  },
  {
    id: 'ielts-mock-speaking-02',
    title: 'IELTS Speaking Mock Test 02 (Environment & Urban Life)',
    session: 'Phòng Thi Thử Số 02',
    level: 'Full Test (Part 1 - 2 - 3)',
    duration: '11 - 14 phút',
    badge: 'Chủ đề Hot 2026',
    description: 'Trọn bộ đề thi thử cập nhật xu hướng đề thi mới nhất: Thói quen bảo vệ môi trường, cuộc sống đô thị và giao thông công cộng.',
    parts: [
      {
        partNumber: 1,
        title: 'Part 1: Daily Habits & Public Transportation (4 - 5 phút)',
        topic: 'Transportation & Daily routines',
        questions: [
          {
            id: 'm2-p1-q1',
            prompt: 'What type of public transport do you usually take in your daily life?',
            recommendedDuration: 30,
            hintVi: 'Kể tên phương tiện (xe bus, metro, xe máy) và lý do lựa chọn (chi phí, độ linh hoạt).'
          },
          {
            id: 'm2-p1-q2',
            prompt: 'Do you think public transport in your city has improved recently?',
            recommendedDuration: 35,
            hintVi: 'Nêu sự thay đổi (tuyến đường mới, app đặt vé, xe điện thân thiện môi trường).'
          }
        ]
      },
      {
        partNumber: 2,
        title: 'Part 2: Long Turn / Cue Card (3 - 4 phút)',
        topic: 'Describe an eco-friendly habit or activity',
        prepTimeSeconds: 60,
        speakTimeSeconds: 120,
        cueCard: {
          prompt: 'Describe something you did to help protect the environment.',
          bulletPoints: [
            'What you did and when you started doing it',
            'How you learned about this environmental problem',
            'Whether other people around you supported your action',
            'And explain how you felt after doing this activity.'
          ],
          tipsVi: 'Có 60 giây ghi từ khóa và liên kết ý (firstly, subsequently, as a consequence).'
        }
      },
      {
        partNumber: 3,
        title: 'Part 3: Global Environmental Challenges & Solutions',
        topic: 'Sustainable Development & Government Roles',
        questions: [
          {
            id: 'm2-p3-q1',
            prompt: 'Should individuals or governments take the primary responsibility for tackling pollution?',
            recommendedDuration: 50,
            hintVi: 'Lập luận cần sự chung tay: Chính phủ ban hành luật và đầu tư hạ tầng xanh, cá nhân nâng cao ý thức tiêu dùng.'
          },
          {
            id: 'm2-p3-q2',
            prompt: 'How can education foster environmental awareness among children from an early age?',
            recommendedDuration: 50,
            hintVi: 'Hoạt động ngoại khóa thực tế, phân loại rác, trồng cây tại trường học.'
          }
        ]
      }
    ]
  }
];

export function getSpeakingTopicById(id) {
  return SPEAKING_TOPICS.find((t) => t.id === id) || SPEAKING_TOPICS[0];
}

export function getSpeakingMockTestById(id) {
  return SPEAKING_MOCK_TESTS.find((m) => m.id === id) || SPEAKING_MOCK_TESTS[0];
}
