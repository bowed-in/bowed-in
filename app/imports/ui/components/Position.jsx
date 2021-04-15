import React from 'react';
import { Item, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Position extends React.Component {
  render() {
    return (
      <Item>
        <Image size='medium' src='https://react.semantic-ui.com/images/wireframe/image.png' />
        <Item.Content>
          <Item.Header as='a'>{this.props.position.name}</Item.Header>
          <Item.Meta>Job Type: {this.props.position.jobType}</Item.Meta>
          <Item.Description>
            {this.props.position.description}
          </Item.Description>
          <Item.Extra>Salary Range: {this.props.position.lowerSalary} - {this.props.position.higherSalary}</Item.Extra>
          <Item.Extra>Number of Positions: {this.props.position.hire}</Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
Position.propTypes = {
  position: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Position);
