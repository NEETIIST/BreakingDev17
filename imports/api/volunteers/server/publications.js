import { Meteor } from 'meteor/meteor';
import { Volunteers } from '../volunteers.js';

Meteor.publish('volunteer.logged', function () {
  	return Volunteers.find({"user":this.userId});
});

//Admin use
Meteor.publish('volunteers.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Volunteers.find();
	else
		return 0 ;
});