import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Teams } from './teams.js';
import { Random } from 'meteor/random'
import { Devs } from '/imports/api/devs/devs.js';

Meteor.methods({

	setUpTeam: function(team_id) {
		// Generates random hex password and sets validated to false
		let user =  this.userId;
		let pin = (Random.hexString(4));
		if ( Teams.findOne({"_id":team_id}).setup == true )
			throw new Meteor.Error("team-set", 'Team is already setup');
		else
		{
			Teams.update({"_id":team_id},{$set:{"captain":user}});
			Teams.update({"_id":team_id},{$set:{"pincode":pin}});
			Teams.update({"_id":team_id},{$set:{"validated":false}});
			Teams.update({"_id":team_id},{$set:{"setup":true}});
			Teams.update({"_id":team_id},{$set:{"members":[]}});
			Teams.update({"_id":team_id},{$set:{"pending":false}});
			Teams.update({"_id":team_id},{$set:{"registration":undefined}});
		}
	},

	joinTeam: function(team_id, pin){
		if ( Teams.find({"_id":team_id}).count() == 0 )
			throw new Meteor.Error("no-team", 'Team doesnt exist');
		let team = Teams.findOne({"_id":team_id}) ;
		let user =  this.userId;
		if ( team.pincode != pin )
			throw new Meteor.Error("wrong-pin", 'Wrong Pin Code');
		else if (Devs.find({"user":user}).count() == 0 )
			throw new Meteor.Error("no-profile", 'This user doesnt have profile info');
		else if (Teams.findOne({"_id":team_id}).members.length > 3)
			throw new Meteor.Error("full-team", 'Team Already Has 4 members');
		else
		{
			Teams.update({"_id":team_id},{ $push: { members: Meteor.userId() } });
			Meteor.call('userInTeam');
		}
	},

	userHasTeam: function()	{
		let u =  this.userId;
		return Devs.findOne({'user':u}).inTeam ;
	},

	requestPin: function(team_id){
		let user =  this.userId;
		if ( Teams.find({"_id":team_id}).count() == 0 )
			throw new Meteor.Error("no-team", 'Team doesnt exist');
		else if ( Teams.findOne({"_id":team_id}).captain != user  )
			throw new Meteor.Error("not-owner", 'Logged user is not the captain');
		else
		{
			return Teams.findOne({"_id":team_id}).pincode ;
		}
	}
});