module.exports = {
  tags: ['Account settings'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);
  },

  'Test delete': browser => {
    const accountSettingsPage = browser.page.accountSettings();
    const loginPage = browser.page.login();
    loginPage.navigate();
    loginPage.login('test_delete@gmail.com', 'testdelete').assertLoginSucceded();

    accountSettingsPage.navigate();

    const deleteSelector = accountSettingsPage.elements.deleteUserButton.selector;
    const baseSettingEditSelector = accountSettingsPage.elements.editBaseSettingsButton.selector;

    browser
      .waitForElementVisible(baseSettingEditSelector, 3000)
      .assert.elementNotPresent(deleteSelector);

    accountSettingsPage.deleteAccount();

    loginPage.login('test_delete@gmail.com', 'testdelete').assertLoginFailed();

    browser.end();
  },
};
