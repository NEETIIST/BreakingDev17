import { Meteor } from 'meteor/meteor';
import { Visitors } from '../visitors.js';

//Admin use
Meteor.publish('visitors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Visitors.find();
	else
		return 0 ;
});