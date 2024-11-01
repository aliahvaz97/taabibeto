import React from 'react';
import './Footer.css';

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('عضویت موفقیت‌آمیز بود!');
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* عضویت در خبرنامه */}
        <div className="footer-section newsletter">
          <h3>عضویت در خبرنامه</h3>
          <p>برای اطلاع از جدیدترین مقالات و کدهای تخفیف، ایمیل خود را وارد کنید:</p>
          <form onSubmit={handleNewsletterSubmit}>
            <input 
              type="email" 
              placeholder="ایمیل شما" 
              required 
              aria-label="ایمیل شما"
            />
            <button type="submit">عضویت در خبرنامه</button>
          </form>
        </div>

        {/* مجوزها */}
        <div className="footer-section licenses">
          <h3>مجوزها</h3>
          <div className="license-logos">
            <img src="license1.png" alt="مجوز ۱" />
            <img src="license2.png" alt="مجوز ۲" />
          </div>
        </div>

        {/* درباره تبیبتو */}
        <div className="footer-section about">
          <h3>درباره تبیبتو</h3>
          <p>تبیبتو ارائه‌دهنده خدمات پزشکی آنلاین و پل ارتباطی میان کاربران با ارائه‌دهندگان خدمات پزشکی است. با ما همراه باشید تا به بهبود سلامت و بهبود کیفیت زندگی کمک کنیم.</p>
          <div className="social-icons">
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* حق نشر */}
      <div className="footer-bottom">
        <p>حق نشر © {new Date().getFullYear()} تبیبتو. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;
