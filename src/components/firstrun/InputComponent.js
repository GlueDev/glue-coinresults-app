import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';

export default class InputComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    onChangeText:    PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
    label:           PropTypes.string.isRequired,
    keyboardType:    PropTypes.string,
    containerStyle:  PropTypes.object,
    style:           PropTypes.object,
    labelStyle:      PropTypes.object,
    inputStyle:      PropTypes.object,
    height:          PropTypes.number,
    borderColor:     PropTypes.string,
    backgroundColor: PropTypes.string,
  };

  /**
   * Render the component.
   */
  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <Hoshi
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
          label={this.props.label}
          keyboardType={this.props.keyboardType || 'default'}
          style={[styles.input, this.props.style]}
          labelStyle={[styles.inputLabel, this.props.labelStyle]}
          inputStyle={[styles.inputText, this.props.inputStyle]}
          height={this.props.height || 60}
          borderColor={this.props.borderColor || 'rgba(255, 255, 255, 0.75)'}
          backgroundColor={this.props.backgroundColor || 'transparent'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width:     300,
    marginTop: 10,
  },

  input: {
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
