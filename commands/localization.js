import { SlashCommandBuilder } from 'discord.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('localization')
        .setNameLocalizations({
            pl: 'pies',
            de: 'hund',
        })
		.setDescription('Replies with Pong!')
        .setDescriptionLocalizations({
            pl: 'Słodkie zdjęcie pieska!',
            de: 'Poste ein niedliches Hundebild!',
        })
        .addStringOption(option =>
            option
                .setName('breed')
                .setDescription('Breed of dog')
                .setNameLocalizations({
                    pl: 'rasa',
                    de: 'rasse',
                })
                .setDescriptionLocalizations({
                    pl: 'Rasa psa',
                    de: 'Hunderasse',
                }),
        ),
	async execute(interaction) {
        const locales = {
            pl: 'Witaj Świecie!',
            de: 'Hallo Welt!',
        };
        await interaction.reply(locales[interaction.locale] ?? 'Hello World (default is english)');
	},
};
