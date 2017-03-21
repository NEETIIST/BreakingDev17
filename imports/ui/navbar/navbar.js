import './navbar.html'

Template.navbar.onCreated(function(){
	Session.set("nav", false);
})

Template.navbar.events({

	"click #navbar-button":function(){
		Session.set("nav", !Session.get("nav") );
	},

	"click #navbar-container":function(){
		Session.set("nav", false );
	}

});

Template.navbar.helpers({

	nav: function(){
		return Session.get("nav");
	}

});
