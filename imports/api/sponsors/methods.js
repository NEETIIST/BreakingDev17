import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random'
import { Sponsors } from './sponsors.js';
import { Visitors } from '../visitors/visitors.js';

Meteor.methods({

	setUpSponsor: function(id){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	Sponsors.update({"_id":id},{$set:{"codes":[]}});
	    	Sponsors.update({"_id":id},{$set:{"usedCodes":[]}});
	    	Sponsors.update({"_id":id},{$set:{"members":[]}});
	    }
	},

	removeSponsor: function(id){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	let m = Sponsors.findOne({"_id":id}).members;
	    	m.forEach(function(u){
	    		Visitors.update({"user":u},{$set:{"company":null}});
 	  			Roles.removeUsersFromRoles(u,'sponsor');
			});
			Sponsors.remove({"_id":id});
	    }
	},

	generateAccessCode: function(id){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	let short = Sponsors.findOne({"_id":id}).short ;
	    	let numbers = (Random.hexString(4));
	    	let pin = String(short+numbers);
	    	Sponsors.update({"_id":id},{$push:{"codes":pin}});
	    	return pin;
	    }
	},

	removeAccessCode: function(code){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	let short = code.slice(0,code.length-4);
	    	Sponsors.update({"short":short},{$pull:{"codes":code}});
	    }
	},

	grantSponsorAccess: function(code){
		if ( Roles.userIsInRole( this.userId, 'sponsor') )
			throw new Meteor.Error("already-sponsor", 'Already Sponsor');
		if ( code.length > 30 || typeof code !== "string" )
			throw new Meteor.Error("not-valid-code", 'Invalid Code');

		let s = Sponsors.findOne({"codes":code});
		let u = Sponsors.findOne({"usedCodes":code});
		if ( s != undefined )
		{
			Sponsors.update({"_id":s._id},{$pull:{"codes":code}});	
			Sponsors.update({"_id":s._id},{$push:{"usedCodes":code}});
			Sponsors.update({"_id":s._id},{$push:{"members":this.userId}});
			Roles.addUsersToRoles(this.userId, 'sponsor');
			//If user doesn't have visitor profiles, creates one, user can only edit missing info
			let v = Visitors.findOne({"user":this.userId});
			if ( v === undefined )
			{
				Visitors.insert({
					"user":this.userId,
					"company": s.short,
				});
				Visitors.update({"user":this.userId},{$set:{"favourite":[]}});
			}
			else
			{
				Visitors.update({"user":this.userId},{$set:{"company":s.short}});
			}
			return true;
		}
		else if ( u != undefined )
			throw new Meteor.Error("used-code", 'Invalid Code');
		else
			throw new Meteor.Error("not-recognized-code", 'Invalid Code');
	},
});