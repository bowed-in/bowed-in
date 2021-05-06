import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid, Label, Message } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import { Positions } from '../../api/position/Position';
import CompanyPosition from '../components/CompanyPosition';
import CompanyCard from '../components/CompanyCard';
import PotentialHire from '../components/PotentialHire';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const rightGrid = { marginRight: '200px' };
    return (
      <div id='companyhome' className='home-background'>
        <Grid stackable columns='5'>
          <Grid.Row centered>
            <Grid.Column id='company-card' verticalAlign='middle' style={rightGrid}>
              {this.props.currentUser.map((currentUser, index) => <CompanyCard key={index} user={currentUser} />)}
            </Grid.Column>
            <Grid.Column id='owned-positions' textAlign='left' style={rightGrid}>
              <Label size='massive' circular color='teal' key='white'>Your Positions</Label>
              {this.props.myPositions ? this.props.myPositions.map((position, index) => <CompanyPosition key={index} position={position} />) :
                <Message>Currently None</Message>
              }
            </Grid.Column>
            <Grid.Column id='potential-hire-list' verticalAlign='middle' style={rightGrid}>
              <Label size='massive' circular color='teal' key='white'>Potential Hiree</Label>
              {this.props.usersList.map((currentUser, index) => <PotentialHire key={index} potentialHire={currentUser} />)}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
CompanyHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  usersList: PropTypes.array.isRequired,
  myPositions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  const subscription2 = Meteor.subscribe(Positions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription2.ready() || subscription.ready();
  // Get the Stuff documents
  const usersList = users.collection.find({ role: 'student' }).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  const myPositions = Positions.collection.find({ owner: currentUsername }).fetch();
  return {
    currentUser,
    myPositions,
    usersList,
    ready,
  };
})(CompanyHomePage);
