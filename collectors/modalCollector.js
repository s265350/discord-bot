import { ComponentType } from 'discord.js';

export default {
	name: 'buttonCollector',
    category: 'interaction',
    description: 'Collecting interations from a user',
	async execute(interaction) {
        const collector = interaction.message.createMessageComponentCollector({
            componentType: ComponentType.ModalSubmit,
            time: 1000 * 30 // collect for 30 seconds
        });

        collector.on('collect', i => {
            if (i.user.id === interaction.user.id) {
                const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
                const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
                console.log({ favoriteColor, hobbies });
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} interactions.`);
        });
	},
};
