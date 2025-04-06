const express = require('express');
const { sendOtp, verifyOtp } = require('../controllers/otpController');

const router = express.Router();

// روت ارسال OTP
router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'شماره تلفن مورد نیاز است.' });
  }

  try {
    await sendOtp(phoneNumber);
    res.status(200).json({ message: 'کد تایید ارسال شد.' });
  } catch (error) {
    res.status(500).json({ message: 'خطا در ارسال کد تایید.' });
  }
});

// روت تایید OTP
router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'شماره تلفن و کد تایید مورد نیاز است.' });
  }

  try {
    const result = await verifyOtp(phoneNumber, otp);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(400).json({ message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: 'خطا در تایید کد تایید.' });
  }
});

module.exports = router;
