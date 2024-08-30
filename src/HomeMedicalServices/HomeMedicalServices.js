import React, { useState } from 'react';
import './HomeMedicalServices.css';
import image from "./doctor-home-concept-illustration.png";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const questions = [
        {
            question: "سوال اول چیست؟",
            answer: "پاسخ سوال اول اینجا نوشته می‌شود."
        },
        {
            question: "سوال دوم چیست؟",
            answer: "پاسخ سوال دوم اینجا نوشته می‌شود."
        },
        {
            question: "سوال سوم چیست؟",
            answer: "پاسخ سوال سوم اینجا نوشته می‌شود."
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
