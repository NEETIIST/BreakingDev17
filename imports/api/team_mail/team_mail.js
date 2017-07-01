// Automatic email sent to the team captain with the aplying user info.

import { Mongo } from 'meteor/mongo';

export const Team_Mail = new Mongo.Collection("team_mail");

Team_Mail.allow({
    insert: function(){
        return true ;
    }
});

Team_Mail.attachSchema(new SimpleSchema({
    message: {
        type: String,
        label: "Mensagem",
        i18nLabel: 'mt_message',
        autoform: {
            rows:3
        },
    },
    team: {
        type: String,
        autoform: {
            type: "hidden",
            label: false
        },
    },

}));