import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';

Meteor.publish('devs.single', function(id){
	return Devs.find({'user':id});
});

Meteor.publish('devs.single.alt', function(u){
	var user = Meteor.users.findOne({'username':u});
	return Devs.find({'user':user._id});
});

Meteor.publish('devs.single.inTeam', function(id){
	return Devs.find({'user':id},{fields: {'inTeam': 1, "team":1}});
});

Meteor.publish('devs.single.username', function(id){
	return Devs.find({'user':id},{fields: {'user':1}});
});

//Admin Use
Meteor.publish('devs.all', function(){
	if (Roles.userIsInRole( this.userId, 'admin'))
		return Devs.find();
	else
		return 0 ;
});