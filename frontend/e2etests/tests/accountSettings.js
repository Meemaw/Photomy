module.exports = {
  tags: ['Account settings'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test delete': browser => {
    const accountSettingsPage = browser.page.accountSettings();
    const loginPage = browser.page.login();
    const navbar = browser.page.navbar();
    loginPage.navigate();
    loginPage.login('test_delete@gmail.com', 'testdelete').assertLoginSucceded();

    navbar.goToSettings();
    accountSettingsPage.deleteAccount();

    loginPage.login('test_delete@gmail.com', 'testdelete').assertLoginFailed();

    browser.end();
  },
};
