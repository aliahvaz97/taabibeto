const mongoose = require('mongoose');

// مدل درخواست
const RequestSchema = new mongoose.Schema({
  requestCode: { type: String, required: true },
  nurseName: { type: String, required: true },
  status: { type: String, default: 'در حال بررسی' },
  elderId: { type: mongoose.Schema.Types.ObjectId, ref: 'ElderInfo' },
});

const Request = mongoose.model('Request', RequestSchema);
module.exports = Request;
