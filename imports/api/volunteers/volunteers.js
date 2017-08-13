import { Mongo } from 'meteor/mongo';

export const Volunteers = new Mongo.Collection("volunteers");

var whitelist = ["experience", "motivation"];

Volunteers.allow({
    insert: function(){
        //console.log(this);
        //console.log(Volunteers.find({"user":this.userId}).count());
        return true ;
    },
    update: function(userId, doc, fields, modifier){
        // Pending Underscore Package
        /*
        if ( userId && doc.user === userId _.difference(fields, whitelist).length === 0)
        {
            return true ;            
        }
        */
        return true;
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
        autoValue: function(){ return Meteor.userId() },
        autoform: {
            type: "hidden",
            label: false
        },
        //unique: true,
        //optional: true,
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
