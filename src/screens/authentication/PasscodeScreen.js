import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NumpadComponent from '../../components/authentication/NumpadComponent';
import GradientComponent from '../../components/ui/GradientComponent';

export default class PasscodeScreen extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {};

  /**
   * Set the screen's navigator style.
   */
  static navigatorStyle = {
    navBarHidden: true,
  };

  /**
   * Define the store.
   */
  constructor (props) {
    super(props);

    this.state = {
      inputs: [],
    };
  }

  /**
   * Handle new input.
   * TODO: Maybe refactor in to multiple functions in order to improve readability.
   */
  numpadHandler = (action, value = false) => {
    if (action === 'clear') {
      return this.setState({inputs: []});
    } else if (action === 'undo') {
      const newState = this.state.inputs;
      newState.pop();
      return this.setState({inputs: newState});
    } else if (action === 'add') {
      const newState = this.state.inputs;
      newState.push(value);
      this.setState({inputs: newState});

      // If the new input is the 4th in the array, submit.
      if (newState.length === 4) {

      }

      return;
    }

    throw Error('Undefined action requested');
  };

  /**
   * Grab the correct style for the inputs.
   */
  getInputStyle (i) {
    if (this.state.inputs[i]) {
      return styles.inputFilled;
    }

    return styles.inputEmpty;
  }

  /**
   * Render the view.
   */
  render = () => (
    <GradientComponent style={styles.container}>
      <Text style={styles.title}>Passcode</Text>

      <View style={styles.inputContainer}>
        <View style={[styles.input, this.getInputStyle(0)]}/>
        <View style={[styles.input, this.getInputStyle(1)]}/>
        <View style={[styles.input, this.getInputStyle(2)]}/>
        <View style={[styles.input, this.getInputStyle(3)]}/>
      </View>

      <NumpadComponent handler={this.numpadHandler}/>
    </GradientComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:           1,
    paddingTop:     80,
    paddingBottom:  80,
    alignItems:     'center',
    justifyContent: 'space-between',
  },

  title: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    fontSize:        30,
    fontWeight:      'bold',
  },

  inputContainer: {
    flexDirection: 'row',
  },

  input: {
    borderRadius: 10,
    height:       20,
    width:        20,
    marginLeft:   10,
    marginRight:  10,
  },

  inputEmpty: {
    backgroundColor: 'transparent',
    borderColor:     'rgba(255, 255, 255, 0.45)',
    borderWidth:     2,
  },

  inputFilled: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
});
