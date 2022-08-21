const { ActivityType } = require("discord.js")

module.exports = async (client) => {
    client.user.setActivity({
        name: "p!start",
        type: ActivityType.Playing
    });
     console.log(`Logged in ${client.user.tag}`)
}