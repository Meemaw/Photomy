const galleryCommands = {};

const elements = {};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}`;
  },
  commands: [galleryCommands],
  elements,
};
