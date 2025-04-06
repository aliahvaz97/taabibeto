const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  lastName: { type: String, required: false }, // اختیاری کردن lastName
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
