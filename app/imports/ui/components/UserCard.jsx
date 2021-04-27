import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.currentUser.image} />
        <Card.Content textAlign='center'>
          <Card.Header>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Card.Header>
          <Card.Meta>Student at University of Hawaii at Manoa</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <b>Interests: </b> {this.props.currentUser.interest}
        </Card.Content>
        <Card.Content extra>
          <b>Skills: </b> {this.props.currentUser.skill}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserCard);
