import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
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

    this.portfolio  = realm.objectForPrimaryKey('Portfolio', this.props.portfolioName);
    this.asset      = this.portfolio.assets.filtered('ticker = $0', this.props.ticker)[0];
    this.ticker     = realm.objectForPrimaryKey('Ticker', this.props.ticker);
    this.dataPoints = this.ticker.rates.map(rate => rate.rate);
  }

  /**
   * Listen for portfolio changes.
   */
  componentDidMount () {
    this.listener = EventRegister.on('tickerUpdate', () => this.forceUpdate());
  }

  /**
   * Remove listeners.
   */
  componentWillUnmount () {
    EventRegister.rm(this.listener);
  }

  /**
   * Render the view.
   */
  render = () => (
    <CardComponent style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.leftTextContainer}>
          <Text style={[styles.assetName, {color: this.ticker.color}]}>{this.ticker.name}</Text>
        </View>

        <View style={styles.rightTextContainer}>
          <Text style={[styles.assetName, {color: this.ticker.color}]}>
            {Finance.formatFIAT(this.asset.fiatValue('EUR'), 'EUR')}
          </Text>
        </View>
      </View>

      <View style={styles.divider}>
        <Text style={styles.dividerText}>7 DAYS</Text>
      </View>

      <AssetGraphComponent
        dataPoints={this.dataPoints}
        color={this.ticker.color}/>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    position:       'relative',
    height:         165,
    justifyContent: 'space-between',
  },

  textContainer: {
    overflow:          'hidden',
    padding:           20,
    paddingBottom:     20,
    borderColor:       '#DFDFDF',
    borderBottomWidth: 1,
    flexDirection:     'row',
  },

  leftTextContainer: {
    flex: 1 / 2,
  },

  rightTextContainer: {
    flex:       1 / 2,
    alignItems: 'flex-end',
  },

  assetName: {
    backgroundColor: 'transparent',
    fontWeight:      'bold',
    fontSize:        16,
  },

  divider: {
    backgroundColor: '#FFFFFF',
    position:        'absolute',
    left:            0,
    top:             53,
    width:           69,
    alignItems:      'flex-end',
  },

  dividerText: {
    color:        '#919191',
    fontSize:     11,
    paddingRight: 10,
  },
});
