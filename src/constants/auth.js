// Hash SHA-256 của mật khẩu truy cập (không lưu trữ văn bản gốc trong mã nguồn frontend)
export const ACCESS_PASSWORD_HASH = '1a9f6516fd338304e10c5d1301754862ac3675e5fe2828e43d6ae95f62853703';

// Storage key lưu phiên xác thực
export const AUTH_STORAGE_KEY = 'dream_study_access_token';

// Chữ ký kiểm thực tính hợp lệ của phiên đăng nhập (chống bypass qua localStorage thông thường)
export const AUTH_TOKEN_SIGNATURE = '4d8fc6606827f0d8bbc29e6640fc37a93b24e08ff08094f302b600ec771a4fa8';
