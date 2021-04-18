import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import Position from '../components/Position';
import { Positions } from '../../api/position/Position';
import UserCard from '../components/UserCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <div className='home-background'>
        <Container>
          <Grid stackable>
            <Grid.Column verticalAlign='middle' width={4}>
              {this.props.currentUser.map((currentUser, index) => <UserCard key={index} currentUser={currentUser} />)}
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h2' inverted textAlign='center'>Positions Available</Header>
              <Item.Group>
                {this.props.positions.map((position, index) => <Position key={index} position={position} />)}
              </Item.Group>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
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
  const subscription = Meteor.subscribe(Positions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const positions = Positions.collection.find({}).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  return {
    currentUser,
    positions,
    ready,
  };
})(UserHomePage);