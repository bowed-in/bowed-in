import { Selector } from 'testcafe';

class CompanyEditPage {
  constructor() {
    this.pageId = '#editCompany';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  async changeCompanyName(testController, companyName) {
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#compaName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#compaName', companyName);
    // Submit it.
    await testController.click('#company-edit-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }

  async verifyChange(testController, companyName) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('#compaName').value).eql(companyName);
    await testController.click('#company-edit-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const companyEditPage = new CompanyEditPage();
