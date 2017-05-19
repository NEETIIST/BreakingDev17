import './dashboard.html';

Template.dashboard.events({
	"click #logout": function(){
		AccountsTemplates.logout();
	},
	"click #editProfile": function(){
		FlowRouter.go("/u/"+Meteor.user().username+"/edit");
	}
});