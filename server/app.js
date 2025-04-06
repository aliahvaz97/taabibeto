const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const ElderInfo = require('./server/models/elderInfo');
const Request = require('./server/models/request');
const nurse = require("./nurse.model")

// وارد کردن روت‌ها و کنترلر OTP
const otpRoutes = require('./routes/otpRoutes');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// تعریف مدل رزرو
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  serviceType: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String },
  nationalId: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);

app.use(cors());
app.use(bodyParser.json());

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

// روت ذخیره رزرو
app.post('/api/bookings', async (req, res) => {
  const { name, phoneNumber, serviceType, city, description, nationalId } = req.body;

  if (!name || !phoneNumber || !serviceType || !city) {
    return res.status(400).json({ message: 'تمامی فیلدهای ضروری را پر کنید.' });
  }

  try {
    const newBooking = new Booking({
      name,
      phoneNumber,
      serviceType,
      city,
      description,
      nationalId,
    });

    await newBooking.save();

    console.log('رزرو جدید ثبت شد:', newBooking);
    res.status(201).json({ message: 'رزرو با موفقیت ثبت شد.', booking: newBooking });
  } catch (error) {
    console.error('Error saving booking:', error.message);
    res.status(500).json({ message: 'خطا در ذخیره رزرو.' });
  }
});

// روت دریافت لیست رزروها
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message);
    res.status(500).json({ message: 'خطا در دریافت رزروها.' });
  }
});

// روت داشبورد (نمایش لیست رزروها به صورت HTML)
app.get('/dashboard', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    const dashboardHTML = `...`; // همان HTML داشبورد شما
    res.send(dashboardHTML);
  } catch (error) {
    console.error('Error generating dashboard:', error.message);
    res.status(500).send('خطا در بارگذاری داشبورد.');
  }
});
app.post('/api/elder-info', async (req, res) => {
  const { name, age, condition } = req.body;

  if (!name || !age || !condition) {
    return res.status(400).json({ message: 'تمامی فیلدهای ضروری را پر کنید.' });
  }

  try {
    const elder = new ElderInfo({ name, age, condition });
    await elder.save();
    res.status(201).json({ message: 'اطلاعات سالمند با موفقیت ذخیره شد.', elder });
  } catch (error) {
    console.error('Error in /api/elder-info:', error.message);
    res.status(500).json({ message: 'خطا در ذخیره اطلاعات سالمند.', error: error.message });
  }
});
app.post('/api/requests', async (req, res) => {
  const { requestCode, nurseName, elderId } = req.body;

  if (!requestCode || !nurseName || !elderId) {
    return res.status(400).json({ message: 'تمامی فیلدهای ضروری را پر کنید.' });
  }

  try {
    const request = new Request({ requestCode, nurseName, elderId });
    await request.save();
    res.status(201).json({ message: 'درخواست با موفقیت ذخیره شد.', request });
  } catch (error) {
    console.error('Error in /api/requests:', error.message);
    res.status(500).json({ message: 'خطا در ذخیره درخواست.', error: error.message });
  }
});
app.get('/api/elder-info/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const elder = await ElderInfo.findById(id);
    if (!elder) {
      return res.status(404).json({ message: 'اطلاعات سالمند یافت نشد.' });
    }
    res.status(200).json(elder);
  } catch (error) {
    console.error('Error in /api/elder-info/:id:', error.message);
    res.status(500).json({ message: 'خطا در دریافت اطلاعات سالمند.', error: error.message });
  }
});
app.get('/api/requests', async (req, res) => {
  try {
    const requests = await Request.find().populate('elderId');
    res.status(200).json(requests);
  } catch (error) {
    console.error('Error in /api/requests:', error.message);
    res.status(500).json({ message: 'خطا در دریافت درخواست‌ها.', error: error.message });
  }
});


// استفاده از روت‌های OTP
app.use('/api/otp', otpRoutes);

// سرو کردن فایل‌های استاتیک React
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
