const STUDENT_STORAGE_KEY = 'dream_student_info';

/**
 * Get stored student info from localStorage
 * @returns {{ name: string, className: string, phone: string, email: string }}
 */
export function getStoredStudent() {
  try {
    const raw = localStorage.getItem(STUDENT_STORAGE_KEY);
    if (!raw) return { name: '', className: '', phone: '', email: '' };
    const parsed = JSON.parse(raw);
    return {
      name: parsed.name || '',
      className: parsed.className || parsed.class || '',
      phone: parsed.phone || '',
      email: parsed.email || ''
    };
  } catch (e) {
    console.error('Error reading student info from localStorage:', e);
    return { name: '', className: '', phone: '', email: '' };
  }
}

/**
 * Save student info to localStorage
 * @param {{ name?: string, className?: string, phone?: string, email?: string }} info
 */
export function saveStoredStudent(info) {
  try {
    const current = getStoredStudent();
    const updated = {
      ...current,
      ...info
    };
    localStorage.setItem(STUDENT_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error saving student info to localStorage:', e);
    return info;
  }
}

/**
 * Clear student info from localStorage
 */
export function clearStoredStudent() {
  try {
    localStorage.removeItem(STUDENT_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing student info:', e);
  }
}
