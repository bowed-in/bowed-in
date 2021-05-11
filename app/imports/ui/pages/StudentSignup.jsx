import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { users } from '../../api/user/users';
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
    const role = 'student';
    // company or student assignment (Clean up). role.update is running in background => memory leak?
    Meteor.call('role.update', {
      role: 'student',
    });
    const { firstName, lastName, image, skill, interest } = data;
    users.collection.insert({ firstName, lastName, image, skill, interest, email, owner, role },
      (error) => { updateError = error; });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      this.setState({ redirectTo: '/' });
      swal('Success', 'Your data has been recorded.', 'success');
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectTo) {
      return <Redirect to={ this.state.redirectTo }/>;
    }
    return (
      <Grid container centered id='studentSignup'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Please tell us more about yourself!</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='studentFirstName' name='firstName' showInlineError={true} placeholder={'Your first name'}/>
                <TextField id='studentLastName' name='lastName' showInlineError={true} placeholder={'Your last name'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField id='studentImage' name='image' showInlineError={true} placeholder={'URL goes here'}/>
              </Form.Group>
              <TextField id='studentInterest' name='interest' showInlineError={true} placeholder={'Interest 1, Interest 2, Interest 3, ...'}/>
              <TextField id='studentSkill' name='skill' showInlineError={true} placeholder={'Skill 1, Skill 2, Skill 3, ...'}/>
              <SubmitField id='studentSubmit' value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default (StudentSignup);
