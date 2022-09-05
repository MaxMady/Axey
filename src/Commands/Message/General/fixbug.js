const Discord = require("discord.js");
const { EmbedBuilder } = require('discord.js')
module.exports = {
    name: "fix",
    description: "Fix bugs",
    run: async (client, args, message) => {
        try {
        if(!args[0]) return await message.channel.send(`Please provide a github commit`).then(e => setTimeout(function() { e.delete() }, 5000))
        await message.delete();
        if(!message.author.id === `881113828195205131`) return;
        let url = args[0];
        let ref =  args[0].split('/')[6].substring(0, 7)
        const msg = await message.channel.messages.fetch(message.reference.messageId)
        if(!msg) return message.channel.send(`Unable to cache message!`).then(e => setTimeout(function() { e.delete() }, 5000))
        let desc = msg.embeds[0].description
        let f_desc = desc + `\n\n**Commit:** [\`${ref}\`](${url})\n**Fixed at:** <t:${Math.floor(new Date()/1000)}:R>`
        if(args[1]) f_desc += `\n**Remarks:** ${args[1]}`
        const embed = EmbedBuilder.from(msg.embeds[0]).setColor(`Green`).setDescription(f_desc).setColor(`Bug fixed!`)
        msg.edit({embeds: [embed]})
        message.channel.send(`Successfully updated bug report!`).then(e => setTimeout(function() { e.delete() }, 5000))
        } catch(err) {
            console.log(err)
            message.channel.send(`An error occured!`).then(e => setTimeout(function() { e.delete() }, 5000))
        }
    }
}