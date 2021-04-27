import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: 'white' };
    const greenText = { color: '#024731' };
    return (
      <Menu style={menuStyle} attached="top" borderless>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h1' style={greenText}>BowedIn</Header>
        </Menu.Item>
        {this.props.currentUser ? (
          [
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Stuff</Menu.Item>,
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/search" key='search'>Search Postings</Menu.Item>,
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/profile" key='profile'>Company Profile</Menu.Item>,
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/companyhome" key='companyhome'>Company Home Page [Only Available in the Mockup]</Menu.Item>,
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/userhome" key='userhome'>User Home Page [Only Available in the Mockup]</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='admin'>Admin</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown style={greenText} id="login-dropdown" text="Login or Sign Up Today!" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item style={greenText} id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item style={greenText} id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown style={greenText} id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item style={greenText} id="navbar-profile" icon="address card" text="View Profile" as={NavLink} exact to="/profile"/>
                <Dropdown.Item style={greenText} id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
