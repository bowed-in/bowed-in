import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Landing from '../pages/Landing';
import SearchPosting from '../pages/SearchPosting';
import ProfilePage from '../pages/ProfilePage';
import AddPosition from '../pages/AddPosition';
import EditStuff from '../pages/EditStuff';
import NotFound from '../pages/NotFound';
import AboutUs from '../pages/AboutUs';
import Signin from '../pages/Signin';
import Signup from '../pages/PreliminarySignup';
import StudentSignup from '../pages/StudentSignup';
import CompanySignup from '../pages/CompanySignup';
import EditUser from '../pages/EditUser';
import Signout from '../pages/Signout';
import UserHomePage from '../pages/UserHomePage';
import StudentRouteTest from '../pages/StudentRouteTest';
import CompanyRouteTest from '../pages/CompanyRouteTest';
import CompanyHomePage from '../pages/CompanyHomePage';
import ProfilePageAdmin from '../pages/ProfilePageAdmin';
import ListStudents from '../pages/ListStudents';
import ListPositionAdmin from '../pages/ListPositionAdmin';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/aboutus" component={AboutUs}/>
            <ProtectedRoute path="/studentsignup" component={StudentSignup}/>
            <ProtectedRoute path="/companysignup" component={CompanySignup}/>
            <CompanyProtectedRoute path="/companyhome" component={CompanyHomePage}/>
            <StudentProtectedRoute path="/userhome" component={UserHomePage}/>
            <StudentProtectedRoute path="/search" component={SearchPosting}/>
            <CompanyProtectedRoute path="/liststudents" component={ListStudents}/>
            <StudentProtectedRoute path="/studenthome" component={UserHomePage}/>
            <ProtectedRoute path="/profile" component={ProfilePage}/>
            <ProtectedRoute path="/add" component={AddPosition}/>
            <ProtectedRoute path="/edit/:_id" component={EditStuff}/>
            <ProtectedRoute path="/editdata/:_id" component={EditUser}/>
            <AdminProtectedRoute path="/profileadmin" component={ProfilePageAdmin}/>
            <AdminProtectedRoute path="/positionadmin" component={ListPositionAdmin}/>
            <StudentProtectedRoute path="/student" component={StudentRouteTest}/>
            <CompanyProtectedRoute path="/company" component={CompanyRouteTest}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * StudentProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and 'student' role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const StudentProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isStudent = Roles.userIsInRole(Meteor.userId(), 'student');
      return (isLogged && isStudent) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * CompanyProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const CompanyProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isCompany = Roles.userIsInRole(Meteor.userId(), 'company');
      return (isLogged && isCompany) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each StudentProtectedRoute.
StudentProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each CompanyProtectedRoute.
CompanyProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
