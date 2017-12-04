import { Navigation } from 'react-native-navigation';

import ExplanationScreen from './firstrun/ExplanationScreen';
import PortfolioScreen from './firstrun/PortfolioScreen';
import AssetsScreen from './firstrun/AssetsScreen';
import AddTickerScreen from './firstrun/AddTickerScreen';
import SetAmountScreen from './firstrun/SetAmountScreen';

import OverviewScreen from './portfolio/OverviewScreen';

export default function registerScreens (Store: {}, Provider: {}) {
  /**
   * Portfolio screens.
   */
  Navigation.registerComponent('CR.PF.OverviewScreen', () => OverviewScreen, Store, Provider);

  /**
   * First run screens.
   */
  Navigation.registerComponent('CR.FR.ExplanationScreen', () => ExplanationScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.PortfolioScreen', () => PortfolioScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.AssetsScreen', () => AssetsScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.AddTickerScreen', () => AddTickerScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.SetAmountScreen', () => SetAmountScreen, Store, Provider);
}
