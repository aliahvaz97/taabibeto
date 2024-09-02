import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NurseSelection = ({ onSelectNurse }) => {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate(); // استفاده از useNavigate برای هدایت

  useEffect(() => {
    // فرض کنید این داده‌ها از یک API یا سرور دریافت شده باشند
    const fetchedNurses = [
      { id: 1, name: 'پرستار ۱', rating: 4.5, specialization: 'مراقبت‌های ویژه', image: 'https://via.placeholder.com/150' },
      { id: 2, name: 'پرستار ۲', rating: 4.0, specialization: 'پرستار کودکان', image: 'https://via.placeholder.com/150' },
      { id: 3, name: 'پرستار ۳', rating: 3.8, specialization: 'پرستار سالمندان', image: 'https://via.placeholder.com/150' },
    ];
    setNurses(fetchedNurses);
  }, []);

  const handleSelect = (nurse) => {
    onSelectNurse(nurse);
    navigate('/payment'); // هدایت به صفحه پرداخت
  };

  return (
    <div style={nurseListStyle}>
      {nurses.map((nurse) => (
        <div key={nurse.id} style={nurseCardStyle}>
          <img src={nurse.image} alt={nurse.name} style={imageStyle} /> {/* اضافه کردن تصویر */}
          <h3>{nurse.name}</h3>
          <p>تخصص: {nurse.specialization}</p>
          <p>امتیاز: {nurse.rating}</p>
          <button
            onClick={() => handleSelect(nurse)}
            style={buttonStyle}
          >
            انتخاب
          </button>
        </div>
      ))}
    </div>
  );
};

// تعریف استایل‌ها
const nurseListStyle = {
  display: 'flex',
  flexDirection: 'row', // تغییر جهت به سطری
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1000px',
  margin: 'auto',
  padding: '20px',
  gap: '10px', // فاصله بین کارت‌ها
  overflowX: 'auto', // امکان اسکرول افقی در صورت زیاد بودن تعداد کارت‌ها
  backgroundColor: '#f9f9f9',
};

const nurseCardStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
  textAlign: 'center',
  backgroundColor: '#fff',
  width: '200px', // اندازه مشخص برای هر کارت
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer',
};

const imageStyle = {
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#28a745',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

// اکسپورت کامپوننت
export default NurseSelection;
