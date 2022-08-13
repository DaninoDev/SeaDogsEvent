const { SlashCommandBuilder } = require('@discordjs/builders');
const Manage = require('../structures/models/team');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team_info')
		.setDescription('Show team info.')
		.setDMPermission(false),

	async execute(interaction) {
		await interaction.deferReply();

		const { MessageEmbed } = require('discord.js');
		const captain = interaction.guild.members.cache.get(interaction.user.id);
		const team = await Manage.findOne({ members: interaction.user.id })
			const users = interaction.guild.roles.cache.get(team.teamRoleID).members.map(m => m.user.id);
			const embed = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setDescription(`Here you will see the team info **${team.teamName}**`)
				.setColor('BLUE')
				.setFields(
                    { name : 'Captain:', value : `<@!${team.captainID}>`},
					{ name : 'Role:', value : `<@&${team.teamRoleID}>`},
					{ name : 'N° Members:', value : users.length.toString()},)
				.setTimestamp();
            if (interaction.guild.roles.cache.some(role => role.id === team.teamRoleID)) {
				await interaction.editReply({ embeds : [embed] });
				console.log('Comando /team_info eseguito.');
			}
			else {
                const notteam = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setDescription('**You can\'t use this command because you don\'t have a team!**')
				.setColor('RED')
				await interaction.editReply({ content: '\n', embeds : [notteam], ephemeral: true });
			}

		}
	}