import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import CardListComponent from '../../components/portfolio/CardListComponent';
import AssetCardComponent from '../../components/portfolio/AssetCardComponent';
import ResultComponent from '../../components/portfolio/ResultComponent';
import realm from '../../realm';

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
  }

  /**
   * Render the view.
   */
  render = () => (
    <View style={styles.container}>
      <ResultComponent navigator={this.props.navigator}/>

      <CardListComponent
        data={this.portfolio.assets}
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
