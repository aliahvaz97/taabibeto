import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CallbackPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const trackId = queryParams.get("trackId");
    const success = queryParams.get("success");

    if (!trackId) {
      navigate("/failure");
      return;
    }

    // ارسال درخواست به زیبال برای بررسی پرداخت
    axios
      .post("https://api.zibal.ir/v1/verify", {
        merchant: "zibal",
        trackId: trackId,
      })
      .then((response) => {
        if (response.data.result === 100) {
          navigate("/success");
        } else {
          navigate("/failure");
        }
      })
      .catch((error) => {
        console.error("خطا در بررسی وضعیت پرداخت:", error);
        navigate("/failure");
      });
  }, [location, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-700">در حال بررسی پرداخت...</h1>
        <p className="text-gray-500">لطفاً منتظر بمانید</p>
      </div>
    </div>
  );
};

export default CallbackPage;
