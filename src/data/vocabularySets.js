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

  // ==========================================
  // LỘ TRÌNH IELTS - DREAM EDUCATION
  // ==========================================
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
    title: 'Pre-IELTS: Reading 2',
    subtitle: 'Pre-IELTS (4.0 - 5.0) • Reading 2',
    description: 'Trọn bộ 30 từ vựng trọng tâm bài đọc Reading 2 cấp độ Pre-IELTS về nhà ở, nơi cư ngụ độc đáo, trải nghiệm văn hóa và lối sống.',
    category: 'ielts',
    ieltsLevel: 'pre-ielts',
    skill: 'reading',
    grade: 'Pre IELTS',
    book: 'Pre-IELTS Reading',
    lesson: 'Reading 2',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Pre IELTS', 'Reading 2', 'Housing', 'Feelings'],
    isOfficial: true,
    terms: [
      { id: 'pir2-1', term: 'Apartment', definition: 'căn hộ' },
      { id: 'pir2-2', term: 'Caravan', definition: 'xe nhà di động' },
      { id: 'pir2-3', term: 'Houseboat', definition: 'nhà thuyền' },
      { id: 'pir2-4', term: 'Privacy', definition: 'sự riêng tư' },
      { id: 'pir2-5', term: 'Surround', definition: 'bao quanh, vây quanh' },
      { id: 'pir2-6', term: 'Shipping', definition: 'sự vận chuyển hàng hóa' },
      { id: 'pir2-7', term: 'Container', definition: 'công-ten-nơ, thùng đựng hàng' },
      { id: 'pir2-8', term: 'Eco-friendly', definition: 'thân thiện với môi trường' },
      { id: 'pir2-9', term: 'Refugee', definition: 'người tị nạn' },
      { id: 'pir2-10', term: 'Shortage', definition: 'sự thiếu hụt' },
      { id: 'pir2-11', term: 'Structure', definition: 'cấu trúc, công trình kiến trúc' },
      { id: 'pir2-12', term: 'Wheel', definition: 'bánh xe' },
      { id: 'pir2-13', term: 'Uncomfortable', definition: 'không thoải mái, khó chịu' },
      { id: 'pir2-14', term: 'Reindeer', definition: 'tuần lộc' },
      { id: 'pir2-15', term: 'Occupant', definition: 'người cư ngụ' },
      { id: 'pir2-16', term: 'Annoying', definition: 'gây bực mình, khó chịu' },
      { id: 'pir2-17', term: 'Roast', definition: 'nướng, quay' },
      { id: 'pir2-18', term: 'Seaweed', definition: 'rong biển, tảo biển' },
      { id: 'pir2-19', term: 'Drift', definition: 'trôi dạt, cuốn đi' },
      { id: 'pir2-20', term: 'Gaze', definition: 'nhìn chằm chằm' },
      { id: 'pir2-21', term: 'Homesick', definition: 'nhớ nhà' },
      { id: 'pir2-22', term: 'Unfamiliar', definition: 'không quen thuộc, xa lạ' },
      { id: 'pir2-23', term: 'Exchange', definition: 'trao đổi' },
      { id: 'pir2-24', term: 'Pleasant', definition: 'dễ chịu, thú vị' },
      { id: 'pir2-25', term: 'Welcoming', definition: 'chào đón, mến khách' },
      { id: 'pir2-26', term: 'Cosy', definition: 'ấm cúng' },
      { id: 'pir2-27', term: 'Banner', definition: 'băng rôn, biểu ngữ' },
      { id: 'pir2-28', term: 'Repetitive', definition: 'lặp đi lặp lại' },
      { id: 'pir2-29', term: 'Inactive', definition: 'thụ động, ít vận động' },
      { id: 'pir2-30', term: 'Impact', definition: 'tác động, ảnh hưởng' }
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
    id: 'intermediate-listening-6',
    title: 'IELTS Intermediate: Listening 6 (Energy, Fracking & Environment)',
    subtitle: 'IELTS Intermediate (5.0 - 6.5) • Listening 6',
    description: 'Trọn bộ 22 từ vựng học thuật quan trọng trong bài nghe Listening 6: Khai thác khí đá phiến (fracking), năng lượng tái tạo, biến đổi khí hậu và ngôn ngữ chỉ dẫn (signposting).',
    category: 'ielts',
    ieltsLevel: 'ielts-foundation',
    skill: 'listening',
    grade: 'IELTS Intermediate',
    book: 'Mindset for IELTS Level 2',
    lesson: 'Listening 6',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Intermediate', 'Listening 6', 'Environment', 'Energy', 'Fracking', 'Signposting'],
    isOfficial: true,
    terms: [
      { id: 'il6-1', term: 'fracking', definition: 'kỹ thuật thủy lực cắt phá (phương pháp nén thủy lực chiết xuất dầu/khí đá phiến)' },
      { id: 'il6-2', term: 'shale gas', definition: 'khí đá phiến (khí tự nhiên bị kẹt trong các tầng trầm tích đá phiến sét)' },
      { id: 'il6-3', term: 'signposting language', definition: 'ngôn ngữ chỉ dẫn, từ nối định hướng cấu trúc bài nói cho người nghe' },
      { id: 'il6-4', term: 'non-renewable resources', definition: 'tài nguyên không thể tái tạo (than đá, dầu mỏ, khí tự nhiên)' },
      { id: 'il6-5', term: 'renewable energy', definition: 'năng lượng tái tạo (năng lượng gió, mặt trời, sóng biển)' },
      { id: 'il6-6', term: 'consumption', definition: 'mức độ tiêu thụ, lượng tiêu dùng năng lượng' },
      { id: 'il6-7', term: 'parts per million (ppm)', definition: 'phần triệu (đơn vị đo nồng độ khí nhà kính trong khí quyển)' },
      { id: 'il6-8', term: 'carbon dioxide (CO2)', definition: 'khí các-bô-níc (khí nhà kính chính gây hiệu ứng nhà kính)' },
      { id: 'il6-9', term: 'global warming', definition: 'hiện tượng ấm lên toàn cầu, nhiệt độ Trái Đất tăng' },
      { id: 'il6-10', term: 'coastal flooding', definition: 'ngập lụt vùng ven biển do hiện tượng mực nước biển dâng' },
      { id: 'il6-11', term: 'sub-Saharan Africa', definition: 'khu vực châu Phi hạ Sahara' },
      { id: 'il6-12', term: 'well-founded', definition: 'có cơ sở vững chắc, có căn cứ xác đáng' },
      { id: 'il6-13', term: 'disturb the ground', definition: 'làm xáo trộn cấu trúc địa tầng/đất ngầm' },
      { id: 'il6-14', term: 'induced seismicity', definition: 'địa chấn / động đất nhân tạo kích hoạt bởi áp lực khoan ép nước' },
      { id: 'il6-15', term: 'production site', definition: 'khu vực / giàn khoan khai thác và xử lý khí đốt' },
      { id: 'il6-16', term: 'drinking water supply', definition: 'nguồn cấp nước sinh hoạt, nước uống' },
      { id: 'il6-17', term: 'commercial organisations', definition: 'các tổ chức kinh doanh, doanh nghiệp thương mại' },
      { id: 'il6-18', term: 'short-term answers', definition: 'các giải pháp ứng phó mang tính ngắn hạn' },
      { id: 'il6-19', term: 'pay for itself', definition: 'tự hoàn vốn, sinh lời bù đắp lại chi phí đầu tư ban đầu' },
      { id: 'il6-20', term: 'run out', definition: 'cạn kiệt, hết hoàn toàn (nhiên liệu hóa thạch)' },
      { id: 'il6-21', term: 'sequencing', definition: 'sắp xếp theo trình tự thời gian hoặc thứ tự các ý' },
      { id: 'il6-22', term: 'topic change', definition: 'sự chuyển đổi sang phân mục hoặc chủ đề thảo luận mới' }
    ]
  },
  {
    id: 'ielts-vol1-test2-listening',
    title: 'IELTS Vol 1 Test 2: Listening Core Vocabulary',
    subtitle: 'IELTS Academic • Listening Test 2',
    description: 'Bộ từ vựng trọng tâm xuất hiện trong bài thi Listening Test 2 (Vol 1): Thủ tục thuê nhà, trung tâm mầm non gia đình, phục hồi chức năng thể thao và thiết kế bố cục siêu thị.',
    category: 'ielts',
    ieltsLevel: 'ielts-advanced',
    skill: 'listening',
    grade: 'IELTS Academic',
    book: 'IELTS Collection 1',
    lesson: 'Listening Test 2',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Listening', 'Vol 1', 'Test 2', 'Vocabulary'],
    isOfficial: true,
    terms: [
      { id: 'v1t2-l1', term: 'rental property', definition: 'bất động sản cho thuê' },
      { id: 'v1t2-l2', term: 'application form', definition: 'đơn xin thuê, mẫu đăng ký' },
      { id: 'v1t2-l3', term: 'employer', definition: 'người sử dụng lao động, cơ quan công tác' },
      { id: 'v1t2-l4', term: 'chemist', definition: 'dược sĩ, chuyên gia hóa dược' },
      { id: 'v1t2-l5', term: 'furnished', definition: 'được trang bị sẵn đồ đạc nội thất' },
      { id: 'v1t2-l6', term: 'cooperative', definition: 'mô hình hợp tác xã, tổ chức đồng quản lý' },
      { id: 'v1t2-l7', term: 'pre-school', definition: 'trường mầm non, trước tuổi đi học' },
      { id: 'v1t2-l8', term: 'government funding', definition: 'nguồn tài trợ, ngân sách từ chính phủ' },
      { id: 'v1t2-l9', term: 'anatomy', definition: 'giải phẫu học cơ thể' },
      { id: 'v1t2-l10', term: 'rehabilitation', definition: 'phục hồi chức năng sau chấn thương' },
      { id: 'v1t2-l11', term: 'physiotherapy', definition: 'vật lý trị liệu' },
      { id: 'v1t2-l12', term: 'overstretch', definition: 'kéo dãn cơ quá mức gây chấn thương' },
      { id: 'v1t2-l13', term: 'deep tissue massage', definition: 'mát-xa mô sâu phục hồi cơ' },
      { id: 'v1t2-l14', term: 'store layout', definition: 'bố cục sắp xếp không gian siêu thị/cửa hàng' },
      { id: 'v1t2-l15', term: 'grid layout', definition: 'bố cục dạng lưới (các lối đi song song)' },
      { id: 'v1t2-l16', term: 'free-form layout', definition: 'bố cục tự do, sắp xếp ngẫu hứng' },
      { id: 'v1t2-l17', term: 'boutique layout', definition: 'bố cục theo từng quầy đặc sản chuyên biệt' },
      { id: 'v1t2-l18', term: 'traffic flow', definition: 'luồng di chuyển của dòng khách hàng' },
      { id: 'v1t2-l19', term: 'cost-effective', definition: 'hiệu quả về mặt chi phí' },
      { id: 'v1t2-l20', term: 'impulse buyer', definition: 'người mua hàng ngẫu hứng, theo cảm xúc' },
      { id: 'v1t2-l21', term: 'profitable', definition: 'sinh lời cao, đem lại nhiều lợi nhuận' }
    ]
  },
  {
    id: 'ielts-vol1-test2-reading',
    title: 'IELTS Vol 1 Test 2: Reading Academic Vocabulary',
    subtitle: 'IELTS Academic • Reading Test 2',
    description: 'Bộ từ vựng học thuật trọng điểm từ 3 bài đọc Reading Test 2 (Vol 1): Cuộc đua thuyền buồm clipper chở trà, khả năng định vị của loài chim, và vai trò của các phát minh tình cờ trong kinh doanh.',
    category: 'ielts',
    ieltsLevel: 'ielts-advanced',
    skill: 'reading',
    grade: 'IELTS Academic',
    book: 'IELTS Collection 1',
    lesson: 'Reading Test 2',
    author: 'Dream Education Team',
    tags: ['IELTS', 'Reading', 'Vol 1', 'Test 2', 'Academic Vocabulary'],
    isOfficial: true,
    terms: [
      { id: 'v1t2-r1', term: 'monopoly', definition: 'vị thế độc quyền kinh doanh thương mại' },
      { id: 'v1t2-r2', term: 'merchandise', definition: 'hàng hóa thương mại buôn bán' },
      { id: 'v1t2-r3', term: 'rival', definition: 'đối thủ cạnh tranh trực tiếp' },
      { id: 'v1t2-r4', term: 'clipper ship', definition: 'tàu buồm clipper tốc độ cao' },
      { id: 'v1t2-r5', term: 'narrow hull', definition: 'thân tàu hẹp, thon dài' },
      { id: 'v1t2-r6', term: 'beam', definition: 'chiều rộng tối đa của thân tàu' },
      { id: 'v1t2-r7', term: 'towed by tugs', definition: 'được lai dắt bởi tàu kéo chuyên dụng' },
      { id: 'v1t2-r8', term: 'official paperwork', definition: 'thủ tục giấy tờ hành chính chính thức' },
      { id: 'v1t2-r9', term: 'premium', definition: 'tiền thưởng thêm, phụ phí trả thêm' },
      { id: 'v1t2-r10', term: 'dedicated', definition: 'tận tâm, hết lòng cống hiến' },
      { id: 'v1t2-r11', term: 'orientation', definition: 'sự định hướng phương hướng và vị trí' },
      { id: 'v1t2-r12', term: 'homing instinct', definition: 'bản năng tìm đường bay về tổ' },
      { id: 'v1t2-r13', term: 'exploratory flight', definition: 'chuyến bay thăm dò địa bàn xung quanh' },
      { id: 'v1t2-r14', term: 'visual memory', definition: 'trí nhớ thị giác, ký ức hình ảnh' },
      { id: 'v1t2-r15', term: 'resolution', definition: 'độ phân giải chi tiết của mắt' },
      { id: 'v1t2-r16', term: 'destination', definition: 'điểm đến, đích đến cuối cùng' },
      { id: 'v1t2-r17', term: 'landmarks', definition: 'mốc định vị, địa tiêu nổi bật' },
      { id: 'v1t2-r18', term: 'albatross', definition: 'chim hải âu cánh rộng' },
      { id: 'v1t2-r19', term: 'heredity', definition: 'tính di truyền sinh học qua các thế hệ' },
      { id: 'v1t2-r20', term: 'innate and unlearned', definition: 'bẩm sinh và tự nhiên có, không qua đào tạo' },
      { id: 'v1t2-r21', term: 'disruptive innovation', definition: 'sự đổi mới mang tính đột phá, thay đổi cuộc chơi' },
      { id: 'v1t2-r22', term: 'unintentional result', definition: 'kết quả bất ngờ ngoài ý muốn, tình cờ' },
      { id: 'v1t2-r23', term: 'haphazard mess', definition: 'mớ hỗn độn ngẫu nhiên, không theo khuôn mẫu' },
      { id: 'v1t2-r24', term: 'commercialisation', definition: 'quá trình thương mại hóa sản phẩm' },
      { id: 'v1t2-r25', term: 'market niche', definition: 'thị trường ngách chuyên biệt' },
      { id: 'v1t2-r26', term: 'consolidators', definition: 'các doanh nghiệp củng cố và nhân rộng quy mô thị trường' },
      { id: 'v1t2-r27', term: 'counter-intuitive', definition: 'ngược lại với trực giác và suy nghĩ thông thường' },
      { id: 'v1t2-r28', term: 'tolerate failure', definition: 'chấp nhận và bao dung với những sai sót thất bại' },
      { id: 'v1t2-r29', term: 'slip-up', definition: 'sai sót nhỏ, sơ suất ngẫu nhiên' }
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
