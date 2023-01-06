const { ComponentType } = require('discord.js');

export default {
	name: 'selectmenuCollector',
    category: 'interaction',
    description: 'Collecting interations from a user',
	async execute(interaction) {
        const collector = interaction.message.createMessageComponentCollector({
            componentType: ComponentType.SelectMenu,
            time: 1000 * 15 // collect for 15 seconds
        });

        collector.on('collect', i => {
            if (i.user.id === interaction.user.id) {
                const selected = i.values[0];
                if (selected === 'ping') {
            		interaction.update('The Ping option has been selected!');
                } else if (selected === 'pong') {
                    interaction.update('The Pong option has been selected!');
                } else
                    interaction.update(`The ${selected} option has been selected!`);
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
            const selected = interaction.values.join(', ');
            interaction.update(`The user selected ${selected}!`);
        });
	},
};
