import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
//import '../../ui/layouts/body/body.js';
//import '../../ui/pages/home/home.js';
//import '../../ui/pages/not-found/not-found.js';
import '../../ui/home/home.js'


// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('home');
  },
});

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('404');
  },
};
*/
