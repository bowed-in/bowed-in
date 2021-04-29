import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
// import MultiSelectField from '../forms/controllers/MultiSelectField';
// import { StudentFormSchema as formSchema, gpa2String, gpa2Number } from '../forms/StudentFormInfo';
import { users } from '../../api/user/users';
import { CompanyFormSchema } from '../forms/CompanyFormSchema';

const bridge = new SimpleSchema2Bridge(CompanyFormSchema);

/** Renders the Page for editing a document. */
class CompanySignup extends React.Component {
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
    const role = 'company';
    Meteor.call('role.update', {
      role: 'company',
    });
    const { company, image, location, interest } = data;
    users.collection.insert({ company, image, location, interest, email, owner, role },
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
      // {this.state.redirectTo} is initially set to undefined in the constructor. This stores the redirect path in the Accounts.createUser function.
      // return <Redirect to={this.state.redirectTo}/>;
      return <Redirect to={ this.state.redirectTo }/>;
    }
    return (
      <Grid container centered id='companySignup'>
        <Grid.Column>
          <Header as="h2" textAlign="center">Please tell us more about your company!</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField id='companyName' name='company' showInlineError={true} placeholder={'Your first name'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField id='companyImage' name='image' showInlineError={true} placeholder={'URL goes here'}/>
              </Form.Group>
              <TextField id='companyLocation' name='location' showInlineError={true} placeholder={'City...'}/>
              <TextField id='companyInterest' name='interest' showInlineError={true} placeholder={'Interest 1, Interest 2, Interest 3, ...'}/>
              <SubmitField id='companySubmit' value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default (CompanySignup);
