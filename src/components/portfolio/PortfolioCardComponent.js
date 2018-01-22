import CardComponent from 'components/ui/CardComponent';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Finance from 'utils/Finance';

export default class PortfolioCardComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    portfolio: PropTypes.object.isRequired,
    navigate:  PropTypes.func.isRequired,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);
    this.state = this.mapState(props);
  }

  /**
   * Update the state when new props arrive.
   */
  componentWillReceiveProps (props) {
    this.setState(this.mapState(props));
  }

  /**
   * Map the props to the state.
   */
  mapState = (props) => ({
    name:             props.portfolio.name,
    totalValue:       props.portfolio.totalValue,
    totalInvestments: props.portfolio.totalInvestments,
  });

  /**
   * Render the view.
   */
  render = () => (
    <TouchableOpacity
      onPress={() => this.props.navigate(this.state.name)}
      activeOpacity={1}>
      <CardComponent style={styles.container}>
        <Text style={[styles.portfolioName]}>{this.state.name}</Text>

        <View style={styles.portfolioValueView}>
          <Text style={[styles.portfolioValueInFiat]}>
            {Finance.formatFIAT(this.state.totalValue, 'EUR')}
          </Text>
        </View>

        <Text style={[styles.portfolioInvestmentInFiat]}>
          {Finance.formatFIAT(this.state.totalInvestments, 'EUR')}
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
  },
});
