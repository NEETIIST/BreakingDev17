import { Mongo } from 'meteor/mongo';

export const Teams = new Mongo.Collection("teams");

Teams.allow({
  insert: function(){
    return true ;
  },
  update: function(){
  	return true ;
  },
});

Schema = new SimpleSchema({
	team_name: {
		type: String,
	},
  captain: {
    type: String,
    autoValue: function(){ return Meteor.userId(); },
    autoform: {
        type: "hidden",
        label: false
    },
    unique: true,
  },
	members: {
		type: [String],
    maxCount: 3,
    autoform: {
      label: false,
      type: "hidden"
    },
    optional: true,
    unique: true,
	},
	project_name: {
		type: String,
	},
	category: {
		type: String,
		allowedValues: ['Gaming', 'Web'],
	},
	project: {
  	type: String,
  	autoform: {
  		rows: 4
  	},
	},
	skills: {
  	type: String,
  	autoform: {
		  rows: 2
  	},
	},
  pincode: {
    type: String,
    autoform: {
      label: false,
      type: "hidden"
    },
    optional: true,
  },
  setup: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
  validated: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
});

Schema.i18n("schemas.teams");
Teams.attachSchema(Schema);
