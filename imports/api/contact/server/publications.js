import { Meteor } from 'meteor/meteor';
import { Contact } from '../contact.js';

Meteor.publish('contact.all', function () {
  return Contact.find();
});
