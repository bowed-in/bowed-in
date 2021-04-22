import React from 'react';
import { Grid, Segment, Header, Form, Message } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import MultiSelectField from '../forms/controllers/MultiSelectField';
// import { StudentFormSchema as formSchema, gpa2String, gpa2Number } from '../forms/StudentFormInfo';
import { StudentCollection } from '../../api/student/students';
import { StudentFormSchema } from '../forms/StudentFormSchema';

const bridge = new SimpleSchema2Bridge(StudentFormSchema);

/** Renders the Page for editing a document. */
class StudentSignup extends React.Component {
  constructor(props) {
    super(props);
    /* NOTE: change this.state = { email, choice: ' ', ... } Double check the dropdown field settings */
    this.state = { redirectTo: undefined };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let updateError;
    const email = Meteor.user().username;
    const owner = Meteor.user().username;
    // company or student assignment (Clean up)

    Meteor.call('role.update', {
      role: 'student',
    });
    const { firstName, lastName, image, link, bio, major, interests, hobbies, level, gpa } = data;
    StudentCollection.insert({ firstName, lastName, email, image, owner, link, bio, major, interests, hobbies, level, gpa },
      (error) => { updateError = error; });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      this.setState({ redirectTo: '/profile' });
      swal('Success', 'Your data has been recorded.', 'success');
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectTo) {
      // {this.state.redirectTo} is initially set to undefined in the constructor. This stores the redirect path in the Accounts.createUser function.
      // return <Redirect to={this.state.redirectTo}/>;
      return <Redirect to={ this.state.redirectTo }/>;
    }
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Tell Us About Yourself!</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='firstName' showInlineError={true} placeholder={'Your first name'}/>
                <TextField name='lastName' showInlineError={true} placeholder={'Your last name'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='image' showInlineError={true} placeholder={'URL goes here'}/>
                <TextField name='link' showInlineError={true} placeholder={'Link goes here'}/>
              </Form.Group>
              <LongTextField name='bio' showInlineError={true} placeholder={'Text goes here'}/>
              <MultiSelectField name='major' showInlineError={true} placeholder={'Select your major(s)'}/>
              <MultiSelectField name='interests' showInlineError={true} placeholder={'Select your interests'}/>
              <MultiSelectField name='hobbies' showInlineError={true} placeholder={'Select your hobbies'}/>
              <Form.Group widths={'equal'}>
                <SelectField name='level' showInlineError={true} placeholder={'Select one'} />
                <TextField name='gpa' showInlineError={true} placeholder={'GPA goes here'}/>
              </Form.Group>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
          {this.state.email ? <Message>Edit <a href={`/#/student/${this.state.email}`}>this data</a></Message> : ''}
        </Grid.Column>
      </Grid>
    );
  }
}

export default (StudentSignup);
