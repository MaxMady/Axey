require("puppeteer");
const puppeteer = require("puppeteer-extra");
const start = require("./showoff.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
let browser
async function e(cb) {
  try {
    let pages = await db.get(`page`);
    if (pages === null) pages = 0;
    if (pages === 0) {
        console.log(`Creating browser...`)
      browser = await puppeteer.launch({
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-setuid-sandbox",
        ],
      });
      const [page] = await browser.pages();
      cb(page, browser, 1);
      let pg = await db.set('page', 1);
      return browser;
    } else {
      const page = await browser.newPage();
      let pp = await db.get('page')
      if(pp === null) pp = 0;
      pp++;
      await db.set(`page`, pp)
      cb(page, browser, pp);
    }
  } catch (err) {
    console.log(`An error occured:`);
    console.log(err);
  }
}
module.exports = { e };
