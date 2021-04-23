import React from 'react';
import { Item, Image, Card, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Position extends React.Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Image
            floated='right'
            size='mini'
            src={this.props.position.image}
          />
          <Card.Header>{this.props.position.name}</Card.Header>
          <Card.Meta>Job Type: {this.props.position.jobType}</Card.Meta>
          <Card.Description>
            {this.props.position.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
            Salary Range: {this.props.position.lowerSalary} - {this.props.position.higherSalary}
        </Card.Content>
        <Card.Content extra>
            Number of Positions: {this.props.position.hire}
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
