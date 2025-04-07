import React, { useState } from 'react';
import './HomeMedicalServices.css';
import image from "./doctor-home-concept-illustration.png";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: " چرا باید از تبیبتو استفاده کنم؟",
            answer: "چون تبیبتو سریع‌ترین راه برای پیدا کردن پرستار مطمئن و حرفه‌ای در منزل شماست، بدون دردسر و تماس‌های متعدد."
        },
        {
            question: "چطور مطمئن باشم پرستارها قابل اعتماد هستن؟",
            answer: "همه پرستاران تبیبتو احراز هویت شدن و سوابق کاری‌شون بررسی شده تا خیال شما راحت باشه."
        },
        {
            question: "اگه مشکلی پیش بیاد چی؟",
            answer: "پشتیبانی تبیبتو ۲۴ ساعته در کنار شماست تا هر مشکلی رو سریع پیگیری و حل کنه"
        }
    ];

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container">
            <div className="faq-content">
                {questions.map((item, index) => (
                    <div key={index} className="faq-item">
                        <div 
                            className={`faq-question ${activeIndex === index ? 'active' : ''}`} 
                            onClick={() => toggleAnswer(index)}
                        >
                            {item.question}
                        </div>
                        {activeIndex === index && (
                            <div className="faq-answer">
                                {item.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="image-section">
                <img
                    src={image} // Use imported image here
                    alt="Medical Services"
                    className="image"
                />
            </div>
        </div>
    );
};

export default FAQ;
