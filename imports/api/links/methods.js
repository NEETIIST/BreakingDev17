import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Links } from './links.js';

Meteor.methods({
  'links.insert'(name, url) {
    check(url, String);
    check(name, String);

    return Links.insert({
      name,
      url,
    });
  },
});