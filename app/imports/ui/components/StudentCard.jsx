import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddMessage from './AddMessage';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class StudentCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.student.image} />
        <Card.Content textAlign='center'>
          <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
          <Card.Meta>Student</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <b>Skill(s): </b> {this.props.student.skill}
        </Card.Content>
        <Card.Content extra>
          <b>Interest(s): </b> {this.props.student.interest}
        </Card.Content>
        <Card.Content extra>
          <AddMessage owner={this.props.student.owner} contactId={this.props.student._id}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StudentCard);
