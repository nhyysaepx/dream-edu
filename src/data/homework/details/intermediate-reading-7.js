// IELTS Intermediate Reading 7: Machines, Processes & Cycles
// Full homework detail for intermediate-reading-7
// Passages:
//   1. Thomas Newcomen’s Steam Engine (Diagram Labelling: 8 questions)
//   2. The Production of Fuel-Ethanol (Flowchart Completion: 9 questions)
//   3. Coffee Rust (Diagram Labelling, Multiple Choice & Sentence Matching: 14 questions)

export const INTERMEDIATE_READING_7_P1_DETAIL = {
  id: 'intermediate-reading-7-p1',
  title: 'HOMEWORK - Reading 7 - Bài 1: Thomas Newcomen’s Steam Engine',
  level: 'IELTS Intermediate',
  session: 'Buổi 7 - Reading 7 (Diagram Labelling - No More Than Two Words)',
  skill: 'Reading',
  description: 'Ghi nhãn sơ đồ nguyên lý hoạt động của máy hơi nước Thomas Newcomen. Điền tối đa 2 từ trực tiếp từ bài đọc vào các vị trí 1–8.',
  totalQuestions: 8,
  duration: '15 - 20 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: 'Reading Passage 1: Thomas Newcomen’s Steam Engine',
      shortTitle: 'Bài 1: Sơ đồ máy hơi nước Newcomen',
      wordLimit: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      instruction: 'Label the diagram using NO MORE THAN TWO WORDS from the passage for each blank space.',
      diagramImage: '/images/homework/newcomen-steam-engine-diagram.png',
      diagramTitle: 'Thomas Newcomen’s Atmospheric Steam Engine',
      diagramCaption: 'Label the diagram using no more than TWO words from the passage below for each blank space.',
      content: `Thomas Newcomen’s steam engine was one of the first devices to use the power of steam for mechanical work. It was originally used to pump water from mines. A boiler, encased in brick and sitting over a coal fire, generated steam, which drove the piston in the open top cylinder above the boiler. When the steam built up, the pressure opened a valve allowing the steam to fill the cylinder and push the piston up. When the piston reached the top of the cylinder, the first valve was closed and the second valve opened. This second valve sprayed cold water into the cylinder from a cistern, condensing the steam and creating a vacuum. The air pressure from the open-top cylinder pushed the piston down again, thus pulling the rod down with it. The cycle then repeated itself all over again.`,
      questions: [
        {
          id: 'ir7_p1_q1',
          number: 1,
          question: 'Label 1:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['boiler', 'a boiler', 'Boiler', 'A boiler', 'the boiler', 'The boiler'],
          primaryAnswer: 'boiler',
          evidence: 'A boiler, encased in brick and sitting over a coal fire, generated steam, which drove the piston in the open top cylinder above the boiler.',
          explanation: 'Đoạn văn mô tả phần bình chứa được bọc gạch đặt bên trên lò than là "boiler" (nồi hơi): "A boiler, encased in brick and sitting over a coal fire, generated steam...".'
        },
        {
          id: 'ir7_p1_q2',
          number: 2,
          question: 'Label 2:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['steam', 'Steam', 'the steam', 'The steam'],
          primaryAnswer: 'steam',
          evidence: 'A boiler, encased in brick and sitting over a coal fire, generated steam, which drove the piston in the open top cylinder above the boiler.',
          explanation: 'Nồi hơi đặt trên lò than đun nóng tạo ra "steam" (hơi nước) bốc lên: "...generated steam, which drove the piston...".'
        },
        {
          id: 'ir7_p1_q3',
          number: 3,
          question: 'Label 3:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['piston', 'the piston', 'Piston', 'The piston'],
          primaryAnswer: 'piston',
          evidence: '...generated steam, which drove the piston in the open top cylinder above the boiler.',
          explanation: 'Hơi nước đẩy bộ phận chuyển động tịnh tiến lên xuống trong xi lanh là "piston" (pít-tông): "...drove the piston in the open top cylinder above the boiler".'
        },
        {
          id: 'ir7_p1_q4',
          number: 4,
          question: 'Label 4:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['cylinder', 'open top cylinder', 'open-top cylinder', 'the cylinder', 'Cylinder', 'an open top cylinder', 'the open top cylinder'],
          primaryAnswer: 'cylinder',
          evidence: '...which drove the piston in the open top cylinder above the boiler.',
          explanation: 'Buồng chứa pít-tông nằm phía trên nồi hơi là xi lanh "cylinder" (hoặc "open top cylinder"): "...in the open top cylinder above the boiler".'
        },
        {
          id: 'ir7_p1_q5',
          number: 5,
          question: 'Label 5:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['first valve', 'the first valve', 'First valve', 'The first valve', 'a valve', 'valve'],
          primaryAnswer: 'first valve',
          evidence: 'When the steam built up, the pressure opened a valve allowing the steam to fill the cylinder and push the piston up. When the piston reached the top of the cylinder, the first valve was closed and the second valve opened.',
          explanation: 'Van thứ nhất cho phép hơi nước nạp vào xi lanh và đóng lại khi pít-tông lên đến đỉnh: "...the first valve was closed and the second valve opened".'
        },
        {
          id: 'ir7_p1_q6',
          number: 6,
          question: 'Label 6:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['second valve', 'the second valve', 'Second valve', 'The second valve', 'valve'],
          primaryAnswer: 'second valve',
          evidence: 'When the piston reached the top of the cylinder, the first valve was closed and the second valve opened. This second valve sprayed cold water into the cylinder from a cistern...',
          explanation: 'Van thứ hai mở ra để phun nước lạnh vào xi lanh: "...the second valve opened. This second valve sprayed cold water into the cylinder from a cistern...".'
        },
        {
          id: 'ir7_p1_q7',
          number: 7,
          question: 'Label 7:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['cold water', 'water', 'Cold water', 'Water', 'the cold water'],
          primaryAnswer: 'cold water',
          evidence: 'This second valve sprayed cold water into the cylinder from a cistern, condensing the steam and creating a vacuum.',
          explanation: 'Chất lỏng trong bể chứa dùng để phun vào xi lanh làm ngưng tụ hơi nước là "cold water" (nước lạnh): "This second valve sprayed cold water into the cylinder from a cistern...".'
        },
        {
          id: 'ir7_p1_q8',
          number: 8,
          question: 'Label 8:',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['cistern', 'a cistern', 'the cistern', 'Cistern', 'A cistern', 'The cistern'],
          primaryAnswer: 'cistern',
          evidence: 'This second valve sprayed cold water into the cylinder from a cistern, condensing the steam and creating a vacuum.',
          explanation: 'Bồn/bể chứa nước lạnh cấp vào van là "cistern" (bể chứa): "...sprayed cold water into the cylinder from a cistern...".'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_7_P2_DETAIL = {
  id: 'intermediate-reading-7-p2',
  title: 'HOMEWORK - Reading 7 - Bài 2: The Production of Fuel-Ethanol',
  level: 'IELTS Intermediate',
  session: 'Buổi 7 - Reading 7 (Flowchart Completion - No More Than Two Words)',
  skill: 'Reading',
  description: 'Hoàn thành lưu đồ quy trình sản xuất cồn sinh học (fuel-ethanol) từ nông sản. Điền tối đa 2 từ trực tiếp từ bài đọc vào các bước 1–9.',
  totalQuestions: 9,
  duration: '15 - 20 phút',
  passages: [
    {
      id: 'p2',
      number: 2,
      title: 'Reading Passage 2: The Production of Fuel-Ethanol',
      shortTitle: 'Bài 2: Quy trình sản xuất cồn sinh học',
      wordLimit: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      instruction: 'Complete the chart using NO MORE THAN TWO WORDS from the passage for each answer.',
      content: `The production of fuel-ethanol or ‘grain spirit’ from grain is relatively straightforward. It is made from harvested crops. As the demand for alternative ‘clean’ fuels increases, farmers are switching from planting crops for consumption to fuel crops like corn, barley, wheat or others that produce oil like palm and rape seed. The growing process is no different from that of any crop. A farmer simply plants a field of corn, which is then harvested. Instead of being taken to a mill to produce flour, the corn is delivered by lorry to a distillery where it goes through four main stages before it can be used as fuel. First, during a preparation phase, the grain is ground and then cooked prior to the fermentation process commencing. Then, before the distillation of the liquid to produce the ethanol takes place, solid matter has to be removed by filtration. At a fuel-ethanol plant, the blending of ethanol and petroleum is carried out to produce E-10, a mix of 10 per cent ethanol and 90 per cent petroleum, or E-15, which is 15 per cent ethanol and 85 per cent petroleum. The liquid is then put into storage and the distribution process is ready to begin.`,
      questions: [
        {
          id: 'ir7_p2_q1',
          number: 1,
          romanNumber: 'Ex 2.1',
          isSectionStart: true,
          sectionTitle: 'FLOWCHART: THE PRODUCTION OF ETHANOL FOR FUEL',
          sectionInstruction: 'Complete the chart using NO MORE THAN TWO WORDS from the passage for each answer.',
          wordLimit: 'NO MORE THAN TWO WORDS',
          question: 'The production of ethanol for fuel: Field planted with (1) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['corn', 'Corn', 'fuel crops', 'crops'],
          primaryAnswer: 'corn',
          evidence: 'A farmer simply plants a field of corn, which is then harvested.',
          explanation: 'Đoạn văn nêu rõ nông dân trồng cánh đồng ngô để làm nhiên liệu sinh học: "A farmer simply plants a field of corn, which is then harvested."'
        },
        {
          id: 'ir7_p2_q2',
          number: 2,
          romanNumber: 'Ex 2.2',
          question: 'Grain transported to (2) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['distillery', 'a distillery', 'Distillery', 'A distillery', 'the distillery'],
          primaryAnswer: 'distillery',
          evidence: '...the corn is delivered by lorry to a distillery where it goes through four main stages before it can be used as fuel.',
          explanation: 'Hạt ngô sau thu hoạch được xe tải chuyển tới nhà máy chưng cất "distillery": "...delivered by lorry to a distillery...".'
        },
        {
          id: 'ir7_p2_q3',
          number: 3,
          romanNumber: 'Ex 2.3',
          question: 'Stage one - before (3) ........................................, the corn prepared by grinding and then cooking',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['fermentation', 'fermentation process', 'the fermentation process', 'Fermentation', 'the fermentation'],
          primaryAnswer: 'fermentation',
          evidence: 'First, during a preparation phase, the grain is ground and then cooked prior to the fermentation process commencing.',
          explanation: 'Trước khi quá trình lên men bắt đầu (prior to = before), ngô được xay và nấu: "...cooked prior to the fermentation process commencing."'
        },
        {
          id: 'ir7_p2_q4',
          number: 4,
          romanNumber: 'Ex 2.4',
          question: 'Stage two - (4) ........................................ to remove solid matter',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['filtration', 'Filtration', 'by filtration'],
          primaryAnswer: 'filtration',
          evidence: 'Then, before the distillation of the liquid to produce the ethanol takes place, solid matter has to be removed by filtration.',
          explanation: 'Chất rắn được loại bỏ thông qua bước lọc "filtration": "...solid matter has to be removed by filtration."'
        },
        {
          id: 'ir7_p2_q5',
          number: 5,
          romanNumber: 'Ex 2.5',
          question: 'Stage three - (5) ........................................ takes place',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['distillation', 'the distillation', 'Distillation', 'The distillation'],
          primaryAnswer: 'distillation',
          evidence: 'Then, before the distillation of the liquid to produce the ethanol takes place, solid matter has to be removed by filtration.',
          explanation: 'Giai đoạn ba là quá trình chưng cất chất lỏng diễn ra để tạo ethanol: "...the distillation of the liquid to produce the ethanol takes place...".'
        },
        {
          id: 'ir7_p2_q6',
          number: 6,
          romanNumber: 'Ex 2.6',
          question: 'Liquid transported to (6) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['fuel-ethanol plant', 'a fuel-ethanol plant', 'fuel ethanol plant', 'a fuel ethanol plant', 'Fuel-ethanol plant', 'Fuel ethanol plant'],
          primaryAnswer: 'fuel-ethanol plant',
          evidence: 'At a fuel-ethanol plant, the blending of ethanol and petroleum is carried out to produce E-10... or E-15...',
          explanation: 'Dung dịch cồn được chuyển tới nhà máy sản xuất cồn nhiên liệu "fuel-ethanol plant" để pha chế: "At a fuel-ethanol plant, the blending of ethanol and petroleum is carried out...".'
        },
        {
          id: 'ir7_p2_q7',
          number: 7,
          romanNumber: 'Ex 2.7',
          question: 'Stage four - (7) ........................................ of ethanol and petroleum to form E-10 or E-15',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['blending', 'the blending', 'Blending', 'The blending'],
          primaryAnswer: 'blending',
          evidence: 'At a fuel-ethanol plant, the blending of ethanol and petroleum is carried out to produce E-10, a mix of 10 per cent ethanol and 90 per cent petroleum, or E-15...',
          explanation: 'Giai đoạn bốn là quá trình phối trộn giữa cồn ethanol và xăng dầu: "...the blending of ethanol and petroleum is carried out to produce E-10... or E-15...".'
        },
        {
          id: 'ir7_p2_q8',
          number: 8,
          romanNumber: 'Ex 2.8',
          question: 'Liquid then into (8) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['storage', 'Storage'],
          primaryAnswer: 'storage',
          evidence: 'The liquid is then put into storage and the distribution process is ready to begin.',
          explanation: 'Hỗn hợp nhiên liệu sau đó được bơm vào bồn/kho lưu trữ "storage": "The liquid is then put into storage...".'
        },
        {
          id: 'ir7_p2_q9',
          number: 9,
          romanNumber: 'Ex 2.9',
          question: 'before (9) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 2 từ)...',
          acceptedAnswers: ['distribution', 'distribution process', 'the distribution process', 'Distribution', 'the distribution'],
          primaryAnswer: 'distribution',
          evidence: 'The liquid is then put into storage and the distribution process is ready to begin.',
          explanation: 'Nhiên liệu được lưu trữ trước khi bước vào công đoạn phân phối ra thị trường: "...and the distribution process is ready to begin."'
        }
      ]
    }
  ]
};

export const INTERMEDIATE_READING_7_P3_DETAIL = {
  id: 'intermediate-reading-7-p3',
  title: 'HOMEWORK - Reading 7 - Bài 3: Coffee Rust',
  level: 'IELTS Intermediate',
  session: 'Buổi 7 - Reading 7 (Diagram Labelling, Multiple Choice & Sentence Matching)',
  skill: 'Reading',
  description: 'Nghiên cứu dịch nấm gỉ sắt cà phê Hemileia vastatrix: sơ đồ tác hại trên cây, câu hỏi trắc nghiệm phát tán và ghép nối câu về lịch sử di chuyển nông nghiệp.',
  totalQuestions: 14,
  duration: '25 - 30 phút',
  passages: [
    {
      id: 'p3',
      number: 3,
      title: 'Reading Passage 3: Coffee Rust',
      shortTitle: 'Bài 3: Dịch nấm gỉ sắt cà phê',
      wordLimit: 'NO MORE THAN THREE WORDS',
      maxWords: 3,
      instruction: 'Questions 1–7: Complete the diagram below. Choose NO MORE THAN THREE WORDS from the passage for each answer. Questions 8–9: Choose the correct letter, A, B, C or D. Questions 10–14: Complete each sentence with the correct ending, A–G.',
      content: `Coffee rust
Why do the British drink so much tea? The answer to this question can be traced back, unexpectedly, to a humble fungus, Hemileia vastatrix, which attacks the leaves of coffee plants causing a disease popularly known as coffee rust. The appearance of this disease was first reported in the British colony of Ceylon (now Sri Lanka) in 1867. Over the next twenty years, coffee production in Asia and Africa was virtually wiped out. Following a period of severe economic and social upheaval, planters in British colonies switched to planting tea, and the British were gradually transformed into a nation of tea drinkers.

Under British rule, the island of Ceylon was stripped of its forests to turn over every available acre to coffee production. By the 1870s, Ceylon was exporting nearly 100 million pounds of coffee a year, much of it to England. This empire, however, was swiftly devastated by the arrival of the coffee rust fungus.

The rust organism can be recognized by the presence of yellowish powdery lesions on the undersides of the leaves of the coffee plant. Occasionally, green shoots and even the green coffee berries can be infected. The infected leaves drop prematurely, leaving long expanses of bare twigs. This defoliation causes shoots and roots to starve and consequently to die back, reducing the number of nodes on which coffee can be produced the following season.

The rust fungus is dispersed by both wind and rain. By observing the patterns of infection on individual leaves, it can be deduced that splashing rain is the most important means of local, or short-range dispersal. Dispersal over wider areas is primarily by wind, although insects such as flies and wasps may also play a small part. How the fungus first made its way from its native Ethiopia to Ceylon is unknown, but human intervention seems to be the only plausible explanation. Insects as carriers can be ruled out, and it is doubtful whether the fungus could have blown so far.

The coffee growers probably hoped at first that the disease would disappear as quickly and unaccountably as it had begun. By 1879, however, it was clear that it was not going away, and the Ceylon government made an appeal for someone to be sent to help. The British government responded by sending Harry Marshall Ward, whose brief was to investigate the coffee rust phenomenon and hopefully come up with a cure.

Ward recommended that to effectively protect the plant from invasion, the leaves should be treated with a coating of fungicide (lime-sulfur). Unfortunately, in the case of the Ceylon plantations, the rust epidemic was too well established for this protective measure to save the coffee trees. He also pointed out the risks of intensive monoculture. The continuous planting of coffee trees over the island, without even the benefit of windbreaks, had created a perfect environment for a fungus epidemic to spread. Despite Ward’s warning, when the coffee trees were replaced with tea bushes, they were planted at the same density. It was only by good fortune that no similar fungus arrived to invade the tea bushes and that improved fungicides were soon available to protect the crop.

With the destruction of the coffee plantations in Ceylon and subsequent arrival of coffee rust in Java and Sumatra, the world’s coffee production shifted to the Americas. Plantations were swiftly established in the tropical highlands of Brazil, Colombia and Central America. Brazil soon became the world’s major coffee supplier, closely followed by Colombia. Coffee rust was successfully excluded from the Americas for over 100 years by careful quarantine measures. However, in 1970, the fungus was discovered in Brazil, again probably brought in accidentally by humans. Once the barrier of the oceans had been breached, wind dispersal came into play. Infected trees were isolated by creating an 80 km coffee-less ‘safety zone’ around the infected area, but within eighteen months the rust had jumped the gap in the direction of the prevailing winds.

Today, the fungus has spread throughout all the coffee-growing areas, including Colombia and the countries of Central America. Fungicide applications are now part of the routine production practices on coffee plantations, despite the expense for small growers. Good cultural management, taking into account the density of planting and the climate, is also paramount. Rust-resistant strains of coffee have also been developed but the crop is of poorer quality. Unless a truly rust-resistant variety with more desirable genetic traits can be produced, coffee rust will have to be managed as a continuous epidemic on a perennial crop.`,
      questions: [
        // Section 1: Diagram Completion (Questions 1–7)
        {
          id: 'ir7_p3_q1',
          number: 1,
          romanNumber: 'Ex 3.1',
          isSectionStart: true,
          sectionTitle: 'PART 1: COMPLETE THE DIAGRAM (QUESTIONS 1–7)',
          sectionInstruction: 'Complete the diagram below. Choose NO MORE THAN THREE WORDS from the passage for each answer.',
          wordLimit: 'NO MORE THAN THREE WORDS',
          sectionImage: '/images/homework/coffee-rust-diagram.png',
          sectionImageTitle: 'Impact of Coffee Rust on Coffee Plant (Questions 1–7)',
          sectionImageCaption: 'Complete the diagram below using no more than THREE words from the passage for each blank space.',
          question: 'Appearance of (1) ........................................ on the underside of coffee leaves',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: [
            'yellowish powdery lesions',
            'yellow powdery lesions',
            'powdery lesions',
            'yellowish lesions',
            'lesions',
            'Yellowish powdery lesions',
            'Powdery lesions'
          ],
          primaryAnswer: 'yellowish powdery lesions',
          evidence: 'The rust organism can be recognized by the presence of yellowish powdery lesions on the undersides of the leaves of the coffee plant.',
          explanation: 'Đoạn 3 chỉ ra dấu hiệu nhận biết của nấm trên mặt dưới của lá là những tổn thương dạng bột màu vàng: "presence of yellowish powdery lesions on the undersides of the leaves...".'
        },
        {
          id: 'ir7_p3_q2',
          number: 2,
          romanNumber: 'Ex 3.2',
          question: 'Rust on (2) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['green shoots', 'shoots', 'Green shoots', 'Shoots'],
          primaryAnswer: 'green shoots',
          evidence: 'Occasionally, green shoots and even the green coffee berries can be infected.',
          explanation: 'Đoạn 3 cho biết thỉnh thoảng các chồi non xanh cũng bị nhiễm bệnh: "Occasionally, green shoots and even the green coffee berries can be infected."'
        },
        {
          id: 'ir7_p3_q3',
          number: 3,
          romanNumber: 'Ex 3.3',
          question: 'and (3) ........................................ berries',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['green', 'green coffee', 'Green', 'Green coffee'],
          primaryAnswer: 'green',
          evidence: 'Occasionally, green shoots and even the green coffee berries can be infected.',
          explanation: 'Đoạn 3 chỉ ra ngay cả những quả cà phê còn xanh cũng bị nhiễm nấm: "...and even the green coffee berries can be infected."'
        },
        {
          id: 'ir7_p3_q4',
          number: 4,
          romanNumber: 'Ex 3.4',
          question: '(4) ........................................ falling prematurely',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['infected leaves', 'leaves', 'Infected leaves', 'Leaves', 'defoliation'],
          primaryAnswer: 'infected leaves',
          evidence: 'The infected leaves drop prematurely, leaving long expanses of bare twigs.',
          explanation: 'Đoạn 3 nêu rõ các lá bị nhiễm bệnh rụng sớm (drop prematurely = falling prematurely): "The infected leaves drop prematurely...".'
        },
        {
          id: 'ir7_p3_q5',
          number: 5,
          romanNumber: 'Ex 3.5',
          question: 'leads to twigs becoming (5) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['bare', 'Bare', 'bare twigs'],
          primaryAnswer: 'bare',
          evidence: 'The infected leaves drop prematurely, leaving long expanses of bare twigs.',
          explanation: 'Lá rụng sớm khiến các cành cây trở nên trơ trụi: "...leaving long expanses of bare twigs".'
        },
        {
          id: 'ir7_p3_q6',
          number: 6,
          romanNumber: 'Ex 3.6',
          question: 'Starving roots caused by (6) ........................................',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['defoliation', 'Defoliation', 'shoots and roots', 'starvation'],
          primaryAnswer: 'defoliation',
          evidence: 'This defoliation causes shoots and roots to starve and consequently to die back...',
          explanation: 'Hiện tượng rụng lá hàng loạt (defoliation) khiến chồi và rễ bị thiếu chất dinh dưỡng (starve): "This defoliation causes shoots and roots to starve...".'
        },
        {
          id: 'ir7_p3_q7',
          number: 7,
          romanNumber: 'Ex 3.7',
          question: 'Number of coffee (7) ........................................ reduced',
          placeholder: 'Điền câu trả lời (tối đa 3 từ)...',
          acceptedAnswers: ['nodes', 'Nodes', 'coffee nodes'],
          primaryAnswer: 'nodes',
          evidence: '...reducing the number of nodes on which coffee can be produced the following season.',
          explanation: 'Hiện tượng chết mòn làm giảm số lượng mắt/đốt cành để tạo quả vụ sau: "...reducing the number of nodes on which coffee can be produced...".'
        },

        // Section 2: Multiple Choice Questions (Questions 8–9)
        {
          id: 'ir7_p3_q8',
          number: 8,
          romanNumber: 'Ex 3.8',
          isSectionStart: true,
          sectionTitle: 'PART 2: MULTIPLE CHOICE QUESTIONS (QUESTIONS 8–9)',
          sectionInstruction: 'Choose the correct letter, A, B, C or D.',
          options: [
            { letter: 'A', text: 'rain.' },
            { letter: 'B', text: 'wind.' },
            { letter: 'C', text: 'wasps.' },
            { letter: 'D', text: 'flies.' }
          ],
          question: '8. The most important means of long-range dispersal is',
          placeholder: 'Điền chữ cái (A–D)...',
          acceptedAnswers: ['B', 'b', 'wind', 'B. wind'],
          primaryAnswer: 'B',
          evidence: 'Dispersal over wider areas is primarily by wind, although insects such as flies and wasps may also play a small part.',
          explanation: 'Đoạn 4 nêu rõ phát tán trên diện rộng (wider areas = long-range dispersal) chủ yếu diễn ra do gió (primarily by wind). Do đó đáp án đúng là B.'
        },
        {
          id: 'ir7_p3_q9',
          number: 9,
          romanNumber: 'Ex 3.9',
          options: [
            { letter: 'A', text: 'due to the density of the coffee trees.' },
            { letter: 'B', text: 'due to the windbreaks.' },
            { letter: 'C', text: 'because the fungicide didn’t work.' },
            { letter: 'D', text: 'because it was well established.' }
          ],
          question: '9. Coffee rust spread easily in Ceylon',
          placeholder: 'Điền chữ cái (A–D)...',
          acceptedAnswers: ['A', 'a', 'due to the density of the coffee trees', 'A. due to the density of the coffee trees'],
          primaryAnswer: 'A',
          evidence: 'He also pointed out the risks of intensive monoculture. The continuous planting of coffee trees over the island, without even the benefit of windbreaks, had created a perfect environment for a fungus epidemic to spread.',
          explanation: 'Đoạn 6 phân tích rủi ro của phương thức độc canh (intensive monoculture), cây cà phê được trồng liên tục với mật độ quá dày đặc mà không có rào chắn gió, tạo điều kiện thuận lợi cho nấm lây lan nhanh chóng. Do đó đáp án đúng là A.'
        },

        // Section 3: Matching Sentence Endings (Questions 10–14)
        {
          id: 'ir7_p3_q10',
          number: 10,
          romanNumber: 'Ex 3.10',
          isSectionStart: true,
          sectionTitle: 'PART 3: MATCHING SENTENCE ENDINGS (QUESTIONS 10–14)',
          sectionInstruction: 'Complete each sentence with the correct ending, A–G.',
          sectionWordBank: [
            { letter: 'A', word: 'the density of planting and the climate.' },
            { letter: 'B', word: 'the application of fungicide.' },
            { letter: 'C', word: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', word: 'the increased demand for coffee in Europe.' },
            { letter: 'E', word: 'careful quarantine measures.' },
            { letter: 'F', word: 'the genetic traits of the coffee tree.' },
            { letter: 'G', word: 'the prevailing winds.' }
          ],
          options: [
            { letter: 'A', text: 'the density of planting and the climate.' },
            { letter: 'B', text: 'the application of fungicide.' },
            { letter: 'C', text: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', text: 'the increased demand for coffee in Europe.' },
            { letter: 'E', text: 'careful quarantine measures.' },
            { letter: 'F', text: 'the genetic traits of the coffee tree.' },
            { letter: 'G', text: 'the prevailing winds.' }
          ],
          question: '10. The move of coffee production to the Americas was triggered by',
          placeholder: 'Điền chữ cái (A–G)...',
          acceptedAnswers: ['C', 'c', 'the coffee rust devastation in Ceylon', 'C. the coffee rust devastation in Ceylon'],
          primaryAnswer: 'C',
          evidence: 'With the destruction of the coffee plantations in Ceylon and subsequent arrival of coffee rust in Java and Sumatra, the world’s coffee production shifted to the Americas.',
          explanation: 'Đoạn 7 chỉ ra việc sản xuất cà phê dịch chuyển sang châu Mỹ bắt nguồn từ sự tàn phá hủy diệt của bệnh gỉ sắt tại các đồn điền ở Ceylon (destruction = devastation). Do đó đáp án là C.'
        },
        {
          id: 'ir7_p3_q11',
          number: 11,
          romanNumber: 'Ex 3.11',
          options: [
            { letter: 'A', text: 'the density of planting and the climate.' },
            { letter: 'B', text: 'the application of fungicide.' },
            { letter: 'C', text: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', text: 'the increased demand for coffee in Europe.' },
            { letter: 'E', text: 'careful quarantine measures.' },
            { letter: 'F', text: 'the genetic traits of the coffee tree.' },
            { letter: 'G', text: 'the prevailing winds.' }
          ],
          question: '11. Before 1970, American plantations were protected through',
          placeholder: 'Điền chữ cái (A–G)...',
          acceptedAnswers: ['E', 'e', 'careful quarantine measures', 'E. careful quarantine measures'],
          primaryAnswer: 'E',
          evidence: 'Coffee rust was successfully excluded from the Americas for over 100 years by careful quarantine measures. However, in 1970, the fungus was discovered in Brazil...',
          explanation: 'Đoạn 7 nêu rõ trước năm 1970, các đồn điền châu Mỹ đã được bảo vệ thành công hơn một thế kỷ nhờ các biện pháp kiểm dịch cẩn trọng (careful quarantine measures). Do đó đáp án là E.'
        },
        {
          id: 'ir7_p3_q12',
          number: 12,
          romanNumber: 'Ex 3.12',
          options: [
            { letter: 'A', text: 'the density of planting and the climate.' },
            { letter: 'B', text: 'the application of fungicide.' },
            { letter: 'C', text: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', text: 'the increased demand for coffee in Europe.' },
            { letter: 'E', text: 'careful quarantine measures.' },
            { letter: 'F', text: 'the genetic traits of the coffee tree.' },
            { letter: 'G', text: 'the prevailing winds.' }
          ],
          question: '12. Attempts in the Americas to isolate the infected trees failed due to',
          placeholder: 'Điền chữ cái (A–G)...',
          acceptedAnswers: ['G', 'g', 'the prevailing winds', 'G. the prevailing winds'],
          primaryAnswer: 'G',
          evidence: 'Infected trees were isolated by creating an 80 km coffee-less ‘safety zone’ around the infected area, but within eighteen months the rust had jumped the gap in the direction of the prevailing winds.',
          explanation: 'Đoạn 7 giải thích nỗ lực thiết lập vùng cách ly 80km thất bại vì nấm đã vượt qua khoảng trống theo chiều hướng của những ngọn gió chủ đạo (prevailing winds). Do đó đáp án là G.'
        },
        {
          id: 'ir7_p3_q13',
          number: 13,
          romanNumber: 'Ex 3.13',
          options: [
            { letter: 'A', text: 'the density of planting and the climate.' },
            { letter: 'B', text: 'the application of fungicide.' },
            { letter: 'C', text: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', text: 'the increased demand for coffee in Europe.' },
            { letter: 'E', text: 'careful quarantine measures.' },
            { letter: 'F', text: 'the genetic traits of the coffee tree.' },
            { letter: 'G', text: 'the prevailing winds.' }
          ],
          question: '13. The coffee trees now have to be protected continuously by',
          placeholder: 'Điền chữ cái (A–G)...',
          acceptedAnswers: ['B', 'b', 'the application of fungicide', 'B. the application of fungicide'],
          primaryAnswer: 'B',
          evidence: 'Fungicide applications are now part of the routine production practices on coffee plantations, despite the expense for small growers.',
          explanation: 'Đoạn 8 cho biết việc bôi/phun thuốc trừ nấm (fungicide applications) ngày nay đã trở thành biện pháp bảo vệ thường quy không thể thiếu trên các đồn điền cà phê. Do đó đáp án là B.'
        },
        {
          id: 'ir7_p3_q14',
          number: 14,
          romanNumber: 'Ex 3.14',
          options: [
            { letter: 'A', text: 'the density of planting and the climate.' },
            { letter: 'B', text: 'the application of fungicide.' },
            { letter: 'C', text: 'the coffee rust devastation in Ceylon.' },
            { letter: 'D', text: 'the increased demand for coffee in Europe.' },
            { letter: 'E', text: 'careful quarantine measures.' },
            { letter: 'F', text: 'the genetic traits of the coffee tree.' },
            { letter: 'G', text: 'the prevailing winds.' }
          ],
          question: '14. In the management of the coffee crops, it is also important to consider',
          placeholder: 'Điền chữ cái (A–G)...',
          acceptedAnswers: ['A', 'a', 'the density of planting and the climate', 'A. the density of planting and the climate'],
          primaryAnswer: 'A',
          evidence: 'Good cultural management, taking into account the density of planting and the climate, is also paramount.',
          explanation: 'Đoạn 8 chỉ ra rằng phương pháp canh tác tốt đòi hỏi phải tính đến (taking into account = consider) mật độ trồng trọt và điều kiện khí hậu. Do đó đáp án là A.'
        }
      ]
    }
  ]
};

// Main bundle exported for Homework Session 7 (Single Card on Homework List)
export const INTERMEDIATE_READING_7_DETAIL = {
  id: 'intermediate-reading-7',
  vocabId: 'intermediate-reading-7',
  title: 'HOMEWORK - Reading 7 - Machines, Processes & Coffee Rust (Full Lesson 7)',
  level: 'IELTS Intermediate',
  session: 'Buổi 7 - Reading 7 (Trọn bộ 3 Bài tập: Steam Engine, Fuel-Ethanol & Coffee Rust)',
  skill: 'Reading',
  description: 'Trọn bộ 3 bài đọc Buổi 7 gồm 31 câu hỏi: Bài 1 (Diagram Labelling - Newcomen Steam Engine), Bài 2 (Flowchart Completion - Fuel-Ethanol Production) và Bài 3 (Coffee Rust - Diagram, Multiple Choice & Sentence Matching).',
  totalQuestions: 31,
  duration: '50 - 60 phút',
  passages: [
    {
      ...INTERMEDIATE_READING_7_P1_DETAIL.passages[0],
      id: 'p1',
      number: 1,
      shortTitle: 'Bài 1: Sơ đồ máy hơi nước Newcomen',
      questions: INTERMEDIATE_READING_7_P1_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number
      }))
    },
    {
      ...INTERMEDIATE_READING_7_P2_DETAIL.passages[0],
      id: 'p2',
      number: 2,
      shortTitle: 'Bài 2: Quy trình cồn sinh học',
      questions: INTERMEDIATE_READING_7_P2_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number + 8,
        romanNumber: `Ex 2.${q.number}`
      }))
    },
    {
      ...INTERMEDIATE_READING_7_P3_DETAIL.passages[0],
      id: 'p3',
      number: 3,
      shortTitle: 'Bài 3: Dịch nấm gỉ sắt cà phê',
      questions: INTERMEDIATE_READING_7_P3_DETAIL.passages[0].questions.map(q => ({
        ...q,
        number: q.number + 17,
        romanNumber: `Ex 3.${q.number}`
      }))
    }
  ]
};
