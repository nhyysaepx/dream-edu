import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/50 pt-stack-lg pb-10">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-gutter mb-stack-lg">
        {/* About Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="Dream Education Logo" className="h-9 w-auto rounded object-contain" />
            <div className="font-headline-sm text-headline-sm font-bold text-primary">Dream Education</div>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            © 2026 Dream Education. Kiến tạo tương lai toàn cầu thông qua năng lực ngôn ngữ vượt trội.
          </p>
          <div className="flex gap-4">
            <a
              href="http://facebook.com/dream.education.dn"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Facebook Page"
            >
              <span className="material-symbols-outlined text-[20px]">public</span>
            </a>
            <a
              href="https://zalo.me/0777466838"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Zalo Support"
            >
              <span className="material-symbols-outlined text-[20px]">school</span>
            </a>
            <a
              href="mailto:dreameducation.dn@gmail.com"
              className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
              aria-label="Email Admissions"
            >
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </a>
          </div>
        </div>

        {/* Programs Column */}
        <div className="space-y-4">
          <h4 className="font-headline-sm text-headline-sm text-primary">Chương trình học</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Luyện thi IELTS Học thuật
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Tiếng Anh Giao tiếp Thành thạo
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Tiếng Anh Thương mại
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources Column */}
        <div className="space-y-4">
          <h4 className="font-headline-sm text-headline-sm text-primary">Tài nguyên</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/teachers" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Hồ sơ giáo viên
              </Link>
            </li>
            <li>
              <Link to="/success-stories" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Học viên tiêu biểu
              </Link>
            </li>
            <li>
              <Link to="/courses" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Thi thử miễn phí
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Column */}
        <div className="space-y-4">
          <h4 className="font-headline-sm text-headline-sm text-primary">Hỗ trợ</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Chính sách bảo mật
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-on-surface-variant hover:text-primary transition-colors hover:translate-x-1 inline-block text-body-sm">
                Điều khoản dịch vụ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-secondary font-bold text-body-sm">
                Liên hệ với chúng tôi
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Partners and Accreditation */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop border-t border-outline-variant/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-label-md text-label-md text-on-surface-variant">
          Được kiểm định bởi Hội đồng Tiêu chuẩn Tiếng Anh Quốc tế
        </p>

        <div className="flex gap-6">
          <img
            alt="Partner Logo"
            className="h-8 grayscale opacity-50 hover:opacity-80 transition-opacity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB-qBjTreRcrgCzOgc07jF7cjxJtC172JepeUVNtqGb02qfwBXmzvCSt-hKCKW7owQQ2TdUTMQRbs_llAV1IVpApKmfytjHcQ36j37aJIy_kZPR9v4OwVMuRyM8_eXNROYlaBKXrUjCVbZEvqpYjHQloYJJFh0CV-38c8CjdvQ7rE2LE4A4nSIvXP1ZCQ3PZO_CVptn1nEJUc5gHT7AoE_qa0sMWdAazDB4EEaNQLdn6OM-SVRKA-Tjb0WyVrOfFKRejMgHFNc_18"
          />
          <img
            alt="Partner Logo"
            className="h-8 grayscale opacity-50 hover:opacity-80 transition-opacity"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqrpV28WZKInLr3JoPQF5bttsj_NZNxiBLq2jfzBlBAKRXaVIs7bcXD13pMD6D4UFjv3SdymoRyOAPgRSKnVQAEwwfWr5U5F1E_AiPcdHN40IgKEgBymt47APx66WtjHXwQ29gy65fHUIUsyX0OAGKNLHvGI2ZuaUrBoNhtehCmxL1E_20W6K1zFKu8AsPUCqYnBg85sNOmwL3Z4L7iyPC6lPDRWwkbWk0dmO9EDnoo6T-wUbl2mFL2z9oeCie2UmCsJep6YYR8Dc"
          />
        </div>
      </div>
    </footer>
  );
}
