import { SlashCommandBuilder } from 'discord.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('options')
		.setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('string')
                .setDescription('The category')
                .setRequired(true) // it's possible to set an option as required (required options must be placed before non-required options)
                .addChoices( // String, Number, and Integer option types can have choices (max 25)
                    { name: 'Funny', value: 'gif_funny' },
                    { name: 'Meme', value: 'gif_meme' },
                    { name: 'Movie', value: 'gif_movie' },
                )) // see autocomplete.js for futher info on choices
        .addIntegerOption(option =>
            option.setName('integer')
                .setDescription('Only accepts whole numbers')
                .addChoices( 
                    { name: 'One', value: 1 },
                    { name: 'Two', value: 3 },
                    { name: 'Three', value: 2 },
                ))
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('Accepts both whole numbers and decimals'))
        .addBooleanOption(option =>
            option.setName('boolean')
                .setDescription('Whether something should be true or false'))
        // next types show a selection list in the Discord interface for their associated type, or will accept a Snowflake (id) as input
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to echo into'))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to echo into'))
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to echo into'))
        .addMentionableOption(option =>
            option.setName('mentionable')
                .setDescription('The mention to echo into'))
        .addAttachmentOption(option =>
            option.setName('attachment')
            .setDescription('Prompt the user to make an upload along with the slash command')),
        // subcommand types allow you to have branching pathways of subsequent options for your commands
        // see subcommands.js
	async execute(interaction) {
		const string = interaction.options.getString('string') ?? 'No string provided';
        const integer = interaction.options.getIntegre('integer');
        const number = interaction.options.getNumber('number');
        const boolean = interaction.options.getBoolean('boolean');
        const user = interaction.options.getUser('user');
        const channel = interaction.options.getChannel('channel');
        const role = interaction.options.getRole('role');
        const mentionable = interaction.options.getMentionable('mentionable');
        await interaction.reply(`all options retrived:\n
            string=${string}\n
            integer=${integer}\n
            number=${number}\n
            boolean=${boolean}\n
            user=${user}\n
            channel=${channel}\n
            role=${role}\n
            mentionable=${mentionable}`);
	},
};
