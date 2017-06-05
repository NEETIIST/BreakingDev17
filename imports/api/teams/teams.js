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
    //unique: true,
  },
	members: {
		type: [String],
    maxCount: 3,
    autoform: {
      label: false,
      type: "hidden"
    },
    optional: true,
	},
	'members.$.user': {
		type: String,    
	},
	project_name: {
		type: String,
	},
	category: {
		type: String,
		allowedValues: ['Mobile', 'Gaming', 'Web'],
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
  validated: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  }
});

Teams.attachSchema(Schema);
Schema.i18n("schemas.teams");