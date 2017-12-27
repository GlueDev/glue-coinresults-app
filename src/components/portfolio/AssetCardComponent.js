import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import realm from '../../realm';
import Finance from '../../utils/Finance';

import CardComponent from '../ui/CardComponent';
import AssetGraphComponent from './AssetGraphComponent';

export default class AssetCardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolioName: PropTypes.string.isRequired,
    ticker:        PropTypes.string.isRequired,
  };

  /**
   * Find the portfolio and asset.
   */
  constructor (props) {
    super(props);

    this.portfolio = realm.objectForPrimaryKey('Portfolio', this.props.portfolioName);
    this.asset     = this.portfolio.assets.filtered('ticker = $0', this.props.ticker)[0];
    this.ticker    = realm.objectForPrimaryKey('Ticker', this.props.ticker);
  }

  /**
   * Render the view.
   */
  render = () => (
    <CardComponent>
      <AssetGraphComponent
        dataPoints={this.ticker.rates.rate}
        color={this.ticker.color}/>

      <View style={styles.container}>
        <Text style={[styles.assetName, {color: this.ticker.color}]}>{this.ticker.name}</Text>

        <View style={styles.assetValueContainer}>
          <Text style={[styles.assetValueInFIAT, {color: this.ticker.color}]}>
            {Finance.formatFIAT(this.asset.fiatValue('EUR'), 'EUR')}
          </Text>

          <Text style={[styles.assetValueInCrypto, {color: this.ticker.color}]}>
            ({Finance.formatCrypto(this.asset.amount)} {this.asset.ticker})
          </Text>
        </View>
      </View>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:       20,
    paddingTop:    30,
    paddingBottom: 30,
  },

  assetName: {
    backgroundColor: 'transparent',
    fontWeight:      'bold',
  },

  assetValueContainer: {
    flexDirection: 'row',
    alignItems:    'center',
    marginTop:     10,
    marginBottom:  10,
  },

  assetValueInFIAT: {
    backgroundColor: 'transparent',
    fontSize:        18,
    fontWeight:      'bold',
  },

  assetValueInCrypto: {
    backgroundColor: 'transparent',
    fontSize:        12,
    fontWeight:      '100',
    marginLeft:      10,
  },
});
