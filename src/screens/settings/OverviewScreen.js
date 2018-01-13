import React, { Component } from 'react';
import { AlertIOS, Button, StyleSheet, View } from 'react-native';

import { EventRegister } from 'react-native-event-listeners';
import realm from '../../realm';
import RateAPI from '../../utils/RateAPI';

export default class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: false,
  };

  /**
   * Constructor
   *
   * @param props
   */
  constructor (props) {
    super(props);

    this.portfolios = realm.objects('Portfolio');
  };

  /**
   * Get rates.
   */
  devGetRates = async () => {
    const t1 = new Date().getTime();

    const allTickers    = this.portfolios.map(portfolio => portfolio.allTickers);
    const uniqueTickers = allTickers.reduce((a, b) => a.concat(b));

    for (const i in uniqueTickers) {
      await RateAPI.fetchRates(uniqueTickers[i], 'EUR');
    }

    const t2 = new Date().getTime();
    AlertIOS.alert(`Exec took ${t2 - t1}ms`);

    EventRegister.emit('tickerUpdate');
  };

  /**
   * Action used to clear the Realm Rates schema in dev mode.
   */
  devClearRates = () => {
    realm.write(() => {
      let allRates = realm.objects('Rate');
      realm.delete(allRates);
    });

    EventRegister.emit('tickerUpdate');
  };

  /**
   * Action used to navigate to the camera screen
   */
  navigateToCameraScreen = () => {
    this.props.navigator.push({
      screen: 'CR.FR.CameraScreen',
    });
  };

  /**
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <Button
        title="Camera Screen"
        onPress={this.navigateToCameraScreen}/>

      <Button
        title="Load API data"
        onPress={this.devGetRates}/>

      <Button
        title="Clear API data"
        onPress={this.devClearRates}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },
});
