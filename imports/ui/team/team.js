import './team.html'

Template.team.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var t = FlowRouter.getParam('teamname').toLowerCase();
		self.subscribe('singleTeamVisitor',t);
	});
});