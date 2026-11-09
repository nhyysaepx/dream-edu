import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/about', label: 'Giới thiệu' },
    { path: '/courses', label: 'Khóa học' },
    { path: '/teachers', label: 'Giáo viên' },
    { 
      label: 'Phòng học', 
      subLinks: [
        { path: '/vocab', label: 'Học từ vựng' },
        { path: '/practice', label: 'Practice (Luyện trên lớp)', isProtected: true },
        { path: '/pronunciation/', label: 'Pronunciation', isExternal: true },
        { path: '/test-platform', label: 'Test Platform', isProtected: true },
        { path: '/homework', label: 'Homework', isProtected: true }
      ] 
    },
    { path: '/contact', label: 'Liên hệ' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Dream Education Logo" className="h-9 w-auto rounded object-contain" />
          <span className="font-headline-sm text-headline-sm font-bold text-primary">Dream Education</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            link.subLinks ? (
              <div key={link.label} className="relative group py-2">
                <button className="font-label-lg text-label-lg pb-1 transition-all text-on-surface-variant hover:text-primary flex items-center gap-1 focus:outline-none cursor-pointer">
                  {link.label}
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180">expand_more</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-60 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col overflow-hidden">
                  {link.subLinks.map((subLink) => (
                    subLink.isExternal ? (
                      <a
                        key={subLink.path}
                        href={subLink.path}
                        className="px-4 py-3 font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors border-b border-outline-variant/10 last:border-0"
                      >
                        {subLink.label}
                      </a>
                    ) : (
                      <NavLink
                        key={subLink.path}
                        to={subLink.path}
                        className={({ isActive }) =>
                          `px-4 py-3 font-label-lg text-label-lg transition-colors border-b border-outline-variant/10 last:border-0 flex items-center justify-between gap-2 ${
                            isActive
                              ? 'bg-surface-container text-primary font-semibold'
                              : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                          }`
                        }
                      >
                        <span className="truncate">{subLink.label}</span>
                        {subLink.isProtected && (
                          <span className="shrink-0">
                            {isAuthenticated ? (
                              <Unlock size={13} className="text-emerald-600" title="Đã mở khóa" />
                            ) : (
                              <Lock size={13} className="text-amber-600" title="Yêu cầu mật khẩu" />
                            )}
                          </span>
                        )}
                      </NavLink>
                    )
                  ))}

                  {/* Lock button in dropdown when authenticated */}
                  {isAuthenticated && (
                    <button
                      onClick={() => logout()}
                      className="px-4 py-2.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-700 text-xs font-bold flex items-center gap-2 border-t border-gray-150 transition-colors text-left cursor-pointer"
                    >
                      <Lock size={13} className="text-red-600" />
                      <span>Khóa lại phòng học</span>
                    </button>
                  )}
                </div>
              </div>
            ) : link.isExternal ? (
              <a
                key={link.path}
                href={link.path}
                className="font-label-lg text-label-lg pb-1 transition-all text-on-surface-variant hover:text-primary"
              >
                {link.label}
              </a>
            ) : (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-label-lg text-label-lg pb-1 transition-all ${
                    isActive
                      ? 'text-primary border-b-2 border-secondary'
                      : 'text-on-surface-variant hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Lock/Unlock Badge on Desktop */}
          {isAuthenticated && (
            <button
              onClick={() => logout()}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 text-amber-900 font-bold text-xs hover:bg-amber-100 transition-colors shadow-2xs cursor-pointer"
              title="Nhấn để khóa lại phòng học (yêu cầu mật khẩu khi vào lại)"
            >
              <Unlock size={13} className="text-emerald-600" />
              <span>Đã mở khóa</span>
              <span className="text-[10px] text-amber-700 underline ml-0.5">Khóa lại</span>
            </button>
          )}

          <Link
            to="/contact"
            className="hidden sm:inline-block bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-all active:scale-95 shadow-sm text-center"
          >
            Đăng ký kiểm tra trình độ
          </Link>
          
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span className="material-symbols-outlined text-[28px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-surface-container-lowest border-b border-outline-variant/30 p-margin-mobile flex flex-col gap-stack-md transition-all duration-300 shadow-md max-h-[80vh] overflow-y-auto ${
          isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        {/* Mobile Authentication Banner */}
        {isAuthenticated && (
          <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
              <Unlock size={14} className="text-emerald-600" />
              <span>Phòng học: Đã mở khóa</span>
            </div>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className="text-xs font-bold text-red-600 underline cursor-pointer"
            >
              Khóa lại
            </button>
          </div>
        )}

        {navLinks.map((link) => (
          link.subLinks ? (
            <div key={link.label} className="flex flex-col gap-2">
              <span className="font-label-lg text-label-lg py-2 w-fit text-on-surface font-semibold">
                {link.label}
              </span>
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-outline-variant/30 ml-2">
                {link.subLinks.map((subLink) => (
                  subLink.isExternal ? (
                    <a
                      key={subLink.path}
                      href={subLink.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="font-label-lg text-label-lg py-1 w-fit text-on-surface-variant hover:text-primary"
                    >
                      {subLink.label}
                    </a>
                  ) : (
                    <NavLink
                      key={subLink.path}
                      to={subLink.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `font-label-lg text-label-lg py-1 flex items-center justify-between ${
                          isActive ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
                        }`
                      }
                    >
                      <span>{subLink.label}</span>
                      {subLink.isProtected && (
                        <span className="shrink-0 mr-4">
                          {isAuthenticated ? (
                            <Unlock size={12} className="text-emerald-600" />
                          ) : (
                            <Lock size={12} className="text-amber-600" />
                          )}
                        </span>
                      )}
                    </NavLink>
                  )
                ))}
              </div>
            </div>
          ) : link.isExternal ? (
            <a
              key={link.path}
              href={link.path}
              onClick={() => setIsMenuOpen(false)}
              className="font-label-lg text-label-lg py-2 w-fit text-on-surface-variant"
            >
              {link.label}
            </a>
          ) : (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `font-label-lg text-label-lg py-2 w-fit ${
                  isActive ? 'text-primary border-b-2 border-secondary font-semibold' : 'text-on-surface-variant'
                }`
              }
            >
              {link.label}
            </NavLink>
          )
        ))}
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className="bg-primary text-on-primary py-3 px-6 rounded-lg font-label-lg text-label-lg text-center mt-2 active:scale-95 transition-all shadow-sm"
        >
          Đăng ký kiểm tra trình độ
        </Link>
      </div>
    </header>
  );
}
