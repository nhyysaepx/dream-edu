// Vocabulary storage helpers, mastery tracking, and link sharing

import { DEFAULT_VOCAB_SETS } from './defaultSets.js';

export const STORAGE_KEYS = {
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
  } catch {
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
  } catch {
    // Ignore storage write errors (e.g. storage full or private mode)
  }
  return updated;
}

/**
 * Mastery tracking: { [termId]: 'learning' | 'mastered' }
 */
export function getMasteryData(setId) {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.MASTERY}${setId}`);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function updateTermMastery(setId, termId, status) {
  const current = getMasteryData(setId);
  current[termId] = status;
  try {
    localStorage.setItem(`${STORAGE_KEYS.MASTERY}${setId}`, JSON.stringify(current));
  } catch {
    // Ignore storage write errors
  }
  return current;
}

export function resetMastery(setId) {
  try {
    localStorage.removeItem(`${STORAGE_KEYS.MASTERY}${setId}`);
  } catch {
    // Ignore storage errors
  }
  return {};
}

/**
 * Match high scores
 */
export function getMatchLeaderboard(setId) {
  try {
    const data = localStorage.getItem(`${STORAGE_KEYS.MATCH_SCORES}${setId}`);
    return data ? JSON.parse(data) : [];
  } catch {
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
  } catch {
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
