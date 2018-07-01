module.exports = {
  tags: ['Home'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test auth buttons': browser => {
    const homePage = browser.page.home();
    homePage.navigate();

    // TODO href selectors
    browser
      .waitForElementVisible(homePage.elements.getStartedButton.selector, 30000)
      .assert.containsText(homePage.elements.getStartedButton.selector, 'Get Started');

    browser.click(homePage.elements.getStartedButton.selector).pause(1000);

    const registerPage = browser.page.register();
    registerPage.checkForFields();

    browser.click(homePage.elements.homeButton.selector).pause(1000);

    browser.click(homePage.elements.registerButton.selector).pause(1000);
    registerPage.checkForFields();
  },
};
