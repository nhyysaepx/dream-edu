// Vocabulary sets data and storage helpers

export const CATEGORIES = {
  SCHOOL: 'school',
  IELTS: 'ielts',
  CEFR: 'cefr',
  CUSTOM: 'custom'
};

export const DEFAULT_VOCAB_SETS = [
  // ==========================================
  // TIẾNG ANH PHỔ THÔNG (LỚP 6 - 12)
  // ==========================================
  {
    id: 'unit-1-global-success-10',
    title: 'Unit 1: Family Life',
    subtitle: 'Tiếng Anh 10 - Global Success',
    description: 'Trọn bộ 74 từ vựng và cụm từ trọng tâm Unit 1 SGK Tiếng Anh 10 Global Success về chủ đề cuộc sống gia đình, thói quen và trách nhiệm.',
    category: 'school',
    gradeLevel: 'grade-10',
    grade: 'Lớp 10',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 10', 'Global Success', 'Unit 1', 'Family Life'],
    isOfficial: true,
    terms: [
      { id: 'u1-1', term: 'sports field', definition: 'sân thể thao' },
      { id: 'u1-2', term: 'be afraid', definition: 'e rằng' },
      { id: 'u1-3', term: 'prepare dinner', definition: 'chuẩn bị bữa tối' },
      { id: 'u1-4', term: 'study for exams', definition: 'ôn thi' },
      { id: 'u1-5', term: 'do the cooking', definition: 'nấu ăn' },
      { id: 'u1-6', term: 'divide', definition: 'phân chia' },
      { id: 'u1-7', term: 'household chores/ tasks', definition: 'việc nhà' },
      { id: 'u1-8', term: 'homemaker', definition: 'người nội trợ' },
      { id: 'u1-9', term: 'breadwinner', definition: 'trụ cột gia đình' },
      { id: 'u1-10', term: 'earn money', definition: 'kiếm tiền' },
      { id: 'u1-11', term: 'equally', definition: 'bằng nhau, ngang bằng' },
      { id: 'u1-12', term: 'shop for groceries/ do the shopping', definition: 'đi chợ' },
      { id: 'u1-13', term: 'clean the house', definition: 'dọn dẹp nhà cửa' },
      { id: 'u1-14', term: 'do the heavy lifting', definition: 'làm việc nặng' },
      { id: 'u1-15', term: 'do the laudry', definition: 'giặt quần áo' },
      { id: 'u1-16', term: 'do the washing-up', definition: 'rửa bát' },
      { id: 'u1-17', term: 'put out the rubbish', definition: 'đổ rác' },
      { id: 'u1-18', term: 'that sounds fair', definition: 'Nghe có vẻ công bằng' },
      { id: 'u1-19', term: 'manage', definition: 'quản lý' },
      { id: 'u1-20', term: 'raise children', definition: 'nuôi con' },
      { id: 'u1-21', term: 'pick up', definition: 'nhặt lên' },
      { id: 'u1-22', term: 'carry', definition: 'mang, vác' },
      { id: 'u1-23', term: 'look after', definition: 'trông nom, chăm sóc' },
      { id: 'u1-24', term: 'except', definition: 'ngoại trừ' },
      { id: 'u1-25', term: 'lay the table', definition: 'chuẩn bị bàn ăn' },
      { id: 'u1-26', term: 'responsibility, duty', definition: 'trách nhiệm' },
      { id: 'u1-27', term: 'strengthen', definition: 'củng cố, tăng cường' },
      { id: 'u1-28', term: 'Bonds, close connection', definition: 'mối quan hệ' },
      { id: 'u1-29', term: 'gratitude', definition: 'lòng biết ơn' },
      { id: 'u1-30', term: 'be grateful', definition: 'biết ơn' },
      { id: 'u1-31', term: 'character', definition: 'tính cách' },
      { id: 'u1-32', term: 'appreciate', definition: 'đánh giá cao' },
      { id: 'u1-33', term: 'take care of', definition: 'quan tâm, chăm sóc' },
      { id: 'u1-34', term: 'build someone\'s character', definition: 'xây dựng tính cách' },
      { id: 'u1-35', term: 'encourage', definition: 'khuyến khích' },
      { id: 'u1-36', term: 'take responsibility', definition: 'chịu trách nhiệm' },
      { id: 'u1-37', term: 'damage', definition: 'hư hại, đổ vỡ' },
      { id: 'u1-38', term: 'necessary', definition: 'cần thiết' },
      { id: 'u1-39', term: 'grow up', definition: 'lớn lên' },
      { id: 'u1-40', term: 'useful', definition: 'hữu ích' },
      { id: 'u1-41', term: 'family routines', definition: 'thói quen sinh hoạt gia đình' },
      { id: 'u1-42', term: 'cheer someone up', definition: 'làm ai đó vui lên' },
      { id: 'u1-43', term: 'trust', definition: 'sự tin tưởng' },
      { id: 'u1-44', term: 'achieve success', definition: 'đạt được thành công' },
      { id: 'u1-45', term: 'celebrate a birthday', definition: 'tổ chức sinh nhật' },
      { id: 'u1-46', term: 'share daily experiences', definition: 'chia sẻ về các việc xảy ra trong ngày' },
      { id: 'u1-47', term: 'latest news', definition: 'tin tức mới nhất' },
      { id: 'u1-48', term: 'choice', definition: 'sự lựa chọn' },
      { id: 'u1-49', term: 'proud', definition: 'tự hào' },
      { id: 'u1-50', term: 'according to', definition: 'dựa vào' },
      { id: 'u1-51', term: 'spotlessly clean', definition: 'sạch không tì vết' },
      { id: 'u1-52', term: 'to exchange opinions', definition: 'chia sẻ quan điểm' },
      { id: 'u1-53', term: 'strongly believe', definition: 'tin tưởng chắc chắn rằng' },
      { id: 'u1-54', term: 'have no doubt that', definition: 'không nghi ngờ gì về' },
      { id: 'u1-55', term: 'I\'m sure that', definition: 'Tôi chắc chắn rằng' },
      { id: 'u1-56', term: 'get into university', definition: 'đỗ đại học' },
      { id: 'u1-57', term: 'instead of', definition: 'thay vì' },
      { id: 'u1-58', term: 'In my opinion, To my mind, I suppose that', definition: 'theo quan điểm của tôi' },
      { id: 'u1-59', term: 'family values', definition: 'các giá trị truyền thống gia đình' },
      { id: 'u1-60', term: 'result', definition: 'kết quả' },
      { id: 'u1-61', term: 'recent survey', definition: 'khảo sát gần đây' },
      { id: 'u1-62', term: 'traditional', definition: 'theo truyền thống' },
      { id: 'u1-63', term: 'truthful, honest', definition: 'trung thực' },
      { id: 'u1-64', term: 'respect, show respect', definition: 'tôn trọng' },
      { id: 'u1-65', term: 'tell the truth', definition: 'nói sự thật' },
      { id: 'u1-66', term: 'from an early age', definition: 'từ khi còn nhỏ' },
      { id: 'u1-67', term: 'have a wealth of experience', definition: 'có nhiều kinh nghiệm' },
      { id: 'u1-68', term: 'table. manners', definition: 'phép tắc ăn uống' },
      { id: 'u1-69', term: 'respectively', definition: 'lần lượt' },
      { id: 'u1-70', term: 'crash', definition: 'tai nạn, va chạm' },
      { id: 'u1-71', term: 'crab', definition: 'con cua' },
      { id: 'u1-72', term: 'washing machine', definition: 'máy giặt' },
      { id: 'u1-73', term: 'be away on business', definition: 'đi công tác xa' },
      { id: 'u1-74', term: 'untidy', definition: 'bừa bộn' }
    ]
  },
  {
    id: 'unit-2-global-success-10',
    title: 'Unit 2: Humans and the Environment',
    subtitle: 'Tiếng Anh 10 - Global Success',
    description: 'Từ vựng trọng điểm về môi trường, lối sống xanh và phát triển bền vững.',
    category: 'school',
    gradeLevel: 'grade-10',
    grade: 'Lớp 10',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 10', 'Global Success', 'Unit 2', 'Environment'],
    isOfficial: true,
    terms: [
      { id: 'u2-1', term: 'carbon footprint', definition: 'vết carbon, lượng phát thải khí nhà kính' },
      { id: 'u2-2', term: 'eco-friendly', definition: 'thân thiện với môi trường' },
      { id: 'u2-3', term: 'sustainable lifestyle', definition: 'lối sống bền vững' },
      { id: 'u2-4', term: 'green living', definition: 'lối sống xanh' },
      { id: 'u2-5', term: 'energy consumption', definition: 'mức tiêu thụ năng lượng' },
      { id: 'u2-6', term: 'renewable energy', definition: 'năng lượng tái tạo' },
      { id: 'u2-7', term: 'organic food', definition: 'thực phẩm hữu cơ' },
      { id: 'u2-8', term: 'reduce, reuse, recycle', definition: 'giảm thiểu, tái sử dụng, tái chế' },
      { id: 'u2-9', term: 'solar panel', definition: 'tấm pin năng lượng mặt trời' },
      { id: 'u2-10', term: 'global warming', definition: 'sự nóng lên toàn cầu' },
      { id: 'u2-11', term: 'greenhouse gas emissions', definition: 'khí thải nhà kính' },
      { id: 'u2-12', term: 'conserve electricity', definition: 'tiết kiệm điện năng' },
      { id: 'u2-13', term: 'pollute the water', definition: 'làm ô nhiễm nguồn nước' },
      { id: 'u2-14', term: 'single-use plastic', definition: 'nhựa dùng một lần' },
      { id: 'u2-15', term: 'protect nature', definition: 'bảo vệ tự nhiên' }
    ]
  },
  {
    id: 'unit-1-global-success-6',
    title: 'Unit 1: My New School',
    subtitle: 'Tiếng Anh 6 - Global Success',
    description: 'Từ vựng khởi đầu về trường lớp, dụng cụ học tập và bạn bè.',
    category: 'school',
    gradeLevel: 'grade-6',
    grade: 'Lớp 6',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 6', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g6-1', term: 'school bag', definition: 'cặp sách, balo đi học' },
      { id: 'g6-2', term: 'calculator', definition: 'máy tính cầm tay' },
      { id: 'g6-3', term: 'compass', definition: 'com-pa' },
      { id: 'g6-4', term: 'school uniform', definition: 'đồng phục học sinh' },
      { id: 'g6-5', term: 'classmate', definition: 'bạn cùng lớp' },
      { id: 'g6-6', term: 'boarding school', definition: 'trường nội trú' },
      { id: 'g6-7', term: 'playground', definition: 'sân chơi' },
      { id: 'g6-8', term: 'do homework', definition: 'làm bài tập về nhà' },
      { id: 'g6-9', term: 'international school', definition: 'trường quốc tế' },
      { id: 'g6-10', term: 'pencil sharpener', definition: 'gọt bút chì' }
    ]
  },
  {
    id: 'unit-1-global-success-7',
    title: 'Unit 1: Hobbies',
    subtitle: 'Tiếng Anh 7 - Global Success',
    description: 'Từ vựng các sở thích, hoạt động thư giãn sáng tạo.',
    category: 'school',
    gradeLevel: 'grade-7',
    grade: 'Lớp 7',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 7', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g7-1', term: 'make pottery', definition: 'làm đồ gốm' },
      { id: 'g7-2', term: 'collect coins', definition: 'sưu tầm đồng xu' },
      { id: 'g7-3', term: 'dollhouse', definition: 'nhà búp bê' },
      { id: 'g7-4', term: 'horse riding', definition: 'cưỡi ngựa' },
      { id: 'g7-5', term: 'gardening', definition: 'làm vườn' },
      { id: 'g7-6', term: 'patience', definition: 'sự kiên nhẫn' },
      { id: 'g7-7', term: 'build models', definition: 'lắp ráp mô hình' },
      { id: 'g7-8', term: 'valuable', definition: 'có giá trị' },
      { id: 'g7-9', term: 'creative', definition: 'sáng tạo' },
      { id: 'g7-10', term: 'take photos', definition: 'chụp ảnh' }
    ]
  },
  {
    id: 'unit-1-global-success-8',
    title: 'Unit 1: Leisure Time',
    subtitle: 'Tiếng Anh 8 - Global Success',
    description: 'Từ vựng thời gian rảnh rỗi, các hoạt động DIY và giải trí hiện đại.',
    category: 'school',
    gradeLevel: 'grade-8',
    grade: 'Lớp 8',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 8', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g8-1', term: 'leisure activity', definition: 'hoạt động giải trí' },
      { id: 'g8-2', term: 'origami', definition: 'nghệ thuật gấp giấy Nhật Bản' },
      { id: 'g8-3', term: 'hanging out with friends', definition: 'đi chơi với bạn bè' },
      { id: 'g8-4', term: 'doing DIY', definition: 'tự làm đồ thủ công (Do It Yourself)' },
      { id: 'g8-5', term: 'surfing the internet', definition: 'lướt mạng Internet' },
      { id: 'g8-6', term: 'relaxing', definition: 'thư giãn' },
      { id: 'g8-7', term: 'be hooked on', definition: 'đam mê, say mê điều gì' },
      { id: 'g8-8', term: 'knit a scarf', definition: 'đan khăn quàng' },
      { id: 'g8-9', term: 'improve physical health', definition: 'cải thiện sức khỏe thể chất' },
      { id: 'g8-10', term: 'play board games', definition: 'chơi cờ, trò chơi bàn cờ' }
    ]
  },
  {
    id: 'unit-1-global-success-9',
    title: 'Unit 1: Local Community',
    subtitle: 'Tiếng Anh 9 - Global Success',
    description: 'Từ vựng về cộng đồng địa phương, làng nghề truyền thống và đời sống xã hội.',
    category: 'school',
    gradeLevel: 'grade-9',
    grade: 'Lớp 9',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 9', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g9-1', term: 'craft village', definition: 'làng nghề thủ công' },
      { id: 'g9-2', term: 'artisan', definition: 'thợ thủ công, nghệ nhân' },
      { id: 'g9-3', term: 'conical hat', definition: 'nón lá' },
      { id: 'g9-4', term: 'pottery workshop', definition: 'xưởng làm gốm' },
      { id: 'g9-5', term: 'preserve cultural heritage', definition: 'bảo tồn di sản văn hóa' },
      { id: 'g9-6', term: 'authentic product', definition: 'sản phẩm chính gốc, xác thực' },
      { id: 'g9-7', term: 'suburb', definition: 'vùng ngoại ô' },
      { id: 'g9-8', term: 'pass down through generations', definition: 'truyền qua nhiều thế hệ' },
      { id: 'g9-9', term: 'attract tourists', definition: 'thu hút khách du lịch' },
      { id: 'g9-10', term: 'community center', definition: 'trung tâm cộng đồng' }
    ]
  },
  {
    id: 'unit-1-global-success-11',
    title: 'Unit 1: A Long and Healthy Life',
    subtitle: 'Tiếng Anh 11 - Global Success',
    description: 'Từ vựng học thuật về sức khỏe, tuổi thọ, hệ miễn dịch và dinh dưỡng.',
    category: 'school',
    gradeLevel: 'grade-11',
    grade: 'Lớp 11',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 11', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g11-1', term: 'life expectancy', definition: 'tuổi thọ trung bình' },
      { id: 'g11-2', term: 'immune system', definition: 'hệ thống miễn dịch' },
      { id: 'g11-3', term: 'balanced diet', definition: 'chế độ ăn uống cân bằng' },
      { id: 'g11-4', term: 'antibiotics', definition: 'thuốc kháng sinh' },
      { id: 'g11-5', term: 'infectious disease', definition: 'bệnh truyền nhiễm' },
      { id: 'g11-6', term: 'longevity', definition: 'sự trường thọ, sống lâu' },
      { id: 'g11-7', term: 'nutritious food', definition: 'thực phẩm giàu dinh dưỡng' },
      { id: 'g11-8', term: 'physical fitness', definition: 'thể lực, sự cân đối thể chất' },
      { id: 'g11-9', term: 'relieve stress', definition: 'giảm bớt căng thẳng' },
      { id: 'g11-10', term: 'regular exercise', definition: 'tập thể dục đều đặn' }
    ]
  },
  {
    id: 'unit-1-global-success-12',
    title: 'Unit 1: Life Stories We Admire',
    subtitle: 'Tiếng Anh 12 - Global Success',
    description: 'Từ vựng nâng cao về tiểu sử danh nhân, nghị lực sống và di sản để lại.',
    category: 'school',
    gradeLevel: 'grade-12',
    grade: 'Lớp 12',
    book: 'Global Success',
    author: 'Dream Education Team',
    tags: ['Lớp 12', 'Global Success', 'Unit 1'],
    isOfficial: true,
    terms: [
      { id: 'g12-1', term: 'biography', definition: 'tiểu sử, lý lịch' },
      { id: 'g12-2', term: 'perseverance', definition: 'sự kiên trì, bền bỉ' },
      { id: 'g12-3', term: 'dedication', definition: 'sự cống hiến, tận tụy' },
      { id: 'g12-4', term: 'inspirational figure', definition: 'nhân vật truyền cảm hứng' },
      { id: 'g12-5', term: 'leave a lasting legacy', definition: 'để lại di sản lâu dài' },
      { id: 'g12-6', term: 'overcome hardship', definition: 'vượt qua khó khăn thử thách' },
      { id: 'g12-7', term: 'visionary leader', definition: 'nhà lãnh đạo có tầm nhìn xa' },
      { id: 'g12-8', term: 'historical milestone', definition: 'cột mốc lịch sử' },
      { id: 'g12-9', term: 'pioneer in the field', definition: 'người tiên phong trong lĩnh vực' },
      { id: 'g12-10', term: 'noble purpose', definition: 'mục đích cao quý' }
    ]
  },

  // ==========================================
  // LỘ TRÌNH IELTS - DREAM EDUCATION
  // ==========================================
  {
    id: 'ielts-beginner-core',
    title: 'IELTS Beginner (3.0 - 4.0): Core Vocabulary',
    subtitle: 'Lộ trình IELTS Dream Education • Band 3.0 - 4.0',
    description: 'Xây dựng nền tảng từ vựng cơ bản theo chuẩn Dream Education cho người mới bắt đầu.',
    category: 'ielts',
    ieltsLevel: 'ielts-beginner',
    grade: 'IELTS Beginner',
    book: 'Dream IELTS 3.0-4.0',
    author: 'Dream Education Team',
    tags: ['IELTS', 'IELTS Beginner', 'Band 3.0 - 4.0'],
    isOfficial: true,
    terms: [
      { id: 'ib-1', term: 'daily routine', definition: 'lịch trình sinh hoạt hàng ngày' },
      { id: 'ib-2', term: 'accommodation', definition: 'chỗ ở, nơi lưu trú' },
      { id: 'ib-3', term: 'hometown', definition: 'quê hương, nơi sinh sống' },
      { id: 'ib-4', term: 'occupation', definition: 'nghề nghiệp, công việc' },
      { id: 'ib-5', term: 'leisure pursuits', definition: 'các thú vui giải trí' },
      { id: 'ib-6', term: 'public transport', definition: 'phương tiện giao thông công cộng' },
      { id: 'ib-7', term: 'neighborhood', definition: 'khu phố, vùng lân cận' },
      { id: 'ib-8', term: 'commute to work', definition: 'đi lại hàng ngày đi làm' },
      { id: 'ib-9', term: 'favorite dish', definition: 'món ăn yêu thích' },
      { id: 'ib-10', term: 'personal preference', definition: 'sở thích cá nhân' },
      { id: 'ib-11', term: 'spending habit', definition: 'thói quen chi tiêu' },
      { id: 'ib-12', term: 'weekend getaway', definition: 'chuyến nghỉ ngắn cuối tuần' }
    ]
  },
  {
    id: 'ielts-beginner-reading-1',
    title: 'IELTS Beginner: Reading 1',
    subtitle: 'IELTS Beginner (3.0 - 4.0) • Reading 1',
    description: 'Từ vựng các chủ đề đời sống, trường học và thói quen sinh hoạt cơ bản cho người mới bắt đầu.',
    category: 'ielts',
    ieltsLevel: 'ielts-beginner',
    skill: 'reading',
    grade: 'IELTS Beginner',
    book: 'Beginner Reading',
    lesson: 'Reading 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Beginner', 'Reading 1'],
    isOfficial: true,
    terms: [
      { id: 'ibr1-1', term: 'daily schedule', definition: 'lịch trình hoạt động trong ngày' },
      { id: 'ibr1-2', term: 'leisure time', definition: 'thời gian thư giãn, rảnh rỗi' },
      { id: 'ibr1-3', term: 'commute', definition: 'quãng đường đi lại hàng ngày' },
      { id: 'ibr1-4', term: 'hobby', definition: 'sở thích cá nhân' },
      { id: 'ibr1-5', term: 'neighborhood', definition: 'khu vực hàng xóm, lân cận' },
      { id: 'ibr1-6', term: 'convenient', definition: 'tiện lợi, thuận lợi' },
      { id: 'ibr1-7', term: 'public transport', definition: 'giao thông công cộng' },
      { id: 'ibr1-8', term: 'groceries', definition: 'thực phẩm và đồ dùng gia đình' },
      { id: 'ibr1-9', term: 'healthy diet', definition: 'chế độ ăn uống lành mạnh' },
      { id: 'ibr1-10', term: 'relaxing atmosphere', definition: 'không khí thư thái, dễ chịu' }
    ]
  },
  {
    id: 'pre-ielts-reading-1',
    title: 'Pre-IELTS: Reading 1',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Reading 1',
    description: 'Trọn bộ 30 từ vựng trọng tâm bài đọc Reading 1 cấp độ Pre-IELTS về quan hệ gia đình (Family Ties), đại gia đình và các khía cạnh tâm lý xã hội.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'reading',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Reading',
    lesson: 'Reading 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Reading 1', 'Family'],
    isOfficial: true,
    terms: [
      { id: 'pir1-1', term: 'Cousin', definition: 'anh/chị/em họ' },
      { id: 'pir1-2', term: 'Father-in-law', definition: 'bố chồng/bố vợ' },
      { id: 'pir1-3', term: 'Grandfather', definition: 'ông nội/ông ngoại' },
      { id: 'pir1-4', term: 'Uncle', definition: 'chú/bác/cậu/dượng' },
      { id: 'pir1-5', term: 'Aunt', definition: 'cô/dì/bác gái/thím/mợ' },
      { id: 'pir1-6', term: 'Nephew', definition: 'cháu trai (của cô/dì/chú/bác)' },
      { id: 'pir1-7', term: 'Niece', definition: 'cháu gái (của cô/dì/chú/bác)' },
      { id: 'pir1-8', term: 'Great-aunt', definition: 'bà thím/bà trẻ (chị/em gái của ông/bà)' },
      { id: 'pir1-9', term: 'Grandmother', definition: 'bà nội/bà ngoại' },
      { id: 'pir1-10', term: 'Value', definition: 'coi trọng, định giá' },
      { id: 'pir1-11', term: 'Influence', definition: 'ảnh hưởng, tác động' },
      { id: 'pir1-12', term: 'Stressed', definition: 'căng thẳng, bị áp lực' },
      { id: 'pir1-13', term: 'Handle', definition: 'xử lý, giải quyết' },
      { id: 'pir1-14', term: 'Selfish', definition: 'ích kỷ' },
      { id: 'pir1-15', term: 'Gain', definition: 'đạt được, thu được' },
      { id: 'pir1-16', term: 'Proverb', definition: 'tục ngữ' },
      { id: 'pir1-17', term: 'Appreciate', definition: 'trân trọng, đánh giá cao' },
      { id: 'pir1-18', term: 'Extended family', definition: 'gia đình nhiều thế hệ' },
      { id: 'pir1-19', term: 'Disadvantage', definition: 'sự bất lợi, nhược điểm' },
      { id: 'pir1-20', term: 'Retired', definition: 'đã nghỉ hưu' },
      { id: 'pir1-21', term: 'Patient', definition: 'kiên nhẫn' },
      { id: 'pir1-22', term: 'Caring', definition: 'chu đáo, biết quan tâm' },
      { id: 'pir1-23', term: 'Avoid', definition: 'tránh, né tránh' },
      { id: 'pir1-24', term: 'Maintain', definition: 'duy trì' },
      { id: 'pir1-25', term: 'Explosion', definition: 'sự bùng nổ' },
      { id: 'pir1-26', term: 'Geographically', definition: 'về mặt địa lý' },
      { id: 'pir1-27', term: 'Security', definition: 'sự an toàn, an ninh' },
      { id: 'pir1-28', term: 'Convenience', definition: 'sự thuận tiện, tiện lợi' },
      { id: 'pir1-29', term: 'Mental', definition: 'thuộc về tinh thần, tâm lý' },
      { id: 'pir1-30', term: 'Physical', definition: 'thuộc về thể chất' }
    ]
  },
  {
    id: 'pre-ielts-reading-2',
    title: 'Pre-IELTS: Reading 2 (The Body & Mind)',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Reading 2',
    description: 'Trọn bộ 20 từ vựng cốt lõi bài đọc Reading 2: The Body (cơ thể học, sức khỏe thể chất, tâm lý và các yếu tố xã hội).',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'reading',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Reading',
    lesson: 'Reading 2',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Reading 2', 'The Body', 'Health'],
    isOfficial: true,
    terms: [
      { id: 'pir2-1', term: 'Illness', definition: 'căn bệnh, sự ốm đau' },
      { id: 'pir2-2', term: 'Genetic', definition: 'thuộc về di truyền' },
      { id: 'pir2-3', term: 'Physical ability', definition: 'khả năng thể chất' },
      { id: 'pir2-4', term: 'Social factor', definition: 'yếu tố xã hội' },
      { id: 'pir2-5', term: 'Repetitive', definition: 'lặp đi lặp lại' },
      { id: 'pir2-6', term: 'Inactive', definition: 'thụ động, ít vận động' },
      { id: 'pir2-7', term: 'Wellbeing', definition: 'tình trạng hạnh phúc, khỏe khoắn' },
      { id: 'pir2-8', term: 'Mental health', definition: 'sức khỏe tâm thần, tinh thần' },
      { id: 'pir2-9', term: 'Depression', definition: 'chứng trầm cảm, bệnh trầm cảm' },
      { id: 'pir2-10', term: 'Cultural context', definition: 'bối cảnh văn hóa' },
      { id: 'pir2-11', term: 'Historical context', definition: 'bối cảnh lịch sử' },
      { id: 'pir2-12', term: 'Valuation', definition: 'sự đánh giá, định giá' },
      { id: 'pir2-13', term: 'Slimness', definition: 'vóc dáng thon thả, mảnh mai' },
      { id: 'pir2-14', term: 'Full figure', definition: 'thân hình đẫy đà, tròn trịa' },
      { id: 'pir2-15', term: 'Noticeable belly', definition: 'chiếc bụng nhô ra rõ rệt' },
      { id: 'pir2-16', term: 'Undervalued', definition: 'bị xem nhẹ, đánh giá thấp' },
      { id: 'pir2-17', term: 'Fitness regime', definition: 'chế độ rèn luyện thể lực' },
      { id: 'pir2-18', term: 'Sociologist', definition: 'nhà xã hội học' },
      { id: 'pir2-19', term: 'Obese', definition: 'béo phì' },
      { id: 'pir2-20', term: 'Processed food', definition: 'thực phẩm chế biến sẵn' }
    ]
  },
  {
    id: 'pre-ielts-reading-3',
    title: 'Pre-IELTS: Reading 3',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Reading 3',
    description: 'Từ vựng chủ đề Môi trường tự nhiên, đa dạng sinh học và các loài có nguy cơ tuyệt chủng trong bài đọc Reading 3.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'reading',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Reading',
    lesson: 'Reading 3',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Reading 3', 'Environment'],
    isOfficial: true,
    terms: [
      { id: 'pir3-1', term: 'biodiversity', definition: 'sự đa dạng sinh học' },
      { id: 'pir3-2', term: 'ecosystem', definition: 'hệ sinh thái' },
      { id: 'pir3-3', term: 'endangered species', definition: 'các loài có nguy cơ tuyệt chủng' },
      { id: 'pir3-4', term: 'natural habitat', definition: 'môi trường sống tự nhiên' },
      { id: 'pir3-5', term: 'deforestation', definition: 'nạn phá rừng, sự tàn phá rừng' },
      { id: 'pir3-6', term: 'conservation', definition: 'sự bảo tồn, gìn giữ thiên nhiên' },
      { id: 'pir3-7', term: 'climate change', definition: 'biến đổi khí hậu toàn cầu' },
      { id: 'pir3-8', term: 'survive', definition: 'sinh tồn, sống sót qua nghịch cảnh' },
      { id: 'pir3-9', term: 'threaten', definition: 'đe dọa, gây nguy hiểm' },
      { id: 'pir3-10', term: 'ecological balance', definition: 'sự cân bằng sinh thái' },
      { id: 'pir3-11', term: 'flora and fauna', definition: 'hệ thực vật và động vật' },
      { id: 'pir3-12', term: 'renewable resources', definition: 'nguồn tài nguyên có thể tái tạo' },
      { id: 'pir3-13', term: 'wildlife sanctuary', definition: 'khu bảo tồn động vật hoang dã' },
      { id: 'pir3-14', term: 'predator', definition: 'động vật săn mồi' },
      { id: 'pir3-15', term: 'extinction', definition: 'sự tuyệt chủng hoàn toàn' }
    ]
  },
  {
    id: 'pre-ielts-listening-1',
    title: 'Pre-IELTS: Listening 1',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Listening 1',
    description: 'Từ vựng bắt thông tin cá nhân, đặt phòng và ghi chép số liệu Part 1 Listening.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'listening',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Listening',
    lesson: 'Listening 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Listening 1'],
    isOfficial: true,
    terms: [
      { id: 'pil1-1', term: 'registration form', definition: 'mẫu đơn đăng ký' },
      { id: 'pil1-2', term: 'spelling', definition: 'cách đánh vần tên riêng' },
      { id: 'pil1-3', term: 'contact details', definition: 'thông tin liên lạc' },
      { id: 'pil1-4', term: 'postal code', definition: 'mã bưu điện' },
      { id: 'pil1-5', term: 'emergency contact', definition: 'thông tin liên hệ khẩn cấp' },
      { id: 'pil1-6', term: 'room reservation', definition: 'sự đặt phòng trước' },
      { id: 'pil1-7', term: 'double room', definition: 'phòng ngủ dành cho hai người' },
      { id: 'pil1-8', term: 'deposit', definition: 'tiền đặt cọc' },
      { id: 'pil1-9', term: 'reference number', definition: 'mã số tham chiếu đơn hàng' },
      { id: 'pil1-10', term: 'confirmation email', definition: 'thư điện tử xác nhận' },
      { id: 'pil1-11', term: 'nationality', definition: 'quốc tịch' },
      { id: 'pil1-12', term: 'passport number', definition: 'số hộ chiếu' }
    ]
  },
  {
    id: 'pre-ielts-listening-2',
    title: 'Pre-IELTS: Listening 2',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Listening 2',
    description: 'Từ vựng khuôn viên trường, cơ sở vật chất và chỉ dẫn bản đồ Map Labelling Part 2.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'listening',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Listening',
    lesson: 'Listening 2',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Listening 2'],
    isOfficial: true,
    terms: [
      { id: 'pil2-1', term: 'university campus', definition: 'khuôn viên trường đại học' },
      { id: 'pil2-2', term: 'canteen', definition: 'nhà ăn, căng tin sinh viên' },
      { id: 'pil2-3', term: 'lecture hall', definition: 'giảng đường lớn' },
      { id: 'pil2-4', term: 'laboratory', definition: 'phòng thí nghiệm' },
      { id: 'pil2-5', term: 'sports complex', definition: 'khu liên hợp thể thao' },
      { id: 'pil2-6', term: 'student union', definition: 'hội sinh viên trường' },
      { id: 'pil2-7', term: 'dormitory', definition: 'ký túc xá sinh viên' },
      { id: 'pil2-8', term: 'library card', definition: 'thẻ thư viện' },
      { id: 'pil2-9', term: 'book loan', definition: 'thời hạn mượn sách' },
      { id: 'pil2-10', term: 'opening hours', definition: 'giờ mở cửa phục vụ' }
    ]
  },
  {
    id: 'pre-ielts-writing-1',
    title: 'Pre-IELTS: Writing 1',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Writing 1',
    description: 'Từ vựng mô tả biểu đồ Task 1, xu hướng tăng giảm và từ nối số liệu quan trọng.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'writing',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Writing',
    lesson: 'Writing 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Writing 1'],
    isOfficial: true,
    terms: [
      { id: 'piw1-1', term: 'increase significantly', definition: 'tăng lên một cách đáng kể' },
      { id: 'piw1-2', term: 'decrease slightly', definition: 'giảm nhẹ' },
      { id: 'piw1-3', term: 'remain stable', definition: 'duy trì ổn định, không đổi' },
      { id: 'piw1-4', term: 'fluctuate wildly', definition: 'dao động mạnh mẽ' },
      { id: 'piw1-5', term: 'reach a peak of', definition: 'đạt đỉnh điểm ở mức' },
      { id: 'piw1-6', term: 'hit a trough', definition: 'chạm đáy ở mức thấp nhất' },
      { id: 'piw1-7', term: 'upward trend', definition: 'xu hướng đi lên' },
      { id: 'piw1-8', term: 'downward trend', definition: 'xu hướng đi xuống' },
      { id: 'piw1-9', term: 'dramatic rise', definition: 'sự tăng trưởng đột biến' },
      { id: 'piw1-10', term: 'proportion of', definition: 'tỷ lệ phần trăm của' }
    ]
  },
  {
    id: 'pre-ielts-core',
    title: 'Pre-IELTS (4.0 - 5.0): Academic Foundations',
    subtitle: 'Lộ trình IELTS Dream Education • Band 4.0 - 5.0',
    description: 'Từ vựng học thuật cơ bản và các chủ đề xã hội phổ biến trong kỳ thi IELTS.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    grade: 'Pre IELTS',
    book: 'Dream IELTS 4.0-5.0',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Band 4.0 - 5.0'],
    isOfficial: true,
    terms: [
      { id: 'pi-1', term: 'academic performance', definition: 'thành tích học tập' },
      { id: 'pi-2', term: 'urbanization', definition: 'quá trình đô thị hóa' },
      { id: 'pi-3', term: 'school curriculum', definition: 'chương trình giảng dạy học đường' },
      { id: 'pi-4', term: 'environmental impact', definition: 'tác động môi trường' },
      { id: 'pi-5', term: 'infrastructure', definition: 'cơ sở hạ tầng' },
      { id: 'pi-6', term: 'tourist attraction', definition: 'điểm thu hút khách du lịch' },
      { id: 'pi-7', term: 'job satisfaction', definition: 'sự hài lòng trong công việc' },
      { id: 'pi-8', term: 'extracurricular activities', definition: 'hoạt động ngoại khóa' },
      { id: 'pi-9', term: 'higher education', definition: 'giáo dục bậc đại học' },
      { id: 'pi-10', term: 'cultural diversity', definition: 'sự đa dạng văn hóa' },
      { id: 'pi-11', term: 'traffic congestion', definition: 'tình trạng tắc nghẽn giao thông' },
      { id: 'pi-12', term: 'technological device', definition: 'thiết bị công nghệ' }
    ]
  },
  {
    id: 'ielts-foundation-core',
    title: 'IELTS Foundation (5.0 - 6.0): Core Collocations',
    subtitle: 'Lộ trình IELTS Dream Education • Band 5.0 - 6.0',
    description: 'Tập hợp collocations và cụm từ theo chủ đề thường gặp trong Writing & Speaking.',
    category: 'ielts',
    ieltsLevel: 'ielts-foundation',
    grade: 'IELTS Foundation',
    book: 'Dream IELTS 5.0-6.0',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Foundation', 'Band 5.0 - 6.0'],
    isOfficial: true,
    terms: [
      { id: 'if-1', term: 'technological advancement', definition: 'sự tiến bộ vượt bậc về công nghệ' },
      { id: 'if-2', term: 'sustainable economic growth', definition: 'tăng trưởng kinh tế bền vững' },
      { id: 'if-3', term: 'sedentary lifestyle', definition: 'lối sống thụ động, ít vận động' },
      { id: 'if-4', term: 'natural habitat destruction', definition: 'sự phá hủy môi trường sống tự nhiên' },
      { id: 'if-5', term: 'career prospects', definition: 'triển vọng nghề nghiệp tương lai' },
      { id: 'if-6', term: 'preserve cultural identity', definition: 'gìn giữ bản sắc văn hóa' },
      { id: 'if-7', term: 'renewable energy sources', definition: 'nguồn năng lượng tái tạo' },
      { id: 'if-8', term: 'gain competitive edge', definition: 'đạt được lợi thế cạnh tranh' },
      { id: 'if-9', term: 'foster creativity', definition: 'nuôi dưỡng và phát triển sự sáng tạo' },
      { id: 'if-10', term: 'pose a serious threat to', definition: 'gây ra mối đe dọa nghiêm trọng cho' },
      { id: 'if-11', term: 'broaden horizons', definition: 'mở rộng tầm nhìn và hiểu biết' },
      { id: 'if-12', term: 'bridge the gap between', definition: 'thu hẹp khoảng cách giữa' }
    ]
  },
  {
    id: 'ielts-foundation-reading-1',
    title: 'IELTS Foundation: Reading 1',
    subtitle: 'IELTS Foundation (5.0 - 6.0) • Reading 1',
    description: 'Từ vựng chủ đề Công nghệ và Tác động đến đời sống xã hội trong bài đọc Reading 1.',
    category: 'ielts',
    ieltsLevel: 'ielts-foundation',
    skill: 'reading',
    grade: 'IELTS Foundation',
    book: 'Foundation Reading',
    lesson: 'Reading 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Foundation', 'Reading 1', 'Technology'],
    isOfficial: true,
    terms: [
      { id: 'ifr1-1', term: 'artificial intelligence', definition: 'trí tuệ nhân tạo' },
      { id: 'ifr1-2', term: 'breakthrough', definition: 'bước đột phá quan trọng' },
      { id: 'ifr1-3', term: 'digital transformation', definition: 'chuyển đổi số toàn diện' },
      { id: 'ifr1-4', term: 'automation', definition: 'sự tự động hóa quy trình' },
      { id: 'ifr1-5', term: 'interconnected', definition: 'kết nối chặt chẽ lẫn nhau' },
      { id: 'ifr1-6', term: 'privacy concern', definition: 'mối quan ngại về quyền riêng tư cá nhân' },
      { id: 'ifr1-7', term: 'cybersecurity', definition: 'an ninh không gian mạng' },
      { id: 'ifr1-8', term: 'technological innovation', definition: 'sự đổi mới công nghệ' },
      { id: 'ifr1-9', term: 'telecommunications', definition: 'ngành viễn thông viễn tưởng' },
      { id: 'ifr1-10', term: 'ubiquitous device', definition: 'thiết bị có mặt ở khắp mọi nơi' }
    ]
  },
  {
    id: 'intermediate-reading-6',
    title: 'IELTS Intermediate: Reading 6 (Communication & Youth Travel)',
    subtitle: 'IELTS Intermediate (5.0 - 6.5) • Reading 6',
    description: 'Trọn bộ 20 từ vựng học thuật quan trọng trong bài đọc Reading 6: Giao tiếp doanh nghiệp, Kỹ năng lãnh đạo và Du lịch giới trẻ.',
    category: 'ielts',
    ieltsLevel: 'ielts-foundation',
    skill: 'reading',
    grade: 'IELTS Intermediate',
    book: 'Intermediate Reading',
    lesson: 'Reading 6',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Intermediate', 'Reading 6', 'Communication', 'Youth Travel'],
    isOfficial: true,
    terms: [
      { id: 'ir6-1', term: 'non-verbal communication', definition: 'giao tiếp phi ngôn ngữ (cử chỉ, ánh mắt, biểu cảm)' },
      { id: 'ir6-2', term: 'decode', definition: 'giải mã thông điệp' },
      { id: 'ir6-3', term: 'predetermined format', definition: 'định dạng quy định sẵn, mẫu chuẩn' },
      { id: 'ir6-4', term: 'annual business report', definition: 'báo cáo kinh doanh thường niên' },
      { id: 'ir6-5', term: 'formal register', definition: 'phong cách ngôn ngữ trang trọng' },
      { id: 'ir6-6', term: 'articulate', definition: 'diễn đạt ý tưởng một cách lưu loát, rõ ràng' },
      { id: 'ir6-7', term: 'active listening', definition: 'lắng nghe tích cực' },
      { id: 'ir6-8', term: 'tight time controls', definition: 'sự kiểm soát chặt chẽ về thời gian' },
      { id: 'ir6-9', term: 'interpersonal skills', definition: 'kỹ năng giao tiếp và tương tác liên cá nhân' },
      { id: 'ir6-10', term: 'prevent conflict', definition: 'ngăn ngừa xung đột, bất đồng' },
      { id: 'ir6-11', term: 'at the forefront', definition: 'ở vị trí dẫn đầu, tiên phong' },
      { id: 'ir6-12', term: 'vital resource', definition: 'nguồn lực thiết yếu, sống còn' },
      { id: 'ir6-13', term: 'value web', definition: 'mạng lưới giá trị liên kết đa ngành' },
      { id: 'ir6-14', term: 'comparatively affluent', definition: 'tương đối giàu có, khá giả' },
      { id: 'ir6-15', term: 'cutting edge', definition: 'tiên tiến, hiện đại bậc nhất' },
      { id: 'ir6-16', term: 'cultural benefits', definition: 'những lợi ích về mặt văn hóa' },
      { id: 'ir6-17', term: 'self-development', definition: 'sự phát triển và hoàn thiện bản thân' },
      { id: 'ir6-18', term: 'far-reaching consequences', definition: 'những hệ quả sâu rộng và to lớn' },
      { id: 'ir6-19', term: 'added value', definition: 'giá trị gia tăng' },
      { id: 'ir6-20', term: 'pioneer', definition: 'người tiên phong mở lối' }
    ]
  },
  {
    id: 'ielts-advanced-core',
    title: 'IELTS Advanced (6.5+): High-Band Lexicon',
    subtitle: 'Lộ trình IELTS Dream Education • Band 6.5 - 7.5+',
    description: 'Từ vựng cao cấp, cấu trúc diễn đạt mang tính học thuật cao nhằm bứt phá điểm số.',
    category: 'ielts',
    ieltsLevel: 'ielts-advanced',
    grade: 'IELTS Advanced',
    book: 'Dream IELTS 6.5-7.5+',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Advanced', 'Band 6.5 - 7.5+'],
    isOfficial: true,
    terms: [
      { id: 'ia-1', term: 'ubiquitous presence', definition: 'sự hiện diện ở khắp mọi nơi' },
      { id: 'ia-2', term: 'unprecedented scale', definition: 'quy mô chưa từng có tiền lệ' },
      { id: 'ia-3', term: 'exacerbate the problem', definition: 'làm trầm trọng thêm vấn đề' },
      { id: 'ia-4', term: 'substantiate an argument', definition: 'chứng minh, củng cố luận điểm bằng bằng chứng' },
      { id: 'ia-5', term: 'of paramount importance', definition: 'có tầm quan trọng tối thượng, hàng đầu' },
      { id: 'ia-6', term: 'detrimental impact', definition: 'tác động gây hại, có hại' },
      { id: 'ia-7', term: 'paradigm shift', definition: 'sự chuyển dịch căn bản về tư duy/mô hình' },
      { id: 'ia-8', term: 'disseminate information', definition: 'phổ biến, truyền bá thông tin rộng rãi' },
      { id: 'ia-9', term: 'circumvent restrictions', definition: 'lách qua hoặc né tránh các hạn chế' },
      { id: 'ia-10', term: 'foster innovation', definition: 'thúc đẩy tinh thần đổi mới sáng tạo' },
      { id: 'ia-11', term: 'render something obsolete', definition: 'khiến cái gì trở nên lỗi thời' },
      { id: 'ia-12', term: 'profound implications', definition: 'những hệ lụy / tác động sâu sắc' }
    ]
  },
  {
    id: 'ielts-advanced-reading-1',
    title: 'IELTS Advanced: Reading 1',
    subtitle: 'IELTS Advanced (6.5+) • Reading 1',
    description: 'Từ vựng học thuật chuyên sâu về tâm lý nhận thức, nghiên cứu khoa học xã hội.',
    category: 'ielts',
    ieltsLevel: 'ielts-advanced',
    skill: 'reading',
    grade: 'IELTS Advanced',
    book: 'Advanced Reading',
    lesson: 'Reading 1',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Advanced', 'Reading 1'],
    isOfficial: true,
    terms: [
      { id: 'iar1-1', term: 'cognitive dissonance', definition: 'sự bất hòa nhận thức' },
      { id: 'iar1-2', term: 'empirical evidence', definition: 'bằng chứng thực nghiệm' },
      { id: 'iar1-3', term: 'paradigm shift', definition: 'sự thay đổi hệ hình tư duy' },
      { id: 'iar1-4', term: 'counterintuitive', definition: 'trái với trực giác thông thường' },
      { id: 'iar1-5', term: 'subconscious mechanism', definition: 'cơ chế hoạt động tiềm thức' },
      { id: 'iar1-6', term: 'discrepancy', definition: 'sự sai khác, không đồng nhất' },
      { id: 'iar1-7', term: 'hypothetical scenario', definition: 'kịch bản giả định' },
      { id: 'iar1-8', term: 'inherent bias', definition: 'thiên kiến vốn có' },
      { id: 'iar1-9', term: 'plausible hypothesis', definition: 'giả thuyết có vẻ hợp lý' },
      { id: 'iar1-10', term: 'unprecedented phenomenon', definition: 'hiện tượng chưa từng có tiền lệ' }
    ]
  },

  // ==========================================
  // KHUNG CHUẨN CHÂU ÂU CEFR (LEVEL A2 -> C1)
  // ==========================================
  {
    id: 'cefr-a2-essentials',
    title: 'CEFR A2: Pre-Intermediate Essentials',
    subtitle: 'Khung chuẩn Châu Âu • Trình độ A2',
    description: 'Từ vựng giao tiếp thường ngày về mua sắm, chỉ đường, du lịch và thông tin cá nhân.',
    category: 'cefr',
    cefrLevel: 'a2',
    grade: 'Level A2',
    book: 'CEFR A2',
    author: 'Dream Education Team',
    tags: ['CEFR', 'A2', 'Sơ cấp'],
    isOfficial: true,
    terms: [
      { id: 'a2-1', term: 'appointment', definition: 'cuộc hẹn' },
      { id: 'a2-2', term: 'convenient', definition: 'thuận tiện, tiện lợi' },
      { id: 'a2-3', term: 'destination', definition: 'điểm đến' },
      { id: 'a2-4', term: 'discount', definition: 'sự giảm giá' },
      { id: 'a2-5', term: 'invitation', definition: 'lời mời' },
      { id: 'a2-6', term: 'luggage', definition: 'hành lý' },
      { id: 'a2-7', term: 'passenger', definition: 'hành khách' },
      { id: 'a2-8', term: 'recipe', definition: 'công thức nấu ăn' },
      { id: 'a2-9', term: 'reliable', definition: 'đáng tin cậy' },
      { id: 'a2-10', term: 'delicious', definition: 'ngon miệng' },
      { id: 'a2-11', term: 'direction', definition: 'phương hướng, chỉ đường' },
      { id: 'a2-12', term: 'weather forecast', definition: 'dự báo thời tiết' }
    ]
  },
  {
    id: 'cefr-b1-intermediate',
    title: 'CEFR B1: Intermediate Vocabulary',
    subtitle: 'Khung chuẩn Châu Âu • Trình độ B1',
    description: 'Từ vựng trung cấp phục vụ công việc, học tập, trải nghiệm và bày tỏ quan điểm.',
    category: 'cefr',
    cefrLevel: 'b1',
    grade: 'Level B1',
    book: 'CEFR B1',
    author: 'Dream Education Team',
    tags: ['CEFR', 'B1', 'Trung cấp'],
    isOfficial: true,
    terms: [
      { id: 'b1-1', term: 'ambitious', definition: 'tham vọng, có nhiều hoài bão' },
      { id: 'b1-2', term: 'consequence', definition: 'hậu quả, kết quả' },
      { id: 'b1-3', term: 'contribute to', definition: 'đóng góp vào' },
      { id: 'b1-4', term: 'deliberate', definition: 'có chủ ý, thận trọng' },
      { id: 'b1-5', term: 'flexible schedule', definition: 'lịch trình linh hoạt' },
      { id: 'b1-6', term: 'hesitate', definition: 'do dự, ngập ngừng' },
      { id: 'b1-7', term: 'prioritize tasks', definition: 'ưu tiên các nhiệm vụ' },
      { id: 'b1-8', term: 'temporary solution', definition: 'giải pháp tạm thời' },
      { id: 'b1-9', term: 'efficient method', definition: 'phương pháp hiệu quả' },
      { id: 'b1-10', term: 'express opinion', definition: 'bày tỏ quan điểm' },
      { id: 'b1-11', term: 'achieve a target', definition: 'đạt được mục tiêu' },
      { id: 'b1-12', term: 'solve a problem', definition: 'giải quyết vấn đề' }
    ]
  },
  {
    id: 'cefr-b2-upper-intermediate',
    title: 'CEFR B2: Upper-Intermediate Vocabulary',
    subtitle: 'Khung chuẩn Châu Âu • Trình độ B2',
    description: 'Từ vựng nâng cao phục vụ đọc hiểu chuyên sâu, tranh luận và viết luận mạch lạc.',
    category: 'cefr',
    cefrLevel: 'b2',
    grade: 'Level B2',
    book: 'CEFR B2',
    author: 'Dream Education Team',
    tags: ['CEFR', 'B2', 'Trung cao cấp'],
    isOfficial: true,
    terms: [
      { id: 'b2-1', term: 'advocate for', definition: 'công khai ủng hộ, tán thành' },
      { id: 'b2-2', term: 'collaborate effectively', definition: 'hợp tác hiệu quả' },
      { id: 'b2-3', term: 'comprehensive analysis', definition: 'phân tích toàn diện' },
      { id: 'b2-4', term: 'diverse perspectives', definition: 'những góc nhìn đa dạng' },
      { id: 'b2-5', term: 'evaluate performance', definition: 'đánh giá hiệu suất' },
      { id: 'b2-6', term: 'tangible benefit', definition: 'lợi ích hữu hình, rõ ràng' },
      { id: 'b2-7', term: 'subtle difference', definition: 'sự khác biệt tinh tế, nhỏ' },
      { id: 'b2-8', term: 'sustainable development', definition: 'phát triển bền vững' },
      { id: 'b2-9', term: 'smooth transition', definition: 'sự chuyển tiếp suôn sẻ' },
      { id: 'b2-10', term: 'substantial growth', definition: 'sự tăng trưởng đáng kể' },
      { id: 'b2-11', term: 'underlying cause', definition: 'nguyên nhân sâu xa' },
      { id: 'b2-12', term: 'feasible approach', definition: 'cách tiếp cận khả thi' }
    ]
  },
  {
    id: 'cefr-c1-advanced',
    title: 'CEFR C1: Advanced Academic Lexicon',
    subtitle: 'Khung chuẩn Châu Âu • Trình độ C1',
    description: 'Từ vựng học thuật đỉnh cao, phục vụ nghiên cứu, diễn thuyết và tư duy phản biện.',
    category: 'cefr',
    cefrLevel: 'c1',
    grade: 'Level C1',
    book: 'CEFR C1',
    author: 'Dream Education Team',
    tags: ['CEFR', 'C1', 'Cao cấp'],
    isOfficial: true,
    terms: [
      { id: 'c1-1', term: 'articulate thoughts', definition: 'diễn đạt suy nghĩ một cách lưu loát và gãy gọn' },
      { id: 'c1-2', term: 'cohesive structure', definition: 'cấu trúc chặt chẽ, gắn kết' },
      { id: 'c1-3', term: 'discrepancy in data', definition: 'sự sai lệch, bất nhất trong dữ liệu' },
      { id: 'c1-4', term: 'inherent quality', definition: 'phẩm chất vốn có, bẩm sinh' },
      { id: 'c1-5', term: 'plausible explanation', definition: 'lời giải thích hợp lý, đáng tin' },
      { id: 'c1-6', term: 'pragmatic approach', definition: 'cách tiếp cận thực tế, thực dụng' },
      { id: 'c1-7', term: 'rigorous methodology', definition: 'phương pháp luận khắt khe, chặt chẽ' },
      { id: 'c1-8', term: 'volatile market', definition: 'thị trường nhiều biến động bất ổn' },
      { id: 'c1-9', term: 'profound influence', definition: 'tác động hoặc ảnh hưởng sâu sắc' },
      { id: 'c1-10', term: 'scrutinize evidence', definition: 'xem xét, kiểm tra chứng cứ kỹ lưỡng' },
      { id: 'c1-11', term: 'ambiguous statement', definition: 'phát biểu mơ hồ, đa nghĩa' },
      { id: 'c1-12', term: 'reconcile differences', definition: 'hòa giải những bất đồng' }
    ]
  }
];

const STORAGE_KEYS = {
  CUSTOM_SETS: 'dream_vocab_custom_sets',
  STARRED: 'dream_vocab_starred_',
  MASTERY: 'dream_vocab_mastery_',
  MATCH_SCORES: 'dream_vocab_match_scores_'
};

/**
 * Get all available vocabulary sets (default + user created)
 */
export function getAllVocabSets() {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_SETS);
    const customSets = custom ? JSON.parse(custom) : [];
    return [...DEFAULT_VOCAB_SETS, ...customSets];
  } catch (e) {
    console.error('Error loading custom vocab sets:', e);
    return DEFAULT_VOCAB_SETS;
  }
}

/**
 * Get a specific vocabulary set by ID
 */
export function getVocabSetById(id) {
  const allSets = getAllVocabSets();
  return allSets.find(s => s.id === id) || DEFAULT_VOCAB_SETS[0];
}

/**
 * Save a custom vocabulary set
 */
export function saveCustomVocabSet(newSet) {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_SETS);
    const customSets = custom ? JSON.parse(custom) : [];
    const index = customSets.findIndex(s => s.id === newSet.id);
    if (index >= 0) {
      customSets[index] = newSet;
    } else {
      customSets.unshift(newSet);
    }
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SETS, JSON.stringify(customSets));
    return true;
  } catch (e) {
    console.error('Error saving custom vocab set:', e);
    return false;
  }
}

/**
 * Delete a custom vocabulary set
 */
export function deleteCustomVocabSet(id) {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_SETS);
    if (!custom) return false;
    let customSets = JSON.parse(custom);
    customSets = customSets.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_SETS, JSON.stringify(customSets));
    return true;
  } catch (e) {
    console.error('Error deleting custom vocab set:', e);
    return false;
  }
}

/**
 * Starred terms management
 */
export function getStarredTerms(setId) {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.STARRED}${setId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function toggleStarredTerm(setId, termId) {
  const current = getStarredTerms(setId);
  let updated;
  if (current.includes(termId)) {
    updated = current.filter(id => id !== termId);
  } else {
    updated = [...current, termId];
  }
  try {
    localStorage.setItem(`${STORAGE_KEYS.STARRED}${setId}`, JSON.stringify(updated));
  } catch (e) {}
  return updated;
}

/**
 * Mastery tracking: { [termId]: 'learning' | 'mastered' }
 */
export function getMasteryData(setId) {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.MASTERY}${setId}`);
    return data ? JSON.parse(data) : {};
  } catch (e) {
    return {};
  }
}

export function updateTermMastery(setId, termId, status) {
  const current = getMasteryData(setId);
  current[termId] = status;
  try {
    localStorage.setItem(`${STORAGE_KEYS.MASTERY}${setId}`, JSON.stringify(current));
  } catch (e) {}
  return current;
}

export function resetMastery(setId) {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.MASTERY}${setId}`);
  } catch (e) {}
  return {};
}

/**
 * Match high scores
 */
export function getMatchLeaderboard(setId) {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.MATCH_SCORES}${setId}`);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function recordMatchScore(setId, scoreInSeconds) {
  try {
    const current = getMatchLeaderboard(setId);
    const newRecord = {
      score: scoreInSeconds,
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    const updated = [...current, newRecord]
      .sort((a, b) => a.score - b.score)
      .slice(0, 10);
    localStorage.setItem(`${STORAGE_KEYS.MATCH_SCORES}${setId}`, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

/**
 * UTF-8 safe Base64 encoder/decoder for sharing sets across devices
 */
function toBase64Utf8(str) {
  return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => String.fromCharCode(parseInt(p1, 16))));
}

function fromBase64Utf8(b64) {
  return decodeURIComponent(Array.prototype.map.call(window.atob(b64), (c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
}

/**
 * Generate a shareable link that works on any phone/PC without a server
 */
export function generateShareableLink(vocabSet) {
  if (typeof window === 'undefined') return '';
  const baseUrl = `${window.location.origin}${window.location.pathname}`;

  if (vocabSet.isOfficial) {
    return `${baseUrl}#/vocab/${vocabSet.id}`;
  }

  try {
    const compact = {
      t: vocabSet.title,
      s: vocabSet.subtitle || '',
      d: vocabSet.description || '',
      g: vocabSet.grade || 'Lớp 10',
      b: vocabSet.book || 'Tự tạo',
      items: vocabSet.terms.map(t => [t.term, t.definition])
    };
    const b64 = encodeURIComponent(toBase64Utf8(JSON.stringify(compact)));
    return `${baseUrl}#/vocab?sharedData=${b64}`;
  } catch (err) {
    console.error('Error generating share link:', err);
    return `${baseUrl}#/vocab/${vocabSet.id}`;
  }
}

/**
 * Parse a shared set from URL query string and save it to localStorage
 */
export function importSharedSetFromUrl(sharedDataStr) {
  try {
    const jsonStr = fromBase64Utf8(decodeURIComponent(sharedDataStr));
    const compact = JSON.parse(jsonStr);

    const newSet = {
      id: `shared-${Date.now()}`,
      title: compact.t,
      subtitle: compact.s || `${compact.g} - ${compact.b}`,
      description: compact.d || `Bộ từ vựng gồm ${compact.items.length} thuật ngữ được chia sẻ.`,
      category: 'custom',
      grade: compact.g || 'Lớp 10',
      book: compact.b || 'Chia sẻ',
      author: 'Được chia sẻ',
      tags: [compact.g || 'Lớp 10', 'Được chia sẻ'],
      isOfficial: false,
      terms: compact.items.map((item, idx) => ({
        id: `shared-term-${Date.now()}-${idx}`,
        term: item[0],
        definition: item[1]
      }))
    };

    saveCustomVocabSet(newSet);
    return newSet;
  } catch (err) {
    console.error('Error importing shared set:', err);
    return null;
  }
}

/**
 * Download a vocabulary set as a JSON file backup
 */
export function downloadSetAsBackupFile(vocabSet) {
  try {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(vocabSet, null, 2));
    const downloadAnchor = document.createElement('a');
    const filename = `${vocabSet.title.replace(/[^a-zA-Z0-9\u00C0-\u024F\u1E00-\u1EFF]/g, '_')}_dream_vocab.json`;
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    return true;
  } catch (e) {
    console.error('Download error:', e);
    return false;
  }
}
