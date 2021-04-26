import React from 'react';
import { Item, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class Position extends React.Component {
  render() {
    const font = { color: 'black', fontSize: 20 };
    return (
      <Item>
        <Image size='medium' src={this.props.position.image} />
        <Item.Content verticalAlign='middle'>
          <Item.Header as='a' style={font}>{this.props.position.name}</Item.Header>
          <Item.Meta style={font}>Job Type: {this.props.position.jobType}</Item.Meta>
          <Item.Description style={font}>
            {this.props.position.description}
          </Item.Description>
          <Item.Extra style={font}>Salary Range: {this.props.position.lowerSalary} - {this.props.position.higherSalary}</Item.Extra>
          <Item.Extra style={font}>Number of Positions: {this.props.position.hire}</Item.Extra>
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
