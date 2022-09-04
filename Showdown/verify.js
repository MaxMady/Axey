require('puppeteer')
const puppeteer = require('puppeteer-extra')
const e = require('./pageManager.js').e
const { QuickDB } = require('quick.db')
const db = new QuickDB()

async function reset () {
    await db.set(`page`, 0)
}
reset()

async function verify(url) {

}

e(async (page, browser) => {
    await page.goto('https://play.pokemonshowdown.com/', { waitUntil: "networkidle0" })
    await page.click('#room- > div > div.leftmenu > div.mainmenu > div:nth-child(3) > p:nth-child(2) > button')
    await page.keyboard.type('Melon2345x')
    await page.click('body > div.ps-popup > form > p.buttonbar > button:nth-child(1)')
    setTimeout(async function() {
        await page.click('body > div.ps-overlay > div > p > button:nth-child(2)')
        await page.keyboard.type(`Is this your ID: ?`)
    }, 500)
})
