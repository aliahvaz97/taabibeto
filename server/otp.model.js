const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // کد پس از 5 دقیقه حذف می‌شود
  
});

module.exports = mongoose.model('OTP', otpSchema);
