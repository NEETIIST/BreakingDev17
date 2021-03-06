import './payment.html'
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Payments } from '/imports/api/payments/payments.js';

Template.payment.onRendered(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('devs.single');
		self.subscribe('singleTeamName.logged',Meteor.userId());
	});
});

Template.payment.helpers({
	Payments(){
   		return Payments;
  	},
  	price: function(){
  		var today = new Date();
		var dateEnd = new Date(2017,09,13);
		/*if( Date.parse(today) >= Date.parse(dateEnd)){
   			return "10";
		}
		else
			return "5";
		*/
		return "10";
  	},
  	readyPayment: function(){
  		return Teams.findOne({}).validated ;
  	},
});

Template.payment.events({
	"click #goDash":function(){
		FlowRouter.go("/dash");	
	},
});


AutoForm.addHooks(['addPayment'],{
    onSuccess: function(formType, result) {
    	FlowRouter.go("/dash");
    }
});
