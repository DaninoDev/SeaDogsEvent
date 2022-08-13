const { Schema, model } = require('mongoose');

const Myschema = new Schema({

	captainID: {
		type: String,
		required: true,
		index: {
			unique: true,
		},
	},

	teamName: {
		type: String,
		required: true,
	},

	teamRoleID: {
		type: String,
		required: true,
	},

    teamChannelName: {
		type: String,
		required: true,
	},
	categoriaID: {
		type: String,
		required: true,
	},
	canalevocal: {
		type: String,
		required: true,
	},
	canaletext: {
		type: String,
		required: true,
	},
    roleID: {
		type: String,
		required: true,
	},

	bitrate: {
		type: Number,
		required: true,
	},

	userLimit: {
		type: Number,
		required: true,
		default: 5,
	},
	members: {
		type: Array,
		required: true,
		default: []
	}
});

module.exports = model('Team', Myschema, 'Team');