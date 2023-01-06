import { SlashCommandBuilder } from 'discord.js';

/*
 * Subcommands are available with the .addSubcommand() method.
 * This allows you to branch a single command to require different options depending on the subcommand chosen.
 * With this approach, you can merge the user and server information commands from the previous section into a
 * single info command with two subcommands. Additionally, the user subcommand has a User type option for targeting
 * other users, while the server subcommand has no need for this, and would just show info for the current guild.
 */

export default {
    guild: true,
	data: new SlashCommandBuilder()
        .setName('subcommands')
        .setDescription('Get info about a user or a server!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('user')
                .setDescription('Info about a user')
                .addUserOption(option => option.setName('target').setDescription('The user')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('server')
                .setDescription('Info about the server')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'user') {
            const user = interaction.options.getUser('target');

            if (user) {
                await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
            } else {
                await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
            }
        } else if (interaction.options.getSubcommand() === 'server') {
            await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
        }
    },
};
