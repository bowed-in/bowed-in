import { Selector } from 'testcafe';

class AdminHomePage {
  constructor() {
    this.pageId = '#adminhome';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Go to List Users. */
  async goToAdminListUsers(testController) {
    await testController.click('#admin-list-users');
  }

  /** Go to Position Users. */
  async goToAdminListPositions(testController) {
    await testController.click('#admin-list-positions');
  }

}

export const adminHomePage = new AdminHomePage();
