import React from "react";
import { useNavigate } from "react-router-dom";

const FailurePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-red-600">پرداخت ناموفق!</h1>
        <p className="text-gray-700 mt-4">متأسفیم، پرداخت شما انجام نشد.</p>
        <p className="text-gray-500 text-sm">لطفاً مجدداً تلاش کنید یا با پشتیبانی تماس بگیرید.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default FailurePage;
