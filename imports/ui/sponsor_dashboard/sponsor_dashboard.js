import './sponsor_dashboard.html'
import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Visitors } from '/imports/api/visitors/visitors.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.sponsor_dashboard.onRendered(function() {

	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole( Meteor.userId(), 'sponsor'))
		{
			//Subscriptions	
			self.subscribe("visitors.logged");
			self.subscribe('visitor.image');
			self.subscribe("sponsors.logged");
			self.subscribe('sponsor.image');
			self.subscribe('teams.sponsor');
			self.subscribe('devs.sponsor');
			self.subscribe('users.sponsor');
			self.subscribe('alldevs.image');
		}
		else
		{
			FlowRouter.go("/dash");
		}
	});

	BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_null"});
});

Template.sponsor_dashboard.helpers({
	test: function(){
		return true ;
	},
	active: function(id){
		if ( id == Session.get("dash_last") )
			return "f-orange";
	},
})

Template.sponsor_dashboard.events({
	"click #logout": function(){
		AccountsTemplates.logout();
	},
	"click #sd-profile": function(){
		Session.set("dash_last","sd_profile");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last});
	},
	"click #sd-sponsor": function(){
		Session.set("dash_last","sd_sponsor");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last}); 
	},
	"click #sd-teams": function(){
		Session.set("dash_last","sd_teams");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last});
	},
	"click #sd-users": function(){
		Session.set("dash_last","sd_users");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last});
	},
	"click #sd-favourites": function(){
		Session.set("dash_last","sd_favourites");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last});
	},
	"click #sd-reader": function(){
		Session.set("dash_last","code_reader");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:last});
	},
});

Template.sd_profile.onRendered(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('visitor.image');
	});
	//Session.set('reload_profile',true);
});

Template.sd_profile.helpers({
	Visitors: function(){
		return Visitors;
	},
	visitorProfile: function(){
		return Visitors.findOne({"user":Meteor.userId()});
	},
	company: function(){
		return Sponsors.findOne({"members":Meteor.userId()}).name;
	},
	reload: function(){
		return Session.get('reload_profile');
	},
});

Template.sd_sponsor.helpers({
	Sponsors: function(){
		return Sponsors;
	},
	sponsorProfile: function(){
		return Sponsors.findOne({"members":Meteor.userId()});
	},
	sponsorPic: function(){
		let p = Sponsors.findOne({}).picture;
		return Images.findOne({"_id":p}).link();
	},
	sponsorName: function(){
		return Sponsors.findOne({"members":Meteor.userId()}).name;	
	}
});

Template.sd_teams.helpers({
	team: function(){
		return Teams.find({"validated":true});
	},
	isFavourite: function () {
		let t = this._id ;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	}
});

Template.sd_teams.events({
	"click .focus": function(){
		Session.set("focus",this._id);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_teams_focus"});
	},
	"click #makeFavourite":function(){
		let t = this._id ;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let t = this._id ;
		Meteor.call('removeFromFavourite',t);
	},
});

Template.sd_teams_focus.helpers({
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
	isFavourite: function () {
		let t = this._id;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
});

Template.sd_teams_focus.events({
	"click #goTeamPage": function(){
		FlowRouter.go("/t/"+this._id);
	},
	"click .focusCaptain": function(){
		Session.set("dash_last","sd_users");
		Session.set("focus",this.captain);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_user_focus"});
	},
	"click .focus": function(){
		Session.set("dash_last","sd_users");
		Session.set("focus",String(this));
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_user_focus"});
	},
	"click #makeFavourite":function(){
		let t = this._id;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let t = this._id;
		Meteor.call('removeFromFavourite',t);
	},
});

Template.sd_users.helpers({
	devs: function(){
		return Devs.find({});
	},
	username: function(){
		return Meteor.users.findOne({"_id":this.user}).username;
	},
	teamName: function(){
		return Teams.findOne({"_id":this.team}).team_name;
	},
	isFavourite: function () {
		let t = this.user;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
});

Template.sd_users.events({
	"click .focus": function(){
		Session.set("focus",this.user);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_user_focus"}); 	
	},
	"click #makeFavourite":function(){
		let t = this.user;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let t = this.user;
		Meteor.call('removeFromFavourite',t);
	},
});

Template.sd_user_focus.helpers({
	focus: function(){
		let d = Session.get("focus");
		return Devs.find({"user":d});
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
	},
	isFavourite: function () {
		let t = this.user;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
});

Template.sd_user_focus.events({
	"click .focus": function(){
		Session.set("focus",this.team);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_teams_focus"}); 	
	},
	"click #makeFavourite":function(){
		let t = this.user;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let t = this.user;
		Meteor.call('removeFromFavourite',t);
	},
	"click #goUserPage":function(){
		let u = Meteor.users.findOne({"_id":this.user});
		FlowRouter.go("/u/"+u.username);
	},
});

Template.sd_favourites.helpers({
	devs: function(){
		let list = Visitors.findOne().favourite;
		return Devs.find({'user':{ $in : list }});
	},
	teams: function(){
		let list = Visitors.findOne().favourite;
		return Teams.find({'_id':{ $in : list }});
	},
	isFavouriteUser: function () {
		let t = this.user;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
	isFavouriteTeam: function () {
		let t = this._id;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
	email: function(){
		return Meteor.users.findOne({"_id":this.user}).emails[0].address;
	},
	profilePic: function(){
		let pic = Images.findOne({"_id":this.picture});
		if( pic === undefined )
			return "/profile.png";
		else
			return pic.link();
	},
	username: function(){
		return Meteor.users.findOne({"_id":this.user}).username;
	},
});

Template.sd_favourites.events({
	"click .focusUser": function(){
		Session.set("focus",this.user);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_user_focus"}); 	
	},
	"click .focusTeam": function(){
		Session.set("focus",this._id);
		BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_teams_focus"}); 	
	},
	"click #makeFavouriteUser":function(){
		let t = this.user;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavouriteUser":function(){
		let t = this.user;
		Meteor.call('removeFromFavourite',t);
	},
	"click #makeFavouriteTeam":function(){
		let t = this._id;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavouriteTeam":function(){
		let t = this._id;
		Meteor.call('removeFromFavourite',t);
	},
});

AutoForm.addHooks(['editSponsor'],{
    onSuccess: function(formType, result) {
        alert(TAPi18n.__("sd-profile-success"));
    }
});

AutoForm.addHooks(['editVisitor'],{
    onSuccess: function(formType, result) {
        alert(TAPi18n.__("sd-profile-success"));
        Session.set("dash_last","sd_null");
        BlazeLayout.render('base', {main:"sponsor_dashboard",sd_small:"sd_null"});
    }
});
