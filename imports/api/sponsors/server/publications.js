import { Meteor } from 'meteor/meteor';
import { Sponsors } from '../sponsors.js';

//Admin use
Meteor.publish('sponsors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Sponsors.find();
	else
		return 0 ;
});