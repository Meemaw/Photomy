const navbarCommands = {
  goToSettings() {
    const browser = this.api;
    browser
      .click(elements.dropdown.selector)
      .waitForElementVisible(elements.settingsMenuItem.selector, 200)
      .click(elements.settingsMenuItem.selector)
      .pause(100);

    return this;
  },
};

const elements = {
  dropdown: { selector: 'div.ui.item.dropdown' },
  settingsMenuItem: { selector: 'div.item.SettingsItem' },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}`;
  },
  commands: [navbarCommands],
  elements,
};
