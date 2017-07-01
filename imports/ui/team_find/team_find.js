import './team_find.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.team_find.onRendered(function() {

	var self = this;
	self.autorun(function(){
		self.subscribe('devs.single.inTeam', Meteor.userId());
		self.subscribe('allTeamsInfo');
	});
});

Template.team_find.helpers({
	noProfile: function(){
		return Devs.find({}).count() == 0;
	},
	notInTeam: function(){
		return ! Devs.findOne({}).inTeam ;
	},
	allTeams: function(){
		return Teams.find({});
	},
	memberCount: function(t){
		return t.members.length + 1 ;
	},
	notFull:function(t){
		return t.members.length <= 3 ;
	},


	i18n_name: function(){
		return TAPi18n.__("ft_name");
	},
	i18n_idea: function(){
		return TAPi18n.__("ft_idea");
	},
	i18n_skills: function(){
		return TAPi18n.__("ft_skills");
	},
	i18n_profile: function(){
		return TAPi18n.__("ft_profile");
	},
	i18n_captain: function(){
		return TAPi18n.__("ft_captain");
	},
	i18n_join: function(){
		return TAPi18n.__("ft_join");
	},
});

Template.team_find.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
	"click #goProfile": function(e){
		FlowRouter.go("/t/"+this._id);
	},
	"click #goApply": function(t){
		FlowRouter.go("/t/"+this._id+"/apply");	
	},
	"click #goJoin": function(t){
		FlowRouter.go("/t/"+this._id+"/join");	
	},
})

Template.registerHelper('equals', function (a, b) {
  	return a === b;
});