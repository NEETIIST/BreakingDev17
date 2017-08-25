import './team.html'
import { Accounts } from 'meteor/accounts-base';
import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.team.onRendered(function() {
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname');
		self.subscribe('singleTeamVisitor',t);
		self.subscribe('singleTeamMembers', t);
		self.subscribe('devs.team', t);
		self.subscribe('profile.image.team',t);
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
})

Template.registerHelper('equals', function (a, b) {
  	return a === b;
});