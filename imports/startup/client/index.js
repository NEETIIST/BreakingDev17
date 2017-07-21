// Import client startup through a single index entry point

import { FlowRouter } from 'meteor/kadira:flow-router';
import './routes.js';

AutoForm.addHooks(['contactForm'],{
    onSuccess: function(formType, result) {
        alert("A sua mensagem foi enviada, espere ouvir de nós muito em breve.");
        FlowRouter.go("/");
    }
});

AutoForm.addHooks(['teamApplyForm'],{
    onSuccess: function(formType, result) {
        alert("A tua mensagem foi enviada, agora tens de esperar que o capitão da equipa te responda.");
        FlowRouter.go("/dash");
    }
}); 

getUserLanguage = function () {
    return "pt";
    };
getUserLanguageT9n = function () {
    return "pt-PT";
    };

Session.set("showLoadingIndicator", true);

TAPi18n.setLanguage(getUserLanguage())
  .done(function () {
    Session.set("showLoadingIndicator", false);
  })
  .fail(function (error_message) {
    // Handle the situation
    console.log(error_message);
  });

T9n.setLanguage(getUserLanguageT9n());

SimpleSchema.debug = true;