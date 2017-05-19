import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';

Meteor.publish('devs.all', function () {
  return Devs.find();
});

Meteor.publish('devs.single', function(id){
	return Devs.find({'user':id});
});