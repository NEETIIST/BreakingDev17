import { Meteor } from 'meteor/meteor' ;
import { Accounts } from 'meteor/accounts-base';
import { Devs } from '/imports/api/devs/devs.js';
import { Teams } from '/imports/api/teams/teams.js';

Meteor.methods({

  sendEmail: function (doc) {

    check([doc.name, doc.company, doc.email ], [String]);

    console.log(doc);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: "neeti.isttagus@gmail.com",
      from: doc.email,
      subject: "BreakingDev - Informação sobre Patrocínio",
      text: "A empresa " + doc.company + " quer mais informação sobre os pacotes de patrocínio do BreakingDev. \nO contacto foi feito pelo/a Sr(a) " + doc.name + ", com o email: " + doc.email ,
    });
  },

  team_apply_mail: function (doc) {

    check([doc.message], [String]);

    let t = Teams.findOne({"_id":doc.team});
    let m = Meteor.users.findOne({"_id": t.captain});
    let u = Meteor.users.findOne({"_id": this.userId});
    let d = Devs.findOne({"user":this.userId});
    let link = Meteor.absoluteUrl('t/' + t._id +"/pass/");

    console.log(m.emails[0].address);
    console.log(u.emails[0].address);
    
    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
    this.unblock();

    Email.send({
      to: m.emails[0].address,
      from: u.emails[0].address,
      subject: "BreakingDev - Pedido para juntar à tua equipa",
      text: "Olá " + m.username + ".\nEstás a receber este email por seres capitão da equipa " + t.team_name +".\n\nO "+ d.name +" (@"+u.username+') também quer fazer parte da tua equipa. Ele enviou-te a seguinte mensagem:\n\n"'+doc.message+'"\n\nAgora tu é que sabes se queres ou não aceitar mais um membro para a tua equipa.\nSe quiseres aceitar, basta ires a '+ link +" e seguires as instruções.\nSe não quiseres, agradecemos que respondas a este email a explicar as razões. \n\nSe tiveres alguma dúvida envia-nos um email para breakingdev@neeti.tecnico.ulisboa.pt .",
    });
  },

  makeAdmin: function(id){
    if ( Roles.userIsInRole( this.userId, 'admin') )
    {
      Roles.addUsersToRoles(id, 'admin');
    }
  },

  removeAdmin: function(id){
    if ( Roles.userIsInRole( this.userId, 'admin') )
    {
      Roles.setUserRoles(id, [], '');
    }
  },
  
  upper: function (text) {
    check(text, String);
    //console.log(text);
    return text.toUpperCase();
  },

  forceVerifyEmail: function(id) {
    Meteor.users.update({"_id":id},{$set:{"emails.0.verified":true}});
  }

});


/* CHECK IF WORKING AFTER DEPLOYMENT */
Meteor.users.deny({
  //update() { return true; }
});
