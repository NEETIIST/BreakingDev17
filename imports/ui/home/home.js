import './home.html';

Template.home.events({

	"click #downyougo" : function(){
		$('html, body').animate({scrollTop: $("#about").offset().top}, 'slow');
	},

	"click #goLogin" : function(){
		FlowRouter.go("/login");
	}
})

Template.home.helpers({
	days: function(){
		var countDownDate = new Date("Sep 22, 2017 15:00:00").getTime();
		var now = new Date().getTime();
	  	var distance = countDownDate - now;
	  	return Math.floor(distance / (1000 * 60 * 60 * 24));
	},
})