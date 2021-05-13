import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import AddMessage from './AddMessage';
import { HireFavorites } from '../../api/hirefavorite/hirefavorites';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class StudentCard extends React.Component {

  includesStudent = (hireFavorite) => hireFavorite.positionID === this.props.student._id;

  add = () => {
    if (!this.props.hireFavorites.some(this.includesStudent)) {
      HireFavorites.collection.insert({ positionID: this.props.student._id, userID: Meteor.userId() });
    }
  };

  cancel = () => {
    if (this.props.hireFavorites.find(this.includesStudent)) {
      HireFavorites.collection.remove(this.props.hireFavorites.find(this.includesStudent)._id);
    }
  };

  render() {
    return (
      <Card>
        <Image src={this.props.student.image} />
        <Card.Content textAlign='center'>
          <Card.Header>{this.props.student.firstName} {this.props.student.lastName}</Card.Header>
          <Card.Meta>Student</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <b>Skill(s): </b> {this.props.student.skill}
        </Card.Content>
        <Card.Content extra>
          <b>Interest(s): </b> {this.props.student.interest}
        </Card.Content>
        <Card.Content extra>
          <div className='ui two buttons'>
            {this.props.hireFavorites.some(this.includesStudent) ? (
              <Button onClick={this.cancel} color='red'>
                <Icon name='delete' />
                  Delete
              </Button>
            ) : <Button onClick={this.add} color='green'>
              <Icon name='add' />
              Add
            </Button>}
            <Button color='teal'>
              <Icon name='mail' />
              Message
            </Button>
          </div>
        </Card.Content>
        <Card.Content extra>
          <AddMessage owner={this.props.student.owner}/>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  hireFavorites: PropTypes.array.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(StudentCard);
