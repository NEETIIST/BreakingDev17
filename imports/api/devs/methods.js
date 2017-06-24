import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Devs } from './devs.js';
import { Teams } from '../teams/teams.js';

Meteor.methods({

	setUpDev: function(){
		let username = this.userId;
		Devs.update({"user":username},{$set:{"inTeam":false}})
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
		//console.log(u);
		return Devs.findOne({'user':this.userId}) ? true : false ;
		
	}

});