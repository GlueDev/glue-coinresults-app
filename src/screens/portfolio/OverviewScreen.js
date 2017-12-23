import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';

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
   * Define the component's state.
   *
   * @param props
   */
  constructor (props) {
    super(props);

    this.portfolios = realm.objects('Portfolio');
    this.portfolios.addListener(() => this.forceUpdate());
  }

  /**
   * Remove listeners.
   */
  componentWillUnmount () {
    realm.removeAllListeners();
  }

  /**
   * Navigate to the details page of a portfolio.
   */
  _navigateToDetails = () => {
    console.log('clicked');
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

      <ScrollView style={styles.scrollView}>
        <FlatList
          style={styles.flatList}
          data={this.portfolios}
          renderItem={({item}) => <PortfolioCardComponent
            portfolio={item.name}
            navigate={() => this._navigateToDetails()}/>}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },

  scrollView: {
    marginTop: -40,
  },

  flatList: {
    paddingBottom: 40,
  },
});
