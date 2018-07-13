const registerCommands = {
  assertInputFieldsPresent() {
    const browser = this.api;
    browser.waitForElementVisible(elements.passwordField.selector, 3000).pause(150);
    browser.assert.elementPresent(elements.emailField.selector);
    browser.assert.elementPresent(elements.passwordField.selector);
    browser.assert.elementPresent(elements.tocCheckbox.selector);

    return this;
  },

  setEmailField(email) {
    const browser = this.api;
    browser.clearValue(elements.emailField.selector).setValue(elements.emailField.selector, email);
    return this;
  },

  setPasswordField(password) {
    const browser = this.api;
    browser
      .clearValue(elements.passwordField.selector)
      .setValue(elements.passwordField.selector, password);
    return this;
  },

  submit() {
    const browser = this.api;
    browser.click(elements.registerButton.selector).pause(1000);
    return this;
  },

  checkToc() {
    const browser = this.api;
    browser.click(elements.tocCheckbox.selector);
    return this;
  },
};

const elements = {
  emailField: { selector: 'input[name="email"]' },
  passwordField: { selector: 'input[name="password1"]' },
  tocCheckbox: { selector: 'div.ui.checkbox' },
  registerButton: { selector: 'button.ui.large.fluid.button' },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}/auth/register`;
  },
  commands: [registerCommands],
  elements,
};
