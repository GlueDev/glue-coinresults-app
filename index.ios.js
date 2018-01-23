import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import RegisterScreens from 'screens';

/**
 * Register screens.
 */
RegisterScreens();

/**
 * Start the CoinResults app.
 */
class CoinResults extends Component {
  /**
   * Determine which screen to show.
   */
  static async startApp () {
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
