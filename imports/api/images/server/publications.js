import { Meteor } from 'meteor/meteor';
import '../images.js';
import { Devs } from '../../devs/devs.js';

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


Meteor.publish('files.images.all', function () {
	return Images.find().cursor;
});