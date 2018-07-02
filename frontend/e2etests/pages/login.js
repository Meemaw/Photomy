const loginCommands = {};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}/login`;
  },
  commands: [loginCommands],
  elements: {
    emailField: { selector: 'input[name="email"]' },
    passwordField: { selector: 'input[name="password"]' },
    submitButton: { selector: 'button[type="submit"]' },
    errorLabel: { selector: 'div.ui.red.pointing.below.basic.label' },
  },
};
