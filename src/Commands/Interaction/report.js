const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Report a bug occured in the bot")
    .addStringOption((option) =>
      option
        .setName("bug")
        .setDescription("Briefly explain the bug...")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("msg").setDescription("Enter the message link")
    )
    .addAttachmentOption((option) =>
      option.setName("screenshot").setDescription("Screenshot of bug")
    ),

  async execute(interaction, client) {
    await interaction.reply({ content: `Submitting the bug...`, ephemeral: true });
    try {
      const attachment = interaction.options.getAttachment("screenshot");
      const bug = interaction.options.getString("bug");
      const msg = interaction.options.getString("msg");
      const embed = new EmbedBuilder()
        .setTitle(`New Bug report`)
        .setDescription(
          `**Report:** ${bug}\n**Submitted by:** ${
            interaction.member.user.username
          }#${interaction.member.user.discriminator}\n**Submitted at:** <t:${Math.floor(new Date() / 1000)}:t>`
        )
        .setColor('#FF0000')
        .setURL(interaction.channel.url)
        .setThumbnail(interaction.user.displayAvatarURL({ extension: 'png' }))
        .setFooter({
          text: `Guild: ${interaction.guild.name} (${interaction.guild.id})`
        });
      if (attachment) embed.setImage(`${attachment.url}`);
      if (msg) embed.setFooter({text: `Guild: ${interaction.guild.name} (${interaction.guild.id}) | Message: ${msg}`});
      const channel = client.channels.cache.get("1016187476697681980");
      channel.send({ embeds: [embed] }).then(async (e) => {
        await interaction.followUp({ephemeral: true, content: "Successfully reported the bug!"});
      });
    } catch (err) {
      await interaction.followUp({
        content: `An error occured while submitting the bug!`,
        ephemeral: true,
      });
      console.log(err);
    }
  },
};
