import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Finance from '../../utils/Finance';
import GradientComponent from '../ui/GradientComponent';

export default class MarketCapComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    marketCap:    PropTypes.number,
    btcDominance: PropTypes.number,
    lastVisit:    PropTypes.number,
    navigate:     PropTypes.func,
    navigateIcon: PropTypes.string,
  };

  /**
   * Render the component's view.
   */
  render = () => {
    let navigateIcon = null;

    if(this.props.navigateIcon) {
      navigateIcon = <Icon name={this.props.navigateIcon} size={25} color="#FFF" style={styles.settingsIcon} onPress={this.props.navigate}/>
    }

    return <GradientComponent colors={['#F7BF47', '#EC405C']} style={styles.container}>
      <Text style={styles.label} allowFontScaling={false}>Market cap</Text>
      <Text style={styles.marketCap} allowFontScaling={false}>
        {Finance.formatFIAT(this.props.marketCap, 'EUR', false)}
      </Text>
      <Text style={styles.btcDominance} allowFontScaling={false}>
        Bitcoin dominance: {Finance.formatPercentage(this.props.btcDominance)}
      </Text>
      {/* <Text style={styles.lastVisit} allowFontScaling={false}>
       {Finance.formatFIAT(this.props.lastVisit, false)} increase since your last visit 3 hours
       ago.
       </Text> */}
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
    backgroundColor:  'transparent',
    position:         'absolute',
    top:              35,
    right:            25,
  }
});
