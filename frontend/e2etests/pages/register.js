const registerCommands = {
  checkForFields() {
    if (this.api) {
      const browser = this.api;
      browser.assert.elementPresent(elements.emailField.selector);
      browser.assert.elementPresent(elements.passwordField.selector);
      browser.assert.elementPresent(elements.tocCheckbox.selector);
    }

    return this;
  },
};

const elements = {
  emailField: { selector: 'input[name="email"]' },
  passwordField: { selector: 'input[name="password1"]' },
  tocCheckbox: { selector: 'div.ui.checkbox' },
};

module.exports = {
  url: '/register',
  commands: [registerCommands],
  elements,
};
