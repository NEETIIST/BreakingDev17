import './user_profile_edit.html';
import { Devs } from '/imports/api/devs/devs.js';

Template.user_profile_edit.onRendered(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('devs.single');
		self.subscribe('profile.image', Meteor.userId());
	});

	Meteor.call('userHasProfile', function (err, result) {
        if (err) {
            console.log(err);
        } else {;
            if (result === false) {
                FlowRouter.go("/u_/add");
            }
    	}
	});
});

Template.user_profile_edit.helpers({
	Devs(){
    	return Devs;
  	},

  	userProfile: function(){
		return Devs.findOne();
	},
});

Template.user_profile_edit.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});

AutoForm.addHooks(['updateUserProfile'],{
    onSuccess: function(formType, result) {
      FlowRouter.go("/dash");
    }
});