module.exports = {
  tags: ['Gallery'],
  beforeEach: browser => {
    const GLOBALS = browser.globals;
    browser.url(GLOBALS.photomy_url);

    const loginPage = browser.page.login();
    loginPage.navigate();
    loginPage.login();
  },

  'Should switch between gallery types': browser => {
    const navbar = browser.page.navbar();

    const allPhotosSelector = navbar.elements.allPhotos.selector;
    const favoriteGallerySelector = navbar.elements.favoritePhotos.selector;
    const peopleGallerySelector = navbar.elements.peopleGallery.selector;
    const albumsGallerySelector = navbar.elements.albumsGallery.selector;

    browser
      .waitForElementVisible(navbar.elements.galleryTabs.selector, 3000)
      .assert.cssClassPresent(allPhotosSelector, 'active')
      .click(favoriteGallerySelector)
      .assert.cssClassPresent(favoriteGallerySelector, 'active')
      .click(peopleGallerySelector)
      .assert.cssClassPresent(peopleGallerySelector, 'active')
      .click(albumsGallerySelector)
      .assert.cssClassPresent(albumsGallerySelector, 'active');

    browser.end();
  },

  'Should display todays section': browser => {
    const sectionTodaySelector = '#Section-Today';

    browser
      .waitForElementVisible(sectionTodaySelector, 3000)
      .assert.containsText('#Section-Today > .Section-Header > div.column > span', 'Today')
      .assert.containsText('.FooterInfo > div', '3 Images in Gallery');

    browser.end();
  },
};
