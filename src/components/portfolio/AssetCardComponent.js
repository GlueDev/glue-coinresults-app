import CardComponent from 'components/ui/CardComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import realm from 'realm';
import Finance from 'utils/Finance';
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

    this.state = {
      portfolio:          {},
      asset:              {},
      ticker:             {color: '#000000'},
      dataPoints:         [0],
      eurUsdBtcSwitcher:  {
        active: 'eur',
        values: {eur: '...'}
      },
      fiatAmountSwitcher:  {
        active: 'fiat',
        values: {fiat: '...'}
      },
    };
  }

  /**
   * Listen for portfolio changes.
   */
  componentDidMount () {
    this.updateComponent();

    EventRegister.on('dataRefreshed', () => this.updateComponent());
    EventRegister.on('fiatAmountSwitcher', () => this.fiatAmountSwitcher());
  }

  /**
   * Remove listeners.
   */
  componentWillUnmount () {
    EventRegister.rmAll();
  }

  /**
   * Update component with the data.
   */
  updateComponent = async () => {
    const portfolio = realm.objectForPrimaryKey('Portfolio', this.props.portfolioName),
          asset = portfolio.assets.filtered('ticker = $0', this.props.ticker)[0],
          ticker = realm.objectForPrimaryKey('Ticker', this.props.ticker),
          dataPoints = ticker.rates.map(rate => rate.rate);

    await this.setState({
      portfolio,
      asset,
      ticker,
      dataPoints,

      eurUsdBtcSwitcher: {
        active: 'eur',
        values: {
          eur: Finance.formatFIAT(dataPoints.slice(-1).pop()),
          usd: 0,
          btc: 0,
        },
      },

      fiatAmountSwitcher: {
        active: 'fiat',
        values: {
          fiat:   Finance.formatFIAT(asset.fiatValue('EUR'), 'EUR'),
          amount: `${Finance.formatCrypto(asset.amount)} ${ticker.ticker}`,
        },
      },
    });
  };

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
            style={[styles.topSwitchers, {color: this.state.ticker.color}]}>
            {this.state.ticker.name}
          </Text>

          <Text style={styles.eurUsdBtcSwitcher}>
            1 {this.state.ticker.ticker} =
            € {this.state.eurUsdBtcSwitcher.values[this.state.eurUsdBtcSwitcher.active]}
          </Text>
        </View>

        <View style={styles.rightTextContainer}>
          <TouchableOpacity onPress={() => EventRegister.emit('fiatAmountSwitcher')}>
            <Text
              allowFontScaling={false}
              style={[styles.topSwitchers, {color: this.state.ticker.color}]}>
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
        dataPoints={this.state.dataPoints}
        color={this.state.ticker.color}/>
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
