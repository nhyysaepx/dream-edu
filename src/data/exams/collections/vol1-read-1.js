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
          suffix: 'silk indoors.', 
          placeholder: 'Điền 1 từ...',
          answer: 'white', 
          primaryAnswer: 'white',
          acceptable: ['white'],
          evidence: 'Within the palace, the emperor is believed to have worn a robe of white silk',
          explanation: 'Đoạn 2 nêu rõ bên trong hoàng cung, hoàng đế mặc áo lụa trắng (white silk).'
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
          suffix: 'trade.', 
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
      tags: ['#[Reading] Matching Information', '#[Reading] Matching Features', '#[Reading] Summary Completion'],
      instruction: 'Questions 14–18: Which paragraph contains the following information? Write the correct letter, A–F. Questions 19–23: Match each statement with the correct person, A–G. Questions 24–26: Complete the sentences. Choose NO MORE THAN TWO WORDS from the passage.',
      wordLimit: 'NO MORE THAN TWO WORDS',
      maxWords: 2,
      readingText: `A near-perfect frozen mammoth offers clues to a great vanished species.

A. On a May morning in 2007, on the Yamal Peninsula in northwestern Siberia, a Nenets reindeer herder named Yuri Khudi stood on a sandbar on the Yuribey River, looking carefully at a diminutive corpse. Although he'd never seen such an animal before, Khudi had seen many mammoth tusks, the thick corkscrew shafts that his people found each summer, and this persuaded him the corpse was a baby mammoth. It was eerily well preserved. Apart from its missing hair and toenails, it was perfectly intact. Khudi realised the find might be significant and he knew he couldn't just return home and forget all about it. He therefore decided to travel to the small town of Yar Sale to consult an old friend named Kirill Serotetto. His friend took him to meet the director of the local museum, who persuaded the local authorities to fly Khudi and Serotetto back to the Yuribey River to collect the baby mammoth.

B. Mammoths became extinct between 14,000 and 10,000 years ago and since the extinctions coincided with the end of the most recent Ice age, many researchers believe that the primary cause of the great die-off was the sharp rise in temperature, which dramatically altered the vegetation. 'We have strong evidence that the temperature rise played a significant part in their extinction,' says Adrian Lister, a palaeontologist and mammoth expert at London's Natural History Museum. 'In Eurasia, the timing of the two events matches closely.' The extinctions also coincided, however, with the arrival of modern humans. In addition to exploiting mammoths for food, they used their bones and tusks to make weapons, tools, and even dwellings. Some scientists believe humans were as much to blame as the temperature rise for the great die-off. Some say they caused it.

C. The body of the baby mammoth was eventually sent to the St Petersburg Zoological Museum in Russia. Alexei Tikhonov, the museum's director, was one of the first scientists to view the baby, a female. According to Tikhonov, Khudi had rescued 'the best preserved mammoth to come to us from the Ice Age', and he gratefully named her Lyuba, after Khudi's wife. Tikhonov knew that no-one would be more excited by the find than Dan Fisher, an American colleague at the University of Michigan who had spent 30 years researching the lives of mammoths. Tikhonov invited Fisher, along with Bernard Buigues, a French mammoth hunter, to come and view the baby mammoth. Fisher and Buigues had examined other specimens together, including infants, but these had been in a relatively poor state. Lyuba was another story entirely. Other than the missing hair and toenails, the only flaw in her pristine appearance was a curious dent above the trunk.

D. Fisher was particularly excited about one specific part of Lyuba's anatomy: her milk tusks. Through his career, Fisher has taken hundreds of tusk samples. Most of these came from the Great Lakes region of North America, and his research showed that these animals continued to thrive, despite the late Pleistocene temperature change. On the other hand, to Fisher the tusks often revealed telltale evidence of human hunting. His samples frequently came from animals that had died in the autumn, when they should have been near their peak after summer grazing, and less likely to die of natural causes, but the late mammoths would have been most eager to escape their hunters during the winter. He has done limited work in Siberia, but his analysis of tusks from Wrangel Island, off the coast of Siberia, suggests the same conclusion.

E. In December 2007, Buigues arranged for the specimen to be transported to Japan to undergo a CT scan by Naoki Suzuki of the Jikei University School of Medicine. The test confirmed her skeleton was undamaged, and her internal organs seemed largely intact. It also showed that the end of her trunk, and her mouth, and windpipe were filled with dense sediment. Six months later, in a laboratory in St Petersburg, Fisher, Buigues, Suzuki, Tikhonov and other colleagues began a three-day series of tests on Lyuba. During these, Fisher noted a dense mix of clay and sand in her trunk, mouth and throat, which had been indicated earlier by the scan. In fact, the sediment in Lyuba's trunk was packed so tightly that Fisher saw it as a possible explanation for the dent above her trunk. If she was frantically fighting for breath and inhaled convulsively, perhaps a partial vacuum was created in the base of her trunk, which would have flattened surrounding soft tissue. To Fisher, the circumstances of Lyuba's death were clear: she had asphyxiated. Suzuki, however, proposed a different interpretation, seeing more evidence for drowning than asphyxiation.

F. Studies are ongoing, but Lyuba has begun to shed the secrets of her short life and some clues to the fate of her kind. Her good general health was shown in the record of her dental development, a confirmation for Fisher that dental research is useful for evaluating health and thus key to investigating the causes of mammoth extinction. Analysis of her well-preserved DNA has revealed that she belonged to a distinct population of Mammuthus primigenius and that, soon after her time, another population migrating to Siberia from North America would take their place. Finally, Lyuba's premolars and tusks revealed that she had been born in late spring and was only a month old when she died.`,
      questions: [
        { 
          id: 14, 
          number: 14,
          type: 'choice', 
          sectionTitle: 'Matching Paragraphs',
          instruction: 'Which paragraph contains the following information? Write the correct letter, A–F.',
          question: 'Similarities between studies of mammoth remains from different parts of the world.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F'], 
          placeholder: 'Chọn đoạn văn...',
          answer: 'D',
          primaryAnswer: 'D',
          acceptable: ['D'],
          evidence: 'Most of these came from the Great Lakes region of North America... his analysis of tusks from Wrangel Island, off the coast of Siberia, suggests the same conclusion.',
          explanation: 'Đoạn D so sánh kết quả nghiên cứu ngà voi ma mút từ Bắc Mỹ và đảo Wrangel (Siberia), cho thấy sự tương đồng giữa các nghiên cứu ở những vùng khác nhau trên thế giới.'
        },
        { 
          id: 15, 
          number: 15,
          type: 'choice', 
          sectionTitle: 'Matching Paragraphs',
          question: 'Details of the uses to which mammoth body parts were put.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F'], 
          placeholder: 'Chọn đoạn văn...',
          answer: 'B',
          primaryAnswer: 'B',
          acceptable: ['B'],
          evidence: 'In addition to exploiting mammoths for food, they used their bones and tusks to make weapons, tools, and even dwellings.',
          explanation: 'Đoạn B nêu chi tiết con người dùng xương và ngà voi ma mút để làm vũ khí, công cụ và nhà ở.'
        },
        { 
          id: 16, 
          number: 16,
          type: 'choice', 
          sectionTitle: 'Matching Paragraphs',
          question: 'A theory that accounts for the damage to Lyuba\'s face.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F'], 
          placeholder: 'Chọn đoạn văn...',
          answer: 'E',
          primaryAnswer: 'E',
          acceptable: ['E'],
          evidence: 'the sediment in Lyuba\'s trunk was packed so tightly that Fisher saw it as a possible explanation for the dent above her trunk.',
          explanation: 'Đoạn E giải thích lý thuyết của Fisher rằng vết lõm trên mặt Lyuba là do cô voi con hít phải bùn đất gây ra hiện tượng chân không làm biến dạng mô mềm.'
        },
        { 
          id: 17, 
          number: 17,
          type: 'choice', 
          sectionTitle: 'Matching Paragraphs',
          question: 'An explanation of how an individual was able to identify a small corpse.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F'], 
          placeholder: 'Chọn đoạn văn...',
          answer: 'A',
          primaryAnswer: 'A',
          acceptable: ['A'],
          evidence: 'Khudi had seen many mammoth tusks, the thick corkscrew shafts that his people found each summer, and this persuaded him the corpse was a baby mammoth.',
          explanation: 'Đoạn A giải thích Khudi nhận ra xác là voi ma mút con vì ông đã từng thấy nhiều ngà voi ma mút trước đó.'
        },
        { 
          id: 18, 
          number: 18,
          type: 'choice', 
          sectionTitle: 'Matching Paragraphs',
          question: 'A comparison between Lyuba and other young mammoth corpses.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F'], 
          placeholder: 'Chọn đoạn văn...',
          answer: 'C',
          primaryAnswer: 'C',
          acceptable: ['C'],
          evidence: 'Fisher and Buigues had examined other specimens together, including infants, but these had been in a relatively poor state. Lyuba was another story entirely.',
          explanation: 'Đoạn C so sánh Lyuba với các mẫu voi ma mút con khác đã được kiểm tra trước đó - tất cả đều bảo quản kém, còn Lyuba hoàn toàn khác biệt.'
        },
        { 
          id: 19, 
          number: 19,
          type: 'choice', 
          sectionTitle: 'Matching People',
          instruction: 'Match each statement with the correct person, A–G. A: Yuri Khudi, B: Kirill Serotetto, C: Adrian Lister, D: Alexei Tikhonov, E: Dan Fisher, F: Bernard Buigues, G: Naoki Suzuki.',
          question: 'The indications are that mammoths died as a result of climate change.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
          placeholder: 'Chọn đáp án...',
          answer: 'C',
          primaryAnswer: 'C',
          acceptable: ['C'],
          evidence: '\'We have strong evidence that the temperature rise played a significant part in their extinction,\' says Adrian Lister',
          explanation: 'Adrian Lister (C) khẳng định nhiệt độ tăng là nguyên nhân chính gây tuyệt chủng voi ma mút.'
        },
        { 
          id: 20, 
          number: 20,
          type: 'choice', 
          sectionTitle: 'Matching People',
          question: 'Teeth analysis is important in discovering why mammoths died out.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
          placeholder: 'Chọn đáp án...',
          answer: 'E',
          primaryAnswer: 'E',
          acceptable: ['E'],
          evidence: 'dental research is useful for evaluating health and thus key to investigating the causes of mammoth extinction.',
          explanation: 'Dan Fisher (E) xác nhận phân tích răng là chìa khóa quan trọng để điều tra nguyên nhân tuyệt chủng.'
        },
        { 
          id: 21, 
          number: 21,
          type: 'choice', 
          sectionTitle: 'Matching People',
          question: 'The corpse of the baby mammoth is in better condition than any other that has been discovered.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
          placeholder: 'Chọn đáp án...',
          answer: 'D',
          primaryAnswer: 'D',
          acceptable: ['D'],
          evidence: 'According to Tikhonov, Khudi had rescued \'the best preserved mammoth to come to us from the Ice Age\'',
          explanation: 'Alexei Tikhonov (D) tuyên bố đây là xác voi ma mút được bảo quản tốt nhất từ Kỷ Băng Hà.'
        },
        { 
          id: 22, 
          number: 22,
          type: 'choice', 
          sectionTitle: 'Matching People',
          question: 'It would be a mistake to ignore the baby mammoth\'s discovery, because of its potential importance.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
          placeholder: 'Chọn đáp án...',
          answer: 'A',
          primaryAnswer: 'A',
          acceptable: ['A'],
          evidence: 'Khudi realised the find might be significant and he knew he couldn\'t just return home and forget all about it.',
          explanation: 'Yuri Khudi (A) nhận ra phát hiện có thể quan trọng và không thể bỏ qua nó.'
        },
        { 
          id: 23, 
          number: 23,
          type: 'choice', 
          sectionTitle: 'Matching People',
          question: 'Mammoths often died at a time of year when they should have been in good physical condition.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
          placeholder: 'Chọn đáp án...',
          answer: 'E',
          primaryAnswer: 'E',
          acceptable: ['E'],
          evidence: 'His samples frequently came from animals that had died in the autumn, when they should have been near their peak after summer grazing',
          explanation: 'Dan Fisher (E) phát hiện nhiều mẫu đến từ voi ma mút chết vào mùa thu - thời điểm chúng đáng lẽ phải khỏe mạnh nhất sau mùa hè ăn cỏ.'
        },
        { 
          id: 24, 
          number: 24,
          type: 'fill', 
          sectionTitle: 'Sentence Completion',
          instruction: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage.',
          label: 'Some researchers say that a marked rise in temperature impacted on mammoths by changing the type of', 
          suffix: 'available.', 
          placeholder: 'Điền câu trả lời...',
          answer: 'vegetation', 
          primaryAnswer: 'vegetation',
          acceptable: ['vegetation'],
          evidence: 'the primary cause of the great die-off was the sharp rise in temperature, which dramatically altered the vegetation.',
          explanation: 'Sự tăng nhiệt độ mạnh đã làm thay đổi đáng kể thảm thực vật (vegetation), ảnh hưởng trực tiếp đến voi ma mút.'
        },
        { 
          id: 25, 
          number: 25,
          type: 'fill', 
          sectionTitle: 'Sentence Completion',
          label: 'Fisher concluded that many of the mammoth tusks he looked at displayed signs of', 
          suffix: '', 
          placeholder: 'Điền câu trả lời...',
          answer: 'human hunting', 
          primaryAnswer: 'human hunting',
          acceptable: ['human hunting', 'hunting'],
          evidence: 'to Fisher the tusks often revealed telltale evidence of human hunting.',
          explanation: 'Fisher kết luận nhiều ngà voi ma mút mà ông nghiên cứu cho thấy dấu hiệu của việc con người săn bắt (human hunting).'
        },
        { 
          id: 26, 
          number: 26,
          type: 'fill', 
          sectionTitle: 'Sentence Completion',
          label: 'Not long after Lyuba\'s death, the Mammuthus primigenius group she belonged to was replaced by another group that came from', 
          suffix: '', 
          placeholder: 'Điền câu trả lời...',
          answer: 'North America', 
          primaryAnswer: 'North America',
          acceptable: ['North America'],
          evidence: 'soon after her time, another population migrating to Siberia from North America would take their place.',
          explanation: 'Một quần thể khác di cư từ Bắc Mỹ (North America) đến Siberia đã thay thế nhóm của Lyuba.'
        },
      ]
    },
    { 
      id: 3, 
      title: 'Passage 3', 
      name: 'What makes a musical expert?', 
      questionRange: '27–40', 
      questionCount: 14, 
      tags: ['#[Reading] Multiple Choice', '#[Reading] Yes/No/Not Given', '#[Reading] Summary Completion'],
      instruction: 'Questions 27–30: Choose the correct letter, A, B, C or D. Questions 31–36: Do the following statements agree with the claims of the writer? Write YES, NO, or NOT GIVEN. Questions 37–40: Complete the summary using the list of words, A–J.',
      readingText: `How does someone become expert in music? And IS it really possible to have a 'talent' for music?

Does that class of people acknowledged to be musical experts just have more of the same basic skills we are all endowed with, or do they have a set of abilities - or neural structures - that are totally different from those of the rest of US? Are high levels of musical achievement simply the result of training and practice, or are they based on innate brain structure - what we refer to as 'talent'? Talent can be defined as something that originates in genetic structures and that is identifiable by trained people who can recognize its existence before a person has achieved exceptional levels of performance. The emphasis on early identification means that to investigate it, we study the development of skills in children.

It is evident that some children acquire skills more rapidly than others: the age of onset for walking and talking varies widely, even between children in the same household. There may be genetic factors at work, but these are closely linked with other factors - with a presumably environmental component - such as motivation and family dynamics. Similar factors can influence musical development and can mask the contribution of genetics to musical ability.

Brain studies, so far, haven't been of much use in sorting out these issues. Gottfried Schlaug at Harvard collected brain scans of individuals with absolute pitch (AP) and showed that a region in the brain called the planum temporale is larger in these people than in others. This suggests that the planum is involved in AP, but it's not clear if it starts out larger in people who eventually acquire AP, or if the acquisition of AP makes the planum increase in size.

Results of research into the areas of the brain involved in skilled motor movement are more conclusive. Studies of violin players have shown that the region of the brain responsible for controlling the movement of the left hand (the hand that requires greater precision in violin playing) increases in size as a result of practice. We do not know yet if the propensity for this increase pre-exists in some people, not others.

The evidence against talent comes from research on how much training the experts do. Like experts in mathematics, chess, or sports, experts in music require lengthy periods of instruction and practice. In several studies, the very best music students were found to have practiced more than twice as much as the others. In another study, students were secretly divided into two groups based on teachers' perceptions of their talent. Several years later, it was found that the students who achieved the highest performance ratings had practiced the most, irrespective of which 'talent' group they had been assigned to, suggesting that practice does not merely correlate with achievement, but causes it.

Anders Ericsson, at Florida State University, approaches the topic of musical expertise as a general problem in cognitive psychology. He takes as a starting point the assumption that there are certain issues involved in becoming an expert at anything; that we can learn about musical expertise by studying expert chess players, athletes, artists, mathematicians, as well as musicians themselves. The dominant principle from such studies is that ten thousand hours of practice is required to achieve the level of mastery associated with being a world-class expert - in anything. In study after study, of composers, ice skaters, concert pianists, chess players and master criminals, this number comes up again and again. Someone would do this amount of practice if they practiced, for example, 20 hours a week for ten years. Of course, this does not address why some people do not seem to get anywhere when they practice, and why some people get more out of their practice sessions than others. But no-one has yet found a case in which true world-class expertise was accomplished in less time. It seems that it takes the brain this long to assimilate all that it needs to know to achieve true mastery.

The ten-thousand-hour theory is consistent with what we know about how the brain learns. Learning requires the assimilation and consolidation of information in neural tissue. The more experiences we have with something, the stronger the memory/learning trace for that experience becomes. Although people differ in how long it takes them to consolidate information neurally, it remains true that increased practice leads to a greater number of neural traces, which create stronger memory representation.

The classic rebuttal to this theory goes something like this: 'What about Mozart? I hear that he composed his first symphony at the age of four!' First, there is a factual error here: Mozart did not write it until he was eight. Still, this is unusual, to say the least. However, this early work received little acclaim and was not performed very often. In fact, the only reason we know about it is because the child who wrote it grew up to become Mozart. And Mozart had an expert teacher in his father, who was renowned as a teacher of musicians all over Europe. We do not know how much Mozart practiced, but if he started at age two and worked thirty-two hours a week (quite possible, given that his father was a stern taskmaster) he would have made his ten thousand hours by the time he composed his first symphony. This does not mean that there are no genetic factors involved in Mozart's greatness, but that inborn traits may not be the only cause.`,
      questions: [
        { 
          id: 27, 
          number: 27,
          type: 'choice', 
          sectionTitle: 'Multiple Choice',
          instruction: 'Choose the correct letter, A, B, C or D.',
          question: 'In the first paragraph, the writer suggests that a musician who IS talented is someone', 
          options: [
            'A. who is aware of being set apart from other people.',
            'B. whose brain structure is unlike that of other people.',
            'C. who can perform extremely well in early childhood.',
            'D. whose essential skills are more varied than those of ordinary people.'
          ], 
          placeholder: 'Chọn đáp án...',
          answer: 'B',
          primaryAnswer: 'B',
          acceptable: ['B'],
          evidence: 'or do they have a set of abilities - or neural structures - that are totally different from those of the rest of US? Are high levels of musical achievement simply the result of training and practice, or are they based on innate brain structure - what we refer to as \'talent\'?',
          explanation: 'Tác giả gợi ý rằng một người có tài năng âm nhạc là người sở hữu cấu trúc não bộ khác biệt bẩm sinh so với người khác (innate brain structure / neural structures totally different).'
        },
        { 
          id: 28, 
          number: 28,
          type: 'choice', 
          sectionTitle: 'Multiple Choice',
          question: 'According to the writer, what is unclear about the findings of Gottfried Schlaug?', 
          options: [
            'A. which part of the brain is linked to a particular musical skill.',
            'B. which type of musical skill leads to the greatest change in the brain.',
            'C. whether a feature of the brain is a cause or an effect of a musical skill.',
            'D. whether the acquisition of a musical skill is easier for some people than others.'
          ], 
          placeholder: 'Chọn đáp án...',
          answer: 'C',
          primaryAnswer: 'C',
          acceptable: ['C'],
          evidence: 'it\'s not clear if it starts out larger in people who eventually acquire AP, or if the acquisition of AP makes the planum increase in size.',
          explanation: 'Tác giả nêu rõ chưa xác định được vùng planum temporale lớn hơn là nguyên nhân dẫn đến có absolute pitch, hay việc đạt được absolute pitch làm vùng này lớn lên (cause or effect).'
        },
        { 
          id: 29, 
          number: 29,
          type: 'choice', 
          sectionTitle: 'Multiple Choice',
          question: 'According to the writer, what has been established by studies of violin players?', 
          options: [
            'A. Changes may occur in the brain following violin practice.',
            'B. Left-handed violinists have a different brain structure from other people.',
            'C. A violinist\'s hand size is not due to practice but to genetic factors.',
            'D. Violinists are born with brains that have a particular structure.'
          ], 
          placeholder: 'Chọn đáp án...',
          answer: 'A',
          primaryAnswer: 'A',
          acceptable: ['A'],
          evidence: 'Studies of violin players have shown that the region of the brain responsible for controlling the movement of the left hand... increases in size as a result of practice.',
          explanation: 'Nghiên cứu về người chơi vĩ cầm cho thấy vùng não kiểm soát tay trái phát triển kích thước nhờ luyện tập, tức là có sự thay đổi trong não bộ sau khi luyện tập.'
        },
        { 
          id: 30, 
          number: 30,
          type: 'choice', 
          sectionTitle: 'Multiple Choice',
          question: 'According to the writer, findings on the amount of practice done by expert musicians suggest that', 
          options: [
            'A. talent may have little to do with expertise.',
            'B. practice may actually prevent the development of talent.',
            'C. talent may not be recognised by teachers.',
            'D. expertise may be related to quality of instruction.'
          ], 
          placeholder: 'Chọn đáp án...',
          answer: 'A',
          primaryAnswer: 'A',
          acceptable: ['A'],
          evidence: 'Several years later, it was found that the students who achieved the highest performance ratings had practiced the most, irrespective of which \'talent\' group they had been assigned to, suggesting that practice does not merely correlate with achievement, but causes it.',
          explanation: 'Kết quả nghiên cứu cho thấy những người thành công nhất là những người luyện tập nhiều nhất bất kể họ thuộc nhóm được đánh giá có tài năng hay không, ngụ ý năng khiếu ban đầu ít có liên quan đến trình độ chuyên gia.'
        },
        { 
          id: 31, 
          number: 31,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          instruction: 'Do the following statements agree with the claims of the writer? Write YES, NO, or NOT GIVEN.',
          question: 'Anders Ericsson\'s work with cognitive psychology has influenced other researchers.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'NOT GIVEN',
          primaryAnswer: 'NOT GIVEN',
          acceptable: ['NOT GIVEN'],
          evidence: 'Anders Ericsson, at Florida State University, approaches the topic of musical expertise as a general problem in cognitive psychology.',
          explanation: 'Bài viết chỉ đề cập Ericsson tiếp cận chủ đề theo tâm lý học nhận thức, không nhắc đến việc nghiên cứu của ông có tạo ảnh hưởng đến các nhà nghiên cứu khác hay không.'
        },
        { 
          id: 32, 
          number: 32,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          question: 'Different areas of expertise seem to have one specific thing in common.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'YES',
          primaryAnswer: 'YES',
          acceptable: ['YES'],
          evidence: 'The dominant principle from such studies is that ten thousand hours of practice is required to achieve the level of mastery associated with being a world-class expert - in anything. In study after study, of composers, ice skaters, concert pianists, chess players and master criminals, this number comes up again and again.',
          explanation: 'Các lĩnh vực chuyên môn khác nhau đều có điểm chung cụ thể là quy tắc 10.000 giờ luyện tập để đạt đẳng cấp thế giới -> YES.'
        },
        { 
          id: 33, 
          number: 33,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          question: 'In order to be useful, practice must be carried out regularly every day.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'NOT GIVEN',
          primaryAnswer: 'NOT GIVEN',
          acceptable: ['NOT GIVEN'],
          evidence: 'Someone would do this amount of practice if they practiced, for example, 20 hours a week for ten years.',
          explanation: 'Tác giả chỉ nêu ví dụ 20 giờ mỗi tuần trong 10 năm, không khẳng định việc luyện tập bắt buộc phải diễn ra đều đặn mỗi ngày mới hữu ích.'
        },
        { 
          id: 34, 
          number: 34,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          question: 'Anyone who practices for long enough can reach the level of a world-class expert.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'NO',
          primaryAnswer: 'NO',
          acceptable: ['NO'],
          evidence: 'Of course, this does not address why some people do not seem to get anywhere when they practice, and why some people get more out of their practice sessions than others.',
          explanation: 'Tác giả thừa nhận có những người luyện tập nhưng không đạt được kết quả gì, do đó không phải bất cứ ai luyện tập đủ lâu cũng thành chuyên gia thế giới -> NO.'
        },
        { 
          id: 35, 
          number: 35,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          question: 'Occasionally, someone can become an expert at global level with fewer than 10,000 hours\' practice.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'NO',
          primaryAnswer: 'NO',
          acceptable: ['NO'],
          evidence: 'But no-one has yet found a case in which true world-class expertise was accomplished in less time.',
          explanation: 'Tác giả khẳng định chưa từng có trường hợp nào đạt đẳng cấp thế giới thực thụ với ít hơn 10.000 giờ -> NO.'
        },
        { 
          id: 36, 
          number: 36,
          type: 'choice', 
          sectionTitle: 'Yes / No / Not Given',
          question: 'Existing knowledge of learning and cognitive skills supports the importance of practice.', 
          options: ['YES', 'NO', 'NOT GIVEN'], 
          placeholder: 'Chọn YES, NO, hoặc NOT GIVEN...',
          answer: 'YES',
          primaryAnswer: 'YES',
          acceptable: ['YES'],
          evidence: 'The ten-thousand-hour theory is consistent with what we know about how the brain learns. Learning requires the assimilation and consolidation of information in neural tissue.',
          explanation: 'Lý thuyết 10.000 giờ hoàn toàn phù hợp và được củng cố bởi kiến thức đã có về cơ chế học tập của bộ não -> YES.'
        },
        { 
          id: 37, 
          number: 37,
          type: 'choice', 
          sectionTitle: 'Summary Completion',
          instruction: 'Complete the summary using the list of words, A–J, below: A popular | B artistic | C completed | D eight | E tuition | F encouragement | G inherited | H four | J two.',
          question: 'However, the writer points out that the young Mozart received a lot of (37) _____ from his father...', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 
          placeholder: 'Chọn chữ cái (A–J)...',
          answer: 'E',
          primaryAnswer: 'E',
          acceptable: ['E', 'tuition'],
          evidence: 'And Mozart had an expert teacher in his father, who was renowned as a teacher of musicians all over Europe.',
          explanation: 'Mozart nhận được sự giảng dạy/đào tạo (tuition - E) chu đáo từ người cha là một thầy giáo âm nhạc nổi tiếng.'
        },
        { 
          id: 38, 
          number: 38,
          type: 'choice', 
          sectionTitle: 'Summary Completion',
          question: '...and that the symphony he wrote at the age of (38) _____...', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 
          placeholder: 'Chọn chữ cái (A–J)...',
          answer: 'D',
          primaryAnswer: 'D',
          acceptable: ['D', 'eight'],
          evidence: 'First, there is a factual error here: Mozart did not write it until he was eight.',
          explanation: 'Mozart viết bản giao hưởng đầu tiên năm 8 tuổi (eight - D).'
        },
        { 
          id: 39, 
          number: 39,
          type: 'choice', 
          sectionTitle: 'Summary Completion',
          question: '...was not (39) _____ and may be of only academic interest.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 
          placeholder: 'Chọn chữ cái (A–J)...',
          answer: 'A',
          primaryAnswer: 'A',
          acceptable: ['A', 'popular'],
          evidence: 'However, this early work received little acclaim and was not performed very often.',
          explanation: 'Tác phẩm đầu tay này ít được hoan nghênh và ít được biểu diễn, tức là không phổ biến/được ưa chuộng (popular - A).'
        },
        { 
          id: 40, 
          number: 40,
          type: 'choice', 
          sectionTitle: 'Summary Completion',
          question: 'The case therefore supports the view that expertise is not solely the result of (40) _____ characteristics.', 
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J'], 
          placeholder: 'Chọn chữ cái (A–J)...',
          answer: 'G',
          primaryAnswer: 'G',
          acceptable: ['G', 'inherited'],
          evidence: 'This does not mean that there are no genetic factors involved in Mozart\'s greatness, but that inborn traits may not be the only cause.',
          explanation: 'Tài năng không chỉ là kết quả thuần túy từ các đặc điểm di truyền/bẩm sinh (inherited - G).'
        },
      ]
    }
  ]
};
