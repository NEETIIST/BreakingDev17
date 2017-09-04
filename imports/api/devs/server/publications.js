import { Meteor } from 'meteor/meteor';
import { Devs } from '../devs.js';
import { Teams } from '../../teams/teams.js';

Meteor.publish('devs.single', function(){
	var id = this.userId ;
	return Devs.find({'user':id});
});

Meteor.publish('devs.single.alt', function(u){
	var user = Meteor.users.findOne({'username':u});
	return Devs.find({'user':user._id});
});

Meteor.publish('devs.single.inTeam', function(id){
	return Devs.find({'user':id},{fields: {'inTeam': 1, "team":1}});
});

Meteor.publish('devs.single.username', function(id){
	return Devs.find({'user':id},{fields: {'user':1}});
});

Meteor.publish('devs.team', function(id){
	let t = Teams.findOne({'_id':id});
	if ( t !== undefined )
	{
		let list = [];
		list.push(t.captain);
		t.members.forEach(function(m){
			list.push(m);
		});
		return Devs.find({'user':{ $in : list }},{fields:{'user':1,'name':1,'picture':1}});
	}
});

//Sponsor User
Meteor.publish('devs.sponsor', function(){
	if (Roles.userIsInRole( this.userId, 'sponsor'))
		return Devs.find({},{fields:{"payment":0}});
	else
		return 0 ;
});

//Admin Use
Meteor.publish('devs.all', function(){
	if (Roles.userIsInRole( this.userId, 'admin'))
		return Devs.find();
	else
		return 0 ;
});
