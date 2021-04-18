import { Meteor } from 'meteor/meteor';
import { Positions } from '../../api/position/Position';
import { users } from '../../api/user/users';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.lastName} (${data.owner})`);
  users.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (users.collection.find().count() === 0) {
  if (Meteor.settings.defaultUser) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultUser.map(data => addData(data));
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
