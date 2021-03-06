import './team_join.html'

import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.team_join.onRendered(function() {

	this.subscribe('devs.single.inTeam', Meteor.userId());
	var self = this;
	self.autorun(function(){
		let t = FlowRouter.getParam('teamname');
		//self.subscribe('singleTeamVisitor',t);
		self.subscribe('singleTeamVisitor',t);
		self.subscribe('singleTeamName.user', Meteor.user().username);
	});
});

Template.team_join.helpers({
	alreadyInTeam: function(){
		return Devs.findOne({}).inTeam ;
	},
	alreadyInTeamName: function(){
		return Teams.findOne({"_id":Devs.findOne({}).team}).team_name ;
	},
	teamData: function(){
		let t = FlowRouter.getParam('teamname');
		return Teams.findOne({"_id":t});
	},
	teamFull: function(){
		let t = FlowRouter.getParam('teamname');
		return (Teams.findOne({"_id":t}).members.length >= 3);
	},
	noProfile: function(){
		return (Devs.find({}).count() == 0 ) ;
	},
	hasPin: function(){
		var re1 = new RegExp( /^[0-9A-Fa-f]+$/ );
		let pin = FlowRouter.getParam('pin');
		if ( pin !== undefined && re1.test(pin) && pin.length==4)
			return true;
		else
			return false ;
	},
	trythis: function(){
		return FlowRouter.getParam('pin');
	},
});

Template.team_join.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},

	'submit .input-pin'(event) {
	    // Prevent default browser form submit
	    event.preventDefault();
	 
	    // Get value from form element
	    const target = event.target;
	    const text = target.pin.value;
	 
	    // Insert a task into the collection
	    Meteor.call('joinTeam', FlowRouter.getParam('teamname'), text, function(error,result) {
	    	if (error.error === "wrong-pin") {
    			alert(TAPi18n.__("jt_wrongpin"));
  			}
  			else if (error.error === "full-team") {
    			alert(TAPi18n.__("jt_fullteam"));
  			}
  			else
  			{
  				console.log(error.error);
  			}
	    });

	    FlowRouter.go("/dash");
	    // MISSING AN ALERT IF SUCCESS
	 
	    // Clear form
	    target.pin.value = '';
  	},


});