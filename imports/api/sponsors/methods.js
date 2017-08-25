import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random'
import { Sponsors } from './sponsors.js';

Meteor.methods({

	setUpSponsor: function(id){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	Sponsors.update({"_id":id},{$set:{"codes":[]}});
	    	Sponsors.update({"_id":id},{$set:{"usedCodes":[]}});
	    	Sponsors.update({"_id":id},{$set:{"members":[]}});
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
});