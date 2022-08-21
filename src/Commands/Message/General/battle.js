const Discord = require("discord.js");
const { getStarterPokemon } = require("../../../Functions/Game/Pokemon");
const { _toTitleCase } = require("../../../Functions/System/_toTitleCase");
const start = require('../../../../showoff.js')
module.exports = {
    name: "battle",
    description: "Start a battle!",
    run: async (client, args, message) => {
        if(!args[0]) return message.channel.send(`Please provide a valid URL!`)
        let ht = args[0].split('-')
        if(isNaN(ht[2])) return message.channel.send(`Make sure your battle is public`)
        let i = args[0]
        start(i, message.channel)
            message.reply('Connecting to websocket...')
        
    }
}