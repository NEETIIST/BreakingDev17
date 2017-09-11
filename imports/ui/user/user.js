import './user.html';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Visitors } from '/imports/api/visitors/visitors.js';

Template.user.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var u = FlowRouter.getParam('username').toLowerCase();
		self.subscribe('singleUserVisitor',u);
		self.subscribe('devs.single.alt', u);
		self.subscribe('singleTeamName.user',u);
		self.subscribe('profile.image.user',u);
		if (Roles.userIsInRole( Meteor.userId(), 'sponsor') )
			self.subscribe('visitors.logged');
	});
});

Template.user.helpers({
	username: function(){
		return FlowRouter.getParam('username').toLowerCase();
	},
	userData: function(){
		return Devs.findOne();
	},
	inTeam: function(){
		return Devs.findOne().inTeam;
	},
	team: function(){
		return Teams.findOne().team_name;
	},
	profilePic: function(){
		let pic = Images.findOne()
		if( pic === undefined )
			return "/profile.png";
		else
			return pic.link();
	},
	isVolunteer: function(){
		return Devs.findOne().volunteer;
	},
	isSponsor: function () {
		if ( Roles.userIsInRole( Meteor.userId(), 'sponsor'))
			return true;
		else
			return false;
	},
	isFavourite: function () {
		let u = FlowRouter.getParam('username').toLowerCase() ;
		let t = Meteor.users.findOne({"username": u })._id ;
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	},
})

Template.user.events({
	"click #goback":function(){
		if (document.referrer.indexOf('localhost') >= 0)
		{	//If user was in the website before, it goes to the previous page
			history.back();
		}
		else
		{	//Otherwise, goes to the home
			FlowRouter.go("/");	
		}
	},
	"click #goTeam":function(){
		FlowRouter.go("/t/"+Teams.findOne()._id);	
	},
	"click #makeFavourite":function(){
		let u = FlowRouter.getParam('username').toLowerCase() ;
		let t = Meteor.users.findOne({"username": u })._id ;
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let u = FlowRouter.getParam('username').toLowerCase() ;
		let t = Meteor.users.findOne({"username": u })._id ;
		Meteor.call('removeFromFavourite',t);
	},
});
