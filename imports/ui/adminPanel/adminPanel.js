import './adminPanel.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.adminPanel.onRendered(function() {

	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole( Meteor.userId(), 'admin'))
		{
			self.subscribe("devs.all",Meteor.userId());
			self.subscribe("teams.all",Meteor.userId());
			self.subscribe("users.all", Meteor.userId());
			Session.set("focus", null);
		}
		else
		{
			FlowRouter.go("/dash");
		}
	});
});

Template.adminPanel.events({
	"click #logout": function(){
		AccountsTemplates.logout();
	},
	"click #ap_user-list": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_user_list"}); 
	},
	"click #ap_team-list": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_team_list"}); 
	},
	"click #ap_stats": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_stats"}); 
	},
});

Template.ap_stats.helpers({
	devsTotal: function(){
		return Devs.find({"inTeam":true}).count();
	},
	teamsTotal: function(){
		return Teams.find({}).count();
	},
});

Template.ap_user_list.helpers({
	devs: function(){
		return Devs.find({});
	},
	username: function(){
		return Meteor.users.findOne({"_id":this.user}).username;
	},
	teamName: function(){
		return Teams.findOne({"_id":this.team}).team_name;
	},
	validated: function(){
		return Meteor.users.findOne({"_id":this.user}).emails[0].verified;
	},
});

Template.ap_user_list.events({
	"click .focus": function(){
		Session.set("focus",this._id);
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_user_focus"}); 	
	},
});

Template.ap_user_focus.helpers({
	focus: function(){
		let d = Session.get("focus");
		return Devs.find({"_id":d});
	},
	username: function(){
		return Meteor.users.findOne({"_id":this.user}).username;
	},
	teamName: function(){
		return Teams.findOne({"_id":this.team}).team_name;
	},
	validated: function(){
		return Meteor.users.findOne({"_id":this.user}).emails[0].verified;
	},
	email: function(){
		return Meteor.users.findOne({"_id":this.user}).emails[0].address;
	},
	admin: function(){
		return Roles.userIsInRole( this.user, 'admin');
	}
});

Template.ap_user_focus.events({
	"click #pay": function(){
		Devs.update(this._id,{$set:{"payment":true}});
		alert(TAPi18n.__("ap-uf-paid"));
	},
	"click #make-admin": function(){
		Meteor.call("makeAdmin", this.user);
	},
	"click #not-admin": function(){
		Meteor.call("removeAdmin", this.user);
	},
});

Template.ap_team_list.helpers({
	teams: function(){
		return Teams.find({});
	},
	memberCount: function(){
		return this.members.length +1 ;
	},
	captainUser: function(){
		return Meteor.users.findOne({"_id":this.captain}).username;	
	},
});

Template.ap_team_list.events({
	"click .focus": function(){
		Session.set("focus",this._id);
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_team_focus"}); 	
	},
});

Template.ap_team_focus.helpers({
	focus: function(){
		let d = Session.get("focus");
		return Teams.find({"_id":d});
	},
	captainUser: function(){
		return Meteor.users.findOne({"_id":this.captain}).username;
	},
	memberList: function(){
		let list = [];
		this.members.forEach(function(m){
			list.push(m);
		});
		return list ;
	},
	memberUser: function(){
		return Meteor.users.findOne({"_id":String(this)}).username;	
	},
	readyToValidate: function(){
		if ( Meteor.users.findOne({"_id":this.captain}).emails[0].verified && this.members.length>1 && this.members.length<4 )
			return true;
		else
			return false;
	},
});

Template.ap_team_focus.events({
	"click #validate": function(){
		Teams.update(this._id,{$set:{"validated":true}});
		alert(TAPi18n.__("ap-tf-validated"));
	},
	"click .focus": function(){
		let d = Devs.findOne({"user":String(this)})
		Session.set("focus",d._id);
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_user_focus"}); 	
	},
});