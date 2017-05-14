import './team.html'
import { Accounts } from 'meteor/accounts-base';

Template.team.onRendered(function() {
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname').toLowerCase();
		self.subscribe('singleTeamVisitor',t);
		//self.subscribe('teamMembers', t);
	});
});

Template.team.helpers({
	teamData: function(){
		var t = FlowRouter.getParam('teamname').toLowerCase();
		return Teams.findOne({'name':t});
	},
	/* Waiting for user profile final settings
	userData: function(){
		var u = FlowRouter.getParam('username').toLowerCase();
		return Meteor.users.findOne({'username':u});
	},
	*/
})