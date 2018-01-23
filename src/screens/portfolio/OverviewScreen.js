import CardListComponent from 'components/portfolio/CardListComponent';
import MarketCapComponent from 'components/portfolio/MarketCapComponent';
import PortfolioCardComponent from 'components/portfolio/PortfolioCardComponent';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

export default class OverviewScreen extends Component {
  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      loading:    false,
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentDidMount () {
    console.log(this.props);
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

      <CardListComponent
        data={this.props.portfolios}
        renderItem={({item}) => <PortfolioCardComponent
          portfolio={item}
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
