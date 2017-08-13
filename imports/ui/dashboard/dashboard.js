import './dashboard.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Alerts } from '/imports/api/alerts/alerts.js';
import { Payments } from '/imports/api/payments/payments.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';

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
			self.subscribe('user.payments', Meteor.userId());
			self.subscribe('volunteer.logged');
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
	"click #venue": function(){
		Session.set("dash_last","dash_venue");
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
	clickable: function(){
		return (this.url !== undefined);
	},
	clickableHover: function(){
		if (this.url !== undefined)
			return "cp";
	},
});

Template.dash_profile.helpers({
	hasProfile: function(){
  		return Devs.find({}).count() > 0 ;
  	},
  	//Payment done or pending
  	paymentDone: function(){
  		return Devs.findOne({}).payment ;
  	},
  	//Payment only available if user is on a validated team and has a verified email
  	paymentReady: function(){
  		let t = Devs.findOne({}).team ;
  		return Meteor.user().emails[0].verified && Teams.findOne({"_id":t}).validated ;
  	},
  	paymentPending: function(){
  		let p = Payments.findOne({"user":Meteor.userId()});
  		if (p!==undefined)
  			return true;
  		else
  			return false;
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
	"click #dash_profile_payment": function(){
		Session.set("dash_last","dash_profile");
		FlowRouter.go("/payment");
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
  	teamValidated: function(){
  		return Teams.findOne({}).validated;
  	},
  	teamPending: function(){	
  		return Teams.findOne({}).pending ;
  	},
  	noProfile: function(){
  		return Devs.find({}).count() == 0 ;
  	},
  	readyValidate: function(){
  		let t = Teams.findOne({"captain":Meteor.userId()});
  		return Meteor.user().emails[0].verified && t.members.length>=1 && t.members.length<4 && (! t.pending);
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
	"click #dash_team_validate": function(){
		let c = confirm(TAPi18n.__("ud_team_pending_1"));
		if (c)
		{
			let t = Teams.findOne({});
			Teams.update({"_id":t._id},{$set:{"pending":true}});
			Teams.update({"_id":t._id},{$set:{"registration":new Date()}});
			alert(TAPi18n.__("ud_team_pending_2"));
		}
	},
});

Template.dash_volunteer.helpers({
	noProfile: function(){
  		return Devs.find({}).count() == 0 ;
  	},
  	volPending: function(){
  		return Volunteers.findOne().status == "Pending" ;
  	},
  	volApproved: function(){
  		return Volunteers.findOne().status == "Approved" ;
  	},
  	volRejected: function(){
  		return Volunteers.findOne().status == "Rejected" ;
  	},
  	firstTime: function(){
  		return ! Devs.findOne().volunteer ;	
  	}
});

Template.dash_volunteer.events({
	"click #dash_vol_add": function(){
		FlowRouter.go("/volunteer/add");
	},
	"click #dash_vol_edit": function(){
		FlowRouter.go("/volunteer/edit");
	},
});