import { createContext, useContext, useState } from 'react';
import { 
  ACCESS_PASSWORD_HASH, 
  AUTH_STORAGE_KEY, 
  AUTH_TOKEN_SIGNATURE 
} from '../constants/auth';
import { sha256Sync } from '../utils/crypto';

const AuthContext = createContext(null);

const isValidToken = (token) => {
  return typeof token === 'string' && token === AUTH_TOKEN_SIGNATURE;
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const sessionAuth = sessionStorage.getItem(AUTH_STORAGE_KEY);
      const localAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      return isValidToken(sessionAuth) || isValidToken(localAuth);
    } catch {
      return false;
    }
  });

  const login = (password, rememberMe = false) => {
    if (!password) {
      return { success: false, error: 'Vui lòng nhập mật khẩu truy cập.' };
    }

    const cleanInput = password.trim().toLowerCase();
    const inputHash = sha256Sync(cleanInput);

    if (inputHash === ACCESS_PASSWORD_HASH) {
      setIsAuthenticated(true);
      try {
        sessionStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN_SIGNATURE);
        if (rememberMe) {
          localStorage.setItem(AUTH_STORAGE_KEY, AUTH_TOKEN_SIGNATURE);
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
        // Xóa sạch key cũ trước đây nếu có
        sessionStorage.removeItem('dream_study_access');
        localStorage.removeItem('dream_study_access');
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
      sessionStorage.removeItem('dream_study_access');
      localStorage.removeItem('dream_study_access');
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
