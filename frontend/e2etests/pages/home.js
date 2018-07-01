const homeCommands = {
  testThat() {
    return this;
  },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}`;
  },
  commands: [homeCommands],
  elements: {
    getStartedButton: { selector: 'a.ui.huge.primary.button' },
    registerButton: { selector: "a[href='/auth/register']" },
    loginButton: { selector: "a[href='/auth/login']" },
    homeButton: { selector: "a[href='/']" },
  },
};
