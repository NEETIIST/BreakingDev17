// Fill the DB with example data on startup
// Don't forget to put the actual link text on the i18n files (!)

import { Meteor } from 'meteor/meteor';
import { Links } from '../../api/links/links.js';

 
Meteor.startup(() => {
  
  var dataLinks =
  [
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

  dataLinks.forEach(function(link){
    if ( Links.find({'name':link.name}).count() === 0 )
    {
      Links.insert(link);
    }
  });

}); 