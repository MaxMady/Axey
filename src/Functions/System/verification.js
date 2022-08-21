const VerificationSchema = require("../../Database/Models/Game/Verification");
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
async function VerificationChecker(client, args, message, confirmation, commandToRun) {
    let btn1 = new ButtonBuilder()
        .setLabel("Accept")
        .setEmoji("👍🏻")
        .setCustomId("verfacpt")
        .setStyle(ButtonStyle.Success)
    let btn2 = new ButtonBuilder()
        .setLabel("Decline")
        .setEmoji("👎🏻")
        .setCustomId("verfdec")
        .setStyle(ButtonStyle.Danger)
    let row = new ActionRowBuilder()
        .addComponents(
            btn1, btn2
        )
    let embed = new EmbedBuilder()
        .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
        .setColor("Orange")
        .setTitle(`We have some rules & regulations, you must accept before doing any further things in ${client.user.username}!`)
        .setDescription(`**1**. Using ${client.user.username} currency for any other bot currency or real life currency is totally not allowed!\n**2**. Making self-bots for additional advantages is not allowed.`)
        .setFooter({ text: `Breaking rules & regulations will give you permanent ban from ${client.user.username}` })
    await message.channel.send({
        embeds: [embed],
        components: [row]
    }).then(async m => {
        const filter = i => i.customId === "verfacpt" ||
            i.customId === "verfdec" || i.user.id == message.author.id;
        const collector = await m.createMessageComponentCollector({
            filter,
            time: 30000,
        });
        collector.on('collect', async button => {
            if (confirmation) return;
            if (button.customId == "verfacpt") {
                if (confirmation) {
                    collector.stop();
                    let editEmbed1 = ButtonBuilder.from(btn1)
                        .setDisabled(true);
                    let editEmbed2 = ButtonBuilder.from(btn2)
                        .setDisabled(true);
                    let row = new ActionRowBuilder()
                        .addComponents(
                            editEmbed1, editEmbed2
                        )
                    m.edit({
                        components: [row]
                    })
                    return message.channel.send({
                        content: "You've already been verified!"
                    }).then((m) => setTimeout(() => {
                        m.delete();
                    }, 5000))
                }
                collector.stop();
                await new VerificationSchema({
                    id: message.author.id,
                    verified: true,
                }).save()
                let editEmbed1 = ButtonBuilder.from(btn1)
                    .setDisabled(true);
                let editEmbed2 = ButtonBuilder.from(btn2)
                    .setDisabled(true);
                let row = new ActionRowBuilder()
                    .addComponents(
                        editEmbed1, editEmbed2
                    )
                m.edit({
                    components: [row]
                })
                button.reply({
                    content: `Thanks for accepting ${client.user.username}, now you can access the whole commands of ${client.user.username}.`
                })
                let command = client.commands.get(commandToRun);
                command.run(client, args, message);
            } else if (button.customId == "verfdec") {
                collector.stop();
                let editEmbed1 = ButtonBuilder.from(btn1)
                    .setDisabled(true);
                let editEmbed2 = ButtonBuilder.from(btn2)
                    .setDisabled(true);
                let row = new ActionRowBuilder()
                    .addComponents(
                        editEmbed1, editEmbed2
                    )
                m.edit({
                    components: [row]
                })
                return button.reply({
                    content: `As you haven't accepted the ${client.user.username} rules & regulations, we can't give you the further access.`
                })
            }
        })
        collector.on("end", async (_, reason) => {
            if (reason != "messageDelete") {
                let editEmbed1 = ButtonBuilder.from(btn1)
                    .setDisabled(true);
                let editEmbed2 = ButtonBuilder.from(btn2)
                    .setDisabled(true);
                let row = new ActionRowBuilder()
                    .addComponents(
                        editEmbed1, editEmbed2
                    )
                m.edit({
                    components: [row]
                })
            }
        })
    })
};
module.exports = {
    VerificationChecker,
}
