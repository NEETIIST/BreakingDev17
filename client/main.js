// Client entry point, imports all client code



import '/imports/startup/client';
import '/imports/startup/both';

import { Contact } from '/imports/api/contact/contact.js';
window.Contact = Contact ;

import { Links } from '/imports/api/links/links.js';
window.Links = Links ;

