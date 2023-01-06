/*
 * LIBRARY IMPORTS
 */
import {} from 'dotenv/config';
import { readdirSync } from 'fs';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { deployCommands, getCommands, getButtons } from './deploy-commands.js';

/*
 * DISCORD CLIENT CREATION
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

/*
 * COMMANDS
 */
client.commands = new Collection();
await deployCommands();
getCommands().forEach(command => client.commands.set(command.data.name, command));

/*
 * EVENTS
 */
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));

for (const name of eventFiles) {
	const {default: event} = await import(`./events/${name}`);
	if (event.once) client.once(event.name, (...args) => event.execute(...args));
	else client.on(event.name, (...args) => event.execute(...args));
}

/*
 * BOT START
 */
client.login(process.env.DISCORD_TOKEN);
