import { Mongo } from 'meteor/mongo';

export const Sponsors = new Mongo.Collection("sponsors");

Sponsors.allow({
    insert: function(){
        if (Roles.userIsInRole( Meteor.user()._id, 'admin'))
            return true;
    },
    update: function(){
        return true ;
    },
    remove: function(){
        if (Roles.userIsInRole( Meteor.user()._id, 'admin'))
            return true;
    },
});

Schema = new SimpleSchema({
	name: {
        type: String,
    },
    short: {
        type: String,
        unique: true,
    },
    work: {
        type: String,
        autoform: {
            rows: 2
        },
        optional: true,
    },
    search: {
        type: String,
        autoform: {
            rows: 2
        },
        optional: true,
    },
    category: {
        type: String,
        optional: true,
    },
    members: {
        type: [String],
        maxCount: 4,
        autoform: {
            label: false,
            type: "hidden"
        },
        optional: true,
    },
    codes: {
        type: [String],
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true,
    },
    usedCodes: {
        type: [String],
        autoform: {
            type: "hidden",
            label: false
        },
        optional: true,
    },
});

Schema.i18n("schemas.sponsors");
Sponsors.attachSchema(Schema);
