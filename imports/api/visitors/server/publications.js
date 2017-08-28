import { Meteor } from 'meteor/meteor';
import { Visitors } from '../visitors.js';

Meteor.publish('visitors.logged', function(){
	return Visitors.find({"user":this.userId});
})

//Admin use
Meteor.publish('visitors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Visitors.find();
	else
		return 0 ;
});