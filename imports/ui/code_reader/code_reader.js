import './code_reader.html';

if (Meteor.isCordova) {

	Session.set("isApp", true );

  	Template.code_reader.events({
		'click #startReader': function () {
			cordova.plugins.barcodeScanner.scan(
				function (result) {
					/*
					alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);
					*/
					FlowRouter.go("/u/"+result);
				}, 
				function (error) {
					alert("Scanning failed: " + error);
				}
			);
		}
	});

}

Template.code_reader.helpers({
	isApp: function () {
		if (Session.get('isApp') === true)
			return true;
		else
			return false;
	},
});