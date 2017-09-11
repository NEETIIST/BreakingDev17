import './team.html'
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';
import { Visitors } from '/imports/api/visitors/visitors.js';

Template.team.onRendered(function() {
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname');
		self.subscribe('singleTeamVisitor',t);
		self.subscribe('singleTeamMembers', t);
		self.subscribe('devs.team', t);
		self.subscribe('profile.image.team',t);
		if (Roles.userIsInRole( Meteor.userId(), 'sponsor') )
			self.subscribe('visitors.logged');
	});
});

Template.team.helpers({
	teamData: function(){
		return Teams.findOne();
	},
	members: function(){
		let members = Teams.findOne({}).members;
		members.unshift(Teams.findOne({}).captain);
		let list = [];
		members.forEach(function(m){
			list.push(Meteor.users.findOne({"_id":m}));
		});
		return list;
	},
	userPic: function(){
		let d = Devs.findOne({"user":this._id});
		let img = Images.findOne({"_id":d.picture});
		if ( img != undefined )
		{
			return img.link();
		}
		else
			return "/profile.png";
	},
	name: function (user) {
		return Devs.findOne({"user":user._id}).name ;
	},
	isSponsor: function () {
		if ( Roles.userIsInRole( Meteor.userId(), 'sponsor'))
			return true;
		else
			return false;
	},
	isFavourite: function () {
		let t = FlowRouter.getParam('teamname');
		let f = Visitors.findOne().favourite;
		if ( f.indexOf(t) != -1 )
			return true;
		else
			return false;
	}
})

Template.team.events({
	"click #goUser":function(){
		FlowRouter.go("/u/"+this.username);	
	},
	"click #makeFavourite":function(){
		let t = FlowRouter.getParam('teamname');
		Meteor.call('addToFavourite',t);
	},
	"click #removeFavourite":function(){
		let t = FlowRouter.getParam('teamname');
		Meteor.call('removeFromFavourite',t);
	},
});

Template.registerHelper('equals', function (a, b) {
  	return a === b;
});