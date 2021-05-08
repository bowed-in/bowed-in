import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { PositionFormSchema } from '../forms/PositionFormSchema';
import { Positions } from '../../api/position/Position';
import RadioField from '../forms/controllers/RadioField';

const bridge = new SimpleSchema2Bridge(PositionFormSchema);

/** Renders the Page for adding a document. */
class AddPosition extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, hire, skills, place, image, lowerSalary, higherSalary, description, jobType } = data;
    const owner = Meteor.user().username;
    Positions.collection.insert({ name, hire, skills, place, image, lowerSalary, higherSalary, description, jobType, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Position added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Post a New Position Opportunity</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField id='positionId' name='name'/>
              <TextField id='positionDescription' name='description'/>
              <TextField id='positionImage' name='image'/>
              <TextField id='positionPlace' name='place'/>
              <TextField id='positionSkills' name='skills'/>
              <NumField id='positionHire' name='hire' decimal={false}/>
              <NumField id='positionLowerSalary' name='lowerSalary' decimal={false}/>
              <NumField id='positionHigherSalary' name='higherSalary' decimal={false}/>
              <RadioField id='positionJobType' name='jobType'/>
              <SubmitField id='positionSubmit' value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddPosition;
