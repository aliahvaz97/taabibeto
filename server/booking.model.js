// server/booking.model.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address:{ type: String, required: true },
  description: { type: String, required: false },
  nationalId: { type: String, required: false },
  serviceType: { type: String, required: false }, 
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
