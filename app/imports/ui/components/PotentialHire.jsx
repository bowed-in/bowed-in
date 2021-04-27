import React from 'react';
import { Button, Card, Image, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PotentialHire extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='left'
            size='tiny'
            src={this.props.potentialHire.image}
          />
          <Card.Header textAlign="left">{this.props.potentialHire.firstName} {this.props.potentialHire.lastName}</Card.Header>
          <Card.Content extra textAlign={'left'}>
            <b> Skills: </b> {this.props.potentialHire.skill}
          </Card.Content>
          <Card.Content extra textAlign={'left'}>
            <b> Interests: </b> {this.props.potentialHire.interest}
          </Card.Content>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='red'>
                View Profile
            </Button>
            <Button basic color='blue'>
                Message
            </Button>
          </div>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
PotentialHire.propTypes = {
  potentialHire: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PotentialHire);
