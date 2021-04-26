import React from 'react';
import { Button } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  constructor(props) {
    super(props);
    /* NOTE: change this.state = { email, choice: ' ', ... } Double check the dropdown field settings */
    this.state = { redirectTo: undefined };
  }

  submitAboutUs = () => {
    this.setState({ redirectTo: '/signin' });
  }

  submitContactUs = () => {
    this.setState({ redirectTo: '/signup' });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={ this.state.redirectTo }/>;
    }
    const greenText = { color: '#024731' };
    return (
      <footer className='footer-fixation'>
        <div>
          <Button.Group widths='3'>
            <Button>
              <a href="https://bowed-in.github.io" style={greenText}>About BowedIn</a>
            </Button>
            <Button onClick={this.submitAboutUs}>
              <Button.Content style={greenText}>About the BowedIn Team</Button.Content>
            </Button>
            <Button onClick={this.submitContactUs}>
              <Button.Content style={greenText}>Contact Us</Button.Content>
            </Button>
          </Button.Group>
        </div>
      </footer>
    );
  }
}

export default Footer;
