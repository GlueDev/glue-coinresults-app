import { Navigation } from 'react-native-navigation';
import ExplanationScreen from './firstrun/ExplanationScreen';

import OverviewScreen from './portfolio/OverviewScreen';

export default function registerScreens (Store: {}, Provider: {}) {
  Navigation.registerComponent('CR.PF.OverviewScreen', () => OverviewScreen, Store, Provider);
  Navigation.registerComponent('CR.FR.ExplanationScreen', () => ExplanationScreen, Store, Provider);
}
