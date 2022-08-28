const express = require('express');
const app = express();
const path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

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
            console.log(`[NOTIF] Searching market... [${i}]`.blue)
            op.cpuUsage(function(v){
                console.log(`[STATUS] System Status => Memory: ${(os.freemem()/1000000).toFixed(2)}/${((os.totalmem())/1000000).toFixed(2)}MB | CPU Usage: ${v.toFixed(3)}%`.yellow)
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
                    if(d.lowestPrice < 110) {
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
        const currentUser = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_E74219544F10E2CD33B6BB517B612BBC1AA93725062F77958AA5624C13E54D2C56697D7F430583B29C2B368B0B34ADB96D18B336EF4902EF0DA15B1FBC5BD920B34E950CF44039A96798196ECA579DA30A9395DFD17DAECCE2AD2AE38027DC949DB272E1461E499DB5B4CD5E13AF506D9394002A85EE32C43641EB8FFFD5CF174105B075D94A23B1E7B9BD3A3EBE1191A3D7E11EF5FB9283AFA5671B14CFC03ACD866A7C9B3BCE4A548186D3580A6C53F9481CF2AD05DAA5D401E4AC64B1EB82E7821A5CEDB0D8F8A75B2BC1154786484F9CFEFFBDEC37C881F6AE2064E8BD6D625689DFD3F2A8A97FCC495014405228EC611C70A52F324220395C68BA07D380F1A5DD9DFD4CF837C839B9204BB75801BFEE75998206C280E0966B9B72FF77038E064CCBB8CB7F0C6071A775C5D1ED5CB7A8F43DD4E4D7C069D34844488D54126C9AC8C8878B257D2AA145F3879E16AC2F5BFDBFC1F2785EA28338C764926AAB1342481D') 
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
    const resellers = await noblox.getResellers(data.id)
    if((resellers[1].price - resellers[0].price) > 100) {
    noblox.buy(data.id, data.lowestPrice).then(async c => {
        cb(c)
        if(typeof c === `string`) {
            if(c.startsWith('Price')) console.log(`[ERROR] `.red + c.red)
            } else {
                const i = await noblox.getProductInfo(c.productId)
                client.log(i, { price: data.lowestPrice , profit: resellers[0]-resellers[1] })
                console.log(`[SUCCESS] Successfully sniped ${data.name} for ${data.lowestPrice}!`.green)
                
            }
    })
    } else {
        console.log(`[ERROR] Purchase has no profit! Aborted...`.red + ` Item: ${data.name}`)
        
    }
}

client.login(c => {

})

client.log({Name: `Test`, AssetId: 10467173753 }, { price: 10000 , profit: 78})
client.start()

