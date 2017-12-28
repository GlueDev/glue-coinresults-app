import React, { Component } from 'react';
import { Button, StyleSheet, View, AlertIOS } from 'react-native';

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
  }

  /**
   * Get rates.
   */
  devGetRates = async () => {
    const t1 = new Date().getTime();
    await RateAPI.fetchRates('BTC', 'EUR');
    await RateAPI.fetchRates('ETH', 'EUR');
    await RateAPI.fetchRates('XRP', 'EUR');
    // await RateAPI.fetchRates('DASH', 'EUR');
    // await RateAPI.fetchRates('XMR', 'EUR');
    // await RateAPI.fetchRates('IOT', 'EUR');
    // await RateAPI.fetchRates('BTG', 'EUR');
    // await RateAPI.fetchRates('NEO', 'EUR');
    // await RateAPI.fetchRates('XLM', 'EUR');
    // await RateAPI.fetchRates('ADA', 'EUR');
    // await RateAPI.fetchRates('PAY', 'EUR');
    // await RateAPI.fetchRates('MAID', 'EUR');
    // await RateAPI.fetchRates('OMG', 'EUR');
    // await RateAPI.fetchRates('POWR', 'EUR');
    const t2 = new Date().getTime();

    AlertIOS.alert(`Exec took ${t2 - t1}ms`);
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
   * Navigate to the details page of a portfolio.
   */
  navigateToDetails = (portfolioName) => {
    this.props.navigator.push({
      screen:    'CR.PF.DetailsScreen',
      passProps: {portfolioName},
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
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item.name}
          navigate={this.navigateToDetails}/>}/>

      <View style={{paddingBottom: 60}}>
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
