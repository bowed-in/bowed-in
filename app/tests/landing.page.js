import { Selector } from 'testcafe';

class LandingPage {
  constructor() {
    this.pageId = '#landing-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    // This is first test to be run. Wait 10 seconds to avoid timeouts with GitHub Actions.
    await testController.wait(60000).expect(this.pageSelector.exists).ok();
  }

  async aboutBowedInTest(testController) {
    await testController.click('#about');
  }

  async aboutBowedInTeam(testController) {
    await testController.click('#team');
  }
}

export const landingPage = new LandingPage();
