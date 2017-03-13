// Contact Request Database
// Automatic email sent to breakingdev@neeti.tecnico.ulisboa.pt

import { Mongo } from 'meteor/mongo';

export const Contact = new Mongo.Collection("contact");

Contact.allow({
  insert: function(){
    return true ;
  }
});

Contact.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: "Nome",
  },
  company: {
    type: String,
    label: "Empresa",
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email",
  }

}));