import { Meteor } from 'meteor/meteor';
import { Wallet } from './wallet.js';
import { Products } from '../products/products.js';

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
	setZeroCoins: function(username) {
		if (Roles.userIsInRole( this.userId, 'admin'))
		{
			let u = Meteor.users.findOne({"username":username});
			let w = Wallet.findOne({"user":u._id});
			Wallet.update({"user":u._id},{$set:{"coins":0}});
		}
	},

	// Product Management in Wallets
	// Any user can place an order, only admins can serve them
	placeOrder: function (id) {
		let w = Wallet.findOne({"user":this.userId});
		let p = Products.findOne({"_id":id});
		if ( p.cost <= w.coins )
		{
			Wallet.update({"user":this.userId},{$push:{"orders":p._id}});
			let c = w.coins - p.cost ;
			Wallet.update({"user":this.userId},{$set:{"coins":c}});
		}
		else
			throw new Meteor.Error("no-coins", 'Not enough coins');
	},
	serveOrder: function (id,user) {
		if (Roles.userIsInRole( this.userId, 'admin'))
		{
			let w = Wallet.findOne({"user":user});
			let o = w.orders ;
			let i = o.indexOf(id);
			if(i != -1) {
				o.splice(i, 1);
			}
			Wallet.update({"user":user},{$set:{"orders":o}});
		}
	}

});