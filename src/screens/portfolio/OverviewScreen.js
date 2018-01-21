import CardListComponent from 'components/portfolio/CardListComponent';
import MarketCapComponent from 'components/portfolio/MarketCapComponent';
import PortfolioCardComponent from 'components/portfolio/PortfolioCardComponent';
import React, { Component } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import realm from 'realm';
import RateAPI from 'utils/RateAPI';

export default class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Create the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      portfolios: [],
      loading:    false,
    };
  }

  /**
   * Fill the store.
   */
  componentDidMount () {
    this.setState({portfolios: realm.objects('Portfolio')});
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
      screen: 'CR.ST.OverviewScreen',
    });
  };

  /**
   * Update the portfolios.
   */
  updatePortfolios = async () => {
    this.setState({loading: true});
    await RateAPI.refreshData(this.state.portfolios);
    this.setState({loading: false});
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
        data={this.state.portfolios}
        refreshControl={<RefreshControl
          tintColor={'#FFFFFF'}
          refreshing={this.state.loading}
          onRefresh={this.updatePortfolios}/>}
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
