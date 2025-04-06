import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="w-full px-6 lg:px-12 flex flex-wrap justify-between">
        
        {/* درباره تبیبتو */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-right">
          <h3 className="text-white text-xl font-bold mb-4">درباره تبیبتو</h3>
          <p className="text-white leading-relaxed">
            تبیبتو ارائه‌دهنده خدمات پزشکی آنلاین و پل ارتباطی میان کاربران با ارائه‌دهندگان خدمات پزشکی است. 
            با ما همراه باشید تا به بهبود سلامت و کیفیت زندگی کمک کنیم.
          </p>
        </div>

        {/* مجوزها */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-center">
          <h3 className="text-white text-xl font-bold mb-4">مجوزها</h3>
          <div className="flex justify-center space-x-4">
            <img src="license1.png" alt="مجوز ۱" className="w-16 h-16 object-contain bg-gray-800 p-2 rounded-lg" />
            <img src="license2.png" alt="مجوز ۲" className="w-16 h-16 object-contain bg-gray-800 p-2 rounded-lg" />
          </div>
        </div>

        {/* عضویت در خبرنامه */}
        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-right">
          <h3 className="text-white text-xl font-bold mb-4">عضویت در خبرنامه</h3>
          <p className="text-white mb-4">برای اطلاع از جدیدترین مقالات و کدهای تخفیف، ایمیل خود را وارد کنید:</p>
          <form className="flex flex-col">
            <input
              type="email"
              placeholder="ایمیل شما"
              required
              className="p-3 w-full rounded-lg border border-gray-700 bg-gray-900 text-white mb-3"
            />
            <button
              type="submit"
              className="bg-[#67DAFF] text-black p-3 rounded-lg hover:bg-[#5AC4E0] transition duration-200 font-bold"
            >
              عضویت در خبرنامه
            </button>
          </form>
        </div>
      </div>

      {/* حق نشر */}
      <div className="footer-bottom text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-white text-sm">حق نشر © {new Date().getFullYear()} تبیبتو. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
};

export default Footer;
