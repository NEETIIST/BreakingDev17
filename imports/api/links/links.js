import { Mongo } from 'meteor/mongo';

export const Links = new Mongo.Collection("links");

Links.allow({
	//Security Issues to be reviewed
	insert: function(){
		return true;
	},
	update: function(){	
		return true;
	},
});

Links.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},
	url: {
		type: String,
	},
	icon: {
		type: String,
	},
	isNavbar: {
		type: Boolean,
	}
}));