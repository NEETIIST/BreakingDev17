import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Devs } from './devs.js';
import { Teams } from '../teams/teams.js';

Meteor.methods({

	userInTeam: function() {
		let username = Meteor.userId();
		let team = Teams.findOne({ $or: [{'captain':username},{'members':username}] })._id;
		if ( team !== undefined )
		{
			Devs.update({"user":username},{$set:{"inTeam":true}})
			Devs.update({"user":username},{$set:{"team":team}})
		}
		else
		{
			throw new Meteor.Error("user-notinteam", 'User is not in a team.');
		}
	},
	userQuitTeam: function() {
		let username = Meteor.userId();
		Devs.update({"user":username},{$set:{"inTeam":false}})
		Devs.update({"user":username},{$set:{"team":false}})
	},
});