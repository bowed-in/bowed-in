import React from 'react';
import { Grid, Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
  render() {
    const leftGrid = { marginLeft: '20px' };
    return (
      <Grid.Column textAlign='center' floated="left" width={4} style={leftGrid}>
        <Card centered>
          <Image src={this.props.currentUser.image} wrapped circular ui={false}/>
          <Card.Content>
            <Card.Header>{this.props.currentUser.firstName} {this.props.currentUser.lastName}</Card.Header>
            <Card.Meta>{this.props.currentUser.position}</Card.Meta>
            <Card.Description>
              {this.props.currentUser.description}
            </Card.Description>
          </Card.Content>
        </Card>
      </Grid.Column>
    );
  }
}

// Require a document to be passed to this component.
UserCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(UserCard);
