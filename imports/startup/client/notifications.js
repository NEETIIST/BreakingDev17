import { Meteor } from 'meteor/meteor' ;

var sender = Meteor.settings.push.senderID;

console.log(sender);

Push.Configure({
  android: {
    senderID: sender,
    alert: true,
    badge: true,
    sound: true,
    vibrate: true,
    clearNotifications: true
    // icon: '',
    // iconColor: ''
  },
});