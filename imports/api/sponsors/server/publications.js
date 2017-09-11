import { Meteor } from 'meteor/meteor';
import { Sponsors } from '../sponsors.js';

Meteor.publish('sponsors.single', function(name){
	return Sponsors.find({"short":name},{fields:{"codes":0, "usedCodes":0}});
});

Meteor.publish('sponsors.logged', function(){
	return Sponsors.find({"members":this.userId},{fields:{"codes":0, "usedCodes":0}});
})

//Admin use
Meteor.publish('sponsors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Sponsors.find();
	else
		return 0 ;
});