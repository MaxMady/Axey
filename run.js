
const uri = `https://catalog.roblox.com/v1/search/items/details?Category=2&Subcategory=2&SortType=4`
const axios = require('axios').default
const noblox = require("noblox.js")
const colors = require('colors');
const { WebhookClient, EmbedBuilder } = require('discord.js')
const os = require('os')
var op = require('os-utils');
const sleep = require('atomic-sleep')

class Sniper {
    constructor() {
        const hook = new WebhookClient({url: `https://discord.com/api/webhooks/1013271301147852894/UefvtLX0LlXb6ByX8GsUAiyonURLLo0rtRn-T0MWQdITzLvuPYRnOcRrDmv7LAC2cz9o`})
        this.hook = hook
    }
    start() {
        let i = 0
        setInterval(function() {
            i++
            let ti = new Date()
            console.log(`[NOTIF] [${ti.getHours()}:${ti.getMinutes()}:${ti.getSeconds()}] Searching market... [${i}]`.blue)
            op.cpuUsage(function(v){
                console.log(`[STATUS] System Status => Memory: ${(os.freemem()/1000000).toFixed(2)}/${((os.totalmem())/1000000).toFixed(2)}MB | CPU Usage: ${(v*100).toFixed(3)}%`.yellow)
            });
            if(i === 10) {
                console.log('[NOTIF] Clearing console & sleeping 10s...'.red)
                setTimeout(function() {
                    console.clear()
                    i = 0
                    sleep(5000)
                    console.log(`[REBOOT] Successfully restarted AutoSniper`.green)
                }, 3000)
                
            }
            try {
            axios.get(uri).then(async res => {
                let data = res.data.data;
                data.forEach(async d => {
                    if(d.lowestPrice <= 99) {
                        purchase(d, callback => {
                        })
                    }
                })
            })
            } catch(err) {
                console.log(`[ERROR] An error occured while connecting the marketplace! Retrying in 7.5s...`.red)
                
            }
        }, 7500)
    }
    async login(c) {
        const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_D20983304BA9DEAA6DAB613CA2EC3DC33B99AC96B476EC2AFB96C73BC81416BFDC2589DAD2FF584BC603743471A0EBAEAF6BAD833AE8B7B5F2898E4CC2A51E58403BE4F1F8158DA7889253E4F5D7CC8DA82E5C9ACA8F7E68E62A81A74F2041F967DE0882C3257DFA0E0063CC047D5B6E335F96C773C92F64C18EB71F499F11CCD07357519B77B9CA2A07F61E6830C67D042B78486F742C20627B61FBB119D6797880D9C2F01A20AD6547F7419A6361C7FFB0B47FFD7763259AA83B9E4D90DEEB98BC1E44C706EBF3533634E5F762762A46DCC04F6820CAAD89BB842E10ECF1EFC15DA72597C0A58335C0BEDE2620DAFE9BD7E78293A669B4111548B7BFD4686CCF384976D76E05119DA10FAB7FA6C28DAD357970DDCB8F15E5006775D3CA83137885BF38690402801227C00A81B7C6AF4EADDCE9E46C6243F1D600C272656B2D8EF3744FC520D7022252EA8EE3DB427B022FC61FC13F7028F8F2F09E74A73D68EA5BB9831EAF27316704F2E4378E7852BE84FEFE') 
        console.log(`Logged in as ${currentUser.UserName} [${currentUser.UserID}]`.green)
        c(currentUser)
    }
    log(data, d) {
        let ur =  `https://tr.rbxcdn.com/c741ac9023866ab92e31eb8560c4dd2a/420/420/Hat/Png`
        try {
        axios.get(`https://www.roblox.com/item-thumbnails?params=[{assetId:${data.AssetId}}]`).then(e => {
             ur = e.data[0].thumbnailUrl
     

        const embed = new EmbedBuilder()
        .setTitle(`New Limited sniped!`)
        .addFields([
            {
                name: `Item`,
                value: `${data.Name}`,
                inline: true
            },
            {
                name: `Cost`,
                value: `${d.price}`,
                inline: true
            },
            {
                name: `Profit`,
                value: `${d.profit}`,
                inline: true
            },
            {
                name: `Item ID`,
                value: `${data.AssetId}`,
                inline: true
            },
            {
                name: `Time`,
                value: `<t:${Math.floor(new Date()/1000)}:R>`,
                inline: true
            }
        ])
        .setColor('Gold')
        .setTimestamp()
        .setThumbnail(`${ur}`)
        this.hook.send({embeds: [embed]})
    })
} catch(et) {
    console.log(`[ERROR] An error occured while getting asset ID`)
} 
    }

}
const client = new Sniper()
this.client = client


async function purchase(data, cb) {
    const hook = new WebhookClient({url: `https://discord.com/api/webhooks/1013271301147852894/UefvtLX0LlXb6ByX8GsUAiyonURLLo0rtRn-T0MWQdITzLvuPYRnOcRrDmv7LAC2cz9o`})
try {
    const resellers = await noblox.getResellers(data.id)
    let _30per = resellers[0].price*30/100 + resellers[0];
    if((_30per - resellers[0].price) > 17) {
        console.log(data.lowestPrice)
    noblox.buy(data.id).then(async c => {
        cb(c)
        if(typeof c === `string`) {
            if(c.startsWith('Price')) {
                console.log(`[ERROR] `.red + c.red)
                const ei = new EmbedBuilder()
                .setTitle(`An error occured while purchasing an item!`)
                .setDescription('```'+c.toString()+'```'+`\n**Item:** ${data.name}\n**Price**: ${resellers[0].price}\n\n> <t:${Math.floor(new Date()/1000)}:R>`)
                .setColor(`Red`)
                .setTimestamp()
                hook.send({embeds:[ei]})
            }
            } else {
                const i = await noblox.getProductInfo(c.productId)
                client.log(i, { price: data.lowestPrice , profit: resellers[0]-resellers[1] })
                console.log(`[SUCCESS] Successfully sniped ${data.name} for ${data.lowestPrice}!`.green)
                
            }
    })
    } else {
        console.log(`[ERROR] Purchase has no profit! Aborted...`.red + ` Item: ${data.name}`)
        const aeiou = new EmbedBuilder()
        .setTitle('Aborted Purchase due to lack of profit')
        .setDescription('```js\n'+(JSON.stringify(data, null, 2)).toString()+'```')
        .setColor(`Aqua`)
        hook.send({embeds:[aeiou]})
    }
} catch(err) {
    console.log(`[ERROR] An unknow error occured!`.red)
    const unknown = new EmbedBuilder()
    .setTitle(`An Unknow Error occured!`)
    .setDescription(`${Math.floor(new Date()/1000)}`+'```js\n'+err.toString()+'\n\n'+err.stack+'```')
    .setColor(`Red`)
    .setTimestamp()
    hook.send({embeds: [unknown]})
}
}

client.login(c => {
    const hook = new WebhookClient({url: `https://discord.com/api/webhooks/1013271301147852894/UefvtLX0LlXb6ByX8GsUAiyonURLLo0rtRn-T0MWQdITzLvuPYRnOcRrDmv7LAC2cz9o`})
const redy = new EmbedBuilder()
.setTitle(`Successfully started Market Sniper!`)
.setColor(`Green`)
.setDescription(`<t:${Math.floor(new Date()/1000)}:R>\n\n> **User:** ${c.UserName} \n> **UserID:** \`${c.UserID}\`\n> **Premium:** ${c.IsPremium?`Subscribed`:`Not available`}`)
.setThumbnail(`${c.ThumbnailUrl}`)
.setTimestamp()
hook.send({embeds: [redy]})
})

client.start()
