import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Volunteers } from './volunteers.js';

Meteor.methods({

	setUpVolunteer: function(id){
		let v = Volunteers.findOne({"_id":id});
		if ( v.user == this.userId )
		{
			Volunteers.update({"_id":id},{$set:{"status":"Pending"}})
		}
	},

	approveVolunteer: function(status){
		if ( Roles.userIsInRole( this.userId, 'admin') )
	    {
	    	if ( status )
	    	{
	    		Volunteers.update({"_id":id},{$set:{"status":"Approved"}});
	    	}
	    	else
	    	{
	    		Volunteers.update({"_id":id},{$set:{"status":"Rejected"}});
	    	}
	    }
	},

});