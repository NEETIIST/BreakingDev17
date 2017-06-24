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
      rows: 4
    },
  },
  skills: {
    type: String,
    autoform: {
      rows: 2
    },
  },
  interest: {
    type: String,
    autoform: {
      rows: 2
    },
  },
  github: {
    type: String,
    optional:true,
  },
  twitter: {
    type: String,
    optional:true,
  },
  linkedin: {
    type: String,
    optional:true,
  },
  inTeam: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
  team: {
    type: String,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
});

Schema.i18n("schemas.devs");
Devs.attachSchema(Schema);
