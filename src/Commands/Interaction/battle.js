const { SlashCommandBuilder } = require('@discordjs/builders');
const start = require('../../../Showdown/showoff.js')

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

	},
};