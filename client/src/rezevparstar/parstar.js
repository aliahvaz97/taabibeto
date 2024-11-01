import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '',
    date: null,
    time: '',
    address: '',
    notes: ''
  });

  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const calendarRef = useRef(null);
  const navigate = useNavigate();

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date
    });
    setCalendarOpen(false);
  };

  const handleTimeChange = (e) => {
    setFormData({
      ...formData,
      time: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          lastName: formData.name,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data.message);
        navigate('/nurse-selection');
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn'); // فرض بر اینکه وضعیت ورود کاربر در localStorage ذخیره شده

    if (!isLoggedIn) {
      navigate('/login'); // هدایت به صفحه لاگین اگر کاربر وارد نشده باشد
    }
  }, [navigate]);

  useEffect(() => {
    const currentCalendarRef = calendarRef.current;

    const handleClickOutside = (event) => {
      if (currentCalendarRef && !currentCalendarRef.contains(event.target)) {
        setCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

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
          value={formData.date ? formData.date.format('YYYY/MM/DD') : ''}
          onFocus={() => setCalendarOpen(true)}
          readOnly
          placeholder="انتخاب تاریخ"
          style={inputStyle}
        />
        {isCalendarOpen && (
          <div ref={calendarRef} style={calendarContainerStyle}>
            <Calendar
              value={formData.date}
              onChange={handleDateChange}
              calendar={persian}
              locale={persian_fa}
            />
          </div>
        )}
      </div>
      <div style={fieldStyle}>
        <label>ساعت رزرو:</label>
        <select
          name="time"
          value={formData.time}
          onChange={handleTimeChange}
          required
          style={inputStyle}
        >
          <option value="" disabled>انتخاب ساعت</option>
          {availableTimes.map((time, index) => (
            <option key={index} value={time}>{time}</option>
          ))}
        </select>
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
      <button type="submit" style={buttonStyle}>ادامه</button>
    </form>
  );
};

// Styling
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

const calendarContainerStyle = {
  position: 'absolute',
  zIndex: '1000',
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  padding: '10px',
};

export default BookingForm;
