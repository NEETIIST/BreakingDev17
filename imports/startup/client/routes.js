import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/home/home.js'
import '../../ui/home/homeGallery.js'
import '../../ui/home_sponsor/home_sponsor.js'


// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('home');
  },
});

FlowRouter.route('/sponsor', {
  name: 'home_sponsor',
  action() {
    BlazeLayout.render('home_sponsor');
  },
});

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('404');
  },
};
*/
