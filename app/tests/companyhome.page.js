import { Selector } from 'testcafe';

class CompanyHomePage {
  constructor() {
    this.pageId = '#companyhome';
    this.pageSelector = Selector(this.pageId);
    this.delete = '.ui.card .ui.feed .event .ui.red.button';
    this.deleteButton = Selector(this.delete).nth(-1);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async messageDisplayed(testController, message) {
    await this.isDisplayed(testController);
    const expected = Selector('.ui.card .content .ui.feed .content .summary').nth(-1).innerText;
    await testController.expect(expected).eql(message);
  }

  async dontDeleteMessage(testController) {
    await testController.click(this.deleteButton);
    await testController.click(Selector('.swal-button.swal-button--cancel'));
    await testController.click(Selector('.swal-button.swal-button--confirm'));
  }

  async deleteMessage(testController) {
    await testController.click(this.deleteButton);
    await testController.click(Selector('.swal-button.swal-button--delete'));
    await testController.click(Selector('.swal-button.swal-button--confirm'));
  }
  // consider: _.filter(array[ message summaries ], message) Selector gets the array of summaries.
}

export const companyHomePage = new CompanyHomePage();
