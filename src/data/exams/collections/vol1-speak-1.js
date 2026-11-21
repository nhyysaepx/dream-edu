// IELTS Collection 1 Speaking Test 1
// Full detail data for exam vol1-speak-1
// Standard IELTS Academic Speaking test with 3 parts (Part 1, Part 2 Cue Card, Part 3)

export const VOL1_SPEAK_1 = {
  id: 'vol1-speak-1',
  vol: 1,
  testNum: 1,
  title: 'IELTS Collection 1 Speaking Test 1',
  category: 'IELTS Academic',
  skill: 'Speaking',
  duration: 15,
  participants: 128450,
  commentsCount: 382,
  partsCount: 3,
  questionsCount: 7,
  tags: ['#IELTS Academic', '#Speaking', '#AI Scoring', '#Full 3 Parts'],
  speakingMockId: 'ielts-mock-speaking-01',
  description: 'Trọn bộ đề thi thử IELTS Speaking toàn diện 3 phần chuẩn format IDP / British Council: Part 1 (Phỏng vấn cá nhân phản xạ), Part 2 (Cue Card độc thoại 2 phút với 60s ghi chú dàn ý), Part 3 (Thảo luận chuyên sâu 2 chiều). Chấm điểm chuẩn xác 4 tiêu chí qua AI & Azure Speech.',
  parts: [
    {
      id: 1,
      partNumber: 1,
      title: 'Part 1: Introduction & Interview',
      name: 'Living accommodation & Leisure activities',
      questionRange: '1–3',
      questionCount: 3,
      tags: ['#[Speaking] Fluency', '#[Speaking] Daily Topics'],
      instruction: 'Trả lời các câu hỏi phản xạ cá nhân tự nhiên trong khoảng 25 - 35 giây mỗi câu.',
      questions: [
        {
          id: 's1-q1',
          prompt: 'Let’s talk about your accommodation. Do you live in a house or an apartment?',
          recommendedDuration: 30,
          sampleAnswerBand8: 'Currently, I am residing in a modern high-rise apartment in the city center. It has a magnificent view of the cityscape and offers convenient access to supermarkets and fitness centers.'
        },
        {
          id: 's1-q2',
          prompt: 'What is your favourite room in your home, and why do you like it?',
          recommendedDuration: 35,
          sampleAnswerBand8: 'Without a doubt, it would be my bedroom. I consider it my personal sanctuary where I can unwind, read books, and completely disconnect from academic pressures.'
        },
        {
          id: 's1-q3',
          prompt: 'In your free time, what do you usually do to relax after a busy day?',
          recommendedDuration: 35,
          sampleAnswerBand8: 'I typically put on my noise-cancelling headphones and listen to acoustic music. Occasionally, I go jogging around the local lake to revitalize both physically and mentally.'
        }
      ]
    },
    {
      id: 2,
      partNumber: 2,
      title: 'Part 2: Long Turn (Cue Card)',
      name: 'Describe an influential person you know',
      questionRange: '4',
      questionCount: 1,
      tags: ['#[Speaking] Cue Card', '#[Speaking] 2-min Monologue'],
      instruction: 'Chuẩn bị dàn ý trong 60 giây và nói liên tục từ 1 đến 2 phút không dừng.',
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
        sampleAnswerBand8: 'Today, I would like to talk about my high school English mentor, Ms. Huong, who has had a profound impact on both my academic journey and personal growth. She was not only exceptionally knowledgeable but also radiated boundless patience and empathy. When I struggled with self-doubt, she encouraged me to embrace mistakes as stepping stones to mastery. Her unwavering belief in my potential transformed my mindset, inspiring me to pursue my dreams with resilience.'
      }
    },
    {
      id: 3,
      partNumber: 3,
      title: 'Part 3: Two-way Discussion',
      name: 'Role models, Leadership & Mentorship in Society',
      questionRange: '5–7',
      questionCount: 3,
      tags: ['#[Speaking] Abstract Topics', '#[Speaking] Critical Thinking'],
      instruction: 'Mở rộng lập luận đa chiều, đưa ra quan điểm và phân tích xã hội trong khoảng 45 - 55 giây mỗi câu.',
      questions: [
        {
          id: 's3-q1',
          prompt: 'What types of people become role models for young people in your country today?',
          recommendedDuration: 45,
          sampleAnswerBand8: 'In modern society, social media influencers and tech innovators frequently capture the youth spotlight. However, many teenagers still find inspiration in unsung heroes such as dedicated doctors, scientists, and educators.'
        },
        {
          id: 's3-q2',
          prompt: 'Do you believe famous people have a social responsibility to set good examples?',
          recommendedDuration: 50,
          sampleAnswerBand8: 'Absolutely. Given that public figures command vast audiences, their actions and statements carry immense weight and can significantly shape societal values and youth behavior.'
        },
        {
          id: 's3-q3',
          prompt: 'How can parents and schools better guide teenagers in choosing healthy role models?',
          recommendedDuration: 50,
          sampleAnswerBand8: 'Rather than imposing rigid choices, educators and parents should foster critical thinking, guiding teenagers to evaluate individuals based on moral character, empathy, and integrity rather than superficial fame.'
        }
      ]
    }
  ]
};
