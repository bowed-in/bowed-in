import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { viewProfilePage } from './viewProfile.page';
import { viewProfileAdminPage } from './viewProfileAdmin.page';
import { studentHomePage } from './studenthome.page';
import { companyHomePage } from './companyhome.page';
import { searchPage } from './search.page';
// import { preliminarySignupPage } from './preliminarySignup.page';
// import { studentSignupPage } from './studentSignup.page';
// import { companySignupPage } from './companySignup.page';
import { studentEditPage } from './studentEdit.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const studentCred = { username: 'john@foo.com', password: 'changeme', firstName: 'john' };
const companyCred = { username: 'admin@foo.com', password: 'changeme', company: 'Apple' };
const adminCred = { username: 'admin2@foo.com', password: 'changeme' };

fixture('BowedIn localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that student signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await navBar.isLoggedIn(testController, studentCred.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that company signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, companyCred.username, companyCred.password);
  await navBar.isLoggedIn(testController, companyCred.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that admin signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCred.username, adminCred.password);
  await navBar.isLoggedIn(testController, adminCred.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
/* Takes extremely long to load the StudentSignup page. Will edit in time for M3
test('Test that student signup process works, then logout works', async (testController) => {
  await navBar.ensureLogout(testController);
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await preliminarySignupPage.isDisplayed(testController);
  await preliminarySignupPage.signupStudent(testController, newUser, studentCred.password);
  await studentSignupPage.isDisplayed(testController);
  await studentSignupPage.addInfo(testController);
  await navBar.isLoggedIn(testController, newUser);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that company signup process works, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await preliminarySignupPage.isDisplayed(testController);
  await preliminarySignupPage.signupCompany(testController, newUser, companyCred.password);
  await companySignupPage.isDisplayed(testController);
  await companySignupPage.addInfo(testController);
  await navBar.isLoggedIn(testController, newUser);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
Do I also need to test edit company? Edit Student and Edit Company access the same form... */
test('Test that edit student information process works then logout', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const firstName = 'Sigourney';
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await navBar.isLoggedIn(testController, studentCred.username);
  await navBar.gotoViewProfilePage(testController);
  await viewProfilePage.isDisplayed(testController);
  await viewProfilePage.goToEditInformation(testController);
  await studentEditPage.isDisplayed(testController);
  await studentEditPage.changeFirstName(testController, firstName);
  await viewProfilePage.isDisplayed(testController);
  await viewProfilePage.goToEditInformation(testController);
  await studentEditPage.isDisplayed(testController);
  await studentEditPage.verifyChange(testController, firstName);
  await navBar.isLoggedIn(testController, studentCred.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});
//------------------------------------------------------------------------------------
test('Test the View Profile Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await navBar.gotoViewProfilePage(testController);
  await viewProfilePage.isDisplayed(testController);
});

test('Test the View Admin Profile Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, adminCred.username, adminCred.password);
  await navBar.gotoViewAdminPage(testController);
  await viewProfileAdminPage.isDisplayed(testController);
});

test('Test that student home page is reachable', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await studentHomePage.isDisplayed(testController);
});

test('Test that company home page is reachable', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, companyCred.username, companyCred.password);
  await companyHomePage.isDisplayed(testController);
});

test('Test the search posting page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await navBar.gotoSearchPage(testController);
  await searchPage.isDisplayed(testController);
});
