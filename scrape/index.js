require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const axios = require("axios");

const bot = new Telegraf("7653591915:AAG0qPTh90zXoZOLSbGMz57XqjP18I7dfjU");

let searchResults = {};

bot.start((ctx) => ctx.reply("سلام! 🔍 نام محصولی که می‌خواهید جستجو کنید را وارد کنید."));

bot.on("text", async (ctx) => {
  const userId = ctx.message.from.id;
  let searchTerm = ctx.message.text.trim().toLowerCase(); // تبدیل به حروف کوچک برای تطبیق بهتر

  ctx.reply(`⏳ در حال جستجو برای: *${searchTerm}* ... لطفاً صبور باشید.`, { parse_mode: "Markdown" });

  try {
    let products = await fetchProducts(searchTerm);

    // اگر نتیجه‌ای پیدا نشد، تلاش مجدد با اصلاح ورودی
    if (products.length === 0) {
      searchTerm = searchTerm.replace(/(\d+)/g, " $1 "); // اضافه کردن فاصله بین حروف و اعداد (مثلاً s24fe → s24 fe)
      products = await fetchProducts(searchTerm);
    }

    // اگر هنوز هم نتیجه‌ای نبود، پیام خطا نمایش داده شود
    if (products.length === 0) {
      ctx.reply("❌ هیچ محصولی مطابق با جستجوی شما پیدا نشد.");
      return;
    }

    // مرتب‌سازی بر اساس قیمت
    products = products.filter(p => p.price !== "قیمت نامشخص").sort((a, b) => a.price - b.price);

    searchResults[userId] = {
      cheapest: products[0],
      expensive: products[products.length - 1]
    };

    ctx.reply(
      `🔍 *${products.length} نتیجه یافت شد.* لطفاً یکی از گزینه‌های زیر را انتخاب کنید:`,
      Markup.inlineKeyboard([
        [{ text: "📉 ارزان‌ترین", callback_data: "cheapest" }],
        [{ text: "🔝 گران‌ترین", callback_data: "expensive" }]
      ])
    );

  } catch (error) {
    handleError(ctx, error);
  }
});

bot.action("cheapest", (ctx) => {
  const userId = ctx.from.id;
  if (!searchResults[userId]) {
    ctx.reply("❌ ابتدا یک جستجو انجام دهید.");
    return;
  }

  const product = searchResults[userId].cheapest;
  ctx.replyWithMarkdown(
    `📉 *ارزان‌ترین محصول:*\n📌 ${product.title}\n💰 ${product.priceText} تومان`,
    Markup.inlineKeyboard([
      [{ text: "🔍 نمایش محصول", url: product.link }]
    ])
  );
});

bot.action("expensive", (ctx) => {
  const userId = ctx.from.id;
  if (!searchResults[userId]) {
    ctx.reply("❌ ابتدا یک جستجو انجام دهید.");
    return;
  }

  const product = searchResults[userId].expensive;
  ctx.replyWithMarkdown(
    `🔝 *گران‌ترین محصول:*\n📌 ${product.title}\n💰 ${product.priceText} تومان`,
    Markup.inlineKeyboard([
      [{ text: "🔍 نمایش محصول", url: product.link }]
    ])
  );
});

// تابع دریافت محصولات از توروب
async function fetchProducts(searchTerm) {
  const url = `https://api.torob.com/v4/base-product/search/?category=&sort=popularity&q=${encodeURIComponent(searchTerm)}&page=0&size=50&source=next`;
  const response = await axios.get(url);

  if (!response.data || !response.data.results || !Array.isArray(response.data.results)) {
    return [];
  }

  return response.data.results.map((product) => {
    const name = product.name1 || product.name2 || "بدون نام";
    const price = parsePrice(product.price);
    const priceText = product.price_text || "قیمت نامشخص";
    const link = `https://torob.com/p/${product.id}`;

    return {
      title: name,
      price: price || "قیمت نامشخص",
      priceText,
      link
    };
  });
}

// تابع پردازش قیمت و حذف کاراکترهای غیر عددی
function parsePrice(price) {
  if (typeof price === 'string') {
    return parseInt(price.replace(/\D/g, ''));
  } else if (typeof price === 'number') {
    return price;
  }
  return null;
}

// مدیریت خطاها
function handleError(ctx, error) {
  if (error.response) {
    ctx.reply(`❌ خطای سرور: ${error.response.status} - ${error.response.statusText}`);
  } else if (error.request) {
    ctx.reply("⚠️ درخواست ارسال شد، ولی پاسخی دریافت نشد.");
  } else {
    ctx.reply("🚨 خطای ناشناخته رخ داده است.");
  }
  console.error("⚠️ خطای دریافت اطلاعات از API:", error);
}

bot.launch();
