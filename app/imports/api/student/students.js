import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const StudentCollection = new Mongo.Collection('StudentCollection');

const StudentArray = {
  hobbies: ['Surfing', 'Running', 'Biking', 'Paddling'],
  levels: ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Fifth year and above'],
  majors: ['Physics', 'Math', 'Chemistry', 'Computer Science', 'Non-STEM'],
  interests: ['Software Engineering', 'Game Design', 'Web Development', 'Data Science', 'Artificial Intelligence', 'Computer Graphics', 'Visualization', 'System Analytics', 'Algorithms', 'C/C++/C#', 'JavaScript', 'Java', 'HTML/CSS'],
};

/** Define a schema to specify the structure of each document in the collection. */
const StudentSchema = new SimpleSchema({
  firstName: String,
  lastName: String,
  email: String,
  image: String,
  owner: String,
  link: String,
  bio: { type: String, optional: true, defaultValue: '' },
  major: { type: Array, optional: true },
  'major.$': { type: String, allowedValues: StudentArray.majors },
  interests: { type: Array, optional: true },
  'interests.$': { type: String, allowedValues: StudentArray.interests },
  hobbies: { type: Array, optional: true },
  'hobbies.$': { type: String, allowedValues: StudentArray.hobbies },
  level: { type: String, allowedValues: StudentArray.levels },
  gpa: Number,
}, { tracker: Tracker });

/** Attach the schema to the collection. */
StudentCollection.attachSchema(StudentSchema);

/** Make these objects available to others. */
export { StudentArray, StudentCollection, StudentSchema };
