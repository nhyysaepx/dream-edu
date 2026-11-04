// Mock & Actual Exam Data for Dream Education Test Platform
// Modeled directly from Full Original Exam VOL 1-9 collections

export const EXAM_COLLECTIONS = [
  {
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
        audioUrl: '/audio/vol1_test1_part1.mp3',
        context: 'Customer inquiries about activities, times, and rules for the Beechen Festival.',
        questions: [
          { 
            id: 1, 
            type: 'fill', 
            label: 'June 19th | 7 p.m. | Concert | Place: the', 
            suffix: '', 
            answer: 'theater', 
            acceptable: ['theater', 'theatre'] 
          },
          { 
            id: 2, 
            type: 'fill', 
            label: 'June 20th | Time:', 
            suffix: 'p.m. | Activity: tour (ticket error said 3:40)', 
            answer: '4', 
            acceptable: ['4', '4.00', '4:00', '4 pm', '4pm', '16:00'] 
          },
          { 
            id: 3, 
            type: 'fill', 
            label: 'June 20th Tour | Place: meet at the', 
            suffix: '(includes visit to old flour mill)', 
            answer: 'station', 
            acceptable: ['station', 'train station'] 
          },
          { 
            id: 4, 
            type: 'fill', 
            label: 'June 21st | all day | Activity: children\'s', 
            suffix: 'competition | Place: Beechen Community Centre', 
            answer: 'cooking', 
            acceptable: ['cooking', 'cookery'] 
          },
          { 
            id: 5, 
            type: 'fill', 
            label: 'June 21st Children Competition | Comments: bring a', 
            suffix: '', 
            answer: 'plate', 
            acceptable: ['plate', 'a plate'] 
          },
          { 
            id: 6, 
            type: 'fill', 
            label: 'June 21st | evening | Activity: fireworks | Place: by the', 
            suffix: '', 
            answer: 'river', 
            acceptable: ['river', 'square', 'town square'] 
          },
          { 
            id: 7, 
            type: 'fill', 
            label: 'This year, activities end by', 
            suffix: 'p.m.', 
            answer: '11:15', 
            acceptable: ['11:15', '11.15', '11:15 pm', '11:15pm'] 
          },
          { 
            id: 8, 
            type: 'fill', 
            label: 'There won\'t be any', 
            suffix: 'in the town centre this year.', 
            answer: 'parking', 
            acceptable: ['parking', 'cars'] 
          },
          { 
            id: 9, 
            type: 'fill', 
            label: 'The festival\'s web address is www.', 
            suffix: '.com', 
            answer: 'beaconfestival', 
            acceptable: ['beaconfestival', 'beechenfestival'] 
          },
          { 
            id: 10, 
            type: 'fill', 
            label: 'Festival organisers would like to receive', 
            suffix: 'online.', 
            answer: 'feedback', 
            acceptable: ['feedback', 'comments', 'reviews'] 
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
        audioUrl: '/audio/vol1_test1_part2.mp3',
        context: 'Gary Payne introduces walking tour itinerary and equipment.',
        questions: [
          { 
            id: 11, 
            type: 'choice',
            question: 'Approximately how many passengers does the ferry hold?', 
            options: ['A. 160', 'B. 600', 'C. 2000'], 
            answer: 'B' 
          },
          { 
            id: 12, 
            type: 'choice',
            question: 'Which items should the tourists pack in a separate bag?', 
            options: ['A. food', 'B. reading material', 'C. medicines'], 
            answer: 'C' 
          },
          { 
            id: 13, 
            type: 'choice',
            question: 'The hostel in La Vega de Liebana has:', 
            options: ['A. good washing facilities', 'B. a games room', 'C. a number of single bedrooms'], 
            answer: 'A' 
          },
          { 
            id: 14, 
            type: 'choice',
            question: 'Residents at the hostel are not allowed to:', 
            options: ['A. take furniture out of the hostel building', 'B. enter the hostel after a certain time', 'C. smoke in the hostel gardens'], 
            answer: 'B' 
          },
          { 
            id: 15, 
            type: 'fill',
            label: 'Clothes and equipment: Bring boots with thick soles, spare', 
            suffix: '', 
            answer: 'shoes', 
            acceptable: ['shoes', 'socks'] 
          },
          { 
            id: 16, 
            type: 'fill',
            label: 'Light waterproofs, suncream: strength -', 
            suffix: '', 
            answer: '30', 
            acceptable: ['30', '40', '50'] 
          },
          { 
            id: 17, 
            type: 'fill',
            label: 'A', 
            suffix: 'folder for map, etc.', 
            answer: 'waterproof', 
            acceptable: ['waterproof', 'plastic'] 
          },
          { 
            id: 18, 
            type: 'choice',
            question: 'Features of Spain area mentioned: Which of the following is highlighted first? (Questions 18–20)', 
            options: ['A. altitude', 'B. coastline', 'C. economy'], 
            answer: 'A' 
          },
          { 
            id: 19, 
            type: 'choice',
            question: 'Features of Spain area: The speaker specifically mentions changing:', 
            options: ['D. temperatures', 'E. vegetation', 'F. wildlife'], 
            answer: 'D' 
          },
          { 
            id: 20, 
            type: 'choice',
            question: 'Features of Spain area: The local flora is described through varied:', 
            options: ['E. vegetation', 'F. wildlife', 'G. coastline'], 
            answer: 'E' 
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
            type: 'choice',
            question: 'Sally says many students see peer assessment as:', 
            options: ['A. a way for tutors to save time', 'B. a useful learning tool', 'C. a valuable form of assessment'], 
            answer: 'A' 
          },
          { 
            id: 22, 
            type: 'choice',
            question: 'What do Steve and Sally agree is an advantage of peer assessment?', 
            options: ['A. It\'s more reliable than self-assessment', 'B. It increases students\' self-awareness', 'C. It builds rapport between students'], 
            answer: 'B' 
          },
          { 
            id: 23, 
            type: 'choice',
            question: 'If the peer assessment marks seem incorrect:', 
            options: ['A. students should mark the assignments again', 'B. the tutor should check those assignments', 'C. the marking criteria should be rewritten'], 
            answer: 'B' 
          },
          { 
            id: 24, 
            type: 'choice',
            question: 'How were the presentations in the research project marked?', 
            options: ['A. Students and lecturers marked all the presentations', 'B. Students chose which presentations they wanted to mark', 'C. Lecturers marked a selection of presentations'], 
            answer: 'A' 
          },
          { 
            id: 25, 
            type: 'choice',
            question: 'Male students marking female presenters: (A. higher marks, B. lower marks, C. not significantly different)', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'B' 
          },
          { 
            id: 26, 
            type: 'choice',
            question: 'Female students marking male presenters:', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'C' 
          },
          { 
            id: 27, 
            type: 'choice',
            question: 'Female students marking female presenters:', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'C' 
          },
          { 
            id: 28, 
            type: 'choice',
            question: 'Younger students marking older presenters:', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'A' 
          },
          { 
            id: 29, 
            type: 'choice',
            question: 'Students marking presenters from a different university:', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'C' 
          },
          { 
            id: 30, 
            type: 'choice',
            question: 'Students who had helped set criteria:', 
            options: ['A. They gave higher marks', 'B. They gave lower marks', 'C. Marks were not significantly different'], 
            answer: 'A' 
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
        audioUrl: '/audio/vol1_test1_part4.mp3',
        context: 'Linguistics lecture on Bislama, the pidgin language of Vanuatu.',
        questions: [
          { id: 31, type: 'fill', label: 'Languages in Vanuatu: Actively spoken: 81, Declining: 17,', suffix: 'languages: 8', answer: 'endangered', acceptable: ['endangered', 'dying'] },
          { id: 32, type: 'fill', label: 'Foreign languages: English is used in the', suffix: 'system.', answer: 'education', acceptable: ['education', 'educational', 'school'] },
          { id: 33, type: 'fill', label: 'Bislama: In the past this language was described as', suffix: '', answer: 'broken', acceptable: ['broken'] },
          { id: 34, type: 'fill', label: 'History: After 1860 Vanuatu people worked in Australian', suffix: '', answer: 'plantations', acceptable: ['plantations', 'mines'] },
          { id: 35, type: 'fill', label: 'After 1950 people moved to the', suffix: '', answer: 'towns', acceptable: ['towns', 'cities'] },
          { id: 36, type: 'fill', label: 'Description: Bislama should be called a', suffix: '\' pidgin.', answer: 'creole', acceptable: ['creole', 'national'] },
          { id: 37, type: 'fill', label: 'Vocabulary: Words such as \'from\' may have more', suffix: 'in Bislama.', answer: 'meanings', acceptable: ['meanings', 'functions'] },
          { id: 38, type: 'fill', label: 'Less than 10% of words are of', suffix: 'origin.', answer: 'French', acceptable: ['French', 'french'] },
          { id: 39, type: 'fill', label: 'Pacific words describe the natural world and also local', suffix: '', answer: 'customs', acceptable: ['customs', 'culture', 'traditions'] },
          { id: 40, type: 'fill', label: 'Grammar: The word \'long\' acts as an important', suffix: 'in Bislama.', answer: 'preposition', acceptable: ['preposition'] },
        ]
      }
    ],
    transcript: `Audio Test 1 - Full Transcript
Speaker 1 [00:00:01] IELTS Listening Version 16208. You will hear a number of different recordings...

Part 1: Beechen Festival Offers
Speaker 2 [00:01:49] Oh, hello. I want to check some details about the festival. Tickets are running out fast and my computer's down.
Speaker 1 [00:02:00] First activity is on June 19th at 7pm, a concert in the theater with local musicians.
Speaker 2 [00:02:09] Lovely. And for the next activity on the 20th?
Speaker 1 [00:03:03] The guided tour starts at 4:00 (ticket error said 3:40). Meet the guide at the station; it includes an old flour mill.
Speaker 1 [00:03:54] June 21st: children's cooking competition at Beechen Community Centre. Bring a plate. Evening fireworks by the river.
Speaker 1 [00:05:45] Noise rules: events end by 11:15 pm. Parking in town centre is restricted. Web: www.beaconfestival.com. Feedback welcomed online.

Part 2: Walking Holiday in Spain
Speaker 3 [00:08:31] Good evening. Gary Payne here for your walking holiday in Spain. The ferry holds 600 passengers. Pack medicines in a separate bag. The hostel has good washing facilities, curfew at 11pm. Bring spare shoes, factor 30 suncream, waterproof folder...

Part 3: Peer Assessment Research
Speaker 4 [00:15:25] Steve, students see peer assessment as saving tutors time, but it raises self-awareness. Tutors review disputed marks. Presentations were marked by both lecturers and students. Male markers gave lower marks to women; women showed no bias...

Part 4: Bislama Language of Vanuatu
Speaker 3 [00:22:18] Vanuatu has 81 active languages, 17 declining, and 8 endangered. English serves in education. Bislama was once dismissed as 'broken English'. Worked in Australian plantations, moved to towns. Now a creole. Words like 'from' hold multiple meanings; less than 10% French origin; 'long' acts as universal preposition...`
  },
  {
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
        instruction: 'Questions 1–7: Complete the notes below. Choose ONE WORD ONLY from the passage. Questions 8–13: Do the following statements agree with the information in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
        readingText: `Silk, a natural fibre produced by a particular worm called a silkworm, has been used in clothing for many centuries.

When silk was first discovered in China over 4,500 years ago, it was reserved exclusively for the use of the emperor, his close relations and the very highest of his dignitaries. Within the palace, the emperor is believed to have worn a robe of white silk; outside, he, his principal wife, and the heir to the throne wore yellow, the colour of the earth.

Gradually silk came into more general use, and the various classes of Chinese society began wearing tunics of silk. As well as being used for clothing and decoration, silk was quite quickly put to industrial use, and rapidly became one of the principal elements of the Chinese economy. It was used in the production of musical instruments, as string for fishing, and even as the world's first luxury paper. Eventually even the common people were able to wear garments of silk.

During the Han dynasty (206 BC-220 AD), silk ceased to be a mere fabric and became a form of currency. Farmers paid their taxes in grain and silk, and silk was used to pay civil servants and to reward subjects for outstanding services. Values were calculated in lengths of silk as they had previously been calculated in weight of gold. Before long, silk became a currency used in trade with foreign countries, which continued into the Tang dynasty (616-907 AD). It is possible that this added importance was the result of a major increase in production. Silk also found its way so thoroughly into the Chinese language that 230 of the 5,000 most common characters of Mandarin have 'silk' as their key component. Silk became a precious commodity, highly sought after by other countries from an early date, and it is believed that the silk trade actually existed before the Silk Road was officially opened in the second century BC. An Egyptian mummy with a silk thread in her hair, dating from 1070 BC, has been discovered in the village of Deir el Medina near the Valley of the Kings, and is probably the earliest evidence of the silk trade. During the second century BC, the Chinese emperor Han Wu Di's ambassadors travelled as far west as Persia and Mesopotamia, bearing gifts including silks. A range of important finds of Chinese silks have also been made along the Silk Road. One of the most dramatic of these finds was some Tang silk discovered in 1900. It is believed that around 1015 AD Buddhist monks, possibly alarmed by the threat of invasion by Tibetan people, had sealed more than ten thousand manuscripts and silk paintings, silk banners and textiles in caves near Dunhuang, a trading station on the Silk Road in north-west China.

Some historians believe the first Europeans to set eyes upon the fabulous fabric were the Roman legions of Marcus Licinius Crassus, Governor of Syria. According to certain accounts of the period, at an important battle near the Euphrates River in 53 BC, the Roman soldiers were so startled by the bright silken banners of the enemy that they fled in panic. Yet, within decades Chinese silks were widely worn by the rich and noble families of Rome. The Roman Emperor Heliogabalus (218-222 AD) wore nothing but silk. By 380 AD, the Roman historian Marcellinus Ammianus reported that the use of silk, which was one confined to the nobility, has now spread to all classes without distinction - even to the lowest. The desire for silk continued to increase over the centuries. Despite this demand, the price of silk remained very high.

In spite of their secrecy about production methods, the Chinese eventually lost their monopoly on silk production. Knowledge of silk production methods reached Korea around 200 BC, when waves of Chinese immigrants arrived there. Shortly after 300 AD, it travelled westward, and the cultivation of the silkworm was established in India.

Around 550 AD silk production reached the Middle East. Records indicate that two monks from Constantinople (modern-day Istanbul), capital of the Byzantine Empire, appeared at their emperor's court with silkworm eggs which they had obtained secretly, and hidden in their hollow bamboo walking sticks. Under their supervision the eggs hatched into worms, and the worms spun silk threads. Byzantium was in the silk business at last. The Byzantine church and state created imperial workshops, monopolising production and keeping the secret to themselves. This allowed a silk industry to be established, undercutting the market for ordinary-grade Chinese silk. However, high quality silk textiles, woven in China especially for the Middle Eastern market, continued to achieve high prices in the West, and trade along the Silk Road continued as before. By the sixth century the Persians, too, had mastered the art of silk weaving, developing their own rich patterns and techniques. But it wasn't until the 13th century that Italy began silk production, with the introduction of 2,000 skilled silk weavers from Constantinople. Eventually, silk production became widespread throughout Europe.

World silk production has approximately doubled during the last 30 years in spite of man-made fibres replacing certain uses of silk. Before this period, China and Japan were the two main producers, together manufacturing more than 50 per cent of world production each year. After the late 1970s, however, China dramatically increased its silk production, and once again became the world's leading producer.`,
        questions: [
          { id: 1, type: 'fill', label: 'Early Uses - Clothing: Emperor wore', suffix: 'silk indoors', answer: 'yellow', acceptable: ['yellow'] },
          { id: 2, type: 'fill', label: 'In industry: Silk items included parts of musical instruments, fishing strings and', suffix: '', answer: 'paper', acceptable: ['paper'] },
          { id: 3, type: 'fill', label: 'Currency: Silk was used as payment of', suffix: 'as well as for wages and rewards', answer: 'taxes', acceptable: ['taxes', 'tax'] },
          { id: 4, type: 'fill', label: 'Silk replaced', suffix: 'as a unit of value', answer: 'gold', acceptable: ['gold'] },
          { id: 5, type: 'fill', label: 'Silk soon used as payment in', suffix: 'trade', answer: 'foreign', acceptable: ['foreign', 'international'] },
          { id: 6, type: 'fill', label: 'Evidence of silk trade: 1070 BC, Egypt: hair of a', suffix: 'contained silk', answer: 'mummy', acceptable: ['mummy'] },
          { id: 7, type: 'fill', label: '1015 AD, north-west China: silk objects were hidden inside', suffix: '', answer: 'caves', acceptable: ['caves', 'tombs'] },
          { id: 8, type: 'choice', question: 'Their first sight of silk created fear among Roman soldiers.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE' },
          { id: 9, type: 'choice', question: 'The quality of Chinese silk imported by the early Romans varied widely.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN' },
          { id: 10, type: 'choice', question: 'The Byzantine emperor first acquired silkworm eggs from the Chinese emperor.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 11, type: 'choice', question: 'The price of high-grade Chinese silk fell due to competition from Middle-Eastern producers.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 12, type: 'choice', question: 'Silk was produced in the Middle East several centuries before it was produced in Europe.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE' },
          { id: 13, type: 'choice', question: 'Global silk production has declined in recent years.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
        ]
      },
      { 
        id: 2, 
        title: 'Passage 2', 
        name: 'The discovery of a baby mammoth', 
        questionRange: '14–26', 
        questionCount: 13, 
        tags: ['#[Reading] Matching Information', '#[Reading] Summary Completion'],
        instruction: 'Questions 14–26: Read Passage 2 and answer the questions based on the text.',
        readingText: `A near-perfect frozen mammoth offers clues to a great vanished species.

A. On a May morning in 2007, on the Yamal Peninsula in northwestern Siberia, a Nenets reindeer herder named Yuri Khudi stood on a sandbar on the Yuribey River, looking carefully at a diminutive corpse. Although he'd never seen such an animal before, Khudi had seen many mammoth tusks, the thick corkscrew shafts that his people found each summer, and this persuaded him the corpse was a baby mammoth. It was eerily well preserved. Apart from its missing hair and toenails, it was perfectly intact. Khudi realised the find might be significant and he knew he couldn't just return home and forget all about it. He therefore decided to travel to the small town of Yar Sale to consult an old friend named Kirill Serotetto. His friend took him to meet the director of the local museum, who persuaded the local authorities to fly Khudi and Serotetto back to the Yuribey River to collect the baby mammoth.

B. Mammoths became extinct between 14,000 and 10,000 years ago and since the extinctions coincided with the end of the most recent Ice age, many researchers believe that the primary cause of the great die-off was the sharp rise in temperature, which dramatically altered the vegetation. 'We have strong evidence that the temperature rise played a significant part in their extinction,' says Adrian Lister, a palaeontologist and mammoth expert at London's Natural History Museum. 'In Eurasia, the timing of the two events matches closely.' The extinctions also coincided, however, with the arrival of modern humans. In addition to exploiting mammoths for food, they used their bones and tusks to make weapons, tools, and even dwellings. Some scientists believe humans were as much to blame as the temperature rise for the great die-off. Some say they caused it.

C. The body of the baby mammoth was eventually sent to the St Petersburg Zoological Museum in Russia. Alexei Tikhonov, the museum's director, was one of the first scientists to view the baby, a female. According to Tikhonov, Khudi had rescued 'the best preserved mammoth to come down to US from the Ice Age', and he gratefully named her Lyuba, after Khudi's wife. Tikhonov knew that no-one would be more excited by the find than Dan Fisher, an American colleague at the University of Michigan who had spent 30 years researching the lives of mammoths. Tikhonov invited Fisher, along with Bernard Buigues, a French mammoth hunter, to come and view the baby mammoth. Fisher and Buigues had examined other specimens together, including infants, but these had been in a relatively poor state. Lyuba was another story entirely. Other than the missing hair and toenails, the only flaw in her pristine appearance was a curious dent above the trunk.

D. Fisher was particularly excited about one specific part of Lyuba's anatomy: her milk tusks. Through his career, Fisher has taken hundreds of tusk samples. Most of these came from the Great Lakes region of North America, and his research showed that these animals continued to thrive, despite the late Pleistocene temperature change. On the other hand, mammoth populations dropped sharply whenever human hunters entered their territory.`,
        questions: [
          { id: 14, type: 'fill', label: 'The baby mammoth was discovered in May 2007 by a reindeer herder named Yuri', suffix: '', answer: 'Khudi', acceptable: ['Khudi'] },
          { id: 15, type: 'fill', label: 'The discovery took place on the sandbar of the', suffix: 'River in Siberia', answer: 'Yuribey', acceptable: ['Yuribey'] },
          { id: 16, type: 'fill', label: 'The baby mammoth was given the name', suffix: 'after the herder\'s wife', answer: 'Lyuba', acceptable: ['Lyuba'] },
          { id: 17, type: 'choice', question: 'Primary factor argued by Adrian Lister for mammoth extinction in Eurasia:', options: ['A. Temperature rise altering vegetation', 'B. Arrival of modern hunters', 'C. Severe volcanic activity'], answer: 'A' },
          { id: 18, type: 'choice', question: 'Dan Fisher was particularly interested in examining Lyuba\'s:', options: ['A. Trunk muscles', 'B. Milk tusks', 'C. Stomach contents'], answer: 'B' },
          { id: 19, type: 'fill', label: 'Extinction of mammoths occurred between', suffix: 'and 10,000 years ago', answer: '14,000', acceptable: ['14000', '14,000'] },
          { id: 20, type: 'fill', label: 'The baby mammoth corpse was transported to the Zoological Museum in St', suffix: '', answer: 'Petersburg', acceptable: ['Petersburg'] },
          { id: 21, type: 'choice', question: 'Humans used mammoth bones and tusks to build dwellings and weapons.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE' },
          { id: 22, type: 'choice', question: 'Lyuba was found completely devoid of tusks.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 23, type: 'choice', question: 'Bernard Buigues had discovered a fully preserved adult mammoth before Lyuba.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'NOT GIVEN' },
          { id: 24, type: 'choice', question: 'Fisher\'s research in North America showed mammoths suffered from extreme cold.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 25, type: 'fill', label: 'The only visible flaw on Lyuba was a dent above the', suffix: '', answer: 'trunk', acceptable: ['trunk'] },
          { id: 26, type: 'fill', label: 'Friend of Khudi who helped consult museum director: Kirill', suffix: '', answer: 'Serotetto', acceptable: ['Serotetto'] },
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
        readingText: `How does someone become expert in music? And IS it really possible to have a 'talent' for music?

Does that class of people acknowledged to be musical experts just have more of the same basic skills we are all endowed with, or do they have a set of abilities or neural structures that are totally different from those of the rest of US? Are high levels of musical achievement simply the result of training and practice, or are they based on innate brain structure - what we refer to as 'talent'? Talent can be defined as something that originates in genetic structures and that is identifiable by trained people who can recognize its existence before a person has achieved exceptional levels of performance. The emphasis on early identification means that to investigate it, we study the development of skills in children.

It is evident that some children acquire skills more rapidly than others: the age of onset for walking and talking varies widely, even between children in the same household. There may be genetic factors at work, but these are closely linked with other factors - with a presumably environmental component - such as motivation and family dynamics. Similar factors can influence musical development and can mask the contribution of genetics to musical ability.

Brain studies, so far, haven't been of much use in sorting out the issues. Gottfried Schlaug at Harvard collected brain scans of individuals with absolute pitch (AP) and showed that a region in the brain called the planum temporale is larger in these people than in others. This suggests that the planum is involved in AP, but it's not clear if it starts out larger in people who eventually acquire AP, or if the acquisition of AP makes the planum increase in size.

Results of research into the areas of the brain involved in skilled motor movement are more conclusive. Studies of violin players have shown that the region of the brain responsible for controlling the movement of the left hand (the hand that requires greater precision in violin playing) increases in size as a result of practice. We do not know yet if the propensity for increase pre-exists in some people and not others.

The evidence against talent comes from research on how much training the experts do. Like experts in mathematics, chess, or sports, experts in music require lengthy periods of instruction and practice. In several studies, the very best music students were found to have practiced more than twice as much as the others. In another study, students were secretly divided into two groups based on teachers' perceptions of their talent. Several years later, it was found that the students who achieved the highest performance ratings had practiced the most, irrespective of which 'talent' group they had been assigned to.`,
        questions: [
          { id: 27, type: 'choice', question: 'According to the author, talent is primarily defined as originating in:', options: ['A. Intensive childhood practice', 'B. Genetic structures', 'C. High emotional motivation'], answer: 'B' },
          { id: 28, type: 'choice', question: 'Gottfried Schlaug\'s research at Harvard examined musicians with:', options: ['A. Left-handed dexterity', 'B. Absolute pitch', 'C. Photographic memory'], answer: 'B' },
          { id: 29, type: 'choice', question: 'The study of violin players demonstrated that practice enlarges brain areas controlling:', options: ['A. Right hand bowing speed', 'B. Left hand finger precision', 'C. Auditory temporal cortex'], answer: 'B' },
          { id: 30, type: 'choice', question: 'What did the secret study dividing students by teachers\' talent perceptions reveal?', options: ['A. Perceived talent accurately predicted final skill', 'B. Practice hours were the primary determinant of success', 'C. Teachers favored students of higher social backgrounds'], answer: 'B' },
          { id: 31, type: 'fill', label: 'Brain region associated with absolute pitch: planum', suffix: '', answer: 'temporale', acceptable: ['temporale'] },
          { id: 32, type: 'fill', label: 'Skills onset in children varies widely due to genetic and', suffix: 'components', answer: 'environmental', acceptable: ['environmental'] },
          { id: 33, type: 'choice', question: 'All children from the same household start walking and talking at identical ages.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 34, type: 'choice', question: 'The best music students practice more than twice as much as average peers.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE' },
          { id: 35, type: 'choice', question: 'Absolute pitch can be easily acquired by any adult after age 30.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 36, type: 'choice', question: 'Violin playing requires greater motor precision in the right hand than the left hand.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 37, type: 'fill', label: 'Music expertise requires lengthy periods of practice and', suffix: '', answer: 'instruction', acceptable: ['instruction', 'training'] },
          { id: 38, type: 'fill', label: 'Talent investigation focuses on development of skills in', suffix: '', answer: 'children', acceptable: ['children'] },
          { id: 39, type: 'choice', question: 'Research has conclusively proven genetic talent alone accounts for all musical success.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'FALSE' },
          { id: 40, type: 'choice', question: 'Family dynamics and motivation can influence musical development.', options: ['TRUE', 'FALSE', 'NOT GIVEN'], answer: 'TRUE' },
        ]
      }
    ]
  },
  {
    id: 'vol1-lis-2',
    vol: 1,
    testNum: 2,
    title: 'IELTS Collection 1 Listening Test 2',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 193596,
    commentsCount: 314,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening'],
    parts: [
      { id: 1, title: 'Recording 1', name: 'Part 1: Customer Service Inquiry', questionRange: '1–10', questionCount: 10, tags: ['#[Listening] Form Completion'] },
      { id: 2, title: 'Recording 2', name: 'Part 2: Museum Guide', questionRange: '11–20', questionCount: 10, tags: ['#[Listening] Multiple Choice'] },
      { id: 3, title: 'Recording 3', name: 'Part 3: Project Meeting', questionRange: '21–30', questionCount: 10, tags: ['#[Listening] Matching'] },
      { id: 4, title: 'Recording 4', name: 'Part 4: Renewable Energy', questionRange: '31–40', questionCount: 10, tags: ['#[Listening] Sentence Completion'] }
    ]
  },
  {
    id: 'vol1-read-2',
    vol: 1,
    testNum: 2,
    title: 'IELTS Collection 1 Reading Test 2',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 123519,
    commentsCount: 291,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading'],
    parts: [
      { id: 1, title: 'Passage 1', name: 'Urban Agriculture Innovations', questionRange: '1–13', questionCount: 13, tags: ['#[Reading] True/False/Not Given'] },
      { id: 2, title: 'Passage 2', name: 'The Secret Life of Whales', questionRange: '14–26', questionCount: 13, tags: ['#[Reading] Headings Matching'] },
      { id: 3, title: 'Passage 3', name: 'Artificial Intelligence and Human Labor', questionRange: '27–40', questionCount: 14, tags: ['#[Reading] Multiple Choice'] }
    ]
  },
  {
    id: 'vol2-lis-1',
    vol: 2,
    testNum: 1,
    title: 'IELTS Collection 2 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 148200,
    commentsCount: 230,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol2-read-1',
    vol: 2,
    testNum: 1,
    title: 'IELTS Collection 2 Reading Test 1',
    category: 'IELTS Academic',
    skill: 'Reading',
    duration: 60,
    participants: 112450,
    commentsCount: 184,
    partsCount: 3,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Reading']
  },
  {
    id: 'vol3-lis-1',
    vol: 3,
    testNum: 1,
    title: 'IELTS Collection 3 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 98400,
    commentsCount: 156,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol4-lis-1',
    vol: 4,
    testNum: 1,
    title: 'IELTS Collection 4 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 76500,
    commentsCount: 110,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol5-lis-1',
    vol: 5,
    testNum: 1,
    title: 'IELTS Collection 5 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 65100,
    commentsCount: 95,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol6-lis-1',
    vol: 6,
    testNum: 1,
    title: 'IELTS Collection 6 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 58900,
    commentsCount: 82,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol7-lis-1',
    vol: 7,
    testNum: 1,
    title: 'IELTS Collection 7 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 49200,
    commentsCount: 68,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol8-lis-1',
    vol: 8,
    testNum: 1,
    title: 'IELTS Collection 8 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 41800,
    commentsCount: 54,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  },
  {
    id: 'vol9-lis-1',
    vol: 9,
    testNum: 1,
    title: 'IELTS Collection 9 Listening Test 1',
    category: 'IELTS Academic',
    skill: 'Listening',
    duration: 40,
    participants: 36700,
    commentsCount: 49,
    partsCount: 4,
    questionsCount: 40,
    tags: ['#IELTS Academic', '#Listening']
  }
];

export const FILTER_CATEGORIES = [
  'Tất cả',
  'IELTS Academic',
  'IELTS General',
  'TOEIC SW',
  'TOEIC',
  'HSK 1',
  'HSK 2',
  'HSK 3',
  'HSK 4',
  'HSK 5',
  'HSK 6',
  'TOPIK I',
  'TOPIK II',
  'N5',
  'N4',
  'N3',
  'N2',
  'N1',
  'Tiếng Anh THPTQG',
  'Toán THPTQG',
  'Vật lý THPTQG',
  'Hóa học THPTQG',
  'Sinh học THPTQG',
  'Digital SAT',
  'ACT'
];
