import { createContext, useContext, useState } from 'react';
import { ACCESS_PASSWORD, AUTH_STORAGE_KEY } from '../constants/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      const localAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return sessionAuth === 'granted' || localAuth === 'granted';
    } catch {
      return false;
    }
  });

  const login = (password, rememberMe = false) => {
    if (!password) {
      return { success: false, error: 'Vui lòng nhập mật khẩu truy cập.' };
    }

    const cleanInput = password.trim().toLowerCase();
    if (cleanInput === ACCESS_PASSWORD.toLowerCase()) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, 'granted');
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, 'granted');
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (e) {
        console.error('Storage error:', e);
      }
      return { success: true };
    }

    return { 
      success: false, 
      error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!' 
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.error('Storage error:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
