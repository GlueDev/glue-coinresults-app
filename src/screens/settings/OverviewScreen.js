import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import realm from 'realm';

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
   * Action used to clear the Realm Rates schema in dev mode.
   */
  devClearRates = () => {
    realm.write(() => {
      let allRates = realm.objects('Rate');
      realm.delete(allRates);
    });
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
