import React from 'react';
import { Image, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class PositionResult extends React.Component {
  render() {
    return (
      <List relaxed='very'>
        <List.Item>
          <List.Content>
            <Image floated='right' avatar src={this.props.image} />
            <List.Header as='a'>{this.props.name}</List.Header>
            <List.Description>{this.props.skills}</List.Description>
          </List.Content>
        </List.Item>
      </List>
    );
  }
}

// Require a document to be passed to this component.
PositionResult.propTypes = {
  name: PropTypes.string,
  skills: PropTypes.string,
  description: PropTypes.string,
  lowerSalary: PropTypes.number,
  higherSalary: PropTypes.number,
  location: PropTypes.string,
  image: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PositionResult);
