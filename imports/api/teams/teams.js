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
	members: {
		type: [Object],
		minCount: 2,
        maxCount: 4
	},
	'members.$.user': {
		type: String,
        autoform: {
            label: false
        },
	},
    'members.$.confirmed': {
        type: Boolean,
        autoValue: function(){ return false; },
        autoform: {
            type: "hidden",
            label: false
        },
    },
	project_name: {
		type: String,
	},
	category: {
		type: String,
		allowedValues: ['mobile', 'gaming', 'web'],
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
    validated: {
        type: Boolean,
        autoValue: function(){ return false; },
        autoform: {
            type: "hidden",
            label: false
        },
    }
});

Teams.attachSchema(Schema);
Schema.i18n("schemas.teams");