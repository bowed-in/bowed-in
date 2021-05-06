import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
// import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
// import SimpleSchema from 'simpl-schema';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
// import { Positions } from '../../api/position/Position';
// import { users } from '../../api/user/users';
import { Favorites } from '../../api/favorite/favorites';

// const Schema = new SimpleSchema({
//   name: String,
//   hire: Number,
//   skills: String,
//   jobType: {
//     type: String,
//     allowedValues: ['internship', 'permanent', 'internship and/or permanent'],
//     defaultValue: 'internship and/or permanent',
//   },
//   description: String,
//   lowerSalary: Number,
//   higherSalary: Number,
//   place: String,
//   image: String,
// });
//
// const bridge = new SimpleSchema2Bridge(Schema);

class Position extends React.Component {
  includesPosition = (favorite) => favorite.positionID === this.props.position._id;

  add = () => {
    if (!this.props.favorites.some(this.includesPosition)) {
      Favorites.collection.insert({ positionID: this.props.position._id, userID: Meteor.userId() });
    }
    // if (!users.findOne({}).likedPositions.includes(this.props.position._id)) {
    //   users.update({ _id: users.findOne({})._id },
    //     { $push: { likedPositions: this.props.position._id } });
    // } else {
    //   users.update({ _id: users.findOne({})._id },
    //     { $pull: { likedPositions: this.props.position._id } });
    // }
  };
  // add() {
  //   const [favorite, setFavorite] = useState([]);
  //   const addToFavorite = (position) => {
  //     console.log('we add to favorites');
  //     setFavorite([...favorite, position]);
  //   };
  // }
  // const { image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills } = this.props.position;
  //   const owner = Meteor.user().username;
  //   users.collection.insert(image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills, owner, (error) => {
  //     if (error) {
  //       swal('Error', error.message, 'error');
  //     } else {
  //       swal('Success', 'Item added successfully', 'success');
  //     }
  //   });
  // }
  //   const addProjectMethod = 'Projects.add';
  //
  //   Meteor.methods({
  //     'Projects.add' ({ image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills, owner }) {
  //       Positions.collection.insert({ image, name, place, description, jobType, lowerSalary, higherSalary, hire, skills, owner });
  //       users.collection.remove({ position: name });
  //       if (participants) {
  //         participants.map((participant) => Favorites.collection.insert({ position: name, user: participant }));
  //       }
  //     },
  //   });

  cancel = () => {
    if (this.props.favorites.find(this.includesPosition)) {
      Favorites.collection.remove(this.props.favorites.find(this.includesPosition)._id);
    }
  };

  render() {
    // const font = { color: 'black', fontSize: 20 };
    // let fRef = null;
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
            // need to fix onClick to this.delete
              <Button onClick={this.cancel} basic color='red'>
                  Delete
              </Button>
            ) : <Button onClick={this.add} basic color='orange'>
              Add
            </Button>}
            <Button basic color='teal'>
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
