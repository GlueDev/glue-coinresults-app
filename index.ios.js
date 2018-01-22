import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';
import RateAPI from './src/utils/RateAPI';
import realm from './src/realm';
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
    // Echo the realm path to console
    if (__DEV__) {
      console.info(`DEBUG: Realm path at ${realm.path}`);
    }

    // Grab data from realm.
    const [portfolios, tickers] = [realm.objects('Portfolio'), realm.objects('Ticker')];

    // Make sure we insert the tickers in to realm if necessary.
    if (!tickers.length) {
      try {
        const tickerList = require('./src/Tickers');
        realm.write(() => {
          tickerList.forEach(ticker => realm.create('Ticker', {
            ticker: ticker.ticker,
            name:   ticker.name,
            color:  ticker.color,
          }));
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (!portfolios.length) {
      return this.setNavigationStack('CR.FR.ExplanationScreen');
    }

    // Refresh data.
    await RateAPI.refreshData(portfolios);

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
