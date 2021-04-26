import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StudentCard extends React.Component {
  render() {
    const blackFont = { color: 'black' };
    return (
      <Card>
        <Image src={this.props.currentUser.image} />
        <Card.Content textAlign={'center'}>
          <Card.Header>
            {this.props.currentUser.firstName} {this.props.currentUser.lastName}
          </Card.Header>
          <Card.Meta>
            <a href={this.props.currentUser.link}> {this.props.currentUser.link} </a>
          </Card.Meta>
        </Card.Content>
        <Card.Content style:{blackFont} extra>
          <b>Description:</b>
          <Card.Content> {this.props.currentUser.bio} </Card.Content>
        </Card.Content>

      </Card>
    );
  }
}

// Require a document to be passed to this component.
StudentCard.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StudentCard);
