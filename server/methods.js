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
      text: "A empresa " + doc.company + " quer mais informação sobre os pacotes de patrocínio do BreakingDev. \n O contacto foi feito pelo/a Sr(a) " + doc.name + ", com o email: " + doc.email ,
    });
  }
  
});