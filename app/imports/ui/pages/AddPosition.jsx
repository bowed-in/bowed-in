import React from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
import { AutoForm, ErrorsField, LongTextField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Positions } from '../../api/position/Position';
import MultiSelectField from '../forms/controllers/MultiSelectField';

const bridge = new SimpleSchema2Bridge(Positions.schema);

/** Renders the Page for adding a document. */
class AddStuff extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, hire, skills, jobType, description, lowerSalary, higherSalary, image } = data;
    const owner = Meteor.user().username;
    Positions.collection.insert({ name, hire, skills, jobType, description, lowerSalary, higherSalary, image, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'New Position added successfully', 'success');
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
          <Header as="h2" textAlign="center">Add New Position</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <Form.Group widths={'equal'}>
                <TextField name='name' label='Name of the Position' placeholder='Insert Name of the Position'/>
                <NumField name='hire' decimal={false} label='Number of Positions Available' placeholder='Insert Number'/>
                <TextField name='image' label='Image' placeholder='Insert Link'/>
              </Form.Group>
              <Form.Group widths={'equal'}>
                <SelectField name='jobType' label='Type of Job'/>
                <NumField name='lowerSalary' decimal={false} label='Lower Salary Range' placeholder='Insert Lower Range of Salary'/>
                <NumField name='higherSalary' decimal={false} label='Higher Salary Range' placeholder='Insert Upper Range of Salary'/>
              </Form.Group>
              <LongTextField name='description' label='Description of the Position' placeholder='Description of the Position'/>
              <MultiSelectField name='skills' showInlineError={true} placeholder='Skills'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddStuff;
