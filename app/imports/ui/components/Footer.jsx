import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const greenText = { color: '#024731' };
    return (
        <footer className='footer-fixation'>
          <div>
            <Button.Group widths='2'>
              <Button>
                <a href="https://bowed-in.github.io" style={greenText}>About BowedIn</a>
              </Button>
              <Button>
                <Link to="/signup" style={greenText}>About the BowedIn Team</Link>
              </Button>
            </Button.Group>
          </div>
        </footer>
    );
  }
}

export default Footer;