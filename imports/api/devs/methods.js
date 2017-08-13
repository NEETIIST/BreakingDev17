import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Devs } from './devs.js';
import { Teams } from '../teams/teams.js';
import { Volunteers } from '../volunteers/volunteers.js';

Meteor.methods({

	setUpDev: function(id){
		let username = this.userId;
		if ( Devs.findOne({"_id":id}).user === undefined )
		{	
			// In need of better testing
			Devs.update({"_id":id},{$set:{"user":username}})
			Devs.update({"_id":id},{$set:{"inTeam":false}})
			Devs.update({"_id":id},{$set:{"payment":false}})
			Devs.update({"_id":id},{$set:{"volunteer":false}})
		}
	},

	userInTeam: function() {
		let username = this.userId;
		let team = Teams.findOne({ $or: [{'captain':username},{'members':username}] });
		if ( team !== undefined )
		{
			Devs.update({"user":username},{$set:{"inTeam":true}})
			Devs.update({"user":username},{$set:{"team":team._id}})
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

	userHasProfile: function(){
		let u = Meteor.users.findOne({'_id': this.userId});
		return Devs.findOne({'user':this.userId}) ? true : false ;
	},

	devIsVolunteer: function(id){
		let u = Volunteers.findOne({"_id":id}).user;
		Devs.update({"user":u},{$set:{"volunteer":true}})
	}

});
