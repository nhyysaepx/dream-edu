# Dream Education

Trang web chính thức của trung tâm tiếng Anh **Dream Education** với sứ mệnh "Nâng Tầm Tiếng Anh - Mở Lối Tương Lai". Dự án được xây dựng với giao diện hiện đại, tối ưu trải nghiệm người dùng (UX/UI) và tương thích trên nhiều thiết bị.

## 🛠 Công Nghệ Sử Dụng

Dự án này sử dụng các công nghệ hiện đại trong hệ sinh thái Frontend:

- **[React](https://react.dev/)**: Thư viện JavaScript để xây dựng giao diện người dùng.
- **[Vite](https://vitejs.dev/)**: Trình đóng gói (bundler) với tốc độ build cực nhanh.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS tiện ích giúp xây dựng giao diện nhanh chóng và nhất quán.
- **[React Router DOM](https://reactrouter.com/)**: Quản lý điều hướng và routing cho ứng dụng.
- **[Lucide React](https://lucide.dev/)**: Bộ thư viện biểu tượng (icon) đẹp mắt và hiện đại.

## 🚀 Hướng Dẫn Cài Đặt và Chạy Dự Án

Làm theo các bước sau để chạy dự án trên máy cục bộ của bạn:

### 1. Cài đặt các gói phụ thuộc

Đảm bảo bạn đã cài đặt [Node.js](https://nodejs.org/). Tại thư mục gốc của dự án, chạy lệnh:

```bash
npm install
```

### 2. Chạy môi trường phát triển (Development)

Để chạy dự án ở chế độ phát triển (có hỗ trợ Hot Module Replacement - HMR), sử dụng lệnh:

```bash
npm run dev
```

Sau khi chạy lệnh, bạn có thể truy cập dự án trên trình duyệt, thông thường tại địa chỉ `http://localhost:5173/`.

### 3. Đóng gói cho môi trường thực tế (Production Build)

Để build dự án ra phiên bản tối ưu sẵn sàng deploy lên production, sử dụng lệnh:

```bash
npm run build
```

Các file đã được tối ưu hóa sẽ được tạo trong thư mục `dist`. Bạn có thể sử dụng lệnh `npm run preview` để xem trước phiên bản build này trên local:

```bash
npm run preview
```

## 📂 Cấu Trúc Thư Mục Chính

- `/src`: Chứa toàn bộ mã nguồn React của dự án (Components, Pages, Assets, ...).
- `/public`: Chứa các tài nguyên tĩnh như favicon, hình ảnh.
- `index.html`: File HTML gốc (entry point).
- `package.json`: Quản lý các dependencies và scripts của dự án.
- `vite.config.js`: Cấu hình cho Vite.
- `eslint.config.js`: Cấu hình linting code.
