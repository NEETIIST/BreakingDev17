import { Mongo } from 'meteor/mongo';

export const Visitors = new Mongo.Collection("visitors");

Visitors.allow({
  	update: function(){
    	return true ;
  	},
});

Visitors.deny({
  	insert: function(){
    	return true ;
  	},
});

Schema = new SimpleSchema({
	user: {
		type: String,
		autoform: {
			type: "hidden",
			label: false
		},
		optional: true,
	},
	name: {
		type: String,
		optional: true,
	},
	company: {
		type: String,
		optional: true,
	},
	job: {
		type: String,
		optional: true,
	},
	info: {
		type: String,
		autoform: {
			rows: 2
		},
		optional: true,
	},
	picture: {
		type: String,
		optional: true,
		autoform: {
			afFieldInput: {
				type: 'fileUpload',
				collection: 'Images',
				uploadTemplate: 'uploadForm',
			},
		}
	},
	favourite: {
		type: [String],
		autoform: {
			label: false,
			type: "hidden"
		},
		optional: true,
	},
});

Schema.i18n("schemas.visitors");
Visitors.attachSchema(Schema);
