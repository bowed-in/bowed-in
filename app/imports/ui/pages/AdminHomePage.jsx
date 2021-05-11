import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Icon, Loader, Grid, Image, Header, Container } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { users } from '../../api/user/users';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHomePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const whiteFont = { color: 'white' };
    return (
      <div className='home-background'>
        <div style={{ paddingTop: '30px', paddingBottom: '70px' }}>
          <Image src={this.props.currentUser[0].image}
            size={'small'}
            centered/>
          <Header style={{ marginTop: '10px', paddingBottom: '15px', color: 'white' }} as={'h2'}
            textAlign={'center'}>{this.props.currentUser[0].firstName} {this.props.currentUser[0].lastName}</Header>
          <Header style={{ marginTop: '10px', paddingBottom: '15px', color: 'white' }} as={'h2'}
            content={'Administrator Page'}
            textAlign={'center'}/>
          <Container style={{ verticalAlign: 'middle' }}>
            <Grid columns={ 2 }
              container>
              <Grid.Column as={NavLink} exact to={'/profileadmin'} textAlign={'center'}>
                <Icon name={'users'} inverted size={'huge'}/>
                <Header as={'h3'} style={whiteFont} content={'List Users'}/>
                <Header as={'h4'} style={whiteFont} content={'Lists all Users in the System'}/>
              </Grid.Column>
              <Grid.Column as={NavLink} exact to={'/positionadmin'} textAlign={'center'}>
                <Icon name={'clipboard'} inverted size={'huge'}/>
                <Header as={'h3'} style={whiteFont} content={'List Positions'}/>
                <Header as={'h4'} style={whiteFont} content={'List All of the Positions in the System'}/>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </div>
    );
  }
}

// Require an array of Stuff documents in the props.
UserHomePage.propTypes = {
  currentUser: PropTypes.array.isRequired, // Returns only the current user
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(users.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const currentUsername = Meteor.user() ? Meteor.user().username : '';
  const currentUser = users.collection.find({ email: currentUsername }).fetch();
  return {
    currentUser,
    ready,
  };
})(UserHomePage);
