import React, { useState } from 'react';
import moment from 'jalali-moment';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        date: '',
        time: '',
        address: '',
        notes: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const gregorianDate = moment(formData.date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD');
        const time24Hour = formData.time;
        console.log('Form Data Submitted:', {
            ...formData,
            date: gregorianDate,
            time: time24Hour,
        });
        // اینجا می‌توانید داده‌ها را به سرور ارسال کنید
    };

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
                <label>نام:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>سن:</label>
                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>شماره تلفن:</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>تاریخ رزرو (شمسی):</label>
                <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    placeholder="مثلاً 1403/05/12"
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>ساعت رزرو (24 ساعته):</label>
                <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>آدرس:</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                />
            </div>
            <div style={fieldStyle}>
                <label>توضیحات:</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    style={textareaStyle}
                ></textarea>
            </div>
            <button type="submit" style={buttonStyle}>ثبت رزرو</button>
        </form>
    );
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    margin: 'auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
};

const fieldStyle = {
    margin: '10px 0',
    width: '100%',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
};

const textareaStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    resize: 'vertical',
};

const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
};


export default BookingForm;
