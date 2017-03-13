import './home.html';

Template.home.events({

	"click #downyougo" : function(){
		$('html, body').animate({scrollTop: $("#about").offset().top}, 'slow');
	}
})