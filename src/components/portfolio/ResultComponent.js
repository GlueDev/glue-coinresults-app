import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

import Finance from '../../utils/Finance';
import BackButtonComponent from '../ui/BackButtonComponent';
import GradientComponent from '../ui/GradientComponent';

export default class ResultComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  };

  /**
   * Render the view.
   */
  render = () => (
    <GradientComponent style={styles.container}>
      <BackButtonComponent
        onPress={() => this.props.navigator.pop()}
        label={'Portfolio overview'}/>

      <Text
        style={styles.totalProfit}
        allowFontScaling={false}>
        {Finance.formatFIAT(22668.54)}
      </Text>

      <Text style={styles.lastVisitResult}>
        €513,41 profit since your last visit yesterday
      </Text>

      <Text style={styles.ROI}>
        Your ROI is currently {Finance.formatPercentage(215.98)}
      </Text>

    </GradientComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:      60,
    paddingLeft:  30,
    paddingRight: 30,
  },

  totalProfit: {
    backgroundColor: 'transparent',
    color:           '#FFF',
    fontSize:        45,
    fontWeight:      '100',
  },

  lastVisitResult: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },

  ROI: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.6)',
    fontSize:        12,
    marginTop:       10,
  },
});
