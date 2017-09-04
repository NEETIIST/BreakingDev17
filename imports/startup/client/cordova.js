if (Meteor.isCordova) {

cordova.plugins.diagnostic.requestCameraAuthorization(function (granted) {
            console.log("Successfully requested camera authorization: authorization was " + (granted ? "GRANTED" : "DENIED"));
        }, function (error) {
            console.error(error);
        });
}