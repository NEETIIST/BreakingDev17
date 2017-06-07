import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Devs } from './devs.js';
import { Teams } from '../teams/teams.js';

Meteor.methods({

	userInTeam: function(username, team) {
		Devs.update({"user":username},{$set:{"inTeam":true}})
		let teamName = Teams.findOne({"_id":team})._id;
		Devs.update({"user":username},{$set:{"inTeam":true}})
		Devs.update({"user":username},{$set:{"team":teamName}})
	},
	userQuitTeam: function(username) {
		Devs.update({"user":username},{$set:{"inTeam":false}})
		Devs.update({"user":username},{$set:{"team":false}})
	},
});