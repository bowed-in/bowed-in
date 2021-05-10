import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import UserProfile from '../components/UserProfile';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className="profile-background">
        <Container id="view-profile-page">
          <UserProfile profile={this.props.doc}/>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePage.propTypes = {
  ready: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const user = Meteor.user() ? Meteor.user().username : '';
  const doc = users.collection.findOne({ owner: user });
  return {
    ready,
    doc,
  };
})(ProfilePage);
