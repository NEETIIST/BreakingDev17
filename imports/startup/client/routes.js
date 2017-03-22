import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/home/home.js'
import '../../ui/home/homeGallery.js'
import '../../ui/home_sponsor/home_sponsor.js'
import '../../ui/navbar/navbar.js'
import '../../ui/base/base.js'


// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('base', {main: 'home'});
    window.scrollTo(0,0);
    Session.set("nav", false);
  },
});

FlowRouter.route('/sponsor', {
  name: 'home_sponsor',
  action() {
    BlazeLayout.render('base', {main: 'home_sponsor'});
    window.scrollTo(0,0);
    Session.set("nav", false);
  },
});

// Used for testing
FlowRouter.route('/dev', {
  name: 'dev',
  action() {
    BlazeLayout.render('base', {main: 'home'});
  }
})

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('404');
  },
};
*/
