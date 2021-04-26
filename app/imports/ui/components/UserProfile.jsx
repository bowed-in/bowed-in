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
        }}>{this.props.profile.firstName} {this.props.profile.lastName}</Header>
        <Segment style={{ padding: '10px' }} vertical>
          <Grid container stackable>
            <Grid.Row>
              <Grid.Column floated='left' width={6}>
                <Image bordered rounded size='medium' src={this.props.profile.image} />
              </Grid.Column>
              <Grid.Column floated='left' width={6}>
                <List>
                  <List.Item>
                    <List.Icon name='users' />
                    <List.Content>{this.props.profile.company}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='marker' />
                    <List.Content>{this.props.profile.location}</List.Content>
                  </List.Item>
                  <List.Item>
                    <List.Icon name='mail' />
                    <List.Content>
                      <a href='mailto:{this.props.profile.email}'>{this.props.profile.email}</a>
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
                  {this.props.profile.company}, {this.props.profile.position}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                    Interests:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  {this.props.profile.interest}
                </p>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign='left'>
                <Header as='h2' style={{ fontSize: '24px' }}>
                    Description:
                </Header>
                <p style={{ fontSize: '18px' }}>
                  {this.props.profile.description}
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
  profile: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserProfile);
