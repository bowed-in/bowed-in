import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { Positions } from '../../api/position/Position';
import { users } from '../../api/user/users';

// const formSchema = new SimpleSchema({
//   name: String,
//   hire: Number,
//   skills: String,
//   jobType: {
//     type: String,
//     allowedValues: ['internship', 'permanent', 'internship and/or permanent'],
//     defaultValue: 'internship and/or permanent',
//   },
//   description: String,
//   lowerSalary: Number,
//   higherSalary: Number,
//   place: String,
//   image: String,
// });
//
// const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class Position extends React.Component {
  add = () => {
    const { image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills } = this.props.position;
    const owner = Meteor.user().username;
    users.collection.insert(image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills, owner, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Item added successfully', 'success');
      }
    });
  }

  render() {
    // const font = { color: 'black', fontSize: 20 };
    // let fRef = null;
    return (
      <Card>
        <Card.Content align='left'>
          <Image
            floated='right'
            size='mini'
            src={this.props.position.image}
          />
          <Card.Header>{this.props.position.name}</Card.Header>
          <Card.Meta>{this.props.position.place}</Card.Meta>
          <Card.Description><strong>Description:</strong> {this.props.position.description}</Card.Description>
          <Card.Description> <strong>Job Type: </strong>{this.props.position.jobType}</Card.Description>
          <Card.Description> <strong>Salary Range: </strong>{this.props.position.lowerSalary} - {this.props.position.higherSalary}</Card.Description>
          <Card.Description textAlign="left"><strong>Number of Position(s):</strong> {this.props.position.hire}</Card.Description>
          <Card.Description> <strong>Skill(s): </strong> {this.props.position.skills}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button onClick={this.add} basic color='orange'>
                  Add
            </Button>
            <Button basic color='teal'>
              Message
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
Position.propTypes = {
  position: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Position);
