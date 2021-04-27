import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { Roles } from 'meteor/alanning:roles';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import { StudentFormSchema } from '../forms/StudentFormSchema';
import { CompanyFormSchema } from '../forms/CompanyFormSchema';
import { users } from '../../api/user/users';

const studentBridge = new SimpleSchema2Bridge(StudentFormSchema);
const companyBridge = new SimpleSchema2Bridge(CompanyFormSchema);

/** Renders the Page for editing a document. */
class EditUser extends React.Component {
  constructor(props) {
    super(props);
    /* NOTE: change this.state = { email, choice: ' ', ... } Double check the dropdown field settings */
    this.state = { redirectTo: undefined };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  studentSubmit(data) {
    let updateError;
    const studentId = this.props.doc._id;
    console.log(studentId);
    const { firstName, lastName, image, skill, interest } = data;
    users.collection.update(studentId, { $set: { firstName, lastName, image, skill, interest } }, (error) => { updateError = error; });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      this.setState({ redirectTo: '/profile' });
      swal('Success', 'Your information has been updated.', 'success');
    }
  }

  companySumbit(data) {
    let updateError;
    const companyId = this.props.doc._id;
    const { company, image, location, interest } = data;
    users.collection.update(companyId, { $set: { company, image, location, interest } }, (error) => { updateError = error; });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      this.setState({ redirectTo: '/profile' });
      swal('Success', 'Your information has been updated.', 'success');
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    if (this.props.isStudent) {
      return (this.props.ready) ? this.renderStudentPage() : <Loader active>Getting data</Loader>;
    }
    return (this.props.ready) ? this.renderCompanyPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderStudentPage() {
    if (this.state.redirectTo) {
      return <Redirect to={ this.state.redirectTo }/>;
    }
    // Build the model object that Uniforms will use to fill in the form.
    const model = _.extend({}, this.props.doc);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Your Information</Header>
          <AutoForm schema={studentBridge} onSubmit={data => this.studentSubmit(data)} model={model}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='firstName' showInlineError={true} placeholder={'Your first name'}/>
                <TextField name='lastName' showInlineError={true} placeholder={'Your last name'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='image' showInlineError={true} placeholder={'URL goes here'}/>
              </Form.Group>
              <TextField name='interest' showInlineError={true} placeholder={'Interest 1, Interest 2, Interest 3, ...'}/>
              <TextField name='skill' showInlineError={true} placeholder={'Skill 1, Skill 2, Skill 3, ...'}/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }

  renderCompanyPage() {
    if (this.state.redirectTo) {
      return <Redirect to={ this.state.redirectTo }/>;
    }
    // Build the model object that Uniforms will use to fill in the form.
    const model = _.extend({}, this.props.doc);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Your Information</Header>
          <AutoForm schema={companyBridge} onSubmit={data => this.companySubmit(data)} model={model}>
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='company' showInlineError={true} placeholder={'Your first name'}/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <TextField name='image' showInlineError={true} placeholder={'URL goes here'}/>
              </Form.Group>
              <TextField name='location' showInlineError={true} placeholder={'City...'}/>
              <TextField name='interest' showInlineError={true} placeholder={'Interest 1, Interest 2, Interest 3, ...'}/>
              <SubmitField value='Submit'/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a studentdata and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditUser.propTypes = {
  doc: PropTypes.object,
  isStudent: PropTypes.bool,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the email from the URL field. See imports/ui/layouts/App.jsx for the route containing :email.
  const documentId = match.params._id;
  // console.log(documentId);
  // Request StudentData and Enrollment docs. Won't be locally available until ready() returns true.
  const userSubscription = Meteor.subscribe(users.userPublicationName);
  const doc = users.collection.findOne({ _id: documentId });
  const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
  return {
    doc,
    isStudent,
    ready: userSubscription.ready(),
  };
})(EditUser);
