const accountSettingsCommands = {
  deleteAccount() {
    this.navigate();
    const browser = this.api;

    browser
      .pause(350)
      .click(elements.editBaseSettingsButton.selector)
      .pause(350)
      .assert.elementPresent(elements.deleteUserButton.selector)
      .click(elements.deleteUserButton.selector)
      .pause(350);

    browser.expect.element(elements.modal.selector).to.be.visible;
    browser.click(elements.confirmDeleteButton.selector).pause(500);
    return this;
  },
};

const elements = {
  editBaseSettingsButton: {
    selector: 'div.BaseSettings > div > div > div > div > button.ui.basic.button',
  },
  deleteUserButton: {
    selector:
      'div.BaseSettings > div.content.active > section > form > div.ui.buttons > button.ui.red.button',
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
