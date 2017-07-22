import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Alerts } from './alerts.js';

Meteor.methods({

	setUpAlert: function(id){
		if ( Devs.findOne({"_id":id}).user === undefined )
		{	
			// In need of better testing
			Devs.update({"_id":id},{$set:{"display":false}})
		}
	},

});