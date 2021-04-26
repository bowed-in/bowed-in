import SimpleSchema from 'simpl-schema';

const StudentFormSchema = new SimpleSchema({
  firstName: { label: 'First Name', type: String },
  lastName: { label: 'Last Name', type: String },
  image: { label: 'Link to your profile picture', type: String, optional: true },
  interest: { label: 'Tell us some of your professional interests', type: String },
  skill: { label: 'Tell us some of your professional interests', type: String },
});

export { StudentFormSchema };
