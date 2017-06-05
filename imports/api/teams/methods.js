import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Teams } from './teams.js';
import { Random } from 'meteor/random'

Meteor.methods({

	setUpTeam: function(team_id) {
		// Generates random hex password and sets validated to false
		let pin = (Random.hexString(4));
		Teams.update({"_id":team_id},{$set:{"pincode":pin}})
		Teams.update({"_id":team_id},{$set:{"validated":false}})
		console.log(Teams.findOne({"_id":team_id}));
	},
});