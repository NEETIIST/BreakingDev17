import './team.html'
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '/imports/api/teams/teams.js';

Template.team.onRendered(function() {
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname');
		self.subscribe('singleTeamVisitor',t);
		self.subscribe('singleTeamMembers', t);
	});
});

Template.team.helpers({
	teamData: function(){
		return Teams.findOne();
	},
	members: function(){
		// BUG! Is also listing the logged user as a member
		let members = Teams.findOne({}).members;
		members.unshift(Teams.findOne({}).captain);
		let list = [];
		members.forEach(function(m){
			list.push(Meteor.users.findOne({"_id":m}));
		});
		return list;
	},
})

Template.registerHelper('equals', function (a, b) {
  	return a === b;
});