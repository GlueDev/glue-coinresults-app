import React from 'react';
import { Navigation } from 'react-native-navigation';
import ApolloHoC from 'graphql';
import AssetsOverviewScreen from './firstrun/assets/OverviewScreen';
import SetAssetAmountScreen from './firstrun/assets/SetAmountScreen';
import SetTickerScreen from './firstrun/assets/SetTickerScreen';
import CameraScreen from './firstrun/CameraScreen';
import ExplanationScreen from './firstrun/ExplanationScreen';
import SetInvestmentScreen from './firstrun/investments/SetAmountScreen';
import AddPortfolioScreen from './firstrun/portfolio/AddScreen';
import DetailsScreen from './portfolio/DetailsScreen';
import OverviewScreen from './portfolio/OverviewScreen';
import SettingsOverviewScreen from './settings/OverviewScreen';

export default function registerScreens () {
  /**
   * Portfolio screens.
   */
  Navigation.registerComponent('CR.PF.OverviewScreen', () => ApolloHoC(OverviewScreen));
  Navigation.registerComponent('CR.PF.DetailsScreen', () => DetailsScreen);

  /**
   * First run screens.
   */
  Navigation.registerComponent('CR.FR.ExplanationScreen', () => ExplanationScreen);
  Navigation.registerComponent('CR.FR.Portfolio.AddScreen', () => AddPortfolioScreen);
  Navigation.registerComponent('CR.FR.Assets.OverviewScreen', () => AssetsOverviewScreen);
  Navigation.registerComponent('CR.FR.Assets.SetTickerScreen', () => SetTickerScreen);
  Navigation.registerComponent('CR.FR.Assets.SetAmountScreen', () => SetAssetAmountScreen);
  Navigation.registerComponent('CR.FR.Investments.SetAmountScreen', () => SetInvestmentScreen);
  Navigation.registerComponent('CR.FR.CameraScreen', () => CameraScreen);

  /**
   * Settings screens
   */
  Navigation.registerComponent('CR.ST.OverviewScreen', () => SettingsOverviewScreen);
}
