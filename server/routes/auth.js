const express = require('express');
const request = require('request');

const router = express.Router();
const otpStore = {}; // برای ذخیره OTP ها

const sendOtp = (phoneNumber, otp) => {
    const options = {
        method: 'POST',
        url: 'https://rest.payamakapi.ir/api/v1/SMS/Send',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserName: "09160046339",
            Password: "298823",
            From: "10002147",
            To: phoneNumber,
            Message: `کد بازیابی شما: ${otp}`,
        }),
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                return reject('خطا در ارسال کد تایید');
            }

            const jsonResponse = JSON.parse(body);
            if (jsonResponse.IsSuccess) {
                resolve(`OTP ${otp} به ${phoneNumber} ارسال شد`);
            } else {
                reject('خطا در ارسال کد تایید');
            }
        });
    });
};

// مسیر ارسال OTP
router.post('/send-otp', async (req, res) => {
    try {
        const { phoneNumber, lastName } = req.body;
        const otp = Math.floor(100000 + Math.random() * 900000); // تولید یک OTP تصادفی ۶ رقمی

        const message = await sendOtp(phoneNumber, otp);
        console.log(message);
        otpStore[phoneNumber] = otp; // ذخیره OTP برای تأیید
        res.status(200).json({ message: 'OTP با موفقیت ارسال شد.' });
    } catch (error) {
        console.error("Server Error:", error);
        res.status(500).json({ message: 'خطای داخلی سرور', errorDetails: error.message });
    }
});

// مسیر تأیید OTP
router.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    if (otpStore[phoneNumber] && otpStore[phoneNumber] === otp) {
        delete otpStore[phoneNumber]; // حذف OTP پس از تأیید
        return res.json({ message: 'کد تایید شد.' });
    } else {
        return res.status(400).json({ message: 'کد تایید نامعتبر است.' });
    }
});

module.exports = router; // صادرات روتر
