module.exports = (client) => {
	client.on("guildMemberRemove", message => {
		const membri = message.guild.members.cache;
		var canale = client.channels.cache.get("1003398603882111027")
		canale.setName("Pirates: " + `${membri.filter(m => !m.user.bot).size}`) //Impostare il nome del canale
	});
	
}