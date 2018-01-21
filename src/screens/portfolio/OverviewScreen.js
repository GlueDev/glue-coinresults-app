import CardListComponent from 'components/portfolio/CardListComponent';
import MarketCapComponent from 'components/portfolio/MarketCapComponent';
import PortfolioCardComponent from 'components/portfolio/PortfolioCardComponent';
import React, { Component } from 'react';
import { AlertIOS, RefreshControl, StyleSheet, View } from 'react-native';
import { connectRealm } from 'react-native-realm';
import RateAPI from 'utils/RateAPI';

class OverviewScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      loading:    false,
      portfolios: props.portfolios,
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    this.setState({portfolios: props.portfolios});
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
        marketData={this.props.marketData}
        navigate={this.navigateToSettingsScreen}
        navigateIcon="gear"
      />

      <CardListComponent
        data={this.props.portfolios}
        refreshControl={<RefreshControl
          tintColor={'#FFFFFF'}
          refreshing={this.state.loading}
          onRefresh={this.updatePortfolios}/>}
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item}
          navigate={this.navigateToDetails}/>}/>
    </View>
  );
}

export default connectRealm(OverviewScreen, {
  schemas:    ['Portfolio', 'MarketData', 'Rate'],
  mapToProps: (results, realm, ownProps) => ({
    realm,
    portfolios: results.portfolios,
    marketData: results.marketData,
  }),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },
});
