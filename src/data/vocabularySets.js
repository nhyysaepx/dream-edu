// Vocabulary sets data and storage helpers

export const DEFAULT_VOCAB_SETS = [
  {
    id: 'unit-1-global-success-10',
    title: 'Unit 1: Family Life',
    subtitle: 'Tiếng Anh 10 - Global Success',
    description: 'Trọn bộ 74 từ vựng và cụm từ trọng tâm Unit 1 SGK Tiếng Anh 10 Global Success về chủ đề cuộc sống gia đình, thói quen và trách nhiệm.',
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
