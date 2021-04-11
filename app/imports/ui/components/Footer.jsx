import React from 'react';
import { Menu } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="gray-footer">
          <Menu fluid widths={3} borderless>
            <Menu.Item>
              <a href="https://bowed-in.github.io/">About BowedIn</a>
            </Menu.Item>
            <Menu.Item>
              <a href="">Sign in. Link does not work yet</a>
            </Menu.Item>
            <Menu.Item>
              <a href="">Sign up. Link does not work yet</a>
            </Menu.Item>
          </Menu>
        </div>
      </footer>
    );
  }
}

export default Footer;
