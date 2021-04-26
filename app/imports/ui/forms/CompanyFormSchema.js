import SimpleSchema from 'simpl-schema';

const CompanyFormSchema = new SimpleSchema({
  company: { label: 'What is the name of your company?', type: String },
  image: { label: 'Link to your profile picture', type: String, optional: true },
  location: { label: 'Where is your company located?', type: String },
  interest: { label: 'What are some technical abilities of applicants are you interested in?', type: String },
});

export { CompanyFormSchema };
