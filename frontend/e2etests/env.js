module.exports = {
  get photomy_url() {
    return process.env['PHOTOMY_URL'] || null;
  },
};
