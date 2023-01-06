import { SlashCommandBuilder, ChannelType } from 'discord.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('validation')
		.setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('string')
                .setDescription('The input to echo back')
                .setMaxLength(2000)
                .setMinLength(10))
        .addIntegerOption(option =>
            option.setName('integer')
                .setDescription('The input to echo back')
                .setMaxValue(1940)
                .setMinValue(32))
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('The input to echo back')
                .setMaxValue(20)
                .setMinValue(1))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The input to echo back')
                //can restrict selection to specific channel types, e.g. ChannelType.GuildText ensurs the user can only select a TextChannel for output
                .addChannelTypes(ChannelType.GuildText)),
	async execute(interaction) {
        const locales = {
            pl: 'Witaj Świecie!',
            de: 'Hallo Welt!',
        };
        await interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
	},
};
