// IELTS Collection 1 Reading Test 1
// Full detail data for exam vol1-read-1
// Standard IELTS Academic Reading test with 3 passages and 40 questions

export const VOL1_READ_1 = {
  id: 'vol1-read-1',
  vol: 1,
  testNum: 1,
  title: 'IELTS Collection 1 Reading Test 1',
  category: 'IELTS Academic',
  skill: 'Reading',
  duration: 60,
  participants: 260979,
  commentsCount: 551,
  partsCount: 3,
  questionsCount: 40,
  tags: ['#IELTS Academic', '#Reading'],
  parts: [
    { 
      id: 1, 
      title: 'Passage 1', 
      name: 'The development of the silk industry', 
      questionRange: '1–13', 
      questionCount: 13, 
      tags: ['#[Reading] Notes Completion', '#[Reading] True/False/Not Given'],
      instruction: 'Questions 1–7: Complete the notes below. Choose ONE WORD ONLY from the passage for each answer. Questions 8–13: Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
      wordLimit: 'ONE WORD ONLY',
      maxWords: 1,
      readingText: `Silk, a natural fibre produced by a particular worm called a silkworm, has been used in clothing for many centuries.

When silk was first discovered in China over 4,500 years ago, it was reserved exclusively for the use of the emperor, his close relations and the very highest of his dignitaries. Within the palace, the emperor is believed to have worn a robe of white silk; outside, he, his principal wife, and the heir to the throne wore yellow, the colour of the earth.

Gradually silk came into more general use, and the various classes of Chinese society began wearing tunics of silk. As well as being used for clothing and decoration, silk was quite quickly put to industrial use, and rapidly became one of the principal elements of the Chinese economy. It was used in the production of musical instruments, as string for fishing, and even as the world's first luxury paper. Eventually even the common people were able to wear garments of silk.

During the Han dynasty (206 BC-220 AD), silk ceased to be a mere fabric and became a form of currency. Farmers paid their taxes in grain and silk, and silk was used to pay civil servants and to reward subjects for outstanding services. Values were calculated in lengths of silk as they had previously been calculated in weight of gold. Before long, silk became a currency used in trade with foreign countries, which continued into the Tang dynasty (616-907 AD). It is possible that this added importance was the result of a major increase in production. Silk also found its way so thoroughly into the Chinese language that 230 of the 5,000 most common characters of Mandarin have 'silk' as their key component. Silk became a precious commodity, highly sought after by other countries from an early date, and it is believed that the silk trade actually existed before the Silk Road was officially opened in the second century BC. An Egyptian mummy with a silk thread in her hair, dating from 1070 BC, has been discovered in the village of Deir el Medina near the Valley of the Kings, and is probably the earliest evidence of the silk trade. During the second century BC, the Chinese emperor Han Wu Di's ambassadors travelled as far west as Persia and Mesopotamia, bearing gifts including silks. A range of important finds of Chinese silks have also been made along the Silk Road. One of the most dramatic of these finds was some Tang silk discovered in 1900. It is believed that around 1015 AD Buddhist monks, possibly alarmed by the threat of invasion by Tibetan people, had sealed more than ten thousand manuscripts and silk paintings, silk banners and textiles in caves near Dunhuang, a trading station on the Silk Road in north-west China.

Some historians believe the first Europeans to set eyes upon the fabulous fabric were the Roman legions of Marcus Licinius Crassus, Governor of Syria. According to certain accounts of the period, at an important battle near the Euphrates River in 53 BC, the Roman soldiers were so startled by the bright silken banners of the enemy that they fled in panic. Yet, within decades Chinese silks were widely worn by the rich and noble families of Rome. The Roman Emperor Heliogabalus (218-222 AD) wore nothing but silk. By 380 AD, the Roman historian Marcellinus Ammianus reported that the use of silk, which was once confined to the nobility, has now spread to all classes without distinction - even to the lowest. The desire for silk continued to increase over the centuries. Despite this demand, the price of silk remained very high.

In spite of their secrecy about production methods, the Chinese eventually lost their monopoly on silk production. Knowledge of silk production methods reached Korea around 200 BC, when waves of Chinese immigrants arrived there. Shortly after 300 AD, it travelled westward, and the cultivation of the silkworm was established in India.

Around 550 AD silk production reached the Middle East. Records indicate that two monks from Constantinople (modern-day Istanbul), capital of the Byzantine Empire, appeared at their emperor's court with silkworm eggs which they had obtained secretly, and hidden in their hollow bamboo walking sticks. Under their supervision the eggs hatched into worms, and the worms spun silk threads. Byzantium was in the silk business at last. The Byzantine church and state created imperial workshops, monopolising production and keeping the secret to themselves. This allowed a silk industry to be established, undercutting the market for ordinary-grade Chinese silk. However, high quality silk textiles, woven in China especially for the Middle Eastern market, continued to achieve high prices in the West, and trade along the Silk Road continued as before. By the sixth century the Persians, too, had mastered the art of silk weaving, developing their own rich patterns and techniques. But it wasn't until the 13th century that Italy began silk production, with the introduction of 2,000 skilled silk weavers from Constantinople. Eventually, silk production became widespread throughout Europe.

World silk production has approximately doubled during the last 30 years in spite of man-made fibres replacing certain uses of silk. Before this period, China and Japan were the two main producers, together manufacturing more than 50 per cent of world production each year. After the late 1970s, however, China dramatically increased its silk production, and once again became the world's leading producer.`,
      questions: [
        { 
          id: 1, 
          number: 1,
          type: 'fill', 
          sectionTitle: 'Early Uses of Silk',
          instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage.',
          label: 'Clothing: Emperor wore', 
          suffix: 'silk when outside the palace.', 
          placeholder: 'Điền 1 từ...',
          answer: 'yellow', 
          primaryAnswer: 'yellow',
          acceptable: ['yellow'],
          evidence: 'outside, he, his principal wife, and the heir to the throne wore yellow, the colour of the earth.',
          explanation: 'Đoạn 2 nêu rõ khi ở bên ngoài hoàng cung, hoàng đế mặc trang phục lụa màu vàng (yellow).'
        },
        { 
          id: 2, 
          number: 2,
          type: 'fill', 
          sectionTitle: 'Early Uses of Silk',
          label: 'In industry: Silk items included parts of musical instruments, fishing strings and', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'paper', 
          primaryAnswer: 'paper',
          acceptable: ['paper'],
          evidence: "It was used in the production of musical instruments, as string for fishing, and even as the world's first luxury paper.",
          explanation: 'Đoạn 3 nêu lụa được dùng làm nhạc cụ, dây câu cá và cả loại giấy cao cấp đầu tiên (paper).'
        },
        { 
          id: 3, 
          number: 3,
          type: 'fill', 
          sectionTitle: 'Currency & Trade',
          label: 'Currency: Silk was used as payment of', 
          suffix: 'as well as for wages and rewards.', 
          placeholder: 'Điền 1 từ...',
          answer: 'taxes', 
          primaryAnswer: 'taxes',
          acceptable: ['taxes', 'tax'],
          evidence: 'Farmers paid their taxes in grain and silk, and silk was used to pay civil servants and to reward subjects for outstanding services.',
          explanation: 'Đoạn 4 nêu nông dân nộp thuế (taxes) bằng lụa và ngũ cốc.'
        },
        { 
          id: 4, 
          number: 4,
          type: 'fill', 
          sectionTitle: 'Currency & Trade',
          label: 'Silk replaced', 
          suffix: 'as a unit of value.', 
          placeholder: 'Điền 1 từ...',
          answer: 'gold', 
          primaryAnswer: 'gold',
          acceptable: ['gold'],
          evidence: 'Values were calculated in lengths of silk as they had previously been calculated in weight of gold.',
          explanation: 'Đoạn 4 chỉ ra giá trị được tính bằng độ dài lụa thay vì trọng lượng vàng (gold).'
        },
        { 
          id: 5, 
          number: 5,
          type: 'fill', 
          sectionTitle: 'Currency & Trade',
          label: 'Silk was soon used as payment in', 
          suffix: 'trade with other nations.', 
          placeholder: 'Điền 1 từ...',
          answer: 'foreign', 
          primaryAnswer: 'foreign',
          acceptable: ['foreign', 'international'],
          evidence: 'Before long, silk became a currency used in trade with foreign countries',
          explanation: 'Đoạn 4 viết lụa trở thành tiền tệ dùng trong giao thương với nước ngoài (foreign trade).'
        },
        { 
          id: 6, 
          number: 6,
          type: 'fill', 
          sectionTitle: 'Evidence of Silk Trade',
          label: '1070 BC, Egypt: hair of a', 
          suffix: 'contained silk thread.', 
          placeholder: 'Điền 1 từ...',
          answer: 'mummy', 
          primaryAnswer: 'mummy',
          acceptable: ['mummy'],
          evidence: 'An Egyptian mummy with a silk thread in her hair, dating from 1070 BC, has been discovered in the village of Deir el Medina',
          explanation: 'Đoạn 4 nêu sợi lụa được tìm thấy trong tóc của một xác ướp (mummy) Ai Cập năm 1070 TCN.'
        },
        { 
          id: 7, 
          number: 7,
          type: 'fill', 
          sectionTitle: 'Evidence of Silk Trade',
          label: '1015 AD, north-west China: silk objects were hidden inside', 
          suffix: 'near Dunhuang.', 
          placeholder: 'Điền 1 từ...',
          answer: 'caves', 
          primaryAnswer: 'caves',
          acceptable: ['caves', 'cave'],
          evidence: 'Buddhist monks, possibly alarmed by the threat of invasion by Tibetan people, had sealed more than ten thousand manuscripts and silk paintings, silk banners and textiles in caves near Dunhuang',
          explanation: 'Đoạn 4 ghi nhận hơn 10.000 tranh và hiện vật lụa được niêm phong trong các hang động (caves) gần Đôn Hoàng.'
        },
        { 
          id: 8, 
          number: 8,
          type: 'choice', 
          instruction: 'Do the following statements agree with the information in Reading Passage 1? Choose TRUE, FALSE, or NOT GIVEN.',
          question: 'Their first sight of silk created fear among Roman soldiers.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'TRUE',
          primaryAnswer: 'TRUE',
          evidence: 'at an important battle near the Euphrates River in 53 BC, the Roman soldiers were so startled by the bright silken banners of the enemy that they fled in panic.',
          explanation: 'Binh lính La Mã khi lần đầu thấy cờ lụa sáng màu của quân thù đã hoảng sợ bỏ chạy tán loạn -> Đúng (TRUE).'
        },
        { 
          id: 9, 
          number: 9,
          type: 'choice', 
          question: 'The quality of Chinese silk imported by the early Romans varied widely.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'NOT GIVEN',
          primaryAnswer: 'NOT GIVEN',
          evidence: 'Yet, within decades Chinese silks were widely worn by the rich and noble families of Rome.',
          explanation: 'Bài đọc chỉ nhắc lụa được giới quý tộc La Mã mặc phổ biến, không nhắc đến việc chất lượng lụa có chênh lệch hay biến động lớn hay không -> Không được đề cập (NOT GIVEN).'
        },
        { 
          id: 10, 
          number: 10,
          type: 'choice', 
          question: 'The Byzantine emperor first acquired silkworm eggs from the Chinese emperor.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'two monks from Constantinople... appeared at their emperor\'s court with silkworm eggs which they had obtained secretly, and hidden in their hollow bamboo walking sticks.',
          explanation: 'Hoàng đế Byzantine có được trứng tằm từ 2 tu sĩ bí mật giấu trong gậy trúc mang về chứ không phải do hoàng đế Trung Hoa tặng -> Sai (FALSE).'
        },
        { 
          id: 11, 
          number: 11,
          type: 'choice', 
          question: 'The price of high-grade Chinese silk fell due to competition from Middle-Eastern producers.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'However, high quality silk textiles, woven in China especially for the Middle Eastern market, continued to achieve high prices in the West',
          explanation: 'Lụa chất lượng cao của Trung Quốc vẫn tiếp tục giữ mức giá cao ở phương Tây chứ không hề giảm giá -> Sai (FALSE).'
        },
        { 
          id: 12, 
          number: 12,
          type: 'choice', 
          question: 'Silk was produced in the Middle East several centuries before it was produced in Europe.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'TRUE',
          primaryAnswer: 'TRUE',
          evidence: 'Around 550 AD silk production reached the Middle East... But it wasn\'t until the 13th century that Italy began silk production',
          explanation: 'Trung Đông bắt đầu sản xuất lụa từ khoảng năm 550 SCN, trong khi châu Âu (Ý) đến tận thế kỷ 13 mới làm (cách nhau khoảng 7 thế kỷ) -> Đúng (TRUE).'
        },
        { 
          id: 13, 
          number: 13,
          type: 'choice', 
          question: 'Global silk production has declined in recent years.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'World silk production has approximately doubled during the last 30 years in spite of man-made fibres replacing certain uses of silk.',
          explanation: 'Sản lượng lụa thế giới đã tăng gần gấp đôi trong 30 năm qua, không hề suy giảm -> Sai (FALSE).'
        },
      ]
    },
    { 
      id: 2, 
      title: 'Passage 2', 
      name: 'The discovery of a baby mammoth', 
      questionRange: '14–26', 
      questionCount: 13, 
      tags: ['#[Reading] Matching Information', '#[Reading] Summary Completion'],
      instruction: 'Questions 14–26: Read Passage 2 and answer the questions based on the text. For fill-in questions, choose words directly from the text.',
      wordLimit: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      readingText: `A near-perfect frozen mammoth offers clues to a great vanished species.

A. On a May morning in 2007, on the Yamal Peninsula in northwestern Siberia, a Nenets reindeer herder named Yuri Khudi stood on a sandbar on the Yuribey River, looking carefully at a diminutive corpse. Although he'd never seen such an animal before, Khudi had seen many mammoth tusks, the thick corkscrew shafts that his people found each summer, and this persuaded him the corpse was a baby mammoth. It was eerily well preserved. Apart from its missing hair and toenails, it was perfectly intact. Khudi realised the find might be significant and he knew he couldn't just return home and forget all about it. He therefore decided to travel to the small town of Yar Sale to consult an old friend named Kirill Serotetto. His friend took him to meet the director of the local museum, who persuaded the local authorities to fly Khudi and Serotetto back to the Yuribey River to collect the baby mammoth.

B. Mammoths became extinct between 14,000 and 10,000 years ago and since the extinctions coincided with the end of the most recent Ice age, many researchers believe that the primary cause of the great die-off was the sharp rise in temperature, which dramatically altered the vegetation. 'We have strong evidence that the temperature rise played a significant part in their extinction,' says Adrian Lister, a palaeontologist and mammoth expert at London's Natural History Museum. 'In Eurasia, the timing of the two events matches closely.' The extinctions also coincided, however, with the arrival of modern humans. In addition to exploiting mammoths for food, they used their bones and tusks to make weapons, tools, and even dwellings. Some scientists believe humans were as much to blame as the temperature rise for the great die-off. Some say they caused it.

C. The body of the baby mammoth was eventually sent to the St Petersburg Zoological Museum in Russia. Alexei Tikhonov, the museum's director, was one of the first scientists to view the baby, a female. According to Tikhonov, Khudi had rescued 'the best preserved mammoth to come down to US from the Ice Age', and he gratefully named her Lyuba, after Khudi's wife. Tikhonov knew that no-one would be more excited by the find than Dan Fisher, an American colleague at the University of Michigan who had spent 30 years researching the lives of mammoths. Tikhonov invited Fisher, along with Bernard Buigues, a French mammoth hunter, to come and view the baby mammoth. Fisher and Buigues had examined other specimens together, including infants, but these had been in a relatively poor state. Lyuba was another story entirely. Other than the missing hair and toenails, the only flaw in her pristine appearance was a curious dent above the trunk.

D. Fisher was particularly excited about one specific part of Lyuba's anatomy: her milk tusks. Through his career, Fisher has taken hundreds of tusk samples. Most of these came from the Great Lakes region of North America, and his research showed that these animals continued to thrive, despite the late Pleistocene temperature change. On the other hand, mammoth populations dropped sharply whenever human hunters entered their territory.`,
      questions: [
        { 
          id: 14, 
          number: 14,
          type: 'fill', 
          sectionTitle: 'The Discovery of Lyuba',
          instruction: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          label: 'The baby mammoth was discovered in May 2007 by a reindeer herder named Yuri', 
          suffix: '', 
          placeholder: 'Điền tên...',
          answer: 'Khudi', 
          primaryAnswer: 'Khudi',
          acceptable: ['Khudi'],
          evidence: 'a Nenets reindeer herder named Yuri Khudi stood on a sandbar on the Yuribey River',
          explanation: 'Đoạn A nêu người chăn tuần lộc phát hiện xác voi ma mút là Yuri Khudi.'
        },
        { 
          id: 15, 
          number: 15,
          type: 'fill', 
          sectionTitle: 'The Discovery of Lyuba',
          label: 'The discovery took place on the sandbar of the', 
          suffix: 'River in northwestern Siberia.', 
          placeholder: 'Điền tên sông...',
          answer: 'Yuribey', 
          primaryAnswer: 'Yuribey',
          acceptable: ['Yuribey'],
          evidence: 'stood on a sandbar on the Yuribey River, looking carefully at a diminutive corpse.',
          explanation: 'Đoạn A nêu địa điểm là bãi cát bên bờ sông Yuribey ở tây bắc Siberia.'
        },
        { 
          id: 16, 
          number: 16,
          type: 'fill', 
          sectionTitle: 'The Discovery of Lyuba',
          label: 'The baby mammoth was given the name', 
          suffix: 'after the herder\'s wife.', 
          placeholder: 'Điền tên...',
          answer: 'Lyuba', 
          primaryAnswer: 'Lyuba',
          acceptable: ['Lyuba'],
          evidence: 'he gratefully named her Lyuba, after Khudi\'s wife.',
          explanation: 'Đoạn C nêu giám đốc bảo tàng đặt tên voi con là Lyuba theo tên vợ của Khudi.'
        },
        { 
          id: 17, 
          number: 17,
          type: 'choice', 
          instruction: 'Choose the correct letter, A, B, or C.',
          question: 'What is the primary factor argued by Adrian Lister for mammoth extinction in Eurasia?', 
          options: [
            'A. Temperature rise altering vegetation', 
            'B. Arrival of modern hunters', 
            'C. Severe volcanic activity'
          ], 
          answer: 'A',
          primaryAnswer: 'A',
          evidence: '\'We have strong evidence that the temperature rise played a significant part in their extinction,\' says Adrian Lister',
          explanation: 'Adrian Lister khẳng định nhiệt độ tăng làm biến đổi thảm thực vật đóng vai trò then chốt trong sự tuyệt chủng ở đại lục Á-Âu.'
        },
        { 
          id: 18, 
          number: 18,
          type: 'choice', 
          question: 'Dan Fisher was particularly excited to examine which part of Lyuba\'s anatomy?', 
          options: [
            'A. Trunk muscles', 
            'B. Milk tusks', 
            'C. Stomach contents'
          ], 
          answer: 'B',
          primaryAnswer: 'B',
          evidence: 'Fisher was particularly excited about one specific part of Lyuba\'s anatomy: her milk tusks.',
          explanation: 'Dan Fisher đặc biệt hứng thú khi kiểm tra phần răng sữa (milk tusks) của Lyuba.'
        },
        { 
          id: 19, 
          number: 19,
          type: 'fill', 
          sectionTitle: 'Mammoth Extinction Facts',
          label: 'Extinction of mammoths occurred between', 
          suffix: 'and 10,000 years ago.', 
          placeholder: 'Điền số năm...',
          answer: '14,000', 
          primaryAnswer: '14,000',
          acceptable: ['14,000', '14000'],
          evidence: 'Mammoths became extinct between 14,000 and 10,000 years ago',
          explanation: 'Đoạn B nêu voi ma mút tuyệt chủng trong khoảng 14.000 đến 10.000 năm trước.'
        },
        { 
          id: 20, 
          number: 20,
          type: 'fill', 
          sectionTitle: 'Mammoth Extinction Facts',
          label: 'The baby mammoth corpse was transported to the Zoological Museum in St', 
          suffix: '', 
          placeholder: 'Điền tên thành phố...',
          answer: 'Petersburg', 
          primaryAnswer: 'Petersburg',
          acceptable: ['Petersburg'],
          evidence: 'The body of the baby mammoth was eventually sent to the St Petersburg Zoological Museum in Russia.',
          explanation: 'Đoạn C nêu xác voi ma mút được chuyển tới Viện bảo tàng Động vật học Saint Petersburg.'
        },
        { 
          id: 21, 
          number: 21,
          type: 'choice', 
          instruction: 'Do the following statements agree with the information in Passage 2? Choose TRUE, FALSE, or NOT GIVEN.',
          question: 'Humans used mammoth bones and tusks to build dwellings and weapons.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'TRUE',
          primaryAnswer: 'TRUE',
          evidence: 'In addition to exploiting mammoths for food, they used their bones and tusks to make weapons, tools, and even dwellings.',
          explanation: 'Con người dùng xương và ngà voi ma mút làm vũ khí, công cụ và dựng nhà ở -> Đúng (TRUE).'
        },
        { 
          id: 22, 
          number: 22,
          type: 'choice', 
          question: 'Lyuba was found completely devoid of tusks.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'Fisher was particularly excited about one specific part of Lyuba\'s anatomy: her milk tusks.',
          explanation: 'Lyuba vẫn còn răng sữa/ngà con chứ không phải hoàn toàn không có ngà -> Sai (FALSE).'
        },
        { 
          id: 23, 
          number: 23,
          type: 'choice', 
          question: 'Bernard Buigues had discovered a fully preserved adult mammoth before examining Lyuba.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'NOT GIVEN',
          primaryAnswer: 'NOT GIVEN',
          evidence: 'Fisher and Buigues had examined other specimens together, including infants, but these had been in a relatively poor state.',
          explanation: 'Bài đọc chỉ nhắc họ từng kiểm tra các mẫu vật ở tình trạng kém bảo quản, không hề nói Bernard Buigues đã từng phát hiện voi trưởng thành nguyên vẹn -> Không được đề cập (NOT GIVEN).'
        },
        { 
          id: 24, 
          number: 24,
          type: 'choice', 
          question: 'Fisher\'s research in North America showed mammoths suffered primarily from extreme cold.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'his research showed that these animals continued to thrive, despite the late Pleistocene temperature change.',
          explanation: 'Nghiên cứu của Fisher cho thấy voi ma mút vẫn phát triển sinh sôi tốt bất chấp thay đổi nhiệt độ, nhưng sụt giảm mạnh khi có thợ săn người -> Sai (FALSE).'
        },
        { 
          id: 25, 
          number: 25,
          type: 'fill', 
          sectionTitle: 'Physical Condition',
          label: 'The only visible flaw on Lyuba was a dent above the', 
          suffix: '', 
          placeholder: 'Điền bộ phận...',
          answer: 'trunk', 
          primaryAnswer: 'trunk',
          acceptable: ['trunk'],
          evidence: 'the only flaw in her pristine appearance was a curious dent above the trunk.',
          explanation: 'Đoạn C viết khuyết điểm duy nhất trên cơ thể Lyuba là vết lõm ở phía trên vòi (trunk).'
        },
        { 
          id: 26, 
          number: 26,
          type: 'fill', 
          sectionTitle: 'Physical Condition',
          label: 'Friend of Khudi who helped consult museum director: Kirill', 
          suffix: '', 
          placeholder: 'Điền họ...',
          answer: 'Serotetto', 
          primaryAnswer: 'Serotetto',
          acceptable: ['Serotetto'],
          evidence: 'travel to the small town of Yar Sale to consult an old friend named Kirill Serotetto.',
          explanation: 'Đoạn A nêu người bạn thân của Khudi là Kirill Serotetto.'
        },
      ]
    },
    { 
      id: 3, 
      title: 'Passage 3', 
      name: 'What makes a musical expert?', 
      questionRange: '27–40', 
      questionCount: 14, 
      tags: ['#[Reading] Multiple Choice', '#[Reading] Yes/No/Not Given'],
      instruction: 'Questions 27–40: Read Passage 3 and answer the questions based on the text.',
      wordLimit: 'ONE WORD ONLY',
      maxWords: 1,
      readingText: `How does someone become expert in music? And IS it really possible to have a 'talent' for music?

Does that class of people acknowledged to be musical experts just have more of the same basic skills we are all endowed with, or do they have a set of abilities or neural structures that are totally different from those of the rest of US? Are high levels of musical achievement simply the result of training and practice, or are they based on innate brain structure - what we refer to as 'talent'? Talent can be defined as something that originates in genetic structures and that is identifiable by trained people who can recognize its existence before a person has achieved exceptional levels of performance. The emphasis on early identification means that to investigate it, we study the development of skills in children.

It is evident that some children acquire skills more rapidly than others: the age of onset for walking and talking varies widely, even between children in the same household. There may be genetic factors at work, but these are closely linked with other factors - with a presumably environmental component - such as motivation and family dynamics. Similar factors can influence musical development and can mask the contribution of genetics to musical ability.

Brain studies, so far, haven't been of much use in sorting out the issues. Gottfried Schlaug at Harvard collected brain scans of individuals with absolute pitch (AP) and showed that a region in the brain called the planum temporale is larger in these people than in others. This suggests that the planum is involved in AP, but it's not clear if it starts out larger in people who eventually acquire AP, or if the acquisition of AP makes the planum increase in size.

Results of research into the areas of the brain involved in skilled motor movement are more conclusive. Studies of violin players have shown that the region of the brain responsible for controlling the movement of the left hand (the hand that requires greater precision in violin playing) increases in size as a result of practice. We do not know yet if the propensity for increase pre-exists in some people and not others.

The evidence against talent comes from research on how much training the experts do. Like experts in mathematics, chess, or sports, experts in music require lengthy periods of instruction and practice. In several studies, the very best music students were found to have practiced more than twice as much as the others. In another study, students were secretly divided into two groups based on teachers' perceptions of their talent. Several years later, it was found that the students who achieved the highest performance ratings had practiced the most, irrespective of which 'talent' group they had been assigned to.`,
      questions: [
        { 
          id: 27, 
          number: 27,
          type: 'choice', 
          sectionTitle: 'Origins of Musical Talent',
          instruction: 'Choose the correct letter, A, B, or C.',
          question: 'According to the author, talent is primarily defined as originating in:', 
          options: [
            'A. Intensive childhood practice', 
            'B. Genetic structures', 
            'C. High emotional motivation'
          ], 
          answer: 'B',
          primaryAnswer: 'B',
          evidence: 'Talent can be defined as something that originates in genetic structures',
          explanation: 'Đoạn 2 định nghĩa năng khiếu là thứ bắt nguồn từ cấu trúc di truyền (genetic structures).'
        },
        { 
          id: 28, 
          number: 28,
          type: 'choice', 
          question: 'Gottfried Schlaug\'s research at Harvard examined musicians with:', 
          options: [
            'A. Left-handed dexterity', 
            'B. Absolute pitch', 
            'C. Photographic memory'
          ], 
          answer: 'B',
          primaryAnswer: 'B',
          evidence: 'Gottfried Schlaug at Harvard collected brain scans of individuals with absolute pitch (AP)',
          explanation: 'Schlaug quét não những người có cao độ chuẩn tuyệt đối (absolute pitch).'
        },
        { 
          id: 29, 
          number: 29,
          type: 'choice', 
          question: 'The study of violin players demonstrated that practice enlarges brain areas controlling:', 
          options: [
            'A. Right hand bowing speed', 
            'B. Left hand finger precision', 
            'C. Auditory temporal cortex'
          ], 
          answer: 'B',
          primaryAnswer: 'B',
          evidence: 'controlling the movement of the left hand (the hand that requires greater precision in violin playing) increases in size as a result of practice.',
          explanation: 'Luyện tập giúp mở rộng vùng não kiểm soát sự khéo léo và chính xác của ngón tay trái (left hand).'
        },
        { 
          id: 30, 
          number: 30,
          type: 'choice', 
          question: 'What did the secret study dividing students by teachers\' talent perceptions reveal?', 
          options: [
            'A. Perceived talent accurately predicted final skill', 
            'B. Practice hours were the primary determinant of success', 
            'C. Teachers favored students of higher social backgrounds'
          ], 
          answer: 'B',
          primaryAnswer: 'B',
          evidence: 'it was found that the students who achieved the highest performance ratings had practiced the most, irrespective of which \'talent\' group they had been assigned to.',
          explanation: 'Nghiên cứu chứng minh số giờ luyện tập chính là yếu tố cốt lõi quyết định thành công chứ không phải đánh giá năng khiếu ban đầu của giáo viên.'
        },
        { 
          id: 31, 
          number: 31,
          type: 'fill', 
          sectionTitle: 'Brain Anatomy & Practice',
          instruction: 'Complete the notes below. Choose ONE WORD ONLY from the passage.',
          label: 'Brain region associated with absolute pitch: planum', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'temporale', 
          primaryAnswer: 'temporale',
          acceptable: ['temporale'],
          evidence: 'a region in the brain called the planum temporale is larger in these people',
          explanation: 'Vùng não liên quan đến absolute pitch là planum temporale.'
        },
        { 
          id: 32, 
          number: 32,
          type: 'fill', 
          sectionTitle: 'Brain Anatomy & Practice',
          label: 'Skills onset in children varies widely due to genetic and', 
          suffix: 'components.', 
          placeholder: 'Điền 1 từ...',
          answer: 'environmental', 
          primaryAnswer: 'environmental',
          acceptable: ['environmental'],
          evidence: 'with a presumably environmental component - such as motivation and family dynamics.',
          explanation: 'Sự phát triển kỹ năng chịu tác động của cả yếu tố di truyền và môi trường (environmental).'
        },
        { 
          id: 33, 
          number: 33,
          type: 'choice', 
          instruction: 'Do the following statements agree with the information in Passage 3? Choose TRUE, FALSE, or NOT GIVEN.',
          question: 'All children from the same household start walking and talking at identical ages.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'the age of onset for walking and talking varies widely, even between children in the same household.',
          explanation: 'Độ tuổi bắt đầu biết đi và nói có sự chênh lệch lớn ngay cả giữa những đứa trẻ trong cùng gia đình -> Sai (FALSE).'
        },
        { 
          id: 34, 
          number: 34,
          type: 'choice', 
          question: 'The best music students practice more than twice as much as average peers.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'TRUE',
          primaryAnswer: 'TRUE',
          evidence: 'the very best music students were found to have practiced more than twice as much as the others.',
          explanation: 'Học sinh xuất sắc nhất luyện tập nhiều hơn gấp đôi so với các bạn khác -> Đúng (TRUE).'
        },
        { 
          id: 35, 
          number: 35,
          type: 'choice', 
          question: 'Absolute pitch can be easily acquired by any adult after age 30.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'Brain studies, so far, haven\'t been of much use in sorting out the issues... it\'s not clear if it starts out larger in people who eventually acquire AP',
          explanation: 'Không có thông tin nào cho thấy người trên 30 tuổi có thể dễ dàng học được absolute pitch -> Sai (FALSE).'
        },
        { 
          id: 36, 
          number: 36,
          type: 'choice', 
          question: 'Violin playing requires greater motor precision in the right hand than the left hand.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'the left hand (the hand that requires greater precision in violin playing)',
          explanation: 'Tay trái mới là tay đòi hỏi độ chính xác cao hơn chứ không phải tay phải -> Sai (FALSE).'
        },
        { 
          id: 37, 
          number: 37,
          type: 'fill', 
          sectionTitle: 'Summary of Expertise',
          label: 'Music expertise requires lengthy periods of practice and', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'instruction', 
          primaryAnswer: 'instruction',
          acceptable: ['instruction', 'training'],
          evidence: 'experts in music require lengthy periods of instruction and practice.',
          explanation: 'Để trở thành chuyên gia âm nhạc cần thời gian dài thực hành và được đào tạo, hướng dẫn (instruction).'
        },
        { 
          id: 38, 
          number: 38,
          type: 'fill', 
          sectionTitle: 'Summary of Expertise',
          label: 'Talent investigation focuses on development of skills in', 
          suffix: '', 
          placeholder: 'Điền 1 từ...',
          answer: 'children', 
          primaryAnswer: 'children',
          acceptable: ['children'],
          evidence: 'The emphasis on early identification means that to investigate it, we study the development of skills in children.',
          explanation: 'Nghiên cứu năng khiếu tập trung vào sự phát triển kỹ năng ở trẻ em (children).'
        },
        { 
          id: 39, 
          number: 39,
          type: 'choice', 
          question: 'Research has conclusively proven genetic talent alone accounts for all musical success.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'FALSE',
          primaryAnswer: 'FALSE',
          evidence: 'The evidence against talent comes from research on how much training the experts do.',
          explanation: 'Các nghiên cứu chỉ ra sự luyện tập bền bỉ và môi trường đóng vai trò quyết định, bác bỏ quan điểm tài năng di truyền là tất cả -> Sai (FALSE).'
        },
        { 
          id: 40, 
          number: 40,
          type: 'choice', 
          question: 'Family dynamics and motivation can influence musical development.', 
          options: ['TRUE', 'FALSE', 'NOT GIVEN'], 
          answer: 'TRUE',
          primaryAnswer: 'TRUE',
          evidence: 'with a presumably environmental component - such as motivation and family dynamics. Similar factors can influence musical development',
          explanation: 'Động lực cá nhân và môi trường gia đình ảnh hưởng lớn đến quá trình phát triển âm nhạc -> Đúng (TRUE).'
        },
      ]
    }
  ]
};
