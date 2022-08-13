/* eslint-disable no-inline-comments */
// !Dichiarazione varibili primarie
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Intents, Permissions, MessageEmbed } = require('discord.js');
const { token, canaleVoiceCreateAC, canaleVoiceCreateBR, canaleVoiceCreateTDM, categoriaVoiceCreateAC, categoriaVoiceCreateBR, categoriaVoiceCreateTDM, keyPerms } = require('./config/config.json');
const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: Object.values(Intents.FLAGS) } );
const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);
const mongoose = require('./structures/mongoose')
const Manage = require('./structures/models/team');
const ModmailList = require('./structures/models/ModmailList');
mongoose.init()


// !Inizializzazione
client.login(token); // ?Login
client.once('ready', () => {
	console.log(`Il bot **${client.user.username}** è online ✅`);
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

tempChannels.registerChannel(canaleVoiceCreateTDM, { // ?Registrazione
	childFormat: (member) => `🎧 | ${member.user.username}'s Channel`,
	childCategory: categoriaVoiceCreateTDM, 
	childAutoDeleteIfEmpty: true,
	childAutoDeleteIfOwnerLeaves: false,
	childMaxUsers: 5,
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
	const usersA = await Manage.find();
	usersA.forEach(async (userA) => {
		if (channel.parentId != categoriaVoiceCreateTDM) return;
		if (member.roles.cache.some(role => role.id === userA.teamRoleID)) {
			await channel.setName(userA.teamChannelName + '\'s Team');
			await channel.permissionOverwrites.edit(userA.teamRoleID, keyPerms);
			await channel.permissionOverwrites 
			await channel.setUserLimit(userA.userLimit);
			await channel.setBitrate(userA.bitrate);
		}
	});
});

//reaction role

client.on("message", message => {
    if (message.content == "$lamignottadellamadonndsadsadasdsadsadasdasdasdasdsaa") {
        const embed = new MessageEmbed() //Crea il tuo embed o messaggio normale
		.setColor("FUCHSIA")
        .setDescription('Welcome to the Sea Dogs Events!\n\n To start competing in our events we suggest you to register your team by filling the form in <#999231975929946163>.\nIf you want to join one, you can look who is recruiting in <#1003602058013855824> or make you known in <#1003588935752101969>.\nFor now you can compete in these 2 activities that we created for now but will be added more in the future:\n\nTDM: a fight on an isle with only a sniper and a pistol where the better one wins\n\nBattle Royale: a full naval fight experience.\n\n**React to the 🏴‍☠️ below and obtain the <@&999097859473420369> role, giving you access to the server.\nReact to the emoji 🍋 to get the role <@&999083450248204298>\nReact to the emoji 🥭 to get the role <@&999083492258357338>**\n\n *By reacting underneath u agree to the rules, and granting you access to the server.*')

        message.channel.send({ embeds: [embed] })
            .then(msg => {
                //Inserire tutte le reazioni che si vogliono
                msg.react("🏴‍☠️")
                msg.react("🍋")
				msg.react("🥭")
            })
    }
})
//Quando viene cliccata una reazione
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return //Le reaction dei bot verranno escluse

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "1003645693874950264") { //Settare id messaggio
        if (messageReaction._emoji.name == "🏴‍☠️") { 
			var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("999097859473420369"); //Settare ruolo
        }
        if (messageReaction._emoji.name == "🍋") { 
			var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("999083450248204298");
        }
		if (messageReaction._emoji.name == "🥭") { 
			var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("999083492258357338");
        }
    }
})
//Quando viene rimossa una reazione
client.on("messageReactionRemove", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "1003645693874950264") {
        if (messageReaction._emoji.name == "🏴‍☠️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("999097859473420369");
        }
        if (messageReaction._emoji.name == "🍋") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("999083450248204298");
        }
		if (messageReaction._emoji.name == "🥭") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("999083492258357338");
        }
    }
})

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

//transcript
const Discord = require('discord.js');

client.on("messageCreate", async message => {
    if (message.content == ">transcript") {
        let chatLog = `-- TICKET TRANSCRIPT #${message.channel.name} --\n\n`

        let messages = await getAllMessages(message.channel)
        messages.reverse().forEach(msg => {
            chatLog += `@${msg.author.tag} ID: ${msg.author.id} - ${msg.createdAt.toLocaleString()}\n`

            if (msg.content) chatLog += `${msg.content}\n`

            if (msg.embeds[0]) {
                chatLog += `Embed:\n`
                if (msg.embeds[0].title) chatLog += `Title: ${msg.embeds[0].title}\n`
                if (msg.embeds[0].description) chatLog += `Description: ${msg.embeds[0].description}\n`
                if (msg.embeds[0].fields[0]) chatLog += `Fields: ${msg.embeds[0].fields.map(x => `${x.name}-${x.value}`).join(", ")}\n`
            }

            if (msg.attachments.size > 0)
                chatLog += `Files: ${msg.attachments.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            if (msg.stickers.size > 0)
                chatLog += `Stickers: ${msg.stickers.map(x => `${x.name} (${x.url})`).join(", ")}\n`

            chatLog += "\n"
        })

        let attachment = new Discord.MessageAttachment(Buffer.from(chatLog, "utf-8"), `chatLog-channel-${message.channel.id}.txt`)

        const modmail = await ModmailList.findOne({ Channel_ID: message.channel.id });
            if (!modmail) return message.channel.send({ content: '**Please use this command in a channel ticket valide!**', ephemeral: true });
        let member = message.guild.members.cache.get(modmail.User_ID);
        let embed = new Discord.MessageEmbed()
            .setTitle("Ticket Transcript")
            .setDescription(`here is the transcript of the ticket of ${member}`)
			.setColor('GOLD')
			.setTimestamp()
		const tickettranscript = message.guild.channels.cache.get('1003626545308500018')
        tickettranscript.send({ embeds: [embed], files: [attachment] })
    }
})

const getAllMessages = async (channel) => {
    let allMessages = []
    let lastMessage

    while (true) {
        const options = { limit: 100 }
        if (lastMessage) options.before = lastMessage

        let messages = await channel.messages.fetch(options)

        allMessages = allMessages.concat(Array.from(messages.values()))

        lastMessage = messages.last().id

        if (messages.size != 100) {
            break
        }
    }

    return allMessages
}

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