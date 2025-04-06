const mongoose = require('mongoose');

const nurseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  specialty: { type: String, required: true },
  experience: { type: String },
  image: { type: String },
  rating: { type: Number },
  price: { type: Number },
});

// اطمینان حاصل می‌کنیم که نام مجموعه‌ی MongoDB به درستی تنظیم شده است.
const Nurse = mongoose.model('Nurse', nurseSchema, "nurses"); // 'پرستار' نام مجموعه در پایگاه داده است.

module.exports = Nurse;
