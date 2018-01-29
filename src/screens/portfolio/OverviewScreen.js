import CardListComponent from 'components/portfolio/CardListComponent';
import MarketCapComponent from 'components/portfolio/MarketCapComponent';
import PortfolioCardComponent from 'components/portfolio/PortfolioCardComponent';
import liveRatesQuery from 'graphql/query/liveRates.graphql';
import liveRatesSubscription from 'graphql/subscription/liveRates.graphql';
import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { StyleSheet, Text, View } from 'react-native';

class OverviewScreen extends Component {
  componentWillReceiveProps (props) {
    console.log(props);
    props.subscribeToLiveRate();
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
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <MarketCapComponent
        marketData={{}}
        navigate={this.navigateToSettingsScreen}
        navigateIcon="gear"
      />

      <Text>{this.props.data.assets ? this.props.data.assets[0].ticker : ''}</Text>
      <Text>{this.props.data.assets ? this.props.data.assets[0].pair : ''}</Text>
      <Text>{this.props.data.assets ? this.props.data.assets[0].value : ''}</Text>

      <CardListComponent
        data={this.props.portfolios}
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item}
          navigate={this.navigateToDetails}/>}/>
    </View>
  );
}

export default graphql(liveRatesQuery, {
  options: {
    variables: {
      pairs: ['XRPEUR', 'XRPBTC', 'XRPUSD', 'ETHEUR', 'ETHUSD'],
    },
  },

  props: props => ({
    ...props,
    subscribeToLiveRate: () => {
      props.data.subscribeToMore({
        document:    liveRatesSubscription,
        variables:   props.data.variables,
        updateQuery: (prev, {subscriptionData}) => {
          if (!subscriptionData.data) {
            return prev;
          }

          console.log(prev, subscriptionData.data);
        },
      });
    },
  }),
})(OverviewScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F7F6FB',
    flex:            1,
  },
});
