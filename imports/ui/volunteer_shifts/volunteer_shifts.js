import './volunteer_shifts.html';
import { Volunteers } from '/imports/api/volunteers/volunteers.js';
import { Shifts } from '/imports/api/shifts/shifts.js';

Template.volunteer_shifts.onRendered(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('volunteer.logged');
        self.subscribe('shifts.all');
        self.subscribe('devs.single');
    });
    
});

Template.volunteer_shifts.helpers({
	allShifts: function(){

    },
    noVolunteer: function(){
        return ! Devs.findOne().volunteer ;
    },
    notApproved: function(){
        return Volunteers.findOne().status !== "Approved" ;
    },
    days: function(){
        return distinct(Shifts,"day");
    },
    day: function(d){
        return Shifts.find({"day":d});
    },
    available: function(){
        // If Available and not assigned
        if ( this.available.indexOf(Meteor.userId()) > -1 || this.assigned.indexOf(Meteor.userId()) > -1 )
            return "availability";
    },
    unavailable: function(){
        if ( this.available.indexOf(Meteor.userId()) == -1 && this.assigned.indexOf(Meteor.userId()) == -1)
            return "availability";
    },
    assigned: function(){
        return this.assigned.indexOf(Meteor.userId()) > -1 ;
    },
});

Template.volunteer_shifts.events({
	"click #goDash":function(){
        FlowRouter.go("/dash"); 
    },
    "click #makeAvailable":function(){
        Meteor.call('makeUserAvailable', this._id);
    },
    "click #makeUnavailable":function(){
        if ( this.assigned.indexOf(Meteor.userId()) > -1 )
            alert(TAPi18n.__("ud_shifts_cancel"));
        else
            Meteor.call('makeUserUnavailable', this._id);
    },
});

function distinct(collection, field) {
  return _.uniq(collection.find({}, {
    sort: {[field]: 1}, fields: {[field]: 1}
  }).map(x => x[field]), true);
}