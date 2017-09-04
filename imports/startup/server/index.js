// Import server startup through a single index entry point

import './links.js';
import './register-api.js';
import './mail-url.js';
import './devtests.js';

import { Meteor } from 'meteor/meteor';

// Use Prerender with your token
/*
const prerenderio = Npm.require('prerender-node');
const settings = Meteor.settings.PrerenderIO;

if (settings && settings.token && settings.host) {
    prerenderio.set('prerenderToken', settings.token);
    prerenderio.set('host', settings.host);
    prerenderio.set('protocol', 'http');
    WebApp.rawConnectHandlers.use(prerenderio);
};
*/
var server = Meteor.settings.push.serverKey;

Push.Configure({
  // apn: {
  //   certData: Assets.getText('apnDevCert.pem'),
  //   keyData: Assets.getText('apnDevKey.pem'),
  //   passphrase: 'xxxxxxxxx',
  //   production: true,
  //   //gateway: 'gateway.push.apple.com',
  // },
  gcm: {
    apiKey: serverKey,  // GCM/FCM server key
  }
  // production: true,
  // 'sound' true,
  // 'badge' true,
  // 'alert' true,
  // 'vibrate' true,
  // 'sendInterval': 15000, Configurable interval between sending
  // 'sendBatchSize': 1, Configurable number of notifications to send per batch
  // 'keepNotifications': false,
//
});
