import React from "react";
import { Link } from "react-router-dom";
import image from "../HomeMedicalServices/taabibeto.png"; // مسیر تصویر

const MedicalServices = () => {
  return (
    <div className="container mx-auto p-12 bg-gray-50 rounded-xl shadow-lg rtl">
      {/* بخش تصویر */}
      <div className="image-container flex justify-center items-center mb-8">
        <img
          src={image}
          alt="Medical Services"
          className="w-4/5 max-w-md rounded-lg"
        />
      </div>

      {/* بخش متن */}
      <div className="text-container flex-1 pr-8 mb-8">
        <h1 className="title text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          خدمات پزشکی در منزل
        </h1>
        <p className="description text-lg sm:text-xl text-gray-600 mb-4 leading-relaxed">
          دسترسی آسان و به صورت ۲۴ ساعته به خدمات پزشکی در منزل، یکی از نیازهای
          مهم بیمارانی با شرایط خاص است. از آنجایی که حضور در مراکز درمانی در
          داخل شهرها به دلیل ترافیک و اتلاف وقت پرهزینه خواهد بود و همچنین حضور
          افراد مسن یا ناتوان و بیمارانی که توانایی مراجعه حضوری را ندارند با
          مشکلات بسیار همراه است، تبیبتو امکان استفاده از خدمات پزشکی در منزل
          را فراهم کرده است.
        </p>
        <p className="description text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
          در حال حاضر خدمات پزشکی تبیبتو شامل: پرستاری و تزریقات در منزل، تست
          کرونا در منزل، ویزیت پزشک عمومی و پزشک متخصص در منزل، خدمات فیزیوتراپی
          و رادیولوژی و سونوگرافی در منزل است. شما می‌توانید از طریق سایت
          تبیبتو نسبت به رزرو انواع مختلف خدمات پزشکی در منزل اقدام کنید.
        </p>

        {/* بخش دکمه‌ها */}
        <div className="buttons flex gap-4 flex-wrap justify-center">
          <Link
            to="./rezevparstar/parstar"
            className="reserve-button bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 text-center mb-4 sm:mb-0 w-full sm:w-auto"
          >
            همین الان رزرو کنید
          </Link>
          <a
            href="tel:+989227819056"
            className="support-button bg-teal-100 text-teal-600 py-3 px-6 rounded-lg shadow-md hover:bg-teal-200 transition duration-300 text-center w-full sm:w-auto"
          >
            تماس با پشتیبانی
          </a>
        </div>
      </div>
    </div>
  );
};

export default MedicalServices;
