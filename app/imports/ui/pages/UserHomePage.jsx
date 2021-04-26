import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
<<<<<<< Updated upstream
import { Users } from '../../api/user/User';
import { Positions } from '../../api/position/Position';
import Position from '../components/Position';
import UserCard from '../components/UserCard';
=======
import { users } from '../../api/user/users';
import Position from '../components/TrashHomePageComponents/Position';
import { Positions } from '../../api/position/Position';
import StudentCard from '../components/HomePage/StudentCard';
import { StudentCollection } from '../../api/student/students';
>>>>>>> Stashed changes

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const leftAlign = { marginLeft: '20px' };
    return (
<<<<<<< Updated upstream
      <Container>
        <Grid>
          <Grid.Column verticalAlign='middle' width={4}>
            {this.props.currentUser.map((currentUser, index) => <UserCard key={index} currentUser={currentUser} />)}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h2' textAlign='center'>Positions Available</Header>
            <Item.Group>
              {this.props.positions.map((position, index) => <Position key={index} position={position} />)}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Container>
=======
      <div className='home-background'>
        <Grid stackable>
          <Grid.Column centered fluid width={4} style={ leftAlign }>
            {this.props.currentUser.map((currentUser, index) => <StudentCard key={index} currentUser={currentUser} />)}
          </Grid.Column>
        </Grid>
      </div>
>>>>>>> Stashed changes
    );
  }
}

// Require an array of Stuff documents in the props.
UserHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  positions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
<<<<<<< Updated upstream
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Positions.userPublicationName);
=======
  const subscription = Meteor.subscribe(Positions.userPublicationName);
  const subscription2 = Meteor.subscribe(StudentCollection.userPublicationName);
>>>>>>> Stashed changes
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const positions = Positions.collection.find({}).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
<<<<<<< Updated upstream
  const currentUser = Users.collection.find({ email: currentUsername }).fetch();
=======
  const currentUser = StudentCollection.find({ email: currentUsername }).fetch();
>>>>>>> Stashed changes
  return {
    currentUser,
    positions,
    ready,
  };
})(UserHomePage);
