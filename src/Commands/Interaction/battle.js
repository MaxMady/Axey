const { SlashCommandBuilder } = require('@discordjs/builders');
const start = require('../../../Showdown/showoff.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('battle')
		.setDescription('Start a live battle feed')
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Battle URL')
                .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();
        let url = interaction.options.getString('link')

        let ht = url.split('-')
        if(isNaN(ht[2])) return await interaction.editReply(`Make sure your battle is public`)
        
        start(url, interaction)
        await interaction.editReply('Connecting to websocket...')
        let i = Math.random()*10
        if(i < 2.5) {
         await interaction.followUp({
            embeds: [
                new EmbedBuilder()
                .setTitle(`Notification`)
                .setURL('https://discord.gg/JKP8yJYSar')
                .setDescription(`\`💡\` If you seem anything wrong, you can report it via \`/report\` command!\n> You can always join the [support server](https://discord.gg/JKP8yJYSar) to recieve the latest updates!`)
            ]
         })   
        }
	},
};