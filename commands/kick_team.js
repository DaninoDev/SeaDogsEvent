const { SlashCommandBuilder } = require('@discordjs/builders');
const Manage = require('../structures/models/team');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick_team')
		.setDescription('kick a user from the team!')
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to be kicked.')
				.setRequired(true)),
	async execute(interaction) {

		await interaction.deferReply();

		const { MessageEmbed } = require('discord.js');
		const target = interaction.options.getMember('target');
		const user = interaction.guild.members.cache.get(target.id);
		const captain = interaction.guild.members.cache.get(interaction.user.id);
		const team = await Manage.findOne({ captainID: captain.id })
		
		const embed1 = new MessageEmbed()
		.setTitle('ATTENTION')
		.setDescription(`**You cannot remove yourself from the team, you are the captain!**`)
		.setColor('RED')
		.setTimestamp();


		const embed3 = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('ATTENTION')
		.setDescription(`**The user <@${target.id}> is not part of your team!**`)
		.setColor('RED')
		.setTimestamp();
		if (!target.roles.cache.has("1001966219445944370")) return interaction.editReply({ content : '\n', embeds : [embed3] });
		if (user.id == interaction.user.id) return interaction.editReply({ content : '\n', embeds : [embed1] })
			const teamrole = interaction.guild.roles.cache.get(team.roleID);
			const roleteam = interaction.guild.roles.cache.get(team.teamRoleID);


			const embed = new MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setTitle('Role Remove')
			.setDescription(`**The user <@!${user.id}> has been successfully removed from your team!**`)
			.setColor('GREEN')
			.setTimestamp();
			const channel = interaction.guild.channels.cache.get('1001490161881862184')
			const kick = new MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setTitle('KICK TEAM')
			.setDescription(`**The user ${user} was kicked from the team \`${team.teamName}\`!**`)
			.setColor("RED")
			.setTimestamp();

			const embed4 = new MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setTitle('TEAM')
			.setDescription(`**Hello <@${target.id}>!\n The captain <@${interaction.user.id}> of the team \`${team.teamName}\` removed you from his team!**`)
			.setColor('RED')
			.setTimestamp();
			if (team.captainID == interaction.user.id) {
				await user.send({ embeds : [embed4] });
				await user.roles.remove(teamrole);
				user.roles.remove(roleteam);
				await interaction.editReply({ embeds : [embed] });
				await channel.send({ embeds: [kick] });
				console.log('Comando /kick_team eseguito.');
			}
		}
	}
