import React from "react";
import "./whytaabibeto.css"; // فایل CSS برای استایل‌ها

const WhySnappDoctor = () => {
  return (
    <div className="why-snapp-doctor">
      <h2 className="title">چرا تبیبتو؟</h2>
      <div className="features">
        <div className="feature">
          <h3>مشاوره با پزشکان متخصص و متعهد</h3>
          <p>مشاوره سلامتی با بهترین پزشکان ایران و مورد تایید ر</p>
        </div>
        <div className="feature">
          <h3>دسترسی در هر زمان و مکان</h3>
          <p>در هر زمان از شبانه روز، حتی ایام تعطیل به طور مستقیم با پزشکان گفتگو کنید</p>
        </div>
        <div className="feature">
          <h3>حفظ حریم شخصی</h3>
          <p>ما در مشاوره پزشکی تبیبتو به خوبی از اطلاعات شما محافظت می‌کنیم.</p>
        </div>
      </div>
    </div>
  );
};

export default WhySnappDoctor;
