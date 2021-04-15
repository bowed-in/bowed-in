import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/user/User';
import { UsersPositions } from '../../api/UserPosition/UserPositions';
import { Positions } from '../../api/position/Position';

/** Returns the Profiles and Projects associated with the passed Interest. */
function getInterestData(name) {
  const profiles = _.pluck(UsersPositions.collection.find({ position: name }).fetch(), 'profile');
  const profilePictures = profiles.map(profile => Users.collection.findOne({ email: profile }).picture);
  // console.log(_.extend({ }, data, { interests }));
  return _.extend({ }, { name, profiles: profilePictures });
}

/** Component for layout out an Interest Card. */
const MakeCard = (props) => (
  <Card>
    <Card.Content>
      <Card.Header style={{ marginTop: '0px' }}>{props.position.name}</Card.Header>
    </Card.Content>
    <Card.Content extra>
      {_.map(props.position.profiles, (p, index) => <Image key={index} circular size='mini' src={p}/>)}
    </Card.Content>
  </Card>
);

MakeCard.propTypes = {
  position: PropTypes.object.isRequired,
};

/** Renders the Interests as a set of Cards. */
class PositionsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const positions = _.pluck(Positions.collection.find().fetch(), 'name');
    const positionData = positions.map(position => getInterestData(position));
    return (
      <Container id="positions-page">
        <Card.Group>
          {_.map(positionData, (position, index) => <MakeCard key={index} position={position}/>)}
        </Card.Group>
      </Container>
    );
  }
}

PositionsPage.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Ensure that minimongo is populated with all collections prior to running render().
  const sub1 = Meteor.subscribe(Users.userPublicationName);
  const sub2 = Meteor.subscribe(Positions.userPublicationName);
  const sub3 = Meteor.subscribe(UsersPositions.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(PositionsPage);
