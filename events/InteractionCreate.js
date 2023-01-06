import { getButton, getMenu } from '../deploy-commands.js';

export default {
	name: 'interactionCreate',
	async execute(interaction) {
		try {
			if (interaction.isChatInputCommand() || interaction.isAutocomplete()) {
				// for this implementation files and commands MUST have the same name
				const command = interaction.client.commands.get(interaction.commandName);

				if (!command) {
					console.error(`No command matching ${interaction.commandName} was found`);
					return;
				}
				
				await command.execute(interaction);
			} else if (interaction.isButton()) {
				// for this implementation files and buttons MUST have the same name
				const button = getButton().get(interaction.customId);
				
				if (!button) {
					console.error(`No button matching ${interaction.customId} was found`);
					return;
				}
				
				await button.execute(interaction);
			} else if (interaction.isStringSelectMenu()) {
				// for this implementation files and buttons MUST have the same name
				const menu = getMenu(interaction.customId);
				
				if (!menu) {
					console.error(`No menu matching ${interaction.customId} was found`);
					return;
				}
				
				await menu.execute(interaction);
			} else if (interaction.isModalSubmit()) {
				await command.execute(interaction);
			} else if (interaction.isUserContextMenuCommand()) {
				await command.execute(interaction);
			}
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}:\n${error}`);
		}
	},
};
