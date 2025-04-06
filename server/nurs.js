const express = require('express'); // وارد کردن express
const mongoose = require('mongoose'); // وارد کردن mongoose
const Nurse = require('./nurse.model'); // مدل پرستار
const router = express.Router(); // ساخت Router

// اتصال به پایگاه داده MongoDB
mongoose.connect('mongodb+srv://vipimam79:Ama2022azad@cluster0.g9sum.mongodb.net/taabibeto?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ اتصال به پایگاه داده موفقیت‌آمیز بود');
  })
  .catch((err) => {
    console.error('❌ خطا در اتصال به پایگاه داده:', err.message);
  });

// تعریف مسیر GET برای دریافت پرستاران
router.get('/api/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find(); // تمام پرستاران را از دیتابیس پیدا کنید
    res.json(nurses); // داده‌ها را به فرانت‌اند ارسال کنید
  } catch (err) {
    console.error('❌ خطا در دریافت پرستاران:', err.message);
    res.status(500).json({ error: 'خطا در سرور' });
  }
});

// اضافه کردن یک پرستار جدید به صورت دستی
router.post('/api/nurses', async (req, res) => {
  try {
    const newNurse = new Nurse({
      name: 'مریم محمدی', // نام پرستار جدید
      phoneNumber: '+989012345678', // شماره تلفن پرستار
      age: 28, // سن پرستار
      specialty: 'مراقبت از نوزادان', // تخصص پرستار
    });

    // ذخیره پرستار در پایگاه داده
    await newNurse.save();
    res.status(201).json(newNurse); // ارسال پرستار جدید به عنوان پاسخ
  } catch (err) {
    console.error('❌ خطا در ذخیره پرستار:', err.message);
    res.status(500).json({ error: 'خطا در ذخیره پرستار' });
  }
});

// اکسپورت کردن Router
module.exports = router;
