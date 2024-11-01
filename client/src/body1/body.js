import React from "react";
import { Link } from "react-router-dom";
import "./MedicalServices.css"; // وارد کردن فایل CSS
import image from "../HomeMedicalServices/taabibeto.png"; // مسیر تصویر

const MedicalServices = () => {
  return (
    <div className="container">
      {/* بخش تصویر */}
      <div className="image-container">
        <img
          src={image}
          alt="Medical Services"
          className="image"
        />
      </div>

      {/* بخش متن */}
      <div className="text-container">
        <h1 className="title">خدمات پزشکی در منزل</h1>
        <p className="description">
          دسترسی آسان و به صورت ۲۴ ساعته به خدمات پزشکی در منزل، یکی از نیازهای مهم بیمارانی با شرایط خاص است. از آنجایی که حضور در مراکز درمانی در داخل شهرها به دلیل ترافیک و اتلاف وقت پرهزینه خواهد بود و همچنین حضور افراد مسن یا ناتوان و بیمارانی که توانایی مراجعه حضوری را ندارند با مشکلات بسیار همراه است، تبیبتو امکان استفاده از خدمات پزشکی در منزل را فراهم کرده است.
        </p>
        <p className="description">
          در حال حاضر خدمات پزشکی تبیبتو شامل: پرستاری و تزریقات در منزل، تست کرونا در منزل، ویزیت پزشک عمومی و پزشک متخصص در منزل، خدمات فیزیوتراپی و رادیولوژی و سونوگرافی در منزل است. شما می‌توانید از طریق سایت تبیبتو نسبت به رزرو انواع مختلف خدمات پزشکی در منزل اقدام کنید.
        </p>

        {/* بخش دکمه‌ها */}
        <div className="buttons">
  <Link to="./rezevparstar/parstar" className="reserve-button">
    همین الان رزرو کنید
  </Link>
  <a href="tel:+989227819056" className="support-button">
    تماس با پشتیبانی
  </a>
</div>

      </div>
    </div>
  );
};

export default MedicalServices;
