import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Loader, Container, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import StuffItemAdmin from '../components/StuffItemAdmin';
import { users } from '../../api/user/users';
import StudentCard from '../components/StudentCard';
import { HireFavorites } from '../../hirefavorite/hirefavorites';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListStudents extends React.Component {
  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const listStyle = { marginTop: '10px', marginBottom: '10px' };
    return (
      <div className='search-background'>
        <Container align='center'>
          <Label size='massive' circular color='teal' key='white' style={listStyle}>Take a look at these students!</Label>
          <Card.Group>
            {this.props.students.map((student) => <StudentCard key={student._id} student={student}/>)}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
ListStudents.propTypes = {
  students: PropTypes.array.isRequired,
  hireFavorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to users documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  const subscription2 = Meteor.subscribe(HireFavorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const students = users.collection.find({ role: 'student' }).fetch();
  const hireFavorites = HireFavorites.collection.find({}).fetch();
  return {
    students,
    hireFavorites,
    ready,
  };
})(ListStudents);
