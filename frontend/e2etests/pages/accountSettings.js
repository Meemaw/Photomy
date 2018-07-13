const accountSettingsCommands = {
  deleteAccount() {
    const browser = this.api;

    browser
      .waitForElementVisible(elements.sideMenu.selector, 3000)
      .click(elements.editBaseSettingsButton.selector)
      .pause(350)
      .assert.elementPresent(elements.deleteUserButton.selector)
      .click(elements.deleteUserButton.selector)
      .pause(350);

    browser.expect.element(elements.modal.selector).to.be.visible;
    browser.click(elements.confirmDeleteButton.selector);
    const loginPage = browser.page.login();
    browser.waitForElementVisible(loginPage.elements.emailField.selector, 3000).pause(350);
    return this;
  },
};

const elements = {
  editBaseSettingsButton: {
    selector: '#Base-Settings-Edit',
  },
  deleteUserButton: {
    selector: 'div.BaseSettings button.ui.red.button',
  },

  sideMenu: {
    selector: 'div.ui.vertical.menu.SettingsSideMenu',
  },

  modal: {
    selector: 'div.ui.modal.visible.active',
  },

  confirmDeleteButton: {
    selector: 'div.actions > button.ui.red.button',
  },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}/settings?tab=account`;
  },
  commands: [accountSettingsCommands],
  elements,
};
