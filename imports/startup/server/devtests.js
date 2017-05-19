// Fill the DB with example data on startup
// Don't forget to put the actual link text on the i18n files (!)

import { Meteor } from 'meteor/meteor';
import { Teams } from '../../api/teams/teams.js';
import { Devs } from '../../api/devs/devs.js';

 
Meteor.startup(() => {
  
  SimpleSchema.debug = true;

  var dataLinks =
  [
    {
      name: 'team1',
      members: ['user1', 'user2', 'user3'],
    },
    {
      name: 'team2',
      members: ['user4', 'user5', 'user6'],
    },
  ];

  dataLinks.forEach(function(team){
    if ( Teams.find({'name':team.name}).count() === 0 )
    {
      Teams.insert(team);
    }
  });

}); 