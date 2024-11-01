// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// اتصال به MongoDB
mongoose.connect('mongodb://localhost:27017/bookingDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

// تعریف مدل رزرو
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  address: { type: String, required: true },
  notes: { type: String }
});

const Booking = mongoose.model('Booking', bookingSchema);

// API برای دریافت اطلاعات فرم و ذخیره در پایگاه داده
app.post('/api/bookings', async (req, res) => {
  try {
    const bookingData = req.body;
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).send({ message: 'Booking saved successfully!' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to save booking' });
  }
});

// راه‌اندازی سرور
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
