import './sponsor.html';

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