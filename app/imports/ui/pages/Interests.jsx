import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Interests } from '../../api/interest/Interest';
import { Users } from '../../api/user/User';
import { UsersInterests } from '../../api/UserInterest/UserInterests';

/** Returns the Profiles associated with the passed Interest. */
function getInterestData(name) {
  const profiles = _.pluck(UsersInterests.collection.find({ interest: name }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Users.collection.findOne({ email: profile }).picture);
  // console.log(_.extend({ }, data, { interests }));
  return _.extend({ }, { name, profiles: profilePictures });
}

/** Component for layout out an Interest Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header style={{ marginTop: '0px' }}>{props.interest.name}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.interest.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  interest: PropTypes.object.isRequired,
};

/** Renders the Interests as a set of Cards. */
class InterestsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const interests = _.pluck(Interests.collection.find().fetch(), 'name');
    const interestData = interests.map(interest => getInterestData(interest));
    return (
      <Container id="interests-page">
        <Card.Group>
          {_.map(interestData, (interest, index) => <MakeCard key={index} interest={interest}/>)}
        </Card.Group>
      </Container>
    );
  }
}

InterestsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  const sub2 = Meteor.subscribe(Interests.userPublicationName);
  const sub3 = Meteor.subscribe(UsersInterests.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(InterestsPage);
