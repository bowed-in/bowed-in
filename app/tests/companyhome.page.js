import { Selector } from 'testcafe';

class CompanyHomePage {
  constructor() {
    this.pageId = '#companyhome';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async messageDisplayed(testController, message) {
    const expected = Selector('.ui.feed .content .summary').innerText;
    await testController.expect(expected).eql(message);
  }
}

export const companyHomePage = new CompanyHomePage();
