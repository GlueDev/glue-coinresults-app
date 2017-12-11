import Moment from 'moment';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import RegisterScreens from './src/screens';
import Stores from './src/stores';
import { loadStore, saveStore, clearStores } from './src/utils/iCloud';
import Provider from './src/utils/Provider';

/**
 * Register screens.
 */
RegisterScreens(Stores, Provider);

/**
 * Start the CoinResults app.
 */
class CoinResults extends Component {
  /**
   * Determine which screen to show.
   */
  static async startApp () {
    const firstRun = await loadStore('firstRun');

    // First we will let iCloud know that we have opened the app.
    // Then we will show the first run screens.
    // if (true) {
    if (!firstRun) {
      // Clear all iCloud stores, just in case something went wrong before.
      // await clearStores();

      await saveStore('firstRun', {date: Moment.now()});
      return this.setNavigationStack('CR.FR.ExplanationScreen');
    }

    // Show the overview screen.
    return this.setNavigationStack('CR.PF.OverviewScreen');
  }

  /**
   * Start the navigation stack.
   *
   * @param {string} screen
   */
  static setNavigationStack (screen) {
    Navigation.startSingleScreenApp({
      screen: {screen},
    });
  }
}

CoinResults.startApp();
