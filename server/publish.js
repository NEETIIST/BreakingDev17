// In both these user methods, only the usernames are being published.
// The data published should be handled with care as not to publish sensitive info to unauthorized users
// The logged in user data is auto-published



Meteor.publish("allUsers", function () {
    return Meteor.users.find({}, {fields: {'username': 1}});
});
Meteor.publish("singleUserVisitor", function (id) {
    return Meteor.users.find({'username':id}, {fields: {'username': 1}});
});
Meteor.publish("singleUserAllData", function (id) {
    return Meteor.users.find({'username':id});
});

//Sponsor Use
Meteor.publish("users.sponsor", function () {
    if (Roles.userIsInRole( this.userId, 'sponsor'))
		return Meteor.users.find({},{fields:{"username":1,"emails":1}});
	else
		return 0 ;
});

//Admin User
Meteor.publish("users.all", function () {
    if (Roles.userIsInRole( this.userId, 'admin'))
		return Meteor.users.find();
	else
		return 0 ;
});