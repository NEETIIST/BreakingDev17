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

Schema = new SimpleSchema({
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
  },
  age: {
    type: SimpleSchema.Integer,
  },
  college: {
    type: String,
  },
  course: {
    type: String,
  },
  bio: {
    type: String,
    autoform: {
      rows: 5
    },
  },
});

Devs.attachSchema(Schema);
Schema.i18n("schemas.devs");
