import CardComponent from 'components/ui/CardComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Finance from 'utils/Finance';
import AssetGraphComponent from './AssetGraphComponent';

export default class AssetCardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    asset:  PropTypes.object.isRequired,
    ticker: PropTypes.object.isRequired,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      color:      '#000000',
      dataPoints: [0],

      name:   '...',
      ticker: '...',
      amount: '...',

      totalEur: '...',

      eurValue: '...',
      btcValue: '...',
      usdValue: '...',
    };
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    this.setState({
      color:      props.ticker.color,
      dataPoints: Array.from(props.asset.dataPoints()).map(rate => rate.rate),

      name:   props.ticker.name,
      ticker: props.asset.ticker,
      amount: Finance.formatCrypto(props.asset.amount),

      totalEur: Finance.formatFIAT(props.asset.totalValue('EUR'), 'EUR'),

      eurValue: Finance.formatFIAT(props.asset.valueEUR, 'EUR'),
      btcValue: 'unk.',
      usdValue: 'unk.',
    });
  }

  /**
   * Render the view.
   */
  render = () => (
    <CardComponent style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.leftTextContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.topSwitchers, {color: this.state.color}]}>
            {this.state.name}
          </Text>

          <Text style={styles.eurUsdBtcSwitcher}>
            1 {this.state.ticker} =
            € {this.state.eurValue}
          </Text>
        </View>

        <View style={styles.rightTextContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Text
              allowFontScaling={false}
              style={[styles.topSwitchers, {color: this.state.color}]}>
              {this.state.totalEur}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider}>
        <Text
          allowFontScaling={false}
          style={styles.dividerText}>7 DAYS</Text>
      </View>

      <AssetGraphComponent
        dataPoints={this.state.dataPoints}
        color={this.state.color}/>
    </CardComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    position:       'relative',
    height:         175,
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

  topSwitchers: {
    fontWeight:   'bold',
    fontSize:     16,
    marginBottom: 6,
  },

  eurUsdBtcSwitcher: {
    fontSize: 11,
    color:    '#999999',
  },

  divider: {
    position:   'absolute',
    left:       0,
    top:        71,
    width:      '100%',
    alignItems: 'center',
  },

  dividerText: {
    backgroundColor: '#FFFFFF',
    color:        '#919191',
    fontSize:     11,
    paddingLeft:  10,
    paddingRight: 10,
  },
});
