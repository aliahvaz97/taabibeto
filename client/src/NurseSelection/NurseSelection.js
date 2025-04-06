import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // وارد کردن axios

const NurseSelection = ({ onSelectNurse }) => {
  const [nurses, setNurses] = useState([]); // ذخیره اطلاعات پرستاران
  const [loading, setLoading] = useState(true); // مدیریت وضعیت بارگذاری
  const [error, setError] = useState(null); // مدیریت خطاها
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNurses = async () => {
      try {
        const response = await axios.get('/api/nurses'); // درخواست با استفاده از axios
        // بررسی اینکه داده‌ها آرایه هستند
        if (Array.isArray(response.data)) {
          setNurses(response.data); // ذخیره داده‌های دریافتی از پاسخ
        } else {
          throw new Error('داده‌های دریافت‌شده باید آرایه باشند.');
        }
      } catch (error) {
        setError(error.response?.data?.message || 'مشکلی در اتصال به سرور وجود دارد.'); // مدیریت خطاها
      } finally {
        setLoading(false);
      }
    };

    fetchNurses();
  }, []);

  const handleSelect = (nurse) => {
    onSelectNurse(nurse);
    navigate(`/payment?price=${nurse.price}`);
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div style={nurseListStyle}>
      {nurses.length > 0 ? (
        nurses.map((nurse) => (
          <div key={nurse._id} style={nurseCardStyle} onClick={() => handleSelect(nurse)}>
            <img src={nurse.image || 'default-image.jpg'} alt={nurse.name} style={imageStyle} />
            <h3>{nurse.name}</h3>
            <p>تخصص: {nurse.specialty}</p>
            <p>امتیاز: {nurse.rating || 'ندارد'}</p>
            <p>قیمت: {nurse.price ? nurse.price.toLocaleString() : 'مشخص نشده'} تومان</p>
            <p>سن: {nurse.age}</p>
            <button style={buttonStyle}>انتخاب</button>
          </div>
        ))
      ) : (
        <div>هیچ پرستاری برای نمایش وجود ندارد.</div>
      )}
    </div>
  );
};

const nurseListStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  backgroundColor: '#f7f7f7',
};

const nurseCardStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  borderRadius: '10px',
  textAlign: 'center',
  backgroundColor: '#fff',
  width: '250px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
};

const imageStyle = {
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginBottom: '10px',
};

const buttonStyle = {
  padding: '10px 15px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  marginTop: '10px',
  transition: 'background-color 0.3s ease',
};

export default NurseSelection;
