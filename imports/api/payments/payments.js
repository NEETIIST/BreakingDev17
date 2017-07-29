import { Mongo } from 'meteor/mongo';

export const Payments = new Mongo.Collection("payments");

Payments.allow({
	//Security Issues to be reviewed
	insert: function(){
		return true;
	},
	update: function(){	
		return false;
	},
	remove: function(){
		if (Roles.userIsInRole( Meteor.user()._id,'admin'))
			return true;
		else
			return false ;
	},
});

Payments.attachSchema(new SimpleSchema({
	user: {
		type: String,
		autoValue: function(){ return Meteor.userId() },
		autoform: {
		    type: "hidden",
		    label: false
		},
		//unique: true,
	},
	picture: {
		type: String,
		label: "Upload",
		//optional: true,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Images',
				uploadTemplate: 'uploadForm', // <- Optional
				//previewTemplate: 'uploadedFiles', // <- Optional
			},
		}
  	},
	date: {
		type: Date,
		autoValue: function(){ return new Date() },
		autoform: {
			type: "hidden",
			label: false
		},
	}
}));