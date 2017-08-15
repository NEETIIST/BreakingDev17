import './volunteer_add.html';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Devs } from '/imports/api/devs/devs.js';

Template.volunteer_add.onRendered(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('volunteer.logged');
        // Users must have a profile and not be on a team
        if ( Volunteers.find().count() > 0 )
        {
            FlowRouter.go("/volunteer/edit");
        }
    });

});

Template.volunteer_add.helpers({
	Volunteers(){
    	return Volunteers;
  	},
});

Template.volunteer_add.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});

AutoForm.addHooks(['addVolunteer'],{
    onSuccess: function(formType, result) {
        Meteor.call('setUpVolunteer', result);
        Meteor.call('devIsVolunteer', result);
      	FlowRouter.go("/dash");
    }
});
