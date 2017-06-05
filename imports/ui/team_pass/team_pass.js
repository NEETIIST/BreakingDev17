import './team_pass.html';
import { Accounts } from 'meteor/accounts-base';

Template.team_pass.onRendered(function() {
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname');
		self.subscribe('singleTeam',t);
		//self.subscribe('teamMembers', t);
		//self.subscribe('teams.all');
	});
});

Template.team_pass.helpers({
	teamData: function(){
		return Teams.findOne({});
	},
	loggedUser: function(){
		return Meteor.users.findOne({'_id':Meteor.userId()}).username;
	},
})

Template.team_pass.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
})
