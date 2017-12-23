import ccxt from 'ccxt';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import realm from './src/realm';
import RegisterScreens from './src/screens';

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
  static startApp () {
    // Echo the realm path to console
    if (__DEV__) {
      console.info(`DEBUG: Realm path at ${realm.path}`);
    }

    // Grab data from realm.
    const [portfolios, tickers] = [realm.objects('Portfolio'), realm.objects('Ticker')];

    // Make sure we have the top 100 tickers in Realm.
    if (!tickers.length) {
      try {
        let cmc = new ccxt.coinmarketcap();
        cmc.publicGetTicker().then(tickers => {
          tickers.forEach(ticker => realm.write(() => realm.create('Ticker', {
            name:   ticker.name,
            ticker: ticker.symbol,
            color:  '#000000',
          })));
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (!portfolios.length) {
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
