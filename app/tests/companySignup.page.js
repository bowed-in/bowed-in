import { Selector } from 'testcafe';

class CompanySignupPage {
  constructor() {
    this.pageId = '#companySignup';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(10000).expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addInfo(testController) {
    await this.isDisplayed(testController);
    const companyName = 'company';
    const image = 'https://www.radgrad.org/img/radgrad_logo.png';
    const location = 'Honolulu';
    const interest = 'Web Development, Game Development';
    const description = 'We love UH Manoa graduates!';
    // Define the new project
    await testController.typeText('#companyName', companyName);
    await testController.typeText('#companyImage', image);
    await testController.typeText('#companyLocation', location);
    await testController.typeText('#companyInterest', interest);
    await testController.typeText('#companyDescription', description);

    await testController.click('#companySubmit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const companySignupPage = new CompanySignupPage();
