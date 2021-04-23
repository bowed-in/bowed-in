import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import { Positions } from '../../api/position/Position';
import Position from '../components/Position';
import CompanyCard from '../components/CompanyCard';
import PotentialHire from '../components/PotentialHire';
import UserCard from '../components/UserCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const whiteFont = { color: 'white' };
    const leftGrid = { marginLeft: '20px' };
    return (
      <div className='home-background'>
        <Grid stackable>
          <Grid.Column textAlign='center' floated="left" width={4} style={leftGrid}>
            {this.props.currentUser.map((currentUser, index) => <CompanyCard key={index} user={currentUser} />)}
          </Grid.Column>
          <Grid.Column width={8} centered>
            <Header as='h2' centered inverted textAlign='center'>Positions You Posted</Header>
            <Item.Group>
              {this.props.positions.map((position, index) => <Position key={index} position={position} />)}
            </Item.Group>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' style={whiteFont} textAlign='center'>Potential Hire List</Header>
            <Item.Group>
              {this.props.usersList.map((currentUser, index) => <PotentialHire key={index} potentialHire={currentUser} />)}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
CompanyHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  usersList: PropTypes.array.isRequired,
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
  const usersList = users.collection.find({ role: 'student' }).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  return {
    currentUser,
    positions,
    usersList,
    ready,
  };
})(CompanyHomePage);
