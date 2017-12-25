import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default class CircleInputComponent extends Component {
  /**
   * Define the possible props.
   */
  static propTypes = {
    style:   PropTypes.number,
    input:   PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  /**
   * Render the view.
   */
  render = () => (
    <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
      <Text style={styles.input}>{this.props.input}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderColor:     'rgba(255, 255, 255, 0.25)',
    borderWidth:     2,
    borderRadius:    35,
    height:          70,
    width:           70,
    alignItems:      'center',
    justifyContent:  'center',
  },

  input: {
    backgroundColor: 'transparent',
    color:           '#FFFFFF',
    fontSize:        18,
    fontWeight:      'bold',
  },
});
