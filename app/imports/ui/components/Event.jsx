import React from 'react';
import { Item } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Event extends React.Component {
  render() {
    return (
      <Item>
        <Item.Image size='tiny' src={this.props.event.image}/>

        <Item.Content>
          <Item.Header as='a'>{this.props.event.title}</Item.Header>
          <Item.Description>
            {this.props.event.description}
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

// Require a document to be passed to this component.
Event.propTypes = {
  event: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Event);
