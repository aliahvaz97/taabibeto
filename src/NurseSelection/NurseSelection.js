import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NurseSelection = ({ onSelectNurse }) => {
  const [nurses, setNurses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedNurses = [
      { id: 1, name: 'پرستار ۱', rating: 4.5, specialization: 'مراقبت‌های ویژه', image: 'https://via.placeholder.com/150', price: 500000 },
      { id: 2, name: 'پرستار ۲', rating: 4.0, specialization: 'پرستار کودکان', image: 'https://via.placeholder.com/150', price: 400000 },
      { id: 3, name: 'پرستار ۳', rating: 3.8, specialization: 'پرستار سالمندان', image: 'https://via.placeholder.com/150', price: 350000 },
    ];
    setNurses(fetchedNurses);
  }, []);

  const handleSelect = (nurse) => {
    onSelectNurse(nurse);
    navigate(`/payment?price=${nurse.price}`); // انتقال قیمت به URL
  };

  return (
    <div style={nurseListStyle}>
      {nurses.map((nurse) => (
        <div key={nurse.id} style={nurseCardStyle} onClick={() => handleSelect(nurse)}>
          <img src={nurse.image} alt={nurse.name} style={imageStyle} />
          <h3>{nurse.name}</h3>
          <p>تخصص: {nurse.specialization}</p>
          <p>امتیاز: {nurse.rating}</p>
          <p>قیمت: {nurse.price.toLocaleString()} تومان</p>
          <button style={buttonStyle}>انتخاب</button>
        </div>
      ))}
    </div>
  );
};

// تعریف استایل‌ها و سایر کدها


// تعریف استایل‌ها
const nurseListStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '1000px',
  margin: 'auto',
  padding: '20px',
  gap: '10px',
  overflowX: 'auto',
  backgroundColor: '#f9f9f9',
};

const nurseCardStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  textAlign: 'center',
  backgroundColor: '#fff',
  width: '220px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  overflow: 'hidden',
};

const imageStyle = {
  width: '120px',
  height: '120px',
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
  transition: 'background-color 0.3s ease, transform 0.3s ease',
};

// اکسپورت کامپوننت
export default NurseSelection;
