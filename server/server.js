const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// تنظیمات اولیه سرور
const app = express();
app.use(cors());
app.use(express.json());

// اتصال به دیتابیس (فرض می‌کنیم از MongoDB استفاده می‌کنید)
mongoose.connect('mongodb://localhost:27017/taabibeto', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// مدل پرستار
const nurseSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availableTimes: [String],
});

const Nurse = mongoose.model('Nurse', nurseSchema);

// روت برای دریافت پرستارها
app.get('/api/nurses', async (req, res) => {
  const nurses = await Nurse.find();
  res.json(nurses);
});

// روت برای ارسال رزرو
app.post('/api/reserve', async (req, res) => {
  const { name, age, phone, date, time, address, notes } = req.body;
  
  // ذخیره‌سازی رزرو در دیتابیس (این بخش را می‌توانید براساس مدل خود پیاده‌سازی کنید)
  
  res.json({ message: 'رزرو با موفقیت انجام شد' });
});

// سرور را اجرا کنید
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
