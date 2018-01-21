import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

    this.state = {
      nameTickerSwitcher: {
        active: 'name',
        values: {
          name:   this.ticker.name,
          ticker: this.ticker.ticker,
        },
      },

      usdBtcSwitcher: {
        active: 'eur',
        values: [Finance.formatFIAT(this.dataPoints.slice(-1).pop()), 0, 0],
      },

      fiatAmountSwitcher: {
        active: 'fiat',
        values: {
          fiat:   Finance.formatFIAT(this.asset.fiatValue('EUR'), 'EUR'),
          amount: `${Finance.formatCrypto(this.asset.amount)} ${this.ticker.ticker}`,
        },
      },
    };
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
   * Switch between FIAT currency and amount of coins.
   */
  fiatAmountSwitcher = () => {
    const nextValue = (this.state.fiatAmountSwitcher.active === 'fiat' ? 'amount' : 'fiat');

    this.setState({
      fiatAmountSwitcher: {
        ...this.state.fiatAmountSwitcher,
        active: nextValue,
      },
    });
  };

  /**
   * Render the view.
   */
  render = () => (
    <CardComponent style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.leftTextContainer}>
          <Text
            allowFontScaling={false}
            style={[styles.topSwitchers, {color: this.ticker.color}]}>
            {this.ticker.name}
          </Text>

          <Text style={styles.usdBtcSwitcher}>
            1 XRP = € {this.state.usdBtcSwitcher.values[0]}
          </Text>
        </View>

        <View style={styles.rightTextContainer}>
          <TouchableOpacity onPress={this.fiatAmountSwitcher}>
            <Text
              allowFontScaling={false}
              style={[styles.topSwitchers, {color: this.ticker.color}]}>
              {this.state.fiatAmountSwitcher.values[this.state.fiatAmountSwitcher.active]}
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
        dataPoints={this.dataPoints}
        color={this.ticker.color}/>
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

  usdBtcSwitcher: {
    fontSize: 11,
    color:    '#999999',
  },

  divider: {
    position:   'absolute',
    left:       0,
    top:        72,
    width:      '100%',
    alignItems: 'center',
  },

  dividerText: {
    color:        '#919191',
    fontSize:     11,
    paddingLeft:  10,
    paddingRight: 10,
  },
});
