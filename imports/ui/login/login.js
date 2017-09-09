import './login.html';

Template.atForm.onRendered(function() {
	form = document.getElementById("at-pwd-form");
	form.setAttribute( "autocomplete", "off" );
  let s = FlowRouter.getParam('s');
  if ( s == "sponsors" )
    Session.set('isSponsor',true);
  else
    Session.set('isSponsor',false);
});

Template.resetpassword.onRendered(function() {
	if (AccountsTemplates.paramToken) {
  		Session.set('resetPassword', AccountsTemplates.paramToken);
	}
});

var isValidPassword = function(password, passwordConfirm) {
   if (password === passwordConfirm) {
    //console.log('passwordVar.length'+ password.length >= 6 ? true : false);
     return password.length >= 6 ? true : false;
   } else {
      alert("Wrong");
     return false ;
   }
 }

Template.resetpassword.helpers({
 resetPassword: function(){
  return Session.get('resetPassword');
 }
});

Template.resetpassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();
    
    var resetPasswordForm = $(e.currentTarget),
        password = resetPasswordForm.find('#at-field-password').val(),
        passwordConfirm = resetPasswordForm.find('#at-field-password_again').val();

    if ( (password.length != 0 ) && isValidPassword(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('resetPassword'), password, function(err) {
        if (err) {
          alert(err);
        } else {
          alert('Your password has been changed. Welcome back!');
          Session.set('resetPassword', null);
        }
      });
    }
    
    FlowRouter.go("/dash");
  }
});