import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Events } from '../../api/event/Event.js';

/* eslint-disable no-console */

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

// Initialize the database with a default data document.
function addEvent(data) {
  console.log(`  Adding: ${data.title}`);
  Events.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Events.collection.find().count() === 0) {
  if (Meteor.settings.defaultEvent) {
    console.log('Creating default event.');
    Meteor.settings.defaultEvent.map(data => addEvent(data));
  }
}
