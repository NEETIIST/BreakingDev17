import { Mongo } from 'meteor/mongo';

export const Volunteers = new Mongo.Collection("volunteers");

var whitelist = ["experience", "motivation"];

Volunteers.allow({
    insert: function(){
        return true ;
    },
    update: function(userId, doc, fields, modifier){
        if ( userId && doc.user === userId )
        {
            return true ;            
        }
        if (Roles.userIsInRole( Meteor.user()._id, 'admin'))
            return true;
        return false;
    },
});

Schema = new SimpleSchema({
    motivation: {
        type: String,
        autoform: {
            rows: 2
        },
    },
    experience: {
        type: String,
        autoform: {
            rows: 2
        },
    },
    user: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true,
    },
    status: {
        type: String,
        allowedValues: ['Approved','Pending','Rejected'],
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true,
    }
});

Schema.i18n("schemas.volunteers");
Volunteers.attachSchema(Schema);
