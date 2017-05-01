import './navbar.html'

Template.navbar.onCreated(function(){
	Session.set("nav", false);
	this.subscribe("links.all");
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



Template.menuOptions.events({
	//Menu
	"click .menu-redirect": function(){
		FlowRouter.go(this.url);
		Session.set("tab", this.name);
	},

	//Languages
	"click #lang_pt": function(){
		TAPi18n.setLanguage("pt");
		T9n.setLanguage("pt-PT");
	},
	"click #lang_en": function(){
		TAPi18n.setLanguage("en");
		T9n.setLanguage("en");
	},
});

Template.menuOptions.helpers({
	links: function(){
		return Links.find({'isNavbar':true});
	},
	activeTab: function(){
		if( this.name === Session.get("tab") )
		{
			return "active";
		}
		else
		{
			return "not-active";
		}
	},
	isLogged: function(){
		return (Meteor.userId()!==null)&&(this.name==="menu_login");
	},
	loggedUser: function(){
		return Meteor.users.findOne({'_id':Meteor.userId()}).username;
	}
});
