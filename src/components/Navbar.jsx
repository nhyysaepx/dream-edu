import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/courses', label: 'Courses' },
    { path: '/teachers', label: 'Teachers' },
    { path: '/success-stories', label: 'Success Stories' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/30 shadow-sm transition-all duration-300">
      <nav className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-headline-sm text-headline-sm font-bold text-primary">Dream Education</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
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
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden sm:inline-block bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-all active:scale-95 shadow-sm text-center"
          >
            Book Placement Test
          </Link>
          
          <button
            onClick={toggleMenu}
            className="md:hidden text-primary p-2 focus:outline-none"
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
        className={`md:hidden absolute top-full left-0 w-full bg-surface-container-lowest border-b border-outline-variant/30 p-margin-mobile flex flex-col gap-stack-md transition-all duration-300 shadow-md ${
          isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
      >
        {navLinks.map((link) => (
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
        ))}
        <Link
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
          className="bg-primary text-on-primary py-3 px-6 rounded-lg font-label-lg text-label-lg text-center mt-2 active:scale-95 transition-all shadow-sm"
        >
          Book Placement Test
        </Link>
      </div>
    </header>
  );
}
