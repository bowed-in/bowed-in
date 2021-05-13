import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Label, Message, Loader, Grid, Feed, Card, Header } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { users } from '../../api/user/users';
import Position from '../components/Position';
import { Positions } from '../../api/position/Position';
import UserCard from '../components/UserCard';
import { Favorites } from '../../api/favorite/favorites';
import { Messages } from '../../api/message/Messages';
import CompanyMessage from '../components/Message';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  isInUserFavorites = (positionID) => this.props.favorites.some((favorite) => positionID === favorite.positionID);

  // Render the page once subscriptions have been received.
  renderPage() {
    const rightGrid = { marginRight: '200px' };
    return (
      <div className='home-background'>
        <Grid id='studenthome' stackable columns='5'>
          <Grid.Row centered>
            <Grid.Column verticalAlign='middle' style={rightGrid}>
              {this.props.currentUser.map((currentUser, index) => <UserCard key={index} currentUser={currentUser} />)}
            </Grid.Column>
            <Grid.Column textAlign='left' style={rightGrid}>
              <Label id='yours' size='massive' circular color='teal' key='white'>Current Interested Positions</Label>
              {this.props.favorites.length !== 0 ?
              // eslint-disable-next-line max-len
                this.props.positions.filter((position) => this.isInUserFavorites(position._id)).map((position, index) => <Position key={index} position={position} favorites={this.props.favorites.filter(favorite => (favorite.positionID === position._id))}/>) :
                <Message>
                  <Message.Header>No Positions Currently Interested</Message.Header>
                  <p>
                    Find your next job by going through the Search Postings in the Navigation Bar
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
UserHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  positions: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  myMessages: PropTypes.array.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  const subscription2 = Meteor.subscribe(Positions.userPublicationName);
  const subscription3 = Meteor.subscribe(Favorites.userPublicationName);
  const subscription4 = Meteor.subscribe(Messages.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription2.ready() && subscription.ready() && subscription3.ready() && subscription4.ready();
  // Get the Stuff documents
  const positions = Positions.collection.find({}).fetch();
  const favorites = Favorites.collection.find({}).fetch();
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  const myMessages = Messages.collection.find({ owner: currentUsername }).fetch();
  return {
    currentUser,
    positions,
    favorites,
    ready,
    myMessages,
  };
})(UserHomePage);
