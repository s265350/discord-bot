import { SlashCommandBuilder } from 'discord.js';
import * as Collector from '../interactions/collectors.js';

export default {
    guild: true,
	data: new SlashCommandBuilder()
		.setName('collectmessages')
		.setDescription('Collecting messages from a user'),
	async execute(interaction) {
        const collector = Collector.CollectorMessage (interaction, 'What\'s your name?', 
            (message) => {
                const auth = interaction.user.id === message.author.id;
                const content = !message.content.includes(' ');
                return auth && content;
            },
            5, 10, 20, 
            (message) => {
                switch (message.content){
                    case ' ':
                    interaction.message.reply('Please, do not waste my time!');
                    break;
                    default:
                    collector.stop();
                    break;
                }
            }, 
            (collected) => {
                if (collected.size === 0) {
                    return interaction.message.reply('It may happen I leave people speachless');
                }
                const messages = '';
                collected.forEach(m => { messages += `${m.emoji.name}\n`; });

                return interaction.message.reply(`I collected ${collected.size} items:\n${messages}`);
            });
	},
};
