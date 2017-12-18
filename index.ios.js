import Moment from 'moment';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import Realm from 'realm';

import RegisterScreens from './src/screens';
import Stores from './src/stores';
import Provider from './src/utils/Provider';
import realm from './src/realm';

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
    // The first step is to check whether we have a portfolio available.
    const portfolios = realm.objects('Portfolio');
    if (!portfolios) {
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
