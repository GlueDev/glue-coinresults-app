import { inject, observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

import Container from '../../components/firstrun/ContainerComponent';
import Input from '../../components/firstrun/InputComponent';

@inject('cryptos') @observer
export default class AddAmount extends Component {
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
    ticker:        PropTypes.string.isRequired,
    portfolioName: PropTypes.string.isRequired,
  };

  /**
   * Setup the default state.
   */
  constructor () {
    super();
    this.state = {amount: 0};
  }

  /**
   * Handle setting an amount.
   */
  handleSubmit = () => {
    const { ticker, portfolio } = this.props;
    this.props.cryptos.createOrUpdateAsset(portfolio, {
      ticker,
      amount: this.state.amount,
    });
  };

  /**
   * Render the action.
   */
  renderAction = () => (
    <Input
      onChangeText={amount => this.setState({amount})}
      onSubmitEditing={() => this.handleSubmit}
      label={'Amount'}
      keyboardType={'numeric'}/>
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: () => this.handleSubmit()},
      {text: 'Cancel', onPress: () => this.props.navigator.dismissAllModals()},
    ];

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
        <Container
          title={'Add an amount'}
          body={`Enter how much ${this.props.ticker} you own. Remember, we will not be able to access this data.`}
          action={this.renderAction()}
          buttons={buttons}/>
      </KeyboardAvoidingView>
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
