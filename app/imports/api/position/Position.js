import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The PositionsCollection. It encapsulates state and variable values for position.
 */
class PositionsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'PositionsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      hire: Number,
      owner: String,
      skills: String,
      jobType: {
        type: String,
        allowedValues: ['Internship', 'Permanent', 'Internship & Permanent'],
        defaultValue: 'Internship & Permanent',
      },
      description: String,
      lowerSalary: Number,
      higherSalary: Number,
      image: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the PositionsCollection.
 * @type {PositionsCollection}
 */
export const Positions = new PositionsCollection();
