require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const bot = new Telegraf("7653591915:AAG0qPTh90zXoZOLSbGMz57XqjP18I7dfjU");

let searchResults = {}; // ذخیره نتایج جستجو برای هر کاربر

bot.start((ctx) => ctx.reply("سلام! 🔍 نام محصولی که می‌خواهید جستجو کنید را وارد کنید."));

bot.on("text", async (ctx) => {
  const userId = ctx.message.from.id;
  const searchTerm = ctx.message.text;
  
  ctx.reply(`⏳ در حال جستجو برای: *${searchTerm}* ... لطفاً صبور باشید.`, { parse_mode: "Markdown" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    const url = `https://torob.com/search/?query=${encodeURIComponent(searchTerm)}`;
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });

    let startTime = Date.now();
    while (Date.now() - startTime < 5000) {
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await new Promise((r) => setTimeout(r, 500));
    }

    const productLinks = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div[class*='ProductCard'] a"))
        .slice(0, 5)
        .map(a => "https://torob.com" + a.getAttribute("href"))
    );

    if (productLinks.length === 0) {
      ctx.reply("❌ هیچ محصولی یافت نشد.");
      await browser.close();
      return;
    }

    let productData = [];

    for (let link of productLinks) {
      try {
        await page.goto(link, { waitUntil: "domcontentloaded", timeout: 30000 });

        let data = await page.evaluate(() => {
          const title = document.querySelector("h1")?.innerText.trim() || "نامشخص";
          const cheapestPriceElement = document.querySelector("#cheapest-seller div:nth-child(1) div:nth-child(2)");
          let cheapestPrice = cheapestPriceElement ? cheapestPriceElement.innerText.trim() : "قیمت نامشخص";
          let price = parseInt(cheapestPrice.replace(/\D/g, "")) || 0;

          return { title, cheapestPrice, price };
        });

        productData.push({ title: data.title, cheapestPrice: data.cheapestPrice, price: data.price, link });
      } catch (error) {
        console.log(`🚨 خطا در بارگذاری محصول: ${link}`);
      }
    }

    await browser.close();

    if (productData.length === 0) {
      ctx.reply("❌ هیچ اطلاعاتی برای نمایش وجود ندارد.");
      return;
    }

    productData.sort((a, b) => a.price - b.price);
    searchResults[userId] = {
      cheapest: productData[0],
      expensive: productData[productData.length - 1]
    };

    ctx.reply(
      "📌 لطفاً یکی از گزینه‌های زیر را انتخاب کنید:",
      Markup.inlineKeyboard([
        [{ text: "📉 ارزان‌ترین", callback_data: "cheapest" }],
        [{ text: "🔝 گران‌ترین", callback_data: "expensive" }]
      ])
    );

  } catch (error) {
    ctx.reply("🚨 خطایی رخ داد، لطفاً دوباره امتحان کنید.");
    console.error(error);
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
    `📉 *ارزان‌ترین محصول:*\n📌 ${product.title}\n💰 ${product.cheapestPrice}`,
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
    `🔝 *گران‌ترین محصول:*\n📌 ${product.title}\n💰 ${product.cheapestPrice}`,
    Markup.inlineKeyboard([
      [{ text: "🔍 نمایش محصول", url: product.link }]
    ])
  );
});

bot.launch();
