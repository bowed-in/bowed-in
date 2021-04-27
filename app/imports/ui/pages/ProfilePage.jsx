import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import { StudentCollection } from '../../api/student/students';
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
      <Container id="view-profile-page">
        {this.props.profile.map((profile) => <UserProfile key={profile._id} profile={profile} />)}
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePage.propTypes = {
  profile: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  studentReady: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  const studentSubscription = Meteor.subscribe(StudentCollection.userPublicationName);
  const studentReady = studentSubscription.ready();
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const profile = users.collection.find({}).fetch();
  const user = Meteor.user() ? Meteor.user().username : '';
  const doc = StudentCollection.findOne({ owner: user });
  return {
    profile,
    ready,
    studentReady,
    doc,
  };
})(ProfilePage);

/*
Meteor.publish(StudentCollection.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return StudentCollection.find({
      owner: username
    });
  }
*/
