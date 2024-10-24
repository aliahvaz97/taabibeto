import React, { useState } from 'react';
import './header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* لوگو */}
      <div className="logo">
        <a href="/">taabibeto</a>
      </div>

      {/* باتن ورود | ثبت نام */}
      <div className="auth-links">
        <a href="/login">
          <button type="button">ورود | ثبت نام</button>
        </a>
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
