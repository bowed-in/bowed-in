import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { navBar } from './navbar.component';
import { viewProfilePage } from './viewProfile.page';
import { viewProfileAdminPage } from './viewProfileAdmin.page';
import { studentHomePage } from './studenthome.page';
import { companyHomePage } from './companyhome.page';
import { searchPage } from './search.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const studentCred = { username: 'john@foo.com', password: 'changeme' };
const companyCred = { username: 'admin@foo.com', password: 'changeme' };
const adminCred = { username: 'admin2@foo.com', password: 'changeme' };

fixture('BowedIn localhost test with default db')
  .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, studentCred.username, studentCred.password);
  await navBar.isLoggedIn(testController, studentCred.username);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

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
