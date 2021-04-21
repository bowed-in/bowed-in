import SimpleSchema from 'simpl-schema';
import { StudentArray } from '../../api/student/students';

const StudentFormSchema = new SimpleSchema({
  firstName: { label: 'First Name', type: String },
  lastName: { label: 'Last Name', type: String },
  image: { label: 'Link to your profile picture', type: String },
  link: { label: 'Link to your professional portfolio', type: String },
  bio: { label: 'What extra things would you like employers to know about you?', type: String, optional: true, defaultValue: '' },
  major: { label: 'What is/are your major(s)?', type: Array },
  'major.$': { type: String, allowedValues: StudentArray.majors },
  interests: { label: 'What are some of your career interests?', type: Array, optional: true },
  'interests.$': { type: String, allowedValues: StudentArray.interests },
  hobbies: { label: 'What are some of your hobbies?', type: Array, optional: true },
  'hobbies.$': { type: String, allowedValues: StudentArray.hobbies },
  level: { label: 'What year of school are you in?', type: String, allowedValues: StudentArray.levels, defaultValue: StudentArray.levels[0] },
  gpa: { label: 'What is your GPA?', type: Number },
});

export { StudentFormSchema };
