const express = require('express');
const router = express.Router();

// مسیرهای مربوط به داشبورد پرستار
router.get('/', (req, res) => {
  res.json({ message: 'داشبورد پرستار' });
});

// مسیرهای اضافی پرستار
router.get('/schedule', (req, res) => {
  res.json({ message: 'برنامه کاری پرستار' });
});

module.exports = router;
