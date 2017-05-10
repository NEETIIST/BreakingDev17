import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { analytics } from "meteor/okgrow:analytics";

// Import needed templates
import '../../ui/home/home.js'
import '../../ui/home/homeGallery.js'
import '../../ui/home_sponsor/home_sponsor.js'
import '../../ui/navbar/navbar.js'
import '../../ui/base/base.js'
import '../../ui/user/user.js'
import '../../ui/login/login.js'
import '../../ui/adminPanel/adminPanel.js'
import '../../ui/dashboard/dashboard.js'
import '../../ui/team/team.js'


// Set up all routes in the app
FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('base', {main: 'home'});
    window.scrollTo(0,0);
    Session.set("nav", false);
    Session.set("tab", "menu_index");
  },
});

FlowRouter.route('/sponsor', {
  name: 'home_sponsor',
  action() {
    analytics.page("Sponsor");
    BlazeLayout.render('base', {main: 'home_sponsor'});
    window.scrollTo(0,0);
    Session.set("nav", false);
    Session.set("tab", "menu_beasponsor");
  },
});

FlowRouter.route('/login',{
  name: 'login',
  action(){
    if (Meteor.userId()!==null)
    {
      console.log("dafuq");
      FlowRouter.redirect('/dash');
    }
    else
    {
      analytics.page("Login");
      window.scrollTo(0,0);
      Session.set("nav", false);
      Session.set("tab", "menu_login");
      BlazeLayout.render('base', {main: 'login'});
    }
  },
});

FlowRouter.route('/u/:username',{
  name: 'userProfile',
  action() {
    BlazeLayout.render('base', {main: 'user'});
  }
});

FlowRouter.route('/admin',{
  name: 'adminPanel',
  action() {
    BlazeLayout.render('adminPanel');
  }
});

FlowRouter.route('/dash',{
  name: 'dashboard',
  action() {
    if (Meteor.userId()===null)
    {
      FlowRouter.go('/login');
    }
    else
    {
      analytics.page("Dashboard");
      window.scrollTo(0,0);
      Session.set("nav", false);
      Session.set("tab", "menu_login");
      BlazeLayout.render('base', {main: 'dashboard'});
    }
  }
});

FlowRouter.route('/t/:teamname',{
  name: 'teamProfile',
  action() {
    BlazeLayout.render('base', {main: 'team'});
  }
});

// Used for testing
FlowRouter.route('/dev', {
  name: 'dev',
  action() {
    BlazeLayout.render('base', {main: 'signup'});
  }
});

/*
FlowRouter.notFound = {
  action() {
    BlazeLayout.render('404');
  },
};
*/
