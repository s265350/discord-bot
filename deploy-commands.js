import { REST, Routes } from 'discord.js';
import { readdirSync } from 'node:fs';

const guildCommands = [];
const globalCommands = [];
const commands = [];
const buttons = new Map();
const selectMenus = new Map();

export function getCommands() {
	return commands;
}

export function setButton(button, execute) {
	buttons.set(button.data.custom_id, { data: button, execute});
}

export function getButtons(id) {
	return buttons.get(id);
}

export function setMenu(menu, execute) {
	selectMenus.set(menu.data.custom_id, { data: menu, execute});
}

export function getMenu(id) {
	return selectMenus.get(id);
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

async function refreshCommands() {
	// Grab all the command files from the commands directory you created earlier
	const commandFiles = readdirSync('./commands').filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const name of commandFiles) {
		const {default: command} = await import(`./commands/${name}`);
		commands.push(command);
		command.guild ? guildCommands.push(command.data.toJSON()) : globalCommands.push(command.data.toJSON());
	}
}

// Deploy commands
export async function deployCommands() {
	await refreshCommands();
	try {
		// The put method is used to fully refresh all commands in the guild with the current set
		const guildData = await rest.put(
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
			{ body: guildCommands },
		);
		const globalData = (process.env.GUILD_COMMANDS_ONLY === 1) ? [] : await rest.put(
			Routes.applicationCommands(process.env.APP_ID),
			{ body: globalCommands },
		);
		console.log(`Successfully reloaded: ${guildData.length}/${guildCommands.length} guild and ${globalData.length}/${globalCommands.length} global application (/) commands`);
	} catch (error) {
		console.error(error);
	}
}

export async function deleteGuildCommand (commandId) {
	// delete a guild-based command (you can find 'commandId' on your discord developer portal -> Server Settings -> Integrations -> Bots and Apps)
	return rest.delete(Routes.applicationGuildCommand(process.env.APP_ID, process.env.GUILD_ID, commandId))
		.then(() => console.log('Successfully deleted guild command'))
		.catch(console.error);
}

export async function deleteGlobalCommand (commandId) {
	// delete a global command
	return rest.delete(Routes.applicationCommand(process.env.APP_ID, commandId))
		.then(() => console.log('Successfully deleted guild command'))
		.catch(console.error);
}

export async function deleteAllGuildCommand () {
	// delete all guild-based commands
	rest.put(Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID), { body: [] })
		.then(() => console.log('Successfully deleted all guild commands'))
		.catch(console.error);
}

export async function deleteAllGlobalCommand () {
	// delete all global commands
	rest.put(Routes.applicationCommands(process.env.APP_ID), { body: [] })
		.then(() => console.log('Successfully deleted all application commands'))
		.catch(console.error);
}
