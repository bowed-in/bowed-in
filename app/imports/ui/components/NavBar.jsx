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
        {this.props.currentRole === 'student' ?
          (
            <Menu.Item as={NavLink} activeClassName="" exact to="/userhome">
              <Header as='h1' style={greenText}>BowedIn</Header>
            </Menu.Item>
          ) : ''}
        {this.props.currentRole === 'company' ?
          (
            <Menu.Item as={NavLink} activeClassName="" exact to="/companyhome">
              <Header as='h1' style={greenText}>BowedIn</Header>
            </Menu.Item>
          ) : ''}
        {this.props.currentUser === '' ?
          (
            <Menu.Item as={NavLink} activeClassName="" exact to="/">
              <Header as='h1' style={greenText}>BowedIn</Header>
            </Menu.Item>
          ) : ''}

        {this.props.currentRole === 'company' ?
          (
            <Menu.Item style={greenText} as={NavLink} activeClassName="" exact to="/liststudents">
              Recruit Students
            </Menu.Item>
          ) : ''}

        {this.props.currentUser ? (
          [
            <Menu.Item style={greenText} as={NavLink} activeClassName="active" exact to="/profile" key='profile'>Company Profile</Menu.Item>,
          ]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'student') ? (
          <Menu.Item id="navbar-search" style={greenText} as={NavLink} activeClassName="active" exact to="/search" key='search'>Search Postings</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'company') ? (
          <Menu.Item id="add=position" style={greenText} as={NavLink} activeClassName="active" exact to="/add" key='add'>Add Position</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item id="admin-profile" as={NavLink} activeClassName="active" exact to="/profileadmin" key='admin'>Profile Admin</Menu.Item>
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
  currentRole: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
  currentRole: Roles.getRolesForUser(Meteor.user()) ? Roles.getRolesForUser(Meteor.user())[0] : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
