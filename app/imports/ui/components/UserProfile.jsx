import React from 'react';
import { Image, Header, Segment, Grid, List, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserProfile extends React.Component {
  render() {
    return (
      <Container>
        <Header as="h2" style={{
          fontSize: '40px',
          fontWeight: 'normal',
          marginTop: '40px',
          textAlign: 'left',
          marginLeft: '20px',
        }}>{this.props.userProfile.firstName} {this.props.userProfile.lastName}</Header>
        <Segment style={{ padding: '10px' }} vertical>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column floated='left' width={6}>
                <Image bordered rounded size='medium' src={this.props.userProfile.image} />
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
                </List>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                    Company and Position:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  {this.props.userProfile.company}, {this.props.userProfile.position}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                    Interests:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  {this.props.userProfile.interest}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                    Description:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  {this.props.userProfile.description}
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Container>
    );
  }
}

// Require a document to be passed to this component.
UserProfile.propTypes = {
  userProfile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
