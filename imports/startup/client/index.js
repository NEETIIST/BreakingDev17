// Import client startup through a single index entry point

import { FlowRouter } from 'meteor/kadira:flow-router';
import './routes.js';

AutoForm.addHooks(['contactForm'],{
    onSuccess: function(formType, result) {
        alert("A sua mensagem foi enviada, espere ouvir de nós muito em breve.");
        FlowRouter.go("/");
    }
});