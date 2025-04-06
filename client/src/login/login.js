import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phoneNumber) {
      setMessage("لطفاً شماره تلفن را وارد کنید.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/send-otp", {
        phoneNumber,
      });

      if (response.status === 200) {
        setOtpSent(true);
        setTimer(60);
        setMessage("کد OTP با موفقیت ارسال شد.");
      } else {
        setMessage("مشکلی در ارسال کد پیش آمده است.");
      }
    } catch (error) {
      setMessage("مشکلی در ارسال کد رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("لطفاً کد OTP را وارد کنید.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/verify-otp", {
        phoneNumber,
        otp,
      });

      if (response.status === 200) {
        localStorage.setItem("authToken", response.data.token);
        setMessage("ورود با موفقیت انجام شد.");
        navigate("/rezevparstar/parstar");
      } else {
        setMessage("کد یک بار مصرف نادرست است.");
      }
    } catch (error) {
      setMessage("مشکلی در تایید کد رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer((prev) => prev - 1), 1000);
      return () => clearTimeout(countdown);
    }
  }, [timer]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      navigate("/rezevparstar/parstar");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4 text-gray-700">
          لطفاً شماره موبایل خود را برای ارسال کد فعال‌سازی وارد کنید.
        </h2>
        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">
          <PhoneInput
            country={"ir"}
            value={phoneNumber}
            onChange={setPhoneNumber}
            inputClass="w-full py-2 px-3 focus:outline-none"
            containerClass="flex-1"
          />
          <div className="bg-gray-200 px-3 py-2 flex items-center border-l">
            <span className="fi fi-ir"></span>
          </div>
        </div>
        <button
          className={`mt-4 w-full py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
          onClick={handleSendOtp}
          disabled={loading}
        >
          {loading ? "در حال ارسال..." : "ارسال کد یک بار مصرف"}
        </button>

        {otpSent && (
          <>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="کد یک بار مصرف را وارد کنید"
              className="w-full mt-4 py-2 px-3 border rounded-lg"
            />
            <button
              className={`mt-2 w-full py-2 rounded-lg ${loading ? "bg-gray-400" : "bg-green-500 text-white"}`}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? "در حال تایید..." : "تایید کد یک بار مصرف"}
            </button>
            {timer > 0 && <p className="text-center text-sm text-gray-600 mt-2">زمان باقی‌مانده: {timer} ثانیه</p>}
          </>
        )}

        {message && <p className="text-center text-sm text-red-500 mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default OtpLogin;
