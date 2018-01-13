import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import realm from '../../realm';

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
   * Grab all portfolios.
   */
  constructor (props) {
    super(props);

    this.state = {
      mainNumber: this.props.portfolio.totalValue
    };
  }

  /**
   * Flip between the totalValue and totalResult of the portfolio
   * @private
   */
  _onMainNumberTouch = () => {
    let mainNumber;

    if(this.state.mainNumber === this.props.portfolio.totalValue) {
      mainNumber = this.props.portfolio.totalResult;
    } else {
      mainNumber = this.props.portfolio.totalValue;
    }

    this.setState({ mainNumber });
  };

  /**
   * Render the view.
   */
  render = () => (
    <GradientComponent style={styles.container}>
      <BackButtonComponent
        onPress={() => this.props.navigator.pop()}
        label={'Portfolio overview'}/>

      <TouchableOpacity onPress={this._onMainNumberTouch}>
        <Text
          style={styles.totalProfit}
          allowFontScaling={false}>
          {Finance.formatFIAT(this.state.mainNumber, 'EUR')}
        </Text>
      </TouchableOpacity>

      <Text style={styles.lastVisitResult}>
        Portfolio value changed {Finance.formatFIAT(this.props.portfolio.valueChangeToday, 'EUR')} since 00:00.
      </Text>

      <Text style={styles.ROI}>
        Your ROI is currently {Finance.formatPercentage(this.props.portfolio.ROI)}.
      </Text>

    </GradientComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:    60,
    paddingBottom: 80,
    paddingLeft:   30,
    paddingRight:  30,
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
