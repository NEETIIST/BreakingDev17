import './shop.html'
import { Wallet } from '../../api/wallet/wallet.js';
import { Products } from '../../api/products/products.js';

Template.shop.onRendered(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('products.images');
		self.subscribe('products.all');
		self.subscribe('wallet.logged');
	});
	if ( Session.get("seeOrders") === undefined )
	{
		Session.set("seeOrders",false);
	}
	Meteor.call("createWallet");
});

Template.shop.helpers({
	products: function(){
		return Products.find({});
	},
	productPic: function(){
		let pic = Images.findOne({"_id":this.picture});
		if( pic === undefined )
			return "/profile.png";
		else
			return pic.link();		
	},
	coins: function(){
		return Wallet.findOne().coins;
	},
	seeOrders: function(){
		return Session.get("seeOrders");
	},
	wallet: function(){
		return Wallet.findOne({"user":Meteor.userId()});
	},
	productName: function(){
		return Products.findOne({"_id":this[0]}).name;
	},
	quant: function(){
		return this[1];
	},
	entry: function(){
		let w = Wallet.findOne({"user":Meteor.userId()}).orders;
		let o = foo(w);
		//console.log(o);
		return o ;
	},
})

Template.shop.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
	"click #placeOrder":function(){
		Meteor.call("placeOrder", this._id);
		alert(TAPi18n.__("shop-confirm"));
	},
	"click #seeOrders":function(){
		Session.set("seeOrders",true);
	},
	"click #seeProducts":function(){
		Session.set("seeOrders",false);
	},
});

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

function foo(arr) {
	var a = arr ;
	result = { };
	for(var i = 0; i < a.length; ++i) {
		if(!result[a[i]])
		result[a[i]] = 0;
		++result[a[i]];
	}

	let final = [];
	for (var key in result) {
	    if (result.hasOwnProperty(key)) {
	        final.push( [ key, result[key] ] );
    	}
	}

	return final;
}