import { Meteor } from 'meteor/meteor';
import { Shifts } from '../shifts.js';

Meteor.publish('shifts.all', function(){
	return Shifts.find();
});