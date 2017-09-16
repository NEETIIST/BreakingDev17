import { Mongo } from 'meteor/mongo';

export const Wallet = new Mongo.Collection("wallet");

Wallet.deny({
    insert: function(){
        return true ;
    },
    update: function(){
        return true ;
    },
    remove: function() {
        return true ;
    }
});

Schema = new SimpleSchema({
	user: {
		type: String,
        unique: true,
	},
    coins: {
        type: SimpleSchema.Integer,
        min: 0,
    },
    orders: {
        type: [String],
    },
});

Schema.i18n("schemas.wallet");
Wallet.attachSchema(Schema);
