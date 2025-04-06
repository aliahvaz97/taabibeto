const express = require('express');
const router = express.Router();

// مسیرهای مربوط به داشبورد کاربر
router.get('/', (req, res) => {
  res.json({ message: 'داشبورد کاربر' });
});

// مسیرهای اضافی کاربر
router.get('/profile', (req, res) => {
  res.json({ message: 'پروفایل کاربر' });
});

module.exports = router;
