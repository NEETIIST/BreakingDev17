import './dashboard.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Alerts } from '/imports/api/alerts/alerts.js';

Template.dashboard.onRendered(function() {

	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole( Meteor.userId(), 'admin'))
		{
			FlowRouter.go("/admin");
		}
		else
		{
			// These subscriptions should be reviewed
			self.subscribe('devs.single', Meteor.userId());
			self.subscribe('singleTeamName.logged', Meteor.userId());	
			self.subscribe('alerts.visible');
		}
	});
});


Template.dashboard.events({
	"click #logout": function(){
		Session.set("dash_last","dash_null");
		AccountsTemplates.logout();
	},
	"click #edit_profile": function(){
		Session.set("dash_last","dash_profile");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"dashboard",dash_small:last}); 
	},
	"click #edit_team": function(){
		Session.set("dash_last","dash_team");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"dashboard",dash_small:last}); 
	},
	"click #slack": function(){
		Session.set("dash_last","dash_slack");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"dashboard",dash_small:last}); 
	},
	"click #volunteer": function(){
		Session.set("dash_last","dash_volunteer");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"dashboard",dash_small:last}); 
	},
});

Template.dashboard.helpers({
	loggedUser: function(){
		return Meteor.users.findOne({'_id':Meteor.userId()}).username;
	},
	inTeam: function(){
  		return Devs.findOne({}).inTeam;
  	},
  	teamName: function(){
  		return Teams.findOne({}).team_name ;
  	},
  	volunteer: function(){
  		if( Devs.findOne({}).volunteer == true)
  		{
  			return true;
  		}
  		else
  			return false;
  	},
  	verified: function(){
  		return Meteor.user().emails[0].verified ;
  	},
  	hasProfile: function(){
  		return Devs.find({}).count() > 0 ;
  	},
  	alert: function()
  	{
  		return Alerts.find();
  	},
  	lang: function(){
		return TAPi18n.getLanguage() ;
	},
});


Template.dash_profile.events({
	"click #dash_profile_edit": function(){
		Session.set("dash_last","dash_profile");
		FlowRouter.go("/u_/edit");
	},
	"click #dash_profile_view": function(){
		Session.set("dash_last","dash_profile");
		FlowRouter.go("/u/"+Meteor.user().username);
	},
});

Template.dash_profile.helpers({
	hasProfile: function(){
  		return Devs.find({}).count() > 0 ;
  	},
});

Template.dash_team.helpers({
	isCaptain: function(){
		return Teams.findOne({}).captain == Meteor.userId();	
	},
  	inTeam: function(){
  		return Devs.findOne({}).inTeam;
  	},
  	teamName: function(){
  		return Teams.findOne({}).team_name ;
  	},
  	noProfile: function(){
  		return Devs.find({}).count() == 0 ;
  	},
});

Template.dash_team.events({
	"click #dash_team_view": function(){
		FlowRouter.go("/t/"+Teams.findOne({})._id);
	},
	"click #dash_team_edit": function(){
		FlowRouter.go("/t/"+Teams.findOne({})._id+"/edit");
	},
	"click #dash_team_add": function(){
		FlowRouter.go("/t_/add");
	},
	"click #dash_team_pass": function(){
		FlowRouter.go("/t/"+Teams.findOne({})._id+"/pass");
	},
	"click #dash_team_find": function(){
		FlowRouter.go("/t_/find");
	},
});