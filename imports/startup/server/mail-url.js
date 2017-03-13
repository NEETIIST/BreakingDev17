var mgpass = Meteor.settings.mailGunPass ;

process.env.MAIL_URL = "smtp://postmaster%40mg.breakingdev.pt:"+mgpass+"@smtp.mailgun.org:587";