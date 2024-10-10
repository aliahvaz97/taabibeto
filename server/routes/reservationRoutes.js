// routes/reservationRoutes.js

const express = require('express');
const router = express.Router();

// POST: ثبت رزرو جدید
router.post('/reserve', (req, res) => {
  const { name, age, phone, date, time, address, notes } = req.body;

  if (!name || !age || !phone || !date || !time || !address) {
    return res.status(400).json({ error: 'لطفا تمام فیلدهای اجباری را پر کنید' });
  }

  const newReservation = {
    id: new Date().getTime(), // ایجاد شناسه یکتا
    name,
    age,
    phone,
    date,
    time,
    address,
    notes,
  };

  // فرض کنید داده‌ها به دیتابیس اضافه شده‌اند
  return res.status(201).json({ message: 'رزرو با موفقیت ثبت شد', reservation: newReservation });
});

module.exports = router;
