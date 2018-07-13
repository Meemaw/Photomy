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

  toAllPhotos() {
    const browser = this.api;
    browser.click(elements.allPhotos.selector);
    return this;
  },

  toFavoritePhotos() {
    const browser = this.api;
    browser.click(elements.favoritePhotos.selector);
    return this;
  },
  toPeopleGallery() {
    const browser = this.api;
    browser.click(elements.peopleGallery.selector);
    return this;
  },

  toAlbumsGallery() {
    const browser = this.api;
    browser.click(elements.albumsGallery.selector);
    return this;
  },
};

const elements = {
  dropdown: { selector: 'div.ui.item.dropdown' },
  settingsMenuItem: { selector: 'div.item.SettingsItem' },
  galleryTabs: { selector: 'div.GalleryTabs' },
  allPhotos: { selector: '#ALL_PHOTOS-Tab' },
  favoritePhotos: { selector: '#FAVORITE_GALLERY-Tab' },
  peopleGallery: { selector: '#PEOPLE_GALLERY-Tab' },
  albumsGallery: { selector: '#ALBUM_GALLERY-Tab' },
};

module.exports = {
  url() {
    return `${this.api.globals.photomy_url}`;
  },
  commands: [navbarCommands],
  elements,
};
