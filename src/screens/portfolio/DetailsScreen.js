import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { RefreshControl, StyleSheet, View, InteractionManager } from 'react-native';
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

    this.state = {
      portfolio: null,
      assets: [],
      lastUpdated: null,
    };

    this.loading = false;
  };

  componentDidMount() {
    // Use InteractionManager to avoid white screen flickering
    InteractionManager.runAfterInteractions(() => {
      let portfolio = realm.objectForPrimaryKey('Portfolio', this.props.portfolioName),
          assets = portfolio.assets.slice();

      // Todo: replace hardcoded EUR for the preference of the user
      assets.sort((a, b) => a.fiatValue('EUR') < b.fiatValue('EUR'));

      this.setState({
        portfolio,
        assets
      });
    });
  }

  /**
   * Update the portfolios.
   */
  updatePortfolio = async () => {
    this.loading = true;
    await RateAPI.updatePortfolios([this.state.portfolio]);
    await EventRegister.emit('ratesUpdate');

    await this.setState({
      ...this.state,
      lastUpdated: new Date()
    });

    this.loading = false;
  };

  /**
   * Render the view.
   */
  render = () => {
    return (
      <View style={styles.container}>
        <ResultComponent
          navigator={this.props.navigator}
          portfolio={this.state.portfolio}
          ref={'ResultComponent'}
        />

        <CardListComponent
          data={this.state.assets}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
