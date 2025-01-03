const Background = {
  menuItemID: 'disable',

  /**
   * @returns {Promise<void>}
   */
  main: async function() {
    if (!browser.menus.onClicked.hasListener(Background._onMenuItemClicked)) {
      browser.menus.onClicked.addListener(Background._onMenuItemClicked);
    }

    if (!browser.menus.onShown.hasListener(Background._onMenuShown)) {
      browser.menus.onShown.addListener(Background._onMenuShown);
    }

    browser.menus.removeAll();
    browser.menus.create({
      id: Background.menuItemID,
      contexts: ['tab'],
      title: 'Disable this tab',
      icons: {
        48: '/res/icons/48.png',
      },
    });
  },

  /**
   * @param {BrowserOnClickData} info
   * @param {BrowserTab} tab
   * @returns {Promise<void>}
   */
  _onMenuItemClicked: async function(info, tab) {
    if (info.menuItemId === Background.menuItemID) {
      await browser.tabs.discard(tab.id);
    }
  },

  /**
   * @param {BrowserOnMenuShownData} info
   * @param {BrowserTab} tab
   * @returns {Promise<void>}
   */
  _onMenuShown: async function(info, tab) {
    await browser.menus.update(Background.menuItemID, {visible: !tab.active});
    await browser.menus.refresh();
  },
};

Background.main();