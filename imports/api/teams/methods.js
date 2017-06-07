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
		Teams.update({"_id":team_id},{$set:{"members":[]}})
	},

	joinTeam: function(team_id, pin){
		let team = Teams.findOne({"_id":team_id}) ;
		if ( team.pincode != pin )
			throw new Meteor.Error("wrong-pin", 'Wrong Pin Code');
		else if (Teams.findOne({"_id":team_id}).members.length)
			throw new Meteor.Error("full-team", 'Team Already Has 4 members');
		else
		{
			Teams.update({"_id":team_id},{ $push: { members: Meteor.userId() } });
			Meteor.call('userInTeam', Meteor.userId(), team_id);
		}
		// STILL TO DO HERE:
		// - Check user as teamed up
		// - Redirects on the client-side
		// - Add way to contact team captain to join
	},
});