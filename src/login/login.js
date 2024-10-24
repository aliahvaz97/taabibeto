import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './login.css';

const SignUpWithPhone = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phoneNumber && lastName) {
      setOtpSent(true);
      console.log('OTP sent to:', phoneNumber);
      // در اینجا باید کد ارسال OTP به سرور خود را اضافه کنید...
    } else {
      alert('لطفاً شماره تلفن و نام خانوادگی را وارد کنید.');
    }
  };

  const handleVerifyOtp = () => {
    if (otp) {
      console.log('OTP Verified:', otp);
      // در اینجا باید کد تایید OTP را به سرور خود ارسال کنید.
      onLoginSuccess();
    } else {
      alert('لطفاً کد یکبار مصرف را وارد کنید.');
    }
  };

  return (
    <div className="signup-container">
      {!otpSent ? (
        <div className="form-box">
          <h2>ثبت نام</h2>
    
          <input
            type="text"
            placeholder="نام خانوادگی"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
            <PhoneInput
            country={'ir'}
            value={phoneNumber}
            onChange={(value) => setPhoneNumber(value)}
            inputStyle={{
              width: '100%',
              borderRadius: '5px',
              borderColor: '#ccc',
              height: '40px',
            }}
          />
          <button onClick={handleSendOtp}>ادامه</button>
        </div>
      ) : (
        <div className="form-box">
          <h2>تایید کد یکبار مصرف</h2>
          <input
            type="text"
            placeholder="کد یکبار مصرف"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button onClick={handleVerifyOtp}>تایید</button>
        </div>
      )}
    </div>
  );
};

export default SignUpWithPhone;
