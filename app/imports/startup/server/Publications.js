import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Positions } from '../../api/position/Position';
import { users } from '../../api/user/users';
import { Favorites } from '../../api/favorite/favorites';
import { Messages } from '../../api/message/Messages';
import { HireFavorites } from '../../api/hirefavorite/hirefavorites';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(users.userPublicationName, function () {
  if (this.userId) {
    // const username = Meteor.users.findOne(this.userId).username;
    return users.collection.find();
  }
  return this.ready();
});

Meteor.publish(Favorites.userPublicationName, function () {
  if (this.userId) {
    return Favorites.collection.find({ userID: this.userId });
  }
  return this.ready();
});

Meteor.publish(HireFavorites.userPublicationName, function () {
  if (this.userId) {
    return HireFavorites.collection.find({ userID: this.userId });
  }
  return this.ready();
});

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Positions.userPublicationName, function () {
  if (this.userId) {
    return Positions.collection.find();
  }
  return this.ready();
});

// EDIT THIS PUBLICATION
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Messages.userPublicationName, function () {
  if (this.userId) {
    return Messages.collection.find();
  }
  return this.ready();
});
// Admin-level publication.___________________________________________________________
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(users.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return users.collection.find();
  }
  return this.ready();
});

Meteor.publish(Positions.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Positions.collection.find();
  }
  return this.ready();
});
