import { Selector } from 'testcafe';

class StudentEditPage {
  constructor() {
    this.pageId = '#editStudent';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(2 ** 13).expect(this.pageSelector.exists).ok();
  }

  async changeFirstName(testController, firstName) {
    await this.isDisplayed(testController);
    // Delete text from first name field.
    await testController.selectText('#studentFName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#studentFName', firstName);
    // Submit it.
    await testController.click('#student-edit-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }

  async verifyChange(testController, firstName) {
    await this.isDisplayed(testController);
    await testController.expect(Selector('#studentFName').value).eql(firstName);
    await testController.click('#student-edit-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const studentEditPage = new StudentEditPage();
