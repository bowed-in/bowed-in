import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Stuffs } from '../../api/stuff/Stuff';
import PositionAdmin from '../components/PositionAdmin';
// import { users } from '../../api/user/users';
import { Positions } from '../../api/position/Position';
// import UserProfileAdmin from '../components/UserProfileAdmin';

class ListPositionAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="position-admin-background">
        <Container id='admin-list-positions'>
          <Header as="h2" textAlign="center" inverted>List Positions (Admin)</Header>
          {this.props.position.map((position) => <PositionAdmin key={position._id} position={position} />)}
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListPositionAdmin.propTypes = {
  position: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Positions.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const position = Positions.collection.find({}).fetch();
  return {
    position,
    ready,
  };
})(ListPositionAdmin);
