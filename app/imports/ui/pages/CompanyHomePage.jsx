import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Item, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Users } from '../../api/user/User';
import { Positions } from '../../api/position/Position';
<<<<<<< Updated upstream
import Position from '../components/Position';
import CompanyCard from '../components/CompanyCard';
import PotentialHireList from '../components/PotentialHireList';
=======
import Position from '../components/TrashHomePageComponents/Position';
import CompanyCard from '../components/TrashHomePageComponents/CompanyCard';
import PotentialHire from '../components/TrashHomePageComponents/PotentialHire';
>>>>>>> Stashed changes

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
<<<<<<< Updated upstream
      <Container>
        <Grid>
          <Grid.Column verticalAlign='middle' width={4}>
            {this.props.currentUser.map((currentUser, index) => <CompanyCard key={index} user={currentUser} />)}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h2' textAlign='center'>Positions You Posted</Header>
=======
      <div className='home-background'>
        <Grid stackable>
          <Grid.Column centered verticalAlign='top' width={4}>
            {this.props.currentUser.map((currentUser, index) => <CompanyCard key={index} user={currentUser} />)}
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as='h2' centered inverted textAlign='center'>Positions You Posted</Header>
>>>>>>> Stashed changes
            <Item.Group>
              {this.props.positions.map((position, index) => <Position key={index} position={position} />)}
            </Item.Group>
          </Grid.Column>
<<<<<<< Updated upstream
          <Grid.Column verticalAlign='middle' width={4}>
            <Header as='h2' textAlign='center'>Potential Hire List</Header>
            <Item.Group>
              {this.props.users.map((currentUser, index) => <PotentialHireList key={index} potentialHire={currentUser} />)}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </Container>
=======
          <Grid.Column centered verticalAlign='middle' width={4} color='green'>
            <Header as='h2' style={whiteFont} textAlign='center'>Potential Hire List</Header>
            <Item.Group>
              {this.props.usersList.map((currentUser, index) => <PotentialHire key={index} potentialHire={currentUser} />)}
            </Item.Group>
          </Grid.Column>
        </Grid>
      </div>
>>>>>>> Stashed changes
    );
  }
}

// Require an array of Stuff documents in the props.
CompanyHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  users: PropTypes.array.isRequired,
  positions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Users.userPublicationName);
  const subscription2 = Meteor.subscribe(Positions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Stuff documents
  const positions = Positions.collection.find({}).fetch();
  const users = Users.collection.find({ role: 'student' }).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = Users.collection.find({ email: currentUsername }).fetch();
  return {
    currentUser,
    positions,
    users,
    ready,
  };
})(CompanyHomePage);
