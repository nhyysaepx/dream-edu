// IELTS Intermediate Listening 6: Signposting & The Future of Fracking
// Detail data for homework assignment intermediate-listening-6
// Source: Mindset for IELTS Level 2 - Unit 6 (The Natural Environment)

export const INTERMEDIATE_LISTENING_6_DETAIL = {
  id: 'intermediate-listening-6',
  title: 'HOMEWORK - Listening 6: Signposting Words & The Future of Fracking',
  level: 'IELTS Intermediate',
  levelId: 'ielts-foundation',
  session: 'Buổi 6 - Giáo trình Mindset for IELTS Level 2 (Unit 6: The Natural Environment)',
  skill: 'Listening',
  vocabId: 'intermediate-listening-6',
  description: 'Trọn bộ bài tập về nhà Listening 6 gồm 25 câu hỏi: Bài 01 (Track 56 - Nhận diện từ nối Signposting và xác định chức năng) và Bài 02 (Track 57 - Trắc nghiệm Multiple Choice về tương lai của khí đá phiến fracking và năng lượng tái tạo).',
  totalQuestions: 25,
  duration: '35 - 45 phút',
  passages: [
    {
      id: 'p1',
      number: 1,
      title: '01 Signposting Words & Expressions in Lecture (Track 56)',
      shortTitle: 'Part 1: Signposting Words (Track 56)',
      audioSrc: '/audio/homework/intermediate/listening_6/track_56.mp3',
      trackLabel: 'Audio Track 56',
      instruction: "Listen again to the lecturer talking about people's concerns and write signposting words and expressions from the box in the table. Write the correct function for each expression: sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) or attitude (AT).",
      tip: "TIP 16: Signposting can help you know where you are up to with the exam questions because these occur in the same order as the script. If you get lost, signposting words and expressions may help you find your way back to the right question.",
      wordBox: [
        'clearly',
        'earlier',
        'to begin with',
        'secondly',
        'now',
        'while',
        'that',
        'first',
        'to summarise',
        "what's more",
        'last'
      ],
      functions: [
        { code: 'SE', name: 'Sequencing', desc: 'Sắp xếp trình tự, thứ tự các ý / luận điểm' },
        { code: 'C', name: 'Contrast', desc: 'Chỉ sự tương phản, đối lập giữa các ý kiến' },
        { code: 'AD', name: 'Addition', desc: 'Bổ sung thêm luận điểm hoặc thông tin' },
        { code: 'SU', name: 'Summarising', desc: 'Tóm tắt, tổng kết lại nội dung chính' },
        { code: 'T', name: 'Topic change', desc: 'Chuyển sang chủ đề / khía cạnh mới' },
        { code: 'AT', name: 'Attitude', desc: 'Bộc lộ thái độ, quan điểm của người nói' }
      ],
      tableExample: {
        expression: 'To begin with',
        sentence: "To begin with, let's look at the environmental concerns.",
        function: 'SE',
        functionLabel: 'SE (Sequencing - Đã làm mẫu)'
      },
      tableRows: [
        {
          rowNumber: 1,
          sentenceBefore: 'The',
          sentenceAfter: 'and possibly most significant environmental concern is ...',
          wordQuestionId: 'p1_q1_word',
          wordQuestionNumber: 1,
          funcQuestionId: 'p1_q1_func',
          funcQuestionNumber: 2
        },
        {
          rowNumber: 2,
          sentenceBefore: '',
          sentenceAfter: ', it is likely that, although countries which produce shale gas ...',
          wordQuestionId: 'p1_q2_word',
          wordQuestionNumber: 3,
          funcQuestionId: 'p1_q2_func',
          funcQuestionNumber: 4
        },
        {
          rowNumber: 3,
          sentenceBefore: '',
          sentenceAfter: ', there are serious pollution problems ...',
          wordQuestionId: 'p1_q3_word',
          wordQuestionNumber: 5,
          funcQuestionId: 'p1_q3_func',
          funcQuestionNumber: 6
        },
        {
          rowNumber: 4,
          sentenceBefore: 'The',
          sentenceAfter: 'environmental concern connected with drilling is that of earthquakes.',
          wordQuestionId: 'p1_q4_word',
          wordQuestionNumber: 7,
          funcQuestionId: 'p1_q4_func',
          funcQuestionNumber: 8
        },
        {
          rowNumber: 5,
          sentenceBefore: '',
          sentenceAfter: "I'd like to turn to the economic concerns.",
          wordQuestionId: 'p1_q5_word',
          wordQuestionNumber: 9,
          funcQuestionId: 'p1_q5_func',
          funcQuestionNumber: 10
        },
        {
          rowNumber: 6,
          sentenceBefore: '',
          sentenceAfter: "there's clearly an increase in economic activity ...",
          wordQuestionId: 'p1_q6_word',
          wordQuestionNumber: 11,
          funcQuestionId: 'p1_q6_func',
          funcQuestionNumber: 12
        },
        {
          rowNumber: 7,
          sentenceBefore: 'As I mentioned',
          sentenceAfter: ', there are a lot of concerns ...',
          wordQuestionId: 'p1_q7_word',
          wordQuestionNumber: 13,
          funcQuestionId: 'p1_q7_func',
          funcQuestionNumber: 14
        },
        {
          rowNumber: 8,
          sentenceBefore: '',
          sentenceAfter: ', a lot more research needs to be done ...',
          wordQuestionId: 'p1_q8_word',
          wordQuestionNumber: 15,
          funcQuestionId: 'p1_q8_func',
          funcQuestionNumber: 16
        },
        {
          rowNumber: 9,
          sentenceBefore: 'So',
          sentenceAfter: ', there are significant environmental ...',
          wordQuestionId: 'p1_q9_word',
          wordQuestionNumber: 17,
          funcQuestionId: 'p1_q9_func',
          funcQuestionNumber: 18
        },
        {
          rowNumber: 10,
          sentenceBefore: 'We can see that the future is very uncertain, and',
          sentenceAfter: "is what I'd now like to discuss.",
          wordQuestionId: 'p1_q10_word',
          wordQuestionNumber: 19,
          funcQuestionId: 'p1_q10_func',
          funcQuestionNumber: 20
        }
      ],
      questions: [
        {
          id: 'p1_q1_word',
          number: 1,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 1 (Từ nối)',
          question: '1. The (1) _______________ and possibly most significant environmental concern is ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['first', 'First'],
          primaryAnswer: 'first',
          evidence: 'The first and possibly most significant environmental concern is that, despite producing lower levels of carbon dioxide, shale gas is still a cause of global warming...',
          explanation: 'Từ nối "first" được diễn giả sử dụng để mở đầu cho luận điểm về mối lo ngại môi trường đầu tiên (vấn đề biến đổi khí hậu do khí đá phiến). Chức năng là sắp xếp trình tự (Sequencing - SE).'
        },
        {
          id: 'p1_q1_func',
          number: 2,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 1 (Chức năng)',
          question: 'Chức năng của từ nối "first": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['SE', 'se', 'Sequencing', 'sequencing', 'sequence', 'Sequence'],
          primaryAnswer: 'SE',
          evidence: '"The first and possibly most significant environmental concern is..."',
          explanation: '"first" là từ nối chỉ thứ tự, trình tự luận điểm trong bài thuyết trình (Sequencing).'
        },
        {
          id: 'p1_q2_word',
          number: 3,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 2 (Từ nối)',
          question: '2. (2) _______________ , it is likely that, although countries which produce shale gas ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ["What's more", "what's more", "Whats more", "whats more", "What is more", "what is more"],
          primaryAnswer: "What's more",
          evidence: "What's more, it's likely that, although countries which produce shale gas will use less coal and oil, the use of coal and oil will still continue to increase in other places.",
          explanation: 'Cụm từ "What\'s more" được dùng để bổ sung thêm một ý tiêu cực nữa về khí đá phiến (các quốc gia khác vẫn tăng tiêu thụ than và dầu). Chức năng là bổ sung thông tin (Addition - AD).'
        },
        {
          id: 'p1_q2_func',
          number: 4,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 2 (Chức năng)',
          question: 'Chức năng của từ nối "what\'s more": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['AD', 'ad', 'Addition', 'addition', 'add', 'Add'],
          primaryAnswer: 'AD',
          evidence: '"What\'s more, it\'s likely that..."',
          explanation: '"What\'s more" là trạng từ liên kết dùng để bổ sung một luận điểm hoặc sự kiện mới vào luận cứ (Addition).'
        },
        {
          id: 'p1_q3_word',
          number: 5,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 3 (Từ nối)',
          question: '3. (3) _______________ , there are serious pollution problems ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['Secondly', 'secondly', 'Second', 'second'],
          primaryAnswer: 'Secondly',
          evidence: 'Another environmental concern is pollution. If the production site is badly maintained, dangerous chemicals can get into water sources and rivers.',
          explanation: 'Trong cấu trúc bài giảng, sau luận điểm thứ nhất ("first"), diễn giả chuyển sang luận điểm thứ hai về ô nhiễm nguồn nước ("Another environmental concern is pollution"). Từ trong hộp phù hợp để thể hiện ý thứ hai này là "secondly". Chức năng là sắp xếp trình tự (Sequencing - SE).'
        },
        {
          id: 'p1_q3_func',
          number: 6,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 3 (Chức năng)',
          question: 'Chức năng của từ nối "secondly": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['SE', 'se', 'Sequencing', 'sequencing', 'sequence', 'Sequence'],
          primaryAnswer: 'SE',
          evidence: '"Another environmental concern is pollution..." / Từ "secondly" trong Word Box.',
          explanation: '"secondly" là trạng từ chỉ thứ tự (Sequencing), báo hiệu điểm thảo luận thứ hai trong chuỗi lập luận.'
        },
        {
          id: 'p1_q4_word',
          number: 7,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 4 (Từ nối)',
          question: '4. The (4) _______________ environmental concern connected with drilling is that of earthquakes.',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['last', 'Last'],
          primaryAnswer: 'last',
          evidence: 'The last environmental concern connected with drilling is that of earthquakes. We\'re more familiar with earthquakes happening in certain areas of the world like Japan and China...',
          explanation: 'Diễn giả dùng từ "last" để chốt lại mối quan ngại cuối cùng trong nhóm tác động môi trường (hiện tượng địa chấn do khoan ép). Chức năng là sắp xếp trình tự (Sequencing - SE).'
        },
        {
          id: 'p1_q4_func',
          number: 8,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 4 (Chức năng)',
          question: 'Chức năng của từ nối "last": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['SE', 'se', 'Sequencing', 'sequencing', 'sequence', 'Sequence'],
          primaryAnswer: 'SE',
          evidence: '"The last environmental concern connected with drilling is that of earthquakes."',
          explanation: '"last" biểu thị yếu tố cuối cùng trong một danh sách/trình tự (Sequencing).'
        },
        {
          id: 'p1_q5_word',
          number: 9,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 5 (Từ nối)',
          question: "5. (5) _______________ I'd like to turn to the economic concerns.",
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['Now', 'now'],
          primaryAnswer: 'Now',
          evidence: "Now I'd like to turn to the economic concerns. Opponents of fracking say that the economic benefits are not as great as its supporters claim.",
          explanation: 'Diễn giả nói "Now I\'d like to turn to...", dùng từ "Now" để chuyển mạch bài giảng từ nhóm vấn đề môi trường sang nhóm vấn đề kinh tế. Chức năng là chuyển chủ đề (Topic change - T).'
        },
        {
          id: 'p1_q5_func',
          number: 10,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 5 (Chức năng)',
          question: 'Chức năng của từ nối "now": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['T', 't', 'Topic change', 'topic change', 'topic', 'Topic', 'Topic Change'],
          primaryAnswer: 'T',
          evidence: '"Now I\'d like to turn to the economic concerns."',
          explanation: '"Now" trong cấu trúc "Now I\'d like to turn to..." dùng để báo hiệu chuyển hướng nội dung sang một phân mục hoặc chủ đề thảo luận mới (Topic change).'
        },
        {
          id: 'p1_q6_word',
          number: 11,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 6 (Từ nối)',
          question: "6. (6) _______________ there's clearly an increase in economic activity ...",
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['While', 'while'],
          primaryAnswer: 'While',
          evidence: "While there's clearly an increase in economic activity in the areas where fracking is carried out, as I discussed earlier, there are often negative effects on agriculture and farming in these areas...",
          explanation: 'Từ "While" đứng đầu mệnh đề nhượng bộ thể hiện sự tương phản (Contrast) giữa sự tăng trưởng kinh tế cục bộ với các tác động tiêu cực đến nông nghiệp và giá nhà đất.'
        },
        {
          id: 'p1_q6_func',
          number: 12,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 6 (Chức năng)',
          question: 'Chức năng của từ nối "while": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['C', 'c', 'Contrast', 'contrast'],
          primaryAnswer: 'C',
          evidence: '"While there\'s clearly an increase in economic activity... there are often negative effects..."',
          explanation: '"While" (trong khi/mặc dù) dùng để kết nối và đối chiếu hai vế có tính chất tương phản, trái ngược nhau (Contrast).'
        },
        {
          id: 'p1_q7_word',
          number: 13,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 7 (Từ nối)',
          question: '7. As I mentioned (7) _______________ , there are a lot of concerns ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['earlier', 'Earlier'],
          primaryAnswer: 'earlier',
          evidence: '...as I discussed earlier, there are often negative effects... / As I mentioned earlier, there are many people in different countries like Canada, the UK and France who don\'t support fracking...',
          explanation: 'Diễn giả sử dụng cụm "As I mentioned earlier" (như tôi đã đề cập trước đó) để quy chiếu lại thông tin đã phát biểu trong bài giảng. Chức năng là sắp xếp trình tự bài nói theo dòng thời gian (Sequencing - SE).'
        },
        {
          id: 'p1_q7_func',
          number: 14,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 7 (Chức năng)',
          question: 'Chức năng của từ nối "earlier": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['SE', 'se', 'Sequencing', 'sequencing', 'sequence', 'Sequence'],
          primaryAnswer: 'SE',
          evidence: '"As I mentioned earlier, there are many people in different countries..."',
          explanation: '"earlier" (trước đó) định vị một điểm thông tin đã được trình bày trong trình tự thời gian của bài nói (Sequencing).'
        },
        {
          id: 'p1_q8_word',
          number: 15,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 8 (Từ nối)',
          question: '8. (8) _______________ , a lot more research needs to be done ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['Clearly', 'clearly'],
          primaryAnswer: 'Clearly',
          evidence: 'Clearly, a lot more research needs to be done on the effects of fracking on health.',
          explanation: 'Diễn giả bắt đầu câu bằng "Clearly" (Rõ ràng là) để bộc lộ thái độ và mức độ tin tưởng chắc chắn của bản thân đối với nhận định cần thêm nghiên cứu. Chức năng là thể hiện thái độ (Attitude - AT).'
        },
        {
          id: 'p1_q8_func',
          number: 16,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 8 (Chức năng)',
          question: 'Chức năng của từ nối "clearly": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['AT', 'at', 'Attitude', 'attitude'],
          primaryAnswer: 'AT',
          evidence: '"Clearly, a lot more research needs to be done on the effects of fracking on health."',
          explanation: '"Clearly" là phó từ bình luận (comment adverb) thể hiện thái độ đánh giá, mức độ hiển nhiên và xác thực từ góc nhìn của người nói (Attitude).'
        },
        {
          id: 'p1_q9_word',
          number: 17,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 9 (Từ nối)',
          question: '9. So (9) _______________ , there are significant environmental ...',
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['to summarise', 'To summarise', 'to summarize', 'To summarize'],
          primaryAnswer: 'to summarise',
          evidence: 'So to summarise, there are significant environmental, economic and health concerns connected with fracking, but we need to carry out a lot more research to see whether these concerns are real.',
          explanation: 'Cụm "to summarise" (để tóm tắt lại) được diễn giả sử dụng để tổng kết lại 3 nhóm vấn đề chính (môi trường, kinh tế, sức khỏe) trước khi kết bài. Chức năng là tóm tắt (Summarising - SU).'
        },
        {
          id: 'p1_q9_func',
          number: 18,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 9 (Chức năng)',
          question: 'Chức năng của từ nối "to summarise": sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['SU', 'su', 'Summarising', 'summarising', 'summarize', 'Summarize', 'summarise', 'Summarise', 'Summarizing', 'summarizing'],
          primaryAnswer: 'SU',
          evidence: '"So to summarise, there are significant environmental, economic and health concerns..."',
          explanation: '"to summarise" là cụm từ quy chuẩn báo hiệu phần tóm lược, cô đọng các nội dung chính đã bàn luận (Summarising).'
        },
        {
          id: 'p1_q10_word',
          number: 19,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 10 (Từ nối)',
          question: "10. We can see that the future is very uncertain, and (10) _______________ is what I'd now like to discuss.",
          placeholder: 'Điền từ nối...',
          acceptedAnswers: ['that', 'That'],
          primaryAnswer: 'that',
          evidence: "We can see that the future is very uncertain, and that is what I'd now like to discuss.",
          explanation: 'Diễn giả khép lại phần thảo luận các mối nguy hại bằng câu "...and that is what I\'d now like to discuss" để chuyển tiếp người nghe sang nội dung bàn về tương lai năng lượng. Chức năng là chuyển chủ đề (Topic change - T).'
        },
        {
          id: 'p1_q10_func',
          number: 20,
          type: 'fill',
          sectionId: 'sec1',
          label: 'Câu 10 (Chức năng)',
          question: 'Chức năng của từ nối "that" trong ngữ cảnh này: sequencing (SE), contrast (C), addition (AD), summarising (SU), topic change (T) hoặc attitude (AT)?',
          placeholder: 'Điền chức năng (SE, C, AD...)',
          acceptedAnswers: ['T', 't', 'Topic change', 'topic change', 'topic', 'Topic', 'Topic Change'],
          primaryAnswer: 'T',
          evidence: '"We can see that the future is very uncertain, and that is what I\'d now like to discuss."',
          explanation: 'Mệnh đề "...and that is what I\'d now like to discuss" tạo nhịp cầu chuyển sang nội dung thảo luận mới về tương lai của năng lượng (Topic change).'
        }
      ],
      transcript: `Track 56 Audio Transcript:

Despite the benefits of fracking which its supporters claim, there are clearly various concerns connected with it. Some of these are real, but it's possible that they're not as well founded as opponents of fracking would have us believe.

So, what exactly are these concerns? Well, we can divide them into three categories: environmental concerns, health concerns, and economic concerns.

To begin with, let's look at the environmental concerns.
The first and possibly most significant environmental concern is that, despite producing lower levels of carbon dioxide, shale gas is still a cause of global warming, and so it should not be used. In effect, it simply stops energy producers and governments focusing on the real need to develop renewable sources of energy.
What's more, it's likely that, although countries which produce shale gas will use less coal and oil, the use of coal and oil will still continue to increase in other places, so globally there will be little or no benefit to the environment.

Another environmental concern is pollution. If the production site is badly maintained, dangerous chemicals can get into water sources and rivers. Well, there's some evidence of this happening at existing production sites, it isn't clear whether this problem happens everywhere, so more research is needed.

The last environmental concern connected with drilling is that of earthquakes. We're more familiar with earthquakes happening in certain areas of the world like Japan and China, but there's evidence that drilling can disturb the ground in the local area, causing it to move and shake, which in turn damages buildings. Usually these movements aren't serious, but they can cause a lot of worry to the local population, so they need to be considered. In fact, very few of these ground movements have definitely been caused by drilling, and it might be that people are worried because of what they hear or read in the media, rather than the actual reality of the situation.

Now I'd like to turn to the economic concerns.
Opponents of fracking say that the economic benefits are not as great as its supporters claim. While there's clearly an increase in economic activity in the areas where fracking is carried out, as I discussed earlier, there are often negative effects on agriculture and farming in these areas, and there's good evidence that house prices fall, because people aren't willing to move into areas where fracking is taking place or has taken place.
Another economic concern is that gas production can be very high at the beginning of the fracking process, but it can drop quickly, down to as little as 10% in five years. This can result in more drilling and greater use of water, which increases the cost of getting the gas out of the ground.
The other main economic problem is that the estimated amount of gas in the ground may not be anywhere near as high as fracking supporters claim, so investing huge amounts of money in new wells may not benefit the economy at all.

This brings me to the last major concern: health.
Fracking can bring with it a pollution problem. If the well isn't deep enough, less than 600 meters, or if there are problems with drilling, the chemicals can leak into the drinking water supply and cause problems for the local population. There've even been reports of residents opening their water taps and seeing brown water and mud coming out.
Pollution can also be carried in the air to local towns, and affect people with existing medical problems, especially those with breathing difficulties. There've even been reports of more cases of cancer among people living near production sites, as well as among the workers themselves.
Clearly, a lot more research needs to be done on the effects of fracking on health.

So to summarise, there are significant environmental, economic and health concerns connected with fracking, but we need to carry out a lot more research to see whether these concerns are real. Whether they're real or not, they're having an effect on the fracking industry right now. In many places around the world, local people have protested angrily when they've found out that fracking is planned in their area. These concerns have also led local, regional and national governments to announce that fracking won't start until they're quite sure that it's safe. This means that they'll prevent any activity connected with fracking until there's enough evidence to assure its safety, especially in areas with higher populations. In fact, in France they've decided not to allow fracking anywhere in the country.
We can see that the future is very uncertain, and that is what I'd now like to discuss.`
    },
    {
      id: 'p2',
      number: 2,
      title: '02 Multiple Choice: Future of Fracking & Energy Forms (Track 57)',
      shortTitle: 'Part 2: Multiple Choice (Track 57)',
      audioSrc: '/audio/homework/intermediate/listening_6/track_57.mp3',
      trackLabel: 'Audio Track 57',
      instruction: 'The lecturer is talking about the future of fracking and other forms of energy. Listen and choose the correct answer, A, B or C.',
      questions: [
        {
          id: 'p2_q1',
          number: 21,
          type: 'choice',
          sectionId: 'sec2',
          question: '1. The problem with fracking is that it',
          placeholder: 'Điền chữ cái (A–C)...',
          options: [
            { letter: 'A', text: 'has caused carbon dioxide levels to rise by more than a third.' },
            { letter: 'B', text: 'will not help countries meet their energy requirements.' },
            { letter: 'C', text: 'will make the world climate warmer by 1 degree Celsius.' }
          ],
          acceptedAnswers: [
            'B',
            'b',
            'will not help countries meet their energy requirements',
            'B. will not help countries meet their energy requirements'
          ],
          primaryAnswer: 'B',
          evidence: "What's clear is that fracking isn't the answer to the growing worldwide need for energy, as countries increase their consumption.",
          explanation: 'Diễn giả nhấn mạnh: "fracking isn\'t the answer to the growing worldwide need for energy" (khí đá phiến không phải là giải pháp đáp ứng nhu cầu năng lượng ngày càng tăng của thế giới). Cụm "growing worldwide need for energy" được diễn đạt tương đương (paraphrase) thành "meet their energy requirements". Đáp án A sai vì việc nồng độ CO2 tăng hơn 1/3 là con số biến đổi chung trong suốt 200 năm qua; đáp án C sai vì nhiệt độ toàn cầu tăng gần 1°C là hiện tượng chung hiện tại chứ không phải do riêng fracking gây ra.'
        },
        {
          id: 'p2_q2',
          number: 22,
          type: 'choice',
          sectionId: 'sec2',
          question: '2. One result of climate change is',
          placeholder: 'Điền chữ cái (A–C)...',
          options: [
            { letter: 'A', text: 'lower levels of rain in some parts of Europe.' },
            { letter: 'B', text: 'serious problems for food production in some African regions.' },
            { letter: 'C', text: 'increased risk of ice in populated areas by the sea.' }
          ],
          acceptedAnswers: [
            'B',
            'b',
            'serious problems for food production in some African regions',
            'B. serious problems for food production in some African regions'
          ],
          primaryAnswer: 'B',
          evidence: 'Other places such as sub-Saharan Africa, are expected to become hotter, and drier, with deserts growing in area, and seriously affecting farmland.',
          explanation: 'Tại các khu vực như châu Phi hạ Sahara, thời tiết sẽ trở nên khô nóng hơn, sa mạc hóa mở rộng và "seriously affecting farmland" (ảnh hưởng nghiêm trọng đến đất canh tác nông nghiệp = "serious problems for food production"). Đáp án A sai vì Tây Bắc Âu được dự báo sẽ ẩm ướt hơn (wetter); đáp án C sai vì băng tan ở các vùng cực làm dâng mực nước biển gây nguy cơ ngập lụt ven biển (flooding), không phải đóng băng.'
        },
        {
          id: 'p2_q3',
          number: 23,
          type: 'choice',
          sectionId: 'sec2',
          question: '3. A reason renewable energy sources are not being developed quickly is that',
          placeholder: 'Điền chữ cái (A–C)...',
          options: [
            { letter: 'A', text: 'fracking is the best way to reduce global warming at the moment.' },
            { letter: 'B', text: 'governments want to find other long-term solutions.' },
            { letter: 'C', text: 'energy companies are afraid the cost will affect their businesses.' }
          ],
          acceptedAnswers: [
            'C',
            'c',
            'energy companies are afraid the cost will affect their businesses',
            'C. energy companies are afraid the cost will affect their businesses'
          ],
          primaryAnswer: 'C',
          evidence: "Consumers have to pay higher bills to help the development of cleaner sources, and energy companies don't want to lose customers by asking them to pay more.",
          explanation: 'Người tiêu dùng phải trả tiền điện/năng lượng cao hơn và các công ty năng lượng không muốn mất khách hàng khi yêu cầu họ trả thêm chi phí ("energy companies don\'t want to lose customers by asking them to pay more" = lo ngại chi phí đắt đỏ ảnh hưởng tiêu cực tới việc kinh doanh của họ). Đáp án B sai vì chính phủ thường chỉ nghĩ đến giải pháp ngắn hạn (short-term answers).'
        },
        {
          id: 'p2_q4',
          number: 24,
          type: 'choice',
          sectionId: 'sec2',
          question: '4. To develop renewable sources further',
          placeholder: 'Điền chữ cái (A–C)...',
          options: [
            { letter: 'A', text: 'commercial organisations need external help.' },
            { letter: 'B', text: 'governments need to produce less gas and oil.' },
            { letter: 'C', text: 'countries should work together to change their economies.' }
          ],
          acceptedAnswers: [
            'A',
            'a',
            'commercial organisations need external help',
            'A. commercial organisations need external help'
          ],
          primaryAnswer: 'A',
          evidence: "Consequently, it's important for international organisations like the United Nations and national governments to support the development of renewable resources.",
          explanation: 'Để tiếp tục phát triển các nguồn năng lượng tái tạo, sự hỗ trợ từ bên ngoài (external help) từ các tổ chức quốc tế (LHQ) và chính phủ các quốc gia đóng vai trò then chốt ("support the development of renewable resources"). Do đó phương án A hoàn toàn chuẩn xác.'
        },
        {
          id: 'p2_q5',
          number: 25,
          type: 'choice',
          sectionId: 'sec2',
          question: '5. Environmental groups believe that',
          placeholder: 'Điền chữ cái (A–C)...',
          options: [
            { letter: 'A', text: 'fracking can help reduce global warming in the short term.' },
            { letter: 'B', text: 'non-renewable sources can continue alongside renewable sources.' },
            { letter: 'C', text: 'only renewable sources will be able to provide energy in the future.' }
          ],
          acceptedAnswers: [
            'C',
            'c',
            'only renewable sources will be able to provide energy in the future',
            'C. only renewable sources will be able to provide energy in the future'
          ],
          primaryAnswer: 'C',
          evidence: 'They want to see continued action, and are trying to persuade governments to develop wind, wave and solar power, as well as other renewable forms of energy, to fight global warming, and ensure the supply of energy in the future. Certainly, coal, oil and gas will run out one day...',
          explanation: 'Các tổ chức môi trường nhận định nhiên liệu hóa thạch chắc chắn sẽ cạn kiệt ("coal, oil and gas will run out one day"), do đó chỉ có việc phát triển toàn diện các nguồn năng lượng tái tạo mới có thể đảm bảo cung cấp năng lượng cho nhân loại trong tương lai ("ensure the supply of energy in the future"). Đáp án A sai vì họ phản đối fracking kịch liệt; B sai vì họ muốn chấm dứt việc dựa vào nhiên liệu hóa thạch không tái tạo.'
        }
      ],
      transcript: `Track 57 Audio Transcript:

While fracking is being used around the world, we've seen that there are serious concerns about it. What's clear is that fracking isn't the answer to the growing worldwide need for energy, as countries increase their consumption.
Already the amount of carbon dioxide in the atmosphere has reached 400 parts per million. This may not seem very high, but we have to remember that 200 years ago, the level was around 280 parts per million, so it's increased by over a third since then.
As a result, it's estimated that global temperatures have already increased by almost 1 degree Celsius. This increase changes the climate, and affects the weather in many parts of the world.
Many places, such as northwest Europe, are expected to become warmer, and wetter. And we've seen winter storms becoming worse in this region.
Other places such as sub-Saharan Africa, are expected to become hotter, and drier, with deserts growing in area, and seriously affecting farmland.
Ice in the polar regions will melt, and sea levels will rise, which will put coastal cities in greater danger of flooding.
Clearly, we need to reduce and eventually stop using non-renewable resources like coal, oil and gas.

It may well be true that fracking can slow down global warming for a while, and allow us to develop better renewable resources.
However, these resources like wind, wave and solar power, are currently far more expensive to develop than shale gas production.
On top of that, they take a long time to develop, and start paying for themselves.
Consumers have to pay higher bills to help the development of cleaner sources, and energy companies don't want to lose customers by asking them to pay more.
Consequently, it's important for international organisations like the United Nations and national governments to support the development of renewable resources.

The problem here of course, is that governments usually think of short-term answers to energy problems, and not longer-term ones.
They're afraid that if they reduce the production and use of gas and oil, their economies will do worse than other economies, so they don't want to take action to increase the use of renewable sources.

As I mentioned earlier, there are many people in different countries like Canada, the UK and France who don't support fracking, especially if it's going to take place near where they live.
Environmental groups also oppose fracking, not just because they want to protect people living in areas where fracking is planned, but also because they see fracking as part of the old way of doing things, like burning coal, oil and gas, and increasing global warming.
They want to see continued action, and are trying to persuade governments to develop wind, wave and solar power, as well as other renewable forms of energy, to fight global warming, and ensure the supply of energy in the future.
Certainly, coal, oil and gas will run out one day, and if we haven't developed other forms of renewable energy, we'll then have serious problems with supplying energy to the growing world population, and the problems of fracking will seem relatively unimportant.`
    }
  ]
};
