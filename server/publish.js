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