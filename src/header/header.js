import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // وضعیت شبیه‌سازی ورود کاربر
  const isLoggedIn = false; // وضعیت ورود کاربر: true یا false
  const userName = 'علی'; // نام کاربر شبیه‌سازی شده

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* لوگو */}
      <div className="logo">
        <a href="/">taabibeto</a>
      </div>

      {/* ورود و ثبت نام */}
      <div className="auth-links">
        {isLoggedIn ? (
          <span className="user-name">{userName}</span>
        ) : (
          <>
            <a href="#login">ورود</a>
            <a href="#signup">ثبت نام</a>
          </>
        )}
      </div>

      {/* لینک‌های ناوبری */}
      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#home">خانه</a>
        <a href="#services">خدمات</a>
        <a href="#about">درباره ما</a>
        <a href="#contact">تماس با ما</a>
      </div>

      {/* منوی همبرگری */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
