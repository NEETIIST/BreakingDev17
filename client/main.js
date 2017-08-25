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

import { Images } from '/imports/api/images/images.js';
window.Images = Images ;

import { Payments } from '/imports/api/payments/payments.js';
window.Payments = Payments ;

import { Volunteers } from '/imports/api/volunteers/volunteers.js';
window.Volunteers = Volunteers ;

import { Shifts } from '/imports/api/shifts/shifts.js';
window.Shifts = Shifts ;

import { Sponsors } from '/imports/api/sponsors/sponsors.js';
window.Sponsors = Sponsors ;