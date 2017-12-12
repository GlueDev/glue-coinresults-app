import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { FlatList, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';

import MarketCapComponent from '../../components/portfolio/MarketCapComponent';
import PortfolioCardComponent from '../../components/portfolio/PortfolioCardComponent';

@inject('user', 'cryptos') @observer
export default class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Set the default state.
   */
  constructor (props) {
    super(props);

    this.state = {refreshing: false};
  }

  /**
   * Grab up to date rates.
   */
  componentWillMount () {
    this.loadData();
  }

  /**
   * Load the most recent data.
   *
   * @returns {Promise.<void>}
   */
  async loadData () {
    await this.props.cryptos.getMarketCap();
    this.state.refreshing = false;
  }

  /**
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <MarketCapComponent
        marketCap={this.props.cryptos.marketCap.total}
        btcDominance={this.props.cryptos.marketCap.btcDominance}
        lastVisit={519312}/>

      <ScrollView
        style={styles.scrollView}
        contentInset={{top: this.state.refreshing ? 30 : 0}}
        refreshControl={<RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.loadData.bind(this)}
          tintColor={'rgba(0, 0, 0, 0.25)'}/>}>
        <FlatList
          style={styles.flatList}
          data={this.props.cryptos.portfolios}
          renderItem={({item}) => <PortfolioCardComponent
            portfolio={item}
            navigator={this.props.navigator}/>}
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
