import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/SearchPosting.jsx. */
class PositionResult extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.name}</Table.Cell>
        <Table.Cell>{this.props.skills}</Table.Cell>
        <Table.Cell>{this.props.description}</Table.Cell>
        <Table.Cell>{this.props.lowerSalary}</Table.Cell>
        <Table.Cell>{this.props.higherSalary}</Table.Cell>
        <Table.Cell>{this.props.image}</Table.Cell>
      </Table.Row>
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
  image: PropTypes.string,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(PositionResult);
