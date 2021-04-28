import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#searchpage';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(20000).expect(this.pageSelector.exists).ok();
  }
}

export const searchPage = new SearchPage();
