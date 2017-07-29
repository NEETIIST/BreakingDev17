import { Meteor } from 'meteor/meteor';
import { Payments } from '../payments.js';

Meteor.publish('user.payments', function(id){
	return Payments.find({"user":id});
});

//Admin use
Meteor.publish('payments.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Payments.find();
	else
		return 0 ;
});