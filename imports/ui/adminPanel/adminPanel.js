import './adminPanel.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Alerts } from '/imports/api/alerts/alerts.js';
import { Payments } from '/imports/api/payments/payments.js';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import '/imports/api/images/images.js';

Template.adminPanel.onRendered(function() {

	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole( Meteor.userId(), 'admin'))
		{
			self.subscribe("devs.all",Meteor.userId());
			self.subscribe("teams.all",Meteor.userId());
			self.subscribe("users.all", Meteor.userId());
			self.subscribe("alerts.all", Meteor.userId());
			self.subscribe("payments.all", Meteor.userId());
			self.subscribe("files.images.all", Meteor.userId());
			self.subscribe("volunteers.all", Meteor.userId());
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
	"click #ap_volunteers": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_volunteers"}); 
	},
	"click #ap_alerts": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_alerts"}); 
	},
	"click #ap_payments": function(){
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_payments"}); 
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
	},
	profilePic: function(){
		let pic = Images.findOne({"_id":this.picture});
		if( pic === undefined )
			return "/profile.png";
		else
			return pic.link();
	}
});

Template.ap_user_focus.events({
	"click #pay": function(){
		Devs.update(this._id,{$set:{"payment":true}});
		alert(TAPi18n.__("ap-uf-paid"));
	},
	"click #not-pay": function(){
		let c = confirm(TAPi18n.__("ap-uf-not-pay-sure"));
		if ( c )
		{
			Devs.update(this._id,{$set:{"payment":false}});
			alert(TAPi18n.__("ap-uf-not-pay-confirm"));
		}
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
		if ( Meteor.users.findOne({"_id":this.captain}).emails[0].verified && this.members.length>=1 && this.members.length<4 )
			return true;
		else
			return false;
	},
	registrationTime: function(){
		//return this.registration.getDate() + ", " + this.registration.getMonth();
		return this.registration.toDateString();
	}
});

Template.ap_team_focus.events({
	"click #validate": function(){
		Teams.update(this._id,{$set:{"validated":true}});
		Teams.update(this._id,{$set:{"pending":false}});
		alert(TAPi18n.__("ap-tf-validated"));
	},
	"click #not-validate": function(){
		let c = confirm(TAPi18n.__("ap-tf-not-validate-sure"));
		if ( c )
		{
			Teams.update(this._id,{$set:{"validated":false}});
			Teams.update({"_id":t._id},{$set:{"registration":null}});
			alert(TAPi18n.__("ap-tf-not-validate-confirm"));
		}
	},
	"click .focus": function(){
		let d = Devs.findOne({"user":String(this)})
		Session.set("focus",d._id);
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_user_focus"}); 	
	},
});

Template.ap_alerts.helpers({
	Alerts(){
    	return Alerts;
  	},
	alert: function(){
		return Alerts.find();
	},
	lang: function(){
		return TAPi18n.getLanguage() ;
	},
});

Template.ap_alerts.events({
	"click #deleteAlert": function(){
		let t = confirm("Remover alerta?");
		if ( t )
			Alerts.remove(this._id);
	},
	"click #toggleAlert": function(){
		Alerts.update({"_id":this._id},{
			$set: { "display" : ! this.display },
		}) ;
	},

});

Template.ap_payments.helpers({
	payment: function(){
		return Payments.find();
	},
	username: function(){
		let u = Meteor.users.findOne({"_id":this.user});
		return u.username ;
	},
	picLink: function(){
		let pic = Images.findOne({"_id":this.picture});
		return pic.link();
	},
	state: function(){
		let d = Devs.findOne({"user":this.user});
		return d.payment ;
	},
	date: function(){
		return this.date.toDateString();
	}
});

Template.ap_payments.events({
	"click .focus": function(){
		let d = Devs.findOne({"user":this.user});
		Session.set("focus",d._id);
		BlazeLayout.render('base', {main:"adminPanel",dash_small:"ap_user_focus"}); 	
	},
	"click #pay": function(){
		let d = Devs.findOne({"user":this.user});
		Devs.update(d._id,{$set:{"payment":true}});
		alert(TAPi18n.__("ap-uf-paid"));
	},
	"click #delete": function(){
		let p = Payments.findOne({"user":this.user});
		if ( p === undefined)
		{
			let d = Devs.findOne({"user":this.user});
			Devs.update(d._id,{$set:{"payment":true}});	
		}
		Payments.remove({"_id":this._id});
	},
});


AutoForm.addHooks(['addAlert'],{
    onSuccess: function(formType, result) {
        Meteor.call('setUpAlert', result);
    }
});

