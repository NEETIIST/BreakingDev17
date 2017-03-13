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
      subject: "BreakingDev - " + doc.company,
    });
  }
  
});