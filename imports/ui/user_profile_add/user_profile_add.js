import './user_profile_add.html';
import { Devs } from '/imports/api/devs/devs.js';


Template.user_profile_add.onRendered(function() {
	Meteor.call('userHasProfile', function (err, result) {
        if (err) {
            console.log(err);
        } else {
        	console.log(result);
            if (result === true) {
                FlowRouter.go("/u_/edit");
            }
    	}
	});
});

Template.user_profile_add.helpers({
	Devs(){
    	return Devs;
  	},
});

Template.user_profile_add.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});

AutoForm.addHooks(['addUserProfile'],{
    onSuccess: function(formType, result) {
    	//alert("Dados atualizados");
        Meteor.call('setUpDev', function(error, result) {});
      	FlowRouter.go("/dash");
    }
});
