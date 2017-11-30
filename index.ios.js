import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import RegisterScreens from './src/screens';
import Stores from './src/stores';
import Provider from './src/utils/Provider';

/**
 * Register screens.
 */
RegisterScreens(Stores, Provider);

/**
 * Start the CoinResults app.
 */
class CoinResults extends Component {
  static startApp () {
    const navigatorStyle = {
      navBarHidden:             true,
      statusBarTextColorScheme: 'light',
    };

    Navigation.startSingleScreenApp({
      screen: {
        screen: 'CR.HelloWorldScreen',
        navigatorStyle,
      },
    });
  }
}

CoinResults.startApp();
