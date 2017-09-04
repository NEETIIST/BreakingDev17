import { Meteor } from 'meteor/meteor';
import '../images.js';
import { Devs } from '../../devs/devs.js';
import { Teams } from '../../teams/teams.js';
import { Visitors } from '../../visitors/visitors.js';
import { Sponsors } from '../../sponsors/sponsors.js';

Meteor.publish('profile.image', function(id){
	let d = Devs.findOne({"user":id});
	//console.log(Images.findOne({"_id":d.picture}));
	return Images.find({"_id":d.picture}).cursor;
});

Meteor.publish('profile.image.user', function(username){
	let u = Meteor.users.findOne({"username":username});
	let d = Devs.findOne({"user":u._id});
	return Images.find({"_id":d.picture}).cursor;
});

Meteor.publish('profile.image.team', function(id){
	let t = Teams.findOne({'_id':id});
	if ( t !== undefined )
	{
		let list = [];
		let c = Devs.findOne({"user":t.captain});
		list.push(c.picture);
		t.members.forEach(function(m){
			let d = Devs.findOne({"user":m});
			if ( d.picture != undefined )
				list.push(d.picture);
		});
		return Images.find({'_id':{ $in : list }}).cursor;
	}
});

Meteor.publish('visitor.image', function(){
	let d = Visitors.findOne({"user":this.userId});
	if ( d !== undefined )
		return Images.find({"_id":d.picture}).cursor;
});

Meteor.publish('sponsors.members.image', function(name){
	let s = Sponsors.findOne({'short':name});
	if ( s !== undefined )
	{
		let list = [];
		s.members.forEach(function(m){
			let v = Visitors.findOne({"user":m});
			if ( v.picture !== undefined )
				list.push(v.picture);
		});
		return Images.find({'_id':{ $in : list }}).cursor;
	}
});

Meteor.publish('sponsors.single.image', function(name){
	let s = Sponsors.findOne({"short":name});
	if ( s !== undefined )
		return Images.find({"_id":s.picture}).cursor;
});

Meteor.publish('sponsor.image', function(){
	let v = Visitors.findOne({"user":this.userId});
	if ( v !== undefined )
	{
		let s = Sponsors.findOne({"short":v.company});
		if ( s !== undefined )
			return Images.find({"_id":s.picture}).cursor;
	}
});

Meteor.publish('alldevs.image', function(){
	let d = Devs.find({"picture":{"$exists":true}});
	if ( d !== undefined )
	{
		//console.log(d);
		let list = [];
		d.forEach(function(m){
			list.push(m.picture);
		});
		return Images.find({'_id':{ $in : list }}).cursor;
		//return Images.find({}).cursor;
	}
});

//Admin Use
Meteor.publish('files.images.all', function () {
	return Images.find().cursor;
});

