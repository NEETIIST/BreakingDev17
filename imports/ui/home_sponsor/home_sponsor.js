import { Contact } from '/imports/api/contact/contact.js';
import { Meteor } from 'meteor/meteor';
import './home_sponsor.html';

Template.home_sponsor.onCreated( function() {
	Meteor.subscribe('contact.all');
});