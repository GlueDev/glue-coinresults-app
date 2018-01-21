import GradientComponent from 'components/ui/GradientComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Finance from 'utils/Finance';
import realm from 'realm';
import moment from 'moment';
import { EventRegister } from 'react-native-event-listeners';

export default class MarketCapComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    navigate:     PropTypes.func,
    navigateIcon: PropTypes.string,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      marketCapEUR: '...',
      marketCapUSD: '...',
      dominanceBTC: '...',
    };
  }

  /**
   * Fill the store.
   */
  componentDidMount () {
    this.updateComponent();
    EventRegister.on('dataRefreshed', () => this.updateComponent())
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
    const marketData = await realm.objectForPrimaryKey('MarketData', moment().format('l'));
    this.setState({
      marketCapEUR: Finance.formatMarketCap(marketData.marketCapEUR),
      marketCapUSD: Finance.formatMarketCap(marketData.marketCapUSD),
      dominanceBTC: Finance.formatPercentage(marketData.dominanceBTC),
    });
  };

  /**
   * Render the component's view.
   */
  render = () => {
    let navigateIcon = null;

    if (this.props.navigateIcon) {
      navigateIcon = <Icon
        name={this.props.navigateIcon}
        size={25}
        color="#FFF"
        style={styles.settingsIcon}
        onPress={this.props.navigate}/>;
    }

    return <GradientComponent colors={['#F7BF47', '#EC405C']} style={styles.container}>
      <Text style={styles.label} allowFontScaling={false}>Market cap</Text>
      <Text style={styles.marketCap} allowFontScaling={false}>
        € {this.state.marketCapEUR}
      </Text>
      <Text style={styles.btcDominance} allowFontScaling={false}>
        Bitcoin dominance: {this.state.dominanceBTC}
      </Text>
      {navigateIcon}
    </GradientComponent>;
  };
}

const styles = StyleSheet.create({
  container: {
    padding:      60,
    paddingLeft:  30,
    paddingRight: 30,
  },

  label: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    fontSize:        12,
    fontWeight:      '100',
  },

  marketCap: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    fontSize:        35,
    fontWeight:      '100',
    marginTop:       5,
    marginBottom:    10,
  },

  btcDominance: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    fontWeight:      '100',
    marginBottom:    10,
  },

  lastVisit: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    fontWeight:      '100',
  },

  settingsIcon: {
    backgroundColor: 'transparent',
    position:        'absolute',
    top:             45,
    right:           25,
  },
});
