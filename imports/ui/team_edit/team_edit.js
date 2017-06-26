import './team_edit.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.team_edit.onRendered(function() {
	
	var self = this;
	self.autorun(function(){
		self.subscribe('devs.single', Meteor.userId());
		self.subscribe('singleTeamVisitor', FlowRouter.getParam('teamname'));
	});
});

Template.team_edit.helpers({
	Teams(){
    	return Teams;
  	},
	isCaptain: function(){
		return Teams.findOne({}).captain == Meteor.userId();	
	},
  	teamProfile: function(){
		return Teams.findOne({});
	},
});

Template.team_edit.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
})

