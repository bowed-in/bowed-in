import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class Position extends React.Component {
  render() {
    // const font = { color: 'black', fontSize: 20 };
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.position.image}
          />
          <Card.Header textAlign="left">{this.props.position.name}</Card.Header>
          <Card.Meta textAlign="left">Job Type: {this.props.position.jobType}</Card.Meta>
          <Card.Meta textAlign="left"> Salary Range: {this.props.position.lowerSalary} - {this.props.position.higherSalary}</Card.Meta>
          <Card.Meta textAlign="left"> Location: {this.props.position.location}</Card.Meta>
          <Card.Description textAlign="left"><strong>Description:</strong> {this.props.position.description}</Card.Description>
          <Card.Description textAlign="left"><strong>Number of Positions:</strong> {this.props.position.hire}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button basic color='green'>
              Add
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
Position.propTypes = {
  position: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Position);
