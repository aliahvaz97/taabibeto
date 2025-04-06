const mongoose = require("mongoose");

// تعریف اسکیمای تایید OTP
const UserOTPVerificationSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true, // شماره تلفن اجباری است
    index: true, // ایجاد ایندکس برای جستجوی سریع‌تر
  },
  otpHash: { 
    type: String,
    required: true, // هش OTP
  },
  createdAt: {
    type: Date,
    default: Date.now, // زمان ایجاد رکورد به‌صورت پیش‌فرض زمان فعلی را ثبت می‌کند
  },
  expiresAt: {
    type: Date,
    required: true, // تاریخ انقضای OTP باید مشخص باشد
  },
  failedAttempts: {
    type: Number,
    default: 0, // تعداد تلاش‌های ناموفق
  }
});

// تبدیل اسکیمای بالا به یک مدل
const UserOTPVerification = mongoose.model("UserOTPVerification", UserOTPVerificationSchema);

module.exports = UserOTPVerification;
