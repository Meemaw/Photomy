require('env2')('.env'); // optionally store your environment variables in .env
const seleniumServer = require('selenium-server');
const chromedriver = require('chromedriver');

const config = {
  src_folders: ['./tests'],
  page_objects_path: './pages',
  globals_path: './env',
  selenium: {
    start_process: true,
    server_path: seleniumServer.path,
    log_path: '',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': chromedriver.path,
    },
  },
  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      globals: {
        waitForConditionTimeout: 15000, // wait for content on the page before continuing
      },

      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true,
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
};
module.exports = config;
