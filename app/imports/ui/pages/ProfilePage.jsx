import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Grid, Segment, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
// import { Accounts } from 'meteor/accounts-base';
import { users } from '../../api/user/users';
import { Stuffs } from '../../api/stuff/Stuff';
import { StudentCollection } from '../../api/student/students';
import { Link } from 'react-router-dom';
// import UserProfile from '../components/UserProfile';


/*
<List.Item>
                    <Link to={`/editstudent/${this.props.stuff._id}`}>Edit</Link>
                  </List.Item>
 */


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ProfilePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" style={{
          fontSize: '40px',
          fontWeight: 'normal',
          marginTop: '40px',
          textAlign: 'left',
          marginLeft: '20px',
        }}>Matthew Williams</Header>
        <Segment style={{ padding: '10px' }} vertical>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column floated='left' width={6}>
                <Image bordered rounded size='medium' src='https://react.semantic-ui.com/images/avatar/large/matthew.png'/>
              </Grid.Column>
              <Grid.Column floated='left' width={6}>
                <List>
                  <List.Item>
                    <List.Icon name='users' />
                    <List.Content>Apple</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='marker' />
                    <List.Content>New York, NY</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                      <a href='mailto:joon@foo.com'>john@foo.com</a>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='linkify' />
                    <List.Content>
                      <a href='http://www.apple.com'>apple.com</a>
                    </List.Content>
                  </List.Item>
                  <List.Item>
                    <Link to={`/editstudent/${this.props.doc._id}`}>Click here to edit your information</Link>
                  </List.Item>
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                  Company and Position:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  Apple, Senior Software Engineer
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                  Interests:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  Coding, Software Engineering, Robotics
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                  Description:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  A senior software engineer who works at Apple.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ProfilePage.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  studentReady: PropTypes.bool.isRequired,
  doc: PropTypes.object,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Stuffs.userPublicationName);
  // check student.js publication name...
  const studentSubscription = Meteor.subscribe(StudentCollection.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  const studentReady = studentSubscription.ready();
  // Get the Stuff/Required documents
  const stuffs = users.collection.find({}).fetch();
  // Meteor.userId() Meteor.username
  const user = Meteor.user() ? Meteor.user().username : '';
  // argument for findOne is an object   Double check schema fields (NOT username)
  const doc = StudentCollection.findOne({ owner: user });
  // Get access to StudentCollection
  return {
    stuffs,
    ready,
    studentReady,
    doc,
  };
})(ProfilePage);

/*
Meteor.publish(StudentCollection.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return StudentCollection.find({
      owner: username
    });
  }
*/
