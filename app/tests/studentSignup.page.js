import { Selector } from 'testcafe';

class StudentSignupPage {
  constructor() {
    this.pageId = '#studentSignup';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.wait(2 ** 13).expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new project */
  async addInfo(testController) {
    const firstName = 'Jiminy';
    const lastName = 'Cricket';
    const image = 'https://www.radgrad.org/img/radgrad_logo.png';
    const skill = 'C, JavaScript, React';
    const interest = 'Web Development, Game Development';
    // Define the new project
    await testController.typeText('#studentFirstName', firstName);
    await testController.typeText('#studentLastName', lastName);
    await testController.typeText('#studentImage', image);
    await testController.typeText('#studentSkill', skill);
    await testController.typeText('#studentInterest', interest);

    await testController.click('#studentSubmit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const studentSignupPage = new StudentSignupPage();
