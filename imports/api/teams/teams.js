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

Teams.attachSchema(new SimpleSchema({
	name: {
		type: String,
	},
	members: {
		type: Array,
	},
	'members.$': {
		type: String,
	},
}));