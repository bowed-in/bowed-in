import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

const options = [
  { key: 's', text: 'Student', value: 'student', id: 'student' },
  { key: 'c', text: 'Company', value: 'company', id: 'company' },
];
/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  /* Initialize state fields. */
  constructor(props) {
    super(props);
    /* NOTE: change this.state = { email, choice: ' ', ... } Double check the dropdown field settings */
    this.state = { email: '', password: '', error: '', choice: '', redirectTo: undefined };
  }

  /* Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /* Handle Signup submission. Create user account and a profile entry, then redirect to the home page. */
  submit = () => {
    /* NOTES: const {email, radioField } = this.state; */
    const { email, password, choice } = this.state;
    /* NOTES: Accounts.createUser ({email, radioField (type)} */
    Accounts.createUser({ email, username: email, password, choice }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // student redirect
        if (choice === 'student') {
          this.setState({ error: '', redirectTo: '/studentsignup' });
        }
        this.setState({ error: '', redirectTo: '/companysignup' });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: this.state.redirectTo } };
    // if correct authentication, redirect to from: page instead of signup screen
    if (this.state.redirectTo) {
      return <Redirect to={ from }/>;
    }
    return (
      <Container id="preliminary-signup-page">
        <Grid textAlign="center" verticalAlign="middle" centered columns={2}>
          <Grid.Column>
            <Header as="h2" textAlign="center">
                Register Your Account Today!
            </Header>
            <Form onSubmit={this.submit}>
              <Segment stacked>
                <Form.Input
                  label="Email"
                  id="signup-form-email"
                  icon="user"
                  iconPosition="left"
                  name="email"
                  type="email"
                  placeholder="E-mail address"
                  onChange={this.handleChange}
                />
                <Form.Input
                  label="Password"
                  id="signup-form-password"
                  icon="lock"
                  iconPosition="left"
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
                <Form.Select
                  fluid
                  id = "roles"
                  label='I am signing up as a...'
                  options={options}
                  placeholder='Please select one'
                  name='choice'
                  type='choice'
                  onChange={this.handleChange}
                />
                <Form.Button id="signup-form-submit" content="Submit"/>
              </Segment>
            </Form>
            <Message>
                Already have an account? Login <Link to="/signin">here</Link>
            </Message>
            {this.state.error === '' ? (
              ''
            ) : (
              <Message
                error
                header="Oops, something went wrong. Please, try again!"
                content={this.state.error}
              />
            )}
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

/* Ensure that the React Router location object is available in case we need to redirect. */
Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
