import { Selector } from 'testcafe';

class SearchPage {
  constructor() {
    this.pageId = '#searchpage';
    this.pageSelector = Selector(this.pageId);
    // this.card = Selector('.extra.content input').withAttribute('value', 'bowedinconnect@gmail.com').nth(0);
    this.messageSelector = Selector('.extra.content .ui.input input').nth(0);
    // this.messageSelector = Selector('.extra.content .ui.input input').nth(0);
    // this.messageSelector = Selector(this.messageField).nth(0);
    this.messageSubmit = '.extra.content .ui.form .ui.button';
    this.messageSubSelector = Selector(this.messageSubmit).nth(0);
    // this.messageSubSelector = Selector(this.messageSubmit).nth(0);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async selectMessageField(testController, message) {
    await testController.typeText(this.messageSelector, message);
    await testController.click(this.messageSubSelector);
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const searchPage = new SearchPage();
