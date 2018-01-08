import React, { Component } from 'react';
import { AlertIOS, Button, StyleSheet, View, RefreshControl } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import CardListComponent from '../../components/portfolio/CardListComponent';
import MarketCapComponent from '../../components/portfolio/MarketCapComponent';
import PortfolioCardComponent from '../../components/portfolio/PortfolioCardComponent';
import realm from '../../realm';
import RateAPI from '../../utils/RateAPI';

export default class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Grab all portfolios.
   */
  constructor (props) {
    super(props);

    this.portfolios = realm.objects('Portfolio');
    this.loading    = false;
  }

  /**
   * Get rates.
   */
  devGetRates = async () => {
    const t1 = new Date().getTime();

    const allTickers    = this.portfolios.map(portfolio => portfolio.allTickers);
    const uniqueTickers = allTickers.reduce((a, b) => a.concat(b));

    try {
      this.loading = true;
      for (const i in uniqueTickers) {
        await RateAPI.fetchRates(uniqueTickers[i], 'EUR');
      }

      const t2 = new Date().getTime();
      console.info(`Exec took ${t2 - t1}ms`);

      EventRegister.emit('tickerUpdate');
      this.loading = false;
    } catch (error) {
      this.loading = false;
      AlertIOS.alert('Unable to connect to the API.');
    }
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
   * Navigate to the details page of a portfolio.
   */
  navigateToDetails = (portfolioName) => {
    this.props.navigator.push({
      screen:    'CR.PF.DetailsScreen',
      passProps: {portfolioName},
    });
  };

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
      <MarketCapComponent
        marketCap={500}
        btcDominance={63.56}
        lastVisit={519312}/>

      <CardListComponent
        data={this.portfolios}
        refreshControl={<RefreshControl
          tintColor={'#FFFFFF'}
          refreshing={this.loading}
          onRefresh={this.devGetRates}/>}
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item.name}
          navigate={this.navigateToDetails}/>}/>

      <View style={{paddingBottom: 60}}>

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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },
});
