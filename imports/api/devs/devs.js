import { Mongo } from 'meteor/mongo';


export const Devs = new Mongo.Collection("devs");

Devs.allow({
  insert: function(){
    return true ;
  },
  update: function(){
    return true ;
  },
});

Devs.attachSchema(new SimpleSchema({
  user: {
    type: String,
    autoValue: function(){ return Meteor.userId(); },
    autoform: {
        type: "hidden",
        label: false
    },
    unique: true,
  },
  name: {
    type: String,
    label: "Name",
  },

}));