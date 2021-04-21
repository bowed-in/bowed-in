import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'role.update'({ role }) {
    new SimpleSchema({
      role: { type: String },
    }).validate({ role });

    const userID = Meteor.userId();
    if (role === 'company') {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles(userID, 'company');
    } else {
      Roles.createRole(role, { unlessExists: true });
      Roles.addUsersToRoles(userID, 'student');
    }
  },
});
