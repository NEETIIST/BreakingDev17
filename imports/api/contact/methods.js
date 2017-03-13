import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Contact } from './contact.js';

Meteor.methods({
  'contact.insert'(title, url) {
    check(url, String);
    check(title, String);

    return Links.insert({
      url,
      title,
      createdAt: new Date(),
    });
  },
});