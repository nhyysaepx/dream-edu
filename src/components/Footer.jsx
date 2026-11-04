import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/40 pt-12 pb-8">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-10">
        {/* Brand & Slogan */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <img src={logo} alt="Dream Education Logo" className="h-9 w-auto rounded object-contain" />
            <span className="font-headline-sm text-headline-sm font-bold text-primary">Dream Education</span>
          </Link>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
            Kiến tạo tương lai toàn cầu thông qua năng lực ngôn ngữ vượt trội và phương pháp đào tạo chuẩn mực, cá nhân hóa.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <a
              href="https://facebook.com/dream.education.dn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Facebook Page"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a
              href="https://zalo.me/0777466838"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Zalo Support"
            >
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </a>
            <a
              href="mailto:dreameducation.dn@gmail.com"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm"
              aria-label="Email Admissions"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        {/* Programs */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Chương trình học</h4>
          <ul className="space-y-2.5">
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Luyện thi IELTS
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Tiếng Anh Thiếu Niên
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Tiếng Anh Mất Gốc
              </Link>
            </li>
            <li>
              <Link to="/teachers" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Đội ngũ giáo viên
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Thông tin liên hệ</h4>
          <ul className="space-y-3 text-body-sm text-on-surface-variant">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0 mt-0.5">location_on</span>
              <span>58 Sơn Thủy 3, Phường Ngũ Hành Sơn, Thành phố Đà Nẵng</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0">call</span>
              <div className="flex flex-wrap gap-x-1.5 items-center">
                <a href="tel:0772486838" className="hover:text-primary font-medium transition-colors">077 248 6838</a>
                <span>/</span>
                <a href="tel:0777466838" className="hover:text-primary font-medium transition-colors">077 746 6838</a>
              </div>
            </li>
            <li className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-primary shrink-0">mail</span>
              <a href="mailto:dreameducation.dn@gmail.com" className="hover:text-primary font-medium transition-colors break-all">
                dreameducation.dn@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30 pt-6 text-center">
        <p className="font-label-md text-label-md text-on-surface-variant">
          © 2026 Dream Education. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
