import './user.html';
import { Accounts } from 'meteor/accounts-base';

Template.user.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var u = FlowRouter.getParam('username').toLowerCase();
		self.subscribe('singleUserVisitor',u);
	});
});

Template.user.helpers({
	userData: function(){
		var u = FlowRouter.getParam('username').toLowerCase();
		return Meteor.users.findOne({'username':u});
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
});