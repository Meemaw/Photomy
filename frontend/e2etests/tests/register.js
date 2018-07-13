module.exports = {
  tags: ['Register'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test register': browser => {
    const registerPage = browser.page.register();
    const loginPage = browser.page.login();
    const accountSettingsPage = browser.page.accountSettings();

    registerPage.navigate().assertInputFieldsPresent();

    registerPage
      .setEmailField('test-register@gmail.com')
      .setPasswordField('password12345')
      .checkToc()
      .submit();

    browser.assert.containsText(
      'div.ui.positive.message > div.content > p',
      'E-mail with verification instructions has been sent to you',
    );

    loginPage.login('test-register@gmail.com', 'password12345').assertLoginSucceded();
    browser.waitForElementVisible('section.MainContent', 1000);

    accountSettingsPage.deleteAccount();

    browser.end();
  },

  'Test register alredy used email': browser => {
    const registerPage = browser.page.register();
    registerPage.navigate().assertInputFieldsPresent();
    registerPage
      .setEmailField('test_user1@gmail.com')
      .setPasswordField('password12345')
      .checkToc()
      .submit();

    browser.assert.containsText(
      'div.ui.red.pointing.below.basic.label',
      'A user is already registered with this e-mail address.',
    );

    browser.end();
  },
};
