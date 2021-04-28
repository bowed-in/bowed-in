import { Selector } from 'testcafe';
import { navBar } from './navbar.component';

class PreliminarySignupPage {
  constructor() {
    this.pageId = '#preliminary-signup-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see that they are logged in by checking the navbar. */
  async signupStudent(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    const role = Selector('#roles');
    const studentRole = role.find('#student');
    await testController.click(role);
    await testController.click(studentRole);
    // await testController.click(role);
    await testController.click('#signup-form-submit');
  }

  async signupCompany(testController, username, password) {
    await this.isDisplayed(testController);
    await testController.typeText('#signup-form-email', username);
    await testController.typeText('#signup-form-password', password);
    const role = Selector('#roles');
    const companyRole = role.find('#company');
    await testController.click(role);
    await testController.click(companyRole);
    await testController.click('#signup-form-submit');
    await navBar.isLoggedIn(testController, username);
  }
}

export const preliminarySignupPage = new PreliminarySignupPage();
