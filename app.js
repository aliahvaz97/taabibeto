const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcrypt');
const https = require('https');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const OTP = require('./server/otp.model');
const User = require('./server/user.model');
const Booking = require('./server/booking.model');

const path = require('path');
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware برای چک کردن توکن JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // استخراج توکن از هدر Authorization

  if (!token) {
    return res.status(401).json({ message: 'توکن معتبر نیست یا وجود ندارد' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'توکن معتبر نیست' });
    }

    req.user = user; // ذخیره اطلاعات کاربر در درخواست
    next(); // ادامه به درخواست بعدی
  });
};

// استفاده از middleware برای صفحات محافظت شده
app.get('/api/dashboard', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'خوش آمدید به داشبورد', user: req.user });
});


// اتصال به MongoDB
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('✅ اتصال موفق به MongoDB!');
  })
  .catch((err) => {
    console.error('❌ خطا در اتصال به MongoDB:', err.message);
    setTimeout(() => process.exit(1), 5000);
  });

// محدودیت درخواست‌های OTP (3 درخواست در 15 دقیقه)
const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقیقه
  max: 3, // حداکثر 3 درخواست
  message: 'لطفاً کمی صبر کنید و دوباره تلاش کنید.',
});

// تابع ارسال پیامک
const sendSms = async (phoneNumber, message) => {
  console.log(`در حال ارسال پیامک به شماره ${phoneNumber}`);
  const options = {
    hostname: 'rest.payamakapi.ir',
    port: 443,
    path: '/api/v1/SMS/Send',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const jsonResponse = JSON.parse(data);
          if (res.statusCode === 200 && jsonResponse.Status === true) {
            console.log(`پیامک با موفقیت ارسال شد: ${message}`);
            resolve(jsonResponse);
          } else {
            console.error(`خطا در ارسال پیامک: ${JSON.stringify(jsonResponse)}`);
            reject(new Error('خطا در ارسال پیامک.'));
          }
        } catch (err) {
          console.error('پاسخ پیامک معتبر نیست:', err);
          reject(new Error('پاسخ پیامک معتبر نیست.'));
        }
      });
    });

    req.on('error', (error) => {
      console.error('خطا در اتصال به سرویس پیامک:', error);
      reject(new Error('خطا در اتصال به سرویس پیامک.'));
    });

    const payload = JSON.stringify({
      UserName: process.env.SMS_USERNAME,
      Password: process.env.SMS_PASSWORD,
      From: process.env.SMS_FROM,
      To: phoneNumber,
      Message: message,
    });

    req.write(payload);
    req.end();
  });
};

// ارسال OTP
app.post('/api/send-otp', otpLimiter, async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    console.warn('شماره تلفن الزامی است.');
    return res.status(400).json({ message: 'شماره تلفن الزامی است.' });
  }

  console.log(`در حال ارسال کد تایید به شماره: ${phoneNumber}`);
  const normalizedPhoneNumber = phoneNumber.replace(/\+/g, '').trim();
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // تولید کد OTP
  const message = `سلام خوش آمدید کد ورود شما ${otp} تبیبتو پلتفرمی برای تو`;

  try {
    await sendSms(normalizedPhoneNumber, message); // ارسال پیامک OTP

    const hashedOtp = await bcrypt.hash(otp, 10); // هش کردن کد OTP
    console.log(`کد تایید هش شده: ${hashedOtp}`);
    await OTP.findOneAndUpdate(
      { phoneNumber: normalizedPhoneNumber },
      { otp: hashedOtp, createdAt: new Date() },
      { upsert: true, new: true } // ایجاد یا بروزرسانی رکورد OTP
    );

    console.log('کد تایید ارسال شد.');
    res.status(200).json({ message: 'کد تایید ارسال شد.' });
  } catch (error) {
    console.error('خطا در ارسال کد تایید:', error);
    res.status(500).json({ message: 'خطا در ارسال کد تایید.' });
  }
});

// تأیید OTP و ورود
// تأیید OTP و ورود
app.post('/api/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'شماره تلفن و کد OTP الزامی است.' });
  }

  const normalizedPhoneNumber = phoneNumber.replace(/\+/g, '').trim();

  try {
    const record = await OTP.findOne({ phoneNumber: normalizedPhoneNumber });

    if (!record) {
      return res.status(400).json({ message: 'کد تایید یافت نشد.' });
    }

    if (Date.now() - new Date(record.createdAt).getTime() > 5 * 60 * 1000) {
      return res.status(400).json({ message: 'کد تایید منقضی شده است.' });
    }

    const isMatch = await bcrypt.compare(otp, record.otp);
    if (!isMatch) {
      return res.status(400).json({ message: 'کد تایید نادرست است.' });
    }

    await OTP.deleteOne({ phoneNumber: normalizedPhoneNumber });

    let user = await User.findOne({ phoneNumber: normalizedPhoneNumber });
    if (!user) {
      user = new User({ phoneNumber: normalizedPhoneNumber });
      await user.save();
    }

    // بررسی مقدار JWT_SECRET قبل از استفاده
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET تنظیم نشده است!');
      return res.status(500).json({ message: 'خطا: متغیر JWT_SECRET تنظیم نشده است.' });
    }

    // تولید توکن JWT
    const token = jwt.sign({ phoneNumber: user.phoneNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'ورود با موفقیت انجام شد.', token });

  } catch (error) {
    console.error('خطا در تأیید کد OTP:', error);
    res.status(500).json({ message: 'خطا در تأیید کد OTP.' });
  }
});


// ** مسیرهای دیگر ** //
app.post('/api/reservations', async (req, res) => {
  const { name, phone, address, description, nationalId } = req.body;

  if (!name || !phone || !address) {
    console.warn('تمامی فیلدهای ضروری را پر کنید.');
    return res.status(400).json({ message: 'تمامی فیلدهای ضروری را پر کنید.' });
  }

  try {
    const newBooking = new Booking({ name, phone, address, description, nationalId });
    await newBooking.save();
    console.log('رزرو با موفقیت ذخیره شد.');
    res.status(201).json({ message: 'رزرو با موفقیت ذخیره شد.' });
  } catch (error) {
    console.error('❌ خطا در ذخیره رزرو:', error.message);
    res.status(500).json({ message: 'خطا در ذخیره رزرو.' });
  }
});
const Nurse = require('./server/nurse.model'); // اضافه کردن مدل Nurse

// مسیر برای دریافت لیست پرستاران
app.get('/api/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find(); // گرفتن تمام پرستاران از دیتابیس
    res.status(200).json(nurses); // ارسال لیست پرستاران به کلاینت
  } catch (error) {
    console.error('❌ خطا در گرفتن اطلاعات پرستاران:', error.message);
    res.status(500).json({ message: 'خطا در گرفتن اطلاعات پرستاران.' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    res.json({ lastName: user.lastName });
  } catch (error) {
    console.error("خطا در دریافت اطلاعات کاربر:", error.message);
    res.status(500).json({ message: "خطا در دریافت اطلاعات کاربر." });
  }
});



// مسیر فایل‌های استاتیک
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
  console.log('درخواست به مسیر استاتیک: ' + req.originalUrl);
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ** راه‌اندازی سرور ** //
app.listen(port, () => {
  console.log(`🚀 سرور در حال اجرا است: http://localhost:${port}`);
});
