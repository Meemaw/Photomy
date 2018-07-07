const loginCommands = {
  login(email = 'test_user1@gmail.com', password = 'test12345') {
    const browser = this.api;

    browser
      .clearValue(elements.emailField.selector)
      .setValue(elements.emailField.selector, email)
      .clearValue(elements.passwordField.selector)
      .setValue(elements.passwordField.selector, password)
      .click(elements.submitButton.selector)
      .pause(200);

    return this;
  },

  assertLoginSucceded() {
    const browser = this.api;
    browser.waitForElementVisible('section.MainContent', 3000);
    browser.pause(100);
    return this;
  },

  assertLoginFailed(errorMessage = 'Your email or password was entered incorrectly.') {
    const browser = this.api;
    browser.assert.containsText(
      'div.ui.icon.negative.message > div.content > div.header',
      'Something went wrong',
    );

    browser.assert.containsText(
      'div.ui.icon.negative.message > div.content > ul.list > li.content',
      errorMessage,
    );

    return this;
  },
};

const elements = {
  emailField: { selector: 'input[name="email"]' },
  passwordField: { selector: 'input[name="password"]' },
  submitButton: { selector: 'button[type="submit"]' },
  errorLabel: { selector: 'div.ui.red.pointing.below.basic.label' },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}/login`;
  },
  commands: [loginCommands],
  elements,
};
