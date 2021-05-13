import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Grid, Label, Message, Card, Feed, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import { Positions } from '../../api/position/Position';
import CompanyPosition from '../components/CompanyPosition';
import CompanyCard from '../components/CompanyCard';
import CompanyMessage from '../components/Message';
import { Messages } from '../../api/message/Messages';
import { HireFavorites } from '../../api/hirefavorite/hirefavorites';
// import StudentCard from '../components/StudentCard';
import PotentialHire from '../components/PotentialHire';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CompanyHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  isInHireFavorites = (positionID) => this.props.hireFavorites.some((hireFavorite) => positionID === hireFavorite.positionID);

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
              {this.props.myPositions.length !== 0 ? this.props.myPositions.map((position, index) => <CompanyPosition key={index} position={position} />) :
                <Message>
                  <Message.Header>Currently not searching for Hirees</Message.Header>
                  <p>
                      Create a job opportunity by going through the Add Position in the Navigation Bar
                  </p>
                </Message>
              }
            </Grid.Column>
            <Grid.Column id='potential-hire-list' verticalAlign='middle' style={rightGrid}>
              <Label size='massive' circular color='teal' key='white'>Potential Hiree</Label>
              {this.props.hireFavorites.length !== 0 ?
              // eslint-disable-next-line max-len
                this.props.usersList.filter((position) => this.isInHireFavorites(position._id)).map((position, index) => <PotentialHire key={index} student={position} hireFavorites={this.props.hireFavorites.filter(favorite => (favorite.positionID === position._id))}/>) :
                <Message>
                  <Message.Header>No Students Currently Interested In</Message.Header>
                  <p>
                      Find your next hire by going through the Recruit Students in the Navigation Bar
                  </p>
                </Message>
              }
            </Grid.Column>
            <Grid.Column id='messages' verticalAlign='middle' style={rightGrid}>
              <Label size='massive' circular color='teal' key='white'>Messages</Label>
              <Card fluid className='message card'>
                {this.props.myMessages.length === 0 ? <Header as='h2'>No new messages</Header> : <Card.Content>
                  <Feed>
                    {this.props.myMessages.map((message, index) => <CompanyMessage key={index} message={message}/>)}
                  </Feed>
                </Card.Content> }
              </Card>
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
  myMessages: PropTypes.array.isRequired,
  hireFavorites: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  const subscription2 = Meteor.subscribe(Positions.userPublicationName);
  const subscription3 = Meteor.subscribe(Messages.userPublicationName);
  const subscription4 = Meteor.subscribe(HireFavorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription2.ready() || subscription.ready() || subscription3.ready() || subscription4.ready();
  // Get the Stuff documents
  const usersList = users.collection.find({ role: 'student' }).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  const myPositions = Positions.collection.find({ owner: currentUsername }).fetch();
  const myMessages = Messages.collection.find({ owner: currentUsername }).fetch();
  const hireFavorites = HireFavorites.collection.find({}).fetch();
  return {
    currentUser,
    myPositions,
    usersList,
    ready,
    myMessages,
    hireFavorites,
  };
})(CompanyHomePage);
