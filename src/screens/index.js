import { Navigation } from 'react-native-navigation';

import HelloWorldScreen from './HelloWorldScreen';

export default function registerScreens (Store: {}, Provider: {}) {
  Navigation.registerComponent('CR.HelloWorldScreen', () => HelloWorldScreen, Store, Provider);
}
