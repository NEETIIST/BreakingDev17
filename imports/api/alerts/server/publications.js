import { Meteor } from 'meteor/meteor';
import { Alerts } from '../alerts.js';

Meteor.publish('alerts.visible', function(){
	return Alerts.find({"display":true});
});

//Admin Use
Meteor.publish('alerts.all', function(){
	if (Roles.userIsInRole( this.userId, 'admin'))
		return Alerts.find();
	else
		return 0 ;
});