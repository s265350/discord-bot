import { SlashCommandBuilder } from 'discord.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		return interaction.reply('Pong!'); // normal reply
		// if a reply takes more than 3 seconds you must use a deferred reply
		await interaction.deferReply();
		await wait(4000);
		await interaction.reply('Pong!');
		// to edit a reply and set ephemeral
		await interaction.editReply({ content: 'Secret Pong!', ephemeral: true });
        await interaction.deleteReply();
		// to attach more messages
		await interaction.followUp('Pong again!');
		const message = await interaction.fetchReply();
        console.log(message);
	},
};
