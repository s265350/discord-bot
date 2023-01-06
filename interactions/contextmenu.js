import {} from 'dotenv/config';

export default {
	data: new ContextMenuCommandBuilder()
        .setName('User Information')
        .setType(ApplicationCommandType.User), // A UI-based command that shows up when you right click or tap on a user
//		.setType(ApplicationCommandType.ChatInput), // Slash commands; a text-based command that shows up when a user types
//		.setType(ApplicationCommandType.Message), // A UI-based command that shows up when you right click or tap on a message
	async execute(interaction) {
		const { username } = interaction.targetUser;
        return interaction.reply(`Your username: ${username}`);
	},
};

/*
 * Notes
 * Context menu commands cannot have subcommands or any options
 * Responding to context menu commands functions the same as slash commands
 * Refer to our slash command responses guide for more information
 * Context menu command permissions also function the same as slash commands
 * Refer to our slash command permissions guide for more information
 */
