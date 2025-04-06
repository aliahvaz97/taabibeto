import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-green-600">پرداخت موفق!</h1>
        <p className="text-gray-700 mt-4">پرداخت شما با موفقیت انجام شد.</p>
        <p className="text-gray-500 text-sm">کد پیگیری خود را نزد خود نگه دارید.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-all"
        >
          بازگشت به صفحه اصلی
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
