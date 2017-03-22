// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';

 
Meteor.startup(() => {
  // if the Links collection is empty
  if (Links.find().count() === 0) {
    const data = [
      {
        name: 'menu_index',
        url: '/',
        isNavbar: true,
      },
      {
        name: 'menu_beasponsor',
        url: '/sponsor',
        isNavbar: true,
      },
    ];

    data.forEach(link => Links.insert(link));
  }
}); 