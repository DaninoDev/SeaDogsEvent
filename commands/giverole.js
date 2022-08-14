const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('giverole')
		.setDescription('Give a role to all members.')
		.setDMPermission(false)
		.addRoleOption(option =>
			option.setName('role')
				.setDescription('Role to give.')
				.setRequired(true)),

	async execute(interaction) {
            let role = interaction.options.getRole("role") 
            interaction.guild.members.cache.filter(m => !m.user.bot).forEach(member => member.roles.add(role))
            interaction.reply("Dammi il tempo cristo, sto facendo!")

    } }