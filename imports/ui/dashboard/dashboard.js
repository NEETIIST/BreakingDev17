import './dashboard.html';

Template.dashboard.events({
	"click #logout": function(){
		AccountsTemplates.logout();
	},
});