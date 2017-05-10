// Import server startup through a single index entry point

import './links.js';
import './register-api.js';
import './mail-url.js';
import './devtests.js';

import { Meteor } from 'meteor/meteor';

// Use Prerender with your token
const prerenderio = Npm.require('prerender-node');
const settings = Meteor.settings.PrerenderIO;

if (settings && settings.token && settings.host) {
    prerenderio.set('prerenderToken', settings.token);
    prerenderio.set('host', settings.host);
    prerenderio.set('protocol', 'http');
    WebApp.rawConnectHandlers.use(prerenderio);
};