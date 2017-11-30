import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation';

import RegisterScreens from './src/screens';

/**
 * Register screens.
 */
RegisterScreens();

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
