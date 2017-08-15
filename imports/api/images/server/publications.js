import { Meteor } from 'meteor/meteor';
import '../images.js';
import { Devs } from '../../devs/devs.js';
import { Teams } from '../../teams/teams.js';

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
		console.log(list);
		return Images.find({'_id':{ $in : list }}).cursor;
	}
});

//Admin Use
Meteor.publish('files.images.all', function () {
	return Images.find().cursor;
});