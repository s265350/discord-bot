import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export default {
        guild: true,
	data: new SlashCommandBuilder()
                .setName('permission')
                .setDescription('Select a member to ban')
                .addUserOption(option =>
                        option
                                .setName('target')
                                .setDescription('The member to ban')
                                .setRequired(true))
                .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers) // | is the bitwise OR operator
                // by default, globally-deployed commands are also available for use in DMs
                // You can use SlashCommandBuilder#setDMPermission()open in new window to disable this behaviour
                // Commands deployed to specific guilds are not available in DMs
                .setDMPermission(false),
	async execute(interaction) {
		await interaction.reply(`Member ${interaction.options.getUser('target').name} was banned`);
	},
};
