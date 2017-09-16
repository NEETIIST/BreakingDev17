import { Meteor } from 'meteor/meteor';
import { Wallet } from '../wallet.js';

Meteor.publish('wallet.logged', function () {
  	return Wallet.find({"user":this.userId});
});

//Admin use
Meteor.publish('wallet.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Wallet.find();
	else
		return 0 ;
});