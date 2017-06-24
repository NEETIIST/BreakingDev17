import './team_add.html';
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Template.team_add.onRendered(function() {
	
	var self = this;
	self.autorun(function(){
		self.subscribe('devs.single', Meteor.userId());
	});
});

Template.team_add.helpers({
	Teams(){
    	return Teams;
  	},
	alreadyInTeam: function(){
		Meteor.call('userHasTeam', function (err, result) {
	        if (err) {
	            console.log(err);
	        } else {
	        	console.log(result);
	            if (result === true) {
	                return true;
	            }
	    	}
		});
	},
	noProfile: function(){
		return (Devs.find({}).count() == 0 ) ;
	},
});

Template.team_add.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});


// Forms Redirect and Setups
AutoForm.addHooks(['addTeam'],{
    onSuccess: function(formType, result) {
      	Meteor.call('setUpTeam', result, function(error, result) {console.log(error)});
      	Meteor.call('userInTeam', function(error,result){console.log(error)});
    FlowRouter.go("/t/"+result+"/pass");
    }
});