const GuildSchema = require("../../../../Database/Models/Guild/Guild");
const Discord = require("discord.js");
const { VerificationChecker } = require("../../../System/Verification");
const verificationSchema = require("../../../../Database/Models/Game/Verification");
module.exports = async (message) => {
    let client = message.client;
    if (message.author.bot) return;

    let res = await GuildSchema.findOne({
        id: message.guild.id
    })
    let PREFIX;
    if (res) {
        if (res.settings.blacklisted == true) {
            let embed = new Discord.EmbedBuilder()
                .setAuthor({
                    name: `${message.guild.name}`,
                    iconURL: message.guild.iconURL({ dynamic: true })
                })
                .setDescription("Since your Server is blacklisted, no command will work. For more information join Support Server [here](https://discord.gg/d2VytJXb4T)")
                .setColor("Red");
            return message.channel.send({
                embeds: [embed]
            })
        }
        PREFIX = res.settings.prefix || client.user;
    }
    else if (!res) {
        PREFIX = "-" || client.user;
    }
    const args = message.content.slice(PREFIX.length).trim().split(/ +/g);
    let commandName = args.shift().toLowerCase();
    let command = client.commands.get(commandName) || client.commands.find(
        (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );
    if (!command) return;
    let prefix = PREFIX;
    const confirmation = await verificationSchema.findOne({
        id: message.author.id
    })
    if (command) {
        if (!confirmation) {
            if (command.name == "pick" || command.name == "about") {
                let commandToRun = command.name;
                return await VerificationChecker(client, args, message, confirmation, commandToRun);
            }
        }
        try {
            command.run(client, args, message, prefix);
        } catch (err) {
            console.error(err);
        }
    }
}