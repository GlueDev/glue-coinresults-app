import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CardListComponent from '../../components/portfolio/CardListComponent';
import MarketCapComponent from '../../components/portfolio/MarketCapComponent';
import PortfolioCardComponent from '../../components/portfolio/PortfolioCardComponent';
import realm from '../../realm';

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
   * Navigate to the details page of a portfolio.
   */
  navigateToDetails = (portfolioName) => {
    this.props.navigator.push({
      screen:    'CR.PF.DetailsScreen',
      passProps: {portfolioName},
    });
  };

  /**
   * Navigate to the settings overview screen
   */
  navigateToSettingsScreen = () => {
    this.props.navigator.push({
      screen:    'CR.ST.OverviewScreen',
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
        lastVisit={519312}
        navigate={this.navigateToSettingsScreen}
        navigateIcon="gear"
      />

      <CardListComponent
        data={this.portfolios}
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item.name}
          navigate={this.navigateToDetails}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },
});
