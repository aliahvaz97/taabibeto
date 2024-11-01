const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let otpStorage = {}; // ذخیره موقت OTP

// تابع ارسال SMS
const sendSms = async (phoneNumber, message) => {
  try {
    const response = await axios.post('https://rest.payamakapi.ir/api/v1/SMS/Send', {
      UserName: process.env.SMS_USERNAME,
      Password: process.env.SMS_PASSWORD,
      From: '10002147',
      To: phoneNumber,
      Message: message,
    });
    console.log('SMS sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending SMS:', error.response ? error.response.data : error.message);
    throw new Error('خطا در ارسال پیامک.');
  }
};

// روت برای ارسال OTP
app.post('/api/send-otp', async (req, res) => {
  const { phoneNumber, lastName } = req.body;

  if (!phoneNumber || !lastName) {
    return res.status(400).json({ message: 'شماره تلفن و نام خانوادگی الزامی است.' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `	
  سلام خوش آمدید کد ورود شما${otp} تبیبتو پلتفرمی برای تو`;

  try {
    await sendSms(phoneNumber, message);
    
    otpStorage[phoneNumber] = otp;
    setTimeout(() => {
      delete otpStorage[phoneNumber]; // حذف OTP بعد از یک دقیقه
    }, 60 * 1000);

    res.status(200).json({ message: 'کد تایید به شماره تلفن ارسال شد.' });
  } catch (error) {
    return res.status(500).json({ message: 'خطا در ارسال کد تایید.' });
  }
});

// روت برای تأیید کد OTP
app.post('/api/verify-otp', (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'شماره تلفن و کد OTP الزامی است.' });
  }

  if (otpStorage[phoneNumber]) {
    if (otpStorage[phoneNumber] === otp) {
      delete otpStorage[phoneNumber]; // حذف OTP بعد از تأیید
      return res.status(200).json({ message: 'ورود موفقیت‌آمیز بود.' });
    } else {
      return res.status(400).json({ message: 'کد تایید معتبر نیست.' });
    }
  } else {
    return res.status(400).json({ message: 'کد تایید منقضی شده است.' });
  }
});

// روت برای دریافت و ذخیره اطلاعات رزرو
app.post('/api/bookings', async (req, res) => {
  const bookingData = req.body;
  console.log('اطلاعات رزرو دریافتی:', bookingData);
  res.status(201).json({ message: 'رزرو با موفقیت ذخیره شد.' });
});

// روت برای تایید پرداخت
app.post('/api/verify-payment', async (req, res) => {
  const { trackId } = req.body;

  try {
    const response = await axios.post('https://api.zibal.ir/v1/verify', {
      merchant: 'aa437cc147d74e0c881896462f67fe1b',
      trackId: trackId
    });

    if (response.data.result === 100) {
      res.status(200).json({ message: 'پرداخت موفقیت‌آمیز بود.' });
    } else {
      res.status(400).json({ message: 'پرداخت ناموفق بود.', error: response.data.message });
    }
  } catch (error) {
    console.error('خطا در تایید پرداخت:', error);
    res.status(500).json({ message: 'خطا در تایید پرداخت.' });
  }
});

// سرو کردن فایل‌های استاتیک React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
