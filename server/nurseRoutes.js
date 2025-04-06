// server/nurseRoutes.js
const express = require('express');
const router = express.Router();
const Nurse = require('./nurse.model');

// مسیر برای دریافت لیست پرستاران
router.get('/nurses', async (req, res) => {
  try {
    const nurses = await Nurse.find();
    res.status(200).json(nurses);
  } catch (error) {
    console.error('❌ Error in /api/nurses:', error.message);
    res.status(500).json({ message: 'خطا در بارگذاری پرستاران.' });
  }
});

module.exports = router;
