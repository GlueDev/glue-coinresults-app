import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Picker, StyleSheet } from 'react-native';

import Container from '../../components/firstrun/ContainerComponent';
import CryptoCurrencies from '../../CryptoCurrencies.json';

export default class AddTicker extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the possible props.
   */
  static PropTypes = {
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Setup the default state.
   */
  constructor () {
    super();
    this.state = {ticker: 'BTC'};
  }

  /**
   * Go to the next page.
   */
  addAmount = () => (
    this.props.navigator.push({
      screen:    'CR.FR.SetAmountScreen',

      passProps: {
        ticker:        this.state.ticker,
        portfolioName: this.props.portfolioName,
      },
    })
  );

  /**
   * Render the action.
   */
  renderAction = () => {
    const items = CryptoCurrencies.map(asset => {
      return (
        <Picker.Item key={asset.ticker}
                     value={asset.ticker}
                     label={asset.ticker}/>
      );
    });

    return (
      <Picker
        selectedValue={this.state.ticker}
        onValueChange={asset => this.setState({ticker: asset})}
        style={styles.picker}
        itemStyle={{color: '#FFFFFF'}}>
        {items}
      </Picker>
    );
  };

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: () => this.addAmount()},
      {text: 'Cancel', onPress: () => this.props.navigator.dismissAllModals()},
    ];

    return (
      <Container
        title={'Select a coin'}
        body={'First, select a coin. Not all coins are supported yet, but we are working hard to' +
        ' add more.'}
        action={this.renderAction()}
        buttons={buttons}/>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width:  300,
    height: 250,
  },

  text: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
  },
});
