const bcrypt = require('bcrypt');
const OTP = require('../models/otp');
const axios = require('axios');

// تابع ارسال OTP
const sendOtp = async (phoneNumber) => {
  const otp = Math.floor(100 + Math.random() * 900).toString(); // تولید OTP تصادفی

  // هش کردن کد OTP قبل از ذخیره
  const hashedOtp = await bcrypt.hash(otp, 10);

  // ذخیره OTP در دیتابیس
  const newOtp = new OTP({
    phoneNumber,
    otp: hashedOtp,
  });

  try {
    await newOtp.save();
    console.log(`OTP for ${phoneNumber} saved successfully`);

    // ارسال پیامک
    await axios.post('https://rest.payamakapi.ir/api/v1/SMS/Send', {
      UserName: process.env.SMS_USERNAME,
      Password: process.env.SMS_PASSWORD,
      From: '10002147',
      To: phoneNumber,
      Message: `کد تأیید شما: ${otp}`,
    });

    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

// تابع تایید OTP
const verifyOtp = async (phoneNumber, enteredOtp) => {
  const storedOtp = await OTP.findOne({ phoneNumber });

  if (!storedOtp) {
    return { success: false, message: 'کد تایید یافت نشد.' };
  }

  // مقایسه OTP وارد شده با هش ذخیره شده
  const isMatch = await bcrypt.compare(enteredOtp, storedOtp.otp);

  if (!isMatch) {
    return { success: false, message: 'کد تایید نادرست است.' };
  }

  return { success: true, message: 'کد تایید صحیح است.' };
};

module.exports = { sendOtp, verifyOtp };
