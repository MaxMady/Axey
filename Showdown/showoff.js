require("puppeteer");
const puppeteer = require("puppeteer-extra");
const { AttachmentBuilder } = require("discord.js");
const e = require('./pageManager.js').e

const { WebhookClient, EmbedBuilder } = require("discord.js");
const {QuickDB} = require('quick.db')
const db = new QuickDB()
async function start(url, channel) {
  console.log(url);
  let id = url.split("/")[3].split("-").join("-");
  e(async (page, browser) => {
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
    channel.send(`Connected to websocket!`);
    page.on("console", (message) => {
      format(message.text(), page, browser, w1, channel, url);
    });
  }, 3000);
})
}
let laturn = `1`;
async function format(msg, page, browser, w1, channel, url) {
  let id = url.split("/")[3].split("-").join("-");
  let str1 = ``,
    str2 = ``,
    str3 = ``,
    turn = `0`;
  const title = await page.title();
  let names = title.split(" vs. ");
  let n1 = names[0];
  let n2 = names[1].split(" - ")[0];

  let i = msg.split("\n");

  i.forEach((e) => {
    let sen = e.split("|");
    s3(e);
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
      if (e.includes("-fieldstart")) {
        if (e.includes(`[from]`)) {
          str1 += `${e.split("p1a: ")[1]} summoned **${sen[2].split(
            "ove: "[1]
          )}** \`${sen[3].split(": ")[1]}\``;
        }
      } else if (e.includes("-supereffective")) {
        str2 += `**The move is super effective!**`;
      } else if (e.includes("move")) {
        if (e.includes(`-fail`)) {
          str1 += `${sen[2].split(" ")[1]} tried use ${sen[3]} but failed!\n`;
        } else {
          if (sen.includes(`[miss]`)) {
            str1 += `> ${sen[2].split(" ")[1]} tried to use **${
              sen[3]
            }** but failed!\n`;
          } else {
            str1 += `> ${sen[2].split(" ")[1]} used **${sen[3]}**\n`;
          }
        }
      } else if (e.includes(`switch`)) {
        if (sen.length > 5) {
          str1 += `${title.split(" vs. ")[0]} switched out with ${
            sen[3].split(",")[1]
          } **${sen[3].split(",")[0]}** [${sen[4]}] | *${sen[5]}*\n`;
        } else {
          str1 += `${title.split(" vs. ")[0]} switched out with ${
            sen[3].split(",")[1]
          } **${sen[3].split(",")[0]}** [${sen[4]}]\n`;
        }
      } else if (e.includes("faint")) {
        let fainted = sen[2].split(" ")[1];
        str1 += ` **${fainted}** has fainted!\n`;
      } else if (e.includes("-boost")) {
        str1 += `${sen[2].split(":")[1]}'s ${sen[3]} rose by ${
          sen[4]
        } stage(s)!\n`;
      } else if (e.includes("-damage")) {
        if (sen.length > 4) {
          str1 += `${sen[2].split(":")[1]} was hurt by ${
            sen[4].split(" ")[2]
          }. HP: \`${sen[3].split("/")[0]}%\`\n`;
        } else {
          str1 += `${sen[2].split(":")[1]} lost some HP! \`HP: ${
            sen[3].split("/")[0]
          }\`\n`;
        }
      } else if (e.includes("-heal")) {
        str1 += `${sen[2].split(":")[1]} healed its HP to **${
          sen[3].split("/")[0]
        }%**!\n`;
      } else if (e.includes("-sidestart")) {
        str1 += `${sen[3]} were placed on the battle field!\n`;
      } else if (e.includes("-status")) {
        if (e.includes(`psn`)) {
          str1 += `${sen[1].split(":")[1]} was poisoned!\n`;
        } else if (e.includes("slp")) {
          str1 += `${sen[1].split(":")[1]} is fast asleep!\n`;
        } else if (e.includes("par")) {
          str1 += `${sen[1].split(":")[1]} has been paralysed!\n`;
        } else if (e.includes("frz")) {
          str1 += `${sen[1].split(":")[1]} has been frozen still!\n`;
        } else if (e.includes(`tox`)) {
          str1 += `${sen[1].split(":")[1]} has been toxicated!\n`;
        } else {
          str1 += `${sen[1].split(":")[1]} has been ${sen[3]}!\n`;
        }
      }
    }
  }
  function s2(e) {
    let sen = e.split("|");
    if (e.includes("p2a:")) {
      if (sen[2].includes(`p1a:`)) return;
      if (e.includes("-fieldstart")) {
        if (e.includes(`[from]`)) {
          str2 += `${e.split("p2a: ")[1]} summoned **${sen[2].split(
            "ove: "[1]
          )}** \`${sen[3].split(": ")[1]}\``;
        }
      } else if (e.includes("-supereffective")) {
        str2 += `**The move is super effective!**`;
      } else if (e.includes("move")) {
        if (e.includes(`-fail`)) {
          str2 += `> ${sen[2].split(" ")[1]} tried use **${
            sen[3]
          }** but failed!\n`;
        } else {
          if (sen.includes(`[miss]`)) {
            str2 += `> ${sen[2].split(" ")[1]} tried to use **${
              sen[3]
            }** but failed!\n`;
          } else {
            str2 += `> ${sen[2].split(" ")[1]} used **${sen[3]}**\n`;
          }
        }
      } else if (e.includes(`switch`)) {
        if (sen.length > 5) {
          str2 += `${title.split(" vs. ")[0]} switched out with ${
            sen[3].split(",")[1]
          } **${sen[3].split(",")[0]}** [${sen[4]}] | *${sen[5]}*\n`;
        } else {
          str2 += `${title.split(" vs. ")[0]} switched out with ${
            sen[3].split(",")[1]
          } **${sen[3].split(",")[0]}** [${sen[4]}]\n`;
        }
      } else if (e.includes("faint")) {
        let fainted = sen[2].split(" ")[1];
        str2 += ` **${fainted}** has fainted!\n`;
      } else if (e.includes("-boost")) {
        str2 += `${sen[2].split(":")[1]}'s ${sen[3]} rose by ${
          sen[4]
        } stage(s)!\n`;
      } else if (e.includes("-damage")) {
        if (sen.length > 4) {
          str2 += `${sen[2].split(":")[1]} was hurt by ${
            sen[4].split(" ")[2]
          }. HP: \`${sen[3].split("/")[0]}%\`\n`;
        } else {
          str2 += `${sen[2].split(":")[1]} lost some HP! \`HP: ${
            sen[3].split("/")[0]
          }\`\n`;
        }
      } else if (e.includes("-heal")) {
        str2 += `${sen[2].split(":")[1]} healed its HP to **${
          sen[3].split("/")[0]
        }%**!\n`;
      } else if (e.includes("-sidestart")) {
        str2 += `${sen[3]} were placed on the battle field!\n`;
      } else if (e.includes("-status")) {
        let poke = sen[1].splice(0, 1);
        if (e.includes(`psn`)) {
          str2 += `${sen.join(" ")} was poisoned!\n`;
        } else if (e.includes("slp")) {
          str2 += `${sen.join(" ")} is fast asleep!\n`;
        } else if (e.includes("par")) {
          str2 += `${sen.join(" ")} has been paralysed!\n`;
        } else if (e.includes("frz")) {
          str2 += `${sen.join(" ")} has been frozen still!\n`;
        } else if (e.includes(`tox`)) {
          str2 += `${sen.join(" ")} has been toxicated!\n`;
        } else {
          str2 += `${sen.join(" ")} has been ${sen[3]}!\n`;
        }
      }
    }
  }
  function s3(e) {
    let sen = e.split("|");

    if (e.includes("-weather")) {
      str3 += `**Weather:** ${sen[2]}\n`;
    } else if (e.includes(`turn`) || !e.includes("-singleturn")) {
      turn = sen[2];
      laturn = sen[2];
    } else if (e.includes("-start")) {
      console.log("?");
      if (e.includes("Dynamax")) {
        str3 += `**${sen[2].split(":")[1]}** dynamaxed!\n`;
      } else if (e.includes("Substitute")) {
        let name = sen[2].splice(0, 1).join(" ");
        str3 += `**${name}** is now in a Substitute`;
      }
    } else if (e.includes("-fieldstart")) {
      let field = sen[2].split(" ");
      field.splice(0, 1).join(" ");
      str3 += `${field} was summoned!\n`;
    } else if (e.includes("-end")) {
      let whatend = sen[3];
      let poke = sen[2];
      poke.split(" ").splice(0, 1).join(" ");
      if (e.includes("Dynamax")) {
        str3 += `${poke} is now no longer dynamaxed\n`;
      } else {
        str3 += `${poke}'s ${whatend} ended!\n`;
      }
    }
  }
  i.splice(0, 1);
  if (i[0]) {
    if (i[0] === `|`) i.splice(0, 1);
  }
  console.log(`-------------------`);

  if (str1 === `` && str2 === ``) return;
  if (str1 === ``) str1 = `-`;
  if (str2 === ``) str2 = `-`;

  const webhookClient = new WebhookClient({
    url: "https://discord.com/api/webhooks/1008732690620624997/LIpInD4udnamU87DXdq2Septfr9K-X00BUhTMxYUA2JGqbmQrE0e_Kf7d8aZrzz_pz_u",
  });
  if (turn === `0`) turn = laturn;
  const embed = new EmbedBuilder()
    .setTitle(`${title}`)
    .setColor(`Orange`)
    .setAuthor({ name: `Turn ${turn}` })
    .addFields([
      { name: `${n1}`, value: `${str1}`, inline: true },
      { name: `${n2}`, value: `${str2}`, inline: true },
    ]);
  if (str3 != ``) {
    embed.setDescription(`${str3}`);
  }

  if (w1 != 0) return;
  channel.send({ embeds: [embed] }).then(async (e) => {
    let id = url.split("/")[3].split("-").join("-");
    let img = await page.$(`#room-${id} > div.battle > div > div:nth-child(3)`);
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
      console.log(`Error: 347`);
    }
    const file = new AttachmentBuilder("./battle.png");
    let receivedEmbed = e.embeds[0];
    const exampleEmbed = EmbedBuilder.from(receivedEmbed).setImage(
      `attachment://battle.png`
    );
    e.edit({ embeds: [exampleEmbed], files: [file] });
  });
  i.forEach(async (ai) => {
    if (
      ai.includes("win") &&
      !ai.includes("Wyrmwind") &&
      !ai.includes("Tailwind")
    ) {
      console.log(`Battle has ended!`);
      w1++;
      const embed = new EmbedBuilder()
        .setTitle(`${title}`)
        .setColor("Green")
        .setDescription(`${ai.split("|")[2]} has won the battle!`);
      channel
        .send({ embeds: [embed] })
        .then(async (e) => {
          let pagg = await db.get('page')
          if(pagg === null) pagg = 1;
          pagg--;
          if(pagg === 0) {
            await db.set(`browser`, null)
            await browser.close();
          }
          await db.set(`page`, pagg)
        });
    }
  });
}

module.exports = start;