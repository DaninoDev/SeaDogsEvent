module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		const { ruoloMembro} = require('../config/config.json');
		const role = member.guild.roles.cache.get(ruoloMembro);
			member.roles.add(role);
    }
}