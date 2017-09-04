if (Meteor.isCordova) {
	navigator.splashscreen.hide();

cordova.plugins.diagnostic.requestCameraAuthorization(function (granted) {
            console.log("Successfully requested camera authorization: authorization was " + (granted ? "GRANTED" : "DENIED"));
        }, function (error) {
            console.error(error);
        });
}