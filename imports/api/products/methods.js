import { Meteor } from 'meteor/meteor';
import { Products } from './products.js';
import { Wallet } from '../wallet/wallet.js';

Meteor.methods({

	deleteProduct: function(id) {
		if (Roles.userIsInRole( this.userId, 'admin'))
		{
			let p = Products.findOne({"_id":id});
			let w = Wallet.find({"orders":id});
			w.forEach(function(u){
				let multiplier = countInArray(u.orders,id);
				let c = (multiplier * p.cost) + u.coins ;
				Wallet.update({"_id":u._id},{$pull:{"orders":id}});
				Wallet.update({"_id":u._id},{$set:{"coins":c}});
			});
			Products.remove({"_id":id});
		}
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