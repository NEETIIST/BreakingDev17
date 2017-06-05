import { Meteor } from 'meteor/meteor';
import { Teams } from '../teams.js';

Meteor.publish('teams.all', function () {
  return Teams.find();
});

Meteor.publish('singleTeam', function(id){
	return Teams.find({"_id":id});
})

Meteor.publish('singleTeamVisitor', function(id){
	return Teams.find({'_id':id});
})