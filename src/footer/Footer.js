import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* عضویت در خبرنامه */}
      <div className="footer-section">
        <h3>عضویت در خبرنامه</h3>
        <p>برای اطلاع از جدیدترین مقالات و کدهای تخفیف...</p>
        <input type="email" placeholder="ایمیل شما" />
        <button>عضویت در خبرنامه</button>
      </div>
      
      {/* مجوزها */}
      <div className="footer-section">
        <h3>مجوزها</h3>
        <div className="licenses">
          <img src="license1.png" alt="مجوز ۱" />
          <img src="license2.png" alt="مجوز ۲" />
        </div>
      </div>

      {/* درباره تبیبتو */}
      <div className="footer-section">
        <h3>درباره تبیبتو</h3>
        <p>تبیبتو ارائه‌دهنده خدمات پزشکی آنلاین و پل ارتباطی میان کاربران با ارائه‌دهندگان خدمات پزشکی...</p>
        <div className="social-icons">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
