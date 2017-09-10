import './sponsor.html';

import { Sponsors } from '/imports/api/sponsors/sponsors.js';
import { Visitors } from '/imports/api/visitors/visitors.js';
import { Teams } from '/imports/api/teams/teams.js';
import { Devs } from '/imports/api/devs/devs.js';
import '/imports/api/images/images.js';

Template.sponsor.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var s = FlowRouter.getParam('shortname').toLowerCase();
		self.subscribe('sponsors.single',s);
		self.subscribe('sponsors.single.image',s);
		self.subscribe('sponsors.members',s);
		self.subscribe('sponsors.members.image',s);
	});
});

Template.sponsor.helpers({
	sponsorData: function () {
		return Sponsors.findOne();
	},
	sponsorPic: function () {
		let s = Sponsors.findOne();
		return Images.findOne({"_id":s.picture}).link();
	},
	sponsorMembers: function () {
		return Visitors.find();
	},
	memberPic: function () {
		let i = Images.findOne({"_id":this.picture}) ;
		if ( i === undefined )
			return "/profile.png";
		else			
			return i.link();	
	}
});