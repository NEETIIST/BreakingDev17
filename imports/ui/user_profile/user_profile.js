import './user_profile.html';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker'

Template.user_profile.onRendered(function() {

	let u = FlowRouter.getParam('username').toLowerCase();
	let p = Meteor.users.findOne({'username':u});
	if ( Meteor.userId() == p._id )
	{
		console.log("here");
		this.subscribe('devs.single', p._id);
	}

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
	"click .jump":function(){
		FlowRouter.go("/dash");	
	},
	"click .back":function(){
		FlowRouter.go("/dash");	
	},
});