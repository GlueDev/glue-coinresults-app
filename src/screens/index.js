import { Navigation } from 'react-native-navigation';
import AssetsOverviewScreen from './firstrun/assets/OverviewScreen';
import SetAssetAmountScreen from './firstrun/assets/SetAmountScreen';

import SetTickerScreen from './firstrun/assets/SetTickerScreen';
import ExplanationScreen from './firstrun/ExplanationScreen';
import SetInvestmentScreen from './firstrun/investments/SetAmountScreen';
import AddPortfolioScreen from './firstrun/portfolio/AddScreen';
import DetailsScreen from './portfolio/DetailsScreen';

import OverviewScreen from './portfolio/OverviewScreen';

export default function registerScreens (Store: {}, Provider: {}) {
  /**
   * Portfolio screens.
   */
  Navigation.registerComponent('CR.PF.OverviewScreen', () => OverviewScreen, Store, Provider);
  Navigation.registerComponent('CR.PF.DetailsScreen', () => DetailsScreen, Store, Provider);

  /**
   * First run screens.
   */
  Navigation.registerComponent('CR.FR.ExplanationScreen', () => ExplanationScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.Portfolio.AddScreen', () => AddPortfolioScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.Assets.OverviewScreen', () => AssetsOverviewScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.Assets.SetTickerScreen', () => SetTickerScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.Assets.SetAmountScreen', () => SetAssetAmountScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.Investments.SetAmountScreen', () => SetInvestmentScreen, Store, Provider);
}
