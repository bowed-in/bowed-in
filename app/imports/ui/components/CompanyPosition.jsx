import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Positions } from '../../api/position/Position';

class CompanyPosition extends React.Component {
  includesPosition = (deletee) => deletee.positionID === this.props.position._id;

  cancel = () => {
    Positions.collection.remove(this.props.position._id);
  };

  render() {
    return (
      <Card>
        <Card.Content align='left'>
          <Image
            floated='right'
            size='mini'
            src={this.props.position.image}
          />
          <Card.Header>{this.props.position.name}</Card.Header>
          <Card.Meta>{this.props.position.place}</Card.Meta>
          <Card.Description><strong>Description:</strong> {this.props.position.description}</Card.Description>
          <Card.Description> <strong>Job Type: </strong>{this.props.position.jobType}</Card.Description>
          <Card.Description> <strong>Salary Range: </strong>{this.props.position.lowerSalary} - {this.props.position.higherSalary}</Card.Description>
          <Card.Description textAlign="left"><strong>Number of Position(s):</strong> {this.props.position.hire}
          </Card.Description>
          <Card.Description> <strong>Skill(s): </strong> {this.props.position.skills}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button onClick={this.cancel} fluid color='red'>
              Delete
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyPosition.propTypes = {
  position: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyPosition);
