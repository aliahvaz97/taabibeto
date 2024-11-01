import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import './login.css';
import axios from 'axios';

const SignUpWithPhone = ({ onLoginSuccess }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState(''); // برای نمایش پیام‌ها
  const [loading, setLoading] = useState(false); // برای مدیریت وضعیت بارگذاری

  // تابع ارسال کد OTP
  const handleSendOtp = async () => {
    if (phoneNumber && lastName) {
      setLoading(true); // فعال کردن حالت بارگذاری
      try {
        const response = await axios.post('/api/send-otp', { phoneNumber, lastName });
        setOtpSent(true); // اگر ارسال موفق بود، وضعیت otpSent تغییر می‌کند
        setMessage(response.data.message); // پیام موفقیت را نمایش می‌دهد
      } catch (error) {
        console.error('Error sending OTP:', error);
        setMessage(error.response?.data?.message || 'خطا در ارسال کد تایید.'); // نمایش پیام خطا
      } finally {
        setLoading(false); // غیرفعال کردن حالت بارگذاری
      }
    } else {
      setMessage('لطفاً شماره تلفن و نام خانوادگی را وارد کنید.');
    }
  };

  // تابع تایید کد OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage('لطفاً کد یکبار مصرف را وارد کنید.');
      return;
    }

    if (!/^\d{6}$/.test(otp)) { // بررسی اینکه کد OTP دقیقاً 6 رقم باشد
      setMessage('کد یکبار مصرف باید 6 رقم باشد.');
      return;
    }

    setLoading(true); // فعال کردن حالت بارگذاری
    try {
      const response = await axios.post('/api/verify-otp', { phoneNumber, otp }); // ارسال درخواست تایید کد OTP
      setMessage(response.data.message); // نمایش پیام موفقیت پس از تایید
      onLoginSuccess(); // اگر تایید موفقیت‌آمیز بود، به تابع موفقیت ورود می‌فرستد
    } catch (error) {
      console.error('Error verifying OTP:', error); // لاگ خطا در کنسول
      setMessage(error.response?.data?.message || 'کد یکبار مصرف نامعتبر است.'); // نمایش پیام خطا در صورت بروز مشکل
    } finally {
      setLoading(false); // غیرفعال کردن حالت بارگذاری پس از اتمام عملیات
    }
  };

  return (
    <div className="signup-container">
      <div className="form-box">
        <h2>{otpSent ? 'تایید کد یکبار مصرف' : 'ثبت نام'}</h2>
        {message && <p className="message">{message}</p>} {/* نمایش پیام‌ها */}
        {!otpSent ? (
          <>
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
            <button onClick={handleSendOtp} disabled={loading}>
              {loading ? 'در حال ارسال...' : 'ادامه'}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="کد یکبار مصرف"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button onClick={handleVerifyOtp} disabled={loading}>
              {loading ? 'در حال تایید...' : 'تایید'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpWithPhone;
