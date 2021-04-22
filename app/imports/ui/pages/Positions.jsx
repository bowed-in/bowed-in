import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader, Card, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Positions } from '../../api/position/Position';
import { StudentCollection } from '../../api/student/students';
import { StudentsPositions } from '../../api/student/StudentsPositions';

/** Returns the Profiles associated with the passed position. */
function getPositionData(name) {
  const profiles = _.pluck(StudentsPositions.collection.find({ position: name }).fetch(), 'student');
  const profilePictures = profiles.map(student => StudentCollection.collection.findOne({ email: student }).picture);
  // console.log(_.extend({ }, data, { positions }));
  return _.extend({ }, { name, profiles: profilePictures });
}

/** Component for layout out a position Card. */
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

/** Renders the positions as a set of Cards. */
class PositionsPage extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const positions = _.pluck(Positions.collection.find().fetch(), 'name');
    const positionData = positions.map(position => getPositionData(position));
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
  const sub1 = Meteor.subscribe(StudentCollection.userPublicationName);
  const sub2 = Meteor.subscribe(Positions.userPublicationName);
  const sub3 = Meteor.subscribe(StudentsPositions.userPublicationName);
  return {
    ready: sub1.ready() && sub2.ready() && sub3.ready(),
  };
})(PositionsPage);
