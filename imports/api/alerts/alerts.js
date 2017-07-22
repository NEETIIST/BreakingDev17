import { Mongo } from 'meteor/mongo';

export const Alerts = new Mongo.Collection("alerts");

Alerts.allow({
	insert: function(){
		if (Roles.userIsInRole( Meteor.user()._id, 'admin'))
			return true;
		else
			return false ;
	},
	update: function(){
		if (Roles.userIsInRole( Meteor.user()._id, 'admin'))
			return true;
		else
			return false ;
	},
	remove: function(){
		if (Roles.userIsInRole( Meteor.user()._id,'admin'))
			return true;
		else
			return false ;
	},
});

Schema = new SimpleSchema({
	text_pt: {
		type: String,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input",
			}
		}
	},
	text_en: {
		type: String,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input",
			}
		}
	},
	icon: {
		type: String,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input short-input-box"
			}
		}
	},
	url: {
		type: String,
		optional: true,	
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input short-input-box"
			}
		}
	},
	display: {
		type: Boolean,
		optional: true,
	},
});

Schema.i18n("schemas.alerts");
Alerts.attachSchema(Schema);