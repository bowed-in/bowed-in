import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Item, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Events } from '../../api/event/Event';
import Event from '../components/Event';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListEvent extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Grid>
          <Grid.Column width={4}>
            BLANK
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">List Event</Header>
            <Item.Group>
              {this.props.events.map((events, index) => <Event key={index} event={events}/>)}
            </Item.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            BLANK
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListEvent.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Event documents.
  const subscription = Meteor.subscribe(Events.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Event documents
  const events = Events.collection.find({}).fetch();
  return {
    events,
    ready,
  };
})(ListEvent);
