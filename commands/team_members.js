const { SlashCommandBuilder } = require('@discordjs/builders');
const Manage = require('../structures/models/team');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('team_members')
		.setDescription('Team members list.')
		.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();
		const captain = interaction.guild.members.cache.get(interaction.user.id);
		const team = await Manage.findOne({ members: interaction.user.id })
		const { MessageEmbed } = require('discord.js');

				const users = interaction.guild.roles.cache.get(team.teamRoleID).members.map(m => m.user.id);
				let count = 1;
				let string = '';
				users.forEach((user) => {
					string += `**${count}°->**` + '<@!' + user + '>\n';
					count += 1;
				});
				
			const embed = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setDescription(`**List of users who belong to the team <@&${team.teamRoleID}>**`)
				.setColor('BLUE')
				.setFields(
					{ name : 'Members:', value : string, inline : false })
				.setTimestamp();
                if (interaction.guild.roles.cache.some(role => role.id === team.teamRoleID)) {
				await interaction.editReply({ embeds : [embed] });
				console.log('Comando /team_members eseguito.');
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