import React, { useState } from 'react';
import './header.css'; // نام فایل CSS

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/">taabibeto</a>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#home">خانه</a>
        <a href="#services">خدمات</a>
        <a href="#about">درباره ما</a>
        <a href="#contact">تماس با ما</a>
      </div>

      <div className="menu-toggle" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
};

export default Header;
