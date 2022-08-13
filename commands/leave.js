const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const Manage = require('../structures/models/team');
const buttonMonthOptions = [
    { customId: 'yes', value: '✅' },
    { customId: 'no', value: '<:cz_cross:590234470221742146>' }
];


module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave_team')
		.setDescription('Leave your current team.')
		.setDMPermission(false),
        
	async execute(interaction) {
        try {
		await interaction.deferReply();
		const { MessageEmbed } = require('discord.js');
        const captain = interaction.guild.members.cache.get(interaction.user.id);
		const team = await Manage.findOne({ members: interaction.user.id })
		const roleteam = interaction.guild.roles.cache.get(team.teamRoleID);
        const capitano = intearaction.guild.members.cache.get(team.captainID)
            
            const captain1 = new MessageEmbed()
            .setTitle('Attention')
            .setColor('RED')
            .setDescription(`**You cannot leave the team, you are the captain!**`)
            .setTimestamp();
    if (interaction.user.id == team.captainID)
    return interaction.editReply({ content: '\n', embeds: [captain1], ephemeral: true });
            const startEmbed = new MessageEmbed()
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                        .setColor('YELLOW')
                        .addField(`**Are you sure you want to leave the team** \`${team.teamName}\`?`, '\n**If Yes, React With ✅**\n**If No, React With ❌**')
                        .setFooter('You Have 1 minute')
                        .setTimestamp();

			const embed = new MessageEmbed()
			.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			.setTitle('LEFT TEAM')
			.setDescription(`**You have successfully left from the team \`${team.teamName}\`!**`)
			.setColor('GREEN')
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
                    let msg = await interaction.editReply({ embeds: [startEmbed], components: [row_first], fetchReply: true })


                    const filter = button => ['yes', 'no'].includes(button.customId) && button.user.id === interaction.user.id;

                    const collector = await msg.awaitMessageComponent({ filter: filter, time: 60000, componentType: 'BUTTON' });
                    const { value } = buttonMonthOptions.find(button => button.customId === collector.customId);
                    const updated_row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('updated_yes')
                            .setEmoji('✅')
                            .setStyle('SUCCESS')
                            .setDisabled()
                    );

                    if (value === '✅') {
                        try {
                const channel = interaction.guild.channels.cache.get('1001490161881862184')
                            
                const left = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle('LEFT TEAM')
                .setDescription(`**The user ${captain} left the team \`${team.teamName}\`!**`)
                .setColor("RED")
                .setTimestamp();
                const leftcapitano = new MessageEmbed()
                .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
                .setTitle('LEFT TEAM')
                .setDescription(`**The user ${captain} left your team!**`)
                .setColor("RED")
                .setTimestamp();
			if (captain) {
				await captain.roles.remove('1001966219445944370');
				captain.roles.remove(roleteam);
                capitano.send({ embeds: [leftcapitano] })
                team.members = team.members.filter(item => item !== interaction.user.id)
                await team.save()
                await collector.update({ components: [updated_row] });
				await interaction.editReply({ embeds : [embed] });
                await channel.send({ embeds: [left] });
             }} catch (error) {
                console.error(error);
             } 
            } else {
            const ticketcancelled = new MessageEmbed()
            .setTitle('Attention')
            .setColor('RED')
            .setDescription(`**You didn't leave the team: \`${team.teamName}\`!**`)
            .setTimestamp();
            await collector.update({ components: [] });
            return interaction.editReply({embeds: [ticketcancelled]});
           }
            } catch (error) {
            const { MessageEmbed } = require('discord.js')
            const timeout = new MessageEmbed()
            .setTitle('Attention')
            .setColor('RED')
            .setDescription(`Timeout`)
            .setTimestamp();

            
            if (error.code === 'INTERACTION_COLLECTOR_ERROR') {
                interaction.editReply({embeds: [timeout]});;
            } else {
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
                console.log('Comando /left_team eseguito.');
                console.error(error); 
                return interaction.editReply({ content: '\n', embeds: [errore1], ephemeral: true });
            }}
        }
    }