import { BarChart2, Users, CheckCircle, XCircle, Wallet } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white p-5 hidden lg:block">
        <h2 className="text-xl font-bold mb-6 text-right">تبیبتو</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-2 text-blue-200">
            <Users size={20} /> <span>درخواست‌ها</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-blue-200">
            <Wallet size={20} /> <span>پرداخت‌ها</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-blue-200">
            <BarChart2 size={20} /> <span>گزارش‌ها</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4 text-right text-blue-900">داشبورد مشتری</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 flex items-center space-x-4 rounded-lg shadow-xl">
            <CheckCircle className="text-green-500" size={32} />
            <div>
              <p className="text-lg font-semibold text-right">درخواست‌های فعال</p>
              <p className="text-2xl text-right">12</p>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center space-x-4 rounded-lg shadow-xl">
            <XCircle className="text-red-500" size={32} />
            <div>
              <p className="text-lg font-semibold text-right">درخواست‌های لغو شده</p>
              <p className="text-2xl text-right">3</p>
            </div>
          </div>
          <div className="bg-white p-4 flex items-center space-x-4 rounded-lg shadow-xl">
            <Wallet className="text-blue-500" size={32} />
            <div>
              <p className="text-lg font-semibold text-right">موجودی کیف پول</p>
              <p className="text-2xl text-right">500,000 تومان</p>
            </div>
          </div>
        </div>

        {/* Request History */}
        <div className="mt-6 bg-white p-4 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4 text-right text-blue-900">لیست درخواست‌ها</h2>
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">تاریخ</th>
                <th className="p-2">وضعیت</th>
                <th className="p-2">مبلغ</th>
                <th className="p-2">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">1402/11/10</td>
                <td className="p-2 text-green-600">تکمیل شده</td>
                <td className="p-2">250,000 تومان</td>
                <td className="p-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    جزئیات
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">1402/11/08</td>
                <td className="p-2 text-yellow-500">در حال بررسی</td>
                <td className="p-2">320,000 تومان</td>
                <td className="p-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    جزئیات
                  </button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2">1402/11/05</td>
                <td className="p-2 text-red-500">لغو شده</td>
                <td className="p-2">150,000 تومان</td>
                <td className="p-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    جزئیات
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
