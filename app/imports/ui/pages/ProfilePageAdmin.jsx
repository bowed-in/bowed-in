import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import UserProfileAdmin from '../components/UserProfileAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePageAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        {this.props.profile.map((profile) => <UserProfileAdmin key={profile._id} profile={profile} />)}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePageAdmin.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profile = users.collection.find({}).fetch();
  return {
    profile,
    ready,
  };
})(ProfilePageAdmin);
