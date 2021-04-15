import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Positions } from '../../api/position/Position.js';
import { Users } from '../../api/user/User';

/* eslint-disable no-console */

// Initialize the database with a default users.
function addUser(data) {
  console.log(`  Adding: ${data.name}`);
  Users.collection.insert(data);
}

// Initialize the UsersCollection if empty.
if (Users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating default user.');
    Meteor.settings.defaultUser.map(data => addUser(data));
  }
}

// Initialize the database with a default positions.
function addPosition(data) {
  console.log(`  Adding: ${data.name}`);
  Positions.collection.insert(data);
}

// Initialize the PositionsCollection if empty.
if (Positions.collection.find().count() === 0) {
  if (Meteor.settings.defaultPosition) {
    console.log('Creating default position.');
    Meteor.settings.defaultPosition.map(data => addPosition(data));
  }
}

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
