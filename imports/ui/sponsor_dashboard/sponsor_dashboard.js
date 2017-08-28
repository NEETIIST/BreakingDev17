import './sponsor_dashboard.html'
import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Visitors } from '/imports/api/visitors/visitors.js';

Template.sponsor_dashboard.onRendered(function() {

	var self = this;
	self.autorun(function(){
		if ( Roles.userIsInRole( Meteor.userId(), 'sponsor'))
		{
			//Subscriptions	
			self.subscribe("visitors.logged");
			self.subscribe('visitor.image');
			self.subscribe("sponsors.logged");
			self.subscribe('sponsor.image');
		}
		else
		{
			FlowRouter.go("/dash");
		}
	});

	BlazeLayout.render('base', {main:"sponsor_dashboard",dash_small:"sd_null"});
});

Template.sponsor_dashboard.helpers({
	test: function(){
		return true ;
	},
	active: function(id){
		if ( id == Session.get("dash_last") )
			return "f-orange";
	},
})

Template.sponsor_dashboard.events({
	"click #logout": function(){
		AccountsTemplates.logout();
	},
	"click #sd-profile": function(){
		Session.set("dash_last","sd_profile");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",dash_small:last});
	},
	"click #sd-sponsor": function(){
		Session.set("dash_last","sd_sponsor");
		let last = Session.get("dash_last");
		BlazeLayout.render('base', {main:"sponsor_dashboard",dash_small:last}); 
	},
});

Template.sd_profile.onRendered(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('visitor.image');
	});
	//Session.set('reload_profile',true);
});

Template.sd_profile.helpers({
	Visitors: function(){
		return Visitors;
	},
	visitorProfile: function(){
		return Visitors.findOne({"user":Meteor.userId()});
	},
	company: function(){
		return Sponsors.findOne({"members":Meteor.userId()}).name;
	},
	reload: function(){
		return Session.get('reload_profile');
	},
});

Template.sd_sponsor.helpers({
	Sponsors: function(){
		return Sponsors;
	},
	sponsorProfile: function(){
		return Sponsors.findOne({"members":Meteor.userId()});
	},
	sponsorPic: function(){
		let p = Sponsors.findOne({}).picture;
		return Images.findOne({"_id":p}).link();
	},
	sponsorName: function(){
		return Sponsors.findOne({"members":Meteor.userId()}).name;	
	}
});

AutoForm.addHooks(['editVisitor'],{
    onSuccess: function(formType, result) {
        alert(TAPi18n.__("sd-profile-success"));
        Session.set("dash_last","sd_null");
        BlazeLayout.render('base', {main:"sponsor_dashboard",dash_small:"sd_null"});
    }
});