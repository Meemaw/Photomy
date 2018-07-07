const accountSettingsCommands = {
  deleteAccount() {
    this.navigate();
    const browser = this.api;
    const loginPage = browser.page.login();

    browser
      .waitForElementVisible(elements.editBaseSettingsButton.selector, 10000)
      .pause(350)
      .click(elements.editBaseSettingsButton.selector)
      .pause(350)
      .assert.elementPresent(elements.deleteUserButton.selector)
      .click(elements.deleteUserButton.selector)
      .pause(350);

    browser.expect.element(elements.modal.selector).to.be.visible;
    browser.click(elements.confirmDeleteButton.selector);
    browser.waitForElementVisible(loginPage.elements.emailField.selector, 10000).pause(350);
    return this;
  },
};

const elements = {
  editBaseSettingsButton: {
    selector: 'div.BaseSettings button.ui.basic.button.EditButton',
  },
  deleteUserButton: {
    selector: 'div.BaseSettings button.ui.red.button',
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
