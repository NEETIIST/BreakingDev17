import './team_apply.html';

import { Teams } from '/imports/api/teams/teams.js';
import { Meteor } from 'meteor/meteor';
import { Team_Mail } from '/imports/api/team_mail/team_mail.js';

Template.team_apply.onRendered(function() {
	this.subscribe('singleTeamVisitor', FlowRouter.getParam('teamname'));
	this.subscribe('devs.single.inTeam', Meteor.userId());
});

Template.team_apply.events({
	"click #goDash":function(){
		FlowRouter.go("/t_/find");
	},
});

Template.team_apply.helpers({
	Team_Mail(){
    	return Team_Mail;
  	},
  	teamId: function(){
		return Teams.findOne({})._id;
	},
	teamName: function(){
		return Teams.findOne({}).team_name;
	},
	mt_desc: function(){
		return TAPi18n.__("mt_desc");
	},
	alreadyInTeam: function(){
		return Devs.findOne({}).inTeam ;
	},
	alreadyInTeamName: function(){
		return Teams.findOne({"_id":Devs.findOne({}).team}).team_name ;
	},
	teamFull: function(){
		let t = FlowRouter.getParam('teamname');
		return (Teams.findOne({"_id":t}).members.length >= 3);
	},
	noProfile: function(){
		return (Devs.find({}).count() == 0 ) ;
	},
});