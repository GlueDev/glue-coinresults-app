import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { AlertIOS, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

import Container from '../../components/firstrun/ContainerComponent';

@inject('cryptos') @observer
export default class AssetsScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  constructor () {
    super();
    this.state = {portfolioName: ''};
  }

  /**
   * Add a new portfolio to the store.
   */
  onSubmit = async () => {
    const portfolioName = this.state.portfolioName;

    // Check for empty names.
    if (portfolioName === '') {
      return AlertIOS.alert('Please enter a portfolio name.');
    }

    // Try to add the portfolio.
    try {
      await this.props.cryptos.createPortfolio(portfolioName);
      this.props.navigator.resetTo({
        screen: 'CR.FR.AssetsOverviewScreen',

        navigatorStyle: {
          navBarHidden:             true,
          statusBarTextColorScheme: 'light',
        },
      });
    } catch (e) {
      AlertIOS.alert('Oops, something went wrong. Please try again!');
    }
  };

  /**
   * Render the body for the container component.
   */
  renderAction = () => (
    <View style={styles.inputView}>
      <Hoshi
        onChangeText={value => this.setState({portfolioName: value})}
        onSubmitEditing={this.onSubmit}
        label={'Portfolio name'}
        style={styles.inputContainer}
        labelStyle={styles.inputLabel}
        inputStyle={styles.inputText}
        height={60}
        borderColor={'rgba(255, 255, 255, 0.75)'}
        backgroundColor={'transparent'}/>
    </View>
  );

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: this.onSubmit},
    ];

    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
        <Container
          title={'New Portfolio'}
          buttons={buttons}
          body={'The CoinResults app allows you to register multiple portfolios. It is always' +
          ' possible to add a new portfolio, but for now, let\'s start with one.'}
          action={this.renderAction()}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputView: {
    width:     300,
    marginTop: 10,
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.75)',
  },

  inputLabel: {
    backgroundColor: 'transparent',
    color:           'rgba(255, 255, 255, 0.5)',
    fontWeight:      'bold',
    left:            -16,
  },

  inputText: {
    color:      '#FFFFFF',
    fontWeight: 'normal',
    fontSize:   13,
    paddingTop: 3,
    left:       0,
  },
});
