import { Meteor } from 'meteor/meteor';
import { MailGunPass } from './keys.js';

var mgpass = MailGunPass ;

process.env.MAIL_URL = "smtp://postmaster%40mg.breakingdev.pt:"+mgpass+"@smtp.mailgun.org:587";