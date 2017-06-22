import './login.html';

Template.atForm.onRendered(function() {
	form = document.getElementById("at-pwd-form");
	form.setAttribute( "autocomplete", "off" );
});


