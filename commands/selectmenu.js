import { SlashCommandBuilder, ActionRowBuilder } from 'discord.js';
import { SelectMenu, Embed } from '../interactions/components.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('selectmenu')
		.setDescription('Select a menu element'),
	async execute(interaction) {
        const reply = (i) => {

        }
        const menu = SelectMenu('select',  'Nothing selected', reply, 2, 3);
        AddMenuOption(menu, 'Select me', 'This is a description', 'first_option');
        AddMenuOption(menu, 'You can select me too', 'This is also a description', 'second_option');
        AddMenuOption(menu, 'I am also an option', 'This is a description as well', 'third_option');
        
        const embed = Embed('Some title', 'Some description here', 0x0099FF, 'https://discord.js.org/');

        // You can have a maximum of 5 ActionRows per message, and 1 select menu within an ActionRow
        const row = new ActionRowBuilder().addComponents(menu);
        return interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
	},
};
