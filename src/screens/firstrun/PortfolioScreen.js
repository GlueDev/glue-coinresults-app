import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

import Container from '../../components/firstrun/ContainerComponent';

@inject('cryptos') @observer
export default class AssetsScreen extends Component {
  nextScreen = () => {
    this.props.navigator.showModal({
      screen: 'CR.FR.AssetsAddScreen',
      title:  'Modal',
    });
  };

  /**
   * Render the body for the container component.
   */
  renderAction = () => {
    /**
     * <TextInput
     style={styles.textInput}
     defaultValue={'My Portfolio'}
     onSubmitEditing={() => {}}
     returnKeyType={'next'}
     clearTextOnFocus={true}
     enablesReturnKeyAutomatically={true}/>
     */
    return (
      <View style={styles.inputView}>
        <Hoshi
          label={'Portfolio name'}
          style={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          height={60}
          borderColor={'rgba(255, 255, 255, 0.75)'}
          backgroundColor={'transparent'}/>
      </View>
    );
  };

  /**
   * Render the component.
   */
  render () {
    const buttons = [
      {text: 'Continue', onPress: this.nextScreen},
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
    width: 300,
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
    left: -16,
  },

  inputText: {
    color:      '#FFFFFF',
    fontWeight: 'normal',
    fontSize:   13,
    paddingTop: 3,
    left: 0,
  },
});
