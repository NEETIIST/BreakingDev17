import { Meteor } from 'meteor/meteor';
import { Teams } from '../teams.js';

Meteor.publish('teams.all', function () {
  return Teams.find();
});

Meteor.publish('singleTeam', function(id){
	return Teams.find({"_id":id});
})

Meteor.publish('singleTeamVisitor', function(id){
	return Teams.find({'_id':id},{fields: {'pincode': 0}});
	// Add another restrictions to this field
})

Meteor.publish('singleTeamName', function(id){
	return Teams.find({'_id':id},{fields: {'team_name': 1}});
	// Add another restrictions to this field
})

Meteor.publish('allTeamsInfo', function(){
	return Teams.find({},{fields:  {'pincode': 0}});
})

Meteor.publish('singleTeamName.user', function(id){
	let u = Meteor.users.findOne({'username': id});
	return Teams.find({$or:[{'captain':u._id},{'members':u._id}]},{fields: {'team_name': 1}});
})

Meteor.publish('singleTeamName.logged', function(id){
	return Teams.find({$or:[{'captain':id},{'members':id}]},{fields: {'team_name': 1,'captain':1}});
})

Meteor.publish('singleTeamMembers',function(id){
	let t = Teams.findOne({'_id':id});
	let list = [];
	list.push(t.captain);
	t.members.forEach(function(m){
		list.push(m);
	});
	return Meteor.users.find({'_id':{ $in : list }},{'username':1});
})