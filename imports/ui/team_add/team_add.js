import './team_add.html';
import { Accounts } from 'meteor/accounts-base';

Template.team_add.onRendered(function() {

	this.subscribe('devs.single.inTeam', Meteor.userId());

});

Template.team_add.helpers({
	alreadyInTeam: function(){
		return Devs.findOne({}).inTeam ;
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
      Meteor.call('setUpTeam', result , function(error, result) {});
      Meteor.call('userInTeam', Meteor.userId(), result, function(error,result){});
    FlowRouter.go("/t/"+result+"/pass");
    }
});