import './user_profile.html';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker'
import { Devs } from '/imports/api/devs/devs.js';

Template.user_profile.onCreated(function() {

	var self = this;
	self.autorun(function(){
		let u = FlowRouter.getParam('username').toLowerCase();
		let p = Meteor.users.findOne({'username':u});
		console.log(p);	
		if ( p !== undefined )
		{
			if ( Meteor.userId() == p._id )
			{
				this.subscribe('devs.single', p._id);
			}
		}
	});


	/* Reload Bug -> O subsReady está a ser chamado antes de haver render
	portanto acaba por nao ter subscricao nenhuma. Basicamente o ready nao ta a fazer nada
	Acaba por não fazer diferença por causa do modo como navegamos no site, mas tem que ser revisto*/
});

Template.user_profile.helpers({
	isNewUser: function(){
		let u = FlowRouter.getParam('username').toLowerCase();
		let p = Meteor.users.findOne({'username':u})._id;
		return ( Devs.find({'user':p}).count() == 0 );
	},
	isOwner: function(){
		let u = FlowRouter.getParam('username').toLowerCase();
		console.log(u);
		console.log(Meteor.userId());
		console.log(Meteor.users.findOne({'username':u}));
		console.log(Meteor.users.findOne({'username':u})._id);
		console.log(Meteor.users.findOne({'username':u})._id == Meteor.userId());
		return ( Meteor.userId() == Meteor.users.findOne({'username':u})._id );
	},
	userProfile: function(){
		let u = FlowRouter.getParam('username').toLowerCase();
		let p = Meteor.users.findOne({'username':u})._id;
		return Devs.findOne({'user':p});
	},
	userData: function(){
		var u = FlowRouter.getParam('username').toLowerCase();
		return Meteor.users.findOne({'username':u});
	},
});

Template.user_profile.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});

AutoForm.addHooks(['addUserProfile'],{
    onSuccess: function(formType, result) {
      FlowRouter.go("/dash");
    }
});

AutoForm.addHooks(['updateUserProfile'],{
    onSuccess: function(formType, result) {
      FlowRouter.go("/dash");
    }
});
