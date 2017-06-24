import './team_pass.html';
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '/imports/api/teams/teams.js';

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
	isCaptain: function(){
		return Teams.findOne({}).captain == Meteor.userId();	
	},
	pageLink: function(){
		return Meteor.absoluteUrl('t/' + FlowRouter.getParam('teamname')+"/join/"+Session.get('pinCode'));
	},
	pinCode: function(){
		Meteor.apply('requestPin', [FlowRouter.getParam('teamname')],{wait: true}, function(err,data){
	      	if (err)
	        	console.log(err);
	      	Session.set('pinCode',data);
	    });
	    return Session.get('pinCode');
	}
})

Template.team_pass.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
})
