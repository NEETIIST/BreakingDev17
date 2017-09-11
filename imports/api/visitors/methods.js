import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Random } from 'meteor/random'
import { Visitors } from './visitors.js';

Meteor.methods({

	addToFavourite: function(id){
		if ( Roles.userIsInRole( this.userId, 'sponsor') )
	    {
	    	Visitors.update({"user":this.userId},{$push:{"favourite":id}});
	    }
	},
	removeFromFavourite: function(id){
		if ( Roles.userIsInRole( this.userId, 'sponsor') )
	    {
	    	Visitors.update({"user":this.userId},{$pull:{"favourite":id}});
	    }
	},

});