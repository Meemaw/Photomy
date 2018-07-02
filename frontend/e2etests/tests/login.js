module.exports = {
  tags: ['Login'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test login': browser => {
    const loginPage = browser.page.login();
    loginPage.navigate();

    browser
      .waitForElementVisible(loginPage.elements.emailField.selector, 30000)
      .assert.elementPresent(loginPage.elements.submitButton.selector)
      .click(loginPage.elements.submitButton.selector)
      .pause(100);

    browser.assert.containsText(loginPage.elements.errorLabel.selector, 'Required');

    browser
      .setValue(loginPage.elements.emailField.selector, 'test_user1@gmail.com')
      .setValue(loginPage.elements.passwordField.selector, 'short')
      .click(loginPage.elements.submitButton.selector);

    browser.assert
      .containsText(
        loginPage.elements.errorLabel.selector,
        'Password length must be atleast 8 characters',
      )
      .clearValue(loginPage.elements.passwordField.selector);

    browser
      .setValue(loginPage.elements.passwordField.selector, 'wrongpassword123')
      .click(loginPage.elements.submitButton.selector)
      .pause(500);

    browser.assert.containsText(
      'div.ui.icon.negative.message > div.content > div.header',
      'Something went wrong',
    );

    browser.assert
      .containsText(
        'div.ui.icon.negative.message > div.content > ul.list > li.content',
        'Your email or password was entered incorrectly.',
      )
      .clearValue(loginPage.elements.passwordField.selector)
      .pause(100)
      .setValue(loginPage.elements.passwordField.selector, 'test12345')
      .click(loginPage.elements.submitButton.selector);

    browser.waitForElementVisible('section.MainContent', 1000);

    browser.end();
  },
};
