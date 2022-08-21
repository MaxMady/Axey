require("puppeteer");
const puppeteer = require("puppeteer-extra");
const { AttachmentBuilder } = require("discord.js");

const { WebhookClient, EmbedBuilder } = require("discord.js");

async function start(url, channel) {
  let id = url.split('/')[3].split('-').join('-')
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-setuid-sandbox",
    ],
  });
  const [page] = await browser.pages();
  await page.goto(url, { waitUntil: "networkidle0" });
  setTimeout(async function () {
    let w1 = 0;
    await page.screenshot(
      {
        path: "screenshot.jpg",
      },
      5000
    );
    console.log(`Connected to websocket`);
    channel.send(`Connected to websocket!`)
    page.on("console", (message) => {
      format(message.text(), page, browser, w1, channel, url);
    });
  }, 3000);
}

async function format(msg, page, browser, w1, channel, url) {
  let id = url.split('/')[3].split('-').join('-')
  let str1 = ``,
    str2 = ``;
  const title = await page.title();
  let names = title.split(" vs. ")
  let n1 = names[0]
  let n2 = names[1].split(' - ')[0]
  
  let i = msg.split("\n");

  i.forEach((e) => {
    let sen = e.split("|");
    s1(e);
    if (!sen.length > 2) return;
    s2(e);
  });
  function s1(e) {
    let sen = e.split("|");

    if (!e.length > 2) return;
    if (e.includes("p1a:")) {
      if (!sen.length > 2) return;
      if (sen[2].includes(`p2a:`)) return;
      if (e.includes("move")) {
        if (e.includes(`-fail`)) {
          str1 += `${sen[2].split(" ")[1]} tried use ${sen[3]} but failed!\n`;
        } else {
          str1 += `> ${sen[2].split(" ")[1]} used **${sen[3]}**\n`;
        }
      } else if(e.includes(`switch`)) {
        if(sen.length > 5) {
        str1 += `${title.split(" vs. ")[0]} switched out with ${sen[3].split(',')[1]} **${sen[3].split(',')[0]}** [${sen[4]}] | *${sen[5]}*\n`
        } else {
          str1+= `${title.split(" vs. ")[0]} switched out with ${sen[3].split(',')[1]} **${sen[3].split(',')[0]}** [${sen[4]}]\n`
        }
      } else if(e.includes('faint')) {
        let fainted = sen[2].split(' ')[1]
        str1+= ` **${fainted}** has fainted!\n`
      }
    }
  }
  function s2(e) {
    let sen = e.split("|");
    if (e.includes("p2a:")) {
      if (sen[2].includes(`p1a:`)) return;
      if (e.includes("move")) {
        if (e.includes(`-fail`)) {
          str2 += `> ${sen[2].split(" ")[1]} tried use **${
            sen[3]
          }** but failed!`;
        } else {
          str2 += `${sen[2].split(" ")[1]} used **${sen[3]}**`;
        }
      } else if(e.includes(`switch`)) {
        if(sen.length > 5) {
        str2 += `${title.split(" vs. ")[0]} switched out with ${sen[3].split(',')[1]} **${sen[3].split(',')[0]}** [${sen[4]}] | *${sen[5]}*\n`
        } else {
          str2 += `${title.split(" vs. ")[0]} switched out with ${sen[3].split(',')[1]} **${sen[3].split(',')[0]}** [${sen[4]}]\n`
        }
      } else if(e.includes('faint')) {
        let fainted = sen[2].split(' ')[1]
        str2+= ` **${fainted}** has fainted!\n`
      }
    }
  }
  console.log(`> ${str1}\n> ${str2}\n`);
  i.splice(0, 1);
  if (i[0]) {
    if (i[0] === `|`) i.splice(0, 1);
  }
  console.log(`-------------------`);

  if (str1 === `` && str2 === ``) return;
  if (str1 === ``) str1 = `Switched`;
  if (str2 === ``) str2 = `Switched`;

  const webhookClient = new WebhookClient({
    url: "https://discord.com/api/webhooks/1008732690620624997/LIpInD4udnamU87DXdq2Septfr9K-X00BUhTMxYUA2JGqbmQrE0e_Kf7d8aZrzz_pz_u",
  });

  const embed = new EmbedBuilder()
    .setTitle(`${title}`)
    .setColor(`Orange`)
    .addFields([
      { name: `${n1}`, value: `${str1}`, inline: true },
      { name: `${n2}`, value: `${str2}`, inline: true },
    ]);

  if (w1 != 0) return;
  channel.send({ embeds: [embed] }).then(async (e) => {
    let id = url.split('/')[3].split('-').join('-')
    let img = await page.$(
      `#room-${id} > div.battle > div > div:nth-child(3)`
    );
    e.embeds[0];
    try {
      await page.waitForSelector(
        `#room-${id} > div.battle-controls > p:nth-child(1) > button:nth-child(5)`
      );
      await page.click(
        `#room-${id} > div.battle-controls > p:nth-child(1) > button:nth-child(5)`
      );
      await img.screenshot({
        path: `battle.png`,
      });
    } catch (err) {
      console.log(`Error: 347`)
    }
    const file = new AttachmentBuilder("./battle.png");
    let receivedEmbed = e.embeds[0];
    const exampleEmbed = EmbedBuilder.from(receivedEmbed).setImage(
      `attachment://battle.png`
    );
    e.edit({ embeds: [exampleEmbed], files: [file] });
  });
  console.log(i);
  i.forEach(async (ai) => {
    if (ai.includes("win") && !ai.includes('Wyrmwind')) {
      console.log(`Battle has ended!`)
      w1++;
      const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setColor("Green")
        .setDescription(`The battle has been completed!`);
      channel.send({ embeds: [embed] }).then(async e =>       await browser.close())
    }
  });
}

start(`https://play.pokemonshowdown.com/`, `5345049469406`)

module.exports = start