import React from 'react';
import { Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const greenText = { color: '#024731' };
    return (
      <footer className='footer-fixation'>
        <div>
          <Button.Group widths='3'>
            <Button>
              <a id='about' href="https://bowed-in.github.io" style={greenText}>About BowedIn</a>
            </Button>
            <Button as={NavLink} activeClassName="active" exact to="/aboutus">
              <Button.Content style={greenText} id='team'>About the BowedIn Team</Button.Content>
            </Button>
          </Button.Group>
        </div>
      </footer>
    );
  }
}

export default Footer;
