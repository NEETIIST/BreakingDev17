// Fill the DB with example data on startup
// Don't forget to put the actual link text on the i18n files (!)

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';

 
Meteor.startup(() => {
  // if the Links collection is empty
  // Should be revised, this implementation drops the links db everytime an update is deployed
  Links.rawCollection().drop();
  if (Links.find().count() === 0) {
    const data = [
      {
        name: 'menu_index',
        url: '/',
        icon: 'fa-home',
        isNavbar: true,
      },
      {
        name: 'menu_beasponsor',
        url: '/sponsor',
        icon: 'fa-handshake-o',
        isNavbar: true,
      },
    ];

    data.forEach(link => Links.insert(link));
  }
}); 