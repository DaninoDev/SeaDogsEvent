const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config/config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		console.log('Inizio ricarica comandi slash. ⚠️');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Ricarica comandi slash effettuata correttamente. ✅');
	}
	catch (error) {
		console.error(error);
		const channelerror = interaction.guild.channels.cache.get('1000848602534510662')
		const errore = new MessageEmbed()
		.setTitle('ERROR')
		.setColor('RED')
		.setDescription(`**Bot:** <@1000013593712001075>\n**Error:** \`${error.message}\``)
		.setTimestamp();
		channelerror.send({ content: `<@624674817685192714>`, embeds: [errore] });
		
		console.log('Ricarica comandi slash non riuscita. ❌');
	}
})();