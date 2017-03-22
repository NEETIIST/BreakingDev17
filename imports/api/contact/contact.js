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
    label: "Name", 
    i18nLabel: 'home_sponsor_name',
  },
  company: {
    type: String,
    label: "Company",
    i18nLabel: 'home_sponsor_company',
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    label: "Email",
    i18nLabel: 'home_sponsor_email',
  }

}));