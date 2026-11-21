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
