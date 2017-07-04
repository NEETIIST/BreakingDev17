// Create Admin account that allows other admins creation
import { Accounts } from 'meteor/accounts-base';

if ( Meteor.users.find({"username":"admin"}).count() == 0)
{
	id = Accounts.createUser({
		username: "admin",
		email: "",
		password: Meteor.settings.adminPassword ,
		profile: { name: "Admin" }
	});

	Roles.addUsersToRoles(id, 'admin');
};

