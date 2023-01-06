import ComponentType from 'discord.js';

export function CollectorButton (interaction, filter, seconds, onCollect, onEnd) {
    const collector = interaction.message.createMessageComponentCollector({
        filter, // processed messages shouldbe filtered (e.g. considering only the ones of the user who started the interaction)
        componentType: ComponentType.Button,
        time: 1000 * seconds // time the collector will be active
    });

    collector.on('collect', i => {onCollect(i);});

    collector.on('end', collected => {onEnd(collected);});

    return collector;
}

export async function CollectorMessage (interaction, message = '', filter, max = 1, maxProcessed = 1, seconds = 10, 
    onCollect = () => {collector.stop();}, 
    onEnd = () => {interaction.message.reply('Please, do not waste my time!');}) {

		await interaction.reply(message);

        const collector = interaction.channel.createMessageCollector({
            filter,
            max: max, // maximum messages that can be collected
            maxProcessed: maxProcessed, // maximum messages that can be processed
            time: 1000 * seconds
        });

        collector.on('collect', onCollect);
        
        collector.on('end', onEnd);
}
