import './team_add.html';
import { Accounts } from 'meteor/accounts-base';

Template.team_add.onRendered(function() {

	let u = FlowRouter.getParam('username').toLowerCase();
	let p = Meteor.users.findOne({'username':u});
	if ( Meteor.userId() == p._id )
	{
		this.subscribe('singleTeam', p._id);
	}

	/* Reload Bug -> O subsReady está a ser chamado antes de haver render
	portanto acaba por nao ter subscricao nenhuma. Basicamente o ready nao ta a fazer nada
	Acaba por não fazer diferença por causa do modo como navegamos no site, mas tem que ser revisto*/
});

Template.team_add.helpers({
	
});

Template.team_add.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});