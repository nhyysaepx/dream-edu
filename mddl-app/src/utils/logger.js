/**
 * Utility to simulate logging user actions for research tracking.
 * In a real application, this would send data to a backend or analytics service.
 * 
 * @param {string} actionType - The type of action (e.g., 'SEARCH', 'VIEW_KWIC', 'PRACTICE_ANSWER')
 * @param {object} details - Additional details about the action
 */
export const logUserAction = (actionType, details = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    actionType,
    details,
  };
  
  // Simulate sending to server
  console.log('[Research Log]', JSON.stringify(logEntry, null, 2));
  
  // Optionally store in localStorage to persist across reloads for the demo
  try {
    const existingLogs = JSON.parse(localStorage.getItem('mddl_logs') || '[]');
    existingLogs.push(logEntry);
    localStorage.setItem('mddl_logs', JSON.stringify(existingLogs));
  } catch (e) {
    console.error('Failed to save log to localStorage', e);
  }
};
