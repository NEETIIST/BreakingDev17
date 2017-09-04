import { Meteor } from 'meteor/meteor';
import { Visitors } from '../visitors.js';
import { Sponsors } from '../../sponsors/sponsors.js';

Meteor.publish('sponsors.members',function(name){
	let s = Sponsors.findOne({'short':name});
	if ( s !== undefined )
	{
		let list = [];
		s.members.forEach(function(m){
			list.push(m);
		});
		return Visitors.find({'user':{ $in : list }},{fields:{'favourite':0}});
	}
})

Meteor.publish('visitors.logged', function(){
	return Visitors.find({"user":this.userId});
})

//Admin use
Meteor.publish('visitors.all', function () {
  	if (Roles.userIsInRole( this.userId, 'admin'))
		return Visitors.find();
	else
		return 0 ;
});