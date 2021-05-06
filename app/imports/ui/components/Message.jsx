import React from 'react';
import { Feed } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyMessage extends React.Component {
  render() {
    return (
      <Feed.Event >
        <Feed.Content>
          <Feed.Date content={this.props.message.createdAt.toLocaleString('en-US')} />
          <Feed.Summary>
            {this.props.message.message}
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    );
  }
}
// Create button next to each message => onClick => 'Messages.collection.deleteOne(this.props.message._id)'

// Require a document to be passed to this component.
CompanyMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyMessage);