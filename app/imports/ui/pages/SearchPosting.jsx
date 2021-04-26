import _ from 'lodash';
import React from 'react';
import { Search, Grid, Header, Container, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Positions } from '../../api/position/Position';
import PositionResult from '../components/PositionResult';
import Position from '../components/Position';

const initialState = {
  results: [],
  value: '',
};

class SearchPosting extends React.Component {

  constructor(props) {
    super(props);
    this.state = { results: [], value: '' };
  }

  resultRenderer = ({ name, skills, description, lowerSalary, higherSalary, image }) => <PositionResult name={name} skills={skills} description={description} lowerSalary={lowerSalary} higherSalary={higherSalary} image={image}/>

  // Reducer = (state, action) => {
  //   switch (action.type) {
  //   case 'CLEAN_QUERY':
  //     return initialState;
  //   case 'START_SEARCH':
  //     return { ...state, loading: true, value: action.query };
  //   case 'FINISH_SEARCH':
  //     return { ...state, loading: false, results: action.results };
  //   case 'UPDATE_SELECTION':
  //     return { ...state, value: action.selection };
  //
  //   default:
  //     throw new Error();
  //   }
  // }

  handleSearchChange = (e, data) => {
    this.setState({ loading: true, value: data.value });
    if (data.value.length === 0) {
      this.setState(initialState);
      return;
    }

    const re = new RegExp(_.escapeRegExp(data.value), 'i');
    const isMatch = (result) => re.test(result.name) || re.test(result.skills);

    this.setState({
      loading: false,
      results: _.filter(this.props.positions, isMatch),
    });
  }

  onResultSelect = (e, data) => {
    this.setState({ value: data.result.name });
    const re = new RegExp(_.escapeRegExp(data.result.name), 'i');
    const isMatch = (result) => re.test(result.name);

    this.setState({
      loading: false,
      results: _.filter(this.props.positions, isMatch),
    });
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const { loading, results, value } = this.state;

    return (
      <Grid container>
        <Grid.Column centered>
          <Search
            loading={loading}
            onResultSelect={this.onResultSelect}
            onSearchChange={this.handleSearchChange}
            resultRenderer={this.resultRenderer}
            results={results}
            value={value}
          />

          <Container id='results'>
            <Header>Your Results</Header>
            <pre style={{ overflowX: 'auto' }}>
              {results.map((positions) => <Position key={positions._id} position={positions}/>)};
            </pre>
            <Header>Postings</Header>
            <pre style={{ overflowX: 'auto' }}>
              {this.props.positions.map((positions) => <Position key={positions._id} position={positions}/>)};
            </pre>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}

SearchPosting.propTypes = {
  positions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  // Get access to Position documents.
  const subscription = Meteor.subscribe(Positions.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Position documents
  const positions = Positions.collection.find({}).fetch();
  return {
    positions,
    ready,
  };
})(SearchPosting);
