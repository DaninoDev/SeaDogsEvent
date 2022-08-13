const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('move')
		.setDescription('Move a user to your channel.')
		.setDMPermission(false)
		.addUserOption(option =>
			option.setName('target')
				.setDescription('The user to be moved')
				.setRequired(true),
		),
	async execute(interaction) {
		const { MessageEmbed } = require('discord.js');
		const { canaleSpostami } = require('../config/config.json');
		const utente = interaction.options.getUser('target');
		const author = interaction.member.guild.members.cache.get(interaction.user.id);
		const canale = author.voice.channel;
		const target = interaction.member.guild.members.cache.get(utente.id);
		const embed = new MessageEmbed()
			.setTitle('MOVE')
			.setDescription(`The user ${target} has been successfully moved to ${canale}`)
			.setColor('GREEN')
			.setTimestamp();
			const embed1 = new MessageEmbed()
		.setTitle('MOVE')
		.setColor('RED')
		.setDescription(`**Join a voice channel first!**`)
		.setTimestamp();
		const embed2 = new MessageEmbed()
		.setTitle('MOVE')
		.setColor('RED')
		.setDescription(`**You can\'t move yourself!**`)
		.setTimestamp();
		const embed3 = new MessageEmbed()
		.setTitle('MOVE')
		.setColor('RED')
		.setDescription(`**The user is not in the channel <#${canaleSpostami}>, let him in.**`)
		.setTimestamp();
		const embed4 = new MessageEmbed()
		.setTitle('MOVE')
		.setColor('RED')
		.setDescription(`**The user is not in a voice channel, let him join <#${canaleSpostami}>!**`)
		.setTimestamp();
		const spostami = interaction.guild.channels.cache.get(canaleSpostami);
		if (!author.voice.channel) return interaction.reply({ content : '\n', embeds: [embed1], ephemeral : true });
		if (interaction.user.id == target.id) return interaction.reply({ content : '\n', embeds: [embed2], ephemeral : true });
		if (!target.voice.channel) return interaction.reply({ content : '\n', embeds: [embed4], ephemeral : true });
		if (target.voice.channel.id != canaleSpostami) return interaction.reply({ content : '\n', embeds: [embed3], ephemeral : true });
		// console.log(target.voice.channel);
		target.voice.setChannel(canale);
		interaction.reply({ embeds : [embed] });
		const channelcommand = interaction.guild.channels.cache.get('1001036571086180453')
		const command = new MessageEmbed()
		.setTitle('COMMANDS LOG')
		.setColor('BLUE')
		.setDescription(`**Bot:** <@1000013593712001075>\n**Command**: \`move\`\n **Author:** <@${interaction.user.id}>\n **User:** <@${utente.id}>`)
		.setTimestamp();
		channelcommand.send({ embeds: [command] })
		console.log('Comando /sposta eseguito.');
	},
};