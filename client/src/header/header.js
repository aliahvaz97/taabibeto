import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userLastName, setUserLastName] = useState("");

  useEffect(() => {
    const lastName = localStorage.getItem("lastName");
    if (lastName) {
      setUserLastName(lastName);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white text-black flex justify-between items-center px-6 py-4 shadow-md relative font-vazir">
      {/* ورود / نام کاربر */}
      <div className="order-12 md:order-3">
        {userLastName ? (
          <Link to="/customdashboard/:userId" className="text-blue-500 font-semibold">
            {userLastName}
          </Link>
        ) : (
          <Link to="/login">
            <button className="border border-blue-400 text-blue-400 px-4 py-2 rounded-lg hover:bg-blue-100 transition order">
              ورود | ثبت نام
            </button>
          </Link>
        )}
      </div>

      {/* لوگو */}
      <div className="text-xl font-bold text-blue-500 mx-auto md:mx-0 order-2 md:order 10">
        <Link to="/">تبیبتو</Link>
      </div>

      {/* منوی اصلی */}
      <nav className="hidden md:flex space-x-6 text-gray-700 order-3 md:order-2">
        <Link to="#consultation" className="hover:text-blue-500">مشاوره پزشکی</Link>
        <Link to="#psychology" className="hover:text-blue-500">مشاوره روان‌شناسی</Link>
        <Link to="#pharmacy" className="hover:text-blue-500">داروخانه آنلاین</Link>
        <Link to="#homecare" className="hover:text-blue-500">پزشک و پرستار در منزل</Link>
        <Link to="#magazine" className="hover:text-blue-500">مجله سلامت</Link>
      </nav>

      {/* دکمه منوی همبرگری */}
      <button onClick={toggleMenu} className="text-black text-2xl md:hidden">
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* منوی موبایل */}
      <nav
        className={`fixed top-0 right-0 h-full bg-white text-black w-64 p-6 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out shadow-lg md:hidden`}
        style={{ zIndex: 100 }} // تنظیم z-index بالا برای منوی همبرگری
      >
        <button onClick={toggleMenu} className="absolute top-4 left-4 text-2xl">
          <FaTimes />
        </button>

        <ul className="mt-12 space-y-6 text-lg">
          <li><Link to="#consultation" className="block hover:text-blue-500">مشاوره پزشکی</Link></li>
          <li><Link to="#psychology" className="block hover:text-blue-500">مشاوره روان‌شناسی</Link></li>
          <li><Link to="#pharmacy" className="block hover:text-blue-500">داروخانه آنلاین</Link></li>
          <li><Link to="#homecare" className="block hover:text-blue-500">پزشک و پرستار در منزل</Link></li>
          <li><Link to="#magazine" className="block hover:text-blue-500">مجله سلامت</Link></li>
        </ul>
      </nav>

      {/* پس‌زمینه برای بستن منو هنگام کلیک */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={toggleMenu}
          style={{ zIndex: 50 }} // پس‌زمینه هم باید در لایه پایین‌تری باشد
        ></div>
      )}
    </header>
  );
};

export default Header;
