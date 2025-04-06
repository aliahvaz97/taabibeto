import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get("price");

    if (price) {
      setAmount(parseInt(price, 10));
    }

    // بارگذاری اسکریپت امنیتی زیبال
    const script = document.createElement("script");
    script.src = "https://zibal.ir/trust/scripts/zibal-trust-v4.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [location.search]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post("https://api.zibal.ir/v1/request", {
        merchant: "zibal",
        amount: amount * 10, // تبدیل تومان به ریال
        callbackUrl: "http://localhost:3000/callback", // بررسی وضعیت پرداخت
        description: "پرداخت بابت خدمات تستی",
        mobile: phone,
        email: email,
      });
  
      if (response.data.result === 100) {
        const trackId = response.data.trackId;
        window.location.href = `https://gateway.zibal.ir/start/${trackId}`;
      } else {
        console.error("خطا در دریافت لینک پرداخت:", response.data.message);
        alert("خطا در دریافت لینک پرداخت: " + response.data.message);
      }
    } catch (error) {
      console.error("خطا در درخواست پرداخت:", error);
      alert("مشکلی در برقراری ارتباط با درگاه پرداخت رخ داده است.");
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">صفحه پرداخت</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">نام و نام خانوادگی:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600">آدرس ایمیل:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600">شماره تماس:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-600">مبلغ پرداختی (تومان):</label>
            <input
              type="number"
              value={amount}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
          >
            پرداخت
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
