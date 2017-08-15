import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Shifts } from './shifts.js';
import { Devs } from '../devs/devs.js';

Meteor.methods({

	setUpShift: function(id){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	Shifts.update({"_id":id},{$set:{"available":[]}});
			Shifts.update({"_id":id},{$set:{"assigned":[]}});
			Shifts.update({"_id":id},{$set:{"full":false}});
	    }
	},

	makeUserAvailable: function(s){
		// Recieves ID of the shift, and makes the logged user available, if not already
		// User must be volunteer to use the method
		if ( Shifts.findOne({"_id":s}).available.indexOf(this.userId) == -1 && Devs.findOne({"user":this.userId}).volunteer)
		{
			Shifts.update({"_id":s},{$push:{"available":this.userId}});
		}
	},

	makeUserUnavailable: function(s){
		// Recieves ID of the shift, and makes the logged user unavailable, if not already assigned
		// User must be volunteer to use the method
		if ( Shifts.findOne({"_id":s}).assigned.indexOf(this.userId) == -1 && Devs.findOne({"user":this.userId}).volunteer )
		{
			Shifts.update({"_id":s},{$pull:{"available":this.userId}});
		}
	},

});
