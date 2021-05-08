import SimpleSchema from 'simpl-schema';

const PositionFormSchema = new SimpleSchema({
  name: { label: 'What is the name of your company?', type: String },
  hire: { label: 'How many positions are available?', type: String },
  skills: { label: 'What are the skills required?', type: String },
  place: { label: 'What is the name of your company?', type: String },
  image: { label: 'Link to your profile picture', type: String, optional: true },
  lowerSalary: { label: 'What is the lower bound salary of the job?', type: Number },
  higherSalary: { label: 'What is the upper bound salary of the job?', type: Number },
  description: { label: 'Where duties are required for the job?', type: String },
  jobType: { label: 'Is the Job an Internship, Permanent, or Both?', type: String, allowedValues: ['internship', 'permanent', 'internship and/or permanent'], defaultValue: 'internship and/or permanent' },

});

export { PositionFormSchema };
