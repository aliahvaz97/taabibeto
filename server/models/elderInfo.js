const mongoose = require('mongoose');

// مدل اطلاعات سالمند
const ElderInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  condition: { type: String, required: true },
});

const ElderInfo = mongoose.model('ElderInfo', ElderInfoSchema);
module.exports = ElderInfo;
