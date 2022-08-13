const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, MessageEmbed } = require('discord.js');
const { PermissionFlagsBits } = require('discord-api-types/v10');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Delete a number of messages.')
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
		.addNumberOption(option =>
			option.setName('message')
				.setDescription('Number of messages to be deleted.')
				.setRequired(true)),
	async execute(interaction) {
		const msg = interaction.options.getNumber('message');
		if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES, true)) {
			interaction.reply({content: `**You Do Not Have Permissions To Use This Command!**`, ephemeral: true });;
			
		}
		const number = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('CLEAR')
		.setColor('ORANGE')
		.setDescription(`**You must enter a number between\n\n\`\`\`css\n1 and 99\`\`\`**`)
		.setTimestamp();

		if (msg < 1 || msg > 99) {
			return interaction.reply({ content: '\n', embeds: [number], ephemeral: true });
		}
		await interaction.channel.bulkDelete(msg, true).catch(error => {
			console.error(error);
			const channelerror = interaction.guild.channels.cache.get('1000848602534510662')
			const errore = new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .setDescription(`**Bot:** <@1000013593712001075>\n**Error:** \`${error.message}\``)
            .setTimestamp();
			const errore1 = new MessageEmbed()
            .setTitle('ERROR')
            .setColor('RED')
            .setDescription(`**Error:** \`${error.message}\`\nif the error persists, contact the developer <@624674817685192714>`)
            .setTimestamp();
			channelerror.send({ content: `<@624674817685192714>`, embeds: [errore] });
			interaction.reply({ content: '\n', embeds: [errore1], ephemeral: true });
			return;
		});
		
		const channelcommand = interaction.guild.channels.cache.get('1001036571086180453')
		const command = new MessageEmbed()
		.setTitle('COMMANDS LOG')
		.setColor('BLUE')
		.setDescription(`**Bot:** <@1000013593712001075>\n**Command**: \`clear\`\n **Messages deleted:** \`${msg}\`\n **Staff member:** <@${interaction.user.id}>`)
		.setTimestamp();
		const clear = new MessageEmbed()
		.setTitle('CLEAR')
		.setColor('GREEN')
		.setDescription(`${msg} Messages correctly deleted!`)
		.setTimestamp();
		interaction.reply({ content: '\n', embeds: [clear], ephemeral: true })
		channelcommand.send({ embeds: [command] })
		console.log('Comando /clear eseguito.');
	},
};