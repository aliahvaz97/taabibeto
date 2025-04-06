import os
import requests
import asyncio
import aiohttp
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, CallbackContext
import nest_asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# تنظیمات logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# استفاده از nest_asyncio
nest_asyncio.apply()

# دریافت توکن‌ها از متغیرهای محیطی
TELEGRAM_BOT_TOKEN = "7653591915:AAG0qPTh90zXoZOLSbGMz57XqjP18I7dfjU"  # توکن ربات تلگرام
TOROB_API_URL = "https://api.torob.com/v4/base-product/search/?q="

# ایجاد دایرکتوری موقت برای ذخیره عکس‌ها
if not os.path.exists('temp'):
    os.makedirs('temp')

async def fetch_cheapest_product(search_term: str) -> dict:
    """ جستجوی محصول در ترب و یافتن ارزان‌ترین قیمت """
    logger.info(f"جستجو در ترب برای محصول: {search_term}")
    url = f"{TOROB_API_URL}{requests.utils.quote(search_term)}"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            try:
                data = await response.json()
                if not data or "results" not in data or not data["results"]:
                    logger.warning("محصولی یافت نشد.")
                    return None
                
                cheapest_product = None
                lowest_price = float("inf")

                for product in data["results"]:
                    price_text = product.get("price_text", "0").replace(",", "")
                    try:
                        price = int(price_text)
                    except ValueError:
                        continue
                    
                    if price < lowest_price:
                        lowest_price = price
                        cheapest_product = {
                            "title": product.get("name1", "بدون نام"),
                            "price": price,
                            "image_url": product.get("image_url"),
                            "link": f"https://torob.com/p/{product['id']}" if "id" in product else None
                        }
                
                logger.info(f"محصول ارزان‌تر پیدا شد: {cheapest_product['title']} - {cheapest_product['price']} تومان")
                return cheapest_product
            except Exception as e:
                logger.error(f"خطا در دریافت اطلاعات از ترب: {e}")
                return None

def process_image_with_google_lens(image_path: str) -> str:
    """ پردازش تصویر با Google Lens و بازگشت نام محصول """
    logger.info(f"در حال پردازش تصویر: {image_path}")
    
    # غیرفعال کردن حالت headless برای مشاهده مرورگر
    options = Options()
    # اگر می‌خواهید مرورگر را مشاهده کنید، خط زیر را حذف کنید:
    # options.add_argument("--headless")  # حذف این خط برای مشاهده مرورگر
    
    # در اینجا گزینه دیگری برای باز کردن پنجره مرورگر به صورت عادی اضافه کرده‌ایم.
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    driver.get("https://lens.google/")

    # انتظار برای بارگذاری کامل صفحه و پیدا کردن دکمه آپلود تصویر
    try:
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, '//*[@aria-label="Search by image"]'))
        )

        logger.info("دکمه آپلود تصویر پیدا شد، در حال کلیک روی آن...")
        upload_button = driver.find_element(By.XPATH, '//*[@aria-label="Search by image"]')
        upload_button.click()

        # منتظر بارگذاری فایل و آپلود تصویر
        upload_input = driver.find_element(By.XPATH, '//input[@type="file"]')
        upload_input.send_keys(image_path)

        logger.info("تصویر آپلود شد، در حال پردازش تصویر...")
        # منتظر می‌مانیم تا تصویر پردازش شود
        time.sleep(5)

        # استخراج نام محصول از نتایج Google Lens
        product_name = ""
        try:
            result_element = driver.find_element(By.XPATH, '//*[@class="Q4LuWd"]/div[1]/div[1]/div/h3/span')
            product_name = result_element.text
            logger.info(f"نام محصول از Google Lens دریافت شد: {product_name}")
        except Exception as e:
            logger.warning(f"خطا در دریافت نام محصول از Google Lens: {e}")

    except Exception as e:
        logger.error(f"خطا در پردازش تصویر: {e}")
        product_name = ""

    driver.quit()
    return product_name

async def handle_photo(update: Update, context: CallbackContext):
    """ دریافت عکس از کاربر، پردازش آن در Google Lens و ارسال نتیجه """
    user_id = update.message.from_user.id
    photo = update.message.photo[-1]
    file = await context.bot.get_file(photo.file_id)
    file_path = f'./temp/{photo.file_id}.jpg'

    await context.bot.send_message(chat_id=user_id, text="📷 در حال پردازش تصویر...")

    try:
        await file.download_to_drive(file_path)

        # پردازش تصویر در Google Lens برای دریافت نام محصول
        search_term = process_image_with_google_lens(file_path)

        if search_term:
            logger.info(f"در حال جستجو برای نام محصول: {search_term}")
            await context.bot.send_message(chat_id=user_id, text=f"🔍 جستجو در ترب برای: {search_term}...")

            # دریافت اطلاعات محصول از ترب
            cheapest_product = await fetch_cheapest_product(search_term)

            if cheapest_product:
                text = f"""✅ *محصول مشابه یافت شد!*
📌 {cheapest_product['title']}
💰 {cheapest_product['price']} تومان"""
                
                buttons = [[InlineKeyboardButton("🔍 مشاهده در ترب", url=cheapest_product['link'])]]

                await context.bot.send_photo(
                    chat_id=user_id,
                    photo=cheapest_product['image_url'],
                    caption=text,
                    reply_markup=InlineKeyboardMarkup(buttons),
                    parse_mode="Markdown"
                )
            else:
                logger.warning("محصول مشابه در ترب یافت نشد.")
                await context.bot.send_message(chat_id=user_id, text="❌ محصولی در ترب پیدا نشد.")
        else:
            logger.error("مشکلی در پردازش تصویر پیش آمد.")
            await context.bot.send_message(chat_id=user_id, text="❌ مشکلی در پردازش تصویر پیش آمد.")
        
        os.remove(file_path)
    except Exception as e:
        logger.error(f"خطا در پردازش تصویر: {e}")
        await context.bot.send_message(chat_id=user_id, text="❌ مشکلی در پردازش تصویر پیش آمد. لطفاً دوباره امتحان کنید.")

async def start(update: Update, context: CallbackContext):
    """ پیام خوش‌آمدگویی """
    logger.info("ربات شروع به کار کرد.")
    await update.message.reply_text("سلام! 🛍️ لطفاً عکس محصول را ارسال کنید تا جستجو آغاز شود.")

async def main():
    """ راه‌اندازی ربات تلگرام """
    logger.info("در حال راه‌اندازی ربات...")
    application = Application.builder().token(TELEGRAM_BOT_TOKEN).build()
    application.add_handler(CommandHandler("start", start))
    application.add_handler(MessageHandler(filters.PHOTO, handle_photo))

    logger.info("🤖 ربات فعال شد!")
    await application.run_polling()

# حل مشکل asyncio در ویندوز
if __name__ == "__main__":
    try:
        asyncio.run(main())
    except RuntimeError as e:
        logger.error(f"خطا در اجرای asyncio: {e}")
