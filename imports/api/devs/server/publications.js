import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';

Meteor.publish('devs.all', function () {
  return Devs.find();
});

Meteor.publish('devs.single', function(id){
	return Devs.find({'user':id});
});

Meteor.publish('devs.single.inTeam', function(id){
	return Devs.find({'user':id},{fields: {'inTeam': 1, "team":1}});
});

Meteor.publish('devs.single.username', function(id){
	return Devs.find({'user':id},{fields: {'user':1}});
});