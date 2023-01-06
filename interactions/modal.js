import {} from 'dotenv/config';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import * as collector from '../Collectors/modalCollector.js';

/*
 * You can have a maximum of 5 ActionRowBuilders per modal builder, and 1 TextInputBuilder within an ActionRowBuilder
 * Currently, you cannot use SelectMenuBuilder or ButtonBuilder in modal action rows builders
*/

export default {
    row: new ModalBuilder()
        .setCustomId('modal')
        .setTitle('My Modal')
        .addComponents(
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('favoriteColorInput')
                    .setLabel("What's your favorite color?") // The label is the prompt the user sees for this input
                    .setStyle(TextInputStyle.Short) // Short means only a single line of text
                    .setMaxLength(1000) // set the maximum number of characters to allow
                    .setMinLength(10)  // set the minimum number of characters required for submission
                    .setPlaceholder('Enter some text!') // set a placeholder string to prompt the user
                    .setValue('Default') // set a default value to pre-fill the input
                    .setRequired(true) // require a value in this input field
            ),
            new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                    .setCustomId('hobbiesInput')
                    .setLabel("What's some of your favorite hobbies?")
                    .setStyle(TextInputStyle.Paragraph) // Paragraph means multiple lines of text
            ),
        ),
    async execute(interaction){
        collector.execute(interaction);
        return interaction.showModal(modal); // Show the modal to the user
        /* 
         * Showing a modal must be the first response to an interaction
         * You cannot defer() or deferUpdate() then show a modal later
         * If the modal was shown from a ButtonInteractionopen in new window or SelectMenuInteractionopen in new window,
         * it will also provide these methods, which behave equally:
         * update()
         * deferUpdate()
         */
    }
};