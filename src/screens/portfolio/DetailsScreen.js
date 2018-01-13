import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import AssetCardComponent from '../../components/portfolio/AssetCardComponent';
import CardListComponent from '../../components/portfolio/CardListComponent';
import ResultComponent from '../../components/portfolio/ResultComponent';
import realm from '../../realm';
import RateAPI from '../../utils/RateAPI';

export default class DetailsScreen extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Grab the portfolio.
   */
  constructor (props) {
    super(props);

    this.portfolio = realm.objectForPrimaryKey('Portfolio', this.props.portfolioName);

    // Sort the assets based on fiatValue
    // Todo: replace hardcoded EUR for the preference of the user
    let assets = this.portfolio.assets.slice();
    assets.sort((a, b) => a.fiatValue('EUR') < b.fiatValue('EUR'));

    this.assets  = assets;
    this.loading = false;
  }

  /**
   * Update the portfolios.
   */
  updatePortfolio = async () => {
    this.loading = true;
    await RateAPI.updatePortfolios(this.portfolios);
    this.loading = false;
    EventRegister.emit('tickerUpdate');
  };

  /**
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <ResultComponent
        navigator={this.props.navigator}
        portfolio={this.portfolio}
      />

      <CardListComponent
        data={this.assets}
        refreshControl={<RefreshControl
          tintColor={'#FFFFFF'}
          refreshing={this.loading}
          onRefresh={this.updatePortfolio}/>}
        renderItem={({item}) => <AssetCardComponent
          portfolioName={this.props.portfolioName}
          ticker={item.ticker}/>}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
