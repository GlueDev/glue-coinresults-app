import { Navigation } from 'react-native-navigation';

import ExplanationScreen from './firstrun/ExplanationScreen';
import AssetsOverviewScreen from './firstrun/AssetsOverviewScreen';
import AssetsAddScreen from './firstrun/AssetsAddScreen';

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
  Navigation.registerComponent('CR.FR.AssetsOverviewScreen', () => AssetsOverviewScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.AssetsAddScreen', () => AssetsAddScreen, Store, Provider);
}
