import './sponsor_access.html'

Template.sponsor_access.helpers({
	alreadySponsor: function(){
		return Roles.userIsInRole( Meteor.userId(), 'sponsor');
	},
})

Template.sponsor_access.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
	"submit #sponsor_code":function(event){
		event.preventDefault();
		let pin = event.target.pin.value;
		Meteor.call('grantSponsorAccess',pin, function(err,res){
			if (err)
			{
				if ( err.error == "not-valid-code" )
					alert(TAPi18n.__("sponsor-code-invalid"));
				if ( err.error == "not-recognized-code" )
					alert(TAPi18n.__("sponsor-code-unrecognized"));
				if ( err.error == "used-code" )
					alert(TAPi18n.__("sponsor-code-used"));
				else
					console.log(err);
			}
			else
			{
				if ( res )
				{
					alert(TAPi18n.__("sponsor-code-success"));
					FlowRouter.go("/dash");
				}
			}
		});
	},
});
