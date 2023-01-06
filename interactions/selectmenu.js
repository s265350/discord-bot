import { ActionRowBuilder, SelectMenuBuilder } from 'discord.js';
import * as collector from '../Collectors/selectmenuCollector.js';

export default {
    row: new ActionRowBuilder() // You can have a maximum of 5 ActionRows per message, and 1 select menu within an ActionRow
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder('Nothing selected')
                .setMinValues(2)
                .setMaxValues(3)
                .addOptions(
                    {
                        label: 'Select me',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'You can select me too',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                    {
                        label: 'I am also an option',
                        description: 'This is a description as well',
                        value: 'third_option',
                    },
                ),
        ),
    embed: new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setDescription('Some description here'),
    async execute(interaction){
        collector.execute(interaction);
        return interaction.reply({ content: 'Pong!', ephemeral: true, embeds: [embed], components: [row] });
    }
}
