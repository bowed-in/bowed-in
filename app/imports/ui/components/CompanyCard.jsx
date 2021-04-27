import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class CompanyCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.user.image} />
        <Card.Content textAlign='center'>
          <Card.Header>{this.props.user.company}</Card.Header>
          <Card.Meta>Company</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <b>Location: </b> {this.props.user.location}
        </Card.Content>
        <Card.Content extra>
          <b>Interest: </b> {this.props.user.interest}
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
CompanyCard.propTypes = {
  user: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CompanyCard);
