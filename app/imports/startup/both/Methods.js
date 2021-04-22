import { Meteor } from 'meteor/meteor';
import { StudentCollection } from '../../api/student/students';
import { StudentsPositions } from '../../api/student/StudentsPositions';

const updateProfileMethod = 'StudentCollection.update';

Meteor.methods({
  'StudentCollection.update'({ email, firstName, lastName, bio, title, picture, positions }) {
    StudentCollection.collection.update({ email }, { $set: { email, firstName, lastName, bio, title, picture } });
    StudentsPositions.collection.remove({ profile: email });
    positions.map((position) => StudentsPositions.collection.insert({ profile: email, position }));
  },
});

export { updateProfileMethod };
