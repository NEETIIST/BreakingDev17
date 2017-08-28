import { Meteor } from 'meteor/meteor';
import { Sponsors } from '../sponsors.js';

Meteor.publish('sponsors.logged', function(){
	return Sponsors.find({"members":this.userId},{fields:{"name":1,"short":1,"members":1}});
})

//Admin use
Meteor.publish('sponsors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Sponsors.find();
	else
		return 0 ;
});