import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
//import { analytics } from "meteor/okgrow:analytics";

// Import needed templates
import '../../ui/404/404.js'
import '../../ui/2k16/2k16.js'
import '../../ui/home/home.js'
import '../../ui/home/homeGallery.js'
import '../../ui/home_sponsor/home_sponsor.js'
import '../../ui/navbar/navbar.js'
import '../../ui/base/base.js'
import '../../ui/user/user.js'
import '../../ui/user_profile/user_profile.js'
import '../../ui/user_profile_add/user_profile_add.js'
import '../../ui/user_profile_edit/user_profile_edit.js'
import '../../ui/user_profile_upload/user_profile_upload.js'
import '../../ui/payment/payment.js'
import '../../ui/login/login.js'
import '../../ui/adminPanel/adminPanel.js'
import '../../ui/dashboard/dashboard.js'
import '../../ui/team/team.js'
import '../../ui/team_add/team_add.js'
import '../../ui/team_pass/team_pass.js'
import '../../ui/team_join/team_join.js'
import '../../ui/team_edit/team_edit.js'
import '../../ui/team_find/team_find.js'
import '../../ui/team_apply/team_apply.js'
import '../../ui/volunteer_add/volunteer_add.js'
import '../../ui/volunteer_edit/volunteer_edit.js'
import '../../ui/volunteer_shifts/volunteer_shifts.js'
import '../../ui/volunteer_info/volunteer_info.js'
import '../../ui/sponsor_access/sponsor_access.js'
import '../../ui/sponsor_dashboard/sponsor_dashboard.js'
import '../../ui/sponsor/sponsor.js'
import '../../ui/code_reader/code_reader.js'
import '../../ui/shop/shop.js'
import '../../ui/qr/qr.js'


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
    BlazeLayout.render('base', {main: 'home_sponsor'});
    window.scrollTo(0,0);
    Session.set("nav", false);
    Session.set("tab", "menu_beasponsor");
  },
});

FlowRouter.route( '/verify-email/:token', {
    name: 'verify-email',
    action( params ) {
        Accounts.verifyEmail( params.token, ( error ) =>{
            if ( error ) {
              alert( error.reason, 'danger' );
            } else {
              alert( 'Email verified! Thanks!', 'success' );
              FlowRouter.go( '/login' );
            }
        });
    }
});

FlowRouter.route( '/reset-password/:token', {
    name: 'reset-password',
    action( params ) {
      AccountsTemplates.paramToken = params.token ;
      BlazeLayout.render('base', {main: 'resetpassword'});
    }
});

FlowRouter.route('/login',{
  name: 'login',
  action(){
    if (Meteor.userId()!==null)
    {
      FlowRouter.redirect('/dash');
    }
    else
    {
      window.scrollTo(0,0);
      Session.set("nav", false);
      Session.set("tab", "menu_login");
      BlazeLayout.render('base', {main: 'login'});
    }
  },
});

FlowRouter.route('/login/:s',{
  name: 'login',
  action(){
    if (Meteor.userId()!==null)
    {
      FlowRouter.redirect('/dash');
    }
    else
    {
      window.scrollTo(0,0);
      Session.set("nav", false);
      Session.set("tab", "menu_login");
      BlazeLayout.render('base', {main: 'login'});
    }
  },
});

FlowRouter.route('/logout',{
  name: 'logout',
  action(){
    Session.set("dash_last","dash_null");
    AccountsTemplates.logout();
    FlowRouter.redirect('/login');
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
    BlazeLayout.render('base', {main:'adminPanel'});
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
      window.scrollTo(0,0);
      Session.set("nav", false);
      Session.set("tab", "menu_login");
      let last = Session.get('dash_last');
      if ( last == undefined )
      {
        Session.set('dash_last','dash_null');
        BlazeLayout.render('base', {main:"dashboard",dash_small:'dash_null'});
      }
      else
      { 
        BlazeLayout.render('base', {main:"dashboard",dash_small:last}); 
      }
    }
  }
});

FlowRouter.route('/u_/edit',{
  name: 'userProfile_edit',
  action() {
    //FlowRouter.reload();    //Reload Bug
    //location.reload();
    BlazeLayout.render('base', {main: 'user_profile_edit'});
  }
});

FlowRouter.route('/u_/add',{
  name: 'userProfile_add',
  action() {
    //FlowRouter.reload();    //Reload Bug
    //location.reload();
    BlazeLayout.render('base', {main: 'user_profile_add'});
  }
});

FlowRouter.route('/payment',{
  name: 'payment',
  action() {
    BlazeLayout.render('base', {main: 'payment'});
  }
});

FlowRouter.route('/u_/upload',{
  name: 'userProfile_upload',
  action() {
    //FlowRouter.reload();    //Reload Bug
    //location.reload();
    BlazeLayout.render('base', {main: 'user_profile_upload'});
  }
});

FlowRouter.route('/t/:teamname',{
  name: 'teamProfile',
  action() {
    BlazeLayout.render('base', {main: 'team'});
  }
});

FlowRouter.route('/t/:teamname/edit',{
  name: 'teamProfile',
  action() {
    BlazeLayout.render('base', {main: 'team_edit'});
  }
});

FlowRouter.route('/t/:teamname/apply',{
  name: 'team_apply',
  action() {
    BlazeLayout.render('base', {main: 'team_apply'});
  }
});

FlowRouter.route('/t_/add',{
  name: 'teamProfile_add',
  action() {
    BlazeLayout.render('base', {main: 'team_add'});
  }
});

FlowRouter.route('/t_/find',{
  name: 'teamProfile_add',
  action() {
    BlazeLayout.render('base', {main: 'team_find'});
  }
});

/*FlowRouter.route('/t/:us/edit',{
  name: 'teamProfile_edit',
  action() {
    BlazeLayout.render('base', {main: 'team_edit'});
  }
}); */

FlowRouter.route('/t/:teamname/pass',{
  name: 'team_pass',
  action() {
    BlazeLayout.render('base', {main: 'team_pass'});
  }
});

FlowRouter.route('/t/:teamname/join',{
  name: 'team_join',
  action() {
    BlazeLayout.render('base', {main: 'team_join'});
  }
});

FlowRouter.route('/t/:teamname/join/:pin',{
  name: 'team_join_pin',
  action() {
    BlazeLayout.render('base', {main: 'team_join'});
  }
});

FlowRouter.route('/volunteer/add',{
  name: 'volunteer_add',
  action() {
    BlazeLayout.render('base', {main: 'volunteer_add'});
  }
});

FlowRouter.route('/volunteer/edit',{
  name: 'volunteer_edit',
  action() {
    BlazeLayout.render('base', {main: 'volunteer_edit'});
  }
});

FlowRouter.route('/volunteer/shifts',{
  name: 'volunteer_shifts',
  action() {
    BlazeLayout.render('base', {main: 'volunteer_shifts'});
  }
});

FlowRouter.route('/volunteer/faq',{
  name: 'volunteer_info',
  action() {
    BlazeLayout.render('base', {main: 'volunteer_info'});
  }
});

//Sponsors
FlowRouter.route('/sponsors/',{
  name: 'sponsor_access',
  action() {
    BlazeLayout.render('base', {main: 'sponsor_access'});
  }
});

FlowRouter.route('/sponsors/dash',{
  name: 'sponsor_dashboard',
  action() {
    BlazeLayout.render('base', {main: 'sponsor_dashboard'});
  }
});

FlowRouter.route('/s/:shortname/',{
  name: 'sponsor_page',
  action() {
    BlazeLayout.render('base', {main: 'sponsor'});
  }
});

//Codes
FlowRouter.route('/reader',{
  name: 'code_reader',
  action() {
    BlazeLayout.render('base', {main: 'code_reader'});
  }
});

FlowRouter.route('/shop', {
  name: 'shop',
  action() {
    BlazeLayout.render('base', {main: 'shop'});
  }
});

FlowRouter.route('/2016', {
  name: '2k16',
  action() {
    BlazeLayout.render('base', {main: '2k16'});
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('base', {main:"404"});
  },
};

FlowRouter.route('/qr/aefsdvxwagrszvf', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr1'});
  }
});

FlowRouter.route('/qr/egaroijger', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr2'});
  }
});

FlowRouter.route('/qr/fwsvjoiwasgoizjf', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr3'});
  }
});

FlowRouter.route('/qr/gdfwgrszvfxc', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr4'});
  }
});

FlowRouter.route('/qr/qrefasdzvxgsrzfd', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr5'});
  }
});

FlowRouter.route('/qr/wgeszfesgdf', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr6'});
  }
});

FlowRouter.route('/qr/wgrszvfgszvd', {
  name: 'qr',
  action() {
    BlazeLayout.render('base', {main: 'qr7'});
  }
});