// Client entry point, imports all client code

import '/imports/startup/client';
import '/imports/startup/both';

import { Contact } from '/imports/api/contact/contact.js';
window.Contact = Contact ;

import { Links } from '/imports/api/links/links.js';
window.Links = Links ;

import { Devs } from '/imports/api/devs/devs.js';
window.Devs = Devs ;

import { Teams } from '/imports/api/teams/teams.js';
window.Teams = Teams ;

import { Alerts } from '/imports/api/alerts/alerts.js';
window.Alerts = Alerts ;
