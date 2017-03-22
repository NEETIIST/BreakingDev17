// Import client startup through a single index entry point

import { FlowRouter } from 'meteor/kadira:flow-router';
import './routes.js';

AutoForm.addHooks(['contactForm'],{
    onSuccess: function(formType, result) {
        alert("A sua mensagem foi enviada, espere ouvir de nós muito em breve.");
        FlowRouter.go("/");
    }
});

getUserLanguage = function () {
  return "pt";
};

Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });