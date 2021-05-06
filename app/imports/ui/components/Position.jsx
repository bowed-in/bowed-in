import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Favorites } from '../../api/favorite/favorites';

class Position extends React.Component {
  includesPosition = (favorite) => favorite.positionID === this.props.position._id;

  add = () => {
    if (!this.props.favorites.some(this.includesPosition)) {
      Favorites.collection.insert({ positionID: this.props.position._id, userID: Meteor.userId() });
    }
  };

  cancel = () => {
    if (this.props.favorites.find(this.includesPosition)) {
      Favorites.collection.remove(this.props.favorites.find(this.includesPosition)._id);
    }
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
          <div className='ui two buttons'>
            {this.props.favorites.some(this.includesPosition) ? (
              <Button onClick={this.cancel} color='red'>
                  Delete
              </Button>
            ) : <Button onClick={this.add} color='green'>
              Add
            </Button>}
            <Button color='teal'>
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
  favorites: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Position);
