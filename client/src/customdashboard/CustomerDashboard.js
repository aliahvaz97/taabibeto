import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CustomerDashboard = () => {
  const storedUserId = localStorage.getItem("userId");
  const { userId } = useParams();
  const finalUserId = userId || storedUserId;
  const navigate = useNavigate();
  const [elderInfo, setElderInfo] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!finalUserId) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [elderResponse, requestsResponse] = await Promise.all([
          axios.get(`/api/elder-info/${finalUserId}`),
          axios.get(`/api/requests?userId=${finalUserId}`),
        ]);

        setElderInfo(elderResponse.data || {});
        setRequests(Array.isArray(requestsResponse.data) ? requestsResponse.data : []);
      } catch (err) {
        setError("مشکلی در دریافت اطلاعات وجود دارد!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [finalUserId, navigate]);

  const cancelRequest = async (id) => {
    try {
      await axios.delete(`/api/requests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
    } catch (error) {
      console.error("خطا در لغو درخواست:", error);
    }
  };

  const createNewRequest = async () => {
    try {
      const newRequest = {
        requestCode: `#${Math.floor(Math.random() * 10000)}`,
        nurseName: "ناشناخته",
        elderId: elderInfo?._id || finalUserId,
        status: "در انتظار تأیید",
      };

      const response = await axios.post("/api/requests", newRequest);
      setRequests((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("خطا در ثبت درخواست جدید:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          داشبورد مشتری: {elderInfo?.name || "در حال بارگذاری..."}
        </h1>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          onClick={handleLogout}
        >
          خروج از حساب
        </button>
      </header>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : elderInfo ? (
        <div className="bg-blue-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-800">اطلاعات سالمند</h2>
          <p className="mt-2 text-gray-700">نام: {elderInfo.name}</p>
          <p className="mt-1 text-gray-700">سن: {elderInfo.age}</p>
          <p className="mt-1 text-gray-700">وضعیت: {elderInfo.condition}</p>
        </div>
      ) : (
        <p className="text-gray-500">اطلاعاتی برای نمایش وجود ندارد.</p>
      )}

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-gray-700">درخواست‌های فعال</h2>
        {requests.length === 0 ? (
          <p className="text-gray-500">درخواستی وجود ندارد.</p>
        ) : (
          <table className="w-full mt-3 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">کد درخواست</th>
                <th className="p-3">نام پرستار</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request._id} className="border-b">
                  <td className="p-3 text-center">{request.requestCode}</td>
                  <td className="p-3 text-center">{request.nurseName}</td>
                  <td className="p-3 text-center">{request.status}</td>
                  <td className="p-3 text-center">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                      onClick={() => cancelRequest(request._id)}
                    >
                      لغو درخواست
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="mt-6 text-center">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
          onClick={createNewRequest}
        >
          ثبت درخواست جدید
        </button>
      </section>
    </div>
  );
};

export default CustomerDashboard;