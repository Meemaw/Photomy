module.exports = {
  tags: ['Home'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test auth buttons': browser => {
    const homePage = browser.page.home();
    homePage.navigate();

    browser
      .waitForElementVisible(homePage.elements.getStartedButton.selector, 30000)
      .assert.cssClassNotPresent('body', 'Oveflow-Hidden')
      .assert.containsText(homePage.elements.registerButton.selector, 'Sign Up')
      .assert.containsText(homePage.elements.loginButton.selector, 'Log in')
      .assert.containsText(homePage.elements.homeButton.selector, 'Photomy')
      .assert.containsText(homePage.elements.getStartedButton.selector, 'Get Started');

    browser.click(homePage.elements.getStartedButton.selector).pause(100);

    const registerPage = browser.page.register();
    registerPage.inputFieldsPresent();

    browser.assert
      .cssClassPresent('body', 'Oveflow-Hidden')
      .click(homePage.elements.homeButton.selector)
      .pause(100);

    browser.click(homePage.elements.registerButton.selector).pause(1000);
    registerPage.inputFieldsPresent();

    browser.end();
  },

  'Test auth buttons hamburger menu': browser => {
    browser.resizeWindow(800, 600);

    const homePage = browser.page.home();
    homePage.navigate();

    browser.waitForElementVisible(homePage.elements.getStartedButton.selector, 30000);

    browser.expect.element(homePage.elements.loginButton.selector).to.not.be.visible;
    browser.expect.element(homePage.elements.registerButton.selector).to.not.be.visible;

    browser.click('div.right.menu > a.item').pause(100);

    browser.expect.element(homePage.elements.loginButton.selector).to.be.visible;
    browser.expect.element(homePage.elements.registerButton.selector).to.be.visible;

    browser.end();
  },
};
