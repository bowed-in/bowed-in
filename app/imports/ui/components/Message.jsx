import React from 'react';
import { Feed, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';
import { Messages } from '../../api/message/Messages';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyMessage extends React.Component {
// Does not have its own bindings to this or super...in regular method 'this' refers to intra-method bindings
  onClick = () => {

    swal('Are you sure you want to delete this message?', {
      buttons: {
        cancel: "Don't Delete",
        delete: 'Delete',
      },
    })
      .then((value) => {
        switch (value) {

        case 'delete':
          Messages.collection.remove(this.props.message._id);
          swal('message deleted');
          break;
        default:
          swal('message saved');
        }
      });
  }

  render() {
    return (
      <Feed.Event>
        <Feed.Label>
          <Icon name='mail outline'/>
        </Feed.Label>
        <Feed.Content>
          <Feed.Date content={this.props.message.createdAt.toLocaleString('en-US')} />
          <Feed.Summary>
            Message from: {this.props.message.sentFrom}
          </Feed.Summary>
          <Feed.Extra text>
            {this.props.message.message}
          </Feed.Extra>
        </Feed.Content>
        <Button onClick={this.onClick} color='red'>
          Delete
        </Button>
      </Feed.Event>
    );
  }
}

// Require a document to be passed to this component.
CompanyMessage.propTypes = {
  message: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyMessage);
