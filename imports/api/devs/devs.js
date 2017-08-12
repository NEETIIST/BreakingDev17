import { Mongo } from 'meteor/mongo';

export const Devs = new Mongo.Collection("devs");

Devs.allow({
  insert: function(){
    //You should only be able to insert devs once
    return true ;
  },
  update: function(){
    //You should only be able to update your own documents
    //and only editable fields
    return true ;
  },
});


Schema = new SimpleSchema({
  user: {
    type: String,
    autoValue: function(){ return undefined },
    autoform: {
        type: "hidden",
        label: false
    },
    //unique: true,
    optional: true,
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
  payment: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
  volunteer: {
    type: Boolean,
    autoform: {
        type: "hidden",
        label: false
    },
    optional: true,
  },
  picture: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        uploadTemplate: 'uploadForm',
        //previewTemplate: 'uploadedFiles', // <- Optional
      },
    }
  }
});

Schema.i18n("schemas.devs");
Devs.attachSchema(Schema);
