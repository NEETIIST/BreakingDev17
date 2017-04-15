import './adminPanel.html';

Template.navbarLinks.onCreated(function(){
	this.subscribe("links.all");
})

Template.navbarLinks.helpers({
	links: function(){
		return Links.find();
	},
});