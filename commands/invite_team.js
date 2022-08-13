const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const Manage = require('../structures/models/team');
const buttonMonthOptions = [
    { customId: 'yes', value: '✅' },
    { customId: 'no', value: '<:cz_cross:590234470221742146>' }
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite_team')
		.setDescription('Invite a user to the team.')
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to invite to the team.')
				.setRequired(true)),
	async execute(interaction) {
		try {

		await interaction.deferReply();
		const { MessageEmbed } = require('discord.js');
		const target = interaction.options.getMember('target');
		var user = interaction.guild.members.cache.get(target.id);
		const captain = interaction.guild.members.cache.get(interaction.user.id);
		const team = await Manage.findOne({ captainID: captain.id })
		const invitesend = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('INVITE SENT')
		.setDescription(`**You invited ${user} in your team!**`)
		.setColor('GREEN')
		.setTimestamp();

		const autoadd = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('ATTENTION')
		.setDescription(`**You cannot add yourself to the team, you are already there!**`)
		.setColor('RED')
		.setTimestamp();

		const alreafyteam = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('ATTENTION')
		.setDescription(`**The user <@${target.id}> is already on a team!**`)
		.setColor('RED')
		.setTimestamp();

		const rolenotinvite = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('INVITE')
		.setDescription(`**You cannot invite this person because he is an administrator!**`)
		.setColor('RED')
		.setTimestamp();
		await interaction.editReply({ content : 'look in dm!', ephemeral : true })
		if (target.roles.cache.has("1001966219445944370")) return interaction.editReply({ content : '\n', embeds : [alreafyteam] });
		if (target.roles.cache.has("999607610200313937")) return interaction.editReply({ content : '\n', embeds : [rolenotinvite] });
		if (target.roles.cache.has("999721562808782878")) return interaction.editReply({ content : '\n', embeds : [rolenotinvite] });
		if (user.id == interaction.user.id) return interaction.editReply({ content : '\n', embeds : [autoadd] })
			const roleID = interaction.guild.roles.cache.get(team.roleID);
			const teamroleID = interaction.guild.roles.cache.get(team.teamRoleID);
			const channel = interaction.guild.channels.cache.get('1001490161881862184')
			captain.send({ embeds: [invitesend] });

			const startEmbed = new MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setColor('YELLOW')
			.setDescription(`**Hello <@!${target.id}>!\n<@!${interaction.user.id}> Invited you to the team** \`${team.teamName}\`!\n\n**If you accept, React With ✅**\n**If you decline, React With ❌**`)
			.setFooter('You Have 2 minutes')
			.setTimestamp();


                const invite = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle('JOIN TEAM')
                .setDescription(`**The user ${user} joined the team \`${team.teamName}\`!**`)
                .setColor("FUCHSIA")
                .setTimestamp();





				const row_first = new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('yes')
						.setEmoji('✅')
						.setStyle('SUCCESS'),
					new MessageButton()
						.setCustomId('no')
						.setEmoji('<:cz_cross:590234470221742146>')
						.setStyle('DANGER')
				);
			var msg = await user.send({ embeds: [startEmbed], components: [row_first], fetchReply: true })


			const filter = button => ['yes', 'no'].includes(button.customId) && button.user.id === user.id;

			const collector = await msg.awaitMessageComponent({ filter: filter, time: 120000, componentType: 'BUTTON' });
			const { value } = buttonMonthOptions.find(button => button.customId === collector.customId);
			const updated_row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('updated_yes')
					.setEmoji('✅')
					.setStyle('SUCCESS')
					.setDisabled()
			);
			const accepted = new MessageEmbed()
			.setTitle('JOIN TEAM')
			.setDescription(`**You accepted the invite of ${captain}!\n Welcome to the team \`${team.teamName}\`!**`)
			.setColor('GREEN')
			.setTimestamp();
				console.log(team.teamName)
			const acceptedcaptain = new MessageEmbed()
			.setTitle('INVITE ACCEPTED')
			.setDescription(`**${user} Accepted the invitation to join your team!**`)
			.setColor('GREEN')
			.setTimestamp();

			if (value === '✅') {
				try {


			if (team.captainID == interaction.user.id) {
				await user.roles.add(teamroleID);
				await user.roles.add(roleID);
				team.members.push(user.id)
				await team.save()
				await collector.update({ components: [updated_row] });
				await msg.edit({ embeds : [accepted] })
				await captain.send({ embeds : [acceptedcaptain] });
				await channel.send({ embeds: [invite] });
			}} catch (error) {
				console.error(error);
				
			}	
			}  else {
				const usernotaccept = new MessageEmbed()
				.setTitle('INVITE DECLINED')
				.setColor('RED')
				.setDescription(`**You have decided to decline the invitation!**`)
				.setTimestamp();

				const usernotacceptcaptain = new MessageEmbed()
				.setTitle('INVITE DECLINED')
				.setColor('RED')
				.setDescription(`**The user ${user} has decided to decline the invitation from the team!**`)
				.setTimestamp();
				await collector.update({ components: [] });
				captain.send({ embeds: [usernotacceptcaptain] });
				return msg.edit({ embeds: [usernotaccept] });

			   }}
				catch (error) {
				const { MessageEmbed } = require('discord.js')
				const timeout = new MessageEmbed()
				.setTitle('TIMEOUT')
				.setColor('RED')
				.setDescription(`**You haven't selected any options in time!**`)
				.setTimestamp();
	
				
				if (error.code === 'INTERACTION_COLLECTOR_ERROR') {
					return user.send({ embeds: [timeout]} );;
				} else {
		}
		const errore = new MessageEmbed()
                .setTitle('ERROR')
                .setColor('RED')
                .setDescription(`**Bot:** <@983717891948044298>\nError: \`${error.message}\``)
                .setTimestamp();
                const errore1 = new MessageEmbed()
                .setTitle('ERROR')
                .setColor('RED')
                .setDescription(`Error: \`${error.message}\`\nif the error persists, contact the developer <@624674817685192714>`)
                .setTimestamp();
                const channel = interaction.guild.channels.cache.get('1000848602534510662')
                channel.send({ content: `<@624674817685192714>`, embeds: [errore] });
		console.log('Comando /invite_team eseguito.');
		console.error(error); 
                return interaction.reply({ content: '\n', embeds: [errore1], ephemeral: true });
	}}
};