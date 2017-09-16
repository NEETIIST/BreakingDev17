import { Meteor } from 'meteor/meteor';
import { Wallet } from './wallet.js';

Meteor.methods({

	// Each wallet is associated with a user
	createWallet: function() {
		let w = Wallet.findOne({"user":this.userId});
		if ( w === undefined )
		{
			Wallet.insert({"user":this.userId, "coins": 100, "orders":[]});
		}
	},

	// Only admins can directly add or subtract coins to a wallet
	addCoins: function(username,ammount) {
		if (Roles.userIsInRole( this.userId, 'admin'))
		{
			let u = Meteor.users.findOne({"username":username});
			let w = Wallet.findOne({"user":u._id});
			let c = w.coins += ammount ;
			Wallet.update({"user":u._id},{$set:{"coins":c}});
		}
	},
	subCoins: function(username,ammount) {
		if (Roles.userIsInRole( this.userId, 'admin'))
		{
			let u = Meteor.users.findOne({"username":username});
			let w = Wallet.findOne({"user":u._id});
			let c = w.coins -= ammount ;
			if ( c<0 )
				c=0;
			Wallet.update({"user":u._id},{$set:{"coins":c}});
		}
	},





});