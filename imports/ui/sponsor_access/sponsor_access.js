import './sponsor_access.html'

Template.sponsor_access.helpers({
	alreadySponsor: function(){
		return Roles.userIsInRole( Meteor.userId(), 'sponsor');
	},
})

Template.sponsor_access.events({
	"submit #sponsor_code":function(event){
		event.preventDefault();
		let pin = event.target.pin.value;
		Meteor.call('grantSponsorAccess',pin, function(err,res){
			if (err)
			{
				if ( err.error == "not-valid-code" )
					alert("código inválido");
				if ( err.error == "not-recognized-code" )
					alert("código não reconhecido");
				if ( err.error == "used-code" )
					alert("código já utilizado previamente");
				else
					console.log(err);
			}
			else
			{
				console.log(res);
			}

		});
	},
});
