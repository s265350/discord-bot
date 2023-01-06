import { SlashCommandBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';
import { Button, LinkButton, Embed } from '../interactions/components.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('buttons')
		.setDescription('Show buttons'),
	async execute(interaction) {
        const rows = [ // You can have a maximum of 5 ActionRows per message
            new ActionRowBuilder()  // A maximum 5 buttons within an ActionRow is allowed
                .addComponents(
                    Button('primary', ButtonStyle.Primary, async (i) => {return i.reply(`${i.user.username} good job!`);}, 'Click me!'),
                    Button('success', 'Success', ButtonStyle.Success),
                    Button('danger', 'Danger', ButtonStyle.Danger)
                ),
            new ActionRowBuilder()
                 .addComponents(
                    Button('secondary', 'Secondary', ButtonStyle.Secondary),
                    //Button('success_disabled', undefined, ButtonStyle.Success, '🙂', false),
                    LinkButton('https://discord.js.org/', 'Link')
            )
        ];

		const embed = Embed('Title', 'Description', 0x0099FF, 'https://discord.js.org');

		return interaction.reply({ content: `Try these buttons!`, ephemeral: true, embeds: [embed], components: rows });
        // MessageComponentInteraction#update method should be used in favour of editReply() on the original interaction, to ensure you respond to the button interaction
        await interaction.editReply({ content: `Maybe you shouldn't had to click`, ephemeral: true, embeds: [], components: rows });
        await interaction.deferReply();
        await interaction.fetchReply();
        await interaction.deleteReply();
        await interaction.followUp({ content: `I think you did well at the end`, ephemeral: true, embeds: [embed], components: [rows] });
    
	},
};
