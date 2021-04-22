import React from 'react';
import { Grid, Segment, Header, Form, Loader } from 'semantic-ui-react';
// Must use destructuring import to avoid https://github.com/vazco/uniforms/issues/433
import { AutoForm, TextField, LongTextField, SelectField, SubmitField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Redirect } from 'react-router-dom';
import MultiSelectField from '../forms/controllers/MultiSelectField';
import { StudentFormSchema } from '../forms/StudentFormSchema';
import { StudentCollection } from '../../api/student/students';

const bridge = new SimpleSchema2Bridge(StudentFormSchema);

/** Renders the Page for editing a document. */
class EditStudent extends React.Component {
  constructor(props) {
    super(props);
    /* NOTE: change this.state = { email, choice: ' ', ... } Double check the dropdown field settings */
    this.state = { redirectTo: undefined };
  }

  /** On submit, try to insert the data. If successful, reset the form. */
  submit(data) {
    let updateError;
    const studentId = this.props.doc._id;
    const { firstName, lastName, image, link, bio, major, interests, hobbies, level, gpa } = data;
    StudentCollection.update(studentId, { $set: { firstName, lastName, image, link, bio, major, interests, hobbies, level, gpa } }, (error) => { updateError = error; });
    if (updateError) {
      swal('Error', updateError.message, 'error');
    } else {
      this.setState({ redirectTo: '/profile' });
      swal('Success', 'Your information has been updated.', 'success');
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    if (this.state.redirectTo) {
      return <Redirect to={ this.state.redirectTo }/>;
    }
    // Build the model object that Uniforms will use to fill in the form.
    const model = _.extend({}, this.props.doc);
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Your Information</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={model}>
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
        </Grid.Column>
      </Grid>
    );
  }
}

/** Require a studentdata and enrollment doc.  Uniforms adds 'model' to the props, which we use. */
EditStudent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the email from the URL field. See imports/ui/layouts/App.jsx for the route containing :email.
  const documentId = match.params._id;
  // console.log(documentId);
  // Request StudentData and Enrollment docs. Won't be locally available until ready() returns true.
  const studentSubscription = Meteor.subscribe(StudentCollection.userPublicationName);
  const doc = StudentCollection.findOne({ _id: documentId });
  return {
    doc,
    ready: studentSubscription.ready(),
  };
})(EditStudent);
