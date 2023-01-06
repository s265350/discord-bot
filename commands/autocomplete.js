import { SlashCommandBuilder } from 'discord.js';

/*
 * Autocomplete allows you to dynamically provide a selection of values to the user, based on their input,
 * rather than relying on static choices. In this section we will cover how to add autocomplete support to your
 * commands.
 * 
 * The AutocompleteInteractionopen in new window class provides the AutocompleteInteraction#respondopen in new
 * window method to send a response. Using this, you can submit an array of ApplicationCommandOptionChoiceDataopen
 * in new window objects for the user to choose from. Passing an empty array will show "No options match your
 * search" for the user.
 * The CommandInteractionOptionResolver#getFocusedopen in new window method returns the currently focused
 * option's value, which can be used to applying filtering to the choices presented. For example, to only display
 * options starting with the focused value you can use the Array#filter() method, then using Array#map(), you can
 * transform the array into an array of ApplicationCommandOptionChoiceDataopen in new window objects.
 * 
 * Handling multiple autocomplete options
 * To distinguish between multiple options, you can pass true into CommandInteractionOptionResolver#getFocusedopen
 * in new window, which will now return the full focused object instead of just the value. This is used to get
 * the name of the focused option below, allowing for multiple options to each have their own set of suggestions:
 * 
 * Accessing other values
 * In addition to filtering based on the focused value, you may also wish to change the choices displayed based
 * on the value of other arguments in the command. The following methods work the same in
 * AutocompleteInteractionopen in new window:
 * const string = interaction.options.getString('input');
 * const integer = interaction.options.getInteger('int');
 * const boolean = interaction.options.getBoolean('choice');
 * const number = interaction.options.getNumber('num');
 * However, the .getUser(), .getMember(), .getRole(), .getChannel(), .getMentionable() and .getAttachment() methods
 * are NOT available to autocomplete interactions. Discord does not send the respective full objects for these methods
 * until the slash command is completed. For these, you can get the Snowflake value using interaction.options.get('option').value
 * 
 * Notes
 * As with other application command interactions, autocomplete interactions must receive a response within 3 seconds.
 * You cannot defer the response to an autocomplete interaction. If you're dealing with asynchronous suggestions, such as from an API, consider keeping a local cache.
 * After the user selects a value and sends the command, it will be received as a regular ChatInputCommandInteractionopen in new window with the chosen value.
 * You can only respond with a maximum of 25 choices at a time, though any more than this likely means you should revise your filter to further narrow the selections.
 */

export default {
    guild: true,
	data: new SlashCommandBuilder()
        .setName('autocomplete')
        .setDescription('Search discordjs.guide!')
        .addStringOption(option =>
            option.setName('query')
                .setDescription('Phrase to search for')
                .setAutocomplete(true)),
	//async autocomplete(interaction) {
	async execute(interaction) {
		const focusedOption = interaction.options.getFocused(true);
		let choices;

		if (focusedOption.name === 'query') {
			choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
		}

		if (focusedOption.name === 'version') {
			choices = ['v9', 'v11', 'v12', 'v13', 'v14'];
		}

		const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
		await interaction.respond(
			filtered.map(choice => ({ name: choice, value: choice })),
		);
	},
};
