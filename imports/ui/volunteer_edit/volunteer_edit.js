import './volunteer_edit.html';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';


Template.volunteer_edit.onRendered(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('volunteer.logged');
        if ( Volunteers.find().count() == 0 )
        {
            FlowRouter.go("/volunteer/add");
        }
    });
});

Template.volunteer_edit.helpers({
	Volunteers(){
    	return Volunteers;
  	},
    volProfile: function(){
        return Volunteers.findOne();
    },
});

Template.volunteer_edit.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});

AutoForm.addHooks(['editVolunteer'],{
    onSuccess: function(formType, result) {
        //Meteor.call('setUpDev', result);
      	FlowRouter.go("/dash");
    }
});
