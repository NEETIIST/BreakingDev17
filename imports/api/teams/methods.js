import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Teams } from './teams.js';
import { Random } from 'meteor/random'

Meteor.methods({

	setUpTeam: function() {
		// Generates random hex password and sets validated to false
		let user =  this.userId;
		console.log(user);
		let team_id = Teams.findOne({ $or: [{'captain':user},{'members':user}] })._id;
		let pin = (Random.hexString(4));
		if ( Teams.findOne({"_id":team_id}).setup == true )
			throw new Meteor.Error("team-set", 'Team is already setup');
		else
		{
			Teams.update({"_id":team_id},{$set:{"pincode":pin}})
			Teams.update({"_id":team_id},{$set:{"validated":false}})
			Teams.update({"_id":team_id},{$set:{"setup":true}})
			Teams.update({"_id":team_id},{$set:{"members":[]}})
		}
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