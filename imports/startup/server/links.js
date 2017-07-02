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
      name: 'menu_login',
      url: '/login',
      icon: 'fa-user-circle-o',
      isNavbar: true,
    },
    /*{
      name: 'menu_logout',
      url: '/logout',
      icon: 'fa-sign-out',
      isNavbar: false,
    },*/
  ];

  dataLinks.forEach(function(link){
    if ( Links.find({'name':link.name}).count() === 0 )
    {
      Links.insert(link);
    }
    // To implement when admin roles are implemented:
    // Meteor Call restricted to admins to delete all Links
    // This way when an update is deployed it clears previous links
  });

}); 