import React from 'react';
import { Grid, Container, Loader, Card, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Positions } from '../../api/position/Position';
import { Favorites } from '../../api/favorite/favorites';
import Position from '../components/Position';
// import { Messages } from '../../api/message/Messages';

class PositionPageAdmin extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {

    return (
      <div id='searchpage' className='home-background'>
        <Grid container centered>
          <Grid.Column>

            <Container align='center'>
              <Label id='postings-admin' size='huge' circular color='teal' >All Postings</Label>
              <Card.Group centered>
                {this.props.positions.map((positions) => <Position key={positions._id} position={positions} favorites={this.props.favorites.filter(favorite => (favorite.positionID === positions._id))}/>)}
              </Card.Group>
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

PositionPageAdmin.propTypes = {
  positions: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Position documents.
  const subscription = Meteor.subscribe(Positions.userPublicationName);
  const subscription2 = Meteor.subscribe(Favorites.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready() && subscription2.ready();
  // Get the Position documents
  const positions = Positions.collection.find({}).fetch();
  const favorites = Favorites.collection.find({}).fetch();
  return {
    positions,
    favorites,
    ready,
  };
})(PositionPageAdmin);
