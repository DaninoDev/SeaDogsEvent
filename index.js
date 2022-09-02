/* eslint-disable no-inline-comments */
// !Dichiarazione varibili primarie
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, Permissions, MessageEmbed } = require('discord.js');
const { token, canaleVoiceCreateAC, canaleVoiceCreateBR, canaleVoiceCreateSTREAM, categoriaVoiceCreateAC, categoriaVoiceCreateBR, categoriaVoiceCreateSTREAM, keyPerms, ChannelClockID, Timezone, Format, UpdateInterval, StreamerPerms} = require('./config/config.json');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: Object.values(Intents.FLAGS) } );
const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);
const mongoose = require('./structures/mongoose')
const Manage = require('./structures/models/team');
const ModmailList = require('./structures/models/ModmailList');
mongoose.init()
const moment = require('moment');
const tz = require('moment-timezone');


// !Inizializzazione
client.login(token); // ?Login
client.once('ready', () => {
	console.log(`Il bot **${client.user.username}** è online ✅ - ${moment().format("DD MMMM YYYY, HH:mm:ss")}`);
	client.user.setActivity('Sea Dogs Event', { type: 'WATCHING' });
	client.user.setStatus('online')
	mongoose.start
});

tempChannels.registerChannel(canaleVoiceCreateAC, { // ?Registrazione
	childFormat: (member) => `🎧 | ${member.user.username}'s Channel`,
	childCategory: categoriaVoiceCreateAC, 
	childAutoDeleteIfEmpty: true,
	childAutoDeleteIfOwnerLeaves: false,
	childMaxUsers: 5,
	childBitrate: 64000,
});

tempChannels.registerChannel(canaleVoiceCreateBR, { // ?Registrazione
	childFormat: (member) => `🎧 | ${member.user.username}'s Channel`,
	childCategory: categoriaVoiceCreateBR,
	childAutoDeleteIfEmpty: true,
	childAutoDeleteIfOwnerLeaves: false,
	childMaxUsers: 5,
	childBitrate: 64000,
});

tempChannels.registerChannel(canaleVoiceCreateSTREAM, { // ?Registrazione
	childFormat: (member, count) => `🟣 | Sala Streamer #${count}`,
	childCategory: categoriaVoiceCreateSTREAM, 
	childAutoDeleteIfEmpty: true,
	childAutoDeleteIfOwnerLeaves: false,
	childMaxUsers: 0,
	childBitrate: 64000,
});

tempChannels.on('childCreate', async (member, channel) => { // ?Editing
	const usersA = await Manage.find();
	usersA.forEach(async (userA) => {
		if (channel.parentId != categoriaVoiceCreateAC) return;
		if (member.roles.cache.some(role => role.id === userA.teamRoleID)) {
			await channel.setName(userA.teamChannelName + '\'s Team');
			await channel.permissionOverwrites.edit(userA.teamRoleID, keyPerms);
			await channel.permissionOverwrites 
			await channel.setUserLimit(userA.userLimit);
			await channel.setBitrate(userA.bitrate);
		}
	});
});
tempChannels.on('childCreate', async (member, channel) => { // ?Editing
	const usersA = await Manage.find();
	usersA.forEach(async (userA) => {
		if (channel.parentId != categoriaVoiceCreateBR) return;
		if (member.roles.cache.some(role => role.id === userA.teamRoleID)) {
			await channel.setName(userA.teamChannelName + '\'s Team');
			await channel.permissionOverwrites.edit(userA.teamRoleID, keyPerms);
			await channel.permissionOverwrites 
			await channel.setUserLimit(userA.userLimit);
			await channel.setBitrate(userA.bitrate);
		}
	});
});
tempChannels.on('childCreate', async (member, channel) => { // ?Editing
		if (channel.parentId != categoriaVoiceCreateSTREAM) return;
		if (member.roles.cache.some(role => role.id === "1006286188484767926")) {
			await channel.permissionOverwrites.edit("1006286188484767926", StreamerPerms);
			await channel.permissionOverwrites 
			await channel.setUserLimit("0");
			await channel.setBitrate("64000");
		}
});


const memberadd = require("./events/MemberAdd");
memberadd(client);

const memberemove = require("./events/MemberRemove");
memberemove(client);

//member join
client.on("guildMemberAdd", (member) => {
	const embed = new MessageEmbed()
	.setTitle('USER JOINED')
	.setDescription(`**The user <@${member.id}> has successfully joined the server!**`)
	.setColor('GREEN')
	.setTimestamp();
	const channel1 = member.guild.channels.cache.get('1003565862088867841')
	channel1.send({ embeds: [embed] })
})

//member left
client.on("guildMemberRemove", (member) => {
	const embed = new MessageEmbed()
	.setTitle('USER LEFT')
	.setDescription(`**The user <@${member.id}> has left the server!**`)
	.setColor('RED')
	.setTimestamp();
	const channel1 = member.guild.channels.cache.get('1003565862088867841')
	channel1.send({ embeds: [embed] })
})


client.once('ready', () => {
const timeNow = moment().tz(Timezone).format(Format);
 const clockChannel = client.channels.cache.get(ChannelClockID);
  clockChannel.edit({ name: `🕒 ${timeNow}` }, 'Clock update')
    .catch(console.error);
  setInterval(() => {
    const timeNowUpdate = moment().tz(Timezone).format(Format);
    clockChannel.edit({ name: `🕒 ${timeNowUpdate}` }, 'Clock update')
      .catch(console.error);
  }, UpdateInterval);
});


// !Comandi e eventi
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	}
	catch (error) {
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
			interaction.reply({ content: '\n', embeds: [errore1], ephemeral: true })
	}
});
