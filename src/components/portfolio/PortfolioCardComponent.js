import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { EventRegister } from 'react-native-event-listeners';

import realm from '../../realm';
import Finance from '../../utils/Finance';
import CardComponent from '../ui/CardComponent';

export default class PortfolioCardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolio: PropTypes.string.isRequired,
    navigate:  PropTypes.func.isRequired,
  };

  /**
   * Grab data and setup listeners.
   *
   * @param props
   */
  constructor (props) {
    super(props);

    this.portfolio = realm.objectForPrimaryKey('Portfolio', this.props.portfolio);
  };

  componentDidMount() {
    this.listener = EventRegister.on('tickerUpdate', () => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    EventRegister.rm(this.listener);
  }

  /**
   * Render the view.
   */
  render = () => (
    <TouchableOpacity onPress={() => this.props.navigate(this.portfolio.name)} activeOpacity={1}>
      <CardComponent style={styles.container}>
        <Text style={[styles.portfolioName]}>{this.portfolio.name}</Text>

        <View style={styles.portfolioValueView}>
          <Text style={[styles.portfolioValueInFiat]}>
            {Finance.formatFIAT(this.portfolio.totalValue, 'EUR')}
          </Text>
        </View>

        <Text style={[styles.portfolioInvestmentInFiat]}>
          {Finance.formatFIAT(this.portfolio.totalInvestments, 'EUR')}
        </Text>
      </CardComponent>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:       20,
    paddingTop:    30,
    paddingBottom: 30,
  },

  portfolioName: {
    backgroundColor: 'transparent',
    fontWeight:      'bold',
    color:           '#FF0000',
  },

  portfolioValueView: {
    flexDirection: 'row',
    alignItems:    'center',
    marginTop:     10,
  },

  portfolioValueInFiat: {
    backgroundColor: 'transparent',
    fontSize:        18,
    fontWeight:      'bold',
  },

  portfolioInvestmentInFiat: {
    backgroundColor: 'transparent',
    fontSize:        12,
    color:           '#5E5E5E',
    marginTop:       10,
  }
});
