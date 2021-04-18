import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.profile.image}
          />
          <Card.Header>{this.props.profile.firstName} {this.props.profile.lastName}</Card.Header>
          <Card.Meta>{this.props.profile.company}</Card.Meta>
          <Card.Meta>{this.props.profile.position}</Card.Meta>
          <Card.Description>
            {this.props.profile.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
