const { SlashCommandBuilder } = require('@discordjs/builders');
const Manage = require('../structures/models/team');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team_role_color')
		.setDescription('Team role color set.')
		.setDMPermission(false)
		.addStringOption(option =>
					option.setName('color')
						.setDescription('The color you want to assign to the team role. (type the name all uppercase or color code)')
						.setRequired(true)),
	async execute(interaction) {
		try {
        await interaction.deferReply();
        const { MessageEmbed } = require('discord.js');
        const colore = interaction.options.getString('color');
            const captain = interaction.guild.members.cache.get(interaction.user.id);
            const team = await Manage.findOne({ captainID: captain.id })
			const numero = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setColor('RED')
            .setDescription(`**You must enter a number that is less than \`16777215\`!**`)
            .setTimestamp();
            const ruolodelteam = await interaction.guild.roles.cache.get(team.teamRoleID)
			if (colore > 16777215) return interaction.followUp({ embeds: [numero] });
			await ruolodelteam.edit({ color: colore });
			//console.log(ruoloedit)
			//console.log(ruolodelteam)
            const embed = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setColor('AQUA')
            .setDescription(`**You have correctly set the role of your team with color ${colore}!**`)
            .setTimestamp();
			var colorevalido = new MessageEmbed()
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true})})
            .setColor('RED')
            .setDescription(`**Enter only numbers and letters!**`)
            .setTimestamp();
            return interaction.followUp({ content: '\n', embeds: [embed], ephemeral: true })
		} catch (error){
			if (error.code === 'COLOR_CONVERT') {
                interaction.followUp({ embeds: [colorevalido] });;
			}
		console.log(error)
		}
        }
    }