import React from 'react';
import { Card, Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class PositionAdmin extends React.Component {
  render() {
    return (
      <Grid container centered>
        <Grid.Row>
          <Card.Group>
            <Card centered>
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
                <Card.Description> <strong>Owner: </strong> {this.props.position.owner}</Card.Description>
              </Card.Content>
            </Card>
          </Card.Group>
        </Grid.Row>
      </Grid>
    );
  }
}

// Require a document to be passed to this component.
PositionAdmin.propTypes = {
  position: PropTypes.object.isRequired,
};

export default withRouter(PositionAdmin);
