import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import Container from '../../../components/firstrun/ContainerComponent';
import Input from '../../../components/ui/InputComponent';

import realm from '../../../realm';

export default class SetAssetAmountScreen extends Component {
  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the possible props.
   */
  static propTypes = {
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
    console.log(this.props);
    if (!this.state.amount) {
      return;
    }

    try {
      const {ticker, portfolioName} = this.props;
      const amount                  = parseFloat(this.state.amount);

      // TODO: Throw error if ticker already exists in the portfolio.
      realm.write(() => {
        // Update the portfolio containing the new asset.
        const portfolio = realm.objectForPrimaryKey('Portfolio', portfolioName);
        portfolio.assets.push({ticker, amount});
      });

      // Go back to the overview screen.
      this.props.navigator.dismissAllModals();
    } catch (e) {
      console.error(e);
    }
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
