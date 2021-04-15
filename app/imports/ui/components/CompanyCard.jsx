import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CompanyCard extends React.Component {
  render() {
    return (
      <Card centered>
        <Card.Content>
          <Image src={this.props.user.image} />
        </Card.Content>
        <Card.Content>
          <Card.Header>{this.props.user.firstName} {this.props.user.lastName}</Card.Header>
          <Card.Description>
            Description: {this.props.user.description}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          Fundamental Skills: {this.props.user.skill}
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
