import './user.html';
import { Accounts } from 'meteor/accounts-base';

Template.user.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var u = FlowRouter.getParam('username');
		self.subscribe('singleUserVisitor',u);
	});
});

Template.user.helpers({
	userData: function(){
		var u = FlowRouter.getParam('username') ;
		return Meteor.users.findOne({'username':u});
	},
})