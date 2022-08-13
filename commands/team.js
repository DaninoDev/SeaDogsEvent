const { SlashCommandBuilder } = require('@discordjs/builders');
const Manage = require('../structures/models/team');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team')
		.setDescription('Team settings.')
		.setDMPermission(false)
		.addSubcommand(subcommand =>
			subcommand.setName('manage')
				.setDescription('Team settings.')
				.addStringOption(option =>
					option.setName('action')
						.setDescription('Action to be performed.')
						.setRequired(true)
						.addChoices(
							{ name : 'create', value : 'new' },
							{ name : 'remove', value : 'rem' },
						))
				.addUserOption(option =>
					option.setName('captain')
						.setDescription('Team captain.')
						.setRequired(true))
						.addUserOption(option =>
							option.setName('member1')
								.setDescription('Team member1.')
								.setRequired(false))
								.addUserOption(option =>
									option.setName('member2')
										.setDescription('Team member2.')
										.setRequired(false))
										.addUserOption(option =>
											option.setName('member3')
												.setDescription('Team member3.')
												.setRequired(false))),

	async execute(interaction) {
		const { MessageEmbed } = require('discord.js');
		if (interaction.options.getSubcommand() === 'manage') {
			const azione = interaction.options.getString('action');
			const userO = interaction.options.getUser('captain');
			const member1 = interaction.options.getUser('member1');
			const member2 = interaction.options.getUser('member2');
			const member3 = interaction.options.getUser('member3');
			const user = interaction.guild.members.cache.get(userO.id);
			const member1r = interaction.guild.members.cache.get(member1.id);
			const member2r = interaction.guild.members.cache.get(member2.id);
			const member3r = interaction.guild.members.cache.get(member3.id);
			if (azione == 'new') {
				const utente = await Manage.findOne({ captainID: user.id });
		const captain = new MessageEmbed()
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setTitle('TEAM  CREATE')
		.setDescription(`**The user ${user} is already a team captain!**`)
		.setColor('RED')
		.setTimestamp();

				if (utente) return interaction.reply({ embeds: [captain] });
				const filter = m => interaction.user.id === m.author.id;
				let nomeCanale = ''
				let nomeCanale1 = ''
				let nomeTeam = ''
				let bitrate = ''
				let bitrateKb = ''
				let nomeRuolo = ''
				let ruolo = ''
				let categoria = ''
				let categoriaName = ''
				let canalevocalName = ''
				let canaletextName = ''
				let canalevocal = ''

				const namechannel = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTitle('TEAM  CREATE')
				.setDescription(`**Enter the team name. (it will also be the name of their channel and category!) \n(If the team has an emoji, use the feature "Win + .")!**`)
				.setColor('YELLOW')
				.setFooter({ text: 'You have 60 seconds!'})
				.setTimestamp();
				const bitrateset = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTitle('TEAM  CREATE')
				.setDescription(`**Now enter the bitrate that their channels will have! (The captain can modify it later)\n\nIt must be a value between \`8 and 128\`!**`)
				.setColor('YELLOW')
				.setFooter({ text: 'You have 60 seconds!'})
				.setTimestamp();

				const tempo = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTitle('TEAM  CREATE')
				.setDescription(`**You haven't written anything, try again!**`)
				.setColor('RED')
				.setTimestamp();


				const databaseupload = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTitle('TEAM CREATE')
				.setDescription(`**Wait, I'm creating the Role, Category and Configurations on the DataBase!**`)
				.setColor('YELLOW')
				.setTimestamp();
				const biterr = new MessageEmbed()
				.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
				.setTitle('TEAM CREATE')
				.setDescription(`**You must enter a number between \`8 and 128\`!**`)
				.setColor('YELLOW')
				.setTimestamp();
				await interaction.reply({ embeds: [namechannel] });
				await interaction.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
				.then(msg => {
					nomeCanale = msg.first().content;
					nomeTeam = msg.first().content;
					categoriaName = msg.first().content;
					canaletextName = msg.first().content;
					canalevocalName = msg.first().content;
					interaction.editReply({ embeds: [bitrateset] });
				})
				.catch((error) => {
					console.error(error);
					return interaction.editReply({ embeds: [tempo] });
				});
				await interaction.channel.awaitMessages({ filter, time: 60000, max: 1, errors: ['time'] })
				.then(async msg => {
					bitrate = msg.first().content;
					bitrateKb = msg.first().content;
					bitrate += '000';
					bitrate = parseInt(bitrate);
					if (bitrate > 128000 || bitrate < 8000) return interaction.followUp({ embeds: [biterr] });
					nomeRuolo = nomeTeam;
					nomeCanale1 = '🎧│' + nomeCanale
					canalevocalName = '🎧│' + nomeCanale
					await interaction.editReply({ embeds: [databaseupload] });
				}).catch((error) => {
					console.error(error);
					return interaction.editReply({ content: '\n', embeds: [tempo] });
				});
				await interaction.guild.roles.create({
					name : nomeRuolo,
					reason : `New team created (${nomeTeam})`,
					position : interaction.guild.roles.cache.get('999734825286127718').position,
			});
					ruolo = await interaction.guild.roles.cache.find(r => r.name === nomeRuolo);
					if (!ruolo) return interaction.editReply('ciao')
					await user.roles.add(ruolo.id);
					member1r.roles.add(ruolo.id);
					member2r.roles.add(ruolo.id);
					member3r.roles.add(ruolo.id);
					member1r.roles.add('1001966219445944370');
					member2r.roles.add('1001966219445944370');
					member3r.roles.add('1001966219445944370');
					user.roles.add('999734825286127718');
					user.roles.add('1001966219445944370');
					
					await interaction.guild.channels.create(categoriaName, {
						type: 'GUILD_CATEGORY',
						position: 5,
						reason: `New team created! (${nomeTeam})`,
						permissionOverwrites: [
							{ id: ruolo.id, //Ruolo del team
								allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'STREAM', 'USE_VAD', 'CREATE_INSTANT_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'READ_MESSAGE_HISTORY', 'USE_APPLICATION_COMMANDS', 'EMBED_LINKS'],
								deny: ['MANAGE_ROLES', 'MANAGE_CHANNELS', 'PRIORITY_SPEAKER', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'MENTION_EVERYONE', 'MANAGE_MESSAGES', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS'],
							},
							{
								id: '999097859473420369', //Ruolo pirate
								deny: ['CONNECT', 'VIEW_CHANNEL'],
							},
							{
								id: user.id, //Capitano (utente)
								allow: ['VIEW_CHANNEL', 'CONNECT', 'USE_VAD', 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'SEND_MESSAGES', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'USE_APPLICATION_COMMANDS'],
								deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'PRIORITY_SPEAKER', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'EMBED_LINKS', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS'],
							},
							{
								id: '999607153151197184', //Ruolo staff
								allow: ['VIEW_CHANNEL', 'CONNECT', 'CREATE_INSTANT_INVITE', 'USE_VAD', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'USE_APPLICATION_COMMANDS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS'],
								deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'PRIORITY_SPEAKER', 'EMBED_LINKS', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
							},
							{
								id: '999046564360241173', //Ruolo everyone
								deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'PRIORITY_SPEAKER', 'EMBED_LINKS', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'CONNECT', 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'USE_APPLICATION_COMMANDS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS'],
							}
						]});

						categoria = await interaction.guild.channels.cache.find(r => r.name === categoriaName);
						const createChannel = await interaction.guild.channels.create('🍻 general', {
							type: 'GUILD_TEXT',
							parent: categoria.id,
							topic: `Main "${nomeTeam}" chat where to discuss, chat, drink grog!`,
							reason:`New team created! (${nomeTeam})`,
							permissionOverwrites: [
								{ id: '999097859473420369',
								deny: ['VIEW_CHANNEL'],
							},
							{
								id: '999607153151197184', //Ruolo staff
								allow: ['VIEW_CHANNEL', 'CONNECT', 'CREATE_INSTANT_INVITE', 'USE_VAD', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'USE_APPLICATION_COMMANDS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS'],
								deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'PRIORITY_SPEAKER', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES'],
							},
							{ id: ruolo.id, //Ruolo del team
							allow: ['VIEW_CHANNEL', 'CONNECT', 'SPEAK', 'USE_VAD', 'STREAM', 'CREATE_INSTANT_INVITE', 'SEND_MESSAGES', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'READ_MESSAGE_HISTORY', 'USE_APPLICATION_COMMANDS', 'EMBED_LINKS'],
							deny: ['MANAGE_ROLES', 'MANAGE_CHANNELS', 'PRIORITY_SPEAKER', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'EMBED_LINKS', 'MENTION_EVERYONE', 'MANAGE_MESSAGES', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS'],
							},
							{							
							id: user.id, //Capitano (utente)
							allow: ['VIEW_CHANNEL', 'CONNECT', 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'SEND_MESSAGES', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'READ_MESSAGE_HISTORY', 'USE_APPLICATION_COMMANDS'],
							deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'USE_VAD', 'PRIORITY_SPEAKER', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'EMBED_LINKS', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS'],
							},
							{							
								id: '999046564360241173', //Ruolo everyone
								deny: ['MANAGE_CHANNELS', 'MANAGE_ROLES', 'PRIORITY_SPEAKER', 'EMBED_LINKS', 'MENTION_EVERYONE', 'SEND_TTS_MESSAGES', 'MANAGE_EVENTS', 'READ_MESSAGE_HISTORY', 'SEND_MESSAGES', 'VIEW_CHANNEL', 'CONNECT', 'CREATE_INSTANT_INVITE', 'CONNECT', 'SPEAK', 'STREAM', 'MOVE_MEMBERS', 'ATTACH_FILES', 'ADD_REACTIONS', 'USE_EXTERNAL_EMOJIS', 'USE_EXTERNAL_STICKERS', 'MANAGE_MESSAGES', 'USE_APPLICATION_COMMANDS', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS'],
							}
					],
					
				});
				const createsucc = new MessageEmbed()
				.setAuthor({ name: 'Sea Dogs Events', iconURL: 'https://media.discordapp.net/attachments/850104579986161664/1002317229255311471/logo_eventi_SoT_2_senza_sfondo.gif'})
				.setColor("FUCHSIA")
				.setDescription(`Welcome <@&${ruolo.id}> to the Sea Dogs Events, your team creation has been completed successfully, from now on you are able to engage with other team in our events.\nFor captains, if u do **"/"** u will see the various commands u can do, like changing your team role hex color or inviting people. If u need help with anything feel free to contact staff through this chat or the ticket bot!\n\n For any bot related problem, open a ticket via <@983717891948044298> and expose the problem by requesting to speak to a developer.`)
				.setTimestamp();


				await createChannel.send({ embeds: [createsucc] })
				 await interaction.guild.channels.create(canalevocalName, {
					type: 'GUILD_VOICE',
					parent: categoria.id,
					reason:`New team created! (${nomeTeam})`,
					bitrate: bitrate
				});
				const teamcreated = new MessageEmbed()
				.setTitle('TEAM CREATED!')
				.setDescription(`**The captain's team <@${user.id}> was successfully created by administrator <@${interaction.user.id}>!**`)
				.setColor('GREEN')
				.setTimestamp()
				const channelteam = interaction.guild.channels.cache.get('1001490161881862184')
				channelteam.send({ embeds: [teamcreated] })
				try {
					canalevocal = await interaction.guild.channels.cache.find(r => r.name === canalevocalName);
					canaletext = await interaction.guild.channels.cache.find(r => r.name === canaletextName);
					categoria = await interaction.guild.channels.cache.find(r => r.name === categoriaName);
					await Manage.create({
						captainID: user.id,
						teamName: nomeTeam,
						teamRoleID: ruolo.id,
						roleID: '1001966219445944370',
						canaletext: createChannel.id,
						canalevocal: canalevocal.id,
						categoriaID: categoria.id,
						teamChannelName: nomeCanale1,
						bitrate: bitrate,
						userLimit: 5,
						members: [user.id, member1, member2, member3]
						
					});
					const embed = new MessageEmbed()
					.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
					.setTitle('Team created successfully!')
					.setDescription('**All settings are successfully!\n The team is ready to receive users!.**')
					.setColor('GREEN')
					.setTimestamp()
					.setFields(
						{ name : 'Captain', value : `<@!${user.id}>`, inline : true },
						{ name : 'Role', value : `<@&${ruolo.id}>`, inline : true },
						{ name : 'Team Name', value : nomeTeam, inline : true },
						{ name : 'Channel Name', value : nomeCanale1, inline : true },
						{ name : 'Bitrate', value : `**${bitrateKb}Kb/s**`, inline : true },
						{ name : 'Userlimit', value : `**5**`, inline : true },
						);
					await interaction.editReply({ embeds : [embed] });
				} catch (error) {
					console.error(error)
					
					const problema = new MessageEmbed()
					.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
					.setTitle('TEAM CREATE!')
					.setDescription('**There was a problem loading the various configurations on the database! Please contact <@624674817685192714>!**')
					.setColor('RED')
					.setTimestamp()
					await interaction.editReply({ embeds: [problema] });
				}
				
				
				
			}
			
			
					else if (azione == 'rem') {
						const norem = new MessageEmbed()
						.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
							.setTitle('TEAM DELETE!')
							.setDescription(`**The user ${user} is not the captain of a crew!**`)
							.setColor('RED')
							.setTimestamp()
				const utente = await Manage.findOne({ captainID: user.id });
				if (!utente) return interaction.reply({ embeds: [norem] });
				const ruolo = await interaction.guild.roles.cache.get(utente.teamRoleID);
				const categoriad1 = await interaction.guild.channels.cache.get(utente.categoriaID);
				const channelvocald1 = await interaction.guild.channels.cache.get(utente.canalevocal);
				const channeltextd1 = await interaction.guild.channels.cache.get(utente.canaletext);
				await ruolo.delete();
				await channelvocald1.delete();
				await channeltextd1.delete();
				await categoriad1.delete();
				await user.roles.remove('1001966219445944370')
				await user.roles.remove('999734825286127718')
				for (var member of utente.members) {
					await interaction.guild.members.cache.get(member).roles.remove("1001966219445944370");
				  }
				await Manage.deleteOne({ captainID: user.id });
					const team = new MessageEmbed()
					.setTitle('TEAM DELETED!')
					.setDescription(`**The team of <@${user.id}> has been deleted by administrator <@${interaction.user.id}>!**`)
					.setColor('RED')
					.setTimestamp()
					const channelteam = interaction.guild.channels.cache.get('1001490161881862184')
				channelteam.send({ embeds: [team] })
				
			}
		}
		console.log('Comando /manage eseguito')
	},
};
