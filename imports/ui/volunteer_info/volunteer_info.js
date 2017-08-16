import './volunteer_info.html';


Template.volunteer_info.helpers({
	logged: function(){
		return Meteor.userId();
	},
});

Template.volunteer_info.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});