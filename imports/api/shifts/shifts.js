import { Mongo } from 'meteor/mongo';

export const Shifts = new Mongo.Collection("shifts");

Shifts.allow({
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
	day: {
		type: SimpleSchema.Integer,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input",
			}
		}
	},
	start: {
		type: String,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input",
			}
		}
	},
	end: {
		type: String,
		autoform: {
			afFieldInput: {
				class: "fs-2 fw-2 small-input",
			}
		}
	},
	full: {
		type: Boolean,
		optional: true,
	},
	available: {
		type: [String],
		optional: true,
	},
	assigned: {
		type: [String],
		optional: true,
	}
});

Schema.i18n("schemas.shifts");
Shifts.attachSchema(Schema);