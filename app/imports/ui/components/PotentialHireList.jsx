import React from 'react';
import { Image, Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class PotentialHireList extends React.Component {
  render() {
    return (
      <Item>
        <Image size='small' src={this.props.potentialHire.image} />
        <Item.Content>
          <Item.Header as='a'>{this.props.potentialHire.firstName} {this.props.potentialHire.lastName}</Item.Header>
          <Item.Extra>Skills: {this.props.potentialHire.skill}</Item.Extra>
          <Item.Extra>Interests: {this.props.potentialHire.interest}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
PotentialHireList.propTypes = {
  potentialHire: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PotentialHireList);
