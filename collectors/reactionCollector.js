export default {
	name: 'reactionCollector',
    category: 'reactions',
    description: 'Collecting reactions from a user',
	async execute(interaction) {
		await interaction.reply('React to this message');
		const message = await interaction.fetchReply();
		await message.react('👋');

        const filter = (message, reaction) => {
            const auth = interaction.user.id === message.author.id;
            const content = !message.content.includes(' ');
            return auth && content;
        };
        
        const collector = interaction.channel.createReactionCollector({
            filter,
            max: 5, // collect max 5 messages
            maxProcessed: 10, // max messages to be processed
            time: 1000 * 5 // collect for 20 seconds
        });

        collector.on('collect', reaction => {
            console.log(`Collected ${reaction.emoji}`);
        });
        
        collector.on('end', collected => {
            if (collected.size === 0) {
                interaction.message.followUp('You should react quicker!');
                return;
            }

            const messages = '';
            collected.forEach(m => {
                messages += `${m.emoji.name}\n`;
            });

            console.log(`Collected ${collected.size} items:\n${messages}`);
        });
	},
};
