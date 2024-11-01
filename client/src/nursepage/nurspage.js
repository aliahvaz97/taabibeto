import React, { useState } from 'react';

const NursePage = () => {
  const [formStep, setFormStep] = useState(1); // مرحله فرم
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [otp, setOtp] = useState(['', '', '']); // OTP برای ذخیره سه فیلد

  // مدیریت ارسال فرم اولیه
  const handleInitialFormSubmit = (e) => {
    e.preventDefault();
    // اینجا می‌توانید کد ارسال کد یک‌بارمصرف را بنویسید
    setFormStep(2); // نمایش فرم OTP
  };

  // مدیریت تغییرات فیلدهای OTP
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div className="nurse-page">
      {formStep === 1 ? (
        <form onSubmit={handleInitialFormSubmit}>
          <div>
            <label>شماره تلفن:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label>نام:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>نام خانوادگی:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <button type="submit">ارسال</button>
        </form>
      ) : (
        <form>
          <div>کد یک‌بار مصرف ارسال شده را وارد کنید:</div>
          <div className="otp-fields">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="5"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                required
              />
            ))}
          </div>
          <button type="button">تایید کد</button>
        </form>
      )}
    </div>
  );
};

export default NursePage;
