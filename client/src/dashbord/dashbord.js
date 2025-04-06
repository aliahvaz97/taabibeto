import React from "react";
import "./UserDashboard.css";

const NurseDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* منوی کناری */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>پرستار من</h2>
        </div>
        <ul className="sidebar-menu">
          <li className="menu-item active">داشبورد</li>
          <li className="menu-item">بیماران</li>
          <li className="menu-item">گزارش‌ها</li>
          <li className="menu-item">گفتگوها</li>
          <li className="menu-item">تنظیمات</li>
        </ul>
      </aside>

      {/* محتوای اصلی */}
      <main className="main-content">
        {/* نمای کلی */}
        <section className="overview">
          <div className="overview-item">
            <h3>بیماران</h3>
            <p>35 نفر</p>
          </div>
          <div className="overview-item">
            <h3>گزارش‌ها</h3>
            <p>12 مورد</p>
          </div>
          <div className="overview-item">
            <h3>اورژانسی</h3>
            <p>5 مورد</p>
          </div>
          <div className="overview-item">
            <h3>رزروها</h3>
            <p>20 مورد</p>
          </div>
        </section>

        {/* رزروهای روزانه */}
        <section className="daily-reservations">
          <h2>رزروهای روزانه</h2>
          <div className="reservations-grid">
            {["شنبه", "یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه"].map((day, index) => (
              <div key={index} className="reservation-item">
                <h4>{day}</h4>
                <p>09:00-12:00</p>
                <p>پرستار: فاطمه رضایی</p>
              </div>
            ))}
          </div>
        </section>

        {/* لیست بیماران */}
        <section className="patient-list">
          <h2>لیست بیماران</h2>
          <table>
            <thead>
              <tr>
                <th>کد بیمار</th>
                <th>نام بیمار</th>
                <th>سن</th>
                <th>وضعیت</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#12501</td>
                <td>علی احمدی</td>
                <td>75 سال</td>
                <td>فعال</td>
              </tr>
              <tr>
                <td>#12502</td>
                <td>زهرا قاسمی</td>
                <td>80 سال</td>
                <td>در انتظار</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>

      {/* بخش مشاوره‌های برنامه‌ریزی شده */}
      <aside className="right-panel">
        <div className="profile-card">
          <h3>پرستار: مریم کاظمی</h3>
          <p>8 سال سابقه</p>
        </div>
        <section className="consultations">
          <h2>مشاوره‌های برنامه‌ریزی‌شده</h2>
          <ul>
            <li>
              <span>بیمار: علی احمدی</span>
              <span>10:00 - 11:30</span>
              <button className="accept-btn">تایید</button>
              <button className="reject-btn">رد</button>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  );
};

export default NurseDashboard;
